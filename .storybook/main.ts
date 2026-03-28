import type { StorybookConfig } from '@storybook/vue3-vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    'storybook-dark-mode',
  ],
  framework: '@storybook/vue3-vite',
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite')
    const tailwindcss = (await import('@tailwindcss/vite')).default
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@': path.resolve(dirname, '../src'),
        },
      },
    })
  },
}
export default config
