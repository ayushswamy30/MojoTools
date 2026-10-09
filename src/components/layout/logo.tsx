import Link from 'next/link'

/** Text wordmark placeholder until the real logo SVG arrives (A5). */
export function Logo({ name, homeLabel }: { name: string; homeLabel: string }) {
  return (
    <Link
      href="/"
      aria-label={`${name}, ${homeLabel}`}
      className="inline-flex min-h-11 items-center gap-2 font-display text-xl font-extrabold tracking-tight whitespace-nowrap text-white uppercase [font-stretch:125%]"
    >
      <span
        aria-hidden="true"
        className="inline-block size-4 bg-brand-yellow [clip-path:polygon(0_0,100%_0,0_100%)]"
      />
      {name}
    </Link>
  )
}
