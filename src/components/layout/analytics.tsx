'use client'

import { useEffect } from 'react'
import { ATTRIBUTION_COOKIE, attributionFrom } from '@/features/analytics/attribution'
import { CONSENT_EVENT, readConsent, type Consent } from '@/features/analytics/consent'

function loadGa(gaId: string) {
  if (document.getElementById('ga4')) return
  const script = document.createElement('script')
  script.id = 'ga4'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
  document.head.appendChild(script)
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void }
  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag() {
    // gtag.js expects the `arguments` object itself.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments)
  }
  w.gtag('js', new Date())
  w.gtag('config', gaId, { anonymize_ip: true })
}

/**
 * Captures first-touch UTM attribution (essential, no tracking) and loads GA4 only after the
 * visitor accepts analytics cookies (DECISIONS D13).
 */
export function Analytics({ gaId }: { gaId?: string }) {
  useEffect(() => {
    if (!document.cookie.includes(`${ATTRIBUTION_COOKIE}=`)) {
      const attribution = attributionFrom(new URL(window.location.href), document.referrer)
      if (attribution) {
        const value = encodeURIComponent(JSON.stringify(attribution))
        document.cookie = `${ATTRIBUTION_COOKIE}=${value}; Max-Age=${60 * 60 * 24 * 30}; Path=/; SameSite=Lax`
      }
    }
    if (!gaId) return
    if (readConsent()?.analytics) loadGa(gaId)
    const onChange = (event: Event) => {
      if ((event as CustomEvent<Consent>).detail.analytics) loadGa(gaId)
    }
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [gaId])
  return null
}
