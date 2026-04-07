import { type InjectionKey, type ComputedRef, type Ref } from 'vue'

export interface FormFieldContext {
  fieldId: string
  errorId: string
  descriptionId: string
  error: ComputedRef<string>
  isRequired: Ref<boolean>
}

export const FORM_FIELD_KEY = Symbol('formField') as InjectionKey<FormFieldContext>
