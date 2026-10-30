(()=>{
  'use strict';
  if(window.__owlRealRunesV1) return;
  window.__owlRealRunesV1=true;

  const scene=document.getElementById('scene');
  const hint=document.getElementById('hint');
  if(!scene) return;

  const RUNES=[
    {symbol:'ᚠ',name:'Феху',base:'богатство, имущество',game:'Выгодное вложение. Трата на важное улучшение, развитие героя или усиление аккаунта должна принести заметную пользу.'},
    {symbol:'ᚷ',name:'Гебо',base:'дар, подарок',game:'Жди приятного бонуса: хорошей награды, полезного подарка или помощи от союзников.'},
    {symbol:'ᚹ',name:'Вуньо',base:'радость',game:'Хороший игровой день. Больше приятных результатов, удачных решений и поводов порадоваться.'},
    {symbol:'ᛃ',name:'Йера',base:'год, хороший урожай',game:'Накопления и подготовка окупятся. То, что ты долго собираешь, скоро даст хороший результат.'},
    {symbol:'ᛋ',name:'Соулу',base:'солнце',game:'Сильный знак успеха. Особенно хорош для боя, события или момента, где нужен уверенный результат.'},
    {symbol:'ᛒ',name:'Беркана',base:'берёза',game:'Рост и развитие. Хороший момент для прокачки героя, отряда, топки или другого долгосрочного усиления.'},
    {symbol:'ᛖ',name:'Эваз',base:'лошадь, движение',game:'Продвижение пойдёт быстрее. Удачной может оказаться смена состава, позиции, тактики или следующий шаг в развитии.'},
    {symbol:'ᛟ',name:'Отала',base:'наследие, дом, владение',game:'Хороший знак для базы и постоянных улучшений. Вложения в то, что остаётся надолго, будут особенно полезны.'},
    {symbol:'ᛞ',name:'Дагаз',base:'день, рассвет',game:'Новый этап и удачный поворот. То, что долго не складывалось, может внезапно сдвинуться в твою пользу.'}
  ];

  const STORE='belaya_mgla_good_runes_v1';
  function dayKey(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function loadUsed(){try{const s=JSON.parse(localStorage.getItem(STORE)||'null');return s&&s.day===dayKey()&&Array.isArray(s.used)?s:{day:dayKey(),used:[]}}catch(e){return{day:dayKey(),used:[]}}}
  function saveUsed(s){try{localStorage.setItem(STORE,JSON.stringify(s))}catch(e){}}
  function pickRune(){
    const s=loadUsed();
    let pool=RUNES.map((_,i)=>i).filter(i=>!s.used.includes(i));
    if(!pool.length){s.used=[];pool=RUNES.map((_,i)=>i)}
    const i=pool[Math.floor(Math.random()*pool.length)];
    s.used.push(i);saveUsed(s);return RUNES[i];
  }

  const style=document.createElement('style');
  style.id='realRunesStyleV1';
  style.textContent=`
    .rune-v2.real-rune-v1{font-family:"Segoe UI Symbol","Noto Sans Runic","Arial Unicode MS",serif!important;font-size:27px!important;font-weight:500!important;line-height:1!important;color:#fff2b6!important;text-shadow:0 0 5px #fff,0 0 14px #ffd76d,0 0 25px #9c6cff!important;border-color:rgba(255,231,155,.9)!important;background:radial-gradient(circle at 45% 35%,#fff7d0 0 5%,#8d5be6 22%,#3d176e 55%,#140424 100%)!important;box-shadow:0 0 12px rgba(255,228,132,.95),0 0 30px rgba(142,83,255,.9)!important}
    .real-rune-card-v1{position:absolute;z-index:70;inset:12% 8%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:18px 16px;border:1px solid rgba(255,231,166,.55);border-radius:22px;background:radial-gradient(circle at 50% 18%,rgba(104,57,174,.34),transparent 35%),linear-gradient(180deg,rgba(19,6,37,.985),rgba(5,2,13,.99));box-shadow:0 18px 55px rgba(0,0,0,.66),0 0 42px rgba(134,77,234,.34);color:#fff;animation:runeCardInV1 .28s ease-out both}
    .real-rune-symbol-v1{font-family:"Segoe UI Symbol","Noto Sans Runic","Arial Unicode MS",serif;font-size:70px;line-height:1;color:#ffe99b;text-shadow:0 0 7px #fff,0 0 20px #ffd35f,0 0 38px #8e59ff;margin-bottom:7px}
    .real-rune-name-v1{font:700 25px/1.1 "Palatino Linotype","Book Antiqua",Georgia,serif;color:#fff6df;text-shadow:0 0 14px rgba(203,158,255,.8)}
    .real-rune-base-v1{margin-top:6px;font:600 13px/1.25 "Palatino Linotype","Book Antiqua",Georgia,serif;color:#d8c5ee}
    .real-rune-game-title-v1{margin-top:14px;font:700 12px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#ffdf8a}
    .real-rune-game-v1{margin-top:7px;max-width:92%;font:700 16px/1.32 "Palatino Linotype","Book Antiqua",Georgia,serif;color:#fff8ff;text-shadow:0 0 12px rgba(166,106,255,.42)}
    .real-rune-close-v1{margin-top:16px;border:1px solid rgba(255,229,157,.45);border-radius:999px;background:rgba(76,40,121,.62);color:#fff7e4;padding:8px 15px;font:700 12px/1 system-ui,-apple-system,"Segoe UI",sans-serif;cursor:pointer;box-shadow:0 0 16px rgba(143,87,239,.22)}
    @keyframes runeCardInV1{from{opacity:0;transform:scale(.9) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
    @media(max-width:560px){.real-rune-card-v1{inset:10% 6%;padding:16px 13px}.real-rune-symbol-v1{font-size:61px}.real-rune-name-v1{font-size:22px}.real-rune-game-v1{font-size:15px}}
  `;
  document.head.appendChild(style);

  let currentRune=null;
  function decorate(btn){
    if(!btn||btn.dataset.realRune==='1') return;
    const rune=pickRune();
    btn.dataset.realRune='1';
    btn.dataset.runeIndex=String(RUNES.indexOf(rune));
    btn.classList.add('real-rune-v1');
    btn.textContent=rune.symbol;
    btn.setAttribute('aria-label','Открыть руну '+rune.name);
    btn.title=rune.name;
  }

  function showCard(rune){
    document.querySelectorAll('.real-rune-card-v1').forEach(el=>el.remove());
    currentRune=rune;
    const card=document.createElement('div');
    card.className='real-rune-card-v1';
    card.innerHTML=`<div class="real-rune-symbol-v1">${rune.symbol}</div><div class="real-rune-name-v1">${rune.name}</div><div class="real-rune-base-v1">Значение: ${rune.base}</div><div class="real-rune-game-title-v1">Для «Белой мглы»</div><div class="real-rune-game-v1">${rune.game}</div><button class="real-rune-close-v1" type="button">Принято ✨</button>`;
    scene.appendChild(card);
    if(hint)hint.textContent=`РУНА ${rune.name.toUpperCase()} ✨`;
    card.querySelector('.real-rune-close-v1').addEventListener('click',()=>card.remove());
  }

  const mo=new MutationObserver(muts=>{
    for(const m of muts){for(const n of m.addedNodes){if(!(n instanceof Element))continue;if(n.matches('.rune-v2'))decorate(n);n.querySelectorAll?.('.rune-v2').forEach(decorate)}}
  });
  mo.observe(scene,{childList:true,subtree:true});
  scene.querySelectorAll('.rune-v2').forEach(decorate);

  scene.addEventListener('click',e=>{
    const btn=e.target.closest?.('.rune-v2');
    if(!btn||!scene.contains(btn)) return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    if(btn.dataset.realRune!=='1')decorate(btn);
    const rune=RUNES[Number(btn.dataset.runeIndex)]||pickRune();
    btn.remove();
    showCard(rune);
  },true);
})();