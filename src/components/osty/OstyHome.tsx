import { useEffect, useRef, useState } from 'react'
import { OstyFooter } from './OstyFooter'
import { OstyHeader } from './OstyHeader'
import { OstyHero } from './OstyHero'
import { OstyPortfolio } from './OstyPortfolio'

function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    let frame = 0
    let x = -80
    let y = -80
    const render = () => {
      frame = 0
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const update = (event: PointerEvent) => {
      x = event.clientX - 14
      y = event.clientY - 14
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', update, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', update)
    }
  }, [])

  return <div className="osty-cursor-ring" ref={ringRef} aria-hidden="true" />
}

export function OstyHome() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    document.body.classList.add('osty-route')
    return () => document.body.classList.remove('osty-route')
  }, [])

  return (
    <div className="osty-page" data-theme={darkMode ? 'dark' : 'light'} id="osty-top">
      <OstyHeader
        darkMode={darkMode}
        onSearch={setSearchTerm}
        onThemeToggle={() => setDarkMode((current) => !current)}
      />
      <OstyHero />
      <OstyPortfolio searchTerm={searchTerm} />
      <OstyFooter />
      <CursorRing />
    </div>
  )
}
