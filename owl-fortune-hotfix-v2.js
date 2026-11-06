(function(){
  if(window.__sova58FortuneHotfixV2) return;
  window.__sova58FortuneHotfixV2=true;

  var tries=0;
  function apply(){
    tries++;
    var orb=document.getElementById('sova58FortuneOrb');
    var art=document.getElementById('sova58FortuneArt');
    var video=document.getElementById('sova58FortuneVideo');
    if(!orb||!art||!video){
      if(tries<80) setTimeout(apply,150);
      return;
    }

    orb.style.setProperty('background-image','url("assets/owl-fortune-orb-v2.svg?v=20261028-1")','important');
    orb.style.setProperty('background-color','transparent','important');
    orb.style.setProperty('border-radius','50%','important');

    if(!document.getElementById('sova58FortuneHotfixStyle')){
      var style=document.createElement('style');
      style.id='sova58FortuneHotfixStyle';
      style.textContent='#sova58FortuneArt{background:#081224 url("assets/owl-fortune-panel-v2.svg?v=20261028-1") center/cover no-repeat!important}#sova58FortuneFallbackV2{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;display:block}#sova58FortuneVideo{z-index:2!important;opacity:0;transition:opacity .25s ease!important}#sova58FortuneVideo.sova58-video-visible{opacity:1}';
      document.head.appendChild(style);
    }

    var fallback=document.getElementById('sova58FortuneFallbackV2');
    if(!fallback){
      fallback=document.createElement('img');
      fallback.id='sova58FortuneFallbackV2';
      fallback.src='assets/owl-fortune-panel-v2.svg?v=20261028-1';
      fallback.alt='';
      fallback.setAttribute('aria-hidden','true');
      art.insertBefore(fallback,video);
    }

    video.poster='assets/owl-fortune-panel-v2.svg?v=20261028-1';
    video.preload='auto';
    function showVideo(){ video.classList.add('sova58-video-visible'); }
    function hideVideo(){ video.classList.remove('sova58-video-visible'); }
    video.addEventListener('playing',showVideo);
    video.addEventListener('error',hideVideo);
    video.addEventListener('stalled',hideVideo);
    video.addEventListener('emptied',hideVideo);
    if(!video.paused && video.readyState>=2) showVideo();
    try{ video.load(); }catch(e){}
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();
