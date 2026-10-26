(function(){
  'use strict';
  if('serviceWorker' in navigator){
    window.addEventListener('load',function(){
      navigator.serviceWorker.register('./service-worker.js?v=634').catch(function(){});
    },{once:true});
  }

  if(!document.querySelector('link[data-news-update-reactions-v761]')){
    var css=document.createElement('link');
    css.rel='stylesheet';
    css.href='news-update-reactions-v761.css?v=764';
    css.setAttribute('data-news-update-reactions-v761','');
    document.head.appendChild(css);
  }

  if(!document.querySelector('script[data-news-update-reactions-v760]')){
    var s=document.createElement('script');
    s.src='news-update-reactions-v760.js?v=764';
    s.defer=true;
    s.setAttribute('data-news-update-reactions-v760','');
    document.head.appendChild(s);
  }

  if(!document.querySelector('script[data-news-home-category-v762]')){
    var h=document.createElement('script');
    h.src='news-home-category-v762.js?v=764';
    h.defer=true;
    h.setAttribute('data-news-home-category-v762','');
    document.head.appendChild(h);
  }

  if(!document.querySelector('script[data-news-halloween-card-v764]')){
    var n=document.createElement('script');
    n.src='news-halloween-card-v764.js?v=764';
    n.defer=true;
    n.setAttribute('data-news-halloween-card-v764','');
    document.head.appendChild(n);
  }
})();
