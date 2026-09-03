import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  History,
  LockKeyhole,
  Sparkles,
} from 'lucide-react'
import { FluidPixelCanvas } from './FluidPixelCanvas'
import { GridDistortion } from './GridDistortion'
import { SiteHeader } from './SiteHeader'

const TRAE_VIDEO_URL = 'https://lf-cdn.trae.com.cn/obj/trae-com-cn/solo_mobile_launch_cn.mp4'

const possibilities = [
  {
    number: '00',
    title: '全场景提效，释放你的生产力潜能',
    image: '/assets/trae/value-01.png',
    description: 'TRAE 覆盖从编码、调试到测试、重构、部署等多类开发任务，支持代码续写、文档生成、逻辑审查与结构优化等，适配多种日常开发场景，帮助开发者减少重复操作，专注核心创新。',
  },
  {
    number: '01',
    title: '支持 AI Coding Agent ，流畅推动每一步开发',
    image: '/assets/trae/value-02.png',
    description: 'TRAE 内置的 SOLO 模式，配备专属 Coding Agent，可理解目标、规划任务并调度工具，独立推进各阶段开发工作。从自然语言输入到可执行产出，帮助你高效完成开发任务。',
  },
  {
    number: '02',
    title: '兼容双重开发模式，自由切换代码编程与自然语言对话',
    image: '/assets/trae/value-03.png',
    description: 'TRAE 不仅将 AI 集成进 IDE，也让 AI 使用更多开发工具。TRAE 目前拥有双重开发模式，IDE 模式保留原有流程，控制感更强；SOLO 模式让 AI 主导任务，自动推进开发任务。你可根据任务需求自由切换，始终游刃有余。',
  },
  {
    number: '03',
    title: '开放智能体生态，一切围绕解决问题',
    image: '/assets/trae/value-04.png',
    description: '可自动拆分复杂任务，带来流畅交付体验。也支持独立创建 Agent 并分享到市场，像插件一样灵活组合智能体，适配不同开发需求。',
  },
]

const ideSlides = [
  {
    title: '自定义智能体，\n构建专属团队',
    image: '/assets/trae/ide-agent.png',
    description: 'TRAE 推出全新可自由配置的智能体体系，打造开放的智能体生态。你可以根据需求灵活定义工具、技能和任务逻辑，轻松构建专属的 AI 智能体团队。无论何种职业，TRAE，让 AI 真正为你所用。',
  },
  {
    title: '工具自由装配，\n拓展能力边界',
    image: '/assets/trae/ide-mcp.png',
    description: 'TRAE IDE 支持多种外部工具的无缝集成，让你的智能体根据个人需求灵活调用工具，打造独一无二的任务执行能力。通过 MCP（Model Context Protocol），你可以赋予智能体专属的外部资源调用能力，根据自己的使用场景和目标，精细化打磨 AI 的能力边界。',
  },
  {
    title: '更多上下文，\n更符合个人偏好',
    image: '/assets/trae/ide-context.png',
    description: 'TRAE 的理解能力全面升级，不仅可以理解代码仓库、终端信息等 IDE 内信息，还支持更多类型的外部信息理解，你可以联网搜索、上传文档集。更重要的是，你还可以配置自己的 AI 工作规则（TRAE Rules），让 AI 真正融入你的工作流，按照你的需求执行定制化任务。',
  },
  {
    title: 'Cue 全新升级，\n实现智能预测',
    image: '/assets/trae/ide-autocomplete.png',
    description: '基于优化模型实现精准续写，智能感知仓库上下文与编辑轨迹，自动预测下一改动点。点击 Tab 键即可实现快速跳转并应用建议，提供多行编辑建议与直观 diff 对比，从代码优化到意图预判，让开发行云流水。',
  },
]

function AppleMark() {
  return (
    <svg aria-hidden="true" className="apple-mark" viewBox="0 0 24 24">
      <path d="M16.7 12.8c0-2.3 1.9-3.4 2-3.5a4.2 4.2 0 0 0-3.3-1.8c-1.4-.1-2.8.8-3.5.8-.8 0-1.9-.8-3.1-.8a4.6 4.6 0 0 0-3.9 2.4c-1.7 2.9-.4 7.2 1.2 9.5.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4a10.5 10.5 0 0 0 1.4-2.9 4 4 0 0 1-2.3-3.7Z" />
      <path d="M14.5 6c.7-.9 1.2-2.1 1.1-3.3-1.1.1-2.4.7-3.2 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.4-.6 3.2-1.5Z" />
    </svg>
  )
}

function HeroBanner() {
  const [selection, setSelection] = useState('')

  return (
    <section className="trae-hero" id="hero" aria-labelledby="hero-heading">
      <FluidPixelCanvas />
      <div className="fluid-shade" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-copy">
          <h1 id="hero-heading">
            <span>TRAE</span>
            <span>智能无限，协作无间</span>
          </h1>
        </div>

        <div className="download-panel" id="downloads">
          <div className="product-copy">
            <p>TRAE Work：全新上线的智能工作助手</p>
            <p>TRAE IDE：你的专属 AI 开发工程师</p>
          </div>
          <div className="download-actions">
            <button className="download-button download-button-primary" type="button" onClick={() => setSelection('已选择下载 TRAE Work')}>
              <AppleMark />
              <span>下载 TRAE Work</span>
            </button>
            <button className="download-button download-button-secondary" type="button" onClick={() => setSelection('已选择下载 TRAE IDE')}>
              <AppleMark />
              <span>下载 TRAE IDE</span>
            </button>
          </div>
          <a className="web-link" href="#trae-work">
            <span>TRAE Work 网页版</span>
            <ChevronRight aria-hidden="true" size={16} strokeWidth={1.2} />
          </a>
          <span className="sr-only" aria-live="polite">{selection}</span>
        </div>
      </div>
    </section>
  )
}

function WorkSection() {
  return (
    <section className="trae-work-section" id="trae-work" aria-labelledby="work-heading">
      <div className="section-intro">
        <h2 id="work-heading">全新 <span>TRAE Work</span></h2>
        <p>桌面端、网页版和移动端全量上线</p>
        <button type="button" className="work-cta">
          <Sparkles aria-hidden="true" size={18} strokeWidth={1.8} />
          <span>即刻探索 TRAE Work</span>
        </button>
      </div>
      <div className="work-video-frame">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/trae/solo-placeholder.png"
          aria-label="TRAE Work 移动端工作演示"
        >
          <source src={TRAE_VIDEO_URL} type="video/mp4" />
        </video>
      </div>
    </section>
  )
}

function PossibilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    const track = trackRef.current
    if (!section || !sticky || !track) return

    let frame = 0
    let travel = 0
    const measure = () => {
      const desktop = window.matchMedia('(min-width: 744px)').matches
      travel = desktop
        ? Math.max(0, track.scrollWidth - track.clientWidth + 155)
        : Math.max(0, track.scrollWidth - track.clientWidth)
      section.style.height = `${sticky.clientHeight + travel}px`
    }
    const update = () => {
      frame = 0
      const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64
      const offset = Math.min(travel, Math.max(0, window.scrollY - section.offsetTop + headerHeight))
      const movingElement = window.matchMedia('(min-width: 744px)').matches
        ? track
        : track.querySelector<HTMLElement>('.possibility-grid')
      if (movingElement) movingElement.style.transform = `translate3d(${-offset}px, 0, 0)`
    }
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    measure()
    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    const onResize = () => {
      measure()
      requestUpdate()
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="possibilities-section" ref={sectionRef} aria-labelledby="possibilities-heading">
      <div className="possibilities-sticky" ref={stickyRef}>
        <div className="possibilities-track" ref={trackRef}>
          <div className="possibilities-title-block">
            <h2 id="possibilities-heading">TRAE 为你解锁<br />全新可能</h2>
          </div>
          <div className="possibility-grid">
            {possibilities.map((item, index) => (
              <article className="possibility-card" style={{ '--possibility-column': index + 1 } as CSSProperties} key={item.number}>
                <span className="possibility-number">[{item.number}]</span>
                <h3>{item.title}</h3>
                <div className="possibility-image-frame">
                  <img src={item.image} alt={item.title} />
                </div>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function IdeSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', containScroll: false, startIndex: 1 })
  const [selectedSnap, setSelectedSnap] = useState(1)
  const actionsRef = useRef<HTMLDivElement>(null)
  const slides = [null, ...ideSlides, null]

  const syncSelection = useCallback(() => {
    if (emblaApi) setSelectedSnap(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', syncSelection)
    emblaApi.on('reInit', syncSelection)
    return () => {
      emblaApi.off('select', syncSelection)
      emblaApi.off('reInit', syncSelection)
    }
  }, [emblaApi, syncSelection])

  const scrollCarouselIntoView = useCallback(() => {
    const actions = actionsRef.current
    if (!actions) return

    const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64
    const top = window.scrollY + actions.getBoundingClientRect().top - headerHeight
    window.scrollTo({
      top,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [])

  const moveCarousel = useCallback((direction: 'prev' | 'next') => {
    if (!emblaApi) return
    if (direction === 'prev') emblaApi.scrollPrev()
    else emblaApi.scrollNext()
    scrollCarouselIntoView()
  }, [emblaApi, scrollCarouselIntoView])

  return (
    <section className="ide-section" id="ide" aria-labelledby="ide-heading">
      <div className="ide-heading-row">
        <div className="ide-heading-copy">
          <h2 id="ide-heading">智能 IDE，将 AI 融入你的工作流</h2>
          <p>TRAE 旗下的 AI IDE 产品，以智能生产力为核心，灵活适配你的开发节奏，与你默契协作，共同实现高效、高质的项目交付。</p>
        </div>
      </div>
      <div className="ide-carousel-shell">
        <div className="carousel-actions" aria-label="IDE 功能轮播控制" ref={actionsRef}>
          <button type="button" aria-label="上一项" title="上一项" disabled={selectedSnap <= 1} onClick={() => moveCarousel('prev')}>
            <ArrowLeft aria-hidden="true" size={20} />
          </button>
          <button className="carousel-next" type="button" aria-label="下一项" title="下一项" disabled={selectedSnap >= ideSlides.length} onClick={() => moveCarousel('next')}>
            <ArrowRight aria-hidden="true" size={20} />
          </button>
        </div>
        <div className="ide-divider" />
        <div className="ide-carousel" ref={emblaRef}>
        <div className="ide-carousel-track">
          {slides.map((slide, index) => {
            const selected = selectedSnap === index
            return (
              <article
                className={`ide-card ${selected ? 'ide-card-selected' : 'ide-card-unselected'} ${index < selectedSnap ? 'ide-card-before' : 'ide-card-after'} ${slide ? '' : 'ide-card-placeholder'}`}
                data-slide={index}
                key={slide?.title ?? `placeholder-${index}`}
              >
                <div className="ide-card-media">{slide ? <img src={slide.image} alt="Carousel slide" /> : null}</div>
                <div className="ide-card-copy">
                  {slide ? (
                    <>
                      <h3>{slide.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
                      <p>{slide.description}</p>
                    </>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
        </div>
      </div>
    </section>
  )
}

const securityItems = [
  {
    title: '数据隐私保护',
    description: '代码文件默认保存在用户本地设备。为生成索引，文件可能会被临时上传以计算嵌入。处理完成后，所有明文数据将被删除。你也可以通过隐私模式或忽略功能来限制数据的使用。',
    icon: History,
  },
  {
    title: '安全访问控制',
    description: '通过严格的访问权限管理和加密传输机制，防止未经授权的访问，降低安全风险。',
    icon: LockKeyhole,
  },
  {
    title: '区域化部署',
    description: '用户数据与服务基础设施依据账号归属地进行存储与部署，并通过隔离机制满足当地数据法规的合规要求。',
    icon: BadgeCheck,
  },
]

function SecuritySection() {
  return (
    <section className="security-section" aria-labelledby="security-heading">
      <div className="security-heading-copy">
        <h2 id="security-heading">隐私与安全</h2>
        <p>我们始终致力于保护用户的隐私与数据安全，坚持“本地优先”和“最小化数据收集” 的原则。</p>
      </div>
      <div className="security-grid">
        {securityItems.map((item) => {
          const Icon = item.icon
          return (
            <article className="security-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Icon aria-hidden="true" size={24} strokeWidth={1.7} />
            </article>
          )
        })}
      </div>
    </section>
  )
}

function TraeFooter() {
  return (
    <footer className="trae-footer">
      <div className="trae-footer-main">
        <div className="footer-download-row">
          <h2><span>TRAE IDE</span><span>先一步体验未来</span></h2>
          <button type="button" className="footer-download-button">
            <AppleMark />
            <span>下载</span>
            <ArrowRight aria-hidden="true" size={20} />
          </button>
        </div>

        <div className="footer-divider" />
        <div className="footer-main-content">
          <div className="footer-mark" aria-label="TRAE" />
          <div className="footer-link-column footer-terms-column">
            <h3>服务条款</h3>
            <a href="#hero">用户协议</a>
            <a href="#hero">隐私协议</a>
          </div>
          <div className="footer-link-column footer-resources-column">
            <h3>社区与文档</h3>
            <a href="#hero">开发者社区</a>
            <a href="#hero">文档</a>
            <a href="#hero">更新日志</a>
          </div>
          <div className="footer-link-column footer-contact-column">
            <h3>联系我们</h3>
            <a href="#hero">建议反馈</a>
            <span>企业咨询热线 400-034-7888</span>
            <a href="#hero">企业采购咨询</a>
          </div>
          <div className="footer-legal">
            <p>© 2025 北京引力弹弓科技有限公司版权所有</p>
            <p>京公网安备11010802046042号</p>
            <p>京ICP备2024062284号-13</p>
            <p>北京引力弹弓科技有限公司｜营业执照</p>
            <p>北京市海淀区北三环西路甲23号院</p>
          </div>
          <a className="back-to-top" href="#hero">回到顶部 <span aria-hidden="true">◎</span></a>
          <div className="footer-qrs">
            <figure>
              <figcaption>关注微信公众号</figcaption>
              <img src="/assets/trae/wechat-qr.png" alt="TRAE 微信公众号二维码" />
            </figure>
            <figure>
              <figcaption>下载 TRAE 移动端</figcaption>
              <img src="/assets/trae/mobile-qr.png" alt="TRAE 移动端下载二维码" />
            </figure>
          </div>
        </div>
      </div>
      <GridDistortion />
    </footer>
  )
}

export function Hero() {
  return (
    <div className="trae-page">
      <SiteHeader />
      <HeroBanner />
      <WorkSection />
      <PossibilitiesSection />
      <IdeSection />
      <SecuritySection />
      <TraeFooter />
    </div>
  )
}
