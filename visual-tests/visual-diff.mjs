import { chromium, devices } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { readFileSync, writeFileSync, mkdirSync, appendFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

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

const devicesToCheck = [
  ['desktop', { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
  ['mobile', { ...devices['iPhone 13'], deviceScaleFactor: 1 }],
];
const beforeURL = process.env.BEFORE_URL || 'http://127.0.0.1:4174/';
const afterURL = process.env.AFTER_URL || 'http://127.0.0.1:4173/';
const warningPercent = Number(process.env.VISUAL_WARNING_PERCENT || 2);
const output = resolve('visual-diff-report');
mkdirSync(output, { recursive: true });

function safe(text) {
  return String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
function slug(path) {
  return path.replace(/\.html$/, '').replace(/[^a-z0-9]+/gi, '-');
}

async function makeContext(browser, baseURL, device) {
  const context = await browser.newContext({
    ...device,
    locale: 'ru-RU',
    timezoneId: 'Europe/Moscow',
    reducedMotion: 'reduce',
    serviceWorkers: 'block',
  });

  // External analytics, ads and remote fonts must not make snapshots unstable.
  await context.route('**/*', (route) => {
    if (route.request().url().startsWith(baseURL)) return route.continue();
    return route.abort();
  });

  // Deterministic randomness for page decorations and rotating content.
  await context.addInitScript(() => {
    let seed = 0x12c0ffee;
    Math.random = () => {
      seed = (1664525 * seed + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  });
  return context;
}

async function prepare(page, baseURL, file) {
  // Hold the calendar date fixed while regular page timers still run.
  await page.clock.setFixedTime(new Date('2026-11-07T09:00:00.000Z'));
  const response = await page.goto(new URL(file, baseURL).toString(), {
    waitUntil: 'domcontentloaded',
    timeout: 25000,
  });
  if (!response || response.status() !== 200) {
    throw new Error(file + ': HTTP ' + (response ? response.status() : 'no response'));
  }
  await page.locator('body').waitFor({ state: 'visible' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(850);
}

async function screenshot(page, fileName, y) {
  await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
  await page.waitForTimeout(300);
  return page.screenshot({
    path: join(output, fileName),
    animations: 'disabled',
    caret: 'hide',
    timeout: 25000,
  });
}

function compare(beforeBuffer, afterBuffer, name) {
  const before = PNG.sync.read(beforeBuffer);
  const after = PNG.sync.read(afterBuffer);
  if (before.width !== after.width || before.height !== after.height) {
    throw new Error('Screenshot dimensions differ for ' + name);
  }
  const diff = new PNG({ width: before.width, height: before.height });
  const changed = pixelmatch(
    before.data, after.data, diff.data, before.width, before.height,
    { threshold: 0.1, includeAA: false, alpha: 0.30 }
  );
  writeFileSync(join(output, name + '-diff.png'), PNG.sync.write(diff));
  return changed / (before.width * before.height) * 100;
}

const results = [];
const errors = [];
const browser = await chromium.launch({ headless: true });
try {
  for (const [deviceName, device] of devicesToCheck) {
    const beforeContext = await makeContext(browser, beforeURL, device);
    const afterContext = await makeContext(browser, afterURL, device);
    try {
      for (const [name, file] of pages) {
        const beforePage = await beforeContext.newPage();
        const afterPage = await afterContext.newPage();
        try {
          await Promise.all([
            prepare(beforePage, beforeURL, file),
            prepare(afterPage, afterURL, file),
          ]);
          for (const [position, y] of [['top', 0], ['scrolled', 800]]) {
            const key = slug(file) + '-' + deviceName + '-' + position;
            const [beforeBuffer, afterBuffer] = await Promise.all([
              screenshot(beforePage, key + '-before.png', y),
              screenshot(afterPage, key + '-after.png', y),
            ]);
            const percent = compare(beforeBuffer, afterBuffer, key);
            results.push({
              name, file, device: deviceName, position, key,
              percent, changed: percent >= warningPercent,
            });
            console.log((percent >= warningPercent ? 'CHANGE ' : 'ok ') +
              key + ': ' + percent.toFixed(2) + '% different');
          }
        } catch (error) {
          errors.push({ name, device: deviceName, reason: String(error) });
          console.error('ERROR ' + file + ' [' + deviceName + ']: ' + String(error));
        } finally {
          await beforePage.close();
          await afterPage.close();
        }
      }
    } finally {
      await beforeContext.close();
      await afterContext.close();
    }
  }
} finally {
  await browser.close();
}

const warnings = results.filter((item) => item.changed);
const summary = [
  '## Сравнение скриншотов: до и после',
  '',
  'Проверка двух версий сайта: до изменений и после. Изменение изображения само по себе не означает ошибку.',
  '',
  '**Существенных отличий:** ' + warnings.length +
    ' из ' + results.length + ' снимков (порог ' + warningPercent + '% пикселей).',
  '**Ошибок снимков:** ' + errors.length + '.',
  '',
  '| Страница | Экран | Часть | Отличие |',
  '| --- | --- | --- | ---: |',
  ...results.map((r) => '| ' + r.name + ' | ' + r.device +
    ' | ' + r.position + ' | ' + (r.changed ? '⚠️ ' : '') + r.percent.toFixed(2) + '% |'),
  '',
  ...errors.map((e) => '- Ошибка: ' + e.name + ' (' + e.device + '): ' + e.reason),
  '',
  'Изображения **до / после / разница** и HTML-галерея доступны в артефакте visual-diff-report.',
  'Визуальные отличия требуют осмотра человеком. Автоматического изменения сайта нет.',
].join('\n');
writeFileSync(join(output, 'summary.md'), summary);
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + '\n');
}

const gallery = results.map((r) => {
  const images = [
    ['До', r.key + '-before.png'],
    ['После', r.key + '-after.png'],
    ['Разница', r.key + '-diff.png'],
  ].map(([label, file]) =>
    '<figure><img loading="lazy" src="' + file + '" alt="' + safe(label) +
    '"><figcaption>' + safe(label) + '</figcaption></figure>').join('');
  return '<article><h2>' + safe(r.name) + ' · ' + safe(r.device) + ' · ' +
    safe(r.position) + ' <small>' + r.percent.toFixed(2) + '% ' +
    (r.changed ? '⚠️ изменение' : 'без существенных изменений') +
    '</small></h2><div class="images">' + images + '</div></article>';
}).join('');

writeFileSync(join(output, 'index.html'),
  '<!doctype html><html lang="ru"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<title>Белая мгла · Сравнение до и после</title><style>' +
  'body{font:15px system-ui,sans-serif;background:#081726;color:#eef8ff;margin:0;padding:24px}' +
  'main{max-width:1500px;margin:auto}h1{margin-bottom:10px}p{color:#bacbd9}' +
  'article{margin:24px 0;padding:18px;border:1px solid #35516a;border-radius:14px}' +
  'h2{font-size:18px}small{color:#9bcbe4;font-size:14px;margin-left:10px}' +
  '.images{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}' +
  'figure{margin:0}img{display:block;width:100%;height:auto;border:1px solid #426180}' +
  'figcaption{text-align:center;padding-top:8px;font-weight:700}' +
  '@media(max-width:750px){.images{grid-template-columns:1fr}}' +
  '</style></head><body><main><h1>Белая мгла · До и после</h1>' +
  '<p>Снимки двух версий сайта и подсвеченные изменения. Отличия нужно проверить визуально.</p>' +
  '<p>Снимков: ' + results.length + ' · Значительные отличия: ' + warnings.length +
  ' · Ошибки: ' + errors.length + '</p>' + gallery +
  (errors.length ? '<h2>Ошибки</h2><pre>' + safe(JSON.stringify(errors, null, 2)) + '</pre>' : '') +
  '</main></body></html>');

console.log('Saved comparison gallery to ' + join(output, 'index.html'));
if (errors.length) process.exitCode = 1;
