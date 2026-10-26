!function(){"use strict";
function mobile(){try{return matchMedia("(hover:none)").matches||matchMedia("(pointer:coarse)").matches||Math.min(screen.width||9999,screen.height||9999)<900}catch(e){return!1}}
function standalone(){try{return matchMedia("(display-mode: standalone)").matches||navigator.standalone===true}catch(e){return!1}}
if(!mobile()||standalone())return;
var p=location.pathname||"/",q=new URLSearchParams(location.search),from=q.get("from")||"";
if(/^welcome-v\d+/i.test(from)){try{history.replaceState(null,"",p)}catch(e){}return}
if(!(p==="/"||/\/index\.html$/i.test(p)))return;
try{if(sessionStorage.getItem("sova58-browser-splash-v915")==="1")return;sessionStorage.setItem("sova58-browser-splash-v915","1")}catch(e){}
var phrases=[
"Топка снова требует всё, что у тебя есть 🔥",
"Мишка видел твои отряды и слегка напрягся 🐻",
"Ускорители решили пожить своей жизнью ⏱️",
"Алмазы закончились раньше, чем планы 💎",
"Кто-то в альянсе снова нажал не туда 👀",
"Разведка нашла приключения. Тебе их не показывали 🐾",
"Герой просит прокачку. Кошелёк просит пощады 🦸",
"Сбор открыт. Причина засекречена 🚩",
"Войска готовы к маршу. Ты пока морально нет ⚔️",
"Мировой чат снова знает правду лучше всех 💬",
"Замок стоит. Уже можно считать день успешным 🏰",
"Ежедневки всё ещё надеются на чудо 🎯",
"Ресурсы накопились и требуют уважения 📦",
"Альянс активен. Пора сделать вид, что ты тоже 🛡️",
"Кто-то снова сказал «я только на минутку» 😏",
"Новое событие уже выбрало тебя своей жертвой 🔔",
"Разработчики приготовили сюрприз. Лучше не расслабляться 🧊",
"Твои отряды спрашивают, когда уже домой 🏹",
"Белая мгла загрузилась. Спокойствие нет ❄️",
"Командир вошёл. Паника отменяется… наверное 🦉"
];
var phrase=phrases[Math.floor(Math.random()*phrases.length)];
var style=document.createElement("style");style.id="browser-splash-style-v915";style.textContent="#browserSplashV915{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(circle at 50% 28%,rgba(85,184,255,.22),transparent 24%),radial-gradient(circle at 18% 78%,rgba(104,83,255,.16),transparent 28%),linear-gradient(180deg,#020d1c 0%,#062340 52%,#031426 100%);opacity:0;transition:opacity .5s ease;pointer-events:auto}#browserSplashV915.show{opacity:1}#browserSplashV915.hide{opacity:0}.bs-stars-v915{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.8) 0 1px,transparent 1.6px),radial-gradient(circle,rgba(123,210,255,.65) 0 1px,transparent 1.7px);background-size:37px 37px,59px 59px;background-position:0 0,18px 11px;opacity:.32;animation:bsDriftV915 8s linear infinite}.bs-glow-v915{position:absolute;width:76vw;height:76vw;max-width:520px;max-height:520px;border-radius:50%;background:radial-gradient(circle,rgba(82,183,255,.28),rgba(30,90,180,.08) 48%,transparent 70%);filter:blur(8px);animation:bsPulseV915 2.4s ease-in-out infinite}.bs-card-v915{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;padding:24px 22px}.bs-img-wrap-v915{position:relative;width:min(66vw,380px);aspect-ratio:1/1;border-radius:32px;padding:1px;background:linear-gradient(145deg,rgba(208,240,255,.78),rgba(74,151,255,.22),rgba(255,255,255,.12));box-shadow:0 22px 72px rgba(0,0,0,.42),0 0 54px rgba(66,173,255,.22)}.bs-img-wrap-v915:after{content:\"\";position:absolute;inset:-12px;border-radius:40px;border:1px solid rgba(142,220,255,.14);box-shadow:0 0 34px rgba(62,172,255,.22);pointer-events:none}.bs-img-v915{display:block;width:100%;height:100%;object-fit:cover;border-radius:31px}.bs-title-v915{margin-top:22px;color:#f5fbff;font:900 clamp(34px,9.6vw,56px)/.96 Georgia,serif;letter-spacing:.01em;text-shadow:0 3px 18px rgba(81,180,255,.3)}.bs-sub-v915{margin-top:8px;color:#f7c874;font:900 clamp(17px,5vw,27px)/1 system-ui,-apple-system,Segoe UI,sans-serif;letter-spacing:.14em;text-shadow:0 2px 14px rgba(255,196,94,.22)}.bs-note-v915{margin-top:9px;color:#b7d8ec;font:800 clamp(10px,3vw,14px)/1.2 system-ui,-apple-system,Segoe UI,sans-serif;letter-spacing:.08em}.bs-phrase-v915{margin-top:17px;max-width:min(84vw,430px);padding:11px 15px;border:1px solid rgba(133,215,255,.18);border-radius:16px;background:rgba(3,22,43,.48);color:#e8f7ff;font:750 clamp(13px,3.65vw,17px)/1.35 system-ui,-apple-system,Segoe UI,sans-serif;text-align:center;text-shadow:0 2px 12px rgba(70,170,255,.25);box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 8px 24px rgba(0,0,0,.14)}.bs-line-v915{width:min(38vw,180px);height:2px;margin-top:15px;background:linear-gradient(90deg,transparent,#77ccff,transparent);box-shadow:0 0 14px rgba(91,190,255,.8)}@keyframes bsPulseV915{0%,100%{transform:scale(.96);opacity:.72}50%{transform:scale(1.04);opacity:1}}@keyframes bsDriftV915{to{background-position:37px 37px,77px 70px}}@media(max-height:690px){.bs-img-wrap-v915{width:min(50vw,310px)}.bs-title-v915{margin-top:14px;font-size:30px}.bs-sub-v915{font-size:16px}.bs-note-v915{font-size:10px;margin-top:6px}.bs-phrase-v915{margin-top:10px;padding:8px 11px;font-size:12px}.bs-line-v915{margin-top:10px}}@media(prefers-reduced-motion:reduce){#browserSplashV915,.bs-stars-v915,.bs-glow-v915{animation:none!important;transition:none!important}}";document.head.appendChild(style);
var splash=document.createElement("div");splash.id="browserSplashV915";splash.setAttribute("aria-hidden","true");splash.innerHTML='<div class="bs-stars-v915"></div><div class="bs-glow-v915"></div><div class="bs-card-v915"><div class="bs-img-wrap-v915"><img class="bs-img-v915" src="app-icon-512-v541.png" alt="Белая мгла" decoding="sync" fetchpriority="high"></div><div class="bs-title-v915">Белая мгла</div><div class="bs-sub-v915">ВЫЖИВАНИЕ</div><div class="bs-note-v915">НЕЗАВИСИМЫЙ САЙТ</div><div class="bs-phrase-v915"></div><div class="bs-line-v915"></div></div>';
var phraseEl=splash.querySelector(".bs-phrase-v915");if(phraseEl)phraseEl.textContent=phrase;
(document.body||document.documentElement).appendChild(splash);
requestAnimationFrame(function(){splash.classList.add("show")});
setTimeout(function(){splash.classList.remove("show");splash.classList.add("hide");setTimeout(function(){splash.remove();style.remove()},520)},5000);
}();