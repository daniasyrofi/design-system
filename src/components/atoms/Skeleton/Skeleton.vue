<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded'

interface Props {
  /** Shape of the skeleton. @default 'text' */
  variant?: SkeletonVariant
  /** CSS width value (e.g. '100%', '120px'). */
  width?: string
  /** CSS height value (e.g. '1rem', '48px'). */
  height?: string
  /** For variant='text': number of stacked lines to render. @default 1 */
  lines?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  lines: 1,
})

const radiusMap: Record<SkeletonVariant, string> = {
  text: 'var(--radius-sm)',
  rounded: 'var(--radius-md)',
  rectangular: '0px',
  circular: 'var(--radius-full)',
}

const lineStyle = computed(() => ({
  width: props.width ?? '100%',
  height: props.height ?? '1em',
  borderRadius: radiusMap[props.variant],
  display: 'block',
}))

const singleStyle = computed(() => ({
  width: props.width ?? '100%',
  height: props.height ?? (props.variant === 'circular' ? '40px' : '1em'),
  borderRadius: radiusMap[props.variant],
  display: 'block',
}))
</script>

<template>
  <!-- Multi-line text skeleton -->
  <span
    v-if="variant === 'text' && lines > 1"
    :style="{ display: 'flex', flexDirection: 'column', gap: '0.5em', width: width ?? '100%' }"
    role="status"
    aria-busy="true"
    aria-label="Loading"
  >
    <span
      v-for="i in lines"
      :key="i"
      :class="cn('ds-skel')"
      :style="[lineStyle, i === lines && lines > 1 ? { width: '72%' } : {}]"
    />
  </span>

  <!-- Single skeleton -->
  <span
    v-else
    :class="cn('ds-skel')"
    :style="singleStyle"
    role="status"
    aria-busy="true"
    aria-label="Loading"
  />
</template>
