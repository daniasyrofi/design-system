import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, onMounted, computed } from 'vue'
import Navbar from './Navbar.vue'
import Button from '@/components/atoms/Button/Button.vue'

const meta: Meta<typeof Navbar> = {
  title: 'Organisms/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'transparent', 'colored'],
    },
    sticky: { control: 'boolean' },
    floatingOnScroll: { control: 'boolean' },
    border: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: {
    variant: 'default',
    sticky: false,
    floatingOnScroll: false,
    border: true,
  },
}
export default meta
type Story = StoryObj<typeof Navbar>

// ── Icons for the Mega Menu ──────────────────────────────────────────────────
const megaIcons = {
  OnCall:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5ZM16 13H8V15H16V13Z"/></svg>',
  Fire: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23C8.13401 23 5 19.866 5 16C5 12.134 7.6 10.3 8.32235 9.0792C8.68164 8.47228 8.85196 7.78018 8.81432 7.08051L8.74087 5.7144C8.70566 5.05942 9.53032 4.67389 10.0384 5.10705L10.3168 5.34444C11.5348 6.38287 12.3061 7.82071 12.4496 9.38766C12.508 10.0249 13.0457 10.5186 13.6845 10.5284C14.3644 10.5389 14.8878 9.93922 14.7891 9.26426L14.6548 8.34563C14.5422 7.5759 15.3627 7.01633 16.0593 7.3871C17.8427 8.33644 19 10.2241 19 12.3274C19 14.4716 18.0673 16.4897 16.3653 17.8465C15.9388 18.1864 15.5492 18.5759 15.2093 19.0024C14.5358 19.8475 13.3377 20.2443 12.3392 19.9882C11.6666 19.8157 11.2335 19.1419 11.2988 18.4485C11.3789 17.5977 12.0913 16.9663 12.9231 16.9205H13C13.5523 16.9205 14 16.4728 14 15.9205C14 15.3682 13.5523 14.9205 13 14.9205H12C9.79086 14.9205 8 16.7114 8 18.9205C8 20.6186 9.05739 22.187 10.6121 22.808C11.054 22.9845 11.5225 23 12 23Z"/></svg>',
  Status:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5H7V19H3V5ZM10 5H14V19H10V5ZM17 5H21V19H17V5Z"/></svg>',
  Chart:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3V19H21V21H3V3H5ZM20.2929 6.29289L21.7071 7.70711L16 13.4142L13 10.4142L8.70711 14.7071L7.29289 13.2929L13 7.58579L16 10.5858L20.2929 6.29289Z"/></svg>',
  Globe:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 19.9381C8.42191 19.4632 6.36884 18.1557 5.26788 16H8.92212C9.40011 17.5401 10.1251 18.8687 11 19.9381ZM13 19.9381C13.8749 18.8687 14.5999 17.5401 15.0779 16H18.7321C17.6312 18.1557 15.5781 19.4632 13 19.9381ZM15.3582 14H8.64182C8.42398 12.7212 8.33777 11.3789 8.39764 10H15.6024C15.6622 11.3789 15.576 12.7212 15.3582 14ZM18.8951 14H17.3888C17.5348 12.7058 17.5833 11.3653 17.5303 10H18.8951C18.9649 10.65 19 11.3188 19 12C19 12.6812 18.9649 13.35 18.8951 14ZM5.10491 10H6.61117C6.46516 11.2942 6.41666 12.6347 6.46969 14H5.10491C5.03513 13.35 5 12.6812 5 12C5 11.3188 5.03513 10.65 5.10491 10ZM11 4.06189C10.1251 5.13134 9.40011 6.45991 8.92212 8H5.26788C6.36884 5.84428 8.42191 4.5368 11 4.06189ZM13 4.06189C15.5781 4.5368 17.6312 5.84428 18.7321 8H15.0779C14.5999 6.45991 13.8749 5.13134 13 4.06189Z"/></svg>',
}

// ── Floating & Mega Menu Showcase ────────────────────────────────────────────
export const FloatingMegaMenu: Story = {
  name: 'Navbar',
  args: {
    variant: 'transparent',
    sticky: true,
    border: false,
    floatingOnScroll: false,
  },
  render: (args) => ({
    components: { Navbar, Button },
    setup() {
      const showMega = ref(false)
      const hovering = ref(false)
      const isScrolled = ref(false)
      const icons = megaIcons

      // Single source of truth: white bg shows when any of these are true
      const bgActive = computed(() => isScrolled.value || hovering.value || showMega.value)

      onMounted(() => {
        const el = document.getElementById('scroll-target-nav')
        if (el) {
          el.addEventListener(
            'scroll',
            () => {
              isScrolled.value = el.scrollTop > 10
            },
            { passive: true }
          )
        }
      })

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

      return {
        args,
        showMega,
        hovering,
        isScrolled,
        bgActive,
        icons,
        onNavEnter,
        onNavLeave,
        onMegaEnter,
        onMegaLeave,
      }
    },
    template: `
      <div
        id="scroll-target-nav"
        style="position:relative; width:100%; height:700px; overflow-y:auto; overflow-x:hidden; background-color:#d42a36; font-family:'Abadikan Sans', sans-serif;"
      >
        <div class="absolute bottom-0 w-full h-[400px] bg-gradient-to-t from-[#a31a23] to-transparent pointer-events-none opacity-40"></div>

        <!--
          Key: border is always present but color switches instantly (not in transition)
          so there's no "ghost border" artifact on mouse-out.
          Only background-color and box-shadow animate smoothly.
        -->
        <Navbar
          v-bind="args"
          :class="[
            showMega
              ? '!bg-white !border !border-[#E5E7EB] !rounded-b-none !shadow-none'
              : bgActive
                ? '!bg-white !border !border-[#E5E7EB] !rounded-b-[var(--radius-xl)] !shadow-sm'
                : '!bg-transparent !border !border-transparent !rounded-b-[var(--radius-xl)] !shadow-none',
          ]"
          class="transition-[background-color,box-shadow] duration-300"
        >

          <!-- Logo: inline style bypasses any CSS token cascade -->
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

          <!-- Nav links -->
          <template #center>
            <nav
              class="flex h-full items-center justify-center gap-[20px] w-[244px]"
              :style="{ color: bgActive ? '#111827' : '#FFFFFF', transition: 'color 0.3s' }"
              @mouseenter="onNavEnter"
              @mouseleave="onNavLeave"
            >
              <span class="text-[14px] font-[500] cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap">Tema</span>

              <!-- Fitur trigger + mega dropdown -->
              <div
                class="h-full flex items-center cursor-pointer"
                @mouseenter="onMegaEnter"
                @mouseleave="onMegaLeave"
              >
                <span class="text-[14px] font-[500] hover:opacity-70 transition-opacity flex items-center gap-[3px] h-full whitespace-nowrap">
                  Fitur
                  <svg
                    class="w-3 h-3 mt-[1px] transition-transform duration-300"
                    :class="showMega ? 'rotate-180' : 'rotate-0'"
                    viewBox="0 0 12 12" fill="none"
                  >
                    <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>

                <!-- Mega dropdown: anchored via position:relative on Navbar.vue header -->
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
                    class="absolute top-[100%] left-0 w-full bg-white rounded-b-[var(--radius-xl)] shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-t-0 border-[#E5E7EB] p-8 pt-10 flex flex-col gap-6 text-left cursor-default -z-10 origin-top"
                  >
                    <div class="grid grid-cols-3 gap-8 normal-case tracking-normal">

                      <!-- Col 1: Produk -->
                      <div>
                        <h4 class="text-[10px] font-bold text-gray-400 tracking-wider mb-4 uppercase">Produk</h4>
                        <div class="flex flex-col gap-3">
                          <a href="#" class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-gray-50 group transition-colors">
                            <div class="text-[#cc2b35] mt-0.5" v-html="icons.OnCall"></div>
                            <div>
                              <div class="text-[13px] font-[650] text-[#111827] group-hover:text-[#cc2b35] transition-colors">Undangan Digital</div>
                              <div class="text-[12px] text-gray-500 mt-0.5 mb-1 text-balance">Undangan elegan dan interaktif siap di share</div>
                            </div>
                          </a>
                          <a href="#" class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-gray-50 group transition-colors">
                            <div class="text-[#cc2b35] mt-0.5" v-html="icons.Status"></div>
                            <div>
                              <div class="text-[13px] font-[650] text-[#111827] group-hover:text-[#cc2b35] transition-colors">Buku Tamu (RSVP)</div>
                              <div class="text-[12px] text-gray-500 mt-0.5 text-balance">Atur otomatisasi dan daftar hadir dengan cerdas</div>
                            </div>
                          </a>
                          <a href="#" class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-gray-50 group transition-colors">
                            <div class="text-[#cc2b35] mt-0.5 flex justify-center" v-html="icons.Fire"></div>
                            <div>
                              <div class="text-[13px] font-[650] text-[#111827] group-hover:text-[#cc2b35] transition-colors">Filter Instagram</div>
                              <div class="text-[12px] text-gray-500 mt-0.5 text-balance">Ciptakan momen tak terlupakan dengan filter kustom</div>
                            </div>
                          </a>
                        </div>
                      </div>

                      <!-- Col 2: Platform -->
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
                            <div class="text-[12px] text-gray-500 mt-0.5 leading-snug">Kirim pengingat reservasi lewat Whatsapp secara instan.</div>
                          </a>
                          <a href="#" class="p-2 -mx-2 rounded-xl hover:bg-gray-50 group transition-colors">
                            <div class="text-[13px] font-[650] text-[#111827] group-hover:text-[#cc2b35] transition-colors">Keamanan Data</div>
                            <div class="text-[12px] text-gray-500 mt-0.5 leading-snug">Sistem terenkripsi untuk melindungi privasi event anda.</div>
                          </a>
                        </div>
                      </div>

                      <!-- Col 3: Unggulan card -->
                      <div class="flex flex-col">
                        <h4 class="text-[10px] font-bold text-gray-400 tracking-wider mb-4 uppercase">Unggulan</h4>
                        <div class="flex-1 rounded-2xl bg-[#0f1115] p-6 flex flex-col items-center text-center relative overflow-hidden group/card shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-pointer">
                          <div class="text-[9px] tracking-widest text-[#cc2b35] font-bold mb-2 z-10 uppercase">The Abadikan Way</div>
                          <div class="text-[16px] font-[600] leading-tight text-white mb-4 z-10 max-w-[150px] tracking-tight">
                            Momen bahagia anda pantas dirayakan secara mewah.
                          </div>
                          <div class="mt-auto px-4 py-1.5 border border-white/20 rounded-lg text-[12px] font-semibold text-white z-10 hover:bg-white hover:text-black transition-colors">
                            Baca Selengkapnya
                          </div>
                          <div class="absolute -bottom-16 w-[200px] h-[140px] bg-[#cc2b35] rounded-full blur-[40px] opacity-40 group-hover/card:opacity-60 transition-opacity duration-500"></div>
                          <div class="absolute bottom-6 w-8 h-8 rounded-xl bg-gradient-to-tr from-[#cc2b35] to-[#f44336] z-10 shadow-[0_0_20px_#cc2b35] flex items-center justify-center text-white scale-0 group-hover/card:scale-100 transition-transform duration-300" v-html="icons.Fire"></div>
                        </div>
                      </div>
                    </div>

                    <!-- Dropdown footer -->
                    <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
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

          <!-- Buttons -->
          <template #end>
            <div class="flex items-center gap-[10px] w-[160px] justify-end">
              <!-- Login: white outline on transparent bg, normal outline on white bg -->
              <Button
                variant="outline"
                size="sm"
                :style="!bgActive ? '--btn-bg: transparent; --btn-text: #FFFFFF; --btn-border: rgba(255,255,255,0.65); --btn-hover-bg: rgba(255,255,255,0.12); --btn-hover-border: rgba(255,255,255,0.85);' : ''"
              >Login</Button>
              <!-- Daftar: solid black on transparent bg, red primary on white bg -->
              <Button
                :variant="bgActive ? 'primary' : 'default'"
                size="sm"
                :style="!bgActive ? '--btn-bg: #111827; --btn-text: #FFFFFF; --btn-border: #111827; --btn-hover-bg: #000000; --btn-hover-border: #000000;' : ''"
              >Daftar</Button>
            </div>
          </template>

        </Navbar>

        <!-- Hero content -->
        <div class="mt-20 px-8 text-center relative z-10" style="font-family: 'Abadikan Sans', sans-serif;">
          <h1 class="text-[48px] md:text-[60px] font-[800] tracking-tight mb-5 leading-[1.15] max-w-4xl mx-auto text-white" style="font-family: 'Abadikan Sans', sans-serif;">
            Your wedding invite, but<br>make it an experience.
          </h1>
          <p class="text-[17px] md:text-[19px] opacity-90 mb-10 max-w-2xl mx-auto font-[500] leading-relaxed text-white" style="font-family: 'Abadikan Sans', sans-serif;">
            Everything ready. You fill in your story, set up RSVP,<br>build your gift list, and share it. We are here if you need us.
          </p>
          <Button variant="default" size="lg" class="shadow-lg">Create your invitation</Button>
          <div class="mt-14 flex justify-center gap-4 flex-wrap">
            <span class="bg-white text-gray-900 text-[13px] font-[700] px-4 py-2.5 rounded-full shadow-md">100+ couples</span>
            <span class="bg-white text-gray-900 text-[13px] font-[700] px-4 py-2.5 rounded-full shadow-md">10,000+ invites opened</span>
            <span class="bg-white text-gray-900 text-[13px] font-[700] px-4 py-2.5 rounded-full shadow-md">300+ RSVPs collected</span>
          </div>
        </div>
        <div class="h-[800px]"></div>
      </div>
    `,
  }),
}
