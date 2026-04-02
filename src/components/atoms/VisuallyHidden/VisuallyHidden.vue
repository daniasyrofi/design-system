<script setup lang="ts">
interface Props {
  /** When true the element is focusable but still hidden visually. @default false */
  focusable?: boolean
}

withDefaults(defineProps<Props>(), {
  focusable: false,
})
</script>

<template>
  <!--
    Visually hides content while keeping it accessible to screen readers.
    Use this instead of aria-label when you need to wrap arbitrary markup.
  -->
  <span
    :class="focusable ? 'focus:not-sr-only sr-only' : 'sr-only'"
  >
    <slot />
  </span>
</template>
