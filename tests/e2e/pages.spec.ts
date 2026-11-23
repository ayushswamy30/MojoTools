import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const pages = [
  '/',
  '/about',
  '/products',
  '/products?category=welding&product=mangalam-welding-electrodes',
  '/awards',
  '/distributorship',
  '/distributorship/dewalt',
  '/contact',
  '/quote',
  '/policies/terms',
  '/policies/privacy',
  '/policies/cookies',
  '/policies/refunds',
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

test('products page: Power Tools by default, strip switches category, product opens a detail box', async ({
  page,
}) => {
  await page.goto('/products')
  await expect(page.getByRole('heading', { level: 2, name: 'Power Tools' })).toBeVisible()
  const strip = page.getByRole('navigation', { name: 'Product categories' })
  await expect(strip.getByRole('link', { name: 'Power Tools' })).toHaveAttribute(
    'aria-current',
    'page',
  )

  await strip.getByRole('link', { name: 'Welding' }).click()
  await expect(page).toHaveURL(/\/products\?category=welding$/)
  await expect(page.getByRole('heading', { level: 2, name: 'Welding' })).toBeVisible()

  await page.getByRole('link', { name: /Mangalam Welding Electrodes/ }).click()
  const dialog = page.getByRole('dialog', { name: /Mangalam Welding Electrodes/ })
  await expect(dialog).toBeVisible()
  await expect(page).toHaveURL(/product=mangalam-welding-electrodes/)

  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(page).toHaveURL(/\/products\?category=welding$/)

  await page.getByRole('link', { name: /Mangalam Welding Electrodes/ }).click()
  await page.getByRole('dialog').getByRole('link', { name: 'Get a quote' }).click()
  await expect(page).toHaveURL(/\/quote\?type=quote&category=welding/)
  await expect(page.getByLabel(/^Category/)).toHaveValue('welding')
})

test('old /brands links redirect to Distributorship', async ({ page }) => {
  await page.goto('/brands/dewalt')
  await expect(page).toHaveURL(/\/distributorship\/dewalt$/)
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

test('footer: four trust points (no GST, no WhatsApp), WhatsApp in Help, all policy links', async ({
  page,
}) => {
  await page.goto('/')
  const footer = page.getByRole('contentinfo')
  const trust = footer.locator('ul').first().getByRole('listitem')
  await expect(trust).toHaveText([
    'Genuine brands',
    '5+ years of trust',
    'Bulk & trade quotes',
    'Expert product advice',
  ])
  await expect(trust.filter({ hasText: /GST|WhatsApp/ })).toHaveCount(0)
  const help = footer.getByRole('navigation', { name: 'Help' })
  await expect(help.getByRole('link', { name: /Chat on WhatsApp/ })).toHaveAttribute(
    'href',
    /^https:\/\/wa\.me\//,
  )
  await expect(help.getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', '/contact')
  const policies = footer.getByRole('navigation', { name: 'Policies' })
  await expect(policies.getByRole('link')).toHaveText([
    'Terms and conditions',
    'Privacy policy',
    'Cookie policy',
    'Refunds and returns',
    'Accessibility',
  ])
  await expect(policies.getByRole('button', { name: 'Cookie settings' })).toBeVisible()
})

test('no placeholder stats, awards or structured data are published', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('XX+')).toHaveCount(0)
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0)
  await page.goto('/awards')
  await expect(page.getByText('Our awards will appear here soon.')).toBeVisible()
})

test.describe('About milestones', () => {
  const titles = [
    'Incorporated',
    'First warehouse',
    'New brand partnerships',
    'Expanded B2B supply',
    'Going online',
  ]

  test('desktop: scrolling the track and clicking a year both change the milestone', async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile)
    await page.goto('/about')
    const years = page.getByRole('toolbar', { name: 'Choose a year' }).getByRole('button')
    await expect(years.first()).toHaveAttribute('aria-current', 'step')
    const box = await page.locator('section[aria-labelledby="story-title"]').boundingBox()
    // One screen per year: the section is a tall scroll track.
    expect(box!.height).toBeGreaterThan(titles.length * 700)
    await page.mouse.wheel(0, box!.y + 2.5 * 720)
    await expect(years.first()).not.toHaveAttribute('aria-current', 'step')
    await years.nth(2).click()
    await expect(years.nth(2)).toHaveAttribute('aria-current', 'step')
    await expect(page.getByRole('heading', { name: titles[2] })).toBeVisible()
    await expect(page.getByRole('heading', { name: titles[0] })).toBeHidden()
    await years.nth(2).press('End')
    await expect(years.last()).toBeFocused()
    await expect(page.getByRole('heading', { name: titles[4] })).toBeVisible()
  })

  test('reduced motion: no scroll track, years still switch', async ({ page, isMobile }) => {
    test.skip(isMobile)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/about')
    const box = await page.locator('section[aria-labelledby="story-title"]').boundingBox()
    expect(box!.height).toBeLessThan(900)
    const years = page.getByRole('toolbar', { name: 'Choose a year' }).getByRole('button')
    await years.nth(1).click()
    await expect(page.getByRole('heading', { name: titles[1] })).toBeVisible()
  })

  test('skip link jumps past the timeline', async ({ page, isMobile }) => {
    test.skip(isMobile)
    await page.goto('/about')
    await page.getByRole('link', { name: 'Skip the timeline' }).focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#after-story$/)
  })

  test('phone: every milestone is listed, no year buttons', async ({ page, isMobile }) => {
    test.skip(!isMobile)
    await page.goto('/about')
    for (const title of titles)
      await expect(page.getByRole('heading', { name: title })).toBeVisible()
    await expect(page.getByRole('toolbar', { name: 'Choose a year' })).toBeHidden()
  })
})
