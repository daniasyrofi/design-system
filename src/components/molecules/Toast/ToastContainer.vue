<script setup lang="ts">
import { cn } from '@/lib/utils'
import Toast from './Toast.vue'
import { useToast } from './useToast'

const { toasts, dismiss } = useToast()
</script>

<template>
  <Teleport to="body">
    <!-- Outer live region so AT discovers new toasts even when injected via Teleport -->
    <div
      :class="cn(
        'fixed top-4 right-4 z-50',
        'flex flex-col gap-3',
        'pointer-events-none',
      )"
      aria-live="polite"
      aria-label="Notifications"
      role="region"
    >
      <TransitionGroup
        enter-active-class="transition duration-[--duration-normal] ease-[--ease-default]"
        enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-[--duration-normal] ease-[--ease-default]"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-full"
        move-class="transition-all duration-[--duration-normal] ease-[--ease-default]"
      >
        <div
          v-for="t in toasts"
          :key="t.id"
          class="pointer-events-auto"
        >
          <Toast
            :id="t.id"
            :variant="t.variant"
            :title="t.title"
            :description="t.description"
            :dismissible="t.dismissible"
            @dismiss="dismiss"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
