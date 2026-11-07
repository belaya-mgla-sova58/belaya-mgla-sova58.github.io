/* SOVA58: read-only Playwright responsive audit.
   Run: npm install --no-save playwright && npx playwright install chromium
        node tests/visual-audit.cjs
   Screenshots and JSON results are written to visual-audit-results/.
*/
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const BASE_URL = 'https://belaya-mgla-sova58.github.io/';
const PAGES = [
  'index.html',
  'heroes.html',
  'hero-generations.html',
  'pets.html',
  'experts.html',
  'events.html',
  'news.html',
  'calculators.html',
  'canyon-clash.html',
  'troops.html',
  'furnace-1-30.html',
  'furnace-fc1-5.html',
  'furnace-fc5-10.html',
  'snowplow.html',
  'mercenary-prestige.html',
  'faq.html'
];
const DEVICES = [
  { name: 'desktop', width: 1440, height: 900, isMobile: false, hasTouch: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true }
];
const OUTPUT = path.join(process.cwd(), 'visual-audit-results');
fs.mkdirSync(OUTPUT, { recursive: true });

async function inspect(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const overflow = document.documentElement.scrollWidth - vw;
    const missingImages = [...document.images].filter(img => {
      const box = img.getBoundingClientRect();
      const visible = box.width > 3 && box.height > 3
        && box.bottom > 0 && box.top < innerHeight
        && box.right > 0 && box.left < innerWidth;
      return visible && !!img.currentSrc && img.complete && img.naturalWidth === 0;
    }).slice(0, 8).map(img => img.currentSrc.split('/').pop());
    const overhanging = overflow > 12
      ? [...document.querySelectorAll('main *, #appMain *')]
          .filter(el => {
            const box = el.getBoundingClientRect();
            const st = getComputedStyle(el);
            return box.width > 0 && box.height > 0 && st.position !== 'fixed'
              && (box.right > vw + 12 || box.left < -12);
          }).slice(0, 6).map(el =>
            el.tagName.toLowerCase() + (el.id ? '#' + el.id : '')
            + (typeof el.className === 'string'
              ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
              : '')
          )
      : [];
    return {
      viewport: vw,
      documentWidth: document.documentElement.scrollWidth,
      overflow,
      headings: document.querySelectorAll('h1').length,
      missingImages,
      overhanging
    };
  });
}

(async () => {
  const results = [];
  const browser = await chromium.launch({ headless: true });
  try {
    for (const device of DEVICES) {
      const context = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        isMobile: device.isMobile,
        hasTouch: device.hasTouch,
        deviceScaleFactor: 1,
        serviceWorkers: 'block',
        locale: 'ru-RU'
      });
      const directory = path.join(OUTPUT, device.name);
      fs.mkdirSync(directory, { recursive: true });

      for (const pagePath of PAGES) {
        const page = await context.newPage();
        const failures = [];
        const runtimeErrors = [];
        page.on('pageerror', err => runtimeErrors.push(err.message.slice(0, 160)));
        let status = 0;
        let metrics = null;
        try {
          const response = await page.goto(new URL(pagePath, BASE_URL).toString(), {
            waitUntil: 'domcontentloaded',
            timeout: 45000
          });
          status = response ? response.status() : 0;
          await page.waitForTimeout(900);
          metrics = await inspect(page);
          if (status !== 200) failures.push('HTTP ' + status);
          if (metrics.headings === 0) failures.push('No page heading');
          if (metrics.overflow > 12) failures.push('Horizontal overflow ' + metrics.overflow + 'px');
          if (metrics.missingImages.length) failures.push('Broken images in viewport: ' + metrics.missingImages.join(', '));
        } catch (err) {
          failures.push('Browser error: ' + String(err.message || err).slice(0, 250));
        }
        try {
          await page.screenshot({
            path: path.join(directory, pagePath.replace(/\.html$/, '') + '.png'),
            fullPage: false,
            animations: 'disabled',
            timeout: 20000
          });
        } catch (err) {
          failures.push('Screenshot failed: ' + String(err.message || err).slice(0, 180));
        }
        results.push({
          device: device.name,
          page: pagePath,
          status,
          metrics,
          failures,
          runtimeErrors: runtimeErrors.slice(0, 3)
        });
        console.log((failures.length ? 'FAIL' : 'PASS') + ' ' + device.name
          + ' ' + pagePath + (failures.length ? ': ' + failures.join('; ') : ''));
        await page.close();
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }

  fs.writeFileSync(path.join(OUTPUT, 'report.json'), JSON.stringify(results, null, 2));
  const failures = results.filter(row => row.failures.length);
  const summary = [
    '# SOVA58 visual smoke check',
    '',
    'Checked ' + results.length + ' page/device combinations.',
    'Passed: ' + (results.length - failures.length) + '. Failed: ' + failures.length + '.',
    '',
    '| Device | Page | Result |',
    '| --- | --- | --- |',
    ...results.map(row => '| ' + row.device + ' | ' + row.page + ' | '
      + (row.failures.length ? row.failures.join('; ').replace(/\|/g, '/') : 'OK') + ' |'),
    '',
    'See uploaded artifact for screenshots and detailed JSON.'
  ].join('\n');
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + '\n');
  }
  console.log('\n' + summary);
  if (failures.length) process.exitCode = 1;
})().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
