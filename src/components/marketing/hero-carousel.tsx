'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Pause, Play } from 'lucide-react'
import type { HeroSlide } from '@/features/content/site'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { cn } from '@/lib/cn'

const SLIDE_MS = 7000

type Labels = {
  region: string
  slide: string
  pause: string
  play: string
  goTo: string
  primaryCta: string
  secondaryCta: string
}

const fill = (message: string, n: number, total: number) =>
  message.replace('{n}', String(n)).replace('{total}', String(total))

/**
 * Home hero carousel — accessibility spec in DESIGN §8.2:
 * pause first in tab order; stops on hover / focus / user pause; starts paused under
 * reduced motion; slide semantics; inactive slides inert; live region polite only after
 * manual navigation.
 */
export function HeroCarousel({ slides, labels }: { slides: HeroSlide[]; labels: Labels }) {
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const [manual, setManual] = useState(false)
  const regionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const paused = userPaused || reducedMotion
  const rotating = !paused && !hovered && !focusWithin
  const total = slides.length

  useEffect(() => {
    if (!rotating || total < 2) return
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % total), SLIDE_MS)
    return () => window.clearTimeout(timer)
  }, [rotating, index, total])

  const goTo = useCallback((next: number) => {
    setManual(true)
    setIndex(next)
  }, [])

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="on-dark relative isolate bg-ink-900"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(event) => {
        if (!regionRef.current?.contains(event.relatedTarget as Node | null)) setFocusWithin(false)
      }}
    >
      <div className="relative h-[520px] md:h-[640px]">
        <div aria-live={rotating ? 'off' : manual ? 'polite' : 'off'}>
          {slides.map((slide, i) => {
            const active = i === index
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={fill(labels.slide, i + 1, total)}
                inert={!active}
                className={cn(
                  'absolute inset-0 transition-opacity duration-[600ms] ease-brand',
                  active ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
              >
                <PlaceholderVisual
                  tone={slide.tone}
                  label="Placeholder photo"
                  className="absolute inset-0"
                />
                {/* Scrim keeps white text ≥ 4.5:1 on any photo (DESIGN §8.2). */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/70 to-ink-900/10"
                />
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 size-24 bg-brand-yellow [clip-path:polygon(0_0,100%_0,0_100%)] md:size-32"
                />
                <Container className="relative flex h-full flex-col justify-end pb-28 md:pb-32">
                  {/* The page's h1 lives outside the carousel so it never becomes inert. */}
                  <p className="max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.01em] text-white uppercase [font-stretch:125%] md:text-6xl">
                    {slide.headline[0]}
                    <br />
                    {slide.headline[1]}
                  </p>
                  <p className="mt-4 max-w-xl text-lg text-steel-100">{slide.copy}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      href="/quote?type=quote"
                      className={buttonVariants({ variant: 'primary', size: 'lg' })}
                    >
                      {labels.primaryCta}
                    </Link>
                    <Link
                      href="/distributorship"
                      className="inline-flex min-h-11 items-center font-semibold text-white underline underline-offset-4"
                    >
                      {labels.secondaryCta} <span aria-hidden="true">&nbsp;→</span>
                    </Link>
                  </div>
                </Container>
              </div>
            )
          })}
        </div>

        <Container className="absolute inset-x-0 bottom-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            className="order-first inline-flex size-11 items-center justify-center rounded-sm border border-white/60 text-white hover:bg-white/10"
          >
            {paused ? (
              <Play aria-hidden="true" className="size-4" />
            ) : (
              <Pause aria-hidden="true" className="size-4" />
            )}
            <span className="sr-only">{paused ? labels.play : labels.pause}</span>
          </button>
          <ol className="flex items-center gap-1">
            {slides.map((slide, i) => (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === index ? 'true' : undefined}
                  className={cn(
                    'inline-flex size-11 items-center justify-center font-mono text-sm',
                    i === index ? 'font-bold text-brand-yellow' : 'text-steel-200 hover:text-white',
                  )}
                >
                  <span aria-hidden="true">{i + 1}</span>
                  <span className="sr-only">{fill(labels.goTo, i + 1, total)}</span>
                </button>
              </li>
            ))}
          </ol>
          <div aria-hidden="true" className="h-0.5 w-16 bg-white/30">
            <div
              className="h-full bg-brand-yellow"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </Container>
      </div>
      <div aria-hidden="true" className="h-1 bg-brand-yellow" />
    </section>
  )
}
