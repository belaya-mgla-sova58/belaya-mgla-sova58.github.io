/* Белая Мгла | Mobile owl dismissal v1097.
   Controls only Madam Ugu's homepage launcher, not content artwork. */
(function(){
 "use strict";
 if(!document.body || !document.body.classList.contains("is-home-route"))return;
 if(!window.matchMedia || !window.matchMedia("(max-width:820px)").matches)return;
 var owlId="madamUguLauncherV720";
 var key="bm-home-owl-hidden-v1097";
 var closeId="bmOwlDismissV1097";
 var restoreId="bmOwlRestoreV1097";
 var owl=null, close=null, restore=null, observer=null;
 function hidden(){try{return sessionStorage.getItem(key)==="1"}catch(_){return false}}
 function save(value){try{if(value)sessionStorage.setItem(key,"1");else sessionStorage.removeItem(key)}catch(_){}}
 function css(){
  if(document.getElementById("bmOwlDismissStyleV1097"))return;
  var s=document.createElement("style");s.id="bmOwlDismissStyleV1097";
  s.textContent=[
   "body.is-home-route #"+closeId+"{position:fixed!important;z-index:2147483645!important;display:grid!important;place-items:center!important;width:38px!important;height:38px!important;border:2px solid #f2d69c!important;border-radius:50%!important;background:rgba(29,19,47,.96)!important;color:#fff!important;font:700 24px/1 Arial,sans-serif!important;box-shadow:0 4px 16px #0009,0 0 9px #a26deb88!important;cursor:pointer!important;touch-action:manipulation!important;padding:0!important;opacity:1!important;visibility:visible!important;}",
   "body.is-home-route #"+restoreId+"{position:fixed!important;right:10px!important;bottom:105px!important;z-index:2147483645!important;display:none!important;align-items:center!important;justify-content:center!important;min-width:105px!important;min-height:39px!important;padding:8px 11px!important;border:1px solid #e8c88d!important;border-radius:12px!important;background:#152a58!important;color:#fff!important;font:700 13px Arial,sans-serif!important;box-shadow:0 4px 14px #0008!important;cursor:pointer!important;}",
   "html:not(.force-desktop-root) body.is-home-route #madamUguCloseLauncherV720{display:none!important;}",
   "body.is-home-route:has(#madamUguOverlayV720.is-open) #"+closeId+"{display:none!important;}",
   "body.is-home-route.bm-owl-hidden-v1097 #"+owlId+"{display:none!important;visibility:hidden!important;pointer-events:none!important;}",
   "body.is-home-route.bm-owl-hidden-v1097 #madamUguCloseLauncherV720{display:none!important;visibility:hidden!important;pointer-events:none!important;}",
   "html body.is-home-route.bm-owl-hidden-v1097 #"+closeId+"{display:none!important;visibility:hidden!important;pointer-events:none!important;}",
   "body.is-home-route.bm-owl-hidden-v1097 #"+restoreId+"{display:flex!important;}"
  ].join("\n");
  document.head.appendChild(s);
 }
 function position(){
  if(!owl||!close||document.body.classList.contains("bm-owl-hidden-v1097"))return;
  var r=owl.getBoundingClientRect();
  if(!r.width||!r.height){close.style.setProperty("display","none","important");return}
  close.style.removeProperty("display");
  var x=Math.min(window.innerWidth-42,Math.max(4,r.right-36));
  var y=Math.min(window.innerHeight-42,Math.max(4,r.top+4));
  close.style.setProperty("left",x+"px","important");
  close.style.setProperty("top",y+"px","important");
 }
 function apply(value){
  document.body.classList.toggle("bm-owl-hidden-v1097",value);
  save(value);
  // Keep the launcher and both possible close buttons synchronized.
  var legacy=document.getElementById("madamUguCloseLauncherV720");
  if(owl){
   if(value){owl.style.setProperty("display","none","important");owl.setAttribute("aria-hidden","true")}
   else{owl.style.removeProperty("display");owl.removeAttribute("aria-hidden")}
  }
  [close,legacy].forEach(function(btn){
   if(!btn)return;
   btn.style.setProperty("display","none","important");
   btn.style.setProperty("visibility","hidden","important");
   btn.style.setProperty("pointer-events","none","important");
  });
  if(restore){
   restore.style.setProperty("display",value?"flex":"none","important");
  }
  if(!value)requestAnimationFrame(function(){
   if(close){
    close.style.removeProperty("display");
    close.style.removeProperty("visibility");
    close.style.removeProperty("pointer-events");
   }
   position();
  });
 }
 function install(){
  owl=document.getElementById(owlId);
  if(!owl)return false;
  css();
  if(!close){
   close=document.createElement("button");
   close.type="button";close.id=closeId;close.textContent="×";
   close.setAttribute("aria-label","Закрыть Мадам Угу");
   close.title="Закрыть Мадам Угу";
   close.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();apply(true)});
   document.body.appendChild(close);
  }
  if(!restore){
   restore=document.createElement("button");
   restore.type="button";restore.id=restoreId;restore.textContent="🦉 Вернуть сову";
   restore.addEventListener("click",function(e){e.preventDefault();apply(false)});
   document.body.appendChild(restore);
  }
  apply(hidden());position();
  requestAnimationFrame(position);
  setTimeout(position,350);
  window.addEventListener("resize",position,{passive:true});
  window.addEventListener("scroll",position,{passive:true});
  if(observer)observer.disconnect();
  return true;
 }
 function start(){
  if(install())return;
  observer=new MutationObserver(function(){if(document.getElementById(owlId))install()});
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener("load",function(){if(!owl)install()},{once:true});
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
 else start();
})();
