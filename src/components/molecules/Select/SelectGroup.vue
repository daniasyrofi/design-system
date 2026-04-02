<script setup lang="ts">
interface Props {
  /** Group header label displayed above the items. */
  label: string
}

defineProps<Props>()
</script>

<template>
  <div role="group" :aria-label="label">
    <div
      class="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider select-none"
      style="color: var(--color-text-tertiary);"
    >
      {{ label }}
    </div>
    <slot />
  </div>
</template>
