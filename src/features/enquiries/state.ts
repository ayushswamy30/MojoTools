import type { FieldErrors } from './schema'

export type EnquiryState =
  | { status: 'idle' }
  | { status: 'invalid'; errors: FieldErrors; values: Record<string, string> }
  | {
      status: 'error'
      message: 'generic' | 'rateLimited' | 'captcha'
      values: Record<string, string>
    }
  | { status: 'success'; number: string; name: string; type: string; demo: boolean }

export const initialEnquiryState: EnquiryState = { status: 'idle' }

export type NewsletterState =
  | { status: 'idle' }
  | { status: 'invalid'; error: string }
  | { status: 'error' }
  | { status: 'success'; demo: boolean }
