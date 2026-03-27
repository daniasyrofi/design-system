<script setup lang="ts">
import { ref, computed, onBeforeUnmount, nextTick } from 'vue'
import { cn } from '@/lib/utils'

type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface DropdownMenuItem {
  label: string
  icon?: any
  shortcut?: string
  disabled?: boolean
  separator?: boolean
  action?: () => void
}

interface Props {
  items: DropdownMenuItem[]
  placement?: Placement
  width?: 'auto' | 'trigger' | string
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom-start',
  width: 'auto',
})

const isOpen = ref(false)
const focusedIndex = ref(-1)
const triggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

// ── Placement classes ─────────────────────────────────────────────────────

const placementClasses: Record<Placement, string> = {
  'bottom-start': 'top-full left-0 mt-1',
  'bottom-end':   'top-full right-0 mt-1',
  'top-start':    'bottom-full left-0 mb-1',
  'top-end':      'bottom-full right-0 mb-1',
}

// ── Selectable items (skip separators and disabled) ─────────────────────

const selectableIndices = computed(() =>
  props.items.reduce<number[]>((acc, item, i) => {
    if (!item.separator && !item.disabled) acc.push(i)
    return acc
  }, [])
)

// ── Width style ─────────────────────────────────────────────────────────

const widthStyle = computed(() => {
  if (props.width === 'auto') return {}
  if (props.width === 'trigger') return {}
  return { width: props.width }
})

// ── Open / Close ────────────────────────────────────────────────────────

function toggle() {
  isOpen.value ? close() : open()
}

function open() {
  isOpen.value = true
  focusedIndex.value = -1
  nextTick(() => {
    document.addEventListener('click', handleClickOutside, true)
    document.addEventListener('keydown', handleKeydown, true)
  })
}

function close() {
  isOpen.value = false
  focusedIndex.value = -1
  document.removeEventListener('click', handleClickOutside, true)
  document.removeEventListener('keydown', handleKeydown, true)
}

function selectItem(item: DropdownMenuItem) {
  if (item.disabled || item.separator) return
  item.action?.()
  close()
}

// ── Click outside ───────────────────────────────────────────────────────

function handleClickOutside(e: MouseEvent) {
  const el = e.target as HTMLElement
  if (
    !triggerRef.value?.contains(el) &&
    !menuRef.value?.contains(el)
  ) {
    close()
  }
}

// ── Keyboard navigation ─────────────────────────────────────────────────

function handleKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return

  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const currentPos = selectableIndices.value.indexOf(focusedIndex.value)
    const nextPos = currentPos + 1
    if (nextPos < selectableIndices.value.length) {
      focusedIndex.value = selectableIndices.value[nextPos]
    } else {
      focusedIndex.value = selectableIndices.value[0]
    }
    return
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const currentPos = selectableIndices.value.indexOf(focusedIndex.value)
    const prevPos = currentPos - 1
    if (prevPos >= 0) {
      focusedIndex.value = selectableIndices.value[prevPos]
    } else {
      focusedIndex.value = selectableIndices.value[selectableIndices.value.length - 1]
    }
    return
  }

  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (focusedIndex.value >= 0) {
      selectItem(props.items[focusedIndex.value])
    }
  }
}

// ── Cleanup ─────────────────────────────────────────────────────────────

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside, true)
  document.removeEventListener('keydown', handleKeydown, true)
})

const menuClasses = computed(() =>
  cn(
    'absolute z-50 min-w-[10rem] py-1.5',
    'bg-[--color-surface] ring-1 ring-inset ring-[--color-border]/60',
    'rounded-[--radius-2xl] shadow-[--shadow-2xl]',
    'overflow-hidden',
    placementClasses[props.placement],
  )
)
</script>

<template>
  <div class="relative inline-flex">
    <!-- Trigger -->
    <div ref="triggerRef" @click="toggle">
      <slot name="trigger" />
    </div>

    <!-- Menu -->
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
        ref="menuRef"
        :class="menuClasses"
        :style="widthStyle"
        role="menu"
      >
        <template v-for="(item, index) in items" :key="index">
          <!-- Separator -->
          <div
            v-if="item.separator"
            class="my-1 h-px bg-[--color-border]"
            role="separator"
          />

          <!-- Menu item -->
          <button
            v-else
            type="button"
            role="menuitem"
            :disabled="item.disabled"
            :class="cn(
              'flex w-full items-center gap-2.5 px-2.5 py-2 text-sm text-left',
              'rounded-[--radius-md] mx-1',
              'text-[--color-text-primary]',
              'transition-colors duration-[--duration-fast]',
              item.disabled
                ? 'opacity-50 pointer-events-none cursor-default'
                : 'hover:bg-[--color-neutral-light] cursor-pointer',
              focusedIndex === index && !item.disabled && 'bg-[--color-neutral-light]',
            )"
            @click="selectItem(item)"
            @mouseenter="focusedIndex = index"
            @mouseleave="focusedIndex = -1"
          >
            <!-- Icon -->
            <component
              v-if="item.icon"
              :is="item.icon"
              :size="16"
              class="shrink-0 text-[--color-text-secondary]"
              aria-hidden="true"
            />

            <!-- Label -->
            <span class="flex-1">{{ item.label }}</span>

            <!-- Shortcut -->
            <span
              v-if="item.shortcut"
              class="ml-4 shrink-0 text-xs text-[--color-text-muted]"
            >
              {{ item.shortcut }}
            </span>
          </button>
        </template>
      </div>
    </Transition>
  </div>
</template>
