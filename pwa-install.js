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
    css.href='news-update-reactions-v761.css?v=765';
    css.setAttribute('data-news-update-reactions-v761','');
    document.head.appendChild(css);
  }

  if(!document.querySelector('script[data-news-update-reactions-v760]')){
    var s=document.createElement('script');
    s.src='news-update-reactions-v760.js?v=765';
    s.defer=true;
    s.setAttribute('data-news-update-reactions-v760','');
    document.head.appendChild(s);
  }

  if(!document.querySelector('script[data-news-home-category-v762]')){
    var h=document.createElement('script');
    h.src='news-home-category-v762.js?v=765';
    h.defer=true;
    h.setAttribute('data-news-home-category-v762','');
    document.head.appendChild(h);
  }

  if(!document.querySelector('script[data-halloween-header-v765]')){
    var header=document.createElement('script');
    header.src='halloween-header-v765.js?v=765';
    header.async=false;
    header.setAttribute('data-halloween-header-v765','');
    document.head.appendChild(header);
  }

  if(!document.querySelector('script[data-halloween-header-apply-v765]')){
    var apply=document.createElement('script');
    apply.src='halloween-header-apply-v765.js?v=765';
    apply.async=false;
    apply.setAttribute('data-halloween-header-apply-v765','');
    document.head.appendChild(apply);
  }

  if(!document.querySelector('script[data-news-halloween-card-v764]')){
    var n=document.createElement('script');
    n.src='news-halloween-card-v764.js?v=765';
    n.async=false;
    n.setAttribute('data-news-halloween-card-v764','');
    document.head.appendChild(n);
  }
})();
