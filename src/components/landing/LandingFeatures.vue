<script setup lang="ts">
import Container from '@/components/atoms/Container/Container.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const features = [
  { icon: 'RiMailSendLine', title: 'Undangan Digital', desc: 'Undangan elegan dan interaktif yang siap dibagikan ke semua tamu undangan.' },
  { icon: 'RiGroupLine', title: 'Buku Tamu (RSVP)', desc: 'Atur otomatisasi dan daftar hadir tamu dengan sistem yang cerdas.' },
  { icon: 'RiCameraLine', title: 'Filter Instagram', desc: 'Ciptakan momen tak terlupakan dengan filter kustom untuk acaramu.' },
  { icon: 'RiSparklingLine', title: 'AI Generator', desc: 'Rangkai teks undangan secara otomatis dengan bantuan kecerdasan buatan.' },
  { icon: 'RiWhatsappLine', title: 'Otomatisasi WA', desc: 'Kirim pengingat dan konfirmasi lewat WhatsApp secara instan.' },
  { icon: 'RiShieldCheckLine', title: 'Keamanan Data', desc: 'Sistem terenkripsi untuk melindungi privasi data event anda.' },
]
</script>

<template>
  <section class="py-20 bg-[var(--color-bg)]">
    <Container size="xl">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-[var(--color-text-heading)] tracking-tight mb-4" style="font-family: var(--font-display)">
          Semua yang Kamu Butuhkan
        </h2>
        <p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Satu platform lengkap untuk membuat undangan digital yang berkesan dan profesional.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col items-start p-6 rounded-[var(--radius-xl)] hover:bg-[var(--color-surface)] hover:shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-normal)]"
        >
          <div class="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center mb-4">
            <Icon :name="feature.icon" size="lg" />
          </div>
          <h3 class="text-lg font-semibold text-[var(--color-text-heading)] mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-[var(--color-text-secondary)] leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </Container>
  </section>
</template>
