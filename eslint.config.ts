import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  // Base JS rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // Vue 3 rules
  ...pluginVue.configs['flat/recommended'],

  // Prettier disables formatting rules that conflict
  prettierConfig,

  {
    files: ['src/**/*.{ts,vue}'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // ── TypeScript ─────────────────────────────────────────────
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // ── Vue ─────────────────────────────────────────────────────
      'vue/multi-word-component-names': 'off',          // DS components can be single-word
      'vue/require-default-prop': 'off',                // withDefaults handles this
      'vue/no-v-html': 'warn',                          // warn not error — some components may need it
      'vue/component-api-style': ['error', ['script-setup']], // enforce <script setup>
      'vue/define-macros-order': ['error', {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
      }],
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
    },
  },

  // Test files — relax some rules
  {
    files: ['src/**/*.test.ts', 'src/test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // Stories — relax component-api-style (some stories use options API render fns)
  {
    files: ['src/**/*.stories.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Ignore build output and config files
  {
    ignores: ['dist/**', 'storybook-static/**', '*.config.{js,ts}', 'src/main.ts'],
  },
)
