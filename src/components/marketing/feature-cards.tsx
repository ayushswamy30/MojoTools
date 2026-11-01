import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type IconName = 'seal' | 'crate' | 'invoice' | 'advice'

// Two-tone line icons for dark cards: outlines take currentColor, accents are yellow fills
// with ink marks on top.
const icons: Record<IconName, ReactNode> = {
  seal: (
    <>
      <path d="M17 29 13 44l5-3 3 5 3-12M31 29l4 15-5-3-3 5-3-12" className="fill-brand-yellow" />
      <path
        d="M24 5l3 2.8 4-.9 1.2 3.9 3.9 1.2-.9 4 2.8 3-2.8 3 .9 4-3.9 1.2-1.2 3.9-4-.9-3 2.8-3-2.8-4 .9-1.2-3.9-3.9-1.2.9-4-2.8-3 2.8-3-.9-4 3.9-1.2 1.2-3.9 4 .9Z"
        className="fill-brand-yellow"
      />
      <path d="m18.5 19 4 4 7-8" className="stroke-ink-900" />
    </>
  ),
  crate: (
    <>
      <path d="M5 27h16v16H5zM21 27h16v16H21zM13 11h16v16H13z" />
      <path d="M11 27v5h4v-5M27 27v5h4v-5M19 11v5h4v-5" />
      <path d="M33 4h11v13H33l-5-6.5Z" className="fill-brand-yellow" />
      <circle cx="33.5" cy="10.5" r="1.5" className="stroke-ink-900" />
    </>
  ),
  invoice: (
    <g>
      <g transform="rotate(-12 18 21)">
        <path d="M7 6h16l6 6v26H7z" className="fill-ink-700" />
        <path d="M23 6v6h6M12 16h8M12 21h12M12 26h9" />
      </g>
      <circle cx="32" cy="32" r="11" className="fill-brand-yellow" />
      <path
        d="M27.5 26h9M27.5 29.5h9M29.5 26c3 0 4.5 1.5 4.5 3.5S32.5 33 29.5 33h-2l6.5 6.5"
        className="stroke-ink-900"
      />
    </g>
  ),
  advice: (
    <>
      <path
        d="M27 5h15a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-9l-5 4v-4a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z"
        className="fill-brand-yellow"
      />
      <path d="M30.5 12h.01M34.5 12h.01M38.5 12h.01" className="stroke-ink-900" strokeWidth="3" />
      <path d="M4 38h30M8 38v-4a11 11 0 0 1 22 0v4" />
      <path d="M16 24v-1a3 3 0 0 1 6 0v1M14.5 38v-8M23.5 38v-8" />
    </>
  ),
}

function FeatureIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      {icons[name]}
    </svg>
  )
}

// Hazard-tape edge, decorative: rises up from below the card edge while the card is hovered.
const tape = (
  <span
    aria-hidden="true"
    className="absolute inset-x-0 bottom-0 h-2 translate-y-full bg-[repeating-linear-gradient(-45deg,var(--color-brand-yellow)_0_12px,var(--color-ink-900)_12px_24px)] group-hover:translate-y-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-brand"
  />
)

/** Home "Why Mojo Tools": one large lead card, the other three stacked beside it; all on ink. */
export function FeatureCards({
  items,
}: {
  items: readonly { icon: IconName; title: string; body: string }[]
}) {
  const [lead, ...rest] = items
  if (!lead) return null
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-3">
      <li className="on-dark group relative flex flex-col overflow-hidden rounded-md bg-ink-900 p-8 md:col-span-2 md:p-10 lg:row-span-3">
        <FeatureIcon name={lead.icon} className="size-28 text-brand-yellow md:size-36" />
        <h3 className="mt-auto pt-10 text-2xl leading-tight font-extrabold text-white uppercase [font-stretch:125%] md:text-3xl">
          {lead.title}
        </h3>
        <p className="mt-4 max-w-sm text-lg text-steel-200">{lead.body}</p>
        {tape}
      </li>
      {rest.map((item, index) => (
        <li
          key={item.title}
          className={cn(
            'on-dark group relative flex items-center gap-4 overflow-hidden rounded-md border border-ink-700 bg-ink-900 p-6 transition-[transform,border-color] duration-200 ease-brand md:gap-6 md:p-7 lg:col-span-3',
            'hover:border-brand-yellow motion-safe:hover:-translate-y-0.5',
            index === rest.length - 1 && 'md:col-span-2',
          )}
        >
          <span className="grid size-16 shrink-0 place-items-center rounded-md bg-ink-700 md:size-24">
            <FeatureIcon name={item.icon} className="size-11 text-brand-yellow md:size-16" />
          </span>
          <div>
            <h3 className="text-xl leading-snug font-extrabold text-white [font-stretch:112%] md:text-2xl">
              {item.title}
            </h3>
            <p className="mt-2 text-base text-steel-200">{item.body}</p>
          </div>
          {tape}
        </li>
      ))}
    </ul>
  )
}
