import { Clock, FileText, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { business, whatsappHref } from '@/features/content/site'
import { telHref } from '@/lib/format'

export function ContactInfoCard({ title, newTabLabel }: { title: string; newTabLabel: string }) {
  const rows = [
    {
      icon: MapPin,
      label: 'Address',
      value: `${business.address.line1}, ${business.address.city}, ${business.address.state} ${business.address.pincode}`,
    },
    { icon: Clock, label: 'Store hours', value: business.hours },
    { icon: Phone, label: 'Phone', value: business.phone, href: telHref(business.phone) },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: business.whatsapp,
      href: whatsappHref('Hi, I have an enquiry'),
      external: true,
    },
    { icon: Mail, label: 'Email', value: business.email, href: `mailto:${business.email}` },
    ...(business.gstin ? [{ icon: FileText, label: 'GSTIN', value: business.gstin }] : []),
  ]
  return (
    <section
      aria-labelledby="contact-info-title"
      className="rounded-md bg-brand-yellow-soft p-6 md:p-8"
    >
      <h2 id="contact-info-title" className="text-2xl font-bold">
        {title}
      </h2>
      <dl className="mt-6 space-y-5">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[1.25rem_1fr] gap-x-4">
            <dt className="col-start-2 flex items-center text-sm font-semibold text-ink-900">
              <row.icon aria-hidden="true" className="mr-4 -ml-9 size-5 shrink-0 text-ink-900" />
              {row.label}
            </dt>
            <dd className="col-start-2 text-steel-600">
              {'href' in row && row.href ? (
                <a
                  href={row.href}
                  className="underline underline-offset-4"
                  {...('external' in row && row.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {row.value}
                  {'external' in row && row.external ? (
                    <span className="sr-only"> {newTabLabel}</span>
                  ) : null}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
