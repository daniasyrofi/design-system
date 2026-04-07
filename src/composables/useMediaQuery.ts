import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

/**
 * Reactively track a CSS media query match state.
 *
 * @param query - CSS media query string (e.g. '(min-width: 768px)')
 * @returns Reactive boolean ref that updates when the media query match changes
 */
export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false)
  let mediaQuery: MediaQueryList | null = null

  function update() {
    matches.value = mediaQuery?.matches ?? false
  }

  onMounted(() => {
    mediaQuery = window.matchMedia(query)
    update()
    mediaQuery.addEventListener('change', update)
  })

  onBeforeUnmount(() => {
    mediaQuery?.removeEventListener('change', update)
  })

  return matches
}
