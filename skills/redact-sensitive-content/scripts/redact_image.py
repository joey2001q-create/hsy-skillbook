#!/usr/bin/env python3
"""Create numbered previews and apply manifest-driven image redaction."""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import sys
from pathlib import Path
from typing import Any

try:
    from PIL import Image, ImageColor, ImageDraw, ImageFilter, ImageFont, ImageOps
except ImportError as exc:
    raise SystemExit(
        "Pillow is required. Use an available workspace Python runtime or install Pillow with approval."
    ) from exc


DEFAULT_EFFECT: dict[str, Any] = {
    "type": "solid",
    "color": "#111827",
    "block_size": 18,
    "radius": 16,
}
VALID_OPERATIONS = {"redact-regions", "keep-regions"}
VALID_EFFECTS = {"solid", "pixelate", "blur"}


def fail(message: str) -> None:
    raise ValueError(message)


def load_manifest(path: Path) -> dict[str, Any]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(f"Cannot read manifest {path}: {exc}")

    if data.get("version") != 1:
        fail("Manifest version must be 1")
    if data.get("operation") not in VALID_OPERATIONS:
        fail("Manifest operation must be redact-regions or keep-regions")
    regions = data.get("regions")
    if not isinstance(regions, list) or not regions:
        fail("Manifest regions must be a non-empty list")

    seen_ids: set[str] = set()
    for index, region in enumerate(regions):
        if not isinstance(region, dict):
            fail(f"Region {index} must be an object")
        region_id = region.get("id")
        if not isinstance(region_id, str) or not region_id.strip():
            fail(f"Region {index} needs a non-empty string id")
        if region_id in seen_ids:
            fail(f"Duplicate region id: {region_id}")
        seen_ids.add(region_id)
        for field in ("x", "y", "width", "height"):
            value = region.get(field)
            if not isinstance(value, (int, float)) or isinstance(value, bool):
                fail(f"Region {region_id} field {field} must be numeric")
        if region["width"] <= 0 or region["height"] <= 0:
            fail(f"Region {region_id} width and height must be positive")
        if "padding" in region and (
            not isinstance(region["padding"], (int, float))
            or isinstance(region["padding"], bool)
            or region["padding"] < 0
        ):
            fail(f"Region {region_id} padding must be a non-negative number")

    validate_effect(data.get("effect", {}), "top-level effect")
    if data["operation"] == "redact-regions":
        for region in regions:
            validate_effect(region.get("effect", {}), f"region {region['id']} effect")
    return data


def validate_effect(effect: Any, label: str) -> None:
    if not isinstance(effect, dict):
        fail(f"{label} must be an object")
    effect_type = effect.get("type", DEFAULT_EFFECT["type"])
    if effect_type not in VALID_EFFECTS:
        fail(f"{label} type must be one of: {', '.join(sorted(VALID_EFFECTS))}")
    if effect_type == "solid":
        try:
            ImageColor.getrgb(effect.get("color", DEFAULT_EFFECT["color"]))
        except (TypeError, ValueError) as exc:
            fail(f"{label} has an invalid color: {exc}")
    if effect_type == "pixelate":
        block_size = effect.get("block_size", DEFAULT_EFFECT["block_size"])
        if not isinstance(block_size, (int, float)) or block_size < 2:
            fail(f"{label} block_size must be at least 2")
    if effect_type == "blur":
        radius = effect.get("radius", DEFAULT_EFFECT["radius"])
        if not isinstance(radius, (int, float)) or radius <= 0:
            fail(f"{label} radius must be positive")


def merged_effect(base: Any, override: Any = None) -> dict[str, Any]:
    effect = dict(DEFAULT_EFFECT)
    if isinstance(base, dict):
        effect.update(base)
    if isinstance(override, dict):
        effect.update(override)
    validate_effect(effect, "resolved effect")
    return effect


def load_clean_image(path: Path) -> Image.Image:
    try:
        with Image.open(path) as opened:
            oriented = ImageOps.exif_transpose(opened)
            mode = "RGBA" if "A" in oriented.getbands() else "RGB"
            return oriented.convert(mode)
    except OSError as exc:
        fail(f"Cannot open image {path}: {exc}")


def region_box(region: dict[str, Any], size: tuple[int, int]) -> tuple[int, int, int, int]:
    padding = float(region.get("padding", 0))
    left = math.floor(float(region["x"]) - padding)
    top = math.floor(float(region["y"]) - padding)
    right = math.ceil(float(region["x"]) + float(region["width"]) + padding)
    bottom = math.ceil(float(region["y"]) + float(region["height"]) + padding)
    left = max(0, min(size[0], left))
    top = max(0, min(size[1], top))
    right = max(0, min(size[0], right))
    bottom = max(0, min(size[1], bottom))
    if right <= left or bottom <= top:
        fail(f"Region {region['id']} does not intersect the image")
    return left, top, right, bottom


def inclusive_box(box: tuple[int, int, int, int]) -> tuple[int, int, int, int]:
    """Convert Pillow crop coordinates to draw coordinates."""
    return box[0], box[1], box[2] - 1, box[3] - 1


def apply_effect(
    image: Image.Image,
    box: tuple[int, int, int, int],
    effect: dict[str, Any],
) -> None:
    width = box[2] - box[0]
    height = box[3] - box[1]
    effect_type = effect["type"]

    if effect_type == "solid":
        color = ImageColor.getcolor(effect["color"], image.mode)
        replacement = Image.new(image.mode, (width, height), color)
    else:
        crop = image.crop(box)
        if effect_type == "pixelate":
            block_size = int(round(float(effect["block_size"])))
            small_size = (
                max(1, math.ceil(width / block_size)),
                max(1, math.ceil(height / block_size)),
            )
            replacement = crop.resize(small_size, Image.Resampling.BOX).resize(
                (width, height), Image.Resampling.NEAREST
            )
        elif effect_type == "blur":
            replacement = crop.filter(
                ImageFilter.GaussianBlur(radius=float(effect["radius"]))
            )
        else:  # pragma: no cover - validated before dispatch
            fail(f"Unsupported effect: {effect_type}")
    image.paste(replacement, box)


def build_preview(image: Image.Image, manifest: dict[str, Any]) -> Image.Image:
    preview = image.copy()
    regions = manifest["regions"]
    boxes = [(region, region_box(region, image.size)) for region in regions]
    line_width = max(2, round(min(image.size) / 240))

    if manifest["operation"] == "keep-regions":
        shade = Image.new("RGBA", image.size, (220, 38, 38, 72))
        preview = Image.alpha_composite(preview.convert("RGBA"), shade)
        for _, box in boxes:
            preview.paste(image.crop(box).convert("RGBA"), box)
        outline = (22, 163, 74, 255)
        fill = (22, 163, 74, 230)
    else:
        preview = preview.convert("RGBA")
        overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        for _, box in boxes:
            overlay_draw.rectangle(inclusive_box(box), fill=(220, 38, 38, 52))
        preview = Image.alpha_composite(preview, overlay)
        outline = (220, 38, 38, 255)
        fill = (220, 38, 38, 230)

    draw = ImageDraw.Draw(preview)
    font = ImageFont.load_default()
    for region, box in boxes:
        draw.rectangle(inclusive_box(box), outline=outline, width=line_width)
        label = str(region["id"])
        text_box = draw.textbbox((0, 0), label, font=font)
        label_width = text_box[2] - text_box[0] + 10
        label_height = text_box[3] - text_box[1] + 8
        label_left = box[0]
        label_top = max(0, box[1] - label_height)
        draw.rectangle(
            (label_left, label_top, label_left + label_width, label_top + label_height),
            fill=fill,
        )
        draw.text(
            (label_left + 5, label_top + 3),
            label,
            fill=(255, 255, 255, 255),
            font=font,
        )
    return preview


def build_redacted(image: Image.Image, manifest: dict[str, Any]) -> Image.Image:
    result = image.copy()
    base_effect = merged_effect(manifest.get("effect"))

    if manifest["operation"] == "keep-regions":
        original = image.copy()
        apply_effect(result, (0, 0, *image.size), base_effect)
        for region in manifest["regions"]:
            box = region_box(region, image.size)
            result.paste(original.crop(box), box)
        return result

    for region in manifest["regions"]:
        effect = merged_effect(manifest.get("effect"), region.get("effect"))
        apply_effect(result, region_box(region, image.size), effect)
    return result


def prepare_output(input_path: Path, output_path: Path, overwrite: bool) -> None:
    if input_path.resolve() == output_path.resolve():
        fail("Output path must differ from the source path")
    if output_path.exists() and not overwrite:
        fail(f"Output already exists: {output_path}. Use --overwrite to replace it")
    output_path.parent.mkdir(parents=True, exist_ok=True)


def save_clean(image: Image.Image, path: Path) -> None:
    suffix = path.suffix.lower()
    if suffix == ".png":
        image.save(path, format="PNG", optimize=True)
    elif suffix in {".jpg", ".jpeg"}:
        image.convert("RGB").save(path, format="JPEG", quality=95, optimize=True)
    elif suffix == ".webp":
        image.save(path, format="WEBP", lossless=True, quality=100)
    else:
        fail("Output extension must be .png, .jpg, .jpeg, or .webp")


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def run(args: argparse.Namespace) -> dict[str, Any]:
    input_path = Path(args.input)
    manifest_path = Path(args.manifest)
    output_path = Path(args.output)
    manifest = load_manifest(manifest_path)
    image = load_clean_image(input_path)
    prepare_output(input_path, output_path, args.overwrite)

    if args.command == "preview":
        result = build_preview(image, manifest)
    else:
        if not args.confirmed:
            fail("Final application requires --confirmed after explicit user confirmation")
        result = build_redacted(image, manifest)

    save_clean(result, output_path)
    return {
        "command": args.command,
        "input": str(input_path),
        "manifest": str(manifest_path),
        "output": str(output_path),
        "operation": manifest["operation"],
        "dimensions": {"width": image.width, "height": image.height},
        "regions": [region["id"] for region in manifest["regions"]],
        "output_sha256": sha256(output_path),
    }


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Preview and apply manifest-driven image redaction"
    )
    subparsers = parser.add_subparsers(dest="command", required=True)
    for command in ("preview", "apply"):
        subparser = subparsers.add_parser(command)
        subparser.add_argument("input", help="Source image path")
        subparser.add_argument("manifest", help="Region manifest JSON path")
        subparser.add_argument("output", help="New output image path")
        subparser.add_argument(
            "--overwrite", action="store_true", help="Replace an existing output file"
        )
        if command == "apply":
            subparser.add_argument(
                "--confirmed",
                action="store_true",
                help="Assert that the user confirmed final redaction",
            )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        summary = run(args)
    except ValueError as exc:
        parser.error(str(exc))
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
