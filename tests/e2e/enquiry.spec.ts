import { expect, test } from '@playwright/test'

test.describe('enquiry form (demo mode)', () => {
  // Each test loads with waitUntil 'networkidle' so the form is hydrated (focus handling is client-side).
  test('shows an error summary that links to each problem', async ({ page }) => {
    await page.goto('/quote', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Submit enquiry' }).click()
    const summary = page.getByRole('alert').filter({ hasText: 'There is a problem' })
    await expect(summary).toBeFocused()
    await expect(summary).toContainText('Enter your name')
    await expect(summary).toContainText('Enter a 10-digit mobile number')
    await expect(summary).toContainText('Tick the box to agree to be contacted')
    await expect(page.getByLabel(/Your name/)).toHaveAttribute('aria-invalid', 'true')
  })

  test('submits a valid enquiry and announces the enquiry number', async ({ page }) => {
    await page.goto('/quote?type=price_list&brand=brand-b', { waitUntil: 'networkidle' })
    await expect(page.getByLabel(/What do you need/)).toHaveValue('price_list')
    await expect(page.getByLabel(/^Brand/)).toHaveValue('brand-b')
    await page.getByLabel(/Your name/).fill('Asha Patel')
    await page.getByLabel(/Mobile number/).fill('98765 43210')
    await page.getByLabel(/^Message/).fill('Please send the latest price list.')
    await page.getByLabel(/I agree/).check()
    await page.getByRole('button', { name: 'Submit enquiry' }).click()
    const status = page.getByRole('status').filter({ hasText: 'Thank you, Asha Patel.' })
    await expect(status).toBeVisible()
    await expect(status).toContainText('DEMO-')
    await expect(status).toContainText('within 1 working day')
  })

  test('rejects a disallowed attachment type', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' })
    await page.getByLabel(/Your name/).fill('Asha Patel')
    await page.getByLabel(/Mobile number/).fill('9876543210')
    await page.getByLabel(/^Message/).fill('Quote for the attached list')
    await page.getByLabel(/I agree/).check()
    await page
      .getByLabel(/Attach a list/)
      .setInputFiles({ name: 'list.html', mimeType: 'text/html', buffer: Buffer.from('<p>x</p>') })
    await page.getByRole('button', { name: 'Submit enquiry' }).click()
    await expect(page.getByRole('alert').filter({ hasText: 'There is a problem' })).toContainText(
      'Attach a PDF, Excel, CSV or image file',
    )
  })
})

test('cookie banner: rejecting non-essential cookies hides it and keeps GA off', async ({
  page,
}) => {
  await page.goto('/')
  const banner = page.getByRole('region', { name: 'Cookies on this site' })
  await expect(banner).toBeVisible()
  await banner.getByRole('button', { name: 'Reject non-essential' }).click()
  await expect(banner).toBeHidden()
  expect(await page.locator('script#ga4').count()).toBe(0)
  await page.reload()
  await expect(page.getByRole('region', { name: 'Cookies on this site' })).toBeHidden()
})

test('hero carousel can be paused from the keyboard', async ({ page }) => {
  await page.goto('/')
  const pause = page.getByRole('button', { name: 'Pause slideshow' })
  await pause.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('button', { name: 'Play slideshow' })).toBeVisible()
  await page.getByRole('button', { name: 'Go to slide 2' }).click()
  await expect(page.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
    'aria-current',
    'true',
  )
})
