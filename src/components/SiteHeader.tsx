export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="layout header-layout">
        <a className="site-logo" href="#top" aria-label="代理VPS 首页">代理VPS</a>
        <nav aria-label="主导航">
          <a href="#top">首页</a>
          <a href="#top">订购产品</a>
          <a href="#top">关于我们</a>
          <a className="account-link" href="#top">登录账号</a>
          <a className="account-link" href="#top">注册账号</a>
        </nav>
      </div>
    </header>
  )
}
