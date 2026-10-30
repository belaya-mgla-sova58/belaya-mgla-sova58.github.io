const CACHE_NAME = 'belaya-mgla-v686';
const STATIC_CORE = [
  './site-v626.min.css?v=626',
  './site-performance-v1.css?v=20261030-perf1',
  './home-inline-v686.css?v=686',
  './events-inline-v685.css?v=685',
  './hero-shared-v687.css?v=687',
  './hero-generation-shared-v688.css?v=688',
  './manifest-v541.webmanifest',
  './assets/home-hero-polish-v447.webp',
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

function optimizeHtml(html){
  html=html.replace(/<section\s+class=["']pwa-install-v540["'][\s\S]*?<\/section>/i,'');
  html=html.replace(/<link\b(?=[^>]*\brel=["']preload["'])(?=[^>]*\bas=["']image["'])(?=[^>]*\bhref=["']assets\/(?:img_e430aab46e8893e4|img_e3dc0571d069e24d|img_5c51535e4e647ea6)\.webp["'])[^>]*\/?\s*>/gi,'');
  html=html.replace(/<img\b(?![^>]*\bloading\s*=)(?![^>]*\bfetchpriority\s*=\s*["']high["'])/gi,'<img loading="lazy" ');
  return html;
}

async function freshPage(req){
  const resp=await fetch(req,{cache:'no-store'});
  const type=(resp.headers.get('content-type')||'').toLowerCase();
  if(!resp.ok||!type.includes('text/html')) return resp;
  let html=optimizeHtml(await resp.text());
  const tag='<script defer src="site-repair-v662.js?v=20261030-audit1"></script>';
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

async function freshControlAsset(req){
  const cache=await caches.open(CACHE_NAME);
  try{
    const resp=await fetch(req,{cache:'no-store'});
    if(resp&&resp.ok&&resp.type==='basic') await cache.put(req,resp.clone());
    return resp;
  }catch(e){
    return (await cache.match(req))||Response.error();
  }
}

function isCriticalInteractive(url){
  const p=url.pathname;
  return p.endsWith('/site-repair-v662.js') ||
    p.endsWith('/home-date-v588.js') ||
    p.includes('/owl-fortune/') ||
    p.includes('/owl-widget-') ||
    p.includes('rune-system') ||
    p.includes('orb-') ||
    p.endsWith('.b64');
}

function isControlAsset(url){
  const p=url.pathname;
  return p.endsWith('/site-v629.min.js') ||
    p.endsWith('/site-author-v625.min.js') ||
    p.endsWith('/pwa-install.js') ||
    p.endsWith('/home-alliance-questionnaire-v731.js') ||
    p.endsWith('/search-expanded-v724.js');
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

  if(isCriticalInteractive(url)){
    event.respondWith(fetch(req,{cache:'no-store'}).catch(()=>Response.error()));
    return;
  }

  if(isControlAsset(url)){
    event.respondWith(freshControlAsset(req));
    return;
  }

  if(req.destination==='audio'||req.destination==='video') return;

  event.respondWith(cachedAsset(req,event));
});