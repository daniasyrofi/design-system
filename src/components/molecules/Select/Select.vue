<script setup lang="ts">
import { ref, reactive, computed, provide, onMounted, onBeforeUnmount, useId } from 'vue'
import { cn } from '@/lib/utils'
import { SELECT_KEY } from './context'
import type { SelectSize } from './context'

interface Props {
  /** The selected value (string) or values (string[]) — use with v-model. */
  modelValue: string | string[]
  /** Allow selecting multiple values. @default false */
  multiple?: boolean
  /** Size token passed to all child components. @default 'md' */
  size?: SelectSize
  /** Disables the entire select. @default false */
  disabled?: boolean
  /** Label rendered above the trigger. */
  label?: string
  /** Helper text rendered below (hidden when error is set). */
  helperText?: string
  /** Error message — also applies error styling to the trigger. */
  error?: string
  /** Shows a loading spinner and prevents opening. @default false */
  loading?: boolean
  /** Shows the value but prevents opening. @default false */
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  size: 'md',
  disabled: false,
  loading: false,
  readonly: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const triggerId = useId()

const hasError = computed(() => !!props.error)

// Reactive map: value → display label, populated by SelectItem on mount
const itemLabels = reactive<Record<string, string>>({})

const selectedValues = computed<string[]>(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue
  return props.modelValue ? [props.modelValue] : []
})

function isSelected(value: string) {
  return selectedValues.value.includes(value)
}

function selectItem(value: string) {
  if (props.multiple) {
    const next = [...selectedValues.value]
    const idx = next.indexOf(value)
    if (idx >= 0) next.splice(idx, 1)
    else next.push(value)
    emit('update:modelValue', next)
  } else {
    emit('update:modelValue', value)
    isOpen.value = false
  }
}

function clearAll() {
  emit('update:modelValue', props.multiple ? [] : '')
}

function toggle() {
  if (props.disabled || props.loading || props.readonly) return
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function registerItem(value: string, label: string) {
  itemLabels[value] = label
}

function unregisterItem(value: string) {
  delete itemLabels[value]
}

function getItemLabel(value: string): string {
  return itemLabels[value] ?? value
}

function handleClickOutside(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside, true))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside, true))

provide(SELECT_KEY, {
  multiple: computed(() => props.multiple!),
  size: computed(() => props.size!),
  disabled: computed(() => props.disabled!),
  loading: computed(() => props.loading!),
  readonly: computed(() => props.readonly!),
  hasError,
  isOpen,
  selectedValues,
  isSelected,
  selectItem,
  clearAll,
  close,
  toggle,
  triggerId,
  registerItem,
  unregisterItem,
  getItemLabel,
  onTriggerFocus: (e: FocusEvent) => emit('focus', e),
  onTriggerBlur: (e: FocusEvent) => emit('blur', e),
})

defineExpose({
  el: rootRef,
  open: () => { isOpen.value = true },
  close: () => { isOpen.value = false },
})
</script>

<template>
  <div ref="rootRef" class="flex flex-col gap-1.5 w-full" :data-state="isOpen ? 'open' : 'closed'">
    <!-- Label — linked to trigger button via triggerId -->
    <label
      v-if="label"
      :for="triggerId"
      :class="cn('text-sm font-medium select-none', disabled && 'opacity-50')"
      :style="{ color: 'var(--color-text-heading)' }"
    >
      {{ label }}
    </label>

    <!-- Trigger + Content slot -->
    <div class="relative">
      <slot />
    </div>

    <!-- Helper / Error -->
    <p
      v-if="helperText || error"
      class="text-[13px] leading-snug"
      :style="{ color: hasError ? 'var(--color-danger)' : 'var(--color-text-secondary)' }"
    >
      {{ error ?? helperText }}
    </p>
  </div>
</template>
