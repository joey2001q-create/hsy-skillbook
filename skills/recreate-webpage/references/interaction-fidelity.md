# Interaction Fidelity

Use this protocol for any time-dependent behavior: hover, focus, pointer-driven DOM, filters, tabs, menus, dialogs, loaders, layout reflow, scroll effects, Canvas, WebGL, Three.js, particles, media, or autonomous animation.

## Capture The Whole State Sequence

Lock viewport, device scale factor, scroll position, reduced-motion state, loaded assets, and initial UI state. Capture enough frames to identify the mechanism, not only the final result.

| Interaction | Required sequence |
| --- | --- |
| Hover/focus | rest -> immediate enter/focus -> stable active -> leave/blur -> rest |
| Pointer motion | idle control -> timestamped trajectory -> first response -> delayed response -> stop -> recovery |
| Filter/tab/category | idle -> click -> marker/selection -> dim/loading -> exit -> data/layout swap -> entry -> settled |
| Menu/dialog | closed -> trigger -> opening -> open and focus state -> closing -> closed |
| Scroll effect | exact scroll positions before, during, and after activation |
| Autonomous motion | matching elapsed frames with and without user input; loop cadence or settled state |

Record DOM, computed transform/opacity/clip, item count, container geometry, disabled state, `aria-expanded`, `aria-pressed`, and `aria-busy` where applicable. Visual evidence alone cannot prove that data or accessibility state changed correctly.

## Recover The Input And Timing Contract

Trace each behavior end to end:

```text
event target -> coordinate/state mapping -> clamp -> smoothing or phase state -> visual consumer -> recovery
```

Distinguish these mechanisms before implementing:

- Position-driven versus velocity-driven pointer motion.
- Immediate versus eased, accumulated, damped, or spring return paths.
- Per-element distance influence versus one global transform.
- CSS transition/keyframes versus `requestAnimationFrame` or a motion library.
- Local data change versus a real network wait.
- Opacity-only change versus clip/mask, stagger, layout height, or reordering.

For pointer effects, replay one exact trajectory and capture rest, first response, representative delayed states such as `250ms` and `950ms`, and recovery. Repeat the timestamps without input when the page moves autonomously.

For category or filter transitions, model the observed phases explicitly. A common contract is:

```text
idle -> selection -> dimming/loading -> closing -> data swap/layout resize -> opening -> idle
```

Do not collapse this into a direct array filter if the reference visibly stages the transition. Disable repeated input during non-interruptible phases and verify the final selected, busy, item, and layout states.

## Recover Advanced Runtime Details

After lazy content is visible, inventory active public assets and runtime chunks again. For Canvas, WebGL, or media, record:

- Ordered render graph and which pass reaches the screen.
- Event target and viewport- versus element-local normalization.
- Immediate and eased input routes consumed by each pass.
- Uniforms or state actually read by the renderer.
- `requestAnimationFrame`, throttling, frame skipping, fixed-step updates, and post-input decay.

Preserve separate passes or input routes when they differ in texture, timing, blending, or consumers. Matching constants is not proof of equivalent behavior.

## Common Failure Modes

- **Static-first tunnel vision:** finishing layout before inventorying interactions makes motion look optional. Block coding until the interaction matrix exists.
- **Settled-only capture:** a before/after pair misses loaders, dimming, stagger, clipping, and layout reflow. Capture intermediate timestamps.
- **Hover declaration as evidence:** CSS containing `:hover` does not prove the rendered state matches. Exercise it in the browser.
- **Position substituted for velocity:** cards may move but feel wrong. Compare the same fast and slow pointer trajectory plus recovery.
- **Selection substituted for filtering:** a marker can move while the grid remains unchanged. Verify item identity, count, container height, and busy state.
- **Network delay copied blindly:** preserve the visible choreography, but document intentional wait shortening when local data has no real request.
- **Desktop evidence reused for mobile:** touch controls and motion policies differ. Replay the mobile path independently.

Translate subjective feedback into observable checks: lag means first-response timing or smoothing; floatiness means decay/easing; mechanical motion means missing secondary paths, distance weighting, stagger, or transform-origin behavior.

An interaction passes only when the same input produces matching immediate, intermediate, settled, and recovery states, with any deviation recorded in the fidelity ledger.
