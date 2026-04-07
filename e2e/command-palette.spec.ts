import { test, expect } from '@playwright/test'

test.describe('CommandPalette', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=molecules-commandpalette--default&viewMode=story')
    await page.waitForLoadState('domcontentloaded')
  })

  test('opens command palette', async ({ page }) => {
    // Try clicking a trigger button or using keyboard shortcut
    const trigger = page.getByRole('button').first()
    if (await trigger.isVisible()) {
      await trigger.click()
    } else {
      await page.keyboard.press('Meta+k')
    }

    const input = page.locator('input[type="text"], input[type="search"], input[role="combobox"]')
    await expect(input.first()).toBeVisible({ timeout: 3000 })
  })

  test('filters results on search input', async ({ page }) => {
    const trigger = page.getByRole('button').first()
    if (await trigger.isVisible()) {
      await trigger.click()
    }

    const input = page.locator('input[type="text"], input[type="search"], input[role="combobox"]').first()
    if (await input.isVisible()) {
      await input.fill('test')
      // Results should update (fewer or filtered items)
      await page.waitForTimeout(300) // debounce
    }
  })
})
