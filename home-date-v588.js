(function(){
  'use strict';

  var OWL_VERSION='20261030-activeowl3';
  var RUNES_VERSION='20261030-runes3';
  var SMOOTH_VERSION='20261030-smooth1';
  var VISUAL_VERSION='20261030-visual4';

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
    if(!img.getAttribute('src')) img.src='assets/home-hero-polish-v446.webp?v=630';
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

  function ensureOwlSizeOverride(){
    if(document.getElementById('owlSizeOverrideV588')) return;
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
    if(current&&current.getAttribute('data-owl-version')===OWL_VERSION) return;
    if(current) current.remove();
    ['dismissOwlV4','orbModalV4'].forEach(function(id){var el=document.getElementById(id);if(el)el.remove();});
    var s=document.createElement('script');
    s.src='owl-widget-v4.js?v='+OWL_VERSION;
    s.defer=true;
    s.dataset.owlFortuneV4='1';
    document.head.appendChild(s);
  }

  function addFrameScript(doc,id,src){
    if(doc.getElementById(id)) return;
    var s=doc.createElement('script');
    s.id=id;
    s.async=false;
    s.src=src;
    doc.head.appendChild(s);
  }

  function enhanceFrame(frame){
    if(!frame) return false;
    var inject=function(){
      try{
        var doc=frame.contentDocument;
        if(!doc||!doc.head) return false;
        addFrameScript(doc,'runeRarityLoaderV1','orb-rune-rarity-v1.js?v='+RUNES_VERSION);
        addFrameScript(doc,'realRunesLoaderV1','orb-runes-v1.js?v='+RUNES_VERSION);
        addFrameScript(doc,'orbSmoothPrepLoaderV1','orb-smooth-prep-v1.js?v='+SMOOTH_VERSION);
        addFrameScript(doc,'orbVisualLoaderV2','orb-visual-v2.js?v='+VISUAL_VERSION);
        return true;
      }catch(e){return false}
    };
    if(!frame.dataset.owlEnhancementsV588){
      frame.dataset.owlEnhancementsV588='1';
      frame.addEventListener('load',function(){setTimeout(inject,80)});
    }
    inject();
    return true;
  }

  function watchOrbFrame(){
    var found=function(){return enhanceFrame(document.querySelector('#orbModalV4 .owl-frame-v4'))};
    if(found()) return;
    var root=document.body||document.documentElement;
    if(!root) return;
    var observer=new MutationObserver(function(){
      if(found()) observer.disconnect();
    });
    observer.observe(root,{childList:true,subtree:true});
    setTimeout(function(){observer.disconnect();found()},4000);
  }

  function init(){
    ensureHomeHero();
    ensureOwlSizeOverride();
    loadFortuneOwlV4();
    watchOrbFrame();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.addEventListener('load',ensureHomeHero,{once:true});
})();