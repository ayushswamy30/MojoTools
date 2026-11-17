'use client'

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import { Container } from '@/components/ui/container'
import { SectionTitle } from '@/components/ui/section-title'
import type { Milestone } from '@/features/content/site'

/**
 * Scroll-driven milestones (DECISIONS D33). Must match the `motion-safe:md:` classes below:
 * only here does the section become a tall track (one screen per year) with a sticky panel.
 * Reduced motion on desktop → same panel, years are plain click/arrow-key tabs, no track.
 * Phones → every milestone in one vertical list.
 */
const SCROLL_MODE = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

/** Fractional year position (0 … count-1) for a 0–1 progress through the track. */
export function milestonePosition(progress: number, count: number) {
  return Math.min(count - 1, Math.max(0, progress * count - 0.5))
}

/**
 * Bespoke's "magnifier" rail: 1 for the year under the scroll position, easing to 0 by
 * ~1.5 years away, so neighbours shrink gradually instead of snapping.
 */
export function yearFocus(index: number, position: number) {
  return Math.min(1, Math.max(0, 1 - (Math.abs(index - position) - 0.3) / 1.2))
}

export function Milestones({
  items,
  title,
  yearsLabel,
  skipLabel,
}: {
  items: Milestone[]
  title: string
  yearsLabel: string
  skipLabel: string
}) {
  const [position, setPosition] = useState(0)
  const track = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const count = items.length
  const active = Math.round(position)

  useEffect(() => {
    const mq = matchMedia(SCROLL_MODE)
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const t = track.current
        const p = panel.current
        if (!t || !p) return
        // How far the sticky panel has slid down its track = how far through the years we are.
        const range = t.offsetHeight - p.offsetHeight
        const moved = p.getBoundingClientRect().top - t.getBoundingClientRect().top
        setPosition(milestonePosition(range > 0 ? moved / range : 0, count))
      })
    }
    const sync = () => {
      removeEventListener('scroll', onScroll)
      if (mq.matches) {
        addEventListener('scroll', onScroll, { passive: true })
        onScroll()
      }
    }
    sync()
    mq.addEventListener('change', sync)
    return () => {
      mq.removeEventListener('change', sync)
      removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [count])

  function select(index: number, focus = false) {
    const next = Math.min(count - 1, Math.max(0, index))
    setPosition(next)
    if (focus) tabs.current[next]?.focus({ preventScroll: true })
    const t = track.current
    const p = panel.current
    if (!t || !p || !matchMedia(SCROLL_MODE).matches) return
    // Scroll to the middle of that year's slice of the track; the listener then agrees.
    const range = t.offsetHeight - p.offsetHeight
    const stickyTop = parseFloat(getComputedStyle(p).top) || 0
    const trackTop = t.getBoundingClientRect().top + scrollY
    scrollTo({ top: trackTop - stickyTop + ((next + 0.5) / count) * range, behavior: 'smooth' })
  }

  function onKeyDown(event: KeyboardEvent) {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key]
    if (step) select(active + step, true)
    else if (event.key === 'Home') select(0, true)
    else if (event.key === 'End') select(count - 1, true)
    else return
    event.preventDefault()
  }

  return (
    <section
      aria-labelledby="story-title"
      className="on-dark scroll-dusk-subject relative bg-ink-900 text-steel-200"
    >
      <a
        href="#after-story"
        className="sr-only z-[var(--z-dialog)] rounded-sm bg-brand-yellow px-4 py-3 font-semibold text-ink-900 focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
      >
        {skipLabel}
      </a>
      {/* Track height = years × 100vh (documented in D33, not a magic number). */}
      <div
        ref={track}
        style={{ '--years': count } as CSSProperties}
        className="motion-safe:md:h-[calc(var(--years)*100vh)]"
      >
        <div ref={panel} className="py-16 motion-safe:md:sticky motion-safe:md:top-16">
          <Container className="w-full">
            <SectionTitle id="story-title" title={title} onDark />
            <div className="md:grid md:grid-cols-[18rem_minmax(0,1fr)] md:items-center md:gap-16">
              <div
                role="toolbar"
                aria-orientation="vertical"
                aria-label={yearsLabel}
                onKeyDown={onKeyDown}
                className="relative hidden content-start pl-6 md:grid"
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-ink-700" />
                {/* Marker = one year's share of the rail, sliding with the scroll position. */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 w-1 -translate-x-[1.5px] bg-brand-yellow"
                  style={{
                    height: `${100 / count}%`,
                    transform: `translateY(${position * 100}%)`,
                  }}
                />
                {items.map((item, index) => {
                  const focus = yearFocus(index, position)
                  return (
                    <button
                      key={`${item.title}-${index}`}
                      ref={(el) => {
                        tabs.current[index] = el
                      }}
                      type="button"
                      aria-controls={`milestone-${index}`}
                      aria-current={index === active ? 'step' : undefined}
                      tabIndex={index === active ? 0 : -1}
                      onClick={() => select(index)}
                      // Size/indent/opacity follow the scroll continuously (Bespoke's rail).
                      // Opacity floor 0.7 keeps inactive years well above 3:1 (large text) on ink.
                      style={{
                        fontSize: `${1.5 + focus * 3}rem`,
                        opacity: 0.7 + focus * 0.3,
                        transform: `translateX(${focus * 1.25}rem)`,
                      }}
                      className="origin-left rounded-sm py-1 text-left font-display leading-[1.1] font-light text-white tabular-nums hover:opacity-100"
                    >
                      {item.year}
                    </button>
                  )
                })}
              </div>

              <ol className="relative grid gap-10 pl-7 before:absolute before:inset-y-2 before:left-0 before:w-px before:bg-ink-700 md:pl-0 md:before:hidden">
                {items.map((item, index) => (
                  <li
                    key={`${item.title}-${index}`}
                    id={`milestone-${index}`}
                    // Desktop: all panels share one cell and cross-fade, like Bespoke.
                    className={cn(
                      'relative md:col-start-1 md:row-start-1 motion-safe:md:transition-[opacity,visibility] motion-safe:md:duration-500 motion-safe:md:ease-brand',
                      index !== active && 'md:invisible md:opacity-0',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-3 -left-7 -ml-1 size-2.5 rounded-full bg-brand-yellow md:hidden"
                    />
                    <p className="font-display text-4xl leading-none font-light text-white md:hidden">
                      {item.year}
                    </p>
                    <h3 className="mt-2 text-2xl leading-tight font-medium text-white md:mt-0 md:text-5xl">
                      {item.title}
                    </h3>
                    <ul className="mt-6 grid max-w-2xl gap-3 text-lg">
                      {item.body.map((line) => (
                        <li key={line} className="grid grid-cols-[1rem_1fr] gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[0.75em] h-0.5 w-3 bg-brand-yellow"
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                    {item.facts?.length ? (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {item.facts.map((fact) => (
                          <li
                            key={fact}
                            className="rounded-sm border border-ink-700 bg-ink-800 px-3 py-1.5 text-sm font-semibold text-white"
                          >
                            {fact}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </div>
      </div>
      <div id="after-story" tabIndex={-1} />
    </section>
  )
}
