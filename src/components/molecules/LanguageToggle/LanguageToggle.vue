<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { cn } from '@/lib/utils'

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const { locale } = useI18n()
const locales = ['id', 'en', 'zh'] as const

function setLocale(loc: string) {
  locale.value = loc
  localStorage.setItem('ds-locale', loc)
}

const wrapperSize: Record<string, string> = {
  sm: 'p-[3px] gap-0.5',
  md: 'p-[3px] gap-0.5',
  lg: 'p-1   gap-1',
}

const btnSize: Record<string, string> = {
  sm: 'h-6 px-2.5 text-[10px]',
  md: 'h-7 px-3   text-xs',
  lg: 'h-8 px-3.5 text-xs',
}
</script>

<template>
  <div
    :class="cn(
      'ds-lang-toggle',
      'inline-flex items-center',
      'rounded-full',
      wrapperSize[props.size],
    )"
    role="radiogroup"
    aria-label="Language"
  >
    <button
      v-for="loc in locales"
      :key="loc"
      type="button"
      role="radio"
      :aria-checked="locale === loc"
      :class="cn(
        'inline-flex items-center justify-center rounded-full',
        'font-semibold uppercase tracking-wider',
        'transition-all duration-[--duration-normal] ease-[--ease-out]',
        'cursor-pointer select-none',
        'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[--color-primary]',
        btnSize[props.size],
        locale === loc
          ? 'ds-lang-btn--active bg-[--color-surface] text-[--color-text-primary]'
          : 'text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-[--color-neutral-light]',
      )"
      @click="setLocale(loc)"
    >
      {{ loc }}
    </button>
  </div>
</template>

<style scoped>
.ds-lang-toggle {
  background-color: var(--color-neutral-light);
  box-shadow: var(--shadow-sm), inset 0 0 0 1px var(--color-border);
}
.ds-lang-btn--active {
  box-shadow: 0 1px 2px oklch(0.20 0 0 / 0.06), inset 0 0 0 1px var(--color-border);
}
</style>
