/* SOVA58 site-wide static audit. No browser, server writes or user data. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const BASE = 'https://belaya-mgla-sova58.github.io/';
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'visual-audit-results');
fs.mkdirSync(OUT, { recursive: true });

function walk(dir, relative = '') {
  const skip = new Set(['.git', '.github', 'node_modules', 'tests', 'visual-audit-results']);
  const entries = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = relative ? relative + '/' + item.name : item.name;
    if (item.isDirectory() && !skip.has(item.name)) entries.push(...walk(path.join(dir, item.name), rel));
    else if (item.isFile()) entries.push(rel);
  }
  return entries;
}
function attrs(tag) {
  const result = {};
  const re = /([a-zA-Z_:][a-zA-Z0-9_:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let m;
  while ((m = re.exec(tag))) result[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4];
  return result;
}
function targetUrl(value, relative) {
  if (!value || /^(?:data:|blob:|javascript:|mailto:|tel:|about:)/i.test(value)) return null;
  let url;
  try { url = new URL(value, new URL(relative, BASE)); } catch (_) { return null; }
  if (url.origin !== new URL(BASE).origin) return null;
  let decoded;
  try { decoded = decodeURIComponent(url.pathname.replace(/^\/+/, '')); }
  catch (_) { return null; }
  const resolved = path.resolve(ROOT, decoded || 'index.html');
  if (resolved !== ROOT && !resolved.startsWith(ROOT + path.sep)) return null;
  return { path: decoded || 'index.html', fragment: url.hash ? decodeURIComponent(url.hash.slice(1)) : '' };
}
const allFiles = walk(ROOT);
const existing = new Set(allFiles);
const htmlFiles = allFiles.filter(f => f.toLowerCase().endsWith('.html')).sort();
const cssFiles = allFiles.filter(f => f.toLowerCase().endsWith('.css'));
const errors = [], warnings = [], pages = [];
function issue(severity, from, category, details) {
  const target = { file: from, category, details: String(details).slice(0, 250) };
  (severity === 'error' ? errors : warnings).push(target);
}
const anchorIndex = new Map();
for (const name of htmlFiles) {
  const s = fs.readFileSync(path.join(ROOT, name), 'utf8');
  anchorIndex.set(name, new Set([...s.matchAll(/\bid\s*=\s*(?:"([^"]+)"|'([^']+)')/gi)].map(m => m[1] || m[2])));
}
for (const file of htmlFiles) {
  const s = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const tags = [...s.matchAll(/<(?:a|img|link|script|source|video|audio|iframe|input)\b[^>]*>/gi)];
  const ids = anchorIndex.get(file);
  const countIds = [...ids].length;
  const rawIds = [...s.matchAll(/\bid\s*=\s*(?:"([^"]+)"|'([^']+)')/gi)].map(m => m[1] || m[2]);
  const page = { file, title: (s.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [,''])[1].trim(),
    images: 0, internalReferences: 0, missingImageAlt: 0, duplicateIds: rawIds.length - countIds };
  const special = /(?:^404\.html$|^maintenance\.html$|^welcome\.html$|^google[0-9a-z]+\.html$|^yandex_[^/]+\.html$|^owl-reset)/i.test(file);
  if (!special && !page.title) issue('warning', file, 'SEO', 'Missing title');
  if (!special && !/<html\b[^>]*\blang\s*=/i.test(s)) issue('warning', file, 'SEO', 'Missing html lang');
  if (!special && !/name\s*=\s*["']viewport["']/i.test(s)) issue('warning', file, 'responsive', 'Missing viewport meta');
  if (!special && !/name\s*=\s*["']description["']/i.test(s)) issue('warning', file, 'SEO', 'Missing meta description');
  if (page.duplicateIds) issue('warning', file, 'accessibility', page.duplicateIds + ' duplicate HTML ids');
  for (const m of tags) {
    const tag = m[0], attr = attrs(tag);
    const isImg = /^<img\b/i.test(tag);
    if (isImg) {
      page.images++;
      if (!Object.prototype.hasOwnProperty.call(attr, 'alt')) {
        page.missingImageAlt++;
        issue('warning', file, 'image-alt', 'Missing alt on ' + (attr.src || '(unidentified image)'));
      }
    }
    const candidates = [];
    for (const key of ['src', 'href', 'poster']) if (attr[key]) candidates.push([key, attr[key]]);
    if (attr.srcset) for (const p of attr.srcset.split(',')) {
      const u = p.trim().split(/\s+/)[0];
      if (u) candidates.push(['srcset', u]);
    }
    for (const [key, value] of candidates) {
      const target = targetUrl(value, file);
      if (!target) continue;
      page.internalReferences++;
      if (!existing.has(target.path)) {
        const isA = /^<a\b/i.test(tag);
        // GitHub Pages maps a directory URL to an index.html document.
        if (existing.has(target.path.replace(/\/$/, '') + '/index.html')) continue;
        issue('error', file, isA ? 'broken-link' : 'missing-resource',
          key + '=' + value + ' -> ' + target.path);
      } else if (target.fragment && target.path.endsWith('.html')
        && anchorIndex.has(target.path) && !anchorIndex.get(target.path).has(target.fragment)) {
        issue('warning', file, 'fragment', 'Unresolved #'+target.fragment+' in '+target.path+' (may be added by JS)');
      }
    }
  }
  pages.push(page);
}

/* Check public sitemap coverage without including redirects, noindex or admin pages. */
const sitemapNames = allFiles.filter(name => /^sitemap(?:-[a-z0-9-]+)?\.xml$/i.test(name));
const listedSitemapPaths = new Set();
for (const name of sitemapNames) {
  const xml = fs.readFileSync(path.join(ROOT, name), 'utf8');
  const urls = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map(m => m[1].trim());
  const uniqueInFile = new Set();
  for (const url of urls) {
    const target = targetUrl(url, name);
    if (!target || !target.path.endsWith('.html')) continue;
    if (uniqueInFile.has(target.path)) {
      issue('error', name, 'sitemap-duplicate', 'Repeated URL: '+target.path);
      continue;
    }
    uniqueInFile.add(target.path);
    listedSitemapPaths.add(target.path);
    if (!existing.has(target.path)) issue('error', name, 'sitemap-broken', 'Missing page: '+target.path);
  }
}
for (const file of htmlFiles) {
  if (/^(?:404|maintenance|welcome|owl-reset(?:-[0-9]+)?|google[0-9a-z]+|yandex_[^.]+)\.html$/i.test(file)) continue;
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const robotsMeta = [...html.matchAll(/<meta\b[^>]*>/gi)].map(m => attrs(m[0]))
    .find(a => (a.name||'').toLowerCase()==='robots');
  if (robotsMeta && /noindex/i.test(robotsMeta.content||'')) continue;
  const canonical = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => attrs(m[0]))
    .find(a => /(?:^|\s)canonical(?:\s|$)/i.test(a.rel||''));
  const canonicalTarget = canonical?.href ? targetUrl(canonical.href, file) : null;
  if (canonicalTarget && canonicalTarget.path!==file) continue;
  if (!listedSitemapPaths.has(file))
    issue('warning', file, 'sitemap-missing', 'Indexable page missing from sitemap');
}
for (const file of cssFiles) {
  const s = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const urls = [...s.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gi)];
  for (const m of urls) {
    const target = targetUrl(m[2].trim(), file);
    if (target && !existing.has(target.path)) issue('error', file, 'missing-css-resource', m[2]);
  }
}
const manifestFiles = allFiles.filter(f => f.endsWith('.webmanifest'));
for (const file of manifestFiles) {
  try {
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
    if (!manifest.name || !manifest.start_url || !manifest.icons?.length) {
      issue('warning', file, 'PWA', 'Missing name, start_url or icons');
    }
    for (const entry of [manifest.start_url, ...(manifest.icons || []).map(i => i.src)]) {
      const target = targetUrl(entry, file);
      if (target && !existing.has(target.path)) issue('error', file, 'PWA', 'Missing: '+entry);
    }
  } catch (e) { issue('error', file, 'PWA', 'Invalid manifest: '+e.message); }
}
for (const file of allFiles.filter(f => /\.(?:png|jpe?g|gif|webp|svg|ico)$/i.test(f))) {
  const size = fs.statSync(path.join(ROOT, file)).size;
  if (size === 0) issue('error', file, 'image', 'Empty image file');
  if (size > 5 * 1024 * 1024) issue('warning', file, 'performance', 'Image larger than 5 MB: '+Math.round(size/1024)+' KB');
}
const report = { generated: new Date().toISOString(), totalFiles: allFiles.length,
  htmlPages: htmlFiles.length, cssFiles: cssFiles.length, images: pages.reduce((n,p) => n+p.images,0),
  errorCount: errors.length, warningCount: warnings.length, errors, warnings, pages };
fs.writeFileSync(path.join(OUT, 'static-report.json'), JSON.stringify(report, null, 2));
const summary = [
  '# SOVA58 static site audit', '',
  'HTML pages: '+report.htmlPages+'; CSS: '+report.cssFiles+'; image tags: '+report.images+'.',
  'Unique sitemap HTML URLs: '+listedSitemapPaths.size+'.',
  'Errors: '+errors.length+'; warnings: '+warnings.length+'.', '',
  '## Errors', ...(errors.length ? errors.slice(0,100).map(x => '- '+x.file+': '+x.category+': '+x.details) : ['No missing local assets or links detected.']),
  '', '## Warnings (first 80)', ...warnings.slice(0,80).map(x => '- '+x.file+': '+x.category+': '+x.details),
  '', 'See static-report.json for all findings.'
].join('\n');
fs.writeFileSync(path.join(OUT, 'static-summary.md'), summary);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary.slice(0,30000)+'\n');
console.log(summary.slice(0,18000));
if (errors.length) process.exitCode = 1;
