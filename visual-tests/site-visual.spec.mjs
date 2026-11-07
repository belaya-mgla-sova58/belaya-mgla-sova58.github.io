import { test, expect } from '@playwright/test';

// Important pages: extend this table when a new major section is added.
const pages = [
  ['Главная', 'index.html'],
  ['События', 'events.html'],
  ['Герои', 'hero-generations.html'],
  ['Эксперты', 'experts.html'],
  ['Питомцы', 'pets.html'],
  ['Калькуляторы', 'calculators.html'],
  ['Эссенция и мифрил', 'essence-mithril-calculator.html'],
  ['Охота на медведя', 'bear-helper.html'],
  ['Новости RU', 'news-ru.html'],
  ['База знаний', 'other.html'],
  ['Бесконечное испытание', 'endless-trial.html'],
];

for (const [name, path] of pages) {
  test(`${name}: загрузка и визуальный осмотр`, async ({ page }, testInfo) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));

    const response = await page.goto(`/${path}`, { waitUntil: 'domcontentloaded' });
    expect(response, `Нет HTTP-ответа для ${path}`).not.toBeNull();
    expect(response.status(), `HTTP-статус ${path}`).toBe(200);

    await page.locator('body').waitFor({ state: 'visible' });
    await page.waitForLoadState('load', { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(600);

    // Prevent an old homepage script from replacing the preloaded hero.
    if (path === 'index.html') {
      const hero = page.locator('.home-stamped-hero-v441 img.home-stamped-img-v441');
      await expect(hero, 'На главной должен быть оригинальный утверждённый баннер').toHaveAttribute(
        'src', 'assets/home-hero-polish-v447.webp'
      );
    }

    const diagnostics = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth;
      const horizontalOverflowPx = Math.max(0, document.documentElement.scrollWidth - viewportWidth);
      const brokenImagesInViewport = [...document.images]
        .filter((img) => {
          const rect = img.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 &&
            rect.bottom > 0 && rect.top < window.innerHeight &&
            img.complete && !!img.currentSrc && img.naturalWidth === 0;
        })
        .map((img) => img.currentSrc)
        .slice(0, 15);
      return {
        title: document.title,
        bodyTextLength: (document.body.innerText || '').trim().length,
        horizontalOverflowPx,
        brokenImagesInViewport,
      };
    });

    // Both screenshots are saved even when the layout assertion fails.
    await page.screenshot({ path: testInfo.outputPath('01-top.png'), animations: 'disabled' });
    await page.evaluate(() => window.scrollTo(0, Math.min(900, document.documentElement.scrollHeight - window.innerHeight)));
    await page.waitForTimeout(350);
    await page.screenshot({ path: testInfo.outputPath('02-scrolled.png'), animations: 'disabled' });

    await testInfo.attach('visual-diagnostics.json', {
      body: Buffer.from(JSON.stringify({ page: path, project: testInfo.project.name, ...diagnostics, pageErrors: errors }, null, 2)),
      contentType: 'application/json',
    });

    expect(diagnostics.bodyTextLength, `Похоже, ${path} отображается пустой`).toBeGreaterThan(60);
    expect(diagnostics.horizontalOverflowPx, `Горизонтальная прокрутка на ${path} (${testInfo.project.name})`)
      .toBeLessThanOrEqual(16);
  });
}
