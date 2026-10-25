const CACHE_NAME = 'belaya-mgla-v645';
const CORE = [
  './',
  './index.html',
  './cheats.html',
  './creative-bananovyi-mom.html',
  './site-v626.min.css?v=626',
  './site-v629.min.js?v=629',
  './posthog-v734.js?v=735',
  './app-splash-v726.js?v=733',
  './app-splash-v733.js?v=733',
  './assets/splash-winter-v733.webp',
  './site-cleanup-v632.js?v=632',
  './ui-cheats-v583.svg',
  './manifest-v541.webmanifest',
  './app-icon-192-v541.png',
  './app-icon-512-v541.png',
  './assets/home-hero-polish-v446.webp?v=630',
  './assets/ui-home-v534.webp',
  './assets/ui-events-v534.webp',
  './assets/ui-calculator-v534.webp',
  './assets/ui-knowledge-v534.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate' || req.destination === 'script') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const resp = await fetch(req, {cache: 'no-store'});
        if (resp && resp.ok) cache.put(req, resp.clone());
        return resp;
      } catch (e) {
        return (await cache.match(req, {ignoreSearch:true})) || (req.mode === 'navigate' ? await cache.match('./index.html') : Response.error());
      }
    })());
    return;
  }

  if (req.destination === 'audio' || req.destination === 'video') return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    if (cached) {
      event.waitUntil(fetch(req, {cache:'no-store'}).then(resp => {
        if (resp && resp.ok && resp.type === 'basic') return cache.put(req, resp.clone());
      }).catch(()=>{}));
      return cached;
    }
    try {
      const resp = await fetch(req, {cache:'no-store'});
      if (resp && resp.ok && resp.type === 'basic') cache.put(req, resp.clone());
      return resp;
    } catch (e) {
      return Response.error();
    }
  })());
});
