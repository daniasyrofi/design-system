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
} from '@remixicon/vue'

const canvas = () => ({
  template: `
    <div style="min-height:100vh;display:flex;background-color:#ffffff;">
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

// Layout constants
const GRID = 'display:grid;grid-template-columns:320px 1fr;min-height:100vh;width:100%;align-items:start;'
const LEFT = `background-color:${RED};display:flex;flex-direction:column;height:100vh;padding:32px 28px;position:sticky;top:0;overflow:hidden;box-sizing:border-box;`
const DECOR = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-44%);width:140%;pointer-events:none;z-index:1;'
const TAGLINE = 'font-size:18px;font-weight:700;line-height:1.4;color:white;position:relative;z-index:2;margin:auto 0 0;text-align:center;padding-bottom:8px;'
// Right panel uses white background
const RIGHT = 'display:flex;align-items:center;justify-content:center;padding:56px 40px;background-color:#ffffff;min-height:100vh;box-sizing:border-box;'
// --radius-2xl:20px mirrors Input.stories.ts decorator so inputs get calc(20-9)=11px radius
const FORM = 'width:100%;max-width:400px;--radius-2xl:20px;'
// Button styles mirror getButtonStyle() from Button.stories.ts
const BTN = 'border-radius:999px;gap:4px;padding-inline-start:20px;padding-inline-end:20px;'
const BTN_ICON = 'border-radius:999px;gap:4px;padding-inline-start:12px;padding-inline-end:16px;'

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
        if (!email.value) emailErr.value = 'Email tidak boleh kosong'
        if (!password.value) passErr.value = 'Password tidak boleh kosong'
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
            <div style="text-align:center;margin-bottom:28px;">
              <h1 style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 8px;">Selamat Datang di Abadikan</h1>
              <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.55;margin:0;">Masuk dulu biar bisa lanjut atur undangan digital &amp; persiapan nikahmu dengan tenang.</p>
            </div>

            <form style="display:flex;flex-direction:column;gap:14px;" @submit.prevent="handleLogin">
              <Input v-model="email" type="email" label="Email" required placeholder="kamu@contoh.com" :error="emailErr" @update:modelValue="emailErr = ''">
                <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
              </Input>
              <div style="display:flex;flex-direction:column;gap:2px;">
                <Input v-model="password" type="password" label="Password" required placeholder="••••••••" :error="passErr" @update:modelValue="passErr = ''">
                  <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                </Input>
                <div style="text-align:right;margin-top:4px;">
                  <a href="#" style="font-size:12px;color:var(--color-text-secondary);text-decoration:none;">Lupa kata sandi?</a>
                </div>
              </div>
              <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:4px;">Login</Button>
            </form>

            <div style="margin:20px 0;"><Divider label="atau" /></div>

            <Button variant="outline" full-width size="md" style="${BTN_ICON}">
              <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
              Login dengan Google
            </Button>

            <p style="text-align:center;font-size:13px;color:var(--color-text-secondary);margin-top:20px;">
              Belum punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">Daftar Sekarang</a>
            </p>
          </div>
        </div>

        <Modal v-model="showSuccess" size="sm" :closable="false" :close-on-overlay="false">
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px 0 4px;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(208,0,62,0.08);display:flex;align-items:center;justify-content:center;">
              <div style="width:46px;height:46px;border-radius:50%;background:rgba(208,0,62,0.13);display:flex;align-items:center;justify-content:center;">
                <RiCheckboxCircleFill style="color:#D0003E;" :size="28" />
              </div>
            </div>
            <div>
              <h2 style="font-size:18px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">Berhasil Masuk!</h2>
              <p style="font-size:13px;color:var(--color-text-secondary);margin:0;line-height:1.55;">Selamat datang kembali. Kamu sudah bisa lanjut atur undangan digitalmu.</p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:4px;" @click="showSuccess = false">Lanjut ke Dashboard</Button>
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
        if (!email.value) { emailErr.value = 'Email wajib diisi'; return }
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
      return { email, emailErr, loading, countdown, sent, showSuccess, handleSend }
    },
    template: `
      <div style="${GRID}">
        ${leftPanel('Tenang, akunmu tetap aman.<br/>Kamu hanya perlu mengatur<br/>ulang dan bisa melanjutkan<br/>menyiapkan undangan.')}

        <div style="${RIGHT}">
          <div style="${FORM}">
            <a href="#" style="font-size:20px;color:var(--color-text-heading);text-decoration:none;display:inline-block;margin-bottom:20px;">‹</a>
            <div style="margin-bottom:28px;">
              <h1 style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 8px;">Lupa Password?</h1>
              <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.55;margin:0;">Masukin email kamu, biar kita kirim link reset ke inbox.</p>
            </div>

            <form style="display:flex;flex-direction:column;gap:14px;" @submit.prevent="handleSend">
              <Input v-model="email" type="email" label="Email" required placeholder="Masukkan email kamu" :error="emailErr" @update:modelValue="emailErr = ''">
                <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
              </Input>
              <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}">Kirim Tautan</Button>
              <Button v-if="sent" type="button" variant="outline" full-width size="md" :disabled="countdown > 0" style="${BTN}">
                {{ countdown > 0 ? 'Kirim Ulang (' + countdown + ')' : 'Kirim Ulang' }}
              </Button>
            </form>

            <p style="text-align:center;font-size:13px;color:var(--color-text-secondary);margin-top:20px;">
              Sudah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">Masuk</a>
            </p>
          </div>
        </div>

        <Modal v-model="showSuccess" size="sm" :closable="false" :close-on-overlay="true">
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px 0 4px;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(208,0,62,0.08);display:flex;align-items:center;justify-content:center;">
              <div style="width:46px;height:46px;border-radius:50%;background:rgba(208,0,62,0.13);display:flex;align-items:center;justify-content:center;">
                <RiCheckboxCircleFill style="color:#D0003E;" :size="28" />
              </div>
            </div>
            <div>
              <h2 style="font-size:18px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">Email Terkirim!</h2>
              <p style="font-size:13px;color:var(--color-text-secondary);margin:0;line-height:1.55;">
                Cek inbox kamu. Link reset password sudah dikirim ke <strong style="color:var(--color-text-heading);font-weight:600;">{{ email }}</strong>.
              </p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:4px;" @click="showSuccess = false">Oke, Mengerti</Button>
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
        if (!newPass.value) newPassErr.value = 'Password wajib diisi'
        else if (newPass.value.length < 8) newPassErr.value = 'Minimal 8 karakter'
        if (!confirmPass.value) confirmErr.value = 'Konfirmasi wajib diisi'
        else if (newPass.value && confirmPass.value !== newPass.value) confirmErr.value = 'Password tidak cocok'
        if (newPassErr.value || confirmErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }
      return { newPass, confirmPass, newPassErr, confirmErr, loading, showSuccess, handleReset }
    },
    template: `
      <div style="${GRID}">
        ${leftPanel('Buat password baru<br/>sekarang, biar akunmu tetap<br/>aman dan lanjutin undangan')}

        <div style="${RIGHT}">
          <div style="${FORM}">
            <div style="margin-bottom:28px;">
              <h1 style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 8px;">Atur Ulang Password</h1>
              <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.55;margin:0;">Buat password baru untuk jaga akunmu tetap aman dan lanjut atur undangan dengan tenang.</p>
            </div>

            <form style="display:flex;flex-direction:column;gap:14px;" @submit.prevent="handleReset">
              <Input v-model="newPass" type="password" label="Password Baru" required placeholder="Masukan Password Baru" :error="newPassErr" @update:modelValue="newPassErr = ''">
                <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
              </Input>
              <Input v-model="confirmPass" type="password" label="Konfirmasi Password" required placeholder="Masukan Konfirmasi Password" :error="confirmErr" @update:modelValue="confirmErr = ''">
                <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
              </Input>
              <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:4px;">Simpan Password</Button>
            </form>
          </div>
        </div>

        <Modal v-model="showSuccess" size="sm" :closable="false" :close-on-overlay="false">
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px 0 4px;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(208,0,62,0.08);display:flex;align-items:center;justify-content:center;">
              <div style="width:46px;height:46px;border-radius:50%;background:rgba(208,0,62,0.13);display:flex;align-items:center;justify-content:center;">
                <RiCheckboxCircleFill style="color:#D0003E;" :size="28" />
              </div>
            </div>
            <div>
              <h2 style="font-size:18px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">Password Berhasil Diubah!</h2>
              <p style="font-size:13px;color:var(--color-text-secondary);margin:0;line-height:1.55;">Password barumu sudah aktif. Sekarang kamu bisa masuk dan lanjut atur undanganmu.</p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:4px;" @click="showSuccess = false">Masuk Sekarang</Button>
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
        if (!email.value) { emailErr.value = 'Email wajib diisi'; return }
        if (!email.value.includes('@')) { emailErr.value = 'Format email tidak valid'; return }
        step.value = 'form-email'
      }
      function handleRegister() {
        passErr.value = nameErr.value = phoneErr.value = ''
        if (step.value === 'form-email' && !password.value) passErr.value = 'Password wajib diisi'
        if (!name.value) nameErr.value = 'Nama lengkap wajib diisi'
        if (!phone.value) phoneErr.value = 'No. handphone wajib diisi'
        if (passErr.value || nameErr.value || phoneErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }
      return { step, email, emailErr, password, name, phone, referral, passErr, nameErr, phoneErr, loading, showSuccess, handleEmailNext, handleRegister, GoogleSVG }
    },
    template: `
      <div style="${GRID}">
        ${leftPanel('Mulai ceritamu di Abadikan.<br/>Undangan digital yang bikin<br/>kisah cintamu berkesan')}

        <div style="${RIGHT}">
          <div style="${FORM}">
            <div style="text-align:center;margin-bottom:28px;">
              <h1 style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 8px;">Mulai Ceritamu di Abadikan</h1>
              <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.55;margin:0;">Daftar sekarang, biar momen ceritamu bisa diabadikan dengan indah.</p>
            </div>

            <template v-if="step === 'email'">
              <form style="display:flex;flex-direction:column;gap:14px;" @submit.prevent="handleEmailNext">
                <Input v-model="email" type="email" label="Email" required placeholder="Masukan email kamu" :error="emailErr" @update:modelValue="emailErr = ''">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <p style="font-size:11px;color:var(--color-text-secondary);margin:0;line-height:1.55;text-align:center;">
                  Dengan melanjutkan, Anda menyetujui
                  <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a>
                  dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> Abadikan
                </p>
                <Button type="submit" variant="default" full-width size="md" style="${BTN}">Selanjutnya</Button>
              </form>
              <div style="margin:20px 0;"><Divider label="atau" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}" @click="step = 'form-google'">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                Daftar dengan Google
              </Button>
              <p style="text-align:center;font-size:13px;color:var(--color-text-secondary);margin-top:20px;">
                Sudah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">Masuk</a>
              </p>
            </template>

            <template v-else-if="step === 'form-email'">
              <a href="#" style="font-size:20px;color:var(--color-text-heading);text-decoration:none;display:inline-block;margin-bottom:20px;" @click.prevent="step = 'email'">‹</a>
              <form style="display:flex;flex-direction:column;gap:12px;" @submit.prevent="handleRegister">
                <Input :modelValue="email" label="Email" type="email" :disabled="true">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="password" type="password" label="Password" required placeholder="Masukan Password" :error="passErr" @update:modelValue="passErr = ''">
                  <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="name" label="Nama Lengkap" required placeholder="Masukan nama kamu" :error="nameErr" @update:modelValue="nameErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="phone" type="tel" label="No Handphone" required placeholder="Masukan no. handphone kamu" :error="phoneErr" @update:modelValue="phoneErr = ''">
                  <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="referral" label="Kode Referral" placeholder="Masukan kode referral (opsional)">
                  <template #leading><RiGiftLine style="width:16px;height:16px;" /></template>
                </Input>
                <p style="font-size:11px;color:var(--color-text-secondary);margin:4px 0 0;line-height:1.55;text-align:center;">
                  Dengan mendaftar, Anda menyetujui
                  <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a>
                  dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> Abadikan
                </p>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:2px;">Daftar Sekarang</Button>
              </form>
              <div style="margin:16px 0;"><Divider label="atau" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}" @click="step = 'form-google'">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                Daftar dengan Google
              </Button>
              <p style="text-align:center;font-size:13px;color:var(--color-text-secondary);margin-top:16px;">
                Sudah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">Masuk</a>
              </p>
            </template>

            <template v-else-if="step === 'form-google'">
              <a href="#" style="font-size:20px;color:var(--color-text-heading);text-decoration:none;display:inline-block;margin-bottom:20px;" @click.prevent="step = 'email'">‹</a>
              <form style="display:flex;flex-direction:column;gap:12px;" @submit.prevent="handleRegister">
                <Input v-model="name" label="Nama Lengkap" required placeholder="Masukan nama kamu" :error="nameErr" @update:modelValue="nameErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="phone" type="tel" label="No Handphone" required placeholder="Masukan no. handphone kamu" :error="phoneErr" @update:modelValue="phoneErr = ''">
                  <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="referral" label="Kode Referral" placeholder="Masukan kode referral (opsional)">
                  <template #leading><RiGiftLine style="width:16px;height:16px;" /></template>
                </Input>
                <p style="font-size:11px;color:var(--color-text-secondary);margin:4px 0 0;line-height:1.55;text-align:center;">
                  Dengan mendaftar, Anda menyetujui
                  <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a>
                  dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> Abadikan
                </p>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:2px;">Daftar Sekarang</Button>
              </form>
              <p style="text-align:center;font-size:13px;color:var(--color-text-secondary);margin-top:16px;">
                Sudah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;">Masuk</a>
              </p>
            </template>
          </div>
        </div>

        <Modal v-model="showSuccess" size="sm" :closable="false" :close-on-overlay="false">
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px 0 4px;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(208,0,62,0.08);display:flex;align-items:center;justify-content:center;">
              <div style="width:46px;height:46px;border-radius:50%;background:rgba(208,0,62,0.13);display:flex;align-items:center;justify-content:center;">
                <RiCheckboxCircleFill style="color:#D0003E;" :size="28" />
              </div>
            </div>
            <div>
              <h2 style="font-size:18px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">Akun Berhasil Dibuat!</h2>
              <p style="font-size:13px;color:var(--color-text-secondary);margin:0;line-height:1.55;">Selamat datang di Abadikan! Yuk mulai atur undangan digitalmu sekarang.</p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:4px;" @click="showSuccess = false">Mulai Sekarang</Button>
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
        forgot: 'Tenang, akunmu tetap aman.<br/>Kamu hanya perlu mengatur<br/>ulang dan bisa melanjutkan<br/>menyiapkan undangan.',
        reset: 'Buat password baru<br/>sekarang, biar akunmu tetap<br/>aman dan lanjutin undangan',
        signup: 'Mulai ceritamu di Abadikan.<br/>Undangan digital yang bikin<br/>kisah cintamu berkesan',
        'signup-email': 'Mulai ceritamu di Abadikan.<br/>Undangan digital yang bikin<br/>kisah cintamu berkesan',
        'signup-google': 'Mulai ceritamu di Abadikan.<br/>Undangan digital yang bikin<br/>kisah cintamu berkesan',
      }
      const tagline = computed(() => taglines[page.value])

      const loading = ref(false), showSuccess = ref(false)

      const loginEmail = ref(''), loginPass = ref(''), loginEmailErr = ref(''), loginPassErr = ref('')
      function handleLogin() {
        loginEmailErr.value = loginPassErr.value = ''
        if (!loginEmail.value) loginEmailErr.value = 'Email tidak boleh kosong'
        if (!loginPass.value) loginPassErr.value = 'Password tidak boleh kosong'
        if (loginEmailErr.value || loginPassErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }

      const forgotEmail = ref(''), forgotEmailErr = ref(''), countdown = ref(0)
      const forgotSent = ref(false)
      let timer: ReturnType<typeof setInterval> | null = null
      function handleForgot() {
        forgotEmailErr.value = ''
        if (!forgotEmail.value) { forgotEmailErr.value = 'Email wajib diisi'; return }
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
        if (!newPass.value) newPassErr.value = 'Password wajib diisi'
        else if (newPass.value.length < 8) newPassErr.value = 'Minimal 8 karakter'
        if (!confirmPass.value) confirmErr.value = 'Konfirmasi wajib diisi'
        else if (newPass.value && confirmPass.value !== newPass.value) confirmErr.value = 'Password tidak cocok'
        if (newPassErr.value || confirmErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }

      const signupEmail = ref(''), signupEmailErr = ref('')
      const signupPass = ref(''), signupName = ref(''), signupPhone = ref(''), signupReferral = ref('')
      const signupPassErr = ref(''), signupNameErr = ref(''), signupPhoneErr = ref('')
      function handleSignupEmail() {
        signupEmailErr.value = ''
        if (!signupEmail.value) { signupEmailErr.value = 'Email wajib diisi'; return }
        if (!signupEmail.value.includes('@')) { signupEmailErr.value = 'Format email tidak valid'; return }
        page.value = 'signup-email'
      }
      function handleRegister() {
        signupPassErr.value = signupNameErr.value = signupPhoneErr.value = ''
        if (page.value === 'signup-email' && !signupPass.value) signupPassErr.value = 'Password wajib diisi'
        if (!signupName.value) signupNameErr.value = 'Nama lengkap wajib diisi'
        if (!signupPhone.value) signupPhoneErr.value = 'No. handphone wajib diisi'
        if (signupPassErr.value || signupNameErr.value || signupPhoneErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false; showSuccess.value = true }, 1500)
      }

      function go(p: Page) { page.value = p; showSuccess.value = false; loading.value = false }

      const successTitle = computed(() => ({
        login: 'Berhasil Masuk!',
        forgot: 'Email Terkirim!',
        reset: 'Password Berhasil Diubah!',
        signup: 'Akun Berhasil Dibuat!',
        'signup-email': 'Akun Berhasil Dibuat!',
        'signup-google': 'Akun Berhasil Dibuat!',
      })[page.value])
      const successBtn = computed(() => ({
        login: 'Lanjut ke Dashboard',
        forgot: 'Oke, Mengerti',
        reset: 'Masuk Sekarang',
        signup: 'Mulai Sekarang',
        'signup-email': 'Mulai Sekarang',
        'signup-google': 'Mulai Sekarang',
      })[page.value])

      return {
        page, tagline, loading, showSuccess,
        loginEmail, loginPass, loginEmailErr, loginPassErr, handleLogin,
        forgotEmail, forgotEmailErr, countdown, forgotSent, handleForgot,
        newPass, confirmPass, newPassErr, confirmErr, handleReset,
        signupEmail, signupEmailErr, signupPass, signupName, signupPhone, signupReferral,
        signupPassErr, signupNameErr, signupPhoneErr, handleSignupEmail, handleRegister,
        successTitle, successBtn, go, GoogleSVG,
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
              <div style="text-align:center;margin-bottom:28px;">
                <h1 style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 8px;">Selamat Datang di Abadikan</h1>
                <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.55;margin:0;">Masuk dulu biar bisa lanjut atur undangan digital &amp; persiapan nikahmu dengan tenang.</p>
              </div>
              <form style="display:flex;flex-direction:column;gap:14px;" @submit.prevent="handleLogin">
                <Input v-model="loginEmail" type="email" label="Email" required placeholder="kamu@contoh.com" :error="loginEmailErr" @update:modelValue="loginEmailErr = ''">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <div style="display:flex;flex-direction:column;gap:2px;">
                  <Input v-model="loginPass" type="password" label="Password" required placeholder="••••••••" :error="loginPassErr" @update:modelValue="loginPassErr = ''">
                    <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                  </Input>
                  <div style="text-align:right;margin-top:4px;">
                    <a href="#" style="font-size:12px;color:var(--color-text-secondary);text-decoration:none;" @click.prevent="go('forgot')">Lupa kata sandi?</a>
                  </div>
                </div>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:4px;">Login</Button>
              </form>
              <div style="margin:20px 0;"><Divider label="atau" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                Login dengan Google
              </Button>
              <p style="text-align:center;font-size:13px;color:var(--color-text-secondary);margin-top:20px;">
                Belum punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('signup')">Daftar Sekarang</a>
              </p>
            </template>

            <!-- FORGOT PASSWORD -->
            <template v-else-if="page === 'forgot'">
              <a href="#" style="font-size:20px;color:var(--color-text-heading);text-decoration:none;display:inline-block;margin-bottom:20px;" @click.prevent="go('login')">‹</a>
              <div style="margin-bottom:28px;">
                <h1 style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 8px;">Lupa Password?</h1>
                <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.55;margin:0;">Masukin email kamu, biar kita kirim link reset ke inbox.</p>
              </div>
              <form style="display:flex;flex-direction:column;gap:14px;" @submit.prevent="handleForgot">
                <Input v-model="forgotEmail" type="email" label="Email" required placeholder="Masukkan email kamu" :error="forgotEmailErr" @update:modelValue="forgotEmailErr = ''">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}">Kirim Tautan</Button>
                <Button v-if="forgotSent" type="button" variant="outline" full-width size="md" :disabled="countdown > 0" style="${BTN}">
                  {{ countdown > 0 ? 'Kirim Ulang (' + countdown + ')' : 'Kirim Ulang' }}
                </Button>
              </form>
              <p style="text-align:center;font-size:13px;color:var(--color-text-secondary);margin-top:20px;">
                Sudah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('login')">Masuk</a>
              </p>
            </template>

            <!-- RESET PASSWORD -->
            <template v-else-if="page === 'reset'">
              <div style="margin-bottom:28px;">
                <h1 style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 8px;">Atur Ulang Password</h1>
                <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.55;margin:0;">Buat password baru untuk jaga akunmu tetap aman.</p>
              </div>
              <form style="display:flex;flex-direction:column;gap:14px;" @submit.prevent="handleReset">
                <Input v-model="newPass" type="password" label="Password Baru" required placeholder="Masukan Password Baru" :error="newPassErr" @update:modelValue="newPassErr = ''">
                  <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="confirmPass" type="password" label="Konfirmasi Password" required placeholder="Masukan Konfirmasi Password" :error="confirmErr" @update:modelValue="confirmErr = ''">
                  <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                </Input>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:4px;">Simpan Password</Button>
              </form>
            </template>

            <!-- SIGNUP Step 0 -->
            <template v-else-if="page === 'signup'">
              <div style="text-align:center;margin-bottom:28px;">
                <h1 style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 8px;">Mulai Ceritamu di Abadikan</h1>
                <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.55;margin:0;">Daftar sekarang, biar momen ceritamu bisa diabadikan dengan indah.</p>
              </div>
              <form style="display:flex;flex-direction:column;gap:14px;" @submit.prevent="handleSignupEmail">
                <Input v-model="signupEmail" type="email" label="Email" required placeholder="Masukan email kamu" :error="signupEmailErr" @update:modelValue="signupEmailErr = ''">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <p style="font-size:11px;color:var(--color-text-secondary);margin:0;line-height:1.55;text-align:center;">
                  Dengan melanjutkan, Anda menyetujui
                  <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a>
                  dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> Abadikan
                </p>
                <Button type="submit" variant="default" full-width size="md" style="${BTN}">Selanjutnya</Button>
              </form>
              <div style="margin:20px 0;"><Divider label="atau" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}" @click="go('signup-google')">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                Daftar dengan Google
              </Button>
              <p style="text-align:center;font-size:13px;color:var(--color-text-secondary);margin-top:20px;">
                Sudah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('login')">Masuk</a>
              </p>
            </template>

            <!-- SIGNUP Step 1a: Email -->
            <template v-else-if="page === 'signup-email'">
              <a href="#" style="font-size:20px;color:var(--color-text-heading);text-decoration:none;display:inline-block;margin-bottom:20px;" @click.prevent="go('signup')">‹</a>
              <div style="text-align:center;margin-bottom:24px;">
                <h1 style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 8px;">Mulai Ceritamu di Abadikan</h1>
                <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.55;margin:0;">Daftar sekarang, biar momen ceritamu bisa diabadikan dengan indah.</p>
              </div>
              <form style="display:flex;flex-direction:column;gap:12px;" @submit.prevent="handleRegister">
                <Input :modelValue="signupEmail" label="Email" type="email" :disabled="true">
                  <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupPass" type="password" label="Password" required placeholder="Masukan Password" :error="signupPassErr" @update:modelValue="signupPassErr = ''">
                  <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupName" label="Nama Lengkap" required placeholder="Masukan nama kamu" :error="signupNameErr" @update:modelValue="signupNameErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupPhone" type="tel" label="No Handphone" required placeholder="Masukan no. handphone kamu" :error="signupPhoneErr" @update:modelValue="signupPhoneErr = ''">
                  <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupReferral" label="Kode Referral" placeholder="Masukan kode referral (opsional)">
                  <template #leading><RiGiftLine style="width:16px;height:16px;" /></template>
                </Input>
                <p style="font-size:11px;color:var(--color-text-secondary);margin:4px 0 0;line-height:1.55;text-align:center;">
                  Dengan mendaftar, Anda menyetujui
                  <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a>
                  dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> Abadikan
                </p>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:2px;">Daftar Sekarang</Button>
              </form>
              <div style="margin:16px 0;"><Divider label="atau" /></div>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}" @click="go('signup-google')">
                <template #leading><span v-html="GoogleSVG" style="display:flex;align-items:center;" /></template>
                Daftar dengan Google
              </Button>
              <p style="text-align:center;font-size:13px;color:var(--color-text-secondary);margin-top:16px;">
                Sudah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('login')">Masuk</a>
              </p>
            </template>

            <!-- SIGNUP Step 1b: Google -->
            <template v-else-if="page === 'signup-google'">
              <a href="#" style="font-size:20px;color:var(--color-text-heading);text-decoration:none;display:inline-block;margin-bottom:20px;" @click.prevent="go('signup')">‹</a>
              <div style="text-align:center;margin-bottom:24px;">
                <h1 style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 8px;">Mulai Ceritamu di Abadikan</h1>
                <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.55;margin:0;">Daftar sekarang, biar momen ceritamu bisa diabadikan dengan indah.</p>
              </div>
              <form style="display:flex;flex-direction:column;gap:12px;" @submit.prevent="handleRegister">
                <Input v-model="signupName" label="Nama Lengkap" required placeholder="Masukan nama kamu" :error="signupNameErr" @update:modelValue="signupNameErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupPhone" type="tel" label="No Handphone" required placeholder="Masukan no. handphone kamu" :error="signupPhoneErr" @update:modelValue="signupPhoneErr = ''">
                  <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="signupReferral" label="Kode Referral" placeholder="Masukan kode referral (opsional)">
                  <template #leading><RiGiftLine style="width:16px;height:16px;" /></template>
                </Input>
                <p style="font-size:11px;color:var(--color-text-secondary);margin:4px 0 0;line-height:1.55;text-align:center;">
                  Dengan mendaftar, Anda menyetujui
                  <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Ketentuan Layanan</a>
                  dan <a href="#" style="color:${RED};text-decoration:none;font-weight:500;">Kebijakan Privasi</a> Abadikan
                </p>
                <Button type="submit" variant="default" full-width size="md" :loading="loading" style="${BTN}margin-top:2px;">Daftar Sekarang</Button>
              </form>
              <p style="text-align:center;font-size:13px;color:var(--color-text-secondary);margin-top:16px;">
                Sudah punya akun? <a href="#" style="color:${RED};font-weight:600;text-decoration:none;" @click.prevent="go('login')">Masuk</a>
              </p>
            </template>

          </div>
        </div>

        <!-- SUCCESS MODAL -->
        <Modal v-model="showSuccess" size="sm" :closable="false" :close-on-overlay="false">
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px 0 4px;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(208,0,62,0.08);display:flex;align-items:center;justify-content:center;">
              <div style="width:46px;height:46px;border-radius:50%;background:rgba(208,0,62,0.13);display:flex;align-items:center;justify-content:center;">
                <RiCheckboxCircleFill style="color:#D0003E;" :size="28" />
              </div>
            </div>
            <div>
              <h2 style="font-size:18px;font-weight:700;color:var(--color-text-heading);margin:0 0 6px;letter-spacing:-0.3px;">{{ successTitle }}</h2>
              <p style="font-size:13px;color:var(--color-text-secondary);margin:0;line-height:1.55;">
                <template v-if="page === 'login'">Selamat datang kembali. Kamu sudah bisa lanjut atur undangan digitalmu.</template>
                <template v-else-if="page === 'forgot'">Cek inbox kamu. Link reset sudah dikirim ke <strong style="color:var(--color-text-heading);font-weight:600;">{{ forgotEmail }}</strong>.</template>
                <template v-else-if="page === 'reset'">Password barumu sudah aktif. Kamu bisa masuk dan lanjut atur undanganmu.</template>
                <template v-else>Selamat datang di Abadikan! Yuk mulai atur undangan digitalmu sekarang.</template>
              </p>
            </div>
            <Button variant="default" full-width size="md" style="${BTN}margin-top:4px;"
              @click="page === 'reset' ? go('login') : (showSuccess = false)">
              {{ successBtn }}
            </Button>
          </div>
        </Modal>

      </div>
    `,
  }),
}
