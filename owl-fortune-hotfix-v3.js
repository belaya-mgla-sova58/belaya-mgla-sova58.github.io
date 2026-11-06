(function(){
  if(window.__sova58FortuneHotfixV3) return;
  window.__sova58FortuneHotfixV3=true;

  var tries=0;
  function apply(){
    tries++;
    var orb=document.getElementById('sova58FortuneOrb');
    var art=document.getElementById('sova58FortuneArt');
    var video=document.getElementById('sova58FortuneVideo');
    if(!orb||!art){
      if(tries<80) setTimeout(apply,150);
      return;
    }

    var oldFallback=document.getElementById('sova58FortuneFallbackV2');
    if(oldFallback) oldFallback.remove();
    var oldStyle=document.getElementById('sova58FortuneHotfixStyle');
    if(oldStyle) oldStyle.remove();

    if(video){
      try{ video.pause(); }catch(e){}
      try{ video.removeAttribute('src'); video.load(); }catch(e){}
      video.style.setProperty('display','none','important');
      video.style.setProperty('visibility','hidden','important');
      video.style.setProperty('width','0','important');
      video.style.setProperty('height','0','important');
      video.style.setProperty('position','absolute','important');
      video.style.setProperty('left','-9999px','important');
    }

    var style=document.getElementById('sova58FortuneHotfixStyleV3');
    if(!style){
      style=document.createElement('style');
      style.id='sova58FortuneHotfixStyleV3';
      style.textContent=`
#sova58FortuneOrb{
  width:74px!important;height:74px!important;right:14px!important;bottom:92px!important;
  border-radius:50%!important;overflow:visible!important;
  background:#102d62 url('app-icon-192-v541.png?v=541') center/cover no-repeat!important;
  border:2px solid rgba(196,222,255,.9)!important;
  box-shadow:0 8px 22px rgba(0,0,0,.4),0 0 0 4px rgba(97,115,255,.23),0 0 24px rgba(100,126,255,.5)!important;
  filter:none!important;
}
#sova58FortunePanel{overflow:hidden!important;}
#sova58FortuneArt{
  position:relative!important;width:100%!important;height:220px!important;aspect-ratio:auto!important;overflow:hidden!important;
  background:#0a1d43 url('assets/home-hero-polish-v446.webp?v=630') 78% 46%/225% auto no-repeat!important;
}
#sova58FortuneArt:before{
  content:'';position:absolute;inset:0;z-index:1;pointer-events:none;
  background:linear-gradient(180deg,rgba(4,15,38,.02) 45%,rgba(4,15,38,.32) 100%);
}
#sova58FortuneVideo,#sova58FortuneFallbackV2{display:none!important;visibility:hidden!important;width:0!important;height:0!important;left:-9999px!important;}
@media(max-width:560px){
  #sova58FortuneOrb{width:64px!important;height:64px!important;right:12px!important;bottom:88px!important;}
  #sova58FortuneArt{height:205px!important;background-size:245% auto!important;background-position:79% 47%!important;}
}
`;
      document.head.appendChild(style);
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();
