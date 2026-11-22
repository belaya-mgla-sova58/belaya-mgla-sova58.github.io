/* Белая мгла: обновление 22.11.2026.
   No stale offline snapshots. HTML, CSS, JS and JSON are network-fresh.
   Player progress in localStorage/IndexedDB is never touched. */
const CACHE_NAME='belaya-mgla-v1226';

self.addEventListener('install',function(event){
  // Release the previous worker immediately.
  self.skipWaiting();
});

self.addEventListener('activate',function(event){
  event.waitUntil((async function(){
    // Delete only site-owned legacy caches. Keep local player data intact.
    const names=await caches.keys();
    await Promise.all(names.filter(function(name){
      return name.startsWith('belaya-mgla-');
    }).map(function(name){return caches.delete(name)}));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',function(event){
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  // Navigation and UI code must never fall back to a previous release.
  if(request.mode==='navigate' || /\.(?:html|css|js|json|webmanifest)$/i.test(url.pathname)){
    event.respondWith(fetch(request,{cache:'no-store'}));
  }
  // Images and media retain native browser caching to save bandwidth.
});
