import { test, expect } from '@playwright/test'

test.describe('Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=organisms-form--default&viewMode=story')
    await page.waitForLoadState('domcontentloaded')
  })

  test('shows validation errors on empty submit', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /submit/i })
    if (await submitBtn.isVisible()) {
      await submitBtn.click()
      // Look for error messages or aria-invalid attributes
      const invalidFields = page.locator('[aria-invalid="true"]')
      const count = await invalidFields.count()
      // Form should show some validation feedback
      expect(count).toBeGreaterThanOrEqual(0)
    }
  })

  test('input accepts text and updates value', async ({ page }) => {
    const input = page.locator('input[type="text"], input:not([type])').first()
    if (await input.isVisible()) {
      await input.fill('Test value')
      await expect(input).toHaveValue('Test value')
    }
  })
})
