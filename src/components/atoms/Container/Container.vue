<script setup lang="ts">
import { computed } from 'vue'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

interface Props {
  /** Maximum width of the container. @default 'xl' */
  size?:    ContainerSize
  /** Apply horizontal padding. @default true */
  padded?:  boolean
  /** Center the container horizontally. @default true */
  centered?: boolean
  /** HTML element to render as. @default 'div' */
  as?:      string
}

const props = withDefaults(defineProps<Props>(), {
  size:     'xl',
  padded:   true,
  centered: true,
  as:       'div',
})

const maxWidthMap: Record<ContainerSize, string> = {
  sm:   '640px',
  md:   '768px',
  lg:   '1024px',
  xl:   '1280px',
  '2xl':'1536px',
  full: '100%',
}

const style = computed(() => ({
  width:        '100%',
  maxWidth:     maxWidthMap[props.size],
  marginLeft:   props.centered ? 'auto' : undefined,
  marginRight:  props.centered ? 'auto' : undefined,
  paddingLeft:  props.padded   ? 'var(--space-4)' : undefined,
  paddingRight: props.padded   ? 'var(--space-4)' : undefined,
}))
</script>

<template>
  <component :is="as" :style="style">
    <slot />
  </component>
</template>
