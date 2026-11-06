
(function(){
'use strict';

function q(s,r){return (r||document).querySelector(s)}
function el(tag,attrs,html){
  var n=document.createElement(tag);
  if(attrs) Object.keys(attrs).forEach(function(k){
    if(k==='class') n.className=attrs[k];
    else if(k==='id') n.id=attrs[k];
    else n.setAttribute(k,attrs[k]);
  });
  if(html!=null) n.innerHTML=html;
  return n;
}

function init(){
  document.querySelectorAll('[id^="madamUguLauncher"],[id^="madamUguOverlay"],[id^="madamUguPanel"],[id^="madamUguFrame"],[id^="madamUguCloseLauncher"],[id^="madamUguModalClose"],[id^="madamUguLoadGuard"]').forEach(function(x){try{x.remove()}catch(e){}});

  var style=el('style',{id:'madamUguNoFrameV720Style'});
  style.textContent=`
#madamUguLauncherV720{position:fixed!important;right:6px!important;bottom:72px!important;z-index:2147483000!important;width:132px!important;height:128px!important;display:block!important;border:0!important;background:transparent!important;overflow:visible!important;text-decoration:none!important;-webkit-tap-highlight-color:transparent!important}
#madamUguLauncherV720 img{display:block!important;width:132px!important;height:128px!important;object-fit:contain!important;background:transparent!important;filter:drop-shadow(0 7px 11px rgba(0,0,0,.42)) drop-shadow(0 0 8px rgba(149,91,224,.23));transform-origin:54% 83%;animation:uguFloat720 4.2s ease-in-out infinite}
#madamUguCloseLauncherV720{position:fixed!important;right:12px!important;bottom:180px!important;z-index:2147483590!important;width:32px!important;height:32px!important;display:grid!important;place-items:center!important;padding:0!important;border-radius:50%!important;border:2px solid rgba(245,235,255,.95)!important;background:rgba(44,18,69,.98)!important;color:#fff!important;font:900 22px/1 Arial,sans-serif!important;cursor:pointer!important;box-shadow:0 6px 18px rgba(0,0,0,.45),0 0 14px rgba(177,112,255,.42)!important}
#madamUguOverlayV720{position:fixed!important;inset:0!important;z-index:2147483600!important;display:none!important;align-items:center!important;justify-content:center!important;padding:18px!important;background:rgba(5,10,22,.34)!important;backdrop-filter:blur(1.5px)!important;-webkit-backdrop-filter:blur(1.5px)!important}
#madamUguOverlayV720.is-open{display:flex!important}
#madamUguPanelV720{position:relative!important;width:min(90vw,700px)!important;height:min(76vh,780px)!important;border-radius:24px!important;overflow:hidden!important;border:1px solid rgba(210,184,255,.34)!important;background:linear-gradient(180deg,#221036 0%,#160b26 48%,#0f071b 100%)!important;box-shadow:0 28px 90px rgba(0,0,0,.52),0 0 42px rgba(111,54,194,.20)!important;color:#f7f1ff!important}
#madamUguModalCloseV720{position:fixed!important;top:12px!important;right:12px!important;z-index:2147483647!important;width:42px!important;height:42px!important;display:grid!important;place-items:center!important;padding:0!important;border-radius:14px!important;border:2px solid rgba(246,237,255,.98)!important;background:rgba(47,20,73,.99)!important;color:#fff!important;font:900 28px/1 Arial,sans-serif!important;cursor:pointer!important;box-shadow:0 7px 22px rgba(0,0,0,.55),0 0 18px rgba(183,119,255,.48)!important}
.ugu720-inner{height:100%;min-height:0;padding:18px 14px 22px;text-align:center;font-family:"Trebuchet MS",Arial,sans-serif;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:thin}
.ugu720-title{margin:0 56px 8px;font-size:clamp(24px,4.2vw,35px);font-weight:600;font-family:Georgia,"Times New Roman",serif;letter-spacing:.015em;text-shadow:0 0 12px rgba(236,220,255,.18)}
.ugu720-greeting{width:min(94%,500px);margin:8px auto 10px;padding:9px 12px;border:1px solid rgba(220,198,255,.22);border-radius:13px;background:rgba(110,68,160,.18);color:#e4daf2;line-height:1.45;font-size:12.5px}
.ugu720-counter{display:inline-flex;margin:3px auto 10px;padding:7px 12px;border:1px solid rgba(220,198,255,.20);border-radius:999px;color:#d6c9e8;background:rgba(106,66,156,.16);font-size:11.5px}
.ugu720-orbwrap{position:relative;min-height:400px;display:grid;place-items:center;margin-top:4px}
.ugu720-nebula{position:absolute;width:min(65vw,360px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(147,83,255,.18),rgba(78,33,152,.11) 40%,transparent 72%);filter:blur(18px);animation:uguNeb720 5.4s ease-in-out infinite}
.ugu720-orbit,.ugu720-orbit2,.ugu720-orbit3{position:absolute;border-radius:50%;pointer-events:none}
.ugu720-orbit{width:min(64vw,320px);height:min(44vw,220px);border:1px solid rgba(181,151,255,.22);transform:rotate(-13deg);animation:uguOrbit1720 22s linear infinite}
.ugu720-orbit2{width:min(58vw,290px);height:min(39vw,195px);border:1px solid rgba(226,214,255,.15);transform:rotate(31deg);animation:uguOrbit2720 28s linear infinite reverse}
.ugu720-orbit3{width:min(68vw,340px);height:min(30vw,150px);border:1px solid rgba(143,102,255,.12);transform:rotate(7deg);animation:uguOrbit3720 34s linear infinite}
.ugu720-orb{width:min(61vw,305px);aspect-ratio:1;border-radius:50%;position:relative;display:grid;place-items:center;cursor:pointer;overflow:hidden;z-index:3;user-select:none;-webkit-tap-highlight-color:transparent;outline:none!important;border:1px solid rgba(232,222,255,.28);background:radial-gradient(circle at 30% 23%,rgba(255,255,255,.85) 0 2.2%,rgba(219,202,255,.14) 7%,transparent 15%),radial-gradient(circle at 45% 38%,rgba(153,96,255,.18),transparent 26%),radial-gradient(circle at 50% 48%,#6c33bd 0,#4b1e87 30%,#2b104e 54%,#160827 75%,#09030f 100%);box-shadow:0 0 25px rgba(128,70,224,.42),0 0 76px rgba(85,41,165,.22),inset -28px -32px 54px rgba(0,0,0,.5),inset 18px 16px 34px rgba(237,226,255,.08);animation:uguOrbFloat720 5s ease-in-out infinite}
.ugu720-message{position:relative;z-index:4;width:74%;font-weight:600;font-size:clamp(16px,2.8vw,21px);line-height:1.34;color:#fff;text-shadow:0 0 12px rgba(206,187,255,.30);font-family:Georgia,"Times New Roman",serif;letter-spacing:.005em}
.ugu720-kind{position:absolute;z-index:5;top:25%;left:50%;transform:translateX(-50%);font-size:10px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:#cdbfff;opacity:0}
.ugu720-kind.show{opacity:.9}
.ugu720-rune{position:absolute;z-index:2;font-size:88px;color:rgba(237,229,255,.10);text-shadow:0 0 24px rgba(151,89,255,.52);opacity:0;transform:scale(.65)}
.ugu720-rune.show{opacity:1;transform:scale(1)}
.ugu720-stars,.ugu720-lines,.ugu720-vortex,.ugu720-sigil{position:absolute;inset:0;pointer-events:none;border-radius:50%}
.ugu720-stars{z-index:2;background:radial-gradient(circle at 22% 31%,rgba(255,255,255,.95) 0 1.2px,transparent 2px),radial-gradient(circle at 72% 26%,rgba(223,203,255,.9) 0 1.5px,transparent 2.4px),radial-gradient(circle at 68% 67%,rgba(255,255,255,.82) 0 1px,transparent 2px),radial-gradient(circle at 37% 72%,rgba(196,164,255,.95) 0 1.3px,transparent 2.2px),radial-gradient(circle at 49% 48%,rgba(255,255,255,.72) 0 1px,transparent 2px);animation:uguTwinkle720 3.2s ease-in-out infinite}
.ugu720-lines{z-index:2;inset:12%;border:1px solid rgba(224,204,255,.12);box-shadow:inset 0 0 28px rgba(182,128,255,.08);background:conic-gradient(from 30deg,transparent 0 14%,rgba(221,190,255,.12) 15% 17%,transparent 18% 42%,rgba(160,104,255,.10) 43% 45%,transparent 46% 68%,rgba(244,230,255,.10) 69% 71%,transparent 72% 100%);animation:uguTurn720 14s linear infinite}
.ugu720-vortex{z-index:3;inset:18%;opacity:0;background:conic-gradient(from 0deg,transparent,rgba(255,255,255,.36),transparent 18%,rgba(190,137,255,.48),transparent 42%,rgba(129,74,235,.32),transparent 70%);filter:blur(8px)}
.ugu720-sigil{z-index:3;display:grid;place-items:center;font:700 72px/1 Georgia,serif;color:rgba(243,232,255,.11);text-shadow:0 0 18px rgba(200,151,255,.40);opacity:.35}
.ugu720-orb.is-reading .ugu720-vortex{opacity:.9;animation:uguVortex720 1.1s linear infinite}
.ugu720-orb.is-reading .ugu720-stars{animation-duration:.75s;filter:brightness(1.8)}
.ugu720-actions,.ugu720-details,.ugu720-history{width:min(95%,560px);margin:12px auto 0;text-align:left}
.ugu720-actions{display:none}.ugu720-actions.show{display:block}
.ugu720-btn{width:100%;padding:11px 14px;line-height:1.4;border-radius:13px;background:linear-gradient(180deg,rgba(116,73,165,.20),rgba(83,48,126,.16));border:1px solid rgba(223,201,255,.22);color:#f2ebfb;font-weight:700;cursor:pointer;text-align:left;font-family:"Trebuchet MS",Arial,sans-serif}
.ugu720-copy{text-align:center}
.ugu720-detailsbody,.ugu720-historybody{display:none;margin-top:8px;padding:12px 13px;border-radius:11px;background:rgba(105,67,150,.17);border:1px solid rgba(222,199,255,.18);color:#ded2ea;font-size:12.5px;line-height:1.5}
.ugu720-details.open .ugu720-detailsbody,.ugu720-history.open .ugu720-historybody{display:block}
.ugu720-history{display:none}.ugu720-history.show{display:block}
.ugu720-historyitem{padding:8px 9px;border-radius:10px;background:rgba(116,75,161,.14);border:1px solid rgba(222,199,255,.14);margin-top:7px}
.ugu720-historytag{display:block;font-size:10px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#bca9e5;margin-bottom:3px}
.ugu720-booknote{margin-top:8px;padding-top:8px;border-top:1px solid rgba(224,204,255,.16);color:#d9cceb;font-size:12px;line-height:1.5}
.ugu720-bookmeta{padding:10px 11px;border-radius:11px;background:rgba(116,75,161,.12);border:1px solid rgba(222,199,255,.14)}
.ugu720-bookcount{font-weight:800;color:#f3ecff;font-size:14px}
.ugu720-booksub{margin-top:3px;color:#cbbce1;font-size:12px}
.ugu720-progress{margin-top:8px;height:8px;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.08)}
.ugu720-progressfill{height:100%;width:0;background:linear-gradient(90deg,#8e59df,#d3b2ff)}
.ugu720-booksectiontitle{margin:10px 0 6px;color:#f1e8ff;font:600 15px/1.2 Georgia,"Times New Roman",serif;letter-spacing:.01em}
.ugu720-achievementslist{display:grid;gap:7px}
.ugu720-achievement{display:flex;gap:8px;align-items:flex-start;padding:8px 9px;border-radius:10px;border:1px solid rgba(222,199,255,.14);background:rgba(116,75,161,.10)}
.ugu720-achievement.locked{opacity:.72}
.ugu720-achievement.done{background:rgba(139,92,199,.18)}
.ugu720-achicon{width:22px;flex:0 0 22px;text-align:center;font-size:15px;line-height:1.2}
.ugu720-achtext strong{display:block;color:#f4edff;font-size:12.5px;margin-bottom:2px}
.ugu720-achtext span{display:block;color:#d7cae8;font-size:11.5px;line-height:1.32}
.ugu720-bookitems{display:grid;gap:7px}
.ugu720-bookempty{padding:9px 10px;border-radius:10px;background:rgba(116,75,161,.10);border:1px dashed rgba(222,199,255,.18);color:#cfbfdf;font-size:12px}
.ugu720-hint{margin:8px 0 0;color:#aa9ab9;font-size:11.5px;line-height:1.4}
@media (max-width: 560px){
#madamUguOverlayV720{padding:12px!important}
#madamUguPanelV720{width:min(90vw,420px)!important;height:min(76dvh,680px)!important;max-height:calc(100dvh - 96px)!important;border-radius:22px!important}
#madamUguModalCloseV720{top:8px!important;right:8px!important;width:44px!important;height:44px!important}
.ugu720-inner{height:100%;min-height:0;padding:10px 9px 12px;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch}
.ugu720-title{font-size:22px!important;line-height:1.22!important;white-space:nowrap!important;letter-spacing:.01em!important;margin:2px 48px 8px!important}
.ugu720-greeting{width:min(94%,360px);margin:4px auto 10px;padding:10px 10px;font-size:11px;line-height:1.62}
.ugu720-counter{margin:0 auto 5px;padding:6px 9px;font-size:10.5px;line-height:1.48}
.ugu720-orbwrap{min-height:248px;margin-top:-8px}
.ugu720-nebula{width:min(52vw,232px)}
.ugu720-orbit{width:min(51vw,226px);height:min(34vw,148px)}
.ugu720-orbit2{width:min(46vw,204px);height:min(29vw,128px)}
.ugu720-orbit3{width:min(55vw,244px);height:min(22vw,98px)}
.ugu720-orb{width:min(52vw,226px)}
.ugu720-message{width:78%;font-size:14px;line-height:1.26;overflow-wrap:anywhere;font-weight:600}
.ugu720-kind{top:23%;font-size:9px}
.ugu720-rune{font-size:72px}
.ugu720-actions,.ugu720-details,.ugu720-history{width:min(95%,360px);margin-top:13px}
.ugu720-btn{padding:12px 12px;font-size:13px;line-height:1.5}
.ugu720-detailsbody,.ugu720-historybody{margin-top:9px;padding:11px 12px;font-size:11.8px;line-height:1.6}
.ugu720-bookcount{font-size:13px}.ugu720-booksub,.ugu720-achtext span,.ugu720-bookempty{font-size:11px}.ugu720-booksectiontitle{font-size:13px}
.ugu720-hint{margin-top:13px;font-size:10.8px;line-height:1.55;padding:0 6px 2px}
}
.ugu720-feather{position:fixed;z-index:2147483647;pointer-events:none;width:20px;height:64px;opacity:0;transform-origin:50% 70%;will-change:transform,opacity}
.ugu720-feather.play{animation:uguFeather720 1.8s ease-out forwards}
@keyframes uguFloat720{0%,100%{transform:translateY(0) rotate(-.7deg)}50%{transform:translateY(-4px) rotate(.7deg)}}
@keyframes uguNeb720{50%{transform:scale(1.06);opacity:.82}}
@keyframes uguOrbit1720{to{transform:rotate(347deg)}}@keyframes uguOrbit2720{to{transform:rotate(391deg)}}@keyframes uguOrbit3720{to{transform:rotate(367deg)}}
@keyframes uguOrbFloat720{50%{transform:translateY(-8px)}}
@keyframes uguTwinkle720{0%,100%{opacity:.42;transform:scale(1)}50%{opacity:1;transform:scale(1.025)}}
@keyframes uguTurn720{to{transform:rotate(360deg)}}
@keyframes uguVortex720{0%{transform:scale(.68) rotate(0deg)}50%{transform:scale(1.02) rotate(180deg)}100%{transform:scale(.68) rotate(360deg)}}
@keyframes uguFeather720{0%{opacity:0;transform:translate(var(--x),var(--y)) rotate(0deg) scale(.6)}12%{opacity:.95}100%{opacity:0;transform:translate(calc(var(--x) + var(--dx)),calc(var(--y) + var(--dy))) rotate(var(--r)) scale(1)}}
`;
  document.head.appendChild(style);

  var overlay=el('div',{id:'madamUguOverlayV720'});
  var panel=el('div',{id:'madamUguPanelV720'});
  var close=el('button',{id:'madamUguModalCloseV720','aria-label':'Закрыть шар предсказаний'},'×');
  var inner=el('div',{class:'ugu720-inner'});
  inner.innerHTML=`
    <h1 class="ugu720-title">Шар предсказаний</h1>
    <div class="ugu720-greeting"><strong>Мадам Угу приветствует тебя ✨</strong><br>Коснись шара и открой своё предсказание.</div>
    <div class="ugu720-counter">✨ Доступно предсказаний: 2 из 2</div>
    <div class="ugu720-orbwrap">
      <div class="ugu720-nebula"></div>
      <div class="ugu720-orbit"></div><div class="ugu720-orbit2"></div><div class="ugu720-orbit3"></div>
      <div class="ugu720-orb" role="button" tabindex="0">
        <div class="ugu720-stars"></div><div class="ugu720-lines"></div><div class="ugu720-vortex"></div><div class="ugu720-sigil">✦</div>
        <div class="ugu720-kind"></div><div class="ugu720-rune"></div><div class="ugu720-message"></div>
      </div>
    </div>
    <div class="ugu720-actions"><button class="ugu720-btn ugu720-copy" type="button">📋 Скопировать предсказание</button></div>
    <div class="ugu720-details"><button class="ugu720-btn ugu720-detailsbtn" type="button">Подробнее</button><div class="ugu720-detailsbody"><strong class="ugu720-detailstitle">Как работает шар</strong><div class="ugu720-detailstext">Большинство знаков обычные. Иногда Мадам Угу показывает редкое предсказание, а ещё реже появляется руна.</div><div class="ugu720-booknote">📖 Книжечка Мадам Угу хранит все уникальные предсказания навсегда. В 00:00 сбрасываются только дневные попытки, а сама книга и достижения остаются.</div></div></div>
    <div class="ugu720-history"><button class="ugu720-btn ugu720-historybtn" type="button">Книжечка Мадам Угу 📖</button><div class="ugu720-historybody"><div class="ugu720-bookmeta"><div class="ugu720-bookcount">Собрано <span class="ugu720-bookcountnum">0</span> из 100</div><div class="ugu720-booksub">Редкие: <span class="ugu720-rarecount">0</span> • Руны: <span class="ugu720-runecount">0</span></div><div class="ugu720-progress"><div class="ugu720-progressfill"></div></div></div><div class="ugu720-booksectiontitle">Достижения</div><div class="ugu720-achievementslist"></div><div class="ugu720-booksectiontitle">Собранные предсказания</div><div class="ugu720-bookitems"></div></div></div>
    <p class="ugu720-hint">Некоторые знаки встречаются крайне редко.</p>`;
  panel.appendChild(inner);overlay.appendChild(panel);overlay.appendChild(close);document.body.appendChild(overlay);

  var launcher=el('a',{id:'madamUguLauncherV720',href:'#','aria-label':'Открыть шар предсказаний Мадам Угу'});
  var img=el('img',{src:'assets/madam-ugu-branch-v682.webp?v=682',alt:'Мадам Угу'});
  launcher.appendChild(img);document.body.appendChild(launcher);
  var closeLauncher=el('button',{id:'madamUguCloseLauncherV720','aria-label':'Скрыть Мадам Угу'},'×');
  document.body.appendChild(closeLauncher);

  var orb=q('.ugu720-orb',panel),msg=q('.ugu720-message',panel),counter=q('.ugu720-counter',panel),
      kind=q('.ugu720-kind',panel),rune=q('.ugu720-rune',panel),actions=q('.ugu720-actions',panel),
      copy=q('.ugu720-copy',panel),details=q('.ugu720-details',panel),detailsBtn=q('.ugu720-detailsbtn',panel),
      detailsBody=q('.ugu720-detailsbody',panel),detailsTitle=q('.ugu720-detailstitle',panel),detailsText=q('.ugu720-detailstext',panel),
      history=q('.ugu720-history',panel),historyBtn=q('.ugu720-historybtn',panel),historyBody=q('.ugu720-historybody',panel),
      bookCountNum=q('.ugu720-bookcountnum',panel),rareCountEl=q('.ugu720-rarecount',panel),runeCountEl=q('.ugu720-runecount',panel),
      progressFill=q('.ugu720-progressfill',panel),achievementsList=q('.ugu720-achievementslist',panel),bookItems=q('.ugu720-bookitems',panel);

  var MAX=2,BOOK_TOTAL=100,KEY='sova58-predictions-cosmic-v1',BOOKKEY='sova58-predictions-book-v1',busy=false,lastText='',feathersEnabled=true;
  try{
    var resetAttemptsKey='sova58-ugu-attempts-reset-v11';
    if(!localStorage.getItem(resetAttemptsKey)){
      localStorage.removeItem(KEY);
      localStorage.setItem(resetAttemptsKey,'1');
    }
  }catch(e){}
  var common=['Ресурсы ещё пригодятся. Не спеши устраивать им торжественные проводы.','Удача любит нормальный состав чуть больше, чем красивую цифру силы.','Одна кнопка будет выглядеть особенно заманчиво. Мадам Угу уже подозревает, чем это закончится.'];
  fetch('fortune-phrases.txt?v=8',{cache:'no-store'}).then(function(r){return r.ok?r.text():Promise.reject()}).then(function(t){var a=t.split(/\r?\n/).map(function(x){return x.trim()}).filter(Boolean);if(a.length){common=a;renderBook();}}).catch(function(){});
  var rare=['✨ Судьба оставляет дверь открытой. Постарайся хотя бы не пройти мимо.','✨ То, что долго не складывалось, внезапно может сдвинуться. Игра иногда делает вид, что помогает.','✨ Один правильный выбор окажется важнее десяти мелких. Да, придётся выбирать.'];
  var runes=[['ᚠ','Феху','ᚠ Руна Феху. Береги то, что уже накоплено.'],['ᚢ','Уруз','ᚢ Руна Уруз. Силы больше, чем тебе кажется.'],['ᚱ','Райдо','ᚱ Руна Райдо. Путь уже начался.'],['ᚷ','Гебо','ᚷ Руна Гебо. Хорошее приходит через обмен и союз.'],['ᛃ','Йера','ᛃ Руна Йера. Всё созревает в своё время.'],['ᛉ','Альгиз','ᛉ Руна Альгиз. Защита окажется важнее лишней самоуверенности.']];

  function dayKey(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function state(){try{var v=JSON.parse(localStorage.getItem(KEY)||'{}');return v.day===dayKey()?v:{day:dayKey(),count:0,items:[]}}catch(e){return{day:dayKey(),count:0,items:[]}}}
  function save(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
  function bookState(){
    try{
      var b=JSON.parse(localStorage.getItem(BOOKKEY)||'{}');
      return {
        items:Array.isArray(b.items)?b.items:[],
        counts:(b.counts&&typeof b.counts==='object')?b.counts:{},
        openDays:Array.isArray(b.openDays)?b.openDays:[],
        bookOpens:+b.bookOpens||0,
        repeats:+b.repeats||0,
        fullUseDays:Array.isArray(b.fullUseDays)?b.fullUseDays:[],
        midnightVisits:Array.isArray(b.midnightVisits)?b.midnightVisits:[]
      };
    }catch(e){
      return {items:[],counts:{},openDays:[],bookOpens:0,repeats:0,fullUseDays:[],midnightVisits:[]};
    }
  }
  function saveBook(b){try{localStorage.setItem(BOOKKEY,JSON.stringify(b))}catch(e){}}
  function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function typeOfKind(kind){kind=String(kind||'');if(kind.indexOf('Руна ')===0)return 'rune';if(kind==='Редкое')return 'rare';return 'common'}
  function bookStats(b){
    var commonCount=0,rareCount=0,runeCount=0,maxRepeat=0;
    (b.items||[]).forEach(function(it){var t=typeOfKind(it.kind);if(t==='common')commonCount++;else if(t==='rare')rareCount++;else if(t==='rune')runeCount++;});
    Object.keys(b.counts||{}).forEach(function(k){if((b.counts[k]||0)>maxRepeat)maxRepeat=b.counts[k]||0;});
    return {totalUnique:(b.items||[]).length,commonCount:commonCount,rareCount:rareCount,runeCount:runeCount,daysCount:(b.openDays||[]).length,bookOpens:+b.bookOpens||0,repeats:+b.repeats||0,maxRepeat:maxRepeat,fullUseCount:(b.fullUseDays||[]).length,midnightCount:(b.midnightVisits||[]).length};
  }
  function achievements(stats){
    return [
      {title:'Первый знак',desc:'Получить первое предсказание',done:stats.totalUnique>=1},
      {title:'Начало коллекции',desc:'Собрать 5 из 100',done:stats.commonCount>=5},
      {title:'Любопытная сова',desc:'Собрать 10 из 100',done:stats.commonCount>=10},
      {title:'Читатель судьбы',desc:'Собрать 25 из 100',done:stats.commonCount>=25},
      {title:'Хранитель страниц',desc:'Собрать 50 из 100',done:stats.commonCount>=50},
      {title:'Архивариус Угу',desc:'Собрать 75 из 100',done:stats.commonCount>=75},
      {title:'Книга почти полна',desc:'Собрать 90 из 100',done:stats.commonCount>=90},
      {title:'Все нити судьбы',desc:'Собрать 100 из 100',done:stats.commonCount>=100},
      {title:'Редкая находка',desc:'Получить первое редкое предсказание',done:stats.rareCount>=1},
      {title:'Коллекционер редкостей',desc:'Собрать 5 разных редких предсказаний',done:stats.rareCount>=5},
      {title:'Знак рун',desc:'Впервые получить руну',done:stats.runeCount>=1},
      {title:'Любимчик рун',desc:'Собрать 3 разные руны',done:stats.runeCount>=3},
      {title:'Руновед',desc:'Собрать все 6 рун',done:stats.runeCount>=6},
      {title:'Сова помнит',desc:'Открывать Мадам Угу 7 разных дней',done:stats.daysCount>=7},
      {title:'Постоянный посетитель',desc:'Открывать Мадам Угу 30 разных дней',done:stats.daysCount>=30},
      {title:'Судьба повторяется',desc:'Получить уже встречавшееся предсказание',done:stats.repeats>=1},
      {title:'Вот это совпадение…',desc:'Получить один и тот же текст 3 раза',done:stats.maxRepeat>=3},
      {title:'Не сегодня',desc:'Потратить обе дневные попытки',done:stats.fullUseCount>=1},
      {title:'Полночный гость',desc:'Получить знак вскоре после 00:00',done:stats.midnightCount>=1},
      {title:'Книжный червь 58-го',desc:'Открыть книжечку 20 раз',done:stats.bookOpens>=20}
    ];
  }
  function renderBook(){
    var b=bookState(),stats=bookStats(b),pct=Math.max(0,Math.min(100,(stats.commonCount/BOOK_TOTAL)*100));
    history.classList.add('show');
    if(bookCountNum)bookCountNum.textContent=stats.commonCount;
    if(rareCountEl)rareCountEl.textContent=stats.rareCount;
    if(runeCountEl)runeCountEl.textContent=stats.runeCount;
    if(progressFill)progressFill.style.width=pct+'%';
    if(achievementsList){
      achievementsList.innerHTML=achievements(stats).map(function(a){return '<div class="ugu720-achievement '+(a.done?'done':'locked')+'"><div class="ugu720-achicon">'+(a.done?'🏆':'🔒')+'</div><div class="ugu720-achtext"><strong>'+esc(a.title)+'</strong><span>'+esc(a.desc)+'</span></div></div>';}).join('');
    }
    if(bookItems){
      var items=(b.items||[]).slice().reverse();
      bookItems.innerHTML=items.length ? items.map(function(x){return '<div class="ugu720-historyitem"><span class="ugu720-historytag">'+esc(x.kind)+'</span>'+esc(x.text)+'</div>';}).join('') : '<div class="ugu720-bookempty">Пока книга пуста. Коснись шара и собери первый знак.</div>';
    }
  }
  function trackVisit(){
    var b=bookState(),d=dayKey(),changed=false;
    if(b.openDays.indexOf(d)<0){b.openDays.push(d);changed=true;}
    if(changed)saveBook(b);
  }
  function updateBook(kind,text,currentDailyCount){
    var b=bookState(),d=dayKey(),key=String(text||''),exists=(b.items||[]).some(function(it){return it.text===text;});
    b.counts[key]=(b.counts[key]||0)+1;
    if(b.counts[key]>1)b.repeats=(+b.repeats||0)+1;
    if(!exists)b.items.push({kind:kind,text:text});
    if(currentDailyCount>=MAX && b.fullUseDays.indexOf(d)<0)b.fullUseDays.push(d);
    var now=new Date();
    if(now.getHours()===0 && now.getMinutes()<=30 && b.midnightVisits.indexOf(d)<0)b.midnightVisits.push(d);
    saveBook(b);
  }
  function resetAtMidnight(){
    try{localStorage.removeItem(KEY)}catch(e){}
    lastText='';
    busy=false;
    feathersEnabled=true;
    msg.textContent='';
    msg.style.whiteSpace='normal';
    msg.style.fontSize='';
    msg.style.lineHeight='';
    actions.classList.remove('show');
    details.classList.remove('open');
    history.classList.remove('open');
    kind.classList.remove('show');
    kind.textContent='';
    rune.classList.remove('show');
    rune.textContent='';
    copy.textContent='📋 Скопировать предсказание';
    refresh();
  }
  function scheduleMidnightReset(){
    var now=new Date();
    var next=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,0,0,50);
    var delay=Math.max(1000,next.getTime()-now.getTime());
    setTimeout(function(){
      resetAtMidnight();
      scheduleMidnightReset();
    },delay);
  }
  function refresh(){
    var s=state(),left=Math.max(0,MAX-s.count);
    counter.textContent='✨ Доступно предсказаний: '+left+' из '+MAX;
    renderBook();
  }
  function feather(x,y){
    if(!feathersEnabled)return;
    for(var i=0;i<3;i++){
      var f=el('i',{class:'ugu720-feather play'},'<svg viewBox="0 0 26 72"><path d="M14.3 3.5 C19.4 7.8 21.1 14.8 19.4 23.4 C17.8 31.2 13.7 38.8 10.8 47.2 C8.8 53.2 8.1 59.8 8.5 66.5 C6.3 58.9 4.5 51.6 4.9 43.8 C5.3 34.4 7.6 25.1 10.1 17.6 C11.6 12.9 13 7.8 14.3 3.5 Z" fill="#f2eefc" fill-opacity=".82" stroke="#ddd4f1" stroke-width=".5"/></svg>');
      f.style.setProperty('--x',x+'px');f.style.setProperty('--y',y+'px');f.style.setProperty('--dx',(Math.random()*180-90)+'px');f.style.setProperty('--dy',(Math.random()*150+70)+'px');f.style.setProperty('--r',(Math.random()*260-130)+'deg');
      f.style.left='0';f.style.top='0';document.body.appendChild(f);setTimeout(function(n){try{n.remove()}catch(e){}},1900,f);
    }
  }
  panel.addEventListener('pointerdown',function(e){if(e.target.closest('button,a'))return;feather(e.clientX,e.clientY)});
  function showDetails(t,x){details.classList.add('show');details.classList.remove('open');detailsTitle.textContent=t;detailsText.textContent=x;detailsBtn.textContent='Подробнее'}
  detailsBtn.onclick=function(){details.classList.toggle('open');detailsBtn.textContent=details.classList.contains('open')?'Скрыть':'Подробнее'};
  historyBtn.onclick=function(){var opening=!history.classList.contains('open');history.classList.toggle('open');if(opening){var b=bookState();b.bookOpens=(+b.bookOpens||0)+1;saveBook(b);renderBook();}};

  function fitMessage(text){
    var n=String(text||'').length;
    if(window.innerWidth<=560){
      msg.style.fontSize=(n>125?'11.5px':n>100?'12px':n>78?'12.7px':n>58?'13.4px':'14px');
      msg.style.lineHeight=(n>100?'1.16':'1.2');
    }else{
      msg.style.fontSize='';
      msg.style.lineHeight='';
    }
  }

  function reveal(){
    if(busy)return;
    var s=state();

    if(s.count>=MAX){
      msg.textContent='На сегодня всё ✨\nПриходи завтра';
      msg.style.whiteSpace='pre-line';
      msg.style.fontSize='13px';
      msg.style.lineHeight='1.2';
      actions.classList.remove('show');
      feathersEnabled=false;
      return;
    }

    busy=true;
    feathersEnabled=true;
    orb.classList.add('is-reading');
    kind.classList.remove('show');
    rune.classList.remove('show');

    setTimeout(function(){
      var roll=Math.random(),text='',tag='Обычное';
      var isRune=false;
      var prevKind=(s.items&&s.items.length)?String(s.items[s.items.length-1].kind||''):'';
      var prevWasRune=prevKind.indexOf('Руна ')===0;

      if(!prevWasRune && roll<0.015){
        var r=runes[Math.floor(Math.random()*runes.length)];
        rune.textContent=r[0];
        rune.classList.add('show');
        kind.textContent='Редкая руна';
        kind.classList.add('show');
        text=r[2];
        tag='Руна '+r[1];
        isRune=true;
        showDetails('Руна '+r[1],'Редкая руна Мадам Угу. Она не тратит дневную попытку и тоже попадает в книжечку.');
      }
      else if(roll<0.17){
        text=rare[Math.floor(Math.random()*rare.length)];
        kind.textContent='Редкое';
        kind.classList.add('show');
        tag='Редкое';
        showDetails('Редкое предсказание','Редкое предсказание Мадам Угу. Оно записывается в книжечку и помогает открывать достижения.');
      }
      else{
        text=common[Math.floor(Math.random()*common.length)];
        showDetails('Предсказание','Обычное предсказание шара. Все уникальные знаки сохраняются в книжечке Мадам Угу.');
      }

      if(!isRune){
        s.count++;
      }

      s.items=(s.items||[]).slice(-1);
      s.items.push({kind:tag,text:text});
      save(s);
      updateBook(tag,text,s.count);

      lastText=text;
      actions.classList.add('show');
      msg.style.whiteSpace='normal';
      msg.textContent=text;
      fitMessage(text);
      refresh();
    },550);

    setTimeout(function(){
      orb.classList.remove('is-reading');
      busy=false;
    },1100);
  }

  orb.addEventListener('click',reveal);
  orb.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();reveal()}});

  copy.onclick=async function(){
    if(!lastText)return;
    try{await navigator.clipboard.writeText(lastText)}catch(e){var t=el('textarea');t.value=lastText;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
    feathersEnabled=false;copy.textContent='✓ Скопировано';setTimeout(function(){copy.textContent='📋 Скопировать предсказание'},1200)
  };

  function positionModalClose(){
    try{
      var r=panel.getBoundingClientRect();
      close.style.setProperty('top',Math.max(8,r.top+10)+'px','important');
      close.style.setProperty('left',Math.max(8,r.right-52)+'px','important');
      close.style.setProperty('right','auto','important');
    }catch(e){}
  }
  launcher.onclick=function(e){
    e.preventDefault();
    overlay.classList.add('is-open');
    document.documentElement.style.overflow='hidden';
    requestAnimationFrame(positionModalClose);
    setTimeout(positionModalClose,60);
  };
  close.onclick=function(){overlay.classList.remove('is-open');document.documentElement.style.overflow=''};
  window.addEventListener('resize',function(){if(overlay.classList.contains('is-open'))positionModalClose()});
  overlay.addEventListener('click',function(e){if(e.target===overlay)close.click()});
  closeLauncher.onclick=function(){launcher.remove();closeLauncher.remove()};
  trackVisit();
  refresh();
  scheduleMidnightReset();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
