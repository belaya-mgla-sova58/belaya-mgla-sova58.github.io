(()=>{
  'use strict';
  if(window.__owlThirdHoldV1) return;
  window.__owlThirdHoldV1=true;

  const LAST_KEY='belaya_mgla_orb_third_last_v1';
  const SLEEP_KEY='belaya_mgla_orb_sleep_requested_v1';

  function dayKey(){
    const d=new Date();
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }
  function sleepRequested(){
    try{return localStorage.getItem(SLEEP_KEY)===dayKey()}catch(e){return false}
  }
  function requestSleep(){
    try{localStorage.setItem(SLEEP_KEY,dayKey())}catch(e){}
  }
  function readLast(){
    try{
      const x=JSON.parse(localStorage.getItem(LAST_KEY)||'null');
      return x&&x.day===dayKey()&&typeof x.text==='string'?x.text:'';
    }catch(e){return ''}
  }
  function saveLast(value){
    if(!value) return;
    try{localStorage.setItem(LAST_KEY,JSON.stringify({day:dayKey(),text:value}))}catch(e){}
  }
  function getCount(doc){
    const el=doc&&doc.getElementById('count');
    const s=el?el.textContent:'';
    const m=s.match(/(\d+)\s*\/\s*3/);
    return m?Number(m[1]):0;
  }

  // Перехватываем автоматическое усыпление после 3-го предсказания.
  // Реальное усыпление разрешается только после следующего нажатия.
  window.addEventListener('message',e=>{
    const d=e&&e.data;
    if(d&&d.type==='owl-state'&&d.state==='sleep'&&!sleepRequested()){
      e.stopImmediatePropagation();
    }
  },true);

  function attach(frame){
    if(!frame||frame.dataset.thirdHoldV1==='1') return false;
    let doc;
    try{doc=frame.contentDocument}catch(e){return false}
    if(!doc) return false;
    const orb=doc.getElementById('orb');
    const scene=doc.getElementById('scene');
    const text=doc.getElementById('fortuneText');
    const hint=doc.getElementById('hint');
    if(!orb||!scene||!text||!hint) return false;
    frame.dataset.thirdHoldV1='1';

    function restoreThird(){
      if(sleepRequested()||getCount(doc)<3) return;
      const last=readLast();
      if(!last) return;
      scene.classList.remove('exhausted');
      text.style.whiteSpace='normal';
      text.textContent=last;
      text.classList.add('show');
      hint.textContent='Последнее предсказание на сегодня';
      try{window.postMessage({type:'owl-state',state:'active'},'*')}catch(e){}
    }

    function rememberThird(){
      if(getCount(doc)<3||sleepRequested()) return;
      const value=(text.textContent||'').trim();
      if(!value) return;
      if(value.includes('Сова устала предсказывать')||value.includes('Приходи завтра')) return;
      saveLast(value);
    }

    orb.addEventListener('click',()=>{
      if(getCount(doc)>=3&&!sleepRequested()) requestSleep();
    },true);
    orb.addEventListener('keydown',e=>{
      if((e.key==='Enter'||e.key===' ')&&getCount(doc)>=3&&!sleepRequested()) requestSleep();
    },true);

    const mo=new MutationObserver(()=>{
      rememberThird();
      if(scene.classList.contains('exhausted')&&!sleepRequested()) restoreThird();
    });
    mo.observe(scene,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});

    setTimeout(()=>{rememberThird();restoreThird()},40);
    setTimeout(()=>{rememberThird();restoreThird()},350);
    return true;
  }

  function bind(){
    const frame=document.querySelector('#orbModalV4 .owl-frame-v4');
    if(!frame) return;
    attach(frame);
    if(!frame.dataset.thirdHoldLoadBound){
      frame.dataset.thirdHoldLoadBound='1';
      frame.addEventListener('load',()=>setTimeout(()=>attach(frame),20));
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
  setInterval(bind,500);
})();
