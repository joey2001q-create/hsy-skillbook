# Hero / Banner Fidelity

Read this reference when the request is limited to a homepage cover, hero, or banner, especially when the reference has a full-viewport layout or timed headline effects.

## Scope Lock

- Treat “只要横幅/封面” as a hard render boundary: implement the header, hero, visible proof/CTA controls, and any fixed edge controls that are visible in the audited viewport. Do not mount lower-page sections just because their assets were discovered.
- Record the exact audited viewport and the hero boundary before coding. A page can be visually close while still being wrong if the hero does not fill the reference viewport or if extra content changes the page height.
- Keep the reference asset inventory broader than the implementation scope. Assets from omitted sections may be documented as intentional omissions instead of being rendered.

## Evidence-First Build

1. Capture the reference at the canonical desktop and mobile sizes, including the settled hero, the next visible boundary, and the exact page height.
2. Inventory the logo, hero media, separators, fonts, transparent overlays, and fixed controls. Record natural dimensions and the rendered bounds of each used asset.
3. Implement the hero shell first: header height, full-width background, two-column or stacked grid, content max-width, and the visible lower-edge treatment. Do not polish animation before these bounds match.
4. Re-capture after every layout or asset change. A screenshot taken before the latest CSS, font, or asset load is stale evidence.

## Timed Headline Effects

For a typewriter, rotating word, deletion, or similar headline:

- Model the observable phases explicitly: entering, holding, exiting, and the next-word transition. Use the measured cadence and easing rather than a single text swap.
- Capture an idle control sequence and representative intermediate frames. A settled screenshot alone cannot prove that the effect is natural.
- Respect reduced motion by keeping the layout stable and showing a readable settled word; do not let the fallback change the hero height.

## Full-Viewport and Responsive Checks

- Verify desktop and mobile independently. Check `innerWidth`, `innerHeight`, `scrollHeight`, maximum scroll, hero bounds, title wrapping, image crop, menu state, and horizontal overflow.
- For desktop, compare the header-to-hero transition, content start position, hero image start/end bounds, and any right-edge quick links. For mobile, compare header collapse, title line breaks, image order/crop, and menu scroll lock.
- Use `min-height: 100svh` or an equivalent measured constraint only when it matches the reference; do not force viewport fill if the target intentionally ends earlier.

## Interaction and Handoff Gate

- Exercise every visible control in a browser: navigation dropdowns, mobile menu, CTA, quick links, and the headline animation. Verify open/close/repeat behavior and DOM/ARIA state.
- Keep local demo controls local unless the user explicitly requests external navigation. Document any intentionally inert or page-local behavior.
- Before handoff, compare fresh desktop and mobile screenshots, inspect the console, run lint/typecheck/build, and update the fidelity ledger with any intentional omission or deviation.

## Common Failure Patterns

- Building the entire discovered page before the requested hero is accepted, which introduces wrong page height and dilutes visual comparison.
- Treating a typewriter effect as a CSS text swap without checking deletion timing, intermediate width, or reduced-motion behavior.
- Assuming passing lint/build proves visual fidelity, or reusing screenshots captured before the final refresh.
- Using a generic image or font when the reference asset is public and discoverable; the crop, transparency, and font metrics often dominate perceived similarity.
