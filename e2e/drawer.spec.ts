import { test, expect } from '@playwright/test'

test.describe('Drawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=molecules-drawer--default&viewMode=story')
    await page.waitForLoadState('domcontentloaded')
  })

  test('opens drawer on trigger click', async ({ page }) => {
    const trigger = page.getByRole('button').first()
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
  })

  test('closes drawer on Escape', async ({ page }) => {
    const trigger = page.getByRole('button').first()
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
  })

  test('closes drawer on overlay click', async ({ page }) => {
    const trigger = page.getByRole('button').first()
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // Click overlay area
    await page.mouse.click(10, 10)
    await expect(dialog).not.toBeVisible()
  })
})
