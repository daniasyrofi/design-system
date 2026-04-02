<script lang="ts">
import type { Ref } from 'vue'

export type TabsVariant      = 'line' | 'pill' | 'boxed'
export type TabsOrientation  = 'horizontal' | 'vertical'
export type TabsSize         = 'sm' | 'md' | 'lg'

export const TABS_KEY = Symbol('tabs')

export interface TabsContext {
  activeTab:    Ref<string>
  variant:      TabsVariant
  orientation:  TabsOrientation
  size:         TabsSize
  selectTab:    (value: string) => void
  registerTab:  (value: string) => void
  unregisterTab:(value: string) => void
  tabs:         Ref<string[]>
}
</script>

<script setup lang="ts">
import { provide, ref, watch, computed } from 'vue'
import { cn } from '@/lib/utils'

// Re-import types for use within this block (dual-script pattern)
import type { TabsVariant as V, TabsOrientation as O, TabsSize as S, TabsContext as C } from './Tabs.vue'

interface TabsProps {
  /** The value of the currently active tab. Supports v-model. */
  modelValue:   string
  /** Visual style variant. @default 'line' */
  variant?:     V
  /** Layout orientation of the tabs. @default 'horizontal' */
  orientation?: O
  /** Visual size of the tab triggers. @default 'md' */
  size?:        S
interface Props {
  /** The value of the currently active tab. Supports v-model. */
  modelValue:   string
  /** Visual style variant. @default 'line' */
  variant?:     TabsVariant
  /** Layout orientation of the tabs. @default 'horizontal' */
  orientation?: TabsOrientation
  /** Visual size of the tab triggers. @default 'md' */
  size?:        TabsSize
}

const props = withDefaults(defineProps<TabsProps>(), {
  variant:     'line',
  orientation: 'horizontal',
  size:        'md',
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const activeTab = ref(props.modelValue)
const tabs      = ref<string[]>([])

watch(() => props.modelValue, (val) => {
  activeTab.value = val
})

function selectTab(value: string) {
  activeTab.value = value
  emit('update:modelValue', value)
}

function registerTab(value: string) {
  if (!tabs.value.includes(value)) {
    tabs.value.push(value)
  }
}

function unregisterTab(value: string) {
  const idx = tabs.value.indexOf(value)
  if (idx !== -1) tabs.value.splice(idx, 1)
}

provide<C>(TABS_KEY, {
  activeTab,
  variant:     props.variant,
  orientation: props.orientation,
  size:        props.size,
  selectTab,
  registerTab,
  unregisterTab,
  tabs,
})

const classes = computed(() =>
  cn(
    'flex',
    props.orientation === 'vertical' ? 'flex-row gap-4' : 'flex-col',
  )
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
