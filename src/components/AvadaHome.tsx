import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, ShoppingCart, Sparkle, Store, X } from 'lucide-react'
import './avada.css'

const rotatingWords = ['WordPress', 'Online Store', 'Creative', 'Portfolio']

function RotatingTitle() {
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const delay = phase === 'enter' ? 720 : phase === 'hold' ? 1200 : 520
    const timer = window.setTimeout(() => {
      if (phase === 'exit') setWordIndex((index) => (index + 1) % rotatingWords.length)
      setPhase(phase === 'enter' ? 'hold' : phase === 'hold' ? 'exit' : 'enter')
    }, delay)
    return () => window.clearTimeout(timer)
  }, [phase])

  return (
    <span className="avada-title-rotating" aria-live="polite">
      <span className={`avada-rotating-word avada-rotating-${phase}`} key={rotatingWords[wordIndex]}>{rotatingWords[wordIndex]}</span>
    </span>
  )
}

function AvadaHeader({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const navItems = [
    { name: 'Avada', href: '#top', children: [{ name: 'Website Builder', href: '#builders' }, { name: 'Features', href: '#features' }] },
    { name: 'Avada For', href: '#avada-for', children: [{ name: 'Beginners', href: '#avada-for' }, { name: 'Marketers', href: '#avada-for' }, { name: 'Professionals', href: '#avada-for' }] },
    { name: 'Hosting', href: '#features' },
    { name: 'Customization', href: '#builders' },
    { name: 'Resources', href: '#support', children: [{ name: 'Support', href: '#support' }, { name: 'FAQs', href: '#faq' }] },
  ]
  return <header className="avada-header">
    <a className="avada-logo" href="#top" aria-label="Avada 首页"><img src="/assets/avada/avada-logo.svg" alt="Avada" /></a>
    <nav className={`avada-nav ${open ? 'is-open' : ''}`} id="avada-nav" aria-label="主导航">
      {navItems.map((item) => <div className="avada-nav-item" key={item.name}><a href={item.href} onClick={onToggle}>{item.name}{item.children && <ChevronDown size={14} aria-hidden="true" />}</a>{item.children && <div className="avada-nav-dropdown">{item.children.map((child) => <a href={child.href} onClick={onToggle} key={child.name}>{child.name}</a>)}</div>}</div>)}
    </nav>
    <div className="avada-header-actions"><a className="avada-header-cta" href="#contact"><Sparkle size={20} fill="currentColor" aria-hidden="true" /> My Avada</a><button className="avada-menu-toggle" onClick={onToggle} aria-expanded={open} aria-controls="avada-nav" aria-label={open ? '关闭菜单' : '打开菜单'}>{open ? <X size={27} /> : <Menu size={27} />}</button></div>
  </header>
}

export function AvadaHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="avada-page" id="top">
    <AvadaHeader open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} />
    <main>
      <section className="avada-hero" aria-labelledby="avada-hero-title">
        <div className="avada-hero-copy">
          <h1 id="avada-hero-title"><span>The Ultimate</span><span><RotatingTitle /></span><span>Website Builder</span></h1>
          <p className="avada-hero-description">Trusted by beginners, marketers &amp; professionals;<br className="avada-desktop-break" /> Built with usability and performance in mind.</p>
          <a className="avada-primary-button" href="#top">Start Designing <ArrowRight size={19} /></a>
          <div className="avada-hero-proof"><img src="/assets/avada/small-separator.png" alt="" /><div className="avada-hero-stats"><div><strong>1,050,000+</strong><span>People Trust Avada</span></div><div><strong>26,595+</strong><span>Average 5-Star Reviews</span></div></div></div>
        </div>
        <div className="avada-hero-media"><img src="/assets/avada/hero.jpg" alt="Avada 可视化网站构建器界面" /></div>
      </section>
    </main>
    <aside className="avada-quick-links" aria-label="Avada 快捷链接"><a href="#top" title="回到封面顶部"><Store size={25} /><span>Prebuilts</span></a><a href="#top" title="回到封面顶部"><ShoppingCart size={25} /><span>Buy Now</span></a></aside>
  </div>
}
