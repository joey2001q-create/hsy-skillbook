import { Check, ChevronDown, LoaderCircle, X } from 'lucide-react'
import { type CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

const categories = ['All Categories', 'Creative', 'Design', 'Photo', 'Style'] as const
const categoryDimDuration = 300

const projects = [
  { title: 'The Dark Side', category: 'Creative', image: '/assets/osty/project-dark-side.webp', href: 'https://theme.madsparrow.me/osty/the-dark-side/' },
  { title: 'Justice Robot', category: 'Design', image: '/assets/osty/project-justice-robot.webp', href: 'https://theme.madsparrow.me/osty/justice-robot/' },
  { title: 'Color Current', category: 'Photo', image: '/assets/osty/project-color-current.webp', href: 'https://theme.madsparrow.me/osty/color-current/' },
  { title: 'Subsequent Sneeze', category: 'Style', image: '/assets/osty/project-subsequent-sneeze.webp', href: 'https://theme.madsparrow.me/osty/subsequent-sneeze/' },
  { title: 'Wiggly Finger', category: 'Creative', image: '/assets/osty/project-wiggly-finger.webp', href: 'https://theme.madsparrow.me/osty/wiggly-finger/' },
  { title: 'Share Spark', category: 'Design', image: '/assets/osty/project-share-spark.webp', href: 'https://theme.madsparrow.me/osty/share-spark/' },
  { title: 'Random Risk', category: 'Photo', image: '/assets/osty/project-random-risk.webp', href: 'https://theme.madsparrow.me/osty/random-risk/' },
  { title: 'Stream Shop', category: 'Style', image: '/assets/osty/project-stream-shop.webp', href: 'https://theme.madsparrow.me/osty/stream-shop/' },
  { title: 'Freezing Birthday', category: 'Creative', image: '/assets/osty/project-freezing-birthday.webp', href: 'https://theme.madsparrow.me/osty/freezing-birthday/' },
]

type Category = (typeof categories)[number]
type TransitionPhase = 'idle' | 'dimming' | 'closing' | 'opening'

type OstyPortfolioProps = {
  searchTerm: string
}

const filterProjects = (category: Category, searchTerm: string) => {
  const normalizedSearch = searchTerm.trim().toLowerCase()
  return projects.filter((project) => {
    const matchesCategory = category === 'All Categories' || project.category === category
    const matchesSearch = !normalizedSearch || `${project.title} ${project.category}`.toLowerCase().includes(normalizedSearch)
    return matchesCategory && matchesSearch
  })
}

export function OstyPortfolio({ searchTerm }: OstyPortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('All Categories')
  const [displayedCategory, setDisplayedCategory] = useState<Category>('All Categories')
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>('idle')
  const [filterOpen, setFilterOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const filterListRef = useRef<HTMLDivElement>(null)
  const filterButtonsRef = useRef<Array<HTMLButtonElement | null>>([])
  const projectGridRef = useRef<HTMLDivElement>(null)
  const previousGridHeightRef = useRef<number | null>(null)
  const timersRef = useRef<number[]>([])

  const displayedProjects = useMemo(
    () => filterProjects(displayedCategory, searchTerm),
    [displayedCategory, searchTerm],
  )

  const clearTransitionTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
  }, [])

  const updateMarker = useCallback(() => {
    const list = filterListRef.current
    const activeIndex = categories.indexOf(activeCategory)
    const activeButton = filterButtonsRef.current[activeIndex]
    if (!list || !activeButton) return

    list.style.setProperty('--osty-marker-x', `${activeButton.offsetLeft}px`)
    list.style.setProperty('--osty-marker-width', `${activeButton.offsetWidth}px`)
  }, [activeCategory])

  useLayoutEffect(() => {
    updateMarker()
  }, [updateMarker])

  useEffect(() => {
    window.addEventListener('resize', updateMarker, { passive: true })
    return () => window.removeEventListener('resize', updateMarker)
  }, [updateMarker])

  useLayoutEffect(() => {
    const grid = projectGridRef.current
    const startHeight = previousGridHeightRef.current
    if (!grid || startHeight === null) return

    grid.style.height = 'auto'
    const endHeight = grid.getBoundingClientRect().height
    grid.style.transition = 'none'
    grid.style.height = `${startHeight}px`
    void grid.offsetHeight
    grid.style.transition = 'height 300ms cubic-bezier(.38, .005, .215, 1)'
    const frame = window.requestAnimationFrame(() => {
      grid.style.height = `${endHeight}px`
    })
    const timer = window.setTimeout(() => {
      grid.style.height = ''
      grid.style.transition = ''
      previousGridHeightRef.current = null
    }, 320)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [displayedCategory])

  useEffect(() => () => clearTransitionTimers(), [clearTransitionTimers])

  const selectCategory = (category: Category) => {
    if (category === activeCategory || transitionPhase !== 'idle') {
      setFilterOpen(false)
      return
    }

    clearTransitionTimers()
    setActiveCategory(category)
    setFilterOpen(false)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayedCategory(category)
      return
    }

    setTransitionPhase('dimming')

    const closeStartTimer = window.setTimeout(() => setTransitionPhase('closing'), categoryDimDuration)
    const closeDuration = 400 + Math.max(displayedProjects.length - 1, 0) * 60
    const swapTimer = window.setTimeout(() => {
      const grid = projectGridRef.current
      if (grid) previousGridHeightRef.current = grid.getBoundingClientRect().height

      const nextProjects = filterProjects(category, searchTerm)
      setDisplayedCategory(category)
      setTransitionPhase('opening')

      const openDuration = 600 + Math.max(nextProjects.length - 1, 0) * 60
      const finishTimer = window.setTimeout(() => setTransitionPhase('idle'), openDuration)
      timersRef.current.push(finishTimer)
    }, categoryDimDuration + closeDuration)

    timersRef.current = [closeStartTimer, swapTimer]
  }

  const loadMore = () => {
    if (loading || loaded) return
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setLoaded(true)
    }, 600)
  }

  const isTransitioning = transitionPhase !== 'idle'
  const isLoadingProjects = transitionPhase === 'dimming' || transitionPhase === 'closing'

  return (
    <section className="osty-portfolio" id="projects" aria-labelledby="projects-heading" aria-busy={isTransitioning}>
      <h2 className="sr-only" id="projects-heading">Selected projects</h2>

      <button
        className="osty-mobile-filter-control"
        type="button"
        aria-label="Select a filter option"
        aria-expanded={filterOpen}
        disabled={isTransitioning}
        onClick={() => setFilterOpen((open) => !open)}
      >
        <span>{activeCategory === 'All Categories' ? 'All' : activeCategory}</span>
        <ChevronDown aria-hidden="true" size={17} strokeWidth={1.6} />
      </button>

      <nav className={`osty-filter-nav ${filterOpen ? 'is-open' : ''}`} aria-label="Project categories">
        <div className="osty-filter-mobile-heading">
          <span>{activeCategory === 'All Categories' ? 'All' : activeCategory}</span>
          <button type="button" aria-label="Close filters" title="Close filters" onClick={() => setFilterOpen(false)}>
            <X aria-hidden="true" size={22} strokeWidth={1.4} />
          </button>
        </div>
        <div className="osty-filter-list" ref={filterListRef}>
          <span className="osty-filter-marker" aria-hidden="true" />
          {categories.map((category, index) => (
            <button
              className={activeCategory === category ? 'is-active' : ''}
              type="button"
              aria-pressed={activeCategory === category}
              disabled={isTransitioning}
              key={category}
              ref={(button) => { filterButtonsRef.current[index] = button }}
              onClick={() => selectCategory(category)}
            >
              {activeCategory === category ? <Check className="osty-filter-check" aria-hidden="true" size={18} /> : null}
              <span>{category}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="osty-project-stage">
        <div className={`osty-filter-loader ${isLoadingProjects ? 'is-visible' : ''}`} role="status" aria-label="Loading projects">
          <LoaderCircle aria-hidden="true" size={42} strokeWidth={1.5} />
        </div>

        {displayedProjects.length ? (
          <div className={`osty-project-grid is-${transitionPhase}`} ref={projectGridRef}>
            {displayedProjects.map((project, index) => (
              <a
                className="osty-project-card"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.title}
                style={{ '--osty-project-index': index } as CSSProperties}
              >
                <figure><img src={project.image} alt={project.title} /></figure>
                <div className="osty-project-meta">
                  <h3>{project.title}</h3>
                  <span>{project.category}</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="osty-empty-state">No projects found.</p>
        )}
      </div>

      <button className="osty-load-more" type="button" disabled={loading || loaded || isTransitioning} onClick={loadMore}>
        <span>{loading ? 'Loading...' : loaded ? 'All Works Loaded' : 'Load More'}</span>
        <i aria-hidden="true"><b /><b /><b /></i>
      </button>
    </section>
  )
}
