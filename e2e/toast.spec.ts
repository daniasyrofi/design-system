import { test, expect } from '@playwright/test'

test.describe('Toast', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=molecules-toast--default&viewMode=story')
    await page.waitForLoadState('domcontentloaded')
  })

  test('displays toast notification', async ({ page }) => {
    // Click trigger button to show toast
    const trigger = page.getByRole('button').first()
    if (await trigger.isVisible()) {
      await trigger.click()
      // Toast should appear with role="status" or role="alert"
      const toast = page.locator('[role="status"], [role="alert"], [data-toast]')
      await expect(toast.first()).toBeVisible({ timeout: 5000 })
    }
  })

  test('toast auto-dismisses', async ({ page }) => {
    const trigger = page.getByRole('button').first()
    if (await trigger.isVisible()) {
      await trigger.click()
      const toast = page.locator('[role="status"], [role="alert"], [data-toast]')
      await expect(toast.first()).toBeVisible({ timeout: 5000 })

      // Wait for auto-dismiss (typically 3-5 seconds)
      await expect(toast.first()).not.toBeVisible({ timeout: 10000 })
    }
  })
})
