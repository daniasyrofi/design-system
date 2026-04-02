<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Navbar from '@/components/organisms/Navbar/Navbar.vue'
import Button from '@/components/atoms/Button/Button.vue'

const megaIcons = {
  OnCall: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5ZM16 13H8V15H16V13Z"/></svg>',
  Fire:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23C8.13401 23 5 19.866 5 16C5 12.134 7.6 10.3 8.32235 9.0792C8.68164 8.47228 8.85196 7.78018 8.81432 7.08051L8.74087 5.7144C8.70566 5.05942 9.53032 4.67389 10.0384 5.10705L10.3168 5.34444C11.5348 6.38287 12.3061 7.82071 12.4496 9.38766C12.508 10.0249 13.0457 10.5186 13.6845 10.5284C14.3644 10.5389 14.8878 9.93922 14.7891 9.26426L14.6548 8.34563C14.5422 7.5759 15.3627 7.01633 16.0593 7.3871C17.8427 8.33644 19 10.2241 19 12.3274C19 14.4716 18.0673 16.4897 16.3653 17.8465C15.9388 18.1864 15.5492 18.5759 15.2093 19.0024C14.5358 19.8475 13.3377 20.2443 12.3392 19.9882C11.6666 19.8157 11.2335 19.1419 11.2988 18.4485C11.3789 17.5977 12.0913 16.9663 12.9231 16.9205H13C13.5523 16.9205 14 16.4728 14 15.9205C14 15.3682 13.5523 14.9205 13 14.9205H12C9.79086 14.9205 8 16.7114 8 18.9205C8 20.6186 9.05739 22.187 10.6121 22.808C11.054 22.9845 11.5225 23 12 23Z"/></svg>',
  Status: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5H7V19H3V5ZM10 5H14V19H10V5ZM17 5H21V19H17V5Z"/></svg>',
}

const showMega = ref(false)
const hovering = ref(false)
const isScrolled = ref(false)
const bgActive = computed(() => isScrolled.value || hovering.value || showMega.value)

function onScroll() { isScrolled.value = window.scrollY > 10 }
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  startCounters()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function onNavEnter() { hovering.value = true }
function onNavLeave() { hovering.value = false; showMega.value = false }
function onMegaEnter() { showMega.value = true }
function onMegaLeave() { showMega.value = false }

// ── Counter animation ────────────────────────────────────────────────────────
const stats = [
  { target: 200,   suffix: '+',  context: 'Pasangan Indonesia',  desc: 'sudah bikin undangan di Abadikan',     display: ref(0) },
  { target: 10000, suffix: '+',  context: 'Tamu nyata',          desc: 'sudah menerima undangan digitalnya',   display: ref(0) },
  { target: 176,   suffix: 'K+', context: 'Link undangan',       desc: 'kali dibuka dan dibaca tamu',          display: ref(0) },
  { target: 61,    suffix: 'K+', context: 'Pengunjung',          desc: 'orang mampir ke halaman undangan',     display: ref(0) },
]

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3) }

function animateCounter(stat: typeof stats[0], duration = 1800, delay = 0) {
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

// Format with dots: 10000 → "10.000"
function fmt(val: number) {
  return val.toLocaleString('id-ID')
}
</script>

<template>
  <div class="hero-root">
    <!-- Pinstripe -->
    <div class="pinstripe"></div>

    <!-- Bottom vignette gradient (matches story) -->
    <div class="absolute bottom-0 w-full h-[400px] bg-gradient-to-t from-[#9e1a29] to-transparent pointer-events-none opacity-40"></div>

    <!-- Navbar — FloatingMegaMenu pattern -->
    <Navbar
      variant="transparent"
      :sticky="true"
      :border="false"
      :class="[
        showMega
          ? '!bg-white !border !border-[#E5E7EB] !rounded-b-none !shadow-none'
          : bgActive
            ? '!bg-white !border !border-[#E5E7EB] !rounded-b-[16px] !shadow-sm'
            : '!bg-transparent !border !border-transparent !rounded-b-[16px] !shadow-none',
      ]"
      class="transition-[background-color,box-shadow] duration-300 !px-5"
    >
      <template #start>
        <div
          class="flex items-center w-[160px] h-[50px] cursor-pointer"
          :style="{ color: bgActive ? '#111827' : '#FFFFFF', transition: 'color 0.3s' }"
        >
          <div
            class="w-[150px] h-[48px] bg-current -ml-2"
            style="mask: url('/abadikan-wordmark.svg') no-repeat left center/contain; -webkit-mask: url('/abadikan-wordmark.svg') no-repeat left center/contain;"
          ></div>
        </div>
      </template>

      <template #center>
        <nav
          class="flex h-full items-center justify-center gap-[20px] w-[244px]"
          :style="{ color: bgActive ? '#111827' : '#FFFFFF', transition: 'color 0.3s' }"
          @mouseenter="onNavEnter"
          @mouseleave="onNavLeave"
        >
          <span class="text-[14px] font-[500] cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap">Tema</span>

          <div class="h-full flex items-center cursor-pointer" @mouseenter="onMegaEnter" @mouseleave="onMegaLeave">
            <span class="text-[14px] font-[500] hover:opacity-70 transition-opacity flex items-center gap-[3px] h-full whitespace-nowrap">
              Fitur
              <svg class="w-3 h-3 mt-[1px] transition-transform duration-300" :class="showMega ? 'rotate-180' : 'rotate-0'" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
                class="absolute top-[100%] left-[-1px] w-[calc(100%+2px)] bg-white rounded-b-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-t-0 border-[#E5E7EB] p-5 pt-6 flex flex-col gap-4 text-left cursor-default -z-10 origin-top"
              >
                <div class="grid grid-cols-3 gap-5 normal-case tracking-normal">
                  <div>
                    <h4 class="text-[10px] font-bold text-gray-400 tracking-wider mb-4 uppercase">Produk</h4>
                    <div class="flex flex-col gap-3">
                      <a href="#" class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-gray-50 group transition-colors">
                        <div class="text-[#cc2b35] mt-0.5" v-html="megaIcons.OnCall"></div>
                        <div>
                          <div class="text-[13px] font-[650] text-[#111827] group-hover:text-[#cc2b35] transition-colors">Undangan Digital</div>
                          <div class="text-[12px] text-gray-500 mt-0.5 mb-1 text-balance">Undangan elegan dan interaktif siap di share</div>
                        </div>
                      </a>
                      <a href="#" class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-gray-50 group transition-colors">
                        <div class="text-[#cc2b35] mt-0.5" v-html="megaIcons.Status"></div>
                        <div>
                          <div class="text-[13px] font-[650] text-[#111827] group-hover:text-[#cc2b35] transition-colors">Buku Tamu (RSVP)</div>
                          <div class="text-[12px] text-gray-500 mt-0.5 text-balance">Atur otomatisasi dan daftar hadir dengan cerdas</div>
                        </div>
                      </a>
                      <a href="#" class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-gray-50 group transition-colors">
                        <div class="text-[#cc2b35] mt-0.5 flex justify-center" v-html="megaIcons.Fire"></div>
                        <div>
                          <div class="text-[13px] font-[650] text-[#111827] group-hover:text-[#cc2b35] transition-colors">Filter Instagram</div>
                          <div class="text-[12px] text-gray-500 mt-0.5 text-balance">Ciptakan momen tak terlupakan dengan filter kustom</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 class="text-[10px] font-bold text-gray-400 tracking-wider mb-4 uppercase">Platform</h4>
                    <div class="flex flex-col gap-1">
                      <a href="#" class="p-2 -mx-2 rounded-xl hover:bg-gray-50 group transition-colors">
                        <div class="text-[13px] font-[650] text-[#111827] flex items-center gap-2 group-hover:text-[#cc2b35] transition-colors">
                          AI Generator
                          <span class="bg-[#cc2b35]/10 text-[#cc2b35] text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wider">NEW</span>
                        </div>
                        <div class="text-[12px] text-gray-500 mt-0.5 leading-snug">Rangkai teks undangan secara otomatis dengan cerdas.</div>
                      </a>
                      <a href="#" class="p-2 -mx-2 rounded-xl hover:bg-gray-50 group transition-colors">
                        <div class="text-[13px] font-[650] text-[#111827] group-hover:text-[#cc2b35] transition-colors">Otomatisasi WA</div>
                        <div class="text-[12px] text-gray-500 mt-0.5 leading-snug">Kirim pengingat reservasi lewat WhatsApp secara instan.</div>
                      </a>
                      <a href="#" class="p-2 -mx-2 rounded-xl hover:bg-gray-50 group transition-colors">
                        <div class="text-[13px] font-[650] text-[#111827] group-hover:text-[#cc2b35] transition-colors">Keamanan Data</div>
                        <div class="text-[12px] text-gray-500 mt-0.5 leading-snug">Sistem terenkripsi untuk melindungi privasi event anda.</div>
                      </a>
                    </div>
                  </div>

                  <div class="flex flex-col">
                    <h4 class="text-[10px] font-bold text-gray-400 tracking-wider mb-4 uppercase">Unggulan</h4>
                    <div class="flex-1 rounded-2xl bg-[#0f1115] p-4 flex flex-col items-center text-center relative overflow-hidden group/card shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-pointer">
                      <div class="text-[9px] tracking-widest text-[#cc2b35] font-bold mb-2 z-10 uppercase">The Abadikan Way</div>
                      <div class="text-[16px] font-[600] leading-tight text-white mb-4 z-10 max-w-[150px] tracking-tight">Momen bahagia anda pantas dirayakan secara mewah.</div>
                      <div class="mt-auto px-4 py-1.5 border border-white/20 rounded-lg text-[12px] font-semibold text-white z-10 hover:bg-white hover:text-black transition-colors">Baca Selengkapnya</div>
                      <div class="absolute -bottom-16 w-[200px] h-[140px] bg-[#cc2b35] rounded-full blur-[40px] opacity-40 group-hover/card:opacity-60 transition-opacity duration-500"></div>
                      <div class="absolute bottom-6 w-8 h-8 rounded-xl bg-gradient-to-tr from-[#cc2b35] to-[#f44336] z-10 shadow-[0_0_20px_#cc2b35] flex items-center justify-center text-white scale-0 group-hover/card:scale-100 transition-transform duration-300" v-html="megaIcons.Fire"></div>
                    </div>
                  </div>
                </div>

                <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div class="flex gap-6 text-[13px] font-[600] text-gray-600">
                    <a href="#" class="hover:text-gray-900">Integrasi</a>
                    <a href="#" class="hover:text-gray-900">Pelajari Fitur</a>
                  </div>
                  <Button variant="primary" size="sm">Mulai sekarang</Button>
                </div>
              </div>
            </transition>
          </div>

          <span class="text-[14px] font-[500] cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap">Tentang</span>
          <span class="text-[14px] font-[500] cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap">Kontak</span>
        </nav>
      </template>

      <template #end>
        <div class="flex items-center gap-[10px] w-[160px] justify-end">
          <Button
            variant="outline"
            size="sm"
            :style="!bgActive ? '--btn-bg: transparent; --btn-text: #FFFFFF; --btn-border: rgba(255,255,255,0.65); --btn-hover-bg: rgba(255,255,255,0.12); --btn-hover-border: rgba(255,255,255,0.85); --btn-hover-text: #FFFFFF;' : ''"
          >Login</Button>
          <Button
            :variant="bgActive ? 'primary' : 'default'"
            size="sm"
            :style="!bgActive ? '--btn-bg: #111827; --btn-text: #FFFFFF; --btn-border: #111827; --btn-hover-bg: #000000; --btn-hover-border: #000000;' : ''"
          >Daftar</Button>
        </div>
      </template>
    </Navbar>

    <!-- Hero content -->
    <div class="hero-body">
      <div class="px-8 text-center relative z-10" style="font-family: 'Abadikan Sans', sans-serif;">
        <h1
          class="text-[48px] md:text-[60px] font-[800] tracking-tight mb-5 leading-[1.15] max-w-[800px] mx-auto"
          style="font-family: 'Abadikan Sans', sans-serif; color: white !important;"
        >
          Satu Platform, Ribuan Cara<br>Abadikan Cerita Cintamu.
        </h1>
        <p
          class="text-[17px] md:text-[19px] mb-10 max-w-2xl mx-auto font-[500] leading-relaxed"
          style="font-family: 'Abadikan Sans', sans-serif; color: rgba(255,255,255,0.9) !important;"
        >
          Bikin Undangan Digital dan Kado Interaktif yang memorable,<br>estetik, dan penuh makna.
        </p>
        <Button variant="default" size="lg" class="shadow-lg">Buat Undanganmu</Button>
      </div>
    </div>

    <!-- Social proof bar -->
    <div class="social-bar">
      <div class="social-bar-inner">
        <div v-for="(stat, i) in stats" :key="i" class="social-stat">
          <div class="social-context">{{ stat.context }}</div>
          <div class="social-num">{{ fmt(stat.display.value) }}<span class="social-suffix">{{ stat.suffix }}</span></div>
          <div class="social-desc">{{ stat.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-root {
  position: relative;
  width: 100%;
  min-height: 900px;
  max-height: 900px;
  background-color: #D72539;
  overflow-x: hidden;
  font-family: 'Abadikan Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
}

.hero-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Social proof bar */
.social-bar {
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.22);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
}

.social-bar-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 800px;
  margin: 0 auto;
}

.social-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  padding: 0 28px;
  position: relative;
}

.social-stat:first-child { padding-left: 0; }
.social-stat:last-child  { padding-right: 0; }

.social-stat + .social-stat::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: rgba(255, 255, 255, 0.35);
}

.social-context {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.1px;
  line-height: 1;
}

.social-num {
  font-size: 38px;
  font-weight: 700;
  color: white;
  line-height: 1.05;
  letter-spacing: -1.5px;
  font-family: 'Abadikan Sans', sans-serif;
  font-variant-numeric: tabular-nums;
}

.social-suffix {
  font-size: 38px;
  font-weight: 700;
  opacity: 0.6;
  letter-spacing: -1.5px;
}

.social-desc {
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.4;
  max-width: 150px;
}

.pinstripe {
  display: none;
}
</style>
