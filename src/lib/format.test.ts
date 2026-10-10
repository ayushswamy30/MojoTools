import { describe, expect, it } from 'vitest'
import { formatDate, formatIndianPhone, formatInr, normaliseIndianMobile, telHref } from './format'

describe('formatInr', () => {
  it('formats paise with Indian grouping', () => {
    expect(formatInr(12345600)).toBe('₹1,23,456.00')
  })
  it('rejects non-integer paise', () => {
    expect(() => formatInr(10.5)).toThrow()
  })
})

describe('Indian mobile numbers', () => {
  it.each([
    ['9876543210', '9876543210'],
    ['+91 98765 43210', '9876543210'],
    ['098765-43210', '9876543210'],
    ['919876543210', '9876543210'],
  ])('normalises %s', (input, expected) => {
    expect(normaliseIndianMobile(input)).toBe(expected)
  })
  it.each(['12345', '5876543210', '98765432101'])('rejects %s', (input) => {
    expect(normaliseIndianMobile(input)).toBeNull()
  })
  it('formats for display and tel links', () => {
    expect(formatIndianPhone('9876543210')).toBe('+91 98765 43210')
    expect(telHref('+91 98765 43210')).toBe('tel:+919876543210')
  })
})

describe('formatDate', () => {
  it('uses India time and dd Mon yyyy', () => {
    expect(formatDate(new Date('2026-10-06T20:00:00Z'))).toBe('07 Oct 2026')
  })
})
