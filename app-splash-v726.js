!function(){"use strict";
function stand(){try{return matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0}catch(e){return!1}}
function init(){if(!stand())return;var css=document.createElement("style");css.id="bm-splash-style-v729";css.textContent=`
#bm-splash-v729{position:fixed;inset:0;z-index:2147483647;overflow:hidden;background:#031426;opacity:1;transition:opacity .6s ease}
#bm-splash-v729.out{opacity:0;pointer-events:none}
#bm-splash-v729 img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;animation:bmZoom729 5s ease-out forwards;filter:saturate(1.04) contrast(1.02)}
#bm-splash-v729:after{content:"";position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(circle,rgba(255,255,255,.95) 0 1px,transparent 1.6px),radial-gradient(circle,rgba(205,235,255,.8) 0 1px,transparent 1.5px);background-size:58px 58px,91px 91px;background-position:0 -40px,23px -10px;opacity:.35;animation:bmSnow729 5s linear infinite}
@keyframes bmZoom729{0%{transform:scale(1.045)}100%{transform:scale(1)}}
@keyframes bmSnow729{to{background-position:22px 110vh,-18px 118vh}}
@media(prefers-reduced-motion:reduce){#bm-splash-v729 img,#bm-splash-v729:after{animation:none!important}}
`;document.head.appendChild(css);var s=document.createElement("div");s.id="bm-splash-v729";s.innerHTML='<img src="assets/splash-winter-v729.webp?v=730" alt="Белая Мгла, 58-е государство" decoding="sync" fetchpriority="high">';document.body.appendChild(s);setTimeout(function(){s.classList.add('out');setTimeout(function(){s.remove();css.remove()},620)},4380)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:!0});else init()
}();