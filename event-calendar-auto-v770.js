(function(){
  'use strict';

  var MONTHS={
    'января':0,'февраля':1,'марта':2,'апреля':3,'мая':4,'июня':5,
    'июля':6,'августа':7,'сентября':8,'октября':9,'ноября':10,'декабря':11
  };
  var MONTH_NAMES=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

  function moscowToday(){
    var parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    var out={};
    parts.forEach(function(p){if(p.type!=='literal')out[p.type]=parseInt(p.value,10);});
    return new Date(Date.UTC(out.year,out.month-1,out.day));
  }

  function parseRange(text){
    var m=(text||'').match(/(\d{1,2})\s+([а-яё]+)\s*[–-]\s*(\d{1,2})\s+([а-яё]+)\s+(\d{4})/i);
    if(!m) return null;
    var year=parseInt(m[5],10), sm=MONTHS[m[2].toLowerCase()], em=MONTHS[m[4].toLowerCase()];
    if(sm==null||em==null) return null;
    return {
      start:new Date(Date.UTC(year,sm,parseInt(m[1],10))),
      end:new Date(Date.UTC(year,em,parseInt(m[3],10)))
    };
  }

  function dayList(start,end){
    var arr=[];
    for(var d=new Date(start.getTime());d<=end;d=new Date(d.getTime()+86400000)) arr.push(new Date(d.getTime()));
    return arr;
  }

  function ruDate(d,withYear){
    return d.getUTCDate()+' '+MONTH_NAMES[d.getUTCMonth()]+(withYear?' '+d.getUTCFullYear():'');
  }

  function sameDay(a,b){return a&&b&&a.getTime()===b.getTime();}

  function parseDM(token,year){
    var m=(token||'').match(/(\d{1,2})\.(\d{1,2})/);
    if(!m)return null;
    return new Date(Date.UTC(year,parseInt(m[2],10)-1,parseInt(m[1],10)));
  }

  function cleanSoon(section,today,year){
    var chips=section.querySelectorAll('.event-soon-chip-v608');
    chips.forEach(function(chip){
      var text=(chip.textContent||'').trim();
      var dates=text.match(/\d{1,2}\.\d{1,2}/g)||[];
      if(!dates.length)return;

      var parsed=dates.map(function(x){return parseDM(x,year);}).filter(Boolean);
      if(!parsed.length)return;

      var isRange=/[–-]/.test(text.split('·')[0]||'');
      var last=parsed[parsed.length-1];
      if(isRange){
        if(last<today){chip.remove();return;}
        var first=parsed[0];
        if(first<today&&today<=last){
          var dd=String(today.getUTCDate()).padStart(2,'0');
          var mm=String(today.getUTCMonth()+1).padStart(2,'0');
          chip.textContent=chip.textContent.replace(dates[0],dd+'.'+mm);
        }
        return;
      }

      if(parsed.length>1){
        var keep=[];
        parsed.forEach(function(d,i){if(d>=today)keep.push({d:d,s:dates[i]});});
        if(!keep.length){chip.remove();return;}
        var suffix='';
        var dot=text.lastIndexOf(' · ');
        if(dot>=0)suffix=text.slice(dot+3);
        if(suffix){chip.textContent=keep.map(function(x){return x.s;}).join(' · ')+' · '+suffix;}
        return;
      }

      if(last<today)chip.remove();
    });

    var soon=section.querySelector('.event-soon-v608');
    if(soon&&!soon.querySelector('.event-soon-chip-v608'))soon.style.display='none';
  }

  function cleanTopCards(section,today,year){
    section.querySelectorAll('.event-active-card-v608').forEach(function(card){
      var b=card.querySelector('b'),s=card.querySelector('span');
      if(!b||!s)return;
      var label=(b.textContent||'').trim().toLowerCase();
      var exact=label.match(/^(\d{1,2})\s+([а-яё]+)$/i);
      if(exact&&MONTHS[exact[2]]!=null){
        var d=new Date(Date.UTC(year,MONTHS[exact[2]],parseInt(exact[1],10)));
        if(d<today)card.remove();
        return;
      }

      var dates=(s.textContent||'').match(/\d{1,2}\.\d{1,2}/g)||[];
      if(label==='битвы за форт'&&dates.length){
        var future=dates.filter(function(x){var d=parseDM(x,year);return d&&d>=today;});
        if(!future.length){card.remove();return;}
        s.textContent=future.join(' · ');
      }
    });
  }

  function apply(){
    var section=document.querySelector('.event-schedule-v608');
    var grid=section&&section.querySelector('.event-week-v608');
    var headText=section&&section.querySelector('.event-schedule-head-v608 p');
    if(!section||!grid||!headText||grid.dataset.autoCalendarDone==='1')return;

    var range=parseRange(headText.textContent);
    if(!range)return;
    var dates=dayList(range.start,range.end);
    var headers=Array.prototype.slice.call(grid.querySelectorAll('.event-day-v608'));
    if(!headers.length||headers.length!==dates.length)return;

    var today=moscowToday();
    var keepIndexes=[];
    dates.forEach(function(d,i){if(d>=today)keepIndexes.push(i);});

    headers.forEach(function(h,i){
      if(dates[i]<today)h.remove();
      else h.classList.toggle('today',sameDay(dates[i],today));
    });

    var rowNames=Array.prototype.slice.call(grid.querySelectorAll('.event-row-name-v608'));
    rowNames.forEach(function(name){
      var cells=[],n=name.nextElementSibling;
      for(var i=0;i<dates.length&&n;i++){
        cells.push(n);
        n=n.nextElementSibling;
      }
      cells.forEach(function(cell,i){if(dates[i]<today)cell.remove();});
    });

    var remaining=keepIndexes.length;
    if(remaining>0){
      var mobile=window.matchMedia&&window.matchMedia('(max-width:760px)').matches;
      var nameWidth=mobile?165:180,dayWidth=mobile?68:72;
      grid.style.gridTemplateColumns=nameWidth+'px repeat('+remaining+',minmax('+dayWidth+'px,1fr))';
      grid.style.minWidth=(nameWidth+remaining*dayWidth)+'px';

      var first=dates[keepIndexes[0]],last=dates[keepIndexes[keepIndexes.length-1]];
      headText.textContent=ruDate(first,false)+' – '+ruDate(last,true)+' · подтверждено по игровому календарю';
      section.setAttribute('aria-label','График событий '+ruDate(first,false)+' – '+ruDate(last,true));
    }else{
      var wrap=section.querySelector('.event-week-wrap-v608');
      if(wrap)wrap.style.display='none';
      headText.textContent='Текущий период календаря завершён';
    }

    cleanTopCards(section,today,range.end.getUTCFullYear());
    cleanSoon(section,today,range.end.getUTCFullYear());
    grid.dataset.autoCalendarDone='1';
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  window.addEventListener('pageshow',apply);
})();
