<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { cn } from '@/lib/utils'
import { RiSearchLine, RiCloseLine } from '@remixicon/vue'

export interface CommandItem {
  /** Unique identifier. */
  id: string
  /** Display label. */
  label: string
  /** Optional description shown beneath the label. */
  description?: string
  /** Keyboard shortcut hint shown on the right (e.g. '⌘K'). */
  shortcut?: string
  /** Icon component rendered to the left of the label. */
  icon?: object
  /** Group name for categorising items. */
  group?: string
  /** Prevents selection. @default false */
  disabled?: boolean
  /** Callback fired when this item is selected. */
  action?: () => void
}

interface Props {
  /** Controls palette visibility. Supports v-model. */
  modelValue?: boolean
  /** All available command items. */
  items?: CommandItem[]
  /** Placeholder for the search input. @default 'Search commands…' */
  placeholder?: string
  /** Empty-state message when no results match. @default 'No results found.' */
  emptyText?: string
  /** Register the global Cmd+K / Ctrl+K keyboard shortcut. @default true */
  globalShortcut?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue:    false,
  items:         () => [],
  placeholder:   'Search commands…',
  emptyText:     'No results found.',
  globalShortcut: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  /** Fired when an item is selected. */
  select: [item: CommandItem]
}>()

// ── State ─────────────────────────────────────────────────────────────────────

const isOpen    = ref(props.modelValue)
const query     = ref('')
const activeIdx = ref(0)
const inputRef  = ref<HTMLInputElement | null>(null)
const listRef   = ref<HTMLElement | null>(null)

// Sync isOpen ↔ modelValue
watch(() => props.modelValue, (v) => { isOpen.value = v })
watch(isOpen, (v) => { emit('update:modelValue', v) })

// ── Filtered + grouped results ────────────────────────────────────────────────

const filteredItems = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.items
  return props.items.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.group?.toLowerCase().includes(q),
  )
})

const groups = computed(() => {
  const map = new Map<string, CommandItem[]>()
  for (const item of filteredItems.value) {
    const g = item.group ?? ''
    if (!map.has(g)) map.set(g, [])
    map.get(g)!.push(item)
  }
  return map
})

// Flat list of only selectable items for keyboard navigation
const selectableItems = computed(() =>
  filteredItems.value.filter((i) => !i.disabled),
)

// ── Open / close ──────────────────────────────────────────────────────────────

function open() {
  isOpen.value = true
  query.value  = ''
  activeIdx.value = 0
  nextTick(() => inputRef.value?.focus())
}

function close() {
  isOpen.value = false
  query.value  = ''
}

function toggle() {
  isOpen.value ? close() : open()
}

// ── Selection ─────────────────────────────────────────────────────────────────

function selectItem(item: CommandItem) {
  if (item.disabled) return
  emit('select', item)
  item.action?.()
  close()
}

// ── Keyboard navigation ────────────────────────────────────────────────────────

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return

  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIdx.value = Math.min(activeIdx.value + 1, selectableItems.value.length - 1)
    scrollActiveIntoView()
    return
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIdx.value = Math.max(activeIdx.value - 1, 0)
    scrollActiveIntoView()
    return
  }

  if (e.key === 'Enter') {
    e.preventDefault()
    const item = selectableItems.value[activeIdx.value]
    if (item) selectItem(item)
  }
}

function scrollActiveIntoView() {
  nextTick(() => {
    const active = listRef.value?.querySelector('[data-active="true"]')
    active?.scrollIntoView({ block: 'nearest' })
  })
}

// Reset active index when results change
watch(filteredItems, () => { activeIdx.value = 0 })

// ── Global shortcut ───────────────────────────────────────────────────────────

function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    toggle()
  }
}

onMounted(() => {
  if (props.globalShortcut) {
    document.addEventListener('keydown', onGlobalKeydown)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onGlobalKeydown)
})

// ── Overlay click ─────────────────────────────────────────────────────────────

function onOverlayClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('ds-cmd-overlay')) {
    close()
  }
}

// ── Active item helper ────────────────────────────────────────────────────────

function isActive(item: CommandItem) {
  const idx = selectableItems.value.indexOf(item)
  return idx === activeIdx.value
}

function setActive(item: CommandItem) {
  const idx = selectableItems.value.indexOf(item)
  if (idx !== -1) activeIdx.value = idx
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="ds-cmd-fade">
      <div
        v-if="isOpen"
        class="ds-cmd-overlay fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
        role="presentation"
        @click="onOverlayClick"
        @keydown="onKeydown"
      >
        <!-- Panel -->
        <div
          class="ds-cmd-panel w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <!-- Search row -->
          <div class="ds-cmd-search flex items-center gap-3 px-4 ds-cmd-divider-b">
            <RiSearchLine
              size="18"
              class="shrink-0 text-[--color-text-tertiary]"
              aria-hidden="true"
            />
            <input
              ref="inputRef"
              v-model="query"
              type="search"
              :placeholder="placeholder"
              class="ds-cmd-input flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-[--color-text-tertiary] text-[--color-text-primary]"
              aria-label="Search commands"
              aria-autocomplete="list"
              :aria-activedescendant="selectableItems[activeIdx]?.id ?? undefined"
              autocomplete="off"
              spellcheck="false"
              @keydown="onKeydown"
            />
            <button
              type="button"
              class="shrink-0 p-1 rounded text-[--color-text-tertiary] hover:text-[--color-text-primary] transition-colors"
              aria-label="Close command palette"
              @click="close"
            >
              <RiCloseLine size="16" aria-hidden="true" />
            </button>
          </div>

          <!-- Results list -->
          <div
            ref="listRef"
            class="ds-cmd-list overflow-y-auto max-h-[400px] p-2"
            role="listbox"
            aria-label="Search results"
          >
            <!-- Empty state -->
            <div
              v-if="filteredItems.length === 0"
              class="px-4 py-8 text-center text-sm text-[--color-text-tertiary]"
            >
              {{ emptyText }}
            </div>

            <!-- Groups -->
            <template v-for="[group, groupItems] in groups" :key="group">
              <!-- Group heading -->
              <div
                v-if="group"
                class="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-[--color-text-tertiary] select-none"
              >
                {{ group }}
              </div>

              <!-- Items -->
              <button
                v-for="item in groupItems"
                :id="item.id"
                :key="item.id"
                type="button"
                role="option"
                :aria-selected="isActive(item)"
                :aria-disabled="item.disabled || undefined"
                :data-active="isActive(item)"
                :disabled="item.disabled || undefined"
                :class="cn(
                  'ds-cmd-item w-full flex items-center gap-3 px-2 py-2 text-left text-sm rounded-md',
                  'transition-colors duration-75',
                  isActive(item)
                    ? 'ds-cmd-item--active text-[--color-text-primary]'
                    : 'text-[--color-text-primary]',
                  item.disabled && 'opacity-40 cursor-not-allowed',
                )"
                @click="selectItem(item)"
                @mouseenter="setActive(item)"
              >
                <!-- Icon -->
                <span
                  v-if="item.icon"
                  class="shrink-0 w-5 h-5 flex items-center justify-center text-[--color-text-secondary]"
                  aria-hidden="true"
                >
                  <component :is="item.icon" :size="16" />
                </span>

                <!-- Label + description -->
                <span class="flex-1 min-w-0">
                  <span class="block truncate font-medium">{{ item.label }}</span>
                  <span
                    v-if="item.description"
                    class="block truncate text-xs text-[--color-text-tertiary] mt-0.5"
                  >
                    {{ item.description }}
                  </span>
                </span>

                <!-- Shortcut badge -->
                <kbd
                  v-if="item.shortcut"
                  class="ds-cmd-kbd shrink-0 text-xs font-mono px-1.5 py-0.5 rounded"
                  aria-label="Keyboard shortcut"
                >
                  {{ item.shortcut }}
                </kbd>
              </button>
            </template>
          </div>

          <!-- Footer hint -->
          <div class="ds-cmd-footer flex items-center gap-4 px-4 py-2.5 ds-cmd-divider-t text-xs text-[--color-text-secondary] select-none">
            <span><kbd class="ds-cmd-kbd px-1 py-0.5 rounded font-mono">↑↓</kbd> Navigate</span>
            <span><kbd class="ds-cmd-kbd px-1 py-0.5 rounded font-mono">↵</kbd> Select</span>
            <span><kbd class="ds-cmd-kbd px-1 py-0.5 rounded font-mono">Esc</kbd> Close</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ds-cmd-overlay {
  background-color: oklch(0 0 0 / 0.45);
  backdrop-filter: blur(4px);
}

.ds-cmd-panel {
  background-color: var(--color-surface);
  box-shadow:
    0 0 0 1px oklch(0 0 0 / 0.06),
    0 24px 64px -16px oklch(0.2 0 0 / 0.18),
    0 8px 24px oklch(0.2 0 0 / 0.08);
}

.ds-cmd-divider-b {
  border-bottom: 1px solid oklch(0 0 0 / 0.07);
}

.ds-cmd-divider-t {
  border-top: 1px solid oklch(0 0 0 / 0.07);
}

.ds-cmd-search {
  background-color: var(--color-surface);
}

.ds-cmd-input::-webkit-search-cancel-button {
  display: none;
}

.ds-cmd-input:focus {
  outline: none;
  box-shadow: none;
}

.ds-cmd-input {
  -webkit-appearance: none;
  appearance: none;
}

.ds-cmd-kbd {
  background-color: oklch(0 0 0 / 0.06);
  color: var(--color-text-secondary);
  border: 1px solid oklch(0 0 0 / 0.1);
}

.ds-cmd-item:hover:not(:disabled),
.ds-cmd-item--active {
  background-color: oklch(0 0 0 / 0.05);
}

.ds-cmd-footer {
  background-color: oklch(0 0 0 / 0.04);
}

/* Transition */
.ds-cmd-fade-enter-active,
.ds-cmd-fade-leave-active {
  transition: opacity 150ms ease;
}
.ds-cmd-fade-enter-from,
.ds-cmd-fade-leave-to {
  opacity: 0;
}

/* Panel slide */
.ds-cmd-fade-enter-active .ds-cmd-panel,
.ds-cmd-fade-leave-active .ds-cmd-panel {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms ease;
}
.ds-cmd-fade-enter-from .ds-cmd-panel,
.ds-cmd-fade-leave-to .ds-cmd-panel {
  transform: translateY(-8px) scale(0.98);
  opacity: 0;
}
</style>
