#!/usr/bin/env node
/* Static homepage asset audit: node scripts/audit-home-assets.cjs
 * Reads local files only; does not modify the site or require dependencies.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const refs = new Map();
function add(value, from, kind) {
  if (!value || /^(?:data:|https?:|\/\/|#)/i.test(value)) return;
  const clean = value.split(/[?#]/)[0].trim();
  if (!clean || /^(?:javascript:|mailto:)/i.test(clean)) return;
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(from), clean));
  if (resolved.startsWith('../') || resolved.startsWith('/')) throw Error('Unsafe path: ' + value);
  if (!refs.has(resolved)) refs.set(resolved, new Set());
  refs.get(resolved).add(kind);
}
const css = [...html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi)];
for (const [tag] of css) {
  const href = tag.match(/\bhref=["']([^"']+)["']/i);
  if (href) add(href[1], 'index.html', 'stylesheet');
}
for (const [tag] of html.matchAll(/<img\b[^>]*>/gi)) {
  const src = tag.match(/\bsrc=["']([^"']+)["']/i);
  if (src) add(src[1], 'index.html', 'image');
  const set = tag.match(/\bsrcset=["']([^"']+)["']/i);
  if (set) for (const entry of set[1].split(',')) add(entry.trim().split(/\s+/)[0], 'index.html', 'image variant');
}
for (const [tag] of html.matchAll(/<link\b[^>]*rel=["']preload["'][^>]*>/gi)) {
  const href = tag.match(/\bhref=["']([^"']+)["']/i);
  if (href) add(href[1], 'index.html', 'preload');
  const set = tag.match(/\bimagesrcset=["']([^"']+)["']/i);
  if (set) for (const entry of set[1].split(',')) add(entry.trim().split(/\s+/)[0], 'index.html', 'preload variant');
}
const styles = [...refs.entries()].filter(([,types]) => types.has('stylesheet')).map(([p]) => p);
const cssText = [html, ...styles.map(p => fs.existsSync(path.join(root,p)) ? fs.readFileSync(path.join(root,p),'utf8') : '')];
cssText.forEach((text, i) => {
  const from = i === 0 ? 'index.html' : styles[i - 1];
  for (const match of text.matchAll(/url\(\s*["']?([^"'\)]+)["']?\s*\)/gi)) add(match[1], from, 'CSS url');
});
const records = [...refs].map(([name, types]) => {
  const filename = path.join(root, name), exists = fs.existsSync(filename);
  return {name, types: [...types].join(', '), bytes: exists ? fs.statSync(filename).size : null};
});
const missing = records.filter(x => x.bytes === null);
const large = records.filter(x => x.bytes !== null && /\.(?:jpe?g|png|webp|avif)$/i.test(x.name) && x.bytes >= 150000)
  .sort((a,b) => b.bytes-a.bytes);
console.log('Homepage referenced assets:', records.length, '| CSS files:', styles.length);
console.log('Missing:', missing.length);
for (const f of missing) console.error('MISSING', f.name, '(' + f.types + ')');
console.log('Large images (>=150 KB):');
for (const f of large) console.log((f.bytes/1024).toFixed(1) + ' KiB', f.name);
if (missing.length) process.exitCode = 1;
