import { BadgeCheck } from 'lucide-react'

export function FeatureCards({
  items,
  headingLevel = 'h3',
}: {
  items: { title: string; body: string }[]
  headingLevel?: 'h3' | 'h4'
}) {
  const Heading = headingLevel
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li
          key={item.title}
          className="rounded-md border border-steel-200 bg-white p-6 shadow-card"
        >
          <BadgeCheck aria-hidden="true" className="size-7 text-ink-900" />
          <Heading className="mt-4 text-lg font-bold">{item.title}</Heading>
          <p className="mt-2 text-sm">{item.body}</p>
        </li>
      ))}
    </ul>
  )
}
