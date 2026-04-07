<script setup lang="ts">
import { computed, useId, ref } from 'vue'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'
type ToggleColor = 'primary' | 'secondary' | 'neutral' | 'danger'

interface Props {
  modelValue?: boolean
  size?: Size
  color?: ToggleColor
  disabled?: boolean
  readonly?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  size: 'md',
  color: 'primary',
  disabled: false,
  readonly: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
const inputId = useId()
const inputRef = ref<HTMLInputElement | null>(null)
const labelId = useId() // used by <label> + aria-labelledby on the button

function toggle() {
  if (!props.disabled && !props.readonly) emit('update:modelValue', !props.modelValue)
}

const trackClass: Record<Size, string> = {
  sm: 'w-7 h-4', // 16px high
  md: 'w-9 h-5', // 20px high
  lg: 'w-11 h-6', // 24px high
}

const thumbClass: Record<Size, string> = {
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-5',
}

const thumbTranslate: Record<Size, { on: string; off: string }> = {
  sm: { on: 'translate-x-3.5', off: 'translate-x-[2px]' },
  md: { on: 'translate-x-4.5', off: 'translate-x-[2px]' },
  lg: { on: 'translate-x-5.5', off: 'translate-x-[2px]' },
}

const labelTextClass: Record<Size, string> = {
  sm: 'text-xs', // 12px
  md: 'text-sm', // 14px
  lg: 'text-base', // 16px
}

const trackClasses = computed(() =>
  cn(
    'relative inline-flex shrink-0 items-center',
    'cursor-pointer select-none',
    'transition-all duration-200 ease-out',
    trackClass[props.size],
    'shadow-inner',
    props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    props.readonly && 'cursor-default pointer-events-none',
    'active:scale-[0.96]'
  )
)

// Component-level CSS override tokens:
//   --toggle-bg-on   (default: var(--color-{color}))
//   --toggle-bg-off  (default: var(--color-border-strong))
//   --toggle-thumb   (default: var(--color-surface))
const trackStyle = computed(() => ({
  backgroundColor: props.modelValue
    ? `var(--toggle-bg-on, var(--color-${props.color}))`
    : 'var(--toggle-bg-off, var(--color-border-strong))',
  borderRadius: 'var(--radius-full)',
  '--focus-ring-color': `var(--toggle-bg-on, var(--color-${props.color}))`,
}))

const thumbClasses = computed(() =>
  cn(
    'transition-transform duration-200 ease-out',
    thumbClass[props.size],
    props.modelValue ? thumbTranslate[props.size].on : thumbTranslate[props.size].off
  )
)

const thumbStyle = {
  backgroundColor: 'var(--toggle-thumb, var(--color-surface))',
  borderRadius: 'var(--radius-full)',
  boxShadow: 'var(--shadow-sm)',
}

defineExpose({
  el: inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <div class="relative flex items-center gap-2.5">
    <input
      ref="inputRef"
      :id="inputId"
      type="checkbox"
      role="switch"
      class="sr-only peer"
      :checked="modelValue"
      :disabled="disabled"
      :aria-label="label || 'Toggle'"
      @change="toggle"
    />

    <button
      type="button"
      :class="trackClasses"
      :style="trackStyle"
      class="ds-toggle-track focus-visible:outline-none"
      role="switch"
      :aria-checked="modelValue"
      :aria-labelledby="label ? labelId : undefined"
      :aria-label="!label ? label || 'Toggle' : undefined"
      :tabindex="disabled ? -1 : 0"
      :data-state="modelValue ? 'checked' : 'unchecked'"
      @click="toggle"
      @keydown.space.prevent="toggle"
      @keydown.enter.prevent="toggle"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
      <span :class="thumbClasses" :style="thumbStyle" />
    </button>

    <label
      v-if="label"
      :id="labelId"
      :for="inputId"
      :class="
        cn(
          labelTextClass[size],
          'font-medium leading-none select-none transition-colors',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        )
      "
      :style="{ color: 'var(--color-text-primary)' }"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
.ds-toggle-track:focus-visible {
  box-shadow:
    0 0 0 2px var(--color-surface),
    0 0 0 4px var(--focus-ring-color, var(--color-primary));
}
</style>
