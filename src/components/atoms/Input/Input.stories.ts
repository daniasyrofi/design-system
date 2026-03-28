import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import {
  RiSearchLine, RiMailLine, RiLockLine, RiUser3Line,
  RiPhoneLine, RiCalendarLine,
} from '@remixicon/vue'
import Input from './Input.vue'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    modelValue:  { control: 'text' },
    type:        { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] },
    size:        { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    helperText:  { control: 'text' },
    error:       { control: 'text' },
    disabled:    { control: 'boolean' },
    readonly:    { control: 'boolean' },
    required:    { control: 'boolean' },
    clearable:   { control: 'boolean' },
  },
  args: {
    modelValue: '',
    type:       'text',
    size:       'md',
  },
  decorators: [
    () => ({ template: '<div style="width:320px;"><story /></div>' }),
  ],
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: (args: any) => ({
    components: { Input },
    setup() {
      const val = ref(args.modelValue ?? '')
      return { args, val }
    },
    template: '<Input v-bind="args" v-model="val" label="Label" placeholder="Placeholder…" />',
  }),
}

export const States: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({
      normal:   ref(''),
      filled:   ref('Jane Doe'),
      error:    ref('invalid@'),
      disabled: ref('Disabled value'),
      readonly: ref('sk_live_abc123xyz'),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Input v-model="normal"   label="Normal"   placeholder="Type something…" />
        <Input v-model="filled"   label="Filled" />
        <Input v-model="error"    label="Error"    error="Please enter a valid email." />
        <Input v-model="disabled" label="Disabled" disabled />
        <Input v-model="readonly" label="Read-only" readonly helper-text="This field cannot be edited." />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Input },
    setup: () => ({
      sm: ref(''), md: ref(''), lg: ref(''),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Input v-model="sm" size="sm" label="Small (sm)"   placeholder="Small input" />
        <Input v-model="md" size="md" label="Medium (md)"  placeholder="Medium input" />
        <Input v-model="lg" size="lg" label="Large (lg)"   placeholder="Large input" />
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => ({
    components: { Input, RiSearchLine, RiMailLine, RiCalendarLine },
    setup: () => ({
      search: ref(''),
      email:  ref(''),
      date:   ref(''),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Input v-model="search" label="Search" placeholder="Search…">
          <template #leading><RiSearchLine style="width:16px;height:16px;" /></template>
        </Input>
        <Input v-model="email" label="Email" placeholder="you@example.com" type="email">
          <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
        </Input>
        <Input v-model="date" label="Date" placeholder="Pick a date">
          <template #trailing><RiCalendarLine style="width:16px;height:16px;" /></template>
        </Input>
      </div>
    `,
  }),
}

export const PrefixSuffix: Story = {
  name: 'Prefix & Suffix',
  render: () => ({
    components: { Input },
    setup: () => ({
      website: ref(''),
      domain:  ref(''),
      price:   ref(''),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Input v-model="website" label="Website" placeholder="yoursite">
          <template #prefix>https://</template>
        </Input>
        <Input v-model="domain" label="Domain" placeholder="yoursite">
          <template #suffix>.com</template>
        </Input>
        <Input v-model="price" label="Price" placeholder="0.00" type="number">
          <template #prefix>$</template>
          <template #suffix>USD</template>
        </Input>
      </div>
    `,
  }),
}

export const Features: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({
      clearable: ref('Clear me!'),
      password:  ref('supersecret'),
      counter:   ref(''),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Input v-model="clearable" label="Clearable" clearable />
        <Input v-model="password"  label="Password"  type="password" helper-text="At least 8 characters." />
        <Input v-model="counter"   label="Display name" :maxlength="30" counter placeholder="Your name" />
      </div>
    `,
  }),
}

export const Required: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({
      name:  ref(''),
      email: ref(''),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Input v-model="name"  label="Full name"  required placeholder="John Doe" />
        <Input v-model="email" label="Email"       required type="email" placeholder="you@example.com" />
      </div>
    `,
  }),
}

export const FormExample: Story = {
  name: 'Form Example',
  decorators: [
    () => ({ template: '<div style="width:360px;"><story /></div>' }),
  ],
  render: () => ({
    components: { Input, RiUser3Line, RiMailLine, RiLockLine, RiPhoneLine },
    setup: () => ({
      name:     ref(''),
      email:    ref(''),
      password: ref(''),
      phone:    ref(''),
      website:  ref(''),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:14px;">
        <Input v-model="name"     label="Full name"   required placeholder="John Doe">
          <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
        </Input>
        <Input v-model="email"    label="Email"       required type="email" placeholder="you@example.com">
          <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
        </Input>
        <Input v-model="password" label="Password"    required type="password" placeholder="Min. 8 characters">
          <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
        </Input>
        <Input v-model="phone"    label="Phone"       type="tel" placeholder="+62 812 345 6789">
          <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
        </Input>
        <Input v-model="website"  label="Website"     placeholder="yoursite">
          <template #prefix>https://</template>
          <template #suffix>.com</template>
        </Input>
      </div>
    `,
  }),
}
