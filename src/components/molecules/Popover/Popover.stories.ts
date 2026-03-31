import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import Popover from './Popover.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Input from '@/components/atoms/Input/Input.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allPlacements: string
    withForm: string
    clickTrigger: string
    hoverTrigger: string
  }
  default: {
    trigger: string
    title: string
    body: string
  }
  placements: Record<'top' | 'bottom' | 'left' | 'right', { trigger: string; body: string }>
  form: {
    trigger: string
    title: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    submit: string
  }
  clickTrigger: {
    trigger: string
    title: string
    body: string
  }
  hoverTrigger: {
    trigger: string
    title: string
    body: string
    link: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allPlacements: 'All Placements',
      withForm: 'With Form',
      clickTrigger: 'Click Trigger',
      hoverTrigger: 'Hover Trigger',
    },
    default: {
      trigger: 'Click me',
      title: 'Popover content',
      body: 'This is interactive content inside a popover.',
    },
    placements: {
      top: { trigger: 'Top', body: 'Top placement' },
      bottom: { trigger: 'Bottom', body: 'Bottom placement' },
      left: { trigger: 'Left', body: 'Left placement' },
      right: { trigger: 'Right', body: 'Right placement' },
    },
    form: {
      trigger: 'Edit',
      title: 'Edit',
      nameLabel: 'Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'john@example.com',
      submit: 'Save',
    },
    clickTrigger: {
      trigger: 'Click to toggle',
      title: 'Click-triggered',
      body: 'Click the button again or outside to close.',
    },
    hoverTrigger: {
      trigger: 'Hover me',
      title: 'Hover-triggered',
      body: 'Move your mouse away to close. You can interact with this content.',
      link: 'Learn more',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allPlacements: 'Semua Posisi',
      withForm: 'Dengan Form',
      clickTrigger: 'Pemicu Klik',
      hoverTrigger: 'Pemicu Hover',
    },
    default: {
      trigger: 'Klik saya',
      title: 'Konten popover',
      body: 'Ini adalah konten interaktif di dalam popover.',
    },
    placements: {
      top: { trigger: 'Atas', body: 'Posisi atas' },
      bottom: { trigger: 'Bawah', body: 'Posisi bawah' },
      left: { trigger: 'Kiri', body: 'Posisi kiri' },
      right: { trigger: 'Kanan', body: 'Posisi kanan' },
    },
    form: {
      trigger: 'Edit',
      title: 'Edit',
      nameLabel: 'Nama',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'john@example.com',
      submit: 'Simpan',
    },
    clickTrigger: {
      trigger: 'Klik untuk beralih',
      title: 'Dipicu klik',
      body: 'Klik tombol lagi atau klik di luar untuk menutup.',
    },
    hoverTrigger: {
      trigger: 'Arahkan ke saya',
      title: 'Dipicu hover',
      body: 'Arahkan kursor keluar untuk menutup. Konten ini bisa diinteraksikan.',
      link: 'Pelajari lebih lanjut',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      allPlacements: '所有位置',
      withForm: '带表单',
      clickTrigger: '点击触发',
      hoverTrigger: '悬停触发',
    },
    default: {
      trigger: '点击我',
      title: '弹出层内容',
      body: '这是弹出层中的交互内容。',
    },
    placements: {
      top: { trigger: '顶部', body: '顶部位置' },
      bottom: { trigger: '底部', body: '底部位置' },
      left: { trigger: '左侧', body: '左侧位置' },
      right: { trigger: '右侧', body: '右侧位置' },
    },
    form: {
      trigger: '编辑',
      title: '编辑',
      nameLabel: '姓名',
      namePlaceholder: 'John Doe',
      emailLabel: '邮箱',
      emailPlaceholder: 'john@example.com',
      submit: '保存',
    },
    clickTrigger: {
      trigger: '点击切换',
      title: '点击触发',
      body: '再次点击按钮或点击外部即可关闭。',
    },
    hoverTrigger: {
      trigger: '悬停我',
      title: '悬停触发',
      body: '移开鼠标即可关闭。你也可以与此内容交互。',
      link: '了解更多',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

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

const meta: Meta<typeof Popover> = {
  title: 'Molecules/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    trigger:             { control: 'select', options: ['click', 'hover', 'manual'] },
    placement:           { control: 'select', options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'] },
    width:               { control: 'text' },
    arrow:               { control: 'boolean' },
    closeOnClickOutside: { control: 'boolean' },
  },
  args: {
    trigger:             'click',
    placement:           'bottom',
    width:               'auto',
    arrow:               true,
    closeOnClickOutside: true,
  },
}
export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Popover, Button },
    setup: () => ({ args, copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover v-bind="args">
          <template #trigger>
            <Button variant="secondary">{{ copy.default.trigger }}</Button>
          </template>
          <template #title>{{ copy.default.title }}</template>
          <div style="font-size:14px;color:var(--color-text-secondary);line-height:1.5;">{{ copy.default.body }}</div>
        </Popover>
      </div>
    `,
  }),
}

export const AllPlacements: Story = {
  get name() {
    return getStoryName('allPlacements')
  },
  render: () => ({
    components: { Popover, Button },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;padding:96px;place-items:center;min-height:500px;">
        <div />
        <Popover placement="top" trigger="click">
          <template #trigger><Button variant="secondary" size="sm">{{ copy.placements.top.trigger }}</Button></template>
          <div style="font-size:13px;color:var(--color-text-secondary);white-space:nowrap;">{{ copy.placements.top.body }}</div>
        </Popover>
        <div />

        <Popover placement="left" trigger="click">
          <template #trigger><Button variant="secondary" size="sm">{{ copy.placements.left.trigger }}</Button></template>
          <div style="font-size:13px;color:var(--color-text-secondary);white-space:nowrap;">{{ copy.placements.left.body }}</div>
        </Popover>
        <div />
        <Popover placement="right" trigger="click">
          <template #trigger><Button variant="secondary" size="sm">{{ copy.placements.right.trigger }}</Button></template>
          <div style="font-size:13px;color:var(--color-text-secondary);white-space:nowrap;">{{ copy.placements.right.body }}</div>
        </Popover>

        <div />
        <Popover placement="bottom" trigger="click">
          <template #trigger><Button variant="secondary" size="sm">{{ copy.placements.bottom.trigger }}</Button></template>
          <div style="font-size:13px;color:var(--color-text-secondary);white-space:nowrap;">{{ copy.placements.bottom.body }}</div>
        </Popover>
        <div />
      </div>
    `,
  }),
}

export const WithForm: Story = {
  get name() {
    return getStoryName('withForm')
  },
  render: () => ({
    components: { Popover, Button, Input },
    setup() {
      const name = ref('')
      const email = ref('')
      function handleSubmit() {
        console.log('Submitted:', { name: name.value, email: email.value })
      }
      return { name, email, handleSubmit }
    },
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover placement="bottom-start" width="280px">
          <template #trigger>
            <Button>{{ copy.form.trigger }}</Button>
          </template>
          <template #title>{{ copy.form.title }}</template>
          <form @submit.prevent="handleSubmit" style="display:flex;flex-direction:column;gap:12px;">
            <Input v-model="name" :label="copy.form.nameLabel" :placeholder="copy.form.namePlaceholder" size="sm" />
            <Input v-model="email" :label="copy.form.emailLabel" type="email" :placeholder="copy.form.emailPlaceholder" size="sm" />
          </form>
          <template #footer>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button type="submit" size="sm" @click="handleSubmit">{{ copy.form.submit }}</Button>
          </template>
        </Popover>
      </div>
    `,
  }),
}

export const ClickTrigger: Story = {
  get name() {
    return getStoryName('clickTrigger')
  },
  render: () => ({
    components: { Popover, Button },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover trigger="click" placement="bottom">
          <template #trigger>
            <Button variant="secondary">{{ copy.clickTrigger.trigger }}</Button>
          </template>
          <template #title>{{ copy.clickTrigger.title }}</template>
          <div style="font-size:14px;color:var(--color-text-secondary);line-height:1.5;">{{ copy.clickTrigger.body }}</div>
        </Popover>
      </div>
    `,
  }),
}

export const HoverTrigger: Story = {
  get name() {
    return getStoryName('hoverTrigger')
  },
  render: () => ({
    components: { Popover, Button },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover trigger="hover" placement="bottom">
          <template #trigger>
            <Button variant="secondary">{{ copy.hoverTrigger.trigger }}</Button>
          </template>
          <template #title>{{ copy.hoverTrigger.title }}</template>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;color:var(--color-text-secondary);line-height:1.5;">
            <span>{{ copy.hoverTrigger.body }}</span>
            <a href="#" style="color:var(--color-primary);font-weight:500;text-decoration:none;">{{ copy.hoverTrigger.link }}</a>
          </div>
        </Popover>
      </div>
    `,
  }),
}

export const Confirmation: Story = {
  get name() {
    return 'Confirmation'
  },
  render: () => ({
    components: { Popover, Button },
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover placement="top" width="280px">
          <template #trigger>
            <Button variant="danger">Delete Data</Button>
          </template>
          <template #title>Are you absolutely sure?</template>
          <div style="font-size:14px;color:var(--color-text-secondary);line-height:1.5;">
            This action cannot be undone. This will permanently delete your file and data.
          </div>
          <template #footer>
            <div style="display:flex;gap:8px;width:100%;">
              <Button variant="ghost" size="sm" style="flex:1;">Cancel</Button>
              <Button variant="danger" size="sm" style="flex:1;">Delete</Button>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
}
