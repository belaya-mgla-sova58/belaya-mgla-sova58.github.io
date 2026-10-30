(()=>{
  'use strict';
  const VERSION='20261030-activeowl3';
  const WORKER='./service-worker.js?v=681-audit1';

  function ensurePerformanceCSS(){
    if(document.getElementById('sitePerformanceV1')) return;
    const link=document.createElement('link');
    link.id='sitePerformanceV1';
    link.rel='stylesheet';
    link.href='site-performance-v1.css?v=20261030-perf1';
    document.head.appendChild(link);
  }

  function registerFreshWorker(){
    if(!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register(WORKER,{updateViaCache:'none'}).catch(()=>{});
  }

  function ensureOwlBlinkFix(){
    if(document.getElementById('owlBlinkEyesOnlyV662')) return;
    const st=document.createElement('style');
    st.id='owlBlinkEyesOnlyV662';
    st.textContent=`
      #owlButtonV4:not(.sleeping) #owlOpenV4{opacity:1!important}
      #owlButtonV4:not(.sleeping) #owlBlinkV4{
        -webkit-mask-image:radial-gradient(ellipse 14% 8% at 49% 23.5%,#000 0 72%,rgba(0,0,0,.9) 82%,transparent 100%),radial-gradient(ellipse 14% 8% at 65% 25.5%,#000 0 72%,rgba(0,0,0,.9) 82%,transparent 100%);
        mask-image:radial-gradient(ellipse 14% 8% at 49% 23.5%,#000 0 72%,rgba(0,0,0,.9) 82%,transparent 100%),radial-gradient(ellipse 14% 8% at 65% 25.5%,#000 0 72%,rgba(0,0,0,.9) 82%,transparent 100%);
        -webkit-mask-repeat:no-repeat,no-repeat;
        mask-repeat:no-repeat,no-repeat;
      }
      #owlButtonV4.sleeping #owlOpenV4,#owlButtonV4.sleeping #owlBlinkV4{opacity:0!important}
    `;
    document.head.appendChild(st);
  }

  function removeLegacyHome(){
    if(!document.body||!document.body.classList.contains('is-home-route')) return;
    document.querySelectorAll('.pwa-install-v540').forEach(el=>el.remove());
    const today=document.querySelector('.home-today-v581');
    if(today) today.remove();
    const todayStyle=document.getElementById('home-today-v581-style');
    if(todayStyle) todayStyle.remove();
  }

  function ensureQuestionnaire(){
    if(!document.body||!document.body.classList.contains('is-home-route')) return;
    if(document.querySelector('.home-alliance-form-v731')) return;
    if(document.querySelector('script[src*="home-alliance-questionnaire-v731.js"]')) return;
    const s=document.createElement('script');
    s.src='home-alliance-questionnaire-v731.js?v='+VERSION;
    s.defer=true;
    s.dataset.repairAllianceV662='1';
    document.head.appendChild(s);
  }

  function ensureFortuneOwl(){
    if(!document.body||!document.body.classList.contains('is-home-route')) return;
    ensureOwlBlinkFix();
    const current=document.getElementById('owlButtonV4');
    const valid=current&&current.getAttribute('data-owl-version')===VERSION&&document.getElementById('owlOpenV4')&&document.getElementById('owlBlinkV4')&&document.getElementById('owlSleepV4');
    if(valid) return;
    if(document.querySelector('script[src*="owl-widget-v4.js"]')) return;
    ['owlButtonV2','dismissOwlV2','orbModalV2','owlButtonV3','dismissOwlV3','orbModalV3'].forEach(id=>{const el=document.getElementById(id);if(el)el.remove();});
    ['owlWidgetV2Style','owlWidgetV3Style'].forEach(id=>{const el=document.getElementById(id);if(el)el.remove();});
    const s=document.createElement('script');
    s.src='owl-widget-v4.js?v='+VERSION;
    s.defer=true;
    s.dataset.repairOwlV662='1';
    document.head.appendChild(s);
  }

  function ensureThirdHold(){
    if(!document.body||!document.body.classList.contains('is-home-route')) return;
    if(document.getElementById('orbThirdHoldLoaderV1')||document.querySelector('script[src*="orb-third-hold-v1.js"]')) return;
    const s=document.createElement('script');
    s.id='orbThirdHoldLoaderV1';
    s.src='owl-fortune/orb-third-hold-v1.js?v=20261030-thirdhold1';
    s.defer=true;
    document.head.appendChild(s);
  }

  function injectFrameExtras(frame){
    if(!frame) return false;
    const inject=()=>{
      try{
        const doc=frame.contentDocument;
        if(!doc||!doc.head) return false;
        if(!doc.getElementById('runeSystemLoaderV1')){
          const rune=document.createElement('script');
          rune.id='runeSystemLoaderV1';
          rune.src='rune-system-v1.js?v=20261030-runes3';
          doc.head.appendChild(rune);
        }
        if(!doc.getElementById('orbHelpLoaderV1')){
          const help=document.createElement('script');
          help.id='orbHelpLoaderV1';
          help.src='orb-help-v1.js?v=20261030-help1';
          doc.head.appendChild(help);
        }
        return true;
      }catch(e){return false}
    };
    if(!frame.dataset.repairExtrasV662){
      frame.dataset.repairExtrasV662='1';
      frame.addEventListener('load',()=>setTimeout(inject,100));
    }
    inject();
    return true;
  }

  function watchHomeExtras(){
    if(!document.body||!document.body.classList.contains('is-home-route')) return;
    ensureThirdHold();
    const found=()=>injectFrameExtras(document.querySelector('#orbModalV4 .owl-frame-v4'));
    if(found()) return;
    const observer=new MutationObserver(()=>{if(found()) observer.disconnect()});
    observer.observe(document.body,{childList:true,subtree:true});
    setTimeout(()=>{observer.disconnect();ensureFortuneOwl();found()},3500);
  }

  function cleanExperts(){
    if(!document.body||!document.body.classList.contains('is-experts-route')) return;
    document.querySelectorAll('.wave-copy small').forEach(el=>el.remove());
    const intro=document.querySelector('.experts-head p:not(.sova58-byline)');
    if(intro) intro.textContent='Выбери нужного эксперта.';
    document.querySelectorAll('.wave-arrow').forEach(el=>{
      el.textContent='';
      el.setAttribute('aria-hidden','true');
    });
    const old=document.getElementById('expertsCleanV1');
    if(old) old.remove();
    let link=document.getElementById('expertsPolishV1');
    if(!link){
      link=document.createElement('link');
      link.id='expertsPolishV1';
      link.rel='stylesheet';
      document.head.appendChild(link);
    }
    link.href='experts-polish-v1.css?v=20261030-polish2';
  }

  function init(){
    ensurePerformanceCSS();
    registerFreshWorker();
    if(!document.body) return;
    if(document.body.classList.contains('is-home-route')){
      ensureOwlBlinkFix();
      removeLegacyHome();
      ensureQuestionnaire();
      watchHomeExtras();
    }else if(document.body.classList.contains('is-experts-route')){
      cleanExperts();
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();