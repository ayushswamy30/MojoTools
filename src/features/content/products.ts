import { brands, categories, type Category } from './site'
import catalogue from './catalogue.json'

export type Product = {
  slug: string
  /** Website reference customers quote back to us; not a stock code from the owner's system. */
  sku: string
  name: string
  /** Kind of item, shown on the picture band (e.g. "Angle grinder"). */
  type: string
  categorySlug: string
  /** Unset when the company profile does not tie the item to one brand. */
  brandSlug?: string
  /** Photo in public/; the category art shows while it is unset. */
  image?: string
  /** Fixed selling price in paise, excluding GST. Unset shows "Price on request" (RULES §0.5). */
  pricePaise?: number
  /** Optional list price in paise; when higher than the price the card shows a strike-through and the saving. */
  mrpPaise?: number
  description: string
  specs: [label: string, value: string][]
}

type CatalogueRow = Pick<Product, 'name' | 'type' | 'categorySlug' | 'brandSlug' | 'image'> & {
  specs?: [string, string][]
}

const codes: Record<string, string> = {
  'power-tools': 'PT',
  'hand-tools': 'HT',
  machinery: 'MC',
  'measuring-testing': 'MS',
  'cutting-abrasives': 'CA',
  'fasteners-hardware': 'FH',
  'valves-piping': 'VP',
  electricals: 'EL',
  'industrial-materials': 'IM',
  'safety-ppe': 'SP',
  welding: 'WD',
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

// Source: the owner's company profile deck (Sept 2026). Names, photos and printed specs only.
const counts: Record<string, number> = {}
export const products: Product[] = (catalogue as CatalogueRow[]).map((row) => {
  counts[row.categorySlug] = (counts[row.categorySlug] ?? 0) + 1
  return {
    ...row,
    slug: slugify(row.name),
    sku: `MT-${codes[row.categorySlug]}-${String(counts[row.categorySlug]).padStart(3, '0')}`,
    description: `${row.name}, supplied by Mojo Tools. Ask us for sizes, availability and a price.`,
    specs: [['Type', row.type], ...(row.specs ?? [])],
  }
})

export const productsInCategory = (category: Category) =>
  products.filter((product) => product.categorySlug === category.slug)

export const findProduct = (slug: string | undefined) =>
  slug ? products.find((product) => product.slug === slug) : undefined

export const brandName = (slug: string | undefined) =>
  slug ? (brands.find((brand) => brand.slug === slug)?.name ?? slug) : 'Brand on request'

// Catalogue self-check: every product points at a real category and brand, and slugs are unique.
for (const product of products) {
  if (!categories.some((c) => c.slug === product.categorySlug))
    throw new Error(`Unknown category ${product.categorySlug}`)
  if (product.brandSlug && !brands.some((b) => b.slug === product.brandSlug))
    throw new Error(`Unknown brand ${product.brandSlug}`)
}
if (new Set(products.map((p) => p.slug)).size !== products.length)
  throw new Error('Duplicate product slug')
