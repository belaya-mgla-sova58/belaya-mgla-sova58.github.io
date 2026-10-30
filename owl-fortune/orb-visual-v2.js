(()=>{
  'use strict';
  if(window.__owlOrbVisualV2) return;
  window.__owlOrbVisualV2=true;

  const orb=document.getElementById('orb');
  const scene=document.getElementById('scene');
  const text=document.getElementById('fortuneText');
  const hint=document.getElementById('hint');
  const count=document.getElementById('count');
  if(!orb||!scene||!text||!hint||!count) return;

  if(!document.getElementById('owlMagicFontsV2')){
    const link=document.createElement('link');
    link.id='owlMagicFontsV2';
    link.rel='stylesheet';
    link.href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Forum&display=swap';
    document.head.appendChild(link);
  }

  const style=document.createElement('style');
  style.id='owlOrbVisualStyleV2';
  style.textContent=`
    body{background:radial-gradient(circle at 50% 36%,#3a1762 0,#24103f 34%,#130725 68%,#090217 100%)!important}
    .scene{filter:drop-shadow(0 24px 38px rgba(0,0,0,.4))!important;overflow:visible!important;background:radial-gradient(circle at 50% 48%,rgba(143,84,236,.13),rgba(79,35,139,.07) 48%,transparent 72%)!important;border-radius:28px!important}
    .aura{opacity:1!important;filter:blur(6px)!important;background:radial-gradient(circle,rgba(174,112,255,.27),rgba(116,61,203,.14) 46%,transparent 73%)!important}
    .orb{box-shadow:inset 0 0 30px rgba(255,255,255,.17),inset 0 0 90px rgba(119,66,245,.56),0 0 15px rgba(232,213,255,.9),0 0 50px rgba(145,79,244,.82),0 0 104px rgba(93,52,194,.56)!important}

    .text{
      width:70%!important;
      font-family:"Forum","Cormorant Garamond",Georgia,serif!important;
      font-size:clamp(18px,4.35vw,28px)!important;
      line-height:1.2!important;
      font-weight:400!important;
      letter-spacing:.025em!important;
      color:#fff8ec!important;
      text-shadow:0 1px 2px rgba(12,2,24,.96),0 0 7px rgba(255,247,227,.72),0 0 18px rgba(190,132,255,.72),0 0 34px rgba(104,53,190,.52)!important;
      transition:opacity .42s ease,transform .42s cubic-bezier(.2,.8,.2,1),color .35s ease,text-shadow .35s ease!important;
    }
    .text.show{transform:translate(-50%,-50%) scale(1.015)!important}

    .count{
      top:-4.5%!important;
      padding:5px 11px!important;
      border:1px solid rgba(228,211,255,.28)!important;
      border-radius:999px!important;
      background:linear-gradient(180deg,rgba(84,43,132,.58),rgba(42,18,76,.42))!important;
      backdrop-filter:blur(5px)!important;
      color:#f6edff!important;
      font-family:"Cormorant Garamond",Georgia,serif!important;
      font-size:clamp(13px,3vw,16px)!important;
      font-weight:700!important;
      line-height:1!important;
      letter-spacing:.025em!important;
      text-shadow:0 0 10px rgba(190,139,255,.82)!important;
      white-space:nowrap!important;
      box-shadow:inset 0 0 12px rgba(255,255,255,.04),0 0 20px rgba(144,83,235,.2)!important;
    }
    .streak-v2{
      top:8.7%!important;
      left:9%!important;
      transform:none!important;
      width:auto!important;
      text-align:left!important;
      color:rgba(237,222,255,.9)!important;
      font-family:"Cormorant Garamond",Georgia,serif!important;
      font-size:clamp(12px,2.7vw,14px)!important;
      font-weight:600!important;
      letter-spacing:.035em!important;
      text-shadow:0 0 10px rgba(164,105,255,.76)!important;
    }

    .hint{
      bottom:-1.2%!important;
      left:8%!important;
      transform:none!important;
      width:auto!important;
      text-align:left!important;
      font-family:"Forum","Cormorant Garamond",Georgia,serif!important;
      font-size:clamp(15px,3.55vw,20px)!important;
      font-weight:400!important;
      letter-spacing:.035em!important;
      color:#f2e8ff!important;
      text-shadow:0 0 9px rgba(186,132,255,.7),0 0 20px rgba(111,57,198,.4)!important;
    }

    .orb-controls-v2{bottom:5.8%!important;gap:8px!important}
    .orb-mini-btn-v2{
      padding:7px 12px!important;
      border:1px solid rgba(229,211,255,.46)!important;
      border-radius:999px!important;
      background:linear-gradient(180deg,rgba(91,48,143,.78),rgba(45,20,81,.7))!important;
      color:#fbf4ff!important;
      font-family:"Cormorant Garamond",Georgia,serif!important;
      font-size:13px!important;
      font-weight:700!important;
      letter-spacing:.02em!important;
      backdrop-filter:blur(7px)!important;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 5px 18px rgba(0,0,0,.2),0 0 19px rgba(158,95,255,.25)!important;
      transition:transform .18s ease,box-shadow .22s ease,background .22s ease!important;
    }
    .orb-mini-btn-v2:active{transform:scale(.96)!important;background:rgba(112,61,172,.86)!important}

    .rare-badge-v2{
      position:absolute;z-index:22;left:50%;top:15.2%;transform:translateX(-50%) translateY(-5px) scale(.96);
      padding:5px 11px;border:1px solid rgba(255,225,126,.72);border-radius:999px;
      background:linear-gradient(180deg,rgba(134,82,25,.58),rgba(63,33,10,.5));
      color:#fff0ae;font-family:"Forum","Cormorant Garamond",Georgia,serif;font-size:12px;letter-spacing:.11em;
      text-shadow:0 0 7px rgba(255,244,190,.96),0 0 16px rgba(255,190,61,.72);
      box-shadow:inset 0 0 10px rgba(255,236,170,.1),0 0 22px rgba(255,191,57,.24);
      opacity:0;pointer-events:none;transition:opacity .28s ease,transform .28s ease;
      white-space:nowrap;
    }
    .rare-badge-v2.show{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}

    .orb.magic-rare-v1 .text{
      color:#fff0ad!important;
      text-shadow:0 1px 2px rgba(32,17,0,.95),0 0 7px rgba(255,252,226,.98),0 0 18px rgba(255,220,106,.88),0 0 34px rgba(255,169,48,.54)!important;
    }
    .orb.magic-secret-v1 .text{
      color:#f1fbff!important;
      text-shadow:0 1px 2px rgba(0,11,32,.95),0 0 8px rgba(235,251,255,.98),0 0 19px rgba(116,207,255,.86),0 0 34px rgba(139,94,255,.6)!important;
    }
    .orb.magic-rare-v1{border-color:rgba(255,234,155,.9)!important}

    @media(max-width:560px){
      .count{top:-5.5%!important;font-size:13px!important;padding:5px 9px!important}
      .streak-v2{top:8.2%!important;left:7%!important;font-size:12px!important}
      .rare-badge-v2{top:14.3%;font-size:10.5px;padding:4px 9px}
      .orb-mini-btn-v2{font-size:12px!important;padding:6px 9px!important}
      .orb-controls-v2{gap:6px!important;bottom:5.3%!important}
      .hint{bottom:-1.6%!important;left:7%!important;font-size:17px!important}
    }
  `;
  document.head.appendChild(style);

  const badge=document.createElement('div');
  badge.className='rare-badge-v2';
  badge.setAttribute('aria-hidden','true');
  scene.appendChild(badge);

  function syncBadge(){
    const rare=orb.classList.contains('magic-rare-v1');
    const secret=orb.classList.contains('magic-secret-v1');
    badge.classList.toggle('show',rare&&!secret);
    badge.textContent='✦ РЕДКОЕ ПРЕДСКАЗАНИЕ ✦';
  }
  const mo=new MutationObserver(syncBadge);
  mo.observe(orb,{attributes:true,attributeFilter:['class']});
  syncBadge();
})();