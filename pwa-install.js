(function(){
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  let deferredPrompt = null;
  const btn = document.getElementById('pwaInstallButton');
  const note = document.getElementById('pwaInstallNote');
  const isiOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js?v=541').catch(()=>{}));
  }

  if (!btn) return;
  if (isStandalone) { btn.hidden = true; if(note) note.hidden=true; return; }

  // iPhone/iPad do not expose beforeinstallprompt; keep the button available for instructions.
  if (isiOS) btn.hidden = false;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btn.hidden = false;
  });

  btn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') btn.hidden = true;
      deferredPrompt = null;
      return;
    }
    if (isiOS) {
      if (note) {
        note.hidden = false;
        note.innerHTML = 'На iPhone: открой сайт в <b>Safari</b> → нажми <b>Поделиться</b> → <b>На экран «Домой»</b> → <b>Добавить</b>.';
      }
      return;
    }
    if (note) {
      note.hidden = false;
      note.innerHTML = 'Если окно установки не появилось: открой меню браузера ⋮ и выбери <b>«Установить приложение»</b> или <b>«Добавить на главный экран»</b>.';
    }
  });

  window.addEventListener('appinstalled', () => {
    btn.hidden = true;
    if(note) note.hidden = true;
  });
})();
