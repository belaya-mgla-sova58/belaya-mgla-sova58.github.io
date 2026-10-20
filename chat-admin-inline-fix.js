(function(){
'use strict';

function install(){
  const btn=document.getElementById('chat58AdminBtn');
  const toolbar=document.querySelector('.chat58-toolbar');
  if(!btn||!toolbar){setTimeout(install,120);return}
  if(document.getElementById('chat58AdminInline'))return;

  const style=document.createElement('style');
  style.id='chat58-admin-inline-style';
  style.textContent=`
  .chat58-admin-inline[hidden]{display:none!important}
  .chat58-admin-inline{box-sizing:border-box;padding:12px 14px;border-bottom:1px solid rgba(255,220,124,.20);background:linear-gradient(180deg,rgba(36,55,71,.96),rgba(12,36,58,.97));box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}
  .chat58-admin-inline-title{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:9px;color:#ffe7a1;font-size:12px;font-weight:900}
  .chat58-admin-inline-close{width:27px;height:27px;border:1px solid rgba(255,255,255,.10);border-radius:50%;background:rgba(255,255,255,.06);color:#fff;font:inherit;font-size:16px;cursor:pointer}
  .chat58-admin-inline-row{display:flex;gap:7px;align-items:center}
  .chat58-admin-inline-code{box-sizing:border-box;min-width:0;flex:1;padding:10px 11px;border:1px solid rgba(255,221,125,.30);border-radius:12px;background:rgba(255,255,255,.07);color:#fff;font:inherit;font-size:11px;outline:none}
  .chat58-admin-inline-code:focus{border-color:rgba(255,226,145,.66);box-shadow:0 0 0 3px rgba(217,166,51,.10)}
  .chat58-admin-inline-go{flex:0 0 auto;padding:10px 12px;border:1px solid rgba(255,221,125,.34);border-radius:12px;background:linear-gradient(180deg,rgba(184,136,34,.32),rgba(115,80,18,.28));color:#ffe8a4;font:inherit;font-size:10px;font-weight:900;cursor:pointer;white-space:nowrap}
  .chat58-admin-inline-go:disabled{opacity:.55}
  .chat58-admin-inline-state{min-height:16px;margin-top:7px;color:#bfe9ff;font-size:9.5px;line-height:1.35}
  .chat58-admin-btn{pointer-events:auto!important;position:relative!important;z-index:20!important;touch-action:manipulation!important}
  @media(max-width:720px){.chat58-admin-inline{padding:10px}.chat58-admin-inline-row{flex-direction:column}.chat58-admin-inline-code,.chat58-admin-inline-go{width:100%}.chat58-admin-inline-go{font-size:10px}}
  `;
  document.head.appendChild(style);

  const panel=document.createElement('div');
  panel.id='chat58AdminInline';
  panel.className='chat58-admin-inline';
  panel.hidden=true;
  panel.innerHTML='<div class="chat58-admin-inline-title"><span>👑 Вход SOVA</span><button class="chat58-admin-inline-close" type="button" aria-label="Закрыть">×</button></div><div class="chat58-admin-inline-row"><input class="chat58-admin-inline-code" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Вставить код SOVA"><button class="chat58-admin-inline-go" type="button">🔑 Активировать</button></div><div class="chat58-admin-inline-state">Код сохранится только на этом устройстве.</div>';
  toolbar.insertAdjacentElement('afterend',panel);

  const field=panel.querySelector('.chat58-admin-inline-code');
  const go=panel.querySelector('.chat58-admin-inline-go');
  const state=panel.querySelector('.chat58-admin-inline-state');
  const close=panel.querySelector('.chat58-admin-inline-close');

  function toggle(e){
    if(e){e.preventDefault();e.stopImmediatePropagation()}
    panel.hidden=!panel.hidden;
    if(!panel.hidden)setTimeout(()=>field.focus(),30);
  }
  btn.addEventListener('click',toggle,true);
  btn.addEventListener('pointerup',function(e){if(e.pointerType==='touch'){e.preventDefault();e.stopImmediatePropagation();panel.hidden=false;setTimeout(()=>field.focus(),30)}},true);
  close.addEventListener('click',()=>{panel.hidden=true});

  go.addEventListener('click',()=>{
    const code=field.value.trim();
    if(!code){state.textContent='Вставь код SOVA.';return}
    const hiddenField=document.getElementById('chat58AdminCode');
    const hiddenBtn=document.getElementById('chat58AdminCodeBtn');
    const hiddenState=document.getElementById('chat58AdminState');
    if(!hiddenField||!hiddenBtn){state.textContent='Панель ещё загружается. Нажми ещё раз через секунду.';return}
    go.disabled=true;
    state.textContent='Проверяю код…';
    hiddenField.value=code;
    hiddenBtn.click();
    let tries=0;
    const watch=setInterval(()=>{
      tries++;
      const text=(hiddenState&&hiddenState.textContent)||'';
      if(/активирован/i.test(text)){
        clearInterval(watch);
        field.value='';
        state.textContent='SOVA активирована на этом устройстве ✅';
        go.disabled=false;
        setTimeout(()=>{panel.hidden=true},700);
      }else if(/неверн|не является/i.test(text)){
        clearInterval(watch);
        state.textContent='Неверный код SOVA.';
        go.disabled=false;
      }else if(tries>30){
        clearInterval(watch);
        state.textContent='Не удалось проверить код. Попробуй ещё раз.';
        go.disabled=false;
      }
    },100);
  });

  field.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go.click()}});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
