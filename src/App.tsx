import { lazy, Suspense, useEffect } from 'react'

const TraeHero = lazy(() => import('./components/Hero').then((module) => ({ default: module.Hero })))
const JufcloudHero = lazy(() => import('./components/JufcloudHero').then((module) => ({ default: module.JufcloudHero })))

function App() {
  const isJufcloud = window.location.pathname.toLowerCase().startsWith('/jufcloud')

  useEffect(() => {
    document.title = isJufcloud ? '桔风云 · 3D 横幅复刻样例' : 'TRAE · 横幅交互复刻样例'
  }, [isJufcloud])

  return (
    <main className={isJufcloud ? 'site-stage site-stage-jufcloud' : 'site-stage'}>
      <Suspense fallback={<div className="route-loading" aria-label="页面加载中" />}>
        {isJufcloud ? <JufcloudHero /> : <TraeHero />}
      </Suspense>
    </main>
  )
}

export default App
