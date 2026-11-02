import Link from 'next/link'
import type { Category } from '@/features/content/site'
import { cn } from '@/lib/cn'
import { CategoryArt } from './category-art'

/** Horizontal, scrollable category switcher for /products; the active one carries a yellow rule. */
export function CategoryStrip({
  categories,
  activeSlug,
  label,
}: {
  categories: Category[]
  activeSlug: string
  label: string
}) {
  return (
    <nav aria-label={label}>
      <ul className="-mx-4 flex snap-x [scrollbar-width:thin] gap-2 overflow-x-auto px-4 pb-2">
        {categories.map((category) => {
          const active = category.slug === activeSlug
          return (
            <li key={category.slug} className="shrink-0 snap-start">
              <Link
                href={`/products?category=${category.slug}`}
                scroll={false}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative flex w-28 flex-col items-center gap-2 rounded-md px-2 pt-3 pb-4 text-center md:w-32',
                  active ? 'bg-steel-100' : 'hover:bg-steel-50',
                )}
              >
                <CategoryArt
                  name={category.icon}
                  className="size-14 text-ink-900 transition-transform duration-200 ease-brand motion-safe:group-hover:-translate-y-0.5 md:size-16"
                />
                <span
                  className={cn(
                    'text-sm leading-tight text-ink-900',
                    active ? 'font-bold' : 'font-medium',
                  )}
                >
                  {category.name}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-3 bottom-0 h-1 rounded-full bg-brand-yellow transition-transform duration-200 ease-brand',
                    active ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
