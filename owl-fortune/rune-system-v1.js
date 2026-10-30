(()=>{
  'use strict';
  if(window.__owlRuneSystemV1) return;
  window.__owlRuneSystemV1=true;

  const DAY_KEY='belaya_mgla_rune_day_v1';
  const scene=document.getElementById('scene');
  if(!scene) return;

  const RUNES=[
    {symbol:'ᚠ',name:'Fehu',base:'богатство, имущество',game:'Выгодное вложение. Если ты уже планировал(а) покупку, пакет или крупное улучшение в «Белой мгле», вложенные ресурсы должны принести заметную пользу.'},
    {symbol:'ᚷ',name:'Gebo',base:'дар, подарок',game:'Хороший знак на подарки и взаимную помощь. Жди полезную награду, приятный бонус или помощь от союзников именно тогда, когда она пригодится.'},
    {symbol:'ᚹ',name:'Wunjo',base:'радость',game:'Удачный игровой день. Что-то порадует сильнее обычного: награда, результат боя, нужный предмет или просто очень приятный момент в игре.'},
    {symbol:'ᛃ',name:'Jera',base:'год, урожай',game:'Накопления должны окупиться. Всё, что долго собиралось и откладывалось, скоро даст хороший результат: улучшение, рост силы или выгодное использование запасов.'},
    {symbol:'ᛋ',name:'Sowilo',base:'солнце',game:'Руна успеха. Хороший знак для события, боя или важного игрового решения. Шансы получить желаемый результат сегодня особенно приятные.'},
    {symbol:'ᛒ',name:'Berkano',base:'берёза',game:'Рост и развитие. Хороший момент для прокачки того, что даст долгую пользу: героя, здания, навыка или основного направления развития аккаунта.'},
    {symbol:'ᛞ',name:'Dagaz',base:'день',game:'Прорыв. То, что долго стояло на месте, может наконец сдвинуться: откроется новый этап, появится нужный ресурс или станет понятнее следующий шаг.'},
    {symbol:'ᚱ',name:'Raidho',base:'путь, поездка',game:'Удачный путь. Хороший знак для перемещения, смены позиции, перехода, нового маршрута развития или решения, которое ведёт вперёд.'},
    {symbol:'ᛗ',name:'Mannaz',base:'человек',game:'Сила сегодня в людях. Союзники, альянс и нормальная командная работа принесут больше пользы, чем попытка сделать всё одному.'},
    {symbol:'ᛏ',name:'Tiwaz',base:'Тиваз, имя божества',game:'Решительный знак. Если предстоит важный бой или выбор, уверенное и продуманное действие даст лучший результат, чем долгие сомнения.'}
  ];

  const style=document.createElement('style');
  style.id='runeSystemV1Style';
  style.textContent=`
    .rune-card-v1{position:absolute;z-index:70;left:50%;top:50%;width:min(82%,390px);transform:translate(-50%,-50%) scale(.94);padding:18px 16px 15px;border:1px solid rgba(255,229,143,.58);border-radius:20px;background:radial-gradient(circle at 50% 16%,rgba(91,48,153,.98),rgba(18,6,35,.985) 60%,rgba(7,2,15,.995));box-shadow:0 24px 70px rgba(0,0,0,.68),0 0 34px rgba(143,86,255,.34),inset 0 0 32px rgba(255,224,133,.08);text-align:center;color:#fff8e6;opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease}
    .rune-card-v1.open{opacity:1;pointer-events:auto;transform:translate(-50%,-50%) scale(1)}
    .rune-symbol-v1{font:400 76px/1 "Segoe UI Symbol","Noto Sans Runic",serif;color:#ffe8a3;text-shadow:0 0 8px #fff5c8,0 0 22px #ffd86a,0 0 42px #9b63ff;margin:0 0 4px}
    .rune-name-v1{font:700 22px/1.15 "Palatino Linotype","Book Antiqua",Georgia,serif;letter-spacing:.05em;color:#fff8d5;text-shadow:0 0 12px rgba(255,220,120,.45)}
    .rune-base-v1{margin:6px 0 12px;font:600 12px/1.25 system-ui,-apple-system,"Segoe UI",sans-serif;color:#d9c7ef;opacity:.88}
    .rune-game-v1{font:700 15px/1.35 "Palatino Linotype","Book Antiqua",Georgia,serif;color:#fff8ff;text-shadow:0 0 12px rgba(162,103,255,.38)}
    .rune-note-v1{margin-top:10px;font:500 10px/1.3 system-ui,-apple-system,"Segoe UI",sans-serif;color:#a995bd}
    .rune-close-v1{margin-top:14px;border:1px solid rgba(255,236,183,.36);border-radius:999px;background:rgba(255,255,255,.07);color:#fff5db;padding:7px 15px;font:700 12px/1 system-ui,-apple-system,"Segoe UI",sans-serif;cursor:pointer}
    .rune-day-btn-v1{border:1px solid rgba(255,226,133,.42)!important;color:#fff1bd!important;box-shadow:0 0 14px rgba(255,205,92,.14)!important}
  `;
  document.head.appendChild(style);

  const card=document.createElement('div');
  card.className='rune-card-v1';
  card.setAttribute('role','dialog');
  card.setAttribute('aria-label','Руна совы');
  card.innerHTML=`<div class="rune-symbol-v1"></div><div class="rune-name-v1"></div><div class="rune-base-v1"></div><div class="rune-game-v1"></div><div class="rune-note-v1">Историческое значение указано как основа. Игровое толкование создано специально для «Белой мглы».</div><button class="rune-close-v1" type="button">Закрыть</button>`;
  scene.appendChild(card);
  const symbolEl=card.querySelector('.rune-symbol-v1');
  const nameEl=card.querySelector('.rune-name-v1');
  const baseEl=card.querySelector('.rune-base-v1');
  const gameEl=card.querySelector('.rune-game-v1');
  card.querySelector('.rune-close-v1').addEventListener('click',()=>card.classList.remove('open'));

  function today(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function randomRune(){return RUNES[Math.floor(Math.random()*RUNES.length)]}
  function showRune(r){
    symbolEl.textContent=r.symbol;
    nameEl.textContent=r.name;
    baseEl.textContent='Основа: '+r.base;
    gameEl.textContent=r.game;
    card.classList.add('open');
    if(card.animate) card.animate([{filter:'brightness(.72)',transform:'translate(-50%,-50%) scale(.9)'},{filter:'brightness(1.18)',transform:'translate(-50%,-50%) scale(1.025)'},{filter:'brightness(1)',transform:'translate(-50%,-50%) scale(1)'}],{duration:520,easing:'ease-out'});
  }
  function getDailyRune(){
    try{
      const saved=JSON.parse(localStorage.getItem(DAY_KEY)||'null');
      if(saved&&saved.day===today()&&Number.isInteger(saved.index)&&RUNES[saved.index]) return RUNES[saved.index];
      const index=Math.floor(Math.random()*RUNES.length);
      localStorage.setItem(DAY_KEY,JSON.stringify({day:today(),index}));
      return RUNES[index];
    }catch(e){return randomRune()}
  }

  // Перехватываем старую декоративную руну и заменяем её настоящей руной Старшего Футарка.
  document.addEventListener('click',e=>{
    const target=e.target.closest&&e.target.closest('.rune-v2');
    if(!target) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    try{target.remove()}catch(err){}
    showRune(randomRune());
  },true);

  function addDailyButton(){
    const controls=document.querySelector('.orb-controls-v2');
    if(!controls||document.getElementById('runeDayBtnV1')) return false;
    const b=document.createElement('button');
    b.id='runeDayBtnV1';
    b.type='button';
    b.className='orb-mini-btn-v2 rune-day-btn-v1';
    b.textContent='ᚠ Руна дня';
    b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();showRune(getDailyRune())});
    controls.appendChild(b);
    return true;
  }
  if(!addDailyButton()){
    const observer=new MutationObserver(()=>{if(addDailyButton()) observer.disconnect()});
    observer.observe(scene,{childList:true,subtree:true});
    setTimeout(()=>observer.disconnect(),10000);
  }
})();