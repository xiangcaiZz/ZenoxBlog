<script setup lang="ts">
import PageFooter from '@/components/PageFooter.vue'
</script>

<template>
  <div class="resume-page">
    <section class="resume-hero">
      <div class="resume-hero__inner">
        <div class="resume-hero__accent-line"></div>
        <h1 class="resume-hero__title">个人简历</h1>
        <p class="resume-hero__subtitle">即将上线，敬请期待</p>
      </div>
    </section>

    <section class="resume-body">
      <div class="resume-body__inner">
        <div class="resume-body__placeholder">
          <div class="resume-body__accent-line"></div>
          <p class="resume-body__text">简历内容正在建设中…</p>
        </div>
      </div>
    </section>

    <PageFooter />
  </div>
</template>

<style scoped>
.resume-page {
  min-height: 100vh;
}

.resume-hero {
  padding: 160px 40px 64px;
  text-align: center;
}

.resume-hero__inner {
  max-width: 720px;
  margin: 0 auto;
}

.resume-hero__accent-line {
  width: 48px;
  height: 1.5px;
  background: var(--color-accent);
  margin: 0 auto 24px;
  box-shadow: 0 0 10px var(--color-accent-glow);
}

.resume-hero__title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.resume-hero__subtitle {
  margin-top: 12px;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.resume-body {
  padding: 0 40px 100px;
}

.resume-body__inner {
  max-width: var(--max-width);
  margin: 0 auto;
}

.resume-body__placeholder {
  text-align: center;
  padding: 80px 40px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
}

.resume-body__accent-line {
  width: 32px;
  height: 1px;
  background: var(--color-accent);
  margin: 0 auto 20px;
  box-shadow: 0 0 6px var(--color-accent-glow);
}

.resume-body__text {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

@media (max-width: 640px) {
  .resume-hero {
    padding: 120px 24px 48px;
  }

  .resume-body {
    padding: 0 24px 60px;
  }

  .resume-body__placeholder {
    padding: 60px 24px;
  }
}
</style>
