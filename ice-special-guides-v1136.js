/* Ice Encyclopedia: custom desktop layouts for Canyon and Bear. No mobile DOM changes. */
(function(){
'use strict';
var media=window.matchMedia('(min-width:1100px) and (hover:hover) and (pointer:fine)');
var teardown=null;
function node(tag,cls,text){var n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n}
function card(side,title){var el=node('section','ice-special-panel-v1136');el.appendChild(node('h2','',title));side.appendChild(el);return el}
function link(parent,text,href){var a=node('a','',text);a.href=href;parent.appendChild(a);return a}
function setupCanyon(){
 var wrap=document.querySelector('body.is-canyon-clash-route .route-page.active .canyon-wrap');if(!wrap)return;
 var sections=Array.from(wrap.children).filter(function(n){return n.matches('section.guide-section')});
 if(!sections.length)return;
 var first=sections[0],marker=document.createComment('canyon original layout');wrap.insertBefore(marker,first);
 var layout=node('div','ice-special-layout-v1136'),main=node('div','ice-special-main-v1136'),side=node('aside','ice-special-side-v1136');
 side.setAttribute('aria-label','Содержание и полезные ссылки');
 var endNote=wrap.querySelector(':scope > .footer-note');
 sections.forEach(function(n){main.appendChild(n)});
 if(endNote)main.appendChild(endNote);
 layout.append(main,side);wrap.insertBefore(layout,marker);
 var contents=card(side,'Содержание Каньона');
 sections.forEach(function(section,i){
  var h=section.querySelector('h2');if(!h)return;
  if(!section.id)section.id='ice-canyon-part-v1136-'+(i+1);
  link(contents,h.textContent.trim(),'#'+section.id);
 });
 var reminders=card(side,'Перед битвой');
 var ul=node('ul');
 ['Проверьте время и назначенный легион.','Подготовьте три отряда.','Берегите топливо и следите за маршрутами.','Работайте по командам альянса.'].forEach(function(t){ul.appendChild(node('li','',t))});
 reminders.appendChild(ul);
 var related=card(side,'Другие события');
 link(related,'Литейная','foundry.html');link(related,'СВС','svs.html');link(related,'Все события','events.html');
 wrap.classList.add('ice-special-active-v1136');
 return function(){sections.forEach(function(n){wrap.insertBefore(n,marker)});if(endNote)wrap.insertBefore(endNote,marker);layout.remove();marker.remove();wrap.classList.remove('ice-special-active-v1136')};
}
function setupBear(){
 var page=document.querySelector('body.is-bear-route .route-page.active');if(!page)return;
 var guide=page.querySelector(':scope > section.bear-guide');if(!guide)return;
 var marker=document.createComment('bear original layout');page.insertBefore(marker,guide);
 var layout=node('div','ice-special-layout-v1136'),main=node('div','ice-special-main-v1136'),side=node('aside','ice-special-side-v1136');
 side.setAttribute('aria-label','Содержание охоты на медведя');
 layout.append(main,side);main.appendChild(guide);page.insertBefore(layout,marker);
 var contents=card(side,'Содержание гайда');
 var details=Array.from(guide.querySelectorAll('details.bear-explain-section'));
 details.forEach(function(d,i){
  if(!d.id)d.id='ice-bear-part-v1136-'+(i+1);
  var summary=d.querySelector('summary');if(!summary)return;
  var title=summary.textContent.replace(/Показать\s*$/,'').replace(/\s+/g,' ').trim();
  var a=link(contents,title,'#'+d.id);
  a.addEventListener('click',function(ev){ev.preventDefault();d.open=true;d.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'','#'+d.id)});
 });
 var quick=card(side,'Быстрые переходы');
 link(quick,'Калькулятор Медведя','bear-helper.html');
 link(quick,'Все события','events.html');
 var tips=card(side,'Полезно помнить');
 var ul=node('ul');
 ['Первый герой участника определяет навык поддержки.','Согласуйте составы сборов заранее.','Сравнивайте результаты по боевым отчётам.'].forEach(function(t){ul.appendChild(node('li','',t))});
 tips.appendChild(ul);
 page.classList.add('ice-special-active-v1136');
 return function(){page.insertBefore(guide,marker);layout.remove();marker.remove();page.classList.remove('ice-special-active-v1136')};
}
function sync(){if(media.matches){if(!teardown)teardown=setupCanyon()||setupBear()||null}else if(teardown){teardown();teardown=null}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync,{once:true});else sync();
if(media.addEventListener)media.addEventListener('change',sync);else media.addListener(sync);
})();