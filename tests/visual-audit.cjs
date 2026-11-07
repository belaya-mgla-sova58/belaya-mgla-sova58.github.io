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
// Discover every HTML page from the checked-out site, including future pages.
function discoverHtmlPages(root) {
  const found = [];
  const skipDirs = new Set(['.git', '.github', 'node_modules', 'visual-audit-results', 'tests']);
  function visit(dir, prefix = '') {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = prefix ? prefix + '/' + entry.name : entry.name;
      if (entry.isDirectory()) {
        if (!skipDirs.has(entry.name)) visit(path.join(dir, entry.name), rel);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
        found.push(rel);
      }
    }
  }
  visit(root);
  return found.sort((a, b) => a.localeCompare(b, 'ru'));
}
const PAGES = discoverHtmlPages(process.cwd());
if (!PAGES.length) throw new Error('No HTML pages found in the checked-out site');
console.log('Discovered ' + PAGES.length + ' HTML pages for a full responsive audit');
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

      // A small concurrency limit makes full-site audits practical on Actions.
      for (let offset = 0; offset < PAGES.length; offset += 4) {
        await Promise.all(PAGES.slice(offset, offset + 4).map(async (pagePath) => {
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
            path: path.join(directory, pagePath.replace(/\.html$/i, '').replace(/[\\/]/g, '__') + '.png'),
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
        }));
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }

  fs.writeFileSync(path.join(OUTPUT, 'report.json'), JSON.stringify(results, null, 2));
  results.sort((a, b) => DEVICES.findIndex(d => d.name === a.device) - DEVICES.findIndex(d => d.name === b.device) || a.page.localeCompare(b.page));
  const failures = results.filter(row => row.failures.length);
  const summary = [
    '# SOVA58 full-site visual audit',
    '',
    'Discovered ' + PAGES.length + ' HTML pages and checked ' + results.length + ' page/device combinations.',
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
