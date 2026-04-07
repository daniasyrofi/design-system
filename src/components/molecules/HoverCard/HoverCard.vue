<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'

type HoverCardPlacement = 'top' | 'bottom' | 'left' | 'right'

interface Props {
  /** Which side the card opens on. @default 'bottom' */
  placement?: HoverCardPlacement
  /** Delay in ms before the card opens. @default 200 */
  openDelay?: number
  /** Delay in ms before the card closes. @default 100 */
  closeDelay?: number
  /** Width of the card. @default 'auto' */
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom',
  openDelay: 200,
  closeDelay: 100,
  width: 'auto',
})

const isOpen = ref(false)
let openTimer: ReturnType<typeof setTimeout> | null = null
let closeTimer: ReturnType<typeof setTimeout> | null = null

function open() {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  if (isOpen.value) return
  openTimer = setTimeout(() => {
    isOpen.value = true
  }, props.openDelay)
}

function close() {
  if (openTimer) {
    clearTimeout(openTimer)
    openTimer = null
  }
  closeTimer = setTimeout(() => {
    isOpen.value = false
  }, props.closeDelay)
}

const placementClasses: Record<HoverCardPlacement, string> = {
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const enterFromClass = computed(() => {
  const map: Record<HoverCardPlacement, string> = {
    bottom: 'opacity-0 translate-y-1',
    top: 'opacity-0 -translate-y-1',
    left: 'opacity-0 -translate-x-1',
    right: 'opacity-0 translate-x-1',
  }
  return map[props.placement]
})
</script>

<template>
  <div
    class="relative inline-block"
    :data-state="isOpen ? 'open' : 'closed'"
    @mouseenter="open"
    @mouseleave="close"
    @focusin="open"
    @focusout="close"
  >
    <!-- Trigger -->
    <slot name="trigger" :open="isOpen" />

    <!-- Card -->
    <Transition
      enter-active-class="transition duration-[--duration-normal] ease-[--ease-out]"
      :enter-from-class="`${enterFromClass} scale-[0.97]`"
      enter-to-class="opacity-100 translate-x-0 translate-y-0 scale-100"
      leave-active-class="transition duration-[--duration-fast] ease-[--ease-in]"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-[0.97]"
    >
      <div
        v-if="isOpen"
        :class="cn('ds-hover-card absolute z-50', placementClasses[placement])"
        :style="{ width }"
        role="tooltip"
        @mouseenter="open"
        @mouseleave="close"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ds-hover-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow:
    var(--shadow-lg),
    inset 0 0 0 1px var(--color-border-subtle);
  padding: var(--space-4);
  min-width: 200px;
}
</style>
