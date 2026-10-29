(()=>{
  'use strict';
  const VERSION='20261030-662';

  function removeLegacyHome(){
    if(!document.body||!document.body.classList.contains('is-home-route')) return;
    document.querySelectorAll('.pwa-install-v540').forEach(el=>el.remove());
    const today=document.querySelector('.home-today-v581');
    if(today) today.remove();
  }

  function ensureQuestionnaire(){
    if(!document.body||!document.body.classList.contains('is-home-route')) return;
    if(document.querySelector('.home-alliance-form-v731')) return;
    if(document.querySelector('script[data-repair-alliance-v662]')) return;
    const s=document.createElement('script');
    s.src='home-alliance-questionnaire-v731.js?v='+VERSION;
    s.defer=true;
    s.dataset.repairAllianceV662='1';
    document.head.appendChild(s);
  }

  function freshExpertsLinks(){
    document.querySelectorAll('a[href="experts.html"],a[href^="experts.html?"]').forEach(a=>{
      a.href='experts.html?v='+VERSION;
    });
  }

  function clean(){
    removeLegacyHome();
    ensureQuestionnaire();
    freshExpertsLinks();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',clean,{once:true});
  else clean();
  setTimeout(clean,250);
  setTimeout(clean,1000);
})();