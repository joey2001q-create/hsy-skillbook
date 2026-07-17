# Fidelity Gates

## Required Checks

1. Page identity and visible copy match the reference state.
2. Major section geometry and first-viewport balance match.
3. Typography family, weight, size, line height, and wrapping match.
4. Background, text, border, shadow, and accent colors match.
5. Assets, crop, scale, layering, and transform origin match.
6. Recorded interactions produce the expected state.
7. Desktop and mobile audits have no unexplained result.
8. Console contains no relevant error or warning.
9. Lint, typecheck, and production build pass when configured.

## Fidelity Ledger

Record at least five rows:

| Check | Reference evidence | Rendered evidence | Result or fix |
| --- | --- | --- | --- |
| Layout | Screenshot/path/measurement | Screenshot/path/measurement | Match or change made |

Include interaction and responsive rows for interaction-level work.

## Claim Language

- Say `faithfully recreated at 1440x900` only after same-size comparison.
- Say `interaction path verified` only after replaying the same action and checking the resulting state.
- Say `pixel-perfect` or `1:1` only when no material screenshot differences remain and all intentional deviations are disclosed.
- If the reference itself is broken at a viewport, say whether the implementation reproduced or intentionally corrected it.
