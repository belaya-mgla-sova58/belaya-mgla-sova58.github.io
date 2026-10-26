(function(){
  'use strict';
  if('serviceWorker' in navigator){
    window.addEventListener('load',function(){
      navigator.serviceWorker.register('./service-worker.js?v=634').catch(function(){});
    },{once:true});
  }

  if(!document.querySelector('script[data-news-update-reactions-v760]')){
    var s=document.createElement('script');
    s.src='news-update-reactions-v760.js?v=760';
    s.defer=true;
    s.setAttribute('data-news-update-reactions-v760','');
    document.head.appendChild(s);
  }
})();
