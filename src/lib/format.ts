const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
})

/** Money is integer paise end-to-end (RULES §4); format only at the edge. */
export function formatInr(paise: number): string {
  if (!Number.isInteger(paise)) throw new Error('formatInr expects integer paise')
  return inrFormatter.format(paise / 100)
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
})

/** `07 Oct 2026`, always in India time. */
export function formatDate(date: Date): string {
  return dateFormatter.format(date)
}

/** Indian mobile for display: `+91 98765 43210`. Accepts 10 digits with optional +91 / 0 prefix. */
export function formatIndianPhone(input: string): string {
  const digits = normaliseIndianMobile(input)
  if (!digits) return input
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
}

/** Returns the 10-digit mobile number, or null if it is not a valid Indian mobile. */
export function normaliseIndianMobile(input: string): string | null {
  const digits = input.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '')
  return /^[6-9]\d{9}$/.test(digits) ? digits : null
}

/** `tel:` href for a display or raw phone number. */
export function telHref(input: string): string {
  const digits = normaliseIndianMobile(input)
  return digits ? `tel:+91${digits}` : `tel:${input.replace(/[^\d+]/g, '')}`
}
