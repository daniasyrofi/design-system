<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'transparent' | 'colored'

interface Props {
  /** Brand or page title shown in the start slot. */
  title?: string
  /** Visual style variant of the navbar. @default 'default' */
  variant?: Variant
  /** Pins the navbar to the top of its scroll container. @default false */
  sticky?: boolean
  /** Shows a bottom border (only applies to the 'default' variant). @default true */
  border?: boolean
  /** Morphs the navbar into a floating pill shape when scrolled down. Requires sticky to be true. */
  floatingOnScroll?: boolean
  /** Optional container selector to observe for scrolling (defaults to window) */
  scrollTarget?: string
}

const props = withDefaults(defineProps<Props>(), {
  title:   '',
  variant: 'default',
  sticky:  false,
  border:  true,
  floatingOnScroll: false,
})

const isScrolled = ref(false)
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (props.floatingOnScroll) {
    observer = new IntersectionObserver(([entry]) => {
      // Sentinel goes out of view => we have scrolled down
      isScrolled.value = !entry.isIntersecting
    }, {
      root: props.scrollTarget ? document.querySelector(props.scrollTarget) : null,
      threshold: 1.0,
      rootMargin: '0px'
    })
    
    if (sentinel.value) {
      observer.observe(sentinel.value)
    }
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

const variantClasses: Record<Variant, string> = {
  default:     'bg-[--color-surface] text-[--color-text-primary]',
  transparent: 'bg-transparent text-[--color-text-primary]',
  colored:     'bg-[--color-neutral] text-[--color-text-inverse] shadow-[--shadow-highlight]',
}

const isFloating = computed(() => props.floatingOnScroll && isScrolled.value)

const classes = computed(() =>
  cn(
    'relative flex items-center justify-between transition-all duration-500 will-change-transform ease-[cubic-bezier(0.16,1,0.3,1)] mx-auto',
    isFloating.value
      ? 'w-full max-w-[700px] h-[64px] px-[24px] rounded-b-[16px] bg-[--color-surface] shadow-md border border-[--color-border]'
      ? 'w-full max-w-[700px] h-[64px] px-[24px] rounded-b-[16px] bg-[#FFFFFF] shadow-md border border-[#E5E7EB]'
      : cn(
          'w-full max-w-[700px] h-[64px] px-[24px] rounded-b-[16px]',
          variantClasses[props.variant],
          props.variant === 'default' && props.border && 'border-b border-[--color-border]'
        ),
    props.sticky && 'sticky top-0 z-[100]',
    props.sticky && props.variant === 'default' && !isFloating.value && 'ds-navbar--sticky-shadow'
  )
)
</script>

<template>
  <div v-if="floatingOnScroll && sticky" ref="sentinel" class="w-full h-[1px] mt-[-1px] opacity-0 pointer-events-none absolute top-0"></div>
  <header :class="classes" v-bind="$attrs">
    <!-- Start (left): logo / title -->
    <div class="flex items-center shrink-0">
      <slot name="start" :is-floating="isFloating">
        <span
          v-if="title"
          class="text-base font-semibold leading-none select-none"
        >
          {{ title }}
        </span>
      </slot>
    </div>

    <!-- Center: navigation links -->
    <div class="flex items-center justify-center">
      <slot name="center" :is-floating="isFloating" />
    </div>

    <!-- End (right): actions -->
    <div class="flex items-center shrink-0">
      <slot name="end" :is-floating="isFloating" />
    </div>
  </header>
</template>

<style scoped>
.ds-navbar--sticky-shadow {
  box-shadow: var(--shadow-md);
}
</style>
