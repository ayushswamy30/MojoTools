'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import type { Brand, ProductType } from '@/features/content/site'
import { cn } from '@/lib/cn'
import { BrandCard } from './brand-card'

type Labels = { filterLabel: string; all: string; showing: string }

/** Filter chips are toggle buttons with aria-pressed; the result count is announced politely. */
export function BrandGrid({
  brands,
  productTypes,
  labels,
}: {
  brands: Brand[]
  productTypes: ProductType[]
  labels: Labels
}) {
  const [filter, setFilter] = useState<ProductType | null>(null)
  const visible = filter ? brands.filter((brand) => brand.productTypes.includes(filter)) : brands
  const chips: (ProductType | null)[] = [null, ...productTypes]

  return (
    <div>
      <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap gap-2">
        {chips.map((chip) => {
          const pressed = chip === filter
          return (
            <button
              key={chip ?? 'all'}
              type="button"
              aria-pressed={pressed}
              onClick={() => setFilter(chip)}
              className={cn(
                'inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold',
                pressed
                  ? 'border-brand-yellow bg-brand-yellow text-ink-900'
                  : 'border-steel-400 bg-white text-ink-900 hover:bg-steel-100',
              )}
            >
              {pressed ? <Check aria-hidden="true" className="size-4" /> : null}
              {chip ?? labels.all}
            </button>
          )
        })}
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-steel-500">
        {labels.showing.replace('{count}', String(visible.length))}
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {visible.map((brand) => (
          <li key={brand.slug}>
            <BrandCard brand={brand} />
          </li>
        ))}
      </ul>
    </div>
  )
}
