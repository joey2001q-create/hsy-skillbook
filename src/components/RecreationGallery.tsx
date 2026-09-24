import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react'
import './recreation-gallery.css'

type RecreationItem = {
  title: string
  subtitle: string
  route: string
  source: string
  sourceLabel: string
  image: string
  accent: string
  tags: string[]
}

const recreations: RecreationItem[] = [
  { title: 'TRAE 首页', subtitle: '流体像素场与首页交互', route: '/trae/', source: 'https://www.trae.cn/', sourceLabel: 'trae.cn', image: '/assets/gallery/trae.png', accent: 'violet', tags: ['Three.js', 'WebGL', '响应式'] },
  { title: 'Jufcloud 3D 横幅', subtitle: '二次元角色与鼠标视差', route: '/jufcloud/', source: 'https://www.jufcloud.com/', sourceLabel: 'jufcloud.com', image: '/assets/gallery/jufcloud.png', accent: 'cyan', tags: ['CSS 3D', '鼠标交互', '动态角色'] },
  { title: 'New API 首页', subtitle: 'AI 网关产品首页与主题切换', route: '/newapi/', source: 'https://www.newapi.ai/', sourceLabel: 'newapi.ai', image: '/assets/gallery/newapi.png', accent: 'blue', tags: ['Canvas', '深色主题', '长页面'] },
  { title: 'Osty 创意作品集', subtitle: '作品集首页与筛选交互', route: '/osty/', source: 'https://theme.madsparrow.me/osty/?storefront=envato-elements', sourceLabel: 'theme.madsparrow.me', image: '/assets/gallery/osty.png', accent: 'orange', tags: ['筛选', 'Hover', '移动端'] },
  { title: 'Heybike 电商首页', subtitle: '电动自行车商城与响应式交互', route: '/heybike/', source: 'https://www.heybike.com/', sourceLabel: 'heybike.com', image: '/assets/gallery/heybike.png', accent: 'orange', tags: ['电商', '轮播', '响应式'] },
  { title: 'Avada 动态横幅', subtitle: '打字机式标题与可视化构建器横幅', route: '/avada/', source: 'https://avada.com/', sourceLabel: 'avada.com', image: '/assets/avada/hero.jpg', accent: 'green', tags: ['打字机', '动态标题', '响应式'] },
]

export function RecreationGallery() {
  return (
    <main className="recreation-gallery">
      <header className="gallery-header">
        <a className="gallery-brand" href="/" aria-label="返回复刻台首页"><span className="gallery-brand-mark"><Sparkles size={16} /></span><span>复刻台</span></a>
        <div className="gallery-header-meta"><span className="gallery-status-dot" aria-hidden="true" /><span>交互级网页复刻</span><a href="https://github.com/joey2001q-create/hsy-skillbook" target="_blank" rel="noreferrer" aria-label="打开 GitHub 仓库">GitHub <ExternalLink size={14} /></a></div>
      </header>
      <section className="gallery-intro" aria-labelledby="gallery-title"><p className="gallery-eyebrow">RECREATE WEBPAGE</p><h1 id="gallery-title">把喜欢的网页，<em>复刻出来。</em></h1><p className="gallery-description">每个案例都保留关键视觉、交互和响应式行为。选择一个 Demo，进入复刻页面查看。</p></section>
      <section className="gallery-grid" aria-label="复刻案例列表">
        {recreations.map((item, index) => <article className={`gallery-card gallery-card-${item.accent}`} key={item.route}>
          <a className="gallery-card-preview" href={item.route} aria-label={`查看${item.title}复刻`}><img src={item.image} alt={`${item.title}复刻预览`} loading={index > 1 ? 'lazy' : 'eager'} /><span className="gallery-card-open"><ArrowUpRight size={18} /></span></a>
          <div className="gallery-card-content"><div><p className="gallery-card-kicker">CASE {String(index + 1).padStart(2, '0')}</p><h2>{item.title}</h2><p className="gallery-card-subtitle">{item.subtitle}</p></div><div className="gallery-card-footer"><div className="gallery-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="gallery-source" href={item.source} target="_blank" rel="noreferrer" aria-label={`打开${item.sourceLabel}原网站`}>{item.sourceLabel} <ExternalLink size={13} /></a></div></div>
        </article>)}
      </section>
      <footer className="gallery-footer"><span>{recreations.length} 个案例 · 持续增加中</span><span>Built with recreate-webpage Skill</span></footer>
    </main>
  )
}
