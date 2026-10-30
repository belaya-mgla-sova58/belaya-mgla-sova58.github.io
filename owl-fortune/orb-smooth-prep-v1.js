(()=>{
  'use strict';
  if(window.__owlSmoothPrepV1) return;
  window.__owlSmoothPrepV1=true;
  const style=document.createElement('style');
  style.id='owlSmoothPrepStyleV1';
  style.textContent=`
    .orb.preparing{
      animation:prepareSmoothV1 .72s cubic-bezier(.4,0,.2,1) both!important;
      transform-origin:50% 52%!important;
      will-change:transform,filter!important;
    }
    .orb.preparing:before{animation-duration:3.8s!important;filter:blur(16px)!important}
    .orb.preparing .stars{animation:prepStarsV1 .72s ease-in-out both!important}
    .orb.preparing .nebula{animation-duration:2.8s!important}
    .orb.preparing .nebula2{animation-duration:3.1s!important}
    @keyframes prepareSmoothV1{
      0%{transform:translate3d(0,0,0) scale(1) rotate(0);filter:brightness(1) saturate(1)}
      20%{transform:translate3d(-1px,-2px,0) scale(1.006) rotate(-.12deg);filter:brightness(1.05) saturate(1.04)}
      48%{transform:translate3d(0,-5px,0) scale(1.018) rotate(0);filter:brightness(1.13) saturate(1.10)}
      76%{transform:translate3d(1px,-2px,0) scale(1.009) rotate(.12deg);filter:brightness(1.07) saturate(1.06)}
      100%{transform:translate3d(0,0,0) scale(1) rotate(0);filter:brightness(1) saturate(1)}
    }
    @keyframes prepStarsV1{
      0%{opacity:.55;transform:scale(.99)}
      45%{opacity:1;transform:scale(1.025)}
      100%{opacity:.72;transform:scale(1)}
    }
  `;
  document.head.appendChild(style);
})();