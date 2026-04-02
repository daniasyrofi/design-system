<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import {
  RiInformationLine,
  RiCheckboxCircleLine,
  RiAlertLine,
  RiErrorWarningLine,
  RiCloseLine,
} from '@remixicon/vue'
import Button from '@/components/atoms/Button/Button.vue'

type Variant = 'info' | 'success' | 'warning' | 'danger'

interface Props {
  /** Unique identifier for the toast (used for dismissal). */
  id: string
  /** Semantic variant determining colors and icon. @default 'info' */
  variant?: Variant
  /** The main prominent text of the toast. */
  title: string
  /** Optional descriptive text beneath the title. */
  description?: string
  /** Shows a close button to manually dismiss the toast. @default true */
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
  dismissible: true,
})

const emit = defineEmits<{ dismiss: [id: string] }>()

// ── Only icon squircle color differs per variant ──────────────────────────────

const colorMap: Record<Variant, { iconBg: string }> = {
  info:    { iconBg: 'var(--color-info)' },
  success: { iconBg: 'var(--color-success)' },
  warning: { iconBg: 'var(--color-warning)' },
  danger:  { iconBg: 'var(--color-danger)' },
}

const iconMap: Record<Variant, typeof RiInformationLine> = {
  info:    RiInformationLine,
  success: RiCheckboxCircleLine,
  warning: RiAlertLine,
  danger:  RiErrorWarningLine,
}

const tokens      = computed(() => colorMap[props.variant])
const iconCmp     = computed(() => iconMap[props.variant])

const wrapperStyle = {
  width:           '340px',
  display:         'flex',
  alignItems:      'flex-start',
  gap:             '12px',
  padding:         '14px 16px',
  borderRadius:    'var(--radius-2xl)',
  backgroundColor: 'var(--color-surface)',
  boxShadow:       'var(--shadow-xl), 0 0 0 1px color-mix(in oklch, var(--color-border) 80%, transparent)',
  position:        'relative' as const,
}
</script>

<template>
  <!-- role="alert" (assertive) for urgent variants; role="status" (polite) for info/success -->
  <div
    :style="wrapperStyle"
    :role="variant === 'danger' || variant === 'warning' ? 'alert' : 'status'"
    aria-atomic="true"
  >
    <!-- Squircle icon -->
    <span
      :style="{
        width:           '30px',
        height:          '30px',
        minWidth:        '30px',
        borderRadius:    '9px',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        backgroundColor: tokens.iconBg,
        marginTop:       '1px',
        flexShrink:      '0',
      }"
    >
      <component
        :is="iconCmp"
        :size="'16'"
        style="color: #fff;"
        aria-hidden="true"
      />
    </span>

    <!-- Content -->
    <div :class="cn('flex-1 min-w-0 flex flex-col gap-0.5', dismissible ? 'pr-4' : '')">
      <p style="font-size:14px;font-weight:600;line-height:1.3;letter-spacing:-0.01em;color:var(--color-text-primary);">
        {{ title }}
      </p>
      <p
        v-if="description"
        style="font-size:13px;line-height:1.55;color:var(--color-text-secondary);"
      >
        {{ description }}
      </p>
      <div v-if="$slots.action" style="margin-top:6px;display:flex;align-items:center;gap:14px;">
        <slot name="action" />
      </div>
    </div>

    <!-- Dismiss × -->
    <Button
      v-if="dismissible"
      variant="ghost"
      size="xs"
      icon-only
      style="
        position:absolute; top:10px; right:10px;
        width:20px; height:20px; min-height:20px; padding:0;
        opacity:0.35; transition:opacity 0.15s;
      "
      @mouseenter="($event.currentTarget as HTMLElement).style.opacity = '0.8'"
      @mouseleave="($event.currentTarget as HTMLElement).style.opacity = '0.35'"
      aria-label="Dismiss"
      @click="emit('dismiss', id)"
    >
      <template #icon>
        <RiCloseLine :size="'15'" />
      </template>
    </Button>
  </div>
</template>
