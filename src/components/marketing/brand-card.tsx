import Link from 'next/link'
import type { Brand } from '@/features/content/site'

/** Logo tile. The brand name is always visible (DESIGN Prompt 4); placeholder mark until real logos arrive (A1). */
export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/distributorship/${brand.slug}`}
      className="flex h-full flex-col items-center justify-center gap-3 rounded-md border border-steel-200 bg-white p-6 transition-shadow duration-150 hover:shadow-hover"
    >
      <span
        aria-hidden="true"
        className="flex h-16 w-full items-center justify-center rounded-sm bg-steel-100 font-display text-2xl font-extrabold text-steel-500 uppercase [font-stretch:125%]"
      >
        {brand.name.replace('Brand ', '')}
      </span>
      <span className="text-sm font-semibold tracking-wide text-ink-900 uppercase">
        {brand.name}
      </span>
    </Link>
  )
}
