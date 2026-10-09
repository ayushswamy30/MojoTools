import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BadgeCheck, MessageCircle } from 'lucide-react'
import { brands, categories, getBrand, whatsappHref } from '@/features/content/site'
import { getDictionary, t } from '@/i18n/dictionary'
import en from '@/i18n/messages/en.json'
import { publicEnv } from '@/lib/public-env'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionTitle } from '@/components/ui/section-title'
import { CategoryTiles } from '@/components/marketing/category-tiles'
import { PageHero } from '@/components/marketing/page-hero'
import { BrandViewTracker } from './brand-view-tracker'

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/brands/[slug]'>): Promise<Metadata> {
  const brand = getBrand((await params).slug)
  if (!brand) return {}
  return {
    title: t(en.brandsPage.brandMetaTitle, { brand: brand.name }),
    description: t(en.brandsPage.brandMetaDescription, { brand: brand.name }),
    alternates: { canonical: `/brands/${brand.slug}` },
  }
}

export default async function BrandPage({ params }: PageProps<'/[lang]/brands/[slug]'>) {
  const brand = getBrand((await params).slug)
  if (!brand) notFound()
  const dict = await getDictionary()
  // Product range shown as the categories that match the brand's product types (R0 showcase; R1 uses real data).
  const range = categories.filter((category) =>
    brand.productTypes.some((type) =>
      category.name.toLowerCase().includes(type.split(' ')[0]!.toLowerCase()),
    ),
  )
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.chrome.home, item: publicEnv.siteUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: dict.chrome.brands,
        item: `${publicEnv.siteUrl}/brands`,
      },
      { '@type': 'ListItem', position: 3, name: brand.name },
    ],
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <BrandViewTracker brand={brand.slug} />
      <PageHero
        title={brand.name}
        crumbs={[
          { label: dict.chrome.home, href: '/' },
          { label: dict.chrome.brands, href: '/brands' },
          { label: brand.name },
        ]}
        breadcrumbLabel={dict.chrome.breadcrumb}
      />
      <section aria-labelledby="brand-about-title" className="py-12">
        <Container className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div>
            <h2 id="brand-about-title" className="text-2xl font-bold">
              {t(dict.brandsPage.aboutBrand, { brand: brand.name })}
            </h2>
            {brand.isAuthorised ? (
              <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-brand-yellow-soft px-3 py-1 text-sm font-semibold text-ink-900">
                <BadgeCheck aria-hidden="true" className="size-4" /> {dict.brands.authorised}
              </p>
            ) : null}
            <p className="mt-4 max-w-2xl">{brand.description}</p>
            <p className="mt-2 text-sm text-steel-500">{brand.productTypes.join(' · ')}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href={`/quote?type=quote&brand=${brand.slug}`}
              className={buttonVariants({ variant: 'primary', size: 'lg' })}
            >
              {t(dict.brands.enquire, { brand: brand.name })}
            </Link>
            <Link
              href={`/quote?type=price_list&brand=${brand.slug}`}
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              {dict.brands.requestPriceList}
            </Link>
            <a
              href={whatsappHref(`Hi, I'm interested in ${brand.name} products`)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'whatsapp', size: 'lg' })}
            >
              <MessageCircle aria-hidden="true" /> {dict.chrome.whatsapp}
              <span className="sr-only"> {dict.chrome.opensNewTab}</span>
            </a>
          </div>
        </Container>
      </section>
      {range.length > 0 ? (
        <section aria-labelledby="brand-range-title" className="bg-steel-50 py-12">
          <Container>
            <SectionTitle id="brand-range-title" title={dict.brands.productRange} />
            <CategoryTiles categories={range} enquireLabel={dict.home.enquire} />
          </Container>
        </section>
      ) : null}
    </>
  )
}
