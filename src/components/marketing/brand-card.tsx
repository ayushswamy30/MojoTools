import Link from 'next/link'
import type { Brand } from '@/features/content/site'
import { cn } from '@/lib/cn'

/** Logo tile. The brand name is always visible (DESIGN Prompt 4); placeholder mark until real logos arrive (A1). */
export function BrandCard({ brand, onDark }: { brand: Brand; onDark?: boolean }) {
  return (
    <Link
      href={`/distributorship/${brand.slug}`}
      className={cn(
        'flex h-full flex-col items-center justify-center gap-3 rounded-md border p-6',
        onDark
          ? 'border-ink-700 bg-ink-800 transition-[translate,border-color] duration-200 ease-brand hover:border-brand-yellow motion-safe:hover:-translate-y-1'
          : 'border-steel-200 bg-white transition-shadow duration-150 hover:shadow-hover',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex h-16 w-full items-center justify-center rounded-sm font-display text-2xl font-extrabold uppercase [font-stretch:125%]',
          onDark ? 'bg-ink-700 text-brand-yellow' : 'bg-steel-100 text-steel-500',
        )}
      >
        {brand.name.replace('Brand ', '')}
      </span>
      <span
        className={cn(
          'text-sm font-semibold tracking-wide uppercase',
          onDark ? 'text-white' : 'text-ink-900',
        )}
      >
        {brand.name}
      </span>
    </Link>
  )
}
