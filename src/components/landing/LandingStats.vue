<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Container from '@/components/atoms/Container/Container.vue'

const stats = [
  { target: 200, suffix: '+', label: 'Pasangan Bahagia' },
  { target: 10000, suffix: '+', label: 'Tamu Diundang' },
  { target: 176, suffix: 'K+', label: 'Link Dibuka' },
  { target: 61, suffix: 'K+', label: 'Pengunjung Unik' },
]

const displays = ref(stats.map(() => 0))
const hasAnimated = ref(false)
const sectionRef = ref<HTMLElement | null>(null)

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function animateAll() {
  if (hasAnimated.value) return
  hasAnimated.value = true
  stats.forEach((stat, i) => {
    setTimeout(() => {
      const start = performance.now()
      function frame(now: number) {
        const elapsed = now - start
        const progress = Math.min(elapsed / 1800, 1)
        displays.value[i] = Math.floor(easeOutCubic(progress) * stat.target)
        if (progress < 1) requestAnimationFrame(frame)
        else displays.value[i] = stat.target
      }
      requestAnimationFrame(frame)
    }, i * 120)
  })
}

function fmt(val: number) {
  return val.toLocaleString('id-ID')
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) animateAll() },
    { threshold: 0.3 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section ref="sectionRef" class="py-20" style="background: color-mix(in oklch, var(--color-primary) 85%, black)">
    <Container size="xl">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div v-for="(stat, i) in stats" :key="stat.label" class="flex flex-col items-center gap-2">
          <div class="text-5xl md:text-6xl font-bold text-[var(--color-text-inverse)] tracking-tight" style="font-family: var(--font-display); font-variant-numeric: tabular-nums">
            {{ fmt(displays[i]) }}<span class="opacity-60">{{ stat.suffix }}</span>
          </div>
          <div class="text-sm font-medium text-white/70">{{ stat.label }}</div>
        </div>
      </div>
    </Container>
  </section>
</template>
