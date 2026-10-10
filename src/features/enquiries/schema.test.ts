import { describe, expect, it } from 'vitest'
import { enquirySchema, validateAttachment } from './schema'

const valid = {
  type: 'quote',
  name: 'Asha Patel',
  mobile: '+91 98765 43210',
  email: '',
  company: '',
  gstin: '',
  brand: 'brand-a',
  category: '',
  message: 'Need 20 angle grinders',
  consent: 'on',
  sourcePage: '/quote',
}

describe('enquirySchema', () => {
  it('accepts a valid enquiry and normalises the mobile', () => {
    const result = enquirySchema.parse(valid)
    expect(result.mobile).toBe('9876543210')
    expect(result.email).toBeUndefined()
    expect(result.brand).toBe('brand-a')
  })

  it('explains how to fix each error', () => {
    const result = enquirySchema.safeParse({
      ...valid,
      name: '',
      mobile: '123',
      consent: undefined,
      message: '',
    })
    expect(result.success).toBe(false)
    const messages = result.error?.issues.map((issue) => issue.message) ?? []
    expect(messages).toContain('Enter your name')
    expect(messages).toContain('Enter a 10-digit mobile number, e.g. 98765 43210')
    expect(messages).toContain('Tick the box to agree to be contacted')
  })

  it('checks GSTIN shape and upper-cases it', () => {
    expect(enquirySchema.parse({ ...valid, gstin: '27abcde1234f1z5' }).gstin).toBe(
      '27ABCDE1234F1Z5',
    )
    expect(enquirySchema.safeParse({ ...valid, gstin: '27ABCDE' }).success).toBe(false)
  })

  it('rejects unknown brands and types', () => {
    expect(enquirySchema.safeParse({ ...valid, brand: 'not-a-brand' }).success).toBe(false)
    expect(enquirySchema.safeParse({ ...valid, type: 'spam' }).success).toBe(false)
  })
})

describe('validateAttachment', () => {
  it('allows listed types with matching extensions', () => {
    expect(validateAttachment(new File(['x'], 'list.pdf', { type: 'application/pdf' }))).toBeNull()
    expect(validateAttachment(null)).toBeNull()
  })
  it('rejects disguised or oversized files', () => {
    expect(
      validateAttachment(new File(['x'], 'list.exe', { type: 'application/pdf' })),
    ).not.toBeNull()
    expect(
      validateAttachment(new File(['<html>'], 'page.html', { type: 'text/html' })),
    ).not.toBeNull()
    const big = new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'big.pdf', {
      type: 'application/pdf',
    })
    expect(validateAttachment(big)).toMatch(/10 MB/)
  })
})
