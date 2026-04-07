<script setup lang="ts">
import { computed, type Component } from 'vue'
import * as RemixIcons from '@remixicon/vue'

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  name: string
  size?: IconSize
  color?: string
  /** Accessible label. When provided, the icon is treated as informative (not decorative). */
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'currentColor',
})

const sizeMap: Record<IconSize, string> = {
  xs: 'var(--ds-icon-xs)',
  sm: 'var(--ds-icon-sm)',
  md: 'var(--ds-icon-md)',
  lg: 'var(--ds-icon-lg)',
  xl: 'var(--ds-icon-xl)',
}

const cssSize = computed(() => sizeMap[props.size])

const iconComponent = computed<Component | null>(() => {
  const icons = RemixIcons as Record<string, Component>
  return icons[props.name] ?? null
})
</script>

<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :style="{ width: cssSize, height: cssSize }"
    :color="color"
    :aria-hidden="!label || undefined"
    :aria-label="label"
    :role="label ? 'img' : undefined"
  />
  <span
    v-else
    :style="{ width: cssSize, height: cssSize, display: 'inline-block' }"
    :title="`Icon '${name}' not found`"
    aria-hidden="true"
  />
</template>
