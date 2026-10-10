'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { readConsent, writeConsent } from '@/features/analytics/consent'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

type Labels = {
  title: string
  body: string
  acceptAll: string
  rejectNonEssential: string
  manage: string
  analyticsLabel: string
  analyticsHint: string
  save: string
  privacyLink: string
}

/**
 * In-house, non-modal consent bar (DECISIONS D13): Accept / Reject non-essential / Manage
 * with equal prominence. While visible it publishes its height so content and the WhatsApp
 * button move up and nothing focused is hidden behind it (WCAG 2.4.11).
 */
export function CookieBanner({ labels }: { labels: Labels }) {
  const [visible, setVisible] = useState(false)
  const [managing, setManaging] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const hintId = useId()

  useEffect(() => {
    // Reading a cookie is only possible after hydration; show the bar if no choice was made yet.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(readConsent() === null)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (!visible || !ref.current) {
      root.style.setProperty('--cookie-banner-height', '0px')
      return
    }
    const node = ref.current
    const observer = new ResizeObserver(() => {
      root.style.setProperty('--cookie-banner-height', `${node.offsetHeight}px`)
    })
    observer.observe(node)
    return () => {
      observer.disconnect()
      root.style.setProperty('--cookie-banner-height', '0px')
    }
  }, [visible])

  if (!visible) return null

  const choose = (allowAnalytics: boolean) => {
    writeConsent({ analytics: allowAnalytics })
    setVisible(false)
  }

  return (
    <div
      ref={ref}
      role="region"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-[var(--z-cookie)] border-t-4 border-brand-yellow bg-white shadow-overlay"
    >
      <Container className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h2 id={titleId} className="font-sans text-base font-semibold text-ink-900">
            {labels.title}
          </h2>
          <p className="mt-1 text-sm">
            {labels.body}{' '}
            <Link href="/policies/privacy" className="text-info underline underline-offset-4">
              {labels.privacyLink}
            </Link>
          </p>
          {managing ? (
            <div className="mt-3 flex items-start gap-3">
              <input
                id={`${titleId}-analytics`}
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                aria-describedby={hintId}
                className="mt-1 size-5 accent-ink-900"
              />
              <div>
                <label htmlFor={`${titleId}-analytics`} className="font-semibold text-ink-900">
                  {labels.analyticsLabel}
                </label>
                <p id={hintId} className="text-sm text-steel-500">
                  {labels.analyticsHint}
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {managing ? (
            <Button variant="secondary" onClick={() => choose(analytics)}>
              {labels.save}
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={() => choose(true)}>
                {labels.acceptAll}
              </Button>
              <Button variant="secondary" onClick={() => choose(false)}>
                {labels.rejectNonEssential}
              </Button>
              <Button variant="outline" onClick={() => setManaging(true)}>
                {labels.manage}
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
