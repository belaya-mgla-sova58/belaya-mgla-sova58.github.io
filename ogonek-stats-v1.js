/* Common global counters for the first “К вам на огонек” interview.
   News shows totals, article records one visit per browser session.
   Uses the existing Firebase likes and Abacus views services. */
(function(){
  'use strict';
  var likeKey='k-vam-na-ogonek-barash-v1';
  var viewKey='k-vam-na-ogonek-barash';
  var likeUrl='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/'+encodeURIComponent(likeKey)+'.json';
  var viewUrl='https://abacus.jasoncameron.dev/';
  var likedKey='belaya-mgla-firebase-liked-'+likeKey;
  var seenKey='bm-view-counted:'+viewKey;
  var isArticle=!!document.querySelector('[data-ogonek-article]');
  var button=document.querySelector('[data-ogonek-like]');
  var likeEl=document.querySelector('[data-ogonek-like-count]');
  var viewsEl=document.querySelector('[data-ogonek-views]');
  if(!button&&!likeEl&&!viewsEl&&!isArticle)return;
  var busy=false,changed=false;
  function format(x){return Number(x).toLocaleString('ru-RU')}
  function display(node,v){if(node)node.textContent=typeof v==='number'&&Number.isFinite(v)&&v>=0?format(v):'—'}
  function liked(){try{return localStorage.getItem(likedKey)==='1'}catch(e){return false}}
  function refreshButton(){
    if(!button)return;
    var isLiked=liked();
    button.disabled=isLiked||busy;
    button.classList.toggle('is-liked',isLiked);
    button.setAttribute('aria-pressed',String(isLiked));
    button.setAttribute('aria-label',isLiked?'Лайк поставлен':'Поставить лайк интервью');
    var label=button.querySelector('[data-ogonek-like-label]');
    if(label)label.textContent=isLiked?'Спасибо!':'Нравится';
  }
  function request(url,options){
    var ctrl=typeof AbortController==='function'?new AbortController():null;
    var timer=ctrl?setTimeout(function(){ctrl.abort()},4500):null;
    var opts=Object.assign({cache:'no-store'},options||{});
    if(ctrl)opts.signal=ctrl.signal;
    return fetch(url,opts).then(function(res){if(!res.ok)throw Error('Stats unavailable');return res.json()})
      .finally(function(){if(timer)clearTimeout(timer)});
  }
  if(button)button.addEventListener('click',function(){
    if(busy||liked())return;
    busy=true;refreshButton();
    request(likeUrl,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({'.sv':{increment:1}})})
      .then(function(v){changed=true;try{localStorage.setItem(likedKey,'1')}catch(e){}display(likeEl,typeof v==='number'?v:null)})
      .catch(function(){display(likeEl,null)})
      .finally(function(){busy=false;refreshButton()});
  });
  refreshButton();
  function load(){
    if(likeEl)request(likeUrl)
      .then(function(v){if(!changed)display(likeEl,typeof v==='number'?v:0)})
      .catch(function(){if(!changed)display(likeEl,null)});
    if(isArticle||viewsEl){
      var seen=false;
      try{seen=sessionStorage.getItem(seenKey)==='1'}catch(e){}
      var action=isArticle&&!seen?'hit':'get';
      request(viewUrl+action+'/belaya-mgla-sova58/'+encodeURIComponent(viewKey))
        .then(function(v){
          display(viewsEl,typeof(v&&v.value)==='number'?v.value:null);
          if(action==='hit')try{sessionStorage.setItem(seenKey,'1')}catch(e){}
        })
        .catch(function(){display(viewsEl,null)});
    }
  }
  if(document.readyState==='complete')setTimeout(load,600);
  else window.addEventListener('load',function(){setTimeout(load,600)},{once:true});
})();
