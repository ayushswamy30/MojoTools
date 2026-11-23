/** Public (browser-visible) settings. All optional; features switch off when missing. */
export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  /** Only `true` on the real production launch (T17.11). Previews stay noindex (T5.5). */
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true',
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  // Set in Vercel so real numbers and emails never enter this public repo; demo values otherwise.
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 90000 00000',
  contactWhatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || '+91 90000 00000',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'sales@example.com',
}
