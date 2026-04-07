<script setup lang="ts">
import { inject, computed } from 'vue'
import { FORM_FIELD_KEY } from './formFieldContext'

const ctx = inject(FORM_FIELD_KEY)

const ariaDescribedBy = computed(() => {
  if (!ctx) return undefined
  const parts: string[] = []
  if (ctx.error.value) parts.push(ctx.errorId)
  parts.push(ctx.descriptionId)
  return parts.join(' ') || undefined
})
</script>

<template>
  <slot
    :id="ctx?.fieldId"
    :aria-describedby="ariaDescribedBy"
    :aria-invalid="ctx?.error.value ? true : undefined"
    :aria-required="ctx?.isRequired.value || undefined"
  />
</template>
