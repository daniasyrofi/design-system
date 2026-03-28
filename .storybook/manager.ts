import { addons } from 'storybook/manager-api'
import { lightTheme, darkTheme } from './theme'

// Dynamically pick theme based on OS preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

addons.setConfig({
  theme: prefersDark ? darkTheme : lightTheme,
  sidebar: {
    showRoots: true,
  },
  panelPosition: 'right',
  toolbar: {
    zoom: { hidden: true },
    grid: { hidden: true },
  },
})

// Listen for OS preference changes and update theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  addons.setConfig({
    theme: e.matches ? darkTheme : lightTheme,
  })
})
