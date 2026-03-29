<script setup lang="ts">
import { cn } from '@/lib/utils'
import { RiCheckLine } from '@remixicon/vue'

type Variant = 'horizontal' | 'vertical'

interface Step {
  title: string
  description?: string
}

interface Props {
  steps: Step[]
  activeStep?: number
  variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
  activeStep: 0,
  variant: 'horizontal',
})

function stepState(index: number): 'completed' | 'active' | 'upcoming' {
  if (index < props.activeStep) return 'completed'
  if (index === props.activeStep) return 'active'
  return 'upcoming'
}
</script>

<template>
  <div
    :class="cn(
      'flex w-full',
      variant === 'vertical' ? 'flex-col gap-0' : 'flex-row items-start',
    )"
    role="list"
  >
    <template v-for="(step, index) in steps" :key="index">
      <div
        :class="cn(
          'flex',
          variant === 'vertical' ? 'flex-row items-stretch gap-3' : 'flex-col items-center flex-1',
        )"
        role="listitem"
      >
        <!-- Circle + connector (vertical layout) -->
        <div
          v-if="variant === 'vertical'"
          class="flex flex-col items-center"
        >
          <!-- Step circle -->
          <div
            :class="cn(
              'ds-stepper-circle',
              'flex items-center justify-center shrink-0',
              'w-8 h-8 rounded-full text-sm font-semibold',
              'transition-all duration-200 ease-out',
              stepState(index) === 'completed' && 'ds-stepper-circle--completed',
              stepState(index) === 'active' && 'ds-stepper-circle--active',
              stepState(index) === 'upcoming' && 'ds-stepper-circle--upcoming',
            )"
          >
            <RiCheckLine v-if="stepState(index) === 'completed'" :size="'16'" style="color: #fff;" />
            <span v-else>{{ index + 1 }}</span>
          </div>
          <!-- Vertical connector -->
          <div
            v-if="index < steps.length - 1"
            class="ds-stepper-connector flex-1 w-0.5 my-1"
            :class="stepState(index) === 'completed' ? 'ds-stepper-connector--done' : ''"
          />
        </div>

        <!-- Circle + connector (horizontal layout) -->
        <div
          v-if="variant === 'horizontal'"
          class="flex items-center w-full"
        >
          <div
            v-if="index > 0"
            class="ds-stepper-connector flex-1 h-0.5"
            :class="stepState(index - 1) === 'completed' ? 'ds-stepper-connector--done' : ''"
          />
          <div
            :class="cn(
              'ds-stepper-circle',
              'flex items-center justify-center shrink-0',
              'w-8 h-8 rounded-full text-sm font-semibold',
              'transition-all duration-200 ease-out',
              stepState(index) === 'completed' && 'ds-stepper-circle--completed',
              stepState(index) === 'active' && 'ds-stepper-circle--active',
              stepState(index) === 'upcoming' && 'ds-stepper-circle--upcoming',
            )"
          >
            <RiCheckLine v-if="stepState(index) === 'completed'" :size="'16'" style="color: #fff;" />
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div
            v-if="index < steps.length - 1"
            class="ds-stepper-connector flex-1 h-0.5"
            :class="stepState(index) === 'completed' ? 'ds-stepper-connector--done' : ''"
          />
        </div>

        <!-- Content -->
        <div
          :class="cn(
            variant === 'horizontal' ? 'text-center mt-2' : 'pb-6',
          )"
        >
          <p
            :class="cn(
              'text-sm font-semibold',
              stepState(index) === 'upcoming' ? 'ds-stepper-text--muted' : 'ds-stepper-text',
            )"
          >
            {{ step.title }}
          </p>
          <p
            v-if="step.description"
            class="ds-stepper-text--muted text-xs mt-0.5"
          >
            {{ step.description }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.ds-stepper-circle--completed {
  background-color: var(--color-primary);
  color: #fff;
}

.ds-stepper-circle--active {
  background-color: var(--color-surface);
  color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary);
}

.ds-stepper-circle--upcoming {
  background-color: var(--color-neutral-light);
  color: var(--color-text-tertiary);
}

.ds-stepper-connector {
  background-color: var(--color-border);
}

.ds-stepper-connector--done {
  background-color: var(--color-primary);
}

.ds-stepper-text {
  color: var(--color-text-primary);
}

.ds-stepper-text--muted {
  color: var(--color-text-tertiary);
}
</style>
