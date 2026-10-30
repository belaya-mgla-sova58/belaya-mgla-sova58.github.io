(()=>{
  'use strict';
  const VERSION='20261030-activeowl2';
  ['owlButtonV2','dismissOwlV2','orbModalV2','owlButtonV3','dismissOwlV3','orbModalV3','owlButtonV4','dismissOwlV4','orbModalV4'].forEach(id=>{const el=document.getElementById(id);if(el)el.remove();});
  ['owlWidgetV2Style','owlWidgetV3Style','owlWidgetV4Style'].forEach(id=>{const el=document.getElementById(id);if(el)el.remove();});

  const style=document.createElement('style');
  style.id='owlWidgetV4Style';
  style.textContent=`
  .owl-corner-v4{position:fixed!important;right:8px!important;bottom:96px!important;z-index:2147483645!important;width:145px!important;height:214px!important;border:0!important;background:transparent!important;padding:0!important;margin:0!important;display:block!important;visibility:visible!important;opacity:1!important;overflow:visible!important;cursor:pointer!important;pointer-events:auto!important;touch-action:manipulation!important;-webkit-appearance:none!important;appearance:none!important;will-change:transform!important;-webkit-tap-highlight-color:transparent!important}
  .owl-corner-v4.sleeping{width:145px!important;height:145px!important;bottom:102px!important}
  .owl-img-v4{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;display:block!important;visibility:visible!important;opacity:0!important;pointer-events:none!important;transition:opacity .08s linear!important;filter:drop-shadow(0 9px 15px rgba(89,43,154,.4))!important;mix-blend-mode:normal!important;background:transparent!important}
  .owl-img-v4.show{opacity:1!important}
  .owl-z-v4{position:absolute!important;z-index:3!important;display:none!important;color:#f0e7ff!important;font:800 19px/1 Georgia,serif!important;text-shadow:0 0 8px #8f65ff,0 0 16px rgba(126,79,255,.9)!important;pointer-events:none!important;will-change:transform,opacity!important}
  .owl-corner-v4.sleeping .owl-z-v4{display:block!important}
  .owl-z-v4.z1{right:6%!important;top:5%!important}.owl-z-v4.z2{right:-2%!important;top:20%!important;font-size:15px!important}.owl-z-v4.z3{right:18%!important;top:-4%!important;font-size:12px!important}
  .owl-dismiss-v4{position:fixed!important;right:3px!important;bottom:218px!important;z-index:2147483646!important;width:27px!important;height:27px!important;border:1px solid rgba(240,226,255,.38)!important;border-radius:50%!important;background:rgba(18,8,34,.88)!important;color:#fff!important;font:700 17px/1 system-ui!important;cursor:pointer!important;display:grid!important;place-items:center!important;box-shadow:0 5px 16px rgba(0,0,0,.38)!important}.owl-dismiss-v4.hidden,.owl-corner-v4.hidden{display:none!important}
  .owl-modal-v4{position:fixed!important;inset:0!important;z-index:2147483640!important;display:none!important;place-items:center!important;padding:12px!important;box-sizing:border-box!important;pointer-events:none!important}.owl-modal-v4.open{display:grid!important;pointer-events:auto!important}
  .owl-backdrop-v4{position:absolute!important;inset:0!important;background:rgba(2,1,8,.58)!important;backdrop-filter:blur(4px)!important}.owl-dialog-v4{position:relative!important;z-index:1!important;width:min(560px,84vw)!important;height:min(610px,70vh)!important;border-radius:22px!important;overflow:hidden!important;background:#05020c!important;border:1px solid rgba(227,201,255,.24)!important;box-shadow:0 24px 70px rgba(0,0,0,.62),0 0 45px rgba(125,59,193,.2)!important}.owl-frame-v4{width:100%!important;height:100%!important;border:0!important;display:block!important;background:#05020c!important}.owl-close-v4{position:absolute!important;right:9px!important;top:8px!important;z-index:3!important;width:34px!important;height:34px!important;border:1px solid rgba(255,255,255,.25)!important;border-radius:50%!important;background:rgba(17,8,29,.86)!important;color:#fff!important;font:400 25px/1 system-ui!important;cursor:pointer!important;display:grid!important;place-items:center!important}
  @media(max-width:640px){.owl-corner-v4{right:7px!important;bottom:96px!important;width:145px!important;height:214px!important;max-width:none!important}.owl-corner-v4.sleeping{width:145px!important;height:145px!important;bottom:102px!important}.owl-dismiss-v4{right:3px!important;bottom:218px!important}.owl-dialog-v4{width:82vw!important;height:62vh!important;max-height:560px!important;border-radius:18px!important}.owl-modal-v4{padding-bottom:76px!important}}
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('beforeend',`<button id="owlButtonV4" data-owl-version="${VERSION}" class="owl-corner-v4" type="button" aria-label="Открыть предсказания совы"><img id="owlActiveV4" class="owl-img-v4 show" src="owl-fortune/media/owl-active-real.webp?v=${VERSION}" alt=""><img id="owlSleepV4" class="owl-img-v4" src="owl-fortune/media/owl-sleep-170.webp?v=${VERSION}" alt=""><span class="owl-z-v4 z1">Z</span><span class="owl-z-v4 z2">Z</span><span class="owl-z-v4 z3">Z</span></button><button id="dismissOwlV4" class="owl-dismiss-v4" type="button" aria-label="Скрыть сову до обновления страницы">×</button><div id="orbModalV4" class="owl-modal-v4" aria-hidden="true"><div class="owl-backdrop-v4"></div><div class="owl-dialog-v4"><button id="closeModalV4" class="owl-close-v4" type="button" aria-label="Закрыть">×</button><iframe class="owl-frame-v4" src="owl-fortune/orb-popup.html?v=${VERSION}" title="Сова-предсказательница" allow="autoplay"></iframe></div></div>`);

  const owl=document.getElementById('owlButtonV4');
  const dismiss=document.getElementById('dismissOwlV4');
  const modal=document.getElementById('orbModalV4');
  const close=document.getElementById('closeModalV4');
  const backdrop=modal.querySelector('.owl-backdrop-v4');
  const frame=modal.querySelector('.owl-frame-v4');
  const activeImg=document.getElementById('owlActiveV4');
  const sleepImg=document.getElementById('owlSleepV4');
  const zs=[...owl.querySelectorAll('.owl-z-v4')];
  let sleeping=false,raf=0,sleepTaps=0;

  function injectOrbEnhance(){
    try{
      const doc=frame.contentDocument;
      if(!doc||!doc.head||doc.getElementById('orbEnhanceLoaderV1'))return;
      const s=doc.createElement('script');
      s.id='orbEnhanceLoaderV1';
      s.src='orb-enhance-v1.js?v='+VERSION;
      doc.head.appendChild(s);
    }catch(e){}
  }
  frame.addEventListener('load',()=>setTimeout(injectOrbEnhance,40));
  setTimeout(injectOrbEnhance,450);

  function openModal(e){
    if(e){e.preventDefault();e.stopPropagation()}
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');
    setTimeout(injectOrbEnhance,30);
    if(sleeping){
      sleepTaps++;
      if(sleepTaps>=4){
        sleepTaps=0;
        setTimeout(()=>{try{frame.contentWindow.postMessage({type:'owl-sleep-secret'},'*')}catch(err){}},140);
      }
    }else sleepTaps=0;
  }
  function closeModal(e){if(e){e.preventDefault();e.stopPropagation()}modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
  function setOwl(state){
    sleeping=state==='sleep';
    owl.classList.toggle('sleeping',sleeping);
    activeImg.classList.toggle('show',!sleeping);
    sleepImg.classList.toggle('show',sleeping);
    if(!sleeping)sleepTaps=0;
  }

  function animate(now){
    const t=now/1000;
    const y=sleeping?Math.sin(t*1.8)*4:Math.sin(t*2.15)*6;
    const scale=sleeping?1+Math.sin(t*1.45)*0.018:1+Math.sin(t*1.7)*0.008;
    const rot=sleeping?Math.sin(t*1.25)*0.7:Math.sin(t*1.55)*0.25;
    owl.style.setProperty('transform',`translate3d(0,${y.toFixed(2)}px,0) scale(${scale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`,'important');
    if(sleeping){
      zs.forEach((z,i)=>{const p=(t*0.42+i*0.31)%1;const op=p<.18?p/.18:(p>.78?(1-p)/.22:1);const dx=10*p,dy=7-29*p,sc=.82+.3*p;z.style.setProperty('opacity',String(Math.max(0,Math.min(1,op))),'important');z.style.setProperty('transform',`translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0) scale(${sc.toFixed(3)})`,'important')})
    }else{zs.forEach(z=>z.style.setProperty('opacity','0','important'))}
    raf=requestAnimationFrame(animate);
  }

  activeImg.addEventListener('error',()=>{activeImg.src='owl-fortune/media/owl-awake-open-170.webp?v='+VERSION});
  owl.addEventListener('click',openModal,{passive:false});
  dismiss.addEventListener('click',e=>{closeModal(e);owl.classList.add('hidden');dismiss.classList.add('hidden')});
  close.addEventListener('click',closeModal);
  backdrop.addEventListener('click',closeModal);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
  window.addEventListener('message',e=>{if(!e.data||e.data.type!=='owl-state')return;setOwl(e.data.state)});
  if(window.requestAnimationFrame) raf=requestAnimationFrame(animate);
  else setInterval(()=>animate(Date.now()),50);
})();