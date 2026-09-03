# Fidelity Lessons Learned

Use this reference after a first pass receives visual feedback such as “差很多”, “少东西”, “不丝滑”, or “某个边界效果不对”. These are recurring decision rules extracted from prior recreation work, not a requirement to copy one site's implementation.

## Why The First Pass Misses

- **The screenshot is mistaken for the contract.** A screenshot records one settled frame, but not the full page height, penultimate viewport, theme state, lazy content, or interaction choreography.
- **The visual owner is misidentified.** A divider, glow, capsule, overlay, or endcap can belong to the next section's boundary rather than the section above it. Putting it in the wrong component creates incorrect width, stacking, spacing, and responsive behavior even when it looks close in one viewport.
- **Reference and render states are not locked.** Comparing a light reference with a dark render, or different scroll positions, fonts, asset load states, or animation times, produces false conclusions and hides real ones.
- **Engineering checks are mistaken for visual checks.** Lint and build can pass while content is missing, an interaction is mechanical, or a fixed element is duplicated.
- **Evidence goes stale.** A screenshot captured before the latest CSS, asset, font, or dependency change cannot validate the new result.

## Recovery Rules

1. Freeze one reference tab and one implementation tab for each audited viewport. Record `innerWidth`, `innerHeight`, `scrollY`, `scrollHeight`, theme, reduced-motion state, and load state before comparing.
2. Compare structure before polish. Inventory section starts, boundaries, visible asset bounds, fixed/sticky elements, and the exact maximum scroll position. Use the penultimate viewport and exact bottom viewport for long pages.
3. For every mismatch, name the class before editing: missing content, geometry, typography, color, asset/compositing, mechanism, timing, side effect, responsive state, accessibility state, or stale evidence.
4. Trace boundary visuals to their owner. Inspect the DOM nesting and computed styles around the boundary; decide whether the line, capsule, glow, or endcap is rendered by the preceding section, the following section, or a shared wrapper. Implement it at that owner, not where it is merely visible.
5. After each visual edit, restart or refresh the relevant runtime as needed, recapture the changed state and its adjacent boundary, and re-check the same geometry. Do not continue from an old screenshot.
6. Exercise the actual interaction path in the browser. Capture rest, immediate, representative intermediate, settled, leave/close, and recovery states; verify DOM/ARIA and side effects in addition to pixels.
7. Re-audit desktop and mobile independently. A correct desktop boundary or menu does not prove the mobile layout, overlay, scroll lock, or page end.

## New API Boundary Example

For the New API footer transition, the observed contract was a `1px` footer top border with a centered short capsule. An initial implementation put a span inside the CTA, which made the line look plausible but gave it the wrong ownership and responsive geometry. Moving the capsule to a footer pseudo-element while keeping the border on the footer matched the reference at the exact bottom viewport. The transferable rule is to validate DOM ownership and boundary geometry, not to copy the nearest visible decoration into the preceding section.

## Completion Test

Before handoff, answer all of these with current evidence:

- Are reference and render captured at the same viewport, theme, scroll position, and settled load state?
- Does every visible section, asset, boundary effect, and fixed control have a mapped implementation or an explicit omission?
- Was the latest visual fix recaptured and compared after the browser refreshed the current code?
- Were browser interaction, console, lint, typecheck, build, and diff checks all run after the final edit?

