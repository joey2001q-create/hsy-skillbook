# Region Manifest

Use image pixel coordinates after orientation correction. The origin is the top-left corner; `x` grows rightward and `y` grows downward. Keep the manifest beside the preview so every user adjustment is explicit and reproducible.

## Schema

```json
{
  "version": 1,
  "operation": "redact-regions",
  "effect": {
    "type": "solid",
    "color": "#111827",
    "block_size": 18,
    "radius": 16
  },
  "regions": [
    {
      "id": "A",
      "x": 120,
      "y": 80,
      "width": 340,
      "height": 180,
      "padding": 6
    }
  ]
}
```

Required top-level fields:

- `version`: use `1`.
- `operation`: use `redact-regions` or `keep-regions`.
- `regions`: provide at least one rectangular region.

Region fields:

- `id`: use a unique human-readable label such as `A`, `B`, or `phone-1`.
- `x`, `y`, `width`, `height`: provide integer pixel values.
- `padding`: optionally expand the rectangle on every side before clipping to image bounds.
- `effect`: optionally override the top-level effect for this region. Overrides apply only to `redact-regions`.

Effect fields:

- `type`: use `solid`, `pixelate`, or `blur`.
- `color`: set a CSS-compatible color for `solid`; default is `#111827`.
- `block_size`: set the approximate mosaic block size in pixels; default is `18`.
- `radius`: set the Gaussian blur radius; default is `16`.

## Mixed Effects

Use per-region overrides when one image contains different sensitivity levels:

```json
{
  "version": 1,
  "operation": "redact-regions",
  "effect": {"type": "solid", "color": "#111827"},
  "regions": [
    {"id": "face", "x": 40, "y": 35, "width": 160, "height": 180,
     "effect": {"type": "pixelate", "block_size": 20}},
    {"id": "api-key", "x": 280, "y": 410, "width": 520, "height": 42}
  ]
}
```

## Inverse Keep Mode

Use `keep-regions` when the user wants only selected content visible. The top-level effect applies to the entire image, then the listed rectangles are restored from the original:

```json
{
  "version": 1,
  "operation": "keep-regions",
  "effect": {"type": "solid", "color": "#111827"},
  "regions": [
    {"id": "product", "x": 320, "y": 140, "width": 640, "height": 520}
  ]
}
```

## Coordinate Discipline

1. Read the source dimensions before choosing coordinates.
2. Generate a preview after every manifest change.
3. Refer to region IDs in the confirmation conversation.
4. Expand boundaries slightly when text antialiasing, shadows, or QR quiet zones may leak information.
5. Do not reuse coordinates after resizing, rotating, scrolling, or recapturing the source.
