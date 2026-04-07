import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, defineComponent, h } from 'vue'
import Card from './Card.vue'
import {
  RiMailSendLine,
  RiGroupLine,
  RiEyeLine,
  RiStarLine,
  RiCalendarEventLine,
  RiUserSmileLine,
  RiPieChartLine,
  RiSettings4Line,
  RiMessage2Line,
  RiNotificationLine,
  RiCheckLine,
  RiArrowRightSLine,
  RiAddLine,
} from '@remixicon/vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allVariants: string
    statsRow: string
    withMedia: string
    featureGrid: string
    activityFeed: string
    profileCard: string
    emptyState: string
    skeleton: string
    hoverable: string
  }
  default: {
    overline: string
    headline: string
    meta: string
    pill: string
  }
  allVariants: {
    variants: Array<{
      variant: 'default' | 'outlined' | 'elevated' | 'flat'
      name: string
      desc: string
    }>
    responses: string
  }
  statsRow: Array<{ label: string }>
  withMedia: {
    cards: Array<{
      title: string
      date: string
      desc: string
      tag: string
      status: string
      cta: string
      preview: string
    }>
  }
  featureGrid: {
    open: string
    items: Array<{ name: string; desc: string }>
  }
  activityFeed: {
    title: string
    subtitle: string
    footer: string
    items: Array<{ text: string; time: string }>
  }
  profileCard: {
    centered: {
      name: string
      role: string
      tags: [string, string]
      projects: string
      followers: string
      following: string
      follow: string
    }
    compact: {
      name: string
      role: string
      view: string
      body: string
      actions: [string, string, string]
    }
  }
  emptyState: {
    title: string
    body: string
    button: string
  }
  hoverable: {
    default: { title: string; body: string }
    elevated: { title: string; body: string }
    outlined: { title: string; body: string }
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allVariants: 'All Variants',
      statsRow: 'Stats Row',
      withMedia: 'With Media',
      featureGrid: 'Feature Grid',
      activityFeed: 'Activity Feed',
      profileCard: 'Profile Card',
      emptyState: 'Empty State',
      skeleton: 'Skeleton / Loading',
      hoverable: 'Hoverable & Elevated',
    },
    default: {
      overline: 'Total Invitations',
      headline: '1,284',
      meta: 'vs. 1,148 last month',
      pill: '↑ 12.4%',
    },
    allVariants: {
      variants: [
        { variant: 'default', name: 'Default', desc: 'Shadow + inset border - standard surface.' },
        {
          variant: 'outlined',
          name: 'Outlined',
          desc: 'Border only, no elevation. Flat and clean.',
        },
        { variant: 'elevated', name: 'Elevated', desc: 'Deep shadow. Floats above the page.' },
        { variant: 'flat', name: 'Flat', desc: 'No border, no shadow. Minimal contrast.' },
      ],
      responses: 'Guest responses',
    },
    statsRow: [
      { label: 'Invitations' },
      { label: 'Guest RSVPs' },
      { label: 'Page Views' },
      { label: 'Avg. Rating' },
    ],
    withMedia: {
      cards: [
        {
          title: 'Syrofi & Nadira Wedding',
          date: '12 March 2025 · Gedung Serbaguna, Jakarta',
          desc: '248 confirmed · 12 pending RSVP',
          tag: 'Wedding',
          status: 'Live',
          cta: 'View Invitation',
          preview: 'Preview',
        },
        {
          title: "Ahmad's 30th Birthday",
          date: '5 July 2025 · Sky Rooftop, Bandung',
          desc: 'RSVP not yet opened · 0 responses',
          tag: 'Birthday',
          status: 'Draft',
          cta: 'Continue Editing',
          preview: 'Preview',
        },
      ],
    },
    featureGrid: {
      open: 'Open',
      items: [
        { name: 'Invitations', desc: 'Create and manage invitations' },
        { name: 'Guest List', desc: 'Track RSVPs and manage guests' },
        { name: 'Events', desc: 'Upcoming and past events' },
        { name: 'Analytics', desc: 'Views, opens, and responses' },
        { name: 'Messages', desc: 'Chat and broadcast to guests' },
        { name: 'Settings', desc: 'Account and preferences' },
      ],
    },
    activityFeed: {
      title: 'Recent Activity',
      subtitle: 'Last 24 hours',
      footer: 'View all activity',
      items: [
        { text: 'Budi Santoso confirmed attendance', time: '5 minutes ago' },
        { text: 'Invitation sent to 12 new guests', time: '1 hour ago' },
        { text: 'Invitation viewed 18 times', time: '2 hours ago' },
        { text: 'New message from Siti Rahmawati', time: '4 hours ago' },
        { text: '3 guests updated dietary notes', time: '6 hours ago' },
      ],
    },
    profileCard: {
      centered: {
        name: 'Dania Syrofi',
        role: 'Product Designer · Jakarta',
        tags: ['Design', 'UI/UX'],
        projects: 'Projects',
        followers: 'Followers',
        following: 'Following',
        follow: 'Follow',
      },
      compact: {
        name: 'Rizky Aulia',
        role: 'Frontend Engineer',
        view: 'View',
        body: 'Just shipped the new design system tokens. Dark mode is finally working flawlessly across all components 🎉',
        actions: ['Like 48', 'Reply', 'Share'],
      },
    },
    emptyState: {
      title: 'No invitations yet',
      body: 'Create your first invitation and start sending to guests.',
      button: 'New Invitation',
    },
    hoverable: {
      default: {
        title: 'Default + Hoverable',
        body: 'Lifts on hover. Shadow transitions from md to xl.',
      },
      elevated: {
        title: 'Elevated + Hoverable',
        body: 'Deep resting shadow. Even deeper on hover.',
      },
      outlined: {
        title: 'Outlined + Clickable',
        body: 'Focus ring + active scale. Keyboard accessible.',
      },
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allVariants: 'Semua Varian',
      statsRow: 'Baris Statistik',
      withMedia: 'Dengan Media',
      featureGrid: 'Kisi Fitur',
      activityFeed: 'Umpan Aktivitas',
      profileCard: 'Kartu Profil',
      emptyState: 'Keadaan Kosong',
      skeleton: 'Skeleton / Memuat',
      hoverable: 'Dapat Dihover & Elevasi',
    },
    default: {
      overline: 'Total Undangan',
      headline: '1.284',
      meta: 'vs. 1.148 bulan lalu',
      pill: '↑ 12,4%',
    },
    allVariants: {
      variants: [
        {
          variant: 'default',
          name: 'Bawaan',
          desc: 'Bayangan + border dalam - permukaan standar.',
        },
        {
          variant: 'outlined',
          name: 'Bergaris',
          desc: 'Hanya border, tanpa elevasi. Rata dan bersih.',
        },
        {
          variant: 'elevated',
          name: 'Elevasi',
          desc: 'Bayangan dalam. Mengapung di atas halaman.',
        },
        { variant: 'flat', name: 'Datar', desc: 'Tanpa border, tanpa bayangan. Kontras minimal.' },
      ],
      responses: 'Respons tamu',
    },
    statsRow: [
      { label: 'Undangan' },
      { label: 'RSVP Tamu' },
      { label: 'Tampilan Halaman' },
      { label: 'Rata-rata Rating' },
    ],
    withMedia: {
      cards: [
        {
          title: 'Pernikahan Syrofi & Nadira',
          date: '12 Maret 2025 · Gedung Serbaguna, Jakarta',
          desc: '248 terkonfirmasi · 12 RSVP tertunda',
          tag: 'Pernikahan',
          status: 'Aktif',
          cta: 'Lihat Undangan',
          preview: 'Pratinjau',
        },
        {
          title: 'Ulang Tahun Ahmad ke-30',
          date: '5 Juli 2025 · Sky Rooftop, Bandung',
          desc: 'RSVP belum dibuka · 0 respons',
          tag: 'Ulang Tahun',
          status: 'Draf',
          cta: 'Lanjutkan Edit',
          preview: 'Pratinjau',
        },
      ],
    },
    featureGrid: {
      open: 'Buka',
      items: [
        { name: 'Undangan', desc: 'Buat dan kelola undangan' },
        { name: 'Daftar Tamu', desc: 'Lacak RSVP dan kelola tamu' },
        { name: 'Acara', desc: 'Acara mendatang dan sebelumnya' },
        { name: 'Analitik', desc: 'Tampilan, pembukaan, dan respons' },
        { name: 'Pesan', desc: 'Chat dan siaran ke tamu' },
        { name: 'Pengaturan', desc: 'Akun dan preferensi' },
      ],
    },
    activityFeed: {
      title: 'Aktivitas Terkini',
      subtitle: '24 jam terakhir',
      footer: 'Lihat semua aktivitas',
      items: [
        { text: 'Budi Santoso mengonfirmasi kehadiran', time: '5 menit lalu' },
        { text: 'Undangan dikirim ke 12 tamu baru', time: '1 jam lalu' },
        { text: 'Undangan dilihat 18 kali', time: '2 jam lalu' },
        { text: 'Pesan baru dari Siti Rahmawati', time: '4 jam lalu' },
        { text: '3 tamu memperbarui catatan diet', time: '6 jam lalu' },
      ],
    },
    profileCard: {
      centered: {
        name: 'Dania Syrofi',
        role: 'Desainer Produk · Jakarta',
        tags: ['Desain', 'UI/UX'],
        projects: 'Proyek',
        followers: 'Pengikut',
        following: 'Mengikuti',
        follow: 'Ikuti',
      },
      compact: {
        name: 'Rizky Aulia',
        role: 'Insinyur Frontend',
        view: 'Lihat',
        body: 'Baru saja merilis token design system baru. Mode gelap akhirnya berjalan mulus di semua komponen 🎉',
        actions: ['Suka 48', 'Balas', 'Bagikan'],
      },
    },
    emptyState: {
      title: 'Belum ada undangan',
      body: 'Buat undangan pertama Anda dan mulai kirim ke tamu.',
      button: 'Undangan Baru',
    },
    hoverable: {
      default: {
        title: 'Bawaan + Dapat Dihover',
        body: 'Terangkat saat hover. Bayangan berubah dari md ke xl.',
      },
      elevated: {
        title: 'Elevasi + Dapat Dihover',
        body: 'Bayangan saat diam sudah dalam. Saat hover lebih dalam lagi.',
      },
      outlined: {
        title: 'Garis + Dapat Diklik',
        body: 'Focus ring + skala aktif. Bisa dipakai dengan keyboard.',
      },
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      allVariants: '所有变体',
      statsRow: '统计行',
      withMedia: '带媒体',
      featureGrid: '功能网格',
      activityFeed: '活动动态',
      profileCard: '个人资料卡',
      emptyState: '空状态',
      skeleton: '骨架 / 加载中',
      hoverable: '可悬停与提升',
    },
    default: {
      overline: '邀请总数',
      headline: '1,284',
      meta: '较上月 1,148',
      pill: '↑ 12.4%',
    },
    allVariants: {
      variants: [
        { variant: 'default', name: '默认', desc: '阴影 + 内嵌边框 - 标准表面。' },
        { variant: 'outlined', name: '描边', desc: '仅边框，无提升。平整且干净。' },
        { variant: 'elevated', name: '提升', desc: '深阴影，悬浮在页面上方。' },
        { variant: 'flat', name: '扁平', desc: '无边框、无阴影。对比最小。' },
      ],
      responses: '宾客响应',
    },
    statsRow: [
      { label: '邀请' },
      { label: '宾客 RSVP' },
      { label: '页面浏览' },
      { label: '平均评分' },
    ],
    withMedia: {
      cards: [
        {
          title: 'Syrofi 与 Nadira 婚礼',
          date: '2025 年 3 月 12 日 · 雅加达多功能厅',
          desc: '248 人确认 · 12 个待处理 RSVP',
          tag: '婚礼',
          status: '进行中',
          cta: '查看邀请',
          preview: '预览',
        },
        {
          title: 'Ahmad 的 30 岁生日',
          date: '2025 年 7 月 5 日 · 万隆 Sky Rooftop',
          desc: 'RSVP 尚未开启 · 0 个回应',
          tag: '生日',
          status: '草稿',
          cta: '继续编辑',
          preview: '预览',
        },
      ],
    },
    featureGrid: {
      open: '打开',
      items: [
        { name: '邀请', desc: '创建并管理邀请' },
        { name: '宾客名单', desc: '跟踪 RSVP 并管理宾客' },
        { name: '活动', desc: '即将到来与过去的活动' },
        { name: '分析', desc: '浏览、打开和响应' },
        { name: '消息', desc: '与宾客聊天和广播' },
        { name: '设置', desc: '账户与偏好' },
      ],
    },
    activityFeed: {
      title: '最新动态',
      subtitle: '过去 24 小时',
      footer: '查看全部动态',
      items: [
        { text: 'Budi Santoso 已确认出席', time: '5 分钟前' },
        { text: '邀请已发送给 12 位新宾客', time: '1 小时前' },
        { text: '邀请已被查看 18 次', time: '2 小时前' },
        { text: '来自 Siti Rahmawati 的新消息', time: '4 小时前' },
        { text: '3 位宾客更新了饮食备注', time: '6 小时前' },
      ],
    },
    profileCard: {
      centered: {
        name: 'Dania Syrofi',
        role: '产品设计师 · 雅加达',
        tags: ['设计', 'UI/UX'],
        projects: '项目',
        followers: '粉丝',
        following: '关注中',
        follow: '关注',
      },
      compact: {
        name: 'Rizky Aulia',
        role: '前端工程师',
        view: '查看',
        body: '刚刚上线了新的设计系统 token。深色模式终于在所有组件上顺利运行 🎉',
        actions: ['喜欢 48', '回复', '分享'],
      },
    },
    emptyState: {
      title: '暂无邀请',
      body: '创建你的第一个邀请并开始发送给宾客。',
      button: '新建邀请',
    },
    hoverable: {
      default: { title: '默认 + 可悬停', body: '悬停时上浮。阴影从 md 过渡到 xl。' },
      elevated: { title: '提升 + 可悬停', body: '静止时阴影较深。悬停时更深。' },
      outlined: { title: '描边 + 可点击', body: '聚焦环 + 活动缩放。支持键盘操作。' },
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

// ── Canvas ──────────────────────────────────────────────────────────────────────
const withCanvas =
  (bg = 'var(--color-bg)') =>
  () => ({
    template: `
    <div style="
      min-height:100vh; display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      padding:48px 32px; gap:32px;
      background-color:${bg};
      background-image:radial-gradient(circle, var(--color-border) 1px, transparent 1px);
      background-size:24px 24px;
    "><story /></div>`,
  })

// ── Shared style helpers ────────────────────────────────────────────────────────
const S = {
  overline: `font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);`,
  headline: `font-size:26px;font-weight:700;letter-spacing:-0.02em;color:var(--color-text-heading);line-height:1;`,
  body: `font-size:13px;line-height:1.6;color:var(--color-text-secondary);`,
  label: `font-size:12px;font-weight:500;color:var(--color-text-secondary);`,
  meta: `font-size:11px;color:var(--color-text-tertiary);`,
  divider: `height:1px;background:var(--color-border-subtle);margin:0;`,
}

// ── Icon box ────────────────────────────────────────────────────────────────────
const IconBox = defineComponent({
  props: { bg: String, color: String, size: { default: 36 } },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          style: `
        width:${props.size}px;height:${props.size}px;
        border-radius:var(--radius-md);flex-shrink:0;
        background:${props.bg};color:${props.color};
        display:flex;align-items:center;justify-content:center;
      `,
        },
        slots.default?.()
      )
  },
})

// ── Pill badge ──────────────────────────────────────────────────────────────────
const Pill = defineComponent({
  props: { color: String, bg: String, label: String },
  setup(props) {
    return () =>
      h(
        'span',
        {
          style: `
        display:inline-flex;align-items:center;gap:3px;
        padding:3px 9px;border-radius:var(--radius-full);
        font-size:11px;font-weight:600;letter-spacing:0.03em;
        color:${props.color};background:${props.bg};flex-shrink:0;
      `,
        },
        props.label
      )
  },
})

// ── Meta ────────────────────────────────────────────────────────────────────────
const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [withCanvas()],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'outlined', 'elevated', 'flat', 'glass'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    radius: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    hoverable: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
  args: { variant: 'default', padding: 'md', radius: 'lg', hoverable: false, clickable: false },
}
export default meta
type Story = StoryObj<typeof Card>

// ══════════════════════════════════════════════════════════════════════════════
// 1 · Default — single metric card
// ══════════════════════════════════════════════════════════════════════════════
export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Card, IconBox, Pill, RiMailSendLine },
    setup: () => ({ args, copy: useCopy() }),
    template: `
      <Card v-bind="args" style="width:300px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;">
          <IconBox bg="var(--color-primary-light)" color="var(--color-primary)" :size="40">
            <RiMailSendLine :size="18" />
          </IconBox>
          <Pill color="var(--color-success)" bg="var(--color-success-light)" :label="copy.default.pill" />
        </div>
        <p style="${S.overline}margin-bottom:4px;">{{ copy.default.overline }}</p>
        <p style="${S.headline}">{{ copy.default.headline }}</p>
        <p style="${S.meta}margin-top:6px;">{{ copy.default.meta }}</p>
      </Card>
    `,
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 2 · All Variants — same content, four treatments
// ══════════════════════════════════════════════════════════════════════════════
export const AllVariants: Story = {
  get name() {
    return getStoryName('allVariants')
  },
  render: () => ({
    components: { Card, IconBox, RiPieChartLine },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start;">
        <Card
          v-for="v in copy.allVariants.variants" :key="v.name"
          :variant="v.variant"
          style="width:200px"
        >
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <p style="${S.overline}">{{ v.name }}</p>
              <IconBox bg="var(--color-neutral-light)" color="var(--color-text-secondary)" :size="28">
                <RiPieChartLine :size="14" />
              </IconBox>
            </div>
            <div>
              <p style="${S.headline}font-size:22px;">8,942</p>
              <p style="${S.meta}margin-top:4px;">{{ copy.allVariants.responses }}</p>
            </div>
            <div style="${S.divider}"></div>
            <p style="${S.body}font-size:12px;">{{ v.desc }}</p>
          </div>
        </Card>
      </div>
    `,
    setup: () => ({ copy: useCopy() }),
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 3 · Dashboard stats row
// ══════════════════════════════════════════════════════════════════════════════
export const StatsRow: Story = {
  get name() {
    return getStoryName('statsRow')
  },
  render: () => ({
    components: {
      Card,
      IconBox,
      Pill,
      RiMailSendLine,
      RiGroupLine,
      RiEyeLine,
      RiStarLine,
    },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;max-width:900px;">
        <Card
          v-for="s in stats" :key="s.label"
          style="flex:1;min-width:180px"
        >
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;">
            <IconBox :bg="s.iconBg" :color="s.iconColor" :size="36">
              <component :is="s.icon" :size="16" />
            </IconBox>
            <Pill :color="s.deltaColor" :bg="s.deltaBg" :label="s.delta" />
          </div>
          <p style="${S.headline}">{{ s.value }}</p>
          <p style="${S.overline}margin-top:6px;">{{ s.label }}</p>
        </Card>
      </div>
    `,
    setup: () => ({
      copy: useCopy(),
      stats: [
        {
          icon: RiMailSendLine,
          label: copyMap[getLocale()].statsRow[0].label,
          value: '1,284',
          delta: '+8.2%',
          iconBg: 'var(--color-primary-light)',
          iconColor: 'var(--color-primary)',
          deltaColor: 'var(--color-success)',
          deltaBg: 'var(--color-success-light)',
        },
        {
          icon: RiGroupLine,
          label: copyMap[getLocale()].statsRow[1].label,
          value: '8,942',
          delta: '+24.1%',
          iconBg: 'var(--color-success-light)',
          iconColor: 'var(--color-success)',
          deltaColor: 'var(--color-success)',
          deltaBg: 'var(--color-success-light)',
        },
        {
          icon: RiEyeLine,
          label: copyMap[getLocale()].statsRow[2].label,
          value: '42.6k',
          delta: '+3.8%',
          iconBg: 'var(--color-info-light)',
          iconColor: 'var(--color-info)',
          deltaColor: 'var(--color-success)',
          deltaBg: 'var(--color-success-light)',
        },
        {
          icon: RiStarLine,
          label: copyMap[getLocale()].statsRow[3].label,
          value: '4.87',
          delta: '−0.2',
          iconBg: 'var(--color-warning-light)',
          iconColor: 'var(--color-warning)',
          deltaColor: 'var(--color-danger)',
          deltaBg: 'color-mix(in oklch, var(--color-danger) 12%, transparent)',
        },
      ],
    }),
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 4 · With Media — event / invitation cards
// ══════════════════════════════════════════════════════════════════════════════
export const WithMedia: Story = {
  get name() {
    return getStoryName('withMedia')
  },
  render: () => ({
    components: { Card, Pill },
    template: `
      <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start;">
        <Card v-for="ev in events" :key="ev.title" style="width:272px">
          <template #media>
            <div :style="\`height:152px;background:\${ev.gradient};display:flex;flex-direction:column;justify-content:flex-end;padding:14px 16px;\`">
              <Pill :color="ev.tagColor" :bg="ev.tagBg" :label="ev.tag" />
            </div>
          </template>
          <template #header>
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;width:100%;">
              <h3 style="font-size:14px;font-weight:600;color:var(--color-text-heading);line-height:1.35;">{{ ev.title }}</h3>
              <Pill :color="ev.statusColor" :bg="ev.statusBg" :label="ev.status" />
            </div>
            <p style="${S.meta}margin-top:4px;">📅 {{ ev.date }}</p>
          </template>
          <p style="${S.body}font-size:12px;">{{ ev.desc }}</p>
          <template #footer>
            <button style="
              flex:1;padding:7px;border-radius:var(--radius-md);
              background:var(--color-neutral);color:var(--color-text-inverse);
              font-size:13px;font-weight:600;border:none;cursor:pointer;
            ">{{ ev.cta }}</button>
            <button style="
              padding:7px 14px;border-radius:var(--radius-md);
              background:transparent;color:var(--color-text-secondary);
              font-size:13px;font-weight:500;
              border:1px solid var(--color-border);cursor:pointer;
            ">{{ ev.preview }}</button>
          </template>
        </Card>
      </div>
    `,
    setup: () => {
      const events = copyMap[getLocale()].withMedia.cards.map((card, index) => {
        const base = [
          {
            tagColor: 'rgba(255,255,255,0.95)',
            tagBg: 'rgba(255,255,255,0.18)',
            statusColor: 'var(--color-success)',
            statusBg: 'var(--color-success-light)',
            gradient:
              'linear-gradient(140deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
          },
          {
            tagColor: 'rgba(255,255,255,0.95)',
            tagBg: 'rgba(255,255,255,0.18)',
            statusColor: 'var(--color-warning)',
            statusBg: 'var(--color-warning-light)',
            gradient: 'linear-gradient(140deg, var(--color-info) 0%, #6366f1 100%)',
          },
        ][index]
        return { ...card, ...base }
      })
      return { events }
    },
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 5 · Feature grid — clickable navigation cards
// ══════════════════════════════════════════════════════════════════════════════
export const FeatureGrid: Story = {
  get name() {
    return getStoryName('featureGrid')
  },
  render: () => ({
    components: {
      Card,
      IconBox,
      RiArrowRightSLine,
      RiMailSendLine,
      RiGroupLine,
      RiCalendarEventLine,
      RiPieChartLine,
      RiMessage2Line,
      RiSettings4Line,
    },
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,220px);gap:12px;">
        <Card
          v-for="f in features" :key="f.name"
          hoverable clickable radius="lg"
        >
          <div style="display:flex;flex-direction:column;gap:12px;">
            <IconBox :bg="f.bg" :color="f.color" :size="40">
              <component :is="f.icon" :size="18" />
            </IconBox>
            <div style="flex:1;">
              <p style="font-size:13px;font-weight:600;color:var(--color-text-heading);margin-bottom:3px;">{{ f.name }}</p>
              <p style="${S.body}font-size:12px;">{{ f.desc }}</p>
            </div>
            <div style="display:flex;align-items:center;gap:2px;font-size:12px;font-weight:500;color:var(--color-text-tertiary);">
              {{ copy.featureGrid.open }} <RiArrowRightSLine :size="14" style="margin-top:1px;" />
            </div>
          </div>
        </Card>
      </div>
    `,
    setup: () => {
      const copy = useCopy()
      const iconBases = [
        { icon: RiMailSendLine, bg: 'var(--color-primary-light)', color: 'var(--color-primary)' },
        { icon: RiGroupLine, bg: 'var(--color-success-light)', color: 'var(--color-success)' },
        { icon: RiCalendarEventLine, bg: 'var(--color-info-light)', color: 'var(--color-info)' },
        {
          icon: RiPieChartLine,
          bg: 'var(--color-secondary-light)',
          color: 'var(--color-secondary)',
        },
        { icon: RiMessage2Line, bg: 'var(--color-warning-light)', color: 'var(--color-warning)' },
        {
          icon: RiSettings4Line,
          bg: 'var(--color-neutral-light)',
          color: 'var(--color-text-secondary)',
        },
      ]
      const features = copy.value.featureGrid.items.map((item, index) => ({
        ...iconBases[index],
        ...item,
      }))
      return { copy, features }
    },
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 6 · Activity feed — header + rows + footer
// ══════════════════════════════════════════════════════════════════════════════
export const ActivityFeed: Story = {
  get name() {
    return getStoryName('activityFeed')
  },
  render: () => ({
    components: {
      Card,
      IconBox,
      RiCheckLine,
      RiMailSendLine,
      RiEyeLine,
      RiMessage2Line,
      RiGroupLine,
    },
    template: `
      <Card variant="outlined" style="width:360px">
        <template #header>
          <div style="width:100%;">
            <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);">{{ copy.activityFeed.title }}</p>
            <p style="${S.meta}margin-top:2px;">{{ copy.activityFeed.subtitle }}</p>
          </div>
        </template>

        <div style="display:flex;flex-direction:column;gap:0;">
          <div
            v-for="(item, i) in activity" :key="i"
            :style="\`
              display:flex;align-items:center;gap:12px;padding:11px 0;
              \${i < activity.length - 1 ? 'border-bottom:1px solid var(--color-border-subtle);' : ''}
            \`"
          >
            <IconBox :bg="item.bg" :color="item.color" :size="32">
              <component :is="item.icon" :size="14" />
            </IconBox>
            <div style="flex:1;min-width:0;">
              <p style="font-size:13px;color:var(--color-text-primary);line-height:1.4;">{{ item.text }}</p>
              <p style="${S.meta}margin-top:1px;">{{ item.time }}</p>
            </div>
          </div>
        </div>

        <template #footer>
          <button style="
            width:100%;padding:7px;border-radius:var(--radius-md);
            background:transparent;color:var(--color-text-secondary);
            font-size:12px;font-weight:500;border:none;cursor:pointer;
            display:flex;align-items:center;justify-content:center;gap:4px;
          ">{{ copy.activityFeed.footer }}</button>
        </template>
      </Card>
    `,
    setup: () => {
      const copy = useCopy()
      const activity = [
        { icon: RiCheckLine, bg: 'var(--color-success-light)', color: 'var(--color-success)' },
        { icon: RiMailSendLine, bg: 'var(--color-primary-light)', color: 'var(--color-primary)' },
        { icon: RiEyeLine, bg: 'var(--color-info-light)', color: 'var(--color-info)' },
        { icon: RiMessage2Line, bg: 'var(--color-warning-light)', color: 'var(--color-warning)' },
        {
          icon: RiGroupLine,
          bg: 'var(--color-neutral-light)',
          color: 'var(--color-text-secondary)',
        },
      ].map((item, index) => ({ ...item, ...copy.value.activityFeed.items[index] }))
      return { copy, activity }
    },
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 7 · Profile card
// ══════════════════════════════════════════════════════════════════════════════
export const ProfileCard: Story = {
  get name() {
    return getStoryName('profileCard')
  },
  render: () => ({
    components: { Card, Pill },
    template: `
      <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start;">

        <!-- Centered profile -->
        <Card style="width:260px">
          <div style="display:flex;flex-direction:column;align-items:center;gap:14px;padding:4px 0 0;">
            <div style="position:relative;">
              <div style="
                width:64px;height:64px;border-radius:var(--radius-full);
                background:linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
                display:flex;align-items:center;justify-content:center;
                font-size:20px;font-weight:700;color:#fff;letter-spacing:0.03em;
              ">DA</div>
              <div style="
                position:absolute;bottom:1px;right:1px;
                width:14px;height:14px;border-radius:50%;
                background:var(--color-success);
                border:2px solid var(--color-surface);
              "></div>
            </div>
            <div style="text-align:center;">
              <p style="font-size:15px;font-weight:600;color:var(--color-text-heading);">{{ copy.profileCard.centered.name }}</p>
              <p style="${S.label}margin-top:2px;">{{ copy.profileCard.centered.role }}</p>
              <div style="display:flex;gap:6px;justify-content:center;margin-top:10px;">
                <Pill color="var(--color-primary)" bg="var(--color-primary-light)" :label="copy.profileCard.centered.tags[0]" />
                <Pill color="var(--color-secondary)" bg="var(--color-secondary-light)" :label="copy.profileCard.centered.tags[1]" />
              </div>
            </div>
            <div style="height:1px;background:var(--color-border-subtle);width:100%;"></div>
            <div style="display:flex;gap:28px;justify-content:center;">
              <div style="text-align:center;">
                <p style="font-size:17px;font-weight:700;letter-spacing:-0.02em;color:var(--color-text-heading);">128</p>
                <p style="${S.meta}margin-top:2px;">{{ copy.profileCard.centered.projects }}</p>
              </div>
              <div style="text-align:center;">
                <p style="font-size:17px;font-weight:700;letter-spacing:-0.02em;color:var(--color-text-heading);">4.9k</p>
                <p style="${S.meta}margin-top:2px;">{{ copy.profileCard.centered.followers }}</p>
              </div>
              <div style="text-align:center;">
                <p style="font-size:17px;font-weight:700;letter-spacing:-0.02em;color:var(--color-text-heading);">312</p>
                <p style="${S.meta}margin-top:2px;">{{ copy.profileCard.centered.following }}</p>
              </div>
            </div>
            <button style="
              width:100%;padding:8px;border-radius:var(--radius-md);
              background:var(--color-neutral);color:var(--color-text-inverse);
              font-size:13px;font-weight:600;border:none;cursor:pointer;letter-spacing:0.01em;
            ">{{ copy.profileCard.centered.follow }}</button>
          </div>
        </Card>

        <!-- Horizontal profile (compact) -->
        <Card variant="outlined" style="width:320px">
          <div style="display:flex;align-items:center;gap:14px;">
            <div style="
              width:48px;height:48px;border-radius:var(--radius-full);flex-shrink:0;
              background:var(--color-info-light);
              display:flex;align-items:center;justify-content:center;
              font-size:16px;font-weight:700;color:var(--color-info);
            ">RA</div>
            <div style="flex:1;min-width:0;">
              <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);">{{ copy.profileCard.compact.name }}</p>
              <p style="${S.label}margin-top:1px;">{{ copy.profileCard.compact.role }}</p>
            </div>
            <button style="
              padding:6px 14px;border-radius:var(--radius-md);
              background:transparent;color:var(--color-text-primary);
              font-size:12px;font-weight:600;
              border:1px solid var(--color-border);cursor:pointer;
            ">{{ copy.profileCard.compact.view }}</button>
          </div>
          <div style="height:1px;background:var(--color-border-subtle);margin:14px 0;"></div>
          <p style="${S.body}font-size:12px;">{{ copy.profileCard.compact.body }}</p>
          <div style="display:flex;gap:20px;margin-top:12px;">
            <button style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--color-text-tertiary);display:flex;align-items:center;gap:4px;">{{ copy.profileCard.compact.actions[0] }}</button>
            <button style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--color-text-tertiary);display:flex;align-items:center;gap:4px;">{{ copy.profileCard.compact.actions[1] }}</button>
            <button style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--color-text-tertiary);display:flex;align-items:center;gap:4px;">{{ copy.profileCard.compact.actions[2] }}</button>
          </div>
        </Card>

      </div>
    `,
    setup: () => ({ copy: useCopy() }),
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 8 · Empty state
// ══════════════════════════════════════════════════════════════════════════════
export const EmptyState: Story = {
  get name() {
    return getStoryName('emptyState')
  },
  render: () => ({
    components: { Card, IconBox, RiMailSendLine, RiAddLine },
    template: `
      <Card style="width:360px">
        <div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:16px 0 8px;gap:16px;">
          <div style="
            width:56px;height:56px;border-radius:var(--radius-xl);
            background:var(--color-neutral-light);
            display:flex;align-items:center;justify-content:center;
          ">
            <RiMailSendLine :size="24" style="color:var(--color-text-tertiary);" />
          </div>
          <div>
            <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);">{{ copy.emptyState.title }}</p>
            <p style="${S.body}font-size:12px;max-width:220px;margin:6px auto 0;">{{ copy.emptyState.body }}</p>
          </div>
          <button style="
            display:inline-flex;align-items:center;gap:6px;
            padding:8px 18px;border-radius:var(--radius-md);
            background:var(--color-neutral);color:var(--color-text-inverse);
            font-size:13px;font-weight:600;border:none;cursor:pointer;
          ">
            <RiAddLine :size="14" /> {{ copy.emptyState.button }}
          </button>
        </div>
      </Card>
    `,
    setup: () => ({ copy: useCopy() }),
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 9 · Skeleton loading
// ══════════════════════════════════════════════════════════════════════════════
export const Skeleton: Story = {
  get name() {
    return getStoryName('skeleton')
  },
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
        <Card style="width:272px">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div class="ds-skel" style="width:36px;height:36px;border-radius:var(--radius-md);"></div>
              <div class="ds-skel" style="width:52px;height:20px;border-radius:var(--radius-full);"></div>
            </div>
            <div class="ds-skel" style="width:80px;height:32px;border-radius:var(--radius-sm);"></div>
            <div class="ds-skel" style="width:110px;height:12px;border-radius:var(--radius-sm);"></div>
            <div style="height:1px;background:var(--color-border-subtle);"></div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              <div class="ds-skel" style="width:100%;height:10px;border-radius:var(--radius-sm);"></div>
              <div class="ds-skel" style="width:80%;height:10px;border-radius:var(--radius-sm);"></div>
            </div>
          </div>
        </Card>

        <Card style="width:272px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            <div class="ds-skel" style="width:40px;height:40px;border-radius:var(--radius-full);flex-shrink:0;"></div>
            <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
              <div class="ds-skel" style="width:100px;height:12px;border-radius:var(--radius-sm);"></div>
              <div class="ds-skel" style="width:70px;height:10px;border-radius:var(--radius-sm);"></div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <div class="ds-skel" style="width:100%;height:10px;border-radius:var(--radius-sm);"></div>
            <div class="ds-skel" style="width:90%;height:10px;border-radius:var(--radius-sm);"></div>
            <div class="ds-skel" style="width:60%;height:10px;border-radius:var(--radius-sm);"></div>
          </div>
        </Card>
      </div>
    `,
  }),
  parameters: {
    docs: { story: { inline: true } },
  },
}

// ══════════════════════════════════════════════════════════════════════════════
// 10 · Hoverable & Elevated
// ══════════════════════════════════════════════════════════════════════════════
export const Hoverable: Story = {
  get name() {
    return getStoryName('hoverable')
  },
  render: () => ({
    components: { Card, IconBox, RiCalendarEventLine, RiUserSmileLine, RiNotificationLine },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
        <Card variant="default" hoverable style="width:220px">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <IconBox bg="var(--color-primary-light)" color="var(--color-primary)" :size="36">
              <RiCalendarEventLine :size="16" />
            </IconBox>
            <div>
              <p style="font-size:13px;font-weight:600;color:var(--color-text-heading);">{{ copy.hoverable.default.title }}</p>
              <p style="${S.body}font-size:12px;margin-top:4px;">{{ copy.hoverable.default.body }}</p>
            </div>
          </div>
        </Card>

        <Card variant="elevated" hoverable style="width:220px">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <IconBox bg="var(--color-success-light)" color="var(--color-success)" :size="36">
              <RiUserSmileLine :size="16" />
            </IconBox>
            <div>
              <p style="font-size:13px;font-weight:600;color:var(--color-text-heading);">{{ copy.hoverable.elevated.title }}</p>
              <p style="${S.body}font-size:12px;margin-top:4px;">{{ copy.hoverable.elevated.body }}</p>
            </div>
          </div>
        </Card>

        <Card variant="outlined" clickable style="width:220px">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <IconBox bg="var(--color-warning-light)" color="var(--color-warning)" :size="36">
              <RiNotificationLine :size="16" />
            </IconBox>
            <div>
              <p style="font-size:13px;font-weight:600;color:var(--color-text-heading);">{{ copy.hoverable.outlined.title }}</p>
              <p style="${S.body}font-size:12px;margin-top:4px;">{{ copy.hoverable.outlined.body }}</p>
            </div>
          </div>
        </Card>
      </div>
    `,
    setup: () => ({ copy: useCopy() }),
  }),
}
