import { cn } from '@/lib/cn'

/**
 * Stats shown as final values, no count-up animation — simplest way to meet DESIGN §8.3
 * (screen readers never hear intermediate numbers; nothing to disable for reduced motion).
 */
export function StatsStrip({
  stats,
  onDark,
}: {
  stats: { value: string; label: string }[]
  onDark?: boolean
}) {
  return (
    <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {stats.map((stat) => (
        // dt must precede dd in the DOM; flex-col-reverse shows the number first.
        <div
          key={stat.label}
          className={cn(
            'flex flex-col-reverse border-l-4 border-brand-yellow pl-4',
            onDark ? 'text-steel-200' : 'text-steel-600',
          )}
        >
          <dt className="mt-1 text-sm">{stat.label}</dt>
          <dd
            className={cn(
              'font-display text-3xl font-extrabold [font-stretch:125%]',
              onDark ? 'text-brand-yellow' : 'text-ink-900',
            )}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
