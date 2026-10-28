(function(){
  var tries=0;
  function apply(){
    tries++;
    var art=document.getElementById('sova58FortuneArt');
    var video=document.getElementById('sova58FortuneVideo');
    if(!art||!video){if(tries<80)setTimeout(apply,100);return;}
    var poster='assets/owl-fortune-poster.webp?v=20261028-1';
    art.style.backgroundImage='url("'+poster+'")';
    art.style.backgroundPosition='center';
    art.style.backgroundSize='cover';
    art.style.backgroundRepeat='no-repeat';
    video.poster=poster;
    function fallback(){if(video.readyState<2){video.style.display='none';}}
    video.addEventListener('error',function(){video.style.display='none';});
    video.addEventListener('loadeddata',function(){video.style.display='block';});
    setTimeout(fallback,1400);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
