---
name: recreate-webpage
description: Recreate a webpage as maintainable frontend code from a public URL, screenshots, recordings, Figma, or existing source. Use for high-fidelity cloning of layout, responsive behavior, hover, pointer, click, filter, menu, scroll, drag, loading, timed animation, Canvas, WebGL, Three.js, or media, with browser evidence and same-state verification.
---

# Recreate Webpage

Recreate the observable page, including layout, motion, responsive behavior, interaction timing, and state changes. Treat browser evidence as the source of truth.

## Core Workflow

1. Lock the route, scope, canonical desktop/mobile viewports, visible copy, assets, and interaction inventory before coding.
2. Capture reference evidence in a real browser, including the first viewport, section boundaries, exact page end, and every distinct interaction state.
3. Extract tokens and component families, then implement and verify one continuous slice at a time. Keep text and controls code-native.
4. Replay the same inputs at the same viewport, coordinates, scroll position, and timestamps. Compare visual, geometry, DOM, ARIA, and recovery states.
5. Keep a current fidelity ledger. Run browser, console, lint, typecheck, and production-build gates before handoff.

## Reference Routing

Read only the references needed for the current task, but always read the capture and delivery references for live-page recreation.

- **Live URL, recording, or full-page capture:** read [capture-protocol.md](references/capture-protocol.md).
- **Hover, pointer, menu, filter, drag, scroll, loading, autoplay, or any timed behavior:** read [interaction-fidelity.md](references/interaction-fidelity.md).
- **Canvas, WebGL, Three.js, Rive, Lottie, video, shaders, public runtime assets, or ambiguous implementation mechanism:** read [implementation-routing.md](references/implementation-routing.md).
- **Existing recreation is incomplete, user reports missing content or rough interaction, or a prior pass must be corrected:** read [fidelity-recovery.md](references/fidelity-recovery.md).
- **A prior pass received visual feedback or a boundary/detail was placed incorrectly:** also read [lessons-learned.md](references/lessons-learned.md).
- **Before handoff or any 1:1 claim:** read [fidelity-gates.md](references/fidelity-gates.md).

## Defaults

If the user supplies only a URL, default to the current page, all primary visible interactions, a `1440x900` desktop viewport, and a `390x844` mobile viewport. Proceed unless a missing choice would materially change the result.

Preserve the target design. Record every intentional deviation, unavailable asset, corrected target defect, shortened wait, and unimplemented route.

## Deliver

Provide runnable source, current reference/rendered evidence, exercised interaction paths, validation results, the fidelity ledger, and remaining limitations. Never claim pixel-perfect or 1:1 completion without same-viewport, same-state comparison and no undisclosed material differences.
