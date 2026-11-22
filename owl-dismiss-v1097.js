/* Белая Мгла: Мадам Угу плавает справа ниже новостей, отдельно от донат-совы в шапке.
   Крестик скрывает её только до следующей перезагрузки. */
(function(){
 'use strict';
 if(!document.body || !document.body.classList.contains('is-home-route'))return;
 if(!window.matchMedia || !window.matchMedia('(max-width:820px)').matches)return;

 const owlId='madamUguLauncherV720';
 const closeId='bmOwlDismissV1097';
 const owlWidth=82, owlHeight=82;
 let hiddenForThisPage=false;
 let owl=null, close=null, observer=null;
 let raf=0;
 function getHero(){
   return document.querySelector('.home-portal-hero-v1016') ||
          document.querySelector('.home-stamped-hero-v441');
 }
 function injectStyle(){
   if(document.getElementById('bmOwlDismissStyleV1097'))return;
   const el=document.createElement('style');
   el.id='bmOwlDismissStyleV1097';
   el.textContent=[
     'html:not(.force-desktop-root) body.is-home-route #'+owlId+'{position:fixed!important;z-index:2147483500!important;display:block!important;width:82px!important;height:82px!important;min-width:0!important;max-width:82px!important;border:0!important;background:transparent!important;overflow:visible!important;}',
     'html:not(.force-desktop-root) body.is-home-route #'+owlId+' img{display:block!important;width:82px!important;height:82px!important;object-fit:contain!important;max-width:100%!important;}',
     'html:not(.force-desktop-root) body.is-home-route #'+closeId+'{position:fixed!important;z-index:2147483501!important;display:grid!important;place-items:center!important;width:26px!important;height:26px!important;min-width:26px!important;padding:0!important;border:1.5px solid #f2d69c!important;border-radius:50%!important;background:#2b1a42!important;color:#fff!important;font:700 19px/1 Arial,sans-serif!important;box-shadow:0 3px 10px #0009!important;cursor:pointer!important;}',
     'html:not(.force-desktop-root) body.is-home-route #madamUguCloseLauncherV720{display:none!important;}',
     'body.is-home-route.bm-owl-hidden-v1097 #'+owlId+',body.is-home-route.bm-owl-hidden-v1097 #'+closeId+'{display:none!important;visibility:hidden!important;pointer-events:none!important;}',
     'body.is-home-route #bmOwlRestoreV1097{display:none!important;}',
     'body.is-home-route:has(#madamUguOverlayV720.is-open) #'+closeId+'{display:none!important;}'
   ].join('\n');
   document.head.appendChild(el);
 }
 function position(){
   if(!owl || !close || hiddenForThisPage)return;
   /* Original floating placement near the lower-right, not tied to the banner. */
   const overlayOpen=!!document.querySelector('#madamUguOverlayV720.is-open');
   if(overlayOpen){
     owl.style.setProperty('visibility','hidden','important');
     owl.style.setProperty('pointer-events','none','important');
     close.style.setProperty('visibility','hidden','important');
     close.style.setProperty('pointer-events','none','important');
     return;
   }
   const left=Math.max(2,innerWidth-owlWidth-10);
   const bottomGap=innerHeight<570?165:216;
   const top=Math.max(4,innerHeight-owlHeight-bottomGap);
   owl.style.setProperty('left',left+'px','important');
   owl.style.setProperty('top',top+'px','important');
   owl.style.setProperty('right','auto','important');
   owl.style.setProperty('bottom','auto','important');
   owl.style.setProperty('display','block','important');
   owl.style.setProperty('visibility','visible','important');
   owl.style.setProperty('pointer-events','auto','important');
   close.style.setProperty('left',Math.min(innerWidth-28,left+owlWidth-25)+'px','important');
   close.style.setProperty('top',Math.max(2,top-2)+'px','important');
   close.style.setProperty('right','auto','important');
   close.style.setProperty('bottom','auto','important');
   close.style.setProperty('display','grid','important');
   close.style.setProperty('visibility','visible','important');
   close.style.setProperty('pointer-events','auto','important');
 }
 function schedulePosition(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;position()});}
 function hide(){
   hiddenForThisPage=true;
   document.body.classList.add('bm-owl-hidden-v1097');
   if(owl){owl.style.setProperty('display','none','important');owl.setAttribute('aria-hidden','true');}
   if(close)close.style.setProperty('display','none','important');
 }
 function install(){
   const current=document.getElementById(owlId);
   if(!current || !getHero())return false;
   injectStyle();
   owl=current;
   // Keep the popup trigger outside the hero's overflow:hidden clipping.
   if(owl.parentNode!==document.body)document.body.appendChild(owl);
   if(!close || !close.isConnected){
     close=document.getElementById(closeId);
     if(!close){
       close=document.createElement('button');
       close.type='button';close.id=closeId;close.textContent='×';
       close.setAttribute('aria-label','Закрыть сову до перезагрузки страницы');
       close.title='Закрыть сову';
       close.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();hide();});
     }
   }
   if(close.parentNode!==document.body)document.body.appendChild(close);
   const old=document.getElementById('bmOwlRestoreV1097');
   if(old)old.remove();
   if(hiddenForThisPage)hide();else schedulePosition();
   return true;
 }
 function start(){
   injectStyle();
   install();
   if(observer)observer.disconnect();
   observer=new MutationObserver(function(records){
     for(const record of records){
       if(record.type==='childList'){
         if(!owl || !owl.isConnected || !close || !close.isConnected || !getHero()){install();break;}
       }
     }
   });
   observer.observe(document.body,{childList:true,subtree:true});
   window.addEventListener('load',schedulePosition,{once:true});
   window.addEventListener('resize',schedulePosition,{passive:true});
   window.addEventListener('scroll',schedulePosition,{passive:true});
   document.addEventListener('click',schedulePosition,{passive:true});
   setTimeout(function(){install();schedulePosition();},250);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
 else start();
})();
