(function(){
  'use strict';
  function apply(){
    var src=window.BM_HALLOWEEN_HEADER_V765;
    if(!src)return;
    document.querySelectorAll('img').forEach(function(img){
      var current=img.getAttribute('src')||'';
      if(current.indexOf('halloween-header-2026-v764.webp')!==-1){
        img.src=src;
        img.removeAttribute('srcset');
        img.setAttribute('data-halloween-header-v765','1');
      }
    });
  }
  function start(){
    apply();
    var obs=new MutationObserver(function(){apply();});
    obs.observe(document.documentElement,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
