'use client'

import { useActionState, useEffect, useId } from 'react'
import { trackEvent } from '@/features/analytics/events'
import { subscribeNewsletter } from '@/features/enquiries/actions'
import type { NewsletterState } from '@/features/enquiries/state'
import type { Dictionary } from '@/i18n/dictionary'
import { Button } from '@/components/ui/button'

export function NewsletterForm({
  labels,
  genericError,
  sourcePage,
}: {
  labels: Dictionary['newsletter']
  genericError: string
  sourcePage: string
}) {
  const [state, action, pending] = useActionState<NewsletterState, FormData>(subscribeNewsletter, {
    status: 'idle',
  })
  const id = useId()

  useEffect(() => {
    if (state.status === 'success') trackEvent('notify_signup', { topic: 'newsletter' })
  }, [state])

  if (state.status === 'success') {
    return (
      <p role="status" className="font-semibold text-ink-900">
        {labels.success}
        {state.demo ? (
          <span className="mt-1 block text-sm text-warning">{labels.successDemo}</span>
        ) : null}
      </p>
    )
  }
  const error =
    state.status === 'invalid' ? labels.invalid : state.status === 'error' ? genericError : null
  return (
    <form action={action} noValidate>
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <label htmlFor={`${id}-email`} className="block font-semibold text-ink-900">
        {labels.email}
      </label>
      <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="block w-full rounded-sm border border-steel-400 bg-white px-3 py-2.5 text-base text-ink-900"
        />
        <Button type="submit" variant="secondary" disabled={pending} aria-busy={pending}>
          {labels.submit}
        </Button>
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-danger">
          {error}
        </p>
      ) : null}
    </form>
  )
}
