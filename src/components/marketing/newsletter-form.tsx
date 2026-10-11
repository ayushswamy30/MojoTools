'use client'

import { useActionState, useEffect, useId } from 'react'
import Link from 'next/link'
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
  const emailError = state.status === 'invalid' && state.errors.email ? labels.invalid : null
  const consentError =
    state.status === 'invalid' && state.errors.consent ? labels.consentError : null
  const generalError = state.status === 'error' ? genericError : null
  const email = state.status === 'invalid' || state.status === 'error' ? state.email : ''
  return (
    <form action={action} noValidate>
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <label htmlFor={`${id}-email`} className="block font-semibold text-ink-900">
        {labels.email}
      </label>
      <input
        id={`${id}-email`}
        name="email"
        type="email"
        autoComplete="email"
        required
        defaultValue={email}
        aria-invalid={Boolean(emailError)}
        aria-describedby={emailError ? `${id}-email-error` : undefined}
        className="mt-1.5 block w-full rounded-sm border border-steel-400 bg-white px-3 py-2.5 text-base text-ink-900 aria-[invalid=true]:border-2 aria-[invalid=true]:border-danger"
      />
      {emailError ? (
        <p id={`${id}-email-error`} className="mt-1.5 text-sm font-semibold text-danger">
          {emailError}
        </p>
      ) : null}
      <div className="mt-4 flex items-start gap-3">
        <input
          id={`${id}-consent`}
          name="consent"
          type="checkbox"
          required
          aria-invalid={Boolean(consentError)}
          aria-describedby={consentError ? `${id}-consent-error` : undefined}
          className="mt-1 size-5 shrink-0 accent-ink-900"
        />
        <label htmlFor={`${id}-consent`} className="text-sm">
          {labels.consent}{' '}
          <Link href="/policies/privacy" className="text-info underline underline-offset-4">
            {labels.privacyPolicy}
          </Link>
          . <span className="text-steel-500">({labels.required})</span>
        </label>
      </div>
      {consentError ? (
        <p id={`${id}-consent-error`} className="mt-1.5 text-sm font-semibold text-danger">
          {consentError}
        </p>
      ) : null}
      {generalError ? (
        <p className="mt-1.5 text-sm font-semibold text-danger">{generalError}</p>
      ) : null}
      {/* One live region announces whichever problem the submit found. */}
      <p role="alert" className="sr-only">
        {[emailError, consentError, generalError].filter(Boolean).join(' ')}
      </p>
      <Button
        type="submit"
        variant="secondary"
        className="mt-4"
        disabled={pending}
        aria-busy={pending}
      >
        {labels.submit}
      </Button>
    </form>
  )
}
