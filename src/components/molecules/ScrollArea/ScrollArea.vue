<script setup lang="ts">
type ScrollDirection = 'vertical' | 'horizontal' | 'both'

interface Props {
  /** Maximum height of the scroll area. @default 'auto' */
  maxHeight?: string
  /** Maximum width of the scroll area. */
  maxWidth?:  string
  /** Which axes are scrollable. @default 'vertical' */
  direction?: ScrollDirection
}

withDefaults(defineProps<Props>(), {
  maxHeight: 'auto',
  direction: 'vertical',
})

const overflowMap: Record<ScrollDirection, { overflowX: string; overflowY: string }> = {
  vertical:   { overflowX: 'hidden',  overflowY: 'auto' },
  horizontal: { overflowX: 'auto',    overflowY: 'hidden' },
  both:       { overflowX: 'auto',    overflowY: 'auto' },
}
</script>

<template>
  <div
    class="ds-scroll-area"
    :style="{
      maxHeight,
      ...(maxWidth ? { maxWidth } : {}),
      ...overflowMap[direction],
    } as Record<string, string>"
  >
    <slot />
  </div>
</template>

<style scoped>
.ds-scroll-area {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border-strong) transparent;
}
.ds-scroll-area::-webkit-scrollbar {
  width:  6px;
  height: 6px;
}
.ds-scroll-area::-webkit-scrollbar-track {
  background:    transparent;
  border-radius: var(--radius-full);
}
.ds-scroll-area::-webkit-scrollbar-thumb {
  background:    var(--color-border-strong);
  border-radius: var(--radius-full);
}
.ds-scroll-area::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-tertiary);
}
</style>
