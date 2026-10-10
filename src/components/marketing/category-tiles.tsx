import Link from 'next/link'
import type { Category } from '@/features/content/site'
import { CategoryIcon } from './category-icon'

/** R0: showcase tiles that open the enquiry form pre-filled (DECISIONS P10). R1 links to the shop. */
export function CategoryTiles({
  categories,
  enquireLabel,
}: {
  categories: Category[]
  enquireLabel: string
}) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            href={`/quote?type=quote&category=${category.slug}`}
            className="group flex h-full flex-col rounded-md border border-steel-200 bg-steel-100 p-5 transition-shadow duration-150 hover:shadow-hover"
          >
            <span className="flex size-14 items-center justify-center rounded-md bg-white">
              <CategoryIcon name={category.icon} className="size-7 text-ink-900" />
            </span>
            <span className="mt-4 font-display text-lg font-bold text-ink-900">
              {category.name}
            </span>
            <span className="mt-1 text-sm text-steel-600">{category.blurb}</span>
            <span className="mt-3 text-sm font-semibold text-ink-900 underline-offset-4 group-hover:underline">
              {enquireLabel}
              <span className="sr-only">: {category.name}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
