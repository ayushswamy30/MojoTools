import { Clock, FileText, Mail, Phone } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'
import { business, whatsappHref } from '@/features/content/site'
import { telHref } from '@/lib/format'

/** Sits beside the map, which already shows the address. */
export function ContactInfoCard({ title, newTabLabel }: { title: string; newTabLabel: string }) {
  const rows = [
    { icon: Clock, label: 'Store hours', value: business.hours },
    { icon: Phone, label: 'Phone', value: business.phone, href: telHref(business.phone) },
    {
      icon: WhatsAppIcon,
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
      <h3 id="contact-info-title" className="text-2xl font-bold">
        {title}
      </h3>
      <dl className="mt-4 divide-y divide-ink-900/15">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid min-h-12 grid-cols-[8rem_minmax(0,1fr)] items-center gap-x-3 py-1"
          >
            <dt className="flex items-center gap-3 text-sm font-semibold text-ink-900">
              <row.icon aria-hidden="true" className="size-5 shrink-0 text-ink-900" />
              {row.label}
            </dt>
            <dd className="wrap-anywhere text-steel-600">
              {'href' in row && row.href ? (
                <a
                  href={row.href}
                  className="inline-flex min-h-11 items-center underline underline-offset-4"
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
