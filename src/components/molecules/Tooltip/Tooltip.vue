<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { cn } from '@/lib/utils'

type Placement = 'top' | 'bottom' | 'left' | 'right'
type Trigger = 'hover' | 'click' | 'focus'

interface Props {
  /** Text content of the tooltip. Overridden by the 'content' slot. */
  content?: string
  /** Preferred placement of the tooltip relative to its trigger. @default 'top' */
  placement?: Placement
  /** Interaction that triggers the tooltip to appear. @default 'hover' */
  trigger?: Trigger
  /** Delay in ms before the tooltip appears on hover. @default 200 */
  delay?: number
  /** Maximum CSS width before text wraps. @default '200px' */
  maxWidth?: string
  /** Shows a directional arrow pointing to the trigger. @default true */
  arrow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
  trigger: 'hover',
  delay: 200,
  maxWidth: '200px',
  arrow: true,
})

const isVisible = ref(false)
let showTimeout: ReturnType<typeof setTimeout> | null = null
let hideTimeout: ReturnType<typeof setTimeout> | null = null

function show() {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  showTimeout = setTimeout(() => {
    isVisible.value = true
  }, props.delay)
}

function hide() {
  if (showTimeout) {
    clearTimeout(showTimeout)
    showTimeout = null
  }
  hideTimeout = setTimeout(() => {
    isVisible.value = false
  }, 100)
}

function toggle() {
  isVisible.value ? hide() : show()
}

function handleClickOutside(e: MouseEvent) {
  const el = e.target as HTMLElement
  if (!el.closest('[data-tooltip-root]')) {
    isVisible.value = false
  }
}

function addClickOutside() {
  if (props.trigger === 'click') {
    document.addEventListener('click', handleClickOutside, true)
  }
}

function removeClickOutside() {
  document.removeEventListener('click', handleClickOutside, true)
}

onBeforeUnmount(() => {
  if (showTimeout) clearTimeout(showTimeout)
  if (hideTimeout) clearTimeout(hideTimeout)
  removeClickOutside()
})

// ── Placement classes ────────────────────────────────────────────────────────

const placementClasses: Record<Placement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const arrowClasses: Record<Placement, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-[--color-neutral] border-x-transparent border-b-transparent border-4',
  bottom:
    'bottom-full left-1/2 -translate-x-1/2 border-b-[--color-neutral] border-x-transparent border-t-transparent border-4',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-[--color-neutral] border-y-transparent border-r-transparent border-4',
  right:
    'right-full top-1/2 -translate-y-1/2 border-r-[--color-neutral] border-y-transparent border-l-transparent border-4',
}

const tooltipClasses = computed(() =>
  cn(
    'ds-tooltip absolute z-50 px-2.5 py-1.5',
    'text-xs leading-snug font-medium text-[--color-text-inverse]',
    'bg-[--color-neutral] rounded-[--radius-md]',
    'pointer-events-none select-none whitespace-normal',
    placementClasses[props.placement]
  )
)

// ── Event bindings based on trigger ──────────────────────────────────────────

const triggerEvents = computed(() => {
  if (props.trigger === 'hover') {
    return { onMouseenter: show, onMouseleave: hide }
  }
  if (props.trigger === 'focus') {
    return { onFocusin: show, onFocusout: hide }
  }
  return { onClick: toggle }
})
</script>

<template>
  <div
    class="relative inline-flex"
    data-tooltip-root
    :data-state="isVisible ? 'open' : 'closed'"
    v-bind="triggerEvents"
    @vue:mounted="addClickOutside"
    @vue:beforeUnmount="removeClickOutside"
  >
    <!-- Trigger -->
    <slot />

    <!-- Tooltip -->
    <Transition
      enter-active-class="transition duration-[--duration-fast] ease-[--ease-default]"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-[--duration-fast] ease-[--ease-default]"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isVisible && (content || $slots.content)"
        :class="tooltipClasses"
        :style="{ maxWidth }"
        role="tooltip"
      >
        <slot name="content">
          {{ content }}
        </slot>

        <!-- Arrow -->
        <span
          v-if="arrow"
          :class="cn('absolute w-0 h-0', arrowClasses[placement])"
          aria-hidden="true"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ds-tooltip {
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}
</style>
