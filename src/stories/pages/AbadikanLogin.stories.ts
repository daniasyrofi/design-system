import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed, defineComponent, onMounted, onUnmounted } from 'vue'
import Input from '@/components/atoms/Input/Input.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Divider from '@/components/atoms/Divider/Divider.vue'
import Modal from '@/components/molecules/Modal/Modal.vue'
import {
  RiMailLine,
  RiLockLine,
  RiUser3Line,
  RiPhoneLine,
  RiGiftLine,
  RiCheckboxCircleFill,
  RiArrowLeftSLine,
} from '@remixicon/vue'

const canvas = () => ({
  template: `
    <div style="min-height:100vh;display:flex;background-color:var(--color-bg);">
      <story />
    </div>
  `,
})

const LoginPage = defineComponent({ template: '<div />' })

const meta: Meta = {
  title: 'Pages/Abadikan — Login',
  component: LoginPage,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Revamp halaman auth **Abadikan.id** menggunakan komponen dari design system.',
      },
    },
  },
}
export default meta
type Story = StoryObj

const RED = '#D0003E'

const GRID = 'display:grid;grid-template-columns:320px 1fr;min-height:100vh;width:100%;align-items:start;'
const LEFT = `background-color:${RED};display:flex;flex-direction:column;height:100vh;padding:0 1.75rem 2rem;position:sticky;top:0;overflow:hidden;box-sizing:border-box;`
const LOGO_WRAP = 'display:flex;justify-content:center;align-items:center;padding:1.75rem 0 0.875rem;position:relative;z-index:2;'
const TOPBAR_SPACER = 'flex-shrink:0;height:calc(1.75rem + 2rem + 0.875rem);'
const DECOR = 'position:absolute;top:40%;left:50%;transform:translate(-50%,-44%);width:140%;pointer-events:none;z-index:1;'
const TAGLINE = 'font-size:20px;font-weight:700;line-height:1.75rem;color:white;position:relative;z-index:2;margin:auto 0 0;text-align:center;padding-bottom:0.5rem;'
const RIGHT = 'display:flex;align-items:center;justify-content:center;padding:2.75rem 2.5rem;background-color:var(--color-surface);min-height:100vh;box-sizing:border-box;'
const FORM = 'width:100%;max-width:400px;--radius-2xl:20px;'
const BTN = 'border-radius:999px;gap:0.25rem;padding-inline-start:1.25rem;padding-inline-end:1.25rem;'
const BTN_ICON = 'border-radius:999px;gap:0.5rem;padding-inline-start:0.75rem;padding-inline-end:1rem;'
const BTN_ROW = 'display:flex;gap:0.5rem;align-items:center;'
const HELPER = 'font-size:12px;color:var(--color-text-secondary);margin:0;line-height:1rem;'
const DISCLAIMER = 'font-size:12px;color:var(--color-text-secondary);margin:0;line-height:1rem;text-align:center;'
const RIGHT_COL = 'display:flex;flex-direction:column;background-color:var(--color-surface);min-height:100vh;box-sizing:border-box;'
const FORM_WRAP = 'flex:1;display:flex;align-items:center;justify-content:center;padding:2.75rem 2.5rem;'
const TOPBAR = 'display:flex;align-items:center;justify-content:space-between;padding:1.75rem 1.5rem 0.875rem;'
const LANG = 'display:flex;align-items:center;gap:2px;background:var(--color-bg-subtle);border-radius:6px;padding:2px;'
const LANG_BTN = 'font-size:13px;padding:3px 8px;border:none;border-radius:4px;cursor:pointer;transition:all 0.15s;'
const LANG_ACTIVE = 'background:var(--color-surface);font-weight:600;color:var(--color-text-heading);box-shadow:0 1px 2px rgba(0,0,0,0.06);'
const LANG_IDLE = 'background:transparent;color:var(--color-text-secondary);'

const GoogleSVG = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>`

function leftPanel(tagline: string) {
  return `
    <div style="${LEFT}">
      <div style="${LOGO_WRAP}">
        <img src="/abadikan-wordmark.svg" height="22" alt="abadikan.id" />
      </div>
      <div style="${DECOR}">
        <img src="/abadikan-decor.svg" alt="" style="width:100%;display:block;opacity:0.6;" />
      </div>
      <p style="${TAGLINE}">${tagline}</p>
    </div>`
}

function usePageTransition() {
  onMounted(() => {
    if (!document.getElementById('auth-page-css')) {
      const s = document.createElement('style')
      s.id = 'auth-page-css'
      s.textContent = [
        '@keyframes auth-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
        '.tagline-leave-active{transition:opacity .18s ease-in,transform .18s ease-in}',
        '.tagline-leave-to{opacity:0;transform:translateY(-5px)}',
        '.tagline-enter-active{transition:opacity .38s cubic-bezier(0.22,1,0.36,1),transform .38s cubic-bezier(0.22,1,0.36,1)}',
        '.tagline-enter-from{opacity:0;transform:translateY(6px)}',
      ].join('')
      document.head.appendChild(s)
    }
  })
  onUnmounted(() => { document.getElementById('auth-page-css')?.remove() })

  function onEnter(el: Element, done: () => void) {
    let delay = 0, maxEnd = 0
    for (const child of (el as HTMLElement).children) {
      const c = child as HTMLElement
      if (c.tagName === 'FORM') {
        // form is a transparent wrapper — each field animates individually
        c.style.animation = 'none'; c.style.opacity = '1'; c.style.transform = 'none'
        const kids = [...c.children] as HTMLElement[]
        kids.forEach((fc, i) => {
          // 24ms between inputs; button (last child) gets an extra 30ms gap to feel like a clear CTA
          const d = i === kids.length - 1
            ? delay + (kids.length - 1) * 24 + 30
            : delay + i * 24
          fc.style.animation = `auth-in 360ms cubic-bezier(0.22,1,0.36,1) ${d}ms both`
          if (d + 360 > maxEnd) maxEnd = d + 360
        })
        delay += kids.length * 24 + 40
      } else {
        // heading, google button, divider, footer links — 55ms between each group
        c.style.animation = `auth-in 400ms cubic-bezier(0.22,1,0.36,1) ${delay}ms both`
        if (delay + 400 > maxEnd) maxEnd = delay + 400
        delay += 55
      }
    }
    setTimeout(done, maxEnd)
  }

  function onLeave(el: Element, done: () => void) {
    const e = el as HTMLElement
    e.style.transition = 'opacity 180ms ease-in'
    e.style.opacity = '0'
    setTimeout(done, 180)
  }

  return { onEnter, onLeave }
}

// ── Login ──────────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Login',
  render: () => ({
    components: { Input, Button, Divider, Modal, RiMailLine, RiLockLine, RiCheckboxCircleFill },
    setup() {
      const email = ref(''), password = ref('')
      const emailErr = ref(''), passErr = ref('')
      const loading = ref(false), showSuccess = ref(false)

      const lang = ref<'ID'|'EN'>('ID')
      function handleLogin() {
        emailErr.value = passErr.value = ''
        if (!email.value) emailErr.value = lang.value === 'ID' ? 'Emailnya belum diisi' : 'Please enter your email'
        if (!password.value) passErr.value = lang.value === 'ID' ? 'Passwordnya belum diisi' : 'Please enter your password'
        if (emailErr.value || passErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }
      return { email, password, emailErr, passErr, loading, showSuccess, handleLogin, GoogleSVG, lang }
    },
    template: `
      <div style="${GRID}">
        ${leftPanel('Mulai dari RSVP sampai kado<br/>digital, semua bisa kamu atur<br/>di Abadikan.')}

        <div style="${RIGHT_COL}">
          <div style="${TOPBAR}">
            <div></div>
            <div style="${LANG}">
              <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
              <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
            </div>
          </div>
          <div style="${FORM_WRAP}">
          <div style="${FORM}">
            <div style="text-align:center;margin-bottom:1.25rem;">
              <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">{{ lang === 'ID' ? 'Lanjut ngurus undanganmu, yuk' : "Welcome back" }}</h1>
              <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">{{ lang === 'ID' ? 'Masuk dulu, banyak yang mau disiapkan.' : 'Your invitation is waiting. Sign in to continue.' }}</p>
            </div>

            <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleLogin">
              <Input v-model="email" type="email" label="Email" required :placeholder="lang === 'ID' ? 'emailkamu@gmail.com' : 'youremail@gmail.com'" :error="emailErr" @update:modelValue="emailErr = ''">
                <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
              </Input>
              <Input v-model="password" type="password" label="Password" required placeholder="••••••••" :error="passErr" @update:modelValue="passErr = ''">
                <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                <template #label-trailing>
                  <a href="#" style="font-size:12px;color:var(--color-text-secondary);text-decoration:none;">{{ lang === 'ID' ? 'Lupa password?' : 'Forgot password?' }}</a>
                </template>
              </Input>
              <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:0.25rem;">{{ lang === 'ID' ? 'Masuk' : 'Sign in' }}</Button>
            </form>

            <div style="margin:1rem 0;"><Divider :label="lang === 'ID' ? 'atau' : 'or'" /></div>

            <Button variant="outline" full-width size="md" style="${BTN_ICON}">
              <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
              {{ lang === 'ID' ? 'Masuk dengan Google' : 'Sign in with Google' }}
            </Button>

            <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
              {{ lang === 'ID' ? 'Belum punya akun?' : "Don't have an account?" }} <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">{{ lang === 'ID' ? 'Daftar sekarang' : 'Sign up' }}</a>
            </p>
          </div>
          </div>
          <div style="${TOPBAR_SPACER}"></div>
        </div>

        <Modal v-model="showSuccess" size="sm" :closable="false" :close-on-overlay="false">
          <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;padding:0.5rem 0 0.25rem;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(208,0,62,0.08);display:flex;align-items:center;justify-content:center;">
              <div style="width:46px;height:46px;border-radius:50%;background:rgba(208,0,62,0.13);display:flex;align-items:center;justify-content:center;">
                <RiCheckboxCircleFill style="color:#D0003E;" :size="28" />
              </div>
            </div>
            <div>
              <h2 style="font-size:20px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">{{ lang === 'ID' ? 'Berhasil masuk!' : "You're in!" }}</h2>
              <p style="font-size:14px;color:var(--color-text-secondary);margin:0;line-height:1.25rem;">{{ lang === 'ID' ? 'Selamat datang kembali. Undanganmu udah nunggu.' : 'Welcome back. Your invitation is ready to continue.' }}</p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:0.25rem;" @click="showSuccess = false">{{ lang === 'ID' ? 'Lanjut atur undangan' : 'Continue planning' }}</Button>
          </div>
        </Modal>
      </div>
    `,
  }),
}

// ── Lupa Password ──────────────────────────────────────────────────────────────
export const ForgotPassword: Story = {
  name: 'Lupa Password',
  render: () => ({
    components: { Input, Button, Modal, RiMailLine, RiCheckboxCircleFill, RiArrowLeftSLine },
    setup() {
      const email = ref(''), emailErr = ref('')
      const loading = ref(false), countdown = ref(0), showSuccess = ref(false)
      const sent = ref(false)
      let timer: ReturnType<typeof setInterval> | null = null

      const lang = ref<'ID'|'EN'>('ID')
      function handleSend() {
        emailErr.value = ''
        if (!email.value) { emailErr.value = lang.value === 'ID' ? 'Emailnya belum diisi' : 'Please enter your email'; return }
        if (sent.value && countdown.value > 0) return
        if (timer) { clearInterval(timer); timer = null }
        loading.value = true
        setTimeout(() => {
          loading.value = false
          showSuccess.value = true
          sent.value = true
          countdown.value = 10
          timer = setInterval(() => {
            countdown.value--
            if (countdown.value <= 0 && timer) { clearInterval(timer); timer = null }
          }, 1000)
        }, 1500)
      }
      return { email, emailErr, loading, countdown, sent, showSuccess, handleSend, lang }
    },
    template: `
      <div style="${GRID}">
        ${leftPanel('Tenang, akunmu aman.<br/>Kita beresin passwordnya<br/>biar undanganmu bisa lanjut.')}

        <div style="${RIGHT_COL}">
          <div style="${TOPBAR}">
            <Button type="button" variant="outline" size="sm" style="${BTN_ICON}" @click.prevent=""><template #leading><RiArrowLeftSLine style="width:1em;height:1em;" /></template>{{ lang === 'ID' ? 'Balik' : 'Back' }}</Button>
            <div style="${LANG}">
              <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
              <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
            </div>
          </div>
          <div style="${FORM_WRAP}">
          <div style="${FORM}">
            <div style="text-align:center;margin-bottom:1.25rem;">
              <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">{{ lang === 'ID' ? 'Tenang, kita beresin bareng' : "Forgot your password?" }}</h1>
              <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">{{ lang === 'ID' ? 'Masukin emailmu. Kita kirimin link resetnya ke sana.' : "Enter your email and we'll send you a reset link." }}</p>
            </div>

            <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleSend">
              <Input v-model="email" type="email" label="Email" required :placeholder="lang === 'ID' ? 'emailkamu@gmail.com' : 'youremail@gmail.com'" :error="emailErr" @update:modelValue="emailErr = ''">
                <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
              </Input>
              <Button type="submit" variant="default" full-width size="md" :loading="loading" :disabled="sent && countdown > 0" :style="sent && countdown > 0 ? '${BTN}opacity:0.45;cursor:not-allowed;' : '${BTN}'">
                {{ !sent ? (lang === 'ID' ? 'Kirim link reset' : 'Send reset link') : countdown > 0 ? (lang === 'ID' ? 'Kirim ulang (' + countdown + ')' : 'Resend (' + countdown + ')') : (lang === 'ID' ? 'Kirim ulang' : 'Resend') }}
              </Button>
            </form>

            <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
              {{ lang === 'ID' ? 'Udah ingat passwordnya?' : 'Remembered it?' }} <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">{{ lang === 'ID' ? 'Masuk' : 'Sign in' }}</a>
            </p>
          </div>
          </div>
          <div style="${TOPBAR_SPACER}"></div>
        </div>

        <Modal v-model="showSuccess" size="sm" :closable="false" :close-on-overlay="true">
          <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;padding:0.5rem 0 0.25rem;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(208,0,62,0.08);display:flex;align-items:center;justify-content:center;">
              <div style="width:46px;height:46px;border-radius:50%;background:rgba(208,0,62,0.13);display:flex;align-items:center;justify-content:center;">
                <RiCheckboxCircleFill style="color:#D0003E;" :size="28" />
              </div>
            </div>
            <div>
              <h2 style="font-size:20px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">{{ lang === 'ID' ? 'Udah kita kirim!' : 'Check your email' }}</h2>
              <p style="font-size:14px;color:var(--color-text-secondary);margin:0;line-height:1.25rem;">
                <template v-if="lang === 'ID'">Cek emailmu ya. Udah kita kirim ke <strong style="color:var(--color-text-heading);font-weight:600;">{{ email }}</strong>. Belum masuk? Cek folder Spam juga.</template>
                <template v-else>We sent a reset link to <strong style="color:var(--color-text-heading);font-weight:600;">{{ email }}</strong>. Check your spam folder if you don't see it.</template>
              </p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:0.25rem;" @click="showSuccess = false">{{ lang === 'ID' ? 'Oke, siap!' : 'Got it' }}</Button>
          </div>
        </Modal>
      </div>
    `,
  }),
}

// ── Atur Ulang Password ────────────────────────────────────────────────────────
export const ResetPassword: Story = {
  name: 'Atur Ulang Password',
  render: () => ({
    components: { Input, Button, Modal, RiLockLine, RiCheckboxCircleFill },
    setup() {
      const newPass = ref(''), confirmPass = ref('')
      const newPassErr = ref(''), confirmErr = ref('')
      const loading = ref(false), showSuccess = ref(false)

      const lang = ref<'ID'|'EN'>('ID')
      function handleReset() {
        newPassErr.value = confirmErr.value = ''
        if (!newPass.value) newPassErr.value = lang.value === 'ID' ? 'Passwordnya belum diisi' : 'Please enter a password'
        else if (newPass.value.length < 8) newPassErr.value = lang.value === 'ID' ? 'Password minimal 8 karakter ya' : 'Password must be at least 8 characters'
        if (!confirmPass.value) confirmErr.value = lang.value === 'ID' ? 'Password ulangnya belum diisi' : 'Please confirm your password'
        else if (newPass.value && confirmPass.value !== newPass.value) confirmErr.value = lang.value === 'ID' ? 'Passwordnya belum sama nih' : "Passwords don't match"
        if (newPassErr.value || confirmErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }
      return { newPass, confirmPass, newPassErr, confirmErr, loading, showSuccess, handleReset, lang }
    },
    template: `
      <div style="${GRID}">
        ${leftPanel('Hampir selesai nih.<br/>Bikin password baru,<br/>terus siapkan undanganmu.')}

        <div style="${RIGHT_COL}">
          <div style="${TOPBAR}">
            <div></div>
            <div style="${LANG}">
              <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
              <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
            </div>
          </div>
          <div style="${FORM_WRAP}">
          <div style="${FORM}">
            <div style="text-align:center;margin-bottom:1.25rem;">
              <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">{{ lang === 'ID' ? 'Bikin password baru, yuk' : 'Set a new password' }}</h1>
              <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">{{ lang === 'ID' ? 'Tinggal ini, terus bisa lanjut atur undanganmu.' : 'Choose a strong password to keep your account secure.' }}</p>
            </div>

            <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleReset">
              <Input v-model="newPass" type="password" :label="lang === 'ID' ? 'Password baru' : 'New password'" required :placeholder="lang === 'ID' ? 'Masukan password baru' : 'Enter new password'" :error="newPassErr" @update:modelValue="newPassErr = ''">
                <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
              </Input>
              <Input v-model="confirmPass" type="password" :label="lang === 'ID' ? 'Ulangi password' : 'Confirm password'" required :placeholder="lang === 'ID' ? 'Ulangi password' : 'Confirm password'" :error="confirmErr" @update:modelValue="confirmErr = ''">
                <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
              </Input>
              <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:0.25rem;">{{ lang === 'ID' ? 'Simpan' : 'Update password' }}</Button>
            </form>
          </div>
          </div>
          <div style="${TOPBAR_SPACER}"></div>
        </div>

        <Modal v-model="showSuccess" size="sm" :closable="false" :close-on-overlay="false">
          <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;padding:0.5rem 0 0.25rem;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(208,0,62,0.08);display:flex;align-items:center;justify-content:center;">
              <div style="width:46px;height:46px;border-radius:50%;background:rgba(208,0,62,0.13);display:flex;align-items:center;justify-content:center;">
                <RiCheckboxCircleFill style="color:#D0003E;" :size="28" />
              </div>
            </div>
            <div>
              <h2 style="font-size:20px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">{{ lang === 'ID' ? 'Beres!' : 'Password updated' }}</h2>
              <p style="font-size:14px;color:var(--color-text-secondary);margin:0;line-height:1.25rem;">{{ lang === 'ID' ? 'Password barumu udah aktif. Sekarang tinggal masuk dan lanjut atur undanganmu.' : 'Your new password is set. You can now sign in.' }}</p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:0.25rem;" @click="showSuccess = false">{{ lang === 'ID' ? 'Masuk sekarang' : 'Sign in' }}</Button>
          </div>
        </Modal>
      </div>
    `,
  }),
}

// ── Daftar ─────────────────────────────────────────────────────────────────────
export const SignUp: Story = {
  name: 'Daftar',
  render: () => ({
    components: { Input, Button, Divider, Modal, RiMailLine, RiLockLine, RiUser3Line, RiPhoneLine, RiGiftLine, RiCheckboxCircleFill, RiArrowLeftSLine },
    setup() {
      const { onEnter, onLeave } = usePageTransition()
      type Step = 'email' | 'form-email' | 'form-google'
      const step = ref<Step>('email')
      const email = ref(''), emailErr = ref('')
      const password = ref(''), name = ref(''), phone = ref(''), referral = ref('')
      const passErr = ref(''), nameErr = ref(''), phoneErr = ref('')
      const loading = ref(false), showSuccess = ref(false)

      const lang = ref<'ID'|'EN'>('ID')
      function handleEmailNext() {
        emailErr.value = ''
        if (!email.value) { emailErr.value = lang.value === 'ID' ? 'Emailnya belum diisi' : 'Please enter your email'; return }
        if (!email.value.includes('@')) { emailErr.value = lang.value === 'ID' ? 'Emailnya belum benar, contohnya: nama@gmail.com' : 'Please enter a valid email address'; return }
        step.value = 'form-email'
      }
      function handleRegister() {
        passErr.value = nameErr.value = phoneErr.value = ''
        if (step.value === 'form-email') {
          if (!password.value) passErr.value = lang.value === 'ID' ? 'Passwordnya belum diisi' : 'Please enter a password'
          else if (password.value.length < 8) passErr.value = lang.value === 'ID' ? 'Password minimal 8 karakter ya' : 'Password must be at least 8 characters'
        }
        if (!name.value) nameErr.value = lang.value === 'ID' ? 'Nama lengkapnya belum diisi' : 'Please enter your full name'
        if (!phone.value) phoneErr.value = lang.value === 'ID' ? 'Nomor HP-nya belum diisi' : 'Please enter your phone number'
        if (passErr.value || nameErr.value || phoneErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }
      return { step, email, emailErr, password, name, phone, referral, passErr, nameErr, phoneErr, loading, showSuccess, handleEmailNext, handleRegister, GoogleSVG, lang, onEnter, onLeave }
    },
    template: `
      <div style="${GRID}">
        ${leftPanel('Mulai ceritamu di Abadikan.<br/>Undangan digital yang bikin<br/>kisah cintamu berkesan')}

        <div style="${RIGHT_COL}">
          <div style="${TOPBAR}">
            <Button v-if="step !== 'email'" type="button" variant="outline" size="sm" style="${BTN_ICON}" @click.prevent="step = 'email'"><template #leading><RiArrowLeftSLine style="width:1em;height:1em;" /></template>{{ lang === 'ID' ? 'Balik' : 'Back' }}</Button>
            <div v-else></div>
            <div style="${LANG}">
              <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
              <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
            </div>
          </div>
          <div style="${FORM_WRAP}">
          <div style="${FORM}">

            <Transition mode="out-in" :css="false" @enter="onEnter" @leave="onLeave">
            <div v-if="step === 'email'">
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">{{ lang === 'ID' ? 'Mulai dari sini, yuk' : 'Create your account' }}</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">{{ lang === 'ID' ? 'Daftar dulu biar momenmu bisa kita abadikan bareng.' : 'Join Abadikan and start planning your celebration.' }}</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleEmailNext">
                <Input v-model="email" type="email" label="Email" required :placeholder="lang === 'ID' ? 'emailkamu@gmail.com' : 'youremail@gmail.com'" :error="emailErr" @update:modelValue="emailErr = ''">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" style="${BTN}">{{ lang === 'ID' ? 'Lanjut' : 'Continue' }}</Button>
              </form>
              <div style="margin:1rem 0;"><Divider :label="lang === 'ID' ? 'atau' : 'or'" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}" @click="step = 'form-google'">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                {{ lang === 'ID' ? 'Daftar dengan Google' : 'Sign up with Google' }}
              </Button>
              <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:0.75rem;">
                {{ lang === 'ID' ? 'Udah punya akun?' : 'Already have an account?' }} <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">{{ lang === 'ID' ? 'Masuk' : 'Sign in' }}</a>
              </p>
            </div>

            <div v-else-if="step === 'form-email'">
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">{{ lang === 'ID' ? 'Hampir jadi nih' : 'Almost there' }}</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">{{ lang === 'ID' ? 'Isi beberapa info dulu, bentar lagi selesai.' : 'Fill in a few details to finish setting up your account.' }}</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleRegister">
                <Input :modelValue="email" label="Email" type="email" :disabled="true">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <div style="display:flex;flex-direction:column;gap:0.25rem;">
                  <Input v-model="password" type="password" :label="lang === 'ID' ? 'Buat password' : 'Create password'" required :placeholder="lang === 'ID' ? 'Masukan password' : 'Enter password'" :error="passErr" @update:modelValue="passErr = ''">
                    <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                  </Input>
                  <p style="${HELPER}">{{ lang === 'ID' ? 'Minimal 8 karakter' : 'At least 8 characters' }}</p>
                </div>
                <Input v-model="name" :label="lang === 'ID' ? 'Nama lengkap' : 'Full name'" required :placeholder="lang === 'ID' ? 'Masukan nama kamu' : 'Enter your name'" :error="nameErr" @update:modelValue="nameErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="phone" type="tel" :label="lang === 'ID' ? 'Nomor HP' : 'Phone number'" required :placeholder="lang === 'ID' ? 'Masukan no. HP kamu' : 'Enter your phone number'" :error="phoneErr" @update:modelValue="phoneErr = ''">
                  <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="referral" :label="lang === 'ID' ? 'Ada kode dari teman? (Opsional)' : 'Referral code (Optional)'" :placeholder="lang === 'ID' ? 'Masukan kode referral' : 'Enter referral code'">
                  <template #leading><RiGiftLine style="width:16px;height:16px;" /></template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}">{{ lang === 'ID' ? 'Buat akun' : 'Create account' }}</Button>
              </form>
              <p style="${DISCLAIMER}margin-top:0.75rem;">
                <template v-if="lang === 'ID'">Dengan daftar, kamu setuju sama <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a> dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> kita. Data kamu aman, gak akan kita bagikan ke siapapun.</template>
                <template v-else>By signing up, you agree to our <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Terms of Service</a> and <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Privacy Policy</a>. Your data is safe with us.</template>
              </p>
            </div>

            <div v-else-if="step === 'form-google'">
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">{{ lang === 'ID' ? 'Hampir jadi nih' : 'Almost there' }}</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">{{ lang === 'ID' ? 'Isi beberapa info dulu, bentar lagi selesai.' : 'Fill in a few details to finish setting up your account.' }}</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleRegister">
                <Input v-model="name" :label="lang === 'ID' ? 'Nama lengkap' : 'Full name'" required :placeholder="lang === 'ID' ? 'Masukan nama kamu' : 'Enter your name'" :error="nameErr" @update:modelValue="nameErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="phone" type="tel" :label="lang === 'ID' ? 'Nomor HP' : 'Phone number'" required :placeholder="lang === 'ID' ? 'Masukan no. HP kamu' : 'Enter your phone number'" :error="phoneErr" @update:modelValue="phoneErr = ''">
                  <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="referral" :label="lang === 'ID' ? 'Ada kode dari teman? (Opsional)' : 'Referral code (Optional)'" :placeholder="lang === 'ID' ? 'Masukan kode referral' : 'Enter referral code'">
                  <template #leading><RiGiftLine style="width:16px;height:16px;" /></template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}">{{ lang === 'ID' ? 'Buat akun' : 'Create account' }}</Button>
              </form>
              <p style="${DISCLAIMER}margin-top:0.75rem;">
                <template v-if="lang === 'ID'">Dengan daftar, kamu setuju sama <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a> dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> kita. Data kamu aman, gak akan kita bagikan ke siapapun.</template>
                <template v-else>By signing up, you agree to our <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Terms of Service</a> and <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Privacy Policy</a>. Your data is safe with us.</template>
              </p>
            </div>
            </Transition>

          </div>
          </div>
          <div style="${TOPBAR_SPACER}"></div>
          </div>
        </div>

        <Modal v-model="showSuccess" size="sm" :closable="false" :close-on-overlay="false">
          <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;padding:0.5rem 0 0.25rem;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(208,0,62,0.08);display:flex;align-items:center;justify-content:center;">
              <div style="width:46px;height:46px;border-radius:50%;background:rgba(208,0,62,0.13);display:flex;align-items:center;justify-content:center;">
                <RiCheckboxCircleFill style="color:#D0003E;" :size="28" />
              </div>
            </div>
            <div>
              <h2 style="font-size:20px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">{{ lang === 'ID' ? 'Hore, akunmu jadi!' : 'Account created!' }}</h2>
              <p style="font-size:14px;color:var(--color-text-secondary);margin:0;line-height:1.25rem;">{{ lang === 'ID' ? 'Selamat datang di Abadikan. Yuk mulai bikin undangan yang bikin tamu terkesan.' : 'Welcome to Abadikan. Time to build your perfect invitation.' }}</p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:0.25rem;" @click="showSuccess = false">{{ lang === 'ID' ? 'Mulai sekarang' : 'Get started' }}</Button>
          </div>
        </Modal>
      </div>
    `,
  }),
}

// ── Auth Flow (Connected) ──────────────────────────────────────────────────────
export const AuthFlow: Story = {
  name: '🔗 Auth Flow (Connected)',
  render: () => ({
    components: { Input, Button, Divider, Modal, RiMailLine, RiLockLine, RiUser3Line, RiPhoneLine, RiGiftLine, RiCheckboxCircleFill, RiArrowLeftSLine },
    setup() {
      const { onEnter, onLeave } = usePageTransition()
      type Page = 'login' | 'forgot' | 'reset' | 'signup' | 'signup-email' | 'signup-google'
      const page = ref<Page>('login')

      const lang = ref<'ID'|'EN'>('ID')

      const taglinesID: Record<Page, string> = {
        login: 'Mulai dari RSVP sampai kado<br/>digital, semua bisa kamu atur<br/>di Abadikan.',
        forgot: 'Tenang, akunmu aman.<br/>Kita beresin passwordnya<br/>biar undanganmu bisa lanjut.',
        reset: 'Hampir selesai nih.<br/>Bikin password baru,<br/>terus siapkan undanganmu.',
        signup: 'Mulai ceritamu di Abadikan.<br/>Undangan digital yang bikin<br/>kisah cintamu berkesan',
        'signup-email': 'Mulai ceritamu di Abadikan.<br/>Undangan digital yang bikin<br/>kisah cintamu berkesan',
        'signup-google': 'Mulai ceritamu di Abadikan.<br/>Undangan digital yang bikin<br/>kisah cintamu berkesan',
      }
      const taglinesEN: Record<Page, string> = {
        login: 'Your perfect wedding,<br/>beautifully organized.<br/>Everything in one place.',
        forgot: 'Your account is safe.<br/>We\'ll get your password<br/>sorted in no time.',
        reset: 'One last step.<br/>Set a new password and<br/>you\'ll be back to planning.',
        signup: 'Begin your story here.<br/>Beautiful invitations crafted<br/>for moments that matter.',
        'signup-email': 'Begin your story here.<br/>Beautiful invitations crafted<br/>for moments that matter.',
        'signup-google': 'Begin your story here.<br/>Beautiful invitations crafted<br/>for moments that matter.',
      }
      const tagline = computed(() => (lang.value === 'ID' ? taglinesID : taglinesEN)[page.value])

      const loading = ref(false), showSuccess = ref(false)

      const loginEmail = ref(''), loginPass = ref(''), loginEmailErr = ref(''), loginPassErr = ref('')
      function handleLogin() {
        loginEmailErr.value = loginPassErr.value = ''
        if (!loginEmail.value) loginEmailErr.value = lang.value === 'ID' ? 'Emailnya belum diisi' : 'Please enter your email'
        if (!loginPass.value) loginPassErr.value = lang.value === 'ID' ? 'Passwordnya belum diisi' : 'Please enter your password'
        if (loginEmailErr.value || loginPassErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }

      const forgotEmail = ref(''), forgotEmailErr = ref(''), countdown = ref(0)
      const forgotSent = ref(false)
      let timer: ReturnType<typeof setInterval> | null = null
      function handleForgot() {
        forgotEmailErr.value = ''
        if (!forgotEmail.value) { forgotEmailErr.value = lang.value === 'ID' ? 'Emailnya belum diisi' : 'Please enter your email'; return }
        if (forgotSent.value && countdown.value > 0) return
        if (timer) { clearInterval(timer); timer = null }
        loading.value = true
        setTimeout(() => {
          loading.value = false; showSuccess.value = true; forgotSent.value = true; countdown.value = 10
          timer = setInterval(() => {
            countdown.value--
            if (countdown.value <= 0 && timer) { clearInterval(timer); timer = null }
          }, 1000)
        }, 1500)
      }

      const newPass = ref(''), confirmPass = ref(''), newPassErr = ref(''), confirmErr = ref('')
      function handleReset() {
        newPassErr.value = confirmErr.value = ''
        if (!newPass.value) newPassErr.value = lang.value === 'ID' ? 'Passwordnya belum diisi' : 'Please enter a password'
        else if (newPass.value.length < 8) newPassErr.value = lang.value === 'ID' ? 'Password minimal 8 karakter ya' : 'Password must be at least 8 characters'
        if (!confirmPass.value) confirmErr.value = lang.value === 'ID' ? 'Password ulangnya belum diisi' : 'Please confirm your password'
        else if (newPass.value && confirmPass.value !== newPass.value) confirmErr.value = lang.value === 'ID' ? 'Passwordnya belum sama nih' : "Passwords don't match"
        if (newPassErr.value || confirmErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }

      const signupEmail = ref(''), signupEmailErr = ref('')
      const signupPass = ref(''), signupName = ref(''), signupPhone = ref(''), signupReferral = ref('')
      const signupPassErr = ref(''), signupNameErr = ref(''), signupPhoneErr = ref('')
      function handleSignupEmail() {
        signupEmailErr.value = ''
        if (!signupEmail.value) { signupEmailErr.value = lang.value === 'ID' ? 'Emailnya belum diisi' : 'Please enter your email'; return }
        if (!signupEmail.value.includes('@')) { signupEmailErr.value = lang.value === 'ID' ? 'Emailnya belum benar, contohnya: nama@gmail.com' : 'Please enter a valid email address'; return }
        page.value = 'signup-email'
      }
      function handleRegister() {
        signupPassErr.value = signupNameErr.value = signupPhoneErr.value = ''
        if (page.value === 'signup-email') {
          if (!signupPass.value) signupPassErr.value = lang.value === 'ID' ? 'Passwordnya belum diisi' : 'Please enter a password'
          else if (signupPass.value.length < 8) signupPassErr.value = lang.value === 'ID' ? 'Password minimal 8 karakter ya' : 'Password must be at least 8 characters'
        }
        if (!signupName.value) signupNameErr.value = lang.value === 'ID' ? 'Nama lengkapnya belum diisi' : 'Please enter your full name'
        if (!signupPhone.value) signupPhoneErr.value = lang.value === 'ID' ? 'Nomor HP-nya belum diisi' : 'Please enter your phone number'
        if (signupPassErr.value || signupNameErr.value || signupPhoneErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }

      function go(p: Page) { page.value = p; showSuccess.value = false; loading.value = false }

      const successTitle = computed(() => {
        const t = {
          ID: { login: 'Berhasil masuk!', forgot: 'Udah kita kirim!', reset: 'Beres!', signup: 'Hore, akunmu jadi!', 'signup-email': 'Hore, akunmu jadi!', 'signup-google': 'Hore, akunmu jadi!' },
          EN: { login: "You're in!", forgot: 'Check your email', reset: 'Password updated', signup: 'Account created!', 'signup-email': 'Account created!', 'signup-google': 'Account created!' },
        }
        return t[lang.value][page.value]
      })
      const successBtn = computed(() => {
        const t = {
          ID: { login: 'Lanjut atur undangan', forgot: 'Oke, siap!', reset: 'Masuk sekarang', signup: 'Mulai sekarang', 'signup-email': 'Mulai sekarang', 'signup-google': 'Mulai sekarang' },
          EN: { login: 'Continue planning', forgot: 'Got it', reset: 'Sign in', signup: 'Get started', 'signup-email': 'Get started', 'signup-google': 'Get started' },
        }
        return t[lang.value][page.value]
      })
      return {
        page, tagline, loading, showSuccess,
        loginEmail, loginPass, loginEmailErr, loginPassErr, handleLogin,
        forgotEmail, forgotEmailErr, countdown, forgotSent, handleForgot,
        newPass, confirmPass, newPassErr, confirmErr, handleReset,
        signupEmail, signupEmailErr, signupPass, signupName, signupPhone, signupReferral,
        signupPassErr, signupNameErr, signupPhoneErr, handleSignupEmail, handleRegister,
        successTitle, successBtn, go, GoogleSVG, lang, onEnter, onLeave,
      }
    },
    template: `
      <div style="${GRID}">

        <div style="${LEFT}">
          <div style="${LOGO_WRAP}">
            <img src="/abadikan-wordmark.svg" height="22" alt="abadikan.id" />
          </div>
          <div style="${DECOR}">
            <img src="/abadikan-decor.svg" alt="" style="width:100%;display:block;opacity:0.6;" />
          </div>
          <Transition name="tagline" mode="out-in">
            <p :key="tagline" style="${TAGLINE}" v-html="tagline"></p>
          </Transition>
        </div>

        <div style="${RIGHT_COL}">
          <div style="${TOPBAR}">
            <Button v-if="page === 'forgot' || page === 'signup-email' || page === 'signup-google'" type="button" variant="outline" size="sm" style="${BTN_ICON}" @click.prevent="page === 'forgot' ? go('login') : go('signup')"><template #leading><RiArrowLeftSLine style="width:1em;height:1em;" /></template>{{ lang === 'ID' ? 'Balik' : 'Back' }}</Button>
            <div v-else></div>
            <div style="${LANG}">
              <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
              <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
            </div>
          </div>
          <div style="${FORM_WRAP}">
          <div style="${FORM}">

            <!-- LOGIN -->
            <Transition mode="out-in" :css="false" @enter="onEnter" @leave="onLeave">
            <div v-if="page === 'login'">
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">{{ lang === 'ID' ? 'Lanjut ngurus undanganmu, yuk' : "Welcome back" }}</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">{{ lang === 'ID' ? 'Masuk dulu, banyak yang mau disiapkan.' : 'Your invitation is waiting. Sign in to continue.' }}</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleLogin">
                <Input v-model="loginEmail" type="email" label="Email" required :placeholder="lang === 'ID' ? 'emailkamu@gmail.com' : 'youremail@gmail.com'" :error="loginEmailErr" @update:modelValue="loginEmailErr = ''">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="loginPass" type="password" label="Password" required placeholder="••••••••" :error="loginPassErr" @update:modelValue="loginPassErr = ''">
                  <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                  <template #label-trailing>
                    <a href="#" style="font-size:12px;color:var(--color-text-secondary);text-decoration:none;" @click.prevent="go('forgot')">{{ lang === 'ID' ? 'Lupa password?' : 'Forgot password?' }}</a>
                  </template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:0.25rem;">{{ lang === 'ID' ? 'Masuk' : 'Sign in' }}</Button>
              </form>
              <div style="margin:1rem 0;"><Divider :label="lang === 'ID' ? 'atau' : 'or'" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                {{ lang === 'ID' ? 'Masuk dengan Google' : 'Sign in with Google' }}
              </Button>
              <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
                {{ lang === 'ID' ? 'Belum punya akun?' : "Don't have an account?" }} <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('signup')">{{ lang === 'ID' ? 'Daftar sekarang' : 'Sign up' }}</a>
              </p>
            </div>

            <!-- FORGOT PASSWORD -->
            <div v-else-if="page === 'forgot'">
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">{{ lang === 'ID' ? 'Tenang, kita beresin bareng' : "Forgot your password?" }}</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">{{ lang === 'ID' ? 'Masukin emailmu. Kita kirimin link resetnya ke sana.' : "Enter your email and we'll send you a reset link." }}</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleForgot">
                <Input v-model="forgotEmail" type="email" label="Email" required :placeholder="lang === 'ID' ? 'emailkamu@gmail.com' : 'youremail@gmail.com'" :error="forgotEmailErr" @update:modelValue="forgotEmailErr = ''">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" :disabled="forgotSent && countdown > 0" :style="forgotSent && countdown > 0 ? '${BTN}opacity:0.45;cursor:not-allowed;' : '${BTN}'">
                  {{ !forgotSent ? (lang === 'ID' ? 'Kirim link reset' : 'Send reset link') : countdown > 0 ? (lang === 'ID' ? 'Kirim ulang (' + countdown + ')' : 'Resend (' + countdown + ')') : (lang === 'ID' ? 'Kirim ulang' : 'Resend') }}
                </Button>
              </form>
              <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
                {{ lang === 'ID' ? 'Udah ingat passwordnya?' : 'Remembered it?' }} <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('login')">{{ lang === 'ID' ? 'Masuk' : 'Sign in' }}</a>
              </p>
            </div>

            <!-- RESET PASSWORD -->
            <div v-else-if="page === 'reset'">
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">{{ lang === 'ID' ? 'Bikin password baru, yuk' : 'Set a new password' }}</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">{{ lang === 'ID' ? 'Tinggal ini, terus bisa lanjut atur undanganmu.' : 'Choose a strong password to keep your account secure.' }}</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleReset">
                <Input v-model="newPass" type="password" :label="lang === 'ID' ? 'Password baru' : 'New password'" required :placeholder="lang === 'ID' ? 'Masukan password baru' : 'Enter new password'" :error="newPassErr" @update:modelValue="newPassErr = ''">
                  <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="confirmPass" type="password" :label="lang === 'ID' ? 'Ulangi password' : 'Confirm password'" required :placeholder="lang === 'ID' ? 'Ulangi password' : 'Confirm password'" :error="confirmErr" @update:modelValue="confirmErr = ''">
                  <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:0.25rem;">{{ lang === 'ID' ? 'Simpan' : 'Update password' }}</Button>
              </form>
            </div>

            <!-- SIGNUP Step 0 -->
            <div v-else-if="page === 'signup'">
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">{{ lang === 'ID' ? 'Mulai dari sini, yuk' : 'Create your account' }}</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">{{ lang === 'ID' ? 'Daftar dulu biar momenmu bisa kita abadikan bareng.' : 'Join Abadikan and start planning your celebration.' }}</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleSignupEmail">
                <Input v-model="signupEmail" type="email" label="Email" required :placeholder="lang === 'ID' ? 'emailkamu@gmail.com' : 'youremail@gmail.com'" :error="signupEmailErr" @update:modelValue="signupEmailErr = ''">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" style="${BTN}">{{ lang === 'ID' ? 'Lanjut' : 'Continue' }}</Button>
              </form>
              <div style="margin:1rem 0;"><Divider :label="lang === 'ID' ? 'atau' : 'or'" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}" @click="go('signup-google')">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                {{ lang === 'ID' ? 'Daftar dengan Google' : 'Sign up with Google' }}
              </Button>
              <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:0.75rem;">
                {{ lang === 'ID' ? 'Udah punya akun?' : 'Already have an account?' }} <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('login')">{{ lang === 'ID' ? 'Masuk' : 'Sign in' }}</a>
              </p>
            </div>

            <!-- SIGNUP Step 1a: Email -->
            <div v-else-if="page === 'signup-email'">
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">{{ lang === 'ID' ? 'Hampir jadi nih' : 'Almost there' }}</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">{{ lang === 'ID' ? 'Isi beberapa info dulu, bentar lagi selesai.' : 'Fill in a few details to finish setting up your account.' }}</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleRegister">
                <Input :modelValue="signupEmail" label="Email" type="email" :disabled="true">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <div style="display:flex;flex-direction:column;gap:0.25rem;">
                  <Input v-model="signupPass" type="password" :label="lang === 'ID' ? 'Buat password' : 'Create password'" required :placeholder="lang === 'ID' ? 'Masukan password' : 'Enter password'" :error="signupPassErr" @update:modelValue="signupPassErr = ''">
                    <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                  </Input>
                  <p style="${HELPER}">{{ lang === 'ID' ? 'Minimal 8 karakter' : 'At least 8 characters' }}</p>
                </div>
                <Input v-model="signupName" :label="lang === 'ID' ? 'Nama lengkap' : 'Full name'" required :placeholder="lang === 'ID' ? 'Masukan nama kamu' : 'Enter your name'" :error="signupNameErr" @update:modelValue="signupNameErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupPhone" type="tel" :label="lang === 'ID' ? 'Nomor HP' : 'Phone number'" required :placeholder="lang === 'ID' ? 'Masukan no. HP kamu' : 'Enter your phone number'" :error="signupPhoneErr" @update:modelValue="signupPhoneErr = ''">
                  <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupReferral" :label="lang === 'ID' ? 'Ada kode dari teman? (Opsional)' : 'Referral code (Optional)'" :placeholder="lang === 'ID' ? 'Masukan kode referral' : 'Enter referral code'">
                  <template #leading><RiGiftLine style="width:16px;height:16px;" /></template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}">{{ lang === 'ID' ? 'Buat akun' : 'Create account' }}</Button>
              </form>
              <p style="${DISCLAIMER}margin-top:0.75rem;">
                <template v-if="lang === 'ID'">Dengan daftar, kamu setuju sama <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a> dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> kita. Data kamu aman, gak akan kita bagikan ke siapapun.</template>
                <template v-else>By signing up, you agree to our <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Terms of Service</a> and <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Privacy Policy</a>. Your data is safe with us.</template>
              </p>
            </div>

            <!-- SIGNUP Step 1b: Google -->
            <div v-else-if="page === 'signup-google'">
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">{{ lang === 'ID' ? 'Hampir jadi nih' : 'Almost there' }}</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">{{ lang === 'ID' ? 'Isi beberapa info dulu, bentar lagi selesai.' : 'Fill in a few details to finish setting up your account.' }}</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleRegister">
                <Input v-model="signupName" :label="lang === 'ID' ? 'Nama lengkap' : 'Full name'" required :placeholder="lang === 'ID' ? 'Masukan nama kamu' : 'Enter your name'" :error="signupNameErr" @update:modelValue="signupNameErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupPhone" type="tel" :label="lang === 'ID' ? 'Nomor HP' : 'Phone number'" required :placeholder="lang === 'ID' ? 'Masukan no. HP kamu' : 'Enter your phone number'" :error="signupPhoneErr" @update:modelValue="signupPhoneErr = ''">
                  <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupReferral" :label="lang === 'ID' ? 'Ada kode dari teman? (Opsional)' : 'Referral code (Optional)'" :placeholder="lang === 'ID' ? 'Masukan kode referral' : 'Enter referral code'">
                  <template #leading><RiGiftLine style="width:16px;height:16px;" /></template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}">{{ lang === 'ID' ? 'Buat akun' : 'Create account' }}</Button>
              </form>
              <p style="${DISCLAIMER}margin-top:0.75rem;">
                <template v-if="lang === 'ID'">Dengan daftar, kamu setuju sama <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a> dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> kita. Data kamu aman, gak akan kita bagikan ke siapapun.</template>
                <template v-else>By signing up, you agree to our <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Terms of Service</a> and <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Privacy Policy</a>. Your data is safe with us.</template>
              </p>
            </div>
            </Transition>

          </div>
          </div>
          <div style="${TOPBAR_SPACER}"></div>
          </div>
        </div>

        <!-- SUCCESS MODAL -->
        <Modal v-model="showSuccess" size="sm" :closable="false" :close-on-overlay="false">
          <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;padding:0.5rem 0 0.25rem;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(208,0,62,0.08);display:flex;align-items:center;justify-content:center;">
              <div style="width:46px;height:46px;border-radius:50%;background:rgba(208,0,62,0.13);display:flex;align-items:center;justify-content:center;">
                <RiCheckboxCircleFill style="color:#D0003E;" :size="28" />
              </div>
            </div>
            <div>
              <h2 style="font-size:20px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">{{ successTitle }}</h2>
              <p style="font-size:14px;color:var(--color-text-secondary);margin:0;line-height:1.25rem;">
                <template v-if="page === 'login'">{{ lang === 'ID' ? 'Selamat datang kembali. Undanganmu udah nunggu.' : 'Welcome back. Your invitation is ready to continue.' }}</template>
                <template v-else-if="page === 'forgot'">
                  <template v-if="lang === 'ID'">Cek emailmu ya. Udah kita kirim ke <strong style="color:var(--color-text-heading);font-weight:600;">{{ forgotEmail }}</strong>. Belum masuk? Cek folder Spam juga.</template>
                  <template v-else>We sent a reset link to <strong style="color:var(--color-text-heading);font-weight:600;">{{ forgotEmail }}</strong>. Check your spam folder if you don't see it.</template>
                </template>
                <template v-else-if="page === 'reset'">{{ lang === 'ID' ? 'Password barumu udah aktif. Sekarang tinggal masuk dan lanjut atur undanganmu.' : 'Your new password is set. You can now sign in.' }}</template>
                <template v-else>{{ lang === 'ID' ? 'Selamat datang di Abadikan. Yuk mulai bikin undangan yang bikin tamu terkesan.' : 'Welcome to Abadikan. Time to build your perfect invitation.' }}</template>
              </p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:0.25rem;"
              @click="page === 'reset' ? go('login') : (showSuccess = false)">
              {{ successBtn }}
            </Button>
          </div>
        </Modal>

      </div>
    `,
  }),
}
