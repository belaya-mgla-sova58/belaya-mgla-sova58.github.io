import { test, expect } from '@playwright/test';

// Mobile browser regression: each page and width gets its own independent result.
// Tests never submit forms or touch comments, likes, views or game data.
const widths = [320, 375, 390, 430];
const pages = [
  { url: '/index.html', label: 'Главная' },
  { url: '/events.html', label: 'События' },
  { url: '/news.html', label: 'Новости' },
  { url: '/bear.html', label: 'Медведь' },
  { url: '/canyon-clash.html', label: 'Каньон' },
  { url: '/research.html', label: 'Исследования' },
  { url: '/fire-furnace-calculator.html', label: 'Огненная топка' },
  { url: '/essence-mithril-calculator.html', label: 'Эссенция и мифрил' },
];

test.describe('Мобильная вёрстка 320–430px', () => {
  test.skip(({ isMobile }) => !isMobile, 'Запускаем только в мобильном Chromium');

  for (const width of widths) {
    for (const item of pages) {
      test(`${item.label}: экран ${width}px`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height: 844 });
        const response = await page.goto(item.url, { waitUntil: 'domcontentloaded' });
        expect(response?.status(), `${item.label}: HTTP status`).toBe(200);
        await expect(page.locator('main#appMain')).toBeVisible();
        await page.evaluate(() => document.fonts.ready);

        if (item.url === '/index.html') {
          const header = page.locator('img.home-stamped-img-v441').first();
          await expect(header).toHaveAttribute('src', 'belaya_mgla_new_header_2048.webp');
          await expect.poll(
            () => header.evaluate(el => el.complete && el.naturalWidth > 0),
            { message: 'Главная шапка должна загрузиться' }
          ).toBe(true);
          const box = await header.boundingBox();
          expect(box?.width, 'Шапка не выходит за экран').toBeLessThanOrEqual(width + 2);
        }

        // Preserve visual evidence independently for every mobile page.
        await testInfo.attach('mobile-full-page.png', {
          body: await page.screenshot({ fullPage: true, animations: 'disabled' }),
          contentType: 'image/png',
        });

        const metrics = await page.evaluate(() => {
          const nav = document.querySelector('nav.mobile-bottom-v424');
          const links = nav ? [...nav.querySelectorAll(':scope > a')] : [];
          const rect = nav?.getBoundingClientRect();
          const visible = Boolean(nav && getComputedStyle(nav).display !== 'none');
          return {
            scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
            viewport: document.documentElement.clientWidth,
            docWidth: document.documentElement.scrollWidth,
            bodyWidth: document.body.scrollWidth,
            navLinks: links.length,
            navVisible: visible,
            navBox: rect ? { left: rect.left, right: rect.right } : null,
            linksInViewport: links.every(a => {
              const b = a.getBoundingClientRect();
              return b.width >= 30 && b.left >= -2 && b.right <= innerWidth + 2;
            }),
          };
        });
        await testInfo.attach('mobile-layout-diagnostics.json', {
          body: JSON.stringify({ page: item.url, width, ...metrics }, null, 2),
          contentType: 'application/json',
        });

        expect(metrics.scrollBehavior, 'На телефоне прокрутка не должна быть принудительно плавной').toBe('auto');
        expect(metrics.docWidth - metrics.viewport, `Горизонтальная прокрутка: ${item.label} ${width}px`)
          .toBeLessThanOrEqual(16);
        expect(metrics.bodyWidth - metrics.viewport, `Переполнение body: ${item.label} ${width}px`)
          .toBeLessThanOrEqual(16);
        expect(metrics.navLinks, 'В нижнем меню должно быть пять ссылок').toBe(5);
        expect(metrics.navVisible, 'Нижнее меню должно быть видно').toBe(true);
        expect(metrics.linksInViewport, 'Все кнопки меню должны помещаться').toBe(true);
        expect(metrics.navBox?.left, 'Левый край меню').toBeGreaterThanOrEqual(-2);
        expect(metrics.navBox?.right, 'Правый край меню').toBeLessThanOrEqual(width + 2);
      });
    }
  }
});
