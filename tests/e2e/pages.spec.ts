import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const pages = [
  '/',
  '/about',
  '/brands',
  '/brands/brand-a',
  '/contact',
  '/quote',
  '/policies/terms',
  '/policies/privacy',
  '/policies/accessibility',
]

for (const path of pages) {
  test(`${path} renders with one h1 and passes axe (WCAG 2.2 AA)`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('main#main')).toBeVisible()
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    )
    expect(
      serious,
      JSON.stringify(
        serious.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
        null,
        2,
      ),
    ).toEqual([])
  })
}

test('unknown pages return the 404 page', async ({ page }) => {
  const response = await page.goto('/does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
})

test('/en URLs redirect to the clean URL', async ({ page }) => {
  await page.goto('/en/about')
  await expect(page).toHaveURL(/\/about$/)
})

test('skip link moves focus to main content', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium')
  await page.goto('/about')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to main content' })
  await expect(skip).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)
})

test('previews are not indexable', async ({ page, request }) => {
  await page.goto('/')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  const robots = await (await request.get('/robots.txt')).text()
  expect(robots).toContain('Disallow: /')
})
