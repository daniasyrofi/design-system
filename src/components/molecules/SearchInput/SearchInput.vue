<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { RiSearchLine } from '@remixicon/vue'
import Input from '@/components/atoms/Input/Input.vue'

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
</script>

<template>
  <Input
    :model-value="internalValue"
    type="search"
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
    
    <template #trailing v-if="loading">
      <svg
        class="shrink-0 animate-spin text-[--color-text-tertiary]"
        :class="size === 'sm' ? 'size-3.5' : 'size-4'"
        viewBox="0 0 24 24"
        fill="none"
        aria-label="Loading"
        role="status"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </template>
  </Input>
</template>
