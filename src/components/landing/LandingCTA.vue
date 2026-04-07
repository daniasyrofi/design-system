<script setup lang="ts">
import Container from '@/components/atoms/Container/Container.vue'
import Button from '@/components/atoms/Button/Button.vue'
</script>

<template>
  <section class="py-24 bg-[var(--color-primary)] relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 pointer-events-none"></div>
    <Container size="lg" class="relative z-10">
      <div class="text-center flex flex-col items-center gap-6">
        <h2 class="text-3xl md:text-5xl font-bold text-[var(--color-text-inverse)] tracking-tight max-w-2xl" style="font-family: var(--font-display)">
          Siap Abadikan Momen Spesialmu?
        </h2>
        <p class="text-lg text-white/80 max-w-xl">
          Mulai buat undangan digital yang berkesan dalam hitungan menit. Gratis untuk dicoba.
        </p>
        <Button variant="default" size="lg" class="shadow-lg mt-2">Mulai Sekarang — Gratis</Button>
      </div>
    </Container>
  </section>
</template>
