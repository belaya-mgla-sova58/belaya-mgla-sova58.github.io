(function(){
  var KEY='belaya_mgla_owl_fortune_v1';
  var MAX=3;
  var SPRITE='assets/owl-states-hq-v1.webp.b64?v=20261028-hq3';
  var POS={idle:'0%',reading:'25%',ready:'50%',rare:'75%',sleep:'100%'};
  var tries=0;
  var spriteUrl='';
  var spritePromise=null;

  function day(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function state(){try{var s=JSON.parse(localStorage.getItem(KEY)||'{}');return s.day===day()?s:{day:day(),used:0,last:-1}}catch(e){return{day:day(),used:0,last:-1}}}
  function loadSprite(){
    if(spriteUrl)return Promise.resolve(spriteUrl);
    if(spritePromise)return spritePromise;
    spritePromise=fetch(SPRITE,{cache:'force-cache'}).then(function(r){if(!r.ok)throw new Error('sprite '+r.status);return r.text()}).then(function(b64){
      b64=b64.replace(/\s+/g,'');
      var bin=atob(b64),bytes=new Uint8Array(bin.length);
      for(var i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
      spriteUrl=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
      return spriteUrl;
    });
    return spritePromise;
  }
  function init(){
    tries++;
    var panel=document.getElementById('sova58FortunePanel');
    var art=document.getElementById('sova58FortuneArt');
    var video=document.getElementById('sova58FortuneVideo');
    var btn=document.getElementById('sova58FortuneBtn');
    var rare=document.getElementById('sova58FortuneRare');
    if(!panel||!art||!btn){if(tries<120)setTimeout(init,100);return;}
    if(window.__sova58FortuneStaticHQV1)return;window.__sova58FortuneStaticHQV1=true;

    var oldImg=document.getElementById('sova58FortunePosterImg');
    if(oldImg)oldImg.remove();
    if(video){try{video.pause()}catch(e){} video.removeAttribute('src');}

    var style=document.createElement('style');
    style.id='sova58FortuneStaticHQStyleV1';
    style.textContent='#sova58FortuneArt{position:relative!important;overflow:hidden!important;aspect-ratio:3/2!important;background-color:#07152f!important;background-repeat:no-repeat!important;background-size:100% 500%!important;filter:none!important;transform:none!important}#sova58FortuneVideo{display:none!important;visibility:hidden!important;opacity:0!important;z-index:1!important}@media(max-width:760px){#sova58FortuneArt{aspect-ratio:3/2!important}}';
    var prev=document.getElementById(style.id);if(prev)prev.remove();document.head.appendChild(style);

    var current='';
    function choose(){
      var s=state(),left=Math.max(0,MAX-(Number(s.used)||0));
      if(left===0)return 'sleep';
      if(panel.classList.contains('state-reading'))return 'reading';
      if(panel.classList.contains('golden-hit')||(rare&&rare.classList.contains('show')))return 'rare';
      if(panel.classList.contains('state-done'))return 'ready';
      return 'idle';
    }
    function paint(kind){
      kind=POS[kind]!=null?kind:'idle';
      current=kind;
      loadSprite().then(function(url){
        if(current!==kind)return;
        art.style.setProperty('background-image','url("'+url+'")','important');
        art.style.setProperty('background-size','100% 500%','important');
        art.style.setProperty('background-position','center '+POS[kind],'important');
        art.style.setProperty('background-repeat','no-repeat','important');
      }).catch(function(){
        art.style.setProperty('background-image','none','important');
      });
    }
    function sync(){paint(choose());}

    loadSprite().then(sync).catch(function(){});
    sync();
    var mo=new MutationObserver(sync);
    mo.observe(panel,{attributes:true,attributeFilter:['class'],subtree:true,childList:true,characterData:true});
    btn.addEventListener('click',function(){
      var s=state();
      if((Number(s.used)||0)>=MAX){paint('sleep');return;}
      paint('reading');
      setTimeout(sync,1700);
      setTimeout(sync,2300);
    },true);
    document.addEventListener('visibilitychange',function(){if(!document.hidden)sync();});
    window.addEventListener('focus',sync);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
