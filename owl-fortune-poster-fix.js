(function(){
  var tries=0;
  var ORB='assets/owl-fortune-orb.png?v=20261028-2';
  var POSTER='assets/owl-fortune-poster.webp?v=20261028-2';

  function makeOrbVisible(orb){
    if(!orb) return;
    orb.style.background='transparent';
    orb.style.borderRadius='50%';
    orb.style.overflow='visible';
    var img=document.getElementById('sova58FortuneOrbImage');
    if(!img){
      img=document.createElement('img');
      img.id='sova58FortuneOrbImage';
      img.alt='';
      img.setAttribute('aria-hidden','true');
      img.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;border-radius:50%;pointer-events:none;z-index:0;display:block;';
      orb.insertBefore(img,orb.firstChild);
    }
    fetch(ORB,{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('orb '+r.status);return r.arrayBuffer();}).then(function(buf){
      var a=new Uint8Array(buf,0,Math.min(buf.byteLength,16));
      var type=(a.length>=12&&a[0]===82&&a[1]===73&&a[2]===70&&a[3]===70&&a[8]===87&&a[9]===69&&a[10]===66&&a[11]===80)?'image/webp':'image/png';
      img.src=URL.createObjectURL(new Blob([buf],{type:type}));
    }).catch(function(){img.src=ORB;});
    var badge=document.getElementById('sova58FortuneBadge');
    if(badge){badge.style.position='absolute';badge.style.zIndex='3';}
  }

  function makePosterVisible(art,video){
    if(!art||!video) return;
    art.style.background='#081224';
    var img=document.getElementById('sova58FortunePosterImage');
    if(!img){
      img=document.createElement('img');
      img.id='sova58FortunePosterImage';
      img.alt='Сова-предсказательница';
      img.src=POSTER;
      img.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;display:block;opacity:1;';
      art.insertBefore(img,art.firstChild);
    }else{
      img.src=POSTER;
    }

    video.poster=POSTER;
    video.style.zIndex='2';
    video.style.opacity='0';
    video.style.background='transparent';
    video.style.display='block';
    video.style.transition='opacity .22s ease,filter .35s ease,transform .35s ease';

    var reveal=function(){
      if(video.videoWidth>0 && video.videoHeight>0 && video.currentTime>0.02){video.style.opacity='1';}
    };
    var hide=function(){video.style.opacity='0';};
    video.addEventListener('playing',function(){setTimeout(reveal,80);});
    video.addEventListener('timeupdate',reveal);
    video.addEventListener('error',hide);
    video.addEventListener('stalled',hide);
    video.addEventListener('emptied',hide);

    if(video.currentTime>0.02 && !video.paused) reveal();
  }

  function apply(){
    tries++;
    var orb=document.getElementById('sova58FortuneOrb');
    var art=document.getElementById('sova58FortuneArt');
    var video=document.getElementById('sova58FortuneVideo');
    if(!orb||!art||!video){if(tries<100)setTimeout(apply,100);return;}
    makeOrbVisible(orb);
    makePosterVisible(art,video);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
