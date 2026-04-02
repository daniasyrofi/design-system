<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type StackDirection = 'vertical' | 'horizontal'
type StackAlign     = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type StackJustify   = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

interface Props {
  /** Stack direction (column vs row). @default 'vertical' */
  direction?:  StackDirection
  /** Gap between children in 4px units (e.g. 4 = 16px). Also accepts CSS strings like '1rem'. @default 4 */
  gap?:        number | string
  /** Cross-axis alignment. @default 'stretch' */
  align?:      StackAlign
  /** Main-axis justification. @default 'start' */
  justify?:    StackJustify
  /** Whether items wrap when they overflow. @default false */
  wrap?:       boolean
  /** HTML element to render as. @default 'div' */
  as?:         string
  /** Use inline-flex instead of flex. @default false */
  inline?:     boolean
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'vertical',
  gap:       4,
  align:     'stretch',
  justify:   'start',
  wrap:      false,
  as:        'div',
  inline:    false,
})

const alignMap: Record<StackAlign, string> = {
  start:    'items-start',
  center:   'items-center',
  end:      'items-end',
  stretch:  'items-stretch',
  baseline: 'items-baseline',
}

const justifyMap: Record<StackJustify, string> = {
  start:   'justify-start',
  center:  'justify-center',
  end:     'justify-end',
  between: 'justify-between',
  around:  'justify-around',
  evenly:  'justify-evenly',
}

const gapStyle = computed(() => {
  const g = props.gap
  if (typeof g === 'number') return `${g * 4}px`
  return g
})

const classes = computed(() =>
  cn(
    props.inline ? 'inline-flex' : 'flex',
    props.direction === 'horizontal' ? 'flex-row' : 'flex-col',
    alignMap[props.align],
    justifyMap[props.justify],
    props.wrap && 'flex-wrap',
  )
)
</script>

<template>
  <component
    :is="as"
    :class="classes"
    :style="{ gap: gapStyle }"
  >
    <slot />
  </component>
</template>
