import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run storybook -- --ci',
    port: 6006,
    reuseExistingServer: true,
    timeout: 120000,
  },
})
