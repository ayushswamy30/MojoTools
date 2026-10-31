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
  /** 🟡 Owner said "5+ years of trust" (11 Oct 2026); confirm the founding year (A11). */
  yearsInBusiness: 5,
  /**
   * Grievance officer (Consumer Protection (E-Commerce) Rules 2020, r.4; DPDP Act 2023 s.8(9)).
   * SEED (A12): a named person must be supplied before launch.
   */
  grievanceOfficer: {
    name: '{Grievance officer name}',
    designation: 'Grievance Officer',
    email: 'grievance@example.com',
    phone: '+91 90000 00000',
  },
  /** Where privacy requests go. SEED (A12): defaults to the grievance officer's inbox. */
  privacyEmail: 'grievance@example.com',
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
  // Brands on the Distributorship page are the ones Mojo officially distributes (DECISIONS P14).
  isAuthorised: true,
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

/**
 * Real numbers only, from the owner (A4). Empty hides the stats strip, so no placeholder
 * or unsupported figures are ever shown (RULES §0.5). Shape: { value: '5+', label: 'Years in business' }.
 */
export const stats: { value: string; label: string }[] = []

export const whyChoose = [
  {
    icon: 'seal',
    title: 'Genuine brands, nothing else',
    body: 'Every product comes through our official brand distributorships, with a proper bill.',
  },
  {
    icon: 'crate',
    title: 'Your list, priced in a day',
    body: `Send a bulk or B2B list. Get a priced quote ${business.responsePromise}.`,
  },
  {
    icon: 'invoice',
    title: 'A GST invoice, every order',
    body: 'Correct GST billing on every business purchase, so you can claim input credit.',
  },
  {
    icon: 'advice',
    title: 'Ask before you buy',
    body: 'Not sure which tool fits? Our team will help on call or WhatsApp.',
  },
] as const

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

export type Award = {
  title: string
  awardedBy: string
  year: string
  description: string
}

/**
 * Real awards only (RULES §11), from the owner (A9). Empty shows a short "coming soon" note;
 * placeholder award cards were removed so nothing invented can reach the public site.
 */
export const awards: Award[] = []
