<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type KbdSize = 'sm' | 'md' | 'lg'

interface Props {
  /** Visual size of the keyboard key. @default 'md' */
  size?: KbdSize
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const sizeClasses: Record<KbdSize, string> = {
  sm: 'text-[10px] leading-none px-1 py-0.5 rounded-[var(--radius-xs)] min-h-4',
  md: 'text-[11px] leading-none px-1.5 py-0.5 rounded-[var(--radius-sm)] min-h-5',
  lg: 'text-xs leading-none px-2 py-1 rounded-[var(--radius-sm)] min-h-6',
}

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center font-mono font-medium select-none whitespace-nowrap',
    sizeClasses[props.size],
  )
)
</script>

<template>
  <kbd
    :class="classes"
    :style="{
      backgroundColor: 'var(--color-neutral-light)',
      color:           'var(--color-text-primary)',
      border:          '1px solid var(--color-border-strong)',
      boxShadow:       '0 1px 0 var(--color-border-strong)',
    }"
  >
    <slot />
  </kbd>
</template>
