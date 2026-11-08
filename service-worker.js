const CACHE_NAME = 'belaya-mgla-v1004';
const STATIC_CORE = [
  './site-v626.min.css?v=985',
  './site-desktop-v985.css?v=985',
  './site-v629.min.js?v=1004'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CORE.map(path => new Request(path,{cache:'reload'})))).catch(()=>{}));
  self.skipWaiting();
});

// Updates should not forcibly reload open tabs or discard user input.
self.addEventListener('activate', event => {
  event.waitUntil(
    self.clients.claim().then(() => {
      // Cleanup is best-effort; it cannot block the newly active worker.
      caches.keys().then(keys => Promise.all(
        keys.filter(k => k.startsWith('belaya-mgla-') && k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )).catch(() => {});
    })
  );
});

// HTML is always loaded directly from the network. Do not rewrite resource
// versions or remove page sections: the published HTML is the source of truth.
async function freshPage(req){
  return fetch(req,{cache:'no-store'});
}

// Only explicitly versioned core CSS/JS are cache-first. A new ?v= URL
// always creates a separate entry; HTML navigation still fetches fresh.
function isVersionedCoreAsset(url){
  const path=url.pathname;
  const version=url.searchParams.get('v')||'';
  return /^[0-9]{3,4}$/.test(version) && (
    path.endsWith('/site-v626.min.css') ||
    path.endsWith('/site-home-v995.css') ||
    path.endsWith('/site-desktop-v985.css')
  );
}

function isFresh(url){
  const p=url.pathname;
  return p.endsWith('/site-v629.min.js') ||
         p.endsWith('/home-alliance-questionnaire-v731.js') ||
         p.endsWith('/search-expanded-v724.js') ||
         p.endsWith('/search-index.json') ||
         p.endsWith('/madam-ugu-v655.js') ||
         p.endsWith('/madam-ugu-mobile-match-v701.js') ||
         p.endsWith('/predictions-cosmic.html') ||
         p.endsWith('/fortune-phrases.txt') ||
         p.endsWith('/pwa-install.js') ||
         p.endsWith('/site-v626.min.css') ||
         p.endsWith('/site-home-v995.css') ||
         p.endsWith('/home-date-v588.js');
}

self.addEventListener('fetch', event => {
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin) return;

  if(req.mode==='navigate'||url.pathname.endsWith('.html')){
    event.respondWith(freshPage(req).catch(()=>fetch(req,{cache:'no-store'})));
    return;
  }

  // Avoid re-downloading the same versioned stylesheet and loader on
  // every route. Cached responses also remain available temporarily offline.
  if(isVersionedCoreAsset(url)){
    event.respondWith(
      caches.open(CACHE_NAME).then(async cache=>{
        const cached=await cache.match(req);
        if(cached)return cached;
        const response=await fetch(req,{cache:'no-store'});
        if(response.ok&&response.type!=='opaque'){
          try{await cache.put(req,response.clone())}catch(e){}
        }
        return response;
      }).catch(()=>fetch(req))
    );
    return;
  }

  if(isFresh(url)){
    event.respondWith(fetch(req,{cache:'no-store'}).catch(()=>Response.error()));
    return;
  }
});