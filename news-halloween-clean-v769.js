(function(){
  'use strict';
  function clean(){
    if(!document.body || document.body.getAttribute('data-static-route')!=='news-halloween-2026') return;

    var intro=document.querySelector('.intro');
    if(intro){
      intro.textContent='Тыквенные монстры, конфетный дождь, маскировка городов, фантомы, новые облики и целая неделя хэллоуинских событий.';
    }

    document.querySelectorAll('li').forEach(function(el){
      if((el.textContent||'').indexOf('В показанном интерфейсе стоимость одной атаки')!==-1){
        el.innerHTML='Стоимость одной атаки — <b>20 конфет</b>.';
      }
    });

    document.querySelectorAll('.card p').forEach(function(el){
      var t=(el.textContent||'').trim();
      if(t.indexOf('В событии доступны постоянные декоративные награды. В показанном интерфейсе также встречается постоянный облик города')===0){
        el.innerHTML='В событии доступны постоянные декоративные награды. Также доступен постоянный облик города <b>«Мистический мир / Umbral Labyrinth»</b> с бонусом <b>Атака войск +2,0%</b>.';
      }
    });

    var kasia=document.querySelector('#kasia .copy p');
    if(kasia && (kasia.textContent||'').indexOf('В показанном интерфейсе есть счётчик')!==-1){
      kasia.innerHTML='Желания выдают случайные предметы праздничного пула. Есть счётчик <b>до 100 желаний</b> и отдельная шкала этапных наград.';
    }

    document.querySelectorAll('.date').forEach(function(el){
      var t=(el.textContent||'').trim();
      if(t==='Wiki: 27.10–03.11 UTC') el.textContent='27.10–03.11';
      if(t==='Wiki: 29.10–02.11 UTC') el.textContent='29.10–02.11';
    });

    document.querySelectorAll('.kicker').forEach(function(el){
      if((el.textContent||'').trim()==='Галерея источника'){
        var section=el.closest('section');
        if(section) section.remove();
      }
    });

    var footer=document.querySelector('footer.footer');
    if(footer) footer.remove();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',clean,{once:true});
  else clean();
})();
