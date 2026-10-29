(function(){
  'use strict';
  window.__sova58FortuneStatesV3=true;
  function cleanLegacy(){
    ['sova58FortuneOwlV2','sova58FortunePanel','sova58FortuneBackdrop'].forEach(function(id){var el=document.getElementById(id);if(el)el.remove();});
    ['sova58FortuneStatesStyleV3','sova58FortuneStaticHQStyleV1'].forEach(function(id){var el=document.getElementById(id);if(el)el.remove();});
  }
  function loadApproved(){
    cleanLegacy();
    if(document.getElementById('fortuneOwlV932')||document.querySelector('script[data-owl-approved-v932]'))return;
    var s=document.createElement('script');
    s.src='https://belaya-mgla-sova58.github.io/owl-fortune-v932.js?v=20261029-right3';
    s.defer=true;
    s.dataset.owlApprovedV932='1';
    document.head.appendChild(s);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadApproved,{once:true});else loadApproved();
})();
