<script setup lang="ts">
import { ref, computed, onBeforeUnmount, nextTick, type Component } from 'vue'
import { cn } from '@/lib/utils'

type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface DropdownMenuItem {
  /** Text label of the menu item. Required unless separator is true. */
  label?: string
  /** Component or icon element to render on the left. */
  icon?: Component | string
  /** Shortcut text displayed on the right. */
  shortcut?: string
  /** Disables the item. */
  disabled?: boolean
  /** Renders a divider instead of an item. */
  separator?: boolean
  /** Semantic context variant, e.g., 'danger' for destructive actions. */
  tone?: 'default' | 'danger'
  /** Callback fired when the item is selected. */
  action?: () => void
}

interface Props {
  /** Array of menu items or separators. */
  items: DropdownMenuItem[]
  /** Preferred position relative to the trigger. @default 'bottom-start' */
  placement?: Placement
  /** CSS width of the dropdown menu. @default 'auto' */
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
  'bottom-end': 'top-full right-0 mt-1',
  'top-start': 'bottom-full left-0 mb-1',
  'top-end': 'bottom-full right-0 mb-1',
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
  if (!triggerRef.value?.contains(el) && !menuRef.value?.contains(el)) {
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
  cn('ds-dropdown-menu absolute z-50 min-w-[10rem] p-1.5', placementClasses[props.placement])
)
</script>

<template>
  <div class="relative inline-flex" :data-state="isOpen ? 'open' : 'closed'">
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
      <div v-if="isOpen" ref="menuRef" :class="menuClasses" :style="widthStyle" role="menu">
        <template v-for="(item, index) in items" :key="index">
          <!-- Separator -->
          <div v-if="item.separator" class="ds-dropdown-separator my-1 mx-0.5" role="separator" />

          <!-- Menu item -->
          <button
            v-else
            type="button"
            role="menuitem"
            :disabled="item.disabled"
            :data-disabled="item.disabled ? '' : undefined"
            :class="
              cn(
                'ds-dropdown-item flex w-full items-center gap-2.5 px-2 py-2 text-sm text-left',
                'text-[--color-text-primary]',
                'transition-colors duration-[--duration-fast]',
                item.disabled ? 'opacity-50 pointer-events-none cursor-default' : 'cursor-pointer',
                item.tone === 'danger' && 'ds-dropdown-item--danger',
                focusedIndex === index && !item.disabled && 'ds-dropdown-item--active'
              )
            "
            @click="selectItem(item)"
            @mouseenter="focusedIndex = index"
            @mouseleave="focusedIndex = -1"
          >
            <!-- Icon -->
            <component
              v-if="item.icon"
              :is="item.icon"
              :size="16"
              :class="
                cn(
                  'ds-dropdown-icon shrink-0 leading-none text-[--color-text-secondary]',
                  item.tone === 'danger' && 'ds-dropdown-icon--danger'
                )
              "
              aria-hidden="true"
            />

            <!-- Label -->
            <span class="flex-1 min-w-0 truncate">{{ item.label }}</span>

            <!-- Shortcut -->
            <span
              v-if="item.shortcut"
              :class="
                cn(
                  'ds-dropdown-shortcut ml-4 shrink-0 leading-none text-xs text-[--color-text-muted]',
                  item.tone === 'danger' && 'ds-dropdown-shortcut--danger'
                )
              "
            >
              {{ item.shortcut }}
            </span>
          </button>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ds-dropdown-menu {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow:
    var(--shadow-xl),
    inset 0 0 0 1px color-mix(in oklab, var(--color-border) 38%, var(--color-surface));
  overflow: hidden;
}
.ds-dropdown-item {
  border-radius: var(--radius-md);
}

.ds-dropdown-separator {
  border-top: 1px solid color-mix(in oklab, var(--color-border) 40%, var(--color-surface));
}

.ds-dropdown-item:hover:not(:disabled),
.ds-dropdown-item:focus-visible,
.ds-dropdown-item:active,
.ds-dropdown-item--active {
  background: color-mix(in oklab, var(--color-text-primary) 10%, var(--color-surface));
  color: var(--color-text-primary);
  outline: none;
}

.ds-dropdown-item:hover:not(:disabled) .ds-dropdown-icon,
.ds-dropdown-item:focus-visible .ds-dropdown-icon,
.ds-dropdown-item:active .ds-dropdown-icon,
.ds-dropdown-item--active .ds-dropdown-icon,
.ds-dropdown-item:hover:not(:disabled) .ds-dropdown-shortcut,
.ds-dropdown-item:focus-visible .ds-dropdown-shortcut,
.ds-dropdown-item:active .ds-dropdown-shortcut,
.ds-dropdown-item--active .ds-dropdown-shortcut {
  color: var(--color-text-primary);
}

.ds-dropdown-item--danger {
  color: var(--color-danger);
}

.ds-dropdown-item--danger .ds-dropdown-icon,
.ds-dropdown-item--danger .ds-dropdown-shortcut,
.ds-dropdown-icon--danger,
.ds-dropdown-shortcut--danger {
  color: var(--color-danger);
}

.ds-dropdown-item--danger:hover:not(:disabled),
.ds-dropdown-item--danger:focus-visible,
.ds-dropdown-item--danger:active,
.ds-dropdown-item--danger.ds-dropdown-item--active {
  background: color-mix(in oklab, var(--color-danger) 12%, var(--color-surface));
  color: var(--color-danger-hover);
}

.ds-dropdown-item--danger:hover:not(:disabled) .ds-dropdown-icon,
.ds-dropdown-item--danger:focus-visible .ds-dropdown-icon,
.ds-dropdown-item--danger:active .ds-dropdown-icon,
.ds-dropdown-item--danger.ds-dropdown-item--active .ds-dropdown-icon,
.ds-dropdown-item--danger:hover:not(:disabled) .ds-dropdown-shortcut,
.ds-dropdown-item--danger:focus-visible .ds-dropdown-shortcut,
.ds-dropdown-item--danger:active .ds-dropdown-shortcut,
.ds-dropdown-item--danger.ds-dropdown-item--active .ds-dropdown-shortcut {
  color: var(--color-danger-hover);
}
</style>
