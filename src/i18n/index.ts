import { createI18n } from 'vue-i18n'
import type { MessageSchema } from './types'
import id from './locales/id'
import en from './locales/en'
import zh from './locales/zh'

export type SupportedLocale = 'id' | 'en' | 'zh'

export const resolveLocale = (value: unknown): SupportedLocale => {
  if (value === 'id' || value === 'zh') return value
  return 'en'
}

const readSavedLocale = (): SupportedLocale => {
  if (typeof window === 'undefined') return 'en'
  return resolveLocale(window.localStorage.getItem('ds-locale'))
}

const savedLocale = readSavedLocale()

export const i18n = createI18n<[MessageSchema], SupportedLocale>({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { id, en, zh },
})

export const getI18nLocale = (): SupportedLocale => {
  const localeState = i18n.global.locale as unknown
  const rawLocale =
    typeof localeState === 'string'
      ? localeState
      : (localeState as { value: unknown }).value
  return resolveLocale(rawLocale)
}

export const setI18nLocale = (locale: SupportedLocale): void => {
  const localeState = i18n.global.locale as unknown
  if (typeof localeState === 'string') {
    ;(i18n.global as { locale: SupportedLocale }).locale = locale
  } else {
    ;(localeState as { value: SupportedLocale }).value = locale
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem('ds-locale', locale)
  }
}

setI18nLocale(savedLocale)
