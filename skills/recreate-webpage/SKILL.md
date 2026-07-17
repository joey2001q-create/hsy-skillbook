---
name: recreate-webpage
description: Recreate a webpage as maintainable frontend code from a public URL, screenshots, recordings, Figma designs, or existing source. Use when Codex is asked to clone, reproduce, restore, or implement a webpage with high visual fidelity, responsive behavior, hover/click/scroll/drag interactions, animation, Canvas, WebGL, or Three.js effects, and when the result must be verified against reference evidence rather than judged from code alone.
---

# Recreate Webpage

Build an independent, maintainable implementation of the observable page. Treat visual fidelity and interaction replay as measurable requirements, not subjective polish.

## Select The Input Path

- Prefer a live URL because it exposes rendered DOM, computed styles, assets, responsive behavior, and interactions.
- Use screenshots or recordings when the page is unavailable. State which states and viewports cannot be inferred.
- When Figma is supplied, use it for exact geometry and tokens; use the live URL or prototype for runtime behavior.
- When source is supplied, preserve its framework and ownership boundaries unless the user requests migration.
- For authenticated pages, use a user-authorized browser session or an exported evidence bundle. Never request credentials or bypass access controls.

## Establish The Contract

Record before coding:

1. Target routes and page states.
2. Canonical desktop viewport and at least one mobile viewport.
3. Interaction paths: hover, pointer movement, click, scroll, drag, form state, media, animation, or 3D.
4. Exact visible copy and asset inventory.
5. Delivery format and framework constraints.
6. Any target defects that should be reproduced versus intentionally corrected.

If the user gives only a URL, default to the current page, its primary visible interactions, a 1440x900 desktop viewport, and a 390x844 mobile audit. Proceed autonomously unless a missing choice would materially change the result.

## Capture Reference Evidence

Use the installed Browser skill first when available. Read its instructions before browser actions.

1. Open the exact URL and confirm page title, URL, and meaningful DOM.
2. Capture the canonical viewport before scrolling.
3. Inventory DOM regions, computed layout, fonts, images, SVGs, stylesheets, video, Canvas, and WebGL.
4. Capture each major scroll state at a stable scroll position.
5. Exercise visible controls without causing external side effects.
6. For pointer effects, capture center and useful extremes; record the affected element's transform or state.
7. For animation, capture the initial state, representative intermediate state, and settled state.
8. For mobile, inspect the real target even if it is broken. Record target defects rather than silently designing around them.

Read [references/capture-protocol.md](references/capture-protocol.md) for the evidence schema and interaction matrix.

## Choose The Implementation

Match the observed mechanism when practical:

- DOM layout and simple motion: semantic React/HTML and CSS.
- Coordinated timeline or scroll motion: GSAP or the repository's existing motion system.
- Smooth scrolling: the target's observed behavior or a proven library such as Lenis.
- Vector animation: Lottie when the reference uses it.
- Particles and procedural 2D: Canvas with a proven engine when appropriate.
- 3D models and shader effects: Three.js or React Three Fiber.
- Video-backed effects: preserve video instead of approximating it with CSS.

Read [references/implementation-routing.md](references/implementation-routing.md) when Canvas, WebGL, 3D, media, or ambiguous animation is present.

Keep true UI text and controls code-native. Reuse assets that the user supplied or is authorized to reproduce. Do not ship the reference screenshot as the page implementation.

## Implement In Slices

1. Extract design tokens and component families from evidence.
2. Recreate the first viewport and compare it before continuing.
3. Implement downstream sections in scroll order.
4. Add interaction state and animation after static geometry matches.
5. Preserve stable responsive dimensions and the target container model.
6. Keep the application entry point as composition glue; split feature regions into focused components.

Do not add marketing sections, redesign the palette, replace exact assets with generic approximations, or improve target defects without recording the deviation.

## Verify The Result

The flow under test is: reference state -> recorded user action -> expected rendered state -> same action in the implementation -> visual and state comparison.

1. Start the implementation and use Browser verification first.
2. Check title/URL, nonblank DOM, framework overlays, and console errors.
3. Capture the implementation at the same viewport and interaction coordinates as the reference.
4. Run `scripts/compare_images.py` for same-sized screenshot pairs when Pillow is available.
5. Inspect the reference and implementation images directly; a numeric score does not replace visual judgment.
6. Keep a fidelity ledger with at least five concrete checks across layout, typography, color, spacing, assets/icons, interaction, and responsive behavior.
7. Fix visible drift and rerun the same capture. Do not stop after a passing build.

Read [references/fidelity-gates.md](references/fidelity-gates.md) before final handoff.

Example comparison:

```bash
python scripts/compare_images.py \
  evidence/reference/desktop.png \
  evidence/rendered/desktop.png \
  --diff evidence/rendered/desktop-diff.png
```

## Deliver

Provide:

- Runnable source code and assets.
- Reference and rendered screenshots for canonical states.
- Interaction paths exercised and their observed outcomes.
- Lint, typecheck, build, and browser verification results.
- Fidelity ledger and remaining intentional deviations.
- A clear statement of which viewport and interaction path is the fidelity baseline.

Never claim pixel-perfect or 1:1 completion without same-viewport visual comparison and explicit disclosure of material deviations.
