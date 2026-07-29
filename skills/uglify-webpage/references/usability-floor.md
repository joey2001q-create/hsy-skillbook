# Usability Floor

Visual incoherence is the requested feature. Functional failure is not, unless the user explicitly chooses `full-chaos` for an art or experiment context. Even `full-chaos` must preserve safety and data integrity.

## Modes

### Functional

- Preserve every required route, button, form, menu, filter, and data state.
- Keep critical labels, errors, prices, legal terms, and confirmation states readable.
- Keep keyboard order coherent and focus visible.
- Keep essential controls inside the viewport at desktop and mobile sizes.

### Full Chaos

- Allow misleading visual hierarchy, excessive decoration, intentionally awkward spacing, and nonstandard component presentation.
- Do not permit destructive ambiguity, hidden costs, keyboard traps, unreadable critical text, inaccessible authentication, or irreversible actions without confirmation.
- Use only when the user explicitly requests maximum chaos or an art/entertainment result.

## Motion Safety

- Respect `prefers-reduced-motion` and provide a static alternative.
- Keep flashing below 3 Hz; avoid large-area high-contrast flashing.
- Do not animate input position while the user is typing or a control is focused.
- Prevent motion from causing layout shift that blocks required actions.

## Responsive Floor

- Test at least one desktop and one mobile viewport.
- Prevent horizontal loss of critical content; decorative overflow may be clipped deliberately.
- Keep text within controls and preserve touch targets.
- Recompose dense desktop modules instead of shrinking the entire page below readability.

## Interaction Matrix

Verify every applicable state:

| Area | Required checks |
| --- | --- |
| Navigation | open, close, active route, keyboard access |
| Buttons | default, hover, focus, pressed, disabled, loading |
| Forms | label, input, validation, error, success, submission |
| Lists and filters | empty, selected, reset, overflow, mobile |
| Motion | initial, active, settled, reduced-motion |
| Media | loaded, failed, responsive crop, alt text |

## Browser Gate

Before delivery:

1. Confirm the page is nonblank and the intended route loads.
2. Check the console for relevant errors and warnings.
3. Exercise the primary workflow on desktop and mobile.
4. Inspect focus order and reduced-motion behavior.
5. Capture screenshots at the same states recorded in the ugliness ledger.
6. Separate intentional visual discomfort from accidental overlap, clipping, or broken functionality.

Do not use a passing build as proof that the page is both ugly and usable.
