(function(){
  function updateHomeDate(){
    var el=document.getElementById('homeTodayDateV581');
    if(!el) return;
    var now=new Date();
    var day=now.getDate();
    var month=now.toLocaleDateString('ru-RU',{month:'long'});
    el.textContent='Сегодня: '+day+' '+month;
  }

  function ensureHomeHero(){
    var hero=document.querySelector('.home-stamped-hero-v441');
    if(!hero) return false;
    var img=hero.querySelector('.home-stamped-img-v441');
    if(!img){
      img=document.createElement('img');
      img.alt='Независимый сайт с гайдами по Белой мгле от SOVA58';
      img.className='home-stamped-img-v441';
      img.decoding='async';
      img.fetchPriority='high';
      hero.innerHTML='';
      hero.appendChild(img);
    }
    img.src='assets/home-hero-polish-v446.webp?v=630';
    hero.hidden=false;
    hero.removeAttribute('aria-hidden');
    hero.style.setProperty('display','block','important');
    hero.style.setProperty('visibility','visible','important');
    hero.style.setProperty('opacity','1','important');
    hero.style.setProperty('min-height','1px','important');
    img.hidden=false;
    img.style.setProperty('display','block','important');
    img.style.setProperty('visibility','visible','important');
    img.style.setProperty('opacity','1','important');
    img.style.setProperty('width','100%','important');
    img.style.setProperty('height','auto','important');
    img.style.setProperty('max-width','100%','important');
    return true;
  }

  function init(){
    try{updateHomeDate();}catch(e){}
    var attempts=0;
    function restore(){
      attempts++;
      try{ensureHomeHero();}catch(e){}
      if(attempts<12) setTimeout(restore,250);
    }
    restore();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init,{once:true});
  }else{
    init();
  }
})();

(function(){
  function loadFortuneOwlV2(){
    document.querySelectorAll('script[data-owl-fortune-v5],script[data-owl-fortune-v2],script[src*="owl-widget-v1.js"],script[src*="owl-fortune-v933.js"]').forEach(function(el){el.remove();});
    ['owlButton','dismissOwl','orbModal','fortuneOwlV933','fortuneOwlV932','fortuneOwlV931','sova58FortuneOwlV2','sova58FortunePanel','sova58FortuneBackdrop'].forEach(function(id){
      var el=document.getElementById(id);
      if(el) el.remove();
    });
    if(document.getElementById('owlButtonV2')) return;
    var s=document.createElement('script');
    s.src='owl-widget-v2.js?v=20261030-restored3';
    s.defer=true;
    s.dataset.owlFortuneV2='1';
    document.head.appendChild(s);
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',loadFortuneOwlV2,{once:true});
  }else{
    loadFortuneOwlV2();
  }
})();
