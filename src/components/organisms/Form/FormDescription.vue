<script setup lang="ts">
import { inject } from 'vue'
import { FORM_FIELD_KEY } from './formFieldContext'

const ctx = inject(FORM_FIELD_KEY)
</script>

<template>
  <p
    :id="ctx?.descriptionId"
    class="ds-form-description text-sm text-[var(--color-text-secondary)] mt-1"
  >
    <slot />
  </p>
</template>
