import Link from 'next/link'
import { BadgeCheck, FileText, MessageCircle } from 'lucide-react'
import { business, whatsappHref } from '@/features/content/site'
import type { Dictionary } from '@/i18n/dictionary'
import { telHref } from '@/lib/format'
import { Container } from '@/components/ui/container'
import { Logo } from './logo'

/** R0 footer (DESIGN §4): trust strip · Mojo Tools / Help / Policies · address · legal bar. */
export function Footer({ dict, year }: { dict: Dictionary; year: number }) {
  const f = dict.footer
  const c = dict.chrome
  const trust = [
    { icon: BadgeCheck, label: f.trustGenuine },
    { icon: FileText, label: f.trustGst },
    { icon: MessageCircle, label: f.trustHelp },
  ]
  const columns = [
    {
      title: f.company,
      links: [
        { href: '/about', label: c.about },
        { href: '/brands', label: c.brands },
        { href: '/contact', label: c.contact },
      ],
    },
    {
      title: f.help,
      links: [
        { href: '/quote', label: f.requestQuote },
        { href: '/contact', label: c.contact },
      ],
    },
    {
      title: f.policies,
      links: [
        { href: '/policies/terms', label: f.terms },
        { href: '/policies/privacy', label: f.privacy },
        { href: '/policies/accessibility', label: f.accessibility },
      ],
    },
  ]
  return (
    <footer className="on-dark bg-ink-800 text-steel-200">
      <div className="border-b border-ink-700">
        <Container>
          <ul className="grid gap-4 py-6 sm:grid-cols-3">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 font-semibold text-white">
                <Icon aria-hidden="true" className="size-6 text-brand-yellow" />
                {label}
              </li>
            ))}
          </ul>
        </Container>
      </div>
      <Container className="grid gap-10 py-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Logo name={business.name} />
          <address className="mt-4 text-sm leading-6 not-italic">
            {business.address.line1}
            <br />
            {business.address.city}, {business.address.state} {business.address.pincode}
            <br />
            <a href={telHref(business.phone)} className="underline-offset-4 hover:underline">
              {business.phone}
            </a>
            <br />
            <a href={`mailto:${business.email}`} className="underline-offset-4 hover:underline">
              {business.email}
            </a>
          </address>
          {business.gstin ? (
            <p className="mt-3 font-mono text-[13px]">GSTIN {business.gstin}</p>
          ) : null}
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="font-sans text-sm font-semibold tracking-wide text-white uppercase">
              {column.title}
            </h2>
            <ul className="mt-4 space-y-1">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline md:min-h-8"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-ink-700">
        <Container className="flex flex-col gap-2 py-5 text-[13px] text-steel-400 sm:flex-row sm:justify-between">
          <p>
            © {year} {business.name}. {f.rights}
          </p>
          <a
            href={whatsappHref('Hi, I have a question')}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            {c.whatsapp} <span className="sr-only">{c.opensNewTab}</span>
          </a>
        </Container>
      </div>
    </footer>
  )
}
