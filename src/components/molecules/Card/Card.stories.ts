import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, h } from 'vue'
import Card from './Card.vue'
import {
  RiMailSendLine, RiGroupLine, RiEyeLine, RiStarLine,
  RiCalendarEventLine, RiUserSmileLine, RiPieChartLine,
  RiSettings4Line, RiMessage2Line, RiNotificationLine,
  RiCheckLine, RiArrowRightSLine, RiAddLine,
  RiTrendingUpLine,
} from '@remixicon/vue'

// ── Canvas ──────────────────────────────────────────────────────────────────────
const withCanvas = (bg = 'var(--color-bg)') => () => ({
  template: `
    <div style="
      min-height:100vh; display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      padding:48px 32px; gap:32px;
      background-color:${bg};
      background-image:radial-gradient(circle, var(--color-border) 1px, transparent 1px);
      background-size:24px 24px;
    "><story /></div>`,
})

// ── Shared style helpers ────────────────────────────────────────────────────────
const S = {
  overline: `font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);`,
  headline: `font-size:26px;font-weight:700;letter-spacing:-0.02em;color:var(--color-text-heading);line-height:1;`,
  body:     `font-size:13px;line-height:1.6;color:var(--color-text-secondary);`,
  label:    `font-size:12px;font-weight:500;color:var(--color-text-secondary);`,
  meta:     `font-size:11px;color:var(--color-text-tertiary);`,
  divider:  `height:1px;background:var(--color-border-subtle);margin:0;`,
}

// ── Icon box ────────────────────────────────────────────────────────────────────
const IconBox = defineComponent({
  props: { bg: String, color: String, size: { default: 36 } },
  setup(props, { slots }) {
    return () => h('div', {
      style: `
        width:${props.size}px;height:${props.size}px;
        border-radius:var(--radius-md);flex-shrink:0;
        background:${props.bg};color:${props.color};
        display:flex;align-items:center;justify-content:center;
      `,
    }, slots.default?.())
  },
})

// ── Pill badge ──────────────────────────────────────────────────────────────────
const Pill = defineComponent({
  props: { color: String, bg: String, label: String },
  setup(props) {
    return () => h('span', {
      style: `
        display:inline-flex;align-items:center;gap:3px;
        padding:3px 9px;border-radius:var(--radius-full);
        font-size:11px;font-weight:600;letter-spacing:0.03em;
        color:${props.color};background:${props.bg};flex-shrink:0;
      `,
    }, props.label)
  },
})

// ── Meta ────────────────────────────────────────────────────────────────────────
const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [withCanvas()],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant:   { control: 'select', options: ['default', 'outlined', 'elevated', 'flat', 'glass'] },
    padding:   { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    radius:    { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    hoverable: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
  args: { variant: 'default', padding: 'md', radius: 'lg', hoverable: false, clickable: false },
}
export default meta
type Story = StoryObj<typeof Card>

// ══════════════════════════════════════════════════════════════════════════════
// 1 · Default — single metric card
// ══════════════════════════════════════════════════════════════════════════════
export const Default: Story = {
  render: (args) => ({
    components: { Card, IconBox, Pill, RiMailSendLine, RiTrendingUpLine },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args" style="width:300px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;">
          <IconBox bg="var(--color-primary-light)" color="var(--color-primary)" :size="40">
            <RiMailSendLine :size="18" />
          </IconBox>
          <Pill color="var(--color-success)" bg="var(--color-success-light)" label="↑ 12.4%" />
        </div>
        <p style="${S.overline}margin-bottom:4px;">Total Invitations</p>
        <p style="${S.headline}">1,284</p>
        <p style="${S.meta}margin-top:6px;">vs. 1,148 last month</p>
      </Card>
    `,
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 2 · All Variants — same content, four treatments
// ══════════════════════════════════════════════════════════════════════════════
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { Card, IconBox, RiPieChartLine },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start;">
        <Card
          v-for="v in variants" :key="v.name"
          :variant="v.variant"
          style="width:200px"
        >
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <p style="${S.overline}">{{ v.name }}</p>
              <IconBox bg="var(--color-neutral-light)" color="var(--color-text-secondary)" :size="28">
                <RiPieChartLine :size="14" />
              </IconBox>
            </div>
            <div>
              <p style="${S.headline}font-size:22px;">8,942</p>
              <p style="${S.meta}margin-top:4px;">Guest responses</p>
            </div>
            <div style="${S.divider}"></div>
            <p style="${S.body}font-size:12px;">{{ v.desc }}</p>
          </div>
        </Card>
      </div>
    `,
    setup: () => ({
      variants: [
        { name: 'Default',  variant: 'default',  desc: 'Shadow + inset border — standard surface.' },
        { name: 'Outlined', variant: 'outlined', desc: 'Border only, no elevation. Flat & clean.' },
        { name: 'Elevated', variant: 'elevated', desc: 'Deep shadow. Floats above the page.' },
        { name: 'Flat',     variant: 'flat',     desc: 'No border, no shadow. Minimal contrast.' },
      ],
    }),
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 3 · Dashboard stats row
// ══════════════════════════════════════════════════════════════════════════════
export const StatsRow: Story = {
  name: 'Stats Row',
  render: () => ({
    components: {
      Card, IconBox, Pill,
      RiMailSendLine, RiGroupLine, RiEyeLine, RiStarLine,
    },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;max-width:900px;">
        <Card
          v-for="s in stats" :key="s.label"
          style="flex:1;min-width:180px"
        >
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;">
            <IconBox :bg="s.iconBg" :color="s.iconColor" :size="36">
              <component :is="s.icon" :size="16" />
            </IconBox>
            <Pill :color="s.deltaColor" :bg="s.deltaBg" :label="s.delta" />
          </div>
          <p style="${S.headline}">{{ s.value }}</p>
          <p style="${S.overline}margin-top:6px;">{{ s.label }}</p>
        </Card>
      </div>
    `,
    setup: () => ({
      stats: [
        {
          icon: RiMailSendLine, label: 'Invitations',
          value: '1,284', delta: '+8.2%',
          iconBg: 'var(--color-primary-light)', iconColor: 'var(--color-primary)',
          deltaColor: 'var(--color-success)', deltaBg: 'var(--color-success-light)',
        },
        {
          icon: RiGroupLine, label: 'Guest RSVPs',
          value: '8,942', delta: '+24.1%',
          iconBg: 'var(--color-success-light)', iconColor: 'var(--color-success)',
          deltaColor: 'var(--color-success)', deltaBg: 'var(--color-success-light)',
        },
        {
          icon: RiEyeLine, label: 'Page Views',
          value: '42.6k', delta: '+3.8%',
          iconBg: 'var(--color-info-light)', iconColor: 'var(--color-info)',
          deltaColor: 'var(--color-success)', deltaBg: 'var(--color-success-light)',
        },
        {
          icon: RiStarLine, label: 'Avg. Rating',
          value: '4.87', delta: '−0.2',
          iconBg: 'var(--color-warning-light)', iconColor: 'var(--color-warning)',
          deltaColor: 'var(--color-danger)', deltaBg: 'color-mix(in oklch, var(--color-danger) 12%, transparent)',
        },
      ],
    }),
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 4 · With Media — event / invitation cards
// ══════════════════════════════════════════════════════════════════════════════
export const WithMedia: Story = {
  name: 'With Media',
  render: () => ({
    components: { Card, Pill },
    template: `
      <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start;">
        <Card v-for="ev in events" :key="ev.title" style="width:272px">
          <template #media>
            <div :style="\`height:152px;background:\${ev.gradient};display:flex;flex-direction:column;justify-content:flex-end;padding:14px 16px;\`">
              <Pill :color="ev.tagColor" :bg="ev.tagBg" :label="ev.tag" />
            </div>
          </template>
          <template #header>
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;width:100%;">
              <h3 style="font-size:14px;font-weight:600;color:var(--color-text-heading);line-height:1.35;">{{ ev.title }}</h3>
              <Pill :color="ev.statusColor" :bg="ev.statusBg" :label="ev.status" />
            </div>
            <p style="${S.meta}margin-top:4px;">📅 {{ ev.date }}</p>
          </template>
          <p style="${S.body}font-size:12px;">{{ ev.desc }}</p>
          <template #footer>
            <button style="
              flex:1;padding:7px;border-radius:var(--radius-md);
              background:var(--color-neutral);color:var(--color-text-inverse);
              font-size:13px;font-weight:600;border:none;cursor:pointer;
            ">{{ ev.cta }}</button>
            <button style="
              padding:7px 14px;border-radius:var(--radius-md);
              background:transparent;color:var(--color-text-secondary);
              font-size:13px;font-weight:500;
              border:1px solid var(--color-border);cursor:pointer;
            ">Preview</button>
          </template>
        </Card>
      </div>
    `,
    setup: () => ({
      events: [
        {
          title: 'Syrofi & Nadira Wedding',
          date: '12 March 2025 · Gedung Serbaguna, Jakarta',
          desc: '248 confirmed · 12 pending RSVP',
          tag: 'Wedding', tagColor: 'rgba(255,255,255,0.95)', tagBg: 'rgba(255,255,255,0.18)',
          status: 'Live', statusColor: 'var(--color-success)', statusBg: 'var(--color-success-light)',
          gradient: 'linear-gradient(140deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
          cta: 'View Invitation',
        },
        {
          title: "Ahmad's 30th Birthday",
          date: '5 July 2025 · Sky Rooftop, Bandung',
          desc: 'RSVP not yet opened · 0 responses',
          tag: 'Birthday', tagColor: 'rgba(255,255,255,0.95)', tagBg: 'rgba(255,255,255,0.18)',
          status: 'Draft', statusColor: 'var(--color-warning)', statusBg: 'var(--color-warning-light)',
          gradient: 'linear-gradient(140deg, var(--color-info) 0%, #6366f1 100%)',
          cta: 'Continue Editing',
        },
      ],
    }),
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 5 · Feature grid — clickable navigation cards
// ══════════════════════════════════════════════════════════════════════════════
export const FeatureGrid: Story = {
  name: 'Feature Grid',
  render: () => ({
    components: {
      Card, IconBox, RiArrowRightSLine,
      RiMailSendLine, RiGroupLine, RiCalendarEventLine,
      RiPieChartLine, RiMessage2Line, RiSettings4Line,
    },
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,220px);gap:12px;">
        <Card
          v-for="f in features" :key="f.name"
          hoverable clickable radius="lg"
        >
          <div style="display:flex;flex-direction:column;gap:12px;">
            <IconBox :bg="f.bg" :color="f.color" :size="40">
              <component :is="f.icon" :size="18" />
            </IconBox>
            <div style="flex:1;">
              <p style="font-size:13px;font-weight:600;color:var(--color-text-heading);margin-bottom:3px;">{{ f.name }}</p>
              <p style="${S.body}font-size:12px;">{{ f.desc }}</p>
            </div>
            <div style="display:flex;align-items:center;gap:2px;font-size:12px;font-weight:500;color:var(--color-text-tertiary);">
              Open <RiArrowRightSLine :size="14" style="margin-top:1px;" />
            </div>
          </div>
        </Card>
      </div>
    `,
    setup: () => ({
      features: [
        { icon: RiMailSendLine,     name: 'Invitations', desc: 'Create and manage invitations',    bg: 'var(--color-primary-light)',   color: 'var(--color-primary)'  },
        { icon: RiGroupLine,        name: 'Guest List',  desc: 'Track RSVPs and manage guests',    bg: 'var(--color-success-light)',   color: 'var(--color-success)'  },
        { icon: RiCalendarEventLine,name: 'Events',      desc: 'Upcoming and past events',         bg: 'var(--color-info-light)',      color: 'var(--color-info)'     },
        { icon: RiPieChartLine,     name: 'Analytics',   desc: 'Views, opens, and responses',      bg: 'var(--color-secondary-light)', color: 'var(--color-secondary)'},
        { icon: RiMessage2Line,     name: 'Messages',    desc: 'Chat and broadcast to guests',     bg: 'var(--color-warning-light)',   color: 'var(--color-warning)'  },
        { icon: RiSettings4Line,    name: 'Settings',    desc: 'Account and preferences',          bg: 'var(--color-neutral-light)',   color: 'var(--color-text-secondary)'},
      ],
    }),
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 6 · Activity feed — header + rows + footer
// ══════════════════════════════════════════════════════════════════════════════
export const ActivityFeed: Story = {
  name: 'Activity Feed',
  render: () => ({
    components: { Card, IconBox, RiCheckLine, RiMailSendLine, RiEyeLine, RiMessage2Line, RiGroupLine },
    template: `
      <Card variant="outlined" style="width:360px">
        <template #header>
          <div style="width:100%;">
            <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);">Recent Activity</p>
            <p style="${S.meta}margin-top:2px;">Last 24 hours</p>
          </div>
        </template>

        <div style="display:flex;flex-direction:column;gap:0;">
          <div
            v-for="(item, i) in activity" :key="i"
            :style="\`
              display:flex;align-items:center;gap:12px;padding:11px 0;
              \${i < activity.length - 1 ? 'border-bottom:1px solid var(--color-border-subtle);' : ''}
            \`"
          >
            <IconBox :bg="item.bg" :color="item.color" :size="32">
              <component :is="item.icon" :size="14" />
            </IconBox>
            <div style="flex:1;min-width:0;">
              <p style="font-size:13px;color:var(--color-text-primary);line-height:1.4;">{{ item.text }}</p>
              <p style="${S.meta}margin-top:1px;">{{ item.time }}</p>
            </div>
          </div>
        </div>

        <template #footer>
          <button style="
            width:100%;padding:7px;border-radius:var(--radius-md);
            background:transparent;color:var(--color-text-secondary);
            font-size:12px;font-weight:500;border:none;cursor:pointer;
            display:flex;align-items:center;justify-content:center;gap:4px;
          ">View all activity</button>
        </template>
      </Card>
    `,
    setup: () => ({
      activity: [
        { icon: RiCheckLine,      bg: 'var(--color-success-light)',  color: 'var(--color-success)',   text: 'Budi Santoso confirmed attendance', time: '5 minutes ago' },
        { icon: RiMailSendLine,   bg: 'var(--color-primary-light)',  color: 'var(--color-primary)',   text: 'Invitation sent to 12 new guests',  time: '1 hour ago'    },
        { icon: RiEyeLine,        bg: 'var(--color-info-light)',     color: 'var(--color-info)',      text: 'Invitation viewed 18 times',        time: '2 hours ago'   },
        { icon: RiMessage2Line,   bg: 'var(--color-warning-light)',  color: 'var(--color-warning)',   text: 'New message from Siti Rahmawati',   time: '4 hours ago'   },
        { icon: RiGroupLine,      bg: 'var(--color-neutral-light)',  color: 'var(--color-text-secondary)', text: '3 guests updated dietary notes', time: '6 hours ago' },
      ],
    }),
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 7 · Profile card
// ══════════════════════════════════════════════════════════════════════════════
export const ProfileCard: Story = {
  name: 'Profile Card',
  render: () => ({
    components: { Card, Pill },
    template: `
      <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start;">

        <!-- Centered profile -->
        <Card style="width:260px">
          <div style="display:flex;flex-direction:column;align-items:center;gap:14px;padding:4px 0 0;">
            <div style="position:relative;">
              <div style="
                width:64px;height:64px;border-radius:var(--radius-full);
                background:linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
                display:flex;align-items:center;justify-content:center;
                font-size:20px;font-weight:700;color:#fff;letter-spacing:0.03em;
              ">DA</div>
              <div style="
                position:absolute;bottom:1px;right:1px;
                width:14px;height:14px;border-radius:50%;
                background:var(--color-success);
                border:2px solid var(--color-surface);
              "></div>
            </div>
            <div style="text-align:center;">
              <p style="font-size:15px;font-weight:600;color:var(--color-text-heading);">Dania Syrofi</p>
              <p style="${S.label}margin-top:2px;">Product Designer · Jakarta</p>
              <div style="display:flex;gap:6px;justify-content:center;margin-top:10px;">
                <Pill color="var(--color-primary)" bg="var(--color-primary-light)" label="Design" />
                <Pill color="var(--color-secondary)" bg="var(--color-secondary-light)" label="UI/UX" />
              </div>
            </div>
            <div style="height:1px;background:var(--color-border-subtle);width:100%;"></div>
            <div style="display:flex;gap:28px;justify-content:center;">
              <div style="text-align:center;">
                <p style="font-size:17px;font-weight:700;letter-spacing:-0.02em;color:var(--color-text-heading);">128</p>
                <p style="${S.meta}margin-top:2px;">Projects</p>
              </div>
              <div style="text-align:center;">
                <p style="font-size:17px;font-weight:700;letter-spacing:-0.02em;color:var(--color-text-heading);">4.9k</p>
                <p style="${S.meta}margin-top:2px;">Followers</p>
              </div>
              <div style="text-align:center;">
                <p style="font-size:17px;font-weight:700;letter-spacing:-0.02em;color:var(--color-text-heading);">312</p>
                <p style="${S.meta}margin-top:2px;">Following</p>
              </div>
            </div>
            <button style="
              width:100%;padding:8px;border-radius:var(--radius-md);
              background:var(--color-neutral);color:var(--color-text-inverse);
              font-size:13px;font-weight:600;border:none;cursor:pointer;letter-spacing:0.01em;
            ">Follow</button>
          </div>
        </Card>

        <!-- Horizontal profile (compact) -->
        <Card variant="outlined" style="width:320px">
          <div style="display:flex;align-items:center;gap:14px;">
            <div style="
              width:48px;height:48px;border-radius:var(--radius-full);flex-shrink:0;
              background:var(--color-info-light);
              display:flex;align-items:center;justify-content:center;
              font-size:16px;font-weight:700;color:var(--color-info);
            ">RA</div>
            <div style="flex:1;min-width:0;">
              <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);">Rizky Aulia</p>
              <p style="${S.label}margin-top:1px;">Frontend Engineer</p>
            </div>
            <button style="
              padding:6px 14px;border-radius:var(--radius-md);
              background:transparent;color:var(--color-text-primary);
              font-size:12px;font-weight:600;
              border:1px solid var(--color-border);cursor:pointer;
            ">View</button>
          </div>
          <div style="height:1px;background:var(--color-border-subtle);margin:14px 0;"></div>
          <p style="${S.body}font-size:12px;">
            Just shipped the new design system tokens. Dark mode is finally working flawlessly across all components 🎉
          </p>
          <div style="display:flex;gap:20px;margin-top:12px;">
            <button style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--color-text-tertiary);display:flex;align-items:center;gap:4px;">♡ 48</button>
            <button style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--color-text-tertiary);display:flex;align-items:center;gap:4px;">↩ Reply</button>
            <button style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--color-text-tertiary);display:flex;align-items:center;gap:4px;">⤴ Share</button>
          </div>
        </Card>

      </div>
    `,
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 8 · Empty state
// ══════════════════════════════════════════════════════════════════════════════
export const EmptyState: Story = {
  name: 'Empty State',
  render: () => ({
    components: { Card, IconBox, RiMailSendLine, RiAddLine },
    template: `
      <Card style="width:360px">
        <div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:16px 0 8px;gap:16px;">
          <div style="
            width:56px;height:56px;border-radius:var(--radius-xl);
            background:var(--color-neutral-light);
            display:flex;align-items:center;justify-content:center;
          ">
            <RiMailSendLine :size="24" style="color:var(--color-text-tertiary);" />
          </div>
          <div>
            <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);">No invitations yet</p>
            <p style="${S.body}font-size:12px;max-width:220px;margin:6px auto 0;">
              Create your first invitation and start sending to guests.
            </p>
          </div>
          <button style="
            display:inline-flex;align-items:center;gap:6px;
            padding:8px 18px;border-radius:var(--radius-md);
            background:var(--color-neutral);color:var(--color-text-inverse);
            font-size:13px;font-weight:600;border:none;cursor:pointer;
          ">
            <RiAddLine :size="14" /> New Invitation
          </button>
        </div>
      </Card>
    `,
  }),
}

// ══════════════════════════════════════════════════════════════════════════════
// 9 · Skeleton loading
// ══════════════════════════════════════════════════════════════════════════════
export const Skeleton: Story = {
  name: 'Skeleton / Loading',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
        <Card style="width:272px">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div class="skel" style="width:36px;height:36px;border-radius:var(--radius-md);"></div>
              <div class="skel" style="width:52px;height:20px;border-radius:var(--radius-full);"></div>
            </div>
            <div class="skel" style="width:80px;height:32px;border-radius:var(--radius-sm);"></div>
            <div class="skel" style="width:110px;height:12px;border-radius:var(--radius-sm);"></div>
            <div style="height:1px;background:var(--color-border-subtle);"></div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              <div class="skel" style="width:100%;height:10px;border-radius:var(--radius-sm);"></div>
              <div class="skel" style="width:80%;height:10px;border-radius:var(--radius-sm);"></div>
            </div>
          </div>
        </Card>

        <Card style="width:272px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            <div class="skel" style="width:40px;height:40px;border-radius:var(--radius-full);flex-shrink:0;"></div>
            <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
              <div class="skel" style="width:100px;height:12px;border-radius:var(--radius-sm);"></div>
              <div class="skel" style="width:70px;height:10px;border-radius:var(--radius-sm);"></div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <div class="skel" style="width:100%;height:10px;border-radius:var(--radius-sm);"></div>
            <div class="skel" style="width:90%;height:10px;border-radius:var(--radius-sm);"></div>
            <div class="skel" style="width:60%;height:10px;border-radius:var(--radius-sm);"></div>
          </div>
        </Card>
      </div>
    `,
  }),
  parameters: {
    docs: { story: { inline: true } },
  },
}

// ══════════════════════════════════════════════════════════════════════════════
// 10 · Hoverable & Elevated
// ══════════════════════════════════════════════════════════════════════════════
export const Hoverable: Story = {
  name: 'Hoverable & Elevated',
  render: () => ({
    components: { Card, IconBox, RiCalendarEventLine, RiUserSmileLine, RiNotificationLine },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
        <Card variant="default" hoverable style="width:220px">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <IconBox bg="var(--color-primary-light)" color="var(--color-primary)" :size="36">
              <RiCalendarEventLine :size="16" />
            </IconBox>
            <div>
              <p style="font-size:13px;font-weight:600;color:var(--color-text-heading);">Default + Hoverable</p>
              <p style="${S.body}font-size:12px;margin-top:4px;">Lifts on hover. Shadow transitions from md → xl.</p>
            </div>
          </div>
        </Card>

        <Card variant="elevated" hoverable style="width:220px">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <IconBox bg="var(--color-success-light)" color="var(--color-success)" :size="36">
              <RiUserSmileLine :size="16" />
            </IconBox>
            <div>
              <p style="font-size:13px;font-weight:600;color:var(--color-text-heading);">Elevated + Hoverable</p>
              <p style="${S.body}font-size:12px;margin-top:4px;">Deep resting shadow. Even deeper on hover.</p>
            </div>
          </div>
        </Card>

        <Card variant="outlined" clickable style="width:220px">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <IconBox bg="var(--color-warning-light)" color="var(--color-warning)" :size="36">
              <RiNotificationLine :size="16" />
            </IconBox>
            <div>
              <p style="font-size:13px;font-weight:600;color:var(--color-text-heading);">Outlined + Clickable</p>
              <p style="${S.body}font-size:12px;margin-top:4px;">Focus ring + active scale. Keyboard accessible.</p>
            </div>
          </div>
        </Card>
      </div>
    `,
  }),
}
