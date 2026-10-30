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
    body{background:radial-gradient(circle at 50% 38%,#1d0937 0,#0a0315 53%,#030107 100%)!important}
    .scene{filter:drop-shadow(0 24px 38px rgba(0,0,0,.52))!important}

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
      top:2.8%!important;
      padding:5px 11px!important;
      border:1px solid rgba(221,199,255,.18)!important;
      border-radius:999px!important;
      background:linear-gradient(180deg,rgba(39,16,70,.42),rgba(18,7,35,.25))!important;
      backdrop-filter:blur(5px)!important;
      color:#efe4ff!important;
      font-family:"Cormorant Garamond",Georgia,serif!important;
      font-size:clamp(13px,3vw,16px)!important;
      font-weight:700!important;
      line-height:1!important;
      letter-spacing:.025em!important;
      text-shadow:0 0 10px rgba(157,98,255,.7)!important;
      white-space:nowrap!important;
      box-shadow:inset 0 0 12px rgba(255,255,255,.025),0 0 18px rgba(108,61,194,.1)!important;
    }
    .streak-v2{
      top:9.2%!important;
      color:rgba(220,201,244,.78)!important;
      font-family:"Cormorant Garamond",Georgia,serif!important;
      font-size:clamp(12px,2.7vw,14px)!important;
      font-weight:600!important;
      letter-spacing:.035em!important;
      text-shadow:0 0 9px rgba(132,78,224,.65)!important;
    }

    .hint{
      bottom:2.1%!important;
      width:88%!important;
      text-align:center!important;
      font-family:"Forum","Cormorant Garamond",Georgia,serif!important;
      font-size:clamp(15px,3.55vw,20px)!important;
      font-weight:400!important;
      letter-spacing:.035em!important;
      color:#eadcff!important;
      text-shadow:0 0 8px rgba(166,109,255,.58),0 0 18px rgba(92,46,173,.32)!important;
    }

    .orb-controls-v2{bottom:8.5%!important;gap:8px!important}
    .orb-mini-btn-v2{
      padding:7px 12px!important;
      border:1px solid rgba(221,198,255,.34)!important;
      border-radius:999px!important;
      background:linear-gradient(180deg,rgba(55,25,91,.68),rgba(21,8,42,.62))!important;
      color:#f4eaff!important;
      font-family:"Cormorant Garamond",Georgia,serif!important;
      font-size:13px!important;
      font-weight:700!important;
      letter-spacing:.02em!important;
      backdrop-filter:blur(7px)!important;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 5px 18px rgba(0,0,0,.24),0 0 16px rgba(135,78,226,.16)!important;
      transition:transform .18s ease,box-shadow .22s ease,background .22s ease!important;
    }
    .orb-mini-btn-v2:active{transform:scale(.96)!important;background:rgba(82,41,130,.78)!important}

    .rare-badge-v2{
      position:absolute;z-index:22;left:50%;top:15.2%;transform:translateX(-50%) translateY(-5px) scale(.96);
      padding:5px 11px;border:1px solid rgba(255,225,126,.58);border-radius:999px;
      background:linear-gradient(180deg,rgba(113,69,20,.46),rgba(43,22,6,.36));
      color:#ffe89c;font-family:"Forum","Cormorant Garamond",Georgia,serif;font-size:12px;letter-spacing:.11em;
      text-shadow:0 0 7px rgba(255,244,190,.92),0 0 16px rgba(255,190,61,.62);
      box-shadow:inset 0 0 10px rgba(255,236,170,.08),0 0 20px rgba(255,191,57,.18);
      opacity:0;pointer-events:none;transition:opacity .28s ease,transform .28s ease;
      white-space:nowrap;
    }
    .rare-badge-v2.show{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}
    .secret-badge-v2{border-color:rgba(173,221,255,.62)!important;background:linear-gradient(180deg,rgba(41,78,128,.46),rgba(23,20,74,.4))!important;color:#dff5ff!important;text-shadow:0 0 8px #fff,0 0 18px rgba(95,180,255,.72)!important;box-shadow:0 0 22px rgba(96,151,255,.22)!important}

    .orb.magic-rare-v1 .text{
      color:#fff0ad!important;
      text-shadow:0 1px 2px rgba(32,17,0,.95),0 0 7px rgba(255,252,226,.98),0 0 18px rgba(255,220,106,.88),0 0 34px rgba(255,169,48,.54)!important;
    }
    .orb.magic-secret-v1 .text{
      color:#eaf8ff!important;
      text-shadow:0 1px 2px rgba(0,11,32,.95),0 0 8px rgba(235,251,255,.98),0 0 19px rgba(116,207,255,.86),0 0 34px rgba(139,94,255,.6)!important;
    }
    .orb.magic-rare-v1{border-color:rgba(255,234,155,.88)!important}

    @media(max-width:560px){
      .count{top:2.5%!important;font-size:13px!important;padding:5px 9px!important}
      .streak-v2{top:8.8%!important;font-size:12px!important}
      .rare-badge-v2{top:14.3%;font-size:10.5px;padding:4px 9px}
      .orb-mini-btn-v2{font-size:12px!important;padding:6px 9px!important}
      .orb-controls-v2{gap:6px!important;bottom:8.3%!important}
      .hint{bottom:1.8%!important;font-size:17px!important}
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
    badge.classList.toggle('show',rare||secret);
    badge.classList.toggle('secret-badge-v2',secret&&!rare);
    badge.textContent=secret&&!rare?'✦ ТАЙНОЕ ПРЕДСКАЗАНИЕ ✦':'✦ РЕДКОЕ ПРЕДСКАЗАНИЕ ✦';
  }
  const mo=new MutationObserver(syncBadge);
  mo.observe(orb,{attributes:true,attributeFilter:['class']});
  syncBadge();
})();