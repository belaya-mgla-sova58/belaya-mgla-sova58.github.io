/* Desktop-only Madam Ugu launcher: compact by default, reversible; mobile keeps original behavior. */
(function(){
  "use strict";
  var key="sova58-owl-desktop-v966";
  function desktop(){
    return document.documentElement.classList.contains("force-desktop-root") ||
      (window.matchMedia && window.matchMedia("(min-width:1201px) and (hover:hover) and (pointer:fine)").matches);
  }
  function init(){
    var launcher=document.getElementById("madamUguLauncherV720");
    var toggle=document.getElementById("madamUguCloseLauncherV720");
    if(!launcher||!toggle)return;
    var collapsed=true;
    try{collapsed=sessionStorage.getItem(key)!=="open";}catch(e){}
    function paint(){
      if(!desktop()){
        launcher.classList.remove("pc-owl-collapsed-v966");
        toggle.classList.remove("pc-owl-reopen-v966");
        toggle.textContent="×";
        toggle.setAttribute("aria-label","× Скрыть Мадам Угу");
        return;
      }
      launcher.classList.toggle("pc-owl-collapsed-v966",collapsed);
      toggle.classList.toggle("pc-owl-reopen-v966",collapsed);
      toggle.textContent=collapsed?"🦉 Сова":"×";
      toggle.setAttribute("aria-label",collapsed?"Сова: показать":"× Свернуть Сову");
      toggle.title=collapsed?"Показать Сову":"Свернуть Сову";
      toggle.setAttribute("aria-expanded",String(!collapsed));
    }
    toggle.onclick=function(e){
      if(e)e.preventDefault();
      if(!desktop()){
        launcher.remove();
        toggle.remove();
        return;
      }
      collapsed=!collapsed;
      try{sessionStorage.setItem(key,collapsed?"collapsed":"open");}catch(e){}
      paint();
    };
    window.addEventListener("resize",paint,{passive:true});
    paint();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(init,0)},{once:true});
  else setTimeout(init,0);
})();
