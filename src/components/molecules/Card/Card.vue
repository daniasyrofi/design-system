<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'outlined' | 'elevated' | 'flat' | 'glass'
type Padding  = 'none' | 'sm' | 'md' | 'lg'
type Radius   = 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  variant?:   Variant
  padding?:   Padding
  radius?:    Radius
  hoverable?: boolean
  clickable?: boolean
  as?:        string
}

const props = withDefaults(defineProps<Props>(), {
  variant:   'default',
  padding:   'md',
  radius:    'lg',
  hoverable: false,
  clickable: false,
  as:        'div',
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()

const variantClasses: Record<Variant, string> = {
  default:  'bg-[--color-surface] shadow-[--shadow-md] ring-1 ring-inset ring-[--color-border]/60 [border-top-color:oklch(1_0_0/0.85)]',
  outlined: 'bg-[--color-surface] ring-1 ring-inset ring-[--color-border]/60',
  elevated: 'bg-[--color-surface] shadow-[--shadow-2xl] ring-1 ring-inset ring-[--color-border]/60 [border-top-color:oklch(1_0_0/0.85)]',
  flat:     'bg-[--color-surface]',
  glass:    'ring-1 ring-inset ring-[--glass-border] shadow-[--shadow-xl] [background:var(--color-surface-glass)] [backdrop-filter:var(--glass-blur)]',
}

const paddingClasses: Record<Padding, string> = {
  none: '',
  sm:   'p-3',
  md:   'p-5',
  lg:   'p-7',
}

const radiusClasses: Record<Radius, string> = {
  sm: 'rounded-[--radius-md]',
  md: 'rounded-[--radius-lg]',
  lg: 'rounded-[--radius-xl]',
  xl: 'rounded-[--radius-2xl]',
}

const bodyPaddingClasses: Record<Padding, string> = {
  none: '',
  sm:   'px-3 py-2',
  md:   'px-5 py-3',
  lg:   'px-7 py-4',
}

const classes = computed(() =>
  cn(
    'relative overflow-hidden flex flex-col',
    'transition-all duration-[--duration-slow] ease-[--ease-out]',
    variantClasses[props.variant],
    props.variant === 'glass' && '[background:var(--color-surface-glass)] [backdrop-filter:var(--glass-blur)]',
    radiusClasses[props.radius],
    !hasStructuredSlots.value && paddingClasses[props.padding],
    props.hoverable && 'hover:shadow-[--shadow-xl] hover:-translate-y-1.5 cursor-default',
    props.clickable && [
      'cursor-pointer',
      'hover:shadow-[--shadow-xl] hover:-translate-y-1.5',
      'active:scale-[0.99] active:translate-y-0',
      'focus-visible:outline-none focus-visible:shadow-[--ring-primary]',
    ],
  )
)

// Detect if structured slots are in use so we can adjust padding
const slots = defineSlots<{
  media?: () => unknown
  header?: () => unknown
  default?: () => unknown
  footer?: () => unknown
}>()

const hasStructuredSlots = computed(() =>
  !!(slots.media || slots.header || slots.footer)
)
</script>

<template>
  <component
    :is="as"
    :class="classes"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    v-bind="$attrs"
    @click="clickable && emit('click', $event)"
    @keydown.enter="clickable && emit('click', $event as unknown as MouseEvent)"
    @keydown.space.prevent="clickable && emit('click', $event as unknown as MouseEvent)"
  >
    <!-- Media slot — top image / cover area -->
    <div
      v-if="$slots.media"
      class="w-full overflow-hidden"
      :class="radiusClasses[radius]"
      style="border-bottom-left-radius: 0; border-bottom-right-radius: 0;"
    >
      <slot name="media" />
    </div>

    <!-- Header slot -->
    <div
      v-if="$slots.header"
      :class="cn(
        'flex items-start justify-between gap-3',
        bodyPaddingClasses[padding],
        $slots.default || $slots.footer ? 'pb-0' : '',
        !$slots.media ? 'pt-' + (padding === 'sm' ? '3' : padding === 'md' ? '5' : padding === 'lg' ? '7' : '0') : '',
      )"
    >
      <slot name="header" />
    </div>

    <!-- Default / body slot -->
    <div
      v-if="$slots.default"
      :class="cn(
        'flex-1',
        hasStructuredSlots && bodyPaddingClasses[padding],
      )"
    >
      <slot />
    </div>

    <!-- Footer slot -->
    <div
      v-if="$slots.footer"
      :class="cn(
        'flex items-center gap-2',
        bodyPaddingClasses[padding],
        $slots.default ? 'pt-0' : '',
      )"
    >
      <slot name="footer" />
    </div>
  </component>
</template>
