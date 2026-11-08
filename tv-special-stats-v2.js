/* Small, page-local counters. One read of each total after page load. No observers or polling. */
(function(){
'use strict';
var likeKey='news-58-live-fantom456-v1';
var viewKey='news-58-live-fantom456';
var likeUrl='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/'+encodeURIComponent(likeKey)+'.json';
var viewUrl='https://abacus.jasoncameron.dev/';
var storageKey='belaya-mgla-firebase-liked-'+likeKey;
var sessionKey='bm-view-counted:'+viewKey;
var isArticle=!!document.querySelector('[data-tvs-article]');
var likeButton=document.querySelector('[data-tvs-like]');
var likeCount=document.querySelector('[data-tvs-like-count]');
var viewCount=document.querySelector('[data-tvs-views]');
if(!likeButton&&!likeCount&&!viewCount)return;
var busy=false,changed=false;
var format=function(v){return Number(v).toLocaleString('ru-RU')};
var liked=function(){try{return localStorage.getItem(storageKey)==='1'}catch(e){return false}};
function display(target,value){if(target)target.textContent=typeof value==='number'&&Number.isFinite(value)&&value>=0?format(value):'—'}
function sync(){
 if(!likeButton)return;
 var on=liked();
 likeButton.disabled=on||busy;
 likeButton.classList.toggle('is-liked',on);
 likeButton.setAttribute('aria-pressed',String(on));
 likeButton.setAttribute('aria-label',on?'Лайк поставлен':'Поставить лайк');
 var label=likeButton.querySelector('[data-tvs-like-label]');
 if(label)label.textContent=on?'Спасибо!':'Нравится';
}
function request(url,options){
 var controller=typeof AbortController==='function'?new AbortController():null;
 var timeout=controller?setTimeout(function(){controller.abort()},4000):null;
 var opt=Object.assign({cache:'no-store'},options||{});
 if(controller)opt.signal=controller.signal;
 return fetch(url,opt).then(function(r){if(!r.ok)throw Error('Service unavailable');return r.json()}).finally(function(){if(timeout)clearTimeout(timeout)});
}
if(likeButton){
 likeButton.addEventListener('click',function(){
   if(busy||liked())return;
   busy=true;sync();
   request(likeUrl,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({'.sv':{increment:1}})})
     .then(function(v){changed=true;try{localStorage.setItem(storageKey,'1')}catch(e){};display(likeCount,typeof v==='number'?v:null)})
     .catch(function(){display(likeCount,null)})
     .finally(function(){busy=false;sync()});
 });
}
sync();
function load(){
 if(likeCount){
   request(likeUrl).then(function(v){if(!changed)display(likeCount,typeof v==='number'?v:0)}).catch(function(){if(!changed)display(likeCount,null)});
 }
 if(viewCount){
   var seen=false;
   try{seen=sessionStorage.getItem(sessionKey)==='1'}catch(e){}
   var action=isArticle&&!seen?'hit':'get';
   request(viewUrl+action+'/belaya-mgla-sova58/'+encodeURIComponent(viewKey))
     .then(function(v){display(viewCount,typeof(v&&v.value)==='number'?v.value:null);if(isArticle&&!seen)try{sessionStorage.setItem(sessionKey,'1')}catch(e){}})
     .catch(function(){display(viewCount,null)});
 }
}
// Give rendering and the rest of the site time to settle before requesting counters.
if(document.readyState==='complete')setTimeout(load,700);
else window.addEventListener('load',function(){setTimeout(load,700)},{once:true});
})();
