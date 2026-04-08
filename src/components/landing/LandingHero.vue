<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, inject } from 'vue'
import Navbar from '@/components/organisms/Navbar/Navbar.vue'
import Button from '@/components/atoms/Button/Button.vue'

const navigateTo = inject<(page: string) => void>('navigate', () => {})

const megaIcons = {
  OnCall:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5ZM16 13H8V15H16V13Z"/></svg>',
  Fire: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23C8.13401 23 5 19.866 5 16C5 12.134 7.6 10.3 8.32235 9.0792C8.68164 8.47228 8.85196 7.78018 8.81432 7.08051L8.74087 5.7144C8.70566 5.05942 9.53032 4.67389 10.0384 5.10705L10.3168 5.34444C11.5348 6.38287 12.3061 7.82071 12.4496 9.38766C12.508 10.0249 13.0457 10.5186 13.6845 10.5284C14.3644 10.5389 14.8878 9.93922 14.7891 9.26426L14.6548 8.34563C14.5422 7.5759 15.3627 7.01633 16.0593 7.3871C17.8427 8.33644 19 10.2241 19 12.3274C19 14.4716 18.0673 16.4897 16.3653 17.8465C15.9388 18.1864 15.5492 18.5759 15.2093 19.0024C14.5358 19.8475 13.3377 20.2443 12.3392 19.9882C11.6666 19.8157 11.2335 19.1419 11.2988 18.4485C11.3789 17.5977 12.0913 16.9663 12.9231 16.9205H13C13.5523 16.9205 14 16.4728 14 15.9205C14 15.3682 13.5523 14.9205 13 14.9205H12C9.79086 14.9205 8 16.7114 8 18.9205C8 20.6186 9.05739 22.187 10.6121 22.808C11.054 22.9845 11.5225 23 12 23Z"/></svg>',
  Status:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5H7V19H3V5ZM10 5H14V19H10V5ZM17 5H21V19H17V5Z"/></svg>',
}

const showMega = ref(false)
const hovering = ref(false)
const isScrolled = ref(false)
const bgActive = computed(() => isScrolled.value || hovering.value || showMega.value)

const pillClasses = computed(() => {
  if (!isScrolled.value && !hovering.value && !showMega.value) {
    // Hero: transparent, full-width
    return 'max-w-[1040px] bg-transparent border border-transparent rounded-none shadow-none'
  }
  if (showMega.value) {
    // Mega open: white pill, top radius only
    return 'max-w-[720px] bg-white border border-[var(--color-border)] rounded-t-[20px] rounded-b-none shadow-none'
  }
  // Scrolled / hovered: full white pill
  return 'max-w-[720px] bg-white border border-[var(--color-border)] rounded-[20px] shadow-sm'
})

function onScroll() {
  isScrolled.value = window.scrollY > 80
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  startCounters()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function onNavEnter() {
  hovering.value = true
}
function onNavLeave() {
  hovering.value = false
  showMega.value = false
}
function onMegaEnter() {
  showMega.value = true
}
function onMegaLeave() {
  showMega.value = false
}

// ── Counter animation ────────────────────────────────────────────────────────
const stats = [
  { target: 12000, suffix: '+', label: 'Pasangan Bahagia', display: ref(0) },
  { target: 50000, suffix: '+', label: 'Tamu Diundang', display: ref(0) },
  { target: 15000, suffix: '+', label: 'Ucapan & Doa', display: ref(0) },
  { target: 176, suffix: 'K+', label: 'Link Dibuka', display: ref(0) },
]

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function animateCounter(stat: (typeof stats)[0], duration = 1800, delay = 0) {
  setTimeout(() => {
    const start = performance.now()
    function frame(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      stat.display.value = Math.floor(easeOutCubic(progress) * stat.target)
      if (progress < 1) requestAnimationFrame(frame)
      else stat.display.value = stat.target
    }
    requestAnimationFrame(frame)
  }, delay)
}

function startCounters() {
  stats.forEach((stat, i) => animateCounter(stat, 1800, i * 120))
}

function fmt(val: number) {
  return val.toLocaleString('id-ID')
}
</script>

<template>
  <div class="hero-root">
    <!-- Radial glow overlay -->
    <div class="hero-glow" aria-hidden="true"></div>

    <!-- Fixed nav block: top bar + main navbar (fixed beats overflow-x:hidden on hero-root) -->
    <div class="fixed top-0 left-0 right-0 z-[100]">

      <!-- Top utility bar — collapses on scroll -->
      <div
        class="overflow-hidden transition-[max-height,opacity] duration-300 bg-[#0a0a0a]"
        :class="isScrolled ? 'max-h-0 opacity-0' : 'max-h-[48px] opacity-100'"
      >
        <div class="flex items-center justify-between px-5 py-[4px] max-w-[1040px] mx-auto">
          <!-- Personal / Bisnis tabs -->
          <div class="flex items-center gap-1">
            <!-- Active: bg + bottom line. Hover: bg only -->
            <button
              class="text-[13px] font-[600] px-[10px] py-[5px] rounded-lg text-white bg-white/15 border-b-2 border-white whitespace-nowrap transition-colors"
            >Personal</button>
            <button
              class="text-[13px] font-[600] px-[10px] py-[5px] rounded-lg text-white/50 border-b-2 border-transparent whitespace-nowrap hover:text-white hover:bg-white/10 transition-colors"
              @click="navigateTo('business')"
            >Bisnis</button>
          </div>
          <!-- EN / ID language toggle -->
          <div class="flex items-center bg-[#232323] rounded-full h-[28px] px-[2px] gap-0">
            <span class="text-[12px] font-[600] bg-white text-black rounded-full w-[24px] h-[24px] flex items-center justify-center cursor-pointer hover:bg-white/90 transition-colors">EN</span>
            <span class="text-[12px] font-[600] text-white/50 rounded-full w-[24px] h-[24px] flex items-center justify-center cursor-pointer hover:text-white hover:bg-white/10 transition-colors">ID</span>
          </div>
        </div>
      </div>

      <!-- Pill outer: padding transitions on scroll -->
      <div
        class="flex justify-center transition-[padding] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        :class="isScrolled ? 'px-4 py-2' : 'px-0 py-0'"
      >
        <!-- Pill inner: animates max-width, bg, border, radius, shadow -->
        <div
          class="w-full transition-[max-width,background-color,border-color,border-radius,box-shadow] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden"
          :class="pillClasses"
        >
      <!-- Main Navbar — content shell only -->
      <Navbar
        variant="transparent"
        :sticky="false"
        :border="false"
        class="!px-5 !max-w-full"
      >
      <template #start>
        <div
          class="flex items-center w-[160px] h-[50px] cursor-pointer"
          :style="{
            color: bgActive ? 'var(--color-text-heading)' : 'var(--color-text-inverse)',
            transition: 'color var(--duration-slow)',
          }"
        >
          <div
            class="w-[150px] h-[48px] bg-current -ml-2"
            style="
              mask: url('/abadikan-wordmark.svg') no-repeat left center/contain;
              -webkit-mask: url('/abadikan-wordmark.svg') no-repeat left center/contain;
            "
          ></div>
        </div>
      </template>

      <template #center>
        <nav
          class="flex h-full items-center justify-center gap-[20px] w-[244px]"
          :style="{
            color: bgActive ? 'var(--color-text-heading)' : 'var(--color-text-inverse)',
            transition: 'color var(--duration-slow)',
          }"
          @mouseenter="onNavEnter"
          @mouseleave="onNavLeave"
        >
          <span class="text-[14px] font-[500] cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap"
            @click="navigateTo('consumer')"
            >Beranda</span
          >

          <div
            class="h-full flex items-center cursor-pointer"
            @mouseenter="onMegaEnter"
            @mouseleave="onMegaLeave"
          >
            <span
              class="text-[14px] font-[500] hover:opacity-70 transition-opacity flex items-center gap-[3px] h-full whitespace-nowrap"
              @click.stop="navigateTo('template')"
            >
              Template
              <svg
                class="w-3 h-3 mt-[1px] transition-transform duration-300"
                :class="showMega ? 'rotate-180' : 'rotate-0'"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 4L6 8L10 4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <transition
              enter-active-class="transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div
                v-show="showMega"
                class="absolute top-[100%] left-[-1px] w-[calc(100%+2px)] bg-white rounded-b-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-t-0 border-[var(--color-border)] p-5 pt-6 flex flex-col gap-4 text-left cursor-default -z-10 origin-top"
              >
                <div class="grid grid-cols-3 gap-5 normal-case tracking-normal">
                  <div>
                    <h4
                      class="text-[10px] font-bold text-[var(--color-text-tertiary)] tracking-wider mb-4 uppercase"
                    >
                      Produk
                    </h4>
                    <div class="flex flex-col gap-3">
                      <a
                        href="#"
                        class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors"
                      >
                        <div class="text-[var(--color-primary)] mt-0.5" v-html="megaIcons.OnCall"></div>
                        <div>
                          <div
                            class="text-[13px] font-[650] text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors"
                          >
                            Undangan Digital
                          </div>
                          <div class="text-[12px] text-[var(--color-text-secondary)] mt-0.5 mb-1 text-balance">
                            Undangan elegan dan interaktif siap di share
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors"
                      >
                        <div class="text-[var(--color-primary)] mt-0.5" v-html="megaIcons.Status"></div>
                        <div>
                          <div
                            class="text-[13px] font-[650] text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors"
                          >
                            Buku Tamu (RSVP)
                          </div>
                          <div class="text-[12px] text-[var(--color-text-secondary)] mt-0.5 text-balance">
                            Atur otomatisasi dan daftar hadir dengan cerdas
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors"
                      >
                        <div
                          class="text-[var(--color-primary)] mt-0.5 flex justify-center"
                          v-html="megaIcons.Fire"
                        ></div>
                        <div>
                          <div
                            class="text-[13px] font-[650] text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors"
                          >
                            Filter Instagram
                          </div>
                          <div class="text-[12px] text-[var(--color-text-secondary)] mt-0.5 text-balance">
                            Ciptakan momen tak terlupakan dengan filter kustom
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4
                      class="text-[10px] font-bold text-[var(--color-text-tertiary)] tracking-wider mb-4 uppercase"
                    >
                      Platform
                    </h4>
                    <div class="flex flex-col gap-1">
                      <a
                        href="#"
                        class="p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors"
                      >
                        <div
                          class="text-[13px] font-[650] text-[var(--color-text-heading)] flex items-center gap-2 group-hover:text-[var(--color-primary)] transition-colors"
                        >
                          AI Generator
                          <span
                            class="bg-[var(--color-primary-light)] text-[var(--color-primary)] text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wider"
                            >NEW</span
                          >
                        </div>
                        <div class="text-[12px] text-[var(--color-text-secondary)] mt-0.5 leading-snug">
                          Rangkai teks undangan secara otomatis dengan cerdas.
                        </div>
                      </a>
                      <a
                        href="#"
                        class="p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors"
                      >
                        <div
                          class="text-[13px] font-[650] text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors"
                        >
                          Otomatisasi WA
                        </div>
                        <div class="text-[12px] text-[var(--color-text-secondary)] mt-0.5 leading-snug">
                          Kirim pengingat reservasi lewat WhatsApp secara instan.
                        </div>
                      </a>
                      <a
                        href="#"
                        class="p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors"
                      >
                        <div
                          class="text-[13px] font-[650] text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors"
                        >
                          Keamanan Data
                        </div>
                        <div class="text-[12px] text-[var(--color-text-secondary)] mt-0.5 leading-snug">
                          Sistem terenkripsi untuk melindungi privasi event anda.
                        </div>
                      </a>
                    </div>
                  </div>

                  <div class="flex flex-col">
                    <h4
                      class="text-[10px] font-bold text-[var(--color-text-tertiary)] tracking-wider mb-4 uppercase"
                    >
                      Unggulan
                    </h4>
                    <div
                      class="flex-1 rounded-2xl bg-[var(--color-neutral)] p-4 flex flex-col items-center text-center relative overflow-hidden group/card shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-pointer"
                    >
                      <div
                        class="text-[9px] tracking-widest text-[var(--color-primary)] font-bold mb-2 z-10 uppercase"
                      >
                        The Abadikan Way
                      </div>
                      <div
                        class="text-[16px] font-[600] leading-tight text-[var(--color-text-inverse)] mb-4 z-10 max-w-[150px] tracking-tight"
                      >
                        Momen bahagia anda pantas dirayakan secara mewah.
                      </div>
                      <div
                        class="mt-auto px-4 py-1.5 border border-white/20 rounded-lg text-[12px] font-semibold text-[var(--color-text-inverse)] z-10 hover:bg-white hover:text-black transition-colors"
                      >
                        Baca Selengkapnya
                      </div>
                      <div
                        class="absolute -bottom-16 w-[200px] h-[140px] bg-[var(--color-primary)] rounded-full blur-[40px] opacity-40 group-hover/card:opacity-60 transition-opacity duration-500"
                      ></div>
                      <div
                        class="absolute bottom-6 w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[#f44336] z-10 shadow-[0_0_20px_var(--color-primary)] flex items-center justify-center text-white scale-0 group-hover/card:scale-100 transition-transform duration-300"
                        v-html="megaIcons.Fire"
                      ></div>
                    </div>
                  </div>
                </div>

                <div
                  class="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between"
                >
                  <div class="flex gap-6 text-[13px] font-[600] text-[var(--color-text-secondary)]">
                    <a href="#" class="hover:text-[var(--color-text-heading)]">Integrasi</a>
                    <a href="#" class="hover:text-[var(--color-text-heading)]">Pelajari Fitur</a>
                  </div>
                  <Button variant="primary" size="sm">Mulai sekarang</Button>
                </div>
              </div>
            </transition>
          </div>

          <span class="text-[14px] font-[500] cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap"
            @click="navigateTo('harga')"
            >Harga</span
          >
          <span class="text-[14px] font-[500] cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap"
            @click="navigateTo('blog')"
            >Blog</span
          >
        </nav>
      </template>

      <template #end>
        <div class="flex items-center gap-[10px] justify-end">
          <Button
            variant="outline"
            size="sm"
            :style="
              !bgActive
                ? '--btn-bg: transparent; --btn-text: var(--color-text-inverse); --btn-border: rgba(255,255,255,0.65); --btn-hover-bg: rgba(255,255,255,0.12); --btn-hover-border: rgba(255,255,255,0.85); --btn-hover-text: var(--color-text-inverse);'
                : ''
            "
            >Login</Button
          >
          <Button
            :variant="bgActive ? 'primary' : 'default'"
            size="sm"
            :style="
              !bgActive
                ? '--btn-bg: var(--color-text-inverse); --btn-text: var(--color-neutral); --btn-border: var(--color-text-inverse); --btn-hover-bg: rgba(255,255,255,0.88); --btn-hover-border: rgba(255,255,255,0.88);'
                : ''
            "
            >Buat Undangan</Button
          >
        </div>
      </template>
      </Navbar>
        </div>
      </div>
    </div>

    <!-- Spacer: top bar (~40px) + main nav (~64px) = 104px in hero state -->
    <div class="shrink-0 transition-[height] duration-300" :class="isScrolled ? 'h-[72px]' : 'h-[104px]'" aria-hidden="true" />

    <!-- Hero body — 2-column asymmetric layout -->
    <div class="hero-body">
      <div class="hero-content-grid">
        <!-- Left: text + CTAs -->
        <div class="hero-left">
          <!-- Overline pill -->
          <div class="hero-overline">
            <span>Platform Undangan Digital #1 yang Bercerita</span>
          </div>

          <!-- H1 -->
          <h1 class="hero-h1">
            Kisah Cintamu,<br />Layak Diabadikan.
          </h1>

          <!-- Subtitle -->
          <p class="hero-sub">
            Buat undangan website pernikahan yang cantik, personal, dan bercerita — langsung dari HP,
            selesai dalam 15 menit.
          </p>

          <!-- CTA row -->
          <div class="hero-ctas">
            <Button
              variant="default"
              size="lg"
              style="--btn-bg: var(--color-text-inverse); --btn-text: var(--color-neutral); --btn-border: var(--color-text-inverse); --btn-hover-bg: rgba(255,255,255,0.88); --btn-hover-border: rgba(255,255,255,0.88); font-weight: 600;"
            >
              Buat Undangan Gratis →
            </Button>
            <Button
              variant="ghost"
              size="lg"
              style="--btn-bg: transparent; --btn-text: var(--color-text-inverse); --btn-border: rgba(255,255,255,0.4); --btn-hover-bg: rgba(255,255,255,0.08); --btn-hover-border: rgba(255,255,255,0.6); --btn-hover-text: var(--color-text-inverse); font-weight: 500;"
            >
              Lihat Contoh Undangan
            </Button>
          </div>

          <!-- Trust line -->
          <p class="hero-trust">
            Dipercaya 12.000+ pasangan · 50.000+ tamu diundang · Gratis untuk dicoba
          </p>
        </div>

        <!-- Right: phone mockup placeholder -->
        <div class="hero-right" aria-hidden="true">
          <div class="hero-mockup">
            <div class="mockup-inner">
              <div class="mockup-label">Preview Undangan</div>
              <div class="mockup-gradient"></div>
              <div class="mockup-shine"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Social proof bar -->
    <div class="social-bar">
      <div class="social-bar-inner">
        <div v-for="(stat, i) in stats" :key="i" class="social-stat">
          <div class="social-num">
            {{ fmt(stat.display.value) }}<span class="social-suffix">{{ stat.suffix }}</span>
          </div>
          <div class="social-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Root ─────────────────────────────────────────────────────────────────── */
.hero-root {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: radial-gradient(ellipse 80% 45% at 50% -10%, oklch(0.55 0.22 18 / 0.35), transparent),
    var(--color-neutral);
  overflow-x: hidden;
  font-family: var(--font-display);
  display: flex;
  flex-direction: column;
}

/* Radial glow (reinforces top center warmth) */
.hero-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse 60% 30% at 50% 0%, oklch(0.55 0.22 18 / 0.18), transparent);
  z-index: 0;
}

/* ── Hero body ────────────────────────────────────────────────────────────── */
.hero-body {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 80px 0 64px;
}

/* 2-column grid */
.hero-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3rem;
}

/* ── Left side ────────────────────────────────────────────────────────────── */
.hero-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

/* Overline pill */
.hero-overline {
  display: inline-flex;
  align-items: center;
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  margin-bottom: 1.25rem;
  font-family: var(--font-ui);
}

/* H1 */
.hero-h1 {
  font-size: clamp(2.8rem, 6vw + 0.5rem, 5rem);
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: var(--color-text-inverse);
  margin: 0 0 1.5rem;
  text-align: left;
}

/* Subtitle */
.hero-sub {
  font-size: clamp(1rem, 0.5vw + 0.875rem, 1.2rem);
  font-family: var(--font-ui);
  font-weight: 400;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.7);
  max-width: 42ch;
  margin: 0 0 2.25rem;
  text-align: left;
}

/* CTA row */
.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

/* Trust line */
.hero-trust {
  font-size: 12px;
  font-family: var(--font-ui);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
  letter-spacing: 0.01em;
}

/* ── Right side — mockup ──────────────────────────────────────────────────── */
.hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-mockup {
  width: 400px;
  height: 560px;
  border-radius: var(--radius-xl, 28px);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    var(--shadow-lg);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.mockup-inner {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mockup-label {
  position: relative;
  z-index: 2;
  font-size: 13px;
  font-family: var(--font-ui);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.mockup-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 50% at 50% 100%, oklch(0.55 0.22 18 / 0.28), transparent),
    radial-gradient(ellipse 50% 40% at 50% 20%, rgba(255, 255, 255, 0.03), transparent);
}

.mockup-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
}

/* ── Social proof bar ─────────────────────────────────────────────────────── */
.social-bar {
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.22);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.25rem var(--space-5, 1.25rem);
}

.social-bar-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 900px;
  margin: 0 auto;
}

.social-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  padding: 0 var(--space-6, 1.5rem);
  position: relative;
}

.social-stat:first-child {
  padding-left: 0;
}
.social-stat:last-child {
  padding-right: 0;
}

.social-stat + .social-stat::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: rgba(255, 255, 255, 0.18);
}

.social-num {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-text-inverse);
  line-height: 1.05;
  letter-spacing: -1.5px;
  font-family: var(--font-display);
  font-variant-numeric: tabular-nums;
}

.social-suffix {
  font-size: 30px;
  font-weight: 700;
  opacity: 0.5;
  letter-spacing: -1px;
}

.social-label {
  font-size: 12px;
  font-family: var(--font-ui);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.4;
}

/* ── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .hero-content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 0 1.5rem;
    text-align: left;
  }

  .hero-right {
    order: -1;
  }

  .hero-mockup {
    width: 100%;
    max-width: 340px;
    height: 420px;
  }

  .social-bar-inner {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem 0;
  }

  .social-stat:nth-child(2)::before {
    display: none;
  }

  .social-stat:nth-child(3)::before {
    display: none;
  }
}

@media (max-width: 500px) {
  .hero-body {
    padding: 60px 0 48px;
  }

  .hero-ctas {
    flex-direction: column;
    width: 100%;
  }

  .social-bar-inner {
    grid-template-columns: repeat(2, 1fr);
  }

  .social-num {
    font-size: 28px;
  }

  .social-suffix {
    font-size: 22px;
  }
}
</style>
