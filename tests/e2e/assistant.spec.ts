import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Mojo Mitra (no AI key: preview mode)', () => {
  test('launcher opens a labelled chat panel; Esc closes it and returns focus', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page
      .getByRole('region', { name: 'Cookies on this site' })
      .getByRole('button', { name: 'Reject non-essential' })
      .click()
    const launcher = page.getByRole('button', { name: 'Ask Mojo Mitra' })
    await launcher.click()
    const panel = page.getByRole('dialog', { name: 'Mojo Mitra' })
    await expect(panel).toBeVisible()
    await expect(panel).toContainText("I'm not switched on in this preview yet")
    await expect(panel.getByRole('link', { name: 'Get a quote' })).toBeVisible()
    // WhatsApp button hides while the panel is open (the panel offers WhatsApp itself).
    await expect(page.getByRole('link', { name: /WhatsApp us/ })).toBeHidden()

    const results = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze()
    expect(
      results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical'),
    ).toEqual([])

    await page.keyboard.press('Escape')
    await expect(panel).toBeHidden()
    await expect(page.getByRole('button', { name: 'Ask Mojo Mitra' })).toBeFocused()
  })

  test('WhatsApp button is labelled and links to WhatsApp', async ({ page }) => {
    await page.goto('/')
    const wa = page.getByRole('link', { name: /WhatsApp us/ })
    await expect(wa).toHaveAttribute('href', /^https:\/\/wa\.me\//)
  })

  test('chat API reports when the assistant is not configured', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: { messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: 'hi' }] }] },
    })
    expect(response.status()).toBe(503)
  })
})

test('quote form accepts a pre-filled message from Mojo Mitra links', async ({ page }) => {
  await page.goto('/quote?type=quote&category=power-tools&message=20+angle+grinders', {
    waitUntil: 'networkidle',
  })
  await expect(page.getByLabel(/^Message/)).toHaveValue('20 angle grinders')
  await expect(page.getByLabel(/^Category/)).toHaveValue('power-tools')
})
