'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

export type NavItem = { href: string; label: string }

export function NavLinks({
  items,
  className,
  linkClassName,
}: {
  items: NavItem[]
  className?: string
  linkClassName?: string
}) {
  const pathname = usePathname()
  return (
    <ul className={className}>
      {items.map((item) => {
        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'inline-flex min-h-11 items-center border-b-4 border-transparent px-1 font-semibold text-white hover:border-steel-400',
                active && 'border-brand-yellow hover:border-brand-yellow',
                linkClassName,
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
