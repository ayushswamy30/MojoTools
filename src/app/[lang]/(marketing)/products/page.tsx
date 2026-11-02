import type { Metadata } from 'next'
import { Suspense } from 'react'
import { business, categories, whatsappHref } from '@/features/content/site'
import {
  brandName,
  findProduct,
  isSampleCatalogue,
  productsInCategory,
} from '@/features/content/products'
import { getDictionary, t, type Dictionary } from '@/i18n/dictionary'
import en from '@/i18n/messages/en.json'
import { Container } from '@/components/ui/container'
import { CategoryArt } from '@/components/marketing/category-art'
import { CategoryStrip } from '@/components/marketing/category-strip'
import { CtaBand } from '@/components/marketing/cta-band'
import { PageHero } from '@/components/marketing/page-hero'
import { ProductCard } from '@/components/marketing/product-card'
import { ProductDialog } from '@/components/marketing/product-dialog'

export const metadata: Metadata = {
  title: en.productsPage.metaTitle,
  description: en.productsPage.metaDescription,
  alternates: { canonical: '/products' },
}

const defaultCategory = categories[0]!

const pick = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)
const categoryHref = (slug: string) => `/products?category=${slug}`

/**
 * Products: one category at a time (Power Tools by default), switched from the strip via
 * ?category=…; ?product=… opens the detail box over the listing. Prices exclude GST.
 */
function Catalog({
  dict,
  categorySlug,
  productSlug,
}: {
  dict: Dictionary
  categorySlug?: string
  productSlug?: string
}) {
  const p = dict.productsPage
  const product = findProduct(productSlug)
  const category =
    categories.find((c) => c.slug === (product?.categorySlug ?? categorySlug)) ?? defaultCategory
  const items = productsInCategory(category)
  const labels = { sampleBadge: p.sampleBadge, plusGst: p.plusGst, off: p.off }

  return (
    <>
      <CategoryStrip categories={categories} activeSlug={category.slug} label={p.categoriesLabel} />

      <section aria-labelledby="category-title" className="mt-10">
        <div className="flex items-center gap-4">
          <CategoryArt name={category.icon} className="size-14 shrink-0 text-ink-900" />
          <h2
            id="category-title"
            className="text-2xl leading-tight font-extrabold uppercase [font-stretch:125%] md:text-3xl"
          >
            {category.name}
          </h2>
        </div>
        {isSampleCatalogue ? (
          <p className="mt-4 rounded-sm border-l-4 border-brand-yellow bg-brand-yellow-soft px-4 py-2 text-sm text-ink-900">
            {p.sampleNote}
          </p>
        ) : null}

        {items.length > 0 ? (
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <li key={item.slug}>
                <ProductCard
                  product={item}
                  icon={category.icon}
                  brand={brandName(item.brandSlug)}
                  href={`${categoryHref(category.slug)}&product=${item.slug}`}
                  labels={labels}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8">{p.empty}</p>
        )}
      </section>

      {product ? (
        <ProductDialog
          key={product.slug}
          product={product}
          icon={category.icon}
          brand={brandName(product.brandSlug)}
          closeHref={categoryHref(category.slug)}
          quoteHref={`/quote?${new URLSearchParams({
            type: 'quote',
            category: category.slug,
            brand: product.brandSlug,
            message: t(p.quoteMessage, { product: product.name, sku: product.sku }),
          })}`}
          whatsappHref={whatsappHref(`Hi, I'm looking for ${product.name} (${product.sku})`)}
          labels={{ ...labels, ...p, opensNewTab: dict.chrome.opensNewTab }}
        />
      ) : null}
    </>
  )
}

async function CatalogFromUrl({
  dict,
  searchParams,
}: {
  dict: Dictionary
  searchParams: PageProps<'/[lang]/products'>['searchParams']
}) {
  const params = await searchParams
  return (
    <Catalog dict={dict} categorySlug={pick(params.category)} productSlug={pick(params.product)} />
  )
}

export default async function ProductsPage({ searchParams }: PageProps<'/[lang]/products'>) {
  const dict = await getDictionary()
  const p = dict.productsPage
  return (
    <>
      <PageHero
        title={p.title}
        subtitle={p.subtitle}
        crumbs={[{ label: dict.chrome.home, href: '/' }, { label: dict.chrome.products }]}
        breadcrumbLabel={dict.chrome.breadcrumb}
      />

      <Container className="py-8 md:py-12">
        {/* The static shell shows the default category; the URL's choice streams in over it. */}
        <Suspense fallback={<Catalog dict={dict} />}>
          <CatalogFromUrl dict={dict} searchParams={searchParams} />
        </Suspense>
      </Container>

      <CtaBand
        title={dict.home.ctaTitle}
        body={t(dict.home.ctaBody, { promise: business.responsePromise })}
        quoteLabel={dict.home.ctaQuote}
        whatsappLabel={dict.home.ctaWhatsapp}
        whatsappHref={whatsappHref('Hi, I want a bulk quote')}
        newTabLabel={dict.chrome.opensNewTab}
      />
    </>
  )
}
