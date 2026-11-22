/* Белая Мгла: мобильная сова у правого нижнего угла шапки.
   Закрытие действует только до следующей перезагрузки страницы. */
(function(){
 "use strict";
 if(!document.body || !document.body.classList.contains("is-home-route"))return;
 if(!window.matchMedia || !window.matchMedia("(max-width:820px)").matches)return;

 var owlId="madamUguLauncherV720";
 var closeId="bmOwlDismissV1097";
 var hiddenForThisPage=false;
 var owl=null, close=null, observer=null;
 function hero(){return document.querySelector(".home-portal-hero-v1016") || document.querySelector(".home-stamped-hero-v441");}
 function css(){
  if(document.getElementById("bmOwlDismissStyleV1097"))return;
  var style=document.createElement("style");
  style.id="bmOwlDismissStyleV1097";
  style.textContent=[
   "@media (max-width:820px){",
   "html:not(.force-desktop-root) body.is-home-route .home-portal-hero-v1016{position:relative!important;isolation:isolate!important;}",
   "html:not(.force-desktop-root) body.is-home-route #"+owlId+"{position:absolute!important;left:auto!important;top:auto!important;right:5px!important;bottom:3px!important;width:84px!important;height:84px!important;min-width:0!important;max-width:84px!important;z-index:50!important;}",
   "html:not(.force-desktop-root) body.is-home-route #"+owlId+" img{width:84px!important;height:84px!important;max-width:100%!important;object-fit:contain!important;}",
   "html:not(.force-desktop-root) body.is-home-route #"+closeId+"{position:absolute!important;left:auto!important;top:auto!important;right:3px!important;bottom:67px!important;z-index:51!important;display:grid!important;place-items:center!important;width:25px!important;height:25px!important;min-width:25px!important;padding:0!important;border:1.5px solid #f2d69c!important;border-radius:50%!important;background:rgba(29,19,47,.96)!important;color:#fff!important;font:700 19px/1 Arial,sans-serif!important;box-shadow:0 3px 10px #0009!important;cursor:pointer!important;touch-action:manipulation!important;}",
   "html:not(.force-desktop-root) body.is-home-route #madamUguCloseLauncherV720{display:none!important;}",
   "body.is-home-route:has(#madamUguOverlayV720.is-open) #"+closeId+"{display:none!important;}",
   "body.is-home-route.bm-owl-hidden-v1097 #"+owlId+",body.is-home-route.bm-owl-hidden-v1097 #"+closeId+"{display:none!important;visibility:hidden!important;pointer-events:none!important;}",
   "body.is-home-route #bmOwlRestoreV1097{display:none!important;}",
   "}"
  ].join("\n");
  document.head.appendChild(style);
 }
 function apply(){
  document.body.classList.toggle("bm-owl-hidden-v1097",hiddenForThisPage);
  if(owl){
   if(hiddenForThisPage){owl.style.setProperty("display","none","important");owl.setAttribute("aria-hidden","true");}
   else{owl.style.removeProperty("display");owl.removeAttribute("aria-hidden");}
  }
  if(close)close.style.setProperty("display",hiddenForThisPage?"none":"grid","important");
 }
 function install(){
  var current=document.getElementById(owlId),target=hero();
  if(!current || !target)return false;
  css();owl=current;
  if(owl.parentNode!==target)target.appendChild(owl);
  if(!close || !close.isConnected){
   close=document.getElementById(closeId);
   if(!close){
    close=document.createElement("button");
    close.type="button";close.id=closeId;close.textContent="×";
    close.setAttribute("aria-label","Закрыть сову до перезагрузки страницы");
    close.title="Закрыть сову";
    close.addEventListener("click",function(e){
     e.preventDefault();e.stopPropagation();
     hiddenForThisPage=true;apply();
    });
   }
  }
  if(close.parentNode!==target)target.appendChild(close);
  var obsolete=document.getElementById("bmOwlRestoreV1097");
  if(obsolete)obsolete.remove();
  apply();
  return true;
 }
 function start(){
  if(install())return;
  if(observer)observer.disconnect();
  observer=new MutationObserver(function(){if(install() && observer){observer.disconnect();observer=null;}});
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener("load",install,{once:true});
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
 else start();
})();
