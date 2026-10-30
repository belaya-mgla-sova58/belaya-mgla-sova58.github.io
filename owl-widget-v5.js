(function(){
  'use strict';
  if(window.__bmFortuneOwlV5Loaded) return;
  window.__bmFortuneOwlV5Loaded=true;

  function boot(){
    if(document.getElementById('owlButtonV5')) return;

    var css=document.createElement('style');
    css.id='fortuneOwlV5Styles';
    css.textContent=
      '#owlButtonV5{position:fixed;right:14px;bottom:18px;z-index:2147483000;width:clamp(155px,18vw,255px);height:clamp(155px,18vw,255px);padding:0;border:0;background:transparent;cursor:pointer;filter:drop-shadow(0 12px 18px rgba(0,0,0,.5));transition:transform .18s ease,filter .18s ease;animation:bmOwlFloat 3.4s ease-in-out infinite}' +
      '#owlButtonV5:hover{transform:translateY(-3px) scale(1.035);filter:drop-shadow(0 16px 24px rgba(0,0,0,.62))}' +
      '#owlButtonV5 img{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:contain;user-select:none;-webkit-user-drag:none;opacity:0;transition:opacity .3s ease}' +
      '#owlButtonV5 img.active{opacity:1}#owlButtonV5.hidden{display:none}' +
      '#dismissOwlV5{position:fixed;right:14px;bottom:calc(18px + clamp(155px,18vw,255px) - 20px);z-index:2147483002;width:30px;height:30px;border:1px solid rgba(240,226,255,.34);border-radius:50%;background:rgba(18,8,34,.82);color:#fff;font:700 20px/1 system-ui;cursor:pointer;display:grid;place-items:center;box-shadow:0 5px 16px rgba(0,0,0,.38);backdrop-filter:blur(7px)}' +
      '#dismissOwlV5:hover{background:rgba(65,34,96,.95)}#dismissOwlV5.hidden{display:none}' +
      '#oracleModalV5{position:fixed;inset:0;z-index:2147483100;display:none;place-items:center;padding:12px;background:rgba(3,2,10,.58);backdrop-filter:blur(7px)}#oracleModalV5.open{display:grid}' +
      '#oraclePanelV5{position:relative;width:min(96vw,1080px);height:min(92vh,820px);border-radius:28px;overflow:hidden;background:rgba(6,3,18,.96);box-shadow:0 28px 90px rgba(0,0,0,.72),0 0 70px rgba(109,50,188,.28);border:1px solid rgba(211,189,255,.24)}' +
      '#oracleFrameV5{width:100%;height:100%;border:0;display:block;background:transparent}' +
      '#closeModalV5{position:absolute;right:14px;top:12px;z-index:4;width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.23);background:rgba(16,8,31,.82);color:#fff;font:700 27px/1 system-ui;cursor:pointer;box-shadow:0 5px 18px rgba(0,0,0,.4)}#closeModalV5:hover{background:rgba(57,29,91,.95)}' +
      '@keyframes bmOwlFloat{0%,100%{translate:0 0}50%{translate:0 -7px}}' +
      '@media(max-width:700px){#owlButtonV5{right:4px;bottom:72px;width:clamp(130px,37vw,195px);height:clamp(130px,37vw,195px)}#dismissOwlV5{right:4px;bottom:calc(72px + clamp(130px,37vw,195px) - 18px);width:28px;height:28px;font-size:18px}#oracleModalV5{padding:4px}#oraclePanelV5{width:100vw;height:100dvh;border-radius:0;border:0}#closeModalV5{right:10px;top:10px}}';
    document.head.appendChild(css);

    var owl=document.createElement('button');
    owl.id='owlButtonV5';owl.type='button';owl.setAttribute('aria-label','Открыть предсказания совы');
    var active=document.createElement('img');active.id='owlActiveV5';active.className='active';active.src='/owl-fortune/media/owl-active.webp?v=5';active.alt='';
    var sleep=document.createElement('img');sleep.id='owlSleepV5';sleep.src='/owl-fortune/media/owl-sleep.webp?v=5';sleep.alt='';
    owl.appendChild(active);owl.appendChild(sleep);document.body.appendChild(owl);

    var dismiss=document.createElement('button');dismiss.id='dismissOwlV5';dismiss.type='button';dismiss.setAttribute('aria-label','Скрыть сову до обновления страницы');dismiss.textContent='×';document.body.appendChild(dismiss);

    var modal=document.createElement('div');modal.id='oracleModalV5';modal.setAttribute('aria-hidden','true');
    var panel=document.createElement('div');panel.id='oraclePanelV5';
    var close=document.createElement('button');close.id='closeModalV5';close.type='button';close.setAttribute('aria-label','Закрыть');close.textContent='×';
    var frame=document.createElement('iframe');frame.id='oracleFrameV5';frame.title='Предсказание совы';frame.loading='eager';frame.allow='autoplay';frame.src='/owl-fortune/orb-popup.html?v=5.1';
    panel.appendChild(close);panel.appendChild(frame);modal.appendChild(panel);document.body.appendChild(modal);

    function patchOracleFrame(){
      try{
        var doc=frame.contentDocument||(frame.contentWindow&&frame.contentWindow.document);
        if(!doc||!doc.head||!doc.body) return;

        if(!doc.getElementById('orbV5ContrastPatch')){
          var contrast=doc.createElement('style');
          contrast.id='orbV5ContrastPatch';
          contrast.textContent=
            '.hint,.count,.streak-v2,.orb-mini-btn-v2,.orb-help-btn-v1,.book-title-v2,.book-list-v2,.book-empty-v2,.toast-v2,.orb-help-title-v1,.orb-help-body-v1,.orb-help-item-v1,.orb-help-note-v1{color:#fff8ff!important;font-weight:700!important;text-shadow:0 1px 2px rgba(0,0,0,.98),0 0 9px rgba(223,194,255,.72)!important}' +
            '.count,.streak-v2{background:rgba(25,9,48,.82)!important;border:1px solid rgba(236,218,255,.42)!important;border-radius:999px!important;padding:6px 10px!important;box-shadow:0 5px 18px rgba(0,0,0,.34),0 0 18px rgba(141,88,232,.24)!important}' +
            '.hint{color:#fff7ff!important;font-weight:800!important}' +
            '.orb-mini-btn-v2,.orb-help-btn-v1{color:#fff!important;background:rgba(36,14,62,.92)!important;border-color:rgba(240,224,255,.6)!important;box-shadow:0 5px 18px rgba(0,0,0,.34),0 0 17px rgba(145,89,235,.3)!important}' +
            '.book-panel-v2,.orb-help-panel-v1{color:#fff!important}' +
            '.book-close-v2,.orb-help-close-v1{color:#fff!important}' +
            '#fortuneText.text{font-weight:700!important}';
          doc.head.appendChild(contrast);
        }

        if(!doc.getElementById('orbHelpLoaderV5')&&!doc.querySelector('.orb-help-btn-v1')){
          var help=doc.createElement('script');
          help.id='orbHelpLoaderV5';
          help.src='/owl-fortune/orb-help-v1.js?v=5.1';
          help.async=false;
          doc.body.appendChild(help);
        }
      }catch(e){}
    }

    frame.addEventListener('load',patchOracleFrame);

    function setOwl(state){var isSleep=state==='sleep';active.classList.toggle('active',!isSleep);sleep.classList.toggle('active',isSleep)}
    function openModal(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');patchOracleFrame()}
    function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
    function hideOwlUntilReload(){closeModal();owl.classList.add('hidden');dismiss.classList.add('hidden')}

    owl.addEventListener('click',openModal);
    dismiss.addEventListener('click',hideOwlUntilReload);
    close.addEventListener('click',closeModal);
    modal.addEventListener('click',function(e){if(e.target===modal)closeModal()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});
    window.addEventListener('message',function(e){if(e.data&&e.data.type==='owl-state')setOwl(e.data.state)});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
