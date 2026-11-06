(function(){
  var tries=0;
  function apply(){
    tries++;
    var art=document.getElementById('sova58FortuneArt');
    var video=document.getElementById('sova58FortuneVideo');
    var panel=document.getElementById('sova58FortunePanel');
    var lower=document.getElementById('sova58FortuneLower');
    var close=document.getElementById('sova58FortuneClose');
    if(!art||!panel||!lower||!close){if(tries<100)setTimeout(apply,100);return;}
    try{if(video){video.pause();video.removeAttribute('src');video.load();}}catch(e){}
    art.style.setProperty('display','none','important');
    art.style.setProperty('height','0','important');
    art.style.setProperty('min-height','0','important');
    art.style.setProperty('aspect-ratio','auto','important');
    art.style.setProperty('background','none','important');
    lower.style.setProperty('padding-top','54px','important');
    panel.style.setProperty('min-height','0','important');
    close.style.setProperty('top','10px','important');
    close.style.setProperty('right','10px','important');
    var poster=document.getElementById('sova58FortunePosterImage');
    if(poster) poster.remove();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
