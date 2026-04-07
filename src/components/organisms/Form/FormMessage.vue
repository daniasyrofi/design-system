<script setup lang="ts">
import { inject } from 'vue'
import { FORM_FIELD_KEY } from './formFieldContext'

const ctx = inject(FORM_FIELD_KEY)
</script>

<template>
  <p
    v-if="ctx?.error.value"
    :id="ctx?.errorId"
    role="alert"
    aria-live="polite"
    class="ds-form-message text-sm text-[var(--color-danger)] mt-1 flex items-center gap-1"
  >
    <slot>{{ ctx?.error.value }}</slot>
  </p>
</template>
