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
  main.querySelectorAll("details").forEach(function(d){
   if(d.closest("form,[data-quiz],[data-calculator],.interactive-question"))return;
   d.open=true;
  });
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
 else init();
})();
