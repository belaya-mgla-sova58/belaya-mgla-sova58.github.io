(function(){
  'use strict';
  if('serviceWorker' in navigator){
    window.addEventListener('load',function(){navigator.serviceWorker.register('./service-worker.js?v=634').catch(function(){});},{once:true});
  }
  if(document.body&&document.body.classList.contains('is-events-route')&&!document.querySelector('script[data-event-calendar-auto-v771]')){
    var ec=document.createElement('script');
    ec.src='event-calendar-auto-v770.js?v=771';
    ec.defer=true;
    ec.setAttribute('data-event-calendar-auto-v771','');
    document.head.appendChild(ec);
  }
  if(!document.querySelector('link[data-news-update-reactions-v761]')){var css=document.createElement('link');css.rel='stylesheet';css.href='news-update-reactions-v761.css?v=769';css.setAttribute('data-news-update-reactions-v761','');document.head.appendChild(css);}
  if(!document.querySelector('script[data-news-update-reactions-v760]')){var s=document.createElement('script');s.src='news-update-reactions-v760.js?v=769';s.defer=true;s.setAttribute('data-news-update-reactions-v760','');document.head.appendChild(s);}
  if(!document.querySelector('script[data-news-home-category-v762]')){var h=document.createElement('script');h.src='news-home-category-v762.js?v=769';h.defer=true;h.setAttribute('data-news-home-category-v762','');document.head.appendChild(h);}
  if(!document.querySelector('script[data-halloween-header-v765]')){var header=document.createElement('script');header.src='halloween-header-v765.js?v=769';header.async=false;header.setAttribute('data-halloween-header-v765','');document.head.appendChild(header);}
  if(!document.querySelector('script[data-halloween-header-apply-v765]')){var apply=document.createElement('script');apply.src='halloween-header-apply-v765.js?v=769';apply.async=false;apply.setAttribute('data-halloween-header-apply-v765','');document.head.appendChild(apply);}
  if(!document.querySelector('script[data-news-halloween-card-v764]')){var n=document.createElement('script');n.src='news-halloween-card-v764.js?v=769';n.async=false;n.setAttribute('data-news-halloween-card-v764','');document.head.appendChild(n);}
  if(!document.querySelector('link[data-news-halloween-livefix-v766]')){var halloweenFix=document.createElement('link');halloweenFix.rel='stylesheet';halloweenFix.href='news-halloween-livefix-v766.css?v=769';halloweenFix.setAttribute('data-news-halloween-livefix-v766','');document.head.appendChild(halloweenFix);}
  if(!document.querySelector('script[data-news-halloween-clean-v769]')){var clean=document.createElement('script');clean.src='news-halloween-clean-v769.js?v=769';clean.defer=true;clean.setAttribute('data-news-halloween-clean-v769','');document.head.appendChild(clean);}
})();