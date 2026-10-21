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
  const routeNames={home:'Главная',newbie:'Новичкам',heroes:'Герои',gear:'Снаряжение',buildings:'Здания','buildings-before-fire':'Здания до Топки 30','buildings-after-fire':'Эпоха кристалла огня',research:'Исследования',troops:'Войска',alliance:'Альянс','state-positions':'Должности на государстве',resources:'Ресурсы',governor:'Губернатор',farm:'Ферма',experts:'Эксперты',pets:'Питомцы',events:'События',other:'Другие гайды',arena:'Арена',beacon:'Маяк',mails:'Письма','alliance-showdown':'Сражение альянсов','tundra-trade-route':'Торговый путь в тундре','endless-trial':'Бесконечное испытание','mercenary-prestige':'Престиж наёмника','frostfire-mine':'Рудник ледяного огня','crazy-joe':'Безумная Джо','alliance-championship':'Чемпионат альянса',fishing:'Рыбалка',forts:'Крепости',castle:'Битва за замок',foundry:'Литейная','svs-prep':'Подготовка к SvS',svs:'SvS',dreams:'Сны',snowplow:'Снегоуборщики',bear:'Охота на медведя'};
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
    'crazy-joe':['','Безумная Джо'],
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
    ["crazy-joe.html","Безумная Джо","джо безумный джо"],
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
    'cheats.html':'cheats',
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


/* ===== v585: lazy site search ===== */
(() => {
  let indexPromise = null;
  const normalize = s => String(s || '').toLowerCase().replace(/ё/g,'е').replace(/[^\p{L}\p{N}\s-]/gu,' ').replace(/\s+/g,' ').trim();
  function loadIndex(){
    if(window.BM_SEARCH_INDEX) return Promise.resolve(window.BM_SEARCH_INDEX);
    if(indexPromise) return indexPromise;
    indexPromise = new Promise(resolve => {
      const s = document.createElement('script');
      s.src = 'search-index-v585.js?v=585';
      s.defer = true;
      s.onload = () => resolve(window.BM_SEARCH_INDEX || []);
      s.onerror = () => resolve([]);
      document.head.appendChild(s);
    });
    return indexPromise;
  }
  function init(){
    const root = document.querySelector('[data-site-search], .site-search-v426');
    if(!root) return;
    const input = root.querySelector('input[type="search"]');
    const results = root.querySelector('.site-search-results-v426');
    const clear = root.querySelector('.site-search-clear-v426');
    if(!input || !results) return;
    function close(){ results.innerHTML=''; results.classList.remove('is-open-v585'); input.setAttribute('aria-expanded','false'); }
    function render(q){
      const nq = normalize(q);
      if(nq.length < 2){ close(); return; }
      const words = nq.split(' ').filter(Boolean);
      const list = (window.BM_SEARCH_INDEX || []).map(item => {
        const title = normalize(item.title);
        const hay = normalize(item.keywords || (item.title+' '+(item.description||'')));
        let score = 0;
        words.forEach(w => { if(title.includes(w)) score += 8; if(hay.includes(w)) score += 2; });
        if(hay.includes(nq)) score += 6;
        return {item,score};
      }).filter(x => x.score > 0).sort((a,b) => b.score-a.score).slice(0,7);
      results.innerHTML='';
      if(!list.length){
        const d=document.createElement('div'); d.className='site-search-empty-v585'; d.textContent='Ничего не найдено'; results.appendChild(d);
      } else list.forEach(({item}) => {
        const a=document.createElement('a'); a.className='site-search-result-v585'; a.href=item.url;
        const b=document.createElement('b'); b.textContent=item.title;
        const s=document.createElement('small'); s.textContent=item.description || 'Открыть раздел';
        a.append(b,s); results.appendChild(a);
      });
      results.classList.add('is-open-v585'); input.setAttribute('aria-expanded','true');
    }
    input.addEventListener('focus', loadIndex, {once:true});
    input.addEventListener('input', async () => { await loadIndex(); render(input.value); });
    if(clear) clear.addEventListener('click', () => { input.value=''; close(); input.focus(); });
    document.addEventListener('click', e => { if(!root.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
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
    /* v456: disabled.
       These helper labels ("Обновлено", "Популярно", etc.) were clipping
       and visually breaking the home cards on narrow mobile layouts. */
    return;
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


/* v453 — retire the reader toolbar shown under page headers. */
(() => {
  const removeReaderStripV453 = () => {
    document.querySelectorAll('.reader-tools-v451').forEach(el => el.remove());
  };
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', removeReaderStripV453, {once:true});
  } else {
    removeReaderStripV453();
  }
  window.addEventListener('pageshow', removeReaderStripV453);
})();


/* v454 — retire the automatic "Коротко" summary block. */
(() => {
  const removeQuickSummaryV454 = () => {
    document.querySelectorAll('.quick-summary-v452').forEach(el => el.remove());
  };
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', removeQuickSummaryV454, {once:true});
  } else {
    removeQuickSummaryV454();
  }
  window.addEventListener('pageshow', removeQuickSummaryV454);
})();


/* v457 — remove the old filter interface completely. */
(() => {
  const removeFiltersV457 = () => {
    document.querySelectorAll('.smart-filters-v452, .kb-filters-host-v452').forEach(el => el.remove());
    document.querySelectorAll('.filter-hidden-v452').forEach(el => el.classList.remove('filter-hidden-v452'));
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', removeFiltersV457, {once:true});
  } else {
    removeFiltersV457();
  }
  window.addEventListener('pageshow', removeFiltersV457);
})();


/* v459 — retire home Recent/Favorites sections to keep the mobile home shorter. */
(() => {
  const removeLongHomeExtrasV459 = () => {
    document.querySelectorAll('.home-smart-section-v452').forEach(el => el.remove());
  };
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', removeLongHomeExtrasV459, {once:true});
  } else {
    removeLongHomeExtrasV459();
  }
  window.addEventListener('pageshow', removeLongHomeExtrasV459);
})();
