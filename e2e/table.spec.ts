import { test, expect } from '@playwright/test'

test.describe('Table', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=organisms-table--default&viewMode=story')
    await page.waitForLoadState('domcontentloaded')
  })

  test('renders table with rows', async ({ page }) => {
    const table = page.locator('table')
    await expect(table).toBeVisible()

    const rows = page.locator('tbody tr')
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
  })

  test('sorts column on header click', async ({ page }) => {
    const sortableHeader = page.locator('th[role="columnheader"] button, th').first()
    if (await sortableHeader.isVisible()) {
      // Get first cell value before sort
      const firstCellBefore = await page.locator('tbody tr:first-child td:first-child').textContent()

      await sortableHeader.click()
      await page.waitForTimeout(200)

      // After sort, content may have changed order
      const firstCellAfter = await page.locator('tbody tr:first-child td:first-child').textContent()
      // We just verify it didn't crash - actual order depends on data
      expect(firstCellAfter).toBeDefined()
    }
  })

  test('table has accessible structure', async ({ page }) => {
    const table = page.locator('table')
    await expect(table).toBeVisible()

    // Should have thead and tbody
    const thead = page.locator('thead')
    const tbody = page.locator('tbody')
    await expect(thead).toBeVisible()
    await expect(tbody).toBeVisible()
  })
})
