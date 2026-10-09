export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only z-[var(--z-dialog)] rounded-sm bg-brand-yellow px-4 py-3 font-semibold text-ink-900 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
    >
      {label}
    </a>
  )
}
