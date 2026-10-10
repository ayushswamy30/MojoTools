import Link from 'next/link'

type Crumb = { label: string; href?: string }

export function Breadcrumbs({
  items,
  label,
  onDark,
}: {
  items: Crumb[]
  label: string
  onDark?: boolean
}) {
  return (
    <nav aria-label={label}>
      <ol
        className={`flex flex-wrap items-center gap-2 text-sm ${onDark ? 'text-steel-200' : 'text-steel-500'}`}
      >
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              )}
              {!last ? <span aria-hidden="true">/</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
