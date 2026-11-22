/* Shared counters for the 'К вам на огонёк' interviews.
   Catalog reads totals; each interview records one view per browser session.
   Both views and likes use the same existing Firebase Realtime Database. */
(function(){
  'use strict';
  function init(root, id, isArticle){
    var isZimbabe=id==='zimbabe';
    var likeKey=isZimbabe?'k-vam-na-ogonek-zimbabe-v1':'k-vam-na-ogonek-barash-v1';
    // Historical, user-confirmed numbers (previous Abacus service was unreliable).
    // New increments use independent Firebase keys, without altering old Abacus data.
    var viewKey=isZimbabe?'ogonek-zimbabe-firebase-views-20261121-v1':'ogonek-barash-firebase-views-20261121-v1';
    var viewBaseline=isZimbabe?15:73;
  var likeUrl='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/'+encodeURIComponent(likeKey)+'.json';
  var viewUrl='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/'+encodeURIComponent(viewKey)+'.json';
  var likedKey='belaya-mgla-firebase-liked-'+likeKey;
  var seenKey='bm-view-counted:'+viewKey;
  var cachedViewsKey='bm-view-last:'+viewKey;
  var button=root.querySelector('[data-ogonek-like]');
  var likeEl=root.querySelector('[data-ogonek-like-count]');
  var viewsEl=root.querySelector('[data-ogonek-views]');
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
  function request(url,options,timeout){
    var ctrl=typeof AbortController==='function'?new AbortController():null;
    var timer=ctrl?setTimeout(function(){ctrl.abort()},timeout||4500):null;
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
      try{seen=localStorage.getItem(seenKey)==='1'}catch(e){}
      var initialViews=viewsEl&&viewsEl.getAttribute('data-last-confirmed');
      var cachedViews=initialViews===null?null:Number(initialViews);
      try{
        var saved=localStorage.getItem(cachedViewsKey);
        if(saved!==null&&Number.isSafeInteger(Number(saved))&&Number(saved)>=0){
          cachedViews=Math.max(cachedViews??0,Number(saved));
        }
      }catch(e){}
      if(viewsEl&&cachedViews!==null){
        viewsEl.textContent=format(cachedViews);
        viewsEl.title='Последнее сохранённое значение. Обновляем…';
      }
      function updateViews(value){
        if(value===null)value=0;
        if(!Number.isSafeInteger(value)||value<0)throw Error('Invalid view total');
        var total=value+viewBaseline;
        if(!Number.isSafeInteger(total))throw Error('Invalid total');
        display(viewsEl,total);
        if(viewsEl)viewsEl.title='Просмотры обновлены';
        try{localStorage.setItem(cachedViewsKey,String(total))}catch(e){}
      }
      function failed(){
        if(viewsEl){
          viewsEl.title='Не удалось связаться со счётчиком. Показано последнее сохранённое значение.';
          if(cachedViews===null)display(viewsEl,null);
        }
      }
      var countOne=false; // Automatic view writes paused until secure backend switch.
      if(countOne)try{localStorage.setItem(seenKey,'1')}catch(e){}
      // Firebase server-side increment is atomic; don't repeat a failed write,
      // since the server might have committed it before the response was lost.
      var op=countOne?
        request(viewUrl,{method:'PUT',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({'.sv':{increment:1}})},12000):
        request(viewUrl,undefined,12000);
      op.then(function(value){
          /* View already claimed before the request. */
          updateViews(value);
        })
        .catch(function(){
          // A read may succeed even when the initial write response was lost.
          // Never issue a second increment automatically.
          return request(viewUrl,undefined,12000).then(updateViews).catch(failed);
        });

    }
  }
  load();
  }
  var article=document.querySelector('[data-ogonek-article]');
  if(article){
    init(article,article.getAttribute('data-ogonek-id')||(/ogonek-zimbabe/.test(location.pathname)?'zimbabe':'barash'),true);
  }else{
    document.querySelectorAll('[data-ogonek-card]').forEach(function(card){
      init(card,card.getAttribute('data-ogonek-id')||'barash',false);
    });
  }
})();
