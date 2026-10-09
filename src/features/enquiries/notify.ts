import 'server-only'
import { Resend } from 'resend'
import { env, integrations } from '@/lib/env'
import { formatIndianPhone } from '@/lib/format'
import { logger } from '@/lib/logger'
import { business, enquiryTypes, getBrand, getCategory } from '@/features/content/site'
import type { Attribution } from '@/features/analytics/attribution'
import type { EnquiryInput } from './schema'

/**
 * Sales alert + customer auto-reply (ARCHITECTURE §6.0). The attachment travels with the alert
 * email, so sales never needs a long-lived link to the private bucket (RULES §5).
 * Email failures are logged and never fail the enquiry: it is already saved.
 */
export async function notifyEnquiry(
  number: string,
  input: EnquiryInput,
  attachment: File | null,
  attribution: Attribution,
) {
  if (!integrations.email) return
  const resend = new Resend(env.RESEND_API_KEY)
  const from = env.ENQUIRY_FROM_EMAIL ?? ''
  const to = (env.ENQUIRY_ALERT_EMAILS ?? '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)
  const typeLabel = enquiryTypes.find((t) => t.value === input.type)?.label ?? input.type

  const lines = [
    `New enquiry ${number} — ${typeLabel}`,
    '',
    `Name: ${input.name}`,
    `Mobile: ${formatIndianPhone(input.mobile)}`,
    input.email ? `Email: ${input.email}` : null,
    input.company ? `Company: ${input.company}` : null,
    input.gstin ? `GSTIN: ${input.gstin}` : null,
    input.brand ? `Brand: ${getBrand(input.brand)?.name ?? input.brand}` : null,
    input.category ? `Category: ${getCategory(input.category)?.name ?? input.category}` : null,
    '',
    input.message,
    '',
    `Page: ${input.sourcePage ?? '-'}`,
    `Source: ${[attribution.utm_source, attribution.utm_medium, attribution.utm_campaign].filter(Boolean).join(' / ') || attribution.referrer || 'direct'}`,
    '',
    `Reply ${business.responsePromise}.`,
  ].filter((line): line is string => line !== null)

  const attachments =
    attachment && attachment.size > 0
      ? [{ filename: attachment.name, content: Buffer.from(await attachment.arrayBuffer()) }]
      : undefined

  const jobs: Promise<unknown>[] = [
    resend.emails.send({
      from,
      to,
      replyTo: input.email,
      subject: `[${number}] ${typeLabel} from ${input.name}${input.company ? `, ${input.company}` : ''}`,
      text: lines.join('\n'),
      attachments,
    }),
  ]
  if (input.email) {
    jobs.push(
      resend.emails.send({
        from,
        to: input.email,
        subject: `We've received your enquiry (${number})`,
        text: [
          `Hi ${input.name},`,
          '',
          `Thanks for contacting ${business.name}. Your enquiry number is ${number}.`,
          `Our team will reply ${business.responsePromise}.`,
          '',
          `Need us sooner? Call ${business.phone} or WhatsApp ${business.whatsapp}.`,
          '',
          business.name,
        ].join('\n'),
      }),
    )
  }
  const results = await Promise.allSettled(jobs)
  for (const result of results) {
    if (result.status === 'rejected')
      logger.error('enquiry email failed', { number, error: String(result.reason) })
  }
}
