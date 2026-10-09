/** First-touch attribution (ARCHITECTURE §11): stored for 30 days, saved on enquiries. */
export const ATTRIBUTION_COOKIE = 'mt_attr'

export type Attribution = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
}

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const

/** Build attribution from a landing URL + referrer. External referrers only. */
export function attributionFrom(url: URL, referrer: string): Attribution | null {
  const result: Attribution = {}
  for (const key of KEYS) {
    const value = url.searchParams.get(key)?.trim()
    if (value) result[key] = value.slice(0, 100)
  }
  if (referrer) {
    try {
      const ref = new URL(referrer)
      if (ref.host !== url.host) result.referrer = ref.origin.slice(0, 200)
    } catch {
      // ignore malformed referrers
    }
  }
  return Object.keys(result).length > 0 ? result : null
}

export function parseAttribution(raw: string | undefined): Attribution {
  if (!raw) return {}
  try {
    const value: unknown = JSON.parse(decodeURIComponent(raw))
    if (!value || typeof value !== 'object') return {}
    const record = value as Record<string, unknown>
    const out: Attribution = {}
    for (const key of [...KEYS, 'referrer'] as const) {
      const v = record[key]
      if (typeof v === 'string' && v.length <= 200) out[key] = v
    }
    return out
  } catch {
    return {}
  }
}
