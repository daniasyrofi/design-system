<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { RiSearchLine } from '@remixicon/vue'
import Input from '@/components/atoms/Input/Input.vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'

type SearchSize = 'sm' | 'md' | 'lg'

interface Props {
  modelValue:  string
  size?:       SearchSize
  placeholder?: string
  loading?:    boolean
  clearable?:  boolean
  debounce?:   number
  disabled?:   boolean
}

const props = withDefaults(defineProps<Props>(), {
  size:        'md',
  placeholder: 'Search...',
  loading:     false,
  clearable:   true,
  debounce:    300,
  disabled:    false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': [value: string]
  'clear': []
}>()

const internalValue = ref(props.modelValue)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.modelValue, (v) => {
  internalValue.value = v
})

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
</script>

<template>
  <Input
    :model-value="internalValue"
    type="text"
    :size="size"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable && !loading"
    v-bind="$attrs"
    @update:model-value="handleUpdate"
    @clear="handleClear"
  >
    <template #leading>
      <RiSearchLine :size="String(iconSizePx[size])" />
    </template>

    <template v-if="loading" #trailing>
      <Spinner :size="spinnerSize[size]" color="var(--color-text-tertiary)" />
    </template>
  </Input>
</template>
