'use client'

/** R0 analytics events (ARCHITECTURE §11). Sent only when GA has loaded after consent. */
export type AnalyticsEvent =
  | 'generate_lead'
  | 'whatsapp_click'
  | 'call_click'
  | 'price_list_request'
  | 'brand_view'
  | 'notify_signup'

type Gtag = (command: 'event', name: string, params?: Record<string, string>) => void

export function trackEvent(name: AnalyticsEvent, params: Record<string, string> = {}) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag === 'function') gtag('event', name, { page: window.location.pathname, ...params })
}
