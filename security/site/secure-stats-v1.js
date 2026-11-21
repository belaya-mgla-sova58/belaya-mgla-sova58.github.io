/*
 * Browser adapter for the protected counter service.
 * INERT until window.SOVA_SECURE_STATS = { apiUrl, turnstileSiteKey } is configured.
 * Do not run it together with old Firebase / Abacus increment scripts on the same card.
 * Usage: <article data-secure-slug="ogonek-barash" data-secure-article>
 *          <b data-secure-views>…</b>
 *          <button data-secure-like>Нравится</button><b data-secure-like-count>…</b>
 *        </article>
 */
(function(){
'use strict';
const config=window.SOVA_SECURE_STATS;
if(!config || !/^https:\/\//.test(config.apiUrl||'') || !config.turnstileSiteKey)return;
const api=config.apiUrl.replace(/\/$/,'');
const storage='sova-secure-anonymous-id-v1';
let visitor='';
try {
 visitor=localStorage.getItem(storage)||'';
 if(!/^[a-f0-9]{32}$/.test(visitor)){
   const bytes=crypto.getRandomValues(new Uint8Array(16));
   visitor=Array.from(bytes,x=>x.toString(16).padStart(2,'0')).join('');
   localStorage.setItem(storage,visitor);
 }
}catch(e){
 const bytes=crypto.getRandomValues(new Uint8Array(16));
 visitor=Array.from(bytes,x=>x.toString(16).padStart(2,'0')).join('');
}
let loader;
function turnstileScript(){
 if(window.turnstile)return Promise.resolve(window.turnstile);
 if(loader)return loader;
 loader=new Promise(function(resolve,reject){
   const script=document.createElement('script');
   script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
   script.async=true;
   script.onload=()=>window.turnstile?resolve(window.turnstile):reject(Error('Turnstile unavailable'));
   script.onerror=()=>reject(Error('Turnstile unavailable'));
   document.head.appendChild(script);
 });
 return loader;
}
async function token(action){
 const turnstile=await turnstileScript();
 return new Promise(function(resolve,reject){
   const mount=document.createElement('div');
   mount.className='sova-protected-counter-check';
   mount.setAttribute('aria-label','Проверка безопасности');
   document.body.appendChild(mount);
   let id;
   function finish(value,error){
     try{if(id!==undefined)turnstile.remove(id)}catch(e){}
     mount.remove();
     if(error)reject(error);else resolve(value);
   }
   try{
     id=turnstile.render(mount,{
       sitekey:config.turnstileSiteKey,
       action,
       size:'invisible',
       execution:'execute',
       callback:value=>finish(value),
       'error-callback':()=>finish(null,Error('Verification failed')),
       'timeout-callback':()=>finish(null,Error('Verification timeout'))
     });
     turnstile.execute(id);
   }catch(e){finish(null,e)}
 });
}
async function request(path,body){
 const res=await fetch(api+path,{
   method:body?'POST':'GET',
   mode:'cors',
   cache:'no-store',
   headers:body?{'Content-Type':'application/json','X-Visitor':visitor}:{},
   body:body?JSON.stringify(body):undefined
 });
 const result=await res.json();
 if(!res.ok || !result.ok)throw Error(result.error||'Counter unavailable');
 return result;
}
function number(node,value){if(node)node.textContent=Number(value).toLocaleString('ru-RU')}
function update(root,totals){
 number(root.querySelector('[data-secure-views]'),totals.views);
 number(root.querySelector('[data-secure-like-count]'),totals.likes);
}
async function init(root){
 const slug=root.dataset.secureSlug;
 if(!/^[a-z0-9-]{1,80}$/.test(slug||''))return;
 const like=root.querySelector('[data-secure-like]');
 const likedKey='sova-secure-liked:'+slug;
 try{update(root,await request('/v1/counts/'+slug));}catch(e){console.warn('Counter read unavailable',e)}
 if(root.hasAttribute('data-secure-article')){
   try{
     const turnstileToken=await token('view');
     const result=await request('/v1/views/'+slug,{turnstileToken});
     update(root,result);
   }catch(e){console.warn('View was not counted',e)}
 }
 if(like){
   let already=false;
   try{already=localStorage.getItem(likedKey)==='1'}catch(e){}
   if(already){like.disabled=true;like.setAttribute('aria-pressed','true')}
   like.addEventListener('click',async function(){
     if(like.disabled)return;
     like.disabled=true;
     try{
       const turnstileToken=await token('like');
       const result=await request('/v1/likes/'+slug,{turnstileToken});
       update(root,result);
       if(result.counted){
         try{localStorage.setItem(likedKey,'1')}catch(e){}
         like.setAttribute('aria-pressed','true');
       }else{
         // A duplicate response means the server already recorded this visitor.
         like.setAttribute('aria-pressed','true');
       }
     }catch(e){like.disabled=false;console.warn('Like was not counted',e)}
   });
 }
}
function ready(){document.querySelectorAll('[data-secure-slug]').forEach(init)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});
else ready();
})();