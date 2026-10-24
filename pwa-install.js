(function(){
  const legacyCard = document.querySelector('.pwa-install-v540');
  if (legacyCard) legacyCard.style.setProperty('display','none','important');

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js?v=586').catch(()=>{}));
  }
})();
