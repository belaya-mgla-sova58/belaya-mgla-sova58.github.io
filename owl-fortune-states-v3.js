(function(){
  var KEY='belaya_mgla_owl_fortune_v1';
  var MAX=3;
  var GOLDEN=new Set([5,29,48,79,95]);
  var CHUNKS={
    idle:['assets/owl-video/start-01.b64','assets/owl-video/start-02.b64','assets/owl-video/start-03.b64','assets/owl-video/start-04.b64'],
    reading:['assets/owl-video/reading-01.b64','assets/owl-video/reading-02.b64','assets/owl-video/reading-03.b64'],
    ready:['assets/owl-video/ready-01.b64','assets/owl-video/ready-02.b64','assets/owl-video/ready-03.b64'],
    rare:['assets/owl-video/rare-01.b64'],
    sleep:[]
  };
  var POSTER={
    idle:'https://cdn.creativeclaw.co/u/9f9da7ef/images/46299034-a48a-48db-9536-480a438c9f33.png',
    reading:'https://cdn.creativeclaw.co/u/9f9da7ef/images/0043c267-4133-4e99-bbed-39131412de0e.png',
    ready:'https://cdn.creativeclaw.co/u/9f9da7ef/images/c63dbcab-c50c-4408-9a23-643284d4fb7f.png',
    rare:'https://cdn.creativeclaw.co/u/9f9da7ef/images/089099d8-7a94-4188-b738-b08b46d15c8b.png',
    sleep:'https://cdn.creativeclaw.co/u/9f9da7ef/images/ec5e7825-c2d5-4c44-a8d6-d343c510b440.png'
  };
  var mediaCache={};
  var mediaPromise={};
  var tries=0;

  function day(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function getState(){try{var s=JSON.parse(localStorage.getItem(KEY)||'{}');return s.day===day()?s:{day:day(),used:0,last:-1}}catch(e){return{day:day(),used:0,last:-1}}}

  function decodeBase64ToBlob(parts){
    var b64=parts.join('').replace(/\s+/g,'');
    if(!b64)throw new Error('empty owl video');
    var binary=atob(b64);
    var bytes=new Uint8Array(binary.length);
    for(var i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    return new Blob([bytes],{type:'video/mp4'});
  }

  function loadMedia(kind){
    if(mediaCache[kind])return Promise.resolve(mediaCache[kind]);
    if(mediaPromise[kind])return mediaPromise[kind];
    var files=CHUNKS[kind]||[];
    if(!files.length)return Promise.reject(new Error('no animated media for '+kind));
    mediaPromise[kind]=Promise.all(files.map(function(url){
      return fetch(url+'?v=20261028-owlchunks2',{cache:'force-cache'}).then(function(r){
        if(!r.ok)throw new Error(url+' '+r.status);
        return r.text();
      });
    })).then(function(parts){
      var blob=decodeBase64ToBlob(parts);
      var url=URL.createObjectURL(blob);
      mediaCache[kind]=url;
      return url;
    }).catch(function(err){
      delete mediaPromise[kind];
      throw err;
    });
    return mediaPromise[kind];
  }

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
    var back=document.getElementById('sova58FortuneBackdrop');
    var close=document.getElementById('sova58FortuneClose');
    if(!panel||!art||!video||!text||!btn||!badge||!orb||!lower||!back){if(tries<100)setTimeout(install,100);return;}
    if(window.__sova58FortuneStatesV3)return;window.__sova58FortuneStatesV3=true;

    video.removeAttribute('poster');
    video.removeAttribute('src');
    video.muted=true;video.loop=true;video.autoplay=true;video.playsInline=true;video.preload='auto';
    art.querySelectorAll('.owlFortunePosterWrap,.sova58FortunePosterWrap').forEach(function(x){x.remove()});

    var style=document.createElement('style');
    style.id='sova58FortuneStatesStyleV3';
    style.textContent=`
#sova58FortunePanel{border:1px solid rgba(157,222,255,.78)!important;box-shadow:0 34px 110px rgba(0,0,0,.72),0 0 0 1px rgba(102,91,255,.26),0 0 34px rgba(65,137,255,.32),inset 0 0 34px rgba(94,139,255,.08)!important;background:linear-gradient(180deg,#09162f,#06101f)!important;transition:.35s ease}
#sova58FortunePanel:after{content:'';position:absolute;inset:4px;border-radius:21px;border:1px solid rgba(190,234,255,.20);box-shadow:inset 0 0 20px rgba(123,91,255,.12);pointer-events:none;z-index:4}
#sova58FortuneArt{position:relative!important;display:block!important;visibility:visible!important;opacity:1!important;width:100%!important;height:auto!important;min-height:0!important;aspect-ratio:3/2!important;overflow:hidden!important;background-color:#07152f!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important;border-bottom:1px solid rgba(140,213,255,.34)!important;box-shadow:inset 0 -20px 30px rgba(3,8,22,.22)!important;transform:none!important;filter:none!important}
#sova58FortuneVideo{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;background:transparent!important;filter:none!important;transform:none!important;z-index:1!important;pointer-events:none!important;transition:opacity .22s ease!important}
#sova58FortuneText{border:1px solid rgba(123,205,255,.82)!important;box-shadow:0 0 0 1px rgba(111,91,255,.25),0 0 22px rgba(54,130,255,.17),inset 0 0 18px rgba(83,120,255,.08)!important;background:linear-gradient(180deg,rgba(14,35,75,.97),rgba(9,23,51,.98))!important;transition:.35s ease}
#sova58FortunePanel.state-reading{box-shadow:0 34px 110px rgba(0,0,0,.72),0 0 0 1px rgba(167,125,255,.42),0 0 52px rgba(91,87,255,.48),inset 0 0 34px rgba(94,139,255,.12)!important}
#sova58FortuneText.golden{color:#ffe9a3!important;border-color:#ffd76a!important;background:radial-gradient(circle at 50% 0%,rgba(255,210,84,.18),transparent 58%),linear-gradient(180deg,#2f2550,#171c3b)!important;box-shadow:0 0 0 1px rgba(255,206,77,.38),0 0 32px rgba(255,197,58,.42),inset 0 0 24px rgba(255,208,79,.12)!important;animation:sova58GoldReveal .65s ease,sova58GoldPulse 1.8s ease-in-out 1}
#sova58FortunePanel.golden-hit{border-color:#ffd86d!important;box-shadow:0 34px 110px rgba(0,0,0,.72),0 0 0 1px rgba(255,214,99,.52),0 0 58px rgba(255,192,44,.55),inset 0 0 34px rgba(255,206,74,.12)!important}
#sova58FortuneOrb.golden-hit{filter:drop-shadow(0 12px 24px rgba(0,0,0,.42)) drop-shadow(0 0 28px rgba(255,205,74,.95))!important;animation:sova58OrbFloat 2.7s ease-in-out infinite,sova58OrbGold .8s ease 1}
@keyframes sova58GoldReveal{0%{transform:scale(.97);opacity:.45}100%{transform:none;opacity:1}}
@keyframes sova58GoldPulse{0%,100%{box-shadow:0 0 0 1px rgba(255,206,77,.38),0 0 32px rgba(255,197,58,.42)}50%{box-shadow:0 0 0 1px rgba(255,232,148,.72),0 0 50px rgba(255,199,61,.74)}}
@keyframes sova58OrbGold{0%{transform:scale(1)}45%{transform:scale(1.16)}100%{transform:scale(1)}}
#sova58FortuneRare{display:none;color:#ffd96f;font:800 13px/1.2 system-ui;text-shadow:0 0 12px rgba(255,202,66,.55)}
#sova58FortuneRare.show{display:block}
@media(max-width:760px){#sova58FortuneArt{aspect-ratio:3/2!important}}
`;
    document.head.appendChild(style);

    var rare=document.getElementById('sova58FortuneRare');
    if(!rare){rare=document.createElement('div');rare.id='sova58FortuneRare';rare.textContent='✨ Редкое предсказание ✨';var counter=document.getElementById('sova58FortuneCounter');lower.insertBefore(rare,counter)}

    var revealing=false;
    var capturedResult='';
    var justRevealed=false;
    var currentKind='';
    var sceneToken=0;

    function showPoster(kind){
      var poster=POSTER[kind]||POSTER.idle;
      art.style.setProperty('background-image','url("'+poster+'")','important');
      art.style.setProperty('background-position','center','important');
      art.style.setProperty('background-size','cover','important');
      art.style.setProperty('background-repeat','no-repeat','important');
    }

    function hideVideo(){
      try{video.pause()}catch(e){}
      video.style.setProperty('display','block','important');
      video.style.setProperty('visibility','visible','important');
      video.style.setProperty('opacity','0','important');
    }

    function revealVideo(){
      video.style.setProperty('display','block','important');
      video.style.setProperty('visibility','visible','important');
      video.style.setProperty('opacity','1','important');
    }

    function setVideo(kind,restart){
      currentKind=kind;
      var token=++sceneToken;
      showPoster(kind);
      hideVideo();
      var files=CHUNKS[kind]||[];
      if(!files.length)return;
      loadMedia(kind).then(function(src){
        if(token!==sceneToken||currentKind!==kind)return;
        var onReady=function(){
          video.removeEventListener('loadeddata',onReady);
          if(token!==sceneToken||currentKind!==kind)return;
          revealVideo();
          if(restart){try{video.currentTime=0}catch(e){}}
          try{var p=video.play();if(p&&p.catch)p.catch(function(){})}catch(e){}
        };
        video.addEventListener('loadeddata',onReady);
        video.setAttribute('src',src);
        video.loop=true;video.muted=true;video.playbackRate=1;
        try{video.load()}catch(e){}
        if(video.readyState>=2)onReady();
      }).catch(function(){
        if(token!==sceneToken||currentKind!==kind)return;
        hideVideo();
      });
    }

    video.addEventListener('error',function(){
      hideVideo();
      showPoster(currentKind||'idle');
    });

    function setState(name,kind,restart){
      panel.classList.remove('state-idle','state-reading','state-done');
      panel.classList.add('state-'+name);
      setVideo(kind,restart);
    }
    function clearGolden(){text.classList.remove('golden');rare.classList.remove('show');panel.classList.remove('golden-hit');orb.classList.remove('golden-hit')}
    function applyGolden(){text.classList.add('golden');rare.classList.add('show');panel.classList.add('golden-hit');orb.classList.add('golden-hit');setTimeout(function(){orb.classList.remove('golden-hit')},1000)}

    function refreshLabels(keepResult,resultKind){
      var s=getState(),left=Math.max(0,MAX-s.used);
      badge.classList.toggle('moon',left===0);badge.textContent=left===0?'🌙':left;
      var counter=document.getElementById('sova58FortuneCounter');if(counter)counter.textContent='Сегодня осталось: '+left+' из '+MAX;
      btn.disabled=left===0;
      if(left===0){
        btn.textContent='🌙 Приходи завтра';btn.setAttribute('aria-label','Приходи завтра');
        if(keepResult){setState('done',resultKind||'ready',false)}
        else{clearGolden();text.textContent='На сегодня предсказания закончились. Сова тоже отдыхает. 🦉';setState('done','sleep',true)}
      }else if(s.used===0){
        btn.textContent='🔮 Узнать предсказание';btn.setAttribute('aria-label','Узнать предсказание');
        if(!keepResult){clearGolden();setState('idle','idle',true)}
      }else{
        btn.textContent='🔮 Ещё одно предсказание';btn.setAttribute('aria-label','Ещё одно предсказание');
        if(!keepResult){clearGolden();setState('idle','idle',true)}
      }
    }

    function candidateFromNode(n){
      var t=(n&&n.textContent||'').trim();
      if(!t || t==='🔮 Сова заглядывает в будущее…' || t==='Нажми на кнопку, и сова откроет предсказание.' || t.indexOf('На сегодня предсказания закончились')===0)return '';
      return t;
    }

    var textObserver=new MutationObserver(function(records){
      if(!revealing)return;
      records.forEach(function(r){
        if(r.type==='childList')Array.prototype.forEach.call(r.addedNodes,function(n){var c=candidateFromNode(n);if(c)capturedResult=c});
        if(r.type==='characterData'){var c=candidateFromNode(r.target);if(c)capturedResult=c;}
      });
    });
    textObserver.observe(text,{childList:true,subtree:true,characterData:true});

    btn.addEventListener('click',function(){
      var before=getState();
      if(before.used>=MAX){justRevealed=false;capturedResult='';clearGolden();refreshLabels(false);return;}
      revealing=true;justRevealed=false;capturedResult='';clearGolden();setState('reading','reading',true);
      setTimeout(function(){
        var s=getState();
        var idx=s.last;
        var result=capturedResult;
        text.textContent='🔮 Сова заглядывает в будущее…';
        setTimeout(function(){
          if(result)text.textContent=result;
          revealing=false;justRevealed=true;
          var isGolden=GOLDEN.has(Number(idx));
          if(isGolden)applyGolden();else clearGolden();
          refreshLabels(true,isGolden?'rare':'ready');
        },1400);
      },50);
    },true);

    orb.addEventListener('click',function(){
      setTimeout(function(){
        var s=getState();
        justRevealed=false;capturedResult='';clearGolden();
        refreshLabels(false);
      },0);
    });

    if(close)close.addEventListener('click',function(){justRevealed=false;capturedResult='';clearGolden()});
    back.addEventListener('click',function(e){if(e.target===back){justRevealed=false;capturedResult='';clearGolden()}});

    refreshLabels(false);
    loadMedia('reading').catch(function(){});
    loadMedia('ready').catch(function(){});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
