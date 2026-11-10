/* Белая Мгла | Mobile owl dismissal v1097.
   Controls only Madam Ugu's homepage launcher, not content artwork. */
(function(){
 "use strict";
 if(!document.body || !document.body.classList.contains("is-home-route"))return;
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
   "body.is-home-route #"+closeId+"{position:fixed!important;z-index:2147483645!important;display:grid!important;place-items:center!important;width:34px!important;height:34px!important;border:2px solid #ffe4a9!important;border-radius:50%!important;background:#10234f!important;color:#fff!important;font:700 24px/1 Arial,sans-serif!important;box-shadow:0 4px 16px #0009!important;cursor:pointer!important;touch-action:manipulation!important;padding:0!important;opacity:1!important;visibility:visible!important;}",
   "body.is-home-route #"+restoreId+"{position:fixed!important;right:10px!important;bottom:80px!important;z-index:2147483645!important;display:none!important;align-items:center!important;justify-content:center!important;min-width:105px!important;min-height:39px!important;padding:8px 11px!important;border:1px solid #e8c88d!important;border-radius:12px!important;background:#152a58!important;color:#fff!important;font:700 13px Arial,sans-serif!important;box-shadow:0 4px 14px #0008!important;cursor:pointer!important;}",
   "body.is-home-route.bm-owl-hidden-v1097 #"+owlId+"{display:none!important;visibility:hidden!important;pointer-events:none!important;}",
   "body.is-home-route.bm-owl-hidden-v1097 #madamUguCloseLauncherV720{display:none!important;visibility:hidden!important;pointer-events:none!important;}",
   "body.is-home-route.bm-owl-hidden-v1097 #"+closeId+"{display:none!important;}",
   "body.is-home-route.bm-owl-hidden-v1097 #"+restoreId+"{display:flex!important;}"
  ].join("\n");
  document.head.appendChild(s);
 }
 function position(){
  if(!owl||!close||document.body.classList.contains("bm-owl-hidden-v1097"))return;
  var r=owl.getBoundingClientRect();
  if(!r.width||!r.height){close.style.display="none";return}
  close.style.removeProperty("display");
  var x=Math.min(window.innerWidth-37,Math.max(3,r.right-27));
  var y=Math.min(window.innerHeight-37,Math.max(4,r.top-12));
  close.style.setProperty("left",x+"px","important");
  close.style.setProperty("top",y+"px","important");
 }
 function apply(value){
  document.body.classList.toggle("bm-owl-hidden-v1097",value);
  save(value);
  if(!value)requestAnimationFrame(position);
 }
 function install(){
  owl=document.getElementById(owlId);
  if(!owl)return false;
  css();
  if(!close){
   close=document.createElement("button");
   close.type="button";close.id=closeId;close.textContent="×";
   close.setAttribute("aria-label","Скрыть сову");
   close.title="Скрыть сову";
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
