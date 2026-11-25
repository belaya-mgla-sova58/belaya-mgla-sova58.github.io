/* Белая Мгла: раскрываем текстовые гайды на телефоне, не трогая калькуляторы. */
(function(){
 "use strict";
 function init(){
  if(!matchMedia("(max-width:820px)").matches || document.documentElement.classList.contains("force-desktop-root"))return;
  var pathname=decodeURIComponent(location.pathname).toLowerCase();
  if(/(?:calculator|calculators|kopilka|calc-|chief-gear|essence-mithril|furnace|search|login|account)/.test(pathname))return;
  var main=document.querySelector("main");
  if(!main)return;
  var route=document.body.className+" "+pathname;
  var isGuide=/(?:guide|chronicle|hero|troops|newbie|pets|gear|experts|fishing|svs|bear|forts|castle|foundry|canyon|siege|alliance|mine|events|buildings|state-power|snowplow|dreams|ginas|tundra|mercenary|trial|crazy-joe)/i.test(route) ||
    !!main.querySelector(".guide-page-v69,.guide-fold-v414,.guide-section,.section-frame,.luxury-chronicle,.hero-reading-layout-v1230,.mobile-guide");
  if(!isGuide)return;
  document.body.classList.add("sova-mobile-reading-v1");
  // Reading accordions are expanded, but interactive quizzes/forms retain their behavior.
  main.querySelectorAll("details").forEach(function(d){
   if(d.closest("form,[data-quiz],[data-calculator],.interactive-question,.quiz,.calc-panel"))return;
   if(d.querySelector("input,select,textarea,[contenteditable],button[data-action]"))return;
   d.open=true;
  });
  // On a phone every textual guide is open by default; remove contradictory
  // "short mode / expand all" hints without touching calculator controls.
  main.querySelectorAll(".guide-fold-toolbar-v414").forEach(function(toolbar){
    var msg=toolbar.querySelector("span");
    if(msg && /Короткий режим|открывай только/i.test(msg.textContent)){
      msg.textContent="Все разделы открыты. Листайте вниз или перейдите через содержание.";
    }
    var expandButton=toolbar.querySelector(".guide-fold-all-v414");
    if(expandButton){
      expandButton.hidden=true;
      expandButton.setAttribute("aria-hidden","true");
      expandButton.tabIndex=-1;
    }
  });
  // Long guide data tables can scroll without forcing the entire page sideways.
  main.querySelectorAll("table").forEach(function(table){
   if(table.closest(".table-wrap,.table-responsive,.responsive-table,.ec-table-wrap,.guide-table-wrap,.sova-guide-table-scroll-v2"))return;
   var wrapper=document.createElement("div");
   wrapper.className="sova-guide-table-scroll-v2";
   wrapper.setAttribute("role","region");
   wrapper.setAttribute("aria-label","Таблица: прокручивайте влево и вправо");
   wrapper.tabIndex=0;
   table.parentNode.insertBefore(wrapper,table);
   wrapper.appendChild(table);
  });
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
 else init();
})();


/* Shared Winter Siege-style header on guide pages, without altering catalog or calculators. */
(function(){
 try{
  if(document.querySelector('script[data-sova-guide-cover-loader-v1]'))return;
  var hasGuide=document.body&&(
   document.body.classList.contains('luxury-chronicle')||
   !!document.querySelector('main#appMain .route-page.active > section.page-heading-v424')
  );
  if(!hasGuide)return;
  var s=document.createElement('script');
  s.src='guide-header-unified-v1.js?v=1';s.defer=true;
  s.setAttribute('data-sova-guide-cover-loader-v1','');
  document.head.appendChild(s);
 }catch(e){/* Keep original guide usable. */}
})();


/* TOC: preserve original decorative markers; strip emoji from labels only. */
(function(){
 "use strict";
 function clean(text){return text.replace(/^[\s\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0E\uFE0F\u200D\u2605\u2606\u2726\u2727\u2744\u20E3]+/u,"").trim()}
 function normalize(){
  document.querySelectorAll("body.luxury-chronicle #toc a[href^='#'],body.luxury-chronicle #mobileToc a[href^='#'],main .page-toc-links-v409 a[href^='#']").forEach(function(a){
   var label=a.querySelector(".portal-label");
   if(label){var title=clean(label.textContent);if(title){label.textContent=title;a.setAttribute("aria-label",title)}return}
   Array.from(a.childNodes).forEach(function(n){if(n.nodeType===3){var title=clean(n.textContent);if(title)n.textContent=" "+title}});
  });
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",normalize,{once:true});else normalize();
 window.addEventListener("load",normalize,{once:true});
})();
