import { describe, expect, it } from 'vitest'
import { attributionFrom, parseAttribution } from './attribution'

describe('attribution', () => {
  it('reads UTM tags and external referrers', () => {
    const url = new URL(
      'https://mojotools.example/?utm_source=instore&utm_medium=qr&utm_campaign=launch',
    )
    expect(attributionFrom(url, 'https://www.google.com/search?q=x')).toEqual({
      utm_source: 'instore',
      utm_medium: 'qr',
      utm_campaign: 'launch',
      referrer: 'https://www.google.com',
    })
  })
  it('ignores internal referrers and empty visits', () => {
    expect(attributionFrom(new URL('https://a.example/about'), 'https://a.example/')).toBeNull()
  })
  it('parses the cookie defensively', () => {
    expect(
      parseAttribution(encodeURIComponent(JSON.stringify({ utm_source: 'x', evil: 1 }))),
    ).toEqual({ utm_source: 'x' })
    expect(parseAttribution('not-json')).toEqual({})
    expect(parseAttribution(undefined)).toEqual({})
  })
})
