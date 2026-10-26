(function(){
  'use strict';

  var VIEW_URL='https://abacus.jasoncameron.dev/get/belaya-mgla-sova58/ru-halloween-2026';

  function addStyle(){
    if(document.getElementById('halloween-update-card-style-v764'))return;
    var s=document.createElement('style');
    s.id='halloween-update-card-style-v764';
    s.textContent='.halloween-update-card-v764{position:relative;overflow:hidden;min-height:126px;border-color:rgba(255,153,51,.34)!important;background:#170b20!important;box-shadow:0 12px 30px rgba(0,0,0,.25)}.halloween-update-card-v764 .halloween-card-link-v764{position:absolute;inset:0;z-index:1;display:block;text-decoration:none!important;color:#fff!important}.halloween-update-card-v764 .halloween-card-image-v764{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(1.06) contrast(1.02)}.halloween-update-card-v764 .halloween-card-shade-v764{position:absolute;inset:0;background:linear-gradient(90deg,rgba(20,7,26,.84) 0%,rgba(20,7,26,.52) 48%,rgba(20,7,26,.13) 100%),linear-gradient(0deg,rgba(12,5,18,.66),transparent 65%)}.halloween-update-card-v764 .halloween-card-copy-v764{position:absolute;left:16px;right:96px;bottom:15px;z-index:2;text-shadow:0 2px 10px rgba(0,0,0,.9)}.halloween-update-card-v764 .halloween-card-copy-v764 b{display:block;color:#fff;font-size:17px;line-height:1.08}.halloween-update-card-v764 .halloween-card-copy-v764 small{display:block;margin-top:5px;color:#ffd5a0;font-size:11px;font-weight:800}.halloween-update-card-v764 .halloween-view-v764{position:absolute;right:10px;bottom:10px;z-index:4;display:inline-flex;align-items:center;gap:5px;padding:7px 9px;border:1px solid rgba(255,201,132,.42);border-radius:999px;background:rgba(20,7,27,.86);color:#fff;font-size:11px;font-weight:900;box-shadow:0 8px 18px rgba(0,0,0,.3);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px)}.halloween-update-card-v764 .halloween-new-v764{position:absolute;left:12px;top:10px;z-index:4;padding:6px 9px;border-radius:999px;background:linear-gradient(135deg,#ff8b2f,#c459ff);color:#fff;font-size:10px;font-weight:950;letter-spacing:.04em;box-shadow:0 6px 18px rgba(0,0,0,.28)}@media(max-width:700px){.halloween-update-card-v764{min-height:120px}.halloween-update-card-v764 .halloween-card-copy-v764{left:13px;right:82px;bottom:13px}.halloween-update-card-v764 .halloween-card-copy-v764 b{font-size:15px}.halloween-update-card-v764 .halloween-view-v764{right:8px;bottom:8px;padding:6px 8px;font-size:10px}}';
    document.head.appendChild(s);
  }

  function makeCard(){
    var header=window.BM_HALLOWEEN_HEADER_V765||'assets/halloween-header-2026-v764.webp';
    var card=document.createElement('div');
    card.className='news-category-card ru halloween-update-card-v764';
    card.innerHTML='<a class="halloween-card-link-v764" href="news-halloween-2026.html?v=765" aria-label="Хэллоуинская вечеринка 2026"><img class="halloween-card-image-v764" src="'+header+'" alt=""><span class="halloween-card-shade-v764"></span><span class="halloween-card-copy-v764"><b>Хэллоуинская вечеринка</b><small>27 октября — 2 ноября 2026</small></span></a><span class="halloween-new-v764">НОВОЕ</span><span class="halloween-view-v764">👁 <b data-halloween-card-views-v764>…</b></span>';
    return card;
  }

  function ensureCard(){
    var grid=document.querySelector('.ru-updates-grid-v545');
    if(!grid)return false;
    var existing=grid.querySelector('.halloween-update-card-v764');
    if(!existing){
      existing=makeCard();
      grid.insertBefore(existing,grid.firstChild);
    } else {
      var img=existing.querySelector('.halloween-card-image-v764');
      if(img&&window.BM_HALLOWEEN_HEADER_V765)img.src=window.BM_HALLOWEEN_HEADER_V765;
      if(existing!==grid.firstElementChild)grid.insertBefore(existing,grid.firstChild);
    }
    loadViews();
    return true;
  }

  var loading=false;
  function loadViews(){
    var el=document.querySelector('[data-halloween-card-views-v764]');
    if(!el||loading)return;
    loading=true;
    fetch(VIEW_URL,{cache:'no-store',mode:'cors'}).then(function(r){if(!r.ok)throw 0;return r.json();}).then(function(d){var v=Number(d&&d.value);el.textContent=Number.isFinite(v)?v.toLocaleString('ru-RU'):'—';}).catch(function(){el.textContent='—';}).finally(function(){loading=false;});
  }

  function start(){
    addStyle();
    if(!ensureCard())return;
    var grid=document.querySelector('.ru-updates-grid-v545');
    if(grid){
      var obs=new MutationObserver(function(){ensureCard();});
      obs.observe(grid,{childList:true});
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  document.addEventListener('visibilitychange',function(){if(!document.hidden)loadViews();});
})();
