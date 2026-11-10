import { test, expect } from '@playwright/test';

test.describe('Широкие гайды в версии ПК и компьютерном виде на телефоне', () => {
  test('ПК: Торговый путь занимает рабочую ширину и разбит на карточки', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop');
    await page.goto('/tundra-trade-route.html', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body.bm-guide-editorial-v1092')).toHaveCount(1);
    const cards = page.locator('.tundra-route-guide.bm-guide-topic-grid-v1092 > .bm-guide-topic-card-v1092');
    await expect(cards).toHaveCount(18);
    const metrics = await page.evaluate(() => {
      const route = document.querySelector('main#appMain > .route-page.active');
      const section = document.querySelector('.tundra-route-guide');
      const leftCard = document.querySelector('.bm-guide-topic-card-v1092');
      const menu = document.querySelector('.nav-wrap');
      return {
        screen: document.documentElement.clientWidth,
        route: route.getBoundingClientRect().width,
        section: section.getBoundingClientRect().width,
        card: leftCard.getBoundingClientRect().width,
        menu: menu.getBoundingClientRect().width,
        columns: getComputedStyle(section).gridTemplateColumns.split(' ').length,
      };
    });
    console.log('DESKTOP-GUIDE-LAYOUT', JSON.stringify(metrics));
    expect(metrics.section).toBeGreaterThan(metrics.route * .85);
    expect(metrics.card).toBeGreaterThan(320);
    expect(metrics.menu).toBeLessThanOrEqual(190);
    expect(metrics.columns).toBe(2);
  });

  test('Телефон в компьютерном виде: полная ширина статьи и компактное меню', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile');
    await page.addInitScript(() => {
      localStorage.setItem('sova58-view-mode-v622', 'desktop');
    });
    await page.goto('/tundra-trade-route.html', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html.force-desktop-root')).toHaveCount(1);
    await expect(page.locator('body.bm-guide-editorial-v1092')).toHaveCount(1);
    const cards = page.locator('.tundra-route-guide.bm-guide-topic-grid-v1092 > .bm-guide-topic-card-v1092');
    await expect(cards).toHaveCount(18);
    const button = page.locator('.view-mode-side-v629');
    await expect(button).toBeVisible();
    await button.click();
    const metrics = await page.evaluate(() => {
      const route = document.querySelector('main#appMain > .route-page.active');
      const section = document.querySelector('.tundra-route-guide');
      const nav = document.querySelector('.nav-wrap');
      const button = document.querySelector('.view-mode-side-v629');
      return {
        viewport: document.documentElement.clientWidth,
        route: route.getBoundingClientRect().width,
        section: section.getBoundingClientRect().width,
        nav: nav.getBoundingClientRect().width,
        buttonLeft: button.getBoundingClientRect().left,
        columns: getComputedStyle(section).gridTemplateColumns.split(' ').length,
        mobileBottom: getComputedStyle(document.querySelector('.mobile-bottom-v424')).display,
      };
    });
    console.log('TOUCH-COMPUTER-GUIDE-LAYOUT', JSON.stringify(metrics));
    expect(metrics.section).toBeGreaterThan(metrics.viewport * .78);
    expect(metrics.route).toBeGreaterThan(metrics.viewport * .78);
    expect(metrics.nav).toBeLessThanOrEqual(185);
    expect(metrics.columns).toBe(2);
    expect(metrics.mobileBottom).toBe('none');
  });

  test('Телефон в обычном режиме: гайды не перестраиваются в ПК-сетку', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile');
    await page.addInitScript(() => localStorage.setItem('sova58-view-mode-v622', 'mobile'));
    await page.goto('/tundra-trade-route.html', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.tundra-route-guide.bm-guide-topic-grid-v1092')).toHaveCount(0);
    await expect(page.locator('body.bm-guide-editorial-v1092')).toHaveCount(0);
  });
});
