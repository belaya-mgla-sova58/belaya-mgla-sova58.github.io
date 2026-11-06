!function(){'use strict';
var APP_ID='072b6603-ca67-49f4-8762-773d2b3968e8';
function findCard(){return document.querySelector('.notify-test-v630')}
function applyEnabled(id){var card=findCard();if(!card)return false;var btn=card.querySelector('.notify-btn-v630'),icon=card.querySelector('.notify-icon-v630'),status=card.querySelector('.notify-status-v630');if(icon){icon.classList.remove('is-ringing','is-error');icon.classList.add('is-on')}if(btn){btn.disabled=true;btn.textContent='✅ Уведомления включены'}if(status)status.textContent=id?'Телефон подключён к уведомлениям Белой Мглы. ID: '+String(id).slice(0,12)+'…':'Телефон подключён к уведомлениям Белой Мглы.';return true}
function state(OS){try{var p=OS.User&&OS.User.PushSubscription;return{id:p&&p.id||'',optedIn:!!(p&&p.optedIn)}}catch(e){return{id:'',optedIn:false}}}
function restore(){if(!('Notification'in window)||Notification.permission!=='granted')return;window.OneSignalDeferred=window.OneSignalDeferred||[];window.OneSignalDeferred.push(async function(OS){try{try{await OS.init({appId:APP_ID,serviceWorkerPath:'/OneSignalSDKWorker.js',serviceWorkerParam:{scope:'/'}})}catch(e){}var n=0,t=setInterval(function(){var s=state(OS);if((s.id&&s.optedIn)||++n>=32){clearInterval(t);if(s.id&&s.optedIn)applyEnabled(s.id)}},250)}catch(e){}});if(!document.querySelector('script[src*="OneSignalSDK.page.js"]')){var s=document.createElement('script');s.src='https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';s.defer=true;document.head.appendChild(s)}}
function start(){var n=0,t=setInterval(function(){if(findCard()){clearInterval(t);restore()}else if(++n>=80)clearInterval(t)},100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
}();
