(function(){
  var core=document.createElement('script');
  core.src='site-v269-core-v465.js?v=465';
  core.async=false;
  document.head.appendChild(core);

  var style=document.createElement('style');
  style.id='event-bear-v478-style';
  style.textContent='\
body.is-events-route .guide-nav-card.event-bear-v478{position:relative!important;min-height:0!important;aspect-ratio:2/1!important;padding:0!important;overflow:hidden!important;border-radius:14px!important;border:1px solid rgba(108,205,255,.35)!important;background-image:url("assets/bear-approved-v478.webp")!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important;color:transparent!important;font-size:0!important;box-shadow:0 10px 24px rgba(0,8,24,.22)!important;}\
body.is-events-route .guide-nav-card.event-bear-v478::after{content:"";position:absolute;inset:9px;border:1px solid rgba(220,245,255,.55);border-radius:12px;pointer-events:none;}\
body.is-bear-route .page-heading-v424.frost-header-v431.event-bear-header-v478{position:relative!important;padding:0!important;overflow:hidden!important;background-image:url("assets/bear-approved-v478.webp")!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important;border:0!important;box-shadow:none!important;aspect-ratio:3/1!important;min-height:0!important;border-radius:14px!important;}\
body.is-bear-route .event-bear-header-v478::after{content:"";position:absolute;inset:14px;border:0;border-top:1px solid rgba(220,245,255,.55);border-left:1px solid rgba(220,245,255,.55);border-right:1px solid rgba(220,245,255,.55);border-radius:14px;pointer-events:none;}\
body.is-bear-route .event-bear-header-v478>h1,body.is-bear-route .event-bear-header-v478>p{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}\
@media(max-width:760px){body.is-events-route .guide-nav-card.event-bear-v478,body.is-bear-route .event-bear-header-v478{border-radius:12px!important;}body.is-events-route .guide-nav-card.event-bear-v478::after{inset:7px;border-radius:10px;}body.is-bear-route .event-bear-header-v478::after{inset:9px;border-radius:11px;}}';
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
  style.id='event-single-frame-v488';
  style.textContent='\
body.is-events-route .guide-nav-card.event-bear-v478{border:0!important;outline:0!important;box-shadow:none!important;}\
body.is-events-route .guide-nav-card.event-bear-v478::after{display:none!important;content:none!important;}\
body.is-bear-route .event-bear-header-v478::after{display:none!important;content:none!important;}\
body.is-events-route .guide-nav-card.crazy-joe-card-v462{border:0!important;outline:0!important;box-shadow:none!important;}\
body.is-events-route .guide-nav-card.crazy-joe-card-v462::after{display:none!important;content:none!important;}\
body.is-events-route .guide-nav-card.event-single-frame-v488{border:0!important;outline:0!important;box-shadow:none!important;background-color:transparent!important;}\
body.is-events-route .guide-nav-card.event-single-frame-v488>span[aria-hidden="true"]{display:none!important;}\
.page-heading-v424.frost-header-v431.event-single-frame-v488{border:0!important;outline:0!important;box-shadow:none!important;background-color:transparent!important;}\
.page-heading-v424.frost-header-v431.event-single-frame-v488::after{display:none!important;content:none!important;}\
.page-heading-v424.frost-header-v431.event-single-frame-v488>span[aria-hidden="true"]{display:none!important;}';
  document.head.appendChild(style);

  function applySingleFrame(){
    document.querySelectorAll('body.is-events-route .guide-nav-card').forEach(function(card){
      if(card.querySelector('img') || card.classList.contains('crazy-joe-card-v462') || card.classList.contains('event-bear-v478')){
        card.classList.add('event-single-frame-v488');
      }
    });
    document.querySelectorAll('.page-heading-v424.frost-header-v431').forEach(function(header){
      if(header.querySelector('img') || header.classList.contains('event-bear-header-v478')){
        header.classList.add('event-single-frame-v488');
      }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applySingleFrame,{once:true});
  else applySingleFrame();
})();
