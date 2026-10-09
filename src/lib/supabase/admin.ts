import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

/** Service-role client: server-only, bypasses RLS (ARCHITECTURE §8). Used for enquiry inserts. */
export function createAdminClient() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase is not configured')
  }
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
