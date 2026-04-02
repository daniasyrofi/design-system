<script setup lang="ts">
import { ref } from 'vue'
import { RiExternalLinkLine, RiFileCopyLine, RiArrowDownSLine } from '@remixicon/vue'

import Navbar        from '@/components/organisms/Navbar/Navbar.vue'
import Button        from '@/components/atoms/Button/Button.vue'
import Badge         from '@/components/atoms/Badge/Badge.vue'
import Divider       from '@/components/atoms/Divider/Divider.vue'
import SearchInput   from '@/components/molecules/SearchInput/SearchInput.vue'
import ThemeToggle   from '@/components/molecules/ThemeToggle/ThemeToggle.vue'
import LanguageToggle from '@/components/molecules/LanguageToggle/LanguageToggle.vue'
import Alert         from '@/components/molecules/Alert/Alert.vue'
import Breadcrumb    from '@/components/molecules/Breadcrumb/Breadcrumb.vue'

// ── Nav state ────────────────────────────────────────────────────────────────
const activeNav = ref('developer-guide')
const activeSidebarItem = ref('intro-to-claude')
const searchQuery = ref('')

const navItems = [
  { id: 'developer-guide', label: 'Developer Guide', external: false },
  { id: 'api-reference',   label: 'API Reference',   external: false },
  { id: 'mcp',             label: 'MCP',              external: true  },
  { id: 'resources',       label: 'Resources',        external: false },
  { id: 'release-notes',   label: 'Release Notes',    external: false },
]

// ── Sidebar sections ─────────────────────────────────────────────────────────
const sidebarSections = [
  {
    title: 'First steps',
    items: [
      { id: 'intro-to-claude', label: 'Intro to Claude' },
      { id: 'quickstart',      label: 'Quickstart' },
    ],
  },
  {
    title: 'Models & pricing',
    items: [
      { id: 'models-overview',   label: 'Models overview' },
      { id: 'choosing-a-model',  label: 'Choosing a model' },
      { id: 'whats-new',         label: "What's new in Claude 4.6" },
      { id: 'migration-guide',   label: 'Migration guide' },
      { id: 'model-deprecations',label: 'Model deprecations' },
      { id: 'pricing',           label: 'Pricing' },
    ],
  },
  {
    title: 'Build with Claude',
    items: [
      { id: 'features-overview', label: 'Features overview' },
      { id: 'messages-api',      label: 'Using the Messages API' },
      { id: 'stop-reasons',      label: 'Handling stop reasons' },
      { id: 'prompting',         label: 'Prompting best practices' },
    ],
  },
  {
    title: 'Model capabilities',
    items: [
      { id: 'extended-thinking', label: 'Extended thinking' },
      { id: 'adaptive-thinking', label: 'Adaptive thinking' },
      { id: 'effort',            label: 'Effort' },
      { id: 'console',           label: 'Console' },
    ],
  },
]

// ── TOC ───────────────────────────────────────────────────────────────────────
const tocItems = [
  { id: 'recommended-path',   label: 'Recommended path for new developers' },
  { id: 'develop-with-claude',label: 'Develop with Claude' },
  { id: 'key-capabilities',   label: 'Key capabilities' },
  { id: 'support',            label: 'Support' },
]
const activeToc = ref('recommended-path')

// ── Steps ─────────────────────────────────────────────────────────────────────
const steps = [
  {
    num: 1,
    title: 'Make your first API call',
    desc: 'Set up your environment, install an SDK, and send your first message to Claude.',
    link: 'Go to the quickstart',
  },
  {
    num: 2,
    title: 'Understand the Messages API',
    desc: 'Learn the core request and response structure, including multi-turn conversations, system prompts, and stop reasons.',
    link: 'Read the Messages API guide',
  },
  {
    num: 3,
    title: 'Choose the right model',
    desc: '',
    link: '',
  },
]
</script>

<template>
  <div
    class="min-h-screen"
    style="background:var(--color-bg); color:var(--color-text-primary); font-family:var(--font-sans, system-ui, sans-serif);"
  >
    <!-- ── Top Navigation ───────────────────────────────────────────────────── -->
    <div
      class="sticky top-0 z-50 w-full"
      style="background:var(--color-surface); border-bottom:1px solid var(--color-border);"
    >
      <Navbar
        :border="false"
        class="!max-w-none! !rounded-none! !h-14! !px-4!"
      >
        <!-- Logo + title -->
        <template #start>
          <div class="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="color:var(--color-primary)">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
            <span class="text-[15px] font-semibold" style="color:var(--color-text-heading);">
              Claude API Docs
            </span>
          </div>
        </template>

        <!-- Nav tabs -->
        <template #center>
          <nav class="flex items-center gap-0.5">
            <Button
              v-for="item in navItems"
              :key="item.id"
              :variant="activeNav === item.id ? 'outline' : 'ghost'"
              size="sm"
              @click="activeNav = item.id"
            >
              {{ item.label }}
              <template v-if="item.external" #trailing>
                <RiExternalLinkLine :size="'12'" />
              </template>
            </Button>
          </nav>
        </template>

        <!-- Right side -->
        <template #end>
          <div class="flex items-center gap-2">
            <SearchInput
              v-model="searchQuery"
              placeholder="Search..."
              size="sm"
              class="w-44"
            />
            <ThemeToggle size="sm" />
            <LanguageToggle size="sm" />
            <Button variant="default" size="sm">Log in</Button>
          </div>
        </template>
      </Navbar>
    </div>

    <!-- ── Body ─────────────────────────────────────────────────────────────── -->
    <div class="flex">

      <!-- Left Sidebar -->
      <aside
        class="w-60 shrink-0 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto py-5 px-3"
        style="background:var(--color-surface); border-right:1px solid var(--color-border);"
      >
        <div v-for="(section, si) in sidebarSections" :key="section.title">
          <Divider v-if="si > 0" class="my-3" />
          <p
            class="text-[11px] font-semibold uppercase tracking-wider px-2 mb-1"
            style="color:var(--color-text-tertiary);"
          >
            {{ section.title }}
          </p>
          <ul class="space-y-0.5">
            <li v-for="item in section.items" :key="item.id">
              <Button
                :variant="activeSidebarItem === item.id ? 'outline' : 'ghost'"
                size="sm"
                class="w-full !justify-start! !rounded-lg!"
                @click="activeSidebarItem = item.id"
              >
                {{ item.label }}
              </Button>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 min-w-0 px-12 py-8 max-w-3xl">

        <!-- Breadcrumb -->
        <Breadcrumb
          :items="[{ label: 'First steps', href: '#' }, { label: 'Intro to Claude' }]"
          separator="chevron"
          size="sm"
          class="mb-4"
        />

        <!-- Title row -->
        <div class="flex items-start justify-between mb-4">
          <h1
            class="text-[32px] font-bold leading-tight"
            style="color:var(--color-text-heading); letter-spacing:-0.02em;"
          >
            Intro to Claude
          </h1>
          <Button variant="outline" size="sm" class="mt-1 shrink-0">
            <template #leading>
              <RiFileCopyLine :size="'14'" />
            </template>
            Copy page
            <template #trailing>
              <RiArrowDownSLine :size="'14'" />
            </template>
          </Button>
        </div>

        <!-- Description -->
        <p
          class="text-[15px] leading-relaxed mb-6"
          style="color:var(--color-text-secondary);"
        >
          Claude is a highly performant, trustworthy, and intelligent AI platform built by Anthropic.
          Claude excels at tasks involving language, reasoning, analysis, coding, and more.
        </p>

        <!-- Models info box -->
        <Alert variant="warning" class="mb-4">
          <p class="text-xs mb-2" style="color:var(--color-text-secondary);">
            The latest generation of Claude models:
          </p>
          <ul class="space-y-2">
            <li class="text-sm">
              <span class="font-semibold" style="color:var(--color-text-primary);">Claude Opus 4.6</span>
              <span style="color:var(--color-text-secondary);"> — Our most intelligent model, and the world's best model for coding, enterprise agents, and professional work. </span>
              <a href="#" class="underline underline-offset-2 text-sm" style="color:var(--color-text-secondary);">Learn more.</a>
            </li>
            <li class="text-sm">
              <span class="font-semibold" style="color:var(--color-text-primary);">Claude Sonnet 4.6</span>
              <span style="color:var(--color-text-secondary);"> — Frontier intelligence at scale—built for coding, agents, and enterprise workflows. </span>
              <a href="#" class="underline underline-offset-2 text-sm" style="color:var(--color-text-secondary);">Learn more.</a>
            </li>
            <li class="text-sm">
              <span class="font-semibold" style="color:var(--color-text-primary);">Claude Haiku 4.5</span>
              <span style="color:var(--color-text-secondary);"> — Fastest model with near-frontier intelligence. </span>
              <a href="#" class="underline underline-offset-2 text-sm" style="color:var(--color-text-secondary);">Learn more.</a>
            </li>
          </ul>
        </Alert>

        <!-- Claude.ai info box -->
        <Alert variant="info" class="mb-8">
          Looking to chat with Claude? Visit
          <a href="#" class="underline underline-offset-2 font-medium" style="color:var(--color-info);">claude.ai</a>.
        </Alert>

        <!-- Recommended path section -->
        <section id="recommended-path">
          <h2
            class="text-[22px] font-bold mb-2"
            style="color:var(--color-text-heading); letter-spacing:-0.015em;"
          >
            Recommended path for new developers
          </h2>
          <p class="text-sm leading-relaxed mb-6" style="color:var(--color-text-secondary);">
            Follow these steps to go from zero to a working Claude integration.
          </p>

          <div class="space-y-6">
            <div v-for="step in steps" :key="step.num" class="flex gap-4">
              <Badge
                variant="neutral"
                badge-style="subtle"
                size="md"
                class="shrink-0 mt-0.5 w-7 h-7 flex items-center justify-center font-semibold"
              >
                {{ step.num }}
              </Badge>
              <div class="flex-1 pt-0.5">
                <h3
                  class="text-[15px] font-semibold mb-1"
                  style="color:var(--color-text-heading);"
                >
                  {{ step.title }}
                </h3>
                <p
                  v-if="step.desc"
                  class="text-sm leading-relaxed mb-2"
                  style="color:var(--color-text-secondary);"
                >
                  {{ step.desc }}
                </p>
                <Button
                  v-if="step.link"
                  variant="link"
                  size="sm"
                  as="a"
                  href="#"
                >
                  {{ step.link }}
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <!-- Right TOC Sidebar -->
      <aside class="w-52 shrink-0 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto py-8 px-4">
        <div class="mb-4" style="color:var(--color-text-tertiary);">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <ul class="space-y-1.5">
          <li v-for="item in tocItems" :key="item.id">
            <Button
              :variant="activeToc === item.id ? 'ghost' : 'ghost'"
              size="xs"
              class="w-full !justify-start! !text-left! !px-0! !font-normal! !rounded-none!"
              :style="activeToc === item.id
                ? 'color:var(--color-text-primary); font-weight:500;'
                : 'color:var(--color-text-tertiary);'"
              @click="activeToc = item.id"
            >
              {{ item.label }}
            </Button>
          </li>
        </ul>
      </aside>

    </div>
  </div>
</template>
