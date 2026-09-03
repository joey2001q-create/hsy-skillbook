import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const noiseFunctions = `
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
`

const fluidFragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uDensity;
  uniform float uFrequency;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;

  ${noiseFunctions}

  void main() {
    float t = uTime * uSpeed;
    vec2 q = vec2(
      fbm(vUv * uDensity + vec2(0.0, 0.2 * t)),
      fbm(vUv * uDensity + vec2(1.2, -0.3 * t))
    );
    float value = fbm(vUv * uDensity + q * uFrequency);
    gl_FragColor = vec4(mix(uColor1, uColor2, value), 1.0);
  }
`

const pixelFragmentShader = `
  precision highp float;

  uniform sampler2D uFluidTexture;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  const vec3 green = vec3(0.196078, 0.941176, 0.549020);

  ${noiseFunctions}

  float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
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
    vec3 source = texture2D(uFluidTexture, sampleUv).rgb;
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

    const camera = new THREE.Camera()
    const geometry = new THREE.PlaneGeometry(2, 2)
    const resolution = new THREE.Vector2(1, 1)
    const drawingBufferSize = new THREE.Vector2(1, 1)
    const pointer = new THREE.Vector2(0.5, 0.5)
    const fluidTarget = new THREE.WebGLRenderTarget(1, 1, {
      depthBuffer: false,
      stencilBuffer: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    })

    const fluidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 0.18 },
        uDensity: { value: 0.5 },
        uFrequency: { value: 4.0 },
        uColor1: { value: new THREE.Color(0.196, 0.941, 0.549) },
        uColor2: { value: new THREE.Color(1, 1, 1) },
      },
      vertexShader,
      fragmentShader: fluidFragmentShader,
      depthTest: false,
      depthWrite: false,
    })
    const pixelMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uFluidTexture: { value: fluidTarget.texture },
        uTime: { value: 0 },
        uResolution: { value: resolution },
        uMouse: { value: pointer },
      },
      vertexShader,
      fragmentShader: pixelFragmentShader,
      depthTest: false,
      depthWrite: false,
    })

    const fluidScene = new THREE.Scene()
    fluidScene.add(new THREE.Mesh(geometry, fluidMaterial))
    const pixelScene = new THREE.Scene()
    pixelScene.add(new THREE.Mesh(geometry, pixelMaterial))

    const resize = () => {
      const width = Math.max(1, host.clientWidth)
      const height = Math.max(1, host.clientHeight)
      renderer.setSize(width, height, false)
      renderer.getDrawingBufferSize(drawingBufferSize)
      fluidTarget.setSize(drawingBufferSize.x, drawingBufferSize.y)
      resolution.set(width, height)
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    resize()

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startedAt = performance.now()
    let previousFrameAt = startedAt
    let pixelTime = 0
    let frameCount = 0
    let animationFrame = 0

    const renderFrame = (now: number) => {
      const delta = Math.max(0, (now - previousFrameAt) / 1000)
      previousFrameAt = now
      fluidMaterial.uniforms.uTime.value = reducedMotion ? 0.45 : (now - startedAt) / 1000
      frameCount += 1
      if (!reducedMotion && frameCount % 2 === 0) pixelTime += delta
      pixelMaterial.uniforms.uTime.value = reducedMotion ? 0.45 : pixelTime

      renderer.setRenderTarget(fluidTarget)
      renderer.render(fluidScene, camera)
      renderer.setRenderTarget(null)
      renderer.render(pixelScene, camera)
    }

    const onPointerMove = (event: MouseEvent) => {
      pointer.set(
        THREE.MathUtils.clamp(event.clientX / window.innerWidth, 0, 1),
        THREE.MathUtils.clamp(1 - event.clientY / window.innerHeight, 0, 1),
      )
      if (reducedMotion) renderFrame(performance.now())
    }
    window.addEventListener('mousemove', onPointerMove, { passive: true })

    const render = (now: number) => {
      renderFrame(now)
      if (!reducedMotion) animationFrame = requestAnimationFrame(render)
    }
    animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('mousemove', onPointerMove)
      resizeObserver.disconnect()
      geometry.dispose()
      fluidMaterial.dispose()
      pixelMaterial.dispose()
      fluidTarget.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="fluid-canvas" ref={hostRef} aria-hidden="true" />
}
