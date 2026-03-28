import type { Preview } from '@storybook/vue3-vite'
import type { App } from 'vue'
import { setup } from '@storybook/vue3-vite'
import '../src/styles/globals.css'
import { i18n } from '../src/i18n'
import { addons } from 'storybook/preview-api'
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'
import { lightTheme, darkTheme } from './theme'

const channel = addons.getChannel()
channel.on(DARK_MODE_EVENT_NAME, (isDark: boolean) => {
  const theme = isDark ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  document.body.setAttribute('data-theme', theme)
})
setup((app: App) => {
  app.use(i18n)
})

const preview: Preview = {
  globalTypes: {
    spacing: {
      description: 'Spacing scale',
      defaultValue: 'grid',
      toolbar: {
        title: 'Spacing',
        icon: 'ruler',
        items: [
          { value: 'grid',   title: '4px Grid'     },
          { value: 'golden', title: 'Golden Ratio'  },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: 'Density',
      defaultValue: 'comfortable',
      toolbar: {
        title: 'Density',
        icon: 'component',
        items: [
          { value: 'compact',     title: 'Compact'     },
          { value: 'comfortable', title: 'Comfortable' },
          { value: 'spacious',    title: 'Spacious'    },
        ],
        dynamicTitle: true,
      },
    },
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
      const spacing = context.globals.spacing ?? 'grid'
      const density = context.globals.density ?? 'comfortable'
      const locale  = context.globals.locale  ?? 'id'

      document.documentElement.setAttribute('data-spacing', spacing)
      document.documentElement.setAttribute('data-density', density)

      // @ts-ignore
      i18n.global.locale.value = locale as 'id' | 'en' | 'zh'

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
