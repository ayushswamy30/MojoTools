'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * Sticky header that slides up out of view while the footer wordmark is on screen, so the
 * two MOJO TOOLS marks never show together, and slides back as soon as the visitor scrolls up.
 * Keyboard focus inside the header always brings it back.
 */
export function HeaderShell({ className, children }: React.ComponentProps<'header'>) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const target = document.getElementById('footer-wordmark')
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry?.isIntersecting ?? false),
      {
        threshold: 0.5,
      },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={cn(
        className,
        'transition-transform duration-300 ease-brand focus-within:translate-y-0',
        hidden && '-translate-y-full',
      )}
    >
      {children}
    </header>
  )
}
