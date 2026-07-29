#!/usr/bin/env python3
"""Verify manifest-driven redaction without claiming selection completeness."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

try:
    from PIL import Image, ImageChops, ImageColor, ImageDraw
except ImportError as exc:
    raise SystemExit(
        "Pillow is required. Use an available workspace Python runtime or install Pillow with approval."
    ) from exc

from redact_image import inclusive_box, load_clean_image, load_manifest, merged_effect, region_box


def changed_ratio(before: Image.Image, after: Image.Image) -> float:
    difference = ImageChops.difference(before.convert("RGBA"), after.convert("RGBA"))
    grayscale = difference.convert("L")
    histogram = grayscale.histogram()
    total = before.width * before.height
    return 0.0 if total == 0 else 1.0 - (histogram[0] / total)


def output_has_exif(path: Path) -> bool:
    with Image.open(path) as image:
        return bool(image.getexif())


def verify(
    original_path: Path, manifest_path: Path, output_path: Path
) -> dict[str, Any]:
    manifest = load_manifest(manifest_path)
    original = load_clean_image(original_path)
    output = load_clean_image(output_path)
    errors: list[str] = []
    warnings: list[str] = []
    checks: list[dict[str, Any]] = []

    if original.size != output.size:
        errors.append(
            f"Dimensions changed from {original.size[0]}x{original.size[1]} "
            f"to {output.size[0]}x{output.size[1]}"
        )
    if output_has_exif(output_path):
        errors.append("Output still contains EXIF metadata")

    if original.size == output.size:
        lossless = output_path.suffix.lower() in {".png", ".webp"}
        base_effect = merged_effect(manifest.get("effect"))

        if manifest["operation"] == "redact-regions":
            redacted_mask = Image.new("L", original.size, 0)
            mask_draw = ImageDraw.Draw(redacted_mask)
            for region in manifest["regions"]:
                box = region_box(region, original.size)
                mask_draw.rectangle(inclusive_box(box), fill=255)
                before_crop = original.crop(box)
                after_crop = output.crop(box)
                effect = merged_effect(manifest.get("effect"), region.get("effect"))
                ratio = changed_ratio(before_crop, after_crop)
                check: dict[str, Any] = {
                    "region": region["id"],
                    "effect": effect["type"],
                    "changed_ratio": round(ratio, 6),
                }
                if effect["type"] == "solid":
                    expected_color = ImageColor.getcolor(effect["color"], after_crop.mode)
                    expected = Image.new(after_crop.mode, after_crop.size, expected_color)
                    check["solid_fill_exact"] = ImageChops.difference(
                        after_crop, expected
                    ).getbbox() is None
                    if not check["solid_fill_exact"]:
                        errors.append(f"Region {region['id']} is not an exact solid fill")
                elif ratio < 0.01:
                    warnings.append(
                        f"Region {region['id']} changed less than 1%; inspect it manually"
                    )
                checks.append(check)

            if lossless:
                difference = ImageChops.difference(
                    original.convert("RGBA"), output.convert("RGBA")
                ).convert("L")
                outside_mask = ImageChops.invert(redacted_mask)
                outside_changes = ImageChops.multiply(
                    difference.point(lambda pixel: 255 if pixel else 0), outside_mask
                )
                changed_outside = outside_changes.histogram()[255]
                checks.append({"outside_changed_pixels": changed_outside})
                if changed_outside:
                    errors.append(
                        f"Lossless output changed {changed_outside} pixels outside redaction regions"
                    )
            else:
                warnings.append(
                    "Lossy output prevents exact outside-region verification; prefer PNG"
                )
        else:
            expected = original.copy()
            if base_effect["type"] == "solid":
                expected_color = ImageColor.getcolor(base_effect["color"], expected.mode)
                expected = Image.new(expected.mode, expected.size, expected_color)
                for region in manifest["regions"]:
                    box = region_box(region, original.size)
                    expected.paste(original.crop(box), box)
                exact = ImageChops.difference(expected, output).getbbox() is None
                checks.append({"inverse_solid_result_exact": exact})
                if lossless and not exact:
                    errors.append("Inverse solid result does not match the manifest")
                if not lossless:
                    warnings.append(
                        "Lossy output prevents exact inverse-mode verification; prefer PNG"
                    )
            else:
                for region in manifest["regions"]:
                    box = region_box(region, original.size)
                    ratio = changed_ratio(original.crop(box), output.crop(box))
                    checks.append(
                        {"kept_region": region["id"], "changed_ratio": round(ratio, 6)}
                    )
                    if lossless and ratio != 0:
                        errors.append(f"Kept region {region['id']} changed")
                warnings.append(
                    "Inspect the redacted area manually because blur/pixelate completeness "
                    "cannot be proven from the manifest alone"
                )

    return {
        "status": "pass" if not errors else "fail",
        "original": str(original_path),
        "manifest": str(manifest_path),
        "output": str(output_path),
        "dimensions_match": original.size == output.size,
        "exif_removed": not output_has_exif(output_path),
        "checks": checks,
        "warnings": warnings,
        "errors": errors,
        "selection_completeness": "requires visual and semantic review",
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify a redacted image against its manifest")
    parser.add_argument("original")
    parser.add_argument("manifest")
    parser.add_argument("output")
    args = parser.parse_args()
    try:
        result = verify(Path(args.original), Path(args.manifest), Path(args.output))
    except (OSError, ValueError) as exc:
        parser.error(str(exc))
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result["status"] == "pass" else 1


if __name__ == "__main__":
    sys.exit(main())
