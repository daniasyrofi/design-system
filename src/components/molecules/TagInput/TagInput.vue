<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { RiCloseLine } from '@remixicon/vue'

type TagInputSize = 'sm' | 'md' | 'lg'

interface Props {
  /** Current array of tag strings. Supports v-model. */
  modelValue?:      string[]
  /** Placeholder text shown when there are no tags. */
  placeholder?:     string
  /** Maximum number of tags allowed. */
  maxTags?:         number
  /** Allow duplicate tag values. @default false */
  allowDuplicates?: boolean
  /** Disables the input. @default false */
  disabled?:        boolean
  /** Shows error state. @default false */
  error?:           boolean
  /** Visual size. @default 'md' */
  size?:            TagInputSize
  /** Keys that trigger tag creation. @default ['Enter', ','] */
  delimiters?:      string[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue:      () => [],
  placeholder:     'Add tag…',
  allowDuplicates: false,
  disabled:        false,
  error:           false,
  size:            'md',
  delimiters:      () => ['Enter', ','],
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const inputText = ref('')
const inputRef  = ref<HTMLInputElement | null>(null)

function addTag(raw: string) {
  const tag = raw.trim()
  if (!tag) return
  if (!props.allowDuplicates && props.modelValue.includes(tag)) { inputText.value = ''; return }
  if (props.maxTags !== undefined && props.modelValue.length >= props.maxTags) return
  emit('update:modelValue', [...props.modelValue, tag])
  inputText.value = ''
}

function removeTag(idx: number) {
  const tags = [...props.modelValue]
  tags.splice(idx, 1)
  emit('update:modelValue', tags)
}

function onKeydown(e: KeyboardEvent) {
  if (props.delimiters.includes(e.key)) {
    e.preventDefault()
    addTag(inputText.value)
    return
  }
  if (e.key === 'Backspace' && !inputText.value && props.modelValue.length > 0) {
    removeTag(props.modelValue.length - 1)
  }
}

const textSizeClass: Record<TagInputSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

const minHeightClass: Record<TagInputSize, string> = {
  sm: 'min-h-[32px]',
  md: 'min-h-[38px]',
  lg: 'min-h-[44px]',
}
</script>

<template>
  <div
    :class="cn(
      'flex flex-wrap items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] transition-all cursor-text',
      minHeightClass[size],
      error
        ? 'ring-2 ring-[--color-danger]'
        : 'focus-within:ring-2 focus-within:ring-[--color-primary]',
      disabled && 'opacity-50 pointer-events-none',
    )"
    :style="{
      backgroundColor: 'var(--color-surface)',
      border:          '1px solid var(--color-border)',
      boxShadow:       'var(--shadow-xs)',
    }"
    @click="inputRef?.focus()"
  >
    <!-- Tags -->
    <span
      v-for="(tag, idx) in modelValue"
      :key="tag + idx"
      class="inline-flex items-center gap-1 font-medium px-2 py-0.5 rounded-full shrink-0"
      :class="textSizeClass[size]"
      :style="{
        backgroundColor: 'var(--color-primary-light)',
        color:           'var(--color-primary)',
      }"
    >
      {{ tag }}
      <button
        type="button"
        class="inline-flex items-center opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none"
        :aria-label="`Remove ${tag}`"
        @click.stop="removeTag(idx)"
      >
        <RiCloseLine :size="size === 'sm' ? '10' : '12'" />
      </button>
    </span>

    <!-- Text input -->
    <input
      ref="inputRef"
      v-model="inputText"
      type="text"
      class="flex-1 min-w-[80px] bg-transparent outline-none placeholder:text-[--color-text-tertiary]"
      :class="textSizeClass[size]"
      :style="{ color: 'var(--color-text-primary)' }"
      :placeholder="modelValue.length === 0 ? placeholder : ''"
      :disabled="disabled"
      @keydown="onKeydown"
      @blur="() => addTag(inputText)"
    />
  </div>
</template>
