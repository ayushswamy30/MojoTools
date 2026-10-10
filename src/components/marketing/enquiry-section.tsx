import { brands, business, categories, enquiryTypes } from '@/features/content/site'
import type { Dictionary } from '@/i18n/dictionary'
import { publicEnv } from '@/lib/public-env'
import { EnquiryForm } from './enquiry-form'

/** Server wrapper: passes options and pre-fill to the client form. */
export function EnquirySection({
  dict,
  defaults,
  sourcePage,
}: {
  dict: Dictionary
  defaults: { type?: string; brand?: string; category?: string; message?: string }
  sourcePage: string
}) {
  return (
    <EnquiryForm
      labels={dict.form}
      types={enquiryTypes}
      brands={brands.map((brand) => ({ value: brand.slug, label: brand.name }))}
      categories={categories.map((category) => ({ value: category.slug, label: category.name }))}
      defaults={defaults}
      sourcePage={sourcePage}
      responsePromise={business.responsePromise}
      turnstileSiteKey={publicEnv.turnstileSiteKey}
    />
  )
}

const pick = (value: string | string[] | undefined) =>
  typeof value === 'string' ? value : undefined

/** Pre-fill only with known values so links can't inject arbitrary options. */
export function enquiryDefaults(searchParams: Record<string, string | string[] | undefined>) {
  const type = pick(searchParams.type)
  const brand = pick(searchParams.brand)
  const category = pick(searchParams.category)
  // Message pre-fill comes from Mojo Mitra's prepareQuote links; plain text, capped.
  const message = pick(searchParams.message)?.slice(0, 500)
  return {
    type: enquiryTypes.some((t) => t.value === type) ? type : undefined,
    brand: brands.some((b) => b.slug === brand) ? brand : undefined,
    category: categories.some((c) => c.slug === category) ? category : undefined,
    message: message || undefined,
  }
}
