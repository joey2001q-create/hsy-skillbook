# Anti-Design Rules

Use controlled conflict. Random values alone often produce a merely unfinished page; intentional ugliness requires repeated, visible violations of conventional harmony.

## Conflict Budget

Apply the minimum number of conflict dimensions for the selected level:

| Ugliness | Required dimensions | Expected result |
| ---: | ---: | --- |
| 1 | 2 | Slightly tacky but mostly conventional |
| 2 | 3 | Clearly inconsistent components and colors |
| 3 | 4 | Deliberately amateur and decoration-heavy |
| 4 | 6 | Comprehensive anti-design while remaining functional |
| 5 | 8 | Visual-accident intensity for art, experiments, or entertainment |

## Conflict Dimensions

### Color

- Use several saturated colors with no single harmonious family.
- Change foreground/background relationships between sections.
- Mix flat fills, hard gradients, tiled patterns, and colored borders.
- Keep essential labels readable even when surrounding colors clash.

### Typography

- Mix serif, sans-serif, monospace, display, and cursive stacks.
- Assign different stacks to neighboring sections or repeated components.
- Combine outlines, shadows, uppercase, underline, and inconsistent weights.
- Avoid scaling every heading identically; preserve text containment.

### Components

- Give repeated buttons visibly different borders, shadows, radii, or fills.
- Mix bevels, flat controls, double borders, and sticker-like treatments.
- Keep each control's role and state understandable despite the inconsistency.

### Spacing And Alignment

- Use a non-rhythmic spacing sequence instead of a unified 4/8px system.
- Offset selected sections, rotate decorations, and break perfect column alignment.
- Keep important text and controls inside stable responsive bounds.

### Decoration

- Use tiled patterns, starbursts, stripes, badges, clip-art-like assets, and excessive shadows.
- Let decoration compete for attention without covering required actions.
- Use actual subject-relevant images or media; do not rely only on abstract CSS noise.

### Motion

- Combine marquee-like translation, bounce, wobble, and mismatched durations.
- Animate decorative elements more aggressively than controls.
- Provide a static reduced-motion state and follow the safety limits in `usability-floor.md`.

## Implementation Discipline

1. Build functional semantic markup before applying conflict.
2. Generate and record anti-tokens with a stable seed.
3. Apply one dominant preset and at most two secondary preset cues.
4. Vary presentation through CSS classes or section-scoped variables rather than duplicated markup.
5. Keep the page deterministic; do not randomize on every render unless the user requests live chaos.
6. Check that the result does not accidentally converge on a fashionable brutalist or maximalist design.

## Ugliness Ledger

Record:

```text
preset / secondary cues:
ugliness / seed / usability mode:
color conflict:
typography conflict:
component conflict:
spacing and alignment conflict:
decoration and assets:
motion conflict:
desktop evidence:
mobile evidence:
required workflow result:
remaining tasteful or unintentionally broken areas:
```

Do not mark the work complete when the page is only unusual. A designer should be able to identify several specific conventions they would instinctively try to fix.
