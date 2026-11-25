/* Шапка гайдов в стиле «Зимней осады». Не затрагивает калькуляторы и страницы каталога. */
(function(){
"use strict";
if(window.__sovaUnifiedGuideHeaderV1)return;
window.__sovaUnifiedGuideHeaderV1=true;
var pages=new Set("state-58 winter-siege alliance-championship alliance-mobilization alliance-showdown arena armament-competition beacon bear brothers-in-arms buildings buildings-before-fire buildings-after-fire canyon-clash castle cheats crazy-joe dreams endless-trial exploration faq farm fishing forts foundry frostfire-mine furnace-1-30 furnace-extra-buildings furnace-fc1-5 furnace-fc5-10 ginas-revenge governor governor-orders island labyrinth mails mercenary-prestige newbie president-guide research resources skhvatka snowplow state-positions state-power state-transfer svs svs-prep troops troops-guide tundra-trade-route".split(" "));
var pics={
"winter-siege":"winter-siege-cosmic-v1207.jpg",
"alliance-championship":"alliance-championship-cosmic-v1198.jpg",
"alliance-mobilization":"alliance-mobilization-cosmic-v1199.jpg",
"alliance-showdown":"alliance-showdown-cosmic-v1197.jpg",
"arena":"canyon-clash-cosmic-v1208.jpg",
"armament-competition":"castle-cosmic-v1206.jpg",
"bear":"bear-hunt-cosmic-v1195.png",
"brothers-in-arms":"brothers-in-arms-cosmic-v1205.jpg",
"canyon-clash":"canyon-clash-cosmic-v1208.jpg",
"castle":"castle-cosmic-v1206.jpg",
"crazy-joe":"crazy-joe-cosmic-v1196.jpg",
"dreams":"dreams-approved-2172x724.webp",
"endless-trial":"endless-trial-approved-2172x724.jpg",
"fishing":"fishing-tournament-approved-2172x724.webp",
"forts":"forts-cosmic-v1204.jpg",
"foundry":"foundry-cosmic-v1203.jpg",
"frostfire-mine":"frostfire-mine-cosmic-v1200.jpg",
"ginas-revenge":"gina-revenge-cosmic-v1209.jpg",
"mercenary-prestige":"mercenary-prestige-cosmic-v1210.jpg",
"snowplow":"snowplow-approved-2172x724.webp",
"state-power":"state-power-approved-2172x724.webp",
"svs":"svs-battle-siege-approved-2172x724.webp",
"svs-prep":"svs-prep-approved-2172x724.webp",
"tundra-trade-route":"tundra-trade-route-approved-2172x724.png",
"troops":"svs-battle-siege-approved-2172x724.webp",
"troops-guide":"svs-battle-siege-approved-2172x724.webp",
"furnace-1-30":"home-hero-polish-v447.webp",
"furnace-fc1-5":"home-hero-polish-v447.webp",
"furnace-fc5-10":"home-hero-polish-v447.webp",
"furnace-extra-buildings":"home-hero-polish-v447.webp",
"buildings":"home-hero-polish-v447.webp",
"buildings-before-fire":"home-hero-polish-v447.webp",
"buildings-after-fire":"home-hero-polish-v447.webp"
};
function navigation(){
 var shell=document.createElement("header");shell.className="sova-guide-topnav-v1";
 var row=document.createElement("nav");row.className="sova-guide-nav-inner-v1";row.setAttribute("aria-label","Навигация по Белой мгле");
 [["index.html","⌂ Главная"],["events.html","❄ События"],["cheats.html","📖 Шпоры"],["alliance.html","⚔ Альянс"]].forEach(function(x){
  var a=document.createElement("a");a.href=x[0];a.textContent=x[1];row.appendChild(a);
 });
 shell.appendChild(row);return shell;
}
function cover(slug){
 var section=document.createElement("section");section.className="sova-guide-cover-v1";
 section.setAttribute("aria-label","Обложка гайда");
 if(pics[slug]){
 var image=document.createElement("img");image.src="assets/"+pics[slug];
 image.alt="";image.loading="eager";image.decoding="async";section.append(image);
 }
 return section;
}
function init(){
 var slug=decodeURIComponent(location.pathname.split("/").pop()||"").replace(/\.html$/i,"").toLowerCase();
 if(new Set("newbie buildings buildings-before-fire buildings-after-fire furnace-1-30 furnace-fc1-5 furnace-fc5-10 furnace-extra-buildings troops faq research resources state-transfer".split(" ")).has(slug)||document.querySelector(".transfer-heading,.furnace-compact-heading,.kb-build-heading")||!pages.has(slug)||document.querySelector(".sova-guide-cover-v1"))return;
 var chronicle=document.body.classList.contains("luxury-chronicle");
 var main=chronicle?document.querySelector("main.page > section.main"):document.querySelector("main#appMain .route-page.active");
 if(!main)return;
 var heading=chronicle?main.querySelector(":scope > h1, :scope > .event-banner h1"):main.querySelector(":scope > section.page-heading-v424");
 if(!heading)return;
 var css=document.createElement("link");css.rel="stylesheet";css.href="guide-header-unified-v1.css?v=1";
 css.setAttribute("data-sova-guide-cover-v1","");document.head.append(css);
 var bar=navigation(),hero=cover(slug);
 if(chronicle){
  var original=document.body.querySelector(":scope > header.header");
  if(original)document.body.insertBefore(bar,original);
  else document.body.insertBefore(bar,document.body.firstChild);
  var intro=main.querySelector(":scope > .intro-card > p"),text=intro?(intro.textContent||"").replace(/\s+/g," ").trim():"";
  heading.classList.remove("sr-title");heading.removeAttribute("style");
  var block=document.createElement("div");block.className="sova-guide-cover-heading-v1";block.append(heading);
  if(text){var p=document.createElement("p");p.textContent=text;block.append(p)}
  hero.append(block);main.insertBefore(hero,main.firstChild);
 }else{
  var crumb=main.querySelector(":scope > nav.breadcrumbs-v409");
  main.insertBefore(bar,crumb||main.firstChild);
  heading.classList.add("sova-guide-cover-heading-v1");
  hero.append(heading);main.insertBefore(hero,bar.nextSibling);
 }
 document.body.classList.add("sova-guide-cover-active-v1");
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();