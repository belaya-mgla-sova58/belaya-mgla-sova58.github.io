(function(){
'use strict';
if(!('serviceWorker' in navigator)) return;
var onceKey='sova58-sw-refresh-v702';
function reloadOnce(){
  try{
    if(sessionStorage.getItem(onceKey)) return;
    sessionStorage.setItem(onceKey,'1');
  }catch(e){}
  location.reload();
}
navigator.serviceWorker.addEventListener('controllerchange',reloadOnce,{once:true});
navigator.serviceWorker.register('./service-worker.js?v=702',{updateViaCache:'none'}).then(function(reg){
  try{reg.update();}catch(e){}
  if(reg.waiting){try{reg.waiting.postMessage('SKIP_WAITING');}catch(e){}}
}).catch(function(){});
})();
