import { useEffect, useRef } from 'react'

const heroImages = [
  { src: '/assets/osty/hero-vr.png', alt: 'Person with VR Headset' },
  { src: '/assets/osty/hero-stone.png', alt: 'Minimalist Stone Composition' },
  { src: '/assets/osty/hero-jar.png', alt: 'Whimsical Character in a Jar' },
  { src: '/assets/osty/hero-spoons.webp', alt: 'Three Scoops of Ice Cream on Spoons' },
  { src: '/assets/osty/hero-character.png', alt: 'Green Character in Yellow Hoodie' },
]

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value))

export function OstyHero() {
  const stackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stack = stackRef.current
    if (!stack || window.matchMedia('(pointer: coarse)').matches) return

    const items = Array.from(stack.querySelectorAll<HTMLElement>('.osty-hero-item'))
    let pointerX = 0
    let pointerY = 0
    let previousX = 0
    let previousY = 0
    let velocityX = 0
    let velocityY = 0
    let pointerReady = false
    let frame = 0

    const render = () => {
      frame = 0
      velocityX *= 0.86
      velocityY *= 0.86

      const stackBounds = stack.getBoundingClientRect()

      items.forEach((item) => {
        const centerX = stackBounds.left + item.offsetLeft + item.offsetWidth / 2
        const centerY = stackBounds.top + item.offsetTop + item.offsetHeight / 2
        const distance = Math.hypot(pointerX - centerX, pointerY - centerY)
        const influence = clamp(1 - distance / item.offsetWidth, 0, 1)
        const offsetX = 2 * clamp(velocityX * influence, -250, 250)
        const offsetY = 2 * clamp(velocityY * influence, -250, 250)
        const rotationVelocity = -0.35 * (offsetX - offsetY)

        item.style.setProperty('--osty-offset-x', offsetX.toFixed(3))
        item.style.setProperty('--osty-offset-y', offsetY.toFixed(3))
        item.style.setProperty('--osty-velocity', rotationVelocity.toFixed(3))
      })

      if (Math.abs(velocityX) > 0.025 || Math.abs(velocityY) > 0.025) {
        frame = window.requestAnimationFrame(render)
      } else {
        items.forEach((item) => {
          item.style.setProperty('--osty-offset-x', '0')
          item.style.setProperty('--osty-offset-y', '0')
          item.style.setProperty('--osty-velocity', '0')
        })
      }
    }

    const updatePointer = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY

      if (!pointerReady) {
        previousX = pointerX
        previousY = pointerY
        pointerReady = true
        return
      }

      velocityX += 0.9 * (pointerX - previousX)
      velocityY += 0.9 * (pointerY - previousY)
      previousX = pointerX
      previousY = pointerY

      if (!frame) frame = window.requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', updatePointer)
    }
  }, [])

  return (
    <section className="osty-hero" aria-labelledby="osty-heading">
      <h1 id="osty-heading">A place to display your<br className="osty-desktop-break" /> masterpiece</h1>
      <div className="osty-hero-stack" aria-label="Selected creative works" ref={stackRef}>
        {heroImages.map((image, index) => (
          <div className={`osty-hero-item osty-hero-item-${index + 1}`} key={image.src}>
            <img className="osty-hero-image" src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
      <p>Artists can display their masterpieces, and buyers can discover and purchase works<br className="osty-desktop-break" /> that resonate with them.</p>
      <div className="osty-hero-actions">
        <a className="osty-button osty-button-primary" href="#contact">Contact Me</a>
        <a className="osty-button osty-button-secondary" href="#projects">Discover Our Work</a>
      </div>
    </section>
  )
}
