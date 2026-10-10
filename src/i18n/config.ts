export const locales = ['en'] as const // 'hi' arrives in R2 (DECISIONS D17)
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)
