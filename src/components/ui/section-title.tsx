import { cn } from '@/lib/cn'

type Props = {
  as?: 'h1' | 'h2' | 'h3'
  title: string
  subtitle?: string
  id?: string
  onDark?: boolean
  className?: string
}

/** Real heading + 4px yellow rule (DESIGN §2.4). */
export function SectionTitle({
  as: Heading = 'h2',
  title,
  subtitle,
  id,
  onDark,
  className,
}: Props) {
  return (
    <div className={cn('mb-8', className)}>
      <Heading
        id={id}
        className={cn(
          'text-2xl font-bold md:text-3xl',
          Heading === 'h1' && 'text-3xl font-extrabold uppercase [font-stretch:125%] md:text-4xl',
          onDark && 'text-white',
        )}
      >
        {title}
      </Heading>
      <span aria-hidden="true" className="mt-3 block h-1 w-14 bg-brand-yellow" />
      {subtitle ? (
        <p className={cn('mt-4 max-w-2xl text-base', onDark ? 'text-steel-200' : 'text-steel-600')}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
