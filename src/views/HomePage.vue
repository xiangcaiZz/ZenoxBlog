<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import BlogCard from '@/components/BlogCard.vue'
import PageFooter from '@/components/PageFooter.vue'
import { articles } from '@/data/articles'
</script>

<template>
  <div class="home">
    <NavBar />

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__stars" aria-hidden="true"></div>
      <div class="hero__inner">
        <div class="hero__accent-line"></div>
        <p class="hero__overline">欢迎来到 Zenox</p>
        <h1 class="hero__title">探索<br />未知</h1>
        <p class="hero__subtitle">
          一份关于技术、设计与软件工艺的个人日志——在代码与创意交汇的边界航行。
        </p>
        <div class="hero__actions">
          <a href="#" class="hero__btn hero__btn--primary">
            阅读文章
            <span class="hero__btn-arrow">&darr;</span>
          </a>
          <a href="#" class="hero__btn hero__btn--secondary"> 了解更多 </a>
        </div>
      </div>
    </section>

    <!-- Featured Section -->
    <section class="featured">
      <div class="featured__inner">
        <div class="section-header">
          <span class="section-header__line"></span>
          <span class="section-header__label">最新文章</span>
        </div>

        <div class="featured__grid">
          <BlogCard
            v-for="post in articles"
            :key="post.slug"
            :slug="post.slug"
            :title="post.title"
            :excerpt="post.excerpt"
            :date="post.date"
            :category="post.category"
            :read-time="post.readTime"
          />
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter">
      <div class="newsletter__inner">
        <div class="newsletter__accent-line"></div>
        <h2 class="newsletter__title">保持关注</h2>
        <p class="newsletter__desc">
          新文章直达你的邮箱。没有垃圾邮件，只有关于技术与设计的深度思考。
        </p>
        <form class="newsletter__form" @submit.prevent>
          <input
            type="email"
            placeholder="输入你的邮箱"
            class="newsletter__input"
            aria-label="邮箱地址"
          />
          <button type="submit" class="newsletter__submit">订阅</button>
        </form>
      </div>
    </section>

    <PageFooter />
  </div>
</template>

<style scoped>
/* ===== Hero ===== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 40px 80px;
  overflow: hidden;
}

.hero__stars {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 10% 15%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 25% 35%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1.5px 1.5px at 40% 55%, rgba(255, 255, 255, 0.5), transparent),
    radial-gradient(1px 1px at 55% 20%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 65% 70%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1.5px 1.5px at 75% 40%, rgba(255, 255, 255, 0.5), transparent),
    radial-gradient(1px 1px at 85% 25%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 90% 60%, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1px 1px at 15% 80%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1.5px 1.5px at 50% 85%, rgba(255, 255, 255, 0.45), transparent),
    radial-gradient(1px 1px at 30% 45%, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1px 1px at 70% 10%, rgba(255, 255, 255, 0.3), transparent);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  max-width: 800px;
}

.hero__accent-line {
  width: 60px;
  height: 1.5px;
  background: var(--color-accent);
  margin: 0 auto 28px;
  box-shadow: 0 0 12px var(--color-accent-glow);
}

.hero__overline {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: 0.04em;
  color: var(--color-text-primary);
  margin-top: 16px;
  text-transform: uppercase;
}

.hero__subtitle {
  max-width: 560px;
  margin: 24px auto 0;
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.hero__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.hero__btn {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 14px 32px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.hero__btn--primary {
  background: rgba(0, 200, 232, 0.1);
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
}

.hero__btn--primary:hover {
  background: rgba(0, 200, 232, 0.18);
  box-shadow: 0 0 28px var(--color-accent-glow), inset 0 0 28px rgba(0, 200, 232, 0.04);
}

.hero__btn--secondary {
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.hero__btn--secondary:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.03);
}

/* ===== Featured / Grid ===== */
.featured {
  padding: 80px 40px 100px;
}

.featured__inner {
  max-width: var(--max-width);
  margin: 0 auto;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
}

.section-header__line {
  display: block;
  width: 32px;
  height: 1px;
  background: var(--color-accent);
  box-shadow: 0 0 8px var(--color-accent-glow);
}

.section-header__label {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

@media (max-width: 1024px) {
  .featured__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 100px 24px 60px;
  }

  .hero__actions {
    flex-direction: column;
    gap: 12px;
  }

  .hero__btn {
    width: 100%;
    justify-content: center;
    padding: 12px 24px;
  }

  .featured {
    padding: 60px 24px 80px;
  }

  .featured__grid {
    grid-template-columns: 1fr;
  }
}

/* ===== Newsletter ===== */
.newsletter {
  padding: 80px 40px;
}

.newsletter__inner {
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
  padding: 56px 48px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  border-radius: 2px;
}

.newsletter__accent-line {
  width: 40px;
  height: 1.5px;
  background: var(--color-accent);
  margin: 0 auto 24px;
  box-shadow: 0 0 10px var(--color-accent-glow);
}

.newsletter__title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.newsletter__desc {
  margin-top: 12px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.newsletter__form {
  display: flex;
  gap: 0;
  margin-top: 28px;
}

.newsletter__input {
  flex: 1;
  padding: 14px 16px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--color-border);
  border-right: none;
  outline: none;
  transition: border-color 0.3s ease;
}

.newsletter__input::placeholder {
  color: var(--color-text-muted);
}

.newsletter__input:focus {
  border-color: var(--color-accent);
}

.newsletter__submit {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-bg-primary);
  background: var(--color-accent);
  padding: 14px 24px;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.newsletter__submit:hover {
  background: #00e0ff;
  box-shadow: 0 0 24px var(--color-accent-glow);
}

@media (max-width: 640px) {
  .newsletter {
    padding: 60px 24px;
  }

  .newsletter__inner {
    padding: 40px 24px;
  }

  .newsletter__form {
    flex-direction: column;
    gap: 0;
  }

  .newsletter__input {
    border-right: 1px solid var(--color-border);
    border-bottom: none;
  }
}
</style>
