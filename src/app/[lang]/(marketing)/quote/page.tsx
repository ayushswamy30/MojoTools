import type { Metadata } from 'next'
import { Suspense } from 'react'
import { business } from '@/features/content/site'
import { getDictionary, t, type Dictionary } from '@/i18n/dictionary'
import en from '@/i18n/messages/en.json'
import { Container } from '@/components/ui/container'
import { EnquirySection, enquiryDefaults } from '@/components/marketing/enquiry-section'
import { PageHero } from '@/components/marketing/page-hero'

export const metadata: Metadata = {
  title: en.quotePage.metaTitle,
  description: en.quotePage.metaDescription,
  alternates: { canonical: '/quote' },
}

async function PrefilledForm({
  dict,
  searchParams,
}: {
  dict: Dictionary
  searchParams: PageProps<'/[lang]/quote'>['searchParams']
}) {
  const defaults = enquiryDefaults(await searchParams)
  return (
    <EnquirySection
      dict={dict}
      defaults={{ ...defaults, type: defaults.type ?? 'quote' }}
      sourcePage="/quote"
    />
  )
}

export default async function QuotePage({ searchParams }: PageProps<'/[lang]/quote'>) {
  const dict = await getDictionary()
  return (
    <>
      <PageHero
        title={dict.quotePage.title}
        subtitle={t(dict.quotePage.subtitle, { promise: business.responsePromise })}
        crumbs={[{ label: dict.chrome.home, href: '/' }, { label: dict.quotePage.title }]}
        breadcrumbLabel={dict.chrome.breadcrumb}
      />
      <Container className="max-w-3xl py-12">
        {/* Query-string pre-fill is request data, so the form streams in after the static shell. */}
        <Suspense
          fallback={<EnquirySection dict={dict} defaults={{ type: 'quote' }} sourcePage="/quote" />}
        >
          <PrefilledForm dict={dict} searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  )
}
