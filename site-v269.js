(function(){
  var core=document.createElement('script');
  core.src='site-v269-core-v465.js?v=465';
  core.async=false;
  document.head.appendChild(core);

  var style=document.createElement('style');
  style.id='event-bear-v467-style';
  style.textContent='\
body.is-events-route .guide-nav-card.event-bear-v467{position:relative!important;min-height:0!important;aspect-ratio:2/1!important;padding:0!important;overflow:hidden!important;border-radius:14px!important;border:1px solid rgba(108,205,255,.35)!important;background:url("assets/events-cards-sprite-v466.jpg?v=467") center top/100% 700% no-repeat!important;color:transparent!important;font-size:0!important;box-shadow:0 10px 24px rgba(0,8,24,.22)!important;}\
body.is-events-route .guide-nav-card.event-bear-v467::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 65%,rgba(3,20,38,.10));pointer-events:none;}\
.event-bear-header-v467{position:relative!important;padding:0!important;overflow:hidden!important;background:url("assets/events-headers-sprite-v466.jpg?v=467") center top/100% 700% no-repeat!important;border:0!important;box-shadow:none!important;aspect-ratio:3/1!important;min-height:0!important;}\
.event-bear-header-v467>h1,.event-bear-header-v467>p{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}\
@media(max-width:760px){body.is-events-route .guide-nav-card.event-bear-v467,.event-bear-header-v467{border-radius:12px!important;}}';
  document.head.appendChild(style);

  function applyBearArt(){
    var path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(path==='events.html'){
      document.querySelectorAll('.guide-nav-card[href="bear.html"]').forEach(function(card){
        card.classList.add('event-bear-v467');
        card.setAttribute('aria-label','Охота на медведя');
        card.setAttribute('title','Охота на медведя');
      });
    }
    if(path==='bear.html'){
      var sec=document.querySelector('.page-heading-v424.frost-header-v431');
      if(sec) sec.classList.add('event-bear-header-v467');
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyBearArt,{once:true});
  else applyBearArt();
})();
