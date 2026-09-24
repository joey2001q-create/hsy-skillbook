import { lazy, Suspense, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

const TraeHero = lazy(() => import('./components/Hero').then((module) => ({ default: module.Hero })))
const JufcloudHero = lazy(() => import('./components/JufcloudHero').then((module) => ({ default: module.JufcloudHero })))
const OstyHome = lazy(() => import('./components/osty/OstyHome').then((module) => ({ default: module.OstyHome })))
const UglyLogin = lazy(() => import('./components/UglyLogin').then((module) => ({ default: module.UglyLogin })))
const UglyPortal = lazy(() => import('./components/UglyPortal').then((module) => ({ default: module.UglyPortal })))
const NewApiHome = lazy(() => import('./components/NewApiHome').then((module) => ({ default: module.NewApiHome })))
const RecreationGallery = lazy(() => import('./components/RecreationGallery').then((module) => ({ default: module.RecreationGallery })))
const HeybikeHome = lazy(() => import('./components/heybike/HeybikeHome').then((module) => ({ default: module.HeybikeHome })))
const AvadaHome = lazy(() => import('./components/AvadaHome').then((module) => ({ default: module.AvadaHome })))

function App() {
  const pathname = window.location.pathname.toLowerCase()
  const isOsty = pathname.startsWith('/osty')
  const isJufcloud = pathname.startsWith('/jufcloud')
  const isUglyLogin = pathname.startsWith('/ugly-login')
  const isUglyPortal = pathname.startsWith('/ugly-portal')
  const isNewApi = pathname.startsWith('/newapi')
  const isHeybike = pathname.startsWith('/heybike')
  const isAvada = pathname.startsWith('/avada')
  const isGallery = pathname === '/' || pathname === '/index.html' || pathname.startsWith('/demos')
  const sourceSiteUrl = isOsty
    ? 'https://theme.madsparrow.me/osty/?storefront=envato-elements'
    : isJufcloud
      ? 'https://www.jufcloud.com/'
      : 'https://www.trae.cn/'
  const sourceSiteName = isOsty ? 'Osty' : isJufcloud ? 'Jufcloud' : 'TRAE'

  useEffect(() => {
    document.title = isGallery
      ? '复刻台 · 交互级网页复刻案例'
      : isOsty
      ? 'Osty · Creative Agency and Portfolio'
      : isUglyPortal
      ? '破浪门户网 · 静态门户展示'
      : isUglyLogin
      ? '彩虹通行证 · 丑登录页'
      : isNewApi
      ? '首页 | QN Platform'
      : isHeybike
        ? 'Heybike Electric Bikes | Home Recreation'
        : isAvada
          ? 'Avada · The Ultimate Website Builder'
      : isJufcloud
        ? '桔风云 · 3D 横幅复刻样例'
        : 'TRAE · 首页交互复刻样例'
  }, [isJufcloud, isUglyLogin, isUglyPortal, isNewApi, isOsty, isGallery, isHeybike, isAvada])

  if (isGallery) {
    return <Suspense fallback={<div className="route-loading" aria-label="案例列表加载中" />}><RecreationGallery /></Suspense>
  }

  if (isHeybike) {
    return (
      <div className="site-stage site-stage-heybike">
        <Suspense fallback={<div className="route-loading" aria-label="Heybike 页面加载中" />}><HeybikeHome /></Suspense>
        <a className="source-site-link source-site-link-heybike" href="https://www.heybike.com/" target="_blank" rel="noreferrer" aria-label="在新标签页打开 Heybike 原网站"><span>原网站</span><ExternalLink size={16} strokeWidth={1.8} aria-hidden="true" /></a>
      </div>
    )
  }

  if (isAvada) {
    return (
      <div className="site-stage site-stage-avada">
        <Suspense fallback={<div className="route-loading" aria-label="Avada 页面加载中" />}><AvadaHome /></Suspense>
      </div>
    )
  }

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
      <div className="site-stage site-stage-newapi">
        <Suspense fallback={<div className="route-loading" aria-label="New API 页面加载中" />}><NewApiHome /></Suspense>
        <a className="source-site-link source-site-link-newapi" href="https://www.newapi.ai/" target="_blank" rel="noreferrer" aria-label="在新标签页打开 New API 原网站"><span>原网站</span><ExternalLink size={16} strokeWidth={1.8} aria-hidden="true" /></a>
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
