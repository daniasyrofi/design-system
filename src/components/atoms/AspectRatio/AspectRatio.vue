<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Width-to-height ratio (e.g. 16/9, 4/3, 1). @default 16/9 */
  ratio?: number
  /** HTML element for the outer wrapper. @default 'div' */
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  ratio: 16 / 9,
  as:    'div',
})

const outerStyle = computed(() => ({
  position:    'relative' as const,
  width:       '100%',
  paddingTop:  `${(1 / props.ratio) * 100}%`,
  overflow:    'hidden',
}))
</script>

<template>
  <component :is="as" :style="outerStyle">
    <div style="position: absolute; inset: 0; width: 100%; height: 100%;">
      <slot />
    </div>
  </component>
</template>
