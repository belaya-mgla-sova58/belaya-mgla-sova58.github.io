(function(){
  function updateHomeDate(){
    var el=document.getElementById('homeTodayDateV581');
    if(!el) return;
    var now=new Date();
    var day=now.getDate();
    var month=now.toLocaleDateString('ru-RU',{month:'long'});
    el.textContent='Сегодня: '+day+' '+month;
  }

  function addPresidentVote(){
    if(document.getElementById('presidentVote58')) return;
    var home=document.querySelector('.modern-home-v424');
    if(!home) return;
    var news=document.querySelector('.home-news-v442');
    var style=document.createElement('style');
    style.textContent='#presidentVote58{margin:16px 0 20px;padding:20px;border:1px solid rgba(118,211,255,.28);border-radius:24px;background:linear-gradient(145deg,rgba(7,30,56,.95),rgba(4,19,38,.96));box-shadow:0 18px 46px rgba(0,0,0,.22)}#presidentVote58 h2{margin:0 0 8px;color:#f5fbff;font-size:24px}#presidentVote58 .pv-sub{margin:0 0 8px;color:#b9d3e7;line-height:1.45}#presidentVote58 .pv-deadline{margin:0 0 15px;color:#76d6ff;font-weight:900;font-size:14px}#presidentVote58 .pv-warning{margin:0 0 16px;padding:13px 14px;border-radius:16px;background:rgba(255,196,74,.08);border:1px solid rgba(255,208,99,.22);color:#ffe6ae;font-size:13px;line-height:1.45}#presidentVote58 label{display:block;margin:0 0 7px;color:#eaf7ff;font-weight:800}#presidentVote58 input[type=text]{box-sizing:border-box;width:100%;padding:13px 14px;border-radius:14px;border:1px solid rgba(135,220,255,.30);background:rgba(2,14,28,.82);color:#fff;font-size:16px;outline:none}#presidentVote58 input[type=text]:focus{border-color:#68d4ff;box-shadow:0 0 0 3px rgba(75,196,255,.10)}#presidentVote58 button{margin-top:12px;width:100%;padding:13px 16px;border:0;border-radius:14px;background:linear-gradient(145deg,#47c9ff,#278ce8);color:#fff;font-weight:900;font-size:15px;cursor:pointer}#presidentVote58 button:disabled{opacity:.55;cursor:not-allowed}#presidentVote58 .pv-status{margin:11px 0 0;color:#9fd9f5;font-size:13px;text-align:center;min-height:18px}@media(max-width:620px){#presidentVote58{padding:15px;border-radius:18px}#presidentVote58 h2{font-size:21px}}';
    document.head.appendChild(style);
    var sec=document.createElement('section');
    sec.id='presidentVote58';
    sec.setAttribute('aria-labelledby','presidentVote58Title');
    sec.innerHTML='<h2 id="presidentVote58Title">🗳️ Выбор президента 58-го</h2><p class="pv-sub">За кого голосуете?</p><p class="pv-deadline">⏰ Голосование до 17:00 24 октября</p><div class="pv-warning"><b>Важно:</b> ник игрока нужно <b>скопировать прямо из игры «Белая мгла»</b> и вставить в поле ниже. <b>Не вводите ник вручную.</b> Даже одна лишняя буква, пробел или символ может записать голос отдельно.</div><form id="presidentVote58Form" name="president-vote-58" method="POST" action="https://belaya-mgla-58.netlify.app/__forms.html" target="presidentVote58Frame"><input type="hidden" name="form-name" value="president-vote-58"><label for="presidentVoteNick58">За кого голосуете?</label><input id="presidentVoteNick58" name="player_nick" type="text" autocomplete="off" spellcheck="false" placeholder="Вставьте скопированный ник игрока" required><button type="submit">ОТДАТЬ ГОЛОС</button><p class="pv-status" id="presidentVote58Status"></p></form><iframe name="presidentVote58Frame" title="Отправка голоса" hidden></iframe>';
    if(news&&news.parentNode) news.parentNode.insertBefore(sec,news); else home.insertBefore(sec,home.firstChild);
    var form=document.getElementById('presidentVote58Form');
    var status=document.getElementById('presidentVote58Status');
    var frame=sec.querySelector('iframe');
    var submitted=false;
    var votedKey='belaya-mgla-president-vote-58-v1';
    var deadline=new Date('2026-10-24T17:00:00+03:00');
    function closeIfNeeded(){
      if(Date.now()>=deadline.getTime()){
        form.querySelector('input[type=text]').disabled=true;
        form.querySelector('button').disabled=true;
        status.textContent='🔒 Голосование завершено 24 октября в 17:00.';
        return true;
      }
      return false;
    }
    if(closeIfNeeded()) return;
    try{if(localStorage.getItem(votedKey)){form.querySelector('input[type=text]').disabled=true;form.querySelector('button').disabled=true;status.textContent='✅ Вы уже голосовали с этого устройства.';}}catch(e){}
    form.addEventListener('submit',function(e){
      if(closeIfNeeded()){e.preventDefault();return;}
      var nick=form.player_nick.value.trim();
      if(!nick){e.preventDefault();status.textContent='Вставьте ник игрока.';return;}
      form.player_nick.value=nick;
      submitted=true;
      form.querySelector('button').disabled=true;
      status.textContent='Отправляем голос…';
    });
    frame.addEventListener('load',function(){
      if(!submitted) return;
      submitted=false;
      try{localStorage.setItem(votedKey,'1');}catch(e){}
      form.querySelector('input[type=text]').disabled=true;
      form.querySelector('button').disabled=true;
      status.textContent='✅ Ваш голос принят. Спасибо за участие!';
    });
    setInterval(closeIfNeeded,30000);
  }

  function init(){updateHomeDate();addPresidentVote();}
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init,{once:true});
  }else{
    init();
  }
})();
