import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  const vec3 green = vec3(0.196078, 0.941176, 0.549020);

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = a.x > a.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(
      dot(a, hash(i)),
      dot(b, hash(i + o)),
      dot(c, hash(i + 1.0))
    );
    return dot(n, vec3(70.0));
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 3; i++) {
      value += amplitude * noise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value * 0.5 + 0.5;
  }

  float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  vec2 fluidWarp(vec2 uv) {
    float t = uTime * 0.18;
    return vec2(
      fbm(uv * 0.5 + vec2(0.0, 0.2 * t)),
      fbm(uv * 0.5 + vec2(1.2, -0.3 * t))
    );
  }

  vec3 fluidColor(vec2 uv) {
    vec2 q = fluidWarp(uv);
    float value = fbm(uv * 0.5 + q * 4.0);
    return mix(green, vec3(1.0), value);
  }

  vec2 pixelFlow(vec2 uv) {
    float t = uTime * 0.15;
    vec2 q = vec2(
      fbm(uv * 1.5 + vec2(0.0, 0.2 * t)),
      fbm(uv * 1.5 + vec2(1.2, -0.3 * t))
    );
    vec2 flow = vec2(q.x * 0.3, q.y * 0.7) * 2.0;
    flow.x *= 0.5;
    flow.y *= 1.5;
    return flow;
  }

  void main() {
    const float pixelSize = 5.0;
    const float pixelGap = 2.0;
    const float threshold = 0.87;
    const float greenRatio = 0.49;
    const float mouseRadius = 0.3;
    const float mouseStrength = 1.3;

    vec2 pixelCoord = vUv * uResolution;
    float totalSize = pixelSize + pixelGap;
    vec2 blockId = floor(pixelCoord / totalSize);
    vec2 blockPos = blockId * totalSize;
    vec2 posInBlock = pixelCoord - blockPos;

    if (posInBlock.x > pixelSize || posInBlock.y > pixelSize) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }

    vec2 blockCenter = blockPos + vec2(pixelSize * 0.5);
    vec2 blockCenterUv = blockCenter / uResolution;
    vec2 sampleUv = (blockCenter - pixelFlow(blockCenterUv) * 35.0) / uResolution;
    vec3 source = fluidColor(sampleUv);
    float brightness = (source.r + source.g + source.b) / 3.0;
    float rand = random(blockId);
    float dynamicThreshold = threshold - 0.08 * rand;

    if (brightness <= dynamicThreshold) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }

    float mouseFactor = (1.0 - smoothstep(0.0, mouseRadius, distance(blockCenterUv, uMouse))) * mouseStrength;
    vec3 base = rand < greenRatio ? green : vec3(1.0);
    vec3 alternate = rand < greenRatio ? vec3(1.0) : green;
    gl_FragColor = vec4(mix(base, alternate, clamp(mouseFactor, 0.0, 1.0)), 1.0);
  }
`

export function FluidPixelCanvas() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(1.2, Math.max(0.8, window.devicePixelRatio)))
    renderer.setClearColor(0x000000, 1)
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    const resolution = new THREE.Vector2(1, 1)
    const pointer = new THREE.Vector2(0.5, 0.5)
    const easedPointer = pointer.clone()
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: resolution },
        uMouse: { value: easedPointer },
      },
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    })
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const resize = () => {
      const width = Math.max(1, host.clientWidth)
      const height = Math.max(1, host.clientHeight)
      renderer.setSize(width, height, false)
      resolution.set(width, height)
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    resize()

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      pointer.set(
        THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width, 0, 1),
        THREE.MathUtils.clamp(1 - (event.clientY - rect.top) / rect.height, 0, 1),
      )
    }
    host.addEventListener('pointermove', onPointerMove, { passive: true })

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startedAt = performance.now()
    let animationFrame = 0
    const render = (now: number) => {
      material.uniforms.uTime.value = reducedMotion ? 0.45 : (now - startedAt) / 1000
      easedPointer.lerp(pointer, 0.08)
      renderer.render(scene, camera)
      if (!reducedMotion) animationFrame = requestAnimationFrame(render)
    }
    animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      host.removeEventListener('pointermove', onPointerMove)
      resizeObserver.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="fluid-canvas" ref={hostRef} aria-hidden="true" />
}
