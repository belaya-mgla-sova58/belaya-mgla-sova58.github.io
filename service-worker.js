const CACHE_NAME = 'belaya-mgla-v542';
const CORE = [
  './',
  './index.html',
  './site-v269.css?v=542',
  './site-v269.js?v=535',
  './manifest-v541.webmanifest',
  './app-icon-192-v541.png',
  './app-icon-512-v541.png',
  './assets/home-hero-polish-v446.webp',
  './assets/ui-home-v534.webp'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then(resp => {
      const copy=resp.clone(); caches.open(CACHE_NAME).then(c=>c.put(req,copy)); return resp;
    }).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(resp => {
    if (resp && resp.status === 200 && resp.type === 'basic') {
      const copy=resp.clone(); caches.open(CACHE_NAME).then(c=>c.put(req,copy));
    }
    return resp;
  })));
});
