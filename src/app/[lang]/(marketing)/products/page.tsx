import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { brandsForCategory, business, categories, whatsappHref } from '@/features/content/site'
import { getDictionary, t } from '@/i18n/dictionary'
import en from '@/i18n/messages/en.json'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { CategoryIcon } from '@/components/marketing/category-icon'
import { CtaBand } from '@/components/marketing/cta-band'
import { PageHero } from '@/components/marketing/page-hero'

export const metadata: Metadata = {
  title: en.productsPage.metaTitle,
  description: en.productsPage.metaDescription,
  alternates: { canonical: '/products' },
}

/**
 * R0 Products page (DECISIONS P12): category overview with enquiry CTAs.
 * In R1 each category links into the shop listing (`/shop/c/[category]`).
 */
export default async function ProductsPage() {
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

      <nav aria-label={p.jumpTo} className="border-b border-steel-200 bg-steel-50">
        <Container>
          <ul className="flex gap-2 overflow-x-auto py-3">
            {categories.map((category) => (
              <li key={category.slug} className="shrink-0">
                <a
                  href={`#${category.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-steel-400 bg-white px-4 text-sm font-semibold text-ink-900 hover:bg-steel-100"
                >
                  <CategoryIcon name={category.icon} className="size-4" />
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <Container className="py-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {categories.map((category) => {
            const categoryBrands = brandsForCategory(category)
            return (
              <li key={category.slug} id={category.slug} className="scroll-mt-32">
                <article
                  aria-labelledby={`${category.slug}-title`}
                  className="flex h-full flex-col rounded-md border border-steel-200 bg-white p-6 shadow-card"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-md bg-steel-100">
                      <CategoryIcon name={category.icon} className="size-7 text-ink-900" />
                    </span>
                    <h2 id={`${category.slug}-title`} className="text-2xl font-bold">
                      {category.name}
                    </h2>
                  </div>
                  <p className="mt-4">{category.description}</p>
                  <div className="mt-4">
                    <h3 className="font-sans text-sm font-semibold tracking-wide text-steel-500 uppercase">
                      {p.brandsLabel}
                    </h3>
                    {categoryBrands.length > 0 ? (
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {categoryBrands.map((brand) => (
                          <li key={brand.slug}>
                            <Link
                              href={`/brands/${brand.slug}`}
                              className="inline-flex min-h-11 items-center rounded-sm bg-steel-100 px-3 text-sm font-semibold text-ink-900 underline-offset-4 hover:underline"
                            >
                              {brand.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm">{p.anyBrand}</p>
                    )}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <Link
                      href={`/quote?type=quote&category=${category.slug}`}
                      className={buttonVariants({ variant: 'primary' })}
                    >
                      {t(p.enquire, { category: category.name })}
                    </Link>
                    <a
                      href={whatsappHref(`Hi, I'm looking for ${category.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({ variant: 'outline' })}
                    >
                      <MessageCircle aria-hidden="true" /> {p.whatsapp}
                      <span className="sr-only"> {dict.chrome.opensNewTab}</span>
                    </a>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
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
