import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FileUpload from './FileUpload.vue'

// ── Canvas decorator ──────────────────────────────────────────────────────────
const canvas = () => ({
  template: `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 32px;
      background-color: #eceae4;
      background-image: radial-gradient(circle, rgba(0,0,0,0.11) 1px, transparent 1px);
      background-size: 22px 22px;
    ">
      <story />
    </div>
  `,
})

const meta: Meta<typeof FileUpload> = {
  title: 'Molecules/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    accept:   { control: 'text' },
    multiple: { control: 'boolean' },
    maxSize:  { control: 'number' },
    maxFiles: { control: 'number' },
    disabled: { control: 'boolean' },
    previews: { control: 'boolean' },
  },
  args: {
    accept: '',
    multiple: false,
    maxSize: 5242880,
    maxFiles: 5,
    disabled: false,
    previews: true,
  },
}
export default meta
type Story = StoryObj<typeof FileUpload>

export const Default: Story = {
  render: (args) => ({
    components: { FileUpload },
    setup() {
      function onFiles(files: File[]) {
        console.log('Files selected:', files)
      }
      function onError(msg: string) {
        console.error('Upload error:', msg)
      }
      return { args, onFiles, onError }
    },
    template: `
      <div style="max-width:448px;">
        <FileUpload v-bind="args" @files="onFiles" @error="onError" />
      </div>
    `,
  }),
}

export const ImageOnly: Story = {
  name: 'Image Only',
  render: () => ({
    components: { FileUpload },
    setup() {
      function onFiles(files: File[]) {
        console.log('Images:', files)
      }
      function onError(msg: string) {
        console.error(msg)
      }
      return { onFiles, onError }
    },
    template: `
      <div style="max-width:448px;">
        <FileUpload accept="image/*" multiple @files="onFiles" @error="onError" />
      </div>
    `,
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { FileUpload },
    setup() {
      function onFiles(files: File[]) {
        console.log('Files:', files)
      }
      function onError(msg: string) {
        console.error(msg)
      }
      return { onFiles, onError }
    },
    template: `
      <div style="max-width:448px;">
        <FileUpload multiple :max-files="3" @files="onFiles" @error="onError" />
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:8px;">Up to 3 files</p>
      </div>
    `,
  }),
}

export const WithPreviews: Story = {
  name: 'With Previews',
  render: () => ({
    components: { FileUpload },
    setup() {
      function onFiles(files: File[]) {
        console.log('Files:', files)
      }
      function onError(msg: string) {
        console.error(msg)
      }
      return { onFiles, onError }
    },
    template: `
      <div style="max-width:448px;">
        <FileUpload accept="image/*" multiple previews @files="onFiles" @error="onError" />
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:8px;">Select images to see thumbnails</p>
      </div>
    `,
  }),
}

export const DragActive: Story = {
  name: 'Drag Active (visual reference)',
  render: () => ({
    components: { FileUpload },
    template: `
      <div style="max-width:448px;">
        <p style="font-size:14px;color:var(--color-text-secondary);margin-bottom:12px;">
          Drag a file over the dropzone to see the active highlight state.
        </p>
        <FileUpload accept="image/*" />
      </div>
    `,
  }),
}

export const MaxSize: Story = {
  name: 'Max Size',
  render: () => ({
    components: { FileUpload },
    setup() {
      function onFiles(files: File[]) {
        console.log('Files:', files)
      }
      function onError(msg: string) {
        alert(msg)
      }
      return { onFiles, onError }
    },
    template: `
      <div style="max-width:448px;">
        <FileUpload
          accept="image/*,.pdf"
          :max-size="1048576"
          multiple
          @files="onFiles"
          @error="onError"
        />
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:8px;">
          Max 1MB per file — errors will show as alerts
        </p>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <div style="max-width:448px;">
        <FileUpload disabled accept="image/*" />
      </div>
    `,
  }),
}
