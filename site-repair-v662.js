(()=>{
  'use strict';
  const VERSION='20261030-activeowl3';
  const WORKER='./service-worker.js?v=680-layoutfix1';
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

  function ensurePerformanceCSS(){
    if(document.getElementById('sitePerformanceV1')) return;
    const link=document.createElement('link');
    link.id='sitePerformanceV1';
    link.rel='stylesheet';
    link.href='site-performance-v1.css?v=20261030-perf1';
    document.head.appendChild(link);
  }
  ensurePerformanceCSS();

  function registerFreshWorker(){
    if(!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register(WORKER,{updateViaCache:'none'}).catch(()=>{});
  }
  registerFreshWorker();
  window.addEventListener('load',()=>setTimeout(registerFreshWorker,250),{once:true});

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

  function cleanExperts(){
    if(!document.body||!document.body.classList.contains('is-experts-route')) return;
    document.querySelectorAll('.wave-copy small').forEach(el=>el.remove());
    const intro=document.querySelector('.experts-head p');
    if(intro) intro.textContent='Выбери нужного эксперта.';
    document.querySelectorAll('.wave-arrow').forEach(el=>{
      el.textContent='✓';
      el.setAttribute('aria-hidden','true');
    });
    if(!document.getElementById('expertsCleanV1')){
      const st=document.createElement('style');
      st.id='expertsCleanV1';
      st.textContent=`
        .is-experts-route .wave>summary::before{
          width:auto!important;height:auto!important;min-width:0!important;min-height:0!important;
          border-radius:0!important;display:block!important;place-items:normal!important;
          padding:0!important;margin:0!important;font-size:0!important;color:transparent!important;
          box-shadow:none!important;
        }
        .is-experts-route .wave-copy{padding-left:0!important}
        .is-experts-route .wave-arrow{
          transform:translateY(-50%)!important;
          color:#9cf5d2!important;
          font-size:17px!important;
          line-height:1!important;
          text-shadow:0 0 9px rgba(111,239,190,.62);
        }
        .is-experts-route .wave[open] .wave-arrow{
          transform:translateY(-50%)!important;
          background:rgba(19,67,60,.72)!important;
          border-color:rgba(127,242,198,.62)!important;
        }
      `;
      document.head.appendChild(st);
    }
  }

  function freshExpertsLinks(){
    document.querySelectorAll('a[href="experts.html"],a[href^="experts.html?"]').forEach(a=>{a.href='experts.html?v='+VERSION;});
  }

  function clean(){
    ensurePerformanceCSS();
    removeLegacyHome();
    ensureQuestionnaire();
    ensureFortuneOwl();
    ensureThirdHold();
    ensureRuneSystem();
    ensureOrbHelp();
    cleanExperts();
    freshExpertsLinks();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',clean,{once:true});
  else clean();
  setTimeout(clean,800);
  setTimeout(()=>{ensureThirdHold();ensureRuneSystem();ensureOrbHelp();cleanExperts();},1800);
})();