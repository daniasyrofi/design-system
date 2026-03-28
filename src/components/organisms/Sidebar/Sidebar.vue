<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { RiArrowLeftSLine, RiArrowRightSLine, RiArrowDownSLine } from '@remixicon/vue'

type Width          = 'narrow' | 'default' | 'wide'
type CollapsedWidth = 'icon-only' | 'hidden'

export interface SidebarItem {
  id:        string
  label:     string
  icon?:     any
  route?:    string
  badge?:    string | number
  children?: SidebarItem[]
}

interface Props {
  modelValue?:     boolean
  collapsible?:    boolean
  width?:          Width
  collapsedWidth?: CollapsedWidth
  items?:          SidebarItem[]
  activeId?:       string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue:     false,
  collapsible:    true,
  width:          'default',
  collapsedWidth: 'icon-only',
  items:          () => [],
  activeId:       '',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'itemClick':         [item: SidebarItem]
}>()

// ── Width maps ──────────────────────────────────────────────────────────────

const widthMap: Record<Width, string> = {
  narrow:  '240px',
  default: '280px',
  wide:    '320px',
}

const collapsedWidthMap: Record<CollapsedWidth, string> = {
  'icon-only': '56px',
  'hidden':    '0px',
}

// ── Collapsed state ─────────────────────────────────────────────────────────

const isCollapsed = computed(() => props.modelValue)

const sidebarStyle = computed(() => ({
  width: isCollapsed.value
    ? collapsedWidthMap[props.collapsedWidth]
    : widthMap[props.width],
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
  return !!item.children?.some(c => c.id === props.activeId)
}
</script>

<template>
  <aside
    :class="cn(
      'flex flex-col h-full bg-[--color-surface] border-r border-[--color-border]',
      'transition-[width] duration-[--duration-slow] ease-[--ease-out]',
      'overflow-hidden shrink-0',
    )"
    :style="sidebarStyle"
    role="navigation"
  >
    <!-- Header slot -->
    <div
      v-if="$slots.header && !isHidden"
      :class="cn(
        'shrink-0 border-b border-[--color-border] px-3 py-3',
        'flex items-center',
        isCollapsed && 'justify-center',
      )"
    >
      <slot name="header" :collapsed="isCollapsed" />
    </div>

    <!-- Nav items -->
    <nav
      v-if="!isHidden"
      class="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2"
    >
      <ul class="flex flex-col gap-0.5">
        <li v-for="item in items" :key="item.id">
          <!-- Parent item -->
          <button
            type="button"
            :class="cn(
              'relative flex items-center w-full gap-3 ds-sidebar-item text-sm',
              'transition-all duration-[--duration-fast] ease-[--ease-default]',
              'cursor-pointer select-none overflow-hidden',
              isCollapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5',
              isActive(item) || hasActiveChild(item)
                ? 'bg-[--color-primary-subtle] text-[--color-primary-strong] font-semibold ds-sidebar-item--active'
                : 'text-[--color-text-secondary] hover:bg-[--color-neutral-subtle] hover:text-[--color-text-primary]',
            )"
            :title="isCollapsed ? item.label : undefined"
            @click="handleItemClick(item)"
          >
            <!-- Icon -->
            <component
              v-if="item.icon"
              :is="item.icon"
              class="size-5 shrink-0"
              aria-hidden="true"
            />

            <!-- Label -->
            <span
              v-if="!isCollapsed"
              class="flex-1 truncate text-left"
            >
              {{ item.label }}
            </span>

            <!-- Badge -->
            <span
              v-if="item.badge != null && !isCollapsed"
              :class="cn(
                'shrink-0 inline-flex items-center justify-center',
                'text-[11px] leading-none font-medium px-1.5 py-0.5 rounded-full',
                'bg-[--color-primary-light] text-[--color-primary]',
              )"
            >
              {{ item.badge }}
            </span>

            <!-- Chevron for children -->
            <RiArrowDownSLine
              v-if="item.children?.length && !isCollapsed"
              :class="cn(
                'size-4 shrink-0 transition-transform duration-[--duration-fast]',
                isGroupExpanded(item.id) && 'rotate-180',
              )"
              aria-hidden="true"
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
                :class="cn(
                  'flex items-center w-full gap-3 ds-sidebar-item text-sm',
                  'transition-colors duration-[--duration-fast] ease-[--ease-default]',
                  'cursor-pointer select-none',
                  'pl-10 pr-3 py-2',
                  isActive(child)
                    ? 'bg-[--color-primary-subtle] text-[--color-primary-strong] font-medium ds-sidebar-item--active'
                    : 'text-[--color-text-secondary] hover:bg-[--color-neutral-subtle] hover:text-[--color-text-primary]',
                )"
                @click="emit('itemClick', child)"
              >
                <component
                  v-if="child.icon"
                  :is="child.icon"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                />
                <span class="flex-1 truncate text-left">{{ child.label }}</span>
                <span
                  v-if="child.badge != null"
                  :class="cn(
                    'shrink-0 inline-flex items-center justify-center',
                    'text-[11px] leading-none font-medium px-1.5 py-0.5 rounded-full',
                    'bg-[--color-primary-light] text-[--color-primary]',
                  )"
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
    <div
      v-if="!isHidden"
      :class="cn(
        'shrink-0 border-t border-[--color-border]',
        'flex flex-col',
      )"
    >
      <div
        v-if="$slots.footer"
        :class="cn('px-3 py-3', isCollapsed && 'flex justify-center')"
      >
        <slot name="footer" :collapsed="isCollapsed" />
      </div>

      <button
        v-if="collapsible"
        type="button"
        :class="cn(
          'flex items-center justify-center w-full py-2.5',
          'text-[--color-text-tertiary] hover:text-[--color-text-secondary]',
          'hover:bg-[--color-neutral-light]',
          'transition-colors duration-[--duration-fast] cursor-pointer',
        )"
        :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="toggleCollapse"
      >
        <RiArrowLeftSLine  v-if="!isCollapsed" class="size-5" />
        <RiArrowRightSLine v-else              class="size-5" />
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
