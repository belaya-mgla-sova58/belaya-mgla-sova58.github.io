!function(){var cl=document.createElement("script");cl.src="site-cleanup-v632.js?v=632";cl.defer=true;document.head.appendChild(cl)}();
!function(){if(!/(^|\/)(?:index\.html)?$/.test(location.pathname))return;var ns=document.createElement("script");ns.src="notifications-state-v631.js?v=631";ns.defer=true;document.head.appendChild(ns)}();
!function(){"use strict";
var PHRASES=[
"Добро пожаловать в Белую Мглу!",
"Рада снова вас видеть!",
"Заходите, располагайтесь.",
"Посмотрим, что сегодня нового?",
"Всё самое полезное уже здесь.",
"Хорошего дня и приятной игры!",
"Надеюсь, сегодня вам повезёт!",
"Не забудьте заглянуть в последние новости.",
"Готовы к новому игровому дню?",
"Пусть сегодня всё идёт по плану!",
"58-е государство на связи!",
"Проверьте события, чтобы ничего не пропустить.",
"Ресурсы сами себя не накопят!",
"Не забудьте забрать награды.",
"Пора проверить задания на сегодня.",
"Кто сегодня идёт на события?",
"Перед боем лучше всё проверить дважды.",
"Берегите ускорения, они ещё пригодятся.",
"Пусть сегодня выпадут хорошие награды!",
"Готовы? Тогда отправляемся в Белую Мглу!"
];
function standalone(){try{return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}catch(e){return!1}}
function phrase(){var last=-1;try{last=parseInt(localStorage.getItem("bm-splash-last-phrase")||"-1",10)}catch(e){}var i=Math.floor(Math.random()*PHRASES.length);if(PHRASES.length>1&&i===last)i=(i+1+Math.floor(Math.random()*(PHRASES.length-1)))%PHRASES.length;try{localStorage.setItem("bm-splash-last-phrase",String(i))}catch(e){}return PHRASES[i]}
function init(){if(!standalone())return;try{if(sessionStorage.getItem("bm-splash-v726")==="1")return;sessionStorage.setItem("bm-splash-v726","1")}catch(e){}
var text=phrase(),style=document.createElement("style");style.id="bm-splash-style-v726";style.textContent=`
#bm-splash-v726{position:fixed;inset:0;z-index:2147483647;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box;padding:max(26px,env(safe-area-inset-top)) 18px max(30px,env(safe-area-inset-bottom));background:radial-gradient(circle at 50% 46%,rgba(26,130,255,.28),transparent 34%),radial-gradient(circle at 18% 18%,rgba(66,191,255,.16),transparent 26%),linear-gradient(180deg,#020d1d 0%,#041b35 48%,#020b18 100%);opacity:1;transition:opacity .52s ease;isolation:isolate}
#bm-splash-v726.is-out{opacity:0;pointer-events:none}
.bm-stars-v726,.bm-stars-v726:before,.bm-stars-v726:after{position:absolute;inset:-20%;content:"";pointer-events:none;z-index:-1;background-image:radial-gradient(circle,rgba(190,230,255,.9) 0 1px,transparent 1.55px);background-size:47px 47px;opacity:.25;animation:bmStars726 8s linear infinite}
.bm-stars-v726:before{background-size:73px 73px;opacity:.22;transform:rotate(18deg);animation-duration:12s}.bm-stars-v726:after{background-size:101px 101px;opacity:.15;transform:rotate(-12deg);animation-duration:16s}
.bm-title-v726{position:relative;z-index:2;margin:0 0 clamp(22px,4vh,40px);font-family:Georgia,"Times New Roman",serif;font-size:clamp(34px,8.5vw,68px);font-weight:900;line-height:.98;letter-spacing:.025em;text-align:center;text-transform:uppercase;color:#f7fcff;text-shadow:0 0 6px #fff,0 0 18px #6dc9ff,0 0 36px #177fe8,0 4px 12px rgba(0,0,0,.72);opacity:0;transform:translateY(-12px);animation:bmTitle726 .72s .12s ease forwards}
.bm-title-v726 small{display:block;margin-top:9px;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;font-size:clamp(12px,3.1vw,17px);font-weight:800;letter-spacing:.12em;color:#a7dcff;text-transform:none;text-shadow:0 0 12px rgba(70,181,255,.42)}
.bm-scene-v726{position:relative;width:min(92vw,560px);height:clamp(250px,45vh,390px);display:flex;align-items:center;justify-content:center}
.bm-owl-wrap-v726{position:absolute;left:50%;top:44%;width:clamp(150px,38vw,230px);height:auto;transform:translate(-160vw,-65vh) rotate(-20deg) scale(.48);filter:drop-shadow(0 18px 28px rgba(0,0,0,.34)) drop-shadow(0 0 24px rgba(92,190,255,.32));animation:bmFly726 1.25s .22s cubic-bezier(.18,.8,.3,1.15) forwards,bmFloat726 2.6s 1.55s ease-in-out infinite}
.bm-owl-v726{display:block;width:100%;height:auto;overflow:visible}
.bm-wing-left-v726{transform-origin:82px 102px;animation:bmWingL726 .28s ease-in-out 5 .26s}.bm-wing-right-v726{transform-origin:158px 102px;animation:bmWingR726 .28s ease-in-out 5 .26s}
.bm-eye-v726{transform-origin:center;animation:bmBlink726 3.2s 1.8s infinite}
.bm-bubble-v726{position:absolute;left:50%;bottom:0;width:min(84vw,390px);box-sizing:border-box;padding:15px 18px;border:1px solid rgba(155,221,255,.62);border-radius:20px;background:linear-gradient(180deg,rgba(13,63,111,.96),rgba(5,35,70,.96));box-shadow:0 12px 34px rgba(0,8,28,.42),inset 0 1px 0 rgba(255,255,255,.13),0 0 26px rgba(42,153,255,.16);color:#f3fbff;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;font-size:clamp(16px,4.1vw,21px);font-weight:800;line-height:1.32;text-align:center;opacity:0;transform:translate(-50%,18px) scale(.88);animation:bmBubble726 .58s 1.35s cubic-bezier(.2,.9,.25,1.15) forwards}
.bm-bubble-v726:before{content:"";position:absolute;left:50%;top:-11px;width:20px;height:20px;border-left:1px solid rgba(155,221,255,.62);border-top:1px solid rgba(155,221,255,.62);background:#0d3f6f;transform:translateX(-50%) rotate(45deg)}
.bm-bubble-v726 span{position:relative;z-index:1}
.bm-snow-v726{position:absolute;inset:0;pointer-events:none;overflow:hidden}.bm-snow-v726 i{position:absolute;top:-8%;display:block;color:rgba(218,244,255,.75);font-style:normal;font-size:12px;animation:bmSnow726 linear infinite}.bm-snow-v726 i:nth-child(1){left:8%;animation-duration:5.3s;animation-delay:-1s}.bm-snow-v726 i:nth-child(2){left:22%;animation-duration:6.4s;animation-delay:-4s}.bm-snow-v726 i:nth-child(3){left:39%;animation-duration:4.9s;animation-delay:-2.2s}.bm-snow-v726 i:nth-child(4){left:58%;animation-duration:6.1s;animation-delay:-3.5s}.bm-snow-v726 i:nth-child(5){left:75%;animation-duration:5.6s;animation-delay:-.6s}.bm-snow-v726 i:nth-child(6){left:91%;animation-duration:6.8s;animation-delay:-5s}
@keyframes bmFly726{0%{transform:translate(-160vw,-65vh) rotate(-20deg) scale(.48)}65%{transform:translate(-38%,-60%) rotate(6deg) scale(1.06)}82%{transform:translate(-54%,-54%) rotate(-3deg) scale(.98)}100%{transform:translate(-50%,-50%) rotate(0) scale(1)}}
@keyframes bmFloat726{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-7px)}}
@keyframes bmWingL726{0%,100%{transform:rotate(0)}50%{transform:rotate(-23deg) translate(-4px,-3px)}}@keyframes bmWingR726{0%,100%{transform:rotate(0)}50%{transform:rotate(23deg) translate(4px,-3px)}}
@keyframes bmBlink726{0%,44%,50%,100%{transform:scaleY(1)}47%{transform:scaleY(.12)}}
@keyframes bmBubble726{to{opacity:1;transform:translate(-50%,0) scale(1)}}@keyframes bmTitle726{to{opacity:1;transform:translateY(0)}}
@keyframes bmStars726{to{transform:translate3d(22px,32px,0) rotate(2deg)}}@keyframes bmSnow726{0%{transform:translateY(-10vh) translateX(0) rotate(0);opacity:0}10%{opacity:.85}100%{transform:translateY(115vh) translateX(28px) rotate(180deg);opacity:0}}
@media(max-height:690px){#bm-splash-v726{justify-content:flex-start;padding-top:max(18px,env(safe-area-inset-top))}.bm-title-v726{font-size:clamp(29px,7.5vw,50px);margin-bottom:10px}.bm-scene-v726{height:390px;max-height:72vh}.bm-owl-wrap-v726{width:clamp(125px,31vw,185px)}.bm-bubble-v726{font-size:clamp(14px,3.6vw,18px);padding:12px 15px}}
@media(prefers-reduced-motion:reduce){.bm-stars-v726,.bm-stars-v726:before,.bm-stars-v726:after,.bm-wing-left-v726,.bm-wing-right-v726,.bm-eye-v726,.bm-snow-v726 i{animation:none!important}.bm-title-v726{animation:bmTitle726 .25s ease forwards}.bm-owl-wrap-v726{animation:none;transform:translate(-50%,-50%)}.bm-bubble-v726{animation:bmBubble726 .25s .25s ease forwards}}
`;document.head.appendChild(style);
var splash=document.createElement("div");splash.id="bm-splash-v726";splash.setAttribute("role","presentation");splash.innerHTML='<div class="bm-stars-v726"></div><div class="bm-snow-v726" aria-hidden="true"><i>❄</i><i>·</i><i>❄</i><i>·</i><i>❄</i><i>·</i></div><div class="bm-title-v726">Белая Мгла<small>58-е государство</small></div><div class="bm-scene-v726"><div class="bm-owl-wrap-v726" aria-hidden="true"><svg class="bm-owl-v726" viewBox="0 0 240 210" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bmBody726" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9e8fb"/></linearGradient><linearGradient id="bmWing726" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eefdff"/><stop offset="1" stop-color="#8fc9ed"/></linearGradient></defs><g class="bm-wing-left-v726"><path d="M86 100 C44 88 21 103 10 135 C30 127 46 131 62 148 C49 149 39 156 33 171 C62 167 84 152 101 126 Z" fill="url(#bmWing726)" stroke="#8bc8ee" stroke-width="3"/></g><g class="bm-wing-right-v726"><path d="M154 100 C196 88 219 103 230 135 C210 127 194 131 178 148 C191 149 201 156 207 171 C178 167 156 152 139 126 Z" fill="url(#bmWing726)" stroke="#8bc8ee" stroke-width="3"/></g><ellipse cx="120" cy="127" rx="61" ry="72" fill="url(#bmBody726)" stroke="#91cef1" stroke-width="3"/><path d="M69 79 C76 37 101 24 120 38 C139 24 164 37 171 79 C157 63 141 58 120 63 C99 58 83 63 69 79 Z" fill="#f9fdff" stroke="#91cef1" stroke-width="3"/><path d="M74 50 L91 25 L98 55 Z" fill="#e9f7ff" stroke="#91cef1" stroke-width="3"/><path d="M166 50 L149 25 L142 55 Z" fill="#e9f7ff" stroke="#91cef1" stroke-width="3"/><g class="bm-eye-v726"><ellipse cx="96" cy="78" rx="24" ry="26" fill="#f7fdff" stroke="#6db9e8" stroke-width="3"/><circle cx="99" cy="81" r="11" fill="#17314f"/><circle cx="103" cy="76" r="4" fill="#fff"/></g><g class="bm-eye-v726"><ellipse cx="144" cy="78" rx="24" ry="26" fill="#f7fdff" stroke="#6db9e8" stroke-width="3"/><circle cx="141" cy="81" r="11" fill="#17314f"/><circle cx="145" cy="76" r="4" fill="#fff"/></g><path d="M120 90 L108 102 L120 110 L132 102 Z" fill="#f3b44d" stroke="#d58b28" stroke-width="2"/><path d="M88 125 Q120 146 152 125" fill="none" stroke="#9ed5f4" stroke-width="4" stroke-linecap="round"/><path d="M96 151 Q120 169 144 151" fill="none" stroke="#9ed5f4" stroke-width="4" stroke-linecap="round"/><path d="M91 194 L112 181 L120 202 L128 181 L149 194" fill="#d8effc" stroke="#8fc8ea" stroke-width="3"/></svg></div><div class="bm-bubble-v726"><span></span></div></div>';
splash.querySelector(".bm-bubble-v726 span").textContent=text;document.body.appendChild(splash);
var reduce=false;try{reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}
var showFor=reduce?2600:4200;setTimeout(function(){splash.classList.add("is-out");setTimeout(function(){splash.remove();style.remove()},560)},showFor)
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:!0});else init()
}();