import { ref, watchEffect } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'ds-theme'

const isClient = typeof window !== 'undefined'

function getInitialTheme(): Theme {
  if (!isClient) return 'light'
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref<Theme>(getInitialTheme())

if (isClient) {
  watchEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.value)
    localStorage.setItem(STORAGE_KEY, theme.value)
  })
}

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function set(value: Theme) {
    theme.value = value
  }

  return { theme, toggle, set }
}
