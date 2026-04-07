import { type InjectionKey, type ComputedRef, type Ref } from 'vue'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectContext {
  /** Whether multiple values can be selected. */
  multiple: ComputedRef<boolean>
  /** Visual size token passed to all sub-components. */
  size: ComputedRef<SelectSize>
  /** Disabled state inherited by trigger and items. */
  disabled: ComputedRef<boolean>
  /** Shows a loading spinner — prevents opening while true. */
  loading: ComputedRef<boolean>
  /** Read-only — shows value but prevents opening. */
  readonly: ComputedRef<boolean>
  /** Whether the dropdown is currently open. */
  isOpen: Ref<boolean>
  /** Flat array of currently selected values. */
  selectedValues: ComputedRef<string[]>
  /** Check if a given value is selected. */
  isSelected: (value: string) => boolean
  /** Toggle a value — adds/removes in multiple mode, replaces in single. */
  selectItem: (value: string) => void
  /** Clear the entire selection. */
  clearAll: () => void
  /** Close the dropdown. */
  close: () => void
  /** Toggle open/close. */
  toggle: () => void
  /** ID for the trigger button, linked to the root's <label>. */
  triggerId: string
  /** Called by SelectItem on mount to register its label for trigger display. */
  registerItem: (value: string, label: string) => void
  /** Called by SelectItem on unmount to clean up. */
  unregisterItem: (value: string) => void
  /** Lookup the display label for a value (falls back to raw value). */
  getItemLabel: (value: string) => string
  /** Whether the root has an error (used by trigger for red border). */
  hasError: ComputedRef<boolean>
  /** Called by trigger on focus to forward the event to the root. */
  onTriggerFocus: (e: FocusEvent) => void
  /** Called by trigger on blur to forward the event to the root. */
  onTriggerBlur: (e: FocusEvent) => void
}

/** Primary injection key for the Select compound component context. */
export const SELECT_KEY = Symbol('select') as InjectionKey<SelectContext>

/** Secondary injection key: search query string provided by SelectContent. */
export const SELECT_SEARCH_KEY = Symbol('selectSearch') as InjectionKey<Ref<string>>
