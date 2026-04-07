<script setup lang="ts">
import { ref, computed, useId } from 'vue'

interface Props {
  /** Controlled open state. Use with v-model. */
  modelValue?: boolean
  /** Initial open state when uncontrolled. @default false */
  defaultOpen?: boolean
  /** Prevents toggling. @default false */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  defaultOpen: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const contentId = useId()
const internalOpen = ref(props.defaultOpen)

const isOpen = computed({
  get: () => (props.modelValue !== undefined ? props.modelValue : internalOpen.value),
  set: (val: boolean) => {
    internalOpen.value = val
    emit('update:modelValue', val)
  },
})

function toggle() {
  if (!props.disabled) isOpen.value = !isOpen.value
}
</script>

<template>
  <div :data-state="isOpen ? 'open' : 'closed'">
    <!--
      Trigger slot receives: open (boolean), toggle (fn), contentId (string for aria-controls).
      Example: <template #trigger="{ open, toggle, contentId }">
                 <button :aria-expanded="open" :aria-controls="contentId" @click="toggle">...</button>
               </template>
    -->
    <slot name="trigger" :open="isOpen" :toggle="toggle" :content-id="contentId" />

    <!-- Animated content panel -->
    <Transition
      enter-active-class="transition-all duration-[--duration-normal] ease-[--ease-out] overflow-hidden"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[9999px]"
      leave-active-class="transition-all duration-[--duration-fast] ease-[--ease-in] overflow-hidden"
      leave-from-class="opacity-100 max-h-[9999px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-show="isOpen" :id="contentId" role="region">
        <slot :open="isOpen" />
      </div>
    </Transition>
  </div>
</template>
