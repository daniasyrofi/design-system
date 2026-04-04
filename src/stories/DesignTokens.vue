<script setup lang="ts">
// DesignTokens.vue — visual documentation for @abadikan/ds design tokens
// Used in Storybook via DesignTokens.stories.ts

// ── Color groups ──────────────────────────────────────────────────────────────
const colorGroups: Array<{
  title: string
  tokens: Array<{ name: string; var: string; text?: string }>
}> = [
  {
    title: 'Brand',
    tokens: [
      { name: 'Primary', var: '--color-primary', text: '--color-text-inverse' },
      { name: 'Primary Hover', var: '--color-primary-hover', text: '--color-text-inverse' },
      { name: 'Primary Light', var: '--color-primary-light', text: '--color-primary' },
      { name: 'Secondary', var: '--color-secondary', text: '--color-text-inverse' },
      { name: 'Secondary Hover', var: '--color-secondary-hover', text: '--color-text-inverse' },
      { name: 'Secondary Light', var: '--color-secondary-light', text: '--color-secondary' },
    ],
  },
  {
    title: 'Neutral',
    tokens: [
      { name: 'Neutral', var: '--color-neutral', text: '--color-text-inverse' },
      { name: 'Neutral Hover', var: '--color-neutral-hover', text: '--color-text-inverse' },
      { name: 'Neutral Light', var: '--color-neutral-light', text: '--color-neutral' },
    ],
  },
  {
    title: 'Semantic',
    tokens: [
      { name: 'Danger', var: '--color-danger', text: '--color-text-inverse' },
      { name: 'Danger Light', var: '--color-danger-light', text: '--color-danger' },
      { name: 'Success', var: '--color-success', text: '--color-text-inverse' },
      { name: 'Success Light', var: '--color-success-light', text: '--color-success' },
      { name: 'Warning', var: '--color-warning', text: '--color-text-inverse' },
      { name: 'Warning Light', var: '--color-warning-light', text: '--color-warning' },
      { name: 'Info', var: '--color-info', text: '--color-text-inverse' },
      { name: 'Info Light', var: '--color-info-light', text: '--color-info' },
    ],
  },
  {
    title: 'Surface & Background',
    tokens: [
      { name: 'BG', var: '--color-bg', text: '--color-text-primary' },
      { name: 'BG Subtle', var: '--color-bg-subtle', text: '--color-text-primary' },
      { name: 'Surface', var: '--color-surface', text: '--color-text-primary' },
      { name: 'Surface Raised', var: '--color-surface-raised', text: '--color-text-primary' },
      { name: 'Surface Glass', var: '--color-surface-glass', text: '--color-text-primary' },
    ],
  },
  {
    title: 'Border',
    tokens: [
      { name: 'Border Subtle', var: '--color-border-subtle', text: '--color-text-secondary' },
      { name: 'Border', var: '--color-border', text: '--color-text-secondary' },
      { name: 'Border Strong', var: '--color-border-strong', text: '--color-text-secondary' },
    ],
  },
  {
    title: 'Text',
    tokens: [
      { name: 'Heading', var: '--color-text-heading', text: '--color-surface' },
      { name: 'Primary', var: '--color-text-primary', text: '--color-surface' },
      { name: 'Secondary', var: '--color-text-secondary', text: '--color-surface' },
      { name: 'Tertiary', var: '--color-text-tertiary', text: '--color-surface' },
      { name: 'Muted', var: '--color-text-muted', text: '--color-surface' },
      { name: 'Disabled', var: '--color-text-disabled', text: '--color-surface' },
      { name: 'Inverse', var: '--color-text-inverse', text: '--color-text-primary' },
    ],
  },
]

// ── Spacing ───────────────────────────────────────────────────────────────────
const spacingTokens = [
  { name: '0', var: '--space-0', px: '0' },
  { name: 'px', var: '--space-px', px: '1px' },
  { name: '0.5', var: '--space-0-5', px: '2px' },
  { name: '1', var: '--space-1', px: '4px' },
  { name: '1.5', var: '--space-1-5', px: '6px' },
  { name: '2', var: '--space-2', px: '8px' },
  { name: '2.5', var: '--space-2-5', px: '10px' },
  { name: '3', var: '--space-3', px: '12px' },
  { name: '4', var: '--space-4', px: '16px' },
  { name: '5', var: '--space-5', px: '20px' },
  { name: '6', var: '--space-6', px: '24px' },
  { name: '8', var: '--space-8', px: '32px' },
  { name: '10', var: '--space-10', px: '40px' },
  { name: '12', var: '--space-12', px: '48px' },
  { name: '16', var: '--space-16', px: '64px' },
  { name: '20', var: '--space-20', px: '80px' },
  { name: '24', var: '--space-24', px: '96px' },
]

// ── Radii ─────────────────────────────────────────────────────────────────────
const radiiTokens = [
  { name: 'none', var: '--radius-none' },
  { name: 'sm', var: '--radius-sm' },
  { name: 'md', var: '--radius-md' },
  { name: 'lg', var: '--radius-lg' },
  { name: 'xl', var: '--radius-xl' },
  { name: 'full', var: '--radius-full' },
]

// ── Shadows ───────────────────────────────────────────────────────────────────
const shadowTokens = [
  { name: 'xs', var: '--shadow-xs' },
  { name: 'sm', var: '--shadow-sm' },
  { name: 'md', var: '--shadow-md' },
  { name: 'lg', var: '--shadow-lg' },
  { name: 'xl', var: '--shadow-xl' },
  { name: '2xl', var: '--shadow-2xl' },
]

// ── Component CSS Override Tokens ─────────────────────────────────────────────
const componentTokens: Array<{ component: string; tokens: string[] }> = [
  {
    component: 'Button',
    tokens: [
      '--btn-bg',
      '--btn-text',
      '--btn-border',
      '--btn-hover-bg',
      '--btn-hover-border',
      '--btn-hover-text',
    ],
  },
  {
    component: 'Input',
    tokens: [
      '--input-bg',
      '--input-border',
      '--input-text',
      '--input-placeholder',
      '--input-border-focus',
      '--input-border-error',
    ],
  },
  {
    component: 'Badge',
    tokens: ['--badge-bg', '--badge-text', '--badge-border'],
  },
  {
    component: 'Card',
    tokens: ['--card-bg', '--card-border', '--card-shadow', '--card-shadow-hover'],
  },
  {
    component: 'Tag',
    tokens: ['--tag-bg', '--tag-text', '--tag-border'],
  },
  {
    component: 'Toggle',
    tokens: ['--toggle-bg-on', '--toggle-bg-off', '--toggle-thumb'],
  },
  {
    component: 'ProgressBar',
    tokens: ['--progress-fill', '--progress-track'],
  },
]
</script>

<template>
  <div
    class="ds-token-docs"
    style="
      font-family: var(--font-ui, Inter, sans-serif);
      color: var(--color-text-primary);
      max-width: 900px;
      margin: 0 auto;
      padding: 32px 24px;
    "
  >
    <h1
      style="
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 4px;
        color: var(--color-text-heading);
      "
    >
      Design Tokens
    </h1>
    <p style="color: var(--color-text-secondary); margin-bottom: 40px; font-size: 15px">
      All visual constants used across
      <code
        style="
          font-family: monospace;
          background: var(--color-bg-subtle);
          padding: 1px 5px;
          border-radius: 4px;
        "
        >@abadikan/ds</code
      >. Import via
      <code
        style="
          font-family: monospace;
          background: var(--color-bg-subtle);
          padding: 1px 5px;
          border-radius: 4px;
        "
        >import '@abadikan/ds/styles'</code
      >
      then reference
      <code
        style="
          font-family: monospace;
          background: var(--color-bg-subtle);
          padding: 1px 5px;
          border-radius: 4px;
        "
        >var(--token-name)</code
      >
      in your CSS.
    </p>

    <!-- ── COLORS ─────────────────────────────────────────────── -->
    <section style="margin-bottom: 48px">
      <h2
        style="
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--color-border);
        "
      >
        Colors
      </h2>

      <div v-for="group in colorGroups" :key="group.title" style="margin-bottom: 28px">
        <h3
          style="
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--color-text-tertiary);
            margin-bottom: 10px;
          "
        >
          {{ group.title }}
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px">
          <div
            v-for="token in group.tokens"
            :key="token.var"
            style="display: flex; flex-direction: column; gap: 4px; min-width: 120px"
          >
            <div
              :style="{
                width: '100%',
                height: '56px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: `var(${token.var})`,
                border: '1px solid color-mix(in oklch, var(--color-border) 60%, transparent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: '600',
                letterSpacing: '0.04em',
                color: token.text ? `var(${token.text})` : 'transparent',
              }"
            >
              Aa
            </div>
            <span
              style="font-size: 11px; color: var(--color-text-secondary); font-family: monospace"
              >{{ token.var }}</span
            >
            <span style="font-size: 11px; color: var(--color-text-tertiary)">{{ token.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SPACING ────────────────────────────────────────────── -->
    <section style="margin-bottom: 48px">
      <h2
        style="
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--color-border);
        "
      >
        Spacing
      </h2>
      <div style="display: flex; flex-direction: column; gap: 6px">
        <div
          v-for="token in spacingTokens"
          :key="token.var"
          style="display: flex; align-items: center; gap: 12px"
        >
          <span
            style="
              font-family: monospace;
              font-size: 12px;
              color: var(--color-text-secondary);
              min-width: 120px;
            "
            >{{ token.var }}</span
          >
          <div
            :style="{
              height: '20px',
              width: token.px,
              minWidth: '2px',
              backgroundColor: 'var(--color-primary)',
              borderRadius: '2px',
            }"
          />
          <span style="font-size: 12px; color: var(--color-text-tertiary)">{{ token.px }}</span>
        </div>
      </div>
    </section>

    <!-- ── RADII ──────────────────────────────────────────────── -->
    <section style="margin-bottom: 48px">
      <h2
        style="
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--color-border);
        "
      >
        Border Radius
      </h2>
      <div style="display: flex; flex-wrap: wrap; gap: 12px">
        <div
          v-for="token in radiiTokens"
          :key="token.var"
          style="display: flex; flex-direction: column; gap: 6px; align-items: center"
        >
          <div
            :style="{
              width: '64px',
              height: '64px',
              backgroundColor: 'var(--color-primary-light)',
              border: '2px solid var(--color-primary)',
              borderRadius: `var(${token.var})`,
            }"
          />
          <span
            style="font-family: monospace; font-size: 11px; color: var(--color-text-secondary)"
            >{{ token.var }}</span
          >
          <span style="font-size: 11px; color: var(--color-text-tertiary)">{{ token.name }}</span>
        </div>
      </div>
    </section>

    <!-- ── SHADOWS ────────────────────────────────────────────── -->
    <section style="margin-bottom: 48px">
      <h2
        style="
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--color-border);
        "
      >
        Shadows
      </h2>
      <div style="display: flex; flex-wrap: wrap; gap: 20px">
        <div
          v-for="token in shadowTokens"
          :key="token.var"
          style="display: flex; flex-direction: column; gap: 8px; align-items: center"
        >
          <div
            :style="{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: `var(${token.var})`,
              border: '1px solid var(--color-border)',
            }"
          />
          <span
            style="font-family: monospace; font-size: 11px; color: var(--color-text-secondary)"
            >{{ token.var }}</span
          >
          <span style="font-size: 11px; color: var(--color-text-tertiary)"
            >shadow-{{ token.name }}</span
          >
        </div>
      </div>
    </section>

    <!-- ── COMPONENT CSS OVERRIDE TOKENS ────────────────────── -->
    <section style="margin-bottom: 48px">
      <h2
        style="
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--color-border);
        "
      >
        Component CSS Override Tokens
      </h2>
      <p style="color: var(--color-text-secondary); margin-bottom: 20px; font-size: 14px">
        Set these on the component element (or any ancestor) to override the default appearance
        without touching global theme tokens.
      </p>
      <pre
        style="
          background: var(--color-bg-subtle);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 16px;
          font-size: 13px;
          overflow: auto;
          margin-bottom: 24px;
        "
      ><code>/* Example: teal Input in one section */
.my-section {
  --input-bg: oklch(0.96 0.03 180);
  --input-border-focus: oklch(0.55 0.18 180);
}

/* Example: via style binding in Vue */
&lt;Input :style="{ '--input-border-focus': 'var(--color-success)' }" /&gt;</code></pre>

      <div style="display: flex; flex-direction: column; gap: 16px">
        <div
          v-for="group in componentTokens"
          :key="group.component"
          style="
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            overflow: hidden;
          "
        >
          <div
            style="
              background: var(--color-bg-subtle);
              padding: 10px 16px;
              font-weight: 600;
              font-size: 13px;
              border-bottom: 1px solid var(--color-border);
            "
          >
            {{ group.component }}
          </div>
          <div style="padding: 12px 16px; display: flex; flex-wrap: wrap; gap: 8px">
            <code
              v-for="token in group.tokens"
              :key="token"
              style="
                font-family: monospace;
                font-size: 12px;
                background: var(--color-bg-subtle);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-sm);
                padding: 3px 8px;
                color: var(--color-primary);
              "
            >
              {{ token }}
            </code>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
