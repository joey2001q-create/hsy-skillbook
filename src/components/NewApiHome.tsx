import { useEffect, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'
import newApiFragmentShader from '../newapi-fragment.glsl?raw'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Activity,
  ChartNoAxesColumnIncreasing,
  Check,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Languages,
  Menu,
  Monitor,
  Moon,
  Search,
  Share2,
  Sun,
  Star,
  X,
  WandSparkles,
  UserRound,
  Zap,
} from 'lucide-react'

const asset = (name: string) => `/assets/newapi/${name}`

function BlackHoleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uCenter: { value: new THREE.Vector2(0.34, 0.04) },
      uSeed: { value: Math.random() * 100 },
      uTintA: { value: new THREE.Vector3(0.349, 0.859, 0.933) },
      uTintB: { value: new THREE.Vector3(0.988, 0.451, 0.749) },
      uTintC: { value: new THREE.Vector3(0.42, 0.298, 1) },
    }
    const material = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader: 'precision highp float; attribute vec3 position; attribute vec2 uv; varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}',
      fragmentShader: newApiFragmentShader,
      depthTest: false,
      depthWrite: false,
    })
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    const startTime = performance.now()
    let raf = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height, false)
      uniforms.uResolution.value.set(canvas.width, canvas.height)
      uniforms.uCenter.value.set(rect.width < 1024 ? 0 : 0.34, rect.width < 1024 ? 0.26 : 0.04)
    }
    const draw = () => {
      uniforms.uMouse.value.x += (pointer.current.x - uniforms.uMouse.value.x) * 0.045
      uniforms.uMouse.value.y += (pointer.current.y - uniforms.uMouse.value.y) * 0.045
      uniforms.uTime.value = reduced ? 1.2 : (performance.now() - startTime) / 1000
      renderer.render(scene, camera)
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    resize()
    draw()
    const onPointerMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1),
      }
    }
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="newapi-blackhole"
      aria-label="动态黑洞背景"
    />
  )
}

const apps = [
  ['f76d3ba9eb1b3c6e.svg', 'LangChain'], ['8d88587afef9d6ea.svg', 'Cline'], ['f4782670cb08cf21.svg', 'Open WebUI'], ['070d5b2f177f6204.svg', 'Dify'],
  ['379584f7b145a11b.svg', 'LobeHub'], ['d703a40647046947.svg', 'FastGPT'], ['3a6057403aecf7f4.svg', 'Cherry Studio'], ['0be1df76776fdec1.svg', 'n8n'], ['4aa6bc93cf40dc5b.svg', 'Roo Code'], ['89cec067c33514c7.svg', 'Coze'],
]

const partners = [
  ['2211f746c044712a.png', 'Cherry Studio', ''], ['f0e6a6608c6249f7.png', 'AionUI', ''], ['24459d12f515e476.svg', '北京大学大数据研究院', '北京大学大数据研究院'],
  ['3076a3d564a4ae59.png', '优云智算', ''], ['e58900f9b61abb8b.svg', '阿里云', '阿里云'], ['a0dbd8ec8ceef9e4.svg', 'IO.NET', ''],
]

type ThemeMode = 'system' | 'light' | 'dark'

function Header({ onMenu, menuOpen, theme, onThemeChange }: { onMenu: () => void; menuOpen: boolean; theme: ThemeMode; onThemeChange: (theme: ThemeMode) => void }) {
  const [languageOpen, setLanguageOpen] = useState(false)
  const themes: ThemeMode[] = ['system', 'light', 'dark']
  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor
  return (
    <header className="newapi-header">
      <a href="#top" className="newapi-brand"><img className="newapi-brand-logo" src={asset('52a63677f422e19c')} alt="" /><span>New API</span></a>
      <nav className="newapi-nav" aria-label="主导航">
        <a className="active" href="#top">首页</a><a href="#capabilities">插件</a><a href="#steps">文档</a>
      </nav>
      <div className="newapi-actions">
        <button className="newapi-control theme-control" onClick={() => onThemeChange(themes[(themes.indexOf(theme) + 1) % themes.length])} aria-label={`Switch theme (current: ${theme})`} title={`Theme: ${theme}`}><ThemeIcon size={16} /><span>{theme === 'system' ? '系统' : theme === 'light' ? '浅色' : '深色'}</span></button>
        <div className="newapi-language-wrap">
          <button className="newapi-control" onClick={() => setLanguageOpen(!languageOpen)} aria-label="语言" aria-expanded={languageOpen}><Languages size={16} /><span>简体中文</span><ChevronDown size={14} /></button>
          {languageOpen && <div className="newapi-language-menu" role="menu"><div className="newapi-language-title">语言</div><button role="menuitem">English</button><button role="menuitem">简体中文 <small>Chinese (Simplified)</small><Check className="newapi-language-check" size={16} /></button></div>}
        </div>
        <button className="newapi-menu-button" onClick={onMenu} aria-label={menuOpen ? 'Close menu' : 'Menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </header>
  )
}

function ProviderNetwork() {
  const providerLogos = [
    ['4b961c44a3d026b1.svg', 'OpenAI'],
    ['ab839f5a9e4d3d09.svg', 'Anthropic'],
    ['3bc916143e34d4ae.svg', 'Google Gemini'],
    ['6100162baf3cf91c.svg', 'DeepSeek'],
    ['2d57dcc6fcfb5753.svg', 'Meta'],
  ]
  return <div className="provider-network" aria-label="New API 连接多个模型服务商">
    <svg className="provider-beams" viewBox="0 0 500 300" aria-hidden="true">
      <defs>{providerLogos.map(([, name], index) => <linearGradient key={name} id={`provider-beam-${index}`} x1="0" x2="1"><stop offset="0" stopColor="#9c40ff" stopOpacity="0" /><stop offset=".5" stopColor={index % 2 ? '#6e9cff' : '#ef73c6'} /><stop offset="1" stopColor="#9c40ff" stopOpacity="0" /></linearGradient>)}</defs>
      {providerLogos.map(([, name], index) => {
        const y = 38 + index * 56
        const path = `M 436,${y} Q 333,${y} 230,150`
        return <g key={name}><path className="provider-beam-base" d={path} /><path className="provider-beam-flow" d={path} stroke={`url(#provider-beam-${index})`} strokeWidth="2" strokeLinecap="round" /></g>
      })}
    </svg>
    <div className="provider-network-side provider-network-user"><span className="provider-network-node"><UserRound size={22} /></span></div>
    <div className="provider-network-center"><span className="provider-network-node provider-network-brand"><img src={asset('13774d288ae36ea7')} alt="New API" /></span></div>
    <div className="provider-network-side provider-network-models">{providerLogos.map(([src, name]) => <span className="provider-network-node" key={name}><img src={asset(src)} alt={name} /></span>)}</div>
  </div>
}

function UsageCalendar() {
  const [monthOffset, setMonthOffset] = useState(0)
  const month = new Date(2026, 7 + monthOffset, 1)
  const monthLabel = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const previousMonthDays = new Date(month.getFullYear(), month.getMonth(), 0).getDate()
  const cells = Array.from({ length: 42 }, (_, index) => {
    const day = index - firstDay + 1
    if (day < 1) return { value: previousMonthDays + day, current: false }
    if (day > daysInMonth) return { value: day - daysInMonth, current: false }
    return { value: day, current: true }
  })
  return <div className="usage-calendar" aria-label={monthLabel}>
    <div className="usage-calendar-head"><button onClick={() => setMonthOffset((value) => value - 1)} aria-label="Go to the Previous Month"><ChevronLeft size={14} /></button><b>{monthLabel}</b><button onClick={() => setMonthOffset((value) => value + 1)} aria-label="Go to the Next Month"><ChevronRight size={14} /></button></div>
    <div className="usage-calendar-week">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => <span key={day}>{day}</span>)}</div>
    <div className="usage-calendar-grid">{cells.map((cell, index) => <span className={`${cell.current ? '' : 'outside'} ${cell.value === 26 && cell.current && monthOffset === 0 ? 'today' : ''}`.trim()} key={`${monthOffset}-${index}`}>{cell.value}</span>)}</div>
  </div>
}

function CapabilityCard({ icon: Icon, title, text, kind, showMore = false, children }: { icon: typeof Zap; title: string; text: string; kind: string; showMore?: boolean; children: ReactNode }) {
  return <article className={`newapi-cap-card ${kind}`}><div className="cap-preview">{children}</div><div className="cap-copy"><Icon size={48} strokeWidth={1.35} /><h3>{title}</h3><p>{text}</p></div>{showMore && <a className="cap-more" href="#steps">了解更多 <ArrowRight size={15} /></a>}<span className="cap-hover-surface" /></article>
}

export function NewApiHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('system')
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [menuOpen])
  return <div className="newapi-page" id="top" data-theme={theme}>
    <section className="newapi-hero">
      <BlackHoleCanvas />
      <Header onMenu={() => setMenuOpen((open) => !open)} menuOpen={menuOpen} theme={theme} onThemeChange={setTheme} />
      <div className="newapi-hero-content">
        <div className="newapi-kicker"><span /> 人工智能应用基座</div>
        <h1>万有引力<br />万智归一</h1>
        <p>如群星汇于引力中心，寰宇智能在此归于同一接口——<br />OpenAI、Claude、Gemini，万模互联，一脉相承。<br />以开源立信，以自主立本；上承万象应用，下启无界未来。</p>
        <div className="newapi-hero-buttons"><a className="newapi-primary" href="#steps">部署你的网关 <ArrowRight size={17} /></a><a href="https://github.com/QuantumNous/new-api" target="_blank" rel="noreferrer"><Star size={17} /> GitHub 点星支持</a><a href="https://atomgit.com/" target="_blank" rel="noreferrer"><Star size={17} /> AtomGit 点星支持</a></div>
        <div className="newapi-stats"><div><strong>40K+</strong><span>GITHUB STARS</span></div><div><strong>30+</strong><span>模型服务商</span></div><div><strong>500+</strong><span>版本迭代</span></div></div>
      </div>
      <div className="newapi-inspiration">灵感源自《星际穿越》中的卡冈图雅</div>
      <a className="newapi-scroll-cue" href="#apps"><ArrowDown size={18} /></a>
    </section>

    <section className="newapi-apps" id="apps"><p>为全球 AI 应用提供能力</p><div className="newapi-app-viewport"><div className="newapi-app-track">{[...apps, ...apps].map(([src, name], index) => <div className="newapi-app" aria-hidden={index >= apps.length} key={`${name}-${index}`}><img src={asset(src)} alt="" /> <span>{name}</span></div>)}</div></div></section>

    <section className="newapi-partners"><div className="newapi-section-heading"><span>信赖之选</span><h2>信赖我们的用户与合作伙伴</h2><p>从头部云厂商到前沿 AI 公司，各行业团队都在生产环境中运行<br className="desktop-only" /> New API。</p></div><div className="newapi-partner-grid">{partners.map(([src, name, label]) => <div key={name}><img src={asset(src)} alt={name} />{label && <span>{label}</span>}</div>)}</div></section>

    <section className="newapi-capabilities" id="capabilities"><div className="newapi-section-heading"><span>能力</span><h2>企业级 AI 网关</h2><p>New API 是统一的 AI 网关与资产管理平台，接入 30+ AI 服务<br className="desktop-only" />商，支持智能路由与成本管控。</p></div><div className="newapi-cap-grid">
      <CapabilityCard icon={Zap} kind="cap-api" title="统一 API 接入" text="通过单一统一端点接入 30+ AI 服务商。" showMore><div className="mini-form"><b>一套 API 覆盖全部</b><small>100% OpenAI 兼容端点，支持所有 AI 服务商。</small><label>API 端点</label><div>https://api.example.com/v1</div></div></CapabilityCard>
      <CapabilityCard icon={Search} kind="cap-model" title="模型选择" text="从 100+ 款模型中自由选择，覆盖多家服务商。" showMore><div className="mini-search"><div><Search size={14} /> 搜索模型...</div><span>gpt-5.5</span><span>claude-opus-4-8</span><span>gemini-3.1-pro</span><span>deepseek-v4-pro</span><span>llama-4-maverick</span><span>mistral-large-3</span></div></CapabilityCard>
      <CapabilityCard icon={Share2} kind="cap-provider" title="多服务商支持" text="无缝集成 OpenAI、Claude、Gemini 等多家服务。" showMore><ProviderNetwork /></CapabilityCard>
      <CapabilityCard icon={Activity} kind="cap-usage" title="用量分析" text="监控用量、追踪成本并优化表现。" showMore><UsageCalendar /></CapabilityCard>
    </div></section>

    <section className="newapi-steps" id="steps"><div className="newapi-section-heading"><span>流程</span><h2>三步部署 AI 网关</h2><p>按以下步骤部署、集成并扩展你的 AI 基础设施。</p></div><div className="newapi-step-list"><div><em>1</em><FolderOpen /><h3>配置通道</h3><p>添加并配置 AI 服务商，灵活设置通道管理与优先级。</p></div><div><em>2</em><WandSparkles /><h3>部署与集成</h3><p>一键部署，100% OpenAI 兼容 API，与现有应用无缝集成。</p></div><div><em>3</em><ChartNoAxesColumnIncreasing /><h3>监控与优化</h3><p>追踪用量、分析成本，通过完善的数据分析优化表现。</p></div></div></section>

    <section className="newapi-cta"><h2>迈入 AI 基础设施的未来</h2><p>体验统一接入所有 AI 服务商的方案。智能路由与成本优化，构建更快、扩展更稳。</p><a className="newapi-primary" href="#top">部署你的网关 <ArrowRight size={17} /></a></section>

    <footer className="newapi-footer"><div className="newapi-footer-top"><div><a className="newapi-brand" href="#top"><img className="newapi-brand-logo" src={asset('13774d288ae36ea7')} alt="" /><span>New API</span></a><p>新一代 AI 网关与资产管理。</p><p>由 <b>QuantumNous</b></p></div><div className="newapi-footer-links"><div><b>关于我们</b><a href="#capabilities">插件</a><a href="#steps">关于项目</a><a href="#steps">联系我们</a><a href="#capabilities">功能</a></div><div><b>文档</b><a href="#steps">快速开始</a><a href="#steps">安装指南</a><a href="#steps">API 文档</a></div></div></div><div className="newapi-footer-bottom"><p>© 2026 New API by QuantumNous. 保留所有权利。</p><div>NEW API</div></div></footer>
    {showTop && <button className="newapi-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="回到顶部" title="回到顶部"><ArrowUp size={18} /></button>}
    {menuOpen && <div className="newapi-mobile-menu" role="dialog" aria-modal="true" aria-label="主菜单"><a href="#top" onClick={() => setMenuOpen(false)}>首页</a><a href="#capabilities" onClick={() => setMenuOpen(false)}>插件</a><a href="#steps" onClick={() => setMenuOpen(false)}>文档</a><a className="newapi-primary" href="#steps" onClick={() => setMenuOpen(false)}>部署你的网关 <ArrowRight size={17} /></a></div>}
  </div>
}
