<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { cn } from '@/lib/utils'
import { Icons } from '@/lib/icons'
import Button from '@/components/atoms/Button/Button.vue'

type Variant = 'info' | 'success' | 'warning' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface Props {
  /** The semantic variant/color scheme of the alert. @default 'info' */
  variant?:     Variant
  /** Visual size of the alert elements. @default 'md' */
  size?:        Size
  /** The prominent title text. */
  title?:       string
  /** Shows the variant-specific icon. @default true */
  icon?:        boolean
  /** Shows a close button to dismiss the alert. @default false */
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant:     'info',
  size:        'md',
  icon:        true,
  dismissible: false,
})

const emit = defineEmits<{ dismiss: [] }>()
const slots = useSlots()

// ── Variant — only squircle icon color changes ────────────────────────────────

const colorMap: Record<Variant, { iconBg: string; iconColor: string }> = {
  info:    { iconBg: 'var(--color-info)',    iconColor: '#fff' },
  success: { iconBg: 'var(--color-success)', iconColor: '#fff' },
  warning: { iconBg: 'var(--color-warning)', iconColor: '#fff' },
  danger:  { iconBg: 'var(--color-danger)',  iconColor: '#fff' },
}

const iconDataMap: Record<Variant, string> = {
  info:    Icons.AlertInfo,
  success: Icons.AlertSuccess,
  warning: Icons.AlertWarning,
  danger:  Icons.AlertDanger,
}

// ── Size scale ────────────────────────────────────────────────────────────────

const sizeScale: Record<Size, {
  p: string; gap: string
  iconSide: string; iconRadius: string; iconPx: number
  titleStyle: string; bodyStyle: string; closeSize: number
}> = {
  sm: {
    p: '12px 14px', gap: '10px',
    iconSide: '28px', iconRadius: '8px', iconPx: 13,
    titleStyle: 'font-size:13px;font-weight:600;line-height:1.3;letter-spacing:-0.01em;',
    bodyStyle:  'font-size:12px;line-height:1.55;',
    closeSize: 14,
  },
  md: {
    p: '14px 16px', gap: '12px',
    iconSide: '32px', iconRadius: '10px', iconPx: 16,
    titleStyle: 'font-size:14px;font-weight:600;line-height:1.3;letter-spacing:-0.01em;',
    bodyStyle:  'font-size:13px;line-height:1.55;',
    closeSize: 15,
  },
  lg: {
    p: '16px 18px', gap: '14px',
    iconSide: '36px', iconRadius: '11px', iconPx: 18,
    titleStyle: 'font-size:15px;font-weight:600;line-height:1.3;letter-spacing:-0.01em;',
    bodyStyle:  'font-size:14px;line-height:1.55;',
    closeSize: 16,
  },
}

// ── Computed ─────────────────────────────────────────────────────────────────

const tokens  = computed(() => colorMap[props.variant])
const s       = computed(() => sizeScale[props.size])
const iconHtml = computed(() => iconDataMap[props.variant])
const hasBody = computed(() => Boolean(slots.default))
const hasAction = computed(() => Boolean(slots.action))
const isHeadingOnly = computed(() => Boolean(props.title) && !hasBody.value && !hasAction.value)
</script>

<template>
  <!-- role="alert" (assertive) for urgent variants; role="status" (polite) for info/success -->
  <div
    :role="variant === 'danger' || variant === 'warning' ? 'alert' : 'status'"
    aria-atomic="true"
    :class="cn('relative flex items-start w-full')"
    :style="{
      padding:         s.p,
      gap:             s.gap,
      display:         'flex',
      alignItems:      isHeadingOnly ? 'center' : 'flex-start',
      borderRadius:    'var(--radius-2xl)',
      backgroundColor: 'var(--color-surface)',
      boxShadow:       'var(--shadow-xl), 0 0 0 1px color-mix(in oklch, var(--color-border) 80%, transparent)',
    }"
  >
    <!-- Squircle icon (iOS-style: rounded square, not circle) -->
    <span
      v-if="icon || $slots.icon"
      :style="{
        width:           s.iconSide,
        height:          s.iconSide,
        minWidth:        s.iconSide,
        borderRadius:    s.iconRadius,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        backgroundColor: tokens.iconBg,
        marginTop:       isHeadingOnly ? '0' : '1px',
        flexShrink:      '0',
      }"
    >
      <slot name="icon">
        <span
          v-html="iconHtml"
          :style="{
            color: tokens.iconColor,
            width: s.iconPx + 'px',
            height: s.iconPx + 'px',
            display: 'flex'
          }"
          aria-hidden="true"
        />
      </slot>
    </span>

    <!-- Content -->
    <div :style="{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: isHeadingOnly ? '0' : '3px' }">
      <p
        v-if="title"
        :style="`${s.titleStyle} color: var(--color-text-primary); padding-right: ${dismissible ? '20px' : '0'};`"
      >
        {{ title }}
      </p>

      <div
        v-if="$slots.default"
        :style="`${s.bodyStyle} color: var(--color-text-secondary);`"
      >
        <slot />
      </div>

      <div
        v-if="$slots.action"
        style="display:flex;align-items:center;gap:14px;margin-top:6px;"
      >
        <slot name="action" />
      </div>
    </div>

    <!-- Dismiss × — absolute top-right -->
    <Button
      v-if="dismissible"
      variant="ghost"
      size="xs"
      icon-only
      style="
        position:absolute; top:10px; right:10px;
        width:20px; height:20px; min-height: 20px; padding:0;
        opacity:0.35; transition:opacity 0.15s;
        color:var(--color-text-primary);
      "
      @mouseenter="($event.currentTarget as HTMLElement).style.opacity = '0.8'"
      @mouseleave="($event.currentTarget as HTMLElement).style.opacity = '0.35'"
      aria-label="Dismiss"
      @click="emit('dismiss')"
    >
      <template #icon>
        <span
          v-html="Icons.Close"
          :style="{
            width: s.closeSize + 'px',
            height: s.closeSize + 'px',
            display: 'flex'
          }"
        />
      </template>
    </Button>
  </div>
</template>
