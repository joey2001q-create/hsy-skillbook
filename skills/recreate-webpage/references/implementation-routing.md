# Implementation Routing

## Identify The Runtime

Inspect observable signals before choosing a library:

- DOM/CSS: element transforms, transitions, keyframes, and computed styles.
- Canvas: `<canvas>`, 2D context behavior, sprite sheets, and requestAnimationFrame.
- WebGL: WebGL context, model/texture assets, shader sources, and render loop.
- Three.js: runtime bundle signatures, `.glb`/`.gltf`, textures, HDR files, scene/camera behavior.
- Video: `<video>`, media URLs, current time, duration, and playback-driven visuals.
- Lottie: animation JSON and SVG/canvas renderer.

Do not convert a video effect to Canvas or a 3D scene to CSS merely because that is easier.

## Route By Behavior

| Observed behavior | Preferred implementation |
| --- | --- |
| Simple hover/fade/translate | CSS transition or keyframes |
| Pointer tilt of layered DOM | CSS perspective plus pointer-derived rotateX/rotateY |
| Scroll section activation | IntersectionObserver or scroll thresholds matching reference |
| Coordinated scroll timeline | GSAP ScrollTrigger |
| Spring layout motion | Existing framework motion library or Motion |
| Sprite animation | CSS steps or Canvas depending on reference |
| Procedural particles | Canvas/WebGL with a proven engine |
| Model lighting/camera | Three.js or React Three Fiber |
| GLSL deformation/flow | Three.js ShaderMaterial with observed uniforms |

## Interaction Fidelity

Match:

- Input mapping and clamping.
- Transform origin, perspective, and layer depth.
- Duration, delay, easing, and loop behavior.
- Pointer, touch, and device orientation inputs when observable.
- Reduced-motion fallback without breaking layout.

For pointer tilt, record the input equation when discoverable. Otherwise derive it from at least three measured points and clamp to observed extrema.
