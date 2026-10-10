import {
  brands,
  brandsForCategory,
  business,
  categories,
  categoriesForBrand,
  enquiryTypes,
  whatsappHref,
  type EnquiryType,
} from '@/features/content/site'
import type { AssistantLink } from './config'

/**
 * Data the assistant's tools return. R0 searches the site content (categories and brands);
 * in R1 `searchCatalog` switches to the real product search (ARCHITECTURE §7).
 */

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9 ]/g, ' ')

export function searchCatalog(query: string) {
  const words = normalise(query)
    .split(/\s+/)
    .filter((w) => w.length > 2)
  const score = (text: string) => words.filter((w) => normalise(text).includes(w)).length
  const matchedCategories = categories
    .map((c) => ({ c, s: score(`${c.name} ${c.blurb} ${c.description}`) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map(({ c }) => ({
      name: c.name,
      description: c.description,
      brands: brandsForCategory(c).map((b) => b.name),
      page: `/products#${c.slug}`,
      quote: quoteHref({ type: 'quote', category: c.slug }),
    }))
  const matchedBrands = brands
    .filter((b) => score(`${b.name} ${b.productTypes.join(' ')}`) > 0)
    .slice(0, 4)
    .map((b) => ({
      name: b.name,
      productTypes: b.productTypes,
      categories: categoriesForBrand(b).map((c) => c.name),
      page: `/distributorship/${b.slug}`,
    }))
  return {
    categories: matchedCategories,
    brands: matchedBrands,
    note: 'Product-level details (models, prices, stock) are not online yet; offer a quote for exact prices.',
  }
}

export function quoteHref(input: {
  type: EnquiryType
  category?: string
  brand?: string
  message?: string
}) {
  const params = new URLSearchParams({ type: input.type })
  if (input.category && categories.some((c) => c.slug === input.category))
    params.set('category', input.category)
  if (input.brand && brands.some((b) => b.slug === input.brand)) params.set('brand', input.brand)
  if (input.message) params.set('message', input.message.slice(0, 500))
  return `/quote?${params.toString()}`
}

export const sitePages = {
  home: { label: 'Home', href: '/' },
  about: { label: 'About us', href: '/about' },
  products: { label: 'Products', href: '/products' },
  distributorship: { label: 'Distributorship (our brands)', href: '/distributorship' },
  awards: { label: 'Awards', href: '/awards' },
  contact: { label: 'Contact & directions', href: '/contact' },
  quote: { label: 'Get a quote', href: '/quote' },
  privacy: { label: 'Privacy policy', href: '/policies/privacy' },
} as const

export type SitePage = keyof typeof sitePages

export function contactLinks(topic?: string): AssistantLink[] {
  return [
    {
      label: 'Chat on WhatsApp',
      href: whatsappHref(topic ? `Hi, ${topic}` : 'Hi, I need help'),
      external: true,
    },
    {
      label: `Call ${business.phone}`,
      href: `tel:+91${business.phone.replace(/\D/g, '').slice(-10)}`,
    },
  ]
}

export function businessFacts() {
  return {
    name: business.name,
    description: business.description,
    address: `${business.address.line1}, ${business.address.city}, ${business.address.state} ${business.address.pincode}`,
    hours: business.hours,
    phone: business.phone,
    whatsapp: business.whatsapp,
    email: business.email,
    responsePromise: business.responsePromise,
    enquiryTypes: enquiryTypes.map((t) => t.label),
    onlineOrdering:
      'Not live yet; coming with the online shop. Orders and bulk prices are handled by quote.',
  }
}
