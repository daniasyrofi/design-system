# Navbar Pill Transition — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate `SharedNavbar` between three states — full-width transparent (hero), floating pill centered (scrolled), pill with mega menu open (hover) — using a smooth CSS `max-width` + `padding` transition.

**Architecture:** Two layers wrap the existing `Navbar` DS component: an outer `fixed` div (handles positioning) and an inner pill `div` (handles all visual styling — bg, border, radius, shadow, max-width). The DS `Navbar` becomes a pure content shell with `:sticky="false"` and no visual overrides. A spacer `div h-[72px]` sits after the fixed container to prevent page content from sliding under.

**Tech Stack:** Vue 3 Composition API, Tailwind CSS (JIT arbitrary values), existing DS `Navbar` component

---

## File Map

| File | Action | What changes |
|---|---|---|
| `src/components/landing/SharedNavbar.vue` | Modify | Template restructure + new computed + scroll threshold |

Single file change. No new files needed.

---

## Key facts about Navbar DS (read before touching code)

`src/components/organisms/Navbar/Navbar.vue` renders a `<header>` element with these built-in classes:

```
w-full max-w-[700px] h-[64px] px-[24px] rounded-b-[var(--radius-xl)]
```

- `:sticky="true"` adds `sticky top-0 z-[100]` — we switch this to `false`
- `variant="transparent"` gives `bg-transparent` — keep this
- The `!max-w-full` override already in SharedNavbar cancels DS's `max-w-[700px]` — keep it
- The DS `<header>` height is `h-[64px]` (not 72px) — spacer accounts for the 8px outer `py-2` padding

---

### Task 1: Add `pillClasses` computed and raise scroll threshold

**Files:**
- Modify: `src/components/landing/SharedNavbar.vue` — script section only

- [ ] **Step 1: Open the file and locate the script block**

  File: `src/components/landing/SharedNavbar.vue`, lines 1–85.

- [ ] **Step 2: Raise scroll threshold from `10` to `80`**

  Find:
  ```ts
  function onScroll() {
    isScrolled.value = window.scrollY > 10
  }
  ```

  Replace with:
  ```ts
  function onScroll() {
    isScrolled.value = window.scrollY > 80
  }
  ```

- [ ] **Step 3: Add `pillClasses` computed property after `bgActive`**

  Find:
  ```ts
  const bgActive = computed(
    () => isScrolled.value || hovering.value || showMega.value || mobileOpen.value
  )
  ```

  Replace with:
  ```ts
  const bgActive = computed(
    () => isScrolled.value || hovering.value || showMega.value || mobileOpen.value
  )

  const pillClasses = computed(() => {
    if (!isScrolled.value && !hovering.value && !showMega.value && !mobileOpen.value) {
      // Hero state — transparent, full width
      return 'max-w-[1040px] bg-transparent border border-transparent rounded-none shadow-none'
    }
    if (showMega.value) {
      // Mega menu open — pill top only, no shadow, no bottom radius
      return 'max-w-[720px] bg-white border border-[var(--color-border)] rounded-t-[20px] rounded-b-none shadow-none'
    }
    // Scrolled / hovered — full pill
    return 'max-w-[720px] bg-white border border-[var(--color-border)] rounded-[20px] shadow-sm'
  })
  ```

- [ ] **Step 4: Verify the file compiles (dev server should show no red)**

  Dev server is already running at `http://localhost:5173`. Check terminal — no TypeScript errors expected.

- [ ] **Step 5: Commit**

  ```bash
  git add src/components/landing/SharedNavbar.vue
  git commit -m "feat(navbar): add pillClasses computed + raise scroll threshold to 80"
  ```

---

### Task 2: Restructure the template — outer fixed + pill + spacer

**Files:**
- Modify: `src/components/landing/SharedNavbar.vue` — template section

- [ ] **Step 1: Replace the `<template>` root and Navbar wrapper**

  The current template opens with:
  ```html
  <template>
    <div class="shared-navbar-root">
      <!-- DS Navbar shell -->
      <Navbar
        variant="transparent"
        :sticky="true"
        :border="false"
        :class="[
          showMega
            ? '!bg-white !border !border-[var(--color-border)] !rounded-b-none !shadow-none'
            : bgActive
              ? '!bg-white !border !border-[var(--color-border)] !rounded-b-[16px] !shadow-sm'
              : '!bg-transparent !border !border-transparent !rounded-b-[16px] !shadow-none',
        ]"
        class="transition-[background-color,box-shadow,border-color] duration-300 !px-5 !max-w-full"
        @mouseenter="onNavEnter"
        @mouseleave="onNavLeave"
      >
  ```

  Replace with:
  ```html
  <template>
    <div class="shared-navbar-root">
      <!-- Outer positioning layer: fixed, full-width, transparent -->
      <div
        class="fixed top-0 left-0 right-0 z-[100] flex justify-center transition-[padding] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        :class="isScrolled ? 'px-4 py-2' : 'px-0 py-0'"
      >
        <!-- Pill: visual layer — animates max-width, bg, border, radius, shadow -->
        <div
          class="w-full transition-[max-width,background-color,border-color,border-radius,box-shadow] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          :class="pillClasses"
          @mouseenter="onNavEnter"
          @mouseleave="onNavLeave"
        >
          <!-- DS Navbar: content shell only, no sticky, no visual overrides -->
          <Navbar
            variant="transparent"
            :sticky="false"
            :border="false"
            class="!px-5 !max-w-full"
          >
  ```

- [ ] **Step 2: Close the two new divs before the mobile drawer**

  Find the closing `</Navbar>` tag (currently followed by `</div>` for `shared-navbar-root` and the mobile drawer transition):

  ```html
      </Navbar>

    <!-- ── Mobile drawer ───────────────────────────────────────────────────── -->
  ```

  Replace with:
  ```html
          </Navbar>
        </div>
      </div>

      <!-- Spacer: prevents page content sliding under the fixed nav -->
      <div class="h-[72px]" aria-hidden="true" />

    <!-- ── Mobile drawer ───────────────────────────────────────────────────── -->
  ```

- [ ] **Step 3: Verify the full template compiles and renders in browser**

  Open `http://localhost:5173`. You should see:
  - Hero state: full-width transparent navbar with white text
  - Scroll down >80px: navbar pill shrinks to center, white background appears, padding animates

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/landing/SharedNavbar.vue
  git commit -m "feat(navbar): restructure template to fixed outer + animated pill + spacer"
  ```

---

### Task 3: Visual QA — verify all three states

**Files:**
- No code changes — this is a verification task

- [ ] **Step 1: Check Hero state (scrollY = 0)**

  Open `http://localhost:5173`. Without scrolling:
  - Navbar spans full width
  - Background is transparent (hero image/color shows through)
  - Text and logo are white
  - "Login" button has white outline style
  - "Buat Undangan" button is dark/filled

- [ ] **Step 2: Check Scrolled state (scrollY > 80)**

  Scroll down past 80px:
  - Pill shrinks smoothly to ~720px centered — animation takes ~500ms
  - White background, border, and shadow-sm appear
  - Text and logo change to dark color
  - Outer padding `py-2 px-4` gives a small floating gap from top
  - "Login" button switches to standard outline
  - "Buat Undangan" button switches to primary variant

- [ ] **Step 3: Check Mega menu state (hover Template while scrolled)**

  While scrolled, hover over "Template" nav item:
  - Pill bottom corners flatten to 0 radius (`rounded-t-[20px]` only)
  - Mega menu panel drops below pill flush (no gap, connected appearance)
  - Shadow disappears from pill (shadow-none)
  - Mega menu has its own shadow (`shadow-[0_16px_40px_rgba(0,0,0,0.12)]`)

- [ ] **Step 4: Check mobile (resize to <768px)**

  - Hamburger icon visible, nav links hidden
  - Tap hamburger → mobile drawer opens at correct position below navbar
  - Pill behavior is desktop-only (mobile still uses full-width)

- [ ] **Step 5: Check transition smoothness**

  Scroll slowly past the 80px threshold. The transition should feel smooth — no jump, no flicker. The `max-width` shrinks while `padding` on the outer div increases simultaneously, keeping the pill visually centered during the animation.

- [ ] **Step 6: Commit if any minor tweaks were made**

  ```bash
  git add src/components/landing/SharedNavbar.vue
  git commit -m "fix(navbar): visual QA tweaks"
  ```

  (Skip this step if no changes were needed.)

---

## Self-Review

**Spec coverage:**
- ✅ Three states (hero / scrolled / mega) — covered in Task 1 `pillClasses`
- ✅ Outer fixed `px-4 py-2` padding transition — covered in Task 2
- ✅ Scroll threshold `80` — covered in Task 1
- ✅ Spacer `h-[72px]` — covered in Task 2
- ✅ `@mouseenter`/`@mouseleave` move from Navbar to pill — covered in Task 2
- ✅ Navbar DS `:sticky="false"`, no visual overrides — covered in Task 2
- ✅ Mega menu unchanged (HTML, animation, panel) — nothing touches it
- ✅ Mobile drawer unchanged — nothing touches it
- ✅ `bgActive` unchanged — drives text colors, button variants as before

**Placeholder scan:** No TBDs, no "similar to Task N" patterns, all code is complete.

**Type consistency:** `pillClasses` is a computed returning `string`, used in `:class="pillClasses"` — consistent across both tasks.
