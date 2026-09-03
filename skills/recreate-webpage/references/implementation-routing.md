# Implementation Routing

## Identify The Runtime

Inspect observable signals before choosing a library:

- DOM/CSS: element transforms, transitions, keyframes, and computed styles.
- Canvas: `<canvas>`, 2D context behavior, sprite sheets, and requestAnimationFrame.
- WebGL: WebGL context, model/texture assets, shader sources, and render loop.
- Three.js: runtime bundle signatures, `.glb`/`.gltf`, textures, HDR files, scene/camera behavior.
- Multi-pass rendering: render targets, input textures, composer/effect order, and which pass reaches the screen.
- Video: `<video>`, media URLs, current time, duration, and playback-driven visuals.
- Lottie: animation JSON and SVG/canvas renderer.

Use the Browser asset inventory after lazy content loads. Inspect only discovered public runtime assets when observable behavior is ambiguous; `document.scripts` alone commonly omits active lazy chunks.

Do not convert a video effect to Canvas or a 3D scene to CSS merely because that is easier. Do not merge a multi-pass scene into one shader merely because constants and screenshots appear similar.

## Preserve Asset Compositing

- Treat the source asset and its surrounding composition as one observable contract. Recover the wrapper background, transparency, stacking order, blend mode, mask, crop, padding, and `object-fit`.
- Do not infer that a transparent asset is empty from its standalone preview. Inspect its alpha behavior or render it on light and dark test backgrounds.
- Use the natural asset ratio plus the measured rendered rectangle to distinguish `contain`, `cover`, cropping, and responsive scaling.
- For footer marks, brand endcaps, overlays, and transparent logos, verify the full composite at the actual page boundary. Loading the asset successfully does not prove that it is visible.
- Keep an asset-to-element map. An inventoried asset that is absent from the implementation must be explained in the fidelity ledger.

## Route By Behavior

| Observed behavior | Preferred implementation |
| --- | --- |
| Simple hover/fade/translate | CSS transition or keyframes |
| Pointer tilt of layered DOM | CSS perspective plus pointer-derived rotateX/rotateY |
| Velocity-driven layered DOM | Pointer deltas plus requestAnimationFrame state, per-element influence, damping, and observed spring return |
| Filter/category choreography | Explicit phase state machine with selection, loading, exit, data/layout swap, entry, and input locking |
| Scroll section activation | IntersectionObserver or scroll thresholds matching reference |
| Coordinated scroll timeline | GSAP ScrollTrigger |
| Spring layout motion | Existing framework motion library or Motion |
| Sprite animation | CSS steps or Canvas depending on reference |
| Procedural particles | Canvas/WebGL with a proven engine |
| Model lighting/camera | Three.js or React Three Fiber |
| GLSL deformation/flow | Three.js ShaderMaterial with observed uniforms |
| Render target plus postprocessing | Preserve the same pass graph with Three.js render targets or the target's proven composer |
| Transparent brand/endcap asset | Preserve its backing surface, alpha composition, sizing, and boundary placement |

## Interaction Fidelity

Match:

- Input mapping and clamping.
- Event target and normalization domain, such as viewport coordinates versus element-local coordinates.
- Separate immediate, eased, accumulated, or velocity-driven paths even when they originate from the same pointer event.
- Transform origin, perspective, and layer depth.
- Duration, delay, easing, and loop behavior.
- Render cadence, frame skipping, throttled updates, and pass order.
- Pointer, touch, and device orientation inputs when observable.
- Reduced-motion fallback without breaking layout.

Trace inputs end to end: event -> normalized value -> smoothing/state -> uniform or transform -> shader/consumer read. A written uniform that the shader never reads is not an active interaction path. Matching parameter values without matching this route is insufficient.

For pointer tilt, record the input equation when discoverable. Otherwise derive it from at least three measured points and clamp to observed extrema.

For filter or category motion, preserve observable phase order, stagger direction, container-height interpolation, loader lifetime, interruption policy, and final DOM/ARIA state. Do not substitute an immediate filtered render for a staged transition.
