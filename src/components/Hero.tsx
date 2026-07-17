import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { FluidPixelCanvas } from './FluidPixelCanvas'
import { SiteHeader } from './SiteHeader'

function AppleMark() {
  return (
    <svg aria-hidden="true" className="apple-mark" viewBox="0 0 24 24">
      <path d="M16.7 12.8c0-2.3 1.9-3.4 2-3.5a4.2 4.2 0 0 0-3.3-1.8c-1.4-.1-2.8.8-3.5.8-.8 0-1.9-.8-3.1-.8a4.6 4.6 0 0 0-3.9 2.4c-1.7 2.9-.4 7.2 1.2 9.5.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4a10.5 10.5 0 0 0 1.4-2.9 4 4 0 0 1-2.3-3.7Z" />
      <path d="M14.5 6c.7-.9 1.2-2.1 1.1-3.3-1.1.1-2.4.7-3.2 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.4-.6 3.2-1.5Z" />
    </svg>
  )
}

export function Hero() {
  const [selection, setSelection] = useState('')

  const chooseDownload = (product: string) => {
    setSelection(`已选择下载 ${product}`)
  }

  return (
    <div className="trae-page">
      <SiteHeader />
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
              <button className="download-button download-button-primary" type="button" onClick={() => chooseDownload('TRAE Work')}>
                <AppleMark />
                <span>下载 TRAE Work</span>
              </button>
              <button className="download-button download-button-secondary" type="button" onClick={() => chooseDownload('TRAE IDE')}>
                <AppleMark />
                <span>下载 TRAE IDE</span>
              </button>
            </div>
            <a className="web-link" href="#hero">
              <span>TRAE Work 网页版</span>
              <ChevronRight aria-hidden="true" size={16} strokeWidth={1.2} />
            </a>
            <span className="sr-only" aria-live="polite">{selection}</span>
          </div>
        </div>
      </section>
    </div>
  )
}
