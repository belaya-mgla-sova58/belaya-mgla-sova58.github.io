(function(){
  var core=document.createElement('script');
  core.src='site-v269-core-v465.js?v=465';
  core.async=false;
  document.head.appendChild(core);

  var style=document.createElement('style');
  style.id='event-bear-v470-style';
  style.textContent='\
body.is-events-route .guide-nav-card.event-bear-v470{position:relative!important;min-height:0!important;aspect-ratio:2/1!important;padding:0!important;overflow:hidden!important;border-radius:14px!important;border:0!important;background-image:url("assets/events-cards-sprite-v466.jpg?v=470")!important;background-position:0 0!important;background-size:100% 700%!important;background-repeat:no-repeat!important;color:transparent!important;font-size:0!important;box-shadow:0 10px 24px rgba(0,8,24,.22)!important;}\
body.is-events-route .guide-nav-card.event-bear-v470::after{display:none!important;}\
body.is-bear-route .page-heading-v424.frost-header-v431.event-bear-header-v470{position:relative!important;padding:0!important;margin-bottom:0!important;overflow:hidden!important;background-image:url("assets/events-headers-sprite-v466.jpg?v=470")!important;background-position:0 0!important;background-size:100% 700%!important;background-repeat:no-repeat!important;border:0!important;box-shadow:none!important;aspect-ratio:3/1!important;min-height:0!important;border-radius:14px!important;}\
body.is-bear-route .event-bear-header-v470::after{display:none!important;}\
body.is-bear-route .event-bear-header-v470>h1,body.is-bear-route .event-bear-header-v470>p{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}\
body.is-crazy-joe-route .crazy-joe-header-img-v461{filter:brightness(1.16) saturate(1.14) contrast(1.04)!important;}\
@media(max-width:760px){body.is-events-route .guide-nav-card.event-bear-v470,body.is-bear-route .event-bear-header-v470{border-radius:12px!important;}}';
  document.head.appendChild(style);

  function applyBearArt(){
    var path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(path==='events.html'){
      document.querySelectorAll('.guide-nav-card[href="bear.html"]').forEach(function(card){
        card.classList.remove('event-bear-v468','event-bear-v469');
        card.classList.add('event-bear-v470');
        card.setAttribute('aria-label','Охота на медведя');
        card.setAttribute('title','Охота на медведя');
      });
    }
    if(path==='bear.html'){
      var sec=document.querySelector('.page-heading-v424.frost-header-v431');
      if(sec){
        sec.classList.remove('event-bear-header-v468','event-bear-header-v469');
        sec.classList.add('event-bear-header-v470');
      }
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyBearArt,{once:true});
  else applyBearArt();
})();
