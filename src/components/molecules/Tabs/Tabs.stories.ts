import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import { RiHomeLine, RiUserLine, RiSettings4Line, RiBellLine } from '@remixicon/vue'
import Tabs from './Tabs.vue'
import TabsList from './TabsList.vue'
import TabsTrigger from './TabsTrigger.vue'
import TabsContent from './TabsContent.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allVariants: string
    allSizes: string
    vertical: string
    withIcons: string
    withDisabledTab: string
  }
  default: {
    tabs: Record<'tab1' | 'tab2' | 'tab3' | 'tab4', string>
    panels: Record<'tab1' | 'tab2' | 'tab3', string>
  }
  variants: Record<'line' | 'pill' | 'boxed', {
    label: string
    tabs: Record<'a' | 'b' | 'c', string>
    panels: Record<'a' | 'b' | 'c', string>
  }>
  sizes: Record<'sm' | 'md' | 'lg', {
    label: string
    tabs: Record<'a' | 'b' | 'c', string>
  }>
  vertical: {
    tabs: Record<'profile' | 'notifications' | 'security' | 'billing', string>
    panels: Record<'profile' | 'notifications' | 'security' | 'billing', { title: string; body: string }>
  }
  withIcons: {
    tabs: Record<'home' | 'profile' | 'notifications' | 'settings', string>
    panels: Record<'home' | 'profile' | 'notifications' | 'settings', string>
  }
  withDisabledTab: {
    tabs: Record<'active1' | 'active2' | 'disabled' | 'active3', string>
    panels: Record<'active1' | 'active2' | 'active3', string>
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allVariants: 'All Variants',
      allSizes: 'All Sizes',
      vertical: 'Vertical',
      withIcons: 'With Icons',
      withDisabledTab: 'With Disabled Tab',
    },
    default: {
      tabs: {
        tab1: 'Overview',
        tab2: 'Details',
        tab3: 'Settings',
        tab4: 'Disabled',
      },
      panels: {
        tab1: 'Overview content goes here. This is the first tab panel.',
        tab2: 'Details content goes here. This is the second tab panel.',
        tab3: 'Settings content goes here. This is the third tab panel.',
      },
    },
    variants: {
      line: {
        label: 'Line',
        tabs: { a: 'Dashboard', b: 'Analytics', c: 'Reports' },
        panels: { a: 'Dashboard panel', b: 'Analytics panel', c: 'Reports panel' },
      },
      pill: {
        label: 'Pill',
        tabs: { a: 'Dashboard', b: 'Analytics', c: 'Reports' },
        panels: { a: 'Dashboard panel', b: 'Analytics panel', c: 'Reports panel' },
      },
      boxed: {
        label: 'Boxed',
        tabs: { a: 'Dashboard', b: 'Analytics', c: 'Reports' },
        panels: { a: 'Dashboard panel', b: 'Analytics panel', c: 'Reports panel' },
      },
    },
    sizes: {
      sm: { label: 'Small', tabs: { a: 'Home', b: 'Profile', c: 'Settings' } },
      md: { label: 'Medium (default)', tabs: { a: 'Home', b: 'Profile', c: 'Settings' } },
      lg: { label: 'Large', tabs: { a: 'Home', b: 'Profile', c: 'Settings' } },
    },
    vertical: {
      tabs: {
        profile: 'Profile',
        notifications: 'Notifications',
        security: 'Security',
        billing: 'Billing',
      },
      panels: {
        profile: { title: 'Profile Settings', body: 'Manage your profile information and preferences.' },
        notifications: { title: 'Notifications', body: 'Configure how and when you receive notifications.' },
        security: { title: 'Security', body: 'Manage passwords, two-factor authentication, and sessions.' },
        billing: { title: 'Billing', body: 'View invoices and manage your payment methods.' },
      },
    },
    withIcons: {
      tabs: {
        home: 'Home',
        profile: 'Profile',
        notifications: 'Notifications',
        settings: 'Settings',
      },
      panels: {
        home: 'Home content',
        profile: 'Profile content',
        notifications: 'Notifications content',
        settings: 'Settings content',
      },
    },
    withDisabledTab: {
      tabs: {
        active1: 'Active Tab',
        active2: 'Another Tab',
        disabled: 'Disabled',
        active3: 'Last Tab',
      },
      panels: {
        active1: 'First tab content',
        active2: 'Second tab content',
        active3: 'Third tab content',
      },
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allVariants: 'Semua Varian',
      allSizes: 'Semua Ukuran',
      vertical: 'Vertikal',
      withIcons: 'Dengan Ikon',
      withDisabledTab: 'Dengan Tab Nonaktif',
    },
    default: {
      tabs: {
        tab1: 'Ringkasan',
        tab2: 'Detail',
        tab3: 'Pengaturan',
        tab4: 'Nonaktif',
      },
      panels: {
        tab1: 'Konten ringkasan ditampilkan di sini. Ini adalah panel tab pertama.',
        tab2: 'Konten detail ditampilkan di sini. Ini adalah panel tab kedua.',
        tab3: 'Konten pengaturan ditampilkan di sini. Ini adalah panel tab ketiga.',
      },
    },
    variants: {
      line: {
        label: 'Garis',
        tabs: { a: 'Dasbor', b: 'Analitik', c: 'Laporan' },
        panels: { a: 'Panel dasbor', b: 'Panel analitik', c: 'Panel laporan' },
      },
      pill: {
        label: 'Pil',
        tabs: { a: 'Dasbor', b: 'Analitik', c: 'Laporan' },
        panels: { a: 'Panel dasbor', b: 'Panel analitik', c: 'Panel laporan' },
      },
      boxed: {
        label: 'Kotak',
        tabs: { a: 'Dasbor', b: 'Analitik', c: 'Laporan' },
        panels: { a: 'Panel dasbor', b: 'Panel analitik', c: 'Panel laporan' },
      },
    },
    sizes: {
      sm: { label: 'Kecil', tabs: { a: 'Beranda', b: 'Profil', c: 'Pengaturan' } },
      md: { label: 'Sedang (default)', tabs: { a: 'Beranda', b: 'Profil', c: 'Pengaturan' } },
      lg: { label: 'Besar', tabs: { a: 'Beranda', b: 'Profil', c: 'Pengaturan' } },
    },
    vertical: {
      tabs: {
        profile: 'Profil',
        notifications: 'Notifikasi',
        security: 'Keamanan',
        billing: 'Penagihan',
      },
      panels: {
        profile: { title: 'Pengaturan Profil', body: 'Kelola informasi dan preferensi profil Anda.' },
        notifications: { title: 'Notifikasi', body: 'Atur bagaimana dan kapan Anda menerima notifikasi.' },
        security: { title: 'Keamanan', body: 'Kelola kata sandi, autentikasi dua faktor, dan sesi.' },
        billing: { title: 'Penagihan', body: 'Lihat tagihan dan kelola metode pembayaran Anda.' },
      },
    },
    withIcons: {
      tabs: {
        home: 'Beranda',
        profile: 'Profil',
        notifications: 'Notifikasi',
        settings: 'Pengaturan',
      },
      panels: {
        home: 'Konten beranda',
        profile: 'Konten profil',
        notifications: 'Konten notifikasi',
        settings: 'Konten pengaturan',
      },
    },
    withDisabledTab: {
      tabs: {
        active1: 'Tab Aktif',
        active2: 'Tab Lainnya',
        disabled: 'Nonaktif',
        active3: 'Tab Terakhir',
      },
      panels: {
        active1: 'Konten tab pertama',
        active2: 'Konten tab kedua',
        active3: 'Konten tab ketiga',
      },
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      allVariants: '所有变体',
      allSizes: '所有尺寸',
      vertical: '垂直',
      withIcons: '带图标',
      withDisabledTab: '带禁用标签',
    },
    default: {
      tabs: {
        tab1: '概览',
        tab2: '详情',
        tab3: '设置',
        tab4: '禁用',
      },
      panels: {
        tab1: '概览内容显示在这里。这是第一个标签页。',
        tab2: '详情内容显示在这里。这是第二个标签页。',
        tab3: '设置内容显示在这里。这是第三个标签页。',
      },
    },
    variants: {
      line: {
        label: '线型',
        tabs: { a: '仪表盘', b: '分析', c: '报告' },
        panels: { a: '仪表盘面板', b: '分析面板', c: '报告面板' },
      },
      pill: {
        label: '胶囊',
        tabs: { a: '仪表盘', b: '分析', c: '报告' },
        panels: { a: '仪表盘面板', b: '分析面板', c: '报告面板' },
      },
      boxed: {
        label: '盒式',
        tabs: { a: '仪表盘', b: '分析', c: '报告' },
        panels: { a: '仪表盘面板', b: '分析面板', c: '报告面板' },
      },
    },
    sizes: {
      sm: { label: '小', tabs: { a: '首页', b: '资料', c: '设置' } },
      md: { label: '中（默认）', tabs: { a: '首页', b: '资料', c: '设置' } },
      lg: { label: '大', tabs: { a: '首页', b: '资料', c: '设置' } },
    },
    vertical: {
      tabs: {
        profile: '资料',
        notifications: '通知',
        security: '安全',
        billing: '账单',
      },
      panels: {
        profile: { title: '资料设置', body: '管理你的资料信息和偏好。' },
        notifications: { title: '通知', body: '配置你接收通知的方式和时间。' },
        security: { title: '安全', body: '管理密码、双重验证和会话。' },
        billing: { title: '账单', body: '查看发票并管理你的支付方式。' },
      },
    },
    withIcons: {
      tabs: {
        home: '首页',
        profile: '资料',
        notifications: '通知',
        settings: '设置',
      },
      panels: {
        home: '首页内容',
        profile: '资料内容',
        notifications: '通知内容',
        settings: '设置内容',
      },
    },
    withDisabledTab: {
      tabs: {
        active1: '活动标签',
        active2: '另一个标签',
        disabled: '禁用',
        active3: '最后一个标签',
      },
      panels: {
        active1: '第一个标签内容',
        active2: '第二个标签内容',
        active3: '第三个标签内容',
      },
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

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant:     { control: 'select', options: ['line', 'pill', 'boxed'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    modelValue:  'tab1',
    variant:     'line',
    orientation: 'horizontal',
    size:        'md',
  },
}
export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    setup() {
      const active = ref(args.modelValue ?? 'tab1')
      return { args, active, copy: useCopy() }
    },
    template: `
      <Tabs v-bind="args" v-model="active">
        <TabsList>
          <TabsTrigger value="tab1">{{ copy.default.tabs.tab1 }}</TabsTrigger>
          <TabsTrigger value="tab2">{{ copy.default.tabs.tab2 }}</TabsTrigger>
          <TabsTrigger value="tab3">{{ copy.default.tabs.tab3 }}</TabsTrigger>
          <TabsTrigger value="tab4" disabled>{{ copy.default.tabs.tab4 }}</TabsTrigger>
        </TabsList>
        <div style="padding-top:16px;">
          <TabsContent value="tab1">
            <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.default.panels.tab1 }}</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.default.panels.tab2 }}</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.default.panels.tab3 }}</p>
          </TabsContent>
        </div>
      </Tabs>
    `,
  }),
}

export const AllVariants: Story = {
  get name() {
    return getStoryName('allVariants')
  },
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    setup() {
      const models = ref({ line: 'a', pill: 'a', boxed: 'a' })
      const variants = ['line', 'pill', 'boxed'] as const
      return { models, variants, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:40px;padding:16px;max-width:600px;width:100%;">
        <div v-for="variant in variants" :key="variant">
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:12px;">{{ copy.variants[variant].label }}</p>
          <Tabs :variant="variant" v-model="models[variant]">
            <TabsList>
              <TabsTrigger value="a">{{ copy.variants[variant].tabs.a }}</TabsTrigger>
              <TabsTrigger value="b">{{ copy.variants[variant].tabs.b }}</TabsTrigger>
              <TabsTrigger value="c">{{ copy.variants[variant].tabs.c }}</TabsTrigger>
            </TabsList>
            <div style="padding-top:16px;">
              <TabsContent value="a"><p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.variants[variant].panels.a }}</p></TabsContent>
              <TabsContent value="b"><p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.variants[variant].panels.b }}</p></TabsContent>
              <TabsContent value="c"><p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.variants[variant].panels.c }}</p></TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    setup() {
      const models = ref({ sm: 'a', md: 'a', lg: 'a' })
      const sizes = ['sm', 'md', 'lg'] as const
      return { models, sizes, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:16px;max-width:500px;width:100%;">
        <div v-for="size in sizes" :key="size">
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:12px;">{{ copy.sizes[size].label }}</p>
          <Tabs variant="pill" :size="size" v-model="models[size]">
            <TabsList>
              <TabsTrigger value="a">{{ copy.sizes[size].tabs.a }}</TabsTrigger>
              <TabsTrigger value="b">{{ copy.sizes[size].tabs.b }}</TabsTrigger>
              <TabsTrigger value="c">{{ copy.sizes[size].tabs.c }}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  get name() {
    return getStoryName('vertical')
  },
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    setup() {
      const active = ref('profile')
      return { active, copy: useCopy() }
    },
    template: `
      <Tabs variant="line" orientation="vertical" v-model="active" style="max-width:500px;">
        <TabsList>
          <TabsTrigger value="profile">{{ copy.vertical.tabs.profile }}</TabsTrigger>
          <TabsTrigger value="notifications">{{ copy.vertical.tabs.notifications }}</TabsTrigger>
          <TabsTrigger value="security">{{ copy.vertical.tabs.security }}</TabsTrigger>
          <TabsTrigger value="billing">{{ copy.vertical.tabs.billing }}</TabsTrigger>
        </TabsList>
        <div style="flex:1;padding-left:16px;">
          <TabsContent value="profile">
            <h3 style="font-weight:600;color:var(--color-text-heading);margin-bottom:8px;">{{ copy.vertical.panels.profile.title }}</h3>
            <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.vertical.panels.profile.body }}</p>
          </TabsContent>
          <TabsContent value="notifications">
            <h3 style="font-weight:600;color:var(--color-text-heading);margin-bottom:8px;">{{ copy.vertical.panels.notifications.title }}</h3>
            <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.vertical.panels.notifications.body }}</p>
          </TabsContent>
          <TabsContent value="security">
            <h3 style="font-weight:600;color:var(--color-text-heading);margin-bottom:8px;">{{ copy.vertical.panels.security.title }}</h3>
            <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.vertical.panels.security.body }}</p>
          </TabsContent>
          <TabsContent value="billing">
            <h3 style="font-weight:600;color:var(--color-text-heading);margin-bottom:8px;">{{ copy.vertical.panels.billing.title }}</h3>
            <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.vertical.panels.billing.body }}</p>
          </TabsContent>
        </div>
      </Tabs>
    `,
  }),
}

export const WithIcons: Story = {
  get name() {
    return getStoryName('withIcons')
  },
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent, RiHomeLine, RiUserLine, RiSettings4Line, RiBellLine },
    setup() {
      const active = ref('home')
      return { active, copy: useCopy() }
    },
    template: `
      <Tabs variant="pill" v-model="active" style="max-width:500px;">
        <TabsList>
          <TabsTrigger value="home">
            <RiHomeLine :size="14" />
            {{ copy.withIcons.tabs.home }}
          </TabsTrigger>
          <TabsTrigger value="profile">
            <RiUserLine :size="14" />
            {{ copy.withIcons.tabs.profile }}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <RiBellLine :size="14" />
            {{ copy.withIcons.tabs.notifications }}
          </TabsTrigger>
          <TabsTrigger value="settings">
            <RiSettings4Line :size="14" />
            {{ copy.withIcons.tabs.settings }}
          </TabsTrigger>
        </TabsList>
        <div style="padding-top:16px;">
          <TabsContent value="home"><p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.withIcons.panels.home }}</p></TabsContent>
          <TabsContent value="profile"><p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.withIcons.panels.profile }}</p></TabsContent>
          <TabsContent value="notifications"><p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.withIcons.panels.notifications }}</p></TabsContent>
          <TabsContent value="settings"><p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.withIcons.panels.settings }}</p></TabsContent>
        </div>
      </Tabs>
    `,
  }),
}

export const WithDisabledTab: Story = {
  get name() {
    return getStoryName('withDisabledTab')
  },
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    setup() {
      const active = ref('active1')
      return { active, copy: useCopy() }
    },
    template: `
      <Tabs variant="line" v-model="active" style="max-width:500px;">
        <TabsList>
          <TabsTrigger value="active1">{{ copy.withDisabledTab.tabs.active1 }}</TabsTrigger>
          <TabsTrigger value="active2">{{ copy.withDisabledTab.tabs.active2 }}</TabsTrigger>
          <TabsTrigger value="disabled" disabled>{{ copy.withDisabledTab.tabs.disabled }}</TabsTrigger>
          <TabsTrigger value="active3">{{ copy.withDisabledTab.tabs.active3 }}</TabsTrigger>
        </TabsList>
        <div style="padding-top:16px;">
          <TabsContent value="active1"><p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.withDisabledTab.panels.active1 }}</p></TabsContent>
          <TabsContent value="active2"><p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.withDisabledTab.panels.active2 }}</p></TabsContent>
          <TabsContent value="active3"><p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.withDisabledTab.panels.active3 }}</p></TabsContent>
        </div>
      </Tabs>
    `,
  }),
}
