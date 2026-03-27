<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables/useTheme'
import { RiSunLine, RiMoonLine } from '@remixicon/vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const { theme, toggle } = useTheme()

const sizeClasses: Record<string, string> = {
  sm: 'h-7 w-7',
  md: 'h-8 w-8',
  lg: 'h-9 w-9',
}

const iconSize: Record<string, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}
</script>

<template>
  <button
    type="button"
    :class="cn(
      'inline-flex items-center justify-center rounded-full',
      'ring-1 ring-inset ring-[--color-border]/60 bg-[--color-surface]',
      'text-[--color-text-secondary] hover:text-[--color-text-primary]',
      'hover:bg-[--color-neutral-light]/50 hover:shadow-[--shadow-md]',
      'shadow-[--shadow-sm]',
      'transition-all duration-[--duration-normal] ease-[--ease-default]',
      'cursor-pointer',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
      sizeClasses[props.size],
    )"
    :aria-label="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
    @click="toggle"
  >
    <Transition name="theme-icon" mode="out-in">
      <RiSunLine v-if="theme === 'light'" :key="'sun'" :size="String(iconSize[props.size])" />
      <RiMoonLine v-else :key="'moon'" :size="String(iconSize[props.size])" />
    </Transition>
  </button>
</template>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all var(--duration-normal) var(--ease-default);
}
.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}
</style>
