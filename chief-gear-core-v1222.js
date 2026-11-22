
/* DATA */
const BM_DATA=JSON.parse(document.getElementById('bm-game-data').textContent);
const G=BM_DATA.records.filter(r=>r.kind==='gear').map(r=>({label:r.label_ru,alloy:r.cost.alloy,polish:r.cost.polishing_solution,plans:r.cost.design_plans,amber:r.cost.lunar_amber,power:r.power_total,score:r.upgrade_score,stat:r.stat_total_percent}));
const C=BM_DATA.records.filter(r=>r.kind==='charm').map(r=>({label:r.label_ru,guides:r.cost.charm_guide,designs:r.cost.charm_design,secrets:r.cost.charm_secrets,power:r.power_total,score:r.upgrade_score,stat:r.stat_total_percent}));
if(G.length!==150||C.length!==75)throw new Error('Ошибка таблицы переходов');
const gearSlots=[['cap','◈','Головной убор','Копейщики'],['watch','◷','Часы','Копейщики'],['coat','▣','Верхняя одежда','Пехота'],['pants','▥','Штаны','Пехота'],['ring','◉','Кольцо','Стрелки'],['weapon','⚔','Оружие','Стрелки']];
const gearImages={cap:'Cap',watch:'Watch',coat:'Coat',pants:'Pants',ring:'Ring',weapon:'Weapon'};
const catalogGearImages={pants:'assets/sova-chief-pants-v1223.webp',cap:'assets/sova-chief-cap-v1223.png',watch:'assets/sova-chief-watch-v1223.png',coat:'assets/sova-chief-coat-v1223.png',ring:'assets/sova-chief-ring-v1223.png',weapon:'assets/sova-chief-weapon-v1223.png'};
const gearImage=(id)=>catalogGearImages[id]||'';
const charmSlots=gearSlots.flatMap(([id,,name,troop])=>[1,2,3].map(n=>[`${id}-${n}`,'💎',`${name} · ${n}`,troop]));
const mats={alloy:'Упроченный сплав',polish:'Полировочный раствор',plans:'Проектные планы',amber:'Лунный янтарь',guides:'Руководство талисмана',designs:'Чертёж талисмана',secrets:'Секреты самоцветов'};
const materialIcons={"alloy":"assets/sova-chief-alloy-v1223.png","polish":"assets/sova-chief-polish-v1223.png","plans":"assets/sova-chief-plans-v1223.png","amber":"assets/sova-chief-amber-v1223.png","designs":"assets/sova-chief-designs-v1223.png","guides":"assets/sova-chief-guides-v1223.png","secrets":"assets/sova-chief-secrets-v1223.png"};
function materialHeading(id,name,tag='div'){
 const wrap=document.createElement(tag);wrap.className='material-title';
 if(materialIcons[id]){const img=document.createElement('img');img.src=materialIcons[id];img.alt='';img.className='material-icon';img.loading='lazy';wrap.append(img)}
 const label=document.createElement('span');label.className='material-label';label.textContent=name;wrap.append(label);return wrap
}
const recipes=[['plans','amber',10,1,'10 проектных планов → 1 янтарь',500],['plans','polish',1,3,'1 проектный план → 3 раствора',500],['plans','alloy',1,300,'1 проектный план → 300 сплава',500],['polish','plans',10,1,'10 растворов → 1 проектный план',50],['polish','alloy',1,50,'1 раствор → 50 сплава',1000],['alloy','plans',1000,1,'1000 сплава → 1 проектный план',50],['alloy','polish',200,1,'200 сплава → 1 раствор',500],['guides','designs',2,1,'2 руководства → 1 чертёж талисмана',null],['designs','guides',2,1,'2 чертежа → 1 руководство',null],['guides','secrets',40,1,'40 руководств → 1 секрет',null],['designs','secrets',40,1,'40 чертежей → 1 секрет',null]];

// State is kept in the original test version's local-storage key so players retain their plans.
const blank=()=>({gear:Object.fromEntries(gearSlots.map(s=>[s[0],{from:-1,to:-1}])),charm:Object.fromEntries(charmSlots.map(s=>[s[0],{from:-1,to:-1}])),inventory:Object.fromEntries(Object.keys(mats).map(k=>[k,0])),exchanges:[],exchangeUnlocked:{gear:false,charm:false},bonus:0,svsGoal:0,charmWeeklyLimits:{}});
const key='belaya-mgla-chief-calculator-v1';const $=id=>document.getElementById(id);const fmt=n=>Math.round(n).toLocaleString('ru-RU');
let state;try{state=JSON.parse(localStorage.getItem(key))||blank()}catch{state=blank()}
const defaultState=blank();if(!state||typeof state!=='object'||Array.isArray(state))state=blank();state={...defaultState,...state,inventory:{...defaultState.inventory,...(state.inventory&&typeof state.inventory==='object'&&!Array.isArray(state.inventory)?state.inventory:{})}};
for(const cat of ['gear','charm']){state[cat]={...defaultState[cat],...state[cat]};for(const id of Object.keys(defaultState[cat])){const v=state[cat][id];const max=(cat==='gear'?G:C).length-1;const from=Number.isInteger(v?.from)?Math.max(-1,Math.min(max,v.from)):-1;const to=Number.isInteger(v?.to)?Math.max(from,Math.min(max,v.to)):from;state[cat][id]={from,to};}}
state.charmWeeklyLimits=(state.charmWeeklyLimits&&typeof state.charmWeeklyLimits==='object'&&!Array.isArray(state.charmWeeklyLimits))?state.charmWeeklyLimits:{};
for(const k of Object.keys(state.charmWeeklyLimits)){const n=Number(state.charmWeeklyLimits[k]);if(!Number.isSafeInteger(n)||n<0||n>1000000)delete state.charmWeeklyLimits[k];else state.charmWeeklyLimits[k]=n;}
state.svsGoal=Number.isSafeInteger(Number(state.svsGoal))?Math.max(0,Math.min(1000000000000,Number(state.svsGoal))):0;
state.exchangeUnlocked={gear:state.exchangeUnlocked?.gear===true,charm:state.exchangeUnlocked?.charm===true};
state.exchanges=Array.isArray(state.exchanges)?state.exchanges.filter(v=>Array.isArray(v)&&Number.isInteger(v[0])&&recipes[v[0]]&&Number.isSafeInteger(v[1])&&v[1]>0&&v[1]<=1000000):[];
for(const k of Object.keys(mats)){const n=Number(state.inventory[k]);state.inventory[k]=Number.isSafeInteger(n)&&n>=0?n:0;}
state.bonus=Number.isFinite(Number(state.bonus))?Math.max(0,Math.min(500,Number(state.bonus))):0;
let category='gear',selected='cap';const save=()=>{try{localStorage.setItem(key,JSON.stringify(state))}catch(e){/* private browsing */}};
const currentSlot=()=>state[category][selected];const rows=cat=>cat==='gear'?G:C;const positions=cat=>cat==='gear'?gearSlots:charmSlots;
function setCategory(cat){category=cat;selected=cat==='gear'?'cap':'cap-1';renderSlots();renderSelects();renderBulk();renderExtras()}
function renderSlots(){for(const cat of ['gear','charm']){$(cat+'Tab').classList.toggle('active',category===cat);$(cat+'Tab').setAttribute('aria-selected',String(category===cat))}const holder=$('slots');holder.innerHTML='';for(const [id,emoji,name,troop] of positions(category)){const v=state[category][id],b=document.createElement('button');b.type='button';b.className='slot'+(id===selected?' active':'');b.setAttribute('aria-pressed',String(id===selected));const icon=document.createElement('span');icon.className='emoji';
  if(category==='gear'){
    const img=document.createElement('img');img.src=gearImage(id);img.alt='';img.loading='lazy';img.decoding='async';
    const fallback=document.createElement('span');fallback.className='iconfallback';fallback.textContent=emoji;
    img.onerror=()=>{img.style.display='none';fallback.style.display='grid'};if(!gearImage(id)){img.style.display='none';fallback.style.display='grid';}
    icon.append(img,fallback);
  }else{
    const gearId=id.split('-')[0];
    const img=document.createElement('img');img.src=gearImage(gearId);img.alt='';img.loading='lazy';img.decoding='async';
    const gem=document.createElement('span');gem.className='gemmark';gem.textContent='◆ '+id.split('-')[1];
    img.onerror=()=>{img.style.display='none';icon.textContent='💎 '+id.split('-')[1]};if(!gearImage(gearId)){img.style.display='none';icon.textContent='💎 '+id.split('-')[1];}
    icon.append(img,gem)
  }const title=document.createElement('b');title.textContent=name;const sub=document.createElement('small');sub.textContent=v.to>v.from?'✓ В плане':troop;sub.className=v.to>v.from?'ready':'';b.append(icon,title,sub);b.onclick=()=>{selected=id;renderSlots();renderSelects();renderExtras()};holder.append(b)}const item=positions(category).find(s=>s[0]===selected);$('selectioncaption').textContent=category==='gear'?`Выбрано: ${item[2]} · ${item[3]}`:`Выбран талисман ${item[2]} · ${item[3]}`}
function renderSelects(){const v=currentSlot(),r=rows(category);for(const [id,value] of [['current',v.from],['target',v.to]]){const el=$(id);el.innerHTML='';const base=new Option('Не улучшено',-1);el.add(base);r.forEach((row,i)=>el.add(new Option(row.label,i)));el.value=String(value)}$('positionInfo').textContent='Расчёт включает все промежуточные шаги между выбранными уровнями.';renderMini()}
function renderMini(){
 const v=currentSlot(),r=rows(category),el=$('miniResult'),holder=$('selectedNeeds');holder.replaceChildren();
 if(v.to<=v.from){$('selectedWarning').textContent='';$('selectedWarning').className='helper';el.replaceChildren();const strong=document.createElement('strong');strong.textContent='Улучшение пока не выбрано';const help=document.createElement('span');help.textContent='Укажите целевой уровень выше текущего';el.append(strong,help);const empty=document.createElement('div');empty.className='empty-selected';empty.textContent='Здесь появятся материалы только для выбранного слота.';holder.append(empty);return}
 const a=v.from<0?0:r[v.from].power,delta=r[v.to].power-a,required=Object.fromEntries(Object.keys(mats).map(k=>[k,0]));let points=0;
 for(let i=v.from+1;i<=v.to;i++){for(const k of Object.keys(mats))required[k]+=r[i][k]||0;points+=r[i].score}
 el.replaceChildren();const strong=document.createElement('strong');strong.textContent='+'+fmt(delta)+' мощности';const sub=document.createElement('span');sub.textContent=(v.to-v.from)+' этап(ов) · '+fmt(Math.round(points*(category==='gear'?36:70)*(1+(Number(state.bonus)||0)/100)))+' возможных очков СВС';el.append(strong,sub);
 const baseStat=v.from<0?0:(Number(r[v.from].stat)||0);
 const statGain=(Number(r[v.to].stat)||0)-baseStat;
 if(statGain>0){const detail=document.createElement('span');detail.textContent='+'+statGain.toLocaleString('ru-RU',{maximumFractionDigits:2})+' п.п. к '+(category==='gear'?'атаке/защите соответствующих войск':'здоровью/смертоносности соответствующих войск')+' (по справочнику)';el.append(detail)}
 const balances=pool(),lacks=Object.entries(required).filter(([k,amount])=>amount>balances[k]);
 const warn=$('selectedWarning');warn.className='helper '+(lacks.length?'warn':'okhint');
 warn.textContent=lacks.length?'⚠️ Для этого улучшения не хватает: '+lacks.map(([k,amount])=>mats[k]+' '+fmt(amount-balances[k])).join(', ')+'.':'✓ По текущим запасам материалов на этот предмет хватает (без учёта других планов).';
 for(const [id,amount] of Object.entries(required)){if(!amount)continue;const m=document.createElement('div');m.className='selected-mat';m.append(materialHeading(id,mats[id]));const val=document.createElement('strong');val.textContent=fmt(amount);m.append(val);holder.append(m)}
}
function renderInventory(){const holder=$('inventory');holder.innerHTML='';for(const [id,name] of Object.entries(mats)){const el=document.createElement('div');el.className='stock';const label=document.createElement('label');label.htmlFor='inv-'+id;label.append(materialHeading(id,name));const input=document.createElement('input');input.type='number';input.id='inv-'+id;input.min='0';input.step='1';input.value=String(Math.max(0,Number(state.inventory[id])||0));input.addEventListener('input',()=>{state.inventory[id]=Math.max(0,Math.min(Number.MAX_SAFE_INTEGER,Math.floor(Number(input.value)||0)));save();calculate();clearOptimizerPreview()});el.append(label,input);holder.append(el)}}
function recipeGroup(i){return i<7?'gear':'charm'}
function exchangeLimit(i){
 const published=recipes[i][5];
 if(i<7)return published;
 const supplied=state.charmWeeklyLimits[String(i)];
 return Number.isSafeInteger(supplied)&&supplied>=0?supplied:null;
}
function updateLimitInput(){
 const i=Number($('recipe').value)||0;
 const limit=$('charmWeeklyLimit');
 limit.disabled=i<7;
 limit.value=i>=7&&exchangeLimit(i)!==null?String(exchangeLimit(i)):'';
 $('charmSuggestedLimit').disabled=i<7||![7,8,9,10].includes(i);
 $('charmClearLimit').disabled=i<7;
}
function exchangeBalance(){
  const p=Object.fromEntries(Object.keys(mats).map(k=>[k,Math.max(0,Number(state.inventory[k])||0)]));
  let skipped=0;const used=Array(recipes.length).fill(0);
  for(const [i,n] of state.exchanges){
    const [from,to,give,get]=recipes[i],limit=exchangeLimit(i);
    if(!state.exchangeUnlocked[recipeGroup(i)]||(limit!==null&&used[i]+n>limit)||!Number.isSafeInteger(give*n)||!Number.isSafeInteger(get*n)||p[from]<give*n||!Number.isSafeInteger(p[to]+get*n)){skipped++;continue}
    p[from]-=give*n;p[to]+=get*n;used[i]+=n;
  }
  return {p,skipped,used};
}
function pool(){return exchangeBalance().p}
function renderExchange(){
  $('recipe').replaceChildren();recipes.forEach((r,i)=>$('recipe').add(new Option(r[4],i)));
  $('gearUnlocked').checked=state.exchangeUnlocked.gear;
  $('charmUnlocked').checked=state.exchangeUnlocked.charm;
  updateLimitInput();updateExchangeInfo();
}
function updateExchangeInfo(){
 const qty=state.exchanges.reduce((s,r)=>s+r[1],0),{skipped,used}=exchangeBalance();
 const i=Number($('recipe').value)||0,recipe=recipes[i],limit=exchangeLimit(i);
 const note=limit===null?'Недельный лимит не задан. Сверьте ограничение в игре; пока калькулятор его не применяет.':`Недельный лимит: ${fmt(limit)} обменов. По текущему плану осталось ${fmt(Math.max(0,limit-used[i]))}.`;
 $('exchangeInfo').textContent=(skipped?`⚠️ ${skipped} запланированных обменов не учитываются: не хватает запасов, не открыт обмен или превышен недельный лимит. `:qty?`В плане ${fmt(qty)} обменов. `:'Обменов пока нет. ')+note;
}
function collect(){const needs=Object.fromEntries(Object.keys(mats).map(k=>[k,0]));let power=0,gs=0,cs=0,count=0;for(const cat of ['gear','charm'])for(const [id] of positions(cat)){const v=state[cat][id],r=rows(cat);if(v.to<=v.from)continue;count++;power+=r[v.to].power-(v.from<0?0:r[v.from].power);for(let i=v.from+1;i<=v.to;i++){for(const k of Object.keys(mats))needs[k]+=r[i][k]||0;if(cat==='gear')gs+=r[i].score;else cs+=r[i].score}}return{needs,power,gs,cs,count}}
// Matching-quality set bonuses, tracked as independent Defense (3) and Attack (6) thresholds.
const gearSetTiers=[['Зелёное',5],['Синее',5.5],['Фиолетовое',6],['Фиолетовое T1',6.5],['Золотое',7],['Золотое T1',8],['Золотое T2',9],['Красное',10],['Красное T1',12],['Красное T2',14],['Красное T3',16],['Красное T4',18],['Красное T5',20],['Красное T6',22]];
function gearTierAt(index){
 if(index<0||index>=G.length)return -1;
 const name=G[index].label;
 // Test longer sub-tier names first, otherwise "Красное T6" would match "Красное".
 for(let t=gearSetTiers.length-1;t>=0;t--)if(name.startsWith(gearSetTiers[t][0]))return t;
 return -1;
}
function gearSetAt(levels){
 const tiers=gearSlots.map(([id])=>gearTierAt(levels[id]??-1));
 const sorted=[...tiers].sort((a,b)=>b-a);
 const defTier=sorted[2],atkTier=sorted[5];
 const def=defTier>=0?gearSetTiers[defTier][1]:0,atk=atkTier>=0?gearSetTiers[atkTier][1]:0;
 return {def,atk,defTier,atkTier,tiers};
}
function activeGearLevels(which='from'){
 return Object.fromEntries(gearSlots.map(([id])=>[id,state.gear[id][which]]));
}
function renderSetBonuses(){
 const before=gearSetAt(activeGearLevels('from')),after=gearSetAt(activeGearLevels('to'));
 const percent=v=>v.toLocaleString('ru-RU',{maximumFractionDigits:1})+'%';
 $('setDefNow').textContent='+'+percent(before.def);$('setAtkNow').textContent='+'+percent(before.atk);
 $('setDefNext').textContent='После плана: +'+percent(after.def)+(after.def>before.def?' (+'+percent(after.def-before.def)+')':'');
 $('setAtkNext').textContent='После плана: +'+percent(after.atk)+(after.atk>before.atk?' (+'+percent(after.atk-before.atk)+')':'');
 const progress=(next,required)=>{
   if(next>=gearSetTiers.length)return 'Достигнут максимум';
   const count=after.tiers.filter(t=>t>=next).length;
   return `Следующий порог: ${gearSetTiers[next][0]} · ${count}/${required} предметов`;
 };
 $('setDefProgress').textContent=progress(after.defTier+1,3);
 $('setAtkProgress').textContent=progress(after.atkTier+1,6);
 $('setNote').textContent=after.def>before.def||after.atk>before.atk?'✓ Ваш план повышает комплектные бонусы. Эти проценты показаны отдельно от обычной мощности предметов и не удваиваются.':'Чтобы увеличить комплектный бонус, доведите 3 или 6 предметов до следующего порога качества.';
}
function calculate(){const {needs,power,gs,cs,count}=collect(),p=pool(),bonus=Math.max(0,Math.min(500,Number(state.bonus)||0));const gearPoints=Math.round(gs*36*(1+bonus/100)),charmPoints=Math.round(cs*70*(1+bonus/100));$('power').textContent='+'+fmt(power);$('gearPoints').textContent=fmt(gearPoints);$('charmPoints').textContent=fmt(charmPoints);$('totalPoints').textContent=fmt(gearPoints+charmPoints);$('planned').textContent=fmt(count);const nd=$('needs');nd.innerHTML='';for(const [id,name] of Object.entries(mats)){const required=needs[id],stock=p[id]||0,missing=Math.max(0,required-stock),box=document.createElement('div');box.className='need';const n=document.createElement('div');n.className='name';n.append(materialHeading(id,name));const val=document.createElement('strong');val.textContent=fmt(required);const have=document.createElement('span');have.className='have';have.textContent='Есть: '+fmt(stock);const lack=document.createElement('span');lack.className='deficit '+(missing?'bad':'ok');lack.textContent=missing?'Не хватает: '+fmt(missing):'✓ Хватает';box.append(n,val,have,lack);nd.append(box)}updateExchangeInfo();renderMini();renderSlots();renderSetBonuses();renderExtras()}


// BULK CONTROL AND RESOURCE-BOUNDED RECOMMENDATIONS
function renderBulk(){
 const selector=$('bulkLevel'), old=selector.value, data=rows(category);selector.replaceChildren();
 selector.add(new Option('Нет уровня (до первой ступени)','-1'));
 data.forEach((r,i)=>selector.add(new Option(r.label,String(i))));
 selector.value=(old!==''&&Number(old)>=-1&&Number(old)<data.length)?old:'-1';
 $('bulkScope').textContent=category==='gear'?'6 предметов':'18 талисманов';
}
function bulkSet(which){
 const idx=Number($('bulkLevel').value), data=rows(category);
 if(!Number.isInteger(idx)||idx < -1||idx>=data.length)return;
 const qty=positions(category).length;
 if(!confirm(`Установить ${which==='from'?'текущий':'целевой'} уровень «${idx<0?'Нет уровня':data[idx].label}» для ${qty} позиций?`))return;
 for(const [id] of positions(category)){
   const v=state[category][id];
   if(which==='from'){v.from=idx;v.to=Math.max(v.to,v.from)}
   else{v.to=Math.max(idx,v.from)}
 }
 save();renderSelects();calculate();clearOptimizerPreview();
}
$('bulkCurrent').onclick=()=>bulkSet('from');
$('bulkTarget').onclick=()=>bulkSet('to');
let proposedOptimization=null;
function clearOptimizerPreview(){
 proposedOptimization=null;$('applyOpt').hidden=true;
 $('optResult').textContent='Запасы или уровни изменились. Запустите подбор заново, чтобы получить актуальный план.';
 $('optList').replaceChildren();
}
function recommendation(mode){
 // Recompute from ACTUAL current levels, not previously planned targets.
 const remaining={...pool()},initial={...remaining},all=[];
 for(const cat of ['gear','charm'])for(const [id,,name,troop] of positions(cat)){
  const v=state[cat][id];all.push({cat,id,name,troop,at:v.from,start:v.from});
 }
 const bonus=Math.max(0,Math.min(500,Number(state.bonus)||0));
 const setAtStart=gearSetAt(Object.fromEntries(all.filter(x=>x.cat==='gear').map(x=>[x.id,x.at])));
 let totalPower=0,totalGearScore=0,totalCharmScore=0,changes=0;
 // Each iteration purchases exactly ONE next step, so prerequisites are always respected.
 for(let iteration=0;iteration<225*24;iteration++){
  let chosen=null;
  for(const item of all){
    const data=rows(item.cat),next=item.at+1;
    if(next>=data.length)continue;
    const r=data[next];
    if(!Object.keys(mats).every(k=>(r[k]||0)<=remaining[k]))continue;
    const gainPower=r.power-(item.at<0?0:data[item.at].power);
    const gainPoints=Math.round(r.score*(item.cat==='gear'?36:70)*(1+bonus/100));
    const beforeSet=mode==='power'&&item.cat==='gear'?gearSetAt(Object.fromEntries(all.filter(x=>x.cat==='gear').map(x=>[x.id,x.at]))):null;
    const trialLevels=beforeSet?Object.fromEntries(all.filter(x=>x.cat==='gear').map(x=>[x.id,x.id===item.id?next:x.at])):null;
    const nextSet=trialLevels?gearSetAt(trialLevels):null;
    const setDefenseGain=beforeSet?Math.max(0,nextSet.def-beforeSet.def):0;
    const setAttackGain=beforeSet?Math.max(0,nextSet.atk-beforeSet.atk):0;
    // Ranking-only heuristic: one percentage point across ALL troop types has a configurable score weight.
    // Never add this weight to raw power or SvS points, since it is not in-game power.
    const value=mode==='svs'?gainPoints:gainPower+(setDefenseGain+setAttackGain)*100000;
    // Scarcity weights expensive/rare materials more heavily; not a guaranteed global optimum.
    let burden=0;
    for(const k of Object.keys(mats)){
      const cost=r[k]||0;
      if(cost>0)burden+=cost/Math.max(1,initial[k]);
    }
    const merit=value/Math.max(0.00001,burden);
    if(!chosen||merit>chosen.merit){chosen={item,r,next,gainPoints,gainPower,merit}}
  }
  if(!chosen)break;
  for(const k of Object.keys(mats))remaining[k]-=chosen.r[k]||0;
  chosen.item.at=chosen.next;
  if(chosen.item.cat==='gear')totalGearScore+=chosen.r.score;else totalCharmScore+=chosen.r.score;
  totalPower+=chosen.gainPower;changes++;
 }
 const totalPoints=Math.round(totalGearScore*36*(1+bonus/100))+Math.round(totalCharmScore*70*(1+bonus/100));
 const setAtEnd=gearSetAt(Object.fromEntries(all.filter(x=>x.cat==='gear').map(x=>[x.id,x.at])));
 const extraDef=Math.max(0,setAtEnd.def-setAtStart.def),extraAtk=Math.max(0,setAtEnd.atk-setAtStart.atk);
 const selected=all.filter(x=>x.at>x.start);
 proposedOptimization={mode,targets:all.map(x=>({cat:x.cat,id:x.id,from:x.start,to:x.at})),initial,totalPoints,totalPower,changes,selected};
 const remainingText=Object.entries(remaining).filter(([k])=>initial[k]>0).map(([k,v])=>`${mats[k]}: ${fmt(v)}`).join(' · ');
 $('optResult').textContent=selected.length
  ? `${mode==='svs'?'🏆 Стратегия: очки СВС':'⚔️ Стратегия: мощь'} · ${selected.length} позиций · ${changes} переходов · ${fmt(totalPoints)} очков СВС · +${fmt(totalPower)} мощности · комплект: защита +${extraDef.toLocaleString('ru-RU')} п.п., атака +${extraAtk.toLocaleString('ru-RU')} п.п. Остатки: ${remainingText||'запасы не введены'}.`
  :'Доступных переходов на текущие запасы не найдено. Укажите материалы или измените текущие уровни.';
 const holder=$('optList');holder.replaceChildren();
 for(const a of selected){
   const d=document.createElement('div');d.className='opt-step';
   const b=document.createElement('strong');b.textContent=a.name+' → '+rows(a.cat)[a.at].label;
   const q=document.createElement('small');q.textContent=`${a.at-a.start} переход(ов) · ${a.troop}`;
   d.append(b,q);holder.append(d);
 }
 $('applyOpt').hidden=!selected.length;
}
$('optSvs').onclick=()=>recommendation('svs');
$('optPower').onclick=()=>recommendation('power');
$('applyOpt').onclick=()=>{
 if(!proposedOptimization)return;
 // Reject stale proposals if saved actual levels or inventory differ.
 if(proposedOptimization.targets.some(t=>state[t.cat][t.id].from!==t.from)
    ||Object.keys(mats).some(k=>pool()[k]!==proposedOptimization.initial[k])){
   clearOptimizerPreview();alert('Уровни или запасы изменились. Запустите подбор ещё раз.');return;
 }
 if(!confirm('Заменить ВСЕ текущие цели улучшения предложенным планом? Текущие уровни и запасы останутся прежними.'))return;
 for(const t of proposedOptimization.targets)state[t.cat][t.id].to=t.to;
 save();renderSelects();calculate();
 $('optResult').textContent+=' План применён.';
};

function materialCost(cat,from,to){
 const cost=Object.fromEntries(Object.keys(mats).map(k=>[k,0])),arr=rows(cat);
 for(let i=from+1;i<=to;i++)for(const k of Object.keys(mats))cost[k]+=arr[i][k]||0;
 return cost;
}
function renderExtras(){
 const total=collect(),bonus=Math.max(0,Math.min(500,Number(state.bonus)||0));
 const score=Math.round(total.gs*36*(1+bonus/100))+Math.round(total.cs*70*(1+bonus/100));
 const goal=state.svsGoal||0;
 if(document.activeElement!==$('svsGoal'))$('svsGoal').value=goal||'';
 const percentage=goal?Math.min(100,100*score/goal):0;
 $('goalPercent').textContent=goal?percentage.toLocaleString('ru-RU',{maximumFractionDigits:1})+'%':'0%';
 $('goalFill').style.width=percentage+'%';$('goalTrack').setAttribute('aria-valuenow',String(Math.round(percentage)));
 $('goalStatus').textContent=!goal?'Введите желаемое количество очков':score>=goal?'✓ Цель достигнута в плане':'До цели не хватает '+fmt(goal-score)+' очков';
 const v=currentSlot(),valid=v.to>v.from;
 $('markDone').disabled=!valid;
 $('doneHelp').textContent=valid?'После улучшения можно обновить текущий уровень. При желании спишем затраченные материалы из запасов.':'Сначала выберите целевой уровень.';
 const available=pool(),planned=total.needs;
 const remaining=Object.fromEntries(Object.keys(mats).map(k=>[k,Math.max(0,available[k]-planned[k])]));
 const overspent=Object.keys(mats).filter(k=>planned[k]>available[k]);
 const opts=[];
 if(!overspent.length)for(const cat of ['gear','charm'])for(const [id,,name,troop] of positions(cat)){
   const val=state[cat][id],arr=rows(cat),last=arr.length-1;
   // Existing targets reserve their materials first; offer only ADDITIONAL affordable stages.
   const start=Math.max(val.from,val.to);
   let best=start;
   for(let j=start+1;j<=last;j++){
     const extraCost=materialCost(cat,start,j);
     if(Object.keys(mats).every(k=>remaining[k]>=extraCost[k]))best=j;else break;
   }
   if(best<=start)continue;
   const points=arr.slice(start+1,best+1).reduce((n,r)=>n+(r.score||0),0);
   opts.push({cat,id,name,troop,stage:arr[best].label,best,points:Math.round(points*(cat==='gear'?36:70)*(1+bonus/100)),power:arr[best].power-(start<0?0:arr[start].power)});
 }
 opts.sort((a,b)=>b.points-a.points||a.name.localeCompare(b.name,'ru'));
 $('affordableCount').textContent=overspent.length
  ? 'В текущем плане не хватает материалов: '+overspent.map(k=>mats[k]).join(', ')+'. Сначала исправьте план.'
  :opts.length?'Доступно дополнительных вариантов: '+opts.length+' из 24. Каждый вариант показан отдельно, добавление резервирует общий запас.':'Свободных материалов для дополнительных улучшений нет.';
 const list=$('compare');list.replaceChildren();
 if(!opts.length){const empty=document.createElement('div');empty.className='nothing';empty.textContent=overspent.length?'Уменьшите уже выбранные цели или добавьте материалы.':'Добавьте материалы в «Мои запасы» или пересмотрите уже выбранные цели.';list.append(empty);return;}
 for(const o of opts){
  const item=document.createElement('div');item.className='compareItem';
  const heading=document.createElement('strong');heading.textContent=o.name+' → '+o.stage;
  const row=document.createElement('div');row.className='compare-buttons';
  const detail=document.createElement('small');detail.textContent=o.troop+' · дополнительно +'+fmt(o.power)+' мощи · '+fmt(o.points)+' очков СВС';
  const btn=document.createElement('button');btn.type='button';btn.className='btn';btn.textContent='В план';btn.onclick=()=>{
   const current=state[o.cat][o.id],needs=collect().needs,p=pool();
   const previous=materialCost(o.cat,current.from,current.to);
   const proposed=materialCost(o.cat,current.from,o.best);
   const shortages=Object.keys(mats).filter(k=>needs[k]-previous[k]+proposed[k]>p[k]);
   if(shortages.length){alert('Для всех выбранных улучшений вместе не хватает материалов: '+shortages.map(k=>mats[k]).join(', ')+'. Уменьшите другие цели или добавьте запасы.');return;}
   category=o.cat;selected=o.id;current.to=o.best;save();renderSlots();renderSelects();calculate();clearOptimizerPreview();
   document.getElementById('slots').scrollIntoView({behavior:'smooth',block:'start'});
  };
  row.append(detail,btn);item.append(heading,row);list.append(item);
 }
}
function settleDone(deduct){
 const val=currentSlot();if(val.to<=val.from)return;
 if(deduct){
  const balance=exchangeBalance(),newPool=balance.p,cost=materialCost(category,val.from,val.to);
  if(balance.skipped)return alert('В плане есть обмены, которые нельзя выполнить. Исправьте их перед списанием, чтобы они не пропали.');
  if(!Object.keys(mats).every(k=>newPool[k]>=cost[k]))return alert('Для списания не хватает материалов. Обновите запасы или выберите «Только обновить уровень».');
  if(state.exchanges.length&&!confirm('В расчёте использованы запланированные обмены ('+state.exchanges.length+'). Подтвердите только если эти обмены уже выполнены в игре: их результат будет включён в остатки, а список планов обмена очистится. Продолжить?'))return;
  for(const k of Object.keys(mats))newPool[k]-=cost[k];
  state.inventory=newPool;state.exchanges=[];
 }
 val.from=val.to;save();renderInventory();renderExchange();renderSelects();calculate();clearOptimizerPreview();$('doneDialog').close();
}
$('markDone').onclick=()=>{
 const val=currentSlot();if(val.to<=val.from)return;
 const name=positions(category).find(x=>x[0]===selected)?.[2]||'Предмет';
 const cost=materialCost(category,val.from,val.to),balance=exchangeBalance(),p=balance.p;
 const canDeduct=balance.skipped===0&&Object.keys(mats).every(k=>p[k]>=cost[k]);
 const costText=Object.entries(cost).filter(([,n])=>n>0).map(([k,n])=>mats[k]+': '+fmt(n)).join('; ');
 $('doneDescription').textContent=name+' → '+rows(category)[val.to].label+'. Расход: '+(costText||'0')+'. '+(balance.skipped?'Некоторые обмены выполнить нельзя, поэтому списание недоступно, пока план обмена не исправлен.':canDeduct?(state.exchanges.length?'Баланс учитывает '+state.exchanges.length+' запланированных обменов. При списании потребуется отдельно подтвердить, что они уже выполнены в игре.':'Вы можете списать материалы из запасов или только обновить уровень.'):'На виртуальном балансе недостаточно материалов, поэтому доступно только обновление уровня без списания.');
 $('doneDeduct').disabled=!canDeduct;
 $('doneDialog').showModal();
};
$('doneDeduct').onclick=()=>settleDone(true);
$('doneLevelOnly').onclick=()=>settleDone(false);
$('doneCancel').onclick=()=>$('doneDialog').close();
$('svsGoal').oninput=e=>{const n=Number(e.target.value);state.charmWeeklyLimits=(state.charmWeeklyLimits&&typeof state.charmWeeklyLimits==='object'&&!Array.isArray(state.charmWeeklyLimits))?state.charmWeeklyLimits:{};
for(const k of Object.keys(state.charmWeeklyLimits)){const n=Number(state.charmWeeklyLimits[k]);if(!Number.isSafeInteger(n)||n<0||n>1000000)delete state.charmWeeklyLimits[k];else state.charmWeeklyLimits[k]=n;}
state.svsGoal=Number.isSafeInteger(n)&&n>=0?Math.min(n,1000000000000):0;save();renderExtras()};
$('clearPlan').onclick=()=>{if(!confirm('Очистить все запланированные улучшения? Текущие уровни и запасы сохранятся.'))return;for(const cat of ['gear','charm'])for(const id of Object.keys(state[cat]))state[cat][id].to=state[cat][id].from;save();renderSelects();calculate();clearOptimizerPreview()};
$('clearItem').onclick=()=>{const v=currentSlot();v.to=v.from;save();renderSelects();calculate();clearOptimizerPreview()};$('gearTab').onclick=()=>setCategory('gear');$('charmTab').onclick=()=>setCategory('charm');for(const id of ['current','target'])$(id).onchange=e=>{const v=currentSlot(),val=Number(e.target.value);v[id==='current'?'from':'to']=val;if(v.to<v.from){v.to=v.from}save();renderSelects();calculate();clearOptimizerPreview()};$('bonus').value=state.bonus;$('bonus').oninput=e=>{state.bonus=Math.max(0,Math.min(500,Number(e.target.value)||0));save();calculate();clearOptimizerPreview()};
$('recipe').onchange=()=>{updateLimitInput();updateExchangeInfo()};
$('charmWeeklyLimit').onchange=()=>{const i=Number($('recipe').value);if(i<7)return;const input=$('charmWeeklyLimit'),v=input.value.trim();if(v===''){delete state.charmWeeklyLimits[String(i)];}else if(/^\d+$/.test(v)&&Number(v)<=1000000){state.charmWeeklyLimits[String(i)]=Number(v);}else{alert('Введите целый недельный лимит от 0 до 1 000 000.');updateLimitInput();return;}save();calculate();clearOptimizerPreview()};
$('charmSuggestedLimit').onclick=()=>{const i=Number($('recipe').value);const suggested={7:500,8:500,9:50,10:50};if(!(i in suggested))return;state.charmWeeklyLimits[String(i)]=suggested[i];save();updateLimitInput();calculate();clearOptimizerPreview()};
$('charmClearLimit').onclick=()=>{const i=Number($('recipe').value);if(i<7)return;delete state.charmWeeklyLimits[String(i)];save();updateLimitInput();calculate();clearOptimizerPreview()};
for(const [id,cat] of [['gearUnlocked','gear'],['charmUnlocked','charm']]){$(id).onchange=e=>{state.exchangeUnlocked[cat]=e.target.checked;save();calculate();clearOptimizerPreview()}}
$('exchangeBtn').onclick=()=>{const i=Number($('recipe').value),n=Number($('count').value),p=pool(),[from,,give]=recipes[i],limit=exchangeLimit(i);if(!Number.isSafeInteger(n)||n<1||n>1000000){alert('Введите целое положительное количество операций.');return}if(!state.exchangeUnlocked[recipeGroup(i)]){alert('Сначала подтвердите, что этот вид обмена открыт у вас в игре.');return}if(limit!==null && exchangeBalance().used[i]+n>limit){alert('Превышен недельный лимит этого обмена.');return}if(!Number.isSafeInteger(give*n)||p[from]<give*n){alert('Не хватает материала для такого обмена.');return}state.exchanges.push([i,n]);save();calculate();clearOptimizerPreview()};$('undoBtn').onclick=()=>{state.exchanges.pop();save();calculate();clearOptimizerPreview()};$('newWeekBtn').onclick=()=>{if(confirm('Очистить все запланированные обмены для новой недели? Уровни и исходные запасы сохранятся.')){state.exchanges=[];save();calculate();clearOptimizerPreview()}};$('resetBtn').onclick=()=>{if(confirm('Сбросить все уровни, материалы, обмены и цель СВС?')){state=blank();save();clearOptimizerPreview();setCategory('gear');renderInventory();renderExchange();$('bonus').value='0';$('svsGoal').value='';calculate()}};
renderSlots();renderSelects();renderBulk();renderInventory();renderExchange();calculate();
