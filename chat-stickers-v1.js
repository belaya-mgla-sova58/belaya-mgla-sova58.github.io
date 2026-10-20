(() => {
  'use strict';

  const PACKS = {
    owls: [{"id":"owl-01","label":"Ура","src":"assets/chat-stickers/owls/owl-01.png"},{"id":"owl-02","label":"Ору","src":"assets/chat-stickers/owls/owl-02.png"},{"id":"owl-03","label":"Отлично","src":"assets/chat-stickers/owls/owl-03.png"},{"id":"owl-04","label":"Спасибо","src":"assets/chat-stickers/owls/owl-04.png"},{"id":"owl-05","label":"Вместе Мы Сильнее","src":"assets/chat-stickers/owls/owl-05.png"},{"id":"owl-06","label":"Ну Вы Даете","src":"assets/chat-stickers/owls/owl-06.png"},{"id":"owl-07","label":"Серьезно","src":"assets/chat-stickers/owls/owl-07.png"},{"id":"owl-08","label":"Доброе Утро","src":"assets/chat-stickers/owls/owl-08.png"},{"id":"owl-09","label":"Спокойной Ночи","src":"assets/chat-stickers/owls/owl-09.png"},{"id":"owl-10","label":"Надо Разобраться","src":"assets/chat-stickers/owls/owl-10.png"},{"id":"owl-11","label":"Думаю","src":"assets/chat-stickers/owls/owl-11.png"},{"id":"owl-12","label":"Слежу","src":"assets/chat-stickers/owls/owl-12.png"},{"id":"owl-13","label":"Принято","src":"assets/chat-stickers/owls/owl-13.png"},{"id":"owl-14","label":"Красава","src":"assets/chat-stickers/owls/owl-14.png"},{"id":"owl-15","label":"Грустно","src":"assets/chat-stickers/owls/owl-15.png"},{"id":"owl-16","label":"В Бой","src":"assets/chat-stickers/owls/owl-16.png"},{"id":"owl-17","label":"Куда Идем","src":"assets/chat-stickers/owls/owl-17.png"},{"id":"owl-18","label":"Алмазы","src":"assets/chat-stickers/owls/owl-18.png"},{"id":"owl-19","label":"Победа","src":"assets/chat-stickers/owls/owl-19.png"},{"id":"owl-20","label":"Ой","src":"assets/chat-stickers/owls/owl-20.png"},{"id":"owl-21","label":"Сбор","src":"assets/chat-stickers/owls/owl-21.png"},{"id":"owl-22","label":"На Медведя","src":"assets/chat-stickers/owls/owl-22.png"},{"id":"owl-23","label":"В Форты","src":"assets/chat-stickers/owls/owl-23.png"},{"id":"owl-24","label":"Готов","src":"assets/chat-stickers/owls/owl-24.png"},{"id":"owl-25","label":"В Атаку","src":"assets/chat-stickers/owls/owl-25.png"},{"id":"owl-26","label":"Замок Наш","src":"assets/chat-stickers/owls/owl-26.png"},{"id":"owl-27","label":"Копим","src":"assets/chat-stickers/owls/owl-27.png"},{"id":"owl-28","label":"Щит","src":"assets/chat-stickers/owls/owl-28.png"},{"id":"owl-29","label":"Победа 58","src":"assets/chat-stickers/owls/owl-29.png"},{"id":"owl-30","label":"В Игру","src":"assets/chat-stickers/owls/owl-30.png"}],
    heroes: [{"id":"hero-mom-beer","label":"МОМ любит пиво","src":"assets/chat-stickers/heroes/mom-beer.png"},{"id":"hero-greg-respect","label":"Грег: «С уважением»","src":"assets/chat-stickers/heroes/greg-respect.png"},{"id":"hero-greg-no-respect","label":"Грег: «Без уважения»","src":"assets/chat-stickers/heroes/greg-no-respect.png"},{"id":"hero-molly-report-all","label":"Молли: «Всем отчёт»","src":"assets/chat-stickers/heroes/molly-report-all.png"},{"id":"hero-molly-where-report","label":"Молли: «Где отчёт?»","src":"assets/chat-stickers/heroes/molly-where-report.png"},{"id":"hero-geronimo-who-guilty","label":"Джеронимо: «Кто виноват?»","src":"assets/chat-stickers/heroes/geronimo-who-guilty.png"}]
  };
  const PACK_LABELS = { owls: '🦉 Совы', heroes: '🎮 Герои' };
  const TOKEN_RE = /^#sticker\|(owls|heroes)\|([a-z0-9-]+)$/i;
  const LEGACY_RE = /^#sticker\|(owls|heroes)\|(\d+)$/i;
  const form = document.getElementById('chat58Form');
  const input = document.getElementById('chat58Input');
  const send = document.getElementById('chat58Send');
  const status = document.getElementById('chat58Status');
  const composer = document.querySelector('.chat58-composer');
  if (!form || !input || !composer) return;

  const byId = new Map();
  Object.entries(PACKS).forEach(([pack, items]) => {
    items.forEach((item, index) => {
      byId.set(`${pack}:${item.id}`, item);
      byId.set(`${pack}:${index}`, item); // старые токены остаются читаемыми
    });
  });

  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'chat58StickerBtn';
  button.className = 'chat58-sticker-btn';
  button.setAttribute('aria-label', 'Открыть стикеры');
  button.setAttribute('aria-expanded', 'false');
  button.textContent = '☺';

  const panel = document.createElement('section');
  panel.id = 'chat58StickerPanel';
  panel.className = 'chat58-sticker-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label', 'Стикеры');

  const tabs = document.createElement('div');
  tabs.className = 'chat58-sticker-tabs';
  tabs.setAttribute('role', 'tablist');

  const grid = document.createElement('div');
  grid.className = 'chat58-sticker-grid';
  grid.setAttribute('role', 'tabpanel');

  let activePack = 'owls';

  function tokenFor(pack, id) {
    return `#sticker|${pack}|${id}`;
  }

  function getSticker(text) {
    const value = String(text || '').trim();
    let m = value.match(TOKEN_RE);
    if (m) {
      const pack = m[1].toLowerCase();
      const item = byId.get(`${pack}:${m[2].toLowerCase()}`);
      return item ? { pack, item } : null;
    }
    m = value.match(LEGACY_RE);
    if (m) {
      const pack = m[1].toLowerCase();
      const item = byId.get(`${pack}:${Number(m[2])}`);
      return item ? { pack, item } : null;
    }
    return null;
  }

  function renderTabs() {
    tabs.replaceChildren();
    Object.keys(PACKS).forEach(pack => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'chat58-sticker-tab' + (pack === activePack ? ' is-active' : '');
      tab.textContent = PACK_LABELS[pack];
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', pack === activePack ? 'true' : 'false');
      tab.addEventListener('click', () => {
        activePack = pack;
        renderTabs();
        renderGrid();
      });
      tabs.appendChild(tab);
    });
  }

  function renderGrid() {
    grid.replaceChildren();
    PACKS[activePack].forEach(item => {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'chat58-sticker-cell';
      cell.title = item.label;
      cell.setAttribute('aria-label', item.label);

      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.label;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      cell.appendChild(img);

      cell.addEventListener('click', () => {
        if (input.disabled || (send && send.disabled)) return;
        panel.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        input.value = tokenFor(activePack, item.id);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        if (typeof form.requestSubmit === 'function') form.requestSubmit();
        else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      });
      grid.appendChild(cell);
    });
  }

  panel.append(tabs, grid);
  form.insertBefore(button, input);
  composer.insertBefore(panel, form);
  renderTabs();
  renderGrid();

  function closePanel() {
    panel.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  }

  button.addEventListener('click', e => {
    e.stopPropagation();
    const opening = panel.hidden;
    panel.hidden = !opening;
    button.setAttribute('aria-expanded', opening ? 'true' : 'false');
    if (opening) renderGrid();
  });
  panel.addEventListener('click', e => e.stopPropagation());
  document.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePanel();
  });

  function hydrateStickerText(root = document) {
    const nodes = [];
    if (root.nodeType === 1 && root.matches && root.matches('.chat58-text')) nodes.push(root);
    if (root.querySelectorAll) nodes.push(...root.querySelectorAll('.chat58-text'));
    nodes.forEach(node => {
      if (node.dataset.stickerHydrated === '1') return;
      const match = getSticker(node.textContent);
      if (!match) return;
      const { item } = match;
      const img = document.createElement('img');
      img.className = 'chat58-sticker-message';
      img.src = item.src;
      img.alt = item.label;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      img.addEventListener('error', () => {
        node.dataset.stickerHydrated = '0';
        node.textContent = '[Стикер недоступен]';
      }, { once: true });
      node.replaceChildren(img);
      node.classList.add('is-sticker');
      node.dataset.stickerHydrated = '1';
    });
  }

  hydrateStickerText();

  const messages = document.getElementById('chat58Messages');
  if (messages) {
    const observer = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) hydrateStickerText(node);
      }
    });
    observer.observe(messages, { childList: true, subtree: true });
  }

  window.CHAT58_STICKERS = Object.freeze({
    packs: Object.freeze({ owls: PACKS.owls.length, heroes: PACKS.heroes.length })
  });
})();
