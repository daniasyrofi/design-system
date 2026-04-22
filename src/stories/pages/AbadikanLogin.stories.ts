import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed, defineComponent } from 'vue'
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
const LEFT = `background-color:${RED};display:flex;flex-direction:column;height:100vh;padding:2rem 1.75rem;position:sticky;top:0;overflow:hidden;box-sizing:border-box;`
const DECOR = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-44%);width:140%;pointer-events:none;z-index:1;'
const TAGLINE = 'font-size:20px;font-weight:700;line-height:1.75rem;color:white;position:relative;z-index:2;margin:auto 0 0;text-align:center;padding-bottom:0.5rem;'
const RIGHT = 'display:flex;align-items:center;justify-content:center;padding:2.75rem 2.5rem;background-color:var(--color-surface);min-height:100vh;box-sizing:border-box;'
const FORM = 'width:100%;max-width:400px;--radius-2xl:20px;'
const BTN = 'border-radius:999px;gap:0.25rem;padding-inline-start:1.25rem;padding-inline-end:1.25rem;'
const BTN_ICON = 'border-radius:999px;gap:0.25rem;padding-inline-start:0.75rem;padding-inline-end:1rem;'
const BACK = 'display:inline-flex;align-items:center;gap:4px;padding:0;background:none;border:none;cursor:pointer;color:var(--color-text-heading);font-size:0.875rem;font-weight:500;margin-bottom:6px;transition:color 0.15s;'
const HELPER = 'font-size:12px;color:var(--color-text-secondary);margin:0;line-height:1rem;'
const DISCLAIMER = 'font-size:12px;color:var(--color-text-secondary);margin:0;line-height:1rem;text-align:center;'

const GoogleSVG = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>`

function leftPanel(tagline: string) {
  return `
    <div style="${LEFT}">
      <div style="position:relative;z-index:2;display:flex;justify-content:center;">
        <img src="/abadikan-wordmark.svg" height="22" alt="abadikan.id" />
      </div>
      <div style="${DECOR}">
        <img src="/abadikan-decor.svg" alt="" style="width:100%;display:block;opacity:0.6;" />
      </div>
      <p style="${TAGLINE}">${tagline}</p>
    </div>`
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

      function handleLogin() {
        emailErr.value = passErr.value = ''
        if (!email.value) emailErr.value = 'Emailnya belum diisi'
        if (!password.value) passErr.value = 'Passwordnya belum diisi'
        if (emailErr.value || passErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }
      return { email, password, emailErr, passErr, loading, showSuccess, handleLogin, GoogleSVG }
    },
    template: `
      <div style="${GRID}">
        ${leftPanel('Mulai dari RSVP sampai kado<br/>digital, semua bisa kamu atur<br/>di Abadikan.')}

        <div style="${RIGHT}">
          <div style="${FORM}">
            <div style="text-align:center;margin-bottom:1.25rem;">
              <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">Lanjut ngurus undanganmu, yuk</h1>
              <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">Masuk dulu, banyak yang mau disiapkan.</p>
            </div>

            <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleLogin">
              <Input v-model="email" type="email" label="Email" required placeholder="emailkamu@gmail.com" :error="emailErr" @update:modelValue="emailErr = ''">
                <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
              </Input>
              <Input v-model="password" type="password" label="Password" required placeholder="••••••••" :error="passErr" @update:modelValue="passErr = ''">
                <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                <template #label-trailing>
                  <a href="#" style="font-size:12px;color:var(--color-text-secondary);text-decoration:none;">Lupa password?</a>
                </template>
              </Input>
              <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:0.25rem;">Masuk</Button>
            </form>

            <div style="margin:1rem 0;"><Divider label="atau" /></div>

            <Button variant="outline" full-width size="md" style="${BTN_ICON}">
              <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
              Masuk dengan Google
            </Button>

            <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
              Belum punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">Daftar sekarang</a>
            </p>
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
              <h2 style="font-size:20px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">Berhasil masuk!</h2>
              <p style="font-size:14px;color:var(--color-text-secondary);margin:0;line-height:1.25rem;">Selamat datang kembali. Undanganmu udah nunggu.</p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:0.25rem;" @click="showSuccess = false">Lanjut atur undangan</Button>
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
    components: { Input, Button, Modal, RiMailLine, RiCheckboxCircleFill },
    setup() {
      const email = ref(''), emailErr = ref('')
      const loading = ref(false), countdown = ref(0), showSuccess = ref(false)
      const sent = ref(false)
      let timer: ReturnType<typeof setInterval> | null = null

      function handleSend() {
        emailErr.value = ''
        if (!email.value) { emailErr.value = 'Emailnya belum diisi'; return }
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
      return { email, emailErr, loading, countdown, sent, showSuccess, handleSend, RiArrowLeftSLine }
    },
    template: `
      <div style="${GRID}">
        ${leftPanel('Tenang, akunmu aman.<br/>Kita beresin passwordnya<br/>biar undanganmu bisa lanjut.')}

        <div style="${RIGHT}">
          <div style="${FORM}">
            <Button variant="link-neutral" size="sm" style="${BACK}" @click.prevent :leading-icon="RiArrowLeftSLine">Balik</Button>
            <div style="margin-bottom:1.25rem;">
              <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">Tenang, kita beresin bareng</h1>
              <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">Masukin emailmu. Kita kirimin link resetnya ke sana.</p>
            </div>

            <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleSend">
              <Input v-model="email" type="email" label="Email" required placeholder="emailkamu@gmail.com" :error="emailErr" @update:modelValue="emailErr = ''">
                <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
              </Input>
              <Button type="submit" variant="default" full-width size="md" :loading="loading" :disabled="sent && countdown > 0" style="${BTN}">
                {{ !sent ? 'Kirim link reset' : countdown > 0 ? 'Kirim ulang (' + countdown + ')' : 'Kirim ulang' }}
              </Button>
            </form>

            <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
              Udah ingat passwordnya? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">Masuk</a>
            </p>
          </div>
        </div>

        <Modal v-model="showSuccess" size="sm" :closable="false" :close-on-overlay="true">
          <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;padding:0.5rem 0 0.25rem;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(208,0,62,0.08);display:flex;align-items:center;justify-content:center;">
              <div style="width:46px;height:46px;border-radius:50%;background:rgba(208,0,62,0.13);display:flex;align-items:center;justify-content:center;">
                <RiCheckboxCircleFill style="color:#D0003E;" :size="28" />
              </div>
            </div>
            <div>
              <h2 style="font-size:20px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">Udah kita kirim!</h2>
              <p style="font-size:14px;color:var(--color-text-secondary);margin:0;line-height:1.25rem;">
                Cek emailmu ya. Udah kita kirim ke <strong style="color:var(--color-text-heading);font-weight:600;">{{ email }}</strong>. Belum masuk? Cek folder Spam juga.
              </p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:0.25rem;" @click="showSuccess = false">Oke, siap!</Button>
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

      function handleReset() {
        newPassErr.value = confirmErr.value = ''
        if (!newPass.value) newPassErr.value = 'Passwordnya belum diisi'
        else if (newPass.value.length < 8) newPassErr.value = 'Password minimal 8 karakter ya'
        if (!confirmPass.value) confirmErr.value = 'Password ulangnya belum diisi'
        else if (newPass.value && confirmPass.value !== newPass.value) confirmErr.value = 'Passwordnya belum sama nih'
        if (newPassErr.value || confirmErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }
      return { newPass, confirmPass, newPassErr, confirmErr, loading, showSuccess, handleReset }
    },
    template: `
      <div style="${GRID}">
        ${leftPanel('Hampir selesai nih.<br/>Bikin password baru,<br/>terus siapkan undanganmu.')}

        <div style="${RIGHT}">
          <div style="${FORM}">
            <div style="margin-bottom:1.25rem;">
              <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">Bikin password baru, yuk</h1>
              <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">Tinggal ini, terus bisa lanjut atur undanganmu.</p>
            </div>

            <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleReset">
              <Input v-model="newPass" type="password" label="Password baru" required placeholder="Masukan password baru" :error="newPassErr" @update:modelValue="newPassErr = ''">
                <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
              </Input>
              <Input v-model="confirmPass" type="password" label="Ulangi password" required placeholder="Ulangi password" :error="confirmErr" @update:modelValue="confirmErr = ''">
                <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
              </Input>
              <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:0.25rem;">Simpan</Button>
            </form>
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
              <h2 style="font-size:20px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">Beres!</h2>
              <p style="font-size:14px;color:var(--color-text-secondary);margin:0;line-height:1.25rem;">Password barumu udah aktif. Sekarang tinggal masuk dan lanjut atur undanganmu.</p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:0.25rem;" @click="showSuccess = false">Masuk sekarang</Button>
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
    components: { Input, Button, Divider, Modal, RiMailLine, RiLockLine, RiUser3Line, RiPhoneLine, RiGiftLine, RiCheckboxCircleFill },
    setup() {
      type Step = 'email' | 'form-email' | 'form-google'
      const step = ref<Step>('email')
      const email = ref(''), emailErr = ref('')
      const password = ref(''), name = ref(''), phone = ref(''), referral = ref('')
      const passErr = ref(''), nameErr = ref(''), phoneErr = ref('')
      const loading = ref(false), showSuccess = ref(false)

      function handleEmailNext() {
        emailErr.value = ''
        if (!email.value) { emailErr.value = 'Emailnya belum diisi'; return }
        if (!email.value.includes('@')) { emailErr.value = 'Emailnya belum benar, contohnya: nama@gmail.com'; return }
        step.value = 'form-email'
      }
      function handleRegister() {
        passErr.value = nameErr.value = phoneErr.value = ''
        if (step.value === 'form-email') {
          if (!password.value) passErr.value = 'Passwordnya belum diisi'
          else if (password.value.length < 8) passErr.value = 'Password minimal 8 karakter ya'
        }
        if (!name.value) nameErr.value = 'Nama lengkapnya belum diisi'
        if (!phone.value) phoneErr.value = 'Nomor HP-nya belum diisi'
        if (passErr.value || nameErr.value || phoneErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }
      return { step, email, emailErr, password, name, phone, referral, passErr, nameErr, phoneErr, loading, showSuccess, handleEmailNext, handleRegister, GoogleSVG, RiArrowLeftSLine }
    },
    template: `
      <div style="${GRID}">
        ${leftPanel('Mulai ceritamu di Abadikan.<br/>Undangan digital yang bikin<br/>kisah cintamu berkesan')}

        <div style="${RIGHT}">
          <div style="${FORM}">

            <template v-if="step === 'email'">
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">Mulai dari sini, yuk</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">Daftar dulu biar momenmu bisa kita abadikan bareng.</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleEmailNext">
                <Input v-model="email" type="email" label="Email" required placeholder="emailkamu@gmail.com" :error="emailErr" @update:modelValue="emailErr = ''">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <p style="${DISCLAIMER}">
                  Dengan daftar, kamu setuju sama <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a> dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> kita. Data kamu aman, gak akan kita bagikan ke siapapun.
                </p>
                <Button type="submit" variant="default" full-width size="md" style="${BTN}">Lanjut</Button>
              </form>
              <div style="margin:1rem 0;"><Divider label="atau" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}" @click="step = 'form-google'">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                Daftar dengan Google
              </Button>
              <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
                Udah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">Masuk</a>
              </p>
            </template>

            <template v-else-if="step === 'form-email'">
              <Button variant="link-neutral" size="sm" style="${BACK}" @click.prevent="step = 'email'" :leading-icon="RiArrowLeftSLine">Balik</Button>
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">Hampir jadi nih</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">Isi beberapa info dulu, bentar lagi selesai.</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleRegister">
                <Input :modelValue="email" label="Email" type="email" :disabled="true">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <div style="display:flex;flex-direction:column;gap:0.25rem;">
                  <Input v-model="password" type="password" label="Buat password" required placeholder="Masukan password" :error="passErr" @update:modelValue="passErr = ''">
                    <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                  </Input>
                  <p style="${HELPER}">Minimal 8 karakter</p>
                </div>
                <Input v-model="name" label="Nama lengkap" required placeholder="Masukan nama kamu" :error="nameErr" @update:modelValue="nameErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="phone" type="tel" label="Nomor HP" required placeholder="Masukan no. HP kamu" :error="phoneErr" @update:modelValue="phoneErr = ''">
                  <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="referral" label="Ada kode dari teman? (Opsional)" placeholder="Masukan kode referral">
                  <template #leading><RiGiftLine style="width:16px;height:16px;" /></template>
                </Input>
                <p style="${DISCLAIMER}margin-top:0.25rem;">
                  Dengan daftar, kamu setuju sama <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a> dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> kita. Data kamu aman, gak akan kita bagikan ke siapapun.
                </p>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:2px;">Buat akun</Button>
              </form>
              <div style="margin:0.75rem 0;"><Divider label="atau" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}" @click="step = 'form-google'">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                Daftar dengan Google
              </Button>
              <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
                Udah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">Masuk</a>
              </p>
            </template>

            <template v-else-if="step === 'form-google'">
              <Button variant="link-neutral" size="sm" style="${BACK}" @click.prevent="step = 'email'" :leading-icon="RiArrowLeftSLine">Balik</Button>
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">Hampir jadi nih</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">Isi beberapa info dulu, bentar lagi selesai.</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleRegister">
                <Input v-model="name" label="Nama lengkap" required placeholder="Masukan nama kamu" :error="nameErr" @update:modelValue="nameErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="phone" type="tel" label="Nomor HP" required placeholder="Masukan no. HP kamu" :error="phoneErr" @update:modelValue="phoneErr = ''">
                  <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="referral" label="Ada kode dari teman? (Opsional)" placeholder="Masukan kode referral">
                  <template #leading><RiGiftLine style="width:16px;height:16px;" /></template>
                </Input>
                <p style="${DISCLAIMER}margin-top:0.25rem;">
                  Dengan daftar, kamu setuju sama <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a> dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> kita. Data kamu aman, gak akan kita bagikan ke siapapun.
                </p>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:2px;">Buat akun</Button>
              </form>
              <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
                Udah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">Masuk</a>
              </p>
            </template>

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
              <h2 style="font-size:20px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">Hore, akunmu jadi!</h2>
              <p style="font-size:14px;color:var(--color-text-secondary);margin:0;line-height:1.25rem;">Selamat datang di Abadikan. Yuk mulai bikin undangan yang bikin tamu terkesan.</p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:0.25rem;" @click="showSuccess = false">Mulai sekarang</Button>
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
    components: { Input, Button, Divider, Modal, RiMailLine, RiLockLine, RiUser3Line, RiPhoneLine, RiGiftLine, RiCheckboxCircleFill },
    setup() {
      type Page = 'login' | 'forgot' | 'reset' | 'signup' | 'signup-email' | 'signup-google'
      const page = ref<Page>('login')

      const taglines: Record<Page, string> = {
        login: 'Mulai dari RSVP sampai kado<br/>digital, semua bisa kamu atur<br/>di Abadikan.',
        forgot: 'Tenang, akunmu aman.<br/>Kita beresin passwordnya<br/>biar undanganmu bisa lanjut.',
        reset: 'Hampir selesai nih.<br/>Bikin password baru,<br/>terus siapkan undanganmu.',
        signup: 'Mulai ceritamu di Abadikan.<br/>Undangan digital yang bikin<br/>kisah cintamu berkesan',
        'signup-email': 'Mulai ceritamu di Abadikan.<br/>Undangan digital yang bikin<br/>kisah cintamu berkesan',
        'signup-google': 'Mulai ceritamu di Abadikan.<br/>Undangan digital yang bikin<br/>kisah cintamu berkesan',
      }
      const tagline = computed(() => taglines[page.value])

      const loading = ref(false), showSuccess = ref(false)

      const loginEmail = ref(''), loginPass = ref(''), loginEmailErr = ref(''), loginPassErr = ref('')
      function handleLogin() {
        loginEmailErr.value = loginPassErr.value = ''
        if (!loginEmail.value) loginEmailErr.value = 'Emailnya belum diisi'
        if (!loginPass.value) loginPassErr.value = 'Passwordnya belum diisi'
        if (loginEmailErr.value || loginPassErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }

      const forgotEmail = ref(''), forgotEmailErr = ref(''), countdown = ref(0)
      const forgotSent = ref(false)
      let timer: ReturnType<typeof setInterval> | null = null
      function handleForgot() {
        forgotEmailErr.value = ''
        if (!forgotEmail.value) { forgotEmailErr.value = 'Emailnya belum diisi'; return }
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
        if (!newPass.value) newPassErr.value = 'Passwordnya belum diisi'
        else if (newPass.value.length < 8) newPassErr.value = 'Password minimal 8 karakter ya'
        if (!confirmPass.value) confirmErr.value = 'Password ulangnya belum diisi'
        else if (newPass.value && confirmPass.value !== newPass.value) confirmErr.value = 'Passwordnya belum sama nih'
        if (newPassErr.value || confirmErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }

      const signupEmail = ref(''), signupEmailErr = ref('')
      const signupPass = ref(''), signupName = ref(''), signupPhone = ref(''), signupReferral = ref('')
      const signupPassErr = ref(''), signupNameErr = ref(''), signupPhoneErr = ref('')
      function handleSignupEmail() {
        signupEmailErr.value = ''
        if (!signupEmail.value) { signupEmailErr.value = 'Emailnya belum diisi'; return }
        if (!signupEmail.value.includes('@')) { signupEmailErr.value = 'Emailnya belum benar, contohnya: nama@gmail.com'; return }
        page.value = 'signup-email'
      }
      function handleRegister() {
        signupPassErr.value = signupNameErr.value = signupPhoneErr.value = ''
        if (page.value === 'signup-email') {
          if (!signupPass.value) signupPassErr.value = 'Passwordnya belum diisi'
          else if (signupPass.value.length < 8) signupPassErr.value = 'Password minimal 8 karakter ya'
        }
        if (!signupName.value) signupNameErr.value = 'Nama lengkapnya belum diisi'
        if (!signupPhone.value) signupPhoneErr.value = 'Nomor HP-nya belum diisi'
        if (signupPassErr.value || signupNameErr.value || signupPhoneErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }

      function go(p: Page) { page.value = p; showSuccess.value = false; loading.value = false }

      const successTitle = computed(() => ({
        login: 'Berhasil masuk!',
        forgot: 'Udah kita kirim!',
        reset: 'Beres!',
        signup: 'Hore, akunmu jadi!',
        'signup-email': 'Hore, akunmu jadi!',
        'signup-google': 'Hore, akunmu jadi!',
      })[page.value])
      const successBtn = computed(() => ({
        login: 'Lanjut atur undangan',
        forgot: 'Oke, siap!',
        reset: 'Masuk sekarang',
        signup: 'Mulai sekarang',
        'signup-email': 'Mulai sekarang',
        'signup-google': 'Mulai sekarang',
      })[page.value])

      return {
        page, tagline, loading, showSuccess,
        loginEmail, loginPass, loginEmailErr, loginPassErr, handleLogin,
        forgotEmail, forgotEmailErr, countdown, forgotSent, handleForgot,
        newPass, confirmPass, newPassErr, confirmErr, handleReset,
        signupEmail, signupEmailErr, signupPass, signupName, signupPhone, signupReferral,
        signupPassErr, signupNameErr, signupPhoneErr, handleSignupEmail, handleRegister,
        successTitle, successBtn, go, GoogleSVG, RiArrowLeftSLine,
      }
    },
    template: `
      <div style="${GRID}">

        <div style="${LEFT}">
          <div style="position:relative;z-index:2;display:flex;justify-content:center;">
            <img src="/abadikan-wordmark.svg" height="22" alt="abadikan.id" />
          </div>
          <div style="${DECOR}">
            <img src="/abadikan-decor.svg" alt="" style="width:100%;display:block;opacity:0.6;" />
          </div>
          <p style="${TAGLINE}" v-html="tagline"></p>
        </div>

        <div style="${RIGHT}">
          <div style="${FORM}">

            <!-- LOGIN -->
            <template v-if="page === 'login'">
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">Lanjut ngurus undanganmu, yuk</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">Masuk dulu, banyak yang mau disiapkan.</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleLogin">
                <Input v-model="loginEmail" type="email" label="Email" required placeholder="emailkamu@gmail.com" :error="loginEmailErr" @update:modelValue="loginEmailErr = ''">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="loginPass" type="password" label="Password" required placeholder="••••••••" :error="loginPassErr" @update:modelValue="loginPassErr = ''">
                  <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                  <template #label-trailing>
                    <a href="#" style="font-size:12px;color:var(--color-text-secondary);text-decoration:none;" @click.prevent="go('forgot')">Lupa password?</a>
                  </template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:0.25rem;">Masuk</Button>
              </form>
              <div style="margin:1rem 0;"><Divider label="atau" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                Masuk dengan Google
              </Button>
              <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
                Belum punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('signup')">Daftar sekarang</a>
              </p>
            </template>

            <!-- FORGOT PASSWORD -->
            <template v-else-if="page === 'forgot'">
              <Button variant="link-neutral" size="sm" style="${BACK}" @click.prevent="go('login')" :leading-icon="RiArrowLeftSLine">Balik</Button>
              <div style="margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">Tenang, kita beresin bareng</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">Masukin emailmu. Kita kirimin link resetnya ke sana.</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleForgot">
                <Input v-model="forgotEmail" type="email" label="Email" required placeholder="emailkamu@gmail.com" :error="forgotEmailErr" @update:modelValue="forgotEmailErr = ''">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" :disabled="forgotSent && countdown > 0" style="${BTN}">
                  {{ !forgotSent ? 'Kirim link reset' : countdown > 0 ? 'Kirim ulang (' + countdown + ')' : 'Kirim ulang' }}
                </Button>
              </form>
              <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
                Udah ingat passwordnya? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('login')">Masuk</a>
              </p>
            </template>

            <!-- RESET PASSWORD -->
            <template v-else-if="page === 'reset'">
              <div style="margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">Bikin password baru, yuk</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">Tinggal ini, terus bisa lanjut atur undanganmu.</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleReset">
                <Input v-model="newPass" type="password" label="Password baru" required placeholder="Masukan password baru" :error="newPassErr" @update:modelValue="newPassErr = ''">
                  <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="confirmPass" type="password" label="Ulangi password" required placeholder="Ulangi password" :error="confirmErr" @update:modelValue="confirmErr = ''">
                  <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:0.25rem;">Simpan</Button>
              </form>
            </template>

            <!-- SIGNUP Step 0 -->
            <template v-else-if="page === 'signup'">
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">Mulai dari sini, yuk</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">Daftar dulu biar momenmu bisa kita abadikan bareng.</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleSignupEmail">
                <Input v-model="signupEmail" type="email" label="Email" required placeholder="emailkamu@gmail.com" :error="signupEmailErr" @update:modelValue="signupEmailErr = ''">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <p style="${DISCLAIMER}">
                  Dengan daftar, kamu setuju sama <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a> dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> kita. Data kamu aman, gak akan kita bagikan ke siapapun.
                </p>
                <Button type="submit" variant="default" full-width size="md" style="${BTN}">Lanjut</Button>
              </form>
              <div style="margin:1rem 0;"><Divider label="atau" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}" @click="go('signup-google')">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                Daftar dengan Google
              </Button>
              <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
                Udah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('login')">Masuk</a>
              </p>
            </template>

            <!-- SIGNUP Step 1a: Email -->
            <template v-else-if="page === 'signup-email'">
              <Button variant="link-neutral" size="sm" style="${BACK}" @click.prevent="go('signup')" :leading-icon="RiArrowLeftSLine">Balik</Button>
              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">Hampir jadi nih</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">Isi beberapa info dulu, bentar lagi selesai.</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleRegister">
                <Input :modelValue="signupEmail" label="Email" type="email" :disabled="true">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <div style="display:flex;flex-direction:column;gap:0.25rem;">
                  <Input v-model="signupPass" type="password" label="Buat password" required placeholder="Masukan password" :error="signupPassErr" @update:modelValue="signupPassErr = ''">
                    <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                  </Input>
                  <p style="${HELPER}">Minimal 8 karakter</p>
                </div>
                <Input v-model="signupName" label="Nama lengkap" required placeholder="Masukan nama kamu" :error="signupNameErr" @update:modelValue="signupNameErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupPhone" type="tel" label="Nomor HP" required placeholder="Masukan no. HP kamu" :error="signupPhoneErr" @update:modelValue="signupPhoneErr = ''">
                  <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupReferral" label="Ada kode dari teman? (Opsional)" placeholder="Masukan kode referral">
                  <template #leading><RiGiftLine style="width:16px;height:16px;" /></template>
                </Input>
                <p style="${DISCLAIMER}margin-top:0.25rem;">
                  Dengan daftar, kamu setuju sama <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a> dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> kita. Data kamu aman, gak akan kita bagikan ke siapapun.
                </p>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:2px;">Buat akun</Button>
              </form>
              <div style="margin:0.75rem 0;"><Divider label="atau" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}" @click="go('signup-google')">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                Daftar dengan Google
              </Button>
              <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
                Udah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('login')">Masuk</a>
              </p>
            </template>

            <!-- SIGNUP Step 1b: Google -->
            <template v-else-if="page === 'signup-google'">
              <Button variant="link-neutral" size="sm" style="${BACK}" @click.prevent="go('signup')" :leading-icon="RiArrowLeftSLine">Balik</Button>

              <div style="text-align:center;margin-bottom:1.25rem;">
                <h1 style="font-size:24px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 6px;">Hampir jadi nih</h1>
                <p style="font-size:16px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;">Isi beberapa info dulu, bentar lagi selesai.</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.75rem;" @submit.prevent="handleRegister">
                <Input v-model="signupName" label="Nama lengkap" required placeholder="Masukan nama kamu" :error="signupNameErr" @update:modelValue="signupNameErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupPhone" type="tel" label="Nomor HP" required placeholder="Masukan no. HP kamu" :error="signupPhoneErr" @update:modelValue="signupPhoneErr = ''">
                  <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupReferral" label="Ada kode dari teman? (Opsional)" placeholder="Masukan kode referral">
                  <template #leading><RiGiftLine style="width:16px;height:16px;" /></template>
                </Input>
                <p style="${DISCLAIMER}margin-top:0.25rem;">
                  Dengan daftar, kamu setuju sama <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a> dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> kita. Data kamu aman, gak akan kita bagikan ke siapapun.
                </p>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:2px;">Buat akun</Button>
              </form>
              <p style="text-align:center;font-size:14px;color:var(--color-text-secondary);margin-top:1rem;">
                Udah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('login')">Masuk</a>
              </p>
            </template>

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
                <template v-if="page === 'login'">Selamat datang kembali. Undanganmu udah nunggu.</template>
                <template v-else-if="page === 'forgot'">Cek emailmu ya. Udah kita kirim ke <strong style="color:var(--color-text-heading);font-weight:600;">{{ forgotEmail }}</strong>. Belum masuk? Cek folder Spam juga.</template>
                <template v-else-if="page === 'reset'">Password barumu udah aktif. Sekarang tinggal masuk dan lanjut atur undanganmu.</template>
                <template v-else>Selamat datang di Abadikan. Yuk mulai bikin undangan yang bikin tamu terkesan.</template>
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
