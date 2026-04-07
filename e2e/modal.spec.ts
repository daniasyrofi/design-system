import { test, expect } from '@playwright/test'

test.describe('Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=molecules-modal--default&viewMode=story')
    await page.waitForLoadState('domcontentloaded')
  })

  test('opens modal on trigger click', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /open/i })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
  })

  test('closes modal on overlay click', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /open/i })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // Click overlay (outside dialog)
    await page.mouse.click(10, 10)
    await expect(dialog).not.toBeVisible()
  })

  test('closes modal on Escape key', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /open/i })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
  })

  test('traps focus within modal', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /open/i })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // Tab through focusable elements - focus should stay in modal
    await page.keyboard.press('Tab')
    const activeElement = await page.evaluate(() => document.activeElement?.closest('[role="dialog"]'))
    expect(activeElement).not.toBeNull()
  })
})
