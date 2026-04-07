<script setup lang="ts">
import { inject, computed } from 'vue'
import { FORM_FIELD_KEY } from './formFieldContext'
import { cn } from '@/lib/utils'

const ctx = inject(FORM_FIELD_KEY)

const labelClass = computed(() =>
  cn(
    'ds-form-label',
    'block text-sm font-medium mb-1',
    ctx?.error.value ? 'text-[var(--color-danger)]' : 'text-[var(--color-text-primary)]',
  )
)
</script>

<template>
  <label
    :for="ctx?.fieldId"
    :class="labelClass"
  >
    <slot />
    <span
      v-if="ctx?.isRequired.value"
      aria-hidden="true"
      class="ml-0.5 text-[var(--color-danger)]"
    >*</span>
  </label>
</template>
