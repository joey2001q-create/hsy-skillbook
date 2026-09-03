import { type FormEvent, useState } from 'react'
import {
  AlertTriangle,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  LogIn,
  Mail,
  PartyPopper,
  UserRoundPlus,
} from 'lucide-react'
import starburstUrl from '../../skills/uglify-webpage/assets/stickers/starburst.svg'
import '../ugly-login-tokens.css'
import '../ugly-login.css'

type LoginPhase = 'idle' | 'loading' | 'success'

export function UglyLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [phase, setPhase] = useState<LoginPhase>('idle')
  const [message, setMessage] = useState('这是演示登录页，不会发送或保存真实账号数据。')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('请输入一个完整的电子邮箱，例如 name@example.com。')
      return
    }

    if (password.length < 6) {
      setError('演示密码至少需要 6 个字符。')
      return
    }

    setPhase('loading')
    setMessage('正在穿过彩虹隧道验证演示账号……')

    window.setTimeout(() => {
      setPhase('success')
      setMessage(`欢迎回来，${email}！演示登录成功，没有数据被发送。`)
    }, 900)
  }

  const fillGuestAccount = () => {
    setEmail('guest@example.com')
    setPassword('guest123')
    setError('')
    setPhase('idle')
    setMessage('游客演示账号已填好，点击“闪亮登录”即可继续。')
  }

  return (
    <main className="ugly-login-page">
      <div className="ugly-login-ribbon" aria-hidden="true">
        <div className="ugly-login-ribbon-track">
          ★ 欢迎来到会员入口 ★ 今天也要认真输入密码 ★ 禁止审美协调 ★ 欢迎来到会员入口 ★ 今天也要认真输入密码 ★
        </div>
      </div>

      <header className="ugly-login-header">
        <a className="ugly-login-brand" href="/ugly-login/" aria-label="返回丑登录页首页">
          <LockKeyhole size={34} strokeWidth={3} aria-hidden="true" />
          <span>彩虹通行证</span>
          <small>LOGIN CENTER 2005</small>
        </a>
        <button
          className="ugly-login-help"
          type="button"
          onClick={() => setMessage('需要帮助？请使用游客账号体验，真实账号不要输入。')}
        >
          <AlertTriangle size={20} aria-hidden="true" />
          紧急帮助
        </button>
      </header>

      <div className="ugly-login-shell">
        <section className="ugly-login-promo" aria-labelledby="ugly-login-promo-title">
          <img className="ugly-login-starburst" src={starburstUrl} alt="" />
          <div className="ugly-login-lock-portrait" aria-hidden="true">
            <LockKeyhole size={126} strokeWidth={2.6} />
            <span>100% DEMO</span>
          </div>
          <p className="ugly-login-kicker">互联网会员专属入口</p>
          <h1 id="ugly-login-promo-title">登录，然后继续上网！</h1>
          <p className="ugly-login-promo-copy">
            一个视觉非常忙碌、流程依然清楚的演示登录中心。这里不连接真实服务，也不会保存凭据。
          </p>
          <ul className="ugly-login-benefits">
            <li><PartyPopper size={18} aria-hidden="true" /> 免费获得彩色边框</li>
            <li><KeyRound size={18} aria-hidden="true" /> 密码框真的可以显示与隐藏</li>
            <li><LogIn size={18} aria-hidden="true" /> 登录按钮真的有反馈</li>
          </ul>
          <div className="ugly-login-counter" aria-label="今日演示计数">
            今日演示访客：<strong>000042</strong>
          </div>
        </section>

        <section className="ugly-login-form-panel" aria-labelledby="ugly-login-form-title">
          <div className="ugly-login-form-heading">
            <span>会员认证窗口</span>
            <h2 id="ugly-login-form-title">请证明你是你</h2>
          </div>

          <form className="ugly-login-form" onSubmit={handleSubmit} noValidate>
            <label className="ugly-login-label" htmlFor="ugly-login-email">
              <Mail size={19} aria-hidden="true" />
              电子邮箱
            </label>
            <input
              id="ugly-login-email"
              className="ugly-login-input ugly-login-input-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              aria-invalid={error.includes('邮箱')}
              required
            />

            <label className="ugly-login-label ugly-login-label-password" htmlFor="ugly-login-password">
              <KeyRound size={19} aria-hidden="true" />
              演示密码
            </label>
            <div className="ugly-login-password-wrap">
              <input
                id="ugly-login-password"
                className="ugly-login-input ugly-login-input-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="至少 6 个字符"
                aria-invalid={error.includes('密码')}
                required
              />
              <button
                className="ugly-login-password-toggle"
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? '隐藏密码' : '显示密码'}
                title={showPassword ? '隐藏密码' : '显示密码'}
              >
                {showPassword ? <EyeOff size={22} aria-hidden="true" /> : <Eye size={22} aria-hidden="true" />}
              </button>
            </div>

            <div className="ugly-login-options">
              <label className="ugly-login-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>在这台设备上记住演示状态</span>
              </label>
              <button
                className="ugly-login-text-action"
                type="button"
                onClick={() => setMessage('找回密码功能仅作演示，请使用游客账号继续。')}
              >
                忘记密码？
              </button>
            </div>

            {error && (
              <p className="ugly-login-error" role="alert">
                <AlertTriangle size={18} aria-hidden="true" />
                {error}
              </p>
            )}

            <p className={`ugly-login-status ugly-login-status-${phase}`} aria-live="polite">
              {message}
            </p>

            <button className="ugly-login-submit" type="submit" disabled={phase === 'loading'}>
              <LogIn size={23} strokeWidth={3} aria-hidden="true" />
              {phase === 'loading' ? '正在闪烁登录……' : phase === 'success' ? '已经登录成功！' : '闪亮登录'}
            </button>

            <div className="ugly-login-divider"><span>或者走旁边的小门</span></div>

            <button className="ugly-login-guest" type="button" onClick={fillGuestAccount}>
              <KeyRound size={20} aria-hidden="true" />
              填入游客演示账号
            </button>
            <button
              className="ugly-login-register"
              type="button"
              onClick={() => setMessage('注册窗口正在装修中，请先使用游客演示账号。')}
            >
              <UserRoundPlus size={19} aria-hidden="true" />
              我没有账号，去围观注册
            </button>
          </form>
        </section>
      </div>

      <footer className="ugly-login-footer">
        <span>© 2005–2026 彩虹通行证演示中心</span>
        <strong>最佳浏览体验：任何还能打开 CSS 的浏览器</strong>
      </footer>
    </main>
  )
}
