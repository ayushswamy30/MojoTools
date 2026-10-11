'use client'

import { openCookieSettings } from '@/features/analytics/consent'
import { cn } from '@/lib/cn'

/** Reopens the cookie banner in Manage mode (footer, cookie policy). */
export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={cn('text-left', className)}>
      {label}
    </button>
  )
}
