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

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

const pixelSize = computed(() => sizeMap[props.size])

const iconComponent = computed<Component | null>(() => {
  const icons = RemixIcons as Record<string, Component>
  return icons[props.name] ?? null
})
</script>

<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :size="pixelSize"
    :color="color"
    :aria-hidden="!label || undefined"
    :aria-label="label"
    :role="label ? 'img' : undefined"
  />
  <span
    v-else
    :style="{ width: `${pixelSize}px`, height: `${pixelSize}px`, display: 'inline-block' }"
    :title="`Icon '${name}' not found`"
    aria-hidden="true"
  />
</template>
