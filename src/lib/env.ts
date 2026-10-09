import 'server-only'
import { z } from 'zod'

/**
 * Server environment, validated once (RULES §5). Every integration is optional in R0:
 * without its keys the site runs in **demo mode** (enquiries are accepted but not stored
 * or emailed). Production must set all of them (TASKS T17.8).
 */
const schema = z.object({
  SUPABASE_URL: z.url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  ENQUIRY_FROM_EMAIL: z.email().optional(),
  ENQUIRY_ALERT_EMAILS: z.string().min(1).optional(),
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
})

const parsed = schema.safeParse(process.env)
if (!parsed.success) {
  throw new Error(`Invalid environment variables: ${z.prettifyError(parsed.error)}`)
}

export const env = parsed.data

export const integrations = {
  database: Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY),
  email: Boolean(env.RESEND_API_KEY && env.ENQUIRY_FROM_EMAIL && env.ENQUIRY_ALERT_EMAILS),
  captcha: Boolean(env.TURNSTILE_SECRET_KEY),
}
