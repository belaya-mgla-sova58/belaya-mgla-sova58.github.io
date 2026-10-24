(function(){
  'use strict';
  if(!('serviceWorker' in navigator))return;
  window.addEventListener('load',function(){
    navigator.serviceWorker.register('./service-worker.js?v=634').catch(function(){});
  },{once:true});
})();
