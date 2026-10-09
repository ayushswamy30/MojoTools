import { z } from 'zod'
import { brands, categories, enquiryTypes } from '@/features/content/site'
import { normaliseIndianMobile } from '@/lib/format'

export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024

export const ALLOWED_ATTACHMENTS: Record<string, string[]> = {
  'application/pdf': ['pdf'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
  'application/vnd.ms-excel': ['xls'],
  'text/csv': ['csv'],
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/webp': ['webp'],
}

/** GSTIN shape check only (15 chars: state code, PAN, entity, Z, checksum). Checksum comes in R1 (T8.4). */
export const GSTIN_PATTERN = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value === '' ? undefined : value))
    .optional()

const typeValues = enquiryTypes.map((t) => t.value) as [string, ...string[]]

/**
 * Shared enquiry schema (RULES §1: one source of truth for validation).
 * Error messages say how to fix the problem (DESIGN §8.4).
 */
export const enquirySchema = z.object({
  type: z.enum(typeValues, { error: 'Choose what you need' }),
  name: z
    .string()
    .trim()
    .min(2, 'Enter your name')
    .max(100, 'Name must be 100 characters or fewer'),
  mobile: z
    .string()
    .trim()
    .transform((value, ctx) => {
      const mobile = normaliseIndianMobile(value)
      if (!mobile) {
        ctx.addIssue({
          code: 'custom',
          message: 'Enter a 10-digit mobile number, e.g. 98765 43210',
        })
        return z.NEVER
      }
      return mobile
    }),
  email: z
    .string()
    .trim()
    .transform((value) => (value === '' ? undefined : value))
    .pipe(z.email('Enter an email address like name@company.com').optional())
    .optional(),
  company: optionalText(150),
  gstin: z
    .string()
    .trim()
    .toUpperCase()
    .transform((value) => (value === '' ? undefined : value))
    .pipe(
      z
        .string()
        .regex(GSTIN_PATTERN, 'GSTIN must be 15 characters, e.g. 27ABCDE1234F1Z5')
        .optional(),
    )
    .optional(),
  brand: optionalText(80).refine(
    (slug) => !slug || brands.some((b) => b.slug === slug),
    'Choose a brand from the list',
  ),
  category: optionalText(80).refine(
    (slug) => !slug || categories.some((c) => c.slug === slug),
    'Choose a category from the list',
  ),
  message: z
    .string()
    .trim()
    .min(5, 'Tell us what you need (at least a few words)')
    .max(4000, 'Message must be 4,000 characters or fewer'),
  consent: z.literal('on', { error: 'Tick the box to agree to be contacted' }),
  sourcePage: optionalText(200),
})

export type EnquiryInput = z.output<typeof enquirySchema>

export type FieldErrors = Partial<Record<keyof EnquiryInput | 'attachment', string>>

/** Validates the optional attachment (type + extension allow-list, size). Returns an error message or null. */
export function validateAttachment(file: File | null): string | null {
  if (!file || file.size === 0) return null
  if (file.size > MAX_ATTACHMENT_BYTES)
    return 'The file is larger than 10 MB. Attach a smaller file or email it to us.'
  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
  const allowed = ALLOWED_ATTACHMENTS[file.type]
  if (!allowed || !allowed.includes(extension))
    return 'Attach a PDF, Excel, CSV or image file (JPG, PNG, WEBP).'
  return null
}

export function enquiryFromFormData(formData: FormData) {
  const read = (key: string) => {
    const value = formData.get(key)
    return typeof value === 'string' ? value : undefined
  }
  return {
    type: read('type') ?? '',
    name: read('name') ?? '',
    mobile: read('mobile') ?? '',
    email: read('email') ?? '',
    company: read('company') ?? '',
    gstin: read('gstin') ?? '',
    brand: read('brand') ?? '',
    category: read('category') ?? '',
    message: read('message') ?? '',
    consent: read('consent'),
    sourcePage: read('sourcePage') ?? '',
  }
}
