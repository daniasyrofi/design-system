<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { provideToggleGroup } from './toggleGroupContext'

type Size = 'sm' | 'md' | 'lg'
type ToggleType = 'single' | 'multiple'
type Orientation = 'horizontal' | 'vertical'

interface Props {
  modelValue?: string | string[]
  type?: ToggleType
  disabled?: boolean
  size?: Size
  orientation?: Orientation
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'single',
  disabled: false,
  size: 'md',
  orientation: 'horizontal',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

const internalValue = ref<string | string[]>(
  props.type === 'multiple'
    ? Array.isArray(props.modelValue)
      ? [...props.modelValue]
      : props.modelValue
        ? [props.modelValue]
        : []
    : Array.isArray(props.modelValue)
      ? props.modelValue[0] ?? ''
      : (props.modelValue ?? '')
)

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value =
      props.type === 'multiple'
        ? Array.isArray(val)
          ? [...val]
          : val
            ? [val]
            : []
        : Array.isArray(val)
          ? val[0] ?? ''
          : (val ?? '')
  }
)

function toggle(val: string) {
  if (props.disabled) return

  if (props.type === 'single') {
    const current = Array.isArray(internalValue.value) ? '' : internalValue.value
    const next = current === val ? '' : val
    internalValue.value = next
    emit('update:modelValue', next)
  } else {
    const current = Array.isArray(internalValue.value) ? [...internalValue.value] : []
    const idx = current.indexOf(val)
    if (idx === -1) {
      current.push(val)
    } else {
      current.splice(idx, 1)
    }
    internalValue.value = current
    emit('update:modelValue', current)
  }
}

function isSelected(val: string): boolean {
  if (props.type === 'single') {
    return (Array.isArray(internalValue.value) ? '' : internalValue.value) === val
  }
  return Array.isArray(internalValue.value) && internalValue.value.includes(val)
}

provideToggleGroup({
  type: computed(() => props.type).value,
  value: internalValue,
  disabled: props.disabled,
  size: props.size,
  toggle,
  isSelected,
})
</script>

<template>
  <div
    role="group"
    :aria-orientation="orientation"
    :class="[
      'ds-toggle-group',
      'inline-flex gap-1',
      orientation === 'vertical' ? 'flex-col' : 'flex-row',
    ]"
    :data-orientation="orientation"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot />
  </div>
</template>
