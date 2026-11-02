import type { ReactNode } from 'react'
import type { CategoryIcon as ArtName } from '@/features/content/site'

// Product drawings for the category grid, so a first-time buyer recognises the item, not a symbol.
// Ink outlines on white with yellow fills (same two-tone language as the "Why Mojo Tools" icons).
// shortcut: drawings stand in for product photos; swap for real photos when the owner sends them (A8).
const art: Record<ArtName, ReactNode> = {
  // Cordless drill
  drill: (
    <>
      <path d="M8 14h32a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6H8z" className="fill-brand-yellow" />
      <path d="M14 18v8M18 18v8" />
      <path d="M46 17h6v10h-6z" className="fill-ink-900" />
      <path d="M52 22h9" strokeWidth="2.5" />
      <path d="M19 30h12l-3 16h-7z" className="fill-brand-yellow" />
      <path d="M31 33h3v5h-3" />
      <rect x="14" y="46" width="22" height="10" rx="2" className="fill-ink-900" />
    </>
  ),
  // Combination spanner crossed with a screwdriver
  wrench: (
    <>
      <g transform="rotate(45 32 32)">
        <path d="M32 46v12" strokeWidth="2.5" />
        <rect x="27" y="22" width="10" height="24" rx="4" className="fill-brand-yellow" />
        <path d="M30.5 27v14M33.5 27v14" />
        <path d="M30.5 58h3l-.5 4h-2z" className="fill-ink-900" />
      </g>
      <g transform="rotate(-45 32 32)">
        <path d="M29 17h6v33h-6z" className="fill-white" />
        <path d="M28.5 2.7A9 9 0 1 0 35.5 2.7V9h-7Z" className="fill-white" />
        <circle cx="32" cy="55" r="6.5" className="fill-white" />
        <circle cx="32" cy="55" r="3" />
      </g>
    </>
  ),
  // Bench drill press
  factory: (
    <>
      <rect x="10" y="54" width="34" height="5" rx="1" className="fill-ink-900" />
      <rect x="15" y="12" width="6" height="42" className="fill-white" />
      <path d="M12 7h30a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H12z" className="fill-brand-yellow" />
      <path d="M17 12h8" />
      <path d="M45 15l9-5M45 15l9 3" />
      <path d="M38 24v7" strokeWidth="2.5" />
      <path d="M35 31h6l-1 5h-4z" className="fill-ink-900" />
      <path d="M38 36v6" />
      <path d="M21 45h30" strokeWidth="3" />
    </>
  ),
  // Measuring tape
  ruler: (
    <>
      <path d="M40 41h20v8H40z" className="fill-white" />
      <path d="M45 41v3M49 41v2M53 41v3M57 41v2" />
      <path d="M60 38v14" strokeWidth="2.5" />
      <path d="M14 14v-3h10v3" />
      <rect x="4" y="14" width="38" height="38" rx="9" className="fill-brand-yellow" />
      <circle cx="23" cy="33" r="8" className="fill-white" />
      <circle cx="23" cy="33" r="2" className="fill-ink-900" />
    </>
  ),
  // Grinding disc throwing sparks
  disc: (
    <>
      <circle cx="28" cy="34" r="22" className="fill-ink-900" />
      <circle cx="28" cy="34" r="13" className="fill-brand-yellow" />
      <circle cx="28" cy="34" r="4" className="fill-white" />
      <path d="M50 18l8-6M52 24l9-2M48 13l3-8" className="stroke-brand-yellow" strokeWidth="2.5" />
    </>
  ),
  // Hex bolt and nut
  nut: (
    <>
      <path d="M8 6h22v10H8z" className="fill-brand-yellow" />
      <path d="M15 6v10M23 6v10" />
      <path d="M14 16h10v42H14z" className="fill-white" />
      <path d="M14 26l10-3M14 32l10-3M14 38l10-3M14 44l10-3M14 50l10-3M14 56l10-3" />
      <path d="M45 25l11 6.5v13L45 51l-11-6.5v-13Z" className="fill-brand-yellow" />
      <circle cx="45" cy="38" r="5" className="fill-white" />
    </>
  ),
  // Hard hat and safety glasses
  'hard-hat': (
    <>
      <path d="M12 38a20 20 0 0 1 40 0z" className="fill-brand-yellow" />
      <path d="M28 18.5V38M36 18.5V38" />
      <rect x="6" y="38" width="52" height="6" rx="3" className="fill-brand-yellow" />
      <path d="M14 50h36" />
      <path
        d="M16 50h13v4a4 4 0 0 1-4 4h-5a4 4 0 0 1-4-4zM35 50h13v4a4 4 0 0 1-4 4h-5a4 4 0 0 1-4-4z"
        className="fill-ink-900"
      />
    </>
  ),
  // MIG welding torch with an arc spark
  flame: (
    <>
      <path d="M6 23c-5 0-5 10 0 14s2 14-3 19" />
      <rect x="6" y="17" width="26" height="12" rx="5" className="fill-brand-yellow" />
      <path d="M12 17v12M16 17v12" />
      <path d="M21 29l2 6h5l-1-6" />
      <path d="M32 23h5c6 0 9 4 9 10v6" strokeWidth="4" />
      <path d="M42 39h8l-1 8h-6z" className="fill-ink-900" />
      <path d="M46 47v3" />
      <circle cx="46" cy="55" r="3" className="fill-brand-yellow stroke-brand-yellow" />
      <path
        d="M46 60v3M39 55h-3M53 55h3M41 50l-2-2M51 50l2-2M41 60l-2 2M51 60l2 2"
        className="stroke-brand-yellow"
        strokeWidth="2.5"
      />
    </>
  ),
}

export function CategoryArt({ name, className }: { name: ArtName; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      {art[name]}
    </svg>
  )
}
