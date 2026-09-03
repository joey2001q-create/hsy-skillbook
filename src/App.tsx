import { lazy, Suspense, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

const TraeHero = lazy(() => import('./components/Hero').then((module) => ({ default: module.Hero })))
const JufcloudHero = lazy(() => import('./components/JufcloudHero').then((module) => ({ default: module.JufcloudHero })))
const OstyHome = lazy(() => import('./components/osty/OstyHome').then((module) => ({ default: module.OstyHome })))
const UglyLogin = lazy(() => import('./components/UglyLogin').then((module) => ({ default: module.UglyLogin })))
const UglyPortal = lazy(() => import('./components/UglyPortal').then((module) => ({ default: module.UglyPortal })))
const NewApiHome = lazy(() => import('./components/NewApiHome').then((module) => ({ default: module.NewApiHome })))

function App() {
  const pathname = window.location.pathname.toLowerCase()
  const isOsty = pathname.startsWith('/osty')
  const isJufcloud = pathname.startsWith('/jufcloud')
  const isUglyLogin = pathname.startsWith('/ugly-login')
  const isUglyPortal = pathname.startsWith('/ugly-portal')
  const isNewApi = pathname.startsWith('/newapi')
  const sourceSiteUrl = isOsty
    ? 'https://theme.madsparrow.me/osty/?storefront=envato-elements'
    : isJufcloud
      ? 'https://www.jufcloud.com/'
      : 'https://www.trae.cn/'
  const sourceSiteName = isOsty ? 'Osty' : isJufcloud ? 'Jufcloud' : 'TRAE'

  useEffect(() => {
    document.title = isOsty
      ? 'Osty · Creative Agency and Portfolio'
      : isUglyPortal
      ? '破浪门户网 · 静态门户展示'
      : isUglyLogin
      ? '彩虹通行证 · 丑登录页'
      : isNewApi
      ? '首页 | QN Platform'
      : isJufcloud
        ? '桔风云 · 3D 横幅复刻样例'
        : 'TRAE · 首页交互复刻样例'
  }, [isJufcloud, isUglyLogin, isUglyPortal, isNewApi, isOsty])

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

  if (isUglyPortal) {
    return (
      <Suspense fallback={<div className="route-loading" aria-label="静态门户页加载中" />}>
        <UglyPortal />
      </Suspense>
    )
  }

  if (isUglyLogin) {
    return (
      <Suspense fallback={<div className="route-loading" aria-label="丑登录页加载中" />}>
        <UglyLogin />
      </Suspense>
    )
  }

  if (isNewApi) {
    return (
      <Suspense fallback={<div className="route-loading" aria-label="New API 页面加载中" />}>
        <NewApiHome />
      </Suspense>
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
