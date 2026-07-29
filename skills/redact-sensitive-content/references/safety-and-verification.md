# Safety and Verification

## Security Levels

Treat redaction effects as different guarantees:

| Effect | Appropriate use | Security note |
| --- | --- | --- |
| `solid` | Credentials, IDs, financial data, contact data, QR codes | Replaces target pixels and is the secure default |
| `pixelate` | Faces, avatars, presentation screenshots | May preserve recognizable structure |
| `blur` | Cosmetic obscuring | Can leak shapes and is not secure redaction |

Never describe blur or pixelation as irreversible protection. Use generous padding around text, QR codes, barcodes, and secrets.

## Region Proposal

Interpret requests in three ways:

- **Explicit geometry:** use user-provided rectangles directly after checking image dimensions.
- **Semantic object:** inspect the image and propose numbered boxes for requested objects such as faces, avatars, or codes.
- **Sensitive type:** use available local OCR or detectors to propose matches for phone numbers, emails, IDs, keys, or similar patterns.

Automatic proposals are candidates, not proof of complete coverage. Show the preview and say what was and was not detected. Never send private inputs to an external OCR or vision service without explicit authorization.

## Confirmation

Show a preview with stable region IDs. Accept adjustments such as:

- `删除 B`
- `A 向外扩 12 像素`
- `新增右下角二维码`
- `只保留 C，其余全部遮挡`

Regenerate the preview after any boundary or mode change. Apply only after explicit confirmation, unless the user's original instruction clearly requests direct execution without preview.

## Verification

After application:

1. Run `scripts/verify_redaction.py` to check dimensions, metadata, target pixel changes, and unintended outside changes for lossless outputs.
2. Inspect the final image at full resolution, especially rectangle edges and small text.
3. Re-run available local OCR or detectors on the final image for high-risk text or codes.
4. Confirm that the final file contains no EXIF metadata.
5. Prefer PNG or lossless WebP. JPEG recompression changes pixels outside the target and weakens exact verification.
6. Keep the source unchanged and disclose any uncertainty or unsupported detector class.

The verification script cannot prove that every sensitive object was selected. Selection completeness remains a visual and semantic review obligation.
