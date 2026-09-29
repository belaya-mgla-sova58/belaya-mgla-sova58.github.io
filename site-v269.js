(function(){
  const items=document.querySelectorAll('section,.event-card,.guide-card,.expert-card,.thumb-card,.rule,.savebox,.callout');
  if(!('IntersectionObserver' in window)){items.forEach(x=>x.classList.add('in-view'));return;}
  items.forEach(x=>x.classList.add('reveal'));
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -35px 0px'});
  items.forEach(x=>io.observe(x));
})();

(function(){
  function showRoute(){
    var route=(document.body.dataset.staticRoute||'home');
    var page=document.querySelector('.route-page[data-route="'+route+'"]');
    if(!page){ route='home'; page=document.querySelector('.route-page[data-route="home"]'); }
    document.querySelectorAll('.route-page').forEach(function(p){p.classList.remove('active');});
    page.classList.add('active');
    document.querySelectorAll('.nav-wrap nav a').forEach(function(a){
      var eventSubroutes=['alliance-showdown','tundra-trade-route','endless-trial','mercenary-prestige','frostfire-mine','crazy-joe','alliance-championship','fishing','forts','castle','foundry','svs-prep','svs','armament-competition','state-power','alliance-mobilization','brothers-in-arms','winter-siege','dreams','snowplow','bear'];
      var buildingSubroutes=['buildings-before-fire','buildings-after-fire'];
      var otherSubroutes=['governor','farm','arena','beacon','mails','labyrinth','exploration'];
      var navRoute=eventSubroutes.indexOf(route)!==-1?'events':(buildingSubroutes.indexOf(route)!==-1?'buildings':(otherSubroutes.indexOf(route)!==-1?'other':route));
      var isActive=a.getAttribute('href')==='#'+navRoute;
      a.classList.toggle('active',isActive);
      a.style.removeProperty('background');
      a.style.removeProperty('color');
      if(isActive) a.setAttribute('aria-current','page');
      else a.removeAttribute('aria-current');
    });
    window.scrollTo({top:0,behavior:'instant'});
  }
  window.addEventListener('hashchange',showRoute);
  document.addEventListener('DOMContentLoaded',showRoute);
  showRoute();
})();

(function(){
  var facts = [
    'Факт: в «Сражении альянсов» первый этап даёт только 1 очко победы, а финальный — 4, поэтому тратить всё сразу невыгодно.',
    'Факт: на «Торговом пути в тундре» первый раз обновить качество грузовика можно бесплатно.',
    'Факт: в «Бесконечном испытании» рейтинг считает только лучший одиночный удар за день, а не сумму всех атак.',
    'Факт: в «Престиже наёмника» сейчас 25 этапов. Джина помогает заметно экономить энергию на всей цепочке.',
    'Факт: во время Безумного Джо лечение может уменьшить очки союзников, потому что восстановленные войска возвращаются домой и забирают часть убийств.',
    'Интересный факт: если вы присоединяетесь к чужому рейду на Медведя, особенно важен герой в первом слоте. У создателя рейда учитываются экспедиционные навыки всех трёх его героев.',
    'Подсказка: активный альянс ускоряет рост за счёт помощи, рейдов, событий и подарков.',
    'Факт: в Рыбалке для рейтинга важна глубина, а для коллекции — заранее смотреть, какой добычи не хватает.',
    'Подсказка: в Снегоуборщиках не нужно чистить всё подряд — топливо важнее полной зачистки.',
    'Факт: в Литейной очки часто решаются не только боями, но и контролем правильных зданий.',
    'Подсказка: перед SvS выгодно заранее копить ускорения, ресурсы и ключевые предметы под нужные дни.',
    " В Руднике ледяного огня сначала выгодно разогнать навыки на патрулях, а не сразу лезть в драки за центр.",
    " Перед переходом к Огненной топке заранее подтяни Посольство и Исследовательский центр до 30 уровня.",
    " Ферма полезна не силой, а количеством сборных маршей: чем больше очередей одновременно добывают ресурсы, тем лучше она работает.",
    " Не оставляй очередь исследований пустой: скорость исследований и дополнительные очереди похода окупаются весь срок жизни аккаунта.",
    " После открытия более высокого ранга постепенно повышай старые войска: низкие ранги быстрее забивают Лазарет и слабее в бою.",
    " Ежедневные взносы в технологии альянса помогают всей команде и одновременно дают личные жетоны альянса."];

  var idx = 0;
  var bubble = document.getElementById('sovaBubble');
  var text = document.getElementById('sovaText');
  var hint = document.getElementById('sovaHint');
  var btn = document.getElementById('sovaBtn');
  var closeBtn = document.getElementById('sovaClose');

  function showIntro(){
    text.textContent = 'Хочешь интересный факт?';
    hint.textContent = 'Нажми на сову, и она расскажет подсказку по игре.';
    bubble.classList.add('open');
  }

  function nextFact(){
    text.textContent = facts[idx];
    hint.textContent = 'Нажми ещё раз, и сова расскажет следующий факт.';
    bubble.classList.add('open');
    idx = (idx + 1) % facts.length;
  }

  btn.addEventListener('click', function(){
    if(!bubble.classList.contains('open')) showIntro();
    else nextFact();
  });

  btn.addEventListener('keydown', function(e){
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      if(!bubble.classList.contains('open')) showIntro();
      else nextFact();
    }
  });

  bubble.addEventListener('click', function(e){
    if(e.target === closeBtn || (e.target.closest && e.target.closest('.sova-search'))) return;
    nextFact();
  });

  closeBtn.addEventListener('click', function(e){
    e.stopPropagation();
    bubble.classList.remove('open');
  });
})();

(function(){
  var input = document.getElementById('sovaSearchInput');
  var button = document.getElementById('sovaSearchButton');
  var results = document.getElementById('sovaSearchResults');
  var bubble = document.getElementById('sovaBubble');

  if(!input || !button || !results) return;

  function norm(s){
    return (s || '')
      .toLowerCase()
      .replace(/ё/g,'е')
      .replace(/[^\p{L}\p{N}\s-]/gu,' ')
      .replace(/\s+/g,' ')
      .trim();
  }

  function tokens(s){
    return norm(s).split(' ').filter(function(w){ return w.length > 1; });
  }

  /* Небольшой "русский" нечёткий поиск.
     Он специально понимает формы вроде:
     медведь  медведя, герой  герои, питомец  питомцы. */
  function sameWord(a,b){
    if(a === b) return true;
    if(a.length < 4 || b.length < 4) return false;

    var min = Math.min(a.length,b.length);
    var common = 0;
    while(common < min && a[common] === b[common]) common++;

    /* Для достаточно длинных слов совпадение корня важнее окончания. */
    if(common >= 5) return true;
    if(min <= 5 && common >= 4) return true;

    return false;
  }

  function containsWord(hayTokens, qWord){
    return hayTokens.some(function(w){ return sameWord(w, qWord); });
  }

  function cleanSnippet(s){
    return (s || '').replace(/\s+/g,' ').trim();
  }

  function buildIndex(){
    return Array.prototype.slice.call(
      document.querySelectorAll('.route-page[data-route]')
    ).map(function(page){
      var route = page.getAttribute('data-route');
      var h = page.querySelector('h1,h2');
      var title = h ? cleanSnippet(h.textContent) : route;

      var headingEls = Array.prototype.slice.call(
        page.querySelectorAll('h1,h2,h3,h4')
      );
      var headings = headingEls.map(function(el){
        return cleanSnippet(el.textContent);
      });

      var body = cleanSnippet(page.textContent);

      return {
        route: route,
        title: title,
        titleTokens: tokens(title),
        headings: headings,
        headingTokens: headings.map(tokens),
        body: body,
        bodyTokens: tokens(body)
      };
    });
  }

  var index = buildIndex();

  function bestHeading(item, qWords){
    var best = item.title;
    var bestScore = -1;

    item.headings.forEach(function(h, i){
      var ht = item.headingTokens[i];
      var score = 0;
      qWords.forEach(function(q){
        if(containsWord(ht, q)) score += 1;
      });
      if(score > bestScore){
        bestScore = score;
        best = h;
      }
    });

    return best;
  }

  function snippetFor(item, qWords){
    var body = item.body;
    var bodyN = norm(body);
    var pos = -1;

    for(var i=0;i<qWords.length;i++){
      var root = qWords[i].slice(0, Math.min(5,qWords[i].length));
      var p = bodyN.indexOf(root);
      if(p !== -1 && (pos === -1 || p < pos)) pos = p;
    }

    if(pos < 0){
      return body.slice(0,120) + (body.length > 120 ? '…' : '');
    }

    var start = Math.max(0,pos-45);
    var end = Math.min(body.length,pos+105);
    return (start>0?'…':'') + body.slice(start,end) + (end<body.length?'…':'');
  }

  function scoreItem(item, qWords){
    var score = 0;

    qWords.forEach(function(q){
      if(containsWord(item.titleTokens,q)) score += 100;

      var headingHit = item.headingTokens.some(function(ht){
        return containsWord(ht,q);
      });
      if(headingHit) score += 50;

      if(containsWord(item.bodyTokens,q)) score += 8;
    });

    /* Все слова запроса должны встречаться на странице. */
    var allFound = qWords.every(function(q){
      return containsWord(item.titleTokens,q) ||
             item.headingTokens.some(function(ht){ return containsWord(ht,q); }) ||
             containsWord(item.bodyTokens,q);
    });

    if(!allFound) return 0;

    /* Главная страница нужна только как запасной результат,
       чтобы конкретный гайд всегда был выше. */
    if(item.route === 'home') score -= 60;

    return score;
  }

  function search(){
    var qWords = tokens(input.value);
    results.innerHTML = '';

    if(!qWords.length || norm(input.value).length < 2){
      results.classList.remove('open');
      return;
    }

    var found = index.map(function(item){
      return {item:item, score:scoreItem(item,qWords)};
    }).filter(function(x){
      return x.score > 0;
    }).sort(function(a,b){
      return b.score-a.score;
    }).slice(0,8);

    results.classList.add('open');

    if(!found.length){
      var empty = document.createElement('div');
      empty.className = 'sova-search-empty';
      empty.textContent = 'Ничего не нашла. Попробуй другое слово.';
      results.appendChild(empty);
      return;
    }

    found.forEach(function(x){
      var item = x.item;
      var result = document.createElement('a');
      result.className = 'sova-search-result';
      result.href = '#' + item.route;

      var strong = document.createElement('strong');
      strong.textContent = bestHeading(item,qWords);

      var small = document.createElement('small');
      small.textContent = snippetFor(item,qWords);

      result.appendChild(strong);
      result.appendChild(small);

      result.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        window.location.href = (item.route==='home'?'index.html':item.route+'.html');
        return;

        var target = document.querySelector(
          '.route-page[data-route="' + item.route + '"]'
        );

        if(!target) return;

        document.querySelectorAll('.route-page').forEach(function(page){
          page.classList.remove('active');
        });
        target.classList.add('active');

        if(location.hash !== '#' + item.route){
          history.pushState(null,'','#' + item.route);
        }

        results.classList.remove('open');
        input.value = '';
        if(bubble) bubble.classList.remove('open');
        window.scrollTo({top:0,behavior:'smooth'});
      });

      results.appendChild(result);
    });
  }

  button.addEventListener('click',function(e){
    e.stopPropagation();
    search();
  });

  input.addEventListener('keydown',function(e){
    e.stopPropagation();
    if(e.key === 'Enter'){
      e.preventDefault();
      search();
    }
  });

  input.addEventListener('input',function(e){
    e.stopPropagation();
    if(norm(input.value).length >= 2) search();
    else results.classList.remove('open');
  });

  var searchBox = document.getElementById('sovaSearch');
  if(searchBox){
    searchBox.addEventListener('click',function(e){
      e.stopPropagation();
    });
  }
})();

(function(){
  const meta={
    home:['Белая Мгла','Библиотека гайдов','Проверенные гайды, короткие памятки и полезные подсказки по игре. Автор — Sova.'],
    newbie:['Новичкам','Старт без лишних ошибок','Что важно сделать в первые дни и какие ошибки лучше не повторять.'],
    heroes:['Герои','Герои и их роли','Кого развивать, где использовать и как собирать полезные составы.'],
    gear:['Снаряжение','Снаряжение героев','Приоритеты прокачки и материалы для усиления героев.'],
    buildings:['Здания','Развитие города','Что развивать до Топки 30 и после перехода в Эпоху кристалла огня.'],
    research:['Исследования','Исследования и приоритеты','Какие ветки дают больше пользы для развития и боя.'],
    troops:['Войска','Пехота, копейщики и стрелки','Роли войск, обучение, повышение и лечение.'],
    alliance:['Альянс','Развитие и работа альянса','Помощь, технологии, территория, ранги и совместные активности.'],
    resources:['Ресурсы','Ресурсы и материалы','Что беречь, где использовать и когда выгоднее тратить редкие ресурсы.'],
    governor:['Губернатор','Снаряжение и талисманы','Материалы и приоритеты прокачки губернатора.'],
    farm:['Ферма','Ресурсная ферма','Как развивать дополнительного персонажа ради ресурсов для основы.'],
    experts:['Эксперты','Эксперты и прокачка','Полезные эксперты, навыки и приоритеты развития.'],
    pets:['Питомцы','Полный справочник по питомцам','Кто такие питомцы, как они открываются, прокачиваются и для чего нужен каждый из 14 питомцев.'],
    events:['События','События и награды','Отдельные гайды по событиям и важные правила участия.'],
    other:['Другие гайды','Дополнительные разделы','Губернатор, Ферма, Арена, Маяк, Письма, Лабиринт и Освоение.'],
    arena:['Арена','Ежедневные бои','Ежедневный режим, где основной рывок удобнее делать ближе к ежедневному игровому сбросу.'],
    beacon:['Маяк','Задания и разведка','Ежедневные задания Маяка, награды и дополнительная разведка.'],
    mails:['Письма','Письма и отчёты','Какие игровые письма и отчёты стоит читать и сохранять.']
  };
  function currentRoute(){return (document.body.dataset.staticRoute||'home')}
  function updateHero(){
    let route=currentRoute();
    let page=document.querySelector('.route-page[data-route="'+route+'"]');
    if(!page){route='home';page=document.querySelector('.route-page[data-route="home"]')}
    document.body.classList.toggle('is-home-route',route==='home');
    document.body.classList.toggle('is-newbie-route',route==='newbie');
    document.body.classList.toggle('is-heroes-route',route==='heroes');
    document.body.classList.toggle('is-gear-route',route==='gear');
    document.body.classList.toggle('is-buildings-route',route==='buildings');
    document.body.classList.toggle('is-research-route',route==='research');
    document.body.classList.toggle('is-troops-route',route==='troops');
    document.body.classList.toggle('is-alliance-route',route==='alliance');
    document.body.classList.toggle('is-state-positions-route',route==='state-positions');
    document.body.classList.toggle('is-governor-route',route==='governor');
    document.body.classList.toggle('is-farm-route',route==='farm');
    document.body.classList.toggle('is-resources-route',route==='resources');
    document.body.classList.toggle('is-experts-route',route==='experts');
    document.body.classList.toggle('is-pets-route',route==='pets');
    document.body.classList.toggle('is-events-route',route==='events');
    document.body.classList.toggle('is-bear-route',route==='bear');
    document.body.classList.toggle('is-crazy-joe-route',route==='crazy-joe');
    document.body.classList.toggle('is-mercenary-prestige-route',route==='mercenary-prestige');
    document.body.classList.toggle('is-frostfire-mine-route',route==='frostfire-mine');
    document.body.classList.toggle('is-endless-trial-route',route==='endless-trial');
    document.body.classList.toggle('is-tundra-trade-route',route==='tundra-trade-route');
    document.body.classList.toggle('is-arena-route',route==='arena');
    document.body.classList.toggle('is-beacon-route',route==='beacon');
    document.body.classList.toggle('is-exploration-route',route==='exploration');
    document.body.classList.toggle('is-mails-route',route==='mails');
    document.body.classList.toggle('is-labyrinth-route',route==='labyrinth');
    document.body.classList.toggle('is-island-route',route==='island');
    document.body.classList.toggle('is-svs-prep-route',route==='svs-prep');
    document.body.classList.toggle('is-svs-route',route==='svs');
    document.body.classList.toggle('is-alliance-mobilization-route',route==='alliance-mobilization');
    let data=meta[route];
    const guideHero=page&&page.querySelector('.guide-page-v69 > .guide-hero');
    const guideTitle=guideHero&&guideHero.querySelector('.guide-hero-text h1');
    const guideDescription=guideHero&&guideHero.querySelector('.guide-hero-text p');
    if(guideTitle){
      data=[guideTitle.textContent.trim(),' ',guideDescription?guideDescription.textContent.trim():''];
    }else if(!data){
      const pageHeading=page&&page.querySelector('h1,h2,h3');
      const introText=page&&page.querySelector('.intro p,.bear-intro-text p,.section p');
      const cleanTitle=pageHeading?pageHeading.textContent.trim().replace(/^[^\p{L}\p{N}]+/u,''):route;
      data=[
        cleanTitle||'Белая Мгла',
        ' ',
        introText?introText.textContent.trim():'Полезный раздел библиотеки гайдов.'
      ];
    }
    const title=document.getElementById('uiRouteTitle');
    const sub=document.getElementById('uiRouteSubtitle');
    const desc=document.getElementById('uiRouteDescription');
    const icon=document.getElementById('uiRouteIcon');
    if(title){
      title.textContent=data[0];
      const heroTitleText=(data[0]||'').trim();
      title.classList.remove('hero-title-medium','hero-title-long','hero-title-xlong');
      if(heroTitleText.length >= 24) title.classList.add('hero-title-xlong');
      else if(heroTitleText.length >= 17) title.classList.add('hero-title-long');
      else if(heroTitleText.length >= 11) title.classList.add('hero-title-medium');
    }
    if(sub) sub.textContent='';
    if(desc) desc.textContent=data[2]||'';

    // В шапке используем только утверждённую сову текущей страницы слева.
    const pageIcon=(guideHero&&guideHero.querySelector('.guide-hero-owl')) || (page&&page.querySelector('.route-header-icon-source, .owl-page-title-icon, .resource-title-icon, .governor-title-icon'));
    if(icon&&pageIcon&&pageIcon.src) icon.src=pageIcon.src;

    // Вместо универсальных вкладок показываем 2–3 реальные главные темы страницы.
    const topicEls=page?[...page.querySelectorAll('.guide-page-v69 > .guide-topics .topic-pill')]:[];
    let topicLabels=topicEls.map(el=>el.textContent.trim()).filter(Boolean).slice(0,3);
    if(!topicLabels.length && page){
      topicLabels=[...page.querySelectorAll('h2,h3')].map(h=>h.textContent.trim()).filter(Boolean).slice(0,3);
    }
    document.querySelectorAll('.ui-tabsbar button').forEach((b,i)=>{
      const label=topicLabels[i];
      b.classList.remove('active');
      if(label){
        b.textContent=label;
        b.hidden=false;
        b.removeAttribute('aria-disabled');

        // Каждая кнопка ведёт только к разделу текущей страницы.
        const headings=page?[...page.querySelectorAll('h2,h3')]:[];
        const norm=s=>String(s||'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
        const want=norm(label);
        let target=headings.find(h=>{
          const got=norm(h.textContent);
          return got===want || got.startsWith(want) || want.startsWith(got);
        });
        if(!target) target=headings[i]||headings[0];
        if(target){
          if(!target.id) target.id='topic-'+(document.body.dataset.staticRoute||'page')+'-'+i;
          b.dataset.scrollTarget=target.id;
          b.onclick=function(){
            const el=document.getElementById(this.dataset.scrollTarget);
            if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
          };
        }else{
          b.onclick=null;
        }
      }else{
        b.hidden=true;
        b.onclick=null;
      }
    });
  }
  window.addEventListener('hashchange',updateHero);
  window.addEventListener('DOMContentLoaded',updateHero);
  updateHero();
  // Главные темы под шапкой служат краткой памяткой о содержании страницы, а не вкладками.
})();

(function(){
  const routeNames={home:'Главная',newbie:'Новичкам',heroes:'Герои',gear:'Снаряжение',buildings:'Здания','buildings-before-fire':'Здания до Топки 30','buildings-after-fire':'Эпоха кристалла огня',research:'Исследования',troops:'Войска',alliance:'Альянс','state-positions':'Должности на государстве',resources:'Ресурсы',governor:'Губернатор',farm:'Ферма',experts:'Эксперты',pets:'Питомцы',events:'События',other:'Другие гайды',arena:'Арена',beacon:'Маяк',mails:'Письма','alliance-showdown':'Сражение альянсов','tundra-trade-route':'Торговый путь в тундре','endless-trial':'Бесконечное испытание','mercenary-prestige':'Престиж наёмника','frostfire-mine':'Рудник ледяного огня','crazy-joe':'Безумный Джо','alliance-championship':'Чемпионат альянса',fishing:'Рыбалка',forts:'Крепости',castle:'Битва за замок',foundry:'Литейная','svs-prep':'Подготовка к SvS',svs:'SvS',dreams:'Сны',snowplow:'Снегоуборщики',bear:'Охота на медведя'};
  const freshness={experts:'Обновлено',beacon:'Новое',mails:'Новое',arena:'Обновлено',home:'Обновлено'};
  const verified='20.09.2026';

  function safeId(s){return 'guide-'+s.toLowerCase().replace(/[^a-zа-яё0-9]+/gi,'-').replace(/^-|-$/g,'').slice(0,48)}

  // utility bars, mini nav, badges
  document.querySelectorAll('.route-page[data-route]').forEach(function(page){
    const route=page.dataset.route;
    if(route==='home') return;
    const firstSection=page.querySelector(':scope > .section');
    if(!firstSection) return;
    const tools=document.createElement('div'); tools.className='guide-tools';
    const status=freshness[route]?'<span class="guide-badge '+(freshness[route]==='Новое'?'new':'updated')+'">'+freshness[route]+'</span>':'';
    tools.innerHTML='<div class="guide-tools-left"><button type="button" class="view-toggle active" data-view="full">Подробнее</button><button type="button" class="view-toggle" data-view="compact">Коротко</button>'+status+'</div><div class="guide-tools-right"><span class="guide-verified">Проверено: '+verified+'</span><button type="button" class="favorite-guide-btn" data-route="'+route+'">☆ В избранное</button></div>';
    firstSection.parentNode.insertBefore(tools,firstSection);
    const nav=document.createElement('nav'); nav.className='guide-mini-nav'; nav.setAttribute('aria-label','Навигация по разделу');
    const heads=Array.from(page.querySelectorAll(':scope > .section > h3')).slice(0,7);
    heads.forEach(function(h,i){if(!h.id)h.id=safeId(route+'-'+i+'-'+h.textContent);const a=document.createElement('a');a.href='#'+h.id;a.dataset.scrollTarget=h.id;a.textContent=h.textContent.trim().replace(/^[^\p{L}\p{N}]+/u,'').slice(0,34);a.addEventListener('click',function(e){e.preventDefault();document.getElementById(this.dataset.scrollTarget)?.scrollIntoView({behavior:'smooth',block:'start'})});nav.appendChild(a)});
    if(heads.length>1) tools.insertAdjacentElement('afterend',nav);
  });

  // view toggle
  document.addEventListener('click',function(e){
    const b=e.target.closest('.view-toggle'); if(!b)return;
    const page=b.closest('.route-page'); const compact=b.dataset.view==='compact';
    page.classList.toggle('compact-view',compact);
    b.parentElement.querySelectorAll('.view-toggle').forEach(x=>x.classList.toggle('active',x===b));
  });

  // favorites
  function getFavs(){try{return JSON.parse(localStorage.getItem('sovaFavorites')||'[]')}catch(e){return []}}
  function setFavs(v){localStorage.setItem('sovaFavorites',JSON.stringify(v));renderFavs();syncFavButtons()}
  function syncFavButtons(){const f=getFavs();document.querySelectorAll('.favorite-guide-btn').forEach(function(b){const on=f.includes(b.dataset.route);b.classList.toggle('is-fav',on);b.textContent=on?'★ В избранном':'☆ В избранное'})}
  function renderFavs(){const box=document.getElementById('favoritesList'),empty=document.getElementById('favoritesEmpty');if(!box)return;const f=getFavs();box.innerHTML='';empty.style.display=f.length?'none':'block';f.forEach(function(r){const chip=document.createElement('span');chip.className='favorite-chip';chip.innerHTML='<a href="#'+r+'" style="text-decoration:none;color:inherit"><span class="star">★</span> '+(routeNames[r]||r)+'</a><button type="button" aria-label="Удалить из избранного" data-remove-fav="'+r+'">×</button>';box.appendChild(chip)})}
  document.addEventListener('click',function(e){const b=e.target.closest('.favorite-guide-btn');if(b){let f=getFavs(),r=b.dataset.route;f=f.includes(r)?f.filter(x=>x!==r):f.concat(r);setFavs(f)}const rm=e.target.closest('[data-remove-fav]');if(rm){setFavs(getFavs().filter(x=>x!==rm.dataset.removeFav))}});
  renderFavs();syncFavButtons();

  // copy alliance notes
  document.querySelectorAll('.savebox').forEach(function(box){if(box.querySelector('.copy-alliance-btn'))return;const b=document.createElement('button');b.type='button';b.className='copy-alliance-btn';b.textContent='Скопировать';b.addEventListener('click',async function(e){e.stopPropagation();const clone=box.cloneNode(true);const x=clone.querySelector('.copy-alliance-btn');if(x)x.remove();const txt=clone.innerText.trim();try{await navigator.clipboard.writeText(txt)}catch(err){const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}b.textContent='Скопировано ✓';b.classList.add('copied');setTimeout(()=>{b.textContent='Скопировать';b.classList.remove('copied')},1500)});box.prepend(b)});

  // quick search suggestions
  const search=document.getElementById('sovaSearch');const input=document.getElementById('sovaSearchInput');
  if(search&&input){const q=document.createElement('div');q.className='sova-quick-suggestions';['Эксперты','Медведь','SvS'].forEach(function(t){const b=document.createElement('button');b.type='button';b.textContent=t;b.addEventListener('click',function(e){e.stopPropagation();input.value=t;document.getElementById('sovaSearchButton')?.click()});q.appendChild(b)});search.appendChild(q)}

  // mobile buttons
  document.getElementById('mobileSearchBtn')?.addEventListener('click',function(){const bubble=document.getElementById('sovaBubble');bubble?.classList.add('open');setTimeout(()=>document.getElementById('sovaSearchInput')?.focus(),80)});
  document.getElementById('mobileSovaBtn')?.addEventListener('click',function(){document.getElementById('sovaBtn')?.click()});

  // back to top
  const top=document.getElementById('backToTop');window.addEventListener('scroll',()=>top?.classList.toggle('show',window.scrollY>550),{passive:true});top?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();

(function(){
  const v69Meta={
    'labyrinth':['Лабиринт','Зоны, состав войск и награды'],
    'exploration':['Освоение','Команда героев и пассивные награды'],
    'island':['Остров','Древо жизни, бонусы и Эссенция']
  };
  function patchMeta(){
    const hash=(document.body.dataset.staticRoute||'home');
    if(!v69Meta[hash]) return;
    const title=document.querySelector('.ui-route-title');
    const sub=document.querySelector('.ui-route-subtitle');
    if(title) title.textContent=v69Meta[hash][0];
    if(sub) sub.textContent=v69Meta[hash][1];
  }
  window.addEventListener('hashchange',()=>setTimeout(patchMeta,0));
  document.addEventListener('DOMContentLoaded',()=>setTimeout(patchMeta,50));
})();

(function(){
  const icon = (cls, title, extra='') => {
    const s=document.createElement('span');
    s.className='catalog-game-icon ci-'+cls+(extra?' '+extra:'');
    s.setAttribute('role','img'); s.setAttribute('aria-label',title); s.title=title;
    return s;
  };
  const routeRoot = r => document.querySelector('.route-page[data-route="'+r+'"]');
  function addHeaderIcon(route, cls, title){
    const root=routeRoot(route); if(!root) return;
    const h=root.querySelector('.guide-hero-text h1') || root.querySelector('.guide-section h2'); if(!h || h.querySelector('.catalog-game-icon')) return;
    h.insertBefore(icon(cls,title,'catalog-header-icon'),h.firstChild);
  }
  function addStrip(route, headingText, items){
    const root=routeRoot(route); if(!root) return;
    const heads=[...root.querySelectorAll('.guide-section h2,.guide-section h3,.guide-section h4')];
    const h=heads.find(x=>x.textContent.includes(headingText)); if(!h) return;
    if(h.nextElementSibling && h.nextElementSibling.classList.contains('catalog-icon-strip')) return;
    const row=document.createElement('div'); row.className='catalog-icon-strip';
    items.forEach(x=>row.appendChild(icon(x[0],x[1],x[2]||'')));
    h.insertAdjacentElement('afterend',row);
  }
  function decorate(route, regexSource, cls, title, limit=1, extra=''){
    const root=routeRoot(route); if(!root) return;
    let left=limit;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){
      if(left<=0 || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p=n.parentElement; if(!p) return NodeFilter.FILTER_REJECT;
      if(p.closest('script,style,.catalog-term,.catalog-icon-strip')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }});
    const nodes=[]; while(left>0 && walker.nextNode()) nodes.push(walker.currentNode);
    for(const n of nodes){
      if(left<=0) break;
      const re=new RegExp(regexSource,'i'); const m=n.nodeValue.match(re); if(!m) continue;
      const idx=m.index, len=m[0].length;
      const frag=document.createDocumentFragment();
      frag.appendChild(document.createTextNode(n.nodeValue.slice(0,idx)));
      const wrap=document.createElement('span'); wrap.className='catalog-term';
      wrap.appendChild(icon(cls,title,extra));
      wrap.appendChild(document.createTextNode(n.nodeValue.slice(idx,idx+len)));
      frag.appendChild(wrap);
      frag.appendChild(document.createTextNode(n.nodeValue.slice(idx+len)));
      n.parentNode.replaceChild(frag,n); left--;
    }
  }

  // Category headers where the catalog contains an exact in-game icon.
  addHeaderIcon('gear','gear_component','Компонент усиления опыта для снаряжения');
  addHeaderIcon('buildings','city','Город');
  addHeaderIcon('research','speedup_research','Ускорение исследований');
  addHeaderIcon('alliance','alliance_help','Помощь');
  addHeaderIcon('resources','resource_chest','Сундук ресурсов');
  addHeaderIcon('pets','pets','Питомцы');
  addHeaderIcon('arena','arena','Арена');
  addHeaderIcon('beacon','beacon','Маяк');
  addHeaderIcon('mails','mails','Письма');
  addHeaderIcon('exploration','mythic_mastery','Мифическое руководство по освоению');

  // Hero page: actual portraits from the approved catalog.
  ['heroes'].forEach(r=>{
    decorate(r,'Молли','hero_molly','Молли',2,'catalog-hero-icon');
    decorate(r,'Сергей','hero_sergey','Сергей',2,'catalog-hero-icon');
    decorate(r,'Джесси','hero_jessie','Джесси',2,'catalog-hero-icon');
    decorate(r,'Бахити','hero_bahiti','Бахити',2,'catalog-hero-icon');
    decorate(r,'Джина','hero_gina','Джина',2,'catalog-hero-icon');
    decorate(r,'Джассер','hero_jasser','Джассер',2,'catalog-hero-icon');
    decorate(r,'Со-Юн','hero_seoyoon','Со-Юн',2,'catalog-hero-icon');
  });

  // Gear and governor materials.
  decorate('gear','Компонент усиления опыта для снаряжения','gear_component','Компонент усиления опыта для снаряжения',2);
  decorate('gear','Камни эссенции','essence','Камни эссенции',3);
  addStrip('gear',' Материалы',[
    ['gear_component','Компонент усиления опыта для снаряжения'],['essence','Камни эссенции']
  ]);
  ['governor','resources'].forEach(r=>{
    decorate(r,'Проектные планы','plans','Проектные планы',3);
    decorate(r,'Полировочный раствор','polish','Полировочный раствор',3);
    decorate(r,'Упроченный сплав','alloy','Упроченный сплав',3);
  });
  addStrip('governor',' Материалы',[
    ['plans','Проектные планы'],['polish','Полировочный раствор'],['alloy','Упроченный сплав']
  ]);

  // Buildings.

  // Alliance: real alliance menu icons + raid heroes.
  decorate('alliance','помощь альянсу','alliance_help','Помощь',3);
  decorate('alliance','технологии альянса','alliance_tech','Технологии',2);
  decorate('alliance','сундуки','alliance_boxes','Ящики',2);
  decorate('alliance','магазин альянса','alliance_shop','Магазин',2);
  decorate('alliance','Территория','alliance_territory','Территория',2);
  decorate('alliance','Джесси','hero_jessie','Джесси',2,'catalog-hero-icon');
  decorate('alliance','Джассер','hero_jasser','Джассер',2,'catalog-hero-icon');
  decorate('alliance','Джеронимо','hero_jeronimo','Джеронимо',2,'catalog-hero-icon');
  decorate('alliance','Со-Юн','hero_seoyoon','Со-Юн',2,'catalog-hero-icon');
  addStrip('alliance',' Что делать каждый день',[
    ['alliance_help','Помощь'],['alliance_tech','Технологии'],['alliance_boxes','Ящики'],['alliance_shop','Магазин']
  ]);

  // Resources: replace generic visual cues with the actual game-item art, without changing wording.
  decorate('resources','Алмазы','diamond','Алмаз',4);
  decorate('resources','Кристаллы огня','fire_crystal','Кристалл огня',3);
  decorate('resources','Ускорения','speedup','Ускорение',3);
  decorate('resources','Опыт героя','hero_exp','Опыт героя',2);
  decorate('resources','Мифические фрагменты','mythic_frag','Мифический общий фрагмент героя',2);
  decorate('resources','Камни эссенции','essence','Камни эссенции',3);
  decorate('resources','Компоненты усиления опыта','gear_component','Компонент усиления опыта для снаряжения',2);
  decorate('resources','Питомцы','pets','Питомцы',2);
  addStrip('resources',' Материалы снаряжения',[
    ['gear_component','Компонент усиления опыта для снаряжения'],['essence','Камни эссенции'],['plans','Проектные планы'],['polish','Полировочный раствор'],['alloy','Упроченный сплав']
  ]);

  // v171: basic resource icons from catalog positions 98–101.
  addStrip('research',' Экономика',[
    ['resource_meat','Мясо'],['resource_wood','Дерево'],['resource_coal','Уголь'],['resource_iron','Железо']
  ]);
  addStrip('alliance',' Ресурсные точки альянса',[
    ['resource_meat','Мясо'],['resource_wood','Дерево'],['resource_coal','Уголь'],['resource_iron','Железо']
  ]);
  ['resources','research','alliance','farm'].forEach(r=>{
    decorate(r,'Мясо','resource_meat','Мясо',2);
    decorate(r,'Древесин(?:а|у)','resource_wood','Дерево',2);
    decorate(r,'Уголь','resource_coal','Уголь',2);
    decorate(r,'Железо','resource_iron','Железо',2);
  });

  // v171: approved acceleration icons already present in the catalog icon library.
  addStrip('resources',' Ускорения',[
    ['speedup','Ускорение'],['speedup_build','Ускорение строительства'],['speedup_research','Ускорение исследований'],['speedup_training','Ускорение обучения']
  ]);
  addStrip('armament-competition',' УСКОРЕНИЯ',[
    ['speedup','Ускорение'],['speedup_build','Ускорение строительства'],['speedup_research','Ускорение исследований'],['speedup_training','Ускорение обучения']
  ]);
  ['resources','alliance-showdown','svs-prep','armament-competition'].forEach(r=>{
    decorate(r,'ускорени(?:е|я) строительства','speedup_build','Ускорение строительства',3);
    decorate(r,'ускорени(?:е|я) исследований','speedup_research','Ускорение исследований',3);
    decorate(r,'ускорени(?:е|я) обучения','speedup_training','Ускорение обучения',3);
  });
  decorate('troops','ускорения обучения','speedup_training','Ускорение обучения',2);
  ['home','newbie','beacon','state-positions','brothers-in-arms','castle','state-power','alliance-mobilization'].forEach(r=>{
    decorate(r,'ускорения','speedup','Ускорение',1);
  });

  // Pets: only entries directly supported by the catalog wording.
  decorate('pets','Руководство по приручению','taming_guide','Руководство по приручению',3);
  decorate('pets','Энергетическое зелье','energy_potion','Энергетическое зелье',3);
  decorate('pets','Укрепляющая сыворотка','strengthening_serum','Укрепляющая сыворотка',3);
  decorate('pets','Обычная метка дикой природы','wild_normal','Обычная метка дикой природы',3);
  decorate('pets','Улучшенная метка дикой природы','wild_improved','Улучшенная метка дикой природы',3);
  addStrip('pets',' Материалы питомцев',[
    ['taming_guide','Руководство по приручению'],['energy_potion','Энергетическое зелье'],['strengthening_serum','Укрепляющая сыворотка'],['wild_normal','Обычная метка дикой природы'],['wild_improved','Улучшенная метка дикой природы']
  ]);

  // Governor energy: newly approved catalog icon from the updated item catalog.
  addStrip('beacon',' Энергия губернатора',[
    ['governor_energy','Энергия губернатора']
  ]);
  [['heroes',1],['experts',1],['pets',2],['beacon',2],['mercenary-prestige',2]].forEach(x=>{
    decorate(x[0],'энерги(?:я|и|ю) губернатора','governor_energy','Энергия губернатора',x[1]);
  });

  // Exploration manuals.
  addStrip('exploration',' Руководства по освоению',[
    ['rare_mastery','Редкое руководство по освоению'],['great_mastery','Великое руководство по освоению'],['mythic_mastery','Мифическое руководство по освоению']
  ]);
  decorate('exploration','Мифическое руководство по освоению','mythic_mastery','Мифическое руководство по освоению',2);

  // Interface pages.
  decorate('arena','Арена','arena','Арена',3);
  decorate('beacon','Маяк','beacon','Маяк',4);
  decorate('mails','Письма','mails','Письма',3);

  // Specific item appearances in other guides.
  decorate('fishing','Рог Посейдона','poseidon_horn','Рог Посейдона',2);
  decorate('frostfire-mine','Продвинутый телепорт','advanced_teleport','Продвинутый телепорт',2);

  // Event catalog icons intentionally disabled in v176.

  // Newly approved catalog item icons: only where matching content already exists.
  addStrip('gear',' Мифрил',[[ 'mithril','Мифрил' ]]);
  ['gear','alliance-showdown','svs-prep','armament-competition','state-power','alliance-mobilization'].forEach(r=>decorate(r,'Мифрил','mithril','Мифрил',3));
  addStrip('experts',' Материалы экспертов',[
    ['seal_agnes','Печать Агнес'],['seal_cyrilla','Печать Сириллы'],['seal_holger','Печать Хольгера']
  ]);

  // Иконки без соответствующего текста на текущих страницах намеренно не добавляются.

  // Dedicated event pages intentionally use no catalog event icons.

  function addBackLink(route, href, label){
    const root=routeRoot(route); if(!root || root.querySelector('.guide-back-link')) return;
    const host=root.querySelector('.guide-page-v69') || root;
    const a=document.createElement('a'); a.className='guide-back-link'; a.href=href; a.textContent=label;
    const hero=host.querySelector('.guide-hero');
    if(hero) hero.insertAdjacentElement('afterend',a); else host.insertBefore(a,host.firstChild);
  }
  ['alliance-showdown','tundra-trade-route','endless-trial','mercenary-prestige','frostfire-mine','crazy-joe','alliance-championship','fishing','forts','castle','foundry','svs-prep','svs','alliance-mobilization','winter-siege','dreams','snowplow','bear'].forEach(r=>addBackLink(r,'#events','← Все события'));
  ['buildings-before-fire','buildings-after-fire'].forEach(r=>addBackLink(r,'#buildings','← Все здания'));
})();

(function(){
  var btn=document.getElementById('mobileMenuToggle');
  var overlay=document.getElementById('mobileNavOverlay');
  var nav=document.querySelector('.nav-wrap');
  if(!btn||!overlay||!nav) return;
  function setOpen(open){
    document.body.classList.toggle('mobile-menu-open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
    btn.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');
    btn.textContent=open?'×':'☰';
    overlay.setAttribute('aria-hidden',open?'false':'true');
  }
  btn.addEventListener('click',function(){setOpen(!document.body.classList.contains('mobile-menu-open'));});
  document.getElementById('mobileSectionsBtn')?.addEventListener('click',function(){setOpen(true);});
  overlay.addEventListener('click',function(){setOpen(false);});
  nav.addEventListener('click',function(e){
    if(e.target.closest('a') && window.matchMedia('(max-width:1200px), (hover:none) and (pointer:coarse)').matches) setOpen(false);
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape') setOpen(false);});
  window.addEventListener('resize',function(){if(window.innerWidth>1200 && !window.matchMedia('(hover:none) and (pointer:coarse)').matches) setOpen(false);});
})();

(function(){
  var sectionsBtn=document.getElementById('mobileSectionsBtn');
  var overlay=document.getElementById('mobileNavOverlay');
  var topBtn=document.getElementById('mobileMenuToggle');
  if(!sectionsBtn) return;
  function openSections(){
    document.body.classList.add('mobile-menu-open');
    if(overlay) overlay.setAttribute('aria-hidden','false');
    if(topBtn){
      topBtn.setAttribute('aria-expanded','true');
      topBtn.setAttribute('aria-label','Закрыть меню');
      topBtn.textContent='×';
    }
  }
  sectionsBtn.addEventListener('click',openSections,true);
  sectionsBtn.addEventListener('touchend',function(e){e.preventDefault();openSections();},{passive:false});
})();

(function(){
  const classes=['ci-resource_meat','ci-resource_wood','ci-resource_coal','ci-resource_iron','ci-speedup','ci-speedup_build','ci-speedup_research','ci-speedup_training'];
  document.querySelectorAll('.catalog-term').forEach(wrap=>{
    if(wrap.querySelector(classes.map(c=>'.'+c).join(','))){
      wrap.replaceWith(document.createTextNode(wrap.textContent));
    }
  });
})();

(function(){
  const eventsMap={
    'bear':['','Охота на медведя'],
    'crazy-joe':['','Безумный Джо'],
    'mercenary-prestige':['','Престиж наёмника'],
    'frostfire-mine':['','Рудник ледяного огня'],
    'endless-trial':['','Бесконечное испытание'],
    'tundra-trade-route':['','Торговый путь в тундре'],
    'alliance-showdown':['','Сражение альянсов'],
    'fishing':['','Рыбалка'],
    'snowplow':['','Снегоуборщики'],
    'dreams':['','Воспоминания о грёзах'],
    'alliance-championship':['','Чемпионат альянса'],
    'foundry':['','Литейная'],
    'forts':['','Форты'],
    'castle':['','Битва за замок'],
    'svs-prep':['','Подготовка к SvS'],
    'svs':['','SvS: боевая фаза'],
    'armament-competition':['','Гонка вооружений'],
    'state-power':['','Мощь государства'],
    'alliance-mobilization':['','Мобилизация альянса'],
    'brothers-in-arms':['','Братья по оружию'],
    'winter-siege':['','Зимняя осада']
  };

  function hasLeadingEmoji(text){
    return /^[^\wА-Яа-яЁё]/.test((text||'').trim());
  }
  function prefixText(el, emoji, plain){
    if(!el) return;
    const t=(el.textContent||'').trim();
    if(!t) return;
    if(hasLeadingEmoji(t)) return;
    if(plain && t===plain) el.textContent=emoji+' '+plain;
    else el.textContent=emoji+' '+t;
  }

  const eventsRoot=document.querySelector('.route-page[data-route="events"]');
  if(eventsRoot){
    prefixText(eventsRoot.querySelector('.guide-hero h1'), '', 'События');
    const items=[...eventsRoot.querySelectorAll('.guide-list li > b')];
    items.forEach(b=>{
      const t=b.textContent.trim();
      for(const [route,[emoji,name]] of Object.entries(eventsMap)){
        if(t===name) prefixText(b, emoji, name);
      }
    });
    [...eventsRoot.querySelectorAll('.guide-nav-card[href^="#"]')].forEach(a=>{
      const href=(a.getAttribute('href')||'').slice(1);
      const row=eventsMap[href];
      if(row) prefixText(a,row[0],row[1]);
    });
  }

  Object.entries(eventsMap).forEach(([route,[emoji,name]])=>{
    const root=document.querySelector('.route-page[data-route="'+route+'"]');
    if(!root) return;
    const heading=root.querySelector('.guide-hero h1,.guide-hero-text h1,.section h2,.section h3,.guide-section h2,.guide-section h3');
    prefixText(heading,emoji,name);
  });
})();

(function(){
  function syncBearPage(){
    var route=(document.body.dataset.staticRoute||'home');
    document.body.classList.toggle('v182-bear-active',route==='bear');
  }
  syncBearPage();
  window.addEventListener('hashchange',syncBearPage);
  window.addEventListener('popstate',syncBearPage);
})();

(function(){
  const eventRoutes=new Set([
    'bear','crazy-joe','mercenary-prestige','frostfire-mine','endless-trial',
    'tundra-trade-route','alliance-showdown','fishing','snowplow','dreams',
    'alliance-championship','foundry','forts','castle','svs-prep','svs',
    'armament-competition','state-power','alliance-mobilization','brothers-in-arms','winter-siege'
  ]);
  function revealActiveEvent(){
    const route=(document.body.dataset.staticRoute||'home');
    if(!eventRoutes.has(route)) return;
    const page=document.querySelector('.route-page[data-route="'+route+'"]');
    if(!page) return;
    page.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in-view');});
  }
  document.addEventListener('DOMContentLoaded',function(){setTimeout(revealActiveEvent,0);});
  window.addEventListener('hashchange',function(){setTimeout(revealActiveEvent,0);});
  revealActiveEvent();
})();

(function(){window.addEventListener('load',function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Pangolin&display=swap';document.head.appendChild(l);},{once:true});})();

(function(){function loadNavIcons(){document.querySelectorAll('.nav-wrap img[data-src]').forEach(function(i){i.src=i.dataset.src;i.removeAttribute('data-src');});}if(window.matchMedia&&window.matchMedia('(min-width:981px)').matches)loadNavIcons();var b=document.getElementById('mobileMenuToggle');if(b)b.addEventListener('click',loadNavIcons,{once:true});})();


/* v255: decorative snow/feathers are omitted from initial mobile DOM and restored lazily on desktop only. */
(function(){
  if(!window.matchMedia || !window.matchMedia('(min-width:981px)').matches) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function addDesktopFx(){
    if(document.querySelector('.fx-snow,.fx-feathers')) return;
    var box=document.createElement('div');
    box.innerHTML="<div aria-hidden=\"true\" class=\"fx-snow\"><span class=\"snowflake sm\" style=\"left:63.3vw;top:2.4vh;animation-duration:10.5s;animation-delay:-3.8s;--drift:-39px\"></span><span class=\"snowflake\" style=\"left:58.5vw;top:3.1vh;animation-duration:8.8s;animation-delay:-4.0s;--drift:-59px\"></span><span class=\"snowflake sm\" style=\"left:70.9vw;top:67.3vh;animation-duration:11.8s;animation-delay:-7.6s;--drift:6px\"></span><span class=\"snowflake\" style=\"left:75.1vw;top:15.3vh;animation-duration:11.8s;animation-delay:-4.7s;--drift:-10px\"></span><span class=\"snowflake sm\" style=\"left:10.1vw;top:36.5vh;animation-duration:11.2s;animation-delay:-5.8s;--drift:2px\"></span><span class=\"snowflake\" style=\"left:72.2vw;top:51.5vh;animation-duration:16.8s;animation-delay:-6.4s;--drift:10px\"></span><span class=\"snowflake sm\" style=\"left:57.2vw;top:67.6vh;animation-duration:8.4s;animation-delay:-3.9s;--drift:9px\"></span><span class=\"snowflake\" style=\"left:84.7vw;top:83.2vh;animation-duration:11.4s;animation-delay:-7.7s;--drift:28px\"></span><span class=\"snowflake\" style=\"left:36.6vw;top:20.1vh;animation-duration:10.4s;animation-delay:-15.9s;--drift:-47px\"></span><span class=\"snowflake\" style=\"left:52.9vw;top:23.5vh;animation-duration:12.2s;animation-delay:-4.6s;--drift:-9px\"></span><span class=\"snowflake lg\" style=\"left:83.4vw;top:74.5vh;animation-duration:10.1s;animation-delay:-0.5s;--drift:15px\"></span><span class=\"snowflake\" style=\"left:26.5vw;top:20.3vh;animation-duration:16.5s;animation-delay:-14.9s;--drift:15px\"></span><span class=\"snowflake\" style=\"left:64.9vw;top:38.0vh;animation-duration:16.2s;animation-delay:-7.8s;--drift:2px\"></span><span class=\"snowflake\" style=\"left:24.4vw;top:53.9vh;animation-duration:10.4s;animation-delay:-9.9s;--drift:37px\"></span><span class=\"snowflake sm\" style=\"left:21.7vw;top:95.8vh;animation-duration:12.6s;animation-delay:-1.5s;--drift:-53px\"></span><span class=\"snowflake lg\" style=\"left:15.1vw;top:15.4vh;animation-duration:14.1s;animation-delay:-10.1s;--drift:33px\"></span><span class=\"snowflake sm\" style=\"left:59.0vw;top:44.9vh;animation-duration:10.3s;animation-delay:-9.4s;--drift:-63px\"></span><span class=\"snowflake\" style=\"left:67.5vw;top:51.5vh;animation-duration:10.4s;animation-delay:-10.9s;--drift:-37px\"></span><span class=\"snowflake\" style=\"left:43.0vw;top:43.6vh;animation-duration:16.6s;animation-delay:-14.9s;--drift:2px\"></span><span class=\"snowflake\" style=\"left:50.3vw;top:10.2vh;animation-duration:13.6s;animation-delay:-14.3s;--drift:64px\"></span><span class=\"snowflake\" style=\"left:15.1vw;top:73.2vh;animation-duration:12.9s;animation-delay:-13.2s;--drift:-65px\"></span><span class=\"snowflake\" style=\"left:48.4vw;top:10.7vh;animation-duration:11.3s;animation-delay:-16.8s;--drift:13px\"></span><span class=\"snowflake sm\" style=\"left:5.7vw;top:84.3vh;animation-duration:16.5s;animation-delay:-1.5s;--drift:59px\"></span><span class=\"snowflake\" style=\"left:96.8vw;top:51.1vh;animation-duration:9.1s;animation-delay:-11.2s;--drift:-23px\"></span><span class=\"snowflake\" style=\"left:52.2vw;top:58.2vh;animation-duration:16.7s;animation-delay:-15.8s;--drift:-14px\"></span><span class=\"snowflake sm\" style=\"left:39.5vw;top:64.5vh;animation-duration:11.4s;animation-delay:-15.3s;--drift:50px\"></span><span class=\"snowflake sm\" style=\"left:24.5vw;top:6.1vh;animation-duration:8.2s;animation-delay:-9.4s;--drift:-9px\"></span><span class=\"snowflake sm\" style=\"left:7.0vw;top:60.6vh;animation-duration:10.1s;animation-delay:-15.4s;--drift:19px\"></span><span class=\"snowflake\" style=\"left:50.9vw;top:26.7vh;animation-duration:12.4s;animation-delay:-9.2s;--drift:56px\"></span><span class=\"snowflake\" style=\"left:77.7vw;top:77.5vh;animation-duration:9.7s;animation-delay:-1.6s;--drift:45px\"></span><span class=\"snowflake sm\" style=\"left:41.9vw;top:44.8vh;animation-duration:14.6s;animation-delay:-11.4s;--drift:-40px\"></span><span class=\"snowflake lg\" style=\"left:39.9vw;top:32.6vh;animation-duration:15.8s;animation-delay:-4.2s;--drift:-17px\"></span><span class=\"snowflake lg\" style=\"left:13.9vw;top:17.6vh;animation-duration:12.2s;animation-delay:-14.9s;--drift:-46px\"></span><span class=\"snowflake sm\" style=\"left:80.0vw;top:82.2vh;animation-duration:8.9s;animation-delay:-11.1s;--drift:-62px\"></span><span class=\"snowflake lg\" style=\"left:91.7vw;top:81.5vh;animation-duration:9.5s;animation-delay:-8.3s;--drift:-11px\"></span><span class=\"snowflake\" style=\"left:89.3vw;top:15.8vh;animation-duration:8.0s;animation-delay:-6.6s;--drift:51px\"></span><span class=\"snowflake\" style=\"left:41.9vw;top:91.9vh;animation-duration:17.0s;animation-delay:-9.4s;--drift:59px\"></span><span class=\"snowflake\" style=\"left:18.8vw;top:20.9vh;animation-duration:8.5s;animation-delay:-12.5s;--drift:-50px\"></span><span class=\"snowflake sm\" style=\"left:5.7vw;top:56.1vh;animation-duration:12.5s;animation-delay:-14.5s;--drift:-25px\"></span><span class=\"snowflake lg\" style=\"left:95.1vw;top:7.7vh;animation-duration:9.7s;animation-delay:-10.1s;--drift:-5px\"></span><span class=\"snowflake lg\" style=\"left:11.9vw;top:85.5vh;animation-duration:10.2s;animation-delay:-10.1s;--drift:-45px\"></span><span class=\"snowflake\" style=\"left:65.1vw;top:54.3vh;animation-duration:10.8s;animation-delay:-4.4s;--drift:15px\"></span><span class=\"snowflake sm\" style=\"left:26.3vw;top:12.6vh;animation-duration:13.8s;animation-delay:-7.8s;--drift:-47px\"></span><span class=\"snowflake\" style=\"left:45.4vw;top:95.9vh;animation-duration:17.0s;animation-delay:-1.2s;--drift:-11px\"></span><span class=\"snowflake\" style=\"left:13.1vw;top:33.5vh;animation-duration:8.6s;animation-delay:-4.2s;--drift:7px\"></span><span class=\"snowflake\" style=\"left:43.4vw;top:52.1vh;animation-duration:10.7s;animation-delay:-16.7s;--drift:-63px\"></span><span class=\"snowflake\" style=\"left:92.2vw;top:9.9vh;animation-duration:15.9s;animation-delay:-4.5s;--drift:-38px\"></span><span class=\"snowflake lg\" style=\"left:27.0vw;top:58.1vh;animation-duration:14.5s;animation-delay:-3.5s;--drift:2px\"></span><span class=\"snowflake sm\" style=\"left:24.9vw;top:87.2vh;animation-duration:8.5s;animation-delay:-10.8s;--drift:5px\"></span><span class=\"snowflake lg\" style=\"left:0.4vw;top:74.0vh;animation-duration:13.7s;animation-delay:-4.5s;--drift:48px\"></span><span class=\"snowflake sm\" style=\"left:55.5vw;top:10.7vh;animation-duration:16.5s;animation-delay:-11.7s;--drift:-27px\"></span><span class=\"snowflake\" style=\"left:82.6vw;top:55.9vh;animation-duration:9.3s;animation-delay:-2.2s;--drift:13px\"></span><span class=\"snowflake\" style=\"left:89.0vw;top:76.4vh;animation-duration:15.7s;animation-delay:-15.3s;--drift:-12px\"></span><span class=\"snowflake\" style=\"left:66.0vw;top:34.0vh;animation-duration:13.0s;animation-delay:-14.9s;--drift:-26px\"></span><span class=\"snowflake\" style=\"left:85.6vw;top:93.7vh;animation-duration:15.3s;animation-delay:-15.0s;--drift:-59px\"></span><span class=\"snowflake\" style=\"left:72.9vw;top:31.9vh;animation-duration:16.4s;animation-delay:-13.6s;--drift:-2px\"></span><span class=\"snowflake\" style=\"left:15.8vw;top:67.3vh;animation-duration:11.4s;animation-delay:-0.7s;--drift:55px\"></span><span class=\"snowflake\" style=\"left:19.8vw;top:88.2vh;animation-duration:11.1s;animation-delay:-13.9s;--drift:-7px\"></span><span class=\"snowflake\" style=\"left:2.3vw;top:18.5vh;animation-duration:11.0s;animation-delay:-14.7s;--drift:6px\"></span><span class=\"snowflake sm\" style=\"left:63.5vw;top:38.4vh;animation-duration:16.8s;animation-delay:-9.1s;--drift:-58px\"></span></div><div aria-hidden=\"true\" class=\"fx-feathers\"><span class=\"feather\" style=\"left:8vw;top:25.7vh;animation-duration:29.3s;animation-delay:-8.4s\"></span><span class=\"feather\" style=\"left:16vw;top:3.0vh;animation-duration:27.7s;animation-delay:-6.6s\"></span><span class=\"feather\" style=\"left:27vw;top:62.8vh;animation-duration:30.0s;animation-delay:-13.4s\"></span><span class=\"feather lg\" style=\"left:36vw;top:56.9vh;animation-duration:33.8s;animation-delay:-8.8s\"></span><span class=\"feather\" style=\"left:48vw;top:81.7vh;animation-duration:24.6s;animation-delay:-19.7s\"></span><span class=\"feather sm\" style=\"left:59vw;top:47.2vh;animation-duration:32.2s;animation-delay:-16.4s\"></span><span class=\"feather sm\" style=\"left:71vw;top:3.6vh;animation-duration:24.6s;animation-delay:-22.0s\"></span><span class=\"feather lg\" style=\"left:83vw;top:21.6vh;animation-duration:33.9s;animation-delay:-10.2s\"></span><span class=\"feather\" style=\"left:91vw;top:11.9vh;animation-duration:28.2s;animation-delay:-3.2s\"></span></div>";
    var frag=document.createDocumentFragment();
    while(box.firstChild) frag.appendChild(box.firstChild);
    document.body.insertBefore(frag,document.body.firstChild);
  }
  window.addEventListener('load',function(){
    if('requestIdleCallback' in window) requestIdleCallback(addDesktopFx,{timeout:1200});
    else setTimeout(addDesktopFx,250);
  },{once:true});
})();

/* v256: decorative site footer; no content blocks are altered. */
(function(){
  function addFooter(){
    if(document.querySelector('.site-footer-v256')) return;
    var main=document.querySelector('main');
    if(!main) return;
    var footer=document.createElement('footer');
    footer.className='site-footer-v256';
    footer.innerHTML='<div class="site-footer-copy"><strong>Белая Мгла: Выживание</strong><span>Автор — Sova · версия v256</span></div><button class="site-footer-top" type="button" aria-label="Наверх">↑ Наверх</button>';
    main.insertAdjacentElement('afterend',footer);
    var btn=footer.querySelector('.site-footer-top');
    if(btn) btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',addFooter,{once:true});
  else addFooter();
})();


// v292: shared likes for News pages using CounterAPI
(function(){
  var namespace = 'belaya-mgla-sova58.github.io';
  var action = 'like';

  function apiUrl(key, readOnly){
    var url = 'https://counterapi.com/api/' + encodeURIComponent(namespace) + '/' + encodeURIComponent(action) + '/' + encodeURIComponent(key) + '?behavior=vote';
    if(readOnly) url += '&readOnly=true';
    return url;
  }

  function storageKey(key){ return 'belaya-mgla-liked-' + key; }

  function setCount(button, value){
    var count = button.querySelector('.news-like-count');
    if(count && typeof value !== 'undefined' && value !== null) count.textContent = value;
  }

  async function loadCount(button){
    var key = button.getAttribute('data-like-key');
    if(!key) return;
    button.classList.add('is-loading');
    try{
      var res = await fetch(apiUrl(key, true), {cache:'no-store'});
      if(!res.ok) throw new Error('counter read failed');
      var data = await res.json();
      setCount(button, data.value || 0);
    }catch(e){
      // Keep the control usable if the third-party counter is temporarily unavailable.
    }finally{
      button.classList.remove('is-loading');
    }
    if(localStorage.getItem(storageKey(key)) === '1'){
      button.classList.add('is-liked');
      button.disabled = true;
      button.setAttribute('aria-label','Лайк уже поставлен');
    }
  }

  async function like(button){
    var key = button.getAttribute('data-like-key');
    if(!key || localStorage.getItem(storageKey(key)) === '1') return;
    button.disabled = true;
    button.classList.add('is-loading');
    try{
      var res = await fetch(apiUrl(key, false), {cache:'no-store'});
      if(!res.ok) throw new Error('counter vote failed');
      var data = await res.json();
      setCount(button, data.value || 0);
      localStorage.setItem(storageKey(key), '1');
      button.classList.add('is-liked');
      button.setAttribute('aria-label','Лайк уже поставлен');
    }catch(e){
      button.disabled = false;
    }finally{
      button.classList.remove('is-loading');
    }
  }

  function initLikes(){
    document.querySelectorAll('.news-like-button').forEach(function(button){
      loadCount(button);
      button.addEventListener('click', function(){ like(button); });
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLikes);
  else initLikes();
})();


// v297: instant visual response for CounterAPI vote widgets on News cards.
(function(){
  function parseCount(text){
    var m=String(text||'').replace(/\s+/g,' ').match(/(\d[\d\s.,]*)/);
    if(!m) return 0;
    var n=parseInt(m[1].replace(/[^\d]/g,''),10);
    return Number.isFinite(n)?n:0;
  }
  function likeStorageKey(key){ return 'belaya-mgla-fast-liked-' + key; }
  function initFastCardLikes(){
    document.querySelectorAll('.news-category-card .news-card-counter').forEach(function(counter){
      var card=counter.closest('.news-category-card');
      if(!card || card.querySelector('.news-card-fast-like')) return;
      var key=counter.getAttribute('key') || counter.getAttribute('data-key') || '';
      var btn=document.createElement('button');
      btn.type='button';
      btn.className='news-card-fast-like';
      btn.setAttribute('aria-label','Поставить лайк');
      btn.innerHTML='<span class="fast-like-heart" aria-hidden="true">♥</span><span class="fast-like-count" aria-live="polite">0</span>';
      card.appendChild(btn);
      var countEl=btn.querySelector('.fast-like-count');
      var sync=function(){
        var real=parseCount(counter.textContent);
        if(real>=0 && !btn.classList.contains('is-pending')) countEl.textContent=String(real);
      };
      new MutationObserver(function(){
        var real=parseCount(counter.textContent);
        if(real>=0){
          countEl.textContent=String(real);
          btn.classList.remove('is-pending');
        }
      }).observe(counter,{subtree:true,childList:true,characterData:true,attributes:true});
      setTimeout(sync,250); setTimeout(sync,1000); setTimeout(sync,2500);
      if(key && localStorage.getItem(likeStorageKey(key))==='1'){
        btn.classList.add('is-liked');
        btn.disabled=true;
        btn.setAttribute('aria-label','Лайк уже поставлен');
      }
      function fireRealVote(attempt){
        var target=counter.querySelector('button,[role="button"],a') || counter;
        try{ target.click(); return; }catch(e){}
        if(attempt<20) setTimeout(function(){fireRealVote(attempt+1);},250);
      }
      btn.addEventListener('click',function(ev){
        ev.preventDefault(); ev.stopPropagation();
        if(btn.disabled) return;
        var current=parseCount(countEl.textContent);
        countEl.textContent=String(current+1);
        btn.classList.add('is-liked','is-pending');
        btn.disabled=true;
        btn.setAttribute('aria-label','Лайк уже поставлен');
        if(key) localStorage.setItem(likeStorageKey(key),'1');
        fireRealVote(0);
      });
      counter.classList.add('news-card-counter-hidden');
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initFastCardLikes,{once:true});
  else initFastCardLikes();
})();
