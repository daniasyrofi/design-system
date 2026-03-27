<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarItem {
  src?: string
  name?: string
  alt?: string
}

interface Props {
  avatars: AvatarItem[]
  max?: number
  size?: AvatarSize
}

const props = withDefaults(defineProps<Props>(), {
  max: 5,
  size: 'md',
})

const visible = computed(() => props.avatars.slice(0, props.max))
const overflow = computed(() => Math.max(0, props.avatars.length - props.max))

const overlapClass: Record<AvatarSize, string> = {
  xs: '-ml-1.5',
  sm: '-ml-2',
  md: '-ml-2.5',
  lg: '-ml-3',
  xl: '-ml-3.5',
}

const ringClass: Record<AvatarSize, string> = {
  xs: 'ring-[1.5px]',
  sm: 'ring-2',
  md: 'ring-2',
  lg: 'ring-[3px]',
  xl: 'ring-[3px]',
}

const overflowSizeClass: Record<AvatarSize, string> = {
  xs: 'size-6 text-[10px]',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
  xl: 'size-14 text-lg',
}
</script>

<template>
  <div class="flex items-center">
    <div
      v-for="(avatar, index) in visible"
      :key="index"
      :class="cn(
        'relative shrink-0 rounded-full ring-[var(--color-surface)]',
        ringClass[size],
        index > 0 && overlapClass[size],
      )"
      :style="{ zIndex: visible.length - index }"
    >
      <Avatar
        :src="avatar.src"
        :name="avatar.name"
        :alt="avatar.alt"
        :size="size"
        shape="circle"
      />
    </div>

    <!-- Overflow count badge -->
    <div
      v-if="overflow > 0"
      :class="cn(
        'relative shrink-0 rounded-full ring-[var(--color-surface)] inline-flex items-center justify-center font-semibold select-none',
        ringClass[size],
        overlapClass[size],
        overflowSizeClass[size],
      )"
      :style="{
        zIndex: 0,
        backgroundColor: 'var(--color-neutral-light)',
        color: 'var(--color-text-secondary)',
      }"
    >
      +{{ overflow }}
    </div>
  </div>
</template>
