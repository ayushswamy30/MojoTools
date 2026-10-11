export const CONSENT_COOKIE = 'mt_consent'
export const CONSENT_EVENT = 'mt:consent-change'
/** Fired by "Cookie settings" links so visitors can change or withdraw consent at any time. */
export const OPEN_COOKIE_SETTINGS_EVENT = 'mt:open-cookie-settings'

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

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))
}

/**
 * Deletes first-party cookies whose name matches, on this host and its parent domains
 * (Google Analytics sets `_ga*` on the top-level domain). Used when consent is withdrawn.
 */
export function deleteCookies(matches: (name: string) => boolean) {
  const names = document.cookie
    .split('; ')
    .map((pair) => pair.split('=')[0] ?? '')
    .filter((name) => name && matches(name))
  const parts = window.location.hostname.split('.')
  const domains = [''].concat(parts.map((_, i) => `; Domain=.${parts.slice(i).join('.')}`))
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}`
    }
  }
}
