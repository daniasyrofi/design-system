import { watch, type Ref } from 'vue'

export interface InvitationTheme {
  fonts: {
    heading: string  // Google Font name e.g. "Playfair Display"
    body:    string  // Google Font name e.g. "Cormorant Garamond"
  }
  colors: {
    primary:    string
    secondary?: string
    background: string
    text:       string
  }
}

function loadGoogleFont(families: string[]) {
  if (typeof document === 'undefined') return

  const existing = document.querySelector('#inv-google-fonts')
  existing?.remove()

  const encoded = families.map(f => encodeURIComponent(f) + ':wght@400;600;700').join('&family=')
  const link = document.createElement('link')
  link.id   = 'inv-google-fonts'
  link.rel  = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${encoded}&display=swap`
  document.head.appendChild(link)
}

export function useInvitationTheme(
  container: Ref<HTMLElement | null>,
  theme: Ref<InvitationTheme>,
) {
  watch([container, theme], ([el, t]) => {
    if (!el || !t) return

    // Load Google Fonts
    loadGoogleFont([t.fonts.heading, t.fonts.body])

    // Apply CSS custom properties on the container
    el.style.setProperty('--inv-font-heading', `"${t.fonts.heading}", serif`)
    el.style.setProperty('--inv-font-body',    `"${t.fonts.body}", serif`)
    el.style.setProperty('--inv-color-primary', t.colors.primary)
    el.style.setProperty('--inv-color-secondary', t.colors.secondary ?? t.colors.primary)
    el.style.setProperty('--inv-color-bg',      t.colors.background)
    el.style.setProperty('--inv-color-text',    t.colors.text)
  }, { immediate: true, deep: true })
}
