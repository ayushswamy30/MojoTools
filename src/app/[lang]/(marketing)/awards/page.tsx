import type { Metadata } from 'next'
import { Award as AwardIcon } from 'lucide-react'
import { awards, business, whatsappHref } from '@/features/content/site'
import { getDictionary, t } from '@/i18n/dictionary'
import en from '@/i18n/messages/en.json'
import { Container } from '@/components/ui/container'
import { CtaBand } from '@/components/marketing/cta-band'
import { PageHero } from '@/components/marketing/page-hero'

export const metadata: Metadata = {
  title: en.awardsPage.metaTitle,
  description: en.awardsPage.metaDescription,
  alternates: { canonical: '/awards' },
}

export default async function AwardsPage() {
  const dict = await getDictionary()
  const a = dict.awardsPage
  return (
    <>
      <PageHero
        title={a.title}
        subtitle={a.subtitle}
        crumbs={[{ label: dict.chrome.home, href: '/' }, { label: dict.chrome.awards }]}
        breadcrumbLabel={dict.chrome.breadcrumb}
      />
      <Container className="py-12">
        {awards.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award, index) => (
              <li key={`${award.title}-${index}`}>
                <article className="flex h-full flex-col rounded-md border-t-4 border-brand-yellow bg-white p-6 shadow-card">
                  <span className="flex size-14 items-center justify-center rounded-full bg-ink-900">
                    <AwardIcon aria-hidden="true" className="size-7 text-brand-yellow" />
                  </span>
                  <p className="mt-4 font-mono text-sm text-steel-500">{award.year}</p>
                  <h2 className="mt-1 text-xl font-bold">{award.title}</h2>
                  <p className="mt-2 text-sm">
                    <span className="font-semibold text-ink-900">{a.awardedBy}:</span>{' '}
                    {award.awardedBy}
                  </p>
                  <p className="mt-3">{award.description}</p>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg">{a.empty}</p>
        )}
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
