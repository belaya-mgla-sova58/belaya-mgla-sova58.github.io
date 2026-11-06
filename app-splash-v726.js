!function(){"use strict";
function removeSplash(){
  try{document.querySelectorAll('[id^="browserSplashV"]').forEach(function(el){el.remove()})}catch(e){}
  try{document.querySelectorAll('[id^="browser-splash-style-v"]').forEach(function(el){el.remove()})}catch(e){}
}
removeSplash();
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",removeSplash,{once:true});
window.addEventListener("pageshow",removeSplash);
}();
