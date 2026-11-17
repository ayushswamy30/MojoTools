import Link from 'next/link'
import type { Category } from '@/features/content/site'
import { CategoryArt } from './category-art'

/**
 * Picture-first category grid: a recognisable product drawing over a plain name, no card chrome,
 * so buyers who don't know the trade names can still find their way.
 * Tiles open that category on /products (DECISIONS D35, replacing P10).
 */
export function CategoryTiles({ categories }: { categories: Category[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            href={`/products?category=${category.slug}`}
            className="group flex h-full flex-col items-center rounded-md px-2 py-3 text-center"
          >
            <CategoryArt
              name={category.icon}
              className="size-24 text-ink-900 transition-transform duration-200 ease-brand motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-105 md:size-28"
            />
            <span className="mt-4 text-base font-semibold text-ink-900 underline-offset-4 group-hover:underline">
              {category.name}
            </span>
            <span className="mt-1 text-sm text-steel-500">{category.blurb}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
