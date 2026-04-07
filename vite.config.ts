/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    vue(),
    ...(command === 'build' ? [
      dts({
        tsconfigPath: './tsconfig.app.json',
        include:      ['src'],
        exclude:      ['src/**/*.stories.ts', 'src/**/*.test.ts', 'src/test/**', 'src/main.ts'],
        outDir:       'dist',
        rollupTypes:  false,   // per-entry types — don't roll everything into one file
        insertTypesEntry: true,
        entryRoot:    'src',
      }),
    ] : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },

  // ── Library build (vite build) ─────────────────────────────
  ...(command === 'build' ? {
    build: {
      lib: {
        // Multiple entry points — one per category + full index
        entry: {
          index:     path.resolve(dirname, 'src/index.ts'),
          atoms:     path.resolve(dirname, 'src/components/atoms/index.ts'),
          molecules: path.resolve(dirname, 'src/components/molecules/index.ts'),
          organisms: path.resolve(dirname, 'src/components/organisms/index.ts'),
          tokens:    path.resolve(dirname, 'src/tokens/index.ts'),
        },
        formats:  ['es', 'cjs'],
        fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
      rollupOptions: {
        // Peer dependencies — consuming app must provide these
        external: ['vue', 'vue-i18n', '@remixicon/vue'],
        output: {
          globals: {
            'vue':            'Vue',
            'vue-i18n':       'VueI18n',
            '@remixicon/vue': 'RemixiconVue',
          },
          // Preserve CSS alongside the JS bundle
          assetFileNames: (assetInfo) =>
            assetInfo.names?.[0]?.endsWith('.css') ? 'style.css' : assetInfo.names?.[0] ?? 'asset',
        },
      },
      // Minify for production
      minify: 'esbuild',
      // Source maps for debugging
      sourcemap: true,
    },
  } : {}),

  test: {
    projects: [
      // ── Unit tests (happy-dom, fast) ──────────────────────────
      {
        extends: true,
        test: {
          name:        'unit',
          include:     ['src/**/*.test.ts'],
          environment: 'happy-dom',
          globals:     true,
          setupFiles:  ['./src/test/setup.ts'],
          coverage: {
            provider:  'v8',
            reporter:  ['text', 'lcov', 'html'],
            all:       true,
            thresholds: {
              statements: 90,
              branches:   85,
              functions:  90,
              lines:      90,
            },
            include: ['src/components/**/*.vue', 'src/composables/**/*.ts'],
            exclude: ['src/**/*.stories.ts', 'src/test/**', 'src/**/index.ts'],
          },
        },
      },
      // ── Storybook interaction tests (Playwright, browser) ─────
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
}))
