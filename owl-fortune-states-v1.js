(function(){
  var tries=0;
  var MAX=3;
  var KEY='belaya_mgla_owl_fortune_v1';

  function day(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function state(){try{var s=JSON.parse(localStorage.getItem(KEY)||'{}');return s.day===day()?s:{day:day(),used:0,last:-1}}catch(e){return{day:day(),used:0,last:-1}}}

  function install(){
    tries++;
    var orb=document.getElementById('sova58FortuneOrb');
    var badge=document.getElementById('sova58FortuneBadge');
    var back=document.getElementById('sova58FortuneBackdrop');
    var panel=document.getElementById('sova58FortunePanel');
    var art=document.getElementById('sova58FortuneArt');
    var video=document.getElementById('sova58FortuneVideo');
    var text=document.getElementById('sova58FortuneText');
    var btn=document.getElementById('sova58FortuneBtn');
    var counter=document.getElementById('sova58FortuneCounter');
    if(!orb||!badge||!back||!panel||!art||!video||!text||!btn||!counter){if(tries<100)setTimeout(install,100);return;}
    if(window.__sova58FortuneStatesLoaded)return;
    window.__sova58FortuneStatesLoaded=true;

    var css=document.createElement('style');
    css.id='sova58-fortune-states-style';
    css.textContent=`
#sova58FortunePanel.state-idle{border-color:rgba(157,222,255,.78)}
#sova58FortunePanel.state-idle #sova58FortuneVideo{filter:none;transform:scale(1);transition:filter .35s ease,transform .35s ease}
#sova58FortunePanel.state-reading{border-color:rgba(146,174,255,.96)!important;box-shadow:0 34px 110px rgba(0,0,0,.72),0 0 0 1px rgba(135,109,255,.48),0 0 54px rgba(87,120,255,.56),inset 0 0 38px rgba(94,139,255,.12)!important}
#sova58FortunePanel.state-reading #sova58FortuneVideo{filter:brightness(1.12) saturate(1.18) contrast(1.03);animation:sova58OwlReading 1.55s ease-in-out infinite}
#sova58FortunePanel.state-reading #sova58FortuneArt:after{content:'';position:absolute;inset:0;z-index:3;pointer-events:none;background:radial-gradient(circle at 50% 72%,rgba(108,90,255,.34),transparent 42%);animation:sova58MagicPulse .9s ease-in-out infinite}
#sova58FortunePanel.state-done{border-color:rgba(139,147,177,.42)!important;box-shadow:0 28px 90px rgba(0,0,0,.64),0 0 28px rgba(70,82,126,.18)!important}
#sova58FortunePanel.state-done #sova58FortuneVideo{filter:brightness(.76) saturate(.68) contrast(.98);transform:scale(.992) translateY(3px);animation:none!important}
#sova58FortuneText.golden{color:#fff2a8!important;border-color:#ffd86b!important;background:radial-gradient(circle at 50% 0%,rgba(255,203,78,.22),transparent 54%),linear-gradient(180deg,#352910,#17120b)!important;box-shadow:0 0 0 1px rgba(255,211,96,.42),0 0 34px rgba(255,193,62,.32),inset 0 0 20px rgba(255,216,107,.12)!important;animation:sova58GoldPulse 1.05s ease-in-out 2}
#sova58FortuneGoldenNote{display:none;color:#ffd86b;font:800 13px/1.2 system-ui;letter-spacing:.02em;text-align:center;margin-top:-3px;text-shadow:0 0 12px rgba(255,201,72,.34)}
#sova58FortuneGoldenNote.show{display:block}
#sova58FortuneOrb.magic{filter:drop-shadow(0 12px 24px rgba(0,0,0,.42)) drop-shadow(0 0 29px rgba(126,102,255,.95));animation:sova58OrbMagic .7s ease-in-out infinite}
#sova58FortuneBadge.moon{background:linear-gradient(180deg,#27304d,#10182f);color:#ffe59b;border-color:#727b9f}
@keyframes sova58OwlReading{0%,100%{transform:translateY(0) rotate(0deg) scale(1.01)}25%{transform:translateY(-3px) rotate(-.45deg) scale(1.018)}75%{transform:translateY(-2px) rotate(.45deg) scale(1.018)}}
@keyframes sova58MagicPulse{0%,100%{opacity:.45;filter:blur(2px)}50%{opacity:1;filter:blur(8px)}}
@keyframes sova58GoldPulse{0%,100%{filter:brightness(1)}50%{filter:brightness(1.16)}}
@keyframes sova58OrbMagic{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-5px) scale(1.045)}}
`;
    document.head.appendChild(css);

    var goldenNote=document.getElementById('sova58FortuneGoldenNote');
    if(!goldenNote){
      goldenNote=document.createElement('div');
      goldenNote.id='sova58FortuneGoldenNote';
      goldenNote.textContent='✨ Редкое предсказание ✨';
      counter.parentNode.insertBefore(goldenNote,counter);
    }

    function clearGolden(){text.classList.remove('golden');goldenNote.classList.remove('show');}
    function showGolden(){text.classList.add('golden');goldenNote.classList.add('show');orb.classList.add('magic');setTimeout(function(){orb.classList.remove('magic')},1800);}
    function setState(name){
      panel.classList.remove('state-idle','state-reading','state-done');panel.classList.add('state-'+name);
      if(name==='reading'){
        try{video.loop=true;video.playbackRate=1.12;video.currentTime=0;var p=video.play();if(p&&p.catch)p.catch(function(){})}catch(e){}
        orb.classList.add('magic');
      }else if(name==='done'){
        orb.classList.remove('magic');
        try{video.loop=false;video.playbackRate=1;video.currentTime=Math.min(4.7,video.duration||4.7);video.pause()}catch(e){}
      }else{
        orb.classList.remove('magic');
        try{video.loop=true;video.playbackRate=.62;if(video.paused){var q=video.play();if(q&&q.catch)q.catch(function(){})}}catch(e){}
      }
    }
    function drawEnhanced(){
      var s=state(),left=Math.max(0,MAX-s.used);
      badge.classList.toggle('moon',left===0);
      badge.textContent=left===0?'🌙':left;
      if(left===0){
        counter.textContent='Лимит на сегодня исчерпан';
        btn.textContent='🌙 Приходи завтра';
        btn.setAttribute('aria-label','Приходи завтра');
        btn.disabled=false;
        setState('done');
      }else if(s.used===0){
        counter.textContent='Сегодня доступно: 3 предсказания';
        btn.textContent='🔮 Узнать предсказание';
        btn.setAttribute('aria-label','Узнать предсказание');
        btn.disabled=false;
        setState('idle');
      }else{
        counter.textContent='Сегодня осталось: '+left+' из '+MAX;
        btn.textContent='🔮 Ещё одно предсказание';
        btn.setAttribute('aria-label','Ещё одно предсказание');
        btn.disabled=false;
        setState('idle');
      }
    }

    orb.addEventListener('click',function(){setTimeout(function(){clearGolden();drawEnhanced()},0)});

    btn.addEventListener('click',function(e){
      var before=state();
      if(before.used>=MAX){
        e.preventDefault();e.stopImmediatePropagation();
        clearGolden();text.textContent='На сегодня всё 🔮 Приходи завтра и узнаешь, что тебя ждёт.';drawEnhanced();return;
      }
      clearGolden();setState('reading');btn.disabled=true;btn.textContent='🔮 Сова заглядывает в будущее…';
      var oldText=text.textContent;
      setTimeout(function(){
        var after=state();
        if(after.used>before.used){
          var rare=Math.random()<0.05;
          if(rare)showGolden();else clearGolden();
          drawEnhanced();
        }else if(text.textContent!==oldText){
          var rare2=Math.random()<0.05;
          if(rare2)showGolden();
          drawEnhanced();
        }else{
          drawEnhanced();
        }
      },180);
    },true);

    var observer=new MutationObserver(function(){
      var s=state();
      if(s.used>=MAX)setState('done');
    });
    observer.observe(text,{childList:true,subtree:true,characterData:true});
    drawEnhanced();
  }
  install();
})();