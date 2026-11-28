(()=>{'use strict';
const $=id=>document.getElementById(id),adminMode=new URLSearchParams(location.search).get('admin')==='1',cfg=window.SOVA_MAIL_CONFIG||{};
let db,user,isAdmin=false,active=null,tickets=[],captchaToken='',captchaWidget=null,busy=false,refreshing=false,pendingId=null;
const names={new:'Новое',working:'В работе',resolved:'Решено'},types={'image/png':'png','image/jpeg':'jpg','image/webp':'webp'};
let page='';try{const q=new URLSearchParams(location.search).get('page');if(q){const u=new URL(q,location.origin);if(u.origin===location.origin)page=u.pathname.slice(0,300)}}catch{}
const show=(id,v=true)=>{$(id).hidden=!v},say=t=>$('status').textContent=t;
function el(tag,t){const n=document.createElement(tag);if(t!==undefined)n.textContent=t;return n}
function script(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.append(s)})}
function check(x){if(x.error)throw x.error;return x.data}
function error(e){console.error('Sova mail:',e?.code||e?.message||'error');say('Не удалось выполнить действие. Проверь подключение и ограничения. Черновик не удалён.')}
function fileList(id){const a=[...$(id).files];if(a.length>3||a.some(f=>!types[f.type]||f.size>5242880||!f.size))throw Error('files');return a}
function previews(id,out){const root=$(out);root.replaceChildren();let files;try{files=fileList(id)}catch{$(id).value='';say('До 3 изображений PNG, JPEG или WebP, каждое до 5 МБ.');return}for(const f of files){const img=el('img'),url=URL.createObjectURL(f);img.alt=f.name;img.onload=img.onerror=()=>URL.revokeObjectURL(url);img.src=url;root.append(img)}}
function setBusy(v){busy=v;document.querySelectorAll('form button,#reload,#newTicket,#logout,#ticketStatus,.ticket').forEach(b=>b.disabled=v||b.id==='loginButton'&&!captchaToken)}
function resetCaptcha(){captchaToken='';if(captchaWidget!==null)window.turnstile.reset(captchaWidget);$('loginButton').disabled=true}
async function loadCaptcha(){await script('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit');await new Promise(ok=>window.turnstile.ready(ok));captchaWidget=window.turnstile.render('#captcha',{sitekey:cfg.turnstileSiteKey,callback:token=>{captchaToken=token;$('loginButton').disabled=busy},'expired-callback':()=>{captchaToken='';$('loginButton').disabled=true},'error-callback':()=>{captchaToken='';$('loginButton').disabled=true;say('Не удалось пройти проверку защиты от спама.')}})}
async function openWorkspace(){
 user=check(await db.auth.getUser()).user;isAdmin=Boolean(check(await db.rpc('sova_is_admin')));
 if(adminMode&&!isAdmin){say('У этого аккаунта нет прав администратора. Вернись в почту игрока.');return false}
 if(!adminMode&&isAdmin){location.replace('sova-mail.html?admin=1');return false}
 show('login',false);show('workspace');show('newTicket',!isAdmin);show('logout',isAdmin);show('stats',isAdmin);show('adminLink',!isAdmin);say('Почта подключена.');
 await refresh();if(!isAdmin&&!tickets.length)newForm();setInterval(()=>{if(!document.hidden&&!busy)refresh().catch(error)},20000);return true
}
async function refresh(){
 if(refreshing)return;refreshing=true;
 try{
 const data=check(await db.from('sova_tickets').select('*').order('created_at',{ascending:false}).limit(300));tickets=data;const box=$('tickets');box.replaceChildren();if(!data.length)box.append(el('p','Пока обращений нет.'));
 for(const t of data){const b=el('button',t.category+' · '+t.nick);b.className='ticket';b.type='button';b.disabled=busy;b.append(el('small',names[t.status]+' · '+new Date(t.created_at).toLocaleString('ru-RU')));b.onclick=()=>openThread(t.id).catch(error);box.append(b)}
 if(isAdmin)for(const [id,k] of [['newCount','new'],['workingCount','working'],['resolvedCount','resolved']])$(id).textContent=data.filter(t=>t.status===k).length;
 if(active){const t=data.find(t=>t.id===active);if(t)await renderThread(t)}
 }finally{refreshing=false}
}
function newForm(){active=null;show('thread',false);show('empty',false);show('newForm');$('pageInfo').textContent=page?'Страница: '+page:'Страница: не указана'}
async function openThread(id){const t=tickets.find(x=>x.id===id);if(!t)return;active=id;show('newForm',false);show('empty',false);show('thread');await renderThread(t)}
async function renderThread(t){
 $('threadTitle').textContent=t.category+' · '+t.nick;$('threadMeta').textContent=names[t.status]+(t.page?' · '+t.page:'');show('adminStatus',isAdmin);$('ticketStatus').value=t.status;show('replyForm',isAdmin||t.status!=='resolved');
 const msgs=check(await db.from('sova_messages').select('*').eq('ticket_id',t.id).order('created_at').limit(300));if(active!==t.id)return;
 const frag=document.createDocumentFragment();
 for(const m of msgs){
 const fromAdmin=m.sender_id!==t.owner_id,b=el('article');b.className='msg'+(fromAdmin?' admin':'');b.append(el('b',fromAdmin?'SOVA · Администратор':t.nick),el('p',m.body),el('small',new Date(m.created_at).toLocaleString('ru-RU')));
 for(const path of m.attachments||[]){
 const result=await db.storage.from('sova-mail').createSignedUrl(path,300);
 if(!result.error&&result.data?.signedUrl){const a=el('a','Открыть скриншот');a.href=result.data.signedUrl;a.target='_blank';a.rel='noopener noreferrer';const img=el('img');img.src=result.data.signedUrl;img.alt='Прикреплённый скриншот';img.loading='lazy';a.append(img);b.append(a)}else b.append(el('small','Вложение недоступно.'));
 }
 frag.append(b);
 }
 if(active===t.id)$('messages').replaceChildren(frag);
}
async function send(id,body,files){const paths=[];for(const f of files){const path=id+'/'+user.id+'/'+crypto.randomUUID()+'.'+types[f.type];check(await db.storage.from('sova-mail').upload(path,f,{contentType:f.type,upsert:false}));paths.push(path)}check(await db.from('sova_messages').insert({ticket_id:id,body,attachments:paths}))}
$('newFiles').onchange=()=>previews('newFiles','newPreview');$('replyFiles').onchange=()=>previews('replyFiles','replyPreview');$('newTicket').onclick=newForm;$('reload').onclick=()=>refresh().catch(error);
$('logout').onclick=async()=>{if(busy)return;try{check(await db.auth.signOut({scope:'local'}));location.reload()}catch(e){error(e)}};
$('loginForm').onsubmit=async e=>{e.preventDefault();if(busy||!captchaToken)return;setBusy(true);try{const options={captchaToken};if(adminMode)check(await db.auth.signInWithPassword({email:$('email').value,password:$('password').value,options}));else check(await db.auth.signInAnonymously({options}));$('password').value='';if(!await openWorkspace())resetCaptcha()}catch(e){error(e);resetCaptcha()}finally{setBusy(false)}};
$('newForm').onsubmit=async e=>{e.preventDefault();if(busy||isAdmin)return;setBusy(true);try{const files=fileList('newFiles'),body=$('newBody').value.trim(),nick=$('nick').value.trim();if(!nick||!body)throw Error('empty');if(!pendingId){const t=check(await db.from('sova_tickets').insert({nick,category:$('category').value,page}).select('id').single());pendingId=t.id}const id=pendingId;await send(id,body,files);pendingId=null;$('newBody').value='';$('newFiles').value='';$('newPreview').replaceChildren();show('newForm',false);say('Сообщение отправлено. Возвращайся сюда, чтобы прочитать ответ.');await refresh();await openThread(id)}catch(e){error(e)}finally{setBusy(false)}};
$('replyForm').onsubmit=async e=>{e.preventDefault();if(busy||!active)return;setBusy(true);try{const body=$('replyBody').value.trim();if(!body)throw Error('empty');await send(active,body,fileList('replyFiles'));$('replyBody').value='';$('replyFiles').value='';$('replyPreview').replaceChildren();say('Сообщение отправлено.');await refresh()}catch(e){error(e)}finally{setBusy(false)}};
$('ticketStatus').onchange=async()=>{if(busy||!isAdmin||!active)return;setBusy(true);try{check(await db.from('sova_tickets').update({status:$('ticketStatus').value}).eq('id',active));await refresh();say('Статус обновлён.')}catch(e){error(e)}finally{setBusy(false)}};
async function init(){
 if(adminMode){$('heading').textContent='Кабинет SOVA';$('subtitle').textContent='Закрытые обращения и ответы игрокам';$('loginTitle').textContent='Вход администратора';show('playerHint',false);show('adminFields');$('email').required=true;$('password').required=true;$('loginButton').textContent='Войти';$('adminLink').href='sova-mail.html';$('adminLink').textContent='Почта игрока'}
 if(!cfg.enabled||!cfg.url||!cfg.publishableKey||!cfg.turnstileSiteKey){say('Совина почта ещё не подключена к базе данных.');return}
 if(!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(cfg.url)||cfg.publishableKey.startsWith('sb_secret_'))throw Error('Unsafe config');
 await script('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');db=window.supabase.createClient(cfg.url,cfg.publishableKey,{auth:{storageKey:adminMode?'sova-mail-admin-v1':'sova-mail-player-v1',persistSession:true,autoRefreshToken:true}});
 show('disabled',false);const ses=check(await db.auth.getSession());if(ses.session&&await openWorkspace())return;show('login');await loadCaptcha();say('Пройди проверку для входа в почту.')
}
init().catch(e=>{error(e);show('disabled')});
})();