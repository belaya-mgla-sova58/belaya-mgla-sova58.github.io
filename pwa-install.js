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
    css.href='news-update-reactions-v761.css?v=761';
    css.setAttribute('data-news-update-reactions-v761','');
    document.head.appendChild(css);
  }

  if(!document.querySelector('script[data-news-update-reactions-v760]')){
    var s=document.createElement('script');
    s.src='news-update-reactions-v760.js?v=760';
    s.defer=true;
    s.setAttribute('data-news-update-reactions-v760','');
    document.head.appendChild(s);
  }

  if(!document.querySelector('script[data-news-home-category-v762]')){
    var h=document.createElement('script');
    h.src='news-home-category-v762.js?v=762';
    h.defer=true;
    h.setAttribute('data-news-home-category-v762','');
    document.head.appendChild(h);
  }
})();
