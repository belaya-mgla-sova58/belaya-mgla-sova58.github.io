(()=>{
  'use strict';
  if(window.__owlRuneRarityV1) return;
  window.__owlRuneRarityV1=true;

  const scene=document.getElementById('scene');
  if(!scene) return;

  const DAILY_KEY='belaya_mgla_rune_drop_daily_v1';
  const BASE_CREATE_CHANCE=.20;
  const TARGET_TOTAL_CHANCE=.04;
  const SECRET_SHARE=.25;
  const PASS_CHANCE=Math.min(1,TARGET_TOTAL_CHANCE/BASE_CREATE_CHANCE);

  function dayKey(){
    const d=new Date();
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }
  function runeAlreadyDropped(){
    try{return localStorage.getItem(DAILY_KEY)===dayKey()}catch(e){return false}
  }
  function markDropped(){
    try{localStorage.setItem(DAILY_KEY,dayKey())}catch(e){}
  }

  function gate(btn){
    if(!btn||btn.dataset.rarityChecked==='1') return;
    btn.dataset.rarityChecked='1';

    if(runeAlreadyDropped()||Math.random()>=PASS_CHANCE){
      btn.remove();
      return;
    }

    markDropped();
    btn.classList.add('rare-rune-v1');
    if(Math.random()<SECRET_SHARE){
      btn.classList.add('secret-rune-v1');
      btn.dataset.runeTier='secret';
    }else{
      btn.dataset.runeTier='rare';
    }
  }

  const style=document.createElement('style');
  style.id='runeRarityStyleV1';
  style.textContent=`
    .rune-v2.rare-rune-v1{animation:runePulseV2 1.05s ease-in-out infinite alternate!important}
    .rune-v2.secret-rune-v1{border-color:rgba(255,246,184,.98)!important;box-shadow:0 0 16px rgba(255,235,148,1),0 0 38px rgba(154,91,255,.95),0 0 62px rgba(71,164,255,.48)!important;filter:brightness(1.14) saturate(1.12)}
    .rune-secret-badge-v1{margin-bottom:7px;padding:4px 9px;border:1px solid rgba(255,232,150,.5);border-radius:999px;background:rgba(255,214,98,.09);color:#ffe79a;font:800 10px/1 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.12em;text-transform:uppercase;text-shadow:0 0 9px rgba(255,218,105,.78)}
  `;
  document.head.appendChild(style);

  let secretPending=false;
  scene.addEventListener('click',e=>{
    const btn=e.target.closest?.('.rune-v2');
    if(btn&&btn.dataset.runeTier==='secret') secretPending=true;
  },true);

  const mo=new MutationObserver(muts=>{
    for(const m of muts){
      for(const n of m.addedNodes){
        if(!(n instanceof Element)) continue;
        if(n.matches('.rune-v2')) gate(n);
        n.querySelectorAll?.('.rune-v2').forEach(gate);

        if(secretPending&&n.matches?.('.real-rune-card-v1')){
          secretPending=false;
          const badge=document.createElement('div');
          badge.className='rune-secret-badge-v1';
          badge.textContent='Тайная руна ✨';
          const symbol=n.querySelector('.real-rune-symbol-v1');
          if(symbol) n.insertBefore(badge,symbol);
          else n.prepend(badge);
        }
      }
    }
  });
  mo.observe(scene,{childList:true,subtree:true});
  scene.querySelectorAll('.rune-v2').forEach(gate);
})();