(function(){
'use strict';
var STYLE_ID='touchFeathersStyleV659';
if(!document.getElementById(STYLE_ID)){
  var style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
.touch-feather-v659{position:fixed;left:0;top:0;width:20px;height:9px;z-index:2147483646;pointer-events:none;border-radius:100% 18% 100% 22%;background:linear-gradient(100deg,#fff 0%,rgba(247,249,253,.96) 42%,rgba(213,221,234,.38) 100%);box-shadow:0 0 9px rgba(255,255,255,.42);transform-origin:65% 50%;will-change:transform,opacity;animation:touchFeatherFlyV659 var(--dur,1000ms) cubic-bezier(.18,.72,.26,1) forwards}
.touch-feather-v659:after{content:'';position:absolute;left:4px;top:4px;width:12px;height:1px;background:rgba(174,185,202,.52);transform:rotate(-8deg);transform-origin:left center}
.touch-feather-flash-v659{position:fixed;width:18px;height:18px;border-radius:50%;z-index:2147483645;pointer-events:none;background:radial-gradient(circle,rgba(255,255,255,.9) 0%,rgba(222,185,255,.55) 38%,transparent 72%);transform:translate(-50%,-50%);animation:touchFeatherFlashV659 .55s ease-out forwards}
@keyframes touchFeatherFlyV659{0%{opacity:0;transform:translate(-50%,-50%) rotate(var(--r0,0deg)) scale(.55)}10%{opacity:1}70%{opacity:.78}100%{opacity:0;transform:translate(calc(-50% + var(--dx,0px)),calc(-50% + var(--dy,-80px))) rotate(var(--r1,180deg)) scale(var(--s,1))}}
@keyframes touchFeatherFlashV659{0%{opacity:.95;transform:translate(-50%,-50%) scale(.35)}100%{opacity:0;transform:translate(-50%,-50%) scale(5)}}
`;
  document.head.appendChild(style);
}
function burst(x,y){
  var flash=document.createElement('i');
  flash.className='touch-feather-flash-v659';
  flash.style.left=x+'px';flash.style.top=y+'px';
  document.body.appendChild(flash);
  setTimeout(function(){flash.remove();},650);
  var count=9;
  for(var i=0;i<count;i++){
    var f=document.createElement('i');
    f.className='touch-feather-v659';
    f.style.left=x+'px';f.style.top=y+'px';
    var angle=(-145+(i*(290/(count-1)))+(Math.random()*18-9))*Math.PI/180;
    var dist=55+Math.random()*75;
    var dx=Math.cos(angle)*dist;
    var dy=Math.sin(angle)*dist-25-Math.random()*40;
    f.style.setProperty('--dx',dx.toFixed(1)+'px');
    f.style.setProperty('--dy',dy.toFixed(1)+'px');
    f.style.setProperty('--r0',(Math.random()*80-40).toFixed(0)+'deg');
    f.style.setProperty('--r1',(160+Math.random()*260).toFixed(0)+'deg');
    f.style.setProperty('--s',(0.7+Math.random()*0.55).toFixed(2));
    f.style.setProperty('--dur',(820+Math.random()*520).toFixed(0)+'ms');
    document.body.appendChild(f);
    setTimeout((function(el){return function(){el.remove();};})(f),1600);
  }
}
var lastTouch=0;
document.addEventListener('touchstart',function(e){
  if(!e.touches||!e.touches.length)return;
  lastTouch=Date.now();
  burst(e.touches[0].clientX,e.touches[0].clientY);
},{passive:true,capture:true});
document.addEventListener('pointerdown',function(e){
  if(Date.now()-lastTouch<700)return;
  if(e.pointerType==='touch')return;
  burst(e.clientX,e.clientY);
},true);
})();