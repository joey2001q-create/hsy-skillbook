import { lazy, Suspense, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

const TraeHero = lazy(() => import('./components/Hero').then((module) => ({ default: module.Hero })))
const JufcloudHero = lazy(() => import('./components/JufcloudHero').then((module) => ({ default: module.JufcloudHero })))
const OstyHome = lazy(() => import('./components/osty/OstyHome').then((module) => ({ default: module.OstyHome })))

function App() {
  const pathname = window.location.pathname.toLowerCase()
  const isOsty = pathname.startsWith('/osty')
  const isJufcloud = pathname.startsWith('/jufcloud')
  const sourceSiteUrl = isOsty
    ? 'https://theme.madsparrow.me/osty/?storefront=envato-elements'
    : isJufcloud
      ? 'https://www.jufcloud.com/'
      : 'https://www.trae.cn/'
  const sourceSiteName = isOsty ? 'Osty' : isJufcloud ? 'Jufcloud' : 'TRAE'

  useEffect(() => {
    document.title = isOsty
      ? 'Osty · Creative Agency and Portfolio'
      : isJufcloud
        ? '桔风云 · 3D 横幅复刻样例'
        : 'TRAE · 横幅交互复刻样例'
  }, [isJufcloud, isOsty])

  if (isOsty) {
    return (
      <div className="site-stage site-stage-osty">
        <Suspense fallback={<div className="route-loading route-loading-osty" aria-label="页面加载中" />}>
          <OstyHome />
        </Suspense>
        <a
          className="source-site-link source-site-link-osty"
          href={sourceSiteUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="在新标签页打开 Osty 原网站"
        >
          <span>原网站</span>
          <ExternalLink size={16} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </div>
    )
  }

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
        aria-label={`在新标签页打开${sourceSiteName}原网站`}
      >
        <span>原网站</span>
        <ExternalLink size={16} strokeWidth={1.8} aria-hidden="true" />
      </a>
    </main>
  )
}

export default App
