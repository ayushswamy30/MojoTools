import { describe, expect, it } from 'vitest'
import { products, searchProducts } from './products'

const names = (query: string) => searchProducts(query).map((product) => product.name)

describe('searchProducts', () => {
  it('finds products by name, ignoring case and plurals', () => {
    expect(names('makita heat gun')).toEqual(['Makita Heat Gun'])
    expect(names('BALL VALVES')).toContain('Zoloto Ball Valve')
  })

  it('finds products by category and brand', () => {
    const welding = searchProducts('welding')
    expect(welding.some((product) => product.categorySlug === 'welding')).toBe(true)
    const electricals = searchProducts('electricals')
    expect(electricals.length).toBeGreaterThan(0)
    expect(electricals.every((product) => product.categorySlug === 'electricals')).toBe(true)
    expect(searchProducts('hikoki').every((product) => product.brandSlug === 'hikoki')).toBe(true)
  })

  it('finds one product by its item code in any format', () => {
    const product = products[0]!
    expect(searchProducts(product.sku)).toEqual([product])
    expect(searchProducts(product.sku.toLowerCase().replace(/-/g, ' '))).toEqual([product])
    expect(searchProducts(product.sku.replace(/^MT-/, ''))).toEqual([product])
  })

  it('matches model numbers without their punctuation', () => {
    expect(names('wd40')).toContain('WD-40 Multi-Use Spray')
  })

  it('puts the closest name first', () => {
    expect(names('hilti threaded rods')[0]).toBe('Hilti Threaded Rods')
  })

  it('returns nothing for empty, punctuation-only or unknown searches', () => {
    expect(searchProducts('')).toEqual([])
    expect(searchProducts('   ')).toEqual([])
    expect(searchProducts('<script>')).toEqual([])
    expect(searchProducts('zzzznotaproduct')).toEqual([])
  })
})
