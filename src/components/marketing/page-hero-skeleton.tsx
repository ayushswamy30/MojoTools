import { Container } from '@/components/ui/container'

/** Instant placeholder shown while a dynamic page's content streams in during client navigation. */
export function PageHeroSkeleton() {
  return (
    <div aria-hidden="true" className="bg-ink-900">
      <Container className="py-12 md:py-16">
        <div className="h-4 w-40 rounded-sm bg-ink-700" />
        <div className="mt-6 h-10 w-2/3 max-w-md rounded-sm bg-ink-700" />
        <span className="mt-4 block h-1 w-14 bg-brand-yellow" />
      </Container>
    </div>
  )
}
