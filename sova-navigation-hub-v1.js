/* SOVA58 navigation hub v1: enhance existing favorites/history without duplicating them. */
(function(){
"use strict";
if(window.__sovaNavHubV1)return;window.__sovaNavHubV1=true;
const CURRENT=(location.pathname.split("/").pop()||"index.html").toLowerCase();
const ROUTES=[
["index.html","Главная","home"],["events.html","События","events"],["heroes.html","Герои","heroes"],["gear.html","Снаряжение","gear"],["pets.html","Питомцы","pets"],["experts.html","Эксперты","experts"],["calculators.html","Калькуляторы","calculators"],["other.html","База знаний","knowledge"],["news.html","Новости","news"],["site-updates.html","Обновления сайта","updates"],
["bear.html","Охота на медведя","events"],["svs-prep.html","Подготовка к СВС","events"],["svs.html","Битва СВС","events"],["winter-siege.html","Зимняя осада","events"],["canyon-clash.html","Схватка в каньоне","events"],["fire-furnace-calculator.html","Огненная топка","calculators"],["furnace-calculator.html","Калькулятор топки","calculators"],["hero-generations.html","Поколения героев","heroes"],["troops.html","Войска","knowledge"],["research.html","Исследования","knowledge"],["resources.html","Ресурсы","knowledge"],["buildings.html","Здания","knowledge"]
];
const UPDATES={"experts.html":"Обновлено","beacon.html":"Новое","mails.html":"Новое","arena.html":"Обновлено"};
const MAP=new Map(ROUTES.map(([u,t,c])=>[u,{url:u,title:t,category:c}]));
const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const load=(k)=>{try{let v=JSON.parse(localStorage.getItem(k)||"[]");return Array.isArray(v)?v:[]}catch(e){return []}};
const save=(k,a)=>{try{localStorage.setItem(k,JSON.stringify(a))}catch(e){}};
const pageTitle=()=>{let h=document.querySelector(".route-page.active h1,main h1");return (h&&h.textContent.trim())||MAP.get(CURRENT)?.title||document.title||"Материал"};
const info=u=>MAP.get(u)||{url:u,title:u,category:"knowledge"};
function category(u){
 if(MAP.has(u))return MAP.get(u).category;
 if(/^hero/.test(u))return "heroes";
 if(/^pet/.test(u))return "pets";
 if(/^expert/.test(u))return "experts";
 if(/calc|furnace|essence|mithril/.test(u))return "calculators";
 if(/^gear|equipment|governor/.test(u))return "gear";
 if(/news|interview|ogonek/.test(u))return "news";
 if(/svs|bear|fishing|castle|canyon|siege|alliance|foundry|event/.test(u))return "events";
 return "knowledge";
}
const valid=u=>typeof u==="string"&&/^[a-z0-9-]+\.html$/i.test(u)&&u!=="404.html";
function stored(){
 const favorites=load("bmFavoritesV452").filter(x=>x&&valid(x.url));
 const older=load("sovaFavorites").filter(x=>typeof x==="string");
 const recent=load("bmRecentV452").filter(x=>x&&valid(x.url)&&x.url!==CURRENT);
 return {favorites,older,recent};
}
function recents(){
 let a=load("bmRecentV452").filter(x=>x&&valid(x.url)&&x.url!==CURRENT);
 if(CURRENT!=="index.html"&&valid(CURRENT))a.unshift({url:CURRENT,title:pageTitle(),time:Date.now()});
 save("bmRecentV452",a.slice(0,10));
}
function related(){
 const cat=category(CURRENT),seen=new Set([CURRENT]),out=[];
 const body=document.querySelector(".route-page.active,main#appMain");
 if(body)body.querySelectorAll('a[href$=".html"],a[href*=".html#"]').forEach(a=>{
  let u=(a.getAttribute("href")||"").split("#")[0].split("?")[0].split("/").pop().toLowerCase();
  if(!valid(u)||seen.has(u)||category(u)!==cat)return;
  seen.add(u);out.push({url:u,title:(a.textContent||"").replace(/\s+/g," ").trim().slice(0,65)||info(u).title});
 });
 for(const x of ROUTES){if(out.length>=4)break;let [u,t,c]=x;if(c===cat&&!seen.has(u)){seen.add(u);out.push({url:u,title:t})}}
 return out.slice(0,4);
}
function init(){
 if(document.querySelector("#sova-nav-hub-v1"))return;
 recents();
 const root=document.createElement("div");root.id="sova-nav-hub-v1";
 root.innerHTML='<button type="button" class="sova-nav-trigger" aria-expanded="false" aria-controls="sova-nav-drawer">⚡ Быстрый доступ</button><div class="sova-nav-shade" hidden></div><aside id="sova-nav-drawer" class="sova-nav-drawer" aria-label="Быстрая навигация" hidden><div class="sova-nav-head"><strong>Быстрый доступ</strong><button class="sova-nav-close" type="button" aria-label="Закрыть">×</button></div><div class="sova-nav-body"></div></aside>';
 document.body.appendChild(root);
 const trigger=root.querySelector(".sova-nav-trigger"),shade=root.querySelector(".sova-nav-shade"),drawer=root.querySelector(".sova-nav-drawer"),body=root.querySelector(".sova-nav-body");
 const open=()=>{render();shade.hidden=false;drawer.hidden=false;trigger.setAttribute("aria-expanded","true")};
 const close=()=>{shade.hidden=true;drawer.hidden=true;trigger.setAttribute("aria-expanded","false")};
 trigger.addEventListener("click",()=>drawer.hidden?open():close());
 root.querySelector(".sova-nav-close").addEventListener("click",close);shade.addEventListener("click",close);
 document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
 function cards(a){return a.map(x=>'<a href="'+esc(x.url)+'">'+esc(x.title||info(x.url).title)+(UPDATES[x.url]?'<span class="sova-nav-update">'+esc(UPDATES[x.url])+'</span>':'')+'</a>').join("")}
 function render(){
  let {favorites,older,recent}=stored(),favs=[...favorites];
  older.forEach(u=>{let url=MAP.has(u)?u:null;if(url&&!favs.some(x=>x.url===url))favs.push(info(url))});
  let saved=favs.some(x=>x.url===CURRENT);
  let existingBookmark=!!document.querySelector(".reader-bookmark-v452,.favorite-guide-btn");
  body.innerHTML='<nav class="sova-nav-links" aria-label="Основные разделы">'+cards(ROUTES.slice(0,8).map(x=>info(x[0])))+'</nav>'+
  '<div class="sova-nav-section"><h3>⭐ Избранное</h3>'+(!existingBookmark&&CURRENT!=="index.html"?'<button type="button" class="sova-nav-save">'+(saved?"★ Убрать страницу":"☆ Добавить эту страницу")+'</button>':'')+
  (favs.length?'<div class="sova-nav-items">'+cards(favs.slice(0,8))+'</div>':'<p>Сохранённые страницы появятся здесь.</p>')+'</div>'+
  '<div class="sova-nav-section"><h3>🕒 Недавно просмотренное</h3>'+(recent.length?'<div class="sova-nav-items">'+cards(recent.slice(0,8))+'</div>':'<p>История пока пуста.</p>')+'</div>'+
  '<div class="sova-nav-section"><h3>🔗 Похожие материалы</h3><div class="sova-nav-items">'+cards(related())+'</div></div>'+
  '<div class="sova-nav-section"><h3>✨ Обновления</h3><a href="site-updates.html">Что нового на сайте</a></div>'+
  (CURRENT!=="index.html"?'<div class="sova-nav-section sova-nav-actions"><a href="index.html" data-sova-back>↩ Назад</a><a href="other.html">База знаний</a><a href="#appMain" data-sova-top>↑ Наверх</a></div>':'');
  const saveBtn=body.querySelector(".sova-nav-save");
  if(saveBtn)saveBtn.addEventListener("click",()=>{
   let a=load("bmFavoritesV452").filter(x=>x&&valid(x.url));
   a=a.some(x=>x.url===CURRENT)?a.filter(x=>x.url!==CURRENT):[{url:CURRENT,title:pageTitle(),time:Date.now()},...a].slice(0,16);
   save("bmFavoritesV452",a);render();
  });
  body.querySelectorAll("[data-sova-back]").forEach(a=>a.addEventListener("click",e=>{
   e.preventDefault();if(history.length>1)history.back();else location.href="index.html";
  }));
  body.querySelectorAll("[data-sova-top]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();close();window.scrollTo({top:0,behavior:"smooth"})}));
 }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();