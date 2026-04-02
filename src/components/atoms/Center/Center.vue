<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  /** HTML element to render as. @default 'div' */
  as?:     string
  /** Use inline-flex instead of flex. @default false */
  inline?: boolean
  /** Also take full width. @default false */
  fill?:   boolean
}

const props = withDefaults(defineProps<Props>(), {
  as:     'div',
  inline: false,
  fill:   false,
})

const classes = computed(() =>
  cn(
    props.inline ? 'inline-flex' : 'flex',
    'items-center justify-center',
    props.fill && 'w-full h-full',
  )
)
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
