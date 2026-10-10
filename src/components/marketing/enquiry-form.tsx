'use client'

import { useActionState, useEffect, useId, useRef } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { trackEvent } from '@/features/analytics/events'
import { submitEnquiry } from '@/features/enquiries/actions'
import type { FieldErrors } from '@/features/enquiries/schema'
import { initialEnquiryState, type EnquiryState } from '@/features/enquiries/state'
import type { Dictionary } from '@/i18n/dictionary'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'

type Option = { value: string; label: string }

type Props = {
  labels: Dictionary['form']
  types: readonly Option[]
  brands: Option[]
  categories: Option[]
  defaults: { type?: string; brand?: string; category?: string; message?: string }
  sourcePage: string
  responsePromise: string
  turnstileSiteKey?: string
}

type State = EnquiryState & { attempt: number }

const fieldOrder: (keyof FieldErrors)[] = [
  'type',
  'name',
  'mobile',
  'email',
  'company',
  'gstin',
  'brand',
  'category',
  'message',
  'attachment',
  'consent',
]

const inputClass =
  'mt-1.5 block w-full rounded-sm border border-steel-400 bg-white px-3 py-2.5 text-base text-ink-900 aria-[invalid=true]:border-danger aria-[invalid=true]:border-2'

/**
 * Enquiry / quote form — DESIGN §8.4: visible labels, linked errors, error summary that takes
 * focus on a failed submit, success announced via role="status". Works without JavaScript
 * (server action + native form post).
 */
export function EnquiryForm(props: Props) {
  const { labels } = props
  const [state, formAction, pending] = useActionState<State, FormData>(
    async (prev, formData) => ({
      ...(await submitEnquiry(prev, formData)),
      attempt: prev.attempt + 1,
    }),
    { ...initialEnquiryState, attempt: 0 },
  )
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const id = useId()
  const fieldId = (name: string) => `${id}-${name}`

  useEffect(() => {
    if (state.status === 'invalid' || state.status === 'error') summaryRef.current?.focus()
    if (state.status === 'success') {
      successRef.current?.focus()
      trackEvent('generate_lead', { enquiry_type: state.type, source_page: props.sourcePage })
      if (state.type === 'price_list') trackEvent('price_list_request', {})
    }
  }, [state, props.sourcePage])

  if (state.status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-md border-2 border-success bg-white p-6"
      >
        <div className="flex gap-3">
          <CheckCircle2 aria-hidden="true" className="size-6 shrink-0 text-success" />
          <div>
            <p className="font-display text-xl font-bold text-ink-900">
              {labels.successTitle.replace('{name}', state.name)}
            </p>
            <p className="mt-2">
              {labels.successBody
                .replace('{number}', state.number)
                .replace('{promise}', props.responsePromise)}
            </p>
            {state.demo ? (
              <p className="mt-2 text-sm font-semibold text-warning">{labels.successDemo}</p>
            ) : null}
            <Link
              href={`${props.sourcePage}?sent=${state.attempt}`}
              className="mt-4 inline-flex min-h-11 items-center font-semibold text-info underline underline-offset-4"
            >
              {labels.anotherEnquiry}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const errors: FieldErrors = state.status === 'invalid' ? state.errors : {}
  const values: Record<string, string> =
    state.status === 'invalid' || state.status === 'error' ? state.values : {}
  const value = (name: string, fallback = '') => values[name] ?? fallback
  const errorFor = (name: keyof FieldErrors) => errors[name]
  const describedBy = (name: keyof FieldErrors, hint?: boolean) =>
    [hint ? `${fieldId(name)}-hint` : null, errorFor(name) ? `${fieldId(name)}-error` : null]
      .filter(Boolean)
      .join(' ') || undefined

  const summaryErrors = fieldOrder.filter((name) => errors[name])
  const generalError =
    state.status === 'error'
      ? state.message === 'rateLimited'
        ? labels.rateLimited
        : state.message === 'captcha'
          ? labels.captchaFallback
          : labels.genericError
      : null

  const renderLabel = (name: string, text: string, optional = false) => (
    <label htmlFor={fieldId(name)} className="block font-semibold text-ink-900">
      {text}{' '}
      <span className="text-sm font-normal text-steel-500">
        ({optional ? labels.optional : labels.required})
      </span>
    </label>
  )
  const renderError = (name: keyof FieldErrors) =>
    errorFor(name) ? (
      <p
        id={`${fieldId(name)}-error`}
        className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold text-danger"
      >
        <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        {errorFor(name)}
      </p>
    ) : null

  return (
    <form
      key={state.attempt}
      action={formAction}
      noValidate
      className="space-y-5"
      encType="multipart/form-data"
    >
      {summaryErrors.length > 0 || generalError ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-md border-2 border-danger bg-white p-4"
        >
          <h2 className="font-sans text-base font-bold text-danger">{labels.errorSummaryTitle}</h2>
          {generalError ? <p className="mt-1">{generalError}</p> : null}
          {summaryErrors.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {summaryErrors.map((name) => (
                <li key={name}>
                  <a
                    href={`#${fieldId(name)}`}
                    className="text-danger underline underline-offset-4"
                  >
                    {errors[name]}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <input type="hidden" name="sourcePage" value={props.sourcePage} />

      <div>
        {renderLabel('type', labels.type)}
        <select
          id={fieldId('type')}
          name="type"
          defaultValue={value('type', props.defaults.type ?? 'contact')}
          aria-invalid={Boolean(errorFor('type'))}
          aria-describedby={describedBy('type')}
          className={inputClass}
        >
          {props.types.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {renderError('type')}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          {renderLabel('name', labels.name)}
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={value('name')}
            aria-invalid={Boolean(errorFor('name'))}
            aria-describedby={describedBy('name')}
            className={inputClass}
          />
          {renderError('name')}
        </div>
        <div>
          {renderLabel('mobile', labels.mobile)}
          <p id={`${fieldId('mobile')}-hint`} className="text-sm text-steel-500">
            {labels.mobileHint}
          </p>
          <input
            id={fieldId('mobile')}
            name="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            required
            defaultValue={value('mobile')}
            aria-invalid={Boolean(errorFor('mobile'))}
            aria-describedby={describedBy('mobile', true)}
            className={inputClass}
          />
          {renderError('mobile')}
        </div>
        <div>
          {renderLabel('email', labels.email, true)}
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={value('email')}
            aria-invalid={Boolean(errorFor('email'))}
            aria-describedby={describedBy('email')}
            className={inputClass}
          />
          {renderError('email')}
        </div>
        <div>
          {renderLabel('company', labels.company, true)}
          <input
            id={fieldId('company')}
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={value('company')}
            aria-invalid={Boolean(errorFor('company'))}
            aria-describedby={describedBy('company')}
            className={inputClass}
          />
          {renderError('company')}
        </div>
        <div>
          {renderLabel('gstin', labels.gstin, true)}
          <input
            id={fieldId('gstin')}
            name="gstin"
            type="text"
            autoCapitalize="characters"
            maxLength={15}
            defaultValue={value('gstin')}
            aria-invalid={Boolean(errorFor('gstin'))}
            aria-describedby={describedBy('gstin')}
            className={cn(inputClass, 'font-mono uppercase')}
          />
          {renderError('gstin')}
        </div>
        <div>
          {renderLabel('brand', labels.brand, true)}
          <select
            id={fieldId('brand')}
            name="brand"
            defaultValue={value('brand', props.defaults.brand ?? '')}
            aria-invalid={Boolean(errorFor('brand'))}
            aria-describedby={describedBy('brand')}
            className={inputClass}
          >
            <option value="">{labels.brandAny}</option>
            {props.brands.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {renderError('brand')}
        </div>
        <div className="sm:col-span-2">
          {renderLabel('category', labels.category, true)}
          <select
            id={fieldId('category')}
            name="category"
            defaultValue={value('category', props.defaults.category ?? '')}
            aria-invalid={Boolean(errorFor('category'))}
            aria-describedby={describedBy('category')}
            className={inputClass}
          >
            <option value="">{labels.categoryAny}</option>
            {props.categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {renderError('category')}
        </div>
      </div>

      <div>
        {renderLabel('message', labels.message)}
        <p id={`${fieldId('message')}-hint`} className="text-sm text-steel-500">
          {labels.messageHint}
        </p>
        <textarea
          id={fieldId('message')}
          name="message"
          rows={5}
          required
          defaultValue={value('message', props.defaults.message ?? '')}
          aria-invalid={Boolean(errorFor('message'))}
          aria-describedby={describedBy('message', true)}
          className={inputClass}
        />
        {renderError('message')}
      </div>

      <div>
        {renderLabel('attachment', labels.attachment, true)}
        <p id={`${fieldId('attachment')}-hint`} className="text-sm text-steel-500">
          {labels.attachmentHint}
        </p>
        <input
          id={fieldId('attachment')}
          name="attachment"
          type="file"
          accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png,.webp"
          aria-invalid={Boolean(errorFor('attachment'))}
          aria-describedby={describedBy('attachment', true)}
          className="mt-1.5 block w-full text-sm file:mr-3 file:min-h-11 file:rounded-sm file:border file:border-ink-900 file:bg-white file:px-4 file:font-semibold file:text-ink-900"
        />
        {renderError('attachment')}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={fieldId('consent')}
            name="consent"
            type="checkbox"
            required
            defaultChecked={value('consent') === 'on'}
            aria-invalid={Boolean(errorFor('consent'))}
            aria-describedby={describedBy('consent')}
            className="mt-1 size-5 shrink-0 accent-ink-900"
          />
          <label htmlFor={fieldId('consent')} className="text-sm">
            {labels.consent}{' '}
            <Link href="/policies/privacy" className="text-info underline underline-offset-4">
              {labels.privacyPolicy}
            </Link>
            . <span className="text-steel-500">({labels.required})</span>
          </label>
        </div>
        {renderError('consent')}
      </div>

      {props.turnstileSiteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div
            className="cf-turnstile"
            data-sitekey={props.turnstileSiteKey}
            data-appearance="interaction-only"
          />
        </>
      ) : null}

      <Button type="submit" size="lg" disabled={pending} aria-busy={pending}>
        {pending ? labels.submitting : labels.submit}
      </Button>
    </form>
  )
}
