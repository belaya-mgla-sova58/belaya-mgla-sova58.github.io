!function(){"use strict";
if(window.__sova58OneSignalInit)return;window.__sova58OneSignalInit=1;
var sdk=document.createElement("script");sdk.src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";sdk.defer=true;document.head.appendChild(sdk);
window.OneSignalDeferred=window.OneSignalDeferred||[];
window.OneSignalDeferred.push(async function(OneSignal){
  try{
    await OneSignal.init({
      appId:"072b6603-ca67-49f4-8762-773d2b3968e8",
      serviceWorkerPath:"onesignal/OneSignalSDKWorker.js",
      serviceWorkerParam:{scope:"/onesignal/"}
    });
  }catch(e){console.warn("OneSignal init failed",e)}
});
}();
