(function(){
'use strict';

const PACKS={
  owls:{
    title:'🦉 Совы',cols:5,rows:6,
    labels:['УРА','ОРУ','ОТЛИЧНО','СПАСИБО','ВМЕСТЕ МЫ СИЛЬНЕЕ','НУ ВЫ ДАЕТЕ','СЕРЬЕЗНО','ДОБРОЕ УТРО','СПОКОЙНОЙ НОЧИ','НАДО РАЗОБРАТЬСЯ','ДУМАЮ','СЛЕЖУ','ПРИНЯТО','КРАСАВА','ГРУСТНО','В БОЙ','КУДА ИДЕМ','АЛМАЗЫ','ПОБЕДА','ОЙ','СБОР','НА МЕДВЕДЯ','В ФОРТЫ','ГОТОВ','В АТАКУ','ЗАМОК НАШ','КОПИМ','ЩИТ','ПОБЕДА 58','В ИГРУ']
  },
  heroes:{
    title:'🎮 Герои',cols:3,rows:2,
    labels:['МОМ любит пиво','Грег С уважением','Грег Без уважения','Молли Всем отчёт','Молли Где отчёт?','Джеронимо Кто виноват?']
  }
};
PACKS.owls.sprite='data:image/webp;base64,'+(window.CHAT58_OWL_B64||'');
PACKS.heroes.sprite='data:image/webp;base64,'+(window.CHAT58_HERO_B64||'');
const TOKEN_RE=/^\[\[sticker:(owls|heroes):(\d+)\]\]$/;

function q(s,r=document){return r.querySelector(s)}
function makeSprite(packName,index,cls){
  const p=PACKS[packName];
  const el=document.createElement('span');
  el.className=cls;
  el.setAttribute('role','img');
  el.setAttribute('aria-label',p.labels[index]||'Стикер');
  el.style.backgroundImage='url("'+p.sprite+'")';
  el.style.backgroundSize=(p.cols*100)+'% '+(p.rows*100)+'%';
  const col=index%p.cols,row=Math.floor(index/p.cols);
  const x=p.cols===1?0:(col/(p.cols-1))*100;
  const y=p.rows===1?0:(row/(p.rows-1))*100;
  el.style.backgroundPosition=x+'% '+y+'%';
  el.style.backgroundRepeat='no-repeat';
  return el;
}
function renderStickerText(root=document){
  const nodes=[];
  if(root.matches&&root.matches('.chat58-text'))nodes.push(root);
  if(root.querySelectorAll)nodes.push(...root.querySelectorAll('.chat58-text:not([data-sticker-rendered])'));
  nodes.forEach(el=>{
    if(el.dataset.stickerRendered)return;
    const m=(el.textContent||'').trim().match(TOKEN_RE);
    if(!m)return;
    const pack=m[1],index=Number(m[2]);
    if(!PACKS[pack]||!Number.isInteger(index)||index<0||index>=PACKS[pack].labels.length)return;
    el.textContent='';
    el.appendChild(makeSprite(pack,index,'chat58-sticker-message'));
    el.dataset.stickerRendered='1';
    el.classList.add('is-sticker');
  });
}
function sendSticker(pack,index){
  const input=q('#chat58Input'),form=q('#chat58Form');
  if(!input||!form)return;
  input.value='[[sticker:'+pack+':'+index+']]';
  input.dispatchEvent(new Event('input',{bubbles:true}));
  if(form.requestSubmit)form.requestSubmit();
  else form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
}
function buildPicker(){
  const composer=q('.chat58-composer'),form=q('#chat58Form'),input=q('#chat58Input');
  if(!composer||!form||!input||q('#chat58StickerBtn'))return;
  const btn=document.createElement('button');
  btn.type='button';btn.id='chat58StickerBtn';btn.className='chat58-sticker-btn';btn.textContent='🦉';btn.title='Стикеры';btn.setAttribute('aria-label','Открыть стикеры');
  form.insertBefore(btn,input);
  const panel=document.createElement('div');
  panel.id='chat58StickerPanel';panel.className='chat58-sticker-panel';panel.hidden=true;
  panel.innerHTML='<div class="chat58-sticker-head"><div class="chat58-sticker-tabs"><button type="button" data-tab="owls" class="active">🦉 Совы</button><button type="button" data-tab="heroes">🎮 Герои</button></div><button type="button" class="chat58-sticker-close" aria-label="Закрыть">×</button></div><div class="chat58-sticker-grid"></div>';
  composer.insertBefore(panel,composer.firstChild);
  let active='owls';
  const grid=q('.chat58-sticker-grid',panel);
  function paint(){
    grid.replaceChildren();
    const p=PACKS[active];
    p.labels.forEach((label,index)=>{
      const b=document.createElement('button');
      b.type='button';b.className='chat58-sticker-item';b.title=label;b.setAttribute('aria-label',label);
      b.appendChild(makeSprite(active,index,'chat58-sticker-thumb'));
      b.addEventListener('click',()=>{sendSticker(active,index);panel.hidden=true});
      grid.appendChild(b);
    });
  }
  q('.chat58-sticker-tabs',panel).addEventListener('click',e=>{
    const b=e.target.closest('button[data-tab]');if(!b)return;
    active=b.dataset.tab;
    panel.querySelectorAll('.chat58-sticker-tabs button').forEach(x=>x.classList.toggle('active',x===b));
    paint();
  });
  btn.addEventListener('click',()=>{panel.hidden=!panel.hidden;if(!panel.hidden)paint()});
  q('.chat58-sticker-close',panel).addEventListener('click',()=>panel.hidden=true);
  document.addEventListener('click',e=>{if(panel.hidden)return;if(panel.contains(e.target)||btn.contains(e.target))return;panel.hidden=true});
  paint();
}
function init(){
  buildPicker();
  renderStickerText();
  const messages=q('#chat58Messages');
  if(messages)new MutationObserver(muts=>{for(const m of muts)for(const n of m.addedNodes)if(n.nodeType===1)renderStickerText(n)}).observe(messages,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
