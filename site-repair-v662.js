(()=>{
  'use strict';
  const VERSION='20261030-activeowl3';
  const WORKER='./service-worker.js?v=678-thirdhold1';
  const RESET_KEY='belaya_mgla_orb_reset_keep2_v4';

  function resetFortuneCounterOnce(){
    try{
      if(localStorage.getItem(RESET_KEY)==='1') return;
      localStorage.removeItem('belaya_mgla_orb_phrases_v1');
      localStorage.setItem('belaya_mgla_orb_total_v1','2');
      localStorage.setItem(RESET_KEY,'1');
    }catch(e){}
  }
  resetFortuneCounterOnce();

  function registerFreshWorker(){
    if(!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register(WORKER,{updateViaCache:'none'}).catch(()=>{});
  }
  registerFreshWorker();
  window.addEventListener('load',()=>setTimeout(registerFreshWorker,300),{once:true});
  setTimeout(registerFreshWorker,1400);

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
  ensureOwlBlinkFix();

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

  function ensureFortuneOwl(){
    if(!document.body||!document.body.classList.contains('is-home-route')) return;
    ensureOwlBlinkFix();
    const current=document.getElementById('owlButtonV4');
    const valid=current&&current.getAttribute('data-owl-version')===VERSION&&document.getElementById('owlOpenV4')&&document.getElementById('owlBlinkV4')&&document.getElementById('owlSleepV4');
    if(valid) return;
    ['owlButtonV2','dismissOwlV2','orbModalV2','owlButtonV3','dismissOwlV3','orbModalV3','owlButtonV4','dismissOwlV4','orbModalV4'].forEach(id=>{const el=document.getElementById(id);if(el)el.remove();});
    document.querySelectorAll('script[data-owl-fortune-v2],script[data-owl-fortune-v3],script[data-owl-fortune-v4],script[data-repair-owl-v662],script[src*="owl-widget-v2.js"],script[src*="owl-widget-v3.js"],script[src*="owl-widget-v4.js"]').forEach(el=>el.remove());
    ['owlWidgetV2Style','owlWidgetV3Style','owlWidgetV4Style'].forEach(id=>{const el=document.getElementById(id);if(el)el.remove();});
    const s=document.createElement('script');
    s.src='owl-widget-v4.js?v='+VERSION;
    s.defer=true;
    s.dataset.repairOwlV662='1';
    document.head.appendChild(s);
  }

  function ensureRuneSystem(){
    if(!document.body||!document.body.classList.contains('is-home-route')) return;
    const frame=document.querySelector('#orbModalV4 .owl-frame-v4');
    if(!frame) return;
    const inject=()=>{
      try{
        const doc=frame.contentDocument;
        if(!doc||!doc.head||doc.getElementById('runeSystemLoaderV1')) return;
        const s=doc.createElement('script');
        s.id='runeSystemLoaderV1';
        s.src='rune-system-v1.js?v=20261030-runes1';
        doc.head.appendChild(s);
      }catch(e){}
    };
    if(!frame.dataset.runeListenerV1){
      frame.dataset.runeListenerV1='1';
      frame.addEventListener('load',()=>setTimeout(inject,650));
    }
    setTimeout(inject,650);
  }

  function ensureOrbHelp(){
    if(!document.body||!document.body.classList.contains('is-home-route')) return;
    const frame=document.querySelector('#orbModalV4 .owl-frame-v4');
    if(!frame) return;
    const inject=()=>{
      try{
        const doc=frame.contentDocument;
        if(!doc||!doc.head||doc.getElementById('orbHelpLoaderV1')) return;
        const s=doc.createElement('script');
        s.id='orbHelpLoaderV1';
        s.src='orb-help-v1.js?v=20261030-help1';
        doc.head.appendChild(s);
      }catch(e){}
    };
    if(!frame.dataset.helpListenerV1){
      frame.dataset.helpListenerV1='1';
      frame.addEventListener('load',()=>setTimeout(inject,700));
    }
    setTimeout(inject,700);
  }

  function ensureThirdHold(){
    if(!document.body||!document.body.classList.contains('is-home-route')) return;
    if(document.getElementById('orbThirdHoldLoaderV1')) return;
    const s=document.createElement('script');
    s.id='orbThirdHoldLoaderV1';
    s.src='owl-fortune/orb-third-hold-v1.js?v=20261030-thirdhold1';
    s.defer=true;
    document.head.appendChild(s);
  }

  function freshExpertsLinks(){
    document.querySelectorAll('a[href="experts.html"],a[href^="experts.html?"]').forEach(a=>{a.href='experts.html?v='+VERSION;});
  }

  function clean(){
    removeLegacyHome();
    ensureQuestionnaire();
    ensureFortuneOwl();
    ensureThirdHold();
    ensureRuneSystem();
    ensureOrbHelp();
    freshExpertsLinks();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',clean,{once:true});
  else clean();
  setTimeout(clean,250);
  setTimeout(clean,1000);
  setTimeout(ensureThirdHold,1200);
  setTimeout(ensureRuneSystem,1800);
  setTimeout(ensureOrbHelp,1850);
})();