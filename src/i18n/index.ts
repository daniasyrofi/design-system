import { createI18n } from 'vue-i18n'
import type { MessageSchema } from './types'
import id from './locales/id'
import en from './locales/en'
import zh from './locales/zh'

type SupportedLocale = 'id' | 'en' | 'zh'

const savedLocale = (localStorage.getItem('ds-locale') as SupportedLocale) ?? 'en'

export const i18n = createI18n<[MessageSchema], SupportedLocale>({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { id, en, zh },
})

// Persist locale changes
// @ts-ignore
i18n.global.locale.value = savedLocale
