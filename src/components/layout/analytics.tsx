'use client'

import { useEffect } from 'react'
import { ATTRIBUTION_COOKIE, attributionFrom } from '@/features/analytics/attribution'
import {
  CONSENT_EVENT,
  deleteCookies,
  readConsent,
  type Consent,
} from '@/features/analytics/consent'

type GaWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
} & Record<string, unknown>

function loadGa(gaId: string) {
  const w = window as unknown as GaWindow
  w[`ga-disable-${gaId}`] = false
  if (document.getElementById('ga4')) return
  const script = document.createElement('script')
  script.id = 'ga4'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
  document.head.appendChild(script)
  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag() {
    // gtag.js expects the `arguments` object itself.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments)
  }
  w.gtag('js', new Date())
  w.gtag('config', gaId)
}

/** Withdrawal must be as easy as giving consent (DPDP Act s.6(4)): stop GA and delete its cookies. */
function stopGa(gaId: string) {
  const w = window as unknown as GaWindow
  w[`ga-disable-${gaId}`] = true
  deleteCookies((name) => name === '_ga' || name.startsWith('_ga_') || name === '_gid')
}

/**
 * Loads GA4 and stores first-touch campaign attribution only after the visitor accepts
 * analytics cookies (DECISIONS D13, D20). Attribution is read from the landing URL in memory
 * and written as a cookie only if consent is given while the visitor is on the site.
 */
export function Analytics({ gaId }: { gaId?: string }) {
  useEffect(() => {
    const landing = attributionFrom(new URL(window.location.href), document.referrer)

    const apply = (consent: Consent | null) => {
      if (consent?.analytics) {
        if (landing && !document.cookie.includes(`${ATTRIBUTION_COOKIE}=`)) {
          const value = encodeURIComponent(JSON.stringify(landing))
          document.cookie = `${ATTRIBUTION_COOKIE}=${value}; Max-Age=${60 * 60 * 24 * 30}; Path=/; SameSite=Lax`
        }
        if (gaId) loadGa(gaId)
      } else if (consent) {
        deleteCookies((name) => name === ATTRIBUTION_COOKIE)
        if (gaId) stopGa(gaId)
      }
    }

    apply(readConsent())
    const onChange = (event: Event) => apply((event as CustomEvent<Consent>).detail)
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [gaId])
  return null
}
