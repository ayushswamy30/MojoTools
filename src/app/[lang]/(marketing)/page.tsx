import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'
import {
  brands,
  business,
  categories,
  heroSlides,
  isDemoContent,
  stats,
  testimonials,
  whatsappHref,
  whyChoose,
} from '@/features/content/site'
import { getDictionary, t } from '@/i18n/dictionary'
import { publicEnv } from '@/lib/public-env'
import { Container } from '@/components/ui/container'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { SectionTitle } from '@/components/ui/section-title'
import { BrandCard } from '@/components/marketing/brand-card'
import { CategoryTiles } from '@/components/marketing/category-tiles'
import { CtaBand } from '@/components/marketing/cta-band'
import { FeatureCards } from '@/components/marketing/feature-cards'
import { HeroCarousel } from '@/components/marketing/hero-carousel'
import { StatsStrip } from '@/components/marketing/stats-strip'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'HardwareStore'],
    name: business.name,
    description: business.description,
    url: publicEnv.siteUrl,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.line1,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.pincode,
      addressCountry: 'IN',
    },
  }
}

export default async function HomePage() {
  const dict = await getDictionary()
  const featured = brands.filter((brand) => brand.isFeatured)
  return (
    <>
      {/* Structured data only with real business details: never publish placeholder facts. */}
      {isDemoContent ? null : (
        <script
          type="application/ld+json"
          // JSON-LD must be raw JSON; the content is our own static data.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()).replace(/</g, '\\u003c'),
          }}
        />
      )}
      <h1 className="sr-only">
        {business.name}: {business.tagline}
      </h1>
      <HeroCarousel slides={heroSlides} labels={dict.hero} />

      <section aria-labelledby="categories-title" className="py-16">
        <Container>
          <SectionTitle
            id="categories-title"
            title={dict.home.categoriesTitle}
            subtitle={dict.home.categoriesSubtitle}
          />
          <CategoryTiles categories={categories} enquireLabel={dict.home.enquire} />
          <Link
            href="/products"
            className="mt-6 inline-flex min-h-11 items-center font-semibold text-ink-900 underline underline-offset-4"
          >
            {dict.home.viewAllProducts}
          </Link>
        </Container>
      </section>

      <section aria-labelledby="brands-title" className="bg-steel-50 py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle id="brands-title" title={dict.home.brandsTitle} className="mb-0" />
            <Link
              href="/distributorship"
              className="inline-flex min-h-11 items-center font-semibold text-ink-900 underline underline-offset-4"
            >
              {dict.home.viewAllBrands}
            </Link>
          </div>
        </Container>
        {/* Pauses on hover/focus so the moving strip can be stopped (WCAG 2.2.2). */}
        <div className="group mt-8 overflow-hidden">
          <div className="flex w-max animate-marquee group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]">
            {/* 4 copies so half the track still spans wide screens; only the first is exposed to AT/keyboard. */}
            {[0, 1, 2, 3].map((copy) => (
              <ul key={copy} className="flex" aria-hidden={copy > 0 || undefined} inert={copy > 0}>
                {featured.map((brand) => (
                  <li key={brand.slug} className="w-52 shrink-0 pr-4">
                    <BrandCard brand={brand} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="why-title" className="py-16">
        <Container>
          <SectionTitle id="why-title" title={dict.home.whyTitle} />
          <FeatureCards items={whyChoose} />
          {stats.length > 0 ? (
            <div className="mt-12">
              <StatsStrip stats={stats} />
            </div>
          ) : null}
        </Container>
      </section>

      {testimonials.length > 0 ? (
        <section aria-labelledby="testimonials-title" className="bg-steel-50 py-16">
          <Container>
            <SectionTitle id="testimonials-title" title={dict.home.testimonialsTitle} />
            <ul className="grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <li key={item.name}>
                  <figure className="h-full rounded-md bg-white p-6 shadow-card">
                    <blockquote>“{item.quote}”</blockquote>
                    <figcaption className="mt-4 text-sm font-semibold text-ink-900">
                      {item.name}, {item.company}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand
        title={dict.home.ctaTitle}
        body={t(dict.home.ctaBody, { promise: business.responsePromise })}
        quoteLabel={dict.home.ctaQuote}
        whatsappLabel={dict.home.ctaWhatsapp}
        whatsappHref={whatsappHref('Hi, I want a bulk quote')}
        newTabLabel={dict.chrome.opensNewTab}
      />

      <section aria-labelledby="visit-title" className="py-16">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <PlaceholderVisual
            tone="warehouse"
            label="Placeholder: warehouse photo"
            className="aspect-[4/3] rounded-md"
          />
          <div>
            <SectionTitle id="visit-title" title={dict.home.visitTitle} />
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-ink-900" />
              <span>
                {business.address.line1}, {business.address.city}, {business.address.state}{' '}
                {business.address.pincode}
                <br />
                {business.hours}
              </span>
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-ink-900 underline underline-offset-4"
            >
              {dict.home.visitLink}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
