'use strict';

// Fast read-only PWA integrity checks on every site update.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const sw = read('service-worker.js');
const install = read('pwa-install.js');
const index = read('index.html');
const manifestFile = 'manifest-v541.webmanifest';
const manifest = JSON.parse(read(manifestFile));
const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
  process.stdout.write((condition ? 'PASS ' : 'FAIL ') + message + '\n');
}

const cache = sw.match(/const CACHE_NAME\s*=\s*['"]belaya-mgla-v(\d+)['"]/);
const registration = install.match(/service-worker\.js\?v=(\d+)/);
check(Boolean(cache && registration && cache[1] === registration[1]),
  'Service Worker registration and cache versions match');
check(sw.includes("fetch(req,{cache:'no-store'})"),
  'HTML navigation fetches from the network');
check(!sw.includes('optimizeHtml(') && !sw.includes('new Response(html,'),
  'Service Worker does not rewrite HTML');
check(index.includes('href="' + manifestFile + '"'),
  'Homepage links the installable PWA manifest');
check(manifest.display === 'standalone' && Boolean(manifest.name) && Boolean(manifest.start_url),
  'PWA manifest contains the required launch fields');
check(Array.isArray(manifest.icons) && manifest.icons.length >= 2,
  'PWA manifest declares icons');
for (const icon of manifest.icons || []) {
  check(fs.existsSync(path.join(root, icon.src)), 'PWA icon exists: ' + icon.src);
}
for (const asset of [
  'site-v626.min.css',
  'site-desktop-v985.css',
  'site-v629.min.js',
  'pwa-install.js',
]) {
  check(fs.existsSync(path.join(root, asset)), 'Critical PWA asset exists: ' + asset);
}

const summary = [
  '## PWA static checks', '',
  errors.length ? '**FAIL**: ' + errors.length + ' error(s).' : '**PASS**: all PWA static checks.',
  ...errors.map(item => '- ' + item),
  '',
].join('\n');
if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
}
if (errors.length) process.exitCode = 1;
