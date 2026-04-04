<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import { RiUploadCloud2Line, RiCloseLine } from '@remixicon/vue'
import Button from '@/components/atoms/Button/Button.vue'

interface Props {
  /** Accepted file types, e.g., 'image/*, .pdf'. */
  accept?: string
  /** Allows multiple file selection. @default false */
  multiple?: boolean
  /** Maximum allowed file size in bytes. @default 5242880 (5MB) */
  maxSize?: number
  /** Maximum number of files allowed (when multiple is true). @default 5 */
  maxFiles?: number
  /** Disables the dropzone and file input. @default false */
  disabled?: boolean
  /** Generates and shows image previews or file icons. @default true */
  previews?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  accept: '',
  multiple: false,
  maxSize: 5242880,
  maxFiles: 5,
  disabled: false,
  previews: true,
})

const emit = defineEmits<{
  files: [files: File[]]
  error: [message: string]
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)
const selectedFiles = ref<File[]>([])
const previewUrls = ref<Map<string, string>>(new Map())

const acceptHint = computed(() => {
  if (!props.accept) return ''
  const parts = props.accept.split(',').map((s) => s.trim())
  const labels: string[] = []
  for (const part of parts) {
    if (part === 'image/*') labels.push('PNG, JPG, GIF, SVG')
    else if (part === 'video/*') labels.push('MP4, MOV, AVI')
    else if (part === 'audio/*') labels.push('MP3, WAV')
    else if (part === 'application/pdf') labels.push('PDF')
    else if (part.startsWith('.')) labels.push(part.slice(1).toUpperCase())
    else labels.push(part)
  }
  const sizeLabel = formatSize(props.maxSize)
  return `${labels.join(', ')} up to ${sizeLabel}`
})

function formatSize(bytes: number): string {
  if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(1)}GB`
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(0)}MB`
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)}KB`
  return `${bytes}B`
}

function triggerFileInput() {
  if (props.disabled) return
  fileInputRef.value?.click()
}

function handleInputChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) {
    processFiles(Array.from(input.files))
  }
  // Reset input so the same file can be selected again
  input.value = ''
}

function handleDragEnter(event: DragEvent) {
  event.preventDefault()
  if (!props.disabled) isDragOver.value = true
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
  if (!props.disabled) isDragOver.value = true
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = false
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = false
  if (props.disabled) return
  const files = event.dataTransfer?.files
  if (files) {
    processFiles(Array.from(files))
  }
}

function processFiles(incoming: File[]) {
  const valid: File[] = []

  for (const file of incoming) {
    // Validate type
    if (props.accept && !matchAccept(file, props.accept)) {
      emit('error', `File "${file.name}" is not an accepted file type.`)
      continue
    }

    // Validate size
    if (file.size > props.maxSize) {
      emit('error', `File "${file.name}" exceeds the maximum size of ${formatSize(props.maxSize)}.`)
      continue
    }

    valid.push(file)
  }

  if (!valid.length) return

  let next: File[]
  if (props.multiple) {
    next = [...selectedFiles.value, ...valid]
    if (next.length > props.maxFiles) {
      emit('error', `Maximum ${props.maxFiles} files allowed.`)
      next = next.slice(0, props.maxFiles)
    }
  } else {
    next = [valid[0]]
  }

  // Revoke old URLs that are no longer needed
  for (const [key, url] of previewUrls.value) {
    if (!next.some((f) => fileKey(f) === key)) {
      URL.revokeObjectURL(url)
      previewUrls.value.delete(key)
    }
  }

  // Generate preview URLs for images
  if (props.previews) {
    for (const file of next) {
      const key = fileKey(file)
      if (!previewUrls.value.has(key) && file.type.startsWith('image/')) {
        previewUrls.value.set(key, URL.createObjectURL(file))
      }
    }
  }

  selectedFiles.value = next
  emit('files', next)
}

function removeFile(index: number) {
  const file = selectedFiles.value[index]
  const key = fileKey(file)
  const url = previewUrls.value.get(key)
  if (url) {
    URL.revokeObjectURL(url)
    previewUrls.value.delete(key)
  }
  selectedFiles.value.splice(index, 1)
  emit('files', [...selectedFiles.value])
}

function fileKey(file: File): string {
  return `${file.name}-${file.size}-${file.lastModified}`
}

function getPreviewUrl(file: File): string | undefined {
  return previewUrls.value.get(fileKey(file))
}

function matchAccept(file: File, accept: string): boolean {
  const types = accept.split(',').map((s) => s.trim())
  for (const type of types) {
    if (type.startsWith('.')) {
      if (file.name.toLowerCase().endsWith(type.toLowerCase())) return true
    } else if (type.endsWith('/*')) {
      const category = type.slice(0, type.indexOf('/'))
      if (file.type.startsWith(category + '/')) return true
    } else {
      if (file.type === type) return true
    }
  }
  return false
}

const dropzoneClasses = computed(() =>
  cn(
    'ds-dropzone relative flex flex-col items-center justify-center gap-3',
    'border border-dashed p-10',
    'cursor-pointer select-none',
    'transition-all duration-[--duration-normal] ease-[--ease-default]',
    isDragOver.value
      ? 'ds-dropzone--active border-[--color-primary] scale-[1.01]'
      : 'ds-dropzone--idle',
    props.disabled && 'opacity-50 pointer-events-none cursor-not-allowed'
  )
)
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <!-- Dropzone -->
    <div
      :class="dropzoneClasses"
      role="button"
      tabindex="0"
      @click="triggerFileInput"
      @keydown.enter="triggerFileInput"
      @keydown.space.prevent="triggerFileInput"
      @dragenter="handleDragEnter"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <span
        :class="
          cn(
            'flex items-center justify-center w-12 h-12 rounded-full',
            'transition-colors duration-[--duration-normal]',
            isDragOver ? 'ds-upload-icon-bg--active' : 'ds-upload-icon-bg'
          )
        "
      >
        <RiUploadCloud2Line
          :size="'24'"
          :class="
            cn(
              'transition-colors duration-[--duration-normal]',
              isDragOver ? 'text-[--color-primary]' : 'text-[--color-text-tertiary]'
            )
          "
        />
      </span>
      <div class="text-center">
        <p class="text-sm font-semibold text-[--color-text-primary]">
          Click to upload
          <span class="font-normal text-[--color-text-secondary]">or drag and drop</span>
        </p>
        <p v-if="acceptHint" class="text-xs text-[--color-text-tertiary] mt-1">
          {{ acceptHint }}
        </p>
      </div>

      <!-- Hidden file input -->
      <input
        ref="fileInputRef"
        type="file"
        class="sr-only"
        :accept="accept || undefined"
        :multiple="multiple"
        :disabled="disabled"
        @change="handleInputChange"
      />
    </div>

    <!-- Previews -->
    <div
      v-if="previews && selectedFiles.length > 0"
      class="grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-3"
    >
      <div
        v-for="(file, index) in selectedFiles"
        :key="fileKey(file)"
        class="ds-file-preview group relative border border-[--color-border] overflow-hidden bg-[--color-bg-subtle]"
      >
        <!-- Image preview -->
        <img
          v-if="getPreviewUrl(file)"
          :src="getPreviewUrl(file)"
          :alt="file.name"
          class="aspect-square w-full object-cover"
        />
        <!-- Non-image file -->
        <div
          v-else
          class="aspect-square w-full flex flex-col items-center justify-center p-2 text-center"
        >
          <span class="text-xs text-[--color-text-secondary] truncate w-full">
            {{ file.name }}
          </span>
          <span class="text-[10px] text-[--color-text-tertiary] mt-0.5">
            {{ formatSize(file.size) }}
          </span>
        </div>

        <!-- Remove button -->
        <Button
          variant="secondary"
          size="xs"
          icon-only
          class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-[--duration-normal] z-10"
          aria-label="Remove file"
          @click.stop="removeFile(index)"
        >
          <template #icon>
            <RiCloseLine :size="'14'" />
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ds-dropzone {
  border-radius: var(--radius-lg);
}
.ds-file-preview {
  border-radius: var(--radius-md);
}
.ds-upload-icon-bg {
  background-color: var(--color-neutral-light);
}
.ds-upload-icon-bg--active {
  background-color: color-mix(in oklch, var(--color-primary) 15%, transparent);
}
.ds-dropzone--idle {
  background-color: var(--color-surface);
  border-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}
.ds-dropzone--idle:hover {
  border-color: var(--color-border-strong);
  background-color: var(--color-neutral-light);
  box-shadow: var(--shadow-md);
}
.ds-dropzone--active {
  background-color: var(--color-primary-light);
}
</style>
