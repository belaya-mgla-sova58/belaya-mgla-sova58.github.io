!function(){"use strict";
const VERSION="724",INDEX_URL="search-index.json?v="+VERSION,MAX_RESULTS=16,DEBOUNCE=120;
const norm=v=>String(v||"").toLowerCase().replace(/ё/g,"е").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zа-я0-9\s-]/gi," ").replace(/\s+/g," ").trim();
const esc=v=>String(v||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
const SYNONYMS=[
 ["свс","svs","квк","state vs state","битва государств","межгосударственная"],
 ["медведь","мишка","bear","охота на медведя"],
 ["безумная джо","джо","crazy joe"],
 ["топка","печь","furnace"],
 ["огненная топка","огнетопка","fire furnace"],
 ["герой","герои","перс","персонаж"],
 ["питомец","питомцы","пет","петы","зверь"],
 ["эксперт","эксперты","специалист","специалисты"],
 ["войска","армия","солдаты","пехота","копейщики","стрелки"],
 ["ресурсы","ресы","ресурс"],
 ["калькулятор","кальк","расчет","расчёт"],
 ["база знаний","бз","справочник","гайд","гайды"],
 ["снаряжение","шмот","экипировка","gear"],
 ["исследования","исследование","наука","research"]
].map(g=>g.map(norm));
const ALIASES=[
 ["Охота на медведя","bear.html","Событие · рейды и герои","мишка медведь bear охота рейд рейды"],
 ["Мощь государства","state-power.html","Общий цикл SvS","свс svs квк state vs state мощь государства межгосударственное"],
 ["SvS — боевая фаза","svs.html","Межгосударственная боевая фаза","свс svs квк бой замок солнечный замок боевая фаза"],
 ["Подготовка к SvS","svs-prep.html","Пять дней подготовки","свс svs квк подготовка копить ресурсы дни"],
 ["Безумная Джо","crazy-joe.html","Событие · 20 волн","джо crazy joe волны подкрепления"],
 ["Калькулятор Топки 20–30","furnace-calculator.html","Калькулятор ресурсов","кальк калькулятор топки печка furnace уровни ресурсы"],
 ["Огненная Топка · Этапы 1–5","fire-furnace-calculator.html","Калькулятор Огненной Топки","огнетопка огненная топка огонь кристаллы огня калькулятор этапы"],
 ["Поколения героев","hero-generations.html","Редкие, эпические и поколения 1–12","герои поколение поколения редкие эпические легендарные список каталог"],
 ["Питомцы","pets.html","Гайды по питомцам","питомцы питомец петы пет звери"],
 ["Эксперты","experts.html","Эксперты Белой Мглы","эксперты эксперт специалисты"],
 ["Здания","buildings.html","Здания и развитие","здания здание постройки строительство"],
 ["Войска","troops.html","Пехота, копейщики и стрелки","войска армия солдаты пехота копейщики стрелки"],
 ["Ресурсы","resources.html","Ресурсы и материалы","ресурсы ресурс ресы материалы"],
 ["База знаний","other.html","Справочник и полезные материалы","база знаний бз справочник гайды гайд"],
 ["Снаряжение","gear.html","Снаряжение героев","снаряжение шмот экипировка gear"],
 ["Исследования","research.html","Исследования и развитие","исследования наука research"]
].map(x=>({title:x[0],url:x[1],desc:x[2],kind:"Подсказка",text:norm(x.join(" "))}));
let indexPromise=null;
function lev(a,b,max){if(a===b)return 0;if(Math.abs(a.length-b.length)>max)return max+1;let p=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const c=[i],from=Math.max(1,i-max),to=Math.min(b.length,i+max);for(let j=1;j<=b.length;j++)c[j]=j<from||j>to?max+1:Math.min(c[j-1]+1,p[j]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[b.length]}
function fuzzy(a,b){if(!a||!b||a.length<4||b.length<4)return!1;const m=a.length>=7?2:1;if(Math.abs(a.length-b.length)>m||a[0]!==b[0])return!1;return lev(a,b,m)<=m}
function variants(token){const out=[token];for(const group of SYNONYMS){if(group.includes(token)){for(const v of group)if(!out.includes(v))out.push(v);break}}return out}
function phraseVariants(q){const out=[];for(const group of SYNONYMS){if(group.some(v=>q.includes(v))){for(const v of group)if(v!==q&&!out.includes(v))out.push(v)}}return out}
function urlKey(u){try{return new URL(u,location.href).pathname.replace(/\/{2,}/g,"/").toLowerCase()}catch(e){return String(u||"").toLowerCase()}}
async function loadIndex(){if(indexPromise)return indexPromise;indexPromise=(async()=>{try{const r=await fetch(INDEX_URL,{cache:"force-cache"});if(!r.ok)throw 0;const data=await r.json();if(!data||!Array.isArray(data.items))throw 0;return data.items}catch(e){return[]}})();return indexPromise}
function score(rec,query){const q=norm(query);if(!q)return 0;const title=norm(rec.title),desc=norm(rec.desc),path=norm(rec.url),hay=rec.text||norm(`${rec.title} ${rec.desc} ${rec.url}`);let s=0;
 if(title===q)s+=6000;else if(title.startsWith(q))s+=4200;else if(title.includes(q))s+=3000;
 if(path===q||path.replace(/ html$/," ").trim()===q)s+=2600;
 if(desc.includes(q))s+=1700;if(hay.includes(q))s+=1100;
 for(const v of phraseVariants(q)){if(title.includes(v))s=Math.max(s,1800);else if(path.includes(v))s=Math.max(s,1200);else if(desc.includes(v))s=Math.max(s,900);else if(hay.includes(v))s=Math.max(s,500)}
 const qTokens=q.split(" ").filter(Boolean);const titleWords=title.split(" ").filter(Boolean),descWords=desc.split(" ").filter(Boolean),pathWords=path.split(" ").filter(Boolean);let matched=0;
 for(const token of qTokens){let best=0;for(const v of variants(token)){if(titleWords.includes(v))best=Math.max(best,v===token?720:560);else if(title.includes(v))best=Math.max(best,v===token?520:390);if(pathWords.includes(v)||path.includes(v))best=Math.max(best,v===token?470:350);if(descWords.includes(v)||desc.includes(v))best=Math.max(best,v===token?310:230);if(hay.includes(v))best=Math.max(best,v===token?210:150)}
  if(!best){const compact=[...titleWords,...pathWords,...descWords.slice(0,28)];if(compact.some(w=>fuzzy(token,w)))best=180}
  if(best){s+=best;matched++}
 }
 if(qTokens.length>1&&matched===qTokens.length)s+=900;else if(matched)s+=matched*90;
 if(rec.kind==="Подсказка")s+=40;return s}
function render(input,box,hits){box.querySelectorAll(".search-expanded-v722,.search-expanded-v723,.search-expanded-v724").forEach(x=>x.remove());box.querySelectorAll(".site-search-empty-v426").forEach(x=>x.remove());if(!hits.length)return;const existing=new Set([...box.querySelectorAll("a[href]")].map(a=>urlKey(a.getAttribute("href"))));const frag=document.createDocumentFragment();for(const {r} of hits){const k=urlKey(r.url);if(existing.has(k))continue;existing.add(k);const a=document.createElement("a");a.className="site-search-result-v426 search-expanded-v724";a.href=r.url;a.setAttribute("role","option");const sn=String(r.desc||"").replace(/\s+/g," ").trim().slice(0,190);a.innerHTML=`<span class="site-search-result-title-v426">${esc(r.title)}</span><span class="site-search-result-desc-v426">${esc((r.kind?r.kind+" · ":"")+sn)}</span><span class="site-search-result-arrow-v426" aria-hidden="true">›</span>`;frag.appendChild(a)}if(frag.childNodes.length){box.prepend(frag);box.classList.add("open");input.setAttribute("aria-expanded","true")}const all=[...box.querySelectorAll("a.site-search-result-v426")];all.slice(MAX_RESULTS).forEach(a=>a.remove())}
async function enhance(input,box){const q=input.value.trim();if(q.length<2)return;const index=await loadIndex();if(input.value.trim()!==q)return;const pool=[...ALIASES,...index],seen=new Map();for(const r of pool){const s=score(r,q);if(s<=0)continue;const k=urlKey(r.url);const old=seen.get(k);if(!old||s>old.s)seen.set(k,{r,s})}const hits=[...seen.values()].sort((a,b)=>b.s-a.s||a.r.title.localeCompare(b.r.title,"ru")).slice(0,MAX_RESULTS);render(input,box,hits)}
function init(){document.querySelectorAll("[data-site-search]").forEach(root=>{const input=root.querySelector(".site-search-input-v426"),box=root.querySelector(".site-search-results-v426");if(!input||!box||input.dataset.expandedV724==="1")return;input.dataset.expandedV724="1";let timer=0;const schedule=()=>{clearTimeout(timer);if(input.value.trim().length<2)return;timer=setTimeout(()=>enhance(input,box),DEBOUNCE)};input.addEventListener("input",schedule)})}
"loading"===document.readyState?document.addEventListener("DOMContentLoaded",init,{once:!0}):init();
}();
