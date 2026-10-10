import 'server-only'

/**
 * Simple fixed-window limiter per key (e.g. IP). In-memory, so per server instance — good enough
 * alongside Turnstile for R0. Move to a shared store (e.g. Postgres or Upstash) before R1 traffic.
 */
const windows = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = windows.get(key)
  if (!entry || entry.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  entry.count += 1
  return entry.count <= limit
}
