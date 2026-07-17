import { useEffect, useRef } from 'react'
import { JufcloudHeader } from './JufcloudHeader'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function JufcloudHero() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onPointerMove = (event: PointerEvent) => {
      const rotateY = clamp((event.clientX - document.body.offsetWidth / 2) / 100, -9, 9)
      const rotateX = clamp(-(event.clientY - window.innerHeight / 2) / 100, -7, 7)
      scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  return (
    <div className="jufcloud-page">
      <section className="jufcloud-hero" id="jufcloud-top" aria-labelledby="jufcloud-heading">
        <div className="jufcloud-intro">
          <div className="jufcloud-scene" ref={sceneRef}>
            <JufcloudHeader />
            <h1 className="sr-only" id="jufcloud-heading">可能是最萌的云计算服务商</h1>
            <div className="jufcloud-title" aria-hidden="true">
              <span className="jufcloud-title-line jufcloud-title-line-one"><i /></span>
              <span className="jufcloud-title-line jufcloud-title-line-two" />
            </div>
            <i className="jufcloud-circuit-board" aria-hidden="true" />
            <i className="jufcloud-cut" aria-hidden="true" />
            <div className="jufcloud-character-box" aria-hidden="true">
              <i className="jufcloud-character-shadow" />
              <i className="jufcloud-character" />
            </div>
            <a className="jufcloud-start-button" href="#jufcloud-top">开始使用</a>
            <i className="jufcloud-light" aria-hidden="true" />
          </div>
        </div>
      </section>
    </div>
  )
}
