import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import Avatar from './Avatar.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale
type Status = 'online' | 'offline' | 'busy' | 'away'
type Shape = 'circle' | 'rounded' | 'square'
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type StatusOption = 'none' | Status

type LocaleText = {
  userAlt: string
  initialsNames: readonly string[]
  sizeSectionImage: string
  sizeSectionInitials: string
  sizeSectionIcon: string
  statusLabels: Record<Status, string>
  shapeLabels: Record<Shape, string>
  avatarGroupName: string
  avatarGroupUserPrefix: string
  storyNames: {
    default: string
    withImage: string
    initials: string
    iconFallback: string
    allSizes: string
    allStatuses: string
    shapes: string
    avatarGroup: string
  }
  docs: {
    categoryProps: string
    propNames: {
      size: string
      shape: string
      status: string
      fallbackIcon: string
      src: string
      alt: string
      name: string
    }
    descriptions: {
      size: string
      shape: string
      status: string
      fallbackIcon: string
      src: string
      alt: string
      name: string
    }
    typeLabels: {
      size: string
      shape: string
      status: string
      text: string
    }
    sizeLabels: Record<AvatarSize, string>
    shapeLabels: Record<Shape, string>
    statusLabels: Record<StatusOption, string>
  }
}

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
const shapes = ['circle', 'rounded', 'square'] as const
const statusOptions = ['none', 'online', 'offline', 'busy', 'away'] as const

const localeText: Record<Locale, LocaleText> = {
  en: {
    userAlt: 'User',
    initialsNames: ['Jane Doe', 'Bob Smith', 'Alex Kim', 'Maria Garcia', 'Tom', 'Yuki Tanaka'],
    sizeSectionImage: 'With image',
    sizeSectionInitials: 'Initials',
    sizeSectionIcon: 'Icon',
    statusLabels: {
      online: 'Online',
      offline: 'Offline',
      busy: 'Busy',
      away: 'Away',
    },
    shapeLabels: {
      circle: 'Circle',
      rounded: 'Rounded',
      square: 'Square',
    },
    avatarGroupName: 'Jane Doe',
    avatarGroupUserPrefix: 'User',
    storyNames: {
      default: 'Default',
      withImage: 'With Image',
      initials: 'Initials',
      iconFallback: 'Icon Fallback',
      allSizes: 'All Sizes',
      allStatuses: 'All Statuses',
      shapes: 'Shapes',
      avatarGroup: 'Avatar Group',
    },
    docs: {
      categoryProps: 'Props',
      propNames: {
        size: 'size',
        shape: 'shape',
        status: 'status',
        fallbackIcon: 'fallbackIcon',
        src: 'src',
        alt: 'alt',
        name: 'name',
      },
      descriptions: {
        size: 'Avatar size',
        shape: 'Avatar shape',
        status: 'Presence indicator status',
        fallbackIcon: 'Icon name when no image/name is available',
        src: 'Avatar image URL',
        alt: 'Alternative text for image avatar',
        name: 'Name used to generate initials',
      },
      typeLabels: {
        size: 'AvatarSize',
        shape: 'AvatarShape',
        status: 'AvatarStatus',
        text: 'string',
      },
      sizeLabels: {
        xs: 'Extra Small',
        sm: 'Small',
        md: 'Medium',
        lg: 'Large',
        xl: 'Extra Large',
        '2xl': '2X Large',
      },
      shapeLabels: {
        circle: 'Circle',
        rounded: 'Rounded',
        square: 'Square',
      },
      statusLabels: {
        none: 'None',
        online: 'Online',
        offline: 'Offline',
        busy: 'Busy',
        away: 'Away',
      },
    },
  },
  id: {
    userAlt: 'Pengguna',
    initialsNames: ['Budi Santoso', 'Siti Aminah', 'Andi Wijaya', 'Dewi Lestari', 'Rama', 'Rina Putri'],
    sizeSectionImage: 'Dengan gambar',
    sizeSectionInitials: 'Inisial',
    sizeSectionIcon: 'Ikon',
    statusLabels: {
      online: 'Online',
      offline: 'Offline',
      busy: 'Sibuk',
      away: 'Pergi',
    },
    shapeLabels: {
      circle: 'Lingkaran',
      rounded: 'Membulat',
      square: 'Kotak',
    },
    avatarGroupName: 'Siti Aminah',
    avatarGroupUserPrefix: 'Pengguna',
    storyNames: {
      default: 'Bawaan',
      withImage: 'Dengan Gambar',
      initials: 'Inisial',
      iconFallback: 'Cadangan Ikon',
      allSizes: 'Semua Ukuran',
      allStatuses: 'Semua Status',
      shapes: 'Bentuk',
      avatarGroup: 'Grup Avatar',
    },
    docs: {
      categoryProps: 'Properti',
      propNames: {
        size: 'ukuran',
        shape: 'bentuk',
        status: 'status',
        fallbackIcon: 'ikonCadangan',
        src: 'sumberGambar',
        alt: 'teksAlternatif',
        name: 'nama',
      },
      descriptions: {
        size: 'Ukuran avatar',
        shape: 'Bentuk avatar',
        status: 'Status indikator kehadiran',
        fallbackIcon: 'Nama ikon saat gambar/nama tidak tersedia',
        src: 'URL gambar avatar',
        alt: 'Teks alternatif untuk avatar gambar',
        name: 'Nama untuk menghasilkan inisial',
      },
      typeLabels: {
        size: 'UkuranAvatar',
        shape: 'BentukAvatar',
        status: 'StatusAvatar',
        text: 'string',
      },
      sizeLabels: {
        xs: 'Ekstra Kecil',
        sm: 'Kecil',
        md: 'Sedang',
        lg: 'Besar',
        xl: 'Ekstra Besar',
        '2xl': '2X Besar',
      },
      shapeLabels: {
        circle: 'Lingkaran',
        rounded: 'Membulat',
        square: 'Kotak',
      },
      statusLabels: {
        none: 'Tidak ada',
        online: 'Online',
        offline: 'Offline',
        busy: 'Sibuk',
        away: 'Pergi',
      },
    },
  },
  zh: {
    userAlt: '用户',
    initialsNames: ['王小明', '李美玲', '张伟', '刘洋', '陈静', '赵敏'],
    sizeSectionImage: '带图片',
    sizeSectionInitials: '姓名缩写',
    sizeSectionIcon: '图标',
    statusLabels: {
      online: '在线',
      offline: '离线',
      busy: '忙碌',
      away: '离开',
    },
    shapeLabels: {
      circle: '圆形',
      rounded: '圆角',
      square: '方形',
    },
    avatarGroupName: '王小明',
    avatarGroupUserPrefix: '用户',
    storyNames: {
      default: '默认',
      withImage: '带图片',
      initials: '姓名缩写',
      iconFallback: '图标回退',
      allSizes: '全部尺寸',
      allStatuses: '全部状态',
      shapes: '形状',
      avatarGroup: '头像组',
    },
    docs: {
      categoryProps: '属性',
      propNames: {
        size: '尺寸',
        shape: '形状',
        status: '状态',
        fallbackIcon: '后备图标',
        src: '图片来源',
        alt: '替代文本',
        name: '姓名',
      },
      descriptions: {
        size: '头像尺寸',
        shape: '头像形状',
        status: '在线状态指示',
        fallbackIcon: '无图片/姓名时使用的图标名',
        src: '头像图片 URL',
        alt: '图片头像的替代文本',
        name: '用于生成缩写的姓名',
      },
      typeLabels: {
        size: '头像尺寸',
        shape: '头像形状',
        status: '头像状态',
        text: '字符串',
      },
      sizeLabels: {
        xs: '超小',
        sm: '小',
        md: '中',
        lg: '大',
        xl: '超大',
        '2xl': '2X 大',
      },
      shapeLabels: {
        circle: '圆形',
        rounded: '圆角',
        square: '方形',
      },
      statusLabels: {
        none: '无',
        online: '在线',
        offline: '离线',
        busy: '忙碌',
        away: '离开',
      },
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useLocaleText = () => computed(() => localeText[getLocale()])
const getStoryName = (key: keyof LocaleText['storyNames']): string => localeText[getLocale()].storyNames[key]

const buildArgTypes = (locale: Locale): NonNullable<Meta<typeof Avatar>['argTypes']> => {
  const copy = localeText[locale]

  return {
    size: {
      name: copy.docs.propNames.size,
      description: copy.docs.descriptions.size,
      control: { type: 'select', labels: copy.docs.sizeLabels },
      options: [...sizes],
      table: {
        category: copy.docs.categoryProps,
        type: { summary: copy.docs.typeLabels.size },
        defaultValue: { summary: copy.docs.sizeLabels.md },
      },
    },
    shape: {
      name: copy.docs.propNames.shape,
      description: copy.docs.descriptions.shape,
      control: { type: 'select', labels: copy.docs.shapeLabels },
      options: [...shapes],
      table: {
        category: copy.docs.categoryProps,
        type: { summary: copy.docs.typeLabels.shape },
        defaultValue: { summary: copy.docs.shapeLabels.circle },
      },
    },
    status: {
      name: copy.docs.propNames.status,
      description: copy.docs.descriptions.status,
      options: [...statusOptions],
      mapping: {
        none: null,
        online: 'online',
        offline: 'offline',
        busy: 'busy',
        away: 'away',
      },
      control: { type: 'select', labels: copy.docs.statusLabels },
      table: {
        category: copy.docs.categoryProps,
        type: { summary: copy.docs.typeLabels.status },
        defaultValue: { summary: copy.docs.statusLabels.none },
      },
    },
    fallbackIcon: {
      name: copy.docs.propNames.fallbackIcon,
      description: copy.docs.descriptions.fallbackIcon,
      control: { type: 'text' },
      table: {
        category: copy.docs.categoryProps,
        type: { summary: copy.docs.typeLabels.text },
      },
    },
    src: {
      name: copy.docs.propNames.src,
      description: copy.docs.descriptions.src,
      control: { type: 'text' },
      table: {
        category: copy.docs.categoryProps,
        type: { summary: copy.docs.typeLabels.text },
      },
    },
    alt: {
      name: copy.docs.propNames.alt,
      description: copy.docs.descriptions.alt,
      control: { type: 'text' },
      table: {
        category: copy.docs.categoryProps,
        type: { summary: copy.docs.typeLabels.text },
      },
    },
    name: {
      name: copy.docs.propNames.name,
      description: copy.docs.descriptions.name,
      control: { type: 'text' },
      table: {
        category: copy.docs.categoryProps,
        type: { summary: copy.docs.typeLabels.text },
      },
    },
  }
}

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'user' },
  decorators: [
    (story, context) => {
      const locale = resolveLocale(context.globals.locale)
      ;(context as { argTypes: Record<string, unknown> }).argTypes = {
        ...(context.argTypes as Record<string, unknown>),
        ...(buildArgTypes(locale) as Record<string, unknown>),
      }
      return story()
    },
  ],
  argTypes: buildArgTypes('en'),
  args: {
    size: 'md',
    shape: 'circle',
  },
}
export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    size: 'lg',
  },
  render: (args) => ({
    components: { Avatar },
    setup: () => {
      const copy = useLocaleText()
      const resolvedArgs = computed(() => ({
        ...args,
        alt: copy.value.userAlt,
      }))
      return { resolvedArgs }
    },
    template: '<Avatar v-bind="resolvedArgs" />',
  }),
}

export const WithImage: Story = {
  get name() {
    return getStoryName('withImage')
  },
  render: () => ({
    components: { Avatar },
    setup: () => ({
      copy: useLocaleText(),
      sizes,
    }),
    template: `
      <div style="display:flex;align-items:flex-end;gap:12px;">
        <Avatar v-for="s in sizes" :key="s" :size="s" src="https://i.pravatar.cc/150?img=3" :alt="copy.userAlt" />
      </div>
    `,
  }),
}

export const Initials: Story = {
  get name() {
    return getStoryName('initials')
  },
  render: () => ({
    components: { Avatar },
    setup: () => ({ copy: useLocaleText() }),
    template: `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:12px;">
        <Avatar v-for="name in copy.initialsNames" :key="name" :name="name" size="md" />
      </div>
    `,
  }),
}

export const IconFallback: Story = {
  get name() {
    return getStoryName('iconFallback')
  },
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display:flex;align-items:center;gap:12px;">
        <Avatar size="md" />
        <Avatar size="md" fallback-icon="RiRobotLine" />
        <Avatar size="md" fallback-icon="RiBuildingLine" />
        <Avatar size="md" fallback-icon="RiTeamLine" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Avatar },
    setup: () => ({
      copy: useLocaleText(),
      sizes,
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:10px;">{{ copy.sizeSectionImage }}</p>
          <div style="display:flex;align-items:flex-end;gap:10px;">
            <Avatar v-for="s in sizes" :key="s" :size="s" src="https://i.pravatar.cc/150?img=5" :alt="copy.userAlt" />
          </div>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:10px;">{{ copy.sizeSectionInitials }}</p>
          <div style="display:flex;align-items:flex-end;gap:10px;">
            <Avatar v-for="s in sizes" :key="s" :size="s" :name="copy.initialsNames[0]" />
          </div>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:10px;">{{ copy.sizeSectionIcon }}</p>
          <div style="display:flex;align-items:flex-end;gap:10px;">
            <Avatar v-for="s in sizes" :key="s" :size="s" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const AllStatuses: Story = {
  get name() {
    return getStoryName('allStatuses')
  },
  render: () => ({
    components: { Avatar },
    setup: () => ({
      copy: useLocaleText(),
      statuses: ['online', 'offline', 'busy', 'away'] as const,
    }),
    template: `
      <div style="display:flex;gap:20px;">
        <div v-for="s in statuses" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Avatar :name="copy.initialsNames[0]" size="lg" :status="s" />
          <span style="font-size:12px;color:var(--color-text-secondary);">{{ copy.statusLabels[s] }}</span>
        </div>
      </div>
    `,
  }),
}

export const Shapes: Story = {
  get name() {
    return getStoryName('shapes')
  },
  render: () => ({
    components: { Avatar },
    setup: () => ({
      copy: useLocaleText(),
      shapes,
    }),
    template: `
      <div style="display:flex;gap:20px;">
        <div v-for="shape in shapes" :key="shape" style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Avatar src="https://i.pravatar.cc/150?img=7" size="lg" :shape="shape" />
          <span style="font-size:12px;color:var(--color-text-secondary);">{{ copy.shapeLabels[shape] }}</span>
        </div>
      </div>
    `,
  }),
}

export const AvatarGroup: Story = {
  get name() {
    return getStoryName('avatarGroup')
  },
  render: () => ({
    components: { Avatar },
    setup: () => ({ copy: useLocaleText() }),
    template: `
      <div style="display:flex;align-items:center;">
        <Avatar src="https://i.pravatar.cc/150?img=1" size="md" :alt="copy.avatarGroupUserPrefix + ' 1'" style="outline:2px solid var(--color-surface);" />
        <Avatar src="https://i.pravatar.cc/150?img=2" size="md" :alt="copy.avatarGroupUserPrefix + ' 2'" style="outline:2px solid var(--color-surface);margin-left:-10px;" />
        <Avatar src="https://i.pravatar.cc/150?img=3" size="md" :alt="copy.avatarGroupUserPrefix + ' 3'" style="outline:2px solid var(--color-surface);margin-left:-10px;" />
        <Avatar :name="copy.avatarGroupName" size="md" style="outline:2px solid var(--color-surface);margin-left:-10px;" />
        <div style="
          width:40px;height:40px;border-radius:9999px;
          background:var(--color-neutral-light);
          border:1px solid var(--color-border);
          display:inline-flex;align-items:center;justify-content:center;
          font-size:12px;font-weight:600;color:var(--color-text-secondary);
          outline:2px solid var(--color-surface);margin-left:-10px;
        ">+4</div>
      </div>
    `,
  }),
}
