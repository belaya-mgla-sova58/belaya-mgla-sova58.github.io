/* SOVA58 advanced search controls v1: categories, full-text, fuzzy, synonyms, sort, suggestions. */
(function(){
"use strict";
if(window.__sovaSearchControlsV1)return;window.__sovaSearchControlsV1=true;
const norm=x=>String(x||"").toLowerCase().replace(/ё/g,"е").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zа-я0-9]+/gi," ").replace(/\s+/g," ").trim();
const safe=x=>String(x||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const GROUPS=[
["свс","svs","квк","битва государств","межгосударственная битва"],["медведь","мишка","охота на медведя"],["огненная топка","топка","печь","furnace"],
["снаряжение","экипировка","шмот","gear"],["талисман","талисманы","амулет"],["питомцы","петы","пет","звери"],["герои","герой","персонаж"],
["ресурсы","ресы","материалы"],["эксперты","эксперт","специалисты"],["осада","зимняя осада"],["каньон","схватка в каньоне"],
["мифрил","мифрилл","mithril"],["эссенция","камни эссенции","камень эссенции"],["трансфер","перенос","переход государства"],
["калькулятор","кальк","расчет","расчёт"],["войска","армия","солдаты"],["рыбалка","рыба","жетоны рыбалки"]
].map(g=>g.map(norm));
const CATS=["Все разделы","События","Герои","Снаряжение","Эксперты","Питомцы","Калькуляторы","База знаний","Новости","О сайте"];
const QUICK=[["СВС","svs-prep.html"],["Медведь","bear.html"],["Герои","heroes.html"],["Питомцы","pets.html"],["Снаряжение","gear.html"],["Калькуляторы","calculators.html"],["База знаний","other.html"]];
const category=r=>{const u=String(r.url||"").toLowerCase(),t=norm(r.title);
 if(/^(hero|heroes|hero-generations)/.test(u))return "Герои";
 if(/^(gear|governor|equipment|charm)/.test(u))return "Снаряжение";
 if(/^(pet|pets)/.test(u))return "Питомцы";
 if(/^(expert|experts)/.test(u))return "Эксперты";
 if(/(calculator|calculators|calc|essence|mithril)/.test(u))return "Калькуляторы";
 if(/^(news|site-updates|ogonek|interview)/.test(u))return "Новости";
 if(/^(about|author|sova)/.test(u))return "О сайте";
 if(/^(other|buildings|troops|resources|research|alliance|state-|farm|beacon)/.test(u))return "База знаний";
 if(/^(events|bear|svs|state-power|winter-siege|canyon|fishing|foundry|castle|crazy-joe|frostfire|alliance-mobilization|alliance-championship|forts|mercenary|snowplow|dreams|ginas|brothers-in-arms)/.test(u))return "События";
 return /калькулятор/.test(t)?"Калькуляторы":"База знаний";
};
const seeds=QUICK.map(([title,url])=>({title,url,desc:"Раздел сайта",text:title+" "+url}));
let dataPromise;
function index(){
 if(!dataPromise)dataPromise=fetch("search-index.json?v=959",{cache:"force-cache"}).then(r=>r.ok?r.json():{items:[]}).then(v=>Array.isArray(v.items)?v.items:[]).catch(()=>[]);
 return dataPromise;
}
function words(x){return norm(x).split(" ").filter(Boolean)}
function distance(a,b,max){if(Math.abs(a.length-b.length)>max)return max+1;let prev=Array.from({length:b.length+1},(_,i)=>i);
 for(let i=1;i<=a.length;i++){const cur=[i];for(let j=1;j<=b.length;j++)cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));prev=cur}return prev[b.length]}
function variants(w,enabled){if(!enabled)return [w];let g=GROUPS.find(g=>g.includes(w));return g||[w]}
function score(r,q,opts){let title=norm(r.title),desc=norm(r.desc),body=norm(r.text||r.content||r.keywords),url=norm(r.url);
 let all=opts.content?[title,desc,body,url].join(" "):[title,desc,url].join(" ");
 if(!q)return 0;let result=0,matched=0;
 if(title===q)result+=2400;else if(title.includes(q))result+=900;
 if(all.includes(q))result+=430;
 for(const w of words(q)){
  let best=0;
  for(const v of variants(w,opts.synonyms)){
   if(title.includes(v))best=Math.max(best,v===w?380:265);
   if(desc.includes(v))best=Math.max(best,v===w?185:115);
   if(url.includes(v))best=Math.max(best,120);
   if(opts.content&&body.includes(v))best=Math.max(best,95);
  }
  if(!best&&opts.typos&&w.length>=4){
   let candidates=words(title+" "+desc+" "+(opts.content?body.slice(0,1400):"")).filter(z=>Math.abs(z.length-w.length)<=2);
   if(candidates.some(z=>z[0]===w[0]&&distance(w,z,w.length>=7?2:1)<=(w.length>=7?2:1)))best=58;
  }
  if(best){result+=best;matched++}
 }
 if(!matched)return 0;
 if(matched===words(q).length)result+=240;
 else if(words(q).length>1)result=Math.round(result*.3);
 return result;
}
function init(root){
 const input=root.querySelector(".site-search-input-v426"),native=root.querySelector(".site-search-results-v426");
 if(!input||!native||root.dataset.sovaAdvanced==="1")return;
 root.dataset.sovaAdvanced="1";let control=document.createElement("section");
 control.className="sova-search-panel";control.setAttribute("aria-label","Расширенные параметры поиска");
 control.innerHTML='<div class="sova-search-options"><label>Раздел <select class="sova-search-category" aria-label="Поиск по разделам">'+CATS.map(c=>'<option>'+safe(c)+'</option>').join("")+'</select></label><label>Сортировка <select class="sova-search-sort" aria-label="Сортировка результатов"><option value="relevance">По совпадению</option><option value="alpha">По алфавиту</option></select></label></div><div class="sova-search-switches"><label><input type="checkbox" data-option="content" checked> Внутри материалов</label><label><input type="checkbox" data-option="typos" checked> Опечатки</label><label><input type="checkbox" data-option="synonyms" checked> Синонимы</label></div><div class="sova-search-output" role="status" aria-live="polite"></div>';
 root.appendChild(control);
 const output=control.querySelector(".sova-search-output"),sel=control.querySelector(".sova-search-category"),sort=control.querySelector(".sova-search-sort");
 let counter=0, timer;
 const settings=()=>({content:control.querySelector('[data-option="content"]').checked,typos:control.querySelector('[data-option="typos"]').checked,synonyms:control.querySelector('[data-option="synonyms"]').checked});
 const quick=()=>{output.innerHTML='<div class="sova-search-label">Быстрые подсказки</div><div class="sova-search-quick">'+QUICK.map(([title,url])=>'<a href="'+safe(url)+'">'+safe(title)+'</a>').join("")+'</div>'};
 function paint(arr,q){
  if(!arr.length){output.innerHTML='<p class="sova-search-muted">Совпадений не найдено. Попробуйте другое слово или включите опечатки и синонимы.</p>';return}
  output.innerHTML='<div class="sova-search-label">Найдено: '+arr.length+(arr.length===30?" (первые 30)":"")+'</div><div class="sova-search-hits">'+arr.map(x=>'<a href="'+safe(x.r.url)+'"><b>'+safe(x.r.title)+'</b><small>'+safe(x.cat)+' · '+safe(String(x.r.desc||"Материал сайта").slice(0,140))+'</small></a>').join("")+'</div>';
 }
 async function update(){
  let n=++counter,q=norm(input.value),cat=sel.value;
  root.classList.add("sova-advanced-active");
  if(q.length<2){quick();return}
  output.innerHTML='<p class="sova-search-muted">Ищем по сайту…</p>';
  const records=await index();if(n!==counter)return;
  const map=new Map(), opts=settings();
  for(const rec of [...records,...seeds]){
   if(!rec||!rec.url||!rec.title)continue;
   const c=category(rec);if(cat!=="Все разделы"&&cat!==c)continue;
   const s=score(rec,q,opts);if(s<=0)continue;
   const key=rec.url.split("?")[0].replace(/^\//,"").toLowerCase(),prev=map.get(key);
   if(!prev||prev.s<s)map.set(key,{r:rec,s,cat:c});
  }
  const a=[...map.values()].sort((x,y)=>sort.value==="alpha"?x.r.title.localeCompare(y.r.title,"ru"):y.s-x.s||x.r.title.localeCompare(y.r.title,"ru")).slice(0,30);
  paint(a,q);
 }
 const schedule=()=>{clearTimeout(timer);timer=setTimeout(update,130)};
 input.addEventListener("focus",update);input.addEventListener("input",schedule);
 control.addEventListener("change",update);
 input.addEventListener("keydown",e=>{if(e.key==="Escape"){root.classList.remove("sova-advanced-active");control.classList.remove("sova-search-visible");}});
 root.addEventListener("focusin",()=>{control.classList.add("sova-search-visible");root.classList.add("sova-advanced-active")});
 document.addEventListener("pointerdown",e=>{if(!root.contains(e.target)){root.classList.remove("sova-advanced-active");control.classList.remove("sova-search-visible")}});
 if(document.activeElement===input){control.classList.add("sova-search-visible");update()}
 }
 function run(){document.querySelectorAll("[data-site-search]").forEach(init)}
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run,{once:true});else run();
})();