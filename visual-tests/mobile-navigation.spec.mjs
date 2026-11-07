import { test, expect } from '@playwright/test';

// Real mobile journeys. No calculator data is submitted or modified.
test.describe('Мобильная навигация и калькуляторы', () => {
  test.skip(({ isMobile }) => !isMobile, 'Проверяем сенсорный мобильный профиль');

  for (const width of [390, 360]) {
    test(`Калькуляторы: ссылки, нажатия и ширина экрана ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 780 });
      const response = await page.goto('/calculators.html', { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);
      const cards = page.locator('a.calc-hub-card');
      await expect(cards).toHaveCount(4);

      const expectedPaths = [
        'bear-helper.html',
        'furnace-calculator.html',
        'fire-furnace-calculator.html',
        'essence-mithril-calculator.html',
      ];
      for (const path of expectedPaths) {
        // The card itself is the link, so find it by href directly.
        const link = page.locator(`a.calc-hub-card[href="${path}"]`);
        await expect(link).toHaveCount(1);
        await expect(link).toBeVisible();
        expect(await link.evaluate(el => el.getBoundingClientRect().width)).toBeGreaterThan(80);
      }

      const mobileNav = page.locator('nav.mobile-bottom-v424');
      await expect(mobileNav).toBeVisible();
      const navLinks = mobileNav.locator('a');
      await expect(navLinks).toHaveCount(5);
      for (const link of await navLinks.all()) {
        const box = await link.boundingBox();
        expect(box, 'Ссылка нижнего меню должна иметь область нажатия').not.toBeNull();
        expect(box.width).toBeGreaterThanOrEqual(40);
        expect(box.height).toBeGreaterThanOrEqual(36);
      }

      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, 'На мобильном экране не должно быть горизонтальной прокрутки').toBeLessThanOrEqual(16);

      await page.locator('a.calc-hub-card[href="essence-mithril-calculator.html"]').tap();
      await expect(page).toHaveURL(/\/essence-mithril-calculator\.html$/);
      await expect(page.locator('body')).toBeVisible();
      const textLength = await page.locator('body').evaluate(el => el.innerText.trim().length);
      expect(textLength).toBeGreaterThan(120);
    });

    test(`Нижняя навигация: переход к главной на экране ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 780 });
      await page.goto('/calculators.html', { waitUntil: 'domcontentloaded' });
      const homeLink = page.locator('nav.mobile-bottom-v424 a[href="index.html"]');
      await expect(homeLink).toBeVisible();
      // Consent dialog legitimately overlays the mobile bar for first-time visitors.
      // Decline analytics through its real UI before testing navigation.
      const consent = page.locator('#sova-metrika-consent');
      if (await consent.isVisible()) {
        await page.locator('#sova-metrika-decline').click();
        await expect(consent).toBeHidden();
      }
      // The homepage can delay the full load event while decorative assets load.
      // Confirm the actual user navigation as soon as DOMContentLoaded fires.
      await Promise.all([
        page.waitForURL(new RegExp('/index[.]html$'), { waitUntil: 'domcontentloaded', timeout: 15000 }),
        homeLink.tap({ noWaitAfter: true, timeout: 10000 }),
      ]);
      await expect(page.locator('.home-stamped-hero-v441 img.home-stamped-img-v441'))
        .toHaveAttribute('src', 'assets/home-hero-polish-v447.webp');
    });
  }
  // Check every calculator destination separately to pinpoint broken links.
  for (const destination of [
    'bear-helper.html',
    'furnace-calculator.html',
    'fire-furnace-calculator.html',
    'essence-mithril-calculator.html',
  ]) {
    test(`Карточка калькулятора открывается: ${destination}`, async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 780 });
      await page.goto('/calculators.html', { waitUntil: 'domcontentloaded' });
      const link = page.locator(`a.calc-hub-card[href="${destination}"]`);
      await expect(link).toBeVisible();
      await link.tap();
      await expect(page).toHaveURL(new RegExp('/' + destination.replaceAll('.', '\\.') + '$'));
      await expect(page.locator('body')).toBeVisible();
      const stats = await page.evaluate(() => ({
        textLength: document.body.innerText.trim().length,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      }));
      expect(stats.textLength).toBeGreaterThan(100);
      expect(stats.overflow).toBeLessThanOrEqual(16);
    });
  }

});
