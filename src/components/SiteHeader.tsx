import { ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = ['企业版', '定价', '文档', '更新日志', '社区']

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="trae-logo" href="#hero" aria-label="TRAE 首页">TRAE</a>

      <nav className="desktop-nav" aria-label="主导航">
        <a href="#hero" className="product-link">产品 <ChevronDown aria-hidden="true" size={14} strokeWidth={1.2} /></a>
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
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
      </button>

      {menuOpen ? (
        <nav className="mobile-nav" aria-label="移动端导航">
          <a href="#hero" onClick={() => setMenuOpen(false)}>产品</a>
          {navItems.map((item) => <a href="#hero" key={item} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a href="#downloads" onClick={() => setMenuOpen(false)}>下载中心</a>
        </nav>
      ) : null}
    </header>
  )
}
