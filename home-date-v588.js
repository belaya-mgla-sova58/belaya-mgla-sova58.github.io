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
  function loadStaticHQ(){
    if(document.getElementById('sova58-fortune-static-hq-v1')) return;
    var h=document.createElement('script');
    h.id='sova58-fortune-static-hq-v1';
    h.src='owl-fortune-static-hq-v1.js?v=20261028-hq3';
    h.defer=true;
    document.head.appendChild(h);
  }
  function loadStatesV3(){
    var old=document.getElementById('sova58-fortune-states-v3');
    if(old){
      if(window.__sova58FortuneStatesV3) loadStaticHQ();
      else{
        old.addEventListener('load',loadStaticHQ,{once:true});
        old.addEventListener('error',loadStaticHQ,{once:true});
        setTimeout(loadStaticHQ,500);
      }
      return;
    }
    var x=document.createElement('script');
    x.id='sova58-fortune-states-v3';
    x.src='owl-fortune-states-v3.js?v=20261028-owlfix-2';
    x.defer=true;
    x.onload=loadStaticHQ;
    x.onerror=loadStaticHQ;
    document.head.appendChild(x);
  }
  if(!document.getElementById('sova58-fortune-loader')){
    var s=document.createElement('script');
    s.id='sova58-fortune-loader';
    s.src='owl-fortune-v1.js?v=20261028-9';
    s.defer=true;
    s.onload=loadStatesV3;
    s.onerror=loadStatesV3;
    document.head.appendChild(s);
  }else{
    loadStatesV3();
  }
})();
