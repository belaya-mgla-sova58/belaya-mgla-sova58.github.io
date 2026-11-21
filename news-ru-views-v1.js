/* RU news view counters: one dedicated counter per article.
   Listing is read-only; reloads do not increment. */
(function(){
 'use strict';
 var ROOT='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/';
 var map={
  'news-update-2026-10-19.html':{key:'ru-update-2026-10-19',ids:['ruUpdateViewsV556','updateViewsV554']},
  'news-halloween-2026.html':{key:'ru-halloween-2026',ids:['ruHalloweenViewsV769','halloweenViewsV764']}
 };
 /* Browser lifetime guard: no repeat on refresh or returning visit. */
 function url(key){return ROOT+encodeURIComponent('__news_clean_views_v1_'+key)+'.json'}
 function valid(v){return typeof v==='number'&&Number.isSafeInteger(v)&&v>=0}
 function display(o,v){o.ids.forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=valid(v)?v.toLocaleString('ru-RU'):'—'})}
 async function read(o){try{var r=await fetch(url(o.key),{cache:'no-store'});if(!r.ok)throw Error('read');var v=await r.json();display(o,v===null?0:v)}catch(e){display(o,null)}}
 async function visit(o){
 var sk='sova-news-view-v1:'+o.key,prev=0,now=Date.now();
 try{prev=Number(localStorage.getItem(sk)||0)||0}catch(e){}
 if(prev){read(o);return}
 try{localStorage.setItem(sk,String(now))}catch(e){}
 try{
  var r=await fetch(url(o.key),{method:'PUT',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({'.sv':{'increment':1}})});
  if(!r.ok)throw Error('write');
  var v=await r.json();if(!valid(v))throw Error('invalid');
  display(o,v);
 }catch(e){read(o)}
 }
 function init(){
 var path=location.pathname.split('/').pop().toLowerCase();
 if(path==='news-ru.html'){Object.keys(map).forEach(function(p){read(map[p])});return}
 if(map[path])visit(map[path]);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();