import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'

/** A named, real person behind the contact button (the "Talk to Ali" pattern). */
export function ExpertCard({
  name,
  role,
  photo,
  photoAlt,
  title,
  body,
  ctaLabel,
  href,
  newTabLabel,
}: {
  name: string
  role: string
  photo: string
  photoAlt: string
  title: string
  body: string
  ctaLabel: string
  href: string
  newTabLabel: string
}) {
  return (
    <section aria-labelledby="expert-title" className="pb-16">
      <Container>
        <div className="flex flex-col items-start gap-6 rounded-md border border-steel-200 bg-white p-6 shadow-card md:flex-row md:items-center md:p-8">
          <Image
            src={photo}
            alt={photoAlt}
            width={96}
            height={96}
            sizes="96px"
            className="size-24 shrink-0 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2
              id="expert-title"
              className="text-xl font-extrabold text-ink-900 uppercase [font-stretch:125%]"
            >
              {title}
            </h2>
            <p className="mt-2">{body}</p>
            <p className="mt-1 text-sm text-steel-500">
              {name} · {role}
            </p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'whatsapp', size: 'lg' })}
          >
            <WhatsAppIcon className="size-4" /> {ctaLabel}
            <span className="sr-only"> {newTabLabel}</span>
          </a>
        </div>
      </Container>
    </section>
  )
}
