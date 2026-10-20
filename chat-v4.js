(function(){
'use strict';

const BASE='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/';
const ROOT=BASE.slice(0,-1)+'.json';
const CHAT_QUERY=ROOT+'?orderBy='+encodeURIComponent('"$key"')+'&startAt='+encodeURIComponent('"__chat58"')+'&endAt='+encodeURIComponent('"__chat58\uf8ff"');
const PREFIX='__chat58__', MARK='__chat58m__', DEL='__chat58d__', REPLY='__chat58r__', REACT='__chat58x__', NICK='__chat58n__', MOD='__chat58mod__', ADMINMSG='__chat58a__';
const NICK_KEY='belaya-mgla-chat58-nick-v1', UID_KEY='belaya-mgla-chat58-uid-v1', LAST_KEY='belaya-mgla-chat58-last-v1', ADMIN_KEY='belaya-mgla-chat58-admin-jwk-v1';
const PUBLIC_ADMIN_JWK={"kty":"EC","crv":"P-256","x":"k39zWtQ5CgsmVc-sqsjCm-kExVGPIGYME_BEPlma_D0","y":"AqP1MJqV3iVSnTArgiowCXCctMXYe6DiAl5erWMb5q8","key_ops":["verify"],"ext":true};
const REACTIONS=[['up','👍'],['laugh','😂'],['heart','❤️']];
const SOVA_NICK='SOVA';

const gate=document.getElementById('chat58Gate'),nickForm=document.getElementById('chat58NickForm'),nickInput=document.getElementById('chat58NickInput'),nickNote=document.getElementById('chat58NickNote');
const myNick=document.getElementById('chat58MyNick'),messagesEl=document.getElementById('chat58Messages'),form=document.getElementById('chat58Form'),input=document.getElementById('chat58Input'),send=document.getElementById('chat58Send'),status=document.getElementById('chat58Status'),count=document.getElementById('chat58Count'),refresh=document.getElementById('chat58Refresh'),conn=document.getElementById('chat58Conn'),connText=document.getElementById('chat58ConnText'),newBtn=document.getElementById('chat58New'),replyBar=document.getElementById('chat58ReplyBar'),replyNick=document.getElementById('chat58ReplyNick'),replyText=document.getElementById('chat58ReplyText'),replyCancel=document.getElementById('chat58ReplyCancel');

let timer=0,firstLoad=true,lastSignature='',loading=false,replyTarget=null,unreadCount=0,knownIds=new Set(),lastItems=[],lastRoot={},adminPrivateKey=null,adminPublicKey=null,adminUnlocked=false,mutedUntil=0;
let moderationState={hidden:new Set(),pinnedId:'',mutes:new Map()};
const verifyCache=new Map();

function safeStorageGet(k){try{return localStorage.getItem(k)||''}catch(e){return ''}}
function safeStorageSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function safeStorageRemove(k){try{localStorage.removeItem(k)}catch(e){}}
function getUid(){let v=safeStorageGet(UID_KEY);if(v)return v;try{v=crypto.randomUUID()}catch(e){v='u-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,12)}safeStorageSet(UID_KEY,v);return v}
const uid=getUid();

function b64uEncode(text){const bytes=new TextEncoder().encode(text);return bytesToB64u(bytes)}
function bytesToB64u(bytes){let bin='';for(let i=0;i<bytes.length;i++)bin+=String.fromCharCode(bytes[i]);return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function b64uToBytes(text){let s=String(text).replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';const bin=atob(s);return Uint8Array.from(bin,c=>c.charCodeAt(0))}
function b64uDecode(text){try{return new TextDecoder().decode(b64uToBytes(text))}catch(e){return ''}}
function splitText(text,size){const a=Array.from(text),out=[];for(let i=0;i<a.length;i+=size)out.push(a.slice(i,i+size).join(''));return out}
function keyUrl(key){return BASE+encodeURIComponent(key)+'.json'}
async function incrementStrict(key){const r=await fetch(keyUrl(key),{method:'PUT',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({'.sv':{increment:1}})});if(!r.ok)throw new Error('write '+r.status);return r.json().catch(()=>1)}
async function readRoot(){const r=await fetch(CHAT_QUERY,{cache:'no-store'});if(!r.ok)throw new Error('read '+r.status);const v=await r.json();return v&&typeof v==='object'?v:{}}
function setConnection(ok){conn.classList.toggle('online',ok);conn.classList.toggle('offline',!ok);connText.textContent=ok?'Онлайн':'Нет связи'}
function setStatus(text,isError){status.textContent=text||'';status.classList.toggle('error',!!isError)}
function idTs(id){const p=String(id).split('-')[0];const n=parseInt(p,36);return Number.isFinite(n)?n:0}
function formatTime(ts){const d=new Date(ts);const now=new Date();const same=d.getFullYear()===now.getFullYear()&&d.getMonth()===now.getMonth()&&d.getDate()===now.getDate();return same?d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'}):d.toLocaleDateString('ru-RU',{day:'2-digit',month:'2-digit'})+' '+d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})}
function nearBottom(){return messagesEl.scrollHeight-messagesEl.scrollTop-messagesEl.clientHeight<90}
function normalizeNick(n){return String(n||'').normalize('NFKC').trim().replace(/\s+/g,' ').toLocaleLowerCase('ru-RU')}
function isSovaNick(n){return normalizeNick(n)==='sova'}
async function sha256Hex(text){const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));return Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,'0')).join('')}
function parseNickClaims(root){
 const claims=[]; const re=/^__chat58n__([a-f0-9]{64})__([a-z0-9]+)__([a-z0-9-]+)__(.+)$/i;
 Object.keys(root||{}).forEach(k=>{const m=k.match(re);if(!m)return;claims.push({hash:m[1].toLowerCase(),ts:parseInt(m[2],36)||0,ts36:m[2],uid:m[3],nick:b64uDecode(m[4]),key:k})});
 return claims;
}
function claimWinner(claims,hash){return claims.filter(c=>c.hash===hash).sort((a,b)=>(a.ts-b.ts)||a.uid.localeCompare(b.uid))[0]||null}
async function claimNickname(nick){
 const norm=normalizeNick(nick);
 if(isSovaNick(nick)){
   if(!adminUnlocked)return {ok:false,reason:'reserved'};
   safeStorageSet(NICK_KEY,SOVA_NICK);return {ok:true,admin:true};
 }
 const hash=await sha256Hex(norm);let root=await readRoot();let claims=parseNickClaims(root),winner=claimWinner(claims,hash);
 if(winner&&winner.uid!==uid)return {ok:false,reason:'taken'};
 if(!winner){const ts36=Date.now().toString(36);await incrementStrict(NICK+hash+'__'+ts36+'__'+uid+'__'+b64uEncode(nick));root=await readRoot();claims=parseNickClaims(root);winner=claimWinner(claims,hash)}
 if(!winner||winner.uid!==uid)return {ok:false,reason:'taken'};
 safeStorageSet(NICK_KEY,nick);return {ok:true};
}
async function ensureSavedNickname(){
 const nick=safeStorageGet(NICK_KEY);if(!nick)return false;
 if(isSovaNick(nick)){
   if(adminUnlocked){safeStorageSet(NICK_KEY,SOVA_NICK);return true}
   safeStorageRemove(NICK_KEY);nickNote.textContent='Ник SOVA защищён. Нажми «Войти как SOVA» и введи личный код.';return false;
 }
 try{const result=await claimNickname(nick);if(result.ok)return true;safeStorageRemove(NICK_KEY);nickNote.textContent='Этот ник уже занят. Выбери другой.';return false}catch(e){return true}
}

function parseRoot(root){
 const chunks={},markers={},deleted={},replies={},reactions={},adminSigs={};
 const chunkRe=/^__chat58__([a-z0-9-]+)__([0-9]+)__([0-9]+)__(.+)__([a-z0-9-]+)__(.+)$/i;
 const markRe=/^__chat58m__([a-z0-9-]+)__([0-9]+)$/i;
 const delRe=/^__chat58d__([a-z0-9-]+)$/i;
 const replyRe=/^__chat58r__([a-z0-9-]+)__(.+)$/i;
 const reactRe=/^__chat58x__([a-z0-9-]+)__(up|laugh|heart)$/i;
 const adminRe=/^__chat58a__([a-z0-9-]+)__(.+)$/i;
 Object.entries(root||{}).forEach(([k,v])=>{let m=k.match(chunkRe);if(m){const id=m[1],idx=Number(m[2]),total=Number(m[3]);if(!chunks[id])chunks[id]={total,parts:{},nick:b64uDecode(m[4]),owner:m[5]};chunks[id].parts[idx]=b64uDecode(m[6]);return}m=k.match(markRe);if(m){markers[m[1]]=Number(m[2]);return}m=k.match(delRe);if(m&&Number(v)>0){deleted[m[1]]=true;return}m=k.match(replyRe);if(m){try{const r=JSON.parse(b64uDecode(m[2]));if(r&&r.id)replies[m[1]]={id:String(r.id),nick:String(r.nick||''),text:String(r.text||'')}}catch(e){}return}m=k.match(reactRe);if(m){if(!reactions[m[1]])reactions[m[1]]={up:0,laugh:0,heart:0};reactions[m[1]][m[2]]=Math.max(0,Number(v)||0);return}m=k.match(adminRe);if(m){adminSigs[m[1]]=m[2]}});
 const out=[];Object.entries(markers).forEach(([id,total])=>{const c=chunks[id];if(!c||deleted[id]||c.total!==total)return;let text='';for(let i=0;i<total;i++){if(typeof c.parts[i]!=='string')return;text+=c.parts[i]}if(!text.trim()||!c.nick)return;out.push({id,ts:idTs(id),nick:c.nick,owner:c.owner,text:text.trim(),reply:replies[id]||null,reactions:reactions[id]||{up:0,laugh:0,heart:0},adminSig:adminSigs[id]||'',admin:false})});
 return out.sort((a,b)=>a.ts-b.ts).slice(-80)
}

async function getPublicAdminKey(){if(adminPublicKey)return adminPublicKey;adminPublicKey=await crypto.subtle.importKey('jwk',PUBLIC_ADMIN_JWK,{name:'ECDSA',namedCurve:'P-256'},false,['verify']);return adminPublicKey}
async function verifySig(canonical,sig){
 const cacheKey=canonical+'|'+sig;if(verifyCache.has(cacheKey))return verifyCache.get(cacheKey);
 let ok=false;try{ok=await crypto.subtle.verify({name:'ECDSA',hash:'SHA-256'},await getPublicAdminKey(),b64uToBytes(sig),new TextEncoder().encode(canonical))}catch(e){}
 verifyCache.set(cacheKey,ok);return ok;
}
async function signAdmin(canonical){if(!adminPrivateKey)throw new Error('admin locked');const sig=await crypto.subtle.sign({name:'ECDSA',hash:'SHA-256'},adminPrivateKey,new TextEncoder().encode(canonical));return bytesToB64u(new Uint8Array(sig))}
async function importAdminPrivate(jwk){
 const key=await crypto.subtle.importKey('jwk',jwk,{name:'ECDSA',namedCurve:'P-256'},false,['sign']);
 const test='chat58|admin-test';const sig=await crypto.subtle.sign({name:'ECDSA',hash:'SHA-256'},key,new TextEncoder().encode(test));
 const ok=await crypto.subtle.verify({name:'ECDSA',hash:'SHA-256'},await getPublicAdminKey(),sig,new TextEncoder().encode(test));if(!ok)throw new Error('wrong key');return key;
}
async function loadAdminFromStorage(){const raw=safeStorageGet(ADMIN_KEY);if(!raw)return false;try{const jwk=JSON.parse(raw);adminPrivateKey=await importAdminPrivate(jwk);adminUnlocked=true;return true}catch(e){safeStorageRemove(ADMIN_KEY);return false}}

async function parseModeration(root){
 const re=/^__chat58mod__(hide|pin|unpin|mute|unmute)__([a-z0-9-]+|all)__([0-9]+)__([a-z0-9]+)__(.+)$/i;
 const records=[];for(const k of Object.keys(root||{})){const m=k.match(re);if(!m)continue;const type=m[1].toLowerCase(),target=m[2],value=m[3],ts36=m[4],sig=m[5],canonical='chat58|mod|'+type+'|'+target+'|'+value+'|'+ts36;if(await verifySig(canonical,sig))records.push({type,target,value:Number(value)||0,ts:parseInt(ts36,36)||0,key:k})}
 records.sort((a,b)=>a.ts-b.ts);const hidden=new Set(),mutes=new Map();let pinnedId='';
 records.forEach(r=>{if(r.type==='hide')hidden.add(r.target);else if(r.type==='pin')pinnedId=r.target;else if(r.type==='unpin')pinnedId='';else if(r.type==='mute')mutes.set(r.target,r.value);else if(r.type==='unmute')mutes.set(r.target,0)});
 return {hidden,pinnedId,mutes};
}
async function verifyAdminMessages(items){for(const x of items){if(!x.adminSig)continue;const canonical='chat58|adminmsg|'+x.id+'|'+x.owner+'|'+x.nick+'|'+x.text;x.admin=await verifySig(canonical,x.adminSig)}}
async function writeMod(type,target,value){const ts36=Date.now().toString(36),canonical='chat58|mod|'+type+'|'+target+'|'+String(value)+'|'+ts36,sig=await signAdmin(canonical);await incrementStrict(MOD+type+'__'+target+'__'+String(value)+'__'+ts36+'__'+sig);lastSignature='';await loadMessages(true)}

function adminJwkFromCode(code){const raw=String(code||'').trim();if(!raw.toUpperCase().startsWith('SOVA58-'))throw new Error('bad code');const text=b64uDecode(raw.slice(7));const data=JSON.parse(text);return data.privateJwk||data}
async function activateAdminJwk(jwk,state){adminPrivateKey=await importAdminPrivate(jwk);adminUnlocked=true;safeStorageSet(ADMIN_KEY,JSON.stringify(jwk));safeStorageSet(NICK_KEY,SOVA_NICK);if(nickNote)nickNote.textContent='';applyNick();if(state)state.textContent='Доступ SOVA активирован ✅';updateAdminUi();render(lastItems,true)}

function createSovaRecoveryUi(){
 const card=gate&&gate.querySelector('.chat58-gate-card');if(!card||document.getElementById('chat58SovaRecover'))return;
 const wrap=document.createElement('div');wrap.className='chat58-sova-recover';
 const btn=document.createElement('button');btn.id='chat58SovaRecover';btn.type='button';btn.className='chat58-sova-recover-btn';btn.textContent='👑 Войти как SOVA';
 const panel=document.createElement('div');panel.className='chat58-sova-recover-panel';panel.hidden=true;
 const inp=document.createElement('input');inp.type='password';inp.className='chat58-sova-recover-code';inp.placeholder='Вставить код SOVA';inp.autocomplete='off';inp.autocapitalize='off';inp.spellcheck=false;
 const go=document.createElement('button');go.type='button';go.className='chat58-sova-recover-go';go.textContent='🔑 Восстановить SOVA';
 const note=document.createElement('div');note.className='chat58-sova-recover-note';
 panel.append(inp,go,note);wrap.append(btn,panel);card.appendChild(wrap);
 btn.addEventListener('click',()=>{panel.hidden=!panel.hidden;if(!panel.hidden)setTimeout(()=>inp.focus(),30)});
 btn.addEventListener('touchend',e=>{e.preventDefault();panel.hidden=!panel.hidden;if(!panel.hidden)setTimeout(()=>inp.focus(),30)},{passive:false});
 go.addEventListener('click',async()=>{const code=inp.value.trim();if(!code){note.textContent='Вставь личный код SOVA.';return}go.disabled=true;note.textContent='Проверяю…';try{await activateAdminJwk(adminJwkFromCode(code),note);inp.value='';note.textContent='SOVA восстановлена на этом устройстве ✅';lastSignature='';await loadMessages(true)}catch(e){note.textContent='Неверный код SOVA.'}finally{go.disabled=false}});
}

function createAdminUi(){
 const toolbar=document.querySelector('.chat58-toolbar');if(!toolbar||document.getElementById('chat58AdminBtn'))return;
 const btn=document.createElement('button');btn.id='chat58AdminBtn';btn.type='button';btn.className='chat58-admin-btn';btn.textContent='👑 Админ';toolbar.insertBefore(btn,refresh);
 const pin=document.createElement('div');pin.id='chat58Pinned';pin.className='chat58-pinned';pin.hidden=true;messagesEl.parentNode.insertBefore(pin,messagesEl);
 const modal=document.createElement('div');modal.id='chat58AdminModal';modal.className='chat58-admin-modal';modal.hidden=true;modal.innerHTML='<div class="chat58-admin-card"><button class="chat58-admin-close" type="button" aria-label="Закрыть">×</button><div class="chat58-admin-crown">👑</div><h2>Панель SOVA</h2><p>Доступ хранится только на этом устройстве. В браузере можно выбрать файл, а в приложении удобнее вставить код SOVA.</p><label class="chat58-admin-import">📁 Выбрать ключ<input id="chat58AdminFile" type="file" accept="application/json,.json"></label><div class="chat58-admin-or">или</div><input id="chat58AdminCode" class="chat58-admin-code" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Вставить код SOVA"><button id="chat58AdminCodeBtn" class="chat58-admin-code-btn" type="button">🔑 Активировать</button><div id="chat58AdminState" class="chat58-admin-state"></div><button id="chat58AdminLogout" class="chat58-admin-logout" type="button" hidden>Удалить ключ с устройства</button></div>';
 document.body.appendChild(modal);
 const openAdmin=()=>{modal.hidden=false;updateAdminUi()};btn.style.pointerEvents='auto';btn.style.position='relative';btn.style.zIndex='3';btn.addEventListener('click',openAdmin);btn.addEventListener('touchend',e=>{e.preventDefault();openAdmin()},{passive:false});modal.querySelector('.chat58-admin-close').addEventListener('click',()=>{modal.hidden=true});modal.addEventListener('click',e=>{if(e.target===modal)modal.hidden=true});
 modal.querySelector('#chat58AdminFile').addEventListener('change',async e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const state=modal.querySelector('#chat58AdminState');state.textContent='Проверяю ключ…';try{const data=JSON.parse(await file.text());await activateAdminJwk(data.privateJwk||data,state)}catch(err){state.textContent='Этот файл не является ключом SOVA.'}});
 modal.querySelector('#chat58AdminCodeBtn').addEventListener('click',async()=>{const state=modal.querySelector('#chat58AdminState'),field=modal.querySelector('#chat58AdminCode');const code=field.value.trim();if(!code){state.textContent='Вставь код SOVA.';return}state.textContent='Проверяю код…';try{await activateAdminJwk(adminJwkFromCode(code),state);field.value=''}catch(err){state.textContent='Неверный код SOVA.'}});
 modal.querySelector('#chat58AdminLogout').addEventListener('click',()=>{safeStorageRemove(ADMIN_KEY);adminPrivateKey=null;adminUnlocked=false;updateAdminUi();render(lastItems,true)});
}
function updateAdminUi(){const btn=document.getElementById('chat58AdminBtn'),state=document.getElementById('chat58AdminState'),logout=document.getElementById('chat58AdminLogout');if(btn)btn.textContent=adminUnlocked?'👑 SOVA':'👑 Админ';if(state)state.textContent=adminUnlocked?'Доступ SOVA активирован ✅':'Выбери файл или вставь код SOVA.';if(logout)logout.hidden=!adminUnlocked}
function renderPinned(items){const pin=document.getElementById('chat58Pinned');if(!pin)return;const x=items.find(i=>i.id===moderationState.pinnedId);if(!x){pin.hidden=true;pin.replaceChildren();return}pin.hidden=false;pin.replaceChildren();const icon=document.createElement('span');icon.textContent='📌';const copy=document.createElement('div');const b=document.createElement('b');b.textContent=x.nick;const s=document.createElement('span');s.textContent=x.text;copy.append(b,s);pin.append(icon,copy);pin.addEventListener('click',()=>scrollToMessage(x.id),{once:true})}

function updateUnread(){if(!newBtn)return;if(unreadCount>0){newBtn.hidden=false;newBtn.textContent='Новые сообщения ('+unreadCount+') ↓';document.title='('+unreadCount+') Белая Мгла • Чат государства 58'}else{newBtn.hidden=true;newBtn.textContent='Новые сообщения ↓';document.title='Белая Мгла • Чат государства 58'}}
function clearUnread(){unreadCount=0;updateUnread()}
function setReply(x){replyTarget={id:x.id,nick:x.nick,text:Array.from(x.text).slice(0,70).join('')};replyNick.textContent=x.nick;replyText.textContent=replyTarget.text;replyBar.hidden=false;input.focus()}
function clearReply(){replyTarget=null;replyBar.hidden=true;replyNick.textContent='';replyText.textContent=''}
function scrollToMessage(id){for(const row of messagesEl.querySelectorAll('.chat58-row')){if(row.dataset.msgId===id){row.scrollIntoView({block:'center',behavior:'smooth'});row.classList.add('chat58-flash');setTimeout(()=>row.classList.remove('chat58-flash'),900);return}}}
async function reactTo(id,code,btn){const key='belaya-mgla-chat58-react-v1:'+id+':'+code;if(safeStorageGet(key)==='1')return;btn.disabled=true;try{const n=await incrementStrict(REACT+id+'__'+code);safeStorageSet(key,'1');btn.classList.add('is-on');const emoji=(REACTIONS.find(r=>r[0]===code)||['',''])[1];btn.textContent=emoji+(Number(n)>0?' '+Number(n):'');lastSignature=''}catch(e){setStatus('Не удалось поставить реакцию.',true)}finally{btn.disabled=false}}

function render(items,stickToBottom){
 const oldTop=messagesEl.scrollTop;messagesEl.replaceChildren();renderPinned(items);if(!items.length){const e=document.createElement('div');e.className='chat58-empty';e.innerHTML='Пока тихо 👀<br>Можно написать первое сообщение.';messagesEl.appendChild(e);firstLoad=false;return}
 items.forEach(x=>{if(moderationState.hidden.has(x.id))return;const row=document.createElement('div');row.className='chat58-row'+(x.owner===uid?' own':'');row.dataset.msgId=x.id;const msg=document.createElement('div');msg.className='chat58-msg';const meta=document.createElement('div');meta.className='chat58-meta';const nick=document.createElement('span');nick.className='chat58-nick'+(x.admin?' chat58-admin-nick':'');nick.textContent=(x.admin?'👑 ':'')+x.nick;const time=document.createElement('span');time.className='chat58-time';time.textContent=formatTime(x.ts);meta.append(nick,time);msg.appendChild(meta);
 if(x.reply){const q=document.createElement('div');q.className='chat58-quote';const qb=document.createElement('b');qb.textContent=x.reply.nick||'Сообщение';const qs=document.createElement('span');qs.textContent=x.reply.text||'';q.append(qb,qs);q.addEventListener('click',()=>scrollToMessage(x.reply.id));msg.appendChild(q)}
 const text=document.createElement('div');text.className='chat58-text';text.textContent=x.text;msg.appendChild(text);const actions=document.createElement('div');actions.className='chat58-actions';const rep=document.createElement('button');rep.type='button';rep.className='chat58-action';rep.textContent='Ответить';rep.addEventListener('click',()=>setReply(x));actions.appendChild(rep);
 REACTIONS.forEach(([code,emoji])=>{const b=document.createElement('button');b.type='button';b.className='chat58-react';const n=Math.max(0,Number((x.reactions||{})[code])||0);b.textContent=emoji+(n?' '+n:'');if(safeStorageGet('belaya-mgla-chat58-react-v1:'+x.id+':'+code)==='1')b.classList.add('is-on');b.addEventListener('click',()=>reactTo(x.id,code,b));actions.appendChild(b)});
 if(x.owner===uid){const del=document.createElement('button');del.type='button';del.className='chat58-delete chat58-action';del.textContent='Удалить';del.addEventListener('click',()=>deleteMessage(x.id,del));actions.appendChild(del)}
 if(adminUnlocked){const pin=document.createElement('button');pin.type='button';pin.className='chat58-action chat58-admin-action';pin.textContent=moderationState.pinnedId===x.id?'Открепить':'📌';pin.addEventListener('click',()=>writeMod(moderationState.pinnedId===x.id?'unpin':'pin',moderationState.pinnedId===x.id?'all':x.id,1));actions.appendChild(pin);if(x.owner!==uid){const mute=document.createElement('button');mute.type='button';mute.className='chat58-action chat58-admin-action';const isMuted=(moderationState.mutes.get(x.owner)||0)>Date.now();mute.textContent=isMuted?'Снять мут':'Мут 1ч';mute.addEventListener('click',()=>writeMod(isMuted?'unmute':'mute',x.owner,isMuted?1:Date.now()+3600000));actions.appendChild(mute)}const hide=document.createElement('button');hide.type='button';hide.className='chat58-action chat58-admin-action danger';hide.textContent='🗑';hide.title='Удалить для всех';hide.addEventListener('click',()=>{if(confirm('Удалить это сообщение для всех?'))writeMod('hide',x.id,1)});actions.appendChild(hide)}
 msg.appendChild(actions);row.appendChild(msg);messagesEl.appendChild(row)});
 if(firstLoad||stickToBottom)requestAnimationFrame(()=>{messagesEl.scrollTop=messagesEl.scrollHeight;clearUnread()});else messagesEl.scrollTop=oldTop;firstLoad=false
}

async function loadMessages(force){if(loading)return;loading=true;if(force)refresh.disabled=true;const wasNear=nearBottom();try{const root=await readRoot();lastRoot=root;let items=parseRoot(root);moderationState=await parseModeration(root);await verifyAdminMessages(items);mutedUntil=moderationState.mutes.get(uid)||0;items=items.filter(x=>!moderationState.hidden.has(x.id));lastItems=items;const incoming=knownIds.size?items.filter(x=>!knownIds.has(x.id)&&x.owner!==uid).length:0;knownIds=new Set(items.map(x=>x.id));if(incoming&&!wasNear){unreadCount+=incoming;updateUnread()}const sig=items.map(x=>x.id+':'+(x.reply?x.reply.id:'')+':'+Number(x.reactions.up||0)+':'+Number(x.reactions.laugh||0)+':'+Number(x.reactions.heart||0)+':'+(x.admin?'a':'')).join('|')+'|p:'+moderationState.pinnedId+'|h:'+Array.from(moderationState.hidden).join(',')+'|m:'+mutedUntil+'|adm:'+adminUnlocked;if(sig!==lastSignature||force){lastSignature=sig;render(items,wasNear)}if(wasNear)clearUnread();setConnection(true);if(status.textContent==='Не удалось обновить чат.')setStatus('',false);if(mutedUntil>Date.now())setStatus('Ты временно не можешь писать в чат.',true)}catch(e){console.warn('chat load',e);setConnection(false);if(force)setStatus('Не удалось обновить чат.',true)}finally{loading=false;refresh.disabled=false}}

async function sendMessage(text){const nick=safeStorageGet(NICK_KEY);if(!nick)throw new Error('nick');if(isSovaNick(nick)&&!adminUnlocked)throw new Error('reserved');if(mutedUntil>Date.now())throw new Error('muted');const id=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);const chunks=splitText(text,70),total=chunks.length,nickEnc=b64uEncode(nick),rt=replyTarget?{id:replyTarget.id,nick:replyTarget.nick,text:replyTarget.text}:null;for(let i=0;i<chunks.length;i++){const k=PREFIX+id+'__'+i+'__'+total+'__'+nickEnc+'__'+uid+'__'+b64uEncode(chunks[i]);await incrementStrict(k)}if(rt)await incrementStrict(REPLY+id+'__'+b64uEncode(JSON.stringify(rt)));if(adminUnlocked){try{const sig=await signAdmin('chat58|adminmsg|'+id+'|'+uid+'|'+nick+'|'+text.trim());await incrementStrict(ADMINMSG+id+'__'+sig)}catch(e){console.warn('admin badge sign failed',e)}}await incrementStrict(MARK+id+'__'+total);return id}
async function deleteMessage(id,btn){if(!confirm('Удалить своё сообщение?'))return;btn.disabled=true;try{await incrementStrict(DEL+id);setStatus('Сообщение удалено.',false);lastSignature='';await loadMessages(true)}catch(e){btn.disabled=false;setStatus('Не удалось удалить сообщение.',true)}}
function autosize(){input.style.height='auto';input.style.height=Math.min(input.scrollHeight,120)+'px';count.textContent=Array.from(input.value).length+' / 350'}
function startPolling(){clearInterval(timer);timer=setInterval(()=>{if(!document.hidden)loadMessages(false)},5000)}
function applyNick(){const nick=safeStorageGet(NICK_KEY);if(nick){gate.hidden=true;myNick.textContent=nick;input.disabled=false;send.disabled=false}else{gate.hidden=false;input.disabled=true;send.disabled=true;setTimeout(()=>nickInput.focus(),50)}}

nickForm.addEventListener('submit',async e=>{e.preventDefault();let nick=nickInput.value.trim().replace(/\s+/g,' ');const len=Array.from(nick).length;if(len<2){nickNote.textContent='Ник должен быть не короче 2 символов.';return}if(len>24){nickNote.textContent='Ник слишком длинный. Максимум 24 символа.';return}if(/[\u0000-\u001f\u007f]/.test(nick)){nickNote.textContent='В нике есть неподдерживаемые символы.';return}if(isSovaNick(nick)&&!adminUnlocked){nickNote.textContent='Ник SOVA защищён. Используй кнопку «Войти как SOVA».';return}nickNote.textContent='Проверяю ник…';try{const r=await claimNickname(nick);if(!r.ok){nickNote.textContent='Этот ник уже занят. Выбери другой.';return}nickNote.textContent='';applyNick();loadMessages(true)}catch(err){nickNote.textContent='Не удалось проверить ник. Попробуй ещё раз.'}});
form.addEventListener('submit',async e=>{e.preventDefault();const text=input.value.trim();if(!text)return;const n=Array.from(text).length;if(n>350){setStatus('Сообщение слишком длинное.',true);return}if(mutedUntil>Date.now()){setStatus('Ты временно не можешь писать в чат.',true);return}const last=Number(safeStorageGet(LAST_KEY)||0);if(Date.now()-last<5000){setStatus('Подожди несколько секунд перед следующим сообщением.',true);return}send.disabled=true;setStatus('Отправляем…',false);try{await sendMessage(text);clearReply();safeStorageSet(LAST_KEY,String(Date.now()));input.value='';autosize();setStatus('',false);lastSignature='';await loadMessages(true)}catch(err){if(err&&err.message==='muted')setStatus('Ты временно не можешь писать в чат.',true);else{setConnection(false);setStatus('Не удалось отправить. Проверь интернет и попробуй ещё раз.',true)}}finally{send.disabled=false}});
input.addEventListener('input',autosize);input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();form.requestSubmit()}});replyCancel&&replyCancel.addEventListener('click',clearReply);newBtn&&newBtn.addEventListener('click',()=>{messagesEl.scrollTop=messagesEl.scrollHeight;clearUnread()});messagesEl.addEventListener('scroll',()=>{if(nearBottom())clearUnread()},{passive:true});refresh.addEventListener('click',()=>loadMessages(true));window.addEventListener('online',()=>{setConnection(true);loadMessages(true)});window.addEventListener('offline',()=>setConnection(false));document.addEventListener('visibilitychange',()=>{if(!document.hidden)loadMessages(false)});

(async function init(){createAdminUi();createSovaRecoveryUi();await loadAdminFromStorage();updateAdminUi();const ok=await ensureSavedNickname();applyNick();autosize();setConnection(navigator.onLine);if(ok||!safeStorageGet(NICK_KEY))await loadMessages(true);startPolling()})();
})();
