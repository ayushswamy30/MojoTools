import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function CtaBand({
  title,
  body,
  quoteLabel,
  whatsappLabel,
  whatsappHref,
  newTabLabel,
}: {
  title: string
  body?: string
  quoteLabel: string
  whatsappLabel: string
  whatsappHref: string
  newTabLabel: string
}) {
  return (
    <section aria-labelledby="cta-band-title" className="on-dark bg-ink-900">
      <Container className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h2
            id="cta-band-title"
            className="text-2xl font-extrabold text-white uppercase [font-stretch:125%] md:text-3xl"
          >
            {title}
          </h2>
          {body ? <p className="mt-2 text-steel-200">{body}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/quote?type=quote"
            className={buttonVariants({ variant: 'primary', size: 'lg' })}
          >
            {quoteLabel}
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'outline-light', size: 'lg' })}
          >
            <MessageCircle aria-hidden="true" /> {whatsappLabel}
            <span className="sr-only"> {newTabLabel}</span>
          </a>
        </div>
      </Container>
    </section>
  )
}
