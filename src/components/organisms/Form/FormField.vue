<script setup lang="ts">
import { provide, ref, computed, useId } from 'vue'
import { FORM_FIELD_KEY, type FormFieldContext } from './formFieldContext'

interface Props {
  name?: string
  required?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  error: '',
})

const baseId = useId()
const fieldId = `${baseId}-field`
const errorId = `${baseId}-error`
const descriptionId = `${baseId}-description`

const isRequired = ref(props.required)
const errorMsg = computed(() => props.error ?? '')

const ctx: FormFieldContext = {
  fieldId,
  errorId,
  descriptionId,
  error: errorMsg,
  isRequired,
}

provide(FORM_FIELD_KEY, ctx)
</script>

<template>
  <div class="ds-form-field">
    <slot />
  </div>
</template>
