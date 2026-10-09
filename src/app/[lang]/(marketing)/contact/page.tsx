import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'
import { business, whatsappHref } from '@/features/content/site'
import { getDictionary, t } from '@/i18n/dictionary'
import en from '@/i18n/messages/en.json'
import { telHref } from '@/lib/format'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { ContactInfoCard } from '@/components/marketing/contact-info-card'
import { EnquirySection } from '@/components/marketing/enquiry-section'
import { MapCard } from '@/components/marketing/map-card'
import { NewsletterForm } from '@/components/marketing/newsletter-form'
import { PageHero } from '@/components/marketing/page-hero'

export const metadata: Metadata = {
  title: en.contactPage.metaTitle,
  description: en.contactPage.metaDescription,
  alternates: { canonical: '/contact' },
}

export default async function ContactPage() {
  const dict = await getDictionary()
  const p = dict.contactPage
  return (
    <>
      <PageHero
        title={p.title}
        crumbs={[{ label: dict.chrome.home, href: '/' }, { label: dict.chrome.contact }]}
        breadcrumbLabel={dict.chrome.breadcrumb}
      />
      <Container className="grid gap-10 py-12 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-8">
          <ContactInfoCard title={p.infoTitle} newTabLabel={dict.chrome.opensNewTab} />
          <MapCard />
        </div>
        <section aria-labelledby="contact-form-title">
          <h2 id="contact-form-title" className="mb-6 text-2xl font-bold">
            {p.formTitle}
          </h2>
          <EnquirySection dict={dict} defaults={{ type: 'contact' }} sourcePage="/contact" />
        </section>
      </Container>
      <Container className="grid gap-6 pb-16 md:grid-cols-2">
        <section aria-labelledby="help-title" className="rounded-md bg-brand-yellow p-6 md:p-8">
          <h2 id="help-title" className="text-2xl font-bold">
            {p.helpTitle}
          </h2>
          <p className="mt-2 text-ink-900">{p.helpBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={telHref(business.phone)} className={buttonVariants({ variant: 'secondary' })}>
              <Phone aria-hidden="true" /> {dict.chrome.call}
            </a>
            <a
              href={whatsappHref('Hi, I need help choosing a tool')}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'secondary' })}
            >
              <MessageCircle aria-hidden="true" /> {dict.chrome.whatsapp}
              <span className="sr-only"> {dict.chrome.opensNewTab}</span>
            </a>
            <Link href="/quote?type=support" className={buttonVariants({ variant: 'outline' })}>
              {p.supportRequest}
            </Link>
          </div>
        </section>
        <section
          aria-labelledby="newsletter-title"
          className="rounded-md border border-steel-200 p-6 md:p-8"
        >
          <h2 id="newsletter-title" className="text-2xl font-bold">
            {dict.newsletter.title}
          </h2>
          <p className="mt-2 mb-4">{dict.newsletter.body}</p>
          <NewsletterForm
            labels={dict.newsletter}
            genericError={dict.form.genericError}
            sourcePage="/contact"
          />
          <div className="mt-6 border-t border-steel-200 pt-6">
            <h3 className="text-lg font-bold">{p.quoteBlockTitle}</h3>
            <p className="mt-1">{t(p.quoteBlockBody, { promise: business.responsePromise })}</p>
            <Link href="/quote" className={`${buttonVariants({ variant: 'outline' })} mt-4`}>
              {p.requestQuote}
            </Link>
          </div>
        </section>
      </Container>
    </>
  )
}
