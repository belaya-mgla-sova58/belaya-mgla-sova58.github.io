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

        if (['/bear.html', '/canyon-clash.html', '/research.html'].includes(item.url)) {
          const sample = page.locator(
            item.url === '/bear.html' ? '.bear-explain-body p' :
            item.url === '/canyon-clash.html' ? '.canyon-wrap .guide-section p' :
            '.guide-fold-body-v414 p'
          ).first();
          await expect(sample, 'В гайде должен быть текст для чтения').toBeVisible();
          const typography = await sample.evaluate(element => ({
            fontSize: Number.parseFloat(getComputedStyle(element).fontSize),
            lineHeight: Number.parseFloat(getComputedStyle(element).lineHeight),
          }));
          expect(typography.fontSize, 'Текст мобильного гайда не меньше 15px').toBeGreaterThanOrEqual(15);
          expect(typography.lineHeight, 'Межстрочный интервал для чтения').toBeGreaterThanOrEqual(24);
        }

        if (['/bear.html', '/canyon-clash.html', '/research.html'].includes(item.url)) {
          await page.evaluate(() => window.scrollTo({ top: 800, behavior: 'instant' }));
          await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(550);
          const backToTop = page.locator('#backToTop');
          await expect(backToTop, 'Кнопка наверх появляется после прокрутки').toHaveClass(/show/);
          await backToTop.click();
          await expect.poll(() => page.evaluate(() => window.scrollY), {
            message: 'Кнопка наверх возвращает к началу страницы',
          }).toBeLessThan(8);
        }

        if (item.url === '/events.html') {
          const eventDetails = page.locator('details:has(.event-group-grid-v522)').first();
          await eventDetails.evaluate(element => { element.open = true; });
          const eventGrid = page.locator('.event-group-grid-v522').first();
          await expect(eventGrid).toBeVisible();
          const eventLayout = await eventGrid.evaluate(element => {
            const gridStyle = getComputedStyle(element);
            const image = element.querySelector('.guide-nav-card img');
            const imageStyle = image && getComputedStyle(image);
            const description = element.closest('.event-group-v522')?.querySelector('.event-group-copy-v522 p');
            const descStyle = description && getComputedStyle(description);
            return {
              columns: gridStyle.gridTemplateColumns,
              gridWidth: element.getBoundingClientRect().width,
              cardWidth: element.querySelector('.guide-nav-card')?.getBoundingClientRect().width,
              imageFit: imageStyle?.objectFit,
              descriptionDisplay: descStyle?.display,
              descriptionFont: descStyle ? Number.parseFloat(descStyle.fontSize) : 0,
            };
          });
          expect(eventLayout.descriptionDisplay, 'Описание группы событий не скрыто').not.toBe('none');
          expect(eventLayout.descriptionFont, 'Описание группы событий читаемо').toBeGreaterThanOrEqual(12);
          expect(eventLayout.cardWidth, 'Карточка события должна занимать доступную ширину').toBeGreaterThan(width * 0.65);
          expect(eventLayout.imageFit, 'Изображение события без обрезки').toBe('contain');
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
            navLabelSizes: links.map(a => Number.parseFloat(getComputedStyle(a.querySelector('b') || a).fontSize)),
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
        expect(metrics.navLabelSizes.every(size => size >= 11), 'Подписи нижнего меню должны быть не меньше 11px').toBe(true);
        expect(metrics.navVisible, 'Нижнее меню должно быть видно').toBe(true);
        expect(metrics.linksInViewport, 'Все кнопки меню должны помещаться').toBe(true);
        expect(metrics.navBox?.left, 'Левый край меню').toBeGreaterThanOrEqual(-2);
        expect(metrics.navBox?.right, 'Правый край меню').toBeLessThanOrEqual(width + 2);
      });
    }
  }
});

// Additional event header image checks v1147.
test.describe('Шапки событий на узких экранах', () => {
  test.skip(({ isMobile }) => !isMobile, 'Проверяем мобильный Chromium');
  const headers = [
    ['Безумная Джо', '/crazy-joe.html'],
    ['Сражение альянсов', '/alliance-showdown.html'],
    ['Чемпионат альянса', '/alliance-championship.html'],
    ['Зимняя осада', '/winter-siege.html'],
    ['Литейная', '/foundry.html'],
    ['Медведь', '/bear.html'],
  ];
  for (const width of [320, 390]) {
    for (const [label, url] of headers) {
      test(`${label}: шапка ${width}px`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height: 844 });
        const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
        expect(response?.status()).toBe(200);
        const hero = page.locator('main#appMain .route-page.active>section[class*="-image-header-"]>img').first();
        await expect(hero).toBeVisible();
        await expect.poll(() => hero.evaluate(img => img.complete && img.naturalWidth > 0), {
          message: 'Шапка должна загрузиться',
        }).toBe(true);
        const metrics = await hero.evaluate(img => {
          const rect = img.getBoundingClientRect();
          const style = getComputedStyle(img);
          return {
            left: rect.left, right: rect.right, width: rect.width, height: rect.height,
            naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
            objectFit: style.objectFit,
            heading: document.querySelector('.route-page.active>section.intro h1')?.innerText.trim(),
          };
        });
        await testInfo.attach('header-layout.json', {
          body: JSON.stringify({ label, width, ...metrics }, null, 2),
          contentType: 'application/json',
        });
        expect(metrics.width).toBeGreaterThan(0);
        expect(metrics.left).toBeGreaterThanOrEqual(-2);
        expect(metrics.right).toBeLessThanOrEqual(width + 2);
        expect(metrics.objectFit).toBe('contain');
        expect(Math.abs(metrics.width / metrics.height - metrics.naturalWidth / metrics.naturalHeight),
          'Пропорции шапки не должны искажаться').toBeLessThan(0.035);
        expect(metrics.heading?.length).toBeGreaterThan(3);
      });
    }
  }
});

// Remaining event banner regression v1148.
test.describe('Остальные шапки событий', () => {
  test.skip(({ isMobile }) => !isMobile, 'Мобильный Chromium');
  const pages = [
    ['Мобилизация альянса', '/alliance-mobilization.html'],
    ['Рудник', '/frostfire-mine.html'],
    ['Торговый путь', '/tundra-trade-route.html'],
    ['Братья по оружию', '/brothers-in-arms.html'],
    ['Форт', '/forts.html'],
    ['Замок', '/castle.html'],
    ['Месть Джины', '/ginas-revenge.html'],
    ['Престиж наёмника', '/mercenary-prestige.html'],
    ['Бесконечное испытание', '/endless-trial.html'],
    ['Рыболовный турнир', '/fishing.html'],
    ['Снегоуборщики', '/snowplow.html'],
    ['Воспоминания о грёзах', '/dreams.html'],
    ['Мощь государства', '/state-power.html'],
    ['Подготовка СВС', '/svs-prep.html'],
    ['Боевая фаза СВС', '/svs.html'],
  ];
  for (const width of [320, 390]) {
    for (const [title, url] of pages) {
      test(`${title}: ${width}px`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height: 844 });
        const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
        expect(response?.status(), title).toBe(200);
        const hero = page.locator(
          url === '/ginas-revenge.html'
            ? 'main#appMain .route-page.active img.gina-cover'
            : 'main#appMain .route-page.active>section[class*="-image-header-"]>img'
        ).first();
        await expect(hero, title + ': изображение шапки').toBeVisible();
        await expect.poll(() => hero.evaluate(img => img.complete && img.naturalWidth > 0), {
          message: title + ': изображение должно загрузиться',
        }).toBe(true);
        const bounds = await hero.evaluate(img => {
          const b = img.getBoundingClientRect();
          const style = getComputedStyle(img);
          return {
            left: b.left, right: b.right, width: b.width,
            naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
            fit: style.objectFit, height: b.height,
            documentWidth: document.documentElement.scrollWidth,
          };
        });
        await testInfo.attach('event-header-metrics.json', {
          body: JSON.stringify({ url, width, ...bounds }, null, 2),
          contentType: 'application/json',
        });
        expect(bounds.width).toBeGreaterThan(0);
        expect(bounds.height).toBeGreaterThan(0);
        expect(bounds.left).toBeGreaterThanOrEqual(-2);
        expect(bounds.right).toBeLessThanOrEqual(width + 2);
        expect(bounds.fit, 'Без обрезки шапки').toBe('contain');
        expect(Math.abs(bounds.width / bounds.height - bounds.naturalWidth / bounds.naturalHeight),
          'Пропорции изображения сохраняются').toBeLessThan(0.035);
        const navFont = await page.locator('nav.mobile-bottom-v424 a b').first()
          .evaluate(el => Number.parseFloat(getComputedStyle(el).fontSize));
        expect(navFont, 'Нижнее меню читаемо на странице события').toBeGreaterThanOrEqual(11);
      });
    }
  }
});

// Mobile calculator form smoke checks v1150.
test.describe('Калькуляторы: мобильные поля и ширина', () => {
  test.skip(({ isMobile }) => !isMobile, 'Мобильный Chromium');
  for (const width of [320, 390]) {
    for (const [title, path, selector] of [
      ['Каталог калькуляторов', '/calculators.html', '.calc-hub-card'],
      ['Огненная Топка', '/fire-furnace-calculator.html', '.calc-select-v378 select'],
      ['Эссенция и Мифрил', '/essence-mithril-calculator.html', '.ec-stock-grid input'],
    ]) {
      test(`${title}: форма ${width}px`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height: 844 });
        const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
        expect(response?.status(), title).toBe(200);
        const target = page.locator(selector).first();
        await expect(target).toBeVisible();
        const metrics = await target.evaluate(element => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            left: rect.left, right: rect.right, width: rect.width,
            height: rect.height, fontSize: Number.parseFloat(style.fontSize),
            viewport: document.documentElement.clientWidth,
            documentWidth: document.documentElement.scrollWidth,
          };
        });
        await testInfo.attach('calculator-mobile-controls.json', {
          body: JSON.stringify({ path, width, ...metrics }, null, 2),
          contentType: 'application/json',
        });
        expect(metrics.left).toBeGreaterThanOrEqual(-2);
        expect(metrics.right).toBeLessThanOrEqual(width + 2);
        expect(metrics.documentWidth - metrics.viewport).toBeLessThanOrEqual(16);
        if (path !== '/calculators.html') {
          expect(metrics.height, 'Поле должно быть удобно нажимать').toBeGreaterThanOrEqual(44);
          expect(metrics.fontSize, 'Поле без автоувеличения текста в iOS').toBeGreaterThanOrEqual(16);
        }
      });
    }
  }
});
