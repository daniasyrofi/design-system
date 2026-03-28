import type { Preview } from '@storybook/vue3-vite'
import type { App } from 'vue'
import { setup } from '@storybook/vue3-vite'
import '../src/styles/globals.css'
import { i18n } from '../src/i18n'

setup((app: App) => {
  app.use(i18n)
})

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun',  title: 'Light' },
          { value: 'dark',  icon: 'moon', title: 'Dark'  },
        ],
        dynamicTitle: true,
      },
    },
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
      defaultValue: 'id',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'id', right: '🇮🇩', title: 'Bahasa Indonesia' },
          { value: 'en', right: '🇬🇧', title: 'English'          },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (story, context) => {
      const theme   = context.globals.theme   ?? 'light'
      const spacing = context.globals.spacing ?? 'grid'
      const density = context.globals.density ?? 'comfortable'
      const locale  = context.globals.locale  ?? 'id'

      document.documentElement.setAttribute('data-theme',   theme)
      document.documentElement.setAttribute('data-spacing', spacing)
      document.documentElement.setAttribute('data-density', density)
      document.body.setAttribute('data-theme', theme)

      // @ts-ignore
      i18n.global.locale.value = locale as 'id' | 'en'

      return {
        template: `<story />`,
      }
    },
  ],

  parameters: {
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
