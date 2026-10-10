import 'server-only'
import { randomUUID } from 'node:crypto'
import { integrations } from '@/lib/env'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Attribution } from '@/features/analytics/attribution'
import { brands, categories } from '@/features/content/site'
import type { EnquiryInput } from './schema'

export type SavedEnquiry = { number: string; attachmentPath: string | null; demo: boolean }

const BUCKET = 'enquiry-attachments'

/**
 * Saves an enquiry (ARCHITECTURE §6.0). Without Supabase configured (demo mode) nothing is
 * stored and a DEMO number is returned, so the preview can be clicked through end to end.
 */
export async function saveEnquiry(
  input: EnquiryInput,
  attachment: File | null,
  attribution: Attribution,
): Promise<SavedEnquiry> {
  if (!integrations.database) {
    return { number: `DEMO-${new Date().getFullYear()}-00000`, attachmentPath: null, demo: true }
  }

  const supabase = createAdminClient()
  let attachmentPath: string | null = null
  if (attachment && attachment.size > 0) {
    const extension = attachment.name.split('.').pop()?.toLowerCase() ?? 'bin'
    attachmentPath = `${new Date().toISOString().slice(0, 7)}/${randomUUID()}.${extension}`
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(attachmentPath, attachment, { contentType: attachment.type, upsert: false })
    if (error) throw new Error(`attachment upload failed: ${error.message}`)
  }

  // Brands/categories are referenced by slug in R0 content; the DB stores ids (seeded from the same list).
  const [brandRow, categoryRow] = await Promise.all([
    input.brand && brands.some((b) => b.slug === input.brand)
      ? supabase.from('brands').select('id').eq('slug', input.brand).maybeSingle()
      : Promise.resolve({ data: null }),
    input.category && categories.some((c) => c.slug === input.category)
      ? supabase.from('categories').select('id').eq('slug', input.category).maybeSingle()
      : Promise.resolve({ data: null }),
  ])

  const { data, error } = await supabase
    .from('enquiries')
    .insert({
      type: input.type,
      name: input.name,
      mobile: input.mobile,
      email: input.email ?? null,
      company: input.company ?? null,
      gstin: input.gstin ?? null,
      message: input.message,
      brand_id: brandRow.data?.id ?? null,
      category_id: categoryRow.data?.id ?? null,
      attachment_path: attachmentPath,
      source_page: input.sourcePage ?? null,
      utm_source: attribution.utm_source ?? null,
      utm_medium: attribution.utm_medium ?? null,
      utm_campaign: attribution.utm_campaign ?? null,
      referrer: attribution.referrer ?? null,
      consent_at: new Date().toISOString(),
    })
    .select('number')
    .single()

  if (error) throw new Error(`enquiry insert failed: ${error.message}`)
  return { number: String(data.number), attachmentPath, demo: false }
}

export async function saveSubscriber(
  email: string,
  sourcePage: string | undefined,
  attribution: Attribution,
) {
  if (!integrations.database) return { demo: true }
  const { error } = await createAdminClient()
    .from('newsletter_subscribers')
    .upsert(
      {
        email,
        topic: 'newsletter',
        consent_at: new Date().toISOString(),
        source_page: sourcePage ?? null,
        utm_source: attribution.utm_source ?? null,
        utm_medium: attribution.utm_medium ?? null,
        utm_campaign: attribution.utm_campaign ?? null,
      },
      { onConflict: 'email,topic', ignoreDuplicates: true },
    )
  if (error) throw new Error(`subscriber insert failed: ${error.message}`)
  return { demo: false }
}
