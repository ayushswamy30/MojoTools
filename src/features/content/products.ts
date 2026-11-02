import { brands, categories, type Category } from './site'

export type Product = {
  slug: string
  /** Item code customers quote back to us. */
  sku: string
  name: string
  /** Kind of item, shown on the picture band (e.g. "Angle grinder"). */
  type: string
  categorySlug: string
  brandSlug: string
  /** Fixed selling price in paise, excluding GST (GST is added at checkout, R1). */
  pricePaise: number
  /** Optional list price in paise; when higher than the price the card shows a strike-through and the saving. */
  mrpPaise?: number
  description: string
  specs: [label: string, value: string][]
}

type Seed = [
  type: string,
  name: string,
  brand: string,
  priceRupees: number,
  mrpRupees: number | undefined,
  specs: [string, string][],
]

// SEED: sample products and made-up prices for layout only. The owner's real list replaces this file.
const seed: Record<string, { code: string; items: Seed[] }> = {
  'power-tools': {
    code: 'PT',
    items: [
      [
        'Cordless drill',
        'Cordless Drill Driver 18V',
        'A',
        6499,
        7999,
        [
          ['Voltage', '18 V'],
          ['Chuck', '13 mm keyless'],
          ['Battery', '2 × 2.0 Ah'],
        ],
      ],
      [
        'Angle grinder',
        'Angle Grinder 100 mm',
        'B',
        2899,
        undefined,
        [
          ['Power', '850 W'],
          ['Disc', '100 mm'],
          ['Speed', '11,000 rpm'],
        ],
      ],
      [
        'Impact drill',
        'Impact Drill 13 mm',
        'H',
        3499,
        3999,
        [
          ['Power', '650 W'],
          ['Chuck', '13 mm'],
          ['Modes', 'Drill / impact'],
        ],
      ],
      [
        'Rotary hammer',
        'Rotary Hammer SDS-plus',
        'A',
        8999,
        undefined,
        [
          ['Power', '800 W'],
          ['Impact energy', '2.7 J'],
          ['Shank', 'SDS-plus'],
        ],
      ],
      [
        'Circular saw',
        'Circular Saw 185 mm',
        'B',
        7499,
        8499,
        [
          ['Power', '1,400 W'],
          ['Blade', '185 mm'],
          ['Cut depth', '65 mm'],
        ],
      ],
      [
        'Jigsaw',
        'Jigsaw 650 W',
        'H',
        4299,
        undefined,
        [
          ['Power', '650 W'],
          ['Stroke', '20 mm'],
          ['Bevel', '0–45°'],
        ],
      ],
      [
        'Heat gun',
        'Heat Gun 2000 W',
        'A',
        2199,
        undefined,
        [
          ['Power', '2,000 W'],
          ['Temperature', '50–600 °C'],
          ['Airflow', '2 settings'],
        ],
      ],
      [
        'Blower',
        'Air Blower 600 W',
        'B',
        2499,
        2999,
        [
          ['Power', '600 W'],
          ['Speed', 'Variable'],
          ['Weight', '1.8 kg'],
        ],
      ],
    ],
  },
  'hand-tools': {
    code: 'HT',
    items: [
      [
        'Spanner set',
        'Combination Spanner Set, 12 pc',
        'C',
        1899,
        2299,
        [
          ['Sizes', '6–22 mm'],
          ['Material', 'Chrome vanadium'],
          ['Pieces', '12'],
        ],
      ],
      [
        'Plier',
        'Combination Plier 200 mm',
        'A',
        449,
        undefined,
        [
          ['Length', '200 mm'],
          ['Grip', 'Insulated'],
          ['Rating', '1,000 V'],
        ],
      ],
      [
        'Screwdriver set',
        'Screwdriver Set, 6 pc',
        'F',
        699,
        undefined,
        [
          ['Tips', 'Flat + Phillips'],
          ['Pieces', '6'],
          ['Handle', 'Soft grip'],
        ],
      ],
      [
        'Tool kit',
        'Socket Tool Kit, 46 pc',
        'C',
        3299,
        3999,
        [
          ['Drive', '1/4 inch'],
          ['Pieces', '46'],
          ['Case', 'Blow-moulded'],
        ],
      ],
    ],
  },
  machinery: {
    code: 'MC',
    items: [
      [
        'Bench drill',
        'Bench Drill Press 16 mm',
        'D',
        18999,
        undefined,
        [
          ['Capacity', '16 mm'],
          ['Speeds', '5'],
          ['Motor', '370 W'],
        ],
      ],
      [
        'Air compressor',
        'Air Compressor 50 L',
        'H',
        15499,
        17999,
        [
          ['Tank', '50 L'],
          ['Pressure', '8 bar'],
          ['Motor', '2 HP'],
        ],
      ],
      [
        'Cut-off machine',
        'Chop Saw 355 mm',
        'D',
        9999,
        undefined,
        [
          ['Wheel', '355 mm'],
          ['Power', '2,000 W'],
          ['Angle', '0–45°'],
        ],
      ],
      [
        'Bench grinder',
        'Bench Grinder 150 mm',
        'D',
        4599,
        undefined,
        [
          ['Wheels', '150 mm × 2'],
          ['Power', '250 W'],
          ['Speed', '2,950 rpm'],
        ],
      ],
    ],
  },
  'measuring-testing': {
    code: 'MS',
    items: [
      [
        'Measuring tape',
        'Measuring Tape 5 m',
        'F',
        299,
        undefined,
        [
          ['Length', '5 m'],
          ['Width', '19 mm'],
          ['Lock', 'Auto'],
        ],
      ],
      [
        'Spirit level',
        'Spirit Level 600 mm',
        'B',
        899,
        undefined,
        [
          ['Length', '600 mm'],
          ['Vials', '3'],
          ['Body', 'Aluminium'],
        ],
      ],
      [
        'Vernier caliper',
        'Digital Caliper 150 mm',
        'F',
        1799,
        2199,
        [
          ['Range', '0–150 mm'],
          ['Resolution', '0.01 mm'],
          ['Display', 'LCD'],
        ],
      ],
      [
        'Multimeter',
        'Digital Multimeter',
        'B',
        1499,
        undefined,
        [
          ['DC voltage', 'Up to 600 V'],
          ['Category', 'CAT III'],
          ['Display', 'Backlit'],
        ],
      ],
    ],
  },
  'cutting-abrasives': {
    code: 'CA',
    items: [
      [
        'Cutting disc',
        'Metal Cutting Disc 100 mm, pack of 25',
        'A',
        749,
        undefined,
        [
          ['Size', '100 × 1 × 16 mm'],
          ['For', 'Steel, stainless'],
          ['Pack', '25'],
        ],
      ],
      [
        'Grinding wheel',
        'Grinding Wheel 100 mm, pack of 10',
        'A',
        599,
        undefined,
        [
          ['Size', '100 × 6 × 16 mm'],
          ['For', 'Steel'],
          ['Pack', '10'],
        ],
      ],
      [
        'Flap disc',
        'Flap Disc 100 mm, grit 60, pack of 10',
        'B',
        899,
        1099,
        [
          ['Size', '100 mm'],
          ['Grit', '60'],
          ['Pack', '10'],
        ],
      ],
      [
        'Saw blade',
        'TCT Saw Blade 185 mm',
        'H',
        1199,
        undefined,
        [
          ['Size', '185 mm'],
          ['Teeth', '40'],
          ['For', 'Wood'],
        ],
      ],
    ],
  },
  'fasteners-hardware': {
    code: 'FH',
    items: [
      [
        'Hex bolts',
        'Hex Bolt M10 × 50, box of 100',
        'C',
        899,
        undefined,
        [
          ['Size', 'M10 × 50 mm'],
          ['Grade', '8.8'],
          ['Box', '100'],
        ],
      ],
      [
        'Anchor bolts',
        'Anchor Fastener M12, box of 50',
        'G',
        1299,
        undefined,
        [
          ['Size', 'M12'],
          ['Finish', 'Zinc'],
          ['Box', '50'],
        ],
      ],
      [
        'Wall plugs',
        'Nylon Wall Plugs 8 mm, box of 500',
        'G',
        349,
        undefined,
        [
          ['Size', '8 mm'],
          ['Material', 'Nylon'],
          ['Box', '500'],
        ],
      ],
      [
        'Self-drilling screws',
        'Self-Drilling Screws, box of 250',
        'C',
        549,
        649,
        [
          ['Size', '4.2 × 19 mm'],
          ['Head', 'Hex washer'],
          ['Box', '250'],
        ],
      ],
    ],
  },
  'safety-ppe': {
    code: 'SP',
    items: [
      [
        'Safety helmet',
        'Safety Helmet, ratchet',
        'E',
        349,
        undefined,
        [
          ['Standard', 'IS 2925'],
          ['Fit', 'Ratchet'],
          ['Colour', 'Yellow'],
        ],
      ],
      [
        'Safety shoes',
        'Safety Shoes, steel toe',
        'E',
        1499,
        1799,
        [
          ['Toe', 'Steel'],
          ['Sole', 'PU'],
          ['Sizes', '6–11'],
        ],
      ],
      [
        'Work gloves',
        'Cut-Resistant Gloves, pair',
        'E',
        249,
        undefined,
        [
          ['Level', 'Cut 5'],
          ['Coating', 'Nitrile'],
          ['Sizes', 'M, L, XL'],
        ],
      ],
      [
        'Safety goggles',
        'Safety Goggles, anti-fog',
        'E',
        199,
        undefined,
        [
          ['Lens', 'Polycarbonate'],
          ['Coating', 'Anti-fog'],
          ['Vent', 'Indirect'],
        ],
      ],
    ],
  },
  welding: {
    code: 'WD',
    items: [
      [
        'Welding machine',
        'Inverter Welding Machine 200 A',
        'D',
        8999,
        10499,
        [
          ['Output', '200 A'],
          ['Process', 'MMA (stick)'],
          ['Input', '230 V'],
        ],
      ],
      [
        'MIG welder',
        'MIG Welding Machine 250 A',
        'D',
        32999,
        undefined,
        [
          ['Output', '250 A'],
          ['Wire', '0.8–1.0 mm'],
          ['Input', '415 V'],
        ],
      ],
      [
        'Welding rods',
        'Welding Electrodes 3.15 mm, 5 kg',
        'D',
        1099,
        undefined,
        [
          ['Size', '3.15 mm'],
          ['Type', 'E6013'],
          ['Pack', '5 kg'],
        ],
      ],
      [
        'Welding helmet',
        'Auto-Darkening Welding Helmet',
        'E',
        1999,
        2499,
        [
          ['Shade', '9–13'],
          ['Switch', '1/25,000 s'],
          ['Power', 'Solar + battery'],
        ],
      ],
    ],
  },
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const isSampleCatalogue = true

export const products: Product[] = Object.entries(seed).flatMap(([categorySlug, { code, items }]) =>
  items.map(([type, name, brand, price, mrp, specs], index) => ({
    slug: slugify(name),
    sku: `SAMPLE-${code}-${String(index + 1).padStart(2, '0')}`,
    name,
    type,
    categorySlug,
    brandSlug: `brand-${brand.toLowerCase()}`,
    pricePaise: price * 100,
    mrpPaise: mrp === undefined ? undefined : mrp * 100,
    description: `Sample listing to show the layout. ${name} from Brand ${brand}; the real description, photos and price come from the owner's product list.`,
    specs,
  })),
)

export const productsInCategory = (category: Category) =>
  products.filter((product) => product.categorySlug === category.slug)

export const findProduct = (slug: string | undefined) =>
  slug ? products.find((product) => product.slug === slug) : undefined

export const brandName = (slug: string) => brands.find((brand) => brand.slug === slug)?.name ?? slug

// Seed self-check: every product points at a real category and brand, and slugs are unique.
for (const product of products) {
  if (!categories.some((c) => c.slug === product.categorySlug))
    throw new Error(`Unknown category ${product.categorySlug}`)
  if (!brands.some((b) => b.slug === product.brandSlug))
    throw new Error(`Unknown brand ${product.brandSlug}`)
}
if (new Set(products.map((p) => p.slug)).size !== products.length)
  throw new Error('Duplicate product slug')
