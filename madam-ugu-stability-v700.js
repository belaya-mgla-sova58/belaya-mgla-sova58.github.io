(function(){
'use strict';

function initStability(){
  var frame=document.querySelector('[id^="madamUguFrame"]');
  var panel=document.querySelector('[id^="madamUguPanel"]');
  var overlay=document.querySelector('[id^="madamUguOverlay"]');
  var launcher=document.querySelector('[id^="madamUguLauncher"]');
  if(!frame||!panel||!overlay||!launcher){setTimeout(initStability,80);return;}
  if(panel.querySelector('.ugu-load-guard-v700')) return;

  frame.style.opacity='0';
  frame.style.transition='opacity .22s ease';

  var guard=document.createElement('div');
  guard.className='ugu-load-guard-v700';
  guard.innerHTML='<div class="ugu-load-star-v700">✦</div><div class="ugu-load-title-v700">Мадам Угу смотрит в шар…</div><div class="ugu-load-sub-v700">Секунду, судьба загружается.</div>';
  guard.style.cssText='position:absolute;inset:0;z-index:5;display:grid;place-content:center;gap:8px;text-align:center;padding:24px;border-radius:inherit;background:radial-gradient(circle at 50% 42%,#3a1766 0,#190b2b 38%,#0a0413 78%);color:#f7f0ff;font-family:Arial,sans-serif;pointer-events:none;';
  panel.appendChild(guard);

  var st=document.createElement('style');
  st.textContent='@keyframes uguGuardPulseV700{0%,100%{transform:scale(.9);opacity:.55}50%{transform:scale(1.12);opacity:1}}.ugu-load-star-v700{font-size:46px;color:#e8d3ff;text-shadow:0 0 18px rgba(203,149,255,.9),0 0 42px rgba(141,74,255,.55);animation:uguGuardPulseV700 1.4s ease-in-out infinite}.ugu-load-title-v700{font-family:Georgia,serif;font-size:18px;font-weight:700}.ugu-load-sub-v700{font-size:12px;color:#c8b7d9}';
  document.head.appendChild(st);

  var retryDone=false;
  var checkTimer=0;

  function isReady(){
    try{
      var d=frame.contentDocument;
      return !!(d&&d.readyState!=='loading'&&d.getElementById('orb')&&d.querySelector('.stage'));
    }catch(e){return false;}
  }

  function reveal(){
    if(!isReady()) return false;
    clearTimeout(checkTimer);
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      frame.style.opacity='1';
      guard.style.opacity='0';
      guard.style.transition='opacity .2s ease';
      setTimeout(function(){guard.style.display='none';},220);
    });});
    return true;
  }

  function ensureReady(){
    guard.style.display='grid';
    guard.style.opacity='1';
    frame.style.opacity='0';
    if(reveal()) return;
    clearTimeout(checkTimer);
    checkTimer=setTimeout(function(){
      if(reveal()) return;
      if(!retryDone){
        retryDone=true;
        frame.src='predictions-cosmic.html?v=700&r='+Date.now();
      }
    },900);
  }

  frame.addEventListener('load',function(){
    setTimeout(function(){
      if(!reveal()) setTimeout(reveal,180);
    },80);
  });

  launcher.addEventListener('click',function(){
    retryDone=false;
    ensureReady();
  },true);

  var mo=new MutationObserver(function(){
    if(overlay.classList.contains('is-open')) ensureReady();
  });
  mo.observe(overlay,{attributes:true,attributeFilter:['class']});

  if(isReady()) reveal();
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initStability,{once:true});
else initStability();
})();