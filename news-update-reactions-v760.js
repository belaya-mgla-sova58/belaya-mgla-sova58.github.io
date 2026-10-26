(function(){
  'use strict';

  var LIKE_KEY='news-update-2026-10-19-v1';
  var LIKED_KEY='belaya-mgla-firebase-liked-'+LIKE_KEY;
  var LIKE_URL='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/'+encodeURIComponent(LIKE_KEY)+'.json';

  function isLiked(){try{return localStorage.getItem(LIKED_KEY)==='1';}catch(e){return false;}}
  function rememberLike(){try{localStorage.setItem(LIKED_KEY,'1');}catch(e){}}
  function buttons(){return document.querySelectorAll('[data-update-like-v760]');}
  function setCount(value){
    var n=Number(value);if(!Number.isFinite(n)||n<0)n=0;
    buttons().forEach(function(btn){var el=btn.querySelector('[data-like-count-v760]');if(el)el.textContent=n.toLocaleString('ru-RU');});
  }
  function setState(){
    var liked=isLiked();
    buttons().forEach(function(btn){
      btn.classList.toggle('is-liked',liked);btn.disabled=liked;
      btn.setAttribute('aria-label',liked?'Лайк уже поставлен':'Поставить лайк новости');
      var label=btn.querySelector('[data-like-label-v760]');if(label)label.textContent=liked?'Спасибо!':'Нравится';
    });
  }
  function setBusy(busy){buttons().forEach(function(btn){if(!isLiked())btn.disabled=!!busy;btn.classList.toggle('is-loading',!!busy);});}

  async function loadLikes(){
    try{
      var r=await fetch(LIKE_URL,{method:'GET',cache:'no-store',headers:{Accept:'application/json'}});
      if(!r.ok)throw new Error('read');
      var v=await r.json();setCount(typeof v==='number'?v:0);
    }catch(e){document.querySelectorAll('[data-like-count-v760]').forEach(function(el){el.textContent='—';});}
  }

  async function addLike(){
    if(isLiked())return;
    var first=document.querySelector('[data-like-count-v760]');
    var before=first?parseInt(String(first.textContent||'0').replace(/\s/g,''),10)||0:0;
    setCount(before+1);setBusy(true);
    try{
      var r=await fetch(LIKE_URL,{method:'PUT',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({'.sv':{increment:1}})});
      if(!r.ok)throw new Error('write');
      var v=await r.json();rememberLike();setState();setCount(typeof v==='number'?v:before+1);
    }catch(e){setCount(before);setBusy(false);}
  }

  function makeButton(extraClass,compact){
    var b=document.createElement('button');b.type='button';
    b.className='update-like-v760 '+(extraClass||'');
    b.setAttribute('data-update-like-v760','');b.setAttribute('aria-label','Поставить лайк новости');
    b.innerHTML='<span class="update-like-heart-v760" aria-hidden="true">♥</span>'+(compact?'':'<span data-like-label-v760>Нравится</span>')+'<b data-like-count-v760>…</b>';
    b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();addLike();});return b;
  }

  function addStyles(){
    if(document.getElementById('news-update-reactions-style-v760'))return;
    var s=document.createElement('style');s.id='news-update-reactions-style-v760';
    s.textContent='.update-like-v760{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:38px;padding:8px 12px;border:1px solid rgba(255,190,210,.42);border-radius:999px;background:linear-gradient(145deg,rgba(255,255,255,.13),rgba(255,126,170,.12));color:#fff;font:inherit;font-size:13px;font-weight:850;line-height:1;cursor:pointer;box-shadow:inset 0 1px rgba(255,255,255,.08),0 8px 20px rgba(0,0,0,.13);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}.update-like-v760.is-liked{background:linear-gradient(145deg,rgba(255,93,145,.25),rgba(188,74,146,.22));border-color:rgba(255,166,198,.72)}.update-like-heart-v760{color:#ff759f;font-size:20px;line-height:1}.update-like-v760 b{color:#fff;font-size:13px}.update-meta .update-like-v760{min-height:auto;padding:9px 12px}.ru-update-like-v760{position:absolute;right:12px;top:12px;z-index:6;min-width:58px;background:rgba(4,16,38,.88)}.home-news-update-v760{display:none!important}@media(max-width:700px){.ru-update-like-v760{right:10px;top:10px;padding:7px 9px}}';
    document.head.appendChild(s);
  }

  function addArticleLike(){
    var meta=document.querySelector('.update-news-20261019 .update-meta');
    if(meta&&!meta.querySelector('[data-update-like-v760]'))meta.appendChild(makeButton('article-update-like-v760',false));
  }

  function addRuListLike(){
    document.querySelectorAll('.ru-updates-grid-v545 .news-category-card.ru').forEach(function(card){
      var link=card.querySelector('a[href*="news-update-2026-10-19.html"]');
      if(link&&!card.querySelector('[data-update-like-v760]'))card.appendChild(makeButton('ru-update-like-v760',true));
    });
  }

  function removeLegacyHomeCard(){document.querySelectorAll('.home-news-update-v760').forEach(function(el){el.remove();});}

  function start(){
    addStyles();removeLegacyHomeCard();addArticleLike();addRuListLike();setState();loadLikes();
    if(document.body.classList.contains('is-home-route')){
      var grid=document.querySelector('.home-news-grid-v442');
      if(grid)new MutationObserver(removeLegacyHomeCard).observe(grid,{childList:true});
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  document.addEventListener('visibilitychange',function(){if(!document.hidden)loadLikes();});
})();
