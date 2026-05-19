<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__top">
        <div class="footer__brand">
          <span class="footer__logo">&#9670; ZENOX</span>
          <p class="footer__tagline">Exploring ideas at the frontier of technology and design.</p>
        </div>

        <div class="footer__columns">
          <div class="footer__col">
            <h4 class="footer__col-title">Navigate</h4>
            <a href="#" class="footer__link">Articles</a>
            <a href="#" class="footer__link">Categories</a>
            <a href="#" class="footer__link">About</a>
          </div>
          <div class="footer__col">
            <h4 class="footer__col-title">Connect</h4>
            <a href="#" class="footer__link">GitHub</a>
            <a href="#" class="footer__link">Twitter</a>
            <a href="#" class="footer__link">RSS</a>
          </div>
        </div>
      </div>

      <div class="footer__divider"></div>

      <div class="footer__bottom">
        <span>&copy; 2026 Zenox Blog. All rights reserved.</span>
        <span>Designed with the spirit of exploration.</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  background: rgba(2, 7, 16, 0.6);
}

.footer__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 64px 40px 32px;
}

.footer__top {
  display: flex;
  justify-content: space-between;
  gap: 48px;
  flex-wrap: wrap;
}

.footer__brand {
  max-width: 280px;
}

.footer__logo {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--color-text-primary);
}

.footer__tagline {
  margin-top: 12px;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.footer__columns {
  display: flex;
  gap: 64px;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__col-title {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 4px;
}

.footer__link {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  transition: color 0.3s ease;
}

.footer__link:hover {
  color: var(--color-text-primary);
}

.footer__divider {
  margin: 40px 0 24px;
  height: 1px;
  background: var(--color-border);
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--color-text-muted);
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 768px) {
  .footer__inner {
    padding: 48px 24px 24px;
  }

  .footer__top {
    flex-direction: column;
    gap: 36px;
  }

  .footer__columns {
    gap: 48px;
  }

  .footer__bottom {
    flex-direction: column;
  }
}
</style>
