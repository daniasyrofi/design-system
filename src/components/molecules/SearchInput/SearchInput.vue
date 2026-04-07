<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { RiSearchLine } from '@remixicon/vue'
import Input from '@/components/atoms/Input/Input.vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'

type SearchSize = 'sm' | 'md' | 'lg'

interface Props {
  /** The search query string. Supports v-model. */
  modelValue: string
  /** Visual size of the input. @default 'md' */
  size?: SearchSize
  /** Text displayed when input is empty. @default 'Search...' */
  placeholder?: string
  /** Shows a loading spinner. @default false */
  loading?: boolean
  /** Shows a clear button when input is not empty. @default true */
  clearable?: boolean
  /** Delay in ms before emitting 'search' event after typing. @default 300 */
  debounce?: number
  /** Disables the input. @default false */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  placeholder: 'Search...',
  loading: false,
  clearable: true,
  debounce: 300,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
}>()

const internalValue = ref(props.modelValue)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.modelValue,
  (v) => {
    internalValue.value = v
  }
)

function handleUpdate(value: string) {
  internalValue.value = value
  emit('update:modelValue', value)

  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', value)
  }, props.debounce)
}

function handleClear() {
  internalValue.value = ''
  emit('update:modelValue', '')
  emit('search', '')
  emit('clear')
}

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

const iconSizePx: Record<SearchSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

const spinnerSize: Record<SearchSize, 'xs' | 'sm'> = {
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
}

const inputCompRef = ref<InstanceType<typeof Input> | null>(null)

defineExpose({
  el: computed(() => inputCompRef.value?.el ?? null),
  focus: () => inputCompRef.value?.focus(),
  blur: () => inputCompRef.value?.blur(),
  clear: handleClear,
})
</script>

<template>
  <Input
    ref="inputCompRef"
    :model-value="internalValue"
    type="text"
    :size="size"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable && !loading"
    v-bind="$attrs"
    @update:model-value="handleUpdate"
    @clear="handleClear"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @keydown="emit('keydown', $event)"
    @keyup="emit('keyup', $event)"
  >
    <template #leading>
      <RiSearchLine :size="String(iconSizePx[size])" />
    </template>

    <template v-if="loading" #trailing>
      <Spinner :size="spinnerSize[size]" color="var(--color-text-tertiary)" />
    </template>
  </Input>
</template>
