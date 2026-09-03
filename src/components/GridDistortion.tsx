import { useEffect, useRef } from 'react'
import {
  DataTexture,
  FloatType,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  Texture,
  TextureLoader,
  Vector4,
  WebGLRenderer,
} from 'three'

const GRID_SIZE = 15
const MOUSE_RADIUS = 0.25
const STRENGTH = 0.15
const RELAXATION = 0.9

export function GridDistortion() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const scene = new Scene()
    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    host.appendChild(renderer.domElement)

    const camera = new OrthographicCamera(0, 0, 0, 0, -1000, 1000)
    camera.position.z = 2
    const uniforms = {
      resolution: { value: new Vector4() },
      uTexture: { value: null as Texture | null },
      uDataTexture: { value: null as DataTexture | null },
    }

    const data = new Float32Array(4 * GRID_SIZE * GRID_SIZE)
    for (let index = 0; index < GRID_SIZE * GRID_SIZE; index += 1) {
      data[index * 4] = 255 * Math.random() - 125
      data[index * 4 + 1] = 255 * Math.random() - 125
    }

    const dataTexture = new DataTexture(data, GRID_SIZE, GRID_SIZE, RGBAFormat, FloatType)
    dataTexture.needsUpdate = true
    uniforms.uDataTexture.value = dataTexture

    const material = new ShaderMaterial({
      transparent: true,
      side: 2,
      uniforms,
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uDataTexture;
        uniform sampler2D uTexture;
        varying vec2 vUv;

        void main() {
          vec4 offset = texture2D(uDataTexture, vUv);
          gl_FragColor = texture2D(uTexture, vUv - 0.02 * offset.rg);
        }
      `,
    })
    const geometry = new PlaneGeometry(1, 1, GRID_SIZE - 1, GRID_SIZE - 1)
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    const texture = new TextureLoader().load('/assets/trae/footer-decoration.png', (loadedTexture) => {
      loadedTexture.minFilter = LinearFilter
      uniforms.uTexture.value = loadedTexture
    })

    const resize = () => {
      const width = host.offsetWidth
      const height = host.offsetHeight
      if (!width || !height) return
      const aspect = width / height
      renderer.setSize(width, height)
      mesh.scale.set(aspect, 1, 1)
      camera.left = -aspect / 2
      camera.right = aspect / 2
      camera.top = 0.5
      camera.bottom = -0.5
      camera.updateProjectionMatrix()
      uniforms.resolution.value.set(width, height, 1, 1)
    }

    const mouse = { x: 0, y: 0, prevX: 0, prevY: 0, velocityX: 0, velocityY: 0 }
    const onMouseMove = (event: MouseEvent) => {
      const rect = host.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = 1 - (event.clientY - rect.top) / rect.height
      mouse.velocityX = x - mouse.prevX
      mouse.velocityY = y - mouse.prevY
      Object.assign(mouse, { x, y, prevX: x, prevY: y })
    }
    const onMouseLeave = () => {
      dataTexture.needsUpdate = true
      Object.assign(mouse, { x: 0, y: 0, prevX: 0, prevY: 0, velocityX: 0, velocityY: 0 })
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0
    const render = () => {
      animationFrame = requestAnimationFrame(render)
      for (let index = 0; index < GRID_SIZE * GRID_SIZE; index += 1) {
        data[index * 4] *= RELAXATION
        data[index * 4 + 1] *= RELAXATION
      }

      if (!reduceMotion) {
        const gridMouseX = GRID_SIZE * mouse.x
        const gridMouseY = GRID_SIZE * mouse.y
        const radius = GRID_SIZE * MOUSE_RADIUS
        for (let row = 0; row < GRID_SIZE; row += 1) {
          for (let column = 0; column < GRID_SIZE; column += 1) {
            const distanceSquared = (gridMouseX - row) ** 2 + (gridMouseY - column) ** 2
            if (distanceSquared >= radius ** 2) continue
            const dataIndex = 4 * (row + GRID_SIZE * column)
            const influence = Math.min(radius / Math.sqrt(distanceSquared), 10)
            data[dataIndex] += 100 * STRENGTH * mouse.velocityX * influence
            data[dataIndex + 1] -= 100 * STRENGTH * mouse.velocityY * influence
          }
        }
      }

      dataTexture.needsUpdate = true
      renderer.render(scene, camera)
    }

    host.addEventListener('mousemove', onMouseMove)
    host.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)
    resize()
    render()

    return () => {
      cancelAnimationFrame(animationFrame)
      host.removeEventListener('mousemove', onMouseMove)
      host.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
      texture.dispose()
      dataTexture.dispose()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="footer-distortion-shell" aria-hidden="true">
      <div className="footer-distortion-content">
        <div className="footer-distortion-canvas" ref={hostRef} />
      </div>
    </div>
  )
}
