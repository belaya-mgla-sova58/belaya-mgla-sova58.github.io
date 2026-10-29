(function(){
  'use strict';
  function clean(){
    document.querySelectorAll('#sova58FortuneOwlV2,#sova58FortunePanel,#sova58FortuneBackdrop,#fortuneOwlV931,.fortune-overlay-v931,.fortune-owl-hint-v931,#fortuneOwlV932,.fortune-overlay-v932,.fortune-hint-v932').forEach(function(el){el.remove();});
  }
  function load(){
    clean();
    if(document.getElementById('fortuneOwlV933')||document.querySelector('script[data-owl-fortune-v933]'))return;
    var s=document.createElement('script');
    s.src='https://belaya-mgla-sova58.github.io/owl-fortune-v933.js?v=20261029-right4';
    s.defer=true;
    s.dataset.owlFortuneV933='1';
    document.head.appendChild(s);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();
