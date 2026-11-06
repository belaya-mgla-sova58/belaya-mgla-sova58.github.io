/* Белая мгла · навигация по длинным гайдам v978.
   Reuse the existing reader sections sheet. No second TOC, no mobile changes. */
(function () {
  "use strict";
  var desktop = window.matchMedia("(min-width:1201px) and (hover:hover) and (pointer:fine)");

  function allowed() {
    return desktop.matches &&
      !document.documentElement.classList.contains("force-desktop-root") &&
      !document.body.classList.contains("is-home-route");
  }

  function init() {
    if (!allowed() || document.querySelector(".guide-quick-nav-v978")) return;
    var route = document.querySelector(".route-page.active");
    var opener = route && route.querySelector(".reader-sections-v451");
    var overlay = document.querySelector(".reader-sections-overlay-v451");
    var links = overlay && overlay.querySelectorAll(".reader-sections-links-v451 a[href^='#']");
    if (!opener || !overlay || !links || links.length < 3) return;
    if (document.documentElement.scrollHeight < window.innerHeight * 1.75) return;

    var nav = document.createElement("nav");
    nav.className = "guide-quick-nav-v978";
    nav.setAttribute("aria-label", "Быстрые переходы по гайду");
    nav.hidden = true;

    var contents = document.createElement("button");
    contents.type = "button";
    contents.className = "guide-quick-sections-v978";
    contents.textContent = "☰ Разделы";
    contents.setAttribute("aria-label", "Открыть оглавление гайда");
    contents.setAttribute("aria-controls", "guide-reader-sections-v978");

    var top = document.createElement("button");
    top.type = "button";
    top.className = "guide-quick-top-v978";
    top.textContent = "↑ Наверх";
    top.setAttribute("aria-label", "Вернуться к началу страницы");

    if (!overlay.id) overlay.id = "guide-reader-sections-v978";
    else contents.setAttribute("aria-controls", overlay.id);

    nav.append(contents, top);
    document.body.appendChild(nav);

    contents.addEventListener("click", function () {
      opener.click();
      if (overlay.classList.contains("open")) {
        var closeButton = overlay.querySelector(".reader-sections-close-v451");
        if (closeButton) closeButton.focus({ preventScroll:true });
      }
    });

    top.addEventListener("click", function () {
      var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
      window.scrollTo({ top:0, behavior:reduce ? "auto" : "smooth" });
    });

    /* Keep section URLs shareable, while the existing reader opens folds
       and performs the actual jump. */
    overlay.addEventListener("click", function (event) {
      var link = event.target.closest(".reader-sections-links-v451 a[href^='#']");
      if (!link) return;
      var id = link.getAttribute("href").slice(1);
      if (!document.getElementById(id)) return;
      try { history.replaceState(null, "", "#" + encodeURIComponent(id)); }
      catch (_) {}
    }, true);

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !overlay.classList.contains("open")) return;
      window.requestAnimationFrame(function () { contents.focus({preventScroll:true}); });
    }, true);

    var ticking = false;
    function update() {
      ticking = false;
      nav.hidden = !allowed() || window.scrollY < 320 ||
        document.documentElement.scrollHeight - window.innerHeight < window.innerHeight * 0.75;
      if (nav.hidden && overlay.classList.contains("open") && !allowed()) {
        overlay.classList.remove("open");
        overlay.setAttribute("aria-hidden", "true");
      }
    }
    function schedule() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }
    window.addEventListener("scroll", schedule, { passive:true });
    window.addEventListener("resize", schedule, { passive:true });
    if (desktop.addEventListener) desktop.addEventListener("change", schedule);
    window.addEventListener("pageshow", schedule);
    update();
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
  window.addEventListener("load", init, {once:true});
})();