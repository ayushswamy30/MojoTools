import Link from 'next/link'
import { BadgeCheck, Handshake, Headset, PackageCheck, type LucideIcon } from 'lucide-react'
import { business, whatsappHref } from '@/features/content/site'
import { t, type Dictionary } from '@/i18n/dictionary'
import { telHref } from '@/lib/format'
import { Container } from '@/components/ui/container'
import { CookieSettingsButton } from './cookie-settings-button'
import { Logo } from './logo'

type FooterLink = { href: string; label: string; external?: boolean }

const linkClass =
  'inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline md:min-h-8'

/** R0 footer (DESIGN §4): trust strip · Mojo Tools / Help / Policies · address · wordmark. */
export function Footer({ dict }: { dict: Dictionary }) {
  const f = dict.footer
  const c = dict.chrome
  const trust: { icon: LucideIcon; label: string }[] = [
    { icon: BadgeCheck, label: f.trustGenuine },
    { icon: Handshake, label: t(f.trustYears, { years: String(business.yearsInBusiness) }) },
    { icon: PackageCheck, label: f.trustBulk },
    { icon: Headset, label: f.trustAdvice },
  ]
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: f.company,
      links: [
        { href: '/about', label: c.about },
        { href: '/products', label: c.products },
        { href: '/distributorship', label: c.distributorship },
        { href: '/awards', label: c.awards },
      ],
    },
    {
      title: f.help,
      links: [
        { href: '/quote', label: f.requestQuote },
        { href: '/contact', label: f.contactUs },
        { href: whatsappHref('Hi, I have a question'), label: f.whatsappUs, external: true },
        { href: telHref(business.phone), label: f.callUs },
        { href: '/quote?type=support', label: f.support },
      ],
    },
    {
      title: f.policies,
      links: [
        { href: '/policies/terms', label: f.terms },
        { href: '/policies/privacy', label: f.privacy },
        { href: '/policies/cookies', label: f.cookies },
        { href: '/policies/refunds', label: f.refunds },
        { href: '/policies/accessibility', label: f.accessibility },
      ],
    },
  ]
  return (
    // lg+: one smooth fade across the whole footer, starting late enough that link text keeps ≥4.5:1.
    // Smaller screens stack or wrap the columns (tall footer), so the fade stays behind the wordmark only.
    <footer className="on-dark bg-ink-800 text-steel-200 lg:bg-linear-to-b lg:from-ink-800 lg:from-35% lg:to-brand-yellow">
      <div className="border-b border-ink-700">
        <Container>
          <ul className="grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 font-semibold text-white">
                <Icon aria-hidden="true" className="size-6 shrink-0 text-brand-yellow" />
                {label}
              </li>
            ))}
          </ul>
        </Container>
      </div>
      <Container className="grid gap-10 pt-12 pb-4 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Logo name={business.name} homeLabel={c.logoHome} />
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
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {link.label}
                      <span className="sr-only"> {c.opensNewTab}</span>
                    </a>
                  ) : link.href.startsWith('/') ? (
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
              {column.title === f.policies ? (
                <li>
                  <CookieSettingsButton label={f.cookieSettings} className={linkClass} />
                </li>
              ) : null}
            </ul>
          </nav>
        ))}
      </Container>
      {/* Decorative sign-off: the footer fades into brand yellow behind the wordmark; cqw sizes it to span the container.
          The id lets the sticky header slide away while this is on screen. */}
      <div
        id="footer-wordmark"
        aria-hidden="true"
        className="bg-linear-to-b from-ink-800 via-brand-yellow via-70% to-brand-yellow select-none lg:bg-none"
      >
        <Container className="overflow-hidden pt-16 pb-6 md:pt-24">
          <p className="@container">
            <span className="block font-display text-[11.6cqw] leading-[0.8] font-extrabold tracking-[-0.01em] whitespace-nowrap text-ink-900 uppercase [font-stretch:125%]">
              {business.name}
            </span>
          </p>
        </Container>
      </div>
    </footer>
  )
}
