import { useEffect, useRef } from 'react'
import { SiteHeader } from './SiteHeader'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const updateTilt = (x: number, y: number) => {
      const rotateY = clamp((x - document.body.offsetWidth / 2) / 100, -9, 9)
      const rotateX = clamp(-(y - window.innerHeight / 2) / 100, -7, 7)
      scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
    const onPointerMove = (event: PointerEvent) => updateTilt(event.clientX, event.clientY)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-intro">
        <div className="hero-scene" id="hero-scene" ref={sceneRef}>
          <SiteHeader />
          <h1 className="sr-only" id="hero-heading">可能是最萌的云计算服务商</h1>
          <div className="hero-title" aria-hidden="true">
            <span className="title-line title-line-one"><i /></span>
            <span className="title-line title-line-two" />
          </div>
          <i className="circuit-board" aria-hidden="true" />
          <i className="hero-cut" aria-hidden="true" />
          <div className="character-box" aria-hidden="true">
            <i className="character-shadow" />
            <i className="character" />
          </div>
          <a className="start-button" href="#top">开始使用</a>
          <i className="hero-light" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
