#!/usr/bin/env python3
"""Compare two same-sized screenshots and optionally write a visual diff."""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

try:
    from PIL import Image, ImageChops, ImageEnhance
except ImportError as exc:
    raise SystemExit("Pillow is required: python -m pip install pillow") from exc


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("reference", type=Path)
    parser.add_argument("rendered", type=Path)
    parser.add_argument("--diff", type=Path, help="Write an amplified RGB diff image")
    parser.add_argument("--threshold", type=int, default=12, help="Per-channel change threshold (0-255)")
    return parser.parse_args()


def compare(reference_path: Path, rendered_path: Path, threshold: int) -> tuple[dict[str, object], Image.Image]:
    reference = Image.open(reference_path).convert("RGB")
    rendered = Image.open(rendered_path).convert("RGB")

    if reference.size != rendered.size:
        raise SystemExit(
            f"Image sizes differ: reference={reference.size[0]}x{reference.size[1]} "
            f"rendered={rendered.size[0]}x{rendered.size[1]}"
        )

    difference = ImageChops.difference(reference, rendered)
    histogram = difference.histogram()
    channel_values = reference.width * reference.height * 3
    absolute_sum = sum((index % 256) * count for index, count in enumerate(histogram))
    squared_sum = sum(((index % 256) ** 2) * count for index, count in enumerate(histogram))
    mean_absolute_error = absolute_sum / channel_values
    root_mean_square_error = math.sqrt(squared_sum / channel_values)

    get_pixels = getattr(difference, "get_flattened_data", difference.getdata)
    pixel_differences = list(get_pixels())
    changed_pixels = sum(1 for pixel in pixel_differences if max(pixel) > threshold)
    pixel_count = reference.width * reference.height

    result: dict[str, object] = {
        "reference": str(reference_path),
        "rendered": str(rendered_path),
        "width": reference.width,
        "height": reference.height,
        "threshold": threshold,
        "pixel_similarity_percent": round((1 - mean_absolute_error / 255) * 100, 4),
        "mean_absolute_error": round(mean_absolute_error, 4),
        "root_mean_square_error": round(root_mean_square_error, 4),
        "changed_pixels_percent": round(changed_pixels / pixel_count * 100, 4),
    }
    return result, difference


def main() -> None:
    args = parse_args()
    if not 0 <= args.threshold <= 255:
        raise SystemExit("--threshold must be between 0 and 255")

    result, difference = compare(args.reference, args.rendered, args.threshold)
    if args.diff:
        args.diff.parent.mkdir(parents=True, exist_ok=True)
        ImageEnhance.Contrast(difference).enhance(2.5).save(args.diff)
        result["diff"] = str(args.diff)
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
