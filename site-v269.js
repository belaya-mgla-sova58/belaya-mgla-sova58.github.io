(function(){
  var core=document.createElement('script');
  core.src='site-v269-core-v465.js?v=465';
  core.async=false;
  document.head.appendChild(core);

  var EVENTS={
    'bear.html':{title:'Охота на медведя',i:0},
    'mercenary-prestige.html':{title:'Престиж наёмника',i:1},
    'frostfire-mine.html':{title:'Рудник ледяного огня',i:2},
    'endless-trial.html':{title:'Бесконечное испытание',i:3},
    'tundra-trade-route.html':{title:'Торговый путь в тундре',i:4},
    'alliance-showdown.html':{title:'Сражение альянсов',i:5},
    'fishing.html':{title:'Рыбалка',i:6}
  };
  function pos(i){return (i*100/6)+'%';}

  var style=document.createElement('style');
  style.id='event-headers-v466-style';
  style.textContent='\
body.is-events-route .guide-nav-card.event-art-card-v466{position:relative!important;min-height:0!important;aspect-ratio:2/1!important;padding:0!important;overflow:hidden!important;border-radius:14px!important;border:1px solid rgba(108,205,255,.35)!important;background-image:url("assets/events-cards-sprite-v466.jpg")!important;background-repeat:no-repeat!important;background-size:100% 700%!important;color:transparent!important;font-size:0!important;box-shadow:0 10px 24px rgba(0,8,24,.22)!important;}\
body.is-events-route .guide-nav-card.event-art-card-v466::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 65%,rgba(3,20,38,.10));pointer-events:none;}\
.event-image-header-v466{position:relative!important;padding:0!important;overflow:hidden!important;background-image:url("assets/events-headers-sprite-v466.jpg")!important;background-repeat:no-repeat!important;background-size:100% 700%!important;border:0!important;box-shadow:none!important;aspect-ratio:3/1!important;min-height:0!important;}\
.event-image-header-v466>h1,.event-image-header-v466>p{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}\
@media(max-width:760px){body.is-events-route .guide-nav-card.event-art-card-v466{border-radius:12px!important}.event-image-header-v466{border-radius:12px!important;}}';
  document.head.appendChild(style);

  function applyEventArt(){
    var path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(path==='events.html'){
      Object.keys(EVENTS).forEach(function(href){
        var cfg=EVENTS[href];
        document.querySelectorAll('.guide-nav-card[href="'+href+'"]').forEach(function(card){
          card.classList.add('event-art-card-v466');
          card.style.backgroundPosition='center '+pos(cfg.i);
          card.setAttribute('aria-label',cfg.title);
          card.setAttribute('title',cfg.title);
        });
      });
    }
    var cfg=EVENTS[path];
    if(cfg){
      var sec=document.querySelector('.page-heading-v424.frost-header-v431');
      if(sec){
        sec.classList.add('event-image-header-v466');
        sec.style.backgroundPosition='center '+pos(cfg.i);
      }
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyEventArt,{once:true});
  else applyEventArt();
})();
