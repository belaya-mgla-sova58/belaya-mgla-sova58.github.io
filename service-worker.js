const CACHE_NAME = 'belaya-mgla-v598';
const CORE = [
  './',
  './index.html',
  './cheats.html',
  './creative-bananovyi-mom.html',
  './site-v269.css?v=586',
  './site-v269.js?v=586',
  './banana-song-cover-v596.css?v=598',
  './ui-cheats-v583.svg',
  './manifest-v541.webmanifest',
  './app-icon-192-v541.png',
  './app-icon-512-v541.png',
  './assets/home-hero-polish-v446.webp',
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

  /* Pages: network first so edited text/design is never hidden by an old cached HTML page. */
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const resp = await fetch(req, {cache: 'no-store'});
        if (resp && resp.ok) cache.put(req, resp.clone());
        return resp;
      } catch (e) {
        return (await cache.match(req, {ignoreSearch:true})) || (await cache.match('./index.html'));
      }
    })());
    return;
  }

  /* Static files: cache first, update in background. */
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    if (cached) {
      event.waitUntil(fetch(req).then(resp => {
        if (resp && resp.ok && (resp.type === 'basic' || resp.type === 'cors')) {
          return cache.put(req, resp.clone());
        }
      }).catch(()=>{}));
      return cached;
    }
    try {
      const resp = await fetch(req);
      if (resp && resp.ok && (resp.type === 'basic' || resp.type === 'cors')) {
        cache.put(req, resp.clone());
      }
      return resp;
    } catch (e) {
      return Response.error();
    }
  })());
});
