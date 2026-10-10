import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const pages = [
  '/',
  '/about',
  '/products',
  '/awards',
  '/distributorship',
  '/distributorship/brand-a',
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

test('main menu: no Home link, About · Products · Distributorship · Awards · Contact, logo goes home', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'desktop navigation')
  await page.goto('/distributorship')
  const nav = page.getByRole('navigation', { name: 'Main' })
  await expect(nav.getByRole('link')).toHaveText([
    'About',
    'Products',
    'Distributorship',
    'Awards',
    'Contact',
  ])
  await page
    .getByRole('banner')
    .getByRole('link', { name: /Mojo Tools, home/ })
    .click()
  await expect(page).toHaveURL(/\/$/)
})

test('products page lists categories with enquiry links', async ({ page }) => {
  await page.goto('/products')
  await expect(page.getByRole('heading', { level: 2, name: 'Power Tools' })).toBeVisible()
  await page.getByRole('link', { name: 'Enquire about Power Tools' }).click()
  await expect(page).toHaveURL(/\/quote\?type=quote&category=power-tools$/)
  await expect(page.getByLabel(/^Category/)).toHaveValue('power-tools')
})

test('old /brands links redirect to Distributorship', async ({ page }) => {
  await page.goto('/brands/brand-a')
  await expect(page).toHaveURL(/\/distributorship\/brand-a$/)
  await expect(page.getByText('Official distributor').first()).toBeVisible()
})

test('mobile menu opens from the left', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile navigation')
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Menu' })
  const box = await trigger.boundingBox()
  expect(box!.x).toBeLessThan(60)
  await trigger.click()
  const drawer = page.getByRole('dialog', { name: 'Menu' })
  await expect(drawer).toBeVisible()
  expect((await drawer.boundingBox())!.x).toBe(0)
  await expect(drawer.getByRole('link', { name: 'Distributorship' })).toBeVisible()
})
