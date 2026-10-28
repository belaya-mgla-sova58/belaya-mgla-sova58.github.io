(function(){
  var KEY='belaya_mgla_owl_fortune_v1';
  var MAX=3;
  var POSTER={
    idle:'https://cdn.creativeclaw.co/u/9f9da7ef/images/46299034-a48a-48db-9536-480a438c9f33.png',
    reading:'https://cdn.creativeclaw.co/u/9f9da7ef/images/0043c267-4133-4e99-bbed-39131412de0e.png',
    ready:'https://cdn.creativeclaw.co/u/9f9da7ef/images/c63dbcab-c50c-4408-9a23-643284d4fb7f.png',
    rare:'https://cdn.creativeclaw.co/u/9f9da7ef/images/089099d8-7a94-4188-b738-b08b46d15c8b.png',
    sleep:'https://cdn.creativeclaw.co/u/9f9da7ef/images/ec5e7825-c2d5-4c44-a8d6-d343c510b440.png'
  };
  var tries=0;
  function day(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function state(){try{var s=JSON.parse(localStorage.getItem(KEY)||'{}');return s.day===day()?s:{day:day(),used:0,last:-1}}catch(e){return{day:day(),used:0,last:-1}}}
  function init(){
    tries++;
    var panel=document.getElementById('sova58FortunePanel');
    var art=document.getElementById('sova58FortuneArt');
    var video=document.getElementById('sova58FortuneVideo');
    var btn=document.getElementById('sova58FortuneBtn');
    var rare=document.getElementById('sova58FortuneRare');
    if(!panel||!art||!btn){if(tries<120)setTimeout(init,100);return;}
    if(window.__sova58FortuneStaticHQV1)return;window.__sova58FortuneStaticHQV1=true;

    var style=document.createElement('style');
    style.id='sova58FortuneStaticHQStyleV1';
    style.textContent='#sova58FortuneArt{position:relative!important;overflow:hidden!important;background:#07152f!important;background-image:none!important;aspect-ratio:3/2!important}#sova58FortunePosterImg{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;display:block!important;visibility:visible!important;opacity:1!important;object-fit:cover!important;object-position:center!important;image-rendering:auto!important;z-index:3!important;pointer-events:none!important;filter:none!important;transform:none!important}#sova58FortuneVideo{display:none!important;visibility:hidden!important;opacity:0!important;z-index:1!important}@media(max-width:760px){#sova58FortuneArt{aspect-ratio:3/2!important}}';
    document.head.appendChild(style);

    var img=document.getElementById('sova58FortunePosterImg');
    if(!img){
      img=document.createElement('img');
      img.id='sova58FortunePosterImg';
      img.alt='';
      img.decoding='async';
      img.draggable=false;
      art.appendChild(img);
    }
    if(video){try{video.pause()}catch(e){} video.removeAttribute('src');}

    var current='';
    function setPoster(kind){
      kind=POSTER[kind]?kind:'idle';
      if(current===kind&&img.getAttribute('src'))return;
      current=kind;
      var src=POSTER[kind];
      img.onerror=function(){
        img.onerror=null;
        if(kind!=='idle'){current='idle';img.src=POSTER.idle;}
      };
      img.src=src;
    }
    function choose(){
      var s=state(),left=Math.max(0,MAX-(Number(s.used)||0));
      if(left===0)return 'sleep';
      if(panel.classList.contains('state-reading'))return 'reading';
      if(panel.classList.contains('golden-hit')||(rare&&rare.classList.contains('show')))return 'rare';
      if(panel.classList.contains('state-done'))return 'ready';
      return 'idle';
    }
    function sync(){setPoster(choose());}

    sync();
    var mo=new MutationObserver(sync);
    mo.observe(panel,{attributes:true,attributeFilter:['class'],subtree:true,childList:true,characterData:true});
    btn.addEventListener('click',function(){
      var s=state();
      if((Number(s.used)||0)>=MAX){setPoster('sleep');return;}
      setPoster('reading');
      setTimeout(sync,1700);
      setTimeout(sync,2300);
    },true);
    document.addEventListener('visibilitychange',function(){if(!document.hidden)sync();});
    window.addEventListener('focus',sync);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
