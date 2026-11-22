import type { Metadata } from 'next'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'
import Link from 'next/link'
import { MapPin, Phone } from 'lucide-react'
import { business, whatsappHref } from '@/features/content/site'
import { getDictionary, t } from '@/i18n/dictionary'
import en from '@/i18n/messages/en.json'
import { telHref } from '@/lib/format'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionTitle } from '@/components/ui/section-title'
import { ContactInfoCard } from '@/components/marketing/contact-info-card'
import { EnquirySection } from '@/components/marketing/enquiry-section'
import { MapCard } from '@/components/marketing/map-card'
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
        subtitle={t(p.subtitle, { promise: business.responsePromise })}
        crumbs={[{ label: dict.chrome.home, href: '/' }, { label: dict.chrome.contact }]}
        breadcrumbLabel={dict.chrome.breadcrumb}
      >
        <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <a href={telHref(business.phone)} className={buttonVariants()}>
            <Phone aria-hidden="true" /> {dict.chrome.call}
          </a>
          <a
            href={whatsappHref('Hi, I have an enquiry')}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants()}
          >
            <WhatsAppIcon className="size-4" /> {dict.chrome.whatsapp}
            <span className="sr-only"> {dict.chrome.opensNewTab}</span>
          </a>
          {business.directionsUrl ? (
            <a
              href={business.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'outline-light' })}
            >
              <MapPin aria-hidden="true" /> {dict.mapCard.directions}
              <span className="sr-only"> {dict.chrome.opensNewTab}</span>
            </a>
          ) : null}
          <a href="#enquiry" className={buttonVariants({ variant: 'outline-light' })}>
            {p.sendEnquiry}
          </a>
        </div>
      </PageHero>
      <Container className="py-12">
        <section aria-labelledby="store-title">
          <SectionTitle id="store-title" title={p.storeTitle} />
          <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
            <MapCard
              labels={dict.mapCard}
              name={business.name}
              address={`${business.address.line1}, ${business.address.city}, ${business.address.state} ${business.address.pincode}`}
              embedUrl={business.mapEmbedUrl}
              directionsUrl={business.directionsUrl}
              newTabLabel={dict.chrome.opensNewTab}
            />
            <ContactInfoCard title={p.infoTitle} newTabLabel={dict.chrome.opensNewTab} />
          </div>
        </section>
      </Container>
      <Container className="grid items-start gap-10 pb-16 lg:grid-cols-[3fr_2fr]">
        <section id="enquiry" aria-labelledby="contact-form-title">
          <SectionTitle id="contact-form-title" title={p.formTitle} />
          <EnquirySection
            dict={dict}
            defaults={{ type: 'contact' }}
            sourcePage="/contact"
            compact
          />
        </section>
        <div className="grid gap-6">
          <section aria-labelledby="help-title" className="rounded-md bg-brand-yellow p-6 md:p-8">
            <h2 id="help-title" className="font-subhead text-2xl font-bold">
              {p.helpTitle}
            </h2>
            <p className="mt-2 text-ink-900">{p.helpBody}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={telHref(business.phone)}
                className={buttonVariants({ variant: 'secondary' })}
              >
                <Phone aria-hidden="true" /> {dict.chrome.call}
              </a>
              <a
                href={whatsappHref('Hi, I need help choosing a tool')}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: 'secondary' })}
              >
                <WhatsAppIcon className="size-4" /> {dict.chrome.whatsapp}
                <span className="sr-only"> {dict.chrome.opensNewTab}</span>
              </a>
              <Link href="/quote?type=support" className={buttonVariants({ variant: 'outline' })}>
                {p.supportRequest}
              </Link>
            </div>
          </section>
          <section
            aria-labelledby="quote-block-title"
            className="rounded-md border border-steel-200 p-6 md:p-8"
          >
            <h2 id="quote-block-title" className="font-subhead text-2xl font-bold">
              {p.quoteBlockTitle}
            </h2>
            <p className="mt-2">{t(p.quoteBlockBody, { promise: business.responsePromise })}</p>
            <Link href="/quote" className={`${buttonVariants({ variant: 'outline' })} mt-4`}>
              {p.requestQuote}
            </Link>
          </section>
        </div>
      </Container>
    </>
  )
}
