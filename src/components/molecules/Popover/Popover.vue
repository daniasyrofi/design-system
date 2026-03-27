<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, nextTick } from 'vue'
import { cn } from '@/lib/utils'

type Placement =
  | 'top' | 'bottom' | 'left' | 'right'
  | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
type Trigger = 'click' | 'hover' | 'manual'

interface Props {
  trigger?: Trigger
  placement?: Placement
  width?: 'auto' | string
  arrow?: boolean
  closeOnClickOutside?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  trigger:             'click',
  placement:           'bottom',
  width:               'auto',
  arrow:               true,
  closeOnClickOutside: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = ref(props.modelValue ?? false)
let showTimeout: ReturnType<typeof setTimeout> | null = null
let hideTimeout: ReturnType<typeof setTimeout> | null = null

// Sync with v-model for manual mode
watch(() => props.modelValue, (v) => {
  if (v !== undefined) isOpen.value = v
})

watch(isOpen, (v) => {
  emit('update:modelValue', v)
})

// ── Placement classes ─────────────────────────────────────────────────────

const placementClasses: Record<Placement, string> = {
  top:            'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom:         'top-full left-1/2 -translate-x-1/2 mt-2',
  left:           'right-full top-1/2 -translate-y-1/2 mr-2',
  right:          'left-full top-1/2 -translate-y-1/2 ml-2',
  'top-start':    'bottom-full left-0 mb-2',
  'top-end':      'bottom-full right-0 mb-2',
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end':   'top-full right-0 mt-2',
}

// ── Arrow classes ───────────────────────────────────────────────────────

function getArrowSide(p: Placement): 'top' | 'bottom' | 'left' | 'right' {
  if (p.startsWith('top'))    return 'top'
  if (p.startsWith('bottom')) return 'bottom'
  if (p.startsWith('left'))   return 'left'
  return 'right'
}

const arrowSideClasses: Record<string, string> = {
  top:    'top-full left-1/2 -translate-x-1/2 border-t-[--color-border] border-x-transparent border-b-transparent border-[6px]',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[--color-border] border-x-transparent border-t-transparent border-[6px]',
  left:   'left-full top-1/2 -translate-y-1/2 border-l-[--color-border] border-y-transparent border-r-transparent border-[6px]',
  right:  'right-full top-1/2 -translate-y-1/2 border-r-[--color-border] border-y-transparent border-l-transparent border-[6px]',
}

const arrowClasses = computed(() => arrowSideClasses[getArrowSide(props.placement)])

// ── Width style ─────────────────────────────────────────────────────────

const widthStyle = computed(() => {
  if (props.width === 'auto') return {}
  return { width: props.width }
})

// ── Open / Close ────────────────────────────────────────────────────────

function open() {
  isOpen.value = true
  nextTick(() => {
    if (props.closeOnClickOutside) {
      document.addEventListener('click', handleClickOutside, true)
    }
    document.addEventListener('keydown', handleKeydown, true)
  })
}

function close() {
  isOpen.value = false
  document.removeEventListener('click', handleClickOutside, true)
  document.removeEventListener('keydown', handleKeydown, true)
}

function toggle() {
  isOpen.value ? close() : open()
}

// ── Hover handling ──────────────────────────────────────────────────────

function handleMouseenter() {
  if (props.trigger !== 'hover') return
  if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null }
  showTimeout = setTimeout(() => open(), 150)
}

function handleMouseleave() {
  if (props.trigger !== 'hover') return
  if (showTimeout) { clearTimeout(showTimeout); showTimeout = null }
  hideTimeout = setTimeout(() => close(), 200)
}

// ── Click trigger ───────────────────────────────────────────────────────

function handleTriggerClick() {
  if (props.trigger !== 'click') return
  toggle()
}

// ── Click outside ───────────────────────────────────────────────────────

function handleClickOutside(e: MouseEvent) {
  const el = e.target as HTMLElement
  if (!el.closest('[data-popover-root]')) {
    close()
  }
}

// ── Escape ──────────────────────────────────────────────────────────────

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
  }
}

// ── Cleanup ─────────────────────────────────────────────────────────────

onBeforeUnmount(() => {
  if (showTimeout) clearTimeout(showTimeout)
  if (hideTimeout) clearTimeout(hideTimeout)
  document.removeEventListener('click', handleClickOutside, true)
  document.removeEventListener('keydown', handleKeydown, true)
})

// ── Computed classes ────────────────────────────────────────────────────

const popoverClasses = computed(() =>
  cn(
    'absolute z-50 p-4',
    'bg-[--color-surface] ring-1 ring-inset ring-[--color-border]/60',
    'rounded-[--radius-2xl] shadow-[--shadow-2xl]',
    placementClasses[props.placement],
  )
)
</script>

<template>
  <div
    class="relative inline-flex"
    data-popover-root
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <!-- Trigger -->
    <div @click="handleTriggerClick">
      <slot name="trigger" />
    </div>

    <!-- Popover content -->
    <Transition
      enter-active-class="transition duration-[--duration-fast] ease-[--ease-default]"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-[--duration-fast] ease-[--ease-default]"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :class="popoverClasses"
        :style="widthStyle"
        role="dialog"
      >
        <slot />

        <!-- Arrow -->
        <span
          v-if="arrow"
          :class="cn('absolute w-0 h-0', arrowClasses)"
          aria-hidden="true"
        />
      </div>
    </Transition>
  </div>
</template>
