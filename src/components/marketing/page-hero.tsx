import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'

export function PageHero({
  title,
  subtitle,
  crumbs,
  breadcrumbLabel,
  children,
}: {
  title: string
  subtitle?: string
  crumbs: { label: string; href?: string }[]
  breadcrumbLabel: string
  children?: React.ReactNode
}) {
  return (
    <div className="on-dark bg-ink-900">
      <Container className="py-12 md:py-16">
        <Breadcrumbs items={crumbs} label={breadcrumbLabel} onDark />
        <h1 className="mt-4 text-xl font-extrabold wrap-break-word text-white uppercase [font-stretch:125%] min-[360px]:text-2xl min-[400px]:text-3xl md:text-5xl">
          {title}
        </h1>
        <span aria-hidden="true" className="mt-4 block h-1 w-14 bg-brand-yellow" />
        {subtitle ? <p className="mt-4 max-w-2xl text-lg text-steel-200">{subtitle}</p> : null}
        {children}
      </Container>
    </div>
  )
}
