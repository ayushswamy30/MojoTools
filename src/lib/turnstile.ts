import 'server-only'
import { env, integrations } from './env'
import { logger } from './logger'

/** Verifies a Cloudflare Turnstile token. Without a secret key (demo mode) every request passes. */
export async function verifyTurnstile(token: string | null, ip: string | null): Promise<boolean> {
  if (!integrations.captcha) return true
  if (!token) return false
  try {
    const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY ?? '', response: token })
    if (ip) body.set('remoteip', ip)
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    })
    const result = (await response.json()) as { success?: boolean }
    return result.success === true
  } catch (error) {
    logger.error('turnstile verification failed', { error: String(error) })
    return false
  }
}
