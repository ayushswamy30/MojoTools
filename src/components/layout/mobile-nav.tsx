'use client'

import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'

import { useState } from 'react'
import Link from 'next/link'
import { Dialog } from 'radix-ui'
import { Menu, Phone, X } from 'lucide-react'
import type { NavItem } from './nav-links'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/cn'

type Props = {
  items: NavItem[]
  labels: {
    menu: string
    close: string
    getQuote: string
    call: string
    whatsapp: string
    mainNav: string
  }
  telHref: string
  whatsappHref: string
}

/** Slide-in drawer (DESIGN §4 MobileNav R0): focus trapped, Esc closes, focus returns to trigger. */
export function MobileNav({ items, labels, telHref, whatsappHref }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="-ml-2 inline-flex size-11 items-center justify-center rounded-sm text-white lg:hidden">
        <Menu aria-hidden="true" className="size-6" />
        <span className="sr-only">{labels.menu}</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[var(--z-sheet)] bg-black/60" />
        <Dialog.Content className="on-dark fixed inset-y-0 left-0 z-[var(--z-sheet)] flex w-[min(22rem,100%)] flex-col bg-ink-900 p-6 text-white shadow-overlay">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-lg font-bold text-white">
              {labels.menu}
            </Dialog.Title>
            <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-sm">
              <X aria-hidden="true" className="size-6" />
              <span className="sr-only">{labels.close}</span>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">{labels.mainNav}</Dialog.Description>
          <nav aria-label={labels.mainNav} className="mt-6">
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center border-b border-ink-700 text-lg font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-6">
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: 'primary' })}
            >
              {labels.getQuote}
            </Link>
            <a href={telHref} className={buttonVariants({ variant: 'outline-light' })}>
              <Phone aria-hidden="true" /> {labels.call}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'whatsapp' }))}
            >
              <WhatsAppIcon className="size-4" /> {labels.whatsapp}
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
