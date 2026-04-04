import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import { RiAttachmentLine, RiEmotionLine } from '@remixicon/vue'
import ChatInput from './ChatInput.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type LocaleText = {
  placeholder: string
  loadingValue: string
  disabledPlaceholder: string
  enterHint: string
  disabledHint: string
  actionLabels: {
    attachFile: string
    addEmoji: string
  }
  storyNames: {
    default: string
    loading: string
    disabled: string
    withCustomActions: string
  }
  docs: {
    categoryProps: string
    propNames: {
      placeholder: string
      disabled: string
      maxRows: string
      loading: string
    }
    descriptions: {
      placeholder: string
      disabled: string
      maxRows: string
      loading: string
    }
  }
}

const localeText: Record<Locale, LocaleText> = {
  en: {
    placeholder: 'Type a message...',
    loadingValue: 'Generating response...',
    disabledPlaceholder: 'Chat is disabled...',
    enterHint: 'Press Enter to send · Shift+Enter for new line',
    disabledHint: 'Chat disabled - e.g. while generating a response',
    actionLabels: {
      attachFile: 'Attach file',
      addEmoji: 'Add emoji',
    },
    storyNames: {
      default: 'Default',
      loading: 'Loading',
      disabled: 'Disabled',
      withCustomActions: 'With Custom Actions',
    },
    docs: {
      categoryProps: 'Props',
      propNames: {
        placeholder: 'placeholder',
        disabled: 'disabled',
        maxRows: 'maxRows',
        loading: 'loading',
      },
      descriptions: {
        placeholder: 'Placeholder text shown in the composer',
        disabled: 'Disable editing and submission',
        maxRows: 'Maximum number of visible rows before scrolling',
        loading: 'Show loading state for the send action',
      },
    },
  },
  id: {
    placeholder: 'Ketik pesan...',
    loadingValue: 'Sedang menyiapkan balasan...',
    disabledPlaceholder: 'Obrolan dinonaktifkan...',
    enterHint: 'Tekan Enter untuk mengirim · Shift+Enter untuk baris baru',
    disabledHint: 'Obrolan dinonaktifkan - misalnya saat menyiapkan balasan',
    actionLabels: {
      attachFile: 'Lampirkan file',
      addEmoji: 'Tambahkan emoji',
    },
    storyNames: {
      default: 'Bawaan',
      loading: 'Memuat',
      disabled: 'Dinonaktifkan',
      withCustomActions: 'Dengan Aksi Kustom',
    },
    docs: {
      categoryProps: 'Properti',
      propNames: {
        placeholder: 'placeholder',
        disabled: 'dinonaktifkan',
        maxRows: 'barisMaksimum',
        loading: 'memuat',
      },
      descriptions: {
        placeholder: 'Teks placeholder yang ditampilkan di composer',
        disabled: 'Nonaktifkan pengeditan dan pengiriman',
        maxRows: 'Jumlah baris maksimum yang terlihat sebelum bergulir',
        loading: 'Tampilkan status memuat untuk aksi kirim',
      },
    },
  },
  zh: {
    placeholder: '输入消息...',
    loadingValue: '正在生成回复...',
    disabledPlaceholder: '聊天已禁用...',
    enterHint: '按 Enter 发送 · Shift+Enter 换行',
    disabledHint: '聊天已禁用 - 例如在生成回复时',
    actionLabels: {
      attachFile: '附加文件',
      addEmoji: '添加表情',
    },
    storyNames: {
      default: '默认',
      loading: '加载中',
      disabled: '已禁用',
      withCustomActions: '带自定义操作',
    },
    docs: {
      categoryProps: '属性',
      propNames: {
        placeholder: '占位文本',
        disabled: '禁用',
        maxRows: '最大行数',
        loading: '加载中',
      },
      descriptions: {
        placeholder: '显示在输入框中的占位文本',
        disabled: '禁用编辑和发送',
        maxRows: '滚动前可见的最大行数',
        loading: '显示发送动作的加载状态',
      },
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => localeText[getLocale()])
const getStoryName = (key: keyof LocaleText['storyNames']) =>
  localeText[getLocale()].storyNames[key]

const buildArgTypes = (locale: Locale): NonNullable<Meta<typeof ChatInput>['argTypes']> => {
  const copy = localeText[locale]
  return {
    placeholder: {
      name: copy.docs.propNames.placeholder,
      description: copy.docs.descriptions.placeholder,
      control: 'text',
      table: {
        category: copy.docs.categoryProps,
      },
    },
    disabled: {
      name: copy.docs.propNames.disabled,
      description: copy.docs.descriptions.disabled,
      control: 'boolean',
      table: {
        category: copy.docs.categoryProps,
      },
    },
    maxRows: {
      name: copy.docs.propNames.maxRows,
      description: copy.docs.descriptions.maxRows,
      control: 'number',
      table: {
        category: copy.docs.categoryProps,
      },
    },
    loading: {
      name: copy.docs.propNames.loading,
      description: copy.docs.descriptions.loading,
      control: 'boolean',
      table: {
        category: copy.docs.categoryProps,
      },
    },
  }
}

// ── Canvas decorator ──────────────────────────────────────────────────────────
const canvas = () => ({
  template: `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 48px 32px;
      background-color: #eceae4;
      background-image: radial-gradient(circle, rgba(0,0,0,0.11) 1px, transparent 1px);
      background-size: 22px 22px;
    ">
      <div style="width:100%;max-width:580px;">
        <story />
      </div>
    </div>
  `,
})

const meta: Meta<typeof ChatInput> = {
  title: 'Organisms/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
  decorators: [
    (story, context) => {
      const locale = resolveLocale(context.globals.locale)
      ;(context as { argTypes: Record<string, unknown> }).argTypes = {
        ...(context.argTypes as Record<string, unknown>),
        ...(buildArgTypes(locale) as Record<string, unknown>),
      }
      return story()
    },
    canvas,
  ],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    ...buildArgTypes('en'),
  },
  args: {
    placeholder: '',
    disabled: false,
    maxRows: 5,
    loading: false,
  },
}
export default meta
type Story = StoryObj<typeof ChatInput>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { ChatInput },
    setup() {
      const copy = useCopy()
      const value = ref('')
      const messages = ref<string[]>([])
      function onSubmit(msg: string) {
        messages.value.push(msg)
        value.value = ''
      }
      const resolvedArgs = computed(() => ({
        ...args,
        placeholder: args.placeholder || copy.value.placeholder,
      }))
      return { copy, resolvedArgs, value, messages, onSubmit }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div
          v-if="messages.length"
          style="
            display:flex;flex-direction:column;gap:8px;
            max-height:200px;overflow-y:auto;
            padding:12px;border-radius:var(--radius-lg);
            background:var(--color-neutral-light);
          "
        >
          <div
            v-for="(msg, i) in messages"
            :key="i"
            style="
              align-self:flex-end;max-width:80%;padding:8px 14px;
              background:var(--color-neutral);color:white;
              border-radius:calc(var(--radius-lg) - 1px);font-size:14px;
            "
          >{{ msg }}</div>
        </div>
        <ChatInput
          v-bind="resolvedArgs"
          v-model="value"
          @submit="onSubmit"
        />
        <p style="font-size:12px;color:var(--color-text-tertiary);text-align:center;">
          {{ copy.enterHint }}
        </p>
      </div>
    `,
  }),
}

export const Loading: Story = {
  get name() {
    return getStoryName('loading')
  },
  render: () => ({
    components: { ChatInput },
    setup() {
      const copy = useCopy()
      return { copy }
    },
    template: `
      <ChatInput
        :loading="true"
        :model-value="copy.loadingValue"
        :placeholder="copy.placeholder"
      />
    `,
  }),
}

export const Disabled: Story = {
  get name() {
    return getStoryName('disabled')
  },
  render: () => ({
    components: { ChatInput },
    setup() {
      const copy = useCopy()
      const value = ref('')
      return { copy, value }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <ChatInput
          v-model="value"
          :disabled="true"
          :placeholder="copy.disabledPlaceholder"
        />
        <p style="font-size:12px;color:var(--color-text-tertiary);text-align:center;">
          {{ copy.disabledHint }}
        </p>
      </div>
    `,
  }),
}

export const WithCustomActions: Story = {
  get name() {
    return getStoryName('withCustomActions')
  },
  render: () => ({
    components: { ChatInput, RiAttachmentLine, RiEmotionLine },
    setup() {
      const copy = useCopy()
      const value = ref('')
      return { copy, value }
    },
    template: `
      <ChatInput v-model="value" :placeholder="copy.placeholder">
        <template #actions-start>
          <button
            type="button"
            style="
              display:flex;align-items:center;justify-content:center;
              width:32px;height:32px;border-radius:var(--radius-md);
              color:var(--color-text-secondary);background:transparent;border:none;
              cursor:pointer;transition:background 0.15s, color 0.15s;
            "
            :aria-label="copy.actionLabels.attachFile"
          >
            <RiAttachmentLine :size="18" />
          </button>
          <button
            type="button"
            style="
              display:flex;align-items:center;justify-content:center;
              width:32px;height:32px;border-radius:var(--radius-md);
              color:var(--color-text-secondary);background:transparent;border:none;
              cursor:pointer;transition:background 0.15s, color 0.15s;
            "
            :aria-label="copy.actionLabels.addEmoji"
          >
            <RiEmotionLine :size="18" />
          </button>
        </template>
      </ChatInput>
    `,
  }),
}
