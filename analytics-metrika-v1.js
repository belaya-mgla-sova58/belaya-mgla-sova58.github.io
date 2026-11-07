/* Анонимная аналитика «Белая мгла». Счётчик загружается только после согласия. */
(function () {
  "use strict";
  if (window.__sovaMetrikaConsentV1) return;
  window.__sovaMetrikaConsentV1 = true;

  var COUNTER_ID = 114074471;
  var STORAGE_KEY = "sova58-metrika-consent-v1";
  var started = false;

  function preference() {
    try { return window.localStorage.getItem(STORAGE_KEY); }
    catch (e) { return null; }
  }
  function savePreference(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); }
    catch (e) { /* Даже при блокировке хранилища решение действует на текущей странице. */ }
  }
  function startMetrika() {
    if (started) return;
    started = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = +new Date();
      for (var j = 0; j < e.scripts.length; j++) {
        if (e.scripts[j].src === r) return;
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = true;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=" + COUNTER_ID, "ym");

    window.ym(COUNTER_ID, "init", {
      accurateTrackBounce: true,
      webvisor: false,
      clickmap: false,
      trackLinks: false,
      ecommerce: false
    });
  }
  function buildControls() {
    if (document.getElementById("sova-metrika-consent")) return;
    var style = document.createElement("style");
    style.textContent = [
      "#sova-metrika-consent{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147483000;width:min(510px,calc(100vw - 28px));box-sizing:border-box;padding:16px 18px;border:1px solid #42627d;border-radius:15px;background:#10283d;color:#f2f7fd;box-shadow:0 12px 44px #0009;font:14px/1.5 system-ui,-apple-system,Arial,sans-serif}",
      "#sova-metrika-consent[hidden],#sova-metrika-open[hidden]{display:none!important}",
      "#sova-metrika-consent strong{display:block;margin:0 0 6px;font-size:16px}",
      "#sova-metrika-consent p{margin:0 0 13px;color:#d4e0ed}",
      "#sova-metrika-actions{display:flex;flex-wrap:wrap;gap:9px}",
      "#sova-metrika-actions button{min-height:38px;padding:8px 15px;border-radius:9px;border:1px solid #9fb8c9;background:transparent;color:#fff;font:600 14px system-ui,Arial,sans-serif;cursor:pointer}",
      "#sova-metrika-actions #sova-metrika-accept{background:#245fae;border-color:#245fae;color:#fff}",
      "#sova-metrika-open{position:fixed;left:9px;bottom:9px;z-index:2147482999;background:#10283de0;color:#e9f3ff;border:1px solid #50708a;border-radius:8px;padding:5px 8px;font:11px system-ui,Arial,sans-serif;cursor:pointer;opacity:.75}",
      "#sova-metrika-open:focus-visible,#sova-metrika-actions button:focus-visible{outline:3px solid #ffd775;outline-offset:3px}"
    ].join("\n");
    document.head.appendChild(style);

    var dialog = document.createElement("section");
    dialog.id = "sova-metrika-consent";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-label", "Настройки аналитики");
    dialog.hidden = true;
    dialog.innerHTML =
      '<strong>Сова немного любопытствует! 🦉</strong>' +
      '<p>Ей интересно, сколько гостей заглядывает на сайт и какие новости и гайды читают чаще всего. ' +
      'Помоги Сове это узнать: разреши Яндекс Метрике учитывать посещения с помощью cookie. ' +
      'Сова не спрашивает имён и игровых ников, ей нужна только статистика.</p>' +
      '<div id="sova-metrika-actions">' +
      '<button type="button" id="sova-metrika-accept">Разрешить</button>' +
      '<button type="button" id="sova-metrika-decline">Нет, спасибо</button>' +
      '</div>';

    var openButton = document.createElement("button");
    openButton.type = "button";
    openButton.id = "sova-metrika-open";
    openButton.textContent = "⚙ Аналитика";
    openButton.setAttribute("aria-label", "Изменить настройки аналитики");
    document.body.appendChild(dialog);
    document.body.appendChild(openButton);

    function showDialog() {
      dialog.hidden = false;
      openButton.hidden = true;
    }
    function hideDialog() {
      dialog.hidden = true;
      openButton.hidden = false;
    }
    openButton.addEventListener("click", showDialog);
    dialog.querySelector("#sova-metrika-accept").addEventListener("click", function () {
      savePreference("accepted");
      hideDialog();
      startMetrika();
    });
    dialog.querySelector("#sova-metrika-decline").addEventListener("click", function () {
      var wasStarted = started;
      savePreference("declined");
      hideDialog();
      if (wasStarted) window.location.reload();
    });
    window.addEventListener("storage", function (event) {
      if (event.key === STORAGE_KEY && event.newValue === "declined" && started) {
        window.location.reload();
      }
    });
    var saved = preference();
    if (saved === "accepted") {
      hideDialog();
      startMetrika();
    } else if (saved === "declined") {
      hideDialog();
    } else {
      showDialog();
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildControls, { once: true });
  } else {
    buildControls();
  }
})();
