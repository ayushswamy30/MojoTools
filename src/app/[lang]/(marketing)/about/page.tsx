import type { Metadata } from 'next'
import { about, brands, business, stats, whatsappHref } from '@/features/content/site'
import { getDictionary } from '@/i18n/dictionary'
import en from '@/i18n/messages/en.json'
import { Container } from '@/components/ui/container'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { SectionTitle } from '@/components/ui/section-title'
import { BrandCard } from '@/components/marketing/brand-card'
import { CtaBand } from '@/components/marketing/cta-band'
import { FeatureCards } from '@/components/marketing/feature-cards'
import { PageHero } from '@/components/marketing/page-hero'
import { StatsStrip } from '@/components/marketing/stats-strip'
import { ValuesAccordion } from '@/components/marketing/values-accordion'

export const metadata: Metadata = {
  title: en.about.metaTitle,
  description: en.about.metaDescription,
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  const dict = await getDictionary()
  const a = dict.about
  return (
    <>
      <PageHero
        title={a.title}
        crumbs={[{ label: dict.chrome.home, href: '/' }, { label: dict.chrome.about }]}
        breadcrumbLabel={dict.chrome.breadcrumb}
      />
      <Container className="-mt-6 md:-mt-10">
        <div className="relative rounded-md bg-white p-6 shadow-overlay md:p-8">
          <StatsStrip stats={stats} />
        </div>
      </Container>

      <section aria-labelledby="purpose-title" className="py-16">
        <Container className="grid gap-10 md:grid-cols-2">
          <PlaceholderVisual
            tone="warehouse"
            label="Placeholder: team / warehouse photo"
            className="aspect-[4/5] rounded-md"
          />
          <div>
            <h2
              id="purpose-title"
              className="font-sans text-sm font-semibold tracking-wide text-steel-500 uppercase"
            >
              {a.purposeTitle}
            </h2>
            <p className="mt-2 font-display text-2xl font-bold text-ink-900">{about.purpose}</p>
            <h2 className="mt-8 font-sans text-sm font-semibold tracking-wide text-steel-500 uppercase">
              {a.missionTitle}
            </h2>
            <p className="mt-2">{about.mission}</p>
            <h2 className="mt-8 mb-3 font-sans text-sm font-semibold tracking-wide text-steel-500 uppercase">
              {a.valuesTitle}
            </h2>
            <ValuesAccordion items={about.values} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="story-title" className="bg-steel-50 py-16">
        <Container>
          <SectionTitle id="story-title" title={a.storyTitle} />
          <ol className="grid gap-6 md:grid-cols-5">
            {about.timeline.map((item, index) => (
              <li
                key={`${item.title}-${index}`}
                className="border-t-4 border-brand-yellow bg-white p-5 shadow-card"
              >
                <p className="font-mono text-sm text-steel-500">{item.year}</p>
                <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="about-why-title" className="py-16">
        <Container>
          <SectionTitle id="about-why-title" title={a.whyTitle} />
          <FeatureCards items={about.whyChoose} />
        </Container>
      </section>

      <section aria-labelledby="about-brands-title" className="bg-steel-50 py-16">
        <Container>
          <SectionTitle id="about-brands-title" title={a.brandsTitle} />
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {brands.slice(0, 4).map((brand) => (
              <li key={brand.slug}>
                <BrandCard brand={brand} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title={a.ctaTitle}
        body={a.ctaBody}
        quoteLabel={dict.home.ctaQuote}
        whatsappLabel={dict.home.ctaWhatsapp}
        whatsappHref={whatsappHref(`Hi ${business.name}, I have an enquiry`)}
        newTabLabel={dict.chrome.opensNewTab}
      />
    </>
  )
}
