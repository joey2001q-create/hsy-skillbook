# Fidelity Recovery Playbook

Use this reference when an existing recreation looks incomplete, the user reports missing sections or rough interaction, or a prior pass passed build checks but failed visual review.

## Why A First Pass Fails

- A screenshot is treated as the contract, so controls, intermediate states, long-page boundaries, and mobile-only states are never inventoried.
- A visually similar mechanism replaces the observed runtime: CSS instead of Rive, a basic slider instead of the active carousel engine, or a simplified shader instead of the real render path.
- Only the settled frame is checked. Button-triggered scrolling, drag inertia, velocity response, decay, focus, and close/recovery behavior remain invisible.
- Desktop is assumed to describe mobile. Full-screen navigation, touch controls, content order, and mobile-only expansion states are missed.
- An asset loading successfully is mistaken for correct composition. Visible content may still be padded, cropped, scaled, blurred, transparent, or backed by the wrong surface.
- Constants are copied without the complete runtime contract. Texture filters, pass order, event normalization, frame cadence, and the actual consumer can still differ.
- Evidence predates the latest CSS, asset, dependency, or interaction change.
- A dependency is added while the development server keeps stale prebundled modules, producing misleading runtime or duplicate-framework errors.

## Recovery Sequence

1. Freeze comparable browser states.
   - Keep one reference tab and one implementation tab per audited viewport.
   - Verify `innerWidth`, `innerHeight`, `scrollY`, and `scrollHeight` immediately before every comparison.
   - Never compare screenshots from tabs carrying different viewport overrides or stale scroll positions.
2. Rebuild the observable contract.
   - Measure the first viewport, absolute section starts, heading bounds, sticky/fixed regions, canvas/video bounds, the penultimate viewport, and the exact maximum scroll position.
   - Reinventory visible control families and mobile-only states. Unknown behavior remains a blocker.
3. Classify each mismatch.
   - Use: missing content, geometry, typography, color, asset/compositing, mechanism, timing, side effect, responsive state, accessibility state, or stale evidence.
   - Fix missing mechanisms and geometry before polishing minor color or antialiasing differences.
4. Inspect the active public runtime only where evidence is ambiguous.
   - Use observed page assets and lazy-loaded chunks; do not guess URLs.
   - Recover the actual engine, asset, state-machine names and inputs, carousel options, shader uniforms, texture filtering, coordinate mapping, and update cadence.
   - Treat a copied constant as insufficient until the same input reaches the same visual consumer.
5. Replay complete interactions.
   - Record pre-action, immediate, representative intermediate, settled, and recovery states.
   - Measure side effects such as `scrollY`, focus, expanded state, disabled state, item count, selected identity, element bounds, and document height.
   - Test button and drag paths separately; they may share a destination but not the same side effects.
6. Revalidate mobile independently.
   - Open, expand, collapse, close, and repeat menus or dialogs on the mobile viewport.
   - Verify scroll locking, overlays, hidden fixed controls, touch-sized targets, content order, and mobile page end.
7. Invalidate stale evidence after every relevant change.
   - Recapture the changed state and its adjacent boundary after CSS, assets, runtime code, fonts, or dimensions change.
   - Restart the development server after adding or changing dependencies, then use a fresh browser tab for console checks.
   - Keep the reference and implementation theme, reduced-motion preference, font load state, and animation timestamp aligned; a light-vs-dark or settled-vs-intermediate comparison is not actionable evidence.
8. Finish with clean gates.
   - Confirm page identity, nonblank DOM, no framework overlay, no relevant console error/warning, exact desktop/mobile boundaries, current screenshots, lint, typecheck, build, and repository diff checks.

## Failure Patterns And Corrective Checks

| Symptom | Likely missed contract | Corrective check |
| --- | --- | --- |
| Logo is close but never exact | Public Rive/Lottie/canvas asset was replaced with text or CSS | Inventory the observed asset, recover its animation/state-machine input, and verify both rest and scrolled states |
| Carousel changes slides but feels mechanical | Wrong engine, easing, scale, drag inertia, or button side effect | Replay button and drag separately; compare transforms, selected state, disabled state, and before/after `scrollY` |
| WebGL effect exists but blocks or trails look different | Texture filtering, pass order, coordinate mapping, or decay differs | Inspect active shader/runtime code and compare immediate plus recovery frames with one exact pointer trajectory |
| QR/logo/image is present but small or blurry | Canvas bounds were confused with visible-content bounds | Measure wrapper, media, and visible pixels separately; preserve crop and render sharp content at the observed size |
| Mobile menu opens but looks like a desktop dropdown | Mobile was inferred instead of captured | Record closed, full-screen open, nested expansion, close, scroll lock, and fixed-overlay behavior on mobile |
| Footer or final effect is missing | Near-bottom screenshot was mistaken for the page end | Capture the penultimate viewport and `scrollHeight - innerHeight` after lazy layout settles |
| Build passes while the page is still wrong | Engineering gates replaced visual acceptance | Require same-viewport screenshots and interaction evidence in addition to build checks |
| New dependency causes inconsistent runtime errors | Dev-server prebundle is stale | Restart the server, open a fresh tab, then rerun console and interaction checks |
| Divider, capsule, glow, or endcap is almost right but wrong at another viewport | Boundary visual was implemented in the nearest section instead of its DOM owner | Inspect nesting and computed styles at the boundary; move the visual to the owning section or shared wrapper, then recapture both adjacent viewports |
| Fix appears correct in the editor but the browser still shows the old result | Screenshot or tab predates the latest edit, or the dev server served stale modules | Refresh/restart, verify the current URL and build timestamp, then capture a fresh screenshot before judging |

## Dynamic Scene Discipline

- For autonomous or random scenes, compare an idle control sequence against the interaction sequence at matching elapsed times.
- Match the mechanism, bounds, palette, input route, and response/recovery timing; document unavoidable random-phase differences.
- Do not use a single-frame pixel score as proof for continuously animated Canvas, WebGL, video, or shader output.

## Stop Conditions

Do not hand off while any of these is true:

- A visible section, asset, control family, mobile state, or page-end element is missing.
- Reference and implementation viewports, scroll positions, or document heights are not confirmed equal.
- An interaction lacks intermediate, settled, or recovery evidence.
- Current evidence predates the latest relevant edit.
- A runtime mechanism is still a guess despite available public evidence.
- The console, lint, typecheck, build, or diff checks contain an unexplained failure.
