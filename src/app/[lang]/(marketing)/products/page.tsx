import type { Metadata } from 'next'
import { Suspense } from 'react'
import { business, categories, whatsappHref } from '@/features/content/site'
import Link from 'next/link'
import {
  brandName,
  findProduct,
  productsInCategory,
  searchProducts,
  type Product,
} from '@/features/content/products'
import { getDictionary, t, type Dictionary } from '@/i18n/dictionary'
import en from '@/i18n/messages/en.json'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { CategoryArt } from '@/components/marketing/category-art'
import { CategoryStrip } from '@/components/marketing/category-strip'
import { CtaBand } from '@/components/marketing/cta-band'
import { PageHero } from '@/components/marketing/page-hero'
import { ProductCard } from '@/components/marketing/product-card'
import { ProductDialog } from '@/components/marketing/product-dialog'
import {
  MAX_SEARCH_CHARS,
  PRODUCT_SEARCH_ID,
  ProductSearch,
} from '@/components/marketing/product-search'

export const metadata: Metadata = {
  title: en.productsPage.metaTitle,
  description: en.productsPage.metaDescription,
  alternates: { canonical: '/products' },
}

const defaultCategory = categories[0]!

const pick = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)
const categoryHref = (slug: string) => `/products?category=${slug}`
const searchHref = (query: string) => `/products?${new URLSearchParams({ q: query })}`
const cleanQuery = (value: string | string[] | undefined) =>
  pick(value)?.trim().slice(0, MAX_SEARCH_CHARS) || undefined
const MAX_SEARCH_RESULTS = 48

function ProductGrid({
  items,
  hrefFor,
  labels,
}: {
  items: Product[]
  hrefFor: (item: Product) => string
  labels: { priceOnRequest: string; plusGst: string; off: string }
}) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.slug}>
          <ProductCard
            product={item}
            icon={categories.find((c) => c.slug === item.categorySlug)?.icon ?? 'nut'}
            brand={brandName(item.brandSlug)}
            href={hrefFor(item)}
            labels={labels}
          />
        </li>
      ))}
    </ul>
  )
}

function SearchResults({
  dict,
  query,
  results,
  labels,
}: {
  dict: Dictionary
  query: string
  results: Product[]
  labels: { priceOnRequest: string; plusGst: string; off: string }
}) {
  const p = dict.productsPage
  const shown = results.slice(0, MAX_SEARCH_RESULTS)
  const summary =
    results.length === 0
      ? t(p.searchEmpty, { query })
      : results.length === 1
        ? t(p.searchCountOne, { query })
        : t(p.searchCount, { count: String(results.length), query })
  return (
    <section aria-labelledby="search-title" className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          <h2
            id="search-title"
            className="text-2xl leading-tight font-extrabold uppercase [font-stretch:125%] md:text-3xl"
          >
            {p.searchTitle}
          </h2>
          <p role="status" className="mt-2 wrap-anywhere text-steel-600">
            {summary}
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex min-h-11 items-center font-semibold text-ink-900 underline decoration-brand-yellow decoration-2 underline-offset-4"
        >
          {p.searchClear}
        </Link>
      </div>
      {shown.length > 0 ? (
        <>
          <ProductGrid
            items={shown}
            hrefFor={(item) => `${searchHref(query)}&product=${item.slug}`}
            labels={labels}
          />
          {results.length > shown.length ? (
            <p className="mt-8 text-sm text-steel-600">
              {t(p.searchLimited, { shown: String(shown.length) })}
            </p>
          ) : null}
        </>
      ) : (
        <div className="mt-6">
          <p>{p.searchEmptyHelp}</p>
          <Link
            href={`/quote?${new URLSearchParams({
              type: 'quote',
              message: t(p.searchAskMessage, { query }),
            })}`}
            className={`${buttonVariants({ variant: 'primary' })} mt-4`}
          >
            {p.searchAsk}
          </Link>
        </div>
      )}
    </section>
  )
}

/**
 * Products: one category at a time (Power Tools by default), switched from the strip via
 * ?category=…; ?q=… shows search results; ?product=… opens the detail box over the listing.
 */
function Catalog({
  dict,
  categorySlug,
  productSlug,
  query,
}: {
  dict: Dictionary
  categorySlug?: string
  productSlug?: string
  query?: string
}) {
  const p = dict.productsPage
  const product = findProduct(productSlug)
  const category =
    categories.find((c) => c.slug === (product?.categorySlug ?? categorySlug)) ?? defaultCategory
  const items = productsInCategory(category)
  const labels = { priceOnRequest: p.priceOnRequest, plusGst: p.plusGst, off: p.off }

  return (
    <>
      <CategoryStrip
        categories={categories}
        activeSlug={query ? '' : category.slug}
        label={p.categoriesLabel}
      />

      {query ? (
        <SearchResults dict={dict} query={query} results={searchProducts(query)} labels={labels} />
      ) : (
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

          {items.length > 0 ? (
            <ProductGrid
              items={items}
              hrefFor={(item) => `${categoryHref(category.slug)}&product=${item.slug}`}
              labels={labels}
            />
          ) : (
            <p className="mt-8">{p.empty}</p>
          )}
        </section>
      )}

      {product ? (
        <ProductDialog
          key={product.slug}
          product={product}
          icon={category.icon}
          brand={brandName(product.brandSlug)}
          closeHref={query ? searchHref(query) : categoryHref(category.slug)}
          quoteHref={`/quote?${new URLSearchParams({
            type: 'quote',
            category: category.slug,
            ...(product.brandSlug ? { brand: product.brandSlug } : {}),
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
    <Catalog
      dict={dict}
      categorySlug={pick(params.category)}
      productSlug={pick(params.product)}
      query={cleanQuery(params.q)}
    />
  )
}

function MainSearch({ dict, query }: { dict: Dictionary; query?: string }) {
  const c = dict.chrome
  return (
    <ProductSearch
      key={query}
      id={PRODUCT_SEARCH_ID}
      prominent
      defaultValue={query}
      labels={{
        search: c.search,
        searchPlaceholder: c.searchPlaceholder,
        searchSubmit: c.searchSubmit,
      }}
    />
  )
}

async function MainSearchFromUrl({
  dict,
  searchParams,
}: {
  dict: Dictionary
  searchParams: PageProps<'/[lang]/products'>['searchParams']
}) {
  return <MainSearch dict={dict} query={cleanQuery((await searchParams).q)} />
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
      >
        <div className="mt-6">
          <Suspense fallback={<MainSearch dict={dict} />}>
            <MainSearchFromUrl dict={dict} searchParams={searchParams} />
          </Suspense>
        </div>
      </PageHero>

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
