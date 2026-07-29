---
name: uglify-webpage
description: Build a deliberately ugly webpage from a brief or restyle an existing frontend while preserving required functionality. Use when users ask for 丑网站、花花绿绿、土味、审美灾难、反设计、故意不协调, Geocities, early-web, discount-mall, office-art, portal-2005, rainbow-chaos, or intentionally bad visual taste. Produce controlled, reproducible visual conflict with a preset, ugliness level, seed, browser evidence, and a usability floor rather than random broken code.
---

# Uglify Webpage

Create intentional visual failure with reliable engineering. Break aesthetic harmony, not the user's required workflow.

## Core Workflow

1. Choose `create` or `uglify-existing`. Lock the content, routes, controls, data behavior, and framework that must keep working.
2. Choose a preset, `ugliness` level from 1 to 5, a reproducible seed, and `functional` or `full-chaos` usability mode. Record every choice.
3. Generate anti-design tokens with `scripts/generate_ugly_tokens.mjs`. Use the output as a constraint source, not as permission to ignore the target domain.
4. Build semantic structure and complete interactions first. Then satisfy the selected level's conflict budget across color, typography, component treatment, spacing, borders, decoration, alignment, or motion.
5. Use actual visual assets appropriate to the subject. Prefer user-provided, generated, original, or clearly reusable assets; use bundled patterns and stickers only when they fit the selected preset.
6. Verify desktop and mobile in a real browser. Check DOM, console, keyboard operation, reduced motion, overflow, text visibility, and every required interaction.
7. Keep an ugliness ledger. Prove that the result is deliberately incoherent and still satisfies the chosen usability mode.

## Reference Routing

- **Before visual implementation:** read [anti-design-rules.md](references/anti-design-rules.md).
- **When choosing or mixing a style:** read [ugliness-presets.md](references/ugliness-presets.md).
- **Before browser handoff, or whenever motion, readability, forms, navigation, or mobile behavior is involved:** read [usability-floor.md](references/usability-floor.md).

## Defaults

If the user gives no controls, use:

```yaml
mode: create
preset: rainbow-chaos
ugliness: 4
seed: auto-generated-and-recorded
usability: functional
```

Generate tokens with:

```bash
node scripts/generate_ugly_tokens.mjs \
  --mode create \
  --preset rainbow-chaos \
  --ugliness 4 \
  --seed 2026 \
  --usability functional \
  --format css \
  --output ugly-tokens.css
```

For an existing project, preserve its framework and behavioral ownership boundaries. Do not redesign it into a tasteful brutalist page; the output must retain obvious visual conflict.

## Guardrails

- Keep source code maintainable even when visual tokens are intentionally inconsistent.
- Never ship a screenshot as the page implementation.
- Do not create broken buttons, unreadable critical instructions, inaccessible forms, keyboard traps, dangerous flashing, hidden checkout terms, fake trust claims, or deceptive urgency.
- Respect `prefers-reduced-motion`; cap repeated flashing below 3 Hz and avoid flashing entirely when the user requests safety-sensitive output.
- Prevent essential controls from overlapping or leaving the viewport. Decorative collisions may be intentional only when they do not block required actions.
- Do not explain the anti-design rules inside the rendered page unless that text belongs to the requested content.

## Deliver

Provide runnable source, the preset, ugliness level, seed, generated anti-tokens, desktop/mobile screenshots, exercised interaction paths, validation results, the ugliness ledger, and remaining limitations. State whether the result uses `functional` or `full-chaos` mode.
