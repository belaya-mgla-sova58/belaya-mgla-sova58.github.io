/* SOVA58 interview likes. View tracking and view display were removed. */
(function(){
 'use strict';
 const BASE='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/';
 function init(root,id){
  const likeKeys={zimbabe:'k-vam-na-ogonek-zimbabe-v1',barash:'k-vam-na-ogonek-barash-v1','mish-gun':'k-vam-na-ogonek-mish-gun-v1'};
  const likeKey=likeKeys[id];if(!likeKey)return;
  const url=BASE+encodeURIComponent(likeKey)+'.json';
  const likedKey='belaya-mgla-firebase-liked-'+likeKey;
  const button=root.querySelector('[data-ogonek-like]');
  const count=root.querySelector('[data-ogonek-like-count]');
  if(!button&&!count)return;
  let busy=false,changed=false;
  const liked=()=>{try{return localStorage.getItem(likedKey)==='1'}catch(e){return false}};
  const display=n=>{if(count)count.textContent=typeof n==='number'&&Number.isFinite(n)&&n>=0?n.toLocaleString('ru-RU'):'—'};
  function sync(){
   if(!button)return;
   const on=liked();button.disabled=on||busy;button.classList.toggle('is-liked',on);
   button.setAttribute('aria-pressed',String(on));
   button.setAttribute('aria-label',on?'Лайк поставлен':'Поставить лайк интервью');
   const label=button.querySelector('[data-ogonek-like-label]');
   if(label)label.textContent=on?'Спасибо!':'Нравится';
  }
  function request(options){
   const controller=typeof AbortController==='function'?new AbortController():null;
   const timer=controller?setTimeout(()=>controller.abort(),4500):null;
   const opts=Object.assign({cache:'no-store'},options||{});
   if(controller)opts.signal=controller.signal;
   return fetch(url,opts).then(r=>{if(!r.ok)throw Error('Like service unavailable');return r.json()}).finally(()=>{if(timer)clearTimeout(timer)});
  }
  if(button)button.addEventListener('click',function(){
   if(busy||liked())return;
   busy=true;sync();
   request({method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({'.sv':{increment:1}})})
    .then(v=>{changed=true;try{localStorage.setItem(likedKey,'1')}catch(e){}display(v)})
    .catch(()=>display(null))
    .finally(()=>{busy=false;sync()});
  });
  sync();
  if(count)request().then(v=>{if(!changed)display(typeof v==='number'?v:0)}).catch(()=>{if(!changed)display(null)});
 }
 const article=document.querySelector('[data-ogonek-article]');
 if(article)init(article,article.getAttribute('data-ogonek-id')||(/ogonek-zimbabe/.test(location.pathname)?'zimbabe':'barash'));
 else document.querySelectorAll('[data-ogonek-card]').forEach(card=>init(card,card.getAttribute('data-ogonek-id')||'barash'));
})();
