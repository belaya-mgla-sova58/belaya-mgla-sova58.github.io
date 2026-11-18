(function(){
  'use strict';

  function addStyle(){
    if(document.getElementById('home-updates-category-style-v762'))return;
    var s=document.createElement('style');
    s.id='home-updates-category-style-v762';
    s.textContent='.home-news-updates-category-v762{position:relative;overflow:hidden;min-height:128px;border:1px solid rgba(126,211,255,.20)!important;border-radius:20px;background:radial-gradient(circle at 82% 14%,rgba(108,205,255,.25),transparent 34%),radial-gradient(circle at 18% 88%,rgba(132,116,255,.20),transparent 40%),linear-gradient(145deg,rgba(5,39,73,.96),rgba(20,28,70,.94));box-shadow:0 14px 32px rgba(0,9,28,.22);text-decoration:none!important}.home-news-updates-category-v762:before{content:"📰";position:absolute;right:18px;top:14px;font-size:44px;filter:drop-shadow(0 7px 15px rgba(0,0,0,.2))}.home-news-updates-category-v762 .home-news-banner-copy-v449{position:absolute;left:18px;right:82px;bottom:18px;z-index:2}.home-news-updates-category-v762 .home-news-banner-copy-v449 b{display:block;color:#fff;font-size:17px;line-height:1.18}.home-news-updates-category-v762 .home-news-banner-copy-v449 small{display:block;margin-top:6px;color:#bcdaf0;font-size:11.5px;line-height:1.35}.home-news-updates-category-v762>i{position:absolute;right:15px;bottom:14px;z-index:2;color:#fff;font-size:24px;font-style:normal}@media(max-width:700px){.home-news-updates-category-v762{min-height:118px}.home-news-updates-category-v762 .home-news-banner-copy-v449{left:14px;bottom:16px;right:74px}.home-news-updates-category-v762 .home-news-banner-copy-v449 b{font-size:15px}}';
    document.head.appendChild(s);
  }

  function fixHomeNews(){
    if(!document.body.classList.contains('is-home-route'))return false;
    var grid=document.querySelector('.home-news-grid-v442');
    if(!grid)return false;

    grid.querySelectorAll('.home-news-update-v760').forEach(function(el){el.remove();});

    if(!grid.querySelector('.home-news-updates-category-v762')){
      var a=document.createElement('a');
      a.className='home-news-card-v442 home-news-banner-v449 home-news-updates-category-v762';
      a.href='news-ru.html';
      a.innerHTML='<span class="home-news-banner-copy-v449"><b>Обновления RU</b><small>Обновления и изменения «Белой мглы»</small></span><i aria-hidden="true">›</i>';
      grid.insertBefore(a,grid.firstChild);
    }
    return true;
  }

  function start(){
    addStyle();
    fixHomeNews();
    var grid=document.querySelector('.home-news-grid-v442');
    if(!grid)return;
    var observer=new MutationObserver(function(){fixHomeNews();});
    observer.observe(grid,{childList:true});
    setTimeout(function(){fixHomeNews();},300);
    setTimeout(function(){fixHomeNews();observer.disconnect();},1800);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
