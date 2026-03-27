<script setup lang="ts">
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  size?: Size
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})
</script>

<template>
  <div
    :class="cn(
      'ds-input-group',
      'flex items-stretch w-full',
    )"
  >
    <slot />
  </div>
</template>

<style scoped>
.ds-input-group {
  /* First child: round left corners only */
}

.ds-input-group > :deep(:first-child),
.ds-input-group > :deep(:first-child .ds-input-wrapper) {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.ds-input-group > :deep(:first-child .ds-input-wrapper) {
  border-right: none !important;
}

/* Last child: round right corners only, never shrink */
.ds-input-group > :deep(:last-child),
.ds-input-group > :deep(:last-child .ds-btn) {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.ds-input-group > :deep(:last-child) {
  flex-shrink: 0;
  white-space: nowrap;
}

/* Middle children: no rounding */
.ds-input-group > :deep(:not(:first-child):not(:last-child)),
.ds-input-group > :deep(:not(:first-child):not(:last-child) .ds-input-wrapper),
.ds-input-group > :deep(:not(:first-child):not(:last-child) .ds-btn) {
  border-radius: 0 !important;
}
</style>
