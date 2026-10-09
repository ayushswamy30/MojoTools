'use server'

import { cookies, headers } from 'next/headers'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { rateLimit } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'
import { ATTRIBUTION_COOKIE, parseAttribution } from '@/features/analytics/attribution'
import { notifyEnquiry } from './notify'
import { enquiryFromFormData, enquirySchema, validateAttachment, type FieldErrors } from './schema'
import type { EnquiryState, NewsletterState } from './state'
import { saveEnquiry, saveSubscriber } from './store'

async function clientIp() {
  const h = await headers()
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? h.get('x-real-ip') ?? null
}

/**
 * Public enquiry form (ARCHITECTURE §6.0): validate → rate limit → captcha → store → notify.
 * Returns typed state for useActionState; raw errors never reach the visitor (RULES §4).
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const raw = enquiryFromFormData(formData)
  const values = Object.fromEntries(
    Object.entries(raw).filter(([, v]) => typeof v === 'string') as [string, string][],
  )
  const ip = await clientIp()

  const parsed = enquirySchema.safeParse(raw)
  const fileEntry = formData.get('attachment')
  const attachment = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null
  const attachmentError = validateAttachment(attachment)

  if (!parsed.success || attachmentError) {
    const errors: FieldErrors = {}
    if (!parsed.success) {
      const flat = z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>
      for (const [key, messages] of Object.entries(flat)) {
        if (messages?.[0]) errors[key as keyof FieldErrors] = messages[0]
      }
    }
    if (attachmentError) errors.attachment = attachmentError
    return { status: 'invalid', errors, values }
  }

  // Only submissions that would be stored count towards the limit, so a visitor correcting
  // validation errors is never locked out.
  if (!rateLimit(`enquiry:${ip ?? 'unknown'}`)) {
    return { status: 'error', message: 'rateLimited', values }
  }
  const token = formData.get('cf-turnstile-response')
  if (!(await verifyTurnstile(typeof token === 'string' ? token : null, ip))) {
    return { status: 'error', message: 'captcha', values }
  }

  try {
    const attribution = parseAttribution((await cookies()).get(ATTRIBUTION_COOKIE)?.value)
    const saved = await saveEnquiry(parsed.data, attachment, attribution)
    if (!saved.demo) await notifyEnquiry(saved.number, parsed.data, attachment, attribution)
    logger.info('enquiry received', {
      number: saved.number,
      type: parsed.data.type,
      demo: saved.demo,
    })
    return {
      status: 'success',
      number: saved.number,
      name: parsed.data.name,
      type: parsed.data.type,
      demo: saved.demo,
    }
  } catch (error) {
    logger.error('enquiry failed', { error: String(error) })
    return { status: 'error', message: 'generic', values }
  }
}

const subscriberSchema = z.object({
  email: z.email().trim().toLowerCase().max(254),
  sourcePage: z.string().max(200).optional(),
})

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const ip = await clientIp()
  if (!rateLimit(`newsletter:${ip ?? 'unknown'}`)) return { status: 'error' }
  const parsed = subscriberSchema.safeParse({
    email: formData.get('email'),
    sourcePage: formData.get('sourcePage') ?? undefined,
  })
  if (!parsed.success) return { status: 'invalid', error: 'invalid' }
  try {
    const attribution = parseAttribution((await cookies()).get(ATTRIBUTION_COOKIE)?.value)
    const result = await saveSubscriber(parsed.data.email, parsed.data.sourcePage, attribution)
    return { status: 'success', demo: result.demo }
  } catch (error) {
    logger.error('newsletter signup failed', { error: String(error) })
    return { status: 'error' }
  }
}
