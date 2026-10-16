(function(){
  var core=document.createElement('script');
  core.src='site-v269-core-v465.js?v=465';
  core.async=false;
  document.head.appendChild(core);

  var style=document.createElement('style');
  style.id='event-bear-v478-style';
  style.textContent='\
body.is-events-route .guide-nav-card.event-bear-v478{position:relative!important;min-height:0!important;aspect-ratio:2/1!important;padding:0!important;overflow:hidden!important;border-radius:14px!important;background-image:url("assets/bear-approved-v478.webp")!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important;color:transparent!important;font-size:0!important;}\
body.is-bear-route .page-heading-v424.frost-header-v431.event-bear-header-v478{position:relative!important;padding:0!important;overflow:hidden!important;background-image:url("assets/bear-approved-v478.webp")!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important;aspect-ratio:3/1!important;min-height:0!important;border-radius:14px!important;}\
body.is-bear-route .event-bear-header-v478>h1,body.is-bear-route .event-bear-header-v478>p{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}\
@media(max-width:760px){body.is-events-route .guide-nav-card.event-bear-v478,body.is-bear-route .event-bear-header-v478{border-radius:12px!important;}}';
  document.head.appendChild(style);

  function applyBearArt(){
    var path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(path==='events.html'){
      document.querySelectorAll('.guide-nav-card[href="bear.html"]').forEach(function(card){
        card.classList.add('event-bear-v478');
        card.setAttribute('aria-label','Охота на медведя');
        card.setAttribute('title','Охота на медведя');
      });
    }
    if(path==='bear.html'){
      var sec=document.querySelector('.page-heading-v424.frost-header-v431');
      if(sec) sec.classList.add('event-bear-header-v478');
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyBearArt,{once:true});
  else applyBearArt();
})();

(function(){
  var style=document.createElement('style');
  style.id='event-single-frame-v489';
  style.textContent='\
body.is-events-route .guide-nav-card.event-single-frame-v489,\
body.is-events-route .guide-nav-card.event-bear-v478,\
body.is-events-route .guide-nav-card.crazy-joe-card-v462{border:0!important;outline:0!important;box-shadow:none!important;background-color:transparent!important;}\
body.is-events-route .guide-nav-card.event-single-frame-v489::before,\
body.is-events-route .guide-nav-card.event-single-frame-v489::after,\
body.is-events-route .guide-nav-card.event-bear-v478::before,\
body.is-events-route .guide-nav-card.event-bear-v478::after,\
body.is-events-route .guide-nav-card.crazy-joe-card-v462::before,\
body.is-events-route .guide-nav-card.crazy-joe-card-v462::after{display:none!important;content:none!important;border:0!important;box-shadow:none!important;}\
body.is-events-route .guide-nav-card.event-single-frame-v489>span[aria-hidden="true"],\
body.is-events-route .guide-nav-card.event-bear-v478>span[aria-hidden="true"],\
body.is-events-route .guide-nav-card.crazy-joe-card-v462>span[aria-hidden="true"]{display:none!important;}\
body.is-events-route .guide-nav-card.event-single-frame-v489 img,\
body.is-events-route .guide-nav-card.event-bear-v478 img,\
body.is-events-route .guide-nav-card.crazy-joe-card-v462 img{border:0!important;outline:0!important;box-shadow:none!important;}\
.page-heading-v424.frost-header-v431.event-single-frame-v489,\
.page-heading-v424.frost-header-v431.event-bear-header-v478{border:0!important;outline:0!important;box-shadow:none!important;background-color:transparent!important;}\
.page-heading-v424.frost-header-v431.event-single-frame-v489::before,\
.page-heading-v424.frost-header-v431.event-single-frame-v489::after,\
.page-heading-v424.frost-header-v431.event-bear-header-v478::before,\
.page-heading-v424.frost-header-v431.event-bear-header-v478::after{display:none!important;content:none!important;border:0!important;box-shadow:none!important;}\
.page-heading-v424.frost-header-v431.event-single-frame-v489>span[aria-hidden="true"]{display:none!important;}\
.page-heading-v424.frost-header-v431.event-single-frame-v489 img{border:0!important;outline:0!important;box-shadow:none!important;}';
  document.head.appendChild(style);

  function applySingleFrame(){
    document.querySelectorAll('body.is-events-route .guide-nav-card').forEach(function(card){
      if(card.querySelector('img') || card.classList.contains('crazy-joe-card-v462') || card.classList.contains('event-bear-v478')){
        card.classList.remove('event-single-frame-v488');
        card.classList.add('event-single-frame-v489');
      }
    });
    document.querySelectorAll('.page-heading-v424.frost-header-v431').forEach(function(header){
      if(header.querySelector('img') || header.classList.contains('event-bear-header-v478')){
        header.classList.remove('event-single-frame-v488');
        header.classList.add('event-single-frame-v489');
      }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applySingleFrame,{once:true});
  else applySingleFrame();
})();
