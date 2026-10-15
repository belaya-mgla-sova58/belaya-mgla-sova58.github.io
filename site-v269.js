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
    if(!page) page=document.querySelector('.route-page.active') || document.querySelector('.route-page');
    if(page){
      document.querySelectorAll('.route-page').forEach(function(p){p.classList.remove('active');});
      page.classList.add('active');
    }
    // Static multipage navigation already contains the correct active item.
    // Do not overwrite it with the old hash-route logic.
    document.querySelectorAll('.nav-wrap nav a').forEach(function(a){
      if(a.classList.contains('active')) a.setAttribute('aria-current','page');
      else a.removeAttribute('aria-current');
      a.style.removeProperty('background');
      a.style.removeProperty('color');
    });
  }
  document.addEventListener('DOMContentLoaded',showRoute);
  showRoute();
})();

/* v426: legacy Sova helper removed */


/* v426: legacy Sova search removed */


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
    // v409 multipage pages carry their final header text in HTML; do not overwrite it with the legacy SPA header updater.
    if(document.body.classList.contains('site-hq-v407')) return;
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

    // v401: защита от дублей игровых иконок.
    // Если в том же смысловом блоке уже стоит такая же иконка вручную
    // или её ранее добавил скрипт, вторую не вставляем.
    const blockFor = p => p.closest('p,li,h1,h2,h3,h4,h5,h6,td,th,.mini-card,.guide-callout,.rule,.savebox') || p;
    const hasSameIcon = p => {
      const block=blockFor(p);
      if(!block) return false;
      if(block.querySelector('.catalog-game-icon.ci-'+cls)) return true;
      return !!block.querySelector('img.catalog-inline-item-icon[src$="catalog-'+cls+'.png"]');
    };

    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){
      if(left<=0 || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p=n.parentElement; if(!p) return NodeFilter.FILTER_REJECT;
      if(p.closest('script,style,.catalog-term,.catalog-icon-strip,.alliance-daily-list-v412')) return NodeFilter.FILTER_REJECT;
      if(hasSameIcon(p)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }});
    const nodes=[]; while(left>0 && walker.nextNode()) nodes.push(walker.currentNode);
    for(const n of nodes){
      if(left<=0) break;
      const p=n.parentElement; if(!p || hasSameIcon(p)) continue;
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
  // v400: gear already has one approved essence icon in the heading; do not auto-insert duplicates.
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
  // v397: on the Gear page the Mithril icon is already placed manually in the heading.
  // Do not add an icon strip or auto-decorate the word there, otherwise the same icon is duplicated.
  ['alliance-showdown','svs-prep','armament-competition','state-power','alliance-mobilization'].forEach(r=>decorate(r,'Мифрил','mithril','Мифрил',3));
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


// v304: shared News likes via Firebase Realtime Database REST API
(function(){
  var FIREBASE_BASE = 'https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/';
  var LIKED_PREFIX = 'belaya-mgla-firebase-liked-';

  function urlFor(key){
    return FIREBASE_BASE + encodeURIComponent(key) + '.json';
  }

  function getButtons(key){
    return document.querySelectorAll('.news-like-button[data-like-key="' + key + '"]');
  }

  function setCount(key, value){
    var safe = Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
    getButtons(key).forEach(function(button){
      var count = button.querySelector('.news-like-count');
      if(count) count.textContent = String(safe);
    });
  }

  function setLiked(key, liked){
    getButtons(key).forEach(function(button){
      button.classList.toggle('is-liked', !!liked);
      button.disabled = !!liked;
      button.setAttribute('aria-label', liked ? 'Лайк уже поставлен' : 'Поставить лайк');
    });
  }

  function setBusy(key, busy){
    getButtons(key).forEach(function(button){
      button.classList.toggle('is-loading', !!busy);
      if(!localStorage.getItem(LIKED_PREFIX + key)){
        button.disabled = !!busy;
      }
    });
  }

  async function loadCount(key){
    try{
      var response = await fetch(urlFor(key), {
        method: 'GET',
        cache: 'no-store',
        headers: {'Accept':'application/json'}
      });
      if(!response.ok) throw new Error('HTTP ' + response.status);
      var value = await response.json();
      setCount(key, typeof value === 'number' ? value : 0);
    }catch(err){
      console.warn('Firebase like read failed for', key, err);
      setCount(key, 0);
    }
  }

  async function incrementCount(key){
    var response = await fetch(urlFor(key), {
      method: 'PUT',
      cache: 'no-store',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'.sv': {'increment': 1}})
    });
    if(!response.ok){
      var body = '';
      try { body = await response.text(); } catch(e) {}
      throw new Error('Firebase write failed ' + response.status + ' ' + body);
    }
    var value = await response.json();
    return typeof value === 'number' ? value : null;
  }

  function initLikes(){
    var keys = new Set();

    document.querySelectorAll('.news-like-button[data-like-key]').forEach(function(button){
      var key = button.getAttribute('data-like-key');
      if(!key) return;
      keys.add(key);

      if(localStorage.getItem(LIKED_PREFIX + key) === '1'){
        setLiked(key, true);
      }

      button.addEventListener('click', async function(event){
        event.preventDefault();
        event.stopPropagation();

        if(localStorage.getItem(LIKED_PREFIX + key) === '1') return;

        var countEl = button.querySelector('.news-like-count');
        var before = countEl ? parseInt(countEl.textContent || '0', 10) || 0 : 0;

        // Instant visual response.
        setCount(key, before + 1);
        setBusy(key, true);

        try{
          var serverValue = await incrementCount(key);
          localStorage.setItem(LIKED_PREFIX + key, '1');
          setLiked(key, true);
          if(serverValue !== null) setCount(key, serverValue);
          else await loadCount(key);
        }catch(err){
          console.warn('Firebase like write failed for', key, err);
          setCount(key, before);
          setBusy(key, false);
        }
      });
    });

    keys.forEach(function(key){ loadCount(key); });

    // Refresh counts after returning to the tab.
    document.addEventListener('visibilitychange', function(){
      if(document.visibilityState === 'visible'){
        keys.forEach(function(key){ loadCount(key); });
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initLikes, {once:true});
  } else {
    initLikes();
  }
})();


/* v353 — Sova helper: quick actions + local natural-language search */
(() => {
  const normalize = (s) => (s || "")
    .toLowerCase()
    .replace(/ё/g,"е")
    .replace(/[^\p{L}\p{N}\s-]/gu," ")
    .replace(/\s+/g," ")
    .trim();

  const pages = [
    ["newbie.html","Новичкам","топка новичок начало очередь стройка исследование альянс мощность"],
    ["heroes.html","Герои","герой герои учебный лагерь наставник опыт поколение"],
    ["gear.html","Снаряжение","снаряжение одежда героя комплект усиление"],
    ["buildings.html","Здания","здание здания топка строительство"],
    ["research.html","Исследования","исследование развитие экономика битва"],
    ["troops.html","Войска","войска пехота стрелок копейщик отряд"],
    ["alliance.html","Альянс","альянс помощь технологии магазин территория штаб стяг"],
    ["resources.html","Ресурсы","ресурс ресурсы сбор плитка грузоподъемность"],
    ["governor.html","Губернатор","губернатор снаряжение талисман"],
    ["farm.html","Ферма","ферма второй персонаж"],
    ["experts.html","Эксперты","эксперт эксперты агнес сирилла хольгер"],
    ["pets.html","Питомцы","питомец питомцы пещерный лев снежный примат"],
    ["bear.html","Охота на медведя","медведь мишка охота сбор герои рейд"],
    ["crazy-joe.html","Безумный Джо","джо безумный джо"],
    ["forts.html","Форты","форт форты крепость"],
    ["foundry.html","Литейная","литейная"],
    ["castle.html","Битва за замок","замок битва замок"],
    ["svs-prep.html","Подготовка к SvS","svs свс подготовка"],
    ["svs.html","SvS: боевая фаза","svs свс боевая фаза"],
    ["snowplow.html","Снегоуборщики","снегоуборщик снегоуборщики"],
    ["fishing.html","Рыбалка","рыбалка рыба"],
    ["alliance-championship.html","Чемпионат альянса","чемпионат альянса"],
    ["alliance-mobilization.html","Мобилизация альянса","мобилизация"],
    ["brothers-in-arms.html","Братья по оружию","братья оружию щит атака"],
    ["winter-siege.html","Зимняя осада","зимняя осада"],
    ["news.html","Новости","новости что нового"],
    ["news-eu.html","Обновления EU","eu европа обновления"],
    ["news-ru.html","Обновления RU","ru русская версия обновления"],
    ["news-elena.html","WhiteFox News","whitefox fox новости государства гос 58 елена elena"],
    ["creative-corner.html","Творческий уголок","творчество стих стихи рассказы рисунки уголок"]
  ].map(([url,title,keys]) => ({url,title,keys:normalize(title+" "+keys)}));

  const aliases = {
    "мишка":"медведь",
    "медведя":"медведь",
    "свс":"svs",
    "героев":"герои",
    "героя":"герои",
    "петы":"питомцы",
    "пет":"питомцы",
    "исследы":"исследования",
    "войск":"войска",
    "новое":"новости"
  };

  function search(q){
    let nq = normalize(q);
    Object.entries(aliases).forEach(([a,b]) => nq = nq.replace(new RegExp(`\\b${a}\\b`,"g"),b));
    const words = nq.split(" ").filter(w => w.length > 1);
    return pages.map(p => {
      let score = 0;
      words.forEach(w => {
        if (p.keys.includes(w)) score += 3;
        if (normalize(p.title).includes(w)) score += 4;
      });
      if (p.keys.includes(nq)) score += 5;
      return {...p,score};
    }).filter(x => x.score > 0).sort((a,b) => b.score-a.score).slice(0,5);
  }

  function findExistingHelper(){
    return document.querySelector(
      '#owlAssistant, .owl-assistant, .assistant-owl, .owl-helper, [data-owl-helper], #assistantOwl'
    );
  }

  function createPanel(){
    if (document.getElementById("sovaSmartPanel")) return;
    const panel = document.createElement("div");
    panel.id = "sovaSmartPanel";
    panel.className = "sova-smart-panel";
    panel.innerHTML = `
      <div class="sova-smart-head">
        <div><strong>Помощник Сова</strong><small>Найду нужное в «Белой Мгле»</small></div>
        <button type="button" class="sova-smart-close" aria-label="Закрыть">×</button>
      </div>
      <form class="sova-smart-search">
        <input type="search" placeholder="Например: герои на мишку" autocomplete="off">
        <button type="submit">Найти</button>
      </form>
      <div class="sova-smart-actions">
        <button type="button" data-q="что качать герои снаряжение">⚙️ Что качать?</button>
        <button type="button" data-q="события">⚔️ События</button>
        <button type="button" data-q="новости">📰 Новости</button>
        <button type="button" data-q="новичкам">❄️ Новичку</button>
      </div>
      <div class="sova-smart-results">
        <div class="sova-smart-welcome">Напиши, что ищешь. Я покажу подходящий раздел сайта.</div>
      </div>`;
    document.body.appendChild(panel);

    const input = panel.querySelector("input");
    const results = panel.querySelector(".sova-smart-results");

    function render(q){
      const found = search(q);
      if (!found.length){
        results.innerHTML = `<div class="sova-smart-empty">Ничего точного не нашла. Попробуй короче: <b>медведь</b>, <b>Мия</b>, <b>питомцы</b>, <b>SvS</b>.</div>`;
        return;
      }
      results.innerHTML = found.map(x =>
        `<a class="sova-smart-result" href="${x.url}">
          <span>${x.title}</span><b>Открыть ›</b>
        </a>`).join("");
    }

    panel.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      render(input.value);
    });
    panel.querySelectorAll("[data-q]").forEach(b => b.addEventListener("click", () => {
      input.value = b.dataset.q;
      render(b.dataset.q);
    }));
    panel.querySelector(".sova-smart-close").addEventListener("click", () => panel.classList.remove("is-open"));

    // Open from existing owl if we can identify it.
    const owl = findExistingHelper();
    if (owl){
      owl.addEventListener("click", e => {
        // Do not break existing internal controls.
        if (e.target.closest("a,input,button") && e.target !== owl) return;
        panel.classList.toggle("is-open");
        if (panel.classList.contains("is-open")) setTimeout(() => input.focus(),80);
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",createPanel);
  else createPanel();
})();

/* v355 — never show a second owl */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sova-smart-trigger").forEach(el => el.remove());
});








/* v359 — shared article views via the same Firebase database as likes */
(() => {
  const FIREBASE_VIEWS = 'https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/';
  const articles = {
    "whitefox-elena-38-39.html": "whitefox-elena-38-39"
  };
  const categoryCards = {
    "news-elena.html": {
      href: "whitefox-elena-38-39.html",
      key: "whitefox-elena-38-39"
    }
  };

  const urlFor = key => FIREBASE_VIEWS + encodeURIComponent('__views__' + key) + '.json';

  async function readCount(key){
    const r = await fetch(urlFor(key), {
      method:'GET',
      cache:'no-store',
      headers:{'Accept':'application/json'}
    });
    if(!r.ok) throw new Error('view read HTTP ' + r.status);
    const v = await r.json();
    return typeof v === 'number' ? Math.max(0, v) : 0;
  }

  async function incrementCount(key){
    const r = await fetch(urlFor(key), {
      method:'PUT',
      cache:'no-store',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({'.sv':{increment:1}})
    });
    if(!r.ok){
      let body = '';
      try { body = await r.text(); } catch(e) {}
      throw new Error('view write HTTP ' + r.status + ' ' + body);
    }
    const v = await r.json();
    return typeof v === 'number' ? Math.max(0, v) : 0;
  }

  function putBadge(card,count){
    let badge = card.querySelector('.article-card-views-v357');
    if(!badge){
      badge = document.createElement('span');
      badge.className = 'article-card-views-v357';
      card.appendChild(badge);
    }
    badge.innerHTML = '<span aria-hidden="true">👀</span><b>' + count + '</b>';
  }

  async function init(){
    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    // Opening an article adds one shared view per browser session.
    const articleKey = articles[page];
    if(articleKey){
      const sessionKey = 'belaya-mgla-view-session:' + articleKey;
      try{
        if(!sessionStorage.getItem(sessionKey)){
          await incrementCount(articleKey);
          sessionStorage.setItem(sessionKey,'1');
        }
      }catch(err){
        console.warn('Shared article view increment failed:', err);
      }
      return;
    }

    // Category pages show the shared total on the publication card.
    const cfg = categoryCards[page];
    if(!cfg) return;

    const card = [...document.querySelectorAll('a[href*="' + cfg.href + '"]')]
      .find(a => a.offsetParent !== null) ||
      document.querySelector('a[href*="' + cfg.href + '"]');

    if(!card) return;

    try{
      putBadge(card, await readCount(cfg.key));
    }catch(err){
      console.warn('Shared article view read failed:', err);
      putBadge(card, 0);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  }else{
    init();
  }

  // Refresh count when returning to a category page with browser Back.
  window.addEventListener('pageshow', () => {
    const page = (location.pathname.split('/').pop() || '').toLowerCase();
    const cfg = categoryCards[page];
    if(!cfg) return;
    const card = document.querySelector('a[href*="' + cfg.href + '"]');
    if(!card) return;
    readCount(cfg.key).then(v => putBadge(card,v)).catch(()=>{});
  });
})();

/* v367 — Creative Corner independent card likes + views */
(() => {
  const BASE='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/';
  const page=(location.pathname.split('/').pop()||'').toLowerCase();

  const get = async key => {
    try { const r=await fetch(BASE+encodeURIComponent(key)+'.json',{cache:'no-store'}); const v=await r.json(); return typeof v==='number'?v:0; }
    catch(e){ return 0; }
  };
  const put = async (key,val) => {
    try { await fetch(BASE+encodeURIComponent(key)+'.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(val)}); }
    catch(e){}
  };

  async function refreshCards(){
    document.querySelectorAll('[data-creative-like]').forEach(async el=>{
      const key=el.dataset.creativeLike;
      el.querySelector('b').textContent=await get(key);
      const local='creative-liked:'+key;
      if(localStorage.getItem(local)==='1') el.classList.add('is-liked');
      el.onclick=async ev=>{
        ev.preventDefault(); ev.stopPropagation();
        if(localStorage.getItem(local)==='1') return;
        const now=await get(key); await put(key,now+1);
        localStorage.setItem(local,'1'); el.classList.add('is-liked');
        el.querySelector('b').textContent=now+1;
      };
    });
    document.querySelectorAll('[data-creative-view]').forEach(async el=>{
      el.querySelector('b').textContent=await get('__views__'+el.dataset.creativeView);
    });
  }

  // Count one view per browser session for each individual work.
  const articleKeys={
    'creative-roman48.html':'creative-roman48',
    'creative-amoress-painting.html':'creative-amoress-painting-v2',
    'creative-boss-little-furnace.html':'boss-little-furnace',
    'creative-boss-joe.html':'boss-joe'
  };
  const vk=articleKeys[page];
  if(vk){
    const sk='creative-viewed-session:'+vk;
    if(!sessionStorage.getItem(sk)){
      (async()=>{ const k='__views__'+vk; const now=await get(k); await put(k,now+1); sessionStorage.setItem(sk,'1'); })();
    }
  }
  if(page==='creative-corner.html'){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',refreshCards,{once:true}); else refreshCards();
    window.addEventListener('pageshow',refreshCards);
  }
})();


/* v392 — Elena 40–41: shared views on article and WhiteFox publication card */
(() => {
  const BASE = 'https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/';
  const VIEW_KEY = 'whitefox-elena-40-41';
  const ARTICLE = 'whitefox-elena-40-41.html';
  const CATEGORY = 'news-elena.html';
  const url = BASE + encodeURIComponent('__views__' + VIEW_KEY) + '.json';

  async function readCount(){
    const r = await fetch(url,{method:'GET',cache:'no-store',headers:{'Accept':'application/json'}});
    if(!r.ok) throw new Error('view read HTTP '+r.status);
    const v = await r.json();
    return typeof v === 'number' ? Math.max(0,v) : 0;
  }
  async function increment(){
    const r = await fetch(url,{method:'PUT',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({'.sv':{increment:1}})});
    if(!r.ok) throw new Error('view write HTTP '+r.status);
    const v = await r.json();
    return typeof v === 'number' ? Math.max(0,v) : 0;
  }
  function setArticleCount(v){
    document.querySelectorAll('[data-elena-view="'+VIEW_KEY+'"] .article-views-count').forEach(el=>el.textContent=String(v));
  }
  function setCardCount(v){
    const card=document.querySelector('a.whitefox-elena-card[href="'+ARTICLE+'"]');
    if(!card) return;
    let badge=card.querySelector('.article-card-views-v357');
    if(!badge){
      badge=document.createElement('span');
      badge.className='article-card-views-v357';
      card.appendChild(badge);
    }
    badge.innerHTML='<span aria-hidden="true">👀</span><b>'+v+'</b>';
  }
  async function refresh(){
    try{
      const v=await readCount();
      setArticleCount(v); setCardCount(v);
    }catch(e){ console.warn('Elena 40–41 view read failed:',e); }
  }
  async function init(){
    const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(page===ARTICLE){
      const sk='belaya-mgla-view-session:'+VIEW_KEY;
      try{
        let v;
        if(!sessionStorage.getItem(sk)){
          v=await increment();
          sessionStorage.setItem(sk,'1');
        }else{ v=await readCount(); }
        setArticleCount(v);
      }catch(e){ console.warn('Elena 40–41 view increment failed:',e); }
    }else if(page===CATEGORY){
      await refresh();
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  window.addEventListener('pageshow',()=>{
    const page=(location.pathname.split('/').pop()||'').toLowerCase();
    if(page===CATEGORY) refresh();
  });
})();


/* v409 — cleaner multipage navigation, contents, and copyable short notes */
(() => {
  function initV409(){
    document.addEventListener('keydown',e=>{
      const el=e.target.closest?.('[role=\"button\"][tabindex=\"0\"]');
      if(!el || (e.key!=='Enter' && e.key!==' ')) return;
      e.preventDefault(); el.click();
    });
    // Keep long contents compact on phones, expanded on desktop.
    document.querySelectorAll('.page-toc-v409').forEach(toc=>{
      if(window.matchMedia('(max-width:760px)').matches) toc.removeAttribute('open');
      toc.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener('click',e=>{
          const id=a.getAttribute('href').slice(1), target=document.getElementById(id);
          if(!target) return;
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          if(window.matchMedia('(max-width:760px)').matches) toc.removeAttribute('open');
          try{history.replaceState(null,'','#'+id)}catch(_e){}
        });
      });
    });

    // Copy only short memo/callout blocks explicitly marked by the page.
    document.querySelectorAll('.copy-block-v409').forEach(btn=>{
      btn.addEventListener('click',async e=>{
        e.preventDefault(); e.stopPropagation();
        const box=btn.parentElement;
        if(!box) return;
        const clone=box.cloneNode(true);
        clone.querySelectorAll('.copy-block-v409').forEach(x=>x.remove());
        const text=clone.innerText.trim();
        try{ await navigator.clipboard.writeText(text); }
        catch(err){
          const ta=document.createElement('textarea');
          ta.value=text; ta.setAttribute('readonly',''); ta.style.position='fixed'; ta.style.opacity='0';
          document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
        }
        const old=btn.textContent;
        btn.textContent='Скопировано ✓'; btn.classList.add('copied');
        setTimeout(()=>{btn.textContent=old;btn.classList.remove('copied')},1400);
      });
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initV409,{once:true}); else initV409();
})();


/* v414 — compact long-guide cards */
(() => {
  function initV414(){
    const isMobile=()=>window.matchMedia('(max-width:760px)').matches;

    function foldsIn(page){
      return Array.from(page.querySelectorAll(':scope > details.guide-fold-v414'));
    }

    function openForHash(){
      if(!location.hash || location.hash.length<2) return false;
      const target=document.getElementById(location.hash.slice(1));
      const fold=target?.closest?.('details.guide-fold-v414');
      if(fold){ fold.open=true; return true; }
      return false;
    }

    document.querySelectorAll('.guide-page-v69').forEach(page=>{
      const folds=foldsIn(page);
      if(!folds.length) return;

      // Calm default state: one open on phone, two on desktop.
      const initialOpen=isMobile()?1:2;
      folds.forEach((fold,i)=>{ fold.open=i<initialOpen; });
      openForHash();

      const allBtn=page.querySelector('.guide-fold-all-v414');
      if(allBtn){
        const sync=()=>{
          const allOpen=folds.every(f=>f.open);
          allBtn.textContent=allOpen?'Свернуть все':'Раскрыть все';
          allBtn.setAttribute('aria-pressed',allOpen?'true':'false');
        };
        allBtn.addEventListener('click',()=>{
          const shouldOpen=!folds.every(f=>f.open);
          folds.forEach(f=>{f.open=shouldOpen;});
          sync();
        });
        folds.forEach(f=>f.addEventListener('toggle',sync));
        sync();
      }
    });

    // Open a collapsed card before the existing smooth-scroll TOC handler runs.
    document.addEventListener('click',e=>{
      const a=e.target.closest?.('.page-toc-v409 a[href^="#"]');
      if(!a) return;
      const id=a.getAttribute('href')?.slice(1);
      const target=id&&document.getElementById(id);
      const fold=target?.closest?.('details.guide-fold-v414');
      if(fold) fold.open=true;
    },true);

    window.addEventListener('hashchange',openForHash);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initV414,{once:true});
  else initV414();
})();


/* v424 mobile bottom navigation active state */
(() => {
  const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const map={
    'index.html':'home',
    'events.html':'events',
    'heroes.html':'heroes',
    'fire-furnace-calculator.html':'calc',
    'furnace-calculator.html':'calc',
    'other.html':'knowledge'
  };
  const active=map[file];
  if(active){
    document.querySelectorAll('.mobile-bottom-v424 a').forEach(a=>{
      const on=a.dataset.v424Nav===active;
      a.classList.toggle('active',on);
      if(on) a.setAttribute('aria-current','page');
    });
  }
})();


/* ===== v426: ordinary site-wide search ===== */
(() => {
  const SEARCH_INDEX = [{"title":"Чемпионат альянса","url":"alliance-championship.html","description":"Чемпионат альянса — автоматическое командное соревнование, в котором альянсы выставляют заранее зарегистрированные боевые отряды. В каждом раунде есть 3 линии, а для победы достато","text":"Чемпионат альянса Чемпионат альянса — автоматическое командное соревнование, в котором альянсы выставляют заранее зарегистрированные боевые отряды. В каждом раунде есть 3 линии, а для победы достаточно выиграть 2 из 3. Поэтому здесь важна Чемпионат альянса УСЛОВИЯ УЧАСТИЯ КАК ПРОХОДИТ ЧЕМПИОНАТ ЧТО ДЕЛАТЬ УЧАСТНИКУ СИЛА ОТРЯДА ПРОВЕРЬТЕ ОТРЯД ДО РЕГИСТРАЦИИ СОСТАВ ВОЙСК КАК РАБОТАЮТ 3 ЛИНИИ В КАЖДОЙ ЛИНИИ ВАЖНЫ ТОП-20 ОДИН СИЛЬНЫЙ ИГРОК НЕ ВЫИГРАЕТ ЛИНИЮ ОДИН ПОРЯДОК БОЁВ ТАКТИКА ДЛЯ R4/R5 ИЗУЧАЙТЕ СОПЕРНИКА МЕНЯЙТЕ ЛИНИИ KO-НАГРАДЫ СЛЕДИТЕ ЗА ТАЙМЕРОМ ЧТО ДЕЛАТЬ R4/R5 ЧАСТЫЕ ОШИБКИ Белая Мгла • Чемпионат альянса Главная › События › Чемпионат альянса Чемпионат альянса Чемпионат альянса — автоматическое командное соревнование, в котором альянсы выставляют заранее зарегистрированные боевые отряды. В каждом раунде е… Отдельный гайд события Чемпионат альянса Автор - Sova Чемпионат альянса — автоматическое командное соревнование, в котором альянсы выставляют заранее зарегистрированные боевые отряды. В каждом раунде есть 3 линии, а для победы достаточно выиграть 2 из 3. Поэтому здесь важна не только сила участников, но и то, как эта сила распределена между линиями. УСЛОВИЯ УЧАСТИЯ Для участия игроку необходима: Топка 10 уровня или выше. Также необходимо иметь подходящий ранг внутри альянса. Чтобы сам альянс смог участвовать в Чемпионате, должно зарегистрироваться минимум: 10 участников. Если регистраций меньше, альянс не допускается к соревнованию. КАК ПРОХОДИТ ЧЕМПИОНАТ В одной группе соревнуются 6 альянсов . Они проводят 5 раундов . В каждом раунде ваш альянс встречается с одним противником. Бои проходят автоматически — после начала сражения обычному участнику ничего нажимать не нужно. Основная работа игрока происходит до боя , во время регистрации. Основная работа R4/R5 — во время подготовки и распределения линий. ЧТО ДЕЛАТЬ УЧАСТНИКУ Во время регистрации необходимо сохранить один боевой отряд . Используйте: сильнейших боевых героев; войска максимально доступного вам уровня; полный отряд; состав, предназначенный именно для PvP-боя. Не регистрируйте случайный поход только потому, что он уже выбран в окне отправки. СИЛА ОТРЯДА В Чемпионате используется собственный показатель силы зарегистрированного отряда. Он зависит в том числе от: силы героев; уровня войск; состава зарегистрированного отряда. Поэтому обычная общая мощь вашего аккаунта не показывает точно, насколько сильным будет ваш отряд в Чемпионате. Ориентируйтесь прежде всего на показатель, который показывает сам интерфейс Чемпионата альянса . ПРОВЕРЬТЕ ОТРЯД ДО РЕГИСТРАЦИИ Перед сохранением: герои → войска → количество → состав → показатель силы → регистрация. Не спешите нажимать регистрацию. Если уже сохранён хороший сильный отряд, не перезаписывайте его случайно более слабым составом. СОСТАВ ВОЙСК Один из распространённых вариантов: 50% пехоты / 20% копейщиков / 30% стрелков Но это не обязательная формула . Лучший состав может меняться в зависимости от: ваших героев; характеристик "},{"title":"Мобилизация альянса","url":"alliance-mobilization.html","description":"«Мобилизация альянса» — многодневное событие, в котором участники выбирают задания, выполняют их и получают очки.","text":"Мобилизация альянса «Мобилизация альянса» — многодневное событие, в котором участники выбирают задания, выполняют их и получают очки. Мобилизация альянса КРАТКО И ПО ДЕЛУ Белая Мгла • Мобилизация альянса Главная › События › Мобилизация альянса Мобилизация альянса «Мобилизация альянса» — многодневное событие, в котором участники выбирают задания, выполняют их и получают очки. Гайд события Мобилизация альянса Автор - Sova «Мобилизация альянса» — многодневное событие, в котором участники выбирают задания, выполняют их и получают очки. Ваши очки одновременно идут: в личный прогресс; в общий результат альянса. Главная задача: Выбирать выгодные задания, а не брать всё подряд. Количество принятий заданий ограничено, поэтому каждая попытка имеет значение. КРАТКО И ПО ДЕЛУ Участие Топка 10+ и в альянсе минимум 15 участников . Попытки Доступно 9 базовых принятий . Дальше — за алмазы. Главное правило Берём только то задание, которое реально выполним и которое выгодно. Лучшая стратегия Совмещать Мобилизацию с другими событиями и плановой прокачкой. Смысл события Ваши очки идут сразу в личный прогресс и в общий результат альянса . Главное — не брать всё подряд, а выбирать задания с хорошей отдачей. Основа события Какие задания брать Чего избегать Стратегия Альянс и лиги Ошибки и итог 📌 Основа события Условия участия Топка 10 уровня или выше . В альянсе минимум 15 участников . Если условия не выполнены, принять участие нельзя. Когда проходит Это многодневное событие . Для 58 государства точные даты всегда смотрим: в календаре событий; на таймере самого события. На старые календари из интернета не опираемся. Как работает Выбираем задание. Проверяем условие и таймер. Принимаем. Выполняем. Получаем очки. Берём следующее. Важно Не нажимайте «Принять», пока не уверены, что задание выполнимо. Не берём миссию «на пробу». Сначала проверяем таймер, материалы, энергию и свои возможности. Попытки заданий 9 БАЗОВЫХ ПРИНЯТИЙ ЗАДАНИЙ После них дополнительные попытки можно покупать за алмазы . Точную стоимость на сайте не фиксируем — она может меняться. Общие и эксклюзивные задания Задания отличаются: условиями; временем выполнения; количеством очков; стоимостью по ресурсам. Эксклюзивные задания обычно выгоднее, но брать их всё равно нужно с головой. ✅ Какие задания обычно выгоднее брать Охота и Полярный террор Часто это одни из самых удобных заданий, если вы всё равно собирались тратить энергию. Энергия губернатора расходуется не зря — вы одновременно делаете событие и получаете обычные награды. Сбор ресурсов Хороший вариант, если войска свободны и есть"},{"title":"Сражение альянсов","url":"alliance-showdown.html","description":"«Сражение альянсов» - многодневное соревнование двух альянсов. Игроки набирают очки за развитие аккаунта, а в конце каждого этапа общий результат вашего альянса сравнивается с резу","text":"Сражение альянсов «Сражение альянсов» - многодневное соревнование двух альянсов. Игроки набирают очки за развитие аккаунта, а в конце каждого этапа общий результат вашего альянса сравнивается с результатом соперника. Сражение альянсов Как определяется победитель Не создавайте лишний отрыв Кто участвует Личные и альянсовые очки Сколько длится Этап 1 - Развитие города Этап 2 - Развитие героев Этап 3 - Питомцы Этап 4 - Усиление снаряжения Этап 5 - Торговое превосходство Этап 6 - Полномасштабное соревнование Связь с «Торговым путём в тундре» Что копить заранее Личные награды Что делать R4/R5 Что делать игроку Совмещайте события Белая Мгла • Сражение альянсов Главная › События › Сражение альянсов Сражение альянсов «Сражение альянсов» - многодневное соревнование двух альянсов. Игроки набирают очки за развитие аккаунта, а в конце каждого этапа общий результат в… Отдельный гайд события Сражение альянсов Автор - Sova «Сражение альянсов» - многодневное соревнование двух альянсов. Игроки набирают очки за развитие аккаунта, а в конце каждого этапа общий результат вашего альянса сравнивается с результатом соперника. Победитель этапа получает очки победы . Главная задача: не набрать максимум любой ценой, а выиграть нужные этапы с минимально необходимыми затратами. 6 этапов Шесть отдельных этапов соревнования. 13 очков победы Столько можно получить за всё событие. 7+ для победы Минимум семь очков дают общую победу. 36 ч финал Последний этап длится дольше остальных. Как определяется победитель В событии проходит 6 этапов . Всего за них можно получить 13 очков победы . Для общей победы нужно набрать 7 или больше . Этап 1 1 очко победы Этапы 2-5 2 очка победы каждый Финальный этап 4 очка победы Итого: 1 + 2 + 2 + 2 + 2 + 4 = 13. Не обязательно выигрывать всё Все этапы имеют разную ценность. Иногда выгоднее спокойно отдать первый этап и сохранить редкие ресурсы для этапов стоимостью 2 или 4 очка. Не создавайте лишний отрыв Если противник набрал 10 млн очков, а ваш альянс уже набрал 18 млн и победа практически гарантирована, ещё десятки миллионов очков не принесут дополнительных очков победы. Этап всё равно даст только 1, 2 или 4 очка в зависимости от его стоимости. Перед крупной тратой смотрите: сколько очков у соперника → сколько времени осталось → насколько безопасен ваш отрыв. Кто участвует В событии участвуют сильнейшие альянсы государства. Обычно к нему допускаются ТОП-20 альянсов по мощности . Альянс получает соперника и соревнуется с ним на протяжении всех этапов. Не меняйте альянс без необходимости Участие привязывается к составу альянса во время подбора соперника. Если игрок вступил в другой альянс уже после начала события, он может не иметь возможности приносить этому альянсу полноценные очки события. Во время «Сражения альянсов» лучше избегать ненужной смены альянса. Личные и альянсовые очки Личные очки Получаете вы за свои действия. Они нужны для личных наград, личного рейтинга и показывают ваш вклад в событие. Очки альянса Это сумма зачётных действий участников. Именно по ним сравнив"},{"title":"Альянс","url":"alliance.html","description":"Ежедневная помощь, технологии, рейды, территория, стяги и общие ресурсы.","text":"Альянс Ежедневная помощь, технологии, рейды, территория, стяги и общие ресурсы. Альянс Что делать каждый день Помощь альянса Технологии альянса Магазин и награды Сборные атаки Охота на медведя Территория альянса Штаб альянса Стяги альянса Ресурсные точки альянса Правило 75% Зачем нужны ресурсы альянса Комплексы Общение и правила Белая Мгла • Альянс Главная › База знаний › Альянс Альянс Ежедневная помощь, технологии, рейды, территория, стяги и общие ресурсы. Помощь Технологии Стяги Ресурсы Содержание Альянс Что делать каждый день Помощь альянса Технологии альянса Магазин и награды Сборные атаки Охота на медведя Территория альянса Штаб альянса Стяги альянса Ресурсные точки альянса Правило 75% Зачем нужны ресурсы альянса Комплексы Общение и правила Короткий режим: открывай только нужные разделы. Раскрыть все Альянс Подробнее Альянс в «Белой Мгле: Выживание» даёт не только доступ к совместным событиям. Через него игрок получает помощь, технологии, награды, сборные атаки, подкрепления и территориальные бонусы . Система альянсов становится доступна на раннем этапе развития города. Что делать каждый день Подробнее Нажимать помощь альянсу . Делать пожертвования в технологии альянса . Забирать доступные подарки и награды. Проверять магазин альянса. Участвовать в совместных событиях. Читать метки и сообщения R4/R5. Пожертвования в технологии не только развивают общие бонусы, но и помогают повышать уровень самого альянса. Помощь альянса Подробнее Участники могут сокращать друг другу время: Строительство Исследования Лечение Количество доступной помощи связано с уровнем Посольства . Скопировать Совет: нажимай помощь регулярно, особенно когда в альянсе много игроков онлайн. Технологии альянса Подробнее Технологии дают общие бонусы всем участникам. Каждый игрок может вносить пожертвования, постепенно заполняя выбранное исследование. Скопировать Главное: делай пожертвования ежедневно и следуй выбранному R4/R5 приоритету. Не стоит самостоятельно переключать направление развития только потому, что другая технология полезнее лично тебе. Магазин и награды Подробнее За активность в альянсе игрок получает специальную валюту, которую можно использовать в магазине альянса . Её не обязательно тратить сразу. Если нужного предмета сейчас нет, лучше сохранить валюту до более полезного обновления магазина. Подарки и награды альянса также зависят от общей активности участников, поэтому активный альянс обычно даёт заметно больше ежедневных ресурсов и предметов. Сборные атаки Подробнее Сборная атака позволяет нескольким участникам объединить войска против одной цели. Создатель сборной атаки использует навыки своих героев, а у присоединившихся игроков особенно важен первый герой слева и его подходящий навык Экспед"},{"title":"Арена","url":"arena.html","description":"Как выбирать соперников, собирать пятёрку и подниматься выше в рейтинге.","text":"Арена Как выбирать соперников, собирать пятёрку и подниматься выше в рейтинге. Арена Как работает рейтинг Защита работает отдельно Перед атакой смотрим соперника Кого выбирать Обновляйте список соперников Попытки Не покупайте попытки автоматически Когда лучше атаковать Какие навыки работают Экспедиционные навыки не главные Контры типов войск здесь не работают Расстановка героев Меняйте расстановку под соперника Смотрите повтор боя Самая мощная пятёрка не всегда лучшая Снаряжение Не забудьте вернуть снаряжение Белая Мгла • Арена Главная › База знаний › Арена Арена Как выбирать соперников, собирать пятёрку и подниматься выше в рейтинге. 5 героев Соперник Расстановка Защита Содержание Арена Как работает рейтинг Защита работает отдельно Перед атакой смотрим соперника Кого выбирать Обновляйте список соперников Попытки Не покупайте попытки автоматически Когда лучше атаковать Какие навыки работают Экспедиционные навыки не главные Контры типов войск здесь не работают Расстановка героев Меняйте расстановку под соперника Смотрите повтор боя Самая мощная пятёрка не всегда лучшая Снаряжение Не забудьте вернуть снаряжение Защитный состав Ежедневные награды Сезонные награды Арена славы Перенос государства Магазин Арены Хольгер Для F2P Ежедневная схема Частые ошибки Главное Короткий режим: открывай только нужные разделы. Раскрыть все Арена Подробнее Арена - ежедневный PvP-режим, где ваша пятёрка героев сражается с заранее установленной защитной пятёркой другого губернатора. Бой проходит автоматически. Главное здесь: правильные герои, навыки Освоения, снаряжение, Виджеты, расстановка, выбор соперника и момент использования попыток. Скопировать Главное: общая мощность полезна для оценки, но сама по себе не гарантирует победу. Как работает рейтинг Подробнее Рейтинг Арены зависит от Очков освоения . Если вы выигрываете собственное испытание, получаете очки. Если вы сами атаковали и проиграли, очки не теряются. Вы просто не получаете новые. Поэтому неудачная атака неприятна потерянной попыткой, но не прямым снижением ваших очков. Защита работает отдельно Подробнее Когда другой игрок выбирает вас целью, он сражается против вашего защитного построения . Можно иметь хорошую атакующую пятёрку, но терять позиции из-за плохо настроенной защиты. После серьёзной смены героев обязательно проверьте: состав защиты; расположение героев; снаряжение; Виджеты. Перед атакой смотрим соперника Подробнее Не выбирайте цель только по цифре мощности. Перед боем посмотрите: каких героев использует соперник; где они стоят; насколько они развиты; сколько у соперника очков Арены. После этого можно изменить собственное атакующее построение. Кого выбирать Подробнее Скопировать Хорошая цель: соперник, которого вы реально можете победить и который находится выше вас по очкам. Не ищите просто самого слабого игрока. Ищите самого выгодного из тех, кого реально победить. Обновляйте список соперников Подробнее Если в"},{"title":"Гонка вооружений","url":"armament-competition.html","description":"Гонка вооружений — личное событие развития, в котором нужно использовать определённые материалы и улучшения, получать очки, закрывать личные награды и подниматься в рейтинге госуда","text":"Гонка вооружений Гонка вооружений — личное событие развития, в котором нужно использовать определённые материалы и улучшения, получать очки, закрывать личные награды и подниматься в рейтинге государства. Гонка вооружений НЕ ВСЕ ГОНКИ ОДИНАКОВЫЕ КОГДА ПРОХОДИТ КАК УСТРОЕНЫ НАГРАДЫ Личные пороги РЕЙТИНГ ВАРИАНТ С ПЛАНАМИ ДИЗАЙНА Эксперты ОГНЕННЫЕ КРИСТАЛЛЫ ФРАГМЕНТЫ ГЕРОЕВ СНАРЯЖЕНИЕ ГУБЕРНАТОРА УСКОРЕНИЯ ВАРИАНТ С ОГНЕННЫМИ КРИСТАЛЛАМИ ОСТОРОЖНО С МИФРИЛОМ КАМНИ ЭССЕНЦИИ И ВИДЖЕТЫ НЕ ТРАТЬТЕ ОГНЕННЫЕ КРИСТАЛЛЫ СРАЗУ ЭКСПЕРТОВ ТОЖЕ КОПИМ КАК ИГРАТЬ БЕЗ ЛИШНИХ ТРАТ Белая Мгла • Гонка вооружений Главная › События › Гонка вооружений Гонка вооружений Гонка вооружений — личное событие развития, в котором нужно использовать определённые материалы и улучшения, получать очки, закрывать личные наград… Отдельный гайд события Гонка вооружений Автор - Sova Гонка вооружений — личное событие развития, в котором нужно использовать определённые материалы и улучшения, получать очки, закрывать личные награды и подниматься в рейтинге государства. Событие появляется после открытия в государстве системы Огненных кристаллов и заменяет старое событие развития города. Главное правило: не прокачивать всё подряд, а сначала посмотреть, за какие действия именно в текущем запуске дают очки. НЕ ВСЕ ГОНКИ ОДИНАКОВЫЕ У события есть разные варианты. Они отличаются: заданиями; материалами, за которые начисляются очки; финальными наградами; выгодностью разных видов прокачки. В актуальной ротации встречаются варианты, связанные с: Планами дизайна и Огненными кристаллами Поэтому нельзя один раз запомнить список заданий и пользоваться им постоянно. Для 58 государства всегда открываем текущую вкладку события и проверяем список действий. КОГДА ПРОХОДИТ «Гонка вооружений» связана с событием «Проект офицера» . Они чередуются в общей ротации. Типичный цикл выглядит примерно так: Гонка вооружений ↓ Проект офицера ↓ другой вариант Гонки вооружений ↓ другой вариант Проекта офицера Точные дни могут меняться. Поэтому ориентируемся на Календарь событий , а не на старую таблицу из интернета. КАК УСТРОЕНЫ НАГРАДЫ Есть два основных направления. Личные пороги Набираете определённое количество очков и получаете последовательные награды. Это самая предсказуемая часть события. Сначала желательно оценить: сколько ресурсов нужно потратить до следующего сундука и насколько ценна его награда. РЕЙТИНГ Дополнительно игроки соревнуются между собой по количеству набранных очков. После окончания события выдаются рейтинговые награды. Но для высокого места обычно приходится расходовать значительно больше редких материалов. Поэтому не стоит автоматически бороться за рейтинг в каждом запуске. ВАРИАНТ С ПЛАНАМИ ДИЗАЙНА В одном из актуальных вариантов очки могут давать следующие действия. Эксперты Использование Печатей Экспертов. Использование Книг знаний. Ускорения изучения навыков Экспертов. ОГНЕННЫЕ КРИСТАЛЛЫ Очки могут начисляться за: использование обычных Огненных кристаллов для зда"},{"title":"Маяк","url":"beacon.html","description":"Ежедневные разведданные, Прожектор, Агнес и связь с событиями.","text":"Маяк Ежедневные разведданные, Прожектор, Агнес и связь с событиями. Маяк Прожектор Когда появляются новые задания Задания не копятся бесконечно Какие бывают задания Охота на зверей Спасение выживших Задания героев Что даёт Маяк Осколки Огненных кристаллов Качество заданий Агнес Когда использовать Агнес Маяк и другие события «Пламя и клыки» Не сохраняйте задания слепо «Забрать всё» «Забрать всё» не означает «не смотреть Маяк» Белая Мгла • Маяк Главная › База знаний › Маяк Маяк Ежедневные разведданные, Прожектор, Агнес и связь с событиями. Прожектор Агнес Пламя и клыки Содержание Маяк Прожектор Когда появляются новые задания Задания не копятся бесконечно Какие бывают задания Охота на зверей Спасение выживших Задания героев Что даёт Маяк Осколки Огненных кристаллов Качество заданий Агнес Когда использовать Агнес Маяк и другие события Пламя и клыки» Не сохраняйте задания слепо Забрать всё» Забрать всё» не означает «не смотреть Маяк» Энергия губернатора Простой режим на день Не откладывайте Маяк «на потом» Частые ошибки Главное Короткий режим: открывай только нужные разделы. Раскрыть все Маяк Подробнее Маяк - постоянная система разведывательных заданий, которая каждый день приносит ресурсы и материалы развития. Он открывается при Топке 7 уровня . Скопировать Главное правило: не давайте разведданным долго стоять заполненными. Новые задания появляются регулярно, а бесконечно накапливаться они не могут. Прожектор Подробнее Основное развитие Маяка связано не с обычным строительством, а с Прожектором . Он повышается за выполнение разведывательных заданий. Максимальный уровень - 20 . Чем выше уровень Прожектора, тем больше доступных разведданных и тем выше их качество. Поэтому ранние задания Маяка не стоит игнорировать. Они одновременно дают награды и развивают сам Прожектор. Когда появляются новые задания Подробнее Разведданные обновляются примерно каждые 8 часов . Обычный ориентир: 00:00 UTC 08:00 UTC 16:00 UTC Для 58 государства приоритет всегда у таймера непосредственно в игре. Задания не копятся бесконечно Подробнее Если долго не открывать Маяк, старые разведданные занимают доступное место. Если Маяк заполнен, новые обычные разведданные могут не появиться при следующем обновлении. Скопировать Хорошая привычка: проверять Маяк несколько раз в день. Не обязательно заходить ровно каждые восемь часов, главное - не оставлять его заполненным надолго. Какие бывают задания Подробнее В Маяке встречаются разные типы разведданных: охота на зверей; спасение выживших; задания с героями; задания награды. Разные задания требуют разных действий и дают разные награды. Охота на зверей Подробнее Некоторые разведданные требуют победить зверя на карте. Для этого используется энергия губернатора . Скопировать Совет: перед случайной охотой сначала проверьте Маяк. Если там уже есть подходящее задание, одна и "},{"title":"Охота на медведя","url":"bear.html","description":"Шпаргалка для тех, кто присоединяется к чужому рейду. Самое важное здесь: правильно выбрать первого героя.","text":"Охота на медведя Шпаргалка для тех, кто присоединяется к чужому рейду. Самое важное здесь: правильно выбрать первого героя. Охота на медведя СОЗДАТЕЛЬ РЕЙДА ПРИМЕРНЫЕ ВАРИАНТЫ ДЛЯ СОЗДАНИЯ РЕЙДА СОСТАВ ВОЙСК КАК ПРАВИЛЬНО ПРИСОЕДИНЯТЬСЯ К РЕЙДУ Подходящие первые герои КАК РАБОТАЮТ НАВЫКИ УЧАСТНИКОВ СКЛАДЫВАНИЕ БОНУСОВ ВТОРОЙ И ТРЕТИЙ ГЕРОЙ ПЕРЕД ОТПРАВКОЙ ОТРЯДА УСИЛЕНИЕ ЛОВУШКИ ПИТОМЦЫ РАСПОЛОЖЕНИЕ ГОРОДА СОХРАНЁННЫЕ ОТРЯДЫ Белая Мгла • Охота на медведя Главная › События › Охота на медведя Охота на медведя Шпаргалка для тех, кто присоединяется к чужому рейду. Самое важное здесь: правильно выбрать первого героя. Охота на медведя Шпаргалка для тех, кто присоединяется к чужому рейду. Самое важное здесь: правильно выбрать первого героя. СОЗДАТЕЛЬ РЕЙДА У создателя рейда работают экспедиционные навыки всех трёх героев . Это может быть до 9 экспедиционных навыков , если у каждого героя открыты все три. Поэтому для собственного рейда важно выбирать героев не только по общей силе. Особенно полезны навыки, которые повышают: атаку; урон; смертоносность; другие атакующие характеристики армии. Защитные навыки и лечение против медведя обычно дают намного меньше пользы. Совет Сравнивайте отчёты нескольких рейдов. Более сильная по цифре тройка героев не всегда наносит больше урона. ПРИМЕРНЫЕ ВАРИАНТЫ ДЛЯ СОЗДАНИЯ РЕЙДА Ниже — примерные варианты троек героев для создания собственного рейда . У создателя рейда важны все три героя , потому что работают их экспедиционные навыки. Это именно примеры : окончательно ориентируемся по реальным отчётам охоты в 58 государстве . Вариант 1 Пример тройки героев для создания рейда. Вариант 2 Пример тройки героев для создания рейда. Вариант 3 Пример тройки героев для создания рейда. Вариант 4 Пример тройки героев для создания рейда. СОСТАВ ВОЙСК Против медведя основную часть урона обычно наносят стрелки , поэтому их долю можно увеличивать. Хорошие варианты для тестирования: 10 / 10 / 80 10% пехоты / 10% копейщиков / 80% стрелков 10 / 30 / 60 10% пехоты / 30% копейщиков / 60% стрелков Это не обязательная формула. Лучший состав зависит от вашей текущей прокачки, героев и войск, поэтому ориентируйтесь на реальные отчёты охоты в 58 государстве . Чем больше войск помещается в рейд, тем выше потенциальный общий урон. КАК ПРАВИЛЬНО ПРИСОЕДИНЯТЬСЯ К РЕЙДУ Для участника самое важное — герой, поставленный первым . Из вашей тройки героев в бонусы общего рейда попадает первый экспедиционный навык первого героя . Поэтому перед отправкой отряда всегда проверяйте, кто стоит на первой позиции. Подходящие первые герои Для нашего государства используем уже подтверждённых героев: Джесси Джассер Джеронимо Со-Юн Их полезные атакующие навыки помогают увеличить общий урон рейда. Героев поздних поколений сюда не добавляем, пока они не подтверждены для 58 государства . Важно для прис"},{"title":"Братья по оружию","url":"brothers-in-arms.html","description":"«Братья по оружию» - боевое событие, где очки дают за сражения с войсками других губернаторов. Во время события очки начисляются за уничтожение и тяжёлое ранение войск других губер","text":"Братья по оружию «Братья по оружию» - боевое событие, где очки дают за сражения с войсками других губернаторов. Во время события очки начисляются за уничтожение и тяжёлое ранение войск других губернаторов. Чем выше уровень войск противника, тем больш Братья по оружию Сколько длится За что дают очки Опубликованная шкала очков Высокий T не всегда лучшая цель Где можно набирать очки Договорённости государства важнее желания набить очки Ресурсные плитки Кого искать на плитке Договорные бои Атака города Главная опасность города Город могут усилить Битва за замок Следим за Медпунктом Лечим небольшими партиями Форты и Крепости Если не хотите участвовать Белая Мгла • Братья по оружию Главная › События › Братья по оружию Братья по оружию «Братья по оружию» - боевое событие, где очки дают за сражения с войсками других губернаторов. Во время события очки начисляются за уничтожение и т… Отдельный гайд события Братья по оружию Автор - Sova «Братья по оружию» - боевое событие, где очки дают за сражения с войсками других губернаторов. Во время события очки начисляются за уничтожение и тяжёлое ранение войск других губернаторов. Чем выше уровень войск противника, тем больше очков можно получить. Главное правило: Не все бои одинаково безопасны. Битва на ресурсной плитке и неудачная атака города могут дать очки, но последствия для ваших войск совершенно разные. 48 ч. обычная длительность Точное время всегда смотрим в календаре 58 государства. Очки Бои с игроками Очки начисляются за уничтоженные и тяжело раненые войска противника. 1–11 ступени войск Для 12-й, 13-й ступени и специальных войск смотрим текущее окно события. Правила договорённости государства То, что игра позволяет атаковать, ещё не значит, что это разрешено в 58 государстве. Сколько длится Обычная продолжительность события - 48 часов . Чаще всего оно проходит в неделю обычной Битвы за замок. Типичный период - с пятницы 00:00 UTC до воскресенья 00:00 UTC, но точное время всегда смотрим в текущем календаре 58 государства . За что дают очки Основной источник очков: уничтоженные войска противника; тяжело раненые войска противника. Чем выше их уровень, тем больше очков. Опубликованная шкала очков Уровень войск Очков за бойца 1-я ступень 1 2-я ступень 1 3-я ступень 2 4-я ступень 3 5-я ступень 4 6-я ступень 5 7-я ступень 7 8-я ступень 9 9-я ступень 11 10-я ступень 13 11-я ступень 15 12-я, 13-я ступени и специальные типы войск Не переносим чужие старые таблицы автоматически. Проверяем количество очков непосредственно в текущем окне события 58 государства. Высокий T не всегда лучшая цель 11-я ступень даёт больше очков, чем 8-я. Но если ради этих очков вы потеряете огромный марш, такая цель может оказаться намного хуже. Всегда сравнивайте получаемые очки, количество раненых, возможную постоянную гибель, стоимость лечения и риск ответной атаки. Где можно набирать очки ресурсные плитки; города других губернаторов; Битва за замок и башни; Форты и Крепости; договорные бои, если они разрешены правилами государства. Сначала читаем правила 58 государства. У самой игры нет "},{"title":"Эпоха кристалла огня","url":"buildings-after-fire.html","description":"Когда Топка достигает уровня кристалла огня 1 , город вступает в Эпоху кристалла огня . Главный ресурс этого этапа — Кристаллы огня .","text":"Эпоха кристалла огня Когда Топка достигает уровня кристалла огня 1 , город вступает в Эпоху кристалла огня . Главный ресурс этого этапа — Кристаллы огня . Эпоха кристалла огня Здания кристалла огня Лаборатория кристаллов Военная академия Академия рассвета Станция желаний и новые здания 2026 Приоритет после перехода Как не тратить Кристаллы огня впустую Белая Мгла • Эпоха кристалла огня Главная › База знаний › Эпоха кристалла огня Эпоха кристалла огня Когда Топка достигает уровня кристалла огня 1 , город вступает в Эпоху кристалла огня . Главный ресурс этого этапа — Кристаллы огня . Здания • этап 2 Эпоха кристалла огня Автор - Sova Когда Топка достигает уровня кристалла огня 1 , город вступает в Эпоху кристалла огня . Главный ресурс этого этапа — Кристаллы огня . Здания кристалла огня Это не второй набор построек Уже существующие здания продолжают развиваться выше 30 уровня с помощью Кристаллов огня и получают новый внешний вид. Топка Главное здание позднего развития. После 30 уровня повышается по уровням кристалла огня. Посольство Продолжает развиваться и остаётся одним из ключевых требований для Топки. Командный центр Получает уровни кристалла огня и увеличивает вместимость создаваемых рейдов. Медпункт Получает уровни кристалла огня и увеличивает вместимость раненых. Лагерь пехоты Продолжает развитие пехоты на более высоких этапах. Лагерь копейщиков Продолжает развитие копейщиков на более высоких этапах. Лагерь стрелков Продолжает развитие стрелков на более высоких этапах. Научный центр Обычный Научный центр остаётся отдельной системой исследований и не заменяет Военную академию. Лаборатория кристаллов Лаборатория кристаллов появляется значительно позже начала Эпохи кристалла огня, примерно на этапе открытия 4–5 уровней кристалла огня в государстве. Основная переработка позволяет обменивать обычные ресурсы на Кристаллы огня . Позднее открывается более продвинутая переработка, связанная с получением Очищенных кристаллов огня . Военная академия Военная академия появляется на более позднем этапе развития государства. В ней проводятся специальные военные исследования. Через неё открывается развитие войск 11-го уровня , а в более старых государствах — и дальнейшее развитие войск 12-го уровня . Важно Точные названия поздних войск проверим отдельно на странице «Войска» по русской версии игры. На этой странице английские названия не используем. Академия рассвета Академия рассвета используется для системы экспертов. Для самого игрока нужна как минимум Топка 25 , но открытие экспертов дополнительно зависит от этапа развития государства. Станция желаний и новые здания 2026 Это новая система 2026 года. В государствах, для которых функция уже активирована, после вступления в Эпоху кристалла огня появляется Станция жел"},{"title":"Здания до Топки 30","url":"buildings-before-fire.html","description":"Этот этап охватывает развитие обычной Топки от 1 до 30 уровня . Ниже собраны основные здания и их назначение.","text":"Здания до Топки 30 Этот этап охватывает развитие обычной Топки от 1 до 30 уровня . Ниже собраны основные здания и их назначение. Здания до Топки 30 Главное здание Ресурсы и жизнь выживших Герои, разведка и развитие Армия и защита города Другие системы Что развивать в первую очередь Подготовка к Эпохе кристалла огня Белая Мгла • Здания до Топки 30 Главная › База знаний › Здания до Топки 30 Здания до Топки 30 Этот этап охватывает развитие обычной Топки от 1 до 30 уровня . Ниже собраны основные здания и их назначение. Здания • этап 1 Здания до Топки 30 Автор - Sova Этот этап охватывает развитие обычной Топки от 1 до 30 уровня . Ниже собраны основные здания и их назначение. Главное здание Топка Главное здание города. Определяет максимальный уровень большинства построек и открывает новые системы. Ресурсы и жизнь выживших Лесопилка Производит древесину. Охотничий домик Производит мясо. Барак Жильё выживших. В городе используется несколько бараков. Угольный рудник Производит уголь. Открывается при Топке 3 . Больница Лечит заболевших выживших. Открывается при Топке 4 . Не путать с Медпунктом для войск. Кухня Готовит пищу для выживших. Железный рудник Производит железо. Открывается при Топке 5 . Дом губернатора Открывается при Топке 6 и связан с управлением городом и приказами губернатора. Склад Открывается при Топке 9 и защищает часть ресурсов от разграбления. Герои, разведка и развитие Дом исследователей Открывается при Топке 4 . Здесь находится система Освоения и связанные с ней награды. Зал героев Открывается при Топке 4 и связан с системой героев. Маяк Открывается при Топке 7 . Даёт задания разведки и награды. Арена Открывается при Топке 8 . Обелиск Открывается при Топке 8 и связан с этапами развития государства. Научный центр Открывается при Топке 9 . Здесь находятся ветки исследований Развития, Экономики и Битвы. Причал При Топке 19 открывает путь на Остров Рассвета . Армия и защита города Лагерь пехоты Открывается при Топке 7 . Обучает и повышает пехоту. Баррикада Открывается при Топке 7 и участвует в защите города. Посольство Открывается при Топке 8 . Увеличивает возможности помощи альянса и размещения подкреплений. Лагерь стрелков Открывается при Топке 8 . Медпункт Открывается при Топке 8 . Здесь лечатся раненые войска. Лагерь копейщиков Открывается при Топке 9 . Командный центр Открывается при Топке 10 . Увеличивает вместимость создаваемых губернатором рейдов. Военное бюро Открывается при Топке 11 . Используется для возвращения части потерянных войск через систему вербовки. Другие системы Учебный лагерь героев Система синхронизации уровней героев открывается примерно на этапе Топки 13 . Питомцы Система становится доступна начиная с Топки 18 , если государство уже дос"},{"title":"Здания","url":"buildings.html","description":"Все основные постройки города: развитие до Топки 30 и переход в Эпоху кристалла огня.","text":"Здания Все основные постройки города: развитие до Топки 30 и переход в Эпоху кристалла огня. Здания Как устроено развитие зданий Здания по этапам Главные ориентиры Главное Белая Мгла • Здания Главная › База знаний › Здания Здания Все основные постройки города: развитие до Топки 30 и переход в Эпоху кристалла огня. Топка Топка 1–30 Кристаллы огня Поздняя игра Содержание Как устроено развитие зданий Здания по этапам Главные ориентиры Главное Короткий режим: открывай только нужные разделы. Раскрыть все Как устроено развитие зданий Подробнее Главное здание города — Топка . Её уровень ограничивает развитие большинства других построек и открывает новые системы игры. Развитие города удобно разделить на два больших этапа: Топка 1–30 Обычное развитие города, ресурсов, армии, исследований и систем героев. Эпоха кристалла огня После достижения Топкой уровня кристалла огня 1 начинается следующий этап развития города. Здания по этапам Подробнее До Топки 30 › Эпоха кристалла огня › Главные ориентиры Подробнее Топка Главное здание и основной ограничитель развития города. Посольство Помощь альянса и подкрепления. Регулярно требуется для повышения Топки. Научный центр Исследования развития, экономики и боя. Исследования желательно держать постоянно активными. Медпункт Лечит раненые войска. Не путать с Больницей, которая относится к выжившим. Командный центр Увеличивает вместимость создаваемых вами рейдов. Военные лагеря Лагерь пехоты, Лагерь копейщиков и Лагерь стрелков. Главное Подробнее Скопировать До Топки 30: Топка → здания, нужные для следующего уровня → Посольство и Научный центр → военные лагеря по необходимости. После перехода: заранее проверяем требования следующего уровня Топки и не расходуем Кристаллы огня на всё подряд. ↑"},{"title":"Битва за замок","url":"castle.html","description":"Битва за замок — крупное PvP-событие, в котором альянсы государства сражаются за контроль над Солнечным замком . Здесь недостаточно просто первым войти в Замок. Для победы необходи","text":"Битва за замок Битва за замок — крупное PvP-событие, в котором альянсы государства сражаются за контроль над Солнечным замком . Здесь недостаточно просто первым войти в Замок. Для победы необходимо: захватить Замок → удерживать его → к Битва за замок КАК ПОБЕДИТЬ МАКСИМАЛЬНАЯ ПРОДОЛЖИТЕЛЬНОСТЬ БУРЯ ПЕРЕД БИТВОЙ РУИНЫ ВОКРУГ ЗАМКА КАК АТАКОВАТЬ ЗАМОК СОЗДАТЕЛЬ РЕЙДА УЧАСТНИКИ РЕЙДА СОСТАВ ВОЙСК ОРУДИЙНЫЕ БАШНИ КАК РАСПРЕДЕЛЯТЬ СИЛЫ ПОСЛЕ ЗАХВАТА ЗАМКА НЕ ПРЕКРАЩАЙТЕ ПОДКРЕПЛЕНИЯ РАНЕНЫЕ И ГОСПИТАЛЬ КАК ПОЛУЧАЮТСЯ ЛИЧНЫЕ ОЧКИ НАГРАДЫ ЗА ЛИЧНЫЕ ОЧКИ СМОТРИТЕ БОЕВЫЕ ОТЧЁТЫ ПРЕЗИДЕНТ Белая Мгла • Битва за замок Главная › События › Битва за замок Битва за замок Битва за замок — крупное PvP-событие, в котором альянсы государства сражаются за контроль над Солнечным замком . Здесь недостаточно просто первым в… Отдельный гайд события Битва за замок Битва за замок — крупное PvP-событие, в котором альянсы государства сражаются за контроль над Солнечным замком . Здесь недостаточно просто первым войти в Замок. Для победы необходимо: захватить Замок → удерживать его → контролировать башни → постоянно пополнять гарнизон . КАК ПОБЕДИТЬ Альянс побеждает, если удерживает Солнечный замок непрерывно: 2 ЧАСА 30 МИНУТ Если противник захватит Замок раньше окончания этого времени, непрерывный таймер удержания сбрасывается. После повторного захвата отсчёт начинается заново. МАКСИМАЛЬНАЯ ПРОДОЛЖИТЕЛЬНОСТЬ Битва может длиться максимум 5 ЧАСОВ . Если ни один альянс не смог удержать Солнечный замок 2,5 часа подряд , победителем станет альянс, который за всё время события удерживал Замок дольше остальных суммарно . Старое правило 3 часа удержания / 6 часов битвы устарело. Используем актуальное правило: 2,5 часа / 5 часов . БУРЯ ПЕРЕД БИТВОЙ За 2 часа до снятия защитного щита Солнечного замка в красной зоне вокруг него начинается буря. Города, находящиеся в зоне угрозы, могут быть случайно перемещены. После окончания бури снова появляется возможность телепортироваться ближе к Замку. Поэтому не занимайте боевую позицию слишком рано. Следите за таймером события. РУИНЫ ВОКРУГ ЗАМКА Вокруг Солнечного замка находится особая территория — Руины . При движении через неё скорость марша войск значительно уменьшается. Поэтому расстояние имеет огромное значение. Чем ближе город находится к нужной позиции после окончания бури, тем быстрее можно: входить в рейды; отправлять подкрепления; возвращать войска; реагировать на смену владельца Замка или башни. КАК АТАКОВАТЬ ЗАМОК Против сильного гарнизона лучше не отправлять войска хаотичными одиночными атаками. Основная ударная сила альянса — организованные рейды . R4/R5 заранее определяют: кто открывает рейд; кто присоединяется; каких героев использовать; какой состав войск нужен; когда рейд должен прийти к Замку. Не открывайте собственный рейд без необходимости, если руководство уже собирает основной удар. СОЗДАТЕЛЬ РЕЙДА Создавать основные рейды лучше сильным игрокам с: хорошими боевыми характеристиками; сильными PvP-героями; высо"},{"title":"Безумный Джо","url":"crazy-joe.html","description":"Безумный Джо — альянсовое PvE-событие, в котором бандиты волнами атакуют города участников и Штаб альянса.","text":"Безумный Джо Безумный Джо — альянсовое PvE-событие, в котором бандиты волнами атакуют города участников и Штаб альянса. Безумный Джо Как проходит событие Два поражения Главная стратегия — подкрепления Не переполняйте один город Лечение во время Джо Что оставлять в своём городе Волны 10 и 20 — Штаб альянса Как защищать Штаб Волны 7, 14 и 17 Горящий город Щит Ресурсы Телепортация Подготовка перед стартом Что делать участнику Частые ошибки Белая Мгла • Безумный Джо Главная › События › Безумный Джо Безумный Джо Безумный Джо — альянсовое PvE-событие, в котором бандиты волнами атакуют города участников и Штаб альянса. Отдельный гайд события Безумный Джо Автор - Sova Безумный Джо — альянсовое PvE-событие, в котором бандиты волнами атакуют города участников и Штаб альянса. Главная задача — не просто защитить свой город, а правильно распределить войска между союзниками и набрать как можно больше личных и альянсовых очков . Для участия необходимо состоять в альянсе и иметь Топку 7 уровня или выше . Событие запускает руководство альянса. 20 волн За один запуск события. 7 • 14 • 17 особые волны Особенно важно быть онлайн. 10 • 20 Штаб альянса В эти волны атака идёт на Штаб. 2 поражения После двух поражений Джо перестаёт атаковать ваш город. Как проходит событие За один запуск проходит 20 волн . Большинство волн атакуют города участников альянса. 7 • 14 • 17 — особые атаки, связанные с игроками, находящимися онлайн. 10 • 20 — атака направляется на Штаб альянса . По мере прохождения волн противники становятся сильнее. Два поражения Если ваш город дважды не смог отбиться , Безумный Джо перестаёт атаковать его до конца текущего запуска. Но для вас событие на этом не заканчивается . отправляйте подкрепления союзникам; участвуйте в защите Штаба; уничтожайте войска Джо; продолжайте получать очки. Если город союзника уже получил 2 поражения Держать там подкрепления больше нет смысла. Верните отряд и отправьте его в другой город, который Джо ещё продолжает атаковать. Главная стратегия — подкрепления Одна из самых эффективных тактик — заранее договориться с союзниками и обменяться подкреплениями . Не нужно держать всю армию только у себя. Отправленные союзникам войска участвуют в отражении волн и приносят вам очки за уничтоженных противников. Особенно важно помогать городам, которым сложно самостоятельно выдерживать следующие волны. Не переполняйте один город Не стоит всем игрокам отправлять подкрепления одному и тому же человеку. Количество противников в волне ограничено. Если один город защищают сразу очень много игроков, убийства распределяются между большим количеством подкреплений. В результате каждый участник может получить меньше личных очков. Лучше распределять армии между несколькими городами. Лечение во время Джо Если альянс играет на максимальный набор очков, основное лечение лучше оставить до окончан"},{"title":"Картина по номерам","url":"creative-amoress-painting.html","description":"Творческая работа игрока государства 58.","text":"Картина по номерам Творческая работа игрока государства 58. Картина по номерам Белая Мгла • Картина по номерам Главная › Новости › Творческий уголок › Картина по номерам Картина по номерам Творческая работа игрока государства 58. ‹ Творческий уголок 🎨 КАРТИНА ПО НОМЕРАМ Картина по номерам Автор — [VgB]ღAmoressღ На картине — Геральт из Ривии , ведьмак и охотник на чудовищ, главный герой серии «Ведьмак». ♥ 0 ↑"},{"title":"Джо","url":"creative-boss-joe.html","description":"Игровой рассказ из Творческого уголка государства 58.","text":"Джо Игровой рассказ из Творческого уголка государства 58. Джо Белая Мгла • Джо Главная › Новости › Творческий уголок › Джо Джо Игровой рассказ из Творческого уголка государства 58. ‹ Творческий уголок ✍️ ИГРОВОЙ РАССКАЗ Джо Автор — [KSV]bossmolokosos Лидер ночью всё решает, лидер думки подгоняет: где, чего, когда и как, как настроить нам кулак, оборону и походы, вклады чтобы все вносили, топки чтоб росли красивые. Вдруг настала нам пора Джо пускать в цветущий сад, лидер говорит: эгей, собираемся на Джо мы все скорей, вот вам в общий уведомленья, не пропустите все веселье, будьте, топки, вы в сети, ну, допустим, к 20.00. Вот уж вечер приближался, замы в общем чате собирались: кто кого будет крепить, куда какие войска водить. Время 20.00, волны Джо идут. Начинается каламбур: топка с другого края земли в общий чат пишет: «Укрепи!» Все ему в личку: «Лети на базу альянса скорей!» В ответ лишь тишина морей. Ладно, двигаемся дальше. Вот уж третья волна пляшет, вдруг откуда ни возьмись рейд на криптида, да ebiсь оно тудысь. Лидер рейды отменяет, народ тихо закипает. Вот волна на штаб пошла, все кричат: «Идём туда!» Все бегут да впопыхах, фермеры у моей топки в ТОПах. Людям вроде и смешно, вроде и как и не смешно. Ладно, все всё понимают, вроде игры продолжаем. Лидер говорит: обратно войска со штаба распределяем. Войска со штаба не спешат, войска спят, ведь все в делах, замы трудятся, кипят, выгоняют войска как котят. Волны Джо всё наступают, топки подгорать начинают. В общем кричат: «Не лечимся, не тушимся, ждём!» Всё идёт, как обычно, вверх дном. Запросы на лечение поступают, и топки себя тушить начинают. Вот уже и близок схватки финал, но крепы выдвинулись на топки, дважды побитые, с Джиной в главе. Вот-вот Джо на штаб второй раз нападёт, все кричат: «Вперёд, войска, порядок!» Герои, наш штаб не падёт! И что мы наблюдаем в конце? Здесь фермеры прутся как верхом на коне, лидер работает, замы кипят, уж нужен нам в Джо повыше финал. В изгнанье, в отмены отправляются те, кто не слушал старших подсказки в маленьком окне. Ну всё, можно выдохнуть-то наконец, но бои ещё не закончены, и лидер снова творец: планирует, пишет, подсказки строчит, толковые вещи в чате говорит. Но кажется мне, что так будет всегда: топки онлайн с окраины на Джо и молчуны навсегда. ♥ 0 ↑"},{"title":"Маленькая топка","url":"creative-boss-little-furnace.html","description":"Игровая история из Творческого уголка государства 58.","text":"Маленькая топка Игровая история из Творческого уголка государства 58. Маленькая топка Белая Мгла • Маленькая топка Главная › Новости › Творческий уголок › Маленькая топка Маленькая топка Игровая история из Творческого уголка государства 58. ‹ Творческий уголок 📖 ИГРОВАЯ ИСТОРИЯ Маленькая топка Автор — [KSV]bossmolokosos Однажды сидела и росла маленькая топка в маленьком альянсе, сидела-сидела, отбивалась от приглашений в топовые альянсы, потому что ей и так было нормально. Но вот актив стал угасать, а топка расти, и она начала понимать, что, к сожалению, пора вывалиться из гнезда, где ты рос, иначе птенец останется птенцом, а оставшийся верный актив тоже может угаснуть. И пошла топка по чатам да закрытым приглашениям и начала изучать, куда пойти вместе со своей дружной командой. Долго думали, гадали. И топки перешли в новый альянс: новые задания, впечатления, новые активные люди. И вроде всё хорошо, и топка решила, что со всем справится и прокачается в три раза быстрее, но вот незадача: на битве за комплекс топка поняла, что остальные лечатся быстрее неё, хотя топка всё делала как все, и пошла топка жечь ускоры да усиления, но не вытягивала по здоровью и проиграла. И начала топка госпиталь расширять, начала ускорение лечения активней развивать, но в следующей битве по лечению отставала, хоть сама с автопомощью стояла, и начала топка негодовать: как же так, да что за eb такую-то matь? И тут случайно топка в мировом пивоварню увидала, которая у неё даже не стояла. Топка давай её качать, и уровень лечения стал вырастать.... Вот такая история. Все персонажи не указаны, все заслуги не описаны. Всем хорошего дня и побольше автохила на комплексах) Ну а я пока поворую сердешки, где пивоварни не прокачаны, не потому что «на меня глядит игриво пиво пиво пиво пиво», а потому что качайте пивоварню) ♥ 0 ↑"},{"title":"Творческий уголок","url":"creative-corner.html","description":"Творчество игроков государства 58: песни, стихи, рассказы, рисунки и другие работы.","text":"Творческий уголок Творчество игроков государства 58: песни, стихи, рассказы, рисунки и другие работы. Творческий уголок Хотите поделиться своим творчеством? Солнечный замок Роман48 Картина по номерам Маленькая топка Джо Белая Мгла • Творческий уголок Главная › Новости › Творческий уголок Творческий уголок Творчество игроков государства 58: песни, стихи, рассказы, рисунки и другие работы. ✍️ Хотите поделиться своим творчеством? Рисуете, пишете стихи или рассказы, создаёте что-то своими руками? Присылайте свои работы для публикации в Творческом уголке. Не забудьте указать своё игровое имя. Написать в Telegram ♫ МУЗЫКАЛЬНАЯ ПУБЛИКАЦИЯ Солнечный замок Автор — [VgB]HiTmaN74 4:54 · Песня государства 58 ♥ 0 👀 0 › ✒️ СТИХОТВОРЕНИЕ Роман48 Автор — [WeR]MIsh_Gun ♥ 0 👀 0 › 🎨 КАРТИНА ПО НОМЕРАМ Картина по номерам Автор — [VgB]ღAmoressღ ♥ 0 👀 0 › 📖 ИГРОВАЯ ИСТОРИЯ Маленькая топка Автор — [KSV]bossmolokosos ♥ 0 👀 0 › ✍️ ИГРОВОЙ РАССКАЗ Джо Автор — [KSV]bossmolokosos ♥ 0 👀 0 › Творчество игроков • Гос 58 ↑"},{"title":"Роман48","url":"creative-roman48.html","description":"Творческая публикация игрока государства 58.","text":"Роман48 Творческая публикация игрока государства 58. Роман48 Белая Мгла • Роман48 Главная › Новости › Творческий уголок › Роман48 Роман48 Творческая публикация игрока государства 58. ‹ Творческий уголок ✒️ СТИХОТВОРЕНИЕ Роман48 Автор — [WeR]MIsh_Gun Горит мой замок в ледяной глуши Диабло лживый, больше не пиши. Послушай только, что же ты несёшь Из уст твоих идёт одна гнилая ложь Ты , лживый пёс, глумиться, обзываться не спеши. Ты всем возьми , да правду расскажи Про то, что ты трусливый лживый чорт. Я правду докажу- тут всем Вам Отчёт ! Вот дым рассеялся , и замок наш отбит. На поле возле замка вражьи топки догорают. И куча павших войск бездыханно лежит! Роман свой щит с мечом от крови протирает. Диабло знает - в битве Тьмы со Светом допустил просчёт. И не достанется ему божественная длань, Ведь Бог давным-давно Романа выбрал. И направляет в Ромы замок лживый свой поход…. Роман горит, но не сгорит его Отчёт. И в луже пьяный он, иль он над облаками, Когда со знаком «минус» та война? Кто грязного не замечает Дна, Тот к небу прикасается руками… Он в это верит — в чём его вина? Корона сверху головы на нём сияет!!! [WeR]MIsh_Gun ♥ 0 ↑"},{"title":"Солнечный замок","url":"creative-solnechny-zamok.html","description":"Песня «Солнечный замок». Автор — [VgB]HiTmaN74. Творческий уголок государства 58.","text":"Солнечный замок Песня «Солнечный замок». Автор — [VgB]HiTmaN74. Творческий уголок государства 58. Солнечный замок Белая Мгла • Солнечный замок Главная › Новости › Творческий уголок › Солнечный замок Солнечный замок Песня «Солнечный замок». Автор — [VgB]HiTmaN74. Творческий уголок государства 58. ‹ Творческий уголок ♫ МУЗЫКАЛЬНАЯ ПУБЛИКАЦИЯ Солнечный замок Автор — [VgB]HiTmaN74 Гос 58 4:54 ♪ Солнечный замок [VgB]HiTmaN74 · 4:54 Ваш браузер не поддерживает воспроизведение аудио. ♥ 0 👀 0 ТЕКСТ ПЕСНИ Солнечный замок Север молчит, но мы не молчим. Солнечный замок горит. Белая мгла поглотила горизонт, Пятьдесят первый идёт, ломая лёд. Их знамёна закрыли небосвод, А у нас лишь один замок, одна линия вперёд. Самозванец Роман на троне дрожит, Но клинок солдата о короне не спросит. Народ государства пятьдесят восемь сжал кулаки, И под мёрзлой землёй закипают огни. Солнечный замок, мы идём, мы идём. Пятьдесят первый, ты готов? Государство пятьдесят восемь не сломить в снегах, Горит наш негасимый огонь. Они говорят: нас слишком мало. Они говорят: нам не устоять. Но не понять им людей из промёрзших скал, В чьих жилах несломленная рать. Каждый сугроб — это поле боя, Каждый рубеж — от крепости щит. Когда генеральский рёв разрезает небо, Гордыня врага в ледяную крошку разлетит. Солнечный замок, мы идём, мы идём. Пятьдесят первый, ты готов? Государство пятьдесят восемь не сломить в снегах, Горит наш негасимый огонь. У них вчетверо больше солдат. У нас вчетверо больше решимости. Они меряют победу числом, Мы меряем простор костями. Когда рассвет пронзит белую мглу, Над Солнечным замком сменится флаг. Генералы пятьдесят первого запомнят этот миг: Имя государства пятьдесят восемь — на льду и в огне. Солнечный замок, мы идём, мы идём. Пятьдесят первый, ты готов? Государство пятьдесят восемь не сломить в снегах, Горит наш негасимый огонь. Солнечный замок наш. Пятьдесят восьмой не падёт. [VgB]HiTmaN74 ↑"},{"title":"Воспоминания о грёзах","url":"dreams.html","description":"«Воспоминания о грёзах» - событие на внимательность и скорость поиска спрятанных предметов. Игрок проходит главы и этапы внутри главы, получает опыт и награды и открывает дальнейши","text":"Воспоминания о грёзах «Воспоминания о грёзах» - событие на внимательность и скорость поиска спрятанных предметов. Игрок проходит главы и этапы внутри главы, получает опыт и награды и открывает дальнейший прогресс события. Воспоминания о грёзах Как открывается Сколько глав Как проходит игра Проигрыш сбрасывает главу Сушеная рыба грёз Паузы нет Не нажимайте хаотично Как быстрее искать предметы Сначала забирайте простое Запоминайте сцены Особенно проверяйте Колокольчики грёз Рыбные консервы грёз Что исчезает после события Сплочение грёз Ежедневные миссии Рейтинг Сплочения грёз Белая Мгла • Воспоминания о грёзах Главная › События › Воспоминания о грёзах Воспоминания о грёзах «Воспоминания о грёзах» - событие на внимательность и скорость поиска спрятанных предметов. Игрок проходит главы и этапы внутри главы, получает опы… Событие на внимательность и память Воспоминания о грёзах «Воспоминания о грёзах» - событие на внимательность и скорость поиска спрятанных предметов. Игрок проходит главы и этапы внутри главы, получает опыт и награды и открывает дальнейший прогресс события. Главная особенность: если провалить один из этапов, прогресс текущей главы сбрасывается. На поздних главах важнее играть аккуратно, чем быстро нажимать куда попало. Как открывается Для участия требуется Топка 7 уровня или выше . После открытия событие появляется в соответствующем цикле событий. Сколько глав Сейчас в «Воспоминаниях о грёзах» существует 10 глав . Главы проходятся последовательно. Чем дальше вы продвигаетесь, тем дороже становится ошибка. Особенно внимательно проходите главы 6-10 . Как проходит игра После входа в этап перед вами появляется сцена. Внизу экрана показываются предметы, которые необходимо найти. Осмотрите сцену. Нажимайте на нужные предметы. Успейте до окончания таймера. Перейдите к следующему этапу. Завершите всю главу. На поздних этапах предметов становится больше, а искать их становится сложнее. Проигрыш сбрасывает главу Если вы провалили любой этап главы , прохождение главы считается неудачным и прогресс текущей главы сбрасывается. Например, если вы успешно прошли несколько этапов одной главы и проиграли следующий, придётся снова проходить эту главу с начала. Поэтому: на сложных главах не спешите. Сушеная рыба грёз Для прохождения используется специальный ресурс: Сушеная рыба грёз . Особенно важно: в главах 6-10 после поражения использованная сушеная рыба грёз не возвращается . Чем дальше вы продвинулись, тем выгоднее заранее знать расположение предметов. Паузы нет Во время прохождения нельзя остановить таймер. Если временно выйти из раунда, обратный отсчёт продолжится . Освободите несколько минут. Уберите уведомления. Не запускайте этап, если можете отвлечься. Заранее приготовьтесь внимательно смотреть на экран. Не нажимайте хаотично Если совершить несколько неправильных нажатий за короткое время, управление блокируется на 3 секунды . На сложном этапе эти три секунды могут решить исход всей главы. Лучше потерять секунду на поиск, че"},{"title":"Бесконечное испытание","url":"endless-trial.html","description":"«Бесконечное испытание» - постоянная ежедневная активность против Вульфгара, Повелителя ветров . Здесь губернатор атакует Вульфгара одиночным отрядом и пытается нанести как можно б","text":"Бесконечное испытание «Бесконечное испытание» - постоянная ежедневная активность против Вульфгара, Повелителя ветров . Здесь губернатор атакует Вульфгара одиночным отрядом и пытается нанести как можно больше урона за одну атаку. Бесконечное испытание Когда появляется Вульфгар Атаковать можно сколько угодно Рейдов нет Ежедневное участие Как считается рейтинг Награды за урон Состав войск формируется автоматически Не берите героев только по поколению Теперь тестировать намного удобнее Меняйте по одному герою Один удар не показатель Смотрим на экспедиционные навыки Защита тоже может быть полезна Снаряжение героев Виджеты Питомцы Дополнительные бонусы Белая Мгла • Бесконечное испытание Главная › События › Бесконечное испытание Бесконечное испытание «Бесконечное испытание» - постоянная ежедневная активность против Вульфгара, Повелителя ветров . Здесь губернатор атакует Вульфгара одиночным отряд… Отдельный гайд события Бесконечное испытание Автор - Sova «Бесконечное испытание» - постоянная ежедневная активность против Вульфгара, Повелителя ветров . Здесь губернатор атакует Вульфгара одиночным отрядом и пытается нанести как можно больше урона за одну атаку. Главная особенность: количество атак не ограничено, а для рейтинга имеет значение лучший одиночный удар. атак без лимита Можно тестировать составы сколько угодно. 1 лучший удар Именно он идёт в ежедневный рейтинг. 3 героя Главный выбор, который реально влияет на результат. без рейда Вульфгар атакуется только одиночно. Когда появляется Вульфгар Вульфгар появляется в тундре ежедневно. Обычно новая ежедневная сессия начинается примерно после 00:30 UTC . После ежедневного обновления начинается новый рейтинг и можно снова улучшать результат текущего дня. Атаковать можно сколько угодно Старого ограничения «30 атак в день» больше нет. Теперь можно снова и снова менять героев, проверять снаряжение, активировать подходящие бонусы и искать максимально сильную комбинацию. Меняйте одного героя и сравнивайте результат. Меняйте всю тройку, если хотите проверить другой подход. Переставляйте снаряжение и Виджеты. Повторяйте один и тот же состав несколько раз. После прокачки сразу проверяйте новый рекорд. Рейдов нет Вульфгар атакуется только одиночно . Нельзя создать рейд, присоединиться к чужому рейду или использовать союзников для совместного удара. Ежедневное участие У события есть ежедневные награды за участие. Сначала выполняйте необходимое количество атак, указанное в текущем окне ежедневных заданий, и забирайте награду. После этого дополнительные атаки можно использовать уже для рейтинга, новых порогов урона и тестирования героев, снаряжения и бонусов. Количество атак при этом не ограничено. Как считается рейтинг В рейтинг идёт самый сильный одиночный удар за день . Пример 500 млн → 620 млн → 590 млн → 710 млн → 680 млн Результат дня: 710 млн . Урон предыдущих атак не складывается. Награды за урон Кроме ежедневного рейтинга есть награды за достижение определённых порогов урона. По мере развития аккаунта можно возвращаться к Вульфгару и постепенно открывать более вы"},{"title":"События","url":"events.html","description":"Как подготовиться, что делать и какие ресурсы лучше копить заранее.","text":"События Как подготовиться, что делать и какие ресурсы лучше копить заранее. События События: что делать и что не пропускать Подробные гайды Перед любым событием Белая Мгла • События Главная › События События Как подготовиться, что делать и какие ресурсы лучше копить заранее. Подготовка Тактика Награды Содержание События: что делать и что не пропускать События Подробные гайды Перед любым событием Короткий режим: открывай только нужные разделы. Раскрыть все События: что делать и что не пропускать Подробнее В этом разделе собраны короткие гайды по основным событиям: как подготовиться, что делать во время события, какие ресурсы лучше копить заранее и каких ошибок избегать. События Подробнее Охота на медведя — правильный первый герой, быстрый набор рейдов и минимум пауз. Безумный Джо — 20 волн, взаимные подкрепления, Штаб на 10-й и 20-й волнах; лечим по ситуации и не мешаем подкреплениям набирать очки. Престиж наёмника — 25 этапов, энергия с Джиной, контракты помощи и элитные противники. Рудник ледяного огня — 30 минут, патрули, навыки, жилы и орихалк. Бесконечное испытание — неограниченные одиночные атаки, в рейтинг идёт лучший удар; тестируем тройки героев и снаряжение. Торговый путь в тундре — грузовики, обновления, помощь союзников и защита конвоя. Сражение альянсов — шесть этапов, 13 очков победы и соревнование с другим альянсом. Рыбалка — для рейтинга уходи глубже, для коллекции проверяй недостающую добычу. Снегоуборщики — экономим топливо, рано улучшаем топку, спасаем выживших и на 95% используем Ракету 2.0. Воспоминания о грёзах — 10 глав, поражение сбрасывает текущую главу; на сложных этапах бережём сушеную рыбу и колокольчики грёз. Чемпионат альянса — три линии, регистрация отряда и распределение силы. Литейная — захват и удержание зданий, очки и бонусы объектов. Форты — координация рейдов и подкрепления после захвата. Битва за замок — рейды, башни, подкрепления и удержание центральной точки. Подготовка к SvS — что копить и когда выгоднее использовать. SvS: боевая фаза — Замок, башни, рейды, подкрепления и защита города. Гонка вооружений — копим материалы, проверяем задания текущего запуска и совмещаем прокачку с другими событиями. Мощь государства — общий цикл SvS: подбор соперника, подготовка, межгосударственная боевая фаза и восстановление войск. Мобилизация альянса — выбираем выгодные задания, бережём редкие ресурсы и набираем личные и альянсовые очки. Братья по оружию — очки за уничтоженные и тяжело раненые войска; выбираем разрешённые бои с минимумом собственных потерь. Зимняя осада — альянсовое PvP-событ"},{"title":"Эксперты","url":"experts.html","description":"Актуальные эксперты российского 58 государства и те, кто появится позже.","text":"Эксперты Актуальные эксперты российского 58 государства и те, кто появится позже. Эксперты Сейчас доступны в 58 государстве Агнес Сирилла Хольгер Кого развивать в 58 государстве Материалы экспертов Будущие эксперты Как будем обновлять страницу Белая Мгла • Эксперты Главная › Эксперты Эксперты Актуальные эксперты российского 58 государства и те, кто появится позже. Доступны сейчас Будущие Приоритет Содержание Эксперты Сейчас доступны в 58 государстве Агнес Сирилла Хольгер Кого развивать в 58 государстве Материалы экспертов Будущие эксперты Как будем обновлять страницу Короткий режим: открывай только нужные разделы. Раскрыть все Эксперты Подробнее Эксперты дают дополнительные бонусы для отдельных систем игры: развития города, событий, Арены, Охоты на медведя и других режимов. Они открываются постепенно по мере развития государства, поэтому набор экспертов не одинаков во всех государствах . Скопировать Эта страница показывает состояние именно российского 58 государства. Сейчас доступны в 58 государстве Подробнее Скопировать Агнес • Сирилла • Хольгер Остальные известные эксперты в 58 государстве пока не открыты. Агнес Подробнее Специализация: развитие города Один из самых полезных первых экспертов, потому что её бонусы работают практически каждый день. Дополнительные задания Маяка Больше ресурсов, ускорений, алмазов и других наград. Дополнительная энергия губернатора Больше охоты на зверей и других активностей. Развитие города Сокращение времени строительства и бонус к исследованиям. Тайный магазин Дополнительные возможности обновления и покупок. Скопировать Кому полезна: практически любому аккаунту. Особенно хороша для игроков с небольшими расходами, потому что её бонусы дают постоянную ежедневную пользу. Подробный гайд по Агнес оставляем отдельно. Сирилла Подробнее Специализация: Охота на медведя Сирилла предназначена прежде всего для игроков, которые регулярно участвуют в Охоте на медведя . Её навыки усиливают пользу от этого события и помогают получать больше результата за каждую охоту. Скопировать Кому полезна: если альянс регулярно проводит Медведя и игрок участвует почти каждый раз, Сирилла становится очень полезным экспертом. Для игрока, который редко участвует в событии, её ценность будет заметно ниже. Подробный гайд по Сирилле оставляем отдельно. Хольгер Подробнее Специализация: Арена Хольгер связан прежде всего с Ареной. Его бонусы помогают получать больше пользы от этого режима и улучшают результаты игрока, который активно участвует в боях на Арене. Скопировать Кому полезен: тем, кто регулярно играет на Арене и хочет развивать именно этот режим. Если Арена не является приоритетом аккаунта,"},{"title":"Освоение","url":"exploration.html","description":"Проходи этапы, усиливай пятёрку героев и повышай постоянный пассивный доход Дома исследователей.","text":"Освоение Проходи этапы, усиливай пятёрку героев и повышай постоянный пассивный доход Дома исследователей. Освоение Что такое Освоение Как проходят бои Построение Навыки Освоения Связь с Ареной Конвой героя Преимущество классов Контр не сильнее всего Перед боем смотри противника Перестановка может решить бой Контроль Массовый урон Передняя линия Задняя линия Быстрое развертывание Уровень и звёзды героя Руководства по Освоению Белая Мгла • Освоение Главная › База знаний › Освоение Освоение Проходи этапы, усиливай пятёрку героев и повышай постоянный пассивный доход Дома исследователей. 5 героев Навыки Освоения Конвои Пассивные награды Содержание Что такое Освоение Как проходят бои Построение Навыки Освоения Связь с Ареной Конвой героя Преимущество классов Контр не сильнее всего Перед боем смотри противника Перестановка может решить бой Контроль Массовый урон Передняя линия Задняя линия Быстрое развертывание Уровень и звёзды героя Руководства по Освоению Снаряжение героев Эксклюзивное снаряжение Награды за этап Усиленные этапы Пассивные награды Сталь Не давай сундуку переполняться Перед сложным этапом Правильный цикл Если застрял Меняй по одному Рейтинг Для F2P Частые ошибки Короткий режим: открывай только нужные разделы. Раскрыть все Что такое Освоение Подробнее Освоение — постоянный PvE-режим в Доме исследователей , где команда из пяти героев проходит всё более сложные этапы. Дом исследователей открывается при Топке 4 уровня . Освоение важно не только ради разовых наград. Чем дальше ты проходишь, тем выше пассивный доход и тем больше материалов для развития героев и других систем аккаунта. Как проходят бои Подробнее В бой отправляются 5 героев . Обычные войска из города сюда не отправляются. Каждого героя сопровождает собственный конвой , а бой проходит автоматически. Поэтому главная работа губернатора происходит до начала боя: нужно правильно выбрать героев и расставить их. Построение Подробнее Поле делится на 2 места впереди + 3 места сзади . Впереди обычно ставят более живучих героев и тех, кто должен долго удерживать противника. Сзади чаще размещают основных дамагеров, лечение, поддержку и контроль. Схема 2 танка + 3 дамагера — хорошая отправная точка, но не обязательное правило каждого этапа. Навыки Освоения Подробнее В этом режиме работают именно навыки Освоения . Они определяют урон, защиту, лечение, контроль, скорость атаки и специальные эффекты героя. Экспедиционный навык, полезный в рейде или на Медведе, сам по себе не делает героя сильным в Освоении. Связь с Ареной Подробнее Навыки Освоения используются также на Арене . Поэтому хорошо развитая пятёрка часто приносит пользу сразу в двух режимах. Но составы не обязаны полностью совпадать: в Освоении ты сражаешься с фиксированными PvE-противниками и можешь перестраивать команду под конкретный этап. Конвой героя Подробнее К"},{"title":"Ферма","url":"farm.html","description":"Дополнительный персонаж для сбора и передачи ресурсов основному аккаунту.","text":"Ферма Дополнительный персонаж для сбора и передачи ресурсов основному аккаунту. Ферма Что такое ферма Где создавать ферму Что развивать Топка Исследования Войска Герои Склад на ферме Какие ресурсы можно забрать Как забрать ресурсы с фермы В каком альянсе держать ферму Что делать каждый день Стоит ли участвовать в событиях Белая Мгла • Ферма Главная › Ферма Ферма Дополнительный персонаж для сбора и передачи ресурсов основному аккаунту. Сбор Передача Склад Альянс Содержание Что такое ферма Где создавать ферму Что развивать Войска Герои Склад на ферме Какие ресурсы можно забрать Как забрать ресурсы с фермы В каком альянсе держать ферму Что делать каждый день Стоит ли участвовать в событиях Короткий режим: открывай только нужные разделы. Раскрыть все Что такое ферма Подробнее Ферма — дополнительный персонаж в том же государстве, который развивается прежде всего ради производства и сбора ресурсов для основного аккаунта. Это не отдельная официальная функция игры, а распространённая стратегия игроков. Скопировать Основная задача фермы: собирать ресурсы → хранить доступный для разграбления запас → при необходимости отдавать его основному аккаунту через атаку. Где создавать ферму Подробнее Ферма должна находиться в том же государстве , что и основной аккаунт. Иначе основной персонаж не сможет приехать к ней на карте и забрать ресурсы обычной атакой. Скопировать По русской версии игры: в одном государстве можно создать максимум 2 персонажа . Что развивать Подробнее Ферме не требуется такая же прокачка, как основному боевому аккаунту. Топка Развивай Топку настолько, насколько это необходимо для: дополнительных очередей походов; военных лагерей; исследований; достаточной грузоподъёмности армии. Одного универсального уровня остановки нет. Для простой фермы нет необходимости бесконечно гнаться за боевой мощью. Исследования Главный приоритет: Скопировать Экономика Особенно полезны: скорость сбора мяса; скорость сбора древесины; скорость сбора угля; скорость сбора железа; производство ресурсов. Исследования Развития тоже полезны, если помогают быстрее получить нужные здания, походы и войска. Боевые исследования можно оставить второстепенными, если ферма не используется в событиях и боях. Войска Подробнее Ферме нужны войска прежде всего для сбора ресурсов . Главная цель: иметь достаточно войск, чтобы одновременно заполнить все используемые походы и полностью собирать хорошие ресурсные плитки. Более высокая ступень войск увеличивает грузоподъёмность одного бойца, поэтому позднее требуется меньше войск для того же объёма ресурсов. Скопировать После достижения достаточного количества армии нет необходимости постоянно обучать огромные запасы войск только ради мощности. Герои Подробнее В первую оч"},{"title":"Огненная Топка • Этапы 1–5","url":"fire-furnace-calculator.html","description":"Калькулятор считает путь после Топки 30: обязательные здания, обычные ресурсы и Кристаллы огня. В интерфейсе используем простое название «Этапы» вместо FC.","text":"Огненная Топка • Этапы 1–5 Калькулятор считает путь после Топки 30: обязательные здания, обычные ресурсы и Кристаллы огня. В интерфейсе используем простое название «Этапы» вместо FC. Огненная Топка • Этапы 1–5 🏘️ Где сейчас обязательные здания 📦 Всего потребуется 🏗️ Что улучшать по порядку Белая Мгла • Огненная Топка • Этапы 1–5 Главная › Огненная Топка • Этапы 1–5 Огненная Топка • Этапы 1–5 Калькулятор считает путь после Топки 30: обязательные здания, обычные ресурсы и Кристаллы огня. В интерфейсе используем простое название «Этапы» вм… 🔥 Моя Огненная Топка сейчас → 🎯 Хочу 🏘️ Где сейчас обязательные здания Укажите реальные уровни зданий. Для Посольства и Исследовательского центра можно выбрать 29 или 30, поэтому калькулятор учтёт подготовку к первому Этапу. 🏛️ Посольство 🔬 Исследовательский центр 🛡️ Лагерь пехоты 🏹 Лагерь стрелков ⚔️ Лагерь копейщиков 💡 Один полный огненный этап состоит из 5 улучшений. Поэтому внутри списка будут «шаг 1/5» … «шаг 5/5». 📦 Всего потребуется Мясо 0 Древесина 0 Уголь 0 Железо 0 Кристаллы огня 0 🏗️ Что улучшать по порядку Данные для Этапов 1–5 повторно сверены по Whiteout Survival Data и Whiteout Survival Wiki. Учтены 5 промежуточных улучшений каждого этапа, а перед первым Этапом — Посольство 30 и Исследовательский центр 30. Очищенные кристаллы для Этапов 1–5 не нужны. ↑"},{"title":"Рыбалка","url":"fishing.html","description":"Рыболовный турнир — одиночное событие, в котором нужно опускать крючок как можно глубже, обходить препятствия, а на обратном пути ловить рыбу и другую добычу.","text":"Рыбалка Рыболовный турнир — одиночное событие, в котором нужно опускать крючок как можно глубже, обходить препятствия, а на обратном пути ловить рыбу и другую добычу. Рыбалка Как работает рыбалка Спуск Подъём Вместимость крючка Если играете на рейтинг Если собираете коллекцию Рог Посейдона Если промахнулись с Рогом Катушечный стабилизатор Фонарь Океанический сканер Приманка Улучшайте рыболовные наборы Охота за затонувшим сокровищем Когда использовать «Отступить» Полезные приёмы Частые ошибки Белая Мгла • Рыбалка Главная › События › Рыбалка Рыбалка Рыболовный турнир — одиночное событие, в котором нужно опускать крючок как можно глубже, обходить препятствия, а на обратном пути ловить рыбу и дру… Отдельный гайд события Рыбалка Рыболовный турнир — одиночное событие, в котором нужно опускать крючок как можно глубже, обходить препятствия, а на обратном пути ловить рыбу и другую добычу. Событие проходит примерно раз в 4 недели . Главная цель может быть разной: рейтинг — набрать как можно больше очков; коллекция — поймать недостающую рыбу и другие экземпляры справочника. Перед началом лучше сразу решить, что для вас сейчас важнее. Как работает рыбалка Во время ловли ведём леску по полю, избегаем препятствий и собираем нужную добычу. Каждая попытка состоит из двух частей. Спуск Во время спуска ваша задача — пройти как можно глубже . Старайтесь не задевать рыбу и другие препятствия головой крючка. После определённого количества столкновений крючок перестаёт опускаться и начинает автоматически возвращаться наверх. Чем глубже вы смогли пройти, тем больше возможностей встретить ценную и редкую добычу. Совет Один из самых удобных способов — держаться ближе к левому или правому краю экрана и отходить от края только для обхода препятствий. Подъём Когда крючок начинает подниматься, начинается сама ловля. Чтобы поймать рыбу: заденьте крючком её голову. Попадание в хвост рыбу не ловит. Поэтому на спуске иногда можно безопасно пройти рядом с телом или хвостом большой рыбы, а на подъёме уже целиться именно в голову. Вместимость крючка За одну попытку нельзя забрать бесконечное количество добычи. У крючка есть ограничение. Поэтому не всегда выгодно хватать первую попавшуюся рыбу. Если играете на высокий результат или ищете конкретный экземпляр, оставляйте свободное место для более ценной добычи. Если играете на рейтинг Для рейтинга главная задача: глубина + ценная добыча + хороший подъём. пройти как можно глубже; избегать лишних столкновений; не забивать крючок дешёвой добычей слишком рано; выбирать более редкую и ценную рыбу; использовать сильные специальные предметы на хорошие попытки. Если начало получилось очень плохим, не обязательно заканчивать заход. Можно использовать «Отступить» и попробовать снова. Если собираете коллекцию Перед рыбалкой сначала откройте справочник и посмотрите, каких экземпляров вам не хватает . Не нужно пытаться ловить всё подряд. Учитыва"},{"title":"Форты","url":"forts.html","description":"Битвы за форт — альянсовое событие, в котором несколько альянсов могут бороться за контроль над фортом.","text":"Форты Битвы за форт — альянсовое событие, в котором несколько альянсов могут бороться за контроль над фортом. Форты Регистрация Какой форт выбирать Почему может быть несколько целей Перед началом боя Что происходит в начале Рейд или одиночная атака Кто должен открывать рейд Сколько войск отправлять Главное правило — 30 минут Если никто не удержал 30 минут После захвата Если противник выбил форт Нужны ли стяги рядом с фортом Награды Очки После победы Что делать участнику Белая Мгла • Форты Главная › События › Форты Форты Битвы за форт — альянсовое событие, в котором несколько альянсов могут бороться за контроль над фортом. События альянса Форты Битвы за форт — альянсовое событие, в котором несколько альянсов могут бороться за контроль над фортом. Главная задача здесь не просто один раз победить защитников. Нужно: выбрать правильную цель → собрать сильный рейд → захватить форт → удержать его. Главный ресурс события — не отдельный сильный игрок, а координация всего альянса . Скрин из видео. Фото уменьшено, аккуратно обрезано, данные игрока скрыты. Регистрация Регистрацией на Битву за форт занимается руководство альянса: R4 / R5 . Во время регистрации руководство выбирает форт, за который альянс хочет сражаться. Также выбираются 3 предпочтительных варианта времени . Важно Это ещё не означает, что бой обязательно начнётся в одном из выбранных вами часов. Окончательное время определяется системой с учётом выбора других альянсов, зарегистрированных на тот же объект. После окончания регистрации обязательно ещё раз проверьте реальное время боя . Какой форт выбирать Награды у фортов могут различаться. Перед регистрацией R4/R5 лучше открыть нужный форт и посмотреть: какие награды доступны сейчас; нужен ли этот форт альянсу; сколько соперников на него зарегистрировано; в какое время альянс сможет собрать больше активных игроков. Для 58 государства ориентируемся именно на награды, показанные сейчас в вашем игровом интерфейсе. Не используем старые таблицы наград из других государств. Почему может быть несколько целей Если альянс уже захватил форт на предыдущей стадии, этот форт может автоматически перейти в регистрацию на следующую стадию . При этом руководство может получить возможность зарегистрироваться ещё на новую цель. Поэтому иногда альянс одновременно видит несколько боёв. В такой ситуации R4/R5 заранее определяют приоритет: какой форт обязателен → какой второстепенный → какой можно отдать. Не распыляйте основные силы без необходимости. Перед началом боя Участнику желательно заранее: быть онлайн; освободить очереди походов; вернуть ненужные походы со сбора; проверить войска; проверить героев; подготовить боевой отряд; посмотреть сообщения, метки и команды R4/R5; точно знать, в какой рейд нужно вступать. Не начинайте собственный рейд без команды, если руководство уже назначило капитанов. Что происходит в начале В начале боя внутри"},{"title":"Литейная","url":"foundry.html","description":"Литейная — командное PvP-событие, где два альянса сражаются за контроль карты и набирают альянсовые очки арсенала . Победу определяют не убийства сами по себе, а то, насколько хоро","text":"Литейная Литейная — командное PvP-событие, где два альянса сражаются за контроль карты и набирают альянсовые очки арсенала . Победу определяют не убийства сами по себе, а то, насколько хорошо команда захватывает здания, удерживае Литейная Карта Литейной Как определяется победитель Перед входом на поле боя Главное правило Литейной — контроль карты Как работают очки зданий Временные очки и припасы арсенала Здания Литейной Фазы боя Когда нужен рейд Не бросайте здание сразу после захвата Сбор припасов после захвата Телепорты и перемещение Личные очки Что делать участнику Что делать R4/R5 Частые ошибки Белая Мгла • Литейная Главная › События › Литейная Литейная Литейная — командное PvP-событие, где два альянса сражаются за контроль карты и набирают альянсовые очки арсенала . Победу определяют не убийства с… Отдельный гайд события Литейная Автор - Sova Литейная — командное PvP-событие, где два альянса сражаются за контроль карты и набирают альянсовые очки арсенала . Победу определяют не убийства сами по себе, а то, насколько хорошо команда захватывает здания, удерживает их, собирает выпавшие припасы и быстро переключается между целями. Карта Литейной Это фото удобно использовать как быструю шпаргалку: сначала по нему проще запомнить, где находятся главные здания, а потом уже разбирать, что захватывать в начале и кто куда должен идти. Центр карты — самая важная зона, потому что там находится Королевская литейная. Боковые здания тоже важны: они дают очки, бонусы и помогают удерживать инициативу. Перед боем полезно заранее распределить, кто идёт на центр, а кто — на вспомогательные объекты. Как определяется победитель Побеждает альянс, который к окончанию боя набрал больше альянсовых очков арсенала . Не путайте альянсовые и личные очки Личные очки игрока нужны для личного рейтинга и наград, но сами по себе не выигрывают бой. Можно набить много личных очков в сражениях и всё равно проиграть Литейную, если противник лучше контролировал здания и собирал очки карты. Главные источники альянсовых очков: первый захват здания; длительное удержание зданий; временные очки, которые производят удерживаемые объекты; сбор выпавших припасов арсенала ; Оружейные мастерские, которые появляются позднее. Перед входом на поле боя До входа в Литейную подготовьте город. Если у вас идут походы, стоят подкрепления или есть другие ограничения входа, игра может не пустить на поле боя. верните ненужные походы; освободите очереди марша; проверьте раненых; уберите чужие подкрепления из города, если интерфейс требует этого для входа; заранее посмотрите, в какой легион и роль вас поставило руководство. На поле боя войска не погибают безвозвратно как в обычном PvP: потери переводятся в раненых, а после завершения боя войска восстанавливаются по правилам события. Главное правило Литейной — контроль карты Литейная не выигрывается одной большой дракой в центре. Если вся команда стоит около одного здания, противник спокойно забирает остальные точки и продолжает получать очки. Перед стартом R4/R5"},{"title":"Рудник ледяного огня","url":"frostfire-mine.html","description":"«Рудник ледяного огня» - одиночное событие, где за 30 минут нужно собрать как можно больше орихалка . Главный результат дают быстрый набор навыков, правильный выбор жил, своевремен","text":"Рудник ледяного огня «Рудник ледяного огня» - одиночное событие, где за 30 минут нужно собрать как можно больше орихалка . Главный результат дают быстрый набор навыков, правильный выбор жил, своевременные всплески и разумное решение по Плави Рудник ледяного огня Условия участия Перед входом Войска не погибают Какие обычные бонусы не работают Как устроена карта Главная цель Патрули Рудника Старт события Стабильный путь навыков Старый трюк больше не нужен Навыки складываются Всплески жил Перед всплеском Что делать на всплеске Плавильня Если вы сильный игрок Если вы F2P или слабее лобби Белая Мгла • Рудник ледяного огня Главная › События › Рудник ледяного огня Рудник ледяного огня «Рудник ледяного огня» - одиночное событие, где за 30 минут нужно собрать как можно больше орихалка . Главный результат дают быстрый набор навыков,… Отдельный гайд события Рудник ледяного огня Автор - Sova «Рудник ледяного огня» - одиночное событие, где за 30 минут нужно собрать как можно больше орихалка . Главный результат дают быстрый набор навыков, правильный выбор жил, своевременные всплески и разумное решение по Плавильне. 30 минут Длится один заход в Рудник. 16+ уровень Топки Минимальное требование для участия. 2× всплеск жил Две самые важные серии быстрого сбора. 5 уровней навыков Опыт для них дают патрули Рудника. Условия участия Для входа требуется Топка 16 уровня или выше . Регистрация и сам бой проходят в один день. Игрок выбирает одно из доступных временных окон. Перед входом Верните все марши в город. Завершите активную разведку. Освободите очереди маршей. Проверьте героев и снаряжение. Выбирайте слот, в котором сможете полностью отыграть 30 минут. Важно Если войска находятся вне города или идёт разведка, игра может не пустить вас в Рудник. Войска не погибают Внутри события ваши войска фактически не расходуются. Даже при поражении обычных постоянных потерь армии нет, а войска вне события не страдают. Цена поражения Герои, участвовавшие в проигранном бою, временно уходят на восстановление. Поэтому бессмысленный PvP опасен прежде всего потерянным временем. Какие обычные бонусы не работают В Руднике действуют собственные правила. Обычные бонусы позиции, сбора и обычной скорости марша могут не работать. Поэтому не нужно заранее включать привычный бонус сбора ресурсов только ради этого события. Что работает лучше Скорость и эффективность внутри Рудника выгоднее усиливать через навыки самого события. Как устроена карта Внешняя зона: жилы 1 уровня. Меньше добычи, но обычно спокойнее. Средняя зона: жилы 2 уровня. Больше орихалка, но выше конкуренция. Центр: жилы 3 уровня и Плавильня. Самая высокая потенциальная прибыль и самая высокая конкуренция. По всей карте находятся патрули Рудника , которые дают опыт навыков. Главная цель Цель события - собрать как можно больше орихалка . Его получают из обычных жил, всплесков жил, выпавших куч орихалка, за отдельные эффекты навыков и за Плавильню. Главный вопрос Каждое действие оценивайте по тому, сколько орихалка оно "},{"title":"Калькулятор Топки 20–30","url":"furnace-calculator.html","description":"Выберите текущую Топку и цель. Калькулятор покажет, какие здания нужно улучшить сначала и сколько ресурсов потребуется на весь путь. Укажите реальные уровни обязательных зданий, чт","text":"Калькулятор Топки 20–30 Выберите текущую Топку и цель. Калькулятор покажет, какие здания нужно улучшить сначала и сколько ресурсов потребуется на весь путь. Укажите реальные уровни обязательных зданий, чтобы итог был точным именно для вашего города. Калькулятор Топки 20–30 🏘️ Уровни ваших зданий сейчас 📦 Всего потребуется 🏗️ Что улучшать по порядку Белая Мгла • Калькулятор Топки 20–30 Главная › Калькулятор Топки 20–30 Калькулятор Топки 20–30 Выберите текущую Топку и цель. Калькулятор покажет, какие здания нужно улучшить сначала и сколько ресурсов потребуется на весь путь. Укажите реальн… 🔥 Моя Топка сейчас → 🎯 Хочу Топку 🏘️ Уровни ваших зданий сейчас Укажите реальные уровни. Тогда калькулятор не будет угадывать, что у вас уже прокачано. 🏛️ Посольство 🔬 Исследовательский центр 🛡️ Лагерь пехоты 🏹 Лагерь стрелков ⚔️ Лагерь копейщиков 💡 Меняете уровень любого здания — общая сумма и порядок улучшений пересчитываются сразу. 📦 Всего потребуется Мясо 0 Древесина 0 Уголь 0 Железо 0 🏗️ Что улучшать по порядку Требования и базовые стоимости уровней 20–30 сверены по нескольким справочникам Whiteout Survival. Для Топки 27 использовано значение 24 млн угля, которое совпадает в WhiteoutData, WOS Wiki, BlueStacks и 173Games. Огненные уровни будут отдельным калькулятором «по этапам». ↑"},{"title":"Снаряжение","url":"gear.html","description":"Что усиливать в первую очередь и как не распылять редкие материалы.","text":"Снаряжение Что усиливать в первую очередь и как не распылять редкие материалы. Снаряжение Снаряжение героев Четыре части снаряжения Что качать в первую очередь Шесть главных предметов Сколько комплектов развивать Усиление снаряжения Камни эссенции и Ковка мастерства Легендарное снаряжение Мифрил Что важнее: пехота или стрелки? Белая Мгла • Снаряжение Главная › Снаряжение Снаряжение Что усиливать в первую очередь и как не распылять редкие материалы. Пехота Стрелки Копейщики Камни эссенции Легендарное Содержание Снаряжение героев Четыре части снаряжения Что качать в первую очередь Шесть главных предметов Сколько комплектов развивать Усиление снаряжения Камни эссенции и Ковка мастерства Легендарное снаряжение Мифрил Что важнее: пехота или стрелки? Короткий режим: открывай только нужные разделы. Раскрыть все Снаряжение героев Подробнее На этой странице речь именно о снаряжении героев . Снаряжение губернатора работает по другой системе и прокачивается отдельно. Снаряжение героя усиливает как характеристики самого героя, так и войска того типа, к которому он относится. Поэтому важно смотреть не только на общую мощность предмета, но и на то, какую характеристику он усиливает . Четыре части снаряжения Подробнее Головной убор / очки: повышает атаку и здоровье героя, а войскам соответствующего типа даёт смертоносность . Сапоги: также повышают атаку и здоровье героя и дают войскам смертоносность . Перчатки: повышают защиту и здоровье героя, а войскам дают здоровье . Пояс: также повышает защиту и здоровье героя и даёт войскам здоровье . Что качать в первую очередь Подробнее Пехота Перчатки + пояс → здоровье войск. Пехота принимает основной урон, поэтому её выживаемость особенно важна. Стрелки Головной убор / очки + сапоги → смертоносность. Основная задача стрелков связана с нанесением урона. Копейщики Головной убор / очки + сапоги → смертоносность. Базовый принцип такой же, как у стрелков. Шесть главных предметов Подробнее Для основной боевой тройки в первую очередь получаем: Пехота: перчатки + пояс. Стрелок: головной убор + сапоги. Копейщик: головной убор + сапоги. Остальные шесть предметов тоже полезны, но при ограниченных ресурсах их можно держать ниже основных и постепенно подтягивать позже. Такой подход особенно удобен для F2P и небольших донатеров. Сколько комплектов развивать Подробнее Сначала достаточно хорошо прокачать три комплекта: один для основного героя-пехотинца, один для копейщика и один для стрелка . При смене поколения снаряжение не нужно создавать заново: хороший комплект можно снять со старого героя и передать новому герою того же типа. Для Арены позже можно постепенно развивать снаряжение четвёртого и пятого героя, но делать это в ущерб основной тройке на раннем этапе обы"},{"title":"👑 Приказы губернатора","url":"governor-orders.html","description":"Полезные временные бонусы для ресурсов, строительства, выживших и развития города.","text":"👑 Приказы губернатора Полезные временные бонусы для ресурсов, строительства, выживших и развития города. 👑 Приказы губернатора ❄️ До Эпохи кристалла огня 🔥 Эпоха кристалла огня ⚠️ Забастовки выживших 😠 Почему бастуют? 🛠️ Что делать? 🔥 Супер-комбо: 4 баффа на стройку Белая Мгла • 👑 Приказы губернатора Главная › Другие гайды › 👑 Приказы губернатора 👑 Приказы губернатора Полезные временные бонусы для ресурсов, строительства, выживших и развития города. ❄️ Обычные приказы 🔥 Эпоха кристалла огня 🏗️ Комбо на стройку Содержание До Эпохи кристалла огня Эпоха кристалла огня Забастовки выживших Супер-комбо: 4 баффа на стройку Короткий режим: открывай только нужные разделы. Раскрыть все ❄️ До Эпохи кристалла огня Подробнее ⚒️ Срочная мобилизация Все выжившие на рабочих местах работают 48 часов . Настроение всех выживших −10. ⏱ 8 ч. · 💠 50 000 📦 Поспешная работа Мгновенно выдаёт ресурсы, соответствующие 5 дням работы всех производственных рабочих мест. ⏱ 1 д. · 💠 150 000 ❤️ Комплексный уход Мгновенно лечит всех заболевших выживших в городе. ⏱ 4 ч. · 💠 150 000 🏗️ Двойное время Ускоряет на 20% строительство новых и улучшение существующих зданий, начатых в следующие 5 минут . ⏱ 23 ч. · 💠 800 000 📈 Продуктивный день +100% к продукции на всех рабочих местах на 24 часа . Настроение выживших −10. ⏱ 12 ч. · 💠 50 000 🎉 Праздники +50 к настроению и +30 к комфорту в день праздника для всех выживших. ⏱ 1 д. · 💠 50 000 Скопировать Важно: «Двойное время» включайте до запуска стройки . После активации есть только 5 минут, чтобы начать строительство или улучшение. 🔥 Эпоха кристалла огня Подробнее После перехода в новую эпоху три приказа остаются, а три старых заменяются новыми. Одновременно по-прежнему используется 6 приказов . Скопировать Остаются: 📦 Поспешная работа · ❤️ Комплексный уход · 🏗️ Двойное время ⚒️ Срочная мобилизация → ⚙️ Решающий момент 📈 Продуктивный день → 🪖 Продвинутые тренировки 🎉 Праздники → 🌅 Благодарность Рассветного Альянса ⚙️ Решающий момент Запускает максимальную нагрузку автоматизации и даёт +100% к продукции на 24 часа по времени выживших. ⏱ 12 ч. · 💠 100 000 🪖 Продвинутые тренировки Повышает скорость тренировки войск на 20% на 2 часа . ⏱ Перезарядка: 2 д. 🌅 Благодарность Рассветного Альянса Даёт случайную награду из хранилища Рассветного Альянса . ⏱ Перезарядка: 2 д. ⚠️ Забастовки выживших Подробнее Забастовки происходят, когда условия жизни в городе ухудшаются и у выживших падает настроение. Особенно внимательно следите за городом после приказов, которые заставляют жителей работать интенсивнее. 😠 Почему бастуют? 🥶 В городе слишком холодно. 🍲 Не хватает еды или качество питания слишком низкое. 🏠 Низкий комфорт жилья и м"},{"title":"Губернатор","url":"governor.html","description":"Снаряжение и талисманы как долгосрочная прокачка всего аккаунта.","text":"Губернатор Снаряжение и талисманы как долгосрочная прокачка всего аккаунта. Губернатор Когда открывается Снаряжение губернатора Комплектные бонусы Материалы снаряжения губернатора Легендарное снаряжение Обмен материалов Талисманы губернатора Материалы талисманов Как прокачивать талисманы Когда улучшать Белая Мгла • Губернатор Главная › База знаний › Губернатор Губернатор Снаряжение и талисманы как долгосрочная прокачка всего аккаунта. Снаряжение Талисманы Поздняя игра События Содержание Губернатор Когда открывается Снаряжение губернатора Комплектные бонусы Материалы снаряжения губернатора Легендарное снаряжение Обмен материалов Талисманы губернатора Материалы талисманов Как прокачивать талисманы Когда улучшать Короткий режим: открывай только нужные разделы. Раскрыть все Губернатор Подробнее Снаряжение и талисманы губернатора дают постоянные боевые характеристики войскам . Они относятся ко всему аккаунту и не привязаны к одному конкретному герою. Эти бонусы учитываются во многих боевых режимах вместе с героями, технологиями, питомцами и другими системами развития. Снаряжение губернатора Отдельная система развития всего аккаунта. Снаряжение героев Экипировка отдельных героев. Скопировать Важно: материалы этих двух систем тоже разные. Когда открывается Подробнее Снаряжение губернатора Топка 22 Талисманы губернатора Топка 25 Поэтому материалы для этих систем стоит начинать копить заранее, даже если сама функция ещё не открыта. Снаряжение губернатора Подробнее Комплект состоит из 6 предметов . Каждому типу войск соответствуют два предмета: Пехота 2 предмета Копейщики 2 предмета Стрелки 2 предмета Каждый предмет повышает атаку и защиту соответствующего типа войск. Комплектные бонусы Подробнее Это одна из самых важных механик системы. 3 предмета одинакового качества Дополнительный бонус защиты войск. 6 предметов одинакового качества Дополнительный бонус атаки войск. Поэтому не всегда выгодно уводить один предмет слишком далеко вперёд, пока остальные остаются далеко позади. Скопировать Практический подход: Комплект → приоритетные предметы → снова выравнивание комплекта. Сначала стараемся сохранить хороший общий уровень комплекта. После получения комплектного бонуса можно сильнее вкладываться в приоритетные предметы, а затем снова подтягивать отстающие. Материалы снаряжения губернатора Подробнее Для развития используются: Упроченный сплав Один из основных материалов улучшения. Полировочный раствор Используется вместе со сплавом на этапах развития. Проектные планы Требуются начиная с более высоких уровней качества. Лунный янтарь Поздний легендарный материал для дальнейшего усиления снаряжения. Лунный янтарь относится именно к позднему развитию, поэтому его особенно "},{"title":"Герои","url":"heroes.html","description":"Кого использовать, как читать роли и куда вкладывать ресурсы.","text":"Герои Кого использовать, как читать роли и куда вкладывать ресурсы. Герои Герои: кого и для чего использовать Два типа навыков Тип героя Не прокачивай всех подряд 🎓 Учебный лагерь Как определяется уровень лагеря Что происходит с героем на месте учёбы Если убрать героя из лагеря Сброс уровня Как выгоднее расходовать опыт героя Главное Поколения героев Герои в начале игры Медведь и присоединение к рейду Арена Как правильно сравнивать героев Белая Мгла • Герои Главная › Герои Герои Кого использовать, как читать роли и куда вкладывать ресурсы. Навыки Типы войск Медведь Арена Содержание Герои: кого и для чего использовать Два типа навыков Тип героя Не прокачивай всех подряд Учебный лагерь Поколения героев Герои в начале игры Медведь и присоединение к рейду Арена Как правильно сравнивать героев Короткий режим: открывай только нужные разделы. Раскрыть все Герои: кого и для чего использовать Подробнее В «Белой Мгле: Выживание» нельзя оценивать героя только по редкости или общей мощности. Один герой может быть отличным на Арене, но слабее в рейдах, другой может оставаться полезным много поколений благодаря одному конкретному навыку. Два типа навыков Подробнее У героев есть две разные группы навыков: Исследование используется там, где герои сражаются сами: в Исследовании и на Арене. Экспедиция используется, когда герои ведут войска: в обычных походах, PvP, рейдах, гарнизоне, охоте на зверей и других боях войск. Скопировать Поэтому перед прокачкой всегда смотри, для какого режима нужен герой. Тип героя Подробнее Каждый боевой герой относится к одному из трёх типов: Скопировать Пехота → Копейщики → Стрелки. Пехота сильнее против копейщиков, копейщики против стрелков, стрелки против пехоты. Но один только тип войск не определяет ценность героя. Навыки, звёзды, поколение и конкретный режим боя могут быть важнее. Не прокачивай всех подряд Подробнее Лучше полностью развивать нескольких нужных героев, чем распределять фрагменты и материалы между всем списком. Особенно осторожно расходуй универсальные мифические фрагменты . Новые поколения героев появляются по мере развития государства, поэтому заранее оставлять запас часто полезнее, чем вкладывать всё в первого доступного легендарного героя. 🎓 Учебный лагерь Подробнее Учебный лагерь позволяет использовать героев высокого уровня без необходимости вручную прокачивать каждого из них опытом. В системе есть пять героев-инструкторов . Герои, размещённые на местах учёбы, автоматически подстраиваются под минимальный уровень этих пяти инструкторов . Уровень героев на местах учёбы определяется минимальным уровнем пяти инструкторов. Как определяется уровень лагеря Система смотрит на уровни пяти инструкторов и берёт самый низкий из них . Скопировать Пример: 74 / 74 / 74 / 73 / 73 → уровень Учебного лагеря будет 73 . Если одного из самых слабых инструкторов поднять выше, "},{"title":"Главная","url":"index.html","description":"Проверенные гайды, короткие памятки и полезные подсказки по Белой Мгле.","text":"Главная Проверенные гайды, короткие памятки и полезные подсказки по Белой Мгле. Часто открывают Последние изменения Полезные инструменты Для государства 58 Белая Мгла • Главная ▣ События Календарь, гайды и правила › ♟ Герои Прокачка, роли и советы › ⚔ Снаряжение Приоритеты и материалы › ▦ Калькулятор Топка и Огненная Топка › ★ Часто открывают Все разделы › ▣ События Гайды, правила и награды ♟ Герои Роли, прокачка и связки ⚔ Снаряжение Что усиливать в первую очередь ✦ Эксперты Приоритеты развития ✣ Питомцы Бонусы и развитие ♛ Должности Государство 58 ⌁ Ферма Сбор и развитие ▤ База знаний Остальные полезные гайды ✎ Последние изменения ✦ Эксперты Обновлены гайды и приоритеты прокачки › ⌖ Маяк Ежедневные задания и награды › ✉ Письма Важные письма и боевые отчёты › ◇ Лабиринт Добавлен отдельный раздел › ▦ Полезные инструменты ▦ Калькулятор Огненной Топки Ресурсы и обязательные здания › ▦ Калькулятор Топки 20–30 Требования для обычной Топки › ⌁ Ферма Практический гайд по развитию › ❄ Для государства 58 ♛ Должности на государстве Роли и бонусы › ⚑ Подготовка к SvS Что копить и когда тратить › ⚔ SvS Бой, замок и ключевые правила › Белая Мгла • Государство 58 • Автор — Sova ↑"},{"title":"Остров","url":"island.html","description":"Развивай Остров Рассвета и получай постоянные бонусы для всего аккаунта.","text":"Остров Развивай Остров Рассвета и получай постоянные бонусы для всего аккаунта. Остров Остров Рассвета Как открывается Древо жизни Эссенция жизни Собирай Эссенцию регулярно Расчистка острова Лесопилки Лесорубы и онлайн Лесорубами нельзя управлять вручную После полной расчистки Процветание Украшения не только для красоты Лимит по типу Если есть несколько одинаковых украшений Убрали украшение со сцены Лишние украшения Помощь союзникам Белая Мгла • Остров Главная › База знаний › Остров Остров Развивай Остров Рассвета и получай постоянные бонусы для всего аккаунта. Древо жизни Эссенция жизни Процветание Содержание Остров Рассвета Как открывается Древо жизни Эссенция жизни Собирай Эссенцию регулярно Расчистка острова Лесопилки Лесорубы и онлайн Лесорубами нельзя управлять вручную После полной расчистки Процветание Украшения не только для красоты Лимит по типу Если есть несколько одинаковых украшений Убрали украшение со сцены Лишние украшения Помощь союзникам Как часто можно помочь Лайки Острова Звёздный маяк Контракты на строительство Развитие после максимального Древа Новые системы 2026 Как развивать остров Как выбирать украшения Для F2P Частые ошибки Главное Короткий режим: открывай только нужные разделы. Раскрыть все Остров Рассвета Подробнее Остров Рассвета — отдельная система постоянного развития аккаунта. Здесь можно развивать Древо жизни, расчищать территорию, получать Эссенцию жизни, размещать и улучшать украшения, повышать Процветание и получать постоянные бонусы для города и армии. Скопировать Остров нужен не только для красоты. Многие его бонусы работают постоянно. Как открывается Подробнее Остров Рассвета становится доступен при Топке 19 уровня . После этого открывается Причал , через который можно отправиться на остров. Древо жизни Подробнее Главный объект Острова Рассвета — Древо жизни . Оно является основой островного прогресса. Развитие Древа открывает больше возможностей получения Эссенции жизни, новые возможности строительства, дальнейшее развитие острова и поздние островные системы. Скопировать В начале главный приоритет: не тормозить следующий уровень Древа жизни ради случайного декора. Эссенция жизни Подробнее Основная валюта Острова — Эссенция жизни . Она используется для развития Древа жизни, островных производственных объектов, покупки украшений и дальнейшего развития острова. Не трать её просто потому, что накопилось много. Сначала проверь, не нужна ли она для следующего важного шага Древа жизни. Собирай Эссенцию регулярно Подробнее У Древа жизни есть предел хранения. Если долго ничего не забирать, хранилище заполняется примерно за 12 часов , после чего дальнейшее производство начинает простаивать. Удобная схема: собрать утром и вечером. Не нужно заходить на остров каждый час, главное не оставлять производство заполненным надолго. Расчистка острова Подробнее В начале"},{"title":"Лабиринт","url":"labyrinth.html","description":"Разные зоны проверяют разные системы развития аккаунта. Смотри, какие характеристики работают в текущей зоне, и усиливай именно их.","text":"Лабиринт Разные зоны проверяют разные системы развития аккаунта. Смотри, какие характеристики работают в текущей зоне, и усиливай именно их. Лабиринт Что такое Лабиринт Как открывается Какой тип боя используется 6 зон Лабиринта Земля героев Пещера монстров Шахта талисманов Исследовательский центр Кузница снаряжения Сердце Геи Сердце Геи не включает абсолютно все бонусы Какие войска используются В Сердце Геи используются свои войска Состав противника Универсальной пропорции нет Если Пехота погибает первой Если фронт держится, но не хватает урона Белая Мгла • Лабиринт Главная › База знаний › Лабиринт Лабиринт Разные зоны проверяют разные системы развития аккаунта. Смотри, какие характеристики работают в текущей зоне, и усиливай именно их. 6 зон Экспедиционные характеристики Попытки Рейд Магазин Содержание Что такое Лабиринт Как открывается Какой тип боя используется 6 зон Лабиринта Земля героев Пещера монстров Шахта талисманов Исследовательский центр Кузница снаряжения Сердце Геи Сердце Геи не включает абсолютно все бонусы Какие войска используются В Сердце Геи используются свои войска Состав противника Универсальной пропорции нет Если Пехота погибает первой Если фронт держится, но не хватает урона Не забывайте про Копейщиков Попытки Не повторяйте одинаковое поражение Если состав уже не помогает Не во всех зонах герои работают одинаково Еженедельный цикл Рейд Рейд не заменяет первую победу Награды за прогресс Светящиеся камни Магазин Лабиринта Что покупать Таблица лидеров Земля героев: что качать Пещера монстров: что качать Шахта талисманов: что качать Исследовательский центр: что качать Кузница снаряжения: что качать Сердце Геи: что качать Простая схема прохождения Частые ошибки Главное Короткий режим: открывай только нужные разделы. Раскрыть все Что такое Лабиринт Подробнее Лабиринт — постоянный PvE-режим, в котором разные зоны проверяют разные части развития аккаунта. Одна зона проверяет героев, другая питомцев, третья талисманы, ещё одна исследования, затем снаряжение губернатора, а Сердце Геи объединяет сразу несколько направлений развития. Главный принцип: если застряли, сначала понять, какие характеристики работают в этой зоне, и только потом усиливать аккаунт. Как открывается Подробнее Для открытия Лабиринта нужны: Топка 19 уровня ; Командный центр 1 уровня . Система открывается после достижения нужного возраста государства. Вход находится через Командный центр . Какой тип боя используется Подробнее Лабиринт использует экспедиционные характеристики . Не путайте их с Ареной и Освоением. Поэтому герой, который великолепен на Арене, не обязательно будет лучшим именно для Лабиринта. 6 зон Лабиринта Подробнее Сейчас Лабиринт состоит из шести основных зон. Каждая открывается в определённые дни недели и использует собственный набор характеристик. Земля героев Подробнее Понедельник и вторник. Работают: герои; снаряжение героев; эксклюзивное снаряжение героев. Эта зона хорошо показывает качество вашей"},{"title":"Письма","url":"mails.html","description":"Боевые отчёты, награды и полезный архив для разбора боёв.","text":"Письма Боевые отчёты, награды и полезный архив для разбора боёв. Письма Разные вкладки почты Письма с наградами UTC и местное время Боевые отчёты Атакующий и защитник Не смотрим только на атаку Специальные бонусы Навыки героев не видны в общей таблице характеристик Смотрим «Подробности боя» Один отчёт не всегда доказательство Как правильно сравнивать Состав войск Если быстро погибла Пехота Если Стрелки почти не нанесли урона Выжившие Потери и раненые - не одно и то же Рейды Белая Мгла • Письма Главная › База знаний › Письма Письма Боевые отчёты, награды и полезный архив для разбора боёв. Отчёты Награды Анализ боя Сохранить Содержание Письма Разные вкладки почты Письма с наградами UTC и местное время Боевые отчёты Атакующий и защитник Не смотрим только на атаку Специальные бонусы Навыки героев не видны в общей таблице характеристик Смотрим «Подробности боя» Один отчёт не всегда доказательство Как правильно сравнивать Состав войск Если быстро погибла Пехота Если Стрелки почти не нанесли урона Выжившие Потери и раненые - не одно и то же Рейды Гарнизон Медведь Замок и SvS Сохраняйте важные отчёты Делитесь боевыми письмами Профиль противника из письма Поколения героев Письма событий Почта и объявления альянса - разные системы Что можно удалять Быстрый разбор боя Частые ошибки Главное Короткий режим: открывай только нужные разделы. Раскрыть все Письма Подробнее Почта в «Белая Мгла: Выживание» - это не просто место для получения наград. Здесь хранятся: боевые отчёты; награды; уведомления событий; итоги некоторых активностей; системные сообщения. Особенно ценны боевые отчёты . По ним можно понять, почему один состав выиграл, а другой проиграл, и что именно стоит изменить перед следующим боем. Разные вкладки почты Подробнее Письма разделены по категориям. Поэтому не проверяйте только одну вкладку. После обновлений функция «Прочитать и забрать всё» работает отдельно внутри каждой вкладки. Использование кнопки в одной категории не означает, что вся остальная почта тоже уже проверена. Письма с наградами Подробнее Через почту могут приходить: рейтинговые награды; награды событий; альянсовые награды; компенсации; награды по итогам отдельных активностей; награды, которые не были получены вручную в самом событии. Скопировать Перед массовым удалением: сначала заберите все вложения. UTC и местное время Подробнее Современная почта позволяет для ряда событий переключать отображение времени: UTC; местное время. Это особенно удобно для писем с расписанием Охоты на медведя, Безумного Джо, Литейной и других событий. Если время в письме выглядит непривычно, сначала проверьте, какой режим времени включён. Боевые отчёты Подробнее Боевой отчёт нужно читать дальше первой строки «Победа» / «Поражение» . Сам результат ещё не объясняет причину. Смотрите: количество войск; уровни войск; героев; атаку; защиту; смертоносность; здоровье; раненых; реальные потери;"},{"title":"Престиж наёмника","url":"mercenary-prestige.html","description":"«Престиж наёмника» - PvE-событие из двух частей: личной цепочки наёмников Фаэтона и совместных испытаний альянса против капитанов Фаэтона.","text":"Престиж наёмника «Престиж наёмника» - PvE-событие из двух частей: личной цепочки наёмников Фаэтона и совместных испытаний альянса против капитанов Фаэтона. Престиж наёмника Как устроено событие Выбор сложности Как найти наёмника Три способа победить Сколько энергии нужно Не открывайте рейд на каждый этап Джина экономит энергию Проиграли соло? Энергия вернётся Используйте поражение как тест Когда перестать тестировать Контракты наёмника Куда лучше тратить Контракты Помогайте союзникам Не копите Контракты без цели Ускоренные марши события Альянсовая часть Сколько капитанов Белая Мгла • Престиж наёмника Главная › События › Престиж наёмника Престиж наёмника «Престиж наёмника» - PvE-событие из двух частей: личной цепочки наёмников Фаэтона и совместных испытаний альянса против капитанов Фаэтона. Отдельный гайд события Престиж наёмника Автор - Sova «Престиж наёмника» - PvE-событие из двух частей: личной цепочки наёмников Фаэтона и совместных испытаний альянса против капитанов Фаэтона. Главный ограниченный ресурс события - энергия губернатора . Поэтому задача не просто пройти все этапы, а сделать это с минимальным расходом энергии. 25 личных этапов Нужно пройти всю цепочку наёмников Фаэтона. 15 энергии Стоит разведка каждого наёмника. 5 контрактов Столько запросов помощи даётся в начале события. 1 ч. на найденную цель После этого разведку придётся оплачивать снова. Как устроено событие В личной части нужно последовательно победить 25 наёмников . Они становятся сильнее по мере прохождения. Особенно заметный скачок сложности обычно приходится на этапы: 5 → 10 → 15 → 20 → 25 После личных испытаний участники помогают альянсу открывать совместных капитанов Фаэтона. Выбор сложности В начале события выбирается доступная сложность. После подтверждения изменить сложность в этом запуске нельзя. Если полностью пройти все 25 этапов, следующая сложность станет доступна при одном из следующих запусков события. Не выбирайте максимальную сложность только из-за красивых наград. Главное - суметь закончить всю цепочку. Как найти наёмника Каждый этап начинается с разведки. Разведка: 15 энергии. После неё наёмник появляется на карте на 1 час . Если время закончится, найденная цель исчезнет и придётся снова потратить 15 энергии. Поэтому не запускайте разведку, если сейчас не готовы заниматься этапом. Три способа победить Одиночная атака Дополнительно стоит 10 энергии . Самый дешёвый обычный вариант. Собственный рейд Дополнительно стоит 25 энергии . Используйте только когда одиночного марша действительно недостаточно. Запрос помощи альянса Использует Контракт наёмника . Дополнительная энергия владельца за сам бой не требуется, но 15 энергии за разведку уже были потрачены. Сколько энергии нужно Если проходить все 25 этапов только одиночными атаками: 25 × 15 разведка + 25 × 10 атака = 625 энергии. Если использовать 5 бесплатных запросов помощи: 25 разведок + 20 одиночных атак = 575 энергии. Это намного выгоднее постоянных собственных рейдов. Не открывайте р"},{"title":"Новичкам","url":"newbie.html","description":"Как правильно начать и не растратить ценные ресурсы впустую.","text":"Новичкам Как правильно начать и не растратить ценные ресурсы впустую. Новичкам Как правильно начать Топка: главный ориентир развития Не оставляй развитие без работы Найди активный альянс Не гонись только за цифрой мощности Не прокачивай всех героев одновременно Постоянно веди исследования Не оценивай армию только по количеству войск Снаряжение героев прокачивай с приоритетом Снаряжение губернатора развивай комплектом VIP развивай с конкретной целью Не покупай всё подряд в магазинах Учись копить, но не останавливай развитие Перед большой прокачкой проверь события На Медведе особенно важен первый герой Не пытайся прокачать всё одновременно Чек-лист Белая Мгла • Новичкам Главная › База знаний › Новичкам Новичкам Как правильно начать и не растратить ценные ресурсы впустую. Топка Альянс Герои Ресурсы Содержание Как правильно начать Топка: главный ориентир развития Не оставляй развитие без работы Найди активный альянс Не гонись только за цифрой мощности Не прокачивай всех героев одновременно Постоянно веди исследования Не оценивай армию только по количеству войск Снаряжение героев прокачивай с приоритетом Снаряжение губернатора развивай комплектом VIP развивай с конкретной целью Не покупай всё подряд в магазинах Учись копить, но не останавливай развитие Перед большой прокачкой проверь события На Медведе особенно важен первый герой Не пытайся прокачать всё одновременно Чек-лист Короткий режим: открывай только нужные разделы. Раскрыть все Как правильно начать Подробнее В начале игры легко потратить ускорения, алмазы, фрагменты и материалы туда, где они дадут мало пользы. Главная задача новичка: не просто быстро набрать мощность, а заложить основу аккаунта для дальнейшего развития. Топка: главный ориентир развития Подробнее Поднимай Топку, когда выполнены требования для следующего уровня. Её уровень ограничивает развитие большинства зданий, открытие новых возможностей и более высоких уровней войск. Не оставляй развитие без работы Подробнее Старайся, чтобы очередь строительства и исследования не простаивали. Если у тебя доступна вторая очередь строительства, используй её для параллельного развития города. Найди активный альянс Подробнее Альянс даёт помощь со строительством и исследованиями, технологии, сундуки, рейды, Медведя и множество событий. Ищи прежде всего активный и организованный альянс. Высокое место в рейтинге полезно, если за ним действительно стоит активность игроков. Не гонись только за цифрой мощности Подробнее Количество войск само по себе не показывает настоящую силу аккаунта. Важны уровень войск, исследования, герои, снаряжение героев, снаряжение губернатора, питомцы и постоянные боевые усиления. Не прокачивай всех героев одновременно Подробнее На старте полезны Сергей, Молли, Джесси, Бахити и Джина. Джассер и Со-Юн также имеют полезные навыки, которые могут пригодиться значительно дольше стартового периода. По мере появления новых поколений основные боевые герои будут постепенно меняться. Универсальные мифические фрагменты лучше не расходовать только потому, что герой уже открыт. Сначала реш"},{"title":"WhiteFox News","url":"news-elena.html","description":"Публикации WhiteFox News государства 58.","text":"WhiteFox News Публикации WhiteFox News государства 58. WhiteFox News Публикации Белая Мгла • WhiteFox News Главная › Новости › WhiteFox News WhiteFox News Публикации WhiteFox News государства 58. 📰 Публикации Материалы авторов WhiteFox News ✒️ ELENA Новости госа 58 Недели 40–41 Открыть публикацию › 🍁 ✒️ ELENA Новости госа 58 Неделя 38–39 Открыть публикацию › 🍁 ↑"},{"title":"Обновления EU","url":"news-eu.html","description":"Обновления и изменения EU-версии Whiteout Survival.","text":"Обновления EU Обновления и изменения EU-версии Whiteout Survival. Обновления EU Улучшения гарнизонов, банка и чатов 🛡️ Гарнизон одной кнопкой 💎 Банк и приказы 💬 Групповые чаты после переноса ⚔️ Помощь после SvS Белая Мгла • Обновления EU Главная › Новости › Обновления EU Обновления EU Обновления и изменения EU-версии Whiteout Survival. EU • АНОНС Улучшения гарнизонов, банка и чатов Официальные ответы разработчиков • 30 сентября 2026 ⏳ Статус: анонсировано. Точная дата запуска пока не названа. 🛡️ Гарнизон одной кнопкой Лидеры сборов и участники с правами R4/R5 смогут одновременно исключать все войска гарнизона. Это упростит быструю смену защитников во время боя. 💎 Банк и приказы Вклад алмазов в банке планируют сократить с 24 до 23 часов. Перезарядка Rush Job — 23 часа, Advanced Training и Dawn Alliance Commendation — 47 часов. 💬 Групповые чаты после переноса После переезда между государствами игроки смогут оставаться в прежних групповых чатах. Лимит создания групп также увеличат, но новое значение пока не объявлено. ⚔️ Помощь после SvS Появится история помощи при восстановлении войск: можно будет увидеть, кто из союзников помог специальными предметами. ⚠️ Для RU и государства 58 внедрение этих изменений пока не подтверждено. Планы разработчиков могут измениться. Источник: Whiteout Survival Wiki — September Developer Feedback ↑"},{"title":"Обновления RU","url":"news-ru.html","description":"Обновления и изменения RU-версии Whiteout Survival.","text":"Обновления RU Обновления и изменения RU-версии Whiteout Survival. Обновления RU Белая Мгла • Обновления RU Главная › Новости › Обновления RU Обновления RU Обновления и изменения RU-версии Whiteout Survival. ↑"},{"title":"Новости","url":"news.html","description":"Новости и обновления «Белой Мглы».","text":"Новости Новости и обновления «Белой Мглы». Новости Белая Мгла • Новости Главная › Новости Новости Новости и обновления «Белой Мглы». НОВОСТИ Новости Обновления EU Обновления RU WhiteFox News ♥ 0 Творческий уголок ♥ 0 ↑"},{"title":"База знаний","url":"other.html","description":"Справочные механики, ранняя игра и полезные разделы Белой Мглы.","text":"База знаний Справочные механики, ранняя игра и полезные разделы Белой Мглы. База знаний Чаще нужно Развитие База Калькуляторы Ещё в базе знаний Белая Мгла • База знаний Главная › База знаний База знаний Справочные механики, ранняя игра и полезные разделы Белой Мглы. 📖 База знаний Короткие справочные разделы, которые не нужны в основном меню. Чаще нужно То, к чему чаще возвращаются. Ресурсы Редкие материалы и приоритеты. › Альянс Помощь, технологии и активность. › Калькуляторы Топка и Огненная Топка. › Развитие Прокачка аккаунта. Исследования Ветки и приоритеты. › Остров Развитие и бонусы. › Войска Классы и усиление. › База Справочная информация. Здания Что улучшать. › Маяк Задания и награды. › Новичкам Для новых и вернувшихся. › Калькуляторы Быстрый расчёт без поиска по сайту. Топка 20–30 Расчёт требований обычной Топки Огненная Топка Этапы 1–5 и необходимые ресурсы Ещё в базе знаний Губернатор Арена Лабиринт Освоение Боевые письма ↑"},{"title":"Питомцы: кто они, для чего нужны и какие доступны сейчас","url":"pets.html","description":"Питомцы — отдельная система развития губернатора. Они не занимают место героя в походе. После приручения питомец развивается отдельно, повышает характеристики аккаунта и получает с","text":"Питомцы: кто они, для чего нужны и какие доступны сейчас Питомцы — отдельная система развития губернатора. Они не занимают место героя в походе. После приручения питомец развивается отдельно, повышает характеристики аккаунта и получает собственную полезную способность. Питомцы: кто они, для чего нужны и какие доступны сейчас Доступны сейчас в 58 государстве Когда открываются питомцы Как открываются новые питомцы Пещерная гиена Арктический волк Овцебык Огромный тапир Рух-титан Огромный олень Снежный леопард Пещерный лев Снежный примат Будущие питомцы для 58 государства Как прокачиваются питомцы Приручение Уровень Развитие Белая Мгла • Питомцы: кто они, для чего нужны и какие доступны сейчас Главная › Питомцы: кто они, для чего нужны и какие доступны сейчас Питомцы: кто они, для чего нужны и какие доступны сейчас Питомцы — отдельная система развития губернатора. Они не занимают место героя в походе. После приручения питомец развивается отдельно, повышает хар… Содержание Питомцы: кто они, для чего нужны и какие доступны сейчас Доступны сейчас в 58 государстве Когда открываются питомцы Как открываются новые питомцы Пещерная гиена Арктический волк Овцебык Огромный тапир Рух-титан Огромный олень Снежный леопард Пещерный лев Снежный примат Будущие питомцы для 58 государства Как прокачиваются питомцы Материалы питомцев Кормление и приручение Совершенствование характеристик Можно ли использовать несколько питомцев сразу? Как распределять материалы Быстрая шпаргалка 58 государства Короткий режим: открывай только нужные разделы. Раскрыть все Питомцы: кто они, для чего нужны и какие доступны сейчас Подробнее ПИТОМЦЫ • 58 ГОСУДАРСТВО Питомцы — отдельная система развития губернатора. Они не занимают место героя в походе. После приручения питомец развивается отдельно, повышает характеристики аккаунта и получает собственную полезную способность. Одни питомцы помогают развитию города и сбору ресурсов, другие усиливают армию. 9 доступны сейчас от Пещерной гиены до Снежного примата 5 будущих ещё не открыты в 58 государстве 18 ур. Топка минимальное условие для открытия системы питомцев Скопировать Важно для нашего сайта: эта страница ориентирована именно на российское государство 58. То, что питомец уже существует в более старых государствах, не означает, что он доступен у нас. Доступны сейчас в 58 государстве Подробнее Пещерная гиена Арктический волк Овцебык Огромный тапир Рух-титан Огромный олень Снежный леопард Пещерный лев Снежный примат Когда открываются питомцы Подробнее Для открытия системы питомцев нужны два условия: Топка 18 или выше Необходимый этап развития государства Одной только Топки 18 недостаточно. Государство также должно дойти до этапа, на котором система питомцев становится доступной. Новые питомцы затем появляются постепенно. Как открываются новые питомцы Подробнее Питомцы идут по цепочке. Для открытия следующего зверя необходимо сначала развить предыдущего до нужного уровня. Гиена 15 Волк 15 Овцебык 15 Тапир 15 Рух-титан 15 Олень 15 Леопард 15 Лев 30 Примат Число между пит"},{"title":"Руководство для президента","url":"president-guide.html","description":"Отдельная памятка для президента государства: управление, назначения, важные действия и подготовка к событиям.","text":"Руководство для президента Отдельная памятка для президента государства: управление, назначения, важные действия и подготовка к событиям. Руководство для президента 👑 Руководство для президента 🏛️ Должности государства 🕐 Запись на государственные должности ⚠️ Наказания и меры президента 💎 Получить подношение ⚡ Государственные навыки президента 👑 РАСПИСАНИЕ БАФФОВ ПРЕЗИДЕНТА 🎁 Награды президента ⚔️ Бонус президента Белая Мгла • Руководство для президента Главная › 👑 Должности на государстве › Руководство для президента Руководство для президента Отдельная памятка для президента государства: управление, назначения, важные действия и подготовка к событиям. Президент Управление государством Памятки 👑 Руководство для президента Памятка для президента государства 58. Здесь собрана только информация, которая относится к обычному президенту и доступным государственным механикам. 🏛️ Должности государства Президент управляет шестью положительными должностями. Министр внутренних дел также может назначать и снимать чиновников. Вице-президент +10% к скорости строительства, исследований и обучения. Министр внутренних дел +80% к производству ресурсов. Может назначать и снимать чиновников. Министр здравоохранения +100% к скорости лечения и +5 000 к вместимости лазарета. Министр обороны +10% к летальности войск. Министр стратегии +5% к атаке войск и +2 500 к вместимости отряда. Министр образования +50% к скорости обучения и +200 к вместимости обучения. 🕐 Запись на государственные должности В государстве 58 доступна запись на должность по конкретному времени . Игрок может выбрать нужную должность и забронировать свободный временной слот. Для игрока Выбрать должность → выбрать свободное время → подать заявку → дождаться назначенного времени. Временные слоты Бронирование доступно в пределах следующих 24 часов . Один слот длится 30 минут . После одобрения Одобренная запись появляется в списке задач как напоминание. Управление Президент контролирует заявки и расписание. Назначениями также может управлять министр внутренних дел. ⚠️ Наказания и меры президента Президент может назначать игрокам штрафные должности с отрицательными эффектами, а также использовать отдельные президентские меры. Испытание алчности −10% к скорости строительства, исследований и обучения. Испытание лености −40% к производству ресурсов. Испытание похоти −50% к скорости лечения и −2 500 к вместимости лазарета. Испытание мятежника −5% к летальности войск. Испытание труса −2% к атаке войск и −1 500 к вместимости отряда. Испытание дурака −25% к скорости обучения и −100 к вместимости обучения. Президентские меры 🚫 Режим тишины Накладывает на выбранного игрока запрет атаковать других губернаторов на 1 час . Стоимость: 27 000 влияния . 🌪️ Изгнание Телепортирует город выбранного игрока в случайную точку на карте и даёт ему 10"},{"title":"Исследования","url":"research.html","description":"Что исследовать сначала, как развивать три ветки Научного центра и что открывается в поздней игре.","text":"Исследования Что исследовать сначала, как развивать три ветки Научного центра и что открывается в поздней игре. Исследования Развитие Экономика Битва Пехота Копейщики Стрелки Что исследовать сначала Перед длинным исследованием Поздние исследования Военная академия Войска 11-го уровня Войска 12-го уровня Уровни кристалла огня и уровни войск Коротко Белая Мгла • Исследования Главная › База знаний › Исследования Исследования Что исследовать сначала, как развивать три ветки Научного центра и что открывается в поздней игре. Развитие Экономика Битва Содержание Исследования Развитие Экономика Битва Что исследовать сначала Перед длинным исследованием Поздние исследования Военная академия Войска 11-го уровня Войска 12-го уровня Уровни кристалла огня и уровни войск Коротко Короткий режим: открывай только нужные разделы. Раскрыть все Исследования Подробнее Исследования дают постоянные бонусы городу и армии. После завершения технология продолжает действовать постоянно, поэтому Научный центр лучше по возможности не оставлять без работы. Научный центр открывается при Топке 9. С повышением его уровня открываются более продвинутые исследования и увеличивается собственный бонус к скорости исследований. В Научном центре находятся три основных направления: Развитие Ускоряет развитие города, строительство, исследования, обучение и лечение войск. Экономика Улучшает производство и сбор основных ресурсов. Битва Усиливает боевые характеристики армии и открывает дополнительные военные улучшения. Развитие Подробнее Эта ветка особенно полезна в начале игры, потому что её бонусы экономят время на протяжении всего дальнейшего развития. Здесь находятся улучшения, связанные с: скоростью строительства; скоростью исследований; скоростью обучения войск; вместимостью обучения; вместимостью Медпункта; скоростью лечения; другими системами развития города и армии. Скопировать Рекомендуемый приоритет: Сначала обратить внимание на скорость исследований и скорость строительства , затем на обучение и лечение. Это не обязательный порядок игры, а практический приоритет: чем раньше получены постоянные ускорения, тем дольше они успевают работать на аккаунт. Экономика Подробнее Ветка «Экономика» улучшает производство и сбор основных ресурсов: Мясо Древесина Уголь Железо Здесь находятся технологии, увеличивающие производство ресурсов в городе и скорость их сбора на карте. Скопировать Как развивать Экономику Строгого универсального порядка здесь нет. Если ресурсов хватает, часть экономики можно временно отложить ради Развития или Битвы. Если аккаунту постоянно не хватает определённого ресурса, имеет смысл усилить именно его производство или сбор. Для фермы приоритеты могут отличаться от основного аккаунта. Битва Подробнее Ветка «Битва» напрямую усил"},{"title":"Ресурсы","url":"resources.html","description":"Сбор на карте, скорость добычи, защищённые запасы и редкие материалы.","text":"Ресурсы Сбор на карте, скорость добычи, защищённые запасы и редкие материалы. Ресурсы Ресурсные плитки Грузоподъёмность Как ускорить сбор Герои-сборщики Исследования Временный бонус скорости сбора Альянс Овцебык Другие постоянные бонусы Защищённые и незащищённые ресурсы Алмазы Кристаллы огня Ускорения Фрагменты героев Снаряжение героев Снаряжение губернатора Питомцы Белая Мгла • Ресурсы Главная › База знаний › Ресурсы Ресурсы Сбор на карте, скорость добычи, защищённые запасы и редкие материалы. Базовые Сбор Защита Редкие Содержание Ресурсы Ресурсные плитки Грузоподъёмность Как ускорить сбор Защищённые и незащищённые ресурсы Алмазы Кристаллы огня Ускорения Фрагменты героев Снаряжение героев Снаряжение губернатора Питомцы Эксперты Когда копить под события Короткий режим: открывай только нужные разделы. Раскрыть все Ресурсы Подробнее В игре есть четыре основных ресурса: Мясо Древесина Уголь Железо Они расходуются на строительство, исследования, обучение и лечение войск. Чем дальше развивается город, тем больше ресурсов требуется, поэтому сбор на карте постепенно становится важной частью ежедневной игры. Ресурсные плитки Подробнее На карте государства встречаются ресурсные точки 1–8 уровня . Чем выше уровень, тем больше ресурсов находится в одной точке. Уровень 1 70 тыс. · 70 тыс. 14 тыс. · 3,5 тыс. Уровень 2 150 тыс. · 150 тыс. 30 тыс. · 7,5 тыс. Уровень 3 300 тыс. · 300 тыс. 60 тыс. · 15 тыс. Уровень 4 600 тыс. · 600 тыс. 120 тыс. · 30 тыс. Уровень 5 1,2 млн · 1,2 млн 240 тыс. · 60 тыс. Уровень 6 3 млн · 3 млн 600 тыс. · 150 тыс. Уровень 7 6 млн · 6 млн 1,2 млн · 300 тыс. Уровень 8 14 млн · 14 млн 2,8 млн · 700 тыс. Скопировать Главное: высокий уровень плитки даёт прежде всего больше ресурсов за один поход . Время полного сбора зависит от объёма плитки и вашей общей скорости сбора. Грузоподъёмность Подробнее Чтобы полностью забрать плитку, отряду должна хватать грузоподъёмность. Более высокие ступени войск обычно позволяют одному бойцу переносить больше ресурсов. Скопировать Больше войск ≠ более высокая скорость сбора. После того как грузоподъёмности уже достаточно для выбранной плитки, дополнительные бойцы сами по себе не заставят её собираться быстрее. Как ускорить сбор Подробнее Скорость сбора складывается сразу из нескольких систем. Герои-сборщики Для каждого базового ресурса есть свой герой: Клорис Мясо Юджин Древесина Чарли Уголь Смит Железо Их навык сбора увеличивает скорость соответствующего ресурса от +5% до +25% . Скопировать Важно: на сбор лучше ставить подходящего героя вручную. Автоматический подбор может выбрать более сильного боевого героя, который не даст нужного экономического бонуса. Исследования В Научном центре → Экономика есть отдельные исследования скорости сбора мяса, древесины, угля и железа. Это п"},{"title":"Снегоуборщики","url":"snowplow.html","description":"«Снегоуборщики» - мини-игра, где нужно расчищать заснеженные области, экономить топливо, спасать выживших, собирать уголь и постепенно усиливать снегоуборщик.","text":"Снегоуборщики «Снегоуборщики» - мини-игра, где нужно расчищать заснеженные области, экономить топливо, спасать выживших, собирать уголь и постепенно усиливать снегоуборщик. Снегоуборщики ТОПЛИВО - ГЛАВНЫЙ РЕСУРС НЕ ЧИСТИТЕ ВСЁ ПОДРЯД БАЗОВЫЙ МАРШРУТ ТОПКА СНАЧАЛА ТОПКА, ПОТОМ СНЕГ УГОЛЬ ЗДОРОВЬЕ ЧТО БУДЕТ ПРИ 0 HP ВЫЖИВШИЕ СНЕГОВИКИ ЗВЕРИ ЗАКОПАННЫЕ СУНДУКИ СНЕЖНАЯ БУРЯ ПОЛЕЗНЫЕ ПРЕДМЕТЫ ГЛАВНОЕ ПРАВИЛО 95% ЭКИПИРОВКА СНЕГОУБОРЩИКА ЧТО КАЧАТЬ В ПЕРВУЮ ОЧЕРЕДЬ Белая Мгла • Снегоуборщики Главная › События › Снегоуборщики Снегоуборщики «Снегоуборщики» - мини-игра, где нужно расчищать заснеженные области, экономить топливо, спасать выживших, собирать уголь и постепенно усиливать сн… Отдельный гайд события Снегоуборщики «Снегоуборщики» - мини-игра, где нужно расчищать заснеженные области, экономить топливо, спасать выживших, собирать уголь и постепенно усиливать снегоуборщик. Событие длится: 3 ДНЯ . Главный принцип: не очищать всё подряд, а тратить топливо только там, где это помогает пройти область или получить действительно полезную награду. ТОПЛИВО - ГЛАВНЫЙ РЕСУРС В начале события вы получаете 200 ТОПЛИВА . Топливо расходуется на: очистку снега; спасение замёрзших выживших; борьбу со зверями; борьбу со снеговиками. Автоматически восстанавливается: 8 ТОПЛИВА КАЖДЫЕ 5 МИНУТ . Также дополнительное топливо можно получать из ежедневных заданий и за некоторые действия на карте. НЕ ЧИСТИТЕ ВСЁ ПОДРЯД Главная ошибка - пытаться открыть каждый квадрат снега. Лучше двигаться только туда, где есть: выживший; полезный путь к топке; снеговик; сундук; полезный предмет; нужная цель. Каждая лишняя петля маршрута означает дополнительный расход топлива. БАЗОВЫЙ МАРШРУТ Для большинства областей удобно использовать такой порядок: Найти ближайших выживших. Собрать доступный уголь. Улучшить топку. Посмотреть, какой снег она очистила автоматически. Проложить короткий маршрут к следующим полезным объектам. Добрать нужный процент очистки. На 95% использовать ракету. Главное: не прокладывать маршрут заранее через снег, который потом бесплатно уберёт улучшенная топка. ТОПКА Уголь используется для улучшения топки внутри текущей области. Улучшенная топка: автоматически очищает снег вокруг себя; увеличивает область автоматической очистки; повышает температуру; уменьшает базовый расход топлива снегоуборщика; создаёт безопасную область для восстановления здоровья. Поэтому топку обычно выгодно улучшать как можно раньше . СНАЧАЛА ТОПКА, ПОТОМ СНЕГ Если возле топки лежит большой участок снега, не спешите очищать его вручную. Сначала: соберите уголь → улучшите топку → посмотрите новую область её действия. Часть снега может исчезнуть автоматически. Это позволяет сохранить много топлива. УГОЛЬ Уголь нужен только для улучшения топки в текущей области . После завершения области он сбрасывается. Поэтому нет смысла заканчивать этап с огромным запасом угля,"},{"title":"Должности на государстве","url":"state-positions.html","description":"Министры дают временные бонусы для развития, лечения и боя, а Президент также может назначать игрокам наказания, снижающие определённые характеристики.","text":"Должности на государстве Министры дают временные бонусы для развития, лечения и боя, а Президент также может назначать игрокам наказания, снижающие определённые характеристики. Должности на государстве Назначение Министры Вице-президент Министр внутренних дел Министр здравоохранения Министр обороны Министр стратегии Министр образования Как получить должность Очередь Запись по времени Какую должность брать Наказания Испытание алчности Испытание ленности Испытание похоти Испытание мятежника Белая Мгла • Должности на государстве Главная › Должности на государстве Должности на государстве Министры дают временные бонусы для развития, лечения и боя, а Президент также может назначать игрокам наказания, снижающие определённые характерист… Министры Назначение Наказания Содержание Назначение Министры Как получить должность Какую должность брать Наказания Полезно знать Короткий режим: открывай только нужные разделы. Раскрыть все 👑 Руководство для президента Отдельный раздел с памятками и инструкциями для управления государством. › Назначение Подробнее После захвата Солнечного замка Президент получает возможность назначать игроков на государственные должности. В разделе «Назначение» есть две категории: Министры — полезные должности с временными бонусами. Наказание — отрицательные назначения, снижающие характеристики игрока. Должности особенно полезны перед строительством, исследованиями, тренировкой войск, лечением и крупными сражениями. Министры Подробнее Вице-президент Одна из самых универсальных должностей для развития. +10% к скорости строительства. +10% к скорости исследований. +10% к скорости тренировок. Лучше всего получать перед запуском долгого строительства или исследования. Министр внутренних дел +80% к скорости производства ресурсов. Полезен для увеличения производства ресурсов внутри города. Министр здравоохранения +100% к скорости лечения. +5 000 к вместимости медпункта. Особенно полезен после крупных сражений, когда необходимо быстро вылечить большое количество войск. Министр обороны +10% к смертоносности войск. Боевая должность для усиления армии перед важными сражениями. Министр стратегии +5% к атаке войск. +2 500 к вместимости при отправке. Полезен перед атакой, рейдом и другими боями, где важны сила и размер отправляемого отряда. Министр образования +50% к скорости тренировок. +200 к вместимости тренировок. Одна из самых полезных должностей для массовой тренировки войск, особенно во время событий, где за тренировку начисляются очки. Как получить должность Подробнее На должности министров можно записываться заранее. Очередь Игрок подаёт заявку на нужную должность и ждёт своей очереди. Когда очередь подходит, игрок получает должность и её бонусы. Запись по времени Можно выбрать подходящий временной слот в пределах следующих 24 часов . Один слот должности длится 30 минут . Скопировать Совет: заранее подготовьте ресурсы, ускорения и всё не"},{"title":"Мощь государства","url":"state-power.html","description":"«Мощь государства» — главное межгосударственное событие, которое игроки обычно называют SvS / State vs State .","text":"Мощь государства «Мощь государства» — главное межгосударственное событие, которое игроки обычно называют SvS / State vs State . Мощь государства 4 ОСНОВНЫЕ ФАЗЫ 1. ПОДБОР СОПЕРНИКА 2. ПОДГОТОВКА К SvS ГЛАВНОЕ В ПОДГОТОВКЕ ПОДГОТОВКА — ОБЩИЙ РЕЗУЛЬТАТ ГОСУДАРСТВА 3. БОЕВАЯ ФАЗА СОЛНЕЧНЫЙ ЗАМОК ПОСЛЕДНИЕ 4 ЧАСА ТОЖЕ ВАЖНЫ ОЧКИ ЗА PvP ПЕРЕХОД В ДРУГОЕ ГОСУДАРСТВО ЕСЛИ НЕ УЧАСТВУЕТЕ В PvP 4. ВОССТАНОВЛЕНИЕ ВОЙСК ПРЕЗИДЕНТСТВО ОБЫЧНАЯ БИТВА ЗА ЗАМОК И SvS — НЕ ОДНО И ТО ЖЕ НЕ ПУТАЙТЕ С ПЕРЕНОСОМ ГОСУДАРСТВА ЧТО ДЕЛАТЬ МЕЖДУ SvS ЧТО ДЕЛАТЬ ИГРОКУ Белая Мгла • Мощь государства Главная › События › Мощь государства Мощь государства «Мощь государства» — главное межгосударственное событие, которое игроки обычно называют SvS / State vs State . Обзор события Мощь государства Автор - Sova «Мощь государства» — главное межгосударственное событие, которое игроки обычно называют SvS / State vs State . Два государства становятся соперниками и проходят полный цикл: подбор соперника → подготовка → межгосударственная битва → восстановление войск. На сайте подробная тактика разделена на две отдельные страницы: Подготовка к SvS и SvS: боевая фаза . Главная задача этой страницы: Показать весь цикл SvS целиком и не дублировать уже готовые подробные гайды. 4 ОСНОВНЫЕ ФАЗЫ Полный цикл состоит из четырёх частей: Подбор соперника . Подготовка . Боевая фаза . Восстановление войск . Каждая часть влияет на общий результат события. 1. ПОДБОР СОПЕРНИКА Подбор обычно занимает около 2 дней . Как правило, в субботу начинается подбор, а в воскресенье становится известен соперник. После этого можно изучить государство противника и заранее готовиться к будущему противостоянию. Формула подбора полностью не раскрыта Не используем как правило сомнительные советы вроде снятия снаряжения, сброса героев или искусственного уменьшения отображаемой мощности. Надёжного подтверждения, что это даст более слабого соперника, нет. 2. ПОДГОТОВКА К SvS После определения соперника начинается подготовительная фаза. Она длится примерно 5 дней + 10 часов . Государства соревнуются по очкам развития. В разные дни могут учитываться: Огненные кристаллы; Очищенные огненные кристаллы; осколки Огненных кристаллов; строительство; исследования; обучение и повышение войск; развитие героев; питомцы; снаряжение губернатора; талисманы; Камни эссенции; Виджеты; Мифрил; развитие Экспертов; ускорения. ГЛАВНОЕ В ПОДГОТОВКЕ Не тратьте редкие материалы сразу после получения. Для SvS особенно выгодно заранее копить: Огненные кристаллы; ускорения; фрагменты героев; материалы питомцев; материалы губернатора; Камни эссенции; Виджеты; Мифрил; материалы Экспертов. Затем используйте их именно в тот день, когда они дают очки. Подробный гайд Все дни, материалы и стратегия накопления уже разобраны на странице «Подготовка к SvS» . Перед каждой тратой всё равно проверяем текущие задания 58 государства . ПОДГОТОВКА — ОБЩИЙ РЕЗУЛЬТАТ ГОСУДАРСТВА В подготовительной фазе важен суммарный ре"},{"title":"Подготовка к SvS","url":"svs-prep.html","description":"Подготовка к SvS — соревновательная стадия между двумя государствами перед основной битвой.","text":"Подготовка к SvS Подготовка к SvS — соревновательная стадия между двумя государствами перед основной битвой. Подготовка к SvS ПЕРЕД НАЧАЛОМ ДЕНЬ 1 — РАЗВИТИЕ ГОРОДА КАК ИГРАТЬ ДЕНЬ 1 ДЕНЬ 2 — СБОР И РАЗВИТИЕ ХИТРОСТЬ СО СБОРОМ КОЛЕСО ФОРТУНЫ ФРАГМЕНТЫ ГЕРОЕВ ДЕНЬ 3 — ОХОТА ЭНЕРГИЯ ПИТОМЦЫ В СРЕДУ ИЛИ ПЯТНИЦУ? ДЕНЬ 4 — ВОЕННАЯ ПОДГОТОВКА ОБУЧЕНИЕ И ПОВЫШЕНИЕ ВОЙСК МАТЕРИАЛЫ ГЕРОЕВ ДЕНЬ 5 — ФИНАЛЬНЫЙ РЫВОК ПЯТНИЦА НЕ ОЗНАЧАЕТ «ПОТРАТИТЬ ВСЁ» ЭКСПЕРТЫ ЧТО КОПИТЬ ЗАРАНЕЕ Белая Мгла • Подготовка к SvS Главная › События › Подготовка к SvS Подготовка к SvS Подготовка к SvS — соревновательная стадия между двумя государствами перед основной битвой. Отдельный гайд события Подготовка к SvS Автор - Sova Подготовка к SvS — соревновательная стадия между двумя государствами перед основной битвой. В течение пяти основных дней игроки набирают очки за развитие города, героев, войск, питомцев, Экспертов и другие действия. Главная идея подготовки: не тратить ценные материалы сразу после получения, а использовать их в тот день, когда за них дают очки. Официально вся подготовительная фаза длится примерно 5 дней + 10 часов . После неё начинается боевая стадия SvS. ПЕРЕД НАЧАЛОМ Перед каждой подготовкой обязательно проверяйте список заданий непосредственно в игре. Для 58 государства это главный источник. По мере развития государства в задания могут добавляться: новые типы Огненных кристаллов; питомцы; Эксперты; новые материалы улучшения; другие системы развития. Поэтому старые таблицы из ранних государств могут быть неполными. ДЕНЬ 1 — РАЗВИТИЕ ГОРОДА Основной упор первого дня — развитие города и связанные ускорения. Очки могут давать: использование Огненных кристаллов; использование Очищенных огненных кристаллов; использование осколков Огненных кристаллов; ускорения строительства; ускорения исследований; ускорения обучения и повышения войск; ускорения изучения навыков Экспертов; развитие талисманов губернатора. КАК ИГРАТЬ ДЕНЬ 1 Лучше заранее подготовить крупные улучшения зданий. Перед нажатием последнего улучшения проверьте: активные государственные бонусы; распоряжения; бонусы питомцев; бонусы Экспертов; другие доступные ускорения строительства. Если вам не нужно бороться за высокий рейтинг, необязательно использовать все виды ускорений уже в первый день. Многие из них снова принесут очки позже. ДЕНЬ 2 — СБОР И РАЗВИТИЕ Во второй день появляется значительно больше способов набора очков. Обычно учитываются: сбор ресурсов на карте; вращения Колеса фортуны; использование подходящих фрагментов героев; Огненные кристаллы; Очищенные огненные кристаллы; осколки Огненных кристаллов; ускорения строительства; ускорения исследований; ускорения обучения; ускорения изучения навыков Экспертов; Печати Экспертов; Книги знаний. ХИТРОСТЬ СО СБОРОМ Не обязательно начинать сбор только после начала второго дня. Ещё вечером первого дня можно отправить отряды на б"},{"title":"SvS — боевая фаза","url":"svs.html","description":"После подготовки начинается межгосударственная боевая стадия. Здесь два государства могут сражаться друг с другом, перемещаться между серверами и бороться за Солнечный замок. Для р","text":"SvS — боевая фаза После подготовки начинается межгосударственная боевая стадия. Здесь два государства могут сражаться друг с другом, перемещаться между серверами и бороться за Солнечный замок. Для результата важны не случайные одиночные а SvS — боевая фаза КАК УСТРОЕНЫ 12 ЧАСОВ ГЛАВНАЯ ЦЕЛЬ — СОЛНЕЧНЫЙ ЗАМОК ЗАМОК И 4 БАШНИ АТАКУЕМ РЕЙДАМИ ПОСЛЕ ЗАХВАТА — СРАЗУ ПОДКРЕПЛЕНИЯ МЕЖГОСУДАРСТВЕННЫЕ ПЕРЕМЕЩЕНИЯ АВТОРЕЙД И АВТООХОТА ОЧКИ ЗА PvP ЛИЧНЫЕ ОЧКИ У ЗАМКА ГОСПИТАЛЬ И ПОТЕРИ ВОЗРОЖДЕНИЕ ВОЙСК ЕСЛИ НЕ УЧАСТВУЕТЕ В АКТИВНОМ PvP ЧИТАЙТЕ ОТЧЁТЫ ПРЕЗИДЕНТСТВО ЧТО ДЕЛАТЬ УЧАСТНИКУ ЧТО ДЕЛАТЬ R4/R5 ЧАСТЫЕ ОШИБКИ Белая Мгла • SvS — боевая фаза Главная › События › SvS — боевая фаза SvS — боевая фаза После подготовки начинается межгосударственная боевая стадия. Здесь два государства могут сражаться друг с другом, перемещаться между серверами и б… Отдельный гайд события SvS — боевая фаза Автор - Sova После подготовки начинается межгосударственная боевая стадия. Здесь два государства могут сражаться друг с другом, перемещаться между серверами и бороться за Солнечный замок. Для результата важны не случайные одиночные атаки, а координация всего государства: рейды, башни, подкрепления, защита городов и контроль времени. КАК УСТРОЕНЫ 12 ЧАСОВ Вся боевая фаза SvS длится 12 часов . Первые 2 часа — свободные межгосударственные перемещения и PvP-бои. Следующие 6 часов — основная битва за Солнечный замок. Последние 4 часа — снова свободные межгосударственные перемещения и PvP-бои. Не путайте эти таймеры с обычной «Битвой за замок»: у SvS свои правила и своя длительность. ГЛАВНАЯ ЦЕЛЬ — СОЛНЕЧНЫЙ ЗАМОК Центральная часть SvS — борьба за Солнечный замок. Чтобы выиграть замковую часть, государство должно: удерживать Солнечный замок 3 часа подряд ; или, если никто не смог удержать его 3 часа непрерывно, иметь наибольшее суммарное время контроля по окончании замковой битвы. Для SvS используем правило 3 часа / 6 часов. Цифры 2,5 часа и 5 часов относятся к другой версии обычной Битвы за замок и сюда не переносятся. ЗАМОК И 4 БАШНИ Вокруг Солнечного замка находятся четыре орудийные башни. Если башню держит противник, она создаёт дополнительное давление на гарнизон Замка. Основная группа работает по Замку. Отдельные группы контролируют башни. Свободные игроки держат походы для подкреплений и быстрых перебросок. Не складывайте всё государство в одну точку без команды руководства. АТАКУЕМ РЕЙДАМИ Против сильного гарнизона главная ударная сила — организованные рейды. R4/R5 и руководство государства заранее определяют: кто создаёт основные рейды; какие герои используются; какой состав войск нужен; кто работает по Замку, а кто по башням; когда отправлять подкрепления. Не открывайте случайные рейды без команды: они дробят сильных игроков и мешают синхронизации атак. ПОСЛЕ ЗАХВАТА — СРАЗУ ПОДКРЕПЛЕНИЯ Сам захват Замка ещё не означает победу. После входа нужно немедленно укреплять гарнизон. пополняйте освободившиеся места; заменяйте ослабленные отряды; следите за приближающимися вражескими рейдами"},{"title":"Войска","url":"troops.html","description":"Типы войск, ступени развития, Кристаллы огня, обучение и повышение.","text":"Войска Типы войск, ступени развития, Кристаллы огня, обучение и повышение. Войска Три типа войск Преимущество типов войск Обычные ступени войск Повышение старых войск Войска кристалла огня Войска солнца, 11-я ступень Возвышенные войска, 12-я ступень Материалы для открытия 12-й ступени Технология пламени А 13-я ступень? Как читать развитие войск Как развивать армию Состав армии Перед крупным боем Белая Мгла • Войска Главная › База знаний › Войска Войска Типы войск, ступени развития, Кристаллы огня, обучение и повышение. Пехота Копейщики Стрелки Кристаллы огня 11-я / 12-я ступень Содержание Три типа войск Преимущество типов войск Обычные ступени войск Повышение старых войск Войска кристалла огня Войска солнца, 11-я ступень Возвышенные войска, 12-я ступень Материалы для открытия 12-й ступени Технология пламени А 13-я ступень? Как читать развитие войск Как развивать армию Состав армии Перед крупным боем Короткий режим: открывай только нужные разделы. Раскрыть все Три типа войск Подробнее Армия в «Белой Мгле: Выживание» состоит из трёх типов войск: Пехота Передняя линия. Принимает на себя основной урон и защищает остальные войска. Копейщики Средняя линия. Наносят урон и в некоторых случаях способны атаковать стрелков противника в заднем ряду. Стрелки Задняя линия. Наносят высокий урон, пока пехота удерживает передний ряд. Преимущество типов войск Подробнее Скопировать Пехота → Копейщики → Стрелки → Пехота Пехота сильнее против копейщиков. Копейщики сильнее против стрелков. Стрелки сильнее против пехоты. Скопировать Важно: в Освоении классовое преимущество работает: Пехота → Копейщики → Стрелки , +10% урона . На Арене эта контр-система не применяется. Обычные ступени войск Подробнее До поздней игры войска развиваются от 1-й до 10-й ступени . Высокие ступени открываются при развитии соответствующего военного лагеря: 4-я ступень Топка 11 5-я ступень Топка 13 6-я ступень Топка 16 7-я ступень Топка 19 8-я ступень Топка 22 9-я ступень Топка 26 10-я ступень Топка 30 Чем выше ступень, тем сильнее войска, но тем больше ресурсов и времени требуется для их обучения. Повышение старых войск Подробнее Когда военный лагерь достигает 13 уровня , становится доступно повышение войск более низких ступеней. На самом раннем этапе сначала полезно создать достаточно армии, чтобы заполнять доступные очереди походов. Когда войск уже достаточно, старые низкие ступени выгодно постепенно повышать до самой высокой доступной вместо того, чтобы постоянно держать большую массу слабых войск. Скопировать События: массовое обучение и повышение удобно совмещать с событиями, в которых за это начисляются очки. Войска кристалла огня Подробнее После перехода военных лагерей на уровни кристалла огня соответствующий тип войск получает дополнительные характеристики и навыки. Это не новая 11-я, 12"},{"title":"Торговый путь в тундре","url":"tundra-trade-route.html","description":"«Торговый путь в тундре» — событие, в котором губернаторы отправляют грузовики с товарами, защищают свои конвои и совершают рейды на грузовики других игроков.","text":"Торговый путь в тундре «Торговый путь в тундре» — событие, в котором губернаторы отправляют грузовики с товарами, защищают свои конвои и совершают рейды на грузовики других игроков. Торговый путь в тундре Ежедневные лимиты Как работает доставка Качество грузовика Обновление грузовика Когда тратить алмазы Смотрим не только на цвет Сопровождение Как защищать ценный груз Помощь союзников Вспомогательный отряд Сила грузовика может меняться Когда отправлять ценный груз Рейды Как выбирать цель Что обычно ценнее Неудачный рейд Повторные ограбления Белая Мгла • Торговый путь в тундре Главная › События › Торговый путь в тундре Торговый путь в тундре «Торговый путь в тундре» — событие, в котором губернаторы отправляют грузовики с товарами, защищают свои конвои и совершают рейды на грузовики друг… Отдельный гайд события Торговый путь в тундре Автор - Sova «Торговый путь в тундре» — событие, в котором губернаторы отправляют грузовики с товарами, защищают свои конвои и совершают рейды на грузовики других игроков. Здесь есть две задачи: сохранить как можно больше собственного груза и забирать действительно ценные награды у подходящих целей . Главный принцип: важен не цвет грузовика, а ценность груза и вероятность его сохранить или успешно забрать. 4 отправки в день Ежедневный лимит своих грузовиков. 2 одновременно Столько ваших грузовиков может быть в пути. 4 успешных рейда Ежедневный лимит успешных ограблений. 1 бесплатное обновление Первое обновление каждого нового грузовика бесплатно. Ежедневные лимиты Обычно доступно: 4 отправки грузовиков в день . До 2 грузовиков одновременно в пути. До 4 успешных рейдов в день . Поэтому каждую попытку лучше использовать осознанно. Как работает доставка Перед отправкой грузовика вы видите: качество грузовика; содержимое груза; героев сопровождения; возможную помощь союзника. После отправки грузовик отправляется по маршруту. Если он успешно доходит до места назначения, вы получаете оставшийся груз. Но во время пути другие подходящие игроки могут попытаться его ограбить. Качество грузовика Чем выше качество грузовика, тем потенциально ценнее его груз. Но есть обратная сторона: ценные грузовики привлекают больше рейдеров . Поэтому максимальное качество не всегда означает максимальную выгоду. Иногда грузовик попроще с нужными вам материалами лучше, чем редкий груз, который с большой вероятностью разграбят. Обновление грузовика Для каждого нового грузовика первое обновление качества: БЕСПЛАТНО Следующие обновления используют: Ваучеры грузовика Ваучеры можно получать в «Сражении альянсов» . Если ваучеров не осталось, игра может предложить продолжить обновления за алмазы. Не нажимайте автоматически. Сначала посмотрите, насколько плох текущий груз. Когда тратить алмазы Алмазы оправданы только тогда, когда потенциальное улучшение действительно для вас ценно. Например, если текущий груз состоит из обычных ресурсов, а вам нужны редкие материалы развития, дополнительное обновление "},{"title":"Новости госа 58","url":"whitefox-elena-38-39.html","description":"WhiteFox News: новости государства 58, недели 38–39.","text":"Новости госа 58 WhiteFox News: новости государства 58, недели 38–39. Новости госа 58 Новые герои Форты. Битва топов Форты. Битва малышей Замок Белая Мгла • Новости госа 58 Главная › Новости › WhiteFox News › Новости госа 58 Новости госа 58 WhiteFox News: новости государства 58, недели 38–39. 📜 WHITEFOX NEWS • ГОСУДАРСТВО 58 Новости госа 58 Неделя 38–39 Автор — Elena Из дневника Elena «Дорогой дневник, мне не передать словами эту ..» Елена отложила ручку. Сделала 10 глубоких вдохов. 2 капсулы магния. Ладно, *** с вами, едем дальше За прошедшие две недели мы увидели много интересных поворотов в истории сервера. Были интересные битвы, переходы, ожидаемые и неожиданные союзы, уходы из игры, новые сплетни и новый президент. А еще были новые события, и мы активно тестировали новых персонажей) Есть что вспомнить, давайте вспомним 😌 ⭐ Новые герои Мия Про эту девочку говорили еще до ее появления, можно выбить в колесе фортуны. Но супер результат вы увидите, если начнете качать ее особое снаряжение. Я наслаждаюсь очками на мишке 😋 Логан Рекомендуется для рейдеров в защите гарнизона. Но вроде в присоединение тоже можно в гарнизон. Пока наблюдали его в действии у Адмирала на замке. Возьмете Логана? ☺ Грек Либо у вас есть лишние бабки, либо нет Алонсо и надо бы желтого стрелка уже. Но это мои мысли 😌 🏰 Форты. Битва топов Открыли сезон ARM и ZOV в 08:00 по мск, пока я еще сладко спала. Тут сработала тактика последнего захвата и Форт ушел команде ZOV. Киты тоже сладко спали (наверное), команды справлялись без их усиления. 2 часа 😱 Вечером продолжили на крепости. В этот раз киты пришли поддержать команду. Успели проснуться и устать после рабочего дня. Крепость забрали ARM. Уже без тактики последнего захвата, командная работа и никакого мошенничества 😉 ⚔️ Форты. Битва малышей В начале сезона схлестнулись на Форте №6: TS1, SPB, Sve, RUS и простите, кого забыла. Битва была эпичная. Командная работа и стремление к победе били ключом. А рейдер TS1 обещал никогда не бросать свой альянс 💙 На прошедшей неделе следили (и принимали участие) за битвой FOX и WOW. Бились до последнего, выбивали друг друга рейдами, крепили, лечились и опять выбивали. И снова сыграла тактика последнего захвата 😌 👑 Замок Перестаю любить это мероприятие 😔 Нас ждал союз ZOV и Ночи. Зимба был на башне. Рейды водили Алексей Воин (приветик), DK и Ночь. О, они выбивали. Тактика была хорошая. Тайминг местами был превосходный. Что заметила: в гарнизоне работали статы Ночи 👀 Но замок все же взяли ARM. Опять же командная работа и никакого мошенничества. Ба"},{"title":"Новости госа 58","url":"whitefox-elena-40-41.html","description":"WhiteFox News: новости государства 58, недели 40–41.","text":"Новости госа 58 WhiteFox News: новости государства 58, недели 40–41. Новости госа 58 Смутные времена закончились Битва в каньоне SvS. Третья серия Битва за замок Утро после битвы Вопросы Белая Мгла • Новости госа 58 Главная › Новости › WhiteFox News › Новости госа 58 Новости госа 58 WhiteFox News: новости государства 58, недели 40–41. 📜 WHITEFOX NEWS • ГОСУДАРСТВО 58 Новости госа 58 Недели 40–41 Автор — Elena 🌚 Смутные времена закончились Вот и прошли смутные времена. Закончилось правление Романа (или Карата?). За эти недели мы наблюдали интересные изгнания, загадочные назначения и расписание бафов, вероятно, подчинявшееся особой логике, которую нам никогда не суждено постичь. Впереди светлое будущее, новый президент и надежда на то, что хотя бы строительство теперь будет по расписанию 😌 🎢 Битва в каньоне Познакомились с новым событием — «Битва в каньоне». Три альянса, одна карта, куча зданий и коллективное непонимание происходящего 👀 Все дружно читали гайды, пытались разобраться в механиках, захватывали здания, выбивали друг друга и с переменным успехом понимали, зачем вообще всё это делаем 😛 Но было интересно..? Теперь будем встречаться в каньоне раз в месяц по субботам. Как вам событие? Разобрались или тоже действовали по принципу «вижу здание — бегу»? 😅 🏆 SvS. Третья серия Третья серия нашего любимого сериала «Подготовку проиграли, но замок не отдадим»! На этот раз противником стал 51-й гос. Ребята постарше, киты помощнее, бм побольше. Но, как выяснилось, одними цифрами замки не захватываются 😌 Наш гос объединился как никогда! Заранее продумали оборону, выстроили линии защиты. А столько топок на чёрной земле я ещё не видела! Малыши пришли поддержать китов, занимали позиции и защищали территорию. Вот это командная работа 💙 🏰 Битва за замок Для меня самая интересная битва за замок за всю историю наших SvS! Правил не было, топки горели, места освобождались силой, рейды летели со всех сторон. Пять часов напряжённой борьбы, а судьба замка решилась буквально в последние 20 минут! 😱 ARM отстояли замок. ZOV, MOM, HDA, VgB, RUS храбро держали башни! 🏆 А после битвы на 51-м госе внезапно загорелись топки 🔥 Соседи жаловались на наш визит. Ну а что хотели? Мы гостеприимные, но и в гости ходить любим 😏 💰 Утро после битвы Говорят, на утро после битвы Адмирал устроил благотворительную акцию. Каждый мог пополнить запасы ресов и сохранить отчёт об атаке на главного кита 👀 Говорят, благотворительный фонд составил около 40 миллиардов ресов. 🔎 Вопросы • что/кто там опять на Садовом? • новые пополнения у момосят? • что любят момосята, кроме пенного? • в сост"},{"title":"Зимняя осада","url":"winter-siege.html","description":"«Зимняя осада» - большое PvP-событие для альянсов, где два альянса защищают свои крепости и атакуют крепости противника.","text":"Зимняя осада «Зимняя осада» - большое PvP-событие для альянсов, где два альянса защищают свои крепости и атакуют крепости противника. Зимняя осада КТО МОЖЕТ УЧАСТВОВАТЬ КАК ПРОХОДИТ НЕДЕЛЯ У КАЖДОГО ИГРОКА 2 ОТРЯДА ПОДГОТОВКА ОЧЕНЬ ВАЖНА КРЕПОСТИ КОЛИЧЕСТВО КРЕПОСТЕЙ МОЖЕТ МЕНЯТЬСЯ ЗВЁЗДЫ - ЭТО СЧЁТ СЕРДЦА СТРАЖ ДУХ КАК СНИЖАЕТСЯ ДУХ ПРОИГРАТЬ АТАКУ ИНОГДА ПОЛЕЗНО ПОТЕРЯ СЕРДЦА ВОССТАНАВЛИВАЕТ ДУХ РОЛЬ СЛАБЫХ ИГРОКОВ РОЛЬ СИЛЬНЫХ ИГРОКОВ ПОПЫТКИ АТАК НЕ ТЕРЯЙТЕ ВОССТАНОВЛЕННЫЕ АТАКИ Белая Мгла • Зимняя осада Главная › События › Зимняя осада Зимняя осада «Зимняя осада» - большое PvP-событие для альянсов, где два альянса защищают свои крепости и атакуют крепости противника. Гайд события Зимняя осада Автор - Sova «Зимняя осада» - большое PvP-событие для альянсов, где два альянса защищают свои крепости и атакуют крепости противника. Здесь недостаточно просто иметь самых сильных игроков. Победу определяют: звёзды; сердца гарнизонов; Дух; Стражи; маршруты между крепостями; ограниченные попытки атак; координация всего альянса. Главный принцип: ВСЕ АТАКУЮТ ПО ОДНОМУ ПЛАНУ. КТО МОЖЕТ УЧАСТВОВАТЬ Для альянса: ТОП-20 ПО МОЩНОСТИ В ГОСУДАРСТВЕ Для игрока: Топка 25 уровня или выше ; находиться в подходящем альянсе во время подбора соперника. Если перейти в другой альянс во время события, для полноценного участия может потребоваться вернуться в исходный альянс. КАК ПРОХОДИТ НЕДЕЛЯ Обычная последовательность: Понедельник-вторник: предварительный этап и подбор соперника. Среда-четверг: подготовка отрядов и гарнизонов. Пятница: разведка противника. Суббота: основная битва. Воскресенье: результаты и награды. Точное время всегда смотрим в текущем таймере события. У КАЖДОГО ИГРОКА 2 ОТРЯДА Во время подготовки создаются: 2 БОЕВЫХ ОТРЯДА Каждый состоит из: героев; войск; выбранной пропорции войск. Эти же два отряда защищают ваши крепости и затем атакуют противника. Отдельного атакующего состава в день боя создавать не нужно. ПОДГОТОВКА ОЧЕНЬ ВАЖНА После завершения подготовительной фазы состав фиксируется. Поэтому заранее проверьте: героев; снаряжение; Виджеты; пропорцию войск; распределение двух отрядов; крепость, которую они защищают. Не оставляйте регистрацию на последние минуты. КРЕПОСТИ Альянс распределяет отряды по своим крепостям. Крепости связаны маршрутами . Нельзя просто выбрать любую дальнюю цель противника. Чтобы открыть следующую крепость, сначала нужно полностью уничтожить гарнизоны на связанном участке маршрута. ОДНА ПОЛНОСТЬЮ ЗАЧИЩЕННАЯ ЛИНИЯ ЛУЧШЕ ТРЁХ НАПОЛОВИНУ РАЗОБРАННЫХ. КОЛИЧЕСТВО КРЕПОСТЕЙ МОЖЕТ МЕНЯТЬСЯ «Зимняя осада» - новое событие, и разработчики уже меняли его механику. Поэтому для 58 государства не запоминаем старую схему из чужого видео. Перед подготовкой откройте текущую карту и посмотрите: сколько крепостей сейчас; сколько звёзд даёт каждая; какие между ними связи; сколько гарнизонов помещается. ЗВЁЗДЫ - ЭТО СЧЁТ Главный показ"}];

  const norm = (value) => (value || "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zа-я0-9\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  function scoreEntry(entry, query) {
    const q = norm(query);
    if (!q) return 0;
    const tokens = q.split(" ").filter(Boolean);
    const title = norm(entry.title);
    const desc = norm(entry.description);
    const text = norm(entry.text);

    let score = 0;
    if (title === q) score += 120;
    if (title.startsWith(q)) score += 80;
    if (title.includes(q)) score += 55;
    if (desc.includes(q)) score += 20;
    if (text.includes(q)) score += 12;

    for (const token of tokens) {
      if (title.includes(token)) score += 18;
      if (desc.includes(token)) score += 7;
      if (text.includes(token)) score += 3;
    }
    return score;
  }

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initSearch(root) {
    const input = root.querySelector(".site-search-input-v426");
    const results = root.querySelector(".site-search-results-v426");
    const clear = root.querySelector(".site-search-clear-v426");
    if (!input || !results || !clear) return;

    const close = () => {
      results.classList.remove("open");
      results.innerHTML = "";
      input.setAttribute("aria-expanded", "false");
    };

    const render = () => {
      const query = input.value.trim();
      clear.classList.toggle("show", !!query);

      if (query.length < 2) {
        close();
        return;
      }

      const found = SEARCH_INDEX
        .map(entry => ({ entry, score: scoreEntry(entry, query) }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, "ru"))
        .slice(0, 9);

      if (!found.length) {
        results.innerHTML =
          '<div class="site-search-empty-v426">Ничего не найдено. Попробуйте другое слово.</div>';
      } else {
        results.innerHTML = found.map(({
          entry
        }) => `
          <a class="site-search-result-v426" href="${esc(entry.url)}" role="option">
            <span class="site-search-result-title-v426">${esc(entry.title)}</span>
            ${entry.description
              ? `<span class="site-search-result-desc-v426">${esc(entry.description)}</span>`
              : ""}
            <span class="site-search-result-arrow-v426" aria-hidden="true">›</span>
          </a>
        `).join("");
      }

      results.classList.add("open");
      input.setAttribute("aria-expanded", "true");
    };

    input.addEventListener("input", render);
    input.addEventListener("focus", () => {
      if (input.value.trim().length >= 2) render();
    });
    input.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        input.value = "";
        clear.classList.remove("show");
        close();
        input.blur();
      }
      if (e.key === "Enter") {
        const first = results.querySelector("a.site-search-result-v426");
        if (first) {
          e.preventDefault();
          location.href = first.href;
        }
      }
    });

    clear.addEventListener("click", () => {
      input.value = "";
      clear.classList.remove("show");
      close();
      input.focus();
    });

    document.addEventListener("click", e => {
      if (!root.contains(e.target)) close();
    });
  }

  const start = () => document.querySelectorAll("[data-site-search]").forEach(initSearch);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();


/* =========================================================
   v451 — reading/navigation helper
   ========================================================= */
(() => {
  function initReaderV451(){
    const body = document.body;
    const route = document.querySelector('.route-page.active') || document.querySelector('.route-page');
    if(!route) return;

    // Thin reading progress line.
    if(!document.querySelector('.reader-progress-v451')){
      const progress = document.createElement('div');
      progress.className = 'reader-progress-v451';
      progress.setAttribute('aria-hidden','true');
      progress.innerHTML = '<span></span>';
      document.body.appendChild(progress);
      const bar = progress.firstElementChild;
      let ticking = false;
      const update = () => {
        ticking = false;
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        const value = Math.max(0, Math.min(1, window.scrollY / max));
        bar.style.transform = `scaleX(${value})`;
      };
      window.addEventListener('scroll', () => {
        if(!ticking){
          ticking = true;
          requestAnimationFrame(update);
        }
      }, {passive:true});
      update();
    }

    // Home remains clean.
    if(body.classList.contains('is-home-route')) return;

    const heading = route.querySelector('.page-heading-v424');
    if(!heading || route.querySelector('.reader-tools-v451')) return;

    const folds = Array.from(route.querySelectorAll('details.guide-fold-v414'));

    const tools = document.createElement('div');
    tools.className = 'reader-tools-v451';
    tools.setAttribute('aria-label','Быстрый просмотр страницы');

    const sectionsBtn = document.createElement('button');
    sectionsBtn.type = 'button';
    sectionsBtn.className = 'reader-sections-v451';
    sectionsBtn.textContent = '☰ Разделы';

    const foldsBtn = document.createElement('button');
    foldsBtn.type = 'button';
    foldsBtn.className = 'reader-folds-v451';
    foldsBtn.textContent = 'Свернуть всё';
    if(!folds.length) foldsBtn.hidden = true;

    const textBtn = document.createElement('button');
    textBtn.type = 'button';
    textBtn.className = 'reader-text-v451';

    tools.append(sectionsBtn, foldsBtn, textBtn);
    heading.insertAdjacentElement('afterend', tools);

    // Text size persisted between pages.
    let textSize = 0;
    try { textSize = Number(localStorage.getItem('bmReaderTextSize') || 0); } catch(e){}
    const applyTextSize = () => {
      body.classList.toggle('reader-large-v451', textSize === 1);
      body.classList.toggle('reader-xlarge-v451', textSize === 2);
      textBtn.textContent = textSize === 0 ? 'Aa Текст' : textSize === 1 ? 'Aa 110%' : 'Aa 120%';
    };
    applyTextSize();
    textBtn.addEventListener('click', () => {
      textSize = (textSize + 1) % 3;
      try { localStorage.setItem('bmReaderTextSize', String(textSize)); } catch(e){}
      applyTextSize();
    });

    // Collapse/expand all guide folds from one place.
    const syncFolds = () => {
      if(!folds.length) return;
      const allOpen = folds.every(f => f.open);
      foldsBtn.textContent = allOpen ? 'Свернуть всё' : 'Раскрыть всё';
    };
    folds.forEach(f => f.addEventListener('toggle', syncFolds));
    foldsBtn.addEventListener('click', () => {
      const shouldOpen = !folds.every(f => f.open);
      folds.forEach(f => { f.open = shouldOpen; });
      syncFolds();
    });
    syncFolds();

    // Universal section sheet, also for pages that never had a TOC.
    const overlay = document.createElement('div');
    overlay.className = 'reader-sections-overlay-v451';
    overlay.setAttribute('aria-hidden','true');

    const sheet = document.createElement('div');
    sheet.className = 'reader-sections-sheet-v451';

    const head = document.createElement('div');
    head.className = 'reader-sections-head-v451';
    head.innerHTML = '<strong>Разделы страницы</strong>';

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'reader-sections-close-v451';
    close.setAttribute('aria-label','Закрыть');
    close.textContent = '×';
    head.appendChild(close);

    const links = document.createElement('div');
    links.className = 'reader-sections-links-v451';

    const candidates = Array.from(route.querySelectorAll(
      '.guide-fold-title-v414, .section > h2, .section > h3, .intro h2, .news-title-row h2, .creative-v349-head h2'
    ));

    const seen = new Set();
    candidates.forEach((h, index) => {
      const label = (h.textContent || '').replace(/\s+/g,' ').trim();
      if(!label || seen.has(label) || label.length > 90) return;
      seen.add(label);
      if(!h.id) h.id = `reader-section-v451-${index}`;

      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = label;
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(h.id);
        const fold = target && target.closest('details.guide-fold-v414');
        if(fold) fold.open = true;
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden','true');
        setTimeout(() => target && target.scrollIntoView({behavior:'smooth', block:'start'}), 30);
      });
      links.appendChild(a);
    });

    // Fallback if the page uses only fold summaries.
    if(!links.children.length){
      Array.from(route.querySelectorAll('h2,h3')).slice(0,14).forEach((h,index) => {
        const label = (h.textContent || '').replace(/\s+/g,' ').trim();
        if(!label || seen.has(label)) return;
        seen.add(label);
        if(!h.id) h.id = `reader-fallback-v451-${index}`;
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = label;
        a.addEventListener('click', e => {
          e.preventDefault();
          overlay.classList.remove('open');
          h.scrollIntoView({behavior:'smooth', block:'start'});
        });
        links.appendChild(a);
      });
    }

    sheet.append(head, links);
    overlay.appendChild(sheet);
    document.body.appendChild(overlay);

    const openSheet = () => {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden','false');
    };
    const closeSheet = () => {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden','true');
    };

    sectionsBtn.addEventListener('click', openSheet);
    close.addEventListener('click', closeSheet);
    overlay.addEventListener('click', e => { if(e.target === overlay) closeSheet(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeSheet(); });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initReaderV451, {once:true});
  } else {
    initReaderV451();
  }
})();


/* =========================================================
   v452 — usability upgrade pack
   ========================================================= */
(() => {
  const UPDATED_TEXT = 'Обновлено на сайте · 15.10.2026';

  const storageGet = (key, fallback) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch(e) {
      return fallback;
    }
  };
  const storageSet = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch(e) {}
  };

  const pageKey = () => {
    const raw = location.pathname.split('/').pop() || 'index.html';
    return raw || 'index.html';
  };

  const pageTitle = () => {
    const h1 = document.querySelector('.route-page.active h1, .route-page h1');
    if (h1 && h1.textContent.trim()) return h1.textContent.trim();
    return (document.title || 'Белая Мгла').replace(/^Белая Мгла\s*[•|-]\s*/,'').trim();
  };

  const pageDescription = () => {
    const p = document.querySelector('.page-heading-v424 p, .route-page.active .intro p, .route-page .intro p');
    if (!p) return '';
    return p.textContent.replace(/\s+/g,' ').trim().slice(0,110);
  };

  /* ---------- recent pages ---------- */
  function trackRecent(){
    const key = pageKey();
    if (key === 'index.html' || key === '404.html') return;
    const recent = storageGet('bmRecentV452', []);
    const item = {
      url:key,
      title:pageTitle(),
      description:pageDescription(),
      time:Date.now()
    };
    const next = [item, ...recent.filter(x => x && x.url !== key)].slice(0,8);
    storageSet('bmRecentV452', next);
  }

  /* ---------- favorites ---------- */
  const favoriteGet = () => storageGet('bmFavoritesV452', []);
  const favoriteHas = url => favoriteGet().some(x => x && x.url === url);

  function favoriteToggleCurrent(){
    const key = pageKey();
    if (key === 'index.html' || key === '404.html') return false;
    let fav = favoriteGet();
    const exists = fav.some(x => x.url === key);
    if (exists) {
      fav = fav.filter(x => x.url !== key);
    } else {
      fav.unshift({
        url:key,
        title:pageTitle(),
        description:pageDescription(),
        time:Date.now()
      });
      fav = fav.slice(0,16);
    }
    storageSet('bmFavoritesV452', fav);
    return !exists;
  }

  /* ---------- enhance v451 reader toolbar ---------- */
  function enhanceReader(){
    if (document.body.classList.contains('is-home-route')) return;
    const tools = document.querySelector('.reader-tools-v451');
    if (!tools || tools.dataset.v452 === '1') return;
    tools.dataset.v452 = '1';

    const bookmark = document.createElement('button');
    bookmark.type = 'button';
    bookmark.className = 'reader-bookmark-v452';

    const essential = document.createElement('button');
    essential.type = 'button';
    essential.className = 'reader-essential-v452';

    const updated = document.createElement('span');
    updated.className = 'site-updated-v452';
    updated.textContent = UPDATED_TEXT;

    const refreshBookmark = () => {
      const saved = favoriteHas(pageKey());
      bookmark.classList.toggle('is-saved', saved);
      bookmark.textContent = saved ? '★ В избранном' : '☆ В избранное';
    };

    let essentialOn = false;
    try { essentialOn = localStorage.getItem('bmEssentialV452') === '1'; } catch(e){}
    const applyEssential = () => {
      document.body.classList.toggle('reader-essential-mode-v452', essentialOn);
      essential.classList.toggle('is-on', essentialOn);
      essential.textContent = essentialOn ? '✓ Только главное' : 'Только главное';
    };

    bookmark.addEventListener('click', () => {
      favoriteToggleCurrent();
      refreshBookmark();
    });

    essential.addEventListener('click', () => {
      essentialOn = !essentialOn;
      try { localStorage.setItem('bmEssentialV452', essentialOn ? '1' : '0'); } catch(e){}
      applyEssential();
    });

    tools.insertBefore(bookmark, tools.querySelector('.reader-text-v451') || null);
    tools.insertBefore(essential, tools.querySelector('.reader-text-v451') || null);
    tools.appendChild(updated);

    refreshBookmark();
    applyEssential();
  }

  /* ---------- quick summary ---------- */
  function cleanPoint(text){
    return String(text || '')
      .replace(/\s+/g,' ')
      .replace(/^[•·✦✓✅📌🔥⭐\-\s]+/,'')
      .trim()
      .slice(0,145);
  }

  function addQuickSummary(){
    if (document.body.classList.contains('is-home-route')) return;
    const route = document.querySelector('.route-page.active, .route-page');
    if (!route || route.querySelector('.quick-summary-v452')) return;

    const textLen = (route.textContent || '').replace(/\s+/g,' ').trim().length;
    if (textLen < 1000) return;

    const points = [];
    const add = text => {
      const t = cleanPoint(text);
      if (t.length < 18) return;
      if (points.some(x => x.toLowerCase() === t.toLowerCase())) return;
      points.push(t);
    };

    // Prefer existing concise material.
    route.querySelectorAll('.savebox li, .guide-fold-body-v414 li, .mini-card, .quick, .rule, .check')
      .forEach(el => {
        if (points.length < 4) add(el.textContent);
      });

    if (points.length < 3) {
      route.querySelectorAll('.guide-fold-body-v414 p, .section p, .intro p')
        .forEach(el => {
          if (points.length < 4) add(el.textContent);
        });
    }

    if (points.length < 2) return;

    const box = document.createElement('section');
    box.className = 'quick-summary-v452';
    box.innerHTML = `
      <div class="quick-summary-head-v452">
        <strong>Коротко</strong>
        <span>главное без длинного чтения</span>
      </div>
      <ul class="quick-summary-list-v452">
        ${points.slice(0,4).map(x => `<li>${x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</li>`).join('')}
      </ul>
    `;

    const tools = route.querySelector('.reader-tools-v451');
    if (tools) tools.insertAdjacentElement('afterend', box);
    else {
      const heading = route.querySelector('.page-heading-v424');
      if (heading) heading.insertAdjacentElement('afterend', box);
    }
  }

  /* ---------- home badges ---------- */
  const BADGES = {
    'events.html':['Обновлено','badge-cyan-v452'],
    'heroes.html':['Популярно','badge-purple-v452'],
    'fire-furnace-calculator.html':['Инструмент','badge-gold-v452'],
    'other.html':['Справочник','badge-purple-v452'],
    'news-elena.html':['58','badge-gold-v452'],
    'creative-corner.html':['Творчество','badge-purple-v452'],
    'gear.html':['Полезно','badge-cyan-v452'],
    'experts.html':['Приоритет','badge-purple-v452'],
    'farm.html':['Расчёт','badge-gold-v452']
  };

  function addSmartBadges(){
    if (!document.body.classList.contains('is-home-route')) return;
    const cards = document.querySelectorAll(
      '.modern-home-strip-v424 > a, .modern-topic-card-v424, .home-news-card-v442'
    );
    cards.forEach(card => {
      const href = (card.getAttribute('href') || '').split('#')[0];
      const spec = BADGES[href];
      if (!spec || card.querySelector('.smart-badge-v452')) return;
      card.style.position = 'relative';
      const badge = document.createElement('span');
      badge.className = `smart-badge-v452 ${spec[1]}`;
      badge.textContent = spec[0];
      card.appendChild(badge);
    });
  }

  /* ---------- home recent/favorites ---------- */
  const homeIconFor = url => {
    if (/events|bear|joe|castle|svs|foundry|fort|winter|alliance/.test(url)) return '✦';
    if (/hero|gear|expert|pet/.test(url)) return '◆';
    if (/calculator|furnace/.test(url)) return '▦';
    if (/news|whitefox|creative/.test(url)) return '✎';
    return '▤';
  };

  function buildHomeSmartSection(title, icon, items, emptyText){
    const section = document.createElement('section');
    section.className = 'modern-panel-v424 home-smart-section-v452';

    const head = document.createElement('div');
    head.className = 'modern-panel-head-v424';
    head.innerHTML = `<div><span class="v424-head-icon">${icon}</span><h2>${title}</h2></div>`;
    section.appendChild(head);

    const grid = document.createElement('div');
    grid.className = 'home-smart-grid-v452';

    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'home-smart-empty-v452';
      empty.textContent = emptyText;
      grid.appendChild(empty);
    } else {
      items.slice(0,4).forEach(item => {
        const a = document.createElement('a');
        a.className = 'home-smart-card-v452';
        a.href = item.url;
        a.innerHTML = `
          <span class="home-smart-card-icon-v452">${homeIconFor(item.url)}</span>
          <span class="home-smart-card-copy-v452">
            <b>${String(item.title || 'Страница').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</b>
            <small>${String(item.description || 'Быстрый возврат к материалу').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</small>
          </span>
          <i class="home-smart-card-arrow-v452">›</i>
        `;
        grid.appendChild(a);
      });
    }
    section.appendChild(grid);
    return section;
  }

  function renderHomeSmartSections(){
    if (!document.body.classList.contains('is-home-route')) return;
    const home = document.querySelector('.modern-home-v424');
    if (!home || home.querySelector('.home-smart-section-v452')) return;

    const recent = storageGet('bmRecentV452', []);
    const favorites = favoriteGet();

    const news = home.querySelector('.home-news-v442');
    const anchor = news || home.querySelector('.modern-home-columns-bottom-v424');

    const favSection = buildHomeSmartSection(
      'Избранное',
      '★',
      favorites,
      'Открой нужный гайд и нажми «☆ В избранное». Он появится здесь.'
    );

    const recentSection = buildHomeSmartSection(
      'Недавно открывали',
      '◷',
      recent,
      'Здесь появятся последние открытые гайды.'
    );

    if (anchor) {
      anchor.insertAdjacentElement('afterend', favSection);
      favSection.insertAdjacentElement('afterend', recentSection);
    } else {
      home.append(favSection, recentSection);
    }
  }

  /* ---------- filters: events ---------- */
  const EVENT_TAGS = {
    'bear.html':['pve','alliance'],
    'crazy-joe.html':['pve','alliance'],
    'mercenary-prestige.html':['pve'],
    'frostfire-mine.html':['pve'],
    'endless-trial.html':['pve'],
    'tundra-trade-route.html':['alliance'],
    'alliance-showdown.html':['alliance','development'],
    'fishing.html':['pve'],
    'snowplow.html':['pve'],
    'dreams.html':['pve'],
    'alliance-championship.html':['alliance','pvp'],
    'foundry.html':['alliance','pvp'],
    'forts.html':['alliance','pvp'],
    'castle.html':['pvp'],
    'svs-prep.html':['svs','development'],
    'svs.html':['svs','pvp'],
    'armament-competition.html':['development'],
    'state-power.html':['development'],
    'alliance-mobilization.html':['alliance','development'],
    'brothers-in-arms.html':['pvp'],
    'winter-siege.html':['alliance','pvp']
  };

  function addFilterBar(container, defs, apply){
    if (!container || container.querySelector('.smart-filters-v452')) return;
    const bar = document.createElement('div');
    bar.className = 'smart-filters-v452';

    defs.forEach((def, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'smart-filter-btn-v452' + (index === 0 ? ' active' : '');
      btn.dataset.filter = def[0];
      btn.textContent = def[1];
      btn.addEventListener('click', () => {
        bar.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
        apply(def[0]);
      });
      bar.appendChild(btn);
    });
    container.prepend(bar);
  }

  function initEventsFilters(){
    if (!document.body.classList.contains('is-events-route')) return;
    const grid = document.querySelector('.guide-nav-grid');
    if (!grid) return;
    const body = grid.parentElement;

    grid.querySelectorAll('.guide-nav-card').forEach(card => {
      const href = (card.getAttribute('href') || '').split('#')[0];
      const tags = EVENT_TAGS[href] || [];
      card.dataset.filterTags = tags.join(' ');
      if (['castle.html','svs.html','bear.html','alliance-championship.html'].includes(href)) {
        card.classList.add('smart-important-v452');
      }
    });

    addFilterBar(body, [
      ['all','Все'],
      ['alliance','Альянс'],
      ['pvp','PvP'],
      ['pve','PvE'],
      ['svs','SvS'],
      ['development','Развитие']
    ], filter => {
      grid.querySelectorAll('.guide-nav-card').forEach(card => {
        const on = filter === 'all' || (card.dataset.filterTags || '').split(' ').includes(filter);
        card.classList.toggle('filter-hidden-v452', !on);
      });
    });
  }

  /* ---------- filters: knowledge base ---------- */
  const KB_TAGS = {
    'resources.html':['resources'],
    'alliance.html':['reference'],
    '#kb-calculators':['calculations'],
    'research.html':['development'],
    'island.html':['development'],
    'troops.html':['development'],
    'buildings.html':['reference'],
    'beacon.html':['reference'],
    'newbie.html':['reference'],
    'furnace-calculator.html':['calculations'],
    'fire-furnace-calculator.html':['calculations'],
    'governor.html':['reference'],
    'arena.html':['reference'],
    'labyrinth.html':['reference'],
    'exploration.html':['reference'],
    'mails.html':['reference']
  };

  function initKnowledgeFilters(){
    if (!document.body.classList.contains('is-other-route')) return;
    const route = document.querySelector('.route-page.active, .route-page');
    if (!route || route.querySelector('.kb-filters-host-v452')) return;

    const host = document.createElement('div');
    host.className = 'kb-filters-host-v452';
    const intro = route.querySelector('.kb-intro-v415, .page-heading-v424');
    if (intro) intro.insertAdjacentElement('afterend', host);
    else route.prepend(host);

    const cards = Array.from(route.querySelectorAll(
      '.kb-card-v415, .kb-tools-grid-v415 a, .kb-more-links-v415 a'
    ));

    cards.forEach(card => {
      const href = card.getAttribute('href') || '';
      card.dataset.filterTags = (KB_TAGS[href] || ['reference']).join(' ');
      if (['resources.html','fire-furnace-calculator.html','research.html'].includes(href)) {
        card.classList.add('smart-important-v452');
      }
    });

    addFilterBar(host, [
      ['all','Все'],
      ['development','Развитие'],
      ['resources','Ресурсы'],
      ['calculations','Расчёты'],
      ['reference','Справочник']
    ], filter => {
      cards.forEach(card => {
        const on = filter === 'all' || (card.dataset.filterTags || '').split(' ').includes(filter);
        card.classList.toggle('filter-hidden-v452', !on);
      });

      route.querySelectorAll('.kb-group-v415, .kb-tools-v415, .kb-more-v415').forEach(group => {
        const groupCards = Array.from(group.querySelectorAll(
          '.kb-card-v415, .kb-tools-grid-v415 a, .kb-more-links-v415 a'
        ));
        if (!groupCards.length) return;
        const anyVisible = groupCards.some(c => !c.classList.contains('filter-hidden-v452'));
        group.classList.toggle('filter-hidden-v452', !anyVisible);
      });
    });
  }

  /* ---------- next useful guide ---------- */
  const NEXT_GUIDE = {
    'events.html':['bear.html','Охота на медведя','Один из самых часто используемых гайдов событий'],
    'bear.html':['heroes.html','Герои','Подобрать героев и понять их роли'],
    'crazy-joe.html':['alliance.html','Альянс','Подготовка и координация альянса'],
    'mercenary-prestige.html':['resources.html','Ресурсы','Что копить и куда тратить редкие материалы'],
    'frostfire-mine.html':['fire-furnace-calculator.html','Калькулятор Огненной Топки','Быстрый расчёт этапов и ресурсов'],
    'alliance-championship.html':['alliance-showdown.html','Сражение альянсов','Следующий командный формат'],
    'foundry.html':['forts.html','Битвы за форт','Ещё один гайд по координации атак'],
    'forts.html':['castle.html','Битва за замок','Переход к центральной битве государства'],
    'svs-prep.html':['svs.html','SvS: боевая фаза','Что делать после подготовки'],
    'svs.html':['castle.html','Битва за замок','Тактика по центральной точке'],
    'heroes.html':['gear.html','Снаряжение','Что усиливать после выбора героев'],
    'gear.html':['experts.html','Эксперты','Следующий приоритет развития'],
    'experts.html':['pets.html','Питомцы','Бонусы и развитие питомцев'],
    'pets.html':['heroes.html','Герои','Вернуться к связкам и ролям'],
    'research.html':['island.html','Остров','Следующий раздел развития'],
    'island.html':['troops.html','Войска','Классы и усиление армии'],
    'troops.html':['buildings.html','Здания','Что улучшать на базе'],
    'buildings.html':['beacon.html','Маяк','Задания и награды'],
    'beacon.html':['newbie.html','Новичкам','Короткий справочник для возвращения в игру'],
    'resources.html':['fire-furnace-calculator.html','Калькулятор Огненной Топки','Проверить, сколько ресурсов понадобится'],
    'news-elena.html':['creative-corner.html','Творческий уголок','Истории, песни и материалы игроков'],
    'creative-corner.html':['news-elena.html','WhiteFox News','Новости государства 58']
  };

  function addNextGuide(){
    const key = pageKey();
    const spec = NEXT_GUIDE[key];
    if (!spec || document.body.classList.contains('is-home-route')) return;
    const route = document.querySelector('.route-page.active, .route-page');
    if (!route || route.querySelector('.next-guide-v452')) return;

    const box = document.createElement('section');
    box.className = 'next-guide-v452';
    box.innerHTML = `
      <div class="next-guide-label-v452">Что открыть дальше</div>
      <a class="next-guide-link-v452" href="${spec[0]}">
        <span>
          <b>${spec[1]}</b>
          <small>${spec[2]}</small>
        </span>
        <i>›</i>
      </a>
    `;

    const footer = route.querySelector('.v69-footer');
    if (footer) footer.insertAdjacentElement('beforebegin', box);
    else route.appendChild(box);
  }

  /* ---------- empty-search suggestions ---------- */
  const POPULAR_SEARCH = [
    ['events.html','События','Гайды, правила и награды','Обновлено'],
    ['heroes.html','Герои','Связки, роли и прокачка','Популярно'],
    ['fire-furnace-calculator.html','Калькулятор Огненной Топки','Этапы и ресурсы','Инструмент'],
    ['bear.html','Охота на медведя','Рейды и составы','Гайд'],
    ['other.html','База знаний','Справочные разделы','Справочник']
  ];

  function initSearchSuggestions(){
    document.querySelectorAll('[data-site-search]').forEach(root => {
      const input = root.querySelector('.site-search-input-v426');
      const results = root.querySelector('.site-search-results-v426');
      if (!input || !results || input.dataset.v452 === '1') return;
      input.dataset.v452 = '1';

      const showSuggestions = () => {
        if (input.value.trim()) return;

        const recent = storageGet('bmRecentV452', []).slice(0,4);
        let list = recent.length
          ? recent.map(x => [x.url,x.title,x.description || 'Недавно открывали','Недавно'])
          : POPULAR_SEARCH;

        const title = recent.length ? 'Недавно открывали' : 'Популярное';
        results.innerHTML = `
          <div class="site-search-suggest-head-v452">${title}</div>
          ${list.map(item => `
            <a class="site-search-result-v426" href="${item[0]}" role="option">
              <span class="site-search-result-title-v426">${item[1]}</span>
              <span class="site-search-result-desc-v426">${item[2] || ''}</span>
              <span class="site-search-result-v452-badge">${item[3]}</span>
              <span class="site-search-result-arrow-v426" aria-hidden="true">›</span>
            </a>
          `).join('')}
        `;
        results.classList.add('open');
        input.setAttribute('aria-expanded','true');
      };

      input.addEventListener('focus', () => setTimeout(showSuggestions, 0));
      input.addEventListener('click', () => setTimeout(showSuggestions, 0));
    });
  }

  /* ---------- floating top button ---------- */
  function initBackToTop(){
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    const update = () => btn.classList.toggle('v452-visible', window.scrollY > 420);
    window.addEventListener('scroll', update, {passive:true});
    update();
  }

  function init(){
    trackRecent();
    enhanceReader();
    addQuickSummary();
    addSmartBadges();
    renderHomeSmartSections();
    initEventsFilters();
    initKnowledgeFilters();
    addNextGuide();
    initSearchSuggestions();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else {
    init();
  }
})();
