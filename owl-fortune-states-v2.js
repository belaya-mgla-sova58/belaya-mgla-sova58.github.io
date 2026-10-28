(function(){
  var KEY='belaya_mgla_owl_fortune_v1';
  var MAX=3;
  var GOLDEN=new Set([5,29,48,79,95]);
  var tries=0;

  function day(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function getState(){try{var s=JSON.parse(localStorage.getItem(KEY)||'{}');return s.day===day()?s:{day:day(),used:0,last:-1}}catch(e){return{day:day(),used:0,last:-1}}}

  function install(){
    tries++;
    var panel=document.getElementById('sova58FortunePanel');
    var art=document.getElementById('sova58FortuneArt');
    var video=document.getElementById('sova58FortuneVideo');
    var text=document.getElementById('sova58FortuneText');
    var btn=document.getElementById('sova58FortuneBtn');
    var badge=document.getElementById('sova58FortuneBadge');
    var orb=document.getElementById('sova58FortuneOrb');
    var lower=document.getElementById('sova58FortuneLower');
    if(!panel||!art||!text||!btn||!badge||!orb||!lower){if(tries<100)setTimeout(install,100);return;}
    if(document.getElementById('sova58FortuneStatesStyle')) return;

    var style=document.createElement('style');
    style.id='sova58FortuneStatesStyle';
    style.textContent=`
#sova58FortunePanel{border:1px solid rgba(157,222,255,.78)!important;box-shadow:0 34px 110px rgba(0,0,0,.72),0 0 0 1px rgba(102,91,255,.26),0 0 34px rgba(65,137,255,.32),inset 0 0 34px rgba(94,139,255,.08)!important;background:linear-gradient(180deg,#09162f,#06101f)!important;transition:.35s ease}
#sova58FortunePanel:after{content:'';position:absolute;inset:4px;border-radius:21px;border:1px solid rgba(190,234,255,.20);box-shadow:inset 0 0 20px rgba(123,91,255,.12);pointer-events:none;z-index:4}
#sova58FortuneArt{border-bottom:1px solid rgba(140,213,255,.34);box-shadow:inset 0 -20px 30px rgba(3,8,22,.34),inset 0 0 26px rgba(117,143,255,.10)}
#sova58FortuneText{border:1px solid rgba(123,205,255,.82)!important;box-shadow:0 0 0 1px rgba(111,91,255,.25),0 0 22px rgba(54,130,255,.17),inset 0 0 18px rgba(83,120,255,.08)!important;background:linear-gradient(180deg,rgba(14,35,75,.97),rgba(9,23,51,.98))!important;transition:.35s ease}
#sova58FortunePanel.state-idle #sova58FortuneArt{filter:none}
#sova58FortunePanel.state-reading{box-shadow:0 34px 110px rgba(0,0,0,.72),0 0 0 1px rgba(167,125,255,.42),0 0 52px rgba(91,87,255,.52),inset 0 0 34px rgba(94,139,255,.12)!important}
#sova58FortunePanel.state-reading #sova58FortuneArt{filter:brightness(1.12) saturate(1.16);transform:scale(1.012) rotate(-.6deg);transition:.4s ease}
#sova58FortunePanel.state-reading #sova58FortuneArt:before{content:'🔮';position:absolute;left:50%;bottom:10px;z-index:6;transform:translateX(-50%);font-size:26px;filter:drop-shadow(0 0 12px #8f76ff);animation:sova58CrystalSpin 1.1s linear infinite}
@keyframes sova58CrystalSpin{0%{transform:translateX(-50%) rotate(0deg) scale(.95)}50%{transform:translateX(-50%) rotate(180deg) scale(1.08)}100%{transform:translateX(-50%) rotate(360deg) scale(.95)}}
#sova58FortunePanel.state-done #sova58FortuneArt{filter:brightness(.78) saturate(.68);transition:.5s ease}
#sova58FortunePanel.state-done #sova58FortuneVideo{filter:brightness(.76) saturate(.68)}
#sova58FortuneText.golden{color:#ffe9a3!important;border-color:#ffd76a!important;background:radial-gradient(circle at 50% 0%,rgba(255,210,84,.18),transparent 58%),linear-gradient(180deg,#2f2550,#171c3b)!important;box-shadow:0 0 0 1px rgba(255,206,77,.38),0 0 32px rgba(255,197,58,.42),inset 0 0 24px rgba(255,208,79,.12)!important;animation:sova58GoldReveal .65s ease,sova58GoldPulse 1.8s ease-in-out 1}
#sova58FortunePanel.golden-hit{border-color:#ffd86d!important;box-shadow:0 34px 110px rgba(0,0,0,.72),0 0 0 1px rgba(255,214,99,.52),0 0 58px rgba(255,192,44,.55),inset 0 0 34px rgba(255,206,74,.12)!important}
#sova58FortuneOrb.golden-hit{filter:drop-shadow(0 12px 24px rgba(0,0,0,.42)) drop-shadow(0 0 28px rgba(255,205,74,.95))!important;animation:sova58OrbFloat 2.7s ease-in-out infinite,sova58OrbGold .8s ease 1}
@keyframes sova58GoldReveal{0%{transform:scale(.97);opacity:.45}100%{transform:none;opacity:1}}
@keyframes sova58GoldPulse{0%,100%{box-shadow:0 0 0 1px rgba(255,206,77,.38),0 0 32px rgba(255,197,58,.42)}50%{box-shadow:0 0 0 1px rgba(255,232,148,.72),0 0 50px rgba(255,199,61,.74)}}
@keyframes sova58OrbGold{0%{transform:scale(1)}45%{transform:scale(1.16)}100%{transform:scale(1)}}
#sova58FortuneRare{display:none;color:#ffd96f;font:800 13px/1.2 system-ui;text-shadow:0 0 12px rgba(255,202,66,.55)}
#sova58FortuneRare.show{display:block}
`;
    document.head.appendChild(style);

    var rare=document.getElementById('sova58FortuneRare');
    if(!rare){rare=document.createElement('div');rare.id='sova58FortuneRare';rare.textContent='✨ Редкое предсказание ✨';var counter=document.getElementById('sova58FortuneCounter');lower.insertBefore(rare,counter)}

    function setState(name){
      panel.classList.remove('state-idle','state-reading','state-done');panel.classList.add('state-'+name);
      if(video){
        if(name==='reading'){video.loop=true;video.playbackRate=1.12;try{video.currentTime=0}catch(e){};try{var p=video.play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
        else if(name==='done'){video.loop=false;video.playbackRate=1;try{if(video.readyState>=1){video.currentTime=Math.min(4.7,Math.max(0,(video.duration||4.8)-.08));video.pause()}}catch(e){}}
        else{video.loop=true;video.playbackRate=.62;}
      }
    }
    function clearGolden(){text.classList.remove('golden');rare.classList.remove('show');panel.classList.remove('golden-hit');orb.classList.remove('golden-hit')}
    function applyGolden(){text.classList.add('golden');rare.classList.add('show');panel.classList.add('golden-hit');orb.classList.add('golden-hit');setTimeout(function(){orb.classList.remove('golden-hit')},1000)}
    function refreshLabels(){
      var s=getState(),left=Math.max(0,MAX-s.used);
      badge.classList.toggle('moon',left===0);badge.textContent=left===0?'🌙':left;
      if(left===0){btn.textContent='🌙 Приходи завтра';btn.setAttribute('aria-label','Приходи завтра');setState('done')}
      else if(s.used===0){btn.textContent='🔮 Узнать предсказание';btn.setAttribute('aria-label','Узнать предсказание');setState('idle')}
      else{btn.textContent='🔮 Ещё одно предсказание';btn.setAttribute('aria-label','Ещё одно предсказание');setState('idle')}
    }

    var revealing=false;
    btn.addEventListener('click',function(){
      var before=getState();
      if(before.used>=MAX){clearGolden();setState('done');refreshLabels();return;}
      revealing=true;clearGolden();setState('reading');
      setTimeout(function(){
        var s=getState();
        var result=text.textContent;
        var idx=s.last;
        text.textContent='🔮 Сова заглядывает в будущее…';
        setTimeout(function(){
          text.textContent=result;
          if(GOLDEN.has(idx))applyGolden();
          revealing=false;refreshLabels();
        },1400);
      },0);
    },true);

    var observer=new MutationObserver(function(){if(!revealing)refreshLabels()});
    observer.observe(text,{childList:true,subtree:true});
    orb.addEventListener('click',function(){setTimeout(function(){clearGolden();refreshLabels()},0)});
    refreshLabels();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();