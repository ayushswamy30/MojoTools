/** Public (browser-visible) settings. All optional; features switch off when missing. */
export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  /** Only `true` on the real production launch (T17.11). Previews stay noindex (T5.5). */
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true',
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
}
