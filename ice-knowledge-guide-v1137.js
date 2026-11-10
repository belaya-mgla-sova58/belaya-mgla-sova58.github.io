/* Desktop-only knowledge navigation, preserves accordions and original markup on mobile. */
(function(){
'use strict';
var media=window.matchMedia('(min-width:1100px) and (hover:hover) and (pointer:fine)'),undo=null;
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt)e.textContent=txt;return e}
function enable(){
 if(undo||!media.matches)return;
 var page=document.querySelector('body.bm-ice-encyclopedia-v1134 main#appMain>.route-page.active');
 if(!page)return;
 var group=Array.from(page.children).filter(function(n){return n.matches('.guide-page-v69,.troops-wrap,.f130-wrap,.fc15-wrap,.fc510-wrap,.build-hub,.section,.intro')});
 if(!group.length)return;
 var marker=document.createComment('original knowledge layout v1137');page.insertBefore(marker,group[0]);
 var layout=el('div','ice-knowledge-layout-v1137'),main=el('div','ice-knowledge-main-v1137'),aside=el('aside','ice-knowledge-side-v1137');
 aside.setAttribute('aria-label','Содержание руководства');group.forEach(function(n){main.appendChild(n)});layout.append(main,aside);page.insertBefore(layout,marker);
 function panel(title){var p=el('section','ice-knowledge-panel-v1137');p.appendChild(el('h2','',title));aside.appendChild(p);return p}
 var nav=panel('Содержание');
 var targets=main.querySelectorAll('details.guide-section > summary, section.troop-group > h2, section.building-group > h2, .guide-page-v69 section.guide-section > h2, .build-stage > h2');
 var used=0;Array.prototype.forEach.call(targets,function(h){
  if(used>=25)return;
  var details=h.closest('details.guide-section');
  var target=details||h.closest('section')||h.closest('a.build-stage')||h;
  var title=h.textContent.replace(/Подробнее|Показать/gi,'').replace(/\s+/g,' ').trim();if(!title || title.length>95)return;
  if(!target.id){target.id='ice-knowledge-heading-v1137-'+(++used)}else used++;
  var link=el('a','',title);link.href='#'+target.id;
  if(details)link.addEventListener('click',function(ev){ev.preventDefault();details.open=true;details.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'','#'+target.id)});
  nav.appendChild(link)
 });
 if(!nav.querySelector('a'))nav.remove();
 var extras=panel('Полезные разделы');
 [['База знаний','other.html'],['События','events.html'],['Калькуляторы','calculators.html']].forEach(function(data){var a=el('a','',data[0]);a.href=data[1];extras.appendChild(a)});
 var tips=panel('Совет');var ul=el('ul');ul.appendChild(el('li','','Открывайте разделы по содержанию, чтобы быстро найти нужную информацию.'));ul.appendChild(el('li','','Перед расходом ресурсов сверяйте актуальные задания в игре.'));tips.appendChild(ul);
 page.classList.add('ice-knowledge-active-v1137');
 undo=function(){group.forEach(function(n){page.insertBefore(n,marker)});layout.remove();marker.remove();page.classList.remove('ice-knowledge-active-v1137');undo=null};
}
function sync(){if(media.matches)enable();else if(undo)undo()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync,{once:true});else sync();
if(media.addEventListener)media.addEventListener('change',sync);else media.addListener(sync);
})();