(() => {
  'use strict';

  const PACKS = {
    owls: [
      ['owl-01','УРА'],['owl-02','ОРУ'],['owl-03','ОТЛИЧНО'],['owl-04','СПАСИБО'],['owl-05','ВМЕСТЕ МЫ СИЛЬНЕЕ'],
      ['owl-06','НУ ВЫ ДАЕТЕ'],['owl-07','СЕРЬЕЗНО'],['owl-08','ДОБРОЕ УТРО'],['owl-09','СПОКОЙНОЙ НОЧИ'],['owl-10','НАДО РАЗОБРАТЬСЯ'],
      ['owl-11','ДУМАЮ'],['owl-12','СЛЕЖУ'],['owl-13','ПРИНЯТО'],['owl-14','КРАСАВА'],['owl-15','ГРУСТНО'],
      ['owl-16','В БОЙ'],['owl-17','КУДА ИДЕМ'],['owl-18','АЛМАЗЫ'],['owl-19','ПОБЕДА'],['owl-20','ОЙ'],
      ['owl-21','СБОР'],['owl-22','НА МЕДВЕДЯ'],['owl-23','В ФОРТЫ'],['owl-24','ГОТОВ'],['owl-25','В АТАКУ'],
      ['owl-26','ЗАМОК НАШ'],['owl-27','КОПИМ'],['owl-28','ЩИТ'],['owl-29','ПОБЕДА 58'],['owl-30','В ИГРУ']
    ].map(([id,label]) => ({id,label,src:`assets/chat-stickers/owls/${id}.png`})),
    heroes: [
      {id:'hero-mom-beer',label:'МОМ любит пиво',src:'assets/chat-stickers/heroes/mom-beer.png'},
      {id:'hero-greg-respect',label:'Грег: «С уважением»',src:'assets/chat-stickers/heroes/greg-respect.png'},
      {id:'hero-greg-no-respect',label:'Грег: «Без уважения»',src:'assets/chat-stickers/heroes/greg-no-respect.png'},
      {id:'hero-molly-report-all',label:'Молли: «Всем отчёт»',src:'assets/chat-stickers/heroes/molly-report-all.png'},
      {id:'hero-molly-where-report',label:'Молли: «Где отчёт?»',src:'assets/chat-stickers/heroes/molly-where-report.png'},
      {id:'hero-geronimo-who-guilty',label:'Джеронимо: «Кто виноват?»',src:'assets/chat-stickers/heroes/geronimo-who-guilty.png'}
    ]
  };
  const PACK_LABELS = {owls:'🦉 Совы',heroes:'🎮 Герои'};
  const TOKEN_RE = /^#sticker\|(owls|heroes)\|([a-z0-9-]+)$/i;
  const LEGACY_RE = /^#sticker\|(owls|heroes)\|(\d+)$/i;
  const form = document.getElementById('chat58Form');
  const input = document.getElementById('chat58Input');
  const send = document.getElementById('chat58Send');
  const composer = document.querySelector('.chat58-composer');
  if (!form || !input || !composer) return;

  const byId = new Map();
  Object.entries(PACKS).forEach(([pack,items]) => {
    items.forEach((item,index) => {
      byId.set(`${pack}:${item.id}`,item);
      byId.set(`${pack}:${index}`,item);
    });
  });

  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'chat58StickerBtn';
  button.className = 'chat58-sticker-btn';
  button.setAttribute('aria-label','Открыть стикеры');
  button.setAttribute('aria-expanded','false');
  button.textContent = '☺';

  const panel = document.createElement('section');
  panel.id = 'chat58StickerPanel';
  panel.className = 'chat58-sticker-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label','Стикеры');

  const tabs = document.createElement('div');
  tabs.className = 'chat58-sticker-tabs';
  tabs.setAttribute('role','tablist');

  const grid = document.createElement('div');
  grid.className = 'chat58-sticker-grid';
  grid.setAttribute('role','tabpanel');

  let activePack = 'owls';
  const tokenFor = (pack,id) => `#sticker|${pack}|${id}`;

  function getSticker(text){
    const value = String(text || '').trim();
    let m = value.match(TOKEN_RE);
    if (m) {
      const pack = m[1].toLowerCase();
      const item = byId.get(`${pack}:${m[2].toLowerCase()}`);
      return item ? {pack,item} : null;
    }
    m = value.match(LEGACY_RE);
    if (m) {
      const pack = m[1].toLowerCase();
      const item = byId.get(`${pack}:${Number(m[2])}`);
      return item ? {pack,item} : null;
    }
    return null;
  }

  function renderTabs(){
    tabs.replaceChildren();
    Object.keys(PACKS).forEach(pack => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'chat58-sticker-tab' + (pack === activePack ? ' is-active' : '');
      tab.textContent = PACK_LABELS[pack];
      tab.setAttribute('role','tab');
      tab.setAttribute('aria-selected',pack === activePack ? 'true' : 'false');
      tab.addEventListener('click',() => {
        activePack = pack;
        renderTabs();
        renderGrid();
      });
      tabs.appendChild(tab);
    });
  }

  function renderGrid(){
    grid.replaceChildren();
    PACKS[activePack].forEach(item => {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'chat58-sticker-cell';
      cell.title = item.label;
      cell.setAttribute('aria-label',item.label);
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.label;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      cell.appendChild(img);
      cell.addEventListener('click',() => {
        if (input.disabled || (send && send.disabled)) return;
        panel.hidden = true;
        button.setAttribute('aria-expanded','false');
        input.value = tokenFor(activePack,item.id);
        input.dispatchEvent(new Event('input',{bubbles:true}));
        if (typeof form.requestSubmit === 'function') form.requestSubmit();
        else form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
      });
      grid.appendChild(cell);
    });
  }

  panel.append(tabs,grid);
  form.insertBefore(button,input);
  composer.insertBefore(panel,form);
  renderTabs();
  renderGrid();

  function closePanel(){
    panel.hidden = true;
    button.setAttribute('aria-expanded','false');
  }

  button.addEventListener('click',e => {
    e.stopPropagation();
    const opening = panel.hidden;
    panel.hidden = !opening;
    button.setAttribute('aria-expanded',opening ? 'true' : 'false');
    if (opening) renderGrid();
  });
  panel.addEventListener('click',e => e.stopPropagation());
  document.addEventListener('click',closePanel);
  document.addEventListener('keydown',e => { if (e.key === 'Escape') closePanel(); });

  function hydrateStickerText(root=document){
    const nodes = [];
    if (root.nodeType === 1 && root.matches && root.matches('.chat58-text')) nodes.push(root);
    if (root.querySelectorAll) nodes.push(...root.querySelectorAll('.chat58-text'));
    nodes.forEach(node => {
      if (node.dataset.stickerHydrated === '1') return;
      const match = getSticker(node.textContent);
      if (!match) return;
      const img = document.createElement('img');
      img.className = 'chat58-sticker-message';
      img.src = match.item.src;
      img.alt = match.item.label;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      img.addEventListener('error',() => {
        node.dataset.stickerHydrated = '0';
        node.classList.remove('is-sticker');
        node.textContent = '[Стикер недоступен]';
      },{once:true});
      node.replaceChildren(img);
      node.classList.add('is-sticker');
      node.dataset.stickerHydrated = '1';
    });
  }

  hydrateStickerText();
  const messages = document.getElementById('chat58Messages');
  if (messages) {
    const observer = new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) hydrateStickerText(node);
    });
    observer.observe(messages,{childList:true,subtree:true});
  }

  window.CHAT58_STICKERS = Object.freeze({packs:Object.freeze({owls:PACKS.owls.length,heroes:PACKS.heroes.length})});
})();
