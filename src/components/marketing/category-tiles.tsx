import Link from 'next/link'
import type { Category } from '@/features/content/site'
import { CategoryArt } from './category-art'

/**
 * Picture-first category grid: a recognisable product drawing over a plain name, no card chrome,
 * so buyers who don't know the trade names can still find their way.
 * R0: tiles open the enquiry form pre-filled (DECISIONS P10). R1 links to the shop.
 */
export function CategoryTiles({
  categories,
  enquireLabel,
}: {
  categories: Category[]
  enquireLabel: string
}) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            href={`/quote?type=quote&category=${category.slug}`}
            className="group flex h-full flex-col items-center rounded-md px-2 py-3 text-center"
          >
            <CategoryArt
              name={category.icon}
              className="size-24 text-ink-900 transition-transform duration-200 ease-brand motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-105 md:size-28"
            />
            <span className="mt-4 text-base font-semibold text-ink-900 underline-offset-4 group-hover:underline">
              <span className="sr-only">{enquireLabel}: </span>
              {category.name}
            </span>
            <span className="mt-1 text-sm text-steel-500">{category.blurb}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
