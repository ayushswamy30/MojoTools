import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'
import { business, whatsappHref } from '@/features/content/site'
import type { Dictionary } from '@/i18n/dictionary'
import { cn } from '@/lib/cn'
import { telHref } from '@/lib/format'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { NavLinks, type NavItem } from './nav-links'

/** R0 header (DESIGN §4): logo · page links · GET A QUOTE. R1 swaps in search/cart/account. */
export function Header({ dict }: { dict: Dictionary }) {
  const c = dict.chrome
  const items: NavItem[] = [
    { href: '/', label: c.home },
    { href: '/about', label: c.about },
    { href: '/brands', label: c.brands },
    { href: '/contact', label: c.contact },
  ]
  const wa = whatsappHref('Hi, I have an enquiry')
  return (
    <header className="on-dark sticky top-0 z-[var(--z-sticky-header)] bg-ink-900">
      <div className="hidden bg-ink-800 text-[13px] text-steel-200 md:block">
        <Container className="flex h-8 items-center justify-between">
          <p>{c.utilityTagline}</p>
          <div className="flex items-center gap-5">
            <a
              href={telHref(business.phone)}
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <Phone aria-hidden="true" className="size-3.5" />
              <span className="sr-only">{c.call}: </span>
              {business.phone}
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <MessageCircle aria-hidden="true" className="size-3.5" />
              {c.whatsapp}
              <span className="sr-only"> {c.opensNewTab}</span>
            </a>
          </div>
        </Container>
      </div>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo name={business.name} />
        <nav aria-label={c.mainNav} className="hidden lg:block">
          <NavLinks items={items} className="flex items-center gap-8" />
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/quote"
            className={cn(buttonVariants({ variant: 'primary' }), 'hidden sm:inline-flex')}
          >
            {c.getQuote}
          </Link>
          <a
            href={telHref(business.phone)}
            className="inline-flex size-11 items-center justify-center rounded-sm text-white md:hidden"
          >
            <Phone aria-hidden="true" className="size-5" />
            <span className="sr-only">{c.call}</span>
          </a>
          <MobileNav
            items={items}
            labels={{
              menu: c.menu,
              close: c.closeMenu,
              getQuote: c.getQuote,
              call: c.call,
              whatsapp: c.whatsapp,
              mainNav: c.mainNav,
            }}
            telHref={telHref(business.phone)}
            whatsappHref={wa}
          />
        </div>
      </Container>
      <div aria-hidden="true" className="h-1 bg-brand-yellow" />
    </header>
  )
}
