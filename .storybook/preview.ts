import type { Preview } from '@storybook/vue3-vite'
import type { App } from 'vue'
import { setup } from '@storybook/vue3-vite'
import '../src/styles/globals.css'
import { i18n, resolveLocale, setI18nLocale } from '../src/i18n'
import { addons } from 'storybook/preview-api'
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'
import { lightTheme, darkTheme } from './theme'

type ThemeMode = 'light' | 'dark'
type DarkModeStore = { current?: ThemeMode }

const DARK_MODE_STORAGE_KEY = 'sb-addon-themes-3'

const getStoredTheme = (): ThemeMode | null => {
  try {
    const raw = window.localStorage.getItem(DARK_MODE_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as DarkModeStore
    return parsed.current === 'dark' || parsed.current === 'light' ? parsed.current : null
  } catch {
    return null
  }
}

const detectThemeFromClasses = (): ThemeMode | null => {
  const html = document.documentElement
  const body = document.body
  const hasDarkClass = html.classList.contains('dark')
    || html.classList.contains('sb-main-dark')
    || body?.classList.contains('dark')
    || body?.classList.contains('sb-main-dark')

  const hasLightClass = html.classList.contains('light')
    || html.classList.contains('sb-main-light')
    || body?.classList.contains('light')
    || body?.classList.contains('sb-main-light')

  if (hasDarkClass) return 'dark'
  if (hasLightClass) return 'light'
  return null
}

const resolveThemeMode = (): ThemeMode => detectThemeFromClasses() ?? getStoredTheme() ?? 'light'

const applyThemeMode = (theme: ThemeMode) => {
  document.documentElement.setAttribute('data-theme', theme)
  if (document.body) {
    document.body.setAttribute('data-theme', theme)
  }
}

const channel = addons.getChannel()
channel.on(DARK_MODE_EVENT_NAME, (isDark: boolean) => {
  applyThemeMode(isDark ? 'dark' : 'light')
})
applyThemeMode(resolveThemeMode())
setup((app: App) => {
  app.use(i18n)
})

const preview: Preview = {
  globalTypes: {

    locale: {
      description: 'Language',
      defaultValue: 'en',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'id', right: '🇮🇩', title: 'Bahasa Indonesia' },
          { value: 'en', right: '🇬🇧', title: 'English'          },
          { value: 'zh', right: '🇨🇳', title: 'Mandarin'         },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (story, context) => {
      applyThemeMode(resolveThemeMode())
      const locale = resolveLocale(context.globals.locale)
      setI18nLocale(locale)
      document.documentElement.setAttribute('lang', locale)
      document.documentElement.setAttribute('data-locale', locale)

      return {
        template: `<story />`,
      }
    },
  ],

  parameters: {
    darkMode: {
      dark: darkTheme,
      light: lightTheme,
      stylePreview: true,
    },
    viewport: {
      viewports: {
        phonePortrait:   { name: 'Phone Portrait',   styles: { width: '375px',  height: '812px' } },
        phoneLandscape:  { name: 'Phone Landscape',  styles: { width: '812px',  height: '375px' } },
        tabletPortrait:  { name: 'Tablet Portrait',  styles: { width: '768px',  height: '1024px'} },
        tabletLandscape: { name: 'Tablet Landscape', styles: { width: '1024px', height: '768px' } },
        desktop:         { name: 'Desktop',          styles: { width: '1280px', height: '800px' } },
        desktopLarge:    { name: 'Desktop Large',    styles: { width: '1536px', height: '960px' } },
      },
    },
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    layout: 'padded',
  },
}

export default preview
