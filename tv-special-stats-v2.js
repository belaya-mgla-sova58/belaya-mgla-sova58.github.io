/* SOVA58 TV special likes only. No view counters or automatic visit recording. */
(function(){
 'use strict';
 const key='news-58-live-fantom456-v1';
 const url='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/'+encodeURIComponent(key)+'.json';
 const storageKey='belaya-mgla-firebase-liked-'+key;
 const button=document.querySelector('[data-tvs-like]');
 const count=document.querySelector('[data-tvs-like-count]');
 if(!button&&!count)return;
 let busy=false,changed=false;
 const liked=()=>{try{return localStorage.getItem(storageKey)==='1'}catch(e){return false}};
 const display=v=>{if(count)count.textContent=typeof v==='number'&&Number.isFinite(v)&&v>=0?v.toLocaleString('ru-RU'):'—'};
 function sync(){
  if(!button)return;
  const on=liked();button.disabled=on||busy;button.classList.toggle('is-liked',on);
  button.setAttribute('aria-pressed',String(on));button.setAttribute('aria-label',on?'Лайк поставлен':'Поставить лайк');
  const label=button.querySelector('[data-tvs-like-label]');if(label)label.textContent=on?'Спасибо!':'Нравится';
 }
 function request(options){
  const controller=typeof AbortController==='function'?new AbortController():null;
  const timer=controller?setTimeout(()=>controller.abort(),4000):null;
  const opts=Object.assign({cache:'no-store'},options||{});
  if(controller)opts.signal=controller.signal;
  return fetch(url,opts).then(r=>{if(!r.ok)throw Error('Like service unavailable');return r.json()}).finally(()=>{if(timer)clearTimeout(timer)});
 }
 if(button)button.addEventListener('click',function(){
  if(busy||liked())return;
  busy=true;sync();
  request({method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({'.sv':{increment:1}})})
   .then(v=>{changed=true;try{localStorage.setItem(storageKey,'1')}catch(e){}display(v)})
   .catch(()=>display(null))
   .finally(()=>{busy=false;sync()});
 });
 sync();
 if(count)request().then(v=>{if(!changed)display(typeof v==='number'?v:0)}).catch(()=>{if(!changed)display(null)});
})();
