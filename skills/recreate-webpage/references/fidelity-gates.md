# Fidelity Gates

## Required Checks

1. Page identity and visible copy match the reference state.
2. Major section geometry and first-viewport balance match.
3. Typography family, weight, size, line height, and wrapping match.
4. Background, text, border, shadow, and accent colors match.
5. Assets, crop, scale, layering, and transform origin match.
6. Every meaningful inventoried asset is visibly mapped or explicitly omitted, including transparent assets and their backing surfaces.
7. The exact page-end state matches at the same viewport: maximum scroll position, footer/endcap, bottom edge, and fixed/sticky overlays.
8. Every interaction inventory row has reference and rendered evidence for its rest, intermediate, settled, and recovery states where applicable.
9. Canvas/WebGL pass order, active input routes, coordinate mapping, and update cadence match or have explicit evidence-backed deviations.
10. Desktop and mobile audits have no unexplained result.
11. Console contains no relevant error or warning.
12. Lint, typecheck, and production build pass when configured.
13. The latest visual change has a fresh browser screenshot and geometry check; older evidence is not accepted as proof of the final state.

## Interaction Gate

Do not hand off an interactive page until all of these are true:

- Every visible control family was exercised in a real browser; code inspection alone does not count.
- Pointer effects were replayed with the same coordinates, speed, timestamps, and recovery period.
- Filters, tabs, and category controls were checked through selection, loading/dimming, exit, data/layout change, entry, and settled state.
- Menus and dialogs were checked through open, focus/expanded state, close, and repeated use.
- Item identity/count and DOM/ARIA state match the visible result.
- Mobile interaction paths were replayed independently instead of inferred from desktop.
- Any intentionally shortened network wait or changed target behavior is listed as a deviation.

A static screenshot score, a final-state screenshot, or a passing build cannot satisfy this gate by itself.

## Boundary Gate

Do not hand off a long page until all of these are true:

- Reference and implementation both have screenshots at the measured maximum scroll position in the same viewport.
- The penultimate viewport is also captured so missing endcaps, delayed reveals, or overlap cannot hide below the sampled section.
- Document height, footer bounds, last meaningful asset bounds, and fixed/sticky element positions are recorded.
- Full-page capture artifacts such as repeated sticky scenes or stale Canvas frames have been replaced with stepped viewport evidence.
- The boundary screenshots were captured after the latest relevant code or CSS change. Build output and older screenshots cannot validate a newer visual state.
- For a boundary detail such as a divider, capsule, glow, or endcap, record its owning DOM section and computed bounds; visual proximity alone is not sufficient.

## Fidelity Ledger

Record at least five rows:

| Check | Reference evidence | Rendered evidence | Result or fix |
| --- | --- | --- | --- |
| Layout | Screenshot/path/measurement | Screenshot/path/measurement | Match or change made |

Include interaction and responsive rows for interaction-level work.
Include page-boundary and asset-compositing rows for long pages or transparent brand assets.

## Claim Language

- Say `faithfully recreated at 1440x900` only after same-size comparison.
- Say `interaction path verified` only after replaying the same timestamped action, checking immediate and delayed states, and comparing against a no-input control when the page animates autonomously.
- Say `pixel-perfect` or `1:1` only when no material screenshot differences remain and all intentional deviations are disclosed.
- If the reference itself is broken at a viewport, say whether the implementation reproduced or intentionally corrected it.
