'use client'

import en from '@/i18n/messages/en.json'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Container className="max-w-2xl py-24 text-center">
      <h1 className="text-4xl font-extrabold uppercase [font-stretch:125%]">{en.error.title}</h1>
      <p className="mt-4">{en.error.body}</p>
      <Button className="mt-8" onClick={reset}>
        {en.error.retry}
      </Button>
    </Container>
  )
}
