<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import { cn } from '@/lib/utils'
import { Icons } from '@/lib/icons'

type Width = 'narrow' | 'default' | 'wide'
type CollapsedWidth = 'icon-only' | 'hidden'

export interface SidebarItem {
  /** Unique identifier for the item. */
  id: string
  /** Display label text. */
  label: string
  /** SVG string or icon component rendered beside the label. */
  icon?: Component | string
  /** Route path for navigation. */
  route?: string
  /** Badge text or number displayed next to the label. */
  badge?: string | number
  /** Nested child items (renders as an expandable group). */
  children?: SidebarItem[]
}

interface Props {
  /** Controls the collapsed state. Supports v-model. @default false */
  modelValue?: boolean
  /** Shows the collapse/expand toggle at the bottom of the sidebar. @default true */
  collapsible?: boolean
  /** Expanded width of the sidebar. @default 'default' */
  width?: Width
  /** Width when collapsed: icon-only strip or fully hidden. @default 'icon-only' */
  collapsedWidth?: CollapsedWidth
  /** Array of navigation items to render. @default [] */
  items?: SidebarItem[]
  /** The `id` of the currently active navigation item. */
  activeId?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  collapsible: true,
  width: 'default',
  collapsedWidth: 'icon-only',
  items: () => [],
  activeId: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  itemClick: [item: SidebarItem]
}>()

// ── Width maps ──────────────────────────────────────────────────────────────

const widthMap: Record<Width, string> = {
  narrow: '240px',
  default: '280px',
  wide: '320px',
}

const collapsedWidthMap: Record<CollapsedWidth, string> = {
  'icon-only': '56px',
  hidden: '0px',
}

// ── Collapsed state ─────────────────────────────────────────────────────────

const isCollapsed = computed(() => props.modelValue)

const sidebarStyle = computed(() => ({
  width: isCollapsed.value ? collapsedWidthMap[props.collapsedWidth] : widthMap[props.width],
}))

const isHidden = computed(() => isCollapsed.value && props.collapsedWidth === 'hidden')

// ── Expandable children ─────────────────────────────────────────────────────

const expandedGroups = ref<Set<string>>(new Set())

function toggleGroup(id: string) {
  const next = new Set(expandedGroups.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  expandedGroups.value = next
}

function isGroupExpanded(id: string) {
  return expandedGroups.value.has(id)
}

// ── Handlers ────────────────────────────────────────────────────────────────

function handleItemClick(item: SidebarItem) {
  if (item.children?.length) {
    toggleGroup(item.id)
  } else {
    emit('itemClick', item)
  }
}

function toggleCollapse() {
  emit('update:modelValue', !isCollapsed.value)
}

// ── Active check ────────────────────────────────────────────────────────────

function isActive(item: SidebarItem): boolean {
  return item.id === props.activeId
}

function hasActiveChild(item: SidebarItem): boolean {
  return !!item.children?.some((c) => c.id === props.activeId)
}
</script>

<template>
  <aside
    :class="
      cn(
        'flex flex-col h-full bg-[--color-surface] border-r border-[--color-border]',
        'transition-[width] duration-[--duration-slow] ease-[--ease-out]',
        'overflow-hidden shrink-0'
      )
    "
    :style="sidebarStyle"
    role="navigation"
  >
    <!-- Header slot -->
    <div
      v-if="$slots.header && !isHidden"
      :class="
        cn(
          'shrink-0 border-b border-[--color-border] px-3 py-3',
          'flex items-center',
          isCollapsed && 'justify-center'
        )
      "
    >
      <slot name="header" :collapsed="isCollapsed" />
    </div>

    <!-- Nav items -->
    <nav v-if="!isHidden" class="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2">
      <ul class="flex flex-col gap-0.5">
        <li v-for="item in items" :key="item.id">
          <!-- Parent item -->
          <button
            type="button"
            :class="
              cn(
                'relative flex items-center w-full gap-3 ds-sidebar-item text-sm',
                'transition-all duration-[--duration-fast] ease-[--ease-default]',
                'cursor-pointer select-none overflow-hidden',
                isCollapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5',
                isActive(item) || hasActiveChild(item)
                  ? 'bg-[--color-primary-subtle] text-[--color-primary-strong] font-semibold ds-sidebar-item--active'
                  : 'text-[--color-text-secondary] hover:bg-[--color-neutral-subtle] hover:text-[--color-text-primary]'
              )
            "
            :title="isCollapsed ? item.label : undefined"
            @click="handleItemClick(item)"
          >
            <span
              v-if="item.icon"
              class="size-5 shrink-0 flex items-center justify-center transition-all duration-300"
              aria-hidden="true"
              v-html="typeof item.icon === 'string' ? item.icon : ''"
            />

            <!-- Label -->
            <span v-if="!isCollapsed" class="flex-1 truncate text-left">
              {{ item.label }}
            </span>

            <!-- Badge -->
            <span
              v-if="item.badge != null && !isCollapsed"
              :class="
                cn(
                  'shrink-0 inline-flex items-center justify-center',
                  'text-[11px] leading-none font-medium px-1.5 py-0.5 rounded-full',
                  'bg-[--color-primary-light] text-[--color-primary]'
                )
              "
            >
              {{ item.badge }}
            </span>

            <span
              v-if="item.children?.length && !isCollapsed"
              :class="
                cn(
                  'size-4 shrink-0 transition-transform duration-[--duration-fast] flex items-center justify-center',
                  isGroupExpanded(item.id) && 'rotate-180'
                )
              "
              aria-hidden="true"
              v-html="Icons.ArrowDown"
            />
          </button>

          <!-- Children -->
          <ul
            v-if="item.children?.length && isGroupExpanded(item.id) && !isCollapsed"
            class="flex flex-col gap-0.5 mt-0.5"
          >
            <li v-for="child in item.children" :key="child.id">
              <button
                type="button"
                :class="
                  cn(
                    'flex items-center w-full gap-3 ds-sidebar-item text-sm',
                    'transition-colors duration-[--duration-fast] ease-[--ease-default]',
                    'cursor-pointer select-none',
                    'pl-10 pr-3 py-2',
                    isActive(child)
                      ? 'bg-[--color-primary-subtle] text-[--color-primary-strong] font-medium ds-sidebar-item--active'
                      : 'text-[--color-text-secondary] hover:bg-[--color-neutral-subtle] hover:text-[--color-text-primary]'
                  )
                "
                @click="emit('itemClick', child)"
              >
                <span
                  v-if="child.icon"
                  class="size-4 shrink-0 flex items-center justify-center transition-all duration-300 opacity-80"
                  aria-hidden="true"
                  v-html="typeof child.icon === 'string' ? child.icon : ''"
                />
                <span class="flex-1 truncate text-left">{{ child.label }}</span>
                <span
                  v-if="child.badge != null"
                  :class="
                    cn(
                      'shrink-0 inline-flex items-center justify-center',
                      'text-[11px] leading-none font-medium px-1.5 py-0.5 rounded-full',
                      'bg-[--color-primary-light] text-[--color-primary]'
                    )
                  "
                >
                  {{ child.badge }}
                </span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- Footer slot + collapse button -->
    <div v-if="!isHidden" :class="cn('shrink-0 border-t border-[--color-border]', 'flex flex-col')">
      <div v-if="$slots.footer" :class="cn('px-3 py-3', isCollapsed && 'flex justify-center')">
        <slot name="footer" :collapsed="isCollapsed" />
      </div>

      <button
        v-if="collapsible"
        type="button"
        :class="
          cn(
            'flex items-center justify-center w-full py-2.5',
            'text-[--color-text-tertiary] hover:text-[--color-text-secondary]',
            'hover:bg-[--color-neutral-light]',
            'transition-colors duration-[--duration-fast] cursor-pointer'
          )
        "
        :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="toggleCollapse"
      >
        <span
          v-if="!isCollapsed"
          class="size-5 flex items-center justify-center"
          v-html="Icons.ArrowLeft"
        />
        <span v-else class="size-5 flex items-center justify-center" v-html="Icons.ArrowRight" />
      </button>
    </div>
  </aside>
</template>

<style scoped>
.ds-sidebar-item {
  border-radius: var(--radius-md);
}
.ds-sidebar-item--active {
  box-shadow: inset 3px 0 0 0 var(--color-primary);
}
</style>
