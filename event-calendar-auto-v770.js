(function(){
  'use strict';
  var MONTH_NAMES=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  var DAYS=[
    new Date(Date.UTC(2026,9,26)),new Date(Date.UTC(2026,9,27)),new Date(Date.UTC(2026,9,28)),
    new Date(Date.UTC(2026,9,29)),new Date(Date.UTC(2026,9,30)),new Date(Date.UTC(2026,9,31))
  ];
  var WEEK=['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
  var ROWS=[
    {name:'Зал героев',cls:'event-hall',on:[0,1]},
    {name:'Героический рейд',cls:'event-raid',on:[0,1,2,3,4,5]},
    {name:'Сокровища путешествия',cls:'event-treasure',on:[0,1,2,3,4,5]},
    {name:'Битва в каньоне',cls:'event-canyon',on:[0,1,2,3,4,5]},
    {name:'Мобилизация альянса',cls:'event-mobil',on:[0,1,2,3,4,5]},
    {name:'Гонка вооружений',cls:'event-race',on:[0,1,4,5]},
    {name:'Битва за литейную',cls:'event-foundry',on:[0,1,2,3,4,5]},
    {name:'Чемпионат альянса',cls:'event-champ',on:[0,1,2,3,4,5]},
    {name:'Битвы за форт',cls:'event-fort',on:[1,2,3,4]},
    {name:'Обучение офицеров',cls:'event-officer',on:[2,3]},
    {name:'Месть Джины',cls:'event-gina',on:[2,3,4]},
    {name:'Хижина предсказаний Мии',cls:'event-mia',on:[4,5]}
  ];
  var COLORS=['#4db4e8','#ed6a60','#dba83c','#53c5d7','#7569e8','#be7ad7','#efae42','#52c887','#ff874c','#9d6cef','#49d98a','#d85acb'];

  function moscowToday(){
    var p=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()),o={};
    p.forEach(function(x){if(x.type!=='literal')o[x.type]=+x.value});
    return new Date(Date.UTC(o.year,o.month-1,o.day));
  }
  function ruDate(d,withYear){return d.getUTCDate()+' '+MONTH_NAMES[d.getUTCMonth()]+(withYear?' '+d.getUTCFullYear():'');}
  function same(a,b){return a&&b&&a.getTime()===b.getTime();}
  function dm(d){return String(d.getUTCDate()).padStart(2,'0')+'.'+String(d.getUTCMonth()+1).padStart(2,'0');}
  function parseDM(s){var m=(s||'').match(/(\d{1,2})\.(\d{1,2})/);return m?new Date(Date.UTC(2026,+m[2]-1,+m[1])):null;}

  function injectStyles(){
    if(document.getElementById('event-video-v772-style'))return;
    var st=document.createElement('style');st.id='event-video-v772-style';
    var css='body.is-events-route .event-week-v608.event-week-v609{min-width:0!important}';
    ROWS.forEach(function(r,i){var c=COLORS[i%COLORS.length];css+='body.is-events-route .event-row-name-v608.'+r.cls+'{border-left:3px solid '+c+'}body.is-events-route .event-cell-v608.on.'+r.cls+'{background:'+c+'!important;box-shadow:0 0 10px '+c+'55}body.is-events-route .event-soon-chip-v608.'+r.cls+'{border-color:'+c+'99;background:'+c+'22;color:#f4fbff}';});
    st.textContent=css;document.head.appendChild(st);
  }

  function rebuild(section){
    var grid=section.querySelector('.event-week-v608');if(!grid)return;
    var html='<div class="corner">Событие</div>';
    DAYS.forEach(function(d){html+='<div class="event-day-v608" data-cal-date="'+d.toISOString().slice(0,10)+'">'+WEEK[d.getUTCDay()]+'<br>'+d.getUTCDate()+'</div>';});
    ROWS.forEach(function(r){
      html+='<div class="event-row-name-v608 '+r.cls+'">'+r.name+'</div>';
      DAYS.forEach(function(d,i){html+='<div class="event-cell-v608'+(r.on.indexOf(i)>=0?' on '+r.cls:'')+'" data-cal-date="'+d.toISOString().slice(0,10)+'"></div>';});
    });
    grid.innerHTML=html;
    grid.classList.add('event-week-v609');

    var soon=section.querySelector('.event-soon-list-v608');
    if(soon)soon.innerHTML=''
      +'<span class="event-soon-chip-v608 event-hall">26.10–27.10 · Зал героев</span>'
      +'<span class="event-soon-chip-v608 event-raid">26.10–31.10+ · Героический рейд</span>'
      +'<span class="event-soon-chip-v608 event-treasure">26.10–31.10+ · Сокровища путешествия</span>'
      +'<span class="event-soon-chip-v608 event-canyon">26.10–31.10+ · Битва в каньоне</span>'
      +'<span class="event-soon-chip-v608 event-mobil">26.10–31.10+ · Мобилизация альянса</span>'
      +'<span class="event-soon-chip-v608 event-race">26.10–27.10 · Гонка вооружений</span>'
      +'<span class="event-soon-chip-v608 event-foundry">26.10–31.10+ · Битва за литейную</span>'
      +'<span class="event-soon-chip-v608 event-champ">26.10–31.10+ · Чемпионат альянса</span>'
      +'<span class="event-soon-chip-v608 event-fort">27.10–30.10 · Битвы за форт</span>'
      +'<span class="event-soon-chip-v608 event-officer">28.10–29.10 · Обучение офицеров</span>'
      +'<span class="event-soon-chip-v608 event-gina">28.10–30.10 · Месть Джины</span>'
      +'<span class="event-soon-chip-v608 event-race">30.10–31.10 · Гонка вооружений</span>'
      +'<span class="event-soon-chip-v608 event-mia">30.10–31.10 · Хижина предсказаний Мии</span>';

    var note=section.querySelector('.event-schedule-note-v608');
    if(note)note.textContent='Даты обновлены по игровому календарю из видео от 26 октября. Знак «+» означает, что событие продолжается за пределами видимой недели. Прошедшие дни скрываются автоматически.';
  }

  function cleanSoon(section,today){
    section.querySelectorAll('.event-soon-chip-v608').forEach(function(chip){
      var text=(chip.textContent||''),dates=text.match(/\d{1,2}\.\d{1,2}/g)||[];if(!dates.length)return;
      var first=parseDM(dates[0]),last=parseDM(dates[dates.length-1]);if(!last)return;
      if(last<today){chip.remove();return;}
      if(first&&first<today&&today<=last)chip.textContent=chip.textContent.replace(dates[0],dm(today));
    });
  }

  function renderActive(section,today){
    var active=section.querySelector('.event-active-v608');if(!active)return;
    var idx=DAYS.findIndex(function(d){return same(d,today)}),names=[];
    if(idx>=0)ROWS.forEach(function(r){if(r.on.indexOf(idx)>=0)names.push(r.name)});
    var html='';
    if(idx>=0){html+='<div class="event-active-card-v608"><b>Сегодня, '+ruDate(today,false)+'</b><span>'+(names.length?names.join(' · '):'Нет подтверждённых событий')+'</span></div>';}
    html+='<div class="event-active-card-v608"><b>Точные даты из видео</b><span>Битвы за форт 27–30.10 · Обучение офицеров 28–29.10 · Месть Джины 28–30.10 · Гонка вооружений 30–31.10 · Хижина предсказаний Мии 30–31.10</span></div>';
    active.innerHTML=html;
  }

  function apply(){
    var section=document.querySelector('.event-schedule-v608'),grid=section&&section.querySelector('.event-week-v608'),head=section&&section.querySelector('.event-schedule-head-v608 p');
    if(!section||!grid||!head)return;
    injectStyles();
    if(grid.dataset.videoSync!=='772'){rebuild(section);grid.dataset.videoSync='772';}
    var today=moscowToday();
    grid.querySelectorAll('[data-cal-date]').forEach(function(el){var d=new Date(el.getAttribute('data-cal-date')+'T00:00:00Z');if(d<today)el.remove();});
    grid.querySelectorAll('.event-day-v608').forEach(function(h){var d=new Date(h.getAttribute('data-cal-date')+'T00:00:00Z');h.classList.toggle('today',same(d,today));});
    var keep=DAYS.filter(function(d){return d>=today});
    if(keep.length){var mobile=matchMedia('(max-width:760px)').matches,nw=mobile?165:180,dw=mobile?68:72;grid.style.gridTemplateColumns=nw+'px repeat('+keep.length+',minmax('+dw+'px,1fr))';grid.style.minWidth=(nw+keep.length*dw)+'px';head.textContent=ruDate(keep[0],false)+' – '+ruDate(keep[keep.length-1],true)+' · игровой календарь';section.setAttribute('aria-label','График событий '+ruDate(keep[0],false)+' – '+ruDate(keep[keep.length-1],true));}
    else{var wrap=section.querySelector('.event-week-wrap-v608');if(wrap)wrap.style.display='none';head.textContent='Текущий период календаря завершён';}
    cleanSoon(section,today);
    renderActive(section,today);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  window.addEventListener('pageshow',apply);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)apply();});
})();