(()=>{
  'use strict';
  if(window.__owlOrbEnhanceV1) return;
  window.__owlOrbEnhanceV1=true;

  const TOTAL_KEY='belaya_mgla_orb_total_v1';
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
  const JOKES=[
    '🦉 Предсказание временно недоступно. Будущее тоже иногда зависает. 😂',
    '😂 Шар посмотрел в будущее и решил не комментировать увиденное. 🦉',
    '🔹 Судьба не отвечает. Возможно, занята подсчётом ресурсов. 😂',
    '🦉 Шар всё понял, но формулировать отказался. 😿'
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
    .magic-ring-v1{position:absolute;inset:12%;z-index:5;pointer-events:none}
    .magic-ring-v1 i{position:absolute;left:50%;top:50%;width:4px;height:4px;margin:-2px;border-radius:50%;background:#fff;box-shadow:0 0 8px #dac9ff,0 0 15px #8a5cff;opacity:.16;animation:orbParticleV1 var(--d) linear infinite}
    .orb.magic-rare-v1{box-shadow:inset 0 0 28px rgba(255,246,184,.26),inset 0 0 90px rgba(145,84,255,.55),0 0 18px rgba(255,232,135,.95),0 0 58px rgba(255,198,74,.7),0 0 100px rgba(107,66,215,.5)!important}
    .orb.magic-secret-v1{box-shadow:inset 0 0 30px rgba(255,255,255,.28),inset 0 0 98px rgba(68,184,255,.58),0 0 19px rgba(170,239,255,.94),0 0 66px rgba(91,106,255,.8),0 0 110px rgba(180,72,255,.5)!important}
    .orb.magic-joke-v1{filter:saturate(.82) brightness(.94)}
    .magic-burst-v1{position:absolute;left:50%;top:50%;z-index:8;width:5px;height:5px;border-radius:50%;pointer-events:none;background:#fff;box-shadow:0 0 10px #fff,0 0 16px #a77cff;animation:orbBurstV1 .95s ease-out forwards}
    @keyframes orbParticleV1{0%{opacity:.08;transform:rotate(var(--a)) translateX(145px) scale(var(--s))}50%{opacity:.88}100%{opacity:.08;transform:rotate(calc(var(--a) + 360deg)) translateX(145px) scale(var(--s))}}
    @keyframes orbBurstV1{0%{opacity:1;transform:translate(-50%,-50%) rotate(var(--a)) translateX(0) scale(.8)}100%{opacity:0;transform:translate(-50%,-50%) rotate(var(--a)) translateX(var(--r)) scale(1.6)}}
    @media(max-width:560px){.magic-ring-v1{inset:10%}@keyframes orbParticleV1{0%{opacity:.08;transform:rotate(var(--a)) translateX(118px) scale(var(--s))}50%{opacity:.88}100%{opacity:.08;transform:rotate(calc(var(--a) + 360deg)) translateX(118px) scale(var(--s))}}}
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

  function pick(a){return a[Math.floor(Math.random()*a.length)]}
  function daily(){const m=count.textContent.match(/(\d+)\s*\/\s*3/);return m?Math.max(0,Math.min(3,+m[1])):0}
  function getTotal(){try{return Math.max(0,parseInt(localStorage.getItem(TOTAL_KEY)||'0',10)||0)}catch(e){return 0}}
  function setTotal(n){try{localStorage.setItem(TOTAL_KEY,String(n))}catch(e){}}
  let total=getTotal(),enhBusy=false,sleepOrbTaps=0,decorating=false;

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

  function clearMode(){orb.classList.remove('magic-rare-v1','magic-secret-v1','magic-joke-v1')}
  function fit(msg){
    if(msg.length>92)text.style.fontSize='clamp(12px,2.95vw,18px)';
    else if(msg.length>74)text.style.fontSize='clamp(13px,3.25vw,20px)';
    else text.style.fontSize='';
  }
  function show(msg,label,mode){
    clearMode();
    if(mode==='rare')orb.classList.add('magic-rare-v1');
    if(mode==='secret')orb.classList.add('magic-secret-v1');
    if(mode==='joke')orb.classList.add('magic-joke-v1');
    fit(msg);text.style.whiteSpace='normal';text.textContent=msg;text.classList.add('show');
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
  function specialRoll(){
    const r=Math.random();
    if(r<.01)return{msg:pick(SECRET),mode:'secret',label:'ТАЙНОЕ ПРЕДСКАЗАНИЕ ✨'};
    if(r<.05)return{msg:pick(RARE),mode:'rare',label:'РЕДКОЕ ПРЕДСКАЗАНИЕ ✨'};
    if(r<.075)return{msg:pick(JOKES),mode:'joke',label:'Шар сегодня с характером'};
    return null;
  }

  orb.addEventListener('click',()=>{
    const before=daily();
    if(before>=3){
      sleepOrbTaps++;
      if(sleepOrbTaps>=4){sleepOrbTaps=0;setTimeout(()=>show('😿 Я же сплю. Приходи завтра. 🦉','Сова всё ещё спит','secret'),0)}
      return;
    }
    if(enhBusy)return;
    enhBusy=true;sleepOrbTaps=0;clearMode();
    setTimeout(()=>{hint.textContent=pick(WAITS)},0);
    reaction();
    setTimeout(()=>{
      const after=daily();
      if(after>before){
        total++;setTotal(total);decorateCount();
        const sp=specialRoll();
        if(sp)show(sp.msg,sp.label,sp.mode);
        if(after===3)thirdBurst();
      }
      enhBusy=false;
    },790);
  });

  orb.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!enhBusy)setTimeout(()=>orb.dispatchEvent(new MouseEvent('click',{bubbles:false})),0)});

  window.addEventListener('message',e=>{
    if(!e.data||e.data.type!=='owl-sleep-secret')return;
    show('😿 Я же сплю. Приходи завтра. 🦉','Сова всё ещё спит','secret');
  });
})();