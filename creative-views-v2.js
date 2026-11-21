/* SOVA58 Creative views v3. Catalogue reads only; article counts once per browser per 24h.
   Dedicated keys deliberately do not inherit corrupted legacy counters. */
(function(){
'use strict';
var BASE='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/';
var items={
 'creative-solnechny-zamok.html':'solnechny-zamok',
 'creative-bananovyi-mom.html':'bananovyi-mom',
 'creative-roman48.html':'roman48',
 'creative-amoress-painting.html':'amoress-painting',
 'creative-boss-little-furnace.html':'little-furnace',
 'creative-boss-joe.html':'joe'
};
/* Browser lifetime guard: no repeat on refresh or returning visit. */
function key(id){return '__creative_clean_views_v3_'+id;}
function url(id){return BASE+encodeURIComponent(key(id))+'.json';}
function valid(n){return typeof n==='number'&&isFinite(n)&&n>=0&&Math.floor(n)===n&&n<=1000000000;}
function show(el,n){if(el)el.textContent=valid(n)?String(n):'—';}
async function read(id,el){
 try{var response=await fetch(url(id),{cache:'no-store'});if(!response.ok)throw Error('read '+response.status);
 var n=await response.json();show(el,n===null?0:n);}
 catch(e){show(el,null);}
}
function storage(id){return 'sova58-creative-counted-v3:'+id;}
async function article(id){
 var el=document.querySelector('[data-song-view-count] b');
 if(!el){
   var head=document.querySelector('.creative-v349-article .creative-v349-head');
   if(head){
     var badge=document.createElement('div');badge.className='sova-creative-views-v2';
     badge.innerHTML='<span aria-hidden="true">◉</span> Просмотры: <b>—</b>';
     head.appendChild(badge);el=badge.querySelector('b');
   }
 }
 if(!el)return;
 var stamp=0;try{stamp=Number(localStorage.getItem(storage(id))||0)||0;}catch(e){}
 if(stamp){read(id,el);return;}
 // Claim the daily visit before network I/O, preventing refresh and multi-tab races.
 var now=Date.now();try{localStorage.setItem(storage(id),String(now));}catch(e){}
 try{
   var response=await fetch(url(id),{
     method:'PUT',cache:'no-store',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({'.sv':{'increment':1}})
   });
   if(!response.ok)throw Error('write '+response.status);
   var n=await response.json();if(!valid(n))throw Error('invalid response');
   show(el,n);
 }catch(e){
   /* Never retry a possibly committed view. */
   read(id,el);
 }
}
function init(){
 var page=location.pathname.split('/').pop().toLowerCase();
 if(items[page]){article(items[page]);return;}
 if(page==='creative-corner.html'){
   document.querySelectorAll('a[href] [data-creative-view]').forEach(function(stat){
     var anchor=stat.closest('a[href]');if(!anchor)return;
     var target=(anchor.getAttribute('href')||'').split('?')[0].split('#')[0];
     var id=items[target];if(id)read(id,stat.querySelector('b'));
   });
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
