<script setup lang="ts">
import Container from '@/components/atoms/Container/Container.vue'
import Card from '@/components/molecules/Card/Card.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'

const themes = [
  { name: 'Elegant Rose', price: 'Rp 150.000', badge: null, color: '#be123c' },
  { name: 'Garden Romance', price: 'Rp 250.000', badge: 'Popular', color: '#16a34a' },
  { name: 'Minimalist Gold', price: 'Rp 200.000', badge: 'New', color: '#ca8a04' },
  { name: 'Royal Classic', price: 'Rp 350.000', badge: null, color: '#7c3aed' },
]
</script>

<template>
  <section class="py-20 bg-[var(--color-bg)]">
    <Container size="xl">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-[var(--color-text-heading)] tracking-tight mb-4" style="font-family: var(--font-display)">
          Pilih Tema Undanganmu
        </h2>
        <p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Koleksi tema premium yang dirancang khusus untuk momen spesialmu.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          v-for="theme in themes"
          :key="theme.name"
          variant="outlined"
          padding="none"
          radius="xl"
          hoverable
          :class="theme.badge === 'Popular' ? 'ring-2 ring-[var(--color-primary)]' : ''"
        >
          <template #media>
            <div
              class="h-48 w-full rounded-t-[var(--radius-xl)] flex items-center justify-center"
              :style="{ background: `linear-gradient(135deg, ${theme.color}22, ${theme.color}44)` }"
            >
              <span class="text-4xl font-bold opacity-20" :style="{ color: theme.color }">Preview</span>
            </div>
          </template>
          <div class="p-5 flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold text-[var(--color-text-heading)]">{{ theme.name }}</h3>
              <Badge v-if="theme.badge" :variant="theme.badge === 'Popular' ? 'primary' : 'info'" size="sm">{{ theme.badge }}</Badge>
            </div>
            <div class="text-2xl font-bold text-[var(--color-text-heading)]" style="font-family: var(--font-display)">{{ theme.price }}</div>
            <Button variant="primary" size="sm" full-width>Pilih Tema</Button>
          </div>
        </Card>
      </div>
    </Container>
  </section>
</template>
