import { cn } from '@/lib/cn'

/**
 * Stand-in for real photography until the owner supplies photos (A4, A8).
 * Decorative: it carries no information, so it's hidden from assistive tech.
 */
export function PlaceholderVisual({
  tone = 'workbench',
  label,
  className,
}: {
  tone?: 'workbench' | 'warehouse' | 'jobsite' | 'light'
  label?: string
  className?: string
}) {
  const tones = {
    workbench: 'from-ink-700 via-ink-800 to-ink-900',
    warehouse: 'from-steel-600 via-ink-700 to-ink-900',
    jobsite: 'from-ink-700 via-steel-600 to-ink-900',
    light: 'from-steel-100 via-steel-50 to-steel-200',
  }
  return (
    <div
      aria-hidden="true"
      className={cn('relative overflow-hidden bg-gradient-to-br', tones[tone], className)}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_22px,rgb(255_255_255/0.04)_22px_44px)]" />
      {label ? (
        <span
          className={cn(
            'absolute right-3 bottom-3 rounded-sm px-2 py-1 font-mono text-[13px]',
            tone === 'light' ? 'bg-white text-steel-600' : 'bg-black/50 text-steel-200',
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  )
}
