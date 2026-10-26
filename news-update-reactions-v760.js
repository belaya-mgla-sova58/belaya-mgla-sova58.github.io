(function(){
  'use strict';

  var ARTICLE_HREF='news-update-2026-10-19.html?v=760';
  var LIKE_KEY='news-update-2026-10-19-v1';
  var LIKED_KEY='belaya-mgla-firebase-liked-'+LIKE_KEY;
  var LIKE_URL='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/'+encodeURIComponent(LIKE_KEY)+'.json';
  var VIEW_URL='https://abacus.jasoncameron.dev/get/belaya-mgla-sova58/ru-update-2026-10-19';

  function isLiked(){
    try{return localStorage.getItem(LIKED_KEY)==='1';}catch(e){return false;}
  }

  function rememberLike(){
    try{localStorage.setItem(LIKED_KEY,'1');}catch(e){}
  }

  function allLikeButtons(){
    return document.querySelectorAll('[data-update-like-v760]');
  }

  function setLikeCount(value){
    var count=Number(value);
    if(!Number.isFinite(count)||count<0)count=0;
    allLikeButtons().forEach(function(btn){
      var el=btn.querySelector('[data-like-count-v760]');
      if(el)el.textContent=count.toLocaleString('ru-RU');
    });
  }

  function setLikeState(){
    var liked=isLiked();
    allLikeButtons().forEach(function(btn){
      btn.classList.toggle('is-liked',liked);
      btn.disabled=liked;
      btn.setAttribute('aria-label',liked?'Лайк уже поставлен':'Поставить лайк новости');
      var label=btn.querySelector('[data-like-label-v760]');
      if(label)label.textContent=liked?'Спасибо!':'Нравится';
    });
  }

  function setBusy(busy){
    allLikeButtons().forEach(function(btn){
      if(!isLiked())btn.disabled=!!busy;
      btn.classList.toggle('is-loading',!!busy);
    });
  }

  async function loadLikes(){
    try{
      var r=await fetch(LIKE_URL,{method:'GET',cache:'no-store',headers:{Accept:'application/json'}});
      if(!r.ok)throw new Error('like read '+r.status);
      var v=await r.json();
      setLikeCount(typeof v==='number'?v:0);
    }catch(e){
      document.querySelectorAll('[data-like-count-v760]').forEach(function(el){el.textContent='—';});
    }
  }

  async function addLike(){
    if(isLiked())return;
    var first=document.querySelector('[data-like-count-v760]');
    var before=first?parseInt(String(first.textContent||'0').replace(/\s/g,''),10)||0:0;
    setLikeCount(before+1);
    setBusy(true);
    try{
      var r=await fetch(LIKE_URL,{method:'PUT',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({'.sv':{increment:1}})});
      if(!r.ok)throw new Error('like write '+r.status);
      var v=await r.json();
      rememberLike();
      setLikeState();
      setLikeCount(typeof v==='number'?v:before+1);
    }catch(e){
      setLikeCount(before);
      setBusy(false);
    }
  }

  function likeButton(extraClass,compact){
    var b=document.createElement('button');
    b.type='button';
    b.className='update-like-v760 '+(extraClass||'');
    b.setAttribute('data-update-like-v760','');
    b.setAttribute('aria-label','Поставить лайк новости');
    b.innerHTML='<span class="update-like-heart-v760" aria-hidden="true">♥</span>'+
      (compact?'':'<span data-like-label-v760>Нравится</span>')+
      '<b data-like-count-v760>…</b>';
    b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();addLike();});
    return b;
  }

  function addStyles(){
    if(document.getElementById('news-update-reactions-style-v760'))return;
    var s=document.createElement('style');
    s.id='news-update-reactions-style-v760';
    s.textContent='\
.update-like-v760{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:38px;padding:8px 12px;border:1px solid rgba(255,190,210,.42);border-radius:999px;background:linear-gradient(145deg,rgba(255,255,255,.13),rgba(255,126,170,.12));color:#fff;font:inherit;font-size:13px;font-weight:850;line-height:1;cursor:pointer;box-shadow:inset 0 1px rgba(255,255,255,.08),0 8px 20px rgba(0,0,0,.13);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:.18s transform,.18s background,.18s border-color}.update-like-v760:hover{transform:translateY(-1px);background:linear-gradient(145deg,rgba(255,255,255,.18),rgba(255,94,151,.18));border-color:rgba(255,199,218,.7)}.update-like-v760:disabled{cursor:default;opacity:1}.update-like-v760.is-liked{background:linear-gradient(145deg,rgba(255,93,145,.25),rgba(188,74,146,.22));border-color:rgba(255,166,198,.72)}.update-like-heart-v760{color:#ff759f;font-size:20px;line-height:1}.update-like-v760.is-liked .update-like-heart-v760{color:#ff9fbd}.update-like-v760 b{color:#fff;font-size:13px;font-variant-numeric:tabular-nums}.update-like-v760.is-loading{pointer-events:none;opacity:.74}\
.update-meta .update-like-v760{min-height:auto;padding:9px 12px}\
.ru-update-like-v760{position:absolute;right:12px;top:12px;z-index:6;min-width:58px;background:rgba(4,16,38,.88)}\
.home-news-update-v760{position:relative;min-height:128px;overflow:hidden;border:1px solid rgba(126,211,255,.20);border-radius:20px;background:radial-gradient(circle at 85% 12%,rgba(175,127,255,.26),transparent 34%),radial-gradient(circle at 12% 85%,rgba(62,203,255,.19),transparent 38%),linear-gradient(145deg,rgba(5,39,73,.96),rgba(27,25,72,.94));box-shadow:0 14px 32px rgba(0,9,28,.22)}.home-news-update-link-v760{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;justify-content:flex-end;padding:20px 96px 18px 18px;text-decoration:none!important}.home-news-update-link-v760:before{content:"📰";position:absolute;right:20px;top:15px;font-size:42px;filter:drop-shadow(0 7px 15px rgba(0,0,0,.2))}.home-news-update-link-v760 b{display:block;color:#fff;font-size:17px;line-height:1.18}.home-news-update-link-v760 small{display:block;margin-top:6px;color:#bcdaf0;font-size:11.5px;line-height:1.35}.home-news-update-stats-v760{position:absolute;left:18px;top:14px;z-index:3;display:inline-flex;align-items:center;gap:5px;padding:6px 9px;border-radius:999px;background:rgba(3,18,39,.72);border:1px solid rgba(154,220,255,.22);color:#dff4ff;font-size:10.5px;font-weight:850;pointer-events:none}.home-news-update-v760 .update-like-v760{position:absolute;right:12px;bottom:12px;z-index:4;min-width:58px;background:rgba(4,16,38,.88)}\
@media(max-width:700px){.ru-update-like-v760{right:10px;top:10px;padding:7px 9px}.home-news-update-v760{min-height:118px}.home-news-update-link-v760{padding:18px 82px 17px 14px}.home-news-update-link-v760 b{font-size:15px}.home-news-update-stats-v760{left:14px;top:12px}}';
    document.head.appendChild(s);
  }

  function addArticleLike(){
    var meta=document.querySelector('.update-news-20261019 .update-meta');
    if(!meta||meta.querySelector('[data-update-like-v760]'))return;
    meta.appendChild(likeButton('article-update-like-v760',false));
  }

  function addRuListLike(){
    var cards=document.querySelectorAll('.ru-updates-grid-v545 .news-category-card.ru');
    cards.forEach(function(card){
      var link=card.querySelector('a[href*="news-update-2026-10-19.html"]');
      if(!link||card.querySelector('[data-update-like-v760]'))return;
      card.appendChild(likeButton('ru-update-like-v760',true));
    });
  }

  function addHomeCard(){
    if(!document.body.classList.contains('is-home-route'))return;
    var grid=document.querySelector('.home-news-grid-v442');
    if(!grid||grid.querySelector('.home-news-update-v760'))return;
    var card=document.createElement('div');
    card.className='home-news-update-v760';
    card.innerHTML='<a class="home-news-update-link-v760" href="'+ARTICLE_HREF+'"><b>Большое обновление 19 октября</b><small>Новые функции, события, эксперты и важные изменения</small></a><span class="home-news-update-stats-v760">👁 <b data-update-home-views-v760>…</b></span>';
    card.appendChild(likeButton('home-update-like-v760',true));
    grid.insertBefore(card,grid.firstChild);
  }

  async function loadHomeViews(){
    var el=document.querySelector('[data-update-home-views-v760]');
    if(!el)return;
    try{
      var r=await fetch(VIEW_URL,{cache:'no-store',mode:'cors'});
      if(!r.ok)throw new Error('view read '+r.status);
      var d=await r.json();
      var v=Number(d&&d.value);
      el.textContent=Number.isFinite(v)?v.toLocaleString('ru-RU'):'—';
    }catch(e){el.textContent='—';}
  }

  function start(){
    addStyles();
    addArticleLike();
    addRuListLike();
    addHomeCard();
    setLikeState();
    loadLikes();
    loadHomeViews();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  document.addEventListener('visibilitychange',function(){if(!document.hidden){loadLikes();loadHomeViews();}});
})();
