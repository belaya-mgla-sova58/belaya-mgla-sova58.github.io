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


/* Unified reading style for published guides only. */
(function(){
"use strict";
if(window.__bmUnifiedGuideStyleV1)return;window.__bmUnifiedGuideStyleV1=true;
var routes=new Set("other alliance-championship alliance-mobilization alliance-showdown alliance arena armament-competition beacon bear brothers-in-arms buildings buildings-before-fire buildings-after-fire canyon-clash castle cheats crazy-joe dreams endless-trial exploration faq farm fishing forts foundry frostfire-mine furnace-1-30 furnace-extra-buildings furnace-fc1-5 furnace-fc5-10 ginas-revenge governor governor-orders island labyrinth mails mercenary-prestige newbie president-guide research resources skhvatka snowplow state-58 state-positions state-power state-transfer svs svs-prep troops troops-guide tundra-trade-route winter-siege".split(" "));
var snow="data:image/webp;base64,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";
var hues=[95,180,0,95,145,10,185,0,95,175,135,30,95];
function clean(v){return v.replace(/^[\s\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0E\uFE0F\u200D\u2605\u2606\u2726\u2727\u2744\u20E3]+/u,"").trim()}
function setup(){
 var slug=location.pathname.split("/").pop().replace(/\.html$/i,"");if(!routes.has(slug)||!document.body)return;
 var main=document.querySelector("main");if(!main)return;document.body.classList.add("bm-unified-guides-v1");
 if(!document.getElementById("bm-unified-guide-style-v1")){var st=document.createElement("style");st.id="bm-unified-guide-style-v1";st.textContent="\nhtml body.bm-unified-guides-v1{background:#17171b!important;color:#eeeae7!important}\nhtml body.bm-unified-guides-v1.luxury-chronicle :is(.intro-card,.section-frame,.aside-guide,.footnote),html body.bm-unified-guides-v1.modern-v424 main#appMain :is(.guide-section,.guide-fold-v414,.guide-fold-body-v414,.guide-fold-summary-v414,.page-toc-v409,.mini-card,.guide-callout,.kb-clean-card-v920){background:linear-gradient(145deg,#302d31,#1d1d21)!important;border-color:#786956!important;color:#eeeae7!important}\nhtml body.bm-unified-guides-v1 :is(.summary-title,.guide-fold-title-v414){color:#f0e7db!important;-webkit-text-fill-color:currentColor!important}\nhtml body.bm-unified-guides-v1 :is(#toc,#mobileToc,.page-toc-links-v409) a.bm-guide-snow-link::before,html body.bm-unified-guides-v1 :is(#toc,#mobileToc,.page-toc-links-v409) a.bm-guide-snow-link::after{content:none!important;display:none!important;background:none!important}\nhtml body.bm-unified-guides-v1 :is(#toc,#mobileToc,.page-toc-links-v409) a.bm-guide-snow-link{display:flex!important;align-items:center!important;gap:9px!important;padding:7px 10px!important;min-height:40px!important;background-image:none!important;line-height:1.4!important}\nhtml body.bm-unified-guides-v1 .bm-guide-snow-link img.section-snowflake{display:block!important;flex:0 0 27px!important;width:27px!important;height:27px!important;object-fit:contain!important;filter:hue-rotate(var(--snow-hue,0deg))!important}\nhtml body.bm-unified-guides-v1 .bm-guide-snow-link .portal-label{min-width:0;overflow-wrap:anywhere}\nhtml body.bm-unified-guides-v1 :is(.sova-guide-cover-v1,.siege-cover){max-width:100%}\nhtml body.bm-unified-guides-v1 .sova-guide-cover-v1>img{height:auto!important;aspect-ratio:3/1;object-fit:cover!important}\nhtml body.bm-unified-guides-v1 .sova-guide-cover-v1>.sova-guide-cover-heading-v1{background:#242327!important}\nhtml body.bm-unified-guides-v1 .sova-guide-cover-v1 h1{color:#f0d5a9!important;-webkit-text-fill-color:#f0d5a9!important}\nhtml body.bm-unified-guides-v1 .bm-guide-toc-new{margin:16px 0;padding:16px;border:1px solid #786956;border-radius:16px;background:#242327}\nhtml body.bm-unified-guides-v1 .bm-guide-toc-new h2{margin:0 0 10px;font-size:18px;color:#f0d5a9}\nhtml body.bm-unified-guides-v1 .bm-guide-toc-new a{color:#eeeae7;text-decoration:none}\n@media(min-width:1100px){html body.bm-unified-guides-v1.luxury-chronicle main.page{width:100%!important;max-width:none!important;grid-template-columns:210px minmax(0,1fr) 250px!important;gap:20px!important}html body.bm-unified-guides-v1.luxury-chronicle main.page>.main{width:100%!important;max-width:none!important;min-width:0!important}html body.bm-unified-guides-v1.modern-v424 main#appMain>.route-page.active,html body.bm-unified-guides-v1.modern-v424 main#appMain :is(.guide-page-v69,.faq-wrap,.kb-clean-v920,.buildings-wrap,.build-hub){width:100%!important;max-width:none!important;min-width:0!important;margin-inline:0!important}html body.bm-unified-guides-v1 .guide-page-v69>details.guide-fold-v414{grid-column:1/-1!important}html body.bm-unified-guides-v1 .kb-clean-grid-v920{grid-template-columns:repeat(auto-fit,minmax(230px,1fr))!important;gap:16px!important}}\n";st.textContent+="\n/* Animated original snowflakes, without legacy planet artwork. */\n@keyframes bmSiegeSnowflakeTurn{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}\n@keyframes bmSiegeSnowflakeGlow{0%,100%{opacity:.78}50%{opacity:1}}\nhtml body.bm-unified-guides-v1 :is(#toc,#mobileToc,.page-toc-links-v409) a img.section-snowflake{animation:bmSiegeSnowflakeTurn 18s linear infinite,bmSiegeSnowflakeGlow 3s ease-in-out infinite!important;transform-origin:center!important;filter:hue-rotate(var(--snow-hue,0deg)) drop-shadow(0 0 4px currentColor)!important}\nhtml body.bm-unified-guides-v1 :is(#toc,#mobileToc,.page-toc-links-v409) a:nth-child(even) img.section-snowflake{animation-direction:reverse,normal!important}\nhtml body.bm-unified-guides-v1 :is(#toc,#mobileToc,.page-toc-links-v409) a:is(:hover,.active) img.section-snowflake{animation-duration:8s,1.8s!important}\n@media(prefers-reduced-motion:reduce){html body.bm-unified-guides-v1 :is(#toc,#mobileToc,.page-toc-links-v409) a img.section-snowflake{animation:none!important}}\n";document.head.appendChild(st)}
 var tocSelector="#toc,#mobileToc,.page-toc-links-v409";
 main.querySelectorAll(tocSelector).forEach(function(nav){Array.from(nav.querySelectorAll("a[href^='#']")).forEach(function(a,i){
 if(a.classList.contains("bm-guide-snow-link"))return;
 var label=a.querySelector(".portal-label"),title=clean(label?label.textContent:a.textContent);if(!title)return;
 var img=a.querySelector("img.section-snowflake");if(!img){img=document.createElement("img");img.src=snow;img.className="section-snowflake";img.alt="";img.width=27;img.height=27;img.style.setProperty("--snow-hue",hues[i%hues.length]+"deg")}
 var span=document.createElement("span");span.className="portal-label";span.textContent=title;
 a.replaceChildren(img,span);a.classList.add("bm-guide-snow-link");a.setAttribute("aria-label",title);
 })});
 if(matchMedia("(min-width:1100px)").matches||document.documentElement.classList.contains("force-desktop-root")){
 main.querySelectorAll("details.guide-fold-v414,details.faq-answer-card,details.page-toc-v409").forEach(function(d){if(!d.querySelector("input,select,textarea,form"))d.open=true});
 main.querySelectorAll(".guide-fold-toolbar-v414 span").forEach(function(t){if(/Короткий режим|открывай только/i.test(t.textContent))t.textContent="Все разделы открыты. Перейдите к нужному через содержание."});
 }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});else setup();
window.addEventListener("load",setup,{once:true});
})();
