import Link from 'next/link'
import en from '@/i18n/messages/en.json'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

// not-found can't read root params, and R0 is English-only, so it uses the English messages directly.
export default function NotFound() {
  const m = en.notFound
  return (
    <Container className="max-w-2xl py-24 text-center">
      <p className="font-mono text-sm text-steel-500">404</p>
      <h1 className="mt-2 text-4xl font-extrabold uppercase [font-stretch:125%]">{m.title}</h1>
      <p className="mt-4">{m.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants({ variant: 'primary' })}>
          {m.home}
        </Link>
        <Link href="/distributorship" className={buttonVariants({ variant: 'outline' })}>
          {en.chrome.distributorship}
        </Link>
        <Link href="/contact" className={buttonVariants({ variant: 'outline' })}>
          {en.chrome.contact}
        </Link>
      </div>
    </Container>
  )
}
