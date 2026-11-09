/* SOVA58 v1040: minimalist neon rings for sidebar and homepage links. */
(function(){
'use strict';
const designs={
 'index.html':{c:['#7eeaff','#257fbd','#0a285f'],path:'<path d="M9 39V19h5V12l5 4V9l5-5 5 5v7l5-4v7h5v20z"/><path d="M14 39V24h20v15M20 39v-8a4 4 0 0 1 8 0v8M19 22h2M27 22h2"/>'},
 'events.html':{c:['#8ceaff','#2689ae','#12376e'],path:'<rect x="10" y="14" width="28" height="25" rx="3"/><path d="M16 10v8M32 10v8M10 22h28"/><path d="m24 25 1.5 4.5L30 31l-4.5 1.5L24 37l-1.5-4.5L18 31l4.5-1.5z"/>'},
 'heroes.html':{c:['#edc5ff','#9953de','#39246f'],path:'<path d="M24 9 10 15v11c0 9 7 13 14 17 7-4 14-8 14-17V15z"/><path d="m24 17 2.6 5.3 5.8.9-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.9z"/>'},
 'gear.html':{c:['#d3f9ff','#4bb6d9','#1a4774'],path:'<path d="m17 11 7-3 7 3 9 8-6 6-4-4v19H18V21l-4 4-6-6z"/><path d="M18 12c3 5 9 5 12 0M20 34h8"/>'},
 'experts.html':{c:['#ffcaff','#b05bc6','#4a286d'],path:'<path d="M24 13c-6-4-12-4-16-2v25c5-2 11-2 16 2 5-4 11-4 16-2V11c-4-2-10-2-16 2zM24 13v25M13 20h6M29 20h6M14 26h5M29 26h5"/><path d="m24 5 1.4 3.6L29 10l-3.6 1.4L24 15l-1.4-3.6L19 10l3.6-1.4z"/>'},
 'pets.html':{c:['#bcffeb','#39c8af','#0a655d'],path:'<path d="M16 28c-4 4-4 11 1 12 3 1 5-1 7-1s4 2 7 1c5-1 5-8 1-12-4-5-12-5-16 0z"/><ellipse cx="13" cy="21" rx="3" ry="4"/><ellipse cx="21" cy="15" rx="3" ry="4"/><ellipse cx="30" cy="15" rx="3" ry="4"/><ellipse cx="37" cy="21" rx="3" ry="4"/>'},
 'calculators.html':{c:['#ffe7ae','#e5a843','#81511d'],path:'<rect x="12" y="8" width="24" height="33" rx="4"/><rect x="17" y="14" width="14" height="8" rx="1"/><path d="M18 28h2M25 28h2M18 34h2M25 34h5"/>'},
 'other.html':{c:['#d4e9ff','#638fdc','#274070'],path:'<path d="M24 15c-5-4-10-4-16-2v25c7-3 12-1 16 3 4-4 9-6 16-3V13c-6-2-11-2-16 2z"/><path d="M24 15v26M13 21h6M13 27h6M29 21h6M29 27h6"/>'},
 'bear-helper.html':{c:['#ffd6a7','#bf854c','#5b392b'],path:'<circle cx="14" cy="14" r="6"/><circle cx="34" cy="14" r="6"/><path d="M10 25c0-9 6-15 14-15s14 6 14 15v5c0 7-6 12-14 12S10 37 10 30z"/><ellipse cx="24" cy="31" rx="7" ry="5"/><circle cx="18" cy="25" r="1.5"/><circle cx="30" cy="25" r="1.5"/><path d="m22 31 2 2 2-2"/>'},
 'svs-prep.html':{c:['#e2c9ff','#9b72da','#443276'],path:'<path d="M13 41V9M14 12c8-5 11 5 21 0v20c-10-5-13 5-21 0"/><path d="m25 18 2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z"/>'},
 'labyrinth.html':{c:['#dfc6ff','#9278df','#4c358b'],path:'<path d="M11 10h27v10H20v10h9v-5h9v13H11V22h5v-7h9"/><path d="M11 10v7M38 10v5"/>'},
 'farm.html':{c:['#ceffbf','#6fb96a','#285b42'],path:'<path d="M24 41V15M24 26C13 26 11 19 12 13c8 0 12 6 12 13zM24 23c0-10 6-14 13-13 0 9-4 13-13 13zM14 41h20"/>'}
};
const style=document.createElement('style');
style.id='sova-illustrated-icons-v1031';
style.textContent='.nav-wrap nav>a.route-link>svg.sova-jewel-icon-v1031{display:block!important;flex:0 0 31px!important;width:31px!important;height:31px!important;min-width:31px!important;min-height:31px!important;margin:0!important;padding:0!important;overflow:visible!important;filter:drop-shadow(0 0 3px rgba(81,179,255,.30))!important;transition:transform .18s,filter .18s!important}.nav-wrap nav>a.route-link:hover>svg.sova-jewel-icon-v1031,.nav-wrap nav>a.route-link.active>svg.sova-jewel-icon-v1031{transform:scale(1.06);filter:drop-shadow(0 0 7px rgba(133,203,255,.67))!important}.home-portal-v1016 :is(.home-index-links-v1016,.home-tools-grid-v1016,.home-portal-links-v1016,.home-quick-links-v1024)>a>svg.sova-jewel-icon-v1031{display:block!important;flex:0 0 33px!important;width:33px!important;height:33px!important;min-width:33px!important;min-height:33px!important;overflow:visible!important;filter:drop-shadow(0 0 3px rgba(106,190,255,.33))!important}.home-more-visible-v1025 :is(.v445-topic-icon,.v424-list-icon){border-radius:50%!important;border:1px solid rgba(104,221,255,.78)!important;background:radial-gradient(circle at 34% 22%,rgba(55,113,197,.3),rgba(8,21,57,.98) 76%)!important;box-shadow:inset 0 0 8px rgba(46,139,245,.17),0 0 5px rgba(53,162,255,.38)!important}.home-more-visible-v1025 :is(.v445-topic-icon,.v424-list-icon) .home-winter-glyph-v1028{filter:drop-shadow(0 0 2px rgba(117,227,255,.65))!important}@media(max-width:720px){.nav-wrap nav>a.route-link>svg.sova-jewel-icon-v1031{width:29px!important;height:29px!important;min-width:29px!important;min-height:29px!important;flex-basis:29px!important}}@media(prefers-reduced-motion:reduce){.nav-wrap nav>a.route-link>svg.sova-jewel-icon-v1031{transition:none!important}}';
function iconFor(key,index){
 const d=designs[key];if(!d)return null;
 const id='sova-gem-'+index;
 const xml='<svg xmlns="http://www.w3.org/2000/svg" class="sova-jewel-icon-v1031" viewBox="0 0 48 48" aria-hidden="true" focusable="false">'+
 '<defs><linearGradient id="'+id+'s" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f7ffff"/><stop offset=".48" stop-color="'+d.c[0]+'"/><stop offset="1" stop-color="#be83ff"/></linearGradient></defs>'+
 '<circle cx="24" cy="23" r="20.6" fill="#081a3b" fill-opacity=".64" stroke="#7fcaff" stroke-opacity=".22" stroke-width="2.7"/>'+
 '<circle cx="24" cy="23" r="20.6" fill="none" stroke="url(#'+id+'s)" stroke-width="1.35"/>'+
 '<path d="M8 13a20 20 0 0 1 27-6" fill="none" stroke="#b3edff" stroke-opacity=".72" stroke-width="1.3" stroke-linecap="round"/>'+
 '<g fill="none" stroke="url(#'+id+'s)" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round">'+d.path+'</g>'+
 '<path d="M24 42l3.4 3.4L24 48l-3.4-2.6z" fill="#7bd9ff" stroke="#b1d3ff" stroke-width=".45"/>'+
 '</svg>';
 try{return new DOMParser().parseFromString(xml,'image/svg+xml').documentElement}catch(_){return null}
}
function init(){
 if(!document.getElementById(style.id))document.head.appendChild(style);
 const selector='.nav-wrap nav a.route-link img.sidebar-color-icon, .home-index-links-v1016>a>img, .home-tools-grid-v1016>a>img, .home-portal-links-v1016>a>img, .home-quick-links-v1024>a>img';
 let n=0;
 document.querySelectorAll(selector).forEach(function(img){
  const link=img.closest('a[href]');if(!link)return;
  const key=link.getAttribute('href').split(/[?#]/)[0].replace(/^\.\//,'');
  const svg=iconFor(key,++n);
  if(svg&&svg.nodeName.toLowerCase()==='svg')img.replaceWith(document.importNode(svg,true));
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
