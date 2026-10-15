(function(){
  var core=document.createElement('script');
  core.src='site-v269-core-v465.js?v=465';
  core.async=false;
  document.head.appendChild(core);

  var style=document.createElement('style');
  style.id='event-bear-v472-style';
  style.textContent='\
body.is-events-route .guide-nav-card.event-bear-v472{position:relative!important;min-height:0!important;aspect-ratio:2/1!important;padding:0!important;overflow:hidden!important;border-radius:14px!important;border:0!important;background-image:url("assets/img_22767d469133f308.webp?v=472")!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important;color:transparent!important;font-size:0!important;box-shadow:0 10px 24px rgba(0,8,24,.22)!important;}\
body.is-events-route .guide-nav-card.event-bear-v472::after{display:none!important;}\
body.is-bear-route .page-heading-v424.frost-header-v431.event-bear-header-v472{position:relative!important;padding:0!important;margin-bottom:0!important;overflow:hidden!important;background-image:url("assets/img_22767d469133f308.webp?v=472")!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important;border:0!important;box-shadow:none!important;aspect-ratio:3/1!important;min-height:0!important;border-radius:14px!important;}\
body.is-bear-route .event-bear-header-v472::after{display:none!important;}\
body.is-bear-route .event-bear-header-v472>h1,body.is-bear-route .event-bear-header-v472>p{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}\
body.is-crazy-joe-route .crazy-joe-header-img-v461{filter:brightness(1.16) saturate(1.14) contrast(1.04)!important;}\
@media(max-width:760px){body.is-events-route .guide-nav-card.event-bear-v472,body.is-bear-route .event-bear-header-v472{border-radius:12px!important;}}';
  document.head.appendChild(style);

  function applyBearArt(){
    var path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(path==='events.html'){
      document.querySelectorAll('.guide-nav-card[href="bear.html"]').forEach(function(card){
        card.classList.remove('event-bear-v468','event-bear-v469','event-bear-v470','event-bear-v471');
        card.classList.add('event-bear-v472');
        card.setAttribute('aria-label','Охота на медведя');
        card.setAttribute('title','Охота на медведя');
      });
    }
    if(path==='bear.html'){
      var sec=document.querySelector('.page-heading-v424.frost-header-v431');
      if(sec){
        sec.classList.remove('event-bear-header-v468','event-bear-header-v469','event-bear-header-v470','event-bear-header-v471');
        sec.classList.add('event-bear-header-v472');
      }
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyBearArt,{once:true});
  else applyBearArt();
})();
