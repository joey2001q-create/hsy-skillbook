import { Menu, Search, X } from 'lucide-react'
import { FormEvent, useEffect, useRef, useState } from 'react'

const navItems = [
  { label: 'Index', href: '#osty-top' },
  { label: 'News', href: '#projects' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pages', href: '#projects' },
  { label: 'Shop', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

type OstyHeaderProps = {
  darkMode: boolean
  onSearch: (query: string) => void
  onThemeToggle: () => void
}

export function OstyHeader({ darkMode, onSearch, onThemeToggle }: OstyHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      setSearchOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [searchOpen])

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(query.trim())
    setSearchOpen(false)
    window.setTimeout(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  return (
    <>
      <header className={`osty-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="osty-logo" href="#osty-top" aria-label="Osty home">osty.</a>

        <nav className="osty-desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
        </nav>

        <div className="osty-header-tools">
          <button
            className="osty-icon-button osty-search-trigger"
            type="button"
            aria-label="Open search"
            title="Search"
            onClick={() => {
              setMenuOpen(false)
              setSearchOpen(true)
            }}
          >
            <Search aria-hidden="true" size={21} strokeWidth={1.6} />
          </button>
          <button
            className="osty-theme-toggle"
            type="button"
            aria-label={darkMode ? 'Use light theme' : 'Use dark theme'}
            aria-pressed={darkMode}
            title={darkMode ? 'Light theme' : 'Dark theme'}
            onClick={onThemeToggle}
          >
            <span aria-hidden="true" />
          </button>
          <button
            className="osty-menu-trigger"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            title={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>Menu</span>
            {menuOpen ? <X aria-hidden="true" size={25} strokeWidth={1.5} /> : <Menu aria-hidden="true" size={28} strokeWidth={1.3} />}
          </button>
        </div>

        {menuOpen ? (
          <nav className="osty-menu-panel" aria-label="Compact navigation">
            <span className="osty-menu-label">Menu</span>
            {navItems.map((item, index) => (
              <a
                className={index === 0 ? 'is-current' : ''}
                href={item.href}
                key={item.label}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      {searchOpen ? (
        <div className="osty-search-modal" role="dialog" aria-modal="true" aria-label="Search projects">
          <button
            className="osty-search-close"
            type="button"
            aria-label="Close search"
            title="Close search"
            onClick={() => setSearchOpen(false)}
          >
            <X aria-hidden="true" size={24} />
          </button>
          <form role="search" onSubmit={submitSearch}>
            <input
              ref={inputRef}
              type="search"
              value={query}
              placeholder="Search..."
              aria-label="Search projects"
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" aria-label="Search" title="Search">
              <Search aria-hidden="true" size={24} strokeWidth={1.6} />
            </button>
          </form>
        </div>
      ) : null}
    </>
  )
}
