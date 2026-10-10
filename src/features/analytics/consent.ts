export const CONSENT_COOKIE = 'mt_consent'
export const CONSENT_EVENT = 'mt:consent-change'

export type Consent = { analytics: boolean }

export function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`))
  if (!match?.[1]) return null
  return { analytics: decodeURIComponent(match[1]) === 'analytics' }
}

export function writeConsent(consent: Consent) {
  const value = consent.analytics ? 'analytics' : 'essential'
  const maxAge = 60 * 60 * 24 * 180
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax`
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }))
}
