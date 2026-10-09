import { lang } from 'next/root-params'
import { notFound } from 'next/navigation'
import { hasLocale } from './config'

const dictionaries = {
  en: () => import('./messages/en.json').then((module) => module.default),
}

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['en']>>

/** Locale comes from the root `[lang]` segment, so callers don't pass it (Next.js root params). */
export async function getDictionary(): Promise<Dictionary> {
  const locale = await lang()
  if (!hasLocale(locale)) notFound()
  return dictionaries[locale]()
}

/** Replace `{name}` placeholders in a message. */
export function t(message: string, values: Record<string, string | number>): string {
  return message.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  )
}
