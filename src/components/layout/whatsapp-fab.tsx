'use client'

import { MessageCircle } from 'lucide-react'
import { trackEvent } from '@/features/analytics/events'

/** Floating WhatsApp button (DESIGN §4): #128C7E fill, 56px, sits above the cookie banner offset. */
export function WhatsAppFab({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { placement: 'fab' })}
      className="fixed right-4 bottom-[calc(1rem+var(--cookie-banner-height))] z-[var(--z-fab)] inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-overlay transition-transform hover:scale-105"
    >
      <MessageCircle aria-hidden="true" className="size-7" />
      <span className="sr-only">{label}</span>
    </a>
  )
}
