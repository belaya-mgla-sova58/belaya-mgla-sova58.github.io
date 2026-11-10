/* Desktop-only guide panels, with full DOM restoration on tablet/mobile. */
(function(){
'use strict';
var mq=window.matchMedia('(min-width:1100px) and (hover:hover) and (pointer:fine)');
var restore=null;
function init(){
 var page=document.querySelector('body.is-castle-route .route-page[data-route="castle"]');
 if(!page||restore)return;
 var intro=page.querySelector(':scope > .intro'),guide=page.querySelector(':scope > .castle-guide');
 if(!intro||!guide)return;
 var anchor=document.createComment('ice encyclopedia original content position');
 page.insertBefore(anchor,intro);
 var originalNodes=Array.from(guide.childNodes);
 var layout=document.createElement('div');layout.className='ice-encyclopedia-v1131';
 var main=document.createElement('div');main.className='ice-encyclopedia-main-v1131';
 var aside=document.createElement('aside');aside.className='ice-encyclopedia-aside-v1131';aside.setAttribute('aria-label','Краткая памятка и содержание');
 var panels=[];var current=null;var index=0;
 originalNodes.forEach(function(node){
  if(node.nodeType===1 && node.tagName==='H3'){
   index++;current=document.createElement('section');current.className='ice-guide-panel-v1131';
   current.id='ice-section-'+index;
   if(/Герои|Соотношение войск|После захвата|Как штурмуем|Если противник/.test(node.textContent))current.classList.add('is-wide-v1131');
   guide.appendChild(current);panels.push({node:current,title:node.textContent.trim()});
  }
  if(!current){current=document.createElement('section');current.className='ice-guide-panel-v1131';current.id='ice-overview';guide.appendChild(current);panels.push({node:current,title:'Коротко о битве'});}
  current.appendChild(node);
 });
 function sideCard(title){var el=document.createElement('section');el.className='ice-side-panel-v1131';var h=document.createElement('h2');h.textContent=title;el.appendChild(h);aside.appendChild(el);return el;}
 var toc=sideCard('✦ Содержание');
 panels.forEach(function(item){var a=document.createElement('a');a.href='#'+item.node.id;a.textContent=item.title;toc.appendChild(a)});
 var tips=sideCard('✧ Быстрые советы');
 var ul=document.createElement('ul');
 ['Главная цель: удержание Солнечного замка.','После захвата сразу заполняйте гарнизон.','Назначайте капитанов сборов заранее.','Башни важны, но замок в приоритете.','Сверяйте таймер и правила в игре.'].forEach(function(t){var li=document.createElement('li');li.textContent=t;ul.appendChild(li)});tips.appendChild(ul);
 var more=sideCard('◈ Похожие гайды');
 [['Битва за форт','forts.html'],['Литейная','foundry.html'],['Зимняя осада','winter-siege.html']].forEach(function(v){var a=document.createElement('a');a.href=v[1];a.textContent=v[0]+' ›';more.appendChild(a)});
 layout.appendChild(main);layout.appendChild(aside);
 page.insertBefore(layout,anchor);main.appendChild(intro);main.appendChild(guide);
 restore=function(){
  originalNodes.forEach(function(node){guide.appendChild(node)});
  page.insertBefore(intro,anchor);page.insertBefore(guide,anchor);
  layout.remove();anchor.remove();restore=null;
 };
}
function sync(){if(mq.matches){init()}else if(restore){restore()}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync,{once:true});else sync();
if(mq.addEventListener)mq.addEventListener('change',sync);
else if(mq.addListener)mq.addListener(sync);
})();
