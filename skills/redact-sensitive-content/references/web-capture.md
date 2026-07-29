# Web Capture

Rasterize the requested page state before redaction. A CSS blur, DOM replacement, or floating overlay is reversible and does not remove the original value from the page.

## Capture Workflow

1. Use the available browser control surface and respect its authentication and confirmation rules. Do not bypass login, CAPTCHA, access control, or anti-automation measures.
2. Confirm the route, viewport, scroll position, open menus or dialogs, and whether the user needs the visible viewport or the full page.
3. Wait for the requested state to settle. Record the URL and viewport.
4. Capture a lossless PNG when possible. Preserve it as the immutable source for preview and final application.
5. Inspect the captured pixel dimensions before creating the region manifest.

## DOM-Selected Regions

When the user names a CSS selector or visible element:

1. Resolve exactly one intended element, or enumerate repeated matches with stable IDs.
2. Read each element's bounding rectangle in CSS pixels.
3. For a visible-viewport screenshot, use viewport-relative `x` and `y`.
4. For a full-page screenshot, add the document scroll offset to `x` and `y`.
5. Convert CSS coordinates to image pixels using the actual screenshot scale:

```text
scale_x = screenshot_pixel_width / captured_css_width
scale_y = screenshot_pixel_height / captured_css_height
pixel_x = css_x * scale_x
pixel_y = css_y * scale_y
```

6. Add padding for text shadows, borders, badges, and antialiasing.
7. Verify placement in the numbered preview. Do not trust coordinate conversion without visual confirmation.

## Dynamic Pages

- Freeze the exact page state before measuring regions.
- Re-measure after responsive changes, font loading, expansion, filtering, animation, or lazy loading.
- Avoid stitching independently captured states when sticky elements or virtualized lists can move.
- If the page changes before confirmation, recapture and regenerate the manifest rather than applying stale coordinates.

## Delivery Context

Report the URL, viewport, visible/full-page mode, important open UI state, screenshot path, and final redacted output path. Do not include cookies, tokens, or private DOM values in the report.
