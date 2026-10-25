!function(){"use strict";
function standalone(){try{return matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0}catch(e){return!1}}
function init(){if(!standalone())return;
var style=document.createElement("style");style.id="bm-splash-style-v731";style.textContent=`
#bm-splash-v731{position:fixed;inset:0;z-index:2147483647;overflow:hidden;background:#031426;opacity:1;transition:opacity .62s ease}
#bm-splash-v731.out{opacity:0;pointer-events:none}
.bm-art-v731{position:absolute;inset:-1.5%;background-color:#031426;background-image:url('/assets/splash-winter-v729.webp?v=731');background-size:cover;background-position:center;background-repeat:no-repeat;transform:scale(1.045);animation:bmZoom731 5s ease-out forwards}
.bm-snow-v731{position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(circle,rgba(255,255,255,.95) 0 1.15px,transparent 1.7px),radial-gradient(circle,rgba(205,235,255,.8) 0 1px,transparent 1.55px);background-size:58px 58px,91px 91px;background-position:0 -40px,23px -10px;opacity:.34;animation:bmSnow731 5s linear infinite}
@keyframes bmZoom731{0%{transform:scale(1.045)}100%{transform:scale(1)}}
@keyframes bmSnow731{to{background-position:22px 110vh,-18px 118vh}}
@media(prefers-reduced-motion:reduce){.bm-art-v731,.bm-snow-v731{animation:none!important}.bm-art-v731{transform:none}}
`;document.head.appendChild(style);
var splash=document.createElement("div");splash.id="bm-splash-v731";splash.innerHTML='<div class="bm-art-v731" aria-hidden="true"></div><div class="bm-snow-v731" aria-hidden="true"></div>';document.body.appendChild(splash);
var probe=new Image();probe.decoding='async';probe.src='/assets/splash-winter-v729.webp?v=731';
setTimeout(function(){splash.classList.add('out');setTimeout(function(){splash.remove();style.remove()},640)},4360)
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init()
}();