---
name: redact-sensitive-content
description: Redact sensitive content from local images and rasterized webpage screenshots with user-specified rectangles, semantic objects, automatically proposed regions, or inverse keep regions. Use when users ask to 打码、马赛克、模糊、遮挡、脱敏, hide faces, avatars, text, phone numbers, emails, IDs, QR codes, account details, API keys, or share a sanitized webpage screenshot. Require a numbered preview and user confirmation before final redaction unless the user explicitly requests direct execution.
---

# Redact Sensitive Content

Redact selected pixels without modifying the original. Use one manifest for both local images and webpage screenshots so preview, confirmation, application, and verification remain reproducible.

## Core Workflow

1. Resolve the source and preserve it unchanged. For a webpage, capture a stable raster screenshot before selecting regions.
2. Choose one selection mode:
   - `redact-regions`: redact only listed rectangles.
   - `keep-regions`: preserve listed rectangles and redact everything else.
   - Object/type request: propose rectangles for faces, text, codes, or other requested objects, then continue as `redact-regions`.
3. Inspect the source at its original pixel dimensions. Create a versioned JSON manifest with clear region IDs.
4. Run `scripts/redact_image.py preview`, show the numbered preview, and pause for confirmation. Apply requested additions, removals, padding, or boundary changes to the manifest and regenerate the preview.
5. Treat an explicit “确认”, “直接打码”, or equivalent instruction as authorization to apply. Run `scripts/redact_image.py apply` with `--confirmed`; never infer confirmation from silence.
6. Run `scripts/verify_redaction.py`, inspect the final image visually, and report any detector or OCR limitations. Deliver a new file rather than overwriting the source.

## Effect Selection

- Use `solid` for credentials, identity documents, financial data, private contact data, QR codes, or any security-sensitive disclosure. It is the only default suitable for irreversible redaction.
- Use `pixelate` for ordinary presentation privacy such as faces or avatars when the user requests a mosaic effect.
- Use `blur` only for cosmetic obscuring. State that blur is not secure redaction.
- If the user does not choose an effect, use `solid` for sensitive text and codes; use `pixelate` for faces and avatars. Split regions by effect when needed.

## Script Usage

Read [region-manifest.md](references/region-manifest.md) before creating or editing a manifest.

```bash
python3 scripts/redact_image.py preview input.png regions.json preview.png
python3 scripts/redact_image.py apply input.png regions.json output.redacted.png --confirmed
python3 scripts/verify_redaction.py input.png regions.json output.redacted.png
```

The scripts require Pillow. Prefer an already available workspace runtime; do not upload private inputs or install dependencies without authorization.

## Reference Routing

- **Manifest fields, coordinates, mixed effects, or inverse keep mode:** read [region-manifest.md](references/region-manifest.md).
- **URL, authenticated page, full-page capture, DOM selector, or viewport coordinate conversion:** read [web-capture.md](references/web-capture.md).
- **Automatic proposals, high-risk data, effect choice, metadata, or verification:** read [safety-and-verification.md](references/safety-and-verification.md).

## Guardrails

- Keep processing local unless the user explicitly authorizes a specific external destination.
- Do not alter the source file. Use a new preview and final output path.
- Do not use removable HTML/CSS overlays as final redaction; rasterize the page and change output pixels.
- Do not claim automatic face or OCR detection is exhaustive. Require visual review for high-risk material.
- Do not retain unnecessary unredacted temporary files. Report every created output path.

## Deliver

Return the confirmed output image, the manifest used, the applied effect for each region, verification results, and any unresolved uncertainty. For webpages, also report the captured URL state and viewport.
