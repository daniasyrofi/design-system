<template>
  <div class="welcome-container">
    <div class="sb-section-title">
      <h1
        class="ds-text-display"
        style="color: var(--color-text-heading); margin-bottom: var(--spacing-6)"
      >
        {{ $t('welcome.welcome_title') }}
      </h1>
      <p
        class="ds-text-body-lg"
        style="color: var(--color-text-secondary); margin-bottom: var(--spacing-5)"
      >
        {{ $t('welcome.welcome_subtitle') }}
      </p>
      <p class="ds-text-body-lg" style="color: var(--color-text-secondary)">
        {{ $t('welcome.welcome_tech') }}
      </p>
    </div>

    <div class="sb-section">
      <div class="sb-section-item">
        <h4
          class="ds-text-h4"
          style="color: var(--color-text-heading); margin-bottom: var(--spacing-3)"
        >
          🎨 {{ $t('welcome.visual_title') }}
        </h4>
        <p
          class="ds-text-body"
          style="color: var(--color-text-secondary)"
          v-html="$t('welcome.visual_desc')"
        ></p>
      </div>

      <div class="sb-section-item">
        <h4
          class="ds-text-h4"
          style="color: var(--color-text-heading); margin-bottom: var(--spacing-3)"
        >
          🌐 {{ $t('welcome.i18n_title') }}
        </h4>
        <p
          class="ds-text-body"
          style="color: var(--color-text-secondary)"
          v-html="$t('welcome.i18n_desc')"
        ></p>
      </div>
    </div>

    <div class="sb-section-title" style="margin-top: var(--spacing-12)">
      <h2 class="ds-text-h1" style="color: var(--color-text-heading); margin-bottom: var(--spacing-6)">
        {{ $t('welcome.guide_title') }}
      </h2>
    </div>

    <div class="sb-features-grid">
      <div class="sb-grid-item">
        <h4
          class="ds-text-h4"
          style="color: var(--color-text-heading); margin-bottom: var(--spacing-2)"
        >
          1. {{ $t('welcome.atomic_title') }}
        </h4>
        <p
          class="ds-text-body"
          style="color: var(--color-text-secondary)"
          v-html="$t('welcome.atomic_desc')"
        ></p>
      </div>

      <div class="sb-grid-item">
        <h4
          class="ds-text-h4"
          style="color: var(--color-text-heading); margin-bottom: var(--spacing-2)"
        >
          2. {{ $t('welcome.controls_title') }}
        </h4>
        <p
          class="ds-text-body"
          style="color: var(--color-text-secondary)"
          v-html="$t('welcome.controls_desc')"
        ></p>
      </div>

      <div class="sb-grid-item">
        <h4
          class="ds-text-h4"
          style="color: var(--color-text-heading); margin-bottom: var(--spacing-2)"
        >
          3. {{ $t('welcome.theme_title') }}
        </h4>
        <p
          class="ds-text-body"
          style="color: var(--color-text-secondary)"
          v-html="$t('welcome.theme_desc')"
        ></p>
      </div>

      <div class="sb-grid-item">
        <h4
          class="ds-text-h4"
          style="color: var(--color-text-heading); margin-bottom: var(--spacing-2)"
        >
          4. {{ $t('welcome.a11y_title') }}
        </h4>
        <p
          class="ds-text-body"
          style="color: var(--color-text-secondary)"
          v-html="$t('welcome.a11y_desc')"
        ></p>
      </div>
    </div>
  </div>
</template>

<style>
.welcome-container {
  max-width: 760px;
  margin: 0 auto;
  padding: var(--spacing-16) var(--spacing-6);
  font-family: var(--font-ui), sans-serif;
  color: var(--color-text-primary);
}

.sb-section-title {
  margin-bottom: var(--spacing-12);
}

.sb-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  margin-top: var(--spacing-12);
  margin-bottom: var(--spacing-16);
}

.sb-section-item {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-8);
  background: var(--color-bg-subtle);
  border-radius: var(--spacing-4);
  border: 1px solid var(--color-border);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.sb-section-item:hover {
  background: var(--color-surface);
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-sm);
}

/* Target the code elements generically since they are injected via v-html */
.welcome-container code {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  padding: 2px 6px;
  border-radius: 6px;
  font-family: var(--font-mono), monospace;
  font-size: 0.85em;
  color: var(--color-primary);
}

.sb-features-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.sb-grid-item {
  padding-left: var(--spacing-5);
  border-left: 3px solid var(--color-border-strong);
  transition: border-color 0.2s ease;
}

.sb-grid-item:hover {
  border-left-color: var(--color-primary);
}

@media screen and (max-width: 768px) {
  .welcome-container {
    padding: var(--spacing-8) var(--spacing-4);
  }
}
</style>
