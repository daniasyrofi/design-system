import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Textarea from './Textarea.vue'

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    modelValue:  { control: 'text' },
    size:        { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    helperText:  { control: 'text' },
    error:       { control: 'text' },
    disabled:    { control: 'boolean' },
    readonly:    { control: 'boolean' },
    autoResize:  { control: 'boolean' },
    counter:     { control: 'boolean' },
    rows:        { control: 'number' },
    maxlength:   { control: 'number' },
  },
  args: {
    modelValue:  '',
    size:        'md',
    autoResize:  true,
    disabled:    false,
    readonly:    false,
    counter:     false,
  },
  decorators: [
    () => ({ template: '<div style="width:360px;"><story /></div>' }),
  ],
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: (args: any) => ({
    components: { Textarea },
    setup() {
      const val = ref(args.modelValue ?? '')
      return { args, val }
    },
    template: '<Textarea v-bind="args" v-model="val" label="Message" placeholder="Write your message here…" />',
  }),
}

export const States: Story = {
  render: () => ({
    components: { Textarea },
    setup: () => ({
      normal:   ref(''),
      filled:   ref('This textarea already has some content in it, demonstrating a filled state.'),
      error:    ref('This is too short.'),
      disabled: ref('This cannot be edited.'),
      readonly: ref('This is a read-only field that displays existing content.'),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Textarea v-model="normal"   label="Normal"    placeholder="Type something…" />
        <Textarea v-model="filled"   label="Filled" />
        <Textarea v-model="error"    label="Error"     error="Message must be at least 50 characters." />
        <Textarea v-model="disabled" label="Disabled"  disabled />
        <Textarea v-model="readonly" label="Read-only" readonly helper-text="Cannot be modified." />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Textarea },
    setup: () => ({ sm: ref(''), md: ref(''), lg: ref('') }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Textarea v-model="sm" size="sm" label="Small (sm)"  placeholder="Small textarea" :rows="2" />
        <Textarea v-model="md" size="md" label="Medium (md)" placeholder="Medium textarea" :rows="3" />
        <Textarea v-model="lg" size="lg" label="Large (lg)"  placeholder="Large textarea"  :rows="3" />
      </div>
    `,
  }),
}

export const WithHelperText: Story = {
  name: 'With Helper Text',
  render: () => ({
    components: { Textarea },
    setup: () => ({ val: ref('') }),
    template: `
      <Textarea
        v-model="val"
        label="Description"
        placeholder="Describe your project…"
        helper-text="Be as detailed as possible. This will be shown to all collaborators."
      />
    `,
  }),
}

export const WithCounter: Story = {
  name: 'With Counter',
  render: () => ({
    components: { Textarea },
    setup: () => ({ bio: ref(''), tweet: ref('') }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Textarea v-model="bio"   label="Bio"   :maxlength="160" counter placeholder="Tell us about yourself…" />
        <Textarea v-model="tweet" label="Tweet" :maxlength="280" counter placeholder="What's happening?" :rows="4" />
      </div>
    `,
  }),
}

export const AutoResize: Story = {
  name: 'Auto Resize',
  render: () => ({
    components: { Textarea },
    setup: () => ({ val: ref('') }),
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <Textarea
          v-model="val"
          label="Auto Resize"
          placeholder="Type more to watch it grow…"
          :auto-resize="true"
          :rows="2"
          helper-text="Height expands automatically as you type."
        />
      </div>
    `,
  }),
}

export const FixedHeight: Story = {
  name: 'Fixed Height',
  render: () => ({
    components: { Textarea },
    setup: () => ({ val: ref('') }),
    template: `
      <Textarea
        v-model="val"
        label="Fixed Height (scroll)"
        placeholder="Type a lot…"
        :auto-resize="false"
        :rows="4"
        :max-rows="4"
        resize="none"
        helper-text="Fixed height — scrolls internally."
      />
    `,
  }),
}

export const FormExample: Story = {
  name: 'Feedback Form',
  decorators: [
    () => ({ template: '<div style="width:380px;"><story /></div>' }),
  ],
  render: () => ({
    components: { Textarea },
    setup() {
      const subject = ref('')
      const body    = ref('')
      const steps   = ref('')
      return { subject, body, steps }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:14px;">
        <Textarea v-model="subject" label="Subject"               placeholder="Briefly describe the issue" :rows="1" :auto-resize="true" required />
        <Textarea v-model="body"    label="Description"           placeholder="What happened?" :rows="4" :maxlength="500" counter required />
        <Textarea v-model="steps"   label="Steps to reproduce"    placeholder="1. Go to…&#10;2. Click…&#10;3. See error" :rows="3" helper-text="Optional but very helpful." />
      </div>
    `,
  }),
}
