<script setup lang="ts">
type EmptyStateSize = 'sm' | 'md' | 'lg'

interface Props {
  /** Main heading text. */
  title?:       string
  /** Supporting description text. */
  description?: string
  /** Visual size. @default 'md' */
  size?:        EmptyStateSize
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})

const sizeMap: Record<EmptyStateSize, {
  iconSize: string
  titleClass: string
  descClass: string
  padding: string
  gap: string
}> = {
  sm: {
    iconSize:   '32px',
    titleClass: 'text-sm font-semibold',
    descClass:  'text-xs',
    padding:    '24px 16px',
    gap:        '8px',
  },
  md: {
    iconSize:   '48px',
    titleClass: 'text-base font-semibold',
    descClass:  'text-sm',
    padding:    '40px 24px',
    gap:        '12px',
  },
  lg: {
    iconSize:   '64px',
    titleClass: 'text-lg font-semibold',
    descClass:  'text-base',
    padding:    '56px 32px',
    gap:        '16px',
  },
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center text-center"
    :style="{ padding: sizeMap[size].padding, gap: sizeMap[size].gap }"
  >
    <!-- Icon slot -->
    <div
      v-if="$slots.icon"
      :style="{
        width:  sizeMap[size].iconSize,
        height: sizeMap[size].iconSize,
        color:  'var(--color-text-tertiary)',
        flexShrink: '0',
      }"
    >
      <slot name="icon" />
    </div>

    <!-- Text block -->
    <div class="flex flex-col gap-1 max-w-xs w-full">
      <p
        v-if="title"
        :class="sizeMap[size].titleClass"
        style="color: var(--color-text-primary);"
      >
        {{ title }}
      </p>
      <p
        v-if="description || $slots.description"
        :class="sizeMap[size].descClass"
        style="color: var(--color-text-secondary);"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <!-- Actions slot -->
    <div
      v-if="$slots.default"
      class="flex flex-wrap items-center justify-center gap-2 mt-1"
    >
      <slot />
    </div>
  </div>
</template>
