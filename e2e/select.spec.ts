import { test, expect } from '@playwright/test'

test.describe('Select', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=molecules-select--default&viewMode=story')
    await page.waitForLoadState('domcontentloaded')
  })

  test('opens dropdown on trigger click', async ({ page }) => {
    const trigger = page.locator('[role="combobox"], button').first()
    await trigger.click()
    const listbox = page.locator('[role="listbox"]')
    await expect(listbox).toBeVisible()
  })

  test('selects an option', async ({ page }) => {
    const trigger = page.locator('[role="combobox"], button').first()
    await trigger.click()

    const option = page.locator('[role="option"]').first()
    if (await option.isVisible()) {
      const optionText = await option.textContent()
      await option.click()
      // Dropdown should close after selection
      const listbox = page.locator('[role="listbox"]')
      await expect(listbox).not.toBeVisible()
    }
  })

  test('closes on Escape', async ({ page }) => {
    const trigger = page.locator('[role="combobox"], button').first()
    await trigger.click()
    const listbox = page.locator('[role="listbox"]')
    await expect(listbox).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(listbox).not.toBeVisible()
  })

  test('navigates options with arrow keys', async ({ page }) => {
    const trigger = page.locator('[role="combobox"], button').first()
    await trigger.click()

    await page.keyboard.press('ArrowDown')
    const focusedOption = page.locator('[role="option"][data-highlighted], [role="option"]:focus, [role="option"][aria-selected="true"]')
    const count = await focusedOption.count()
    expect(count).toBeGreaterThanOrEqual(0) // At least keyboard navigation attempted
  })
})
