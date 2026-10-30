(()=>{
  'use strict';
  if(window.__owlOrbHelpV1) return;
  window.__owlOrbHelpV1=true;

  const scene=document.getElementById('scene');
  if(!scene) return;

  const style=document.createElement('style');
  style.id='orbHelpStyleV1';
  style.textContent=`
    .orb-help-btn-v1{
      position:absolute;z-index:24;left:.5%;bottom:-10.2%;
      border:1px solid rgba(225,205,255,.34);border-radius:999px;
      background:linear-gradient(180deg,rgba(67,32,108,.78),rgba(27,11,48,.72));
      color:#f6edff;padding:7px 13px;
      font:700 13px/1 "Cormorant Garamond",Georgia,serif;
      letter-spacing:.035em;cursor:pointer;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.09),0 5px 18px rgba(0,0,0,.24),0 0 18px rgba(141,88,232,.2);
      -webkit-tap-highlight-color:transparent;outline:none;
    }
    .orb-help-btn-v1:active{transform:scale(.97)}
    .orb-help-panel-v1{
      position:absolute;z-index:80;inset:-5% 4% -7%;display:none;flex-direction:column;
      border:1px solid rgba(225,204,255,.38);border-radius:22px;
      background:radial-gradient(circle at 50% 10%,rgba(122,72,193,.32),transparent 32%),linear-gradient(180deg,rgba(36,15,61,.985),rgba(12,5,25,.99));
      box-shadow:0 22px 58px rgba(0,0,0,.62),0 0 42px rgba(136,78,230,.3);
      overflow:hidden;color:#fff;
    }
    .orb-help-panel-v1.open{display:flex}
    .orb-help-head-v1{display:flex;align-items:center;justify-content:space-between;padding:13px 15px;border-bottom:1px solid rgba(234,219,255,.14)}
    .orb-help-title-v1{font:400 23px/1 "Forum","Cormorant Garamond",Georgia,serif;color:#fff7e9;text-shadow:0 0 12px rgba(190,135,255,.7)}
    .orb-help-close-v1{width:30px;height:30px;border:1px solid rgba(255,255,255,.25);border-radius:50%;background:rgba(255,255,255,.06);color:#fff;font:21px/1 system-ui;display:grid;place-items:center;cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none}
    .orb-help-body-v1{padding:12px 15px 17px;overflow:auto;text-align:left;font-family:"Cormorant Garamond",Georgia,serif;color:#f4eaff}
    .orb-help-item-v1{padding:9px 0;border-bottom:1px solid rgba(255,255,255,.075);font-size:15px;line-height:1.25}
    .orb-help-item-v1:last-child{border-bottom:0}
    .orb-help-item-v1 b{color:#fff7d7;font-weight:700}
    .orb-help-note-v1{margin-top:10px;padding:9px 11px;border:1px solid rgba(202,176,255,.2);border-radius:13px;background:rgba(80,43,126,.16);font-size:13px;line-height:1.3;color:#d9c8ed}
    @media(max-width:560px){
      .orb-help-btn-v1{left:0;bottom:-9.5%;font-size:12px;padding:7px 12px}
      .orb-help-panel-v1{inset:-7% 3% -8%}
      .orb-help-title-v1{font-size:21px}
      .orb-help-body-v1{padding:10px 13px 15px}
      .orb-help-item-v1{font-size:14px;padding:8px 0}
    }
  `;
  document.head.appendChild(style);

  const btn=document.createElement('button');
  btn.type='button';
  btn.className='orb-help-btn-v1';
  btn.textContent='✦ Подробнее';
  btn.setAttribute('aria-label','Открыть инструкцию к шару');

  const panel=document.createElement('div');
  panel.className='orb-help-panel-v1';
  panel.innerHTML=`
    <div class="orb-help-head-v1">
      <div class="orb-help-title-v1">Как работает шар ✨</div>
      <button type="button" class="orb-help-close-v1" aria-label="Закрыть">×</button>
    </div>
    <div class="orb-help-body-v1">
      <div class="orb-help-item-v1"><b>🔮 Предсказания</b><br>Нажми на шар. В день доступно 2 обычных предсказания.</div>
      <div class="orb-help-item-v1"><b>Сегодня: X/2</b><br>Показывает, сколько предсказаний уже получено сегодня.</div>
      <div class="orb-help-item-v1"><b>Всего: X</b><br>Общее количество полученных предсказаний. Этот счётчик не обнуляется каждый день.</div>
      <div class="orb-help-item-v1"><b>📖 Книга</b><br>Показывает, сколько разных обычных предсказаний из 100 уже найдено.</div>
      <div class="orb-help-item-v1"><b>🔹 Сохранить</b><br>Копирует текущее предсказание, чтобы его можно было отправить в чат.</div>
      <div class="orb-help-item-v1"><b>✨ Редкое предсказание</b><br>Выпадает нечасто и выделяется золотым свечением.</div>
      <div class="orb-help-item-v1"><b>ᚠ Руны</b><br>Очень редкий хороший знак, связанный с «Белой мглой». Руна не расходует одну из 2 попыток и может появиться не чаще одного раза в день.</div>
      <div class="orb-help-item-v1"><b>Серия визитов</b><br>Считает дни, когда ты возвращаешься к сове подряд.</div>
      <div class="orb-help-item-v1"><b>🦉 После 2/2</b><br>Второе предсказание остаётся на экране. Сова засыпает только если после этого ещё раз нажать на шар.</div>
      <div class="orb-help-note-v1">Шар любит сюрпризы: некоторые эффекты и редкие знаки специально появляются не каждый раз.</div>
    </div>`;

  scene.appendChild(btn);
  scene.appendChild(panel);

  function open(){panel.classList.add('open')}
  function close(){panel.classList.remove('open')}
  btn.addEventListener('click',open);
  panel.querySelector('.orb-help-close-v1').addEventListener('click',close);
})();
