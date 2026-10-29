import Link from 'next/link'
import { Phone } from 'lucide-react'
import { business, whatsappHref } from '@/features/content/site'
import type { Dictionary } from '@/i18n/dictionary'
import { cn } from '@/lib/cn'
import { telHref } from '@/lib/format'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { HeaderShell } from './header-shell'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { NavLinks, type NavItem } from './nav-links'

/** R0 header (DESIGN §4): logo · page links · GET A QUOTE. R1 swaps in search/cart/account. */
export function Header({ dict }: { dict: Dictionary }) {
  const c = dict.chrome
  const items: NavItem[] = [
    { href: '/about', label: c.about },
    { href: '/products', label: c.products },
    { href: '/distributorship', label: c.distributorship },
    { href: '/awards', label: c.awards },
    { href: '/contact', label: c.contact },
  ]
  const wa = whatsappHref('Hi, I have an enquiry')
  return (
    <HeaderShell className="on-dark sticky top-0 z-[var(--z-sticky-header)] bg-ink-900">
      <Container className="flex h-16 items-center justify-between gap-6">
        {/* Mobile: hamburger on the left, next to the logo (owner feedback, DECISIONS P13). */}
        <div className="flex items-center gap-1">
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
          <Logo name={business.name} homeLabel={c.logoHome} />
        </div>
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
            className="inline-flex size-11 items-center justify-center rounded-sm text-white lg:hidden"
          >
            <Phone aria-hidden="true" className="size-5" />
            <span className="sr-only">{c.call}</span>
          </a>
        </div>
      </Container>
      <div aria-hidden="true" className="h-1 bg-brand-yellow" />
    </HeaderShell>
  )
}
