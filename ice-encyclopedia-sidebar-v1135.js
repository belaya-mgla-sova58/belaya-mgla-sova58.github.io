/* Ice encyclopedia desktop guide navigation v1135: reversible, content-preserving. */
(function(){
'use strict';
var query='(min-width:1100px) and (hover:hover) and (pointer:fine)';
var media=window.matchMedia(query),undo=null;
function enable(){
 if(undo || !media.matches)return;
 var page=document.querySelector('main#appMain > .route-page.active');
 if(!page || page.dataset.route==='castle' || page.dataset.route==='events')return;
 var intro=page.querySelector(':scope > .intro');
 if(!intro)return;
 var sections=Array.from(page.children).filter(function(n){
  return n.nodeType===1 && n.matches('section.section, section.guide-section, .guide-page-v69');
 });
 if(!sections.length)return;
 var first=sections[0], marker=document.createComment('ice guide layout v1135 original insertion');
 page.insertBefore(marker,first);
 var grid=document.createElement('div');grid.className='ice-guide-layout-v1135';
 var article=document.createElement('div');article.className='ice-guide-body-v1135';
 var aside=document.createElement('aside');aside.className='ice-guide-sidebar-v1135';aside.setAttribute('aria-label','Содержание гайда и полезные ссылки');
 var moved=[];
 sections.forEach(function(n){moved.push({node:n,next:n.nextSibling});article.appendChild(n)});
 grid.appendChild(article);grid.appendChild(aside);
 page.insertBefore(grid,marker);
 function panel(name){var section=document.createElement('section');section.className='ice-guide-side-panel-v1135';var h=document.createElement('h2');h.textContent=name;section.appendChild(h);aside.appendChild(section);return section}
 var nav=panel('Содержание');
 var seen=Object.create(null), count=0;
 var candidates=article.querySelectorAll('h2,h3');
 Array.prototype.forEach.call(candidates,function(h){
  if(count>=24)return;
  if(h.closest('nav,.related-guides-v625,summary') || h.getClientRects().length===0)return;
  var title=h.textContent.replace(/\s+/g,' ').trim();if(!title || title.length>90)return;
  if(!h.id){var id='ice-guide-part-v1135-'+(++count);while(document.getElementById(id))id+='x';h.id=id}
  else count++;
  if(seen[h.id])return;seen[h.id]=true;
  var a=document.createElement('a');a.href='#'+h.id;a.textContent=title;nav.appendChild(a)
 });
 if(!nav.querySelector('a')){nav.remove()}
 var tips=panel('Полезно помнить');
 var list=document.createElement('ul');
 ['Проверяйте условия и расписание в самой игре.','Перед событием согласуйте действия с альянсом.','Используйте содержание для быстрого перехода к нужной теме.'].forEach(function(t){var li=document.createElement('li');li.textContent=t;list.appendChild(li)});
 tips.appendChild(list);
 var links=panel('Другие материалы');
 [['Все события','events.html'],['Подготовка к СВС','svs-prep.html'],['Битва за замок','castle.html']].forEach(function(v){if(location.pathname.endsWith('/'+v[1]))return;var a=document.createElement('a');a.href=v[1];a.textContent=v[0];links.appendChild(a)});
 page.classList.add('ice-guide-enabled-v1135');
 undo=function(){
  sections.forEach(function(n){page.insertBefore(n,marker)});
  grid.remove();marker.remove();page.classList.remove('ice-guide-enabled-v1135');
  undo=null;
 };
}
function sync(){if(media.matches)enable();else if(undo)undo()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync,{once:true});else sync();
if(media.addEventListener)media.addEventListener('change',sync);else media.addListener(sync);
})();