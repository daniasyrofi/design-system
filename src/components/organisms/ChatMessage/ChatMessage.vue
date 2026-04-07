<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/atoms/Avatar'
import { RiFileCopyLine, RiRefreshLine } from '@remixicon/vue'

type Role = 'user' | 'assistant'
type Status = 'sending' | 'sent' | 'error'

interface Props {
  /** Whether this is a user or assistant message. */
  role: Role
  /** The text content of the message. */
  content: string
  /** Timestamp used to display the message time. */
  timestamp: Date
  /** Delivery status of the message. @default 'sent' */
  status?: Status
  /** URL for the sender's avatar image. */
  avatar?: string
  /** Display name shown beneath the message bubble. */
  userName?: string
  /** Shows the animated typing indicator instead of content. @default false */
  isTyping?: boolean
  /** Shows a copy-to-clipboard action button on hover. @default false */
  actions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  status: 'sent',
  isTyping: false,
  actions: false,
})

const emit = defineEmits<{
  retry: []
  copy: [content: string]
}>()

const isUser = computed(() => props.role === 'user')


const containerClass = computed(() =>
  cn('group flex items-end gap-2 max-w-full', isUser.value ? 'flex-row-reverse' : 'flex-row')
)

const bubbleClass = computed(() =>
  cn(
    'relative max-w-[75%] px-4 py-3 text-body-sm',
    'animate-[ds-fade-in_0.2s_ease-out]',
    isUser.value
      ? ['bg-[--color-neutral] text-[--color-text-inverse]', 'ds-bubble ds-bubble--user']
      : [
          'bg-[--color-surface] border border-[--color-border]',
          'text-[--color-text-primary]',
          'ds-bubble ds-bubble--assistant',
        ],
    props.status === 'sending' && 'opacity-60',
    props.status === 'error' && 'shadow-[0_0_0_1px_var(--color-danger)]'
  )
)

function handleCopy() {
  navigator.clipboard.writeText(props.content).catch(() => {})
  emit('copy', props.content)
}

function handleRetry() {
  emit('retry')
}
</script>

<template>
  <div :class="containerClass">
    <!-- Avatar -->
    <Avatar
      :src="avatar"
      :name="userName"
      size="sm"
      :fallback-icon="isUser ? 'RiUser3Line' : 'RiRobotLine'"
      class="shrink-0"
    />

    <div :class="cn('flex flex-col min-w-0', isUser ? 'items-end' : 'items-start')">
      <!-- Bubble -->
      <div :class="bubbleClass">
        <!-- Actions overlay (copy) -->
        <div
          v-if="actions && status === 'sent' && !isTyping"
          :class="
            cn(
              'absolute -top-3 opacity-0 group-hover:opacity-100',
              'transition-opacity duration-[--duration-fast] ease-[--ease-default]',
              isUser ? 'left-2' : 'right-2'
            )
          "
        >
          <button
            type="button"
            class="ds-bubble-copy-btn flex items-center justify-center size-7 [background:var(--color-surface-glass)] [backdrop-filter:var(--glass-blur)] border border-[--glass-border] text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-[--color-neutral-light] transition-all duration-[--duration-fast] ease-[--ease-default] cursor-pointer"
            aria-label="Copy message"
            @click="handleCopy"
          >
            <RiFileCopyLine size="14" />
          </button>
        </div>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="flex items-center gap-1.5 py-1 px-1">
          <span
            v-for="i in 3"
            :key="i"
            class="size-2 rounded-full bg-current opacity-50"
            :style="{
              animation: 'typingBounce 1.2s ease-in-out infinite',
              animationDelay: `${(i - 1) * 0.2}s`,
            }"
          />
        </div>

        <!-- Content -->
        <p v-else class="whitespace-pre-wrap break-words">{{ content }}</p>

        <!-- Error retry -->
        <button
          v-if="status === 'error'"
          type="button"
          class="mt-2 flex items-center gap-1 text-caption text-[--color-danger] hover:underline cursor-pointer"
          @click="handleRetry"
        >
          <RiRefreshLine size="12" />
          <span>Retry</span>
        </button>
      </div>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="flex items-center gap-1.5 py-1 px-1">
        <span
          v-for="i in 3"
          :key="i"
          class="size-2 rounded-full bg-current opacity-50"
          :style="{
            animation: 'ds-typing-bounce 1.2s ease-in-out infinite',
            animationDelay: `${(i - 1) * 0.2}s`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ds-bubble {
  border-radius: var(--radius-lg);
}
.ds-bubble--user {
  border-bottom-right-radius: var(--radius-sm);
  box-shadow: var(--shadow-md), var(--shadow-highlight);
}
.ds-bubble--assistant {
  border-bottom-left-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
}
.ds-bubble-copy-btn {
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md);
}
</style>
