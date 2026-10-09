/**
 * SEED — demo / placeholder content for the R0 company site.
 *
 * Every value here is a stand-in until the owner supplies real data (docs/OPEN-QUESTIONS.md,
 * TASKS T0.3–T0.5, T5.1). Do not invent real-looking business facts (RULES §0.5): numbers
 * show as "XX", contacts use reserved demo values, and unconfirmed claims stay out.
 * When real data arrives, replace this file (and seed.sql) — components don't change.
 */

export const isDemoContent = true // SEED: set to false once T5.1 replaces all placeholders

export const business = {
  name: 'Mojo Tools',
  legalName: '{Legal name — to be confirmed}', // SEED (A6)
  tagline: 'Tools, machinery & hardware for the trade',
  description:
    'Mojo Tools supplies tools, machinery and hardware materials to contractors, workshops, factories and resellers, with genuine brands and GST invoices.',
  address: {
    line1: 'Unit 00, Placeholder Industrial Estate', // SEED (A6)
    city: 'Your City',
    state: 'State',
    pincode: '000000',
  },
  hours: 'Mon–Sat, 9:30 am – 7:00 pm', // SEED (A6)
  phone: '+91 90000 00000', // SEED (A6) — demo number, not in service
  whatsapp: '+91 90000 00000', // SEED (A6)
  email: 'sales@example.com', // SEED (A6) — example.com is reserved for documentation
  gstin: null as string | null, // SEED (A6): shown only when supplied
  mapEmbedUrl: null as string | null, // SEED: Google Maps embed URL once the address is final
  directionsUrl: null as string | null,
  responsePromise: 'within 1 working day', // ✅ owner-confirmed (DECISIONS P9)
  social: [] as { label: string; href: string }[], // SEED: no social pages yet (C6)
}

export type ProductType =
  'Power Tools' | 'Hand Tools' | 'Machinery' | 'Measuring' | 'Safety' | 'Fasteners & Hardware'

export const productTypes: ProductType[] = [
  'Power Tools',
  'Hand Tools',
  'Machinery',
  'Measuring',
  'Safety',
  'Fasteners & Hardware',
]

export type Brand = {
  slug: string
  name: string
  productTypes: ProductType[]
  description: string
  /** Only true for brands the owner confirms Mojo is formally authorised for (C5). */
  isAuthorised: boolean
  isFeatured: boolean
}

const demoBrand = (letter: string, productTypes: ProductType[], isFeatured = true): Brand => ({
  slug: `brand-${letter.toLowerCase()}`,
  name: `Brand ${letter}`,
  productTypes,
  description: `Placeholder description for Brand ${letter}. The real brand list, logos and product ranges come from the owner (A1).`,
  isAuthorised: false,
  isFeatured,
})

// SEED (A1): eight demo brands; no real logos or names until the owner confirms them.
export const brands: Brand[] = [
  demoBrand('A', ['Power Tools', 'Hand Tools']),
  demoBrand('B', ['Power Tools', 'Measuring']),
  demoBrand('C', ['Hand Tools', 'Fasteners & Hardware']),
  demoBrand('D', ['Machinery']),
  demoBrand('E', ['Safety']),
  demoBrand('F', ['Measuring', 'Hand Tools']),
  demoBrand('G', ['Fasteners & Hardware'], false),
  demoBrand('H', ['Machinery', 'Power Tools'], false),
]

export type CategoryIcon =
  'drill' | 'wrench' | 'factory' | 'ruler' | 'disc' | 'nut' | 'hard-hat' | 'flame'

export type Category = {
  slug: string
  name: string
  icon: CategoryIcon
  blurb: string
  /** Longer description for the Products page. SEED: owner to confirm wording and ranges. */
  description: string
  /** Links the category to brands via their product types; undefined = ask us. */
  productType?: ProductType
}

// SEED (A8): top-level categories from DESIGN.md Prompt 1; to be replaced by the owner's list.
export const categories: Category[] = [
  {
    slug: 'power-tools',
    name: 'Power Tools',
    icon: 'drill',
    blurb: 'Drills, grinders, saws',
    description: 'Corded and cordless drills, angle grinders, saws, hammers and accessories.',
    productType: 'Power Tools',
  },
  {
    slug: 'hand-tools',
    name: 'Hand Tools',
    icon: 'wrench',
    blurb: 'Spanners, pliers, sets',
    description: 'Spanners, sockets, pliers, screwdrivers, hammers and complete tool kits.',
    productType: 'Hand Tools',
  },
  {
    slug: 'machinery',
    name: 'Machinery',
    icon: 'factory',
    blurb: 'Workshop machines',
    description: 'Workshop and site machines: drilling, cutting, compressors and more.',
    productType: 'Machinery',
  },
  {
    slug: 'measuring-testing',
    name: 'Measuring & Testing',
    icon: 'ruler',
    blurb: 'Gauges, meters',
    description: 'Measuring tapes, levels, gauges, calipers and electrical testers.',
    productType: 'Measuring',
  },
  {
    slug: 'cutting-abrasives',
    name: 'Cutting & Abrasives',
    icon: 'disc',
    blurb: 'Discs, blades, wheels',
    description: 'Cutting and grinding discs, saw blades, flap wheels and sanding products.',
  },
  {
    slug: 'fasteners-hardware',
    name: 'Fasteners & Hardware',
    icon: 'nut',
    blurb: 'Bolts, anchors, fixings',
    description: 'Bolts, screws, anchors, fixings and general hardware.',
    productType: 'Fasteners & Hardware',
  },
  {
    slug: 'safety-ppe',
    name: 'Safety & PPE',
    icon: 'hard-hat',
    blurb: 'Helmets, gloves, eyewear',
    description: 'Helmets, gloves, eyewear, ear protection, safety shoes and harnesses.',
    productType: 'Safety',
  },
  {
    slug: 'welding',
    name: 'Welding',
    icon: 'flame',
    blurb: 'Machines, rods, accessories',
    description: 'Welding machines, electrodes, torches and welding safety gear.',
  },
]

export function brandsForCategory(category: Category) {
  const type = category.productType
  return type ? brands.filter((brand) => brand.productTypes.includes(type)) : []
}

export function categoriesForBrand(brand: Brand) {
  return categories.filter((c) => c.productType && brand.productTypes.includes(c.productType))
}

export type HeroSlide = {
  id: string
  headline: [string, string]
  copy: string
  /** Placeholder visual until real photos arrive (A8). */
  tone: 'workbench' | 'warehouse' | 'jobsite'
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'jobsite',
    headline: ['Built for the', 'jobsite.'],
    copy: 'Genuine tools and machinery from trusted brands, for contractors, workshops and factories.',
    tone: 'workbench',
  },
  {
    id: 'one-quote',
    headline: ['Every brand.', 'One quote away.'],
    copy: 'Send us your list and get a priced quote within 1 working day.',
    tone: 'warehouse',
  },
  {
    id: 'trade',
    headline: ['Trade supply,', 'done right.'],
    copy: 'Bulk orders, GST invoices and expert advice from our team.',
    tone: 'jobsite',
  },
]

/** SEED (A4): real numbers only from the owner — shown as "XX" until then. */
export const stats = [
  { value: 'XX+', label: 'Years in business' },
  { value: 'XX,XXX+', label: 'Products' },
  { value: 'XX+', label: 'Brands' },
  { value: 'X,XXX+', label: 'Customers served' },
]

export const whyChoose = [
  { title: 'Genuine brands', body: 'Sourced from brand distributors, with proper billing.' },
  { title: 'Bulk & B2B quotes', body: 'Send a list, get a priced quote within 1 working day.' },
  { title: 'GST invoices', body: 'Correct GST billing for every business order.' },
  { title: 'Expert advice', body: 'Talk to our team on call or WhatsApp before you buy.' },
]

// SEED (A4): placeholder copy, to be replaced with the owner's own words.
export const about = {
  purpose: 'Placeholder: one line on why Mojo Tools exists.',
  mission:
    'Placeholder: a short paragraph on how Mojo Tools serves contractors, workshops, factories and resellers. The owner supplies the final wording.',
  values: [
    { title: 'Genuine products', body: 'Placeholder value description.' },
    { title: 'Fair pricing', body: 'Placeholder value description.' },
    { title: 'Expert help', body: 'Placeholder value description.' },
    { title: 'Reliable supply', body: 'Placeholder value description.' },
    { title: 'Long-term relationships', body: 'Placeholder value description.' },
  ],
  timeline: [
    { year: 'YYYY', title: 'Founded', body: 'Placeholder milestone.' },
    { year: 'YYYY', title: 'First warehouse', body: 'Placeholder milestone.' },
    { year: 'YYYY', title: 'New brand partnerships', body: 'Placeholder milestone.' },
    { year: 'YYYY', title: 'Expanded B2B supply', body: 'Placeholder milestone.' },
    { year: 'YYYY', title: 'Going online', body: 'Placeholder milestone.' },
  ],
  whyChoose: [
    { title: 'Wide reach', body: 'Placeholder.' },
    { title: 'Diverse portfolio', body: 'Placeholder.' },
    { title: 'Expert team', body: 'Placeholder.' },
    { title: 'Customer focus', body: 'Placeholder.' },
    { title: 'Quality assurance', body: 'Placeholder.' },
  ],
}

/** Real testimonials only (RULES §11). The home-page section is hidden while this is empty. */
export const testimonials: { quote: string; name: string; company: string }[] = []

export const enquiryTypes = [
  { value: 'contact', label: 'Product enquiry' },
  { value: 'quote', label: 'Bulk quote' },
  { value: 'price_list', label: 'Price list request' },
  { value: 'dealer', label: 'Become a dealer' },
  { value: 'support', label: 'Support' },
] as const

export type EnquiryType = (typeof enquiryTypes)[number]['value']

export function getBrand(slug: string) {
  return brands.find((brand) => brand.slug === slug)
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug)
}

export function whatsappHref(message: string) {
  const digits = business.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(`${message} [via website]`)}`
}
