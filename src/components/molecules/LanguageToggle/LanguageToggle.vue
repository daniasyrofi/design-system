<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { cn } from '@/lib/utils'

interface Props {
  /**
   * Size of the language toggle buttons.
   * @default 'md'
   */
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
  sm: 'p-1 gap-0.5',
  md: 'p-1 gap-0.5',
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
    :class="
      cn('ds-lang-toggle', 'inline-flex items-center', 'rounded-full', wrapperSize[props.size])
    "
    role="radiogroup"
    aria-label="Language"
  >
    <button
      v-for="loc in locales"
      :key="loc"
      type="button"
      role="radio"
      :aria-checked="locale === loc"
      :class="
        cn(
          'ds-lang-btn inline-flex items-center justify-center rounded-full',
          'font-semibold uppercase tracking-wider',
          'cursor-pointer select-none',
          'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[--color-primary]',
          btnSize[props.size],
          locale === loc
            ? 'ds-lang-btn--active'
            : 'text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-[--color-neutral-light]'
        )
      "
      @click="setLocale(loc)"
    >
      {{ loc }}
    </button>
  </div>
</template>

<style scoped>
.ds-lang-toggle {
  background-color: var(--color-neutral-light);
  box-shadow:
    var(--shadow-sm),
    inset 0 0 0 1px var(--color-border);
  position: relative;
  isolation: isolate;
}
.ds-lang-btn--active {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  box-shadow:
    0 6px 12px -10px oklch(0.2 0 0 / 0.25),
    0 1px 2px oklch(0.2 0 0 / 0.1),
    inset 0 0 0 1px var(--color-border);
  animation: ds-lang-activate 220ms var(--ease-out);
}

.ds-lang-btn {
  position: relative;
  z-index: 1;
  will-change: background-color, color, box-shadow, filter;
  transition:
    background-color var(--duration-normal) var(--ease-out),
    color var(--duration-normal) var(--ease-out),
    box-shadow 220ms var(--ease-out),
    filter 220ms var(--ease-out);
}

.ds-lang-btn:hover {
  filter: saturate(1.03);
}

.ds-lang-btn:active {
  filter: brightness(0.98);
}

@keyframes ds-lang-activate {
  0% {
    box-shadow:
      0 0 0 0 oklch(0.2 0 0 / 0),
      inset 0 0 0 1px var(--color-border);
    filter: saturate(0.95);
  }
  100% {
    box-shadow:
      0 6px 12px -10px oklch(0.2 0 0 / 0.25),
      0 1px 2px oklch(0.2 0 0 / 0.1),
      inset 0 0 0 1px var(--color-border);
    filter: saturate(1);
  }
}
</style>
