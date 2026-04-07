import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import { userEvent, within, expect } from 'storybook/test'
import Accordion from './Accordion.vue'
import AccordionItem from './AccordionItem.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    single: string
    multiple: string
  }
  single: Array<{
    value: string
    title: string
    body: string
    subtitle?: string
  }>
  multiple: Array<{
    value: string
    title: string
    body: string
    disabled?: boolean
  }>
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      single: 'Single',
      multiple: 'Multiple',
    },
    single: [
      {
        value: 'item-1',
        title: 'What is this design system?',
        body: 'This is a comprehensive Vue 3 component library built with a premium, clean aesthetic inspired by Apple, Notion, and Airbnb. Every molecule is composed from atoms.',
      },
      {
        value: 'item-2',
        title: 'How do I install it?',
        body: 'Clone the repository and run npm install. The Storybook documentation will be available at your local development server.',
      },
      {
        value: 'item-3',
        title: 'Can I customize the theme?',
        body: 'Yes. All visual properties use CSS custom properties (design tokens). Override them in your root stylesheet to match your brand.',
      },
      {
        value: 'item-4',
        title: 'Is it accessible?',
        body: 'All components follow WAI-ARIA best practices with proper roles, keyboard navigation, and screen reader support.',
        subtitle: 'WCAG 2.1 compliance',
      },
    ],
    multiple: [
      {
        value: 'item-1',
        title: 'Account Settings',
        body: 'Manage your profile, email preferences, and security settings.',
      },
      {
        value: 'item-2',
        title: 'Billing & Plans',
        body: 'View your current plan, update payment methods, and download invoices.',
      },
      {
        value: 'item-3',
        title: 'Notifications',
        body: 'Customize which notifications you receive via email, push, or SMS.',
      },
      {
        value: 'item-4',
        title: 'Integrations',
        body: 'Connect third-party services (coming soon).',
        disabled: true,
      },
    ],
  },
  id: {
    storyNames: {
      single: 'Tunggal',
      multiple: 'Banyak',
    },
    single: [
      {
        value: 'item-1',
        title: 'Apa itu design system ini?',
        body: 'Ini adalah pustaka komponen Vue 3 yang lengkap dengan estetika premium dan bersih, terinspirasi dari Apple, Notion, dan Airbnb. Setiap molecule tersusun dari atom.',
      },
      {
        value: 'item-2',
        title: 'Bagaimana cara memasangnya?',
        body: 'Klon repositori ini lalu jalankan npm install. Dokumentasi Storybook akan tersedia di server pengembangan lokal Anda.',
      },
      {
        value: 'item-3',
        title: 'Bisakah temanya dikustomisasi?',
        body: 'Bisa. Semua properti visual menggunakan CSS custom properties (design tokens). Timpa di stylesheet root Anda agar sesuai dengan brand.',
      },
      {
        value: 'item-4',
        title: 'Apakah aksesibel?',
        body: 'Semua komponen mengikuti praktik terbaik WAI-ARIA dengan peran yang tepat, navigasi keyboard, dan dukungan screen reader.',
        subtitle: 'Kepatuhan WCAG 2.1',
      },
    ],
    multiple: [
      {
        value: 'item-1',
        title: 'Pengaturan Akun',
        body: 'Kelola profil, preferensi email, dan pengaturan keamanan Anda.',
      },
      {
        value: 'item-2',
        title: 'Penagihan & Paket',
        body: 'Lihat paket saat ini, perbarui metode pembayaran, dan unduh faktur.',
      },
      {
        value: 'item-3',
        title: 'Notifikasi',
        body: 'Atur notifikasi yang Anda terima lewat email, push, atau SMS.',
      },
      {
        value: 'item-4',
        title: 'Integrasi',
        body: 'Hubungkan layanan pihak ketiga (segera hadir).',
        disabled: true,
      },
    ],
  },
  zh: {
    storyNames: {
      single: '单项',
      multiple: '多项',
    },
    single: [
      {
        value: 'item-1',
        title: '这个设计系统是什么？',
        body: '这是一个完整的 Vue 3 组件库，采用高级且简洁的视觉风格，灵感来自 Apple、Notion 和 Airbnb。每个分子组件都由原子组件组合而成。',
      },
      {
        value: 'item-2',
        title: '如何安装？',
        body: '克隆仓库后运行 npm install。Storybook 文档会在本地开发服务器中可用。',
      },
      {
        value: 'item-3',
        title: '可以自定义主题吗？',
        body: '可以。所有视觉属性都使用 CSS 自定义属性（设计令牌）。在根样式表中覆盖它们以匹配你的品牌。',
      },
      {
        value: 'item-4',
        title: '它是否无障碍？',
        body: '所有组件都遵循 WAI-ARIA 最佳实践，具备正确的角色、键盘导航和屏幕阅读器支持。',
        subtitle: '符合 WCAG 2.1',
      },
    ],
    multiple: [
      {
        value: 'item-1',
        title: '账号设置',
        body: '管理你的个人资料、邮箱偏好和安全设置。',
      },
      {
        value: 'item-2',
        title: '账单与方案',
        body: '查看当前方案、更新付款方式并下载发票。',
      },
      {
        value: 'item-3',
        title: '通知',
        body: '自定义你通过电子邮件、推送或短信接收的通知。',
      },
      {
        value: 'item-4',
        title: '集成',
        body: '连接第三方服务（即将推出）。',
        disabled: true,
      },
    ],
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const canvas = () => ({
  template: `
    <div class="accordion-story-shell" style="
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

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Single: Story = {
  get name() {
    return getStoryName('single')
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // item-1 starts open (default-open), item-2 starts closed
    const buttons = canvas.getAllByRole('button')
    const firstBtn = buttons[0]
    const secondBtn = buttons[1]

    // First item is open by default
    await expect(firstBtn).toHaveAttribute('aria-expanded', 'true')

    // Click second accordion item to open it (single mode closes first)
    await userEvent.click(secondBtn)
    await expect(secondBtn).toHaveAttribute('aria-expanded', 'true')

    // Click second item again to collapse it
    await userEvent.click(secondBtn)
    await expect(secondBtn).toHaveAttribute('aria-expanded', 'false')
  },
  render: () => ({
    components: { Accordion, AccordionItem },
    setup() {
      return { copy: useCopy() }
    },
    template: `
      <div style="width:100%;max-width:480px;">
        <Accordion type="single" :default-open="['item-1']">
          <AccordionItem v-for="item in copy.single" :key="item.value" :value="item.value" :title="item.title" :subtitle="item.subtitle">
            {{ item.body }}
          </AccordionItem>
        </Accordion>
      </div>
    `,
  }),
}

export const Multiple: Story = {
  get name() {
    return getStoryName('multiple')
  },
  render: () => ({
    components: { Accordion, AccordionItem },
    setup() {
      return { copy: useCopy() }
    },
    template: `
      <div style="width:100%;max-width:480px;">
        <Accordion type="multiple" :default-open="['item-1', 'item-3']">
          <AccordionItem
            v-for="item in copy.multiple"
            :key="item.value"
            :value="item.value"
            :title="item.title"
            :disabled="item.disabled"
          >
            {{ item.body }}
          </AccordionItem>
        </Accordion>
      </div>
    `,
  }),
}
