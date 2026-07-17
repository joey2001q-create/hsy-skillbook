import { lazy, Suspense, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

const TraeHero = lazy(() => import('./components/Hero').then((module) => ({ default: module.Hero })))
const JufcloudHero = lazy(() => import('./components/JufcloudHero').then((module) => ({ default: module.JufcloudHero })))

function App() {
  const isJufcloud = window.location.pathname.toLowerCase().startsWith('/jufcloud')
  const sourceSiteUrl = isJufcloud ? 'https://www.jufcloud.com/' : 'https://www.trae.cn/'

  useEffect(() => {
    document.title = isJufcloud ? '桔风云 · 3D 横幅复刻样例' : 'TRAE · 横幅交互复刻样例'
  }, [isJufcloud])

  return (
    <main className={isJufcloud ? 'site-stage site-stage-jufcloud' : 'site-stage'}>
      <Suspense fallback={<div className="route-loading" aria-label="页面加载中" />}>
        {isJufcloud ? <JufcloudHero /> : <TraeHero />}
      </Suspense>
      <a
        className={`source-site-link ${isJufcloud ? 'source-site-link-jufcloud' : 'source-site-link-trae'}`}
        href={sourceSiteUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`在新标签页打开${isJufcloud ? 'Jufcloud' : 'TRAE'}原网站`}
      >
        <span>原网站</span>
        <ExternalLink size={16} strokeWidth={1.8} aria-hidden="true" />
      </a>
    </main>
  )
}

export default App
