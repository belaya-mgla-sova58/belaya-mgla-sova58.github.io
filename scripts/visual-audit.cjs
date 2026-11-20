// Visual inspection of public pages. Does not click forms or change the live website.
const { chromium, devices } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const origin = new URL(process.env.SITE_URL || 'https://belaya-mgla-sova58.github.io/');
const limit = Number(process.env.MAX_PAGES || 120);
const output = path.join(process.cwd(), 'visual-audit-output');
fs.mkdirSync(output, { recursive: true });
const queue = [origin.href];
const visited = new Set();
const records = [];
const browser = awaitBrowser();

function normalize(raw) {
  try {
    const url = new URL(raw, origin);
    if (url.origin !== origin.origin || !['http:', 'https:'].includes(url.protocol)) return null;
    if (url.pathname.match(/\.(?:png|jpe?g|gif|svg|webp|ico|pdf|zip|mp4|mp3|xml|json|txt|woff2?|ttf)$/i)) return null;
    url.hash = '';
    url.search = '';
    return url.href;
  } catch { return null; }
}
function filename(url, mode) {
  const u = new URL(url);
  const slug = (u.pathname === '/' ? 'index' : u.pathname).replace(/[^a-z0-9а-яё]+/gi, '-').replace(/^-|-$/g, '').slice(0, 65) || 'page';
  const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 9);
  return mode + '/' + slug + '-' + hash + '.png';
}
async function awaitBrowser() { return chromium.launch({ headless: true }); }
async function takeScreenshot(page, url, mode) {
  const dest = filename(url, mode);
  fs.mkdirSync(path.dirname(path.join(output, dest)), { recursive: true });
  await page.screenshot({ path: path.join(output, dest), fullPage: true, animations: 'disabled', timeout: 25000 });
  return dest;
}
async function inspect(url, mode) {
  const context = await browser.newContext(mode === 'mobile'
    ? { ...devices['iPhone 13'], reducedMotion: 'reduce' }
    : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(1100);
    const info = await page.evaluate(() => ({
      title: document.title,
      horizontalOverflowPx: Math.max(0, document.documentElement.scrollWidth - innerWidth),
      linkUrls: [...document.querySelectorAll('a[href]')].map(a => a.href),
      width: innerWidth,
      height: document.documentElement.scrollHeight
    }));
    const screenshot = await takeScreenshot(page, url, mode);
    return { status: response?.status() || null, screenshot, title: info.title,
      horizontalOverflowPx: info.horizontalOverflowPx, width: info.width, height: info.height,
      links: info.linkUrls, errors };
  } catch (e) { return { error: String(e), errors }; }
  finally { await context.close(); }
}
(async () => {
  try {
    while (queue.length && visited.size < limit) {
      const url = normalize(queue.shift());
      if (!url || visited.has(url)) continue;
      visited.add(url);
      console.log('Checking', visited.size, url);
      const desktop = await inspect(url, 'desktop');
      const mobile = await inspect(url, 'mobile');
      const links = desktop.links || mobile.links || [];
      for (const href of links) {
        const link = normalize(href);
        if (link && !visited.has(link) && !queue.includes(link)) queue.push(link);
      }
      delete desktop.links;
      delete mobile.links;
      records.push({ url, desktop, mobile });
      fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify({
        site: origin.href, checked: records.length, queued: queue.length, maxPages: limit, pages: records
      }, null, 2));
    }
    console.log('Complete:', records.length, 'pages.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
