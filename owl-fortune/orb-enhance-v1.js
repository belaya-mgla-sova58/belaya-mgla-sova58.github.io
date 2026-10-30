(()=>{
  'use strict';
  if(window.__owlOrbEnhanceV1) return;
  window.__owlOrbEnhanceV1=true;

  const BASE_STORE_KEY='belaya_mgla_orb_phrases_v1';
  const TOTAL_KEY='belaya_mgla_orb_total_v1';
  const RESET_KEY='belaya_mgla_orb_reset_fullmagic1';
  const BOOK_KEY='belaya_mgla_orb_book_v1';
  const STREAK_KEY='belaya_mgla_orb_streak_v1';

  function dayKey(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  try{
    if(localStorage.getItem(RESET_KEY)!=='1'){
      localStorage.setItem(BASE_STORE_KEY,JSON.stringify({day:dayKey(),count:0,used:[]}));
      localStorage.setItem(TOTAL_KEY,'2');
      localStorage.setItem(RESET_KEY,'1');
      location.reload();
      return;
    }
  }catch(e){}

  const orb=document.getElementById('orb');
  const scene=document.getElementById('scene');
  const text=document.getElementById('fortuneText');
  const hint=document.getElementById('hint');
  const count=document.getElementById('count');
  if(!orb||!scene||!text||!hint||!count) return;

  const RARE=[
    '✨ Редкое предсказание: нужная награда окажется ближе, чем кажется. 🦉',
    '🦉 Сова подозрительно довольна. Возможно, удача наконец вспомнила дорогу. 👍',
    '🔹 Редкий знак: одна случайность сыграет заметно лучше любого плана. 😂',
    '🎊 Шар светится необычно ярко. Похоже, судьба решила немного помочь. 🦉',
    '👍 Редкое предсказание: один хороший выбор окупится лучше ожиданий. ✨',
    '🦉 В тумане появился очень хороший знак. Сова пока не раскрывает подробности. 🔹',
    '✨ Редкая удача уже где-то рядом. Главное, не спугнуть её лишней кнопкой. 😂',
    '🔹 Шар сегодня особенно благосклонен. Пользуйся моментом, пока удача не передумала. 🦉'
  ];
  const SECRET=[
    '🦉 Сова сегодня увидела слишком много. Лучше ничего не спрашивать. 😂',
    '🔹 Будущее открылось на секунду и тут же передумало. 🦉',
    '✨ Тайная ветка судьбы открыта. Награды, конечно, не обещаны. 😂',
    '🦉 В тумане что-то есть. Сова делает вид, что ничего не заметила. 😿',
    '😂 Это предсказание было спрятано. Теперь его уже не развидеть. 🦉',
    '🔹 Секрет совы: иногда лучший ход выглядит подозрительно как ожидание. 👍'
  ];
  const RUNE=[
    '🦉 Руна шепчет: не каждая яркая кнопка заслуживает нажатия. 😂',
    '🔹 Тайный знак найден. Сова советует оставить немного ресурсов будущему себе. 👍',
    '✨ Руна говорит, что удача рядом. Но у неё, как обычно, свои планы. 😂',
    '🦉 Тайна шара проста: хороший план переживает даже случайный клик. 🔹',
    '🔹 Руна открылась. Значит, любопытство хотя бы один раз окупилось. 😂'
  ];
  const LONGPRESS=[
    '🦉 Давить сильнее бесполезно. Будущее от этого быстрее не работает. 😂',
    '😂 Сова всё поняла с первого нажатия. Убеди в этом палец. 🦉',
    '🔹 Шар впечатлён настойчивостью. Судьба пока нет. 😂',
    '🦉 Долгое нажатие обнаружено. Терпение официально существует. 👍'
  ];
  const JOKES=[
    '🦉 Предсказание временно недоступно. Будущее тоже иногда зависает. 😂',
    '😂 Шар посмотрел в будущее и решил не комментировать увиденное. 🦉',
    '🔹 Судьба не отвечает. Возможно, занята подсчётом ресурсов. 😂',
    '🦉 Шар всё понял, но формулировать отказался. 😿'
  ];
  const GLITCH=[
    '😂 Будущее загрузилось не с первого раза. 🦉',
    '🦉 Магия дала сбой. Ничего, в «Белой мгле» это почти традиция. 😂',
    '🔹 Шар на секунду потерял связь с будущим. Связь восстановлена. 😂'
  ];
  const STREAK_SPECIAL=[
    '✨ Семь дней подряд. Сова уже начинает узнавать этот взгляд. 🦉',
    '🦉 Семь визитов подряд заслуживают отдельного знака. Удача это заметила. 👍',
    '🔹 Сова считает семь дней подряд хорошей привычкой. Но не признается. 😂'
  ];
  const WAITS=[
    'Сова заглядывает в туман...',
    'Шар что-то подозревает...',
    'Будущее сопротивляется...',
    'Сова сверяется с судьбой...',
    'Туман собирается с мыслями...',
    'Магия ищет нужную строку...'
  ];

  const style=document.createElement('style');
  style.id='orbEnhanceV1Style';
  style.textContent=`
    .text{font-family:"Palatino Linotype","Book Antiqua",Georgia,serif!important;font-weight:700!important;letter-spacing:.018em!important;color:#fff8ff!important;text-shadow:0 1px 2px #090013,0 0 8px rgba(255,240,255,.82),0 0 17px rgba(181,119,255,.72),0 0 30px rgba(96,45,184,.48)!important;text-rendering:optimizeLegibility}
    .hint,.count{font-family:"Palatino Linotype","Book Antiqua",Georgia,serif!important;letter-spacing:.035em!important}
    .magic-ring-v1{position:absolute;inset:12%;z-index:5;pointer-events:none}
    .magic-ring-v1 i{position:absolute;left:50%;top:50%;width:4px;height:4px;margin:-2px;border-radius:50%;background:#fff;box-shadow:0 0 8px #dac9ff,0 0 15px #8a5cff;opacity:.16;animation:orbParticleV1 var(--d) linear infinite}
    .orb.magic-rare-v1{box-shadow:inset 0 0 28px rgba(255,246,184,.26),inset 0 0 90px rgba(145,84,255,.55),0 0 18px rgba(255,232,135,.95),0 0 58px rgba(255,198,74,.7),0 0 100px rgba(107,66,215,.5)!important}
    .orb.magic-secret-v1{box-shadow:inset 0 0 30px rgba(255,255,255,.28),inset 0 0 98px rgba(68,184,255,.58),0 0 19px rgba(170,239,255,.94),0 0 66px rgba(91,106,255,.8),0 0 110px rgba(180,72,255,.5)!important}
    .orb.magic-joke-v1{filter:saturate(.82) brightness(.94)}
    .orb.magic-lucky-v2{box-shadow:inset 0 0 34px rgba(255,252,210,.34),inset 0 0 110px rgba(116,62,219,.58),0 0 20px rgba(255,239,145,.98),0 0 70px rgba(255,188,60,.82),0 0 118px rgba(119,60,236,.62)!important;animation:float 4.6s ease-in-out infinite,luckyPulseV2 1.1s ease-in-out infinite alternate!important}
    .orb.magic-glitch-v2{animation:glitchOrbV2 .09s steps(2,end) 6!important}
    .magic-burst-v1{position:absolute;left:50%;top:50%;z-index:8;width:5px;height:5px;border-radius:50%;pointer-events:none;background:#fff;box-shadow:0 0 10px #fff,0 0 16px #a77cff;animation:orbBurstV1 .95s ease-out forwards}
    .trail-dot-v2{position:absolute;z-index:11;width:5px;height:5px;border-radius:50%;pointer-events:none;background:#fff;box-shadow:0 0 7px #fff,0 0 13px #bd8cff;animation:trailFadeV2 .7s ease-out forwards}
    .rune-v2{position:absolute;z-index:15;right:17%;top:17%;width:42px;height:42px;border:1px solid rgba(255,240,190,.72);border-radius:50%;background:radial-gradient(circle,#fff7c7 0 8%,#9b6cff 28%,#3c176d 68%,rgba(15,4,30,.9) 100%);color:#fff7cf;font:800 23px/1 Georgia,serif;text-shadow:0 0 7px #fff,0 0 15px #ffd86b;box-shadow:0 0 14px rgba(255,221,111,.9),0 0 32px rgba(151,89,255,.8);cursor:pointer;animation:runePulseV2 .85s ease-in-out infinite alternate}
    .orb-controls-v2{position:absolute;z-index:18;bottom:8.5%;left:50%;transform:translateX(-50%);display:flex;gap:7px;align-items:center;justify-content:center;white-space:nowrap}
    .orb-mini-btn-v2{border:1px solid rgba(229,210,255,.38);border-radius:999px;background:rgba(14,5,28,.72);color:#eee3ff;padding:6px 9px;font:600 11px/1.1 system-ui,-apple-system,"Segoe UI",sans-serif;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.26),0 0 13px rgba(120,72,210,.14)}
    .orb-mini-btn-v2:active{transform:scale(.97)}
    .streak-v2{position:absolute;z-index:17;top:8%;left:50%;transform:translateX(-50%);color:rgba(238,222,255,.74);font:600 11px/1.2 "Palatino Linotype",Georgia,serif;white-space:nowrap;text-shadow:0 0 9px rgba(145,90,255,.8)}
    .book-panel-v2{position:absolute;z-index:30;inset:10% 7%;display:none;flex-direction:column;border:1px solid rgba(228,207,255,.38);border-radius:18px;background:linear-gradient(180deg,rgba(20,7,39,.97),rgba(5,2,13,.98));box-shadow:0 18px 48px rgba(0,0,0,.62),0 0 40px rgba(113,57,198,.28);overflow:hidden}
    .book-panel-v2.open{display:flex}
    .book-head-v2{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid rgba(225,205,255,.18)}
    .book-title-v2{font:700 19px/1.1 "Palatino Linotype","Book Antiqua",Georgia,serif;color:#fff4ff;text-shadow:0 0 12px rgba(178,115,255,.8)}
    .book-close-v2{width:28px;height:28px;border:1px solid rgba(255,255,255,.24);border-radius:50%;background:rgba(255,255,255,.06);color:#fff;font:20px/1 system-ui;cursor:pointer}
    .book-list-v2{padding:10px 14px 16px;overflow:auto;text-align:left;font:600 13px/1.35 "Palatino Linotype","Book Antiqua",Georgia,serif;color:#eadfff}
    .book-item-v2{padding:8px 0;border-bottom:1px solid rgba(255,255,255,.08)}
    .book-empty-v2{padding:32px 10px;text-align:center;color:#cdb8e8}
    .toast-v2{position:absolute;z-index:40;left:50%;bottom:17%;transform:translateX(-50%) translateY(10px);max-width:84%;padding:8px 12px;border:1px solid rgba(237,220,255,.35);border-radius:14px;background:rgba(17,6,34,.94);color:#fff5ff;font:700 12px/1.25 "Palatino Linotype",Georgia,serif;text-align:center;opacity:0;pointer-events:none;box-shadow:0 8px 28px rgba(0,0,0,.45),0 0 22px rgba(139,83,231,.32);transition:opacity .2s ease,transform .2s ease}
    .toast-v2.show{opacity:1;transform:translateX(-50%) translateY(0)}
    @keyframes orbParticleV1{0%{opacity:.08;transform:rotate(var(--a)) translateX(145px) scale(var(--s))}50%{opacity:.88}100%{opacity:.08;transform:rotate(calc(var(--a) + 360deg)) translateX(145px) scale(var(--s))}}
    @keyframes orbBurstV1{0%{opacity:1;transform:translate(-50%,-50%) rotate(var(--a)) translateX(0) scale(.8)}100%{opacity:0;transform:translate(-50%,-50%) rotate(var(--a)) translateX(var(--r)) scale(1.6)}}
    @keyframes trailFadeV2{0%{opacity:.9;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-70%) scale(.2)}}
    @keyframes runePulseV2{from{transform:scale(.92) rotate(-4deg);filter:brightness(.9)}to{transform:scale(1.08) rotate(4deg);filter:brightness(1.25)}}
    @keyframes luckyPulseV2{from{filter:saturate(1.05) brightness(1)}to{filter:saturate(1.35) brightness(1.18)}}
    @keyframes glitchOrbV2{0%{transform:translateX(-2px)}50%{transform:translateX(2px)}100%{transform:translateX(0)}}
    @media(max-width:560px){.magic-ring-v1{inset:10%}.orb-controls-v2{bottom:8%;gap:5px}.orb-mini-btn-v2{padding:5px 7px;font-size:10px}.book-panel-v2{inset:9% 5%}@keyframes orbParticleV1{0%{opacity:.08;transform:rotate(var(--a)) translateX(118px) scale(var(--s))}50%{opacity:.88}100%{opacity:.08;transform:rotate(calc(var(--a) + 360deg)) translateX(118px) scale(var(--s))}}}
  `;
  document.head.appendChild(style);

  const ring=document.createElement('div');
  ring.className='magic-ring-v1';
  for(let i=0;i<18;i++){
    const p=document.createElement('i');
    p.style.setProperty('--a',(i*20)+'deg');
    p.style.setProperty('--d',(7+(i%6)*.8)+'s');
    p.style.setProperty('--s',(.65+(i%5)*.16).toFixed(2));
    ring.appendChild(p);
  }
  scene.insertBefore(ring,orb);

  const streakEl=document.createElement('div');
  streakEl.className='streak-v2';
  scene.appendChild(streakEl);

  const controls=document.createElement('div');
  controls.className='orb-controls-v2';
  controls.innerHTML='<button class="orb-mini-btn-v2" id="owlBookBtnV2" type="button">📖 Книга 0/100</button><button class="orb-mini-btn-v2" id="owlCopyBtnV2" type="button">🔹 Сохранить</button>';
  scene.appendChild(controls);
  const bookBtn=controls.querySelector('#owlBookBtnV2');
  const copyBtn=controls.querySelector('#owlCopyBtnV2');

  const bookPanel=document.createElement('div');
  bookPanel.className='book-panel-v2';
  bookPanel.innerHTML='<div class="book-head-v2"><div class="book-title-v2">Книга совы</div><button class="book-close-v2" type="button" aria-label="Закрыть">×</button></div><div class="book-list-v2"></div>';
  scene.appendChild(bookPanel);
  const bookList=bookPanel.querySelector('.book-list-v2');
  const bookClose=bookPanel.querySelector('.book-close-v2');

  const toast=document.createElement('div');
  toast.className='toast-v2';
  scene.appendChild(toast);

  function pick(a){return a[Math.floor(Math.random()*a.length)]}
  function daily(){const m=count.textContent.match(/(\d+)\s*\/\s*3/);return m?Math.max(0,Math.min(3,+m[1])):0}
  function getTotal(){try{return Math.max(0,parseInt(localStorage.getItem(TOTAL_KEY)||'0',10)||0)}catch(e){return 2}}
  function setTotal(n){try{localStorage.setItem(TOTAL_KEY,String(n))}catch(e){}}
  function getBook(){try{const a=JSON.parse(localStorage.getItem(BOOK_KEY)||'[]');return Array.isArray(a)?a.filter(x=>typeof x==='string').slice(0,100):[]}catch(e){return[]}}
  function setBook(a){try{localStorage.setItem(BOOK_KEY,JSON.stringify(a.slice(0,100)))}catch(e){}}
  let total=getTotal(),book=getBook(),enhBusy=false,sleepOrbTaps=0,decorating=false,lastCopyText='',runeEl=null,runeTimer=0;

  function showToast(msg,ms=2300){toast.textContent=msg;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),ms)}
  function updateBookButton(){bookBtn.textContent=`📖 Книга ${book.length}/100`}
  function rememberNormal(msg){
    if(!msg||book.includes(msg)||book.length>=100)return;
    book.push(msg);setBook(book);updateBookButton();
  }
  function renderBook(){
    updateBookButton();
    if(!book.length){bookList.innerHTML='<div class="book-empty-v2">Пока здесь пусто.<br>Найденные предсказания будут появляться здесь.</div>';return}
    bookList.innerHTML='';
    book.forEach((msg,i)=>{const d=document.createElement('div');d.className='book-item-v2';d.textContent=(i+1)+'. '+msg;bookList.appendChild(d)});
  }
  updateBookButton();
  bookBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();renderBook();bookPanel.classList.add('open')});
  bookClose.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();bookPanel.classList.remove('open')});

  async function copyCurrent(){
    if(!lastCopyText){showToast('Сначала получи предсказание ✨');return}
    try{await navigator.clipboard.writeText(lastCopyText)}catch(e){
      const ta=document.createElement('textarea');ta.value=lastCopyText;document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(_){}ta.remove();
    }
    const old=copyBtn.textContent;copyBtn.textContent='✓ Скопировано';setTimeout(()=>copyBtn.textContent=old,1300);
  }
  copyBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();copyCurrent()});

  function updateStreak(){
    const today=dayKey();let s={last:'',count:0,reward:''};
    try{const old=JSON.parse(localStorage.getItem(STREAK_KEY)||'null');if(old&&typeof old==='object')s={...s,...old}}catch(e){}
    if(s.last!==today){
      let next=1;
      if(s.last){
        const [y,m,d]=s.last.split('-').map(Number);const prev=new Date(y,m-1,d);const [ty,tm,td]=today.split('-').map(Number);const cur=new Date(ty,tm-1,td);const gap=Math.round((cur-prev)/86400000);if(gap===1)next=Math.max(1,(+s.count||0)+1);
      }
      s.last=today;s.count=next;
      try{localStorage.setItem(STREAK_KEY,JSON.stringify(s))}catch(e){}
    }
    streakEl.textContent=`Серия визитов: ${Math.max(1,+s.count||1)} дн.`;
    if((+s.count||0)>=7&&(+s.count||0)%7===0&&s.reward!==today){
      s.reward=today;try{localStorage.setItem(STREAK_KEY,JSON.stringify(s))}catch(e){}
      setTimeout(()=>{show(pick(STREAK_SPECIAL),'ПОДАРОК ЗА 7 ДНЕЙ ✨','rare');showToast('Семь дней подряд. Сова это заметила 🦉',3000)},900);
    }
    return s;
  }

  function decorateCount(){
    if(decorating)return;
    const n=daily();
    const wanted=`Сегодня: ${n}/3 · Всего: ${total}`;
    if(count.textContent===wanted)return;
    decorating=true;count.textContent=wanted;decorating=false;
  }
  const mo=new MutationObserver(()=>{if(!decorating)setTimeout(decorateCount,0)});
  mo.observe(count,{childList:true,characterData:true,subtree:true});
  decorateCount();
  updateStreak();

  function clearMode(){orb.classList.remove('magic-rare-v1','magic-secret-v1','magic-joke-v1','magic-glitch-v2')}
  function fit(msg){
    if(msg.length>92)text.style.fontSize='clamp(12px,2.9vw,18px)';
    else if(msg.length>74)text.style.fontSize='clamp(13px,3.2vw,20px)';
    else text.style.fontSize='';
  }
  function show(msg,label,mode){
    clearMode();
    if(mode==='rare')orb.classList.add('magic-rare-v1');
    if(mode==='secret')orb.classList.add('magic-secret-v1');
    if(mode==='joke')orb.classList.add('magic-joke-v1');
    fit(msg);text.style.whiteSpace='normal';text.textContent=msg;text.classList.add('show');lastCopyText=msg;
    if(label)hint.textContent=label;
  }
  function reaction(){
    if(!orb.animate)return;
    const variants=[
      [{filter:'brightness(.82) saturate(.9)'},{filter:'brightness(1.25) saturate(1.2)'},{filter:'brightness(1) saturate(1)'}],
      [{filter:'brightness(1)'},{filter:'brightness(.62) saturate(.75)'},{filter:'brightness(1.08) saturate(1.08)'}],
      [{filter:'brightness(.95)'},{filter:'brightness(1.42) saturate(1.25)'},{filter:'brightness(1)'}],
      [{boxShadow:'0 0 18px rgba(216,188,255,.55)'},{boxShadow:'0 0 68px rgba(153,92,255,.95)'},{boxShadow:'0 0 28px rgba(216,188,255,.55)'}]
    ];
    orb.animate(pick(variants),{duration:720,easing:'ease-in-out'});
  }
  function thirdBurst(){
    if(orb.animate)orb.animate([{filter:'brightness(1)'},{filter:'brightness(.5) saturate(.7)'},{filter:'brightness(1.65) saturate(1.35)'},{filter:'brightness(1)'}],{duration:1050,easing:'ease-in-out'});
    for(let i=0;i<16;i++){
      const b=document.createElement('i');b.className='magic-burst-v1';b.style.setProperty('--a',(i*22.5)+'deg');b.style.setProperty('--r',(74+(i%5)*12)+'px');scene.appendChild(b);setTimeout(()=>b.remove(),1100);
    }
  }
  function luckyOrb(){
    if(Math.random()>=.015)return false;
    orb.classList.add('magic-lucky-v2');showToast('✨ Счастливый шар ✨',2200);setTimeout(()=>orb.classList.remove('magic-lucky-v2'),4800);return true;
  }
  function seriesLabel(n,extra=''){
    const base=n===1?'Первое предсказание':n===2?'Второе предсказание · туман сгущается':'Главное предсказание дня ✨';
    return extra?base+' · '+extra:base;
  }
  function specialRoll(){
    const r=Math.random();
    if(r<.01)return{type:'secret',msg:pick(SECRET),label:'ТАЙНОЕ'};
    if(r<.05)return{type:'rare',msg:pick(RARE),label:'РЕДКОЕ'};
    if(r<.075)return{type:'joke',msg:pick(JOKES),label:'ШАР С ХАРАКТЕРОМ'};
    if(r<.095)return{type:'glitch',msg:pick(GLITCH),label:'СБОЙ МАГИИ'};
    return null;
  }
  function runGlitch(baseMsg,n,msg){
    clearMode();orb.classList.add('magic-glitch-v2');
    const reversed=[...baseMsg].reverse().join('');fit(reversed);text.textContent=reversed;text.classList.add('show');hint.textContent='Будущее дало сбой...';
    setTimeout(()=>{orb.classList.remove('magic-glitch-v2');show(msg,seriesLabel(n,'СБОЙ МАГИИ'),'joke')},520);
  }
  function milestone(){
    if(total===10)showToast('🦉 Сова начинает тебя узнавать…',3200);
    if(total===25)showToast('✨ Уже 25 предсказаний. Туман явно привык к компании.',3400);
    if(total===50)showToast('🔹 50 предсказаний. Сова делает вид, что это совершенно нормально.',3600);
  }

  function removeRune(){clearTimeout(runeTimer);if(runeEl){runeEl.remove();runeEl=null}}
  function maybeRune(n){
    removeRune();if(n>=3||Math.random()>.20)return;
    runeEl=document.createElement('button');runeEl.type='button';runeEl.className='rune-v2';runeEl.textContent='✦';runeEl.setAttribute('aria-label','Открыть тайную руну');scene.appendChild(runeEl);
    runeEl.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();removeRune();show(pick(RUNE),'ТАЙНАЯ РУНА · лимит не потрачен','secret');showToast('Руна найдена ✨',1700)});
    runeTimer=setTimeout(removeRune,5200);
  }

  let trailAt=0;
  orb.addEventListener('pointermove',e=>{
    const now=performance.now();if(now-trailAt<45)return;trailAt=now;
    const r=scene.getBoundingClientRect();const d=document.createElement('i');d.className='trail-dot-v2';d.style.left=(e.clientX-r.left)+'px';d.style.top=(e.clientY-r.top)+'px';scene.appendChild(d);setTimeout(()=>d.remove(),720);
  });

  let longTimer=0,longTriggered=false,suppressNextClick=false;
  orb.addEventListener('pointerdown',e=>{
    longTriggered=false;clearTimeout(longTimer);
    longTimer=setTimeout(()=>{longTriggered=true;suppressNextClick=true;reaction();show(pick(LONGPRESS),'ДОЛГОЕ НАЖАТИЕ · лимит не потрачен','secret');showToast('Сова заметила настойчивость 🦉',1800)},1900);
  });
  ['pointerup','pointercancel','pointerleave'].forEach(ev=>orb.addEventListener(ev,()=>clearTimeout(longTimer)));
  orb.addEventListener('contextmenu',e=>e.preventDefault());
  orb.addEventListener('click',e=>{if(suppressNextClick){e.preventDefault();e.stopImmediatePropagation();suppressNextClick=false}},true);

  orb.addEventListener('click',()=>{
    if(longTriggered)return;
    const before=daily();
    if(before>=3){
      sleepOrbTaps++;
      if(sleepOrbTaps>=4){sleepOrbTaps=0;setTimeout(()=>show('😿 Я же сплю. Приходи завтра. 🦉','Сова всё ещё спит','secret'),0)}
      return;
    }
    if(enhBusy)return;
    enhBusy=true;sleepOrbTaps=0;clearMode();removeRune();
    const wait=before===0?WAITS:before===1?['Туман становится гуще...','Сова смотрит глубже...','Второй знак уже ближе...']:['Сова ищет главное предсказание дня...','Туман готовит финальный знак...','Главное предсказание почти видно...'];
    setTimeout(()=>{hint.textContent=pick(wait)},0);reaction();
    setTimeout(()=>{
      const after=daily();
      if(after>before){
        const baseMsg=(text.textContent||'').trim();
        if(baseMsg){rememberNormal(baseMsg);lastCopyText=baseMsg}
        total++;setTotal(total);decorateCount();milestone();
        const sp=specialRoll();
        const lucky=luckyOrb();
        if(sp){
          if(sp.type==='glitch')runGlitch(baseMsg,after,sp.msg);
          else show(sp.msg,seriesLabel(after,sp.label),sp.type==='joke'?'joke':sp.type);
        }else hint.textContent=seriesLabel(after,lucky?'СЧАСТЛИВЫЙ ШАР':'');
        if(after===3)thirdBurst();
        else maybeRune(after);
      }
      enhBusy=false;
    },800);
  });

  window.addEventListener('message',e=>{
    if(!e.data||e.data.type!=='owl-sleep-secret')return;
    show('😿 Я же сплю. Приходи завтра. 🦉','Сова всё ещё спит','secret');
  });
})();