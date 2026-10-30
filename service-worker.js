const CACHE_NAME = 'belaya-mgla-v679';
const STATIC_CORE = [
  './site-v626.min.css?v=626',
  './site-performance-v1.css?v=20261030-perf1',
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
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CORE)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function freshPage(req){
  const resp=await fetch(req,{cache:'no-store'});
  const type=(resp.headers.get('content-type')||'').toLowerCase();
  if(!resp.ok||!type.includes('text/html')) return resp;
  let html=await resp.text();
  const tag='<script defer src="site-repair-v662.js?v=20261030-perf1"></script>';
  if(!html.includes('site-repair-v662.js')) html=html.includes('</body>')?html.replace('</body>',tag+'</body>'):html+tag;
  const headers=new Headers(resp.headers);
  headers.set('Cache-Control','no-store, no-cache, must-revalidate, max-age=0');
  headers.delete('content-length');
  return new Response(html,{status:resp.status,statusText:resp.statusText,headers});
}

async function cachedAsset(req,event){
  const cache=await caches.open(CACHE_NAME);
  const cached=await cache.match(req);
  const network=fetch(req).then(resp=>{
    if(resp&&resp.ok&&resp.type==='basic') return cache.put(req,resp.clone()).then(()=>resp);
    return resp;
  }).catch(()=>null);
  if(cached){
    event.waitUntil(network);
    return cached;
  }
  return (await network)||Response.error();
}

self.addEventListener('fetch', event => {
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin) return;

  if(req.mode==='navigate'||url.pathname.endsWith('.html')){
    event.respondWith(freshPage(req).catch(()=>Response.error()));
    return;
  }

  if(req.destination==='audio'||req.destination==='video') return;

  event.respondWith(cachedAsset(req,event));
});