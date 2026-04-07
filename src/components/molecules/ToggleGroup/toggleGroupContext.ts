import { inject, provide, type InjectionKey, type Ref } from 'vue'

export interface ToggleGroupContext {
  type: 'single' | 'multiple'
  value: Ref<string | string[]>
  disabled: boolean
  size: 'sm' | 'md' | 'lg'
  toggle: (val: string) => void
  isSelected: (val: string) => boolean
}

export const TOGGLE_GROUP_KEY: InjectionKey<ToggleGroupContext> = Symbol('ToggleGroup')

export function provideToggleGroup(ctx: ToggleGroupContext) {
  provide(TOGGLE_GROUP_KEY, ctx)
}

export function useToggleGroup(): ToggleGroupContext {
  const ctx = inject(TOGGLE_GROUP_KEY)
  if (!ctx) throw new Error('ToggleGroupItem must be used inside ToggleGroup')
  return ctx
}
