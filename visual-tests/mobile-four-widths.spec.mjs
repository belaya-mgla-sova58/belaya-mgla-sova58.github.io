import { test, expect } from '@playwright/test';

// Regression suite for the real mobile Chromium browser served from the checked-out site.
// No forms are submitted and no like, view or comment buttons are pressed.
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
    test(`Основные страницы без горизонтального переполнения при ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 844 });

      for (const item of pages) {
        const response = await page.goto(item.url, { waitUntil: 'domcontentloaded' });
        expect(response?.status(), `${item.label}: HTTP status`).toBe(200);
        await expect(page.locator('main#appMain')).toBeVisible();

        const metrics = await page.evaluate(() => {
          const nav = document.querySelector('nav.mobile-bottom-v424');
          const links = nav ? [...nav.querySelectorAll(':scope > a')] : [];
          const bar = nav?.getBoundingClientRect();
          return {
            viewport: document.documentElement.clientWidth,
            docWidth: document.documentElement.scrollWidth,
            bodyWidth: document.body.scrollWidth,
            navLinks: links.length,
            navBox: bar ? { left: bar.left, right: bar.right, height: bar.height } : null,
            navVisible: Boolean(nav && getComputedStyle(nav).display !== 'none'),
            linksInViewport: links.every(a => {
              const b = a.getBoundingClientRect();
              return b.width >= 30 && b.left >= -2 && b.right <= innerWidth + 2;
            }),
          };
        });

        expect(metrics.docWidth - metrics.viewport,
          `${item.label} (${width}px): document overflow, metrics=${JSON.stringify(metrics)}`)
          .toBeLessThanOrEqual(16);
        expect(metrics.bodyWidth - metrics.viewport,
          `${item.label} (${width}px): body overflow`).toBeLessThanOrEqual(16);
        expect(metrics.navLinks, `${item.label}: number of mobile tabs`).toBe(5);
        expect(metrics.navVisible, `${item.label}: bottom nav visible`).toBe(true);
        expect(metrics.linksInViewport, `${item.label}: tab links inside screen`).toBe(true);
        expect(metrics.navBox?.left, `${item.label}: nav left edge`).toBeGreaterThanOrEqual(-2);
        expect(metrics.navBox?.right, `${item.label}: nav right edge`).toBeLessThanOrEqual(width + 2);

        if (item.url === '/index.html') {
          const header = page.locator('img.home-stamped-img-v441').first();
          await expect(header).toHaveAttribute('src', 'belaya_mgla_new_header_2048.webp');
          const size = await header.evaluate(el => ({
            naturalWidth: el.naturalWidth,
            naturalHeight: el.naturalHeight,
            rect: el.getBoundingClientRect().toJSON(),
          }));
          expect(size.naturalWidth, 'Homepage banner must load').toBeGreaterThan(0);
          expect(size.naturalHeight, 'Homepage banner must load').toBeGreaterThan(0);
          expect(size.rect.width, 'Homepage banner stays within screen').toBeLessThanOrEqual(width + 2);
        }
      }
      await testInfo.attach(`mobile-${width}-passed.txt`, {
        body: `Verified ${pages.map(x => x.label).join(', ')} at ${width}px`,
        contentType: 'text/plain',
      });
    });
  }
});
