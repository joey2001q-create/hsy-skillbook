import { Bot, ChevronDown, Code2, Laptop, Menu, Monitor, Puzzle, Smartphone, X } from 'lucide-react'
import { Rive, RuntimeLoader, type StateMachineInput } from '@rive-app/canvas'
import { useEffect, useRef, useState } from 'react'

const navItems = ['企业版', '定价', '文档', '更新日志', '社区']
const LOGO_STATE_MACHINE = 'State Machine 1'

RuntimeLoader.setWasmUrl('/assets/trae/rive.wasm')

function TraeLogo({ scrolled }: { scrolled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollInputRef = useRef<StateMachineInput | null>(null)
  const latestScrolledRef = useRef(scrolled)
  const [riveReady, setRiveReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canvas || reduceMotion) return

    let rive: Rive | null = null
    const resize = () => rive?.resizeDrawingSurfaceToCanvas()
    rive = new Rive({
      src: '/assets/trae/logo.riv',
      canvas,
      stateMachines: LOGO_STATE_MACHINE,
      autoplay: true,
      shouldDisableRiveListeners: true,
      onLoad: () => {
        resize()
        scrollInputRef.current = rive?.stateMachineInputs(LOGO_STATE_MACHINE).find((input) => input.name === 'Scroll') ?? null
        if (scrollInputRef.current) scrollInputRef.current.value = latestScrolledRef.current
        setRiveReady(true)
      },
    })
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      scrollInputRef.current = null
      rive?.cleanup()
    }
  }, [])

  useEffect(() => {
    latestScrolledRef.current = scrolled
    if (scrollInputRef.current) scrollInputRef.current.value = scrolled
  }, [scrolled])

  return (
    <a className={`trae-logo ${scrolled ? 'trae-logo-compact' : ''} ${riveReady ? 'trae-logo-rive-ready' : ''}`} href="#hero" aria-label="TRAE 首页">
      <canvas className="trae-logo-canvas" ref={canvasRef} aria-hidden="true" />
      <span className="trae-logo-word" aria-hidden="true">TRAE</span>
      <span className="trae-logo-glyph" aria-hidden="true"><i /><i /></span>
    </a>
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileProductOpen, setMobileProductOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 120)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('trae-mobile-menu-open', menuOpen)
    return () => document.documentElement.classList.remove('trae-mobile-menu-open')
  }, [menuOpen])

  const closeMobileMenu = () => {
    setMenuOpen(false)
    setMobileProductOpen(false)
  }

  return (
    <header className={`site-header ${menuOpen ? 'site-header-menu-open' : ''}`}>
      <TraeLogo scrolled={scrolled} />

      <nav className="desktop-nav" aria-label="主导航">
        <div className="product-menu-wrap">
          <button className="product-link" type="button" aria-haspopup="menu">
            产品 <ChevronDown aria-hidden="true" size={14} strokeWidth={1.2} />
          </button>
          <div className="product-dropdown" role="menu" aria-label="产品">
            <a href="#trae-work" role="menuitem">
              <span className="product-icon"><Bot aria-hidden="true" size={17} /></span>
              <span><strong>TRAE Work <em>New</em></strong><small>AI 工作助手</small></span>
              <span className="product-platforms" aria-hidden="true"><Laptop size={14} /><Monitor size={14} /><Smartphone size={14} /></span>
            </a>
            <a href="#ide" role="menuitem">
              <span className="product-icon"><Code2 aria-hidden="true" size={17} /></span>
              <span><strong>TRAE IDE</strong><small>AI 专业编程工具</small></span>
            </a>
            <a href="#downloads" role="menuitem">
              <span className="product-icon"><Puzzle aria-hidden="true" size={17} /></span>
              <span><strong>TRAE 插件</strong><small>AI 编码助手</small></span>
            </a>
          </div>
        </div>
        {navItems.map((item) => <a href="#hero" key={item}>{item}</a>)}
        <a href="#hero" className="knowledge-link">知识库 <span>Hot</span></a>
      </nav>

      <div className="desktop-actions">
        <a className="header-button header-button-muted" href="#hero">登录</a>
        <a className="header-button header-button-primary" href="#downloads">下载中心</a>
      </div>

      <button
        className="menu-button"
        type="button"
        aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
        aria-expanded={menuOpen}
        title={menuOpen ? '关闭菜单' : '打开菜单'}
        onClick={() => {
          setMenuOpen((open) => {
            if (open) setMobileProductOpen(false)
            return !open
          })
        }}
      >
        {menuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
      </button>

      {menuOpen ? (
        <nav className="mobile-nav" aria-label="移动端导航">
          <div className="mobile-nav-actions">
            <a className="mobile-nav-download" href="#downloads" onClick={closeMobileMenu}>下载中心</a>
            <a className="mobile-nav-login" href="#hero" onClick={closeMobileMenu}>登录</a>
          </div>
          <button
            className="mobile-product-toggle"
            type="button"
            aria-expanded={mobileProductOpen}
            onClick={() => setMobileProductOpen((open) => !open)}
          >
            <span>产品</span>
            <ChevronDown aria-hidden="true" size={14} strokeWidth={1.2} />
          </button>
          {mobileProductOpen ? (
            <div className="mobile-product-menu">
              <a href="#trae-work" onClick={closeMobileMenu}>
                <span className="product-icon"><Bot aria-hidden="true" size={15} /></span>
                <strong>TRAE Work <em>New</em></strong>
                <span className="product-platforms" aria-hidden="true"><Laptop size={14} /><Monitor size={14} /><Smartphone size={14} /></span>
              </a>
              <a href="#ide" onClick={closeMobileMenu}>
                <span className="product-icon"><Code2 aria-hidden="true" size={15} /></span>
                <strong>TRAE IDE</strong>
              </a>
              <a href="#downloads" onClick={closeMobileMenu}>
                <span className="product-icon"><Puzzle aria-hidden="true" size={15} /></span>
                <strong>TRAE 插件</strong>
              </a>
            </div>
          ) : null}
          {navItems.map((item) => <a className="mobile-nav-link" href="#hero" key={item} onClick={closeMobileMenu}>{item}</a>)}
          <a className="mobile-nav-link mobile-knowledge-link" href="#hero" onClick={closeMobileMenu}>知识库 <span>Hot</span></a>
        </nav>
      ) : null}
    </header>
  )
}
