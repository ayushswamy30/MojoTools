import 'server-only'

type Level = 'info' | 'warn' | 'error'

/** Minimal structured logger (RULES §4: no console.log in app code). Swap for Sentry in T1.10. */
function log(level: Level, message: string, context?: Record<string, unknown>) {
  const line = JSON.stringify({ level, message, ...context, at: new Date().toISOString() })
  // eslint-disable-next-line no-console
  ;(level === 'error' ? console.error : level === 'warn' ? console.warn : console.info)(line)
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => log('info', message, context),
  warn: (message: string, context?: Record<string, unknown>) => log('warn', message, context),
  error: (message: string, context?: Record<string, unknown>) => log('error', message, context),
}
