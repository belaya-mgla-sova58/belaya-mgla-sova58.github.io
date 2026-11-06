/* SOVA58 navigation v977: faster desktop search, keyboard result selection and unified calculators link. */
(function () {
  "use strict";
  var SEARCH = ".site-search-input-v426";
  var LIST = ".site-search-results-v426";
  var initialized = false;

  function isEditing(target) {
    if (!target || !target.closest) return false;
    return !!target.closest("input,textarea,select,[contenteditable=''],[contenteditable='true'],[role='textbox']");
  }

  function searchLinks(box) {
    return Array.from(box.querySelectorAll("a.site-search-result-v426[href]"));
  }

  function initSearch(root) {
    var input = root.querySelector(SEARCH);
    var results = root.querySelector(LIST);
    var field = root.querySelector(".site-search-box-v426");
    if (!input || !results || !field || input.dataset.sovaNav977 === "1") return;
    input.dataset.sovaNav977 = "1";
    var chosen = -1;
    var hint = document.createElement("span");
    hint.className = "site-search-hotkey-v977";
    hint.setAttribute("aria-hidden", "true");
    hint.textContent = /Mac|iPhone|iPad/i.test(navigator.platform || "") ? "⌘ K" : "Ctrl K";
    field.appendChild(hint);

    function reset() {
      chosen = -1;
      root.classList.toggle("site-search-typed-v977", !!input.value.trim());
      results.querySelectorAll(".site-search-selected-v977").forEach(function (a) {
        a.classList.remove("site-search-selected-v977");
        a.removeAttribute("aria-selected");
      });
      input.removeAttribute("aria-activedescendant");
    }
    reset();
    input.addEventListener("input", reset);
    input.addEventListener("blur", function () {
      input.removeAttribute("aria-activedescendant");
    });

    // Capture runs before the original search's Enter handler.
    input.addEventListener("keydown", function (e) {
      var links = searchLinks(results);
      if ((e.key === "ArrowDown" || e.key === "ArrowUp") && results.classList.contains("open") && links.length) {
        e.preventDefault();
        e.stopImmediatePropagation();
        chosen = (chosen + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
        links.forEach(function (a, i) {
          a.classList.toggle("site-search-selected-v977", i === chosen);
          if (i === chosen) {
            a.setAttribute("aria-selected", "true");
            if (!a.id) a.id = "sova-search-result-v977-" + i;
            input.setAttribute("aria-activedescendant", a.id);
          } else {
            a.removeAttribute("aria-selected");
          }
        });
        links[chosen].scrollIntoView({block:"nearest"});
      } else if (e.key === "Enter" && chosen >= 0 && links[chosen]) {
        e.preventDefault();
        e.stopImmediatePropagation();
        links[chosen].click();
      } else if (e.key === "Escape") {
        reset();
      }
    }, true);
  }

  function init() {
    if (initialized) return;
    initialized = true;
    // Legacy menus still linked to the old knowledge-base anchor.
    document.querySelectorAll('.nav-wrap a[href="other.html#kb-calculators"]').forEach(function (link) {
      link.setAttribute("href", "calculators.html");
    });
    document.querySelectorAll("[data-site-search]").forEach(initSearch);
    document.addEventListener("keydown", function (e) {
      var hotkey = !e.altKey && ((e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey)) ||
        (e.key === "/" && !e.ctrlKey && !e.metaKey && !isEditing(e.target)));
      if (!hotkey || e.defaultPrevented || isEditing(e.target)) return;
      var input = document.querySelector(SEARCH);
      if (!input || input.disabled) return;
      e.preventDefault();
      input.focus();
      input.select();
      input.scrollIntoView({block: "center", behavior: "instant"});
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();