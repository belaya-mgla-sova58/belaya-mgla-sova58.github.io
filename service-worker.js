const CACHE_NAME = 'belaya-mgla-v974';
const STATIC_CORE = [
  './site-v626.min.css?v=974',
  './manifest-v541.webmanifest',
  './assets/home-hero-polish-v447.webp',
  './assets/ui-home-v534.webp',
  './assets/ui-events-v534.webp',
  './assets/ui-heroes-v534.webp',
  './assets/ui-gear-v534.webp',
  './assets/ui-experts-v534.webp',
  './assets/ui-pets-v534.webp',
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
      .then(keys => Promise.all(keys.filter(k => k.startsWith('belaya-mgla-') && k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({type:'window',includeUncontrolled:true}))
      .then(clients => Promise.all(clients.map(client => {
        try{
          const u=new URL(client.url);
          if(u.origin===self.location.origin){
            u.searchParams.set('ugu_refresh','974');
            return client.navigate(u.toString());
          }
        }catch(e){}
        return Promise.resolve();
      })))
  );
});

function optimizeHtml(html){
  html=html.replace(/<section\s+class=["']pwa-install-v540["'][\s\S]*?<\/section>/i,'');
  html=html.replace(/<section\s+class=["']home-today-v581["'][\s\S]*?<\/section>/i,'');
  html=html.replace(/madam-ugu-v655\.js\?v=\d+/g,'madam-ugu-v655.js?v=958');
  html=html.replace(/madam-ugu-mobile-match-v701\.js\?v=\d+/g,'madam-ugu-mobile-match-v701.js?v=714');
  html=html.replace(/pwa-install\.js\?v=\d+/g,'pwa-install.js?v=955');
  html=html.replace(/site-v629\.min\.js\?v=\d+/g,'site-v629.min.js?v=960');
  html=html.replace(/site-v626\.min\.css\?v=\d+/g,"site-v626.min.css?v=974");
  return html;
}

async function freshPage(req){
  const resp=await fetch(req,{cache:'no-store'});
  const type=(resp.headers.get('content-type')||'').toLowerCase();
  if(!resp.ok||!type.includes('text/html')) return resp;
  let html=optimizeHtml(await resp.text());
  const headers=new Headers(resp.headers);
  headers.set('Cache-Control','no-store, no-cache, must-revalidate, max-age=0');
  headers.delete('content-length');
  return new Response(html,{status:resp.status,statusText:resp.statusText,headers});
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

  if(isFresh(url)){
    event.respondWith(fetch(req,{cache:'no-store'}).catch(()=>Response.error()));
    return;
  }
});