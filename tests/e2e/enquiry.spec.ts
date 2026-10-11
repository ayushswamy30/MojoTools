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
    await page.getByLabel(/I agree that/).check()
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
    await page.getByLabel(/I agree that/).check()
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

test('cookie settings: consent can be changed later and withdrawn', async ({ page }) => {
  await page.goto('/policies/cookies')
  const banner = page.getByRole('region', { name: 'Cookies on this site' })
  await banner.getByRole('button', { name: 'Accept all' }).click()
  await expect(banner).toBeHidden()
  await page.getByRole('contentinfo').getByRole('button', { name: 'Cookie settings' }).click()
  const toggle = banner.getByRole('checkbox', { name: 'Analytics cookies' })
  await expect(toggle).toBeFocused()
  await expect(toggle).toBeChecked()
  await toggle.uncheck()
  await banner.getByRole('button', { name: 'Save choices' }).click()
  await expect(banner).toBeHidden()
  const consent = (await page.context().cookies()).find((c) => c.name === 'mt_consent')
  expect(consent?.value).toBe('essential')
})

test('campaign attribution is stored only after analytics consent', async ({ page }) => {
  await page.goto('/?utm_source=test&utm_medium=email')
  const names = async () => (await page.context().cookies()).map((c) => c.name)
  expect(await names()).not.toContain('mt_attr')
  await page
    .getByRole('region', { name: 'Cookies on this site' })
    .getByRole('button', { name: 'Accept all' })
    .click()
  await expect.poll(names).toContain('mt_attr')
})

test('newsletter needs its own consent tick', async ({ page }) => {
  await page.goto('/contact')
  await page
    .getByRole('region', { name: 'Cookies on this site' })
    .getByRole('button', { name: 'Reject non-essential' })
    .click()
  await page.getByLabel('Business email').fill('buyer@example.com')
  await page.getByRole('button', { name: 'Subscribe' }).click()
  await expect(page.getByText('Tick the box to agree to receive emails').first()).toBeVisible()
  await expect(page.getByLabel('Business email')).toHaveValue('buyer@example.com')
  await page.getByLabel(/I agree to receive occasional product news/).check()
  await page.getByRole('button', { name: 'Subscribe' }).click()
  await expect(page.getByRole('status')).toContainText("Thanks — you're subscribed.")
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
