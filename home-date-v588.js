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

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();

(function(){
  function ensureOwlSizeOverride(){
    var old=document.getElementById('owlSizeOverrideV588');
    if(old) old.remove();
    var st=document.createElement('style');
    st.id='owlSizeOverrideV588';
    st.textContent='#owlButtonV4.owl-corner-v4{width:115px!important;height:169px!important;right:7px!important;bottom:96px!important}#owlButtonV4.owl-corner-v4.sleeping{width:115px!important;height:115px!important;bottom:102px!important}#dismissOwlV4.owl-dismiss-v4{bottom:180px!important}@media(max-width:640px){#owlButtonV4.owl-corner-v4{width:115px!important;height:169px!important;right:7px!important;bottom:96px!important}#owlButtonV4.owl-corner-v4.sleeping{width:115px!important;height:115px!important;bottom:102px!important}#dismissOwlV4.owl-dismiss-v4{bottom:180px!important}}';
    document.head.appendChild(st);
  }

  function loadFortuneOwlV4(){
    ensureOwlSizeOverride();
    document.querySelectorAll('script[data-owl-fortune-v5],script[data-owl-fortune-v2],script[data-owl-fortune-v3],script[data-owl-fortune-v4],script[src*="owl-widget-v1.js"],script[src*="owl-widget-v2.js"],script[src*="owl-widget-v3.js"],script[src*="owl-fortune-v933.js"]').forEach(function(el){el.remove();});
    ['owlButton','dismissOwl','orbModal','fortuneOwlV933','fortuneOwlV932','fortuneOwlV931','sova58FortuneOwlV2','sova58FortunePanel','sova58FortuneBackdrop','owlButtonV2','dismissOwlV2','orbModalV2','owlButtonV3','dismissOwlV3','orbModalV3'].forEach(function(id){var el=document.getElementById(id);if(el)el.remove();});
    var current=document.getElementById('owlButtonV4');
    if(current&&current.getAttribute('data-owl-version')==='20261030-activeowl3') return;
    if(current) current.remove();
    ['dismissOwlV4','orbModalV4'].forEach(function(id){var el=document.getElementById(id);if(el)el.remove();});
    var s=document.createElement('script');
    s.src='owl-widget-v4.js?v=20261030-activeowl3';
    s.defer=true;
    s.dataset.owlFortuneV4='1';
    document.head.appendChild(s);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadFortuneOwlV4,{once:true});
  else loadFortuneOwlV4();
})();

(function(){
  var RUNES_VERSION='20261030-runes1';
  function injectRealRunes(){
    var frame=document.querySelector('#orbModalV4 .owl-frame-v4');
    if(!frame) return false;
    try{
      var doc=frame.contentDocument;
      if(!doc||!doc.head) return false;
      if(doc.getElementById('realRunesLoaderV1')) return true;
      var s=doc.createElement('script');
      s.id='realRunesLoaderV1';
      s.src='orb-runes-v1.js?v='+RUNES_VERSION;
      doc.head.appendChild(s);
      return true;
    }catch(e){return false}
  }
  function bind(){
    var frame=document.querySelector('#orbModalV4 .owl-frame-v4');
    if(frame&&!frame.dataset.realRunesBound){
      frame.dataset.realRunesBound='1';
      frame.addEventListener('load',function(){setTimeout(injectRealRunes,80)});
    }
    injectRealRunes();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
  setTimeout(bind,350);
  setTimeout(bind,1000);
  setTimeout(bind,2200);
})();