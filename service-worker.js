const CACHE_NAME = 'belaya-mgla-v661';
const STATIC_CORE = [
  './site-v626.min.css?v=626',
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
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CORE))
      .catch(() => {})
  );
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

  // HTML and JavaScript must never come from an old site cache.
  if (req.mode === 'navigate' || req.destination === 'script' || url.pathname.endsWith('.html') || url.pathname.endsWith('.js')) {
    event.respondWith(
      fetch(req, { cache: 'no-store' }).catch(async () => {
        if (req.mode === 'navigate') {
          const fresh = await fetch('./index.html?offline-fallback=661', { cache: 'no-store' }).catch(() => null);
          if (fresh) return fresh;
        }
        return Response.error();
      })
    );
    return;
  }

  if (req.destination === 'audio' || req.destination === 'video') return;

  // Images/CSS can use stale-while-revalidate safely.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    const network = fetch(req, { cache: 'no-store' })
      .then(resp => {
        if (resp && resp.ok && resp.type === 'basic') cache.put(req, resp.clone());
        return resp;
      })
      .catch(() => null);
    if (cached) {
      event.waitUntil(network);
      return cached;
    }
    return (await network) || Response.error();
  })());
});