(function(){
  'use strict';
  if('serviceWorker' in navigator){
    window.addEventListener('load',function(){navigator.serviceWorker.register('./service-worker.js?v=682-perf1',{updateViaCache:'none'}).catch(function(){});},{once:true});
  }
  if(document.body&&document.body.classList.contains('is-home-route')){
    var today=document.querySelector('.home-today-v581');
    if(today){
      var calc=document.createElement('section');
      calc.className='home-bear-calc-v780';
      calc.innerHTML='<div class="home-bear-calc-copy-v780"><span class="home-bear-calc-kicker-v780">Калькулятор</span><h2>Помощник для Мишки</h2><p>Подбери героев, рассчитай войска по маршам и выбери подходящее соотношение.</p><div class="home-bear-calc-tags-v780"><span>Герои</span><span>Войска</span><span>Марши</span><span>Соотношение</span></div></div><a class="home-bear-calc-btn-v780" href="bear-helper.html"><span>Открыть калькулятор</span><b aria-hidden="true">›</b></a>';
      var calcStyle=document.createElement('style');
      calcStyle.setAttribute('data-home-bear-calc-v780','');
      calcStyle.textContent='body.is-home-route .home-bear-calc-v780{margin:14px 0 18px;padding:20px 22px;display:flex;align-items:center;justify-content:space-between;gap:22px;border:1px solid rgba(108,205,255,.26);border-radius:24px;background:radial-gradient(circle at 0 0,rgba(76,191,255,.16),transparent 35%),linear-gradient(145deg,rgba(7,30,56,.94),rgba(4,19,38,.96));box-shadow:0 18px 46px rgba(0,0,0,.22);position:relative;overflow:hidden}body.is-home-route .home-bear-calc-v780:after{content:"🐻";position:absolute;right:22%;top:50%;transform:translateY(-50%);font-size:72px;opacity:.08;pointer-events:none}body.is-home-route .home-bear-calc-copy-v780{position:relative;z-index:1;min-width:0}body.is-home-route .home-bear-calc-kicker-v780{display:block;margin-bottom:5px;color:#72d8ff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.12em}body.is-home-route .home-bear-calc-v780 h2{margin:0;color:#f5fbff;font-size:clamp(24px,4vw,34px);line-height:1.08}body.is-home-route .home-bear-calc-v780 p{max-width:650px;margin:8px 0 0;color:#b9d3e7;font-size:14px;line-height:1.48}body.is-home-route .home-bear-calc-tags-v780{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}body.is-home-route .home-bear-calc-tags-v780 span{padding:5px 9px;border-radius:999px;border:1px solid rgba(122,207,248,.18);background:rgba(255,255,255,.04);color:#bfe7fb;font-size:11px;font-weight:800}body.is-home-route .home-bear-calc-btn-v780{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:12px;flex:0 0 auto;min-width:210px;min-height:58px;padding:13px 17px;border-radius:16px;border:1px solid rgba(255,196,109,.68);background:linear-gradient(180deg,#ffb24e,#ed8a19);color:#241606!important;text-decoration:none!important;font-weight:900;box-shadow:0 10px 26px rgba(234,137,25,.18);transition:.18s ease}body.is-home-route .home-bear-calc-btn-v780:hover{transform:translateY(-2px);filter:brightness(1.04)}body.is-home-route .home-bear-calc-btn-v780 b{font-size:26px;line-height:1}@media(max-width:720px){body.is-home-route .home-bear-calc-v780{margin:10px 0 14px;padding:15px;border-radius:18px;display:block}body.is-home-route .home-bear-calc-v780:after{right:16px;top:18px;transform:none;font-size:54px}body.is-home-route .home-bear-calc-v780 p{padding-right:28px;font-size:13px}body.is-home-route .home-bear-calc-btn-v780{width:100%;min-width:0;min-height:50px;margin-top:14px;border-radius:13px}body.is-home-route .home-bear-calc-tags-v780{gap:6px}}';
      document.head.appendChild(calcStyle);
      today.replaceWith(calc);
    }
  }
  if(document.body&&document.body.classList.contains('is-experts-route')&&!document.querySelector('.expert-category-v781')&&!location.pathname.endsWith('/expert-generations.html')&&!location.pathname.endsWith('expert-generations.html')){
    var heading=document.querySelector('.page-heading-v424');
    if(heading){
      var expertCategory=document.createElement('section');
      expertCategory.className='expert-category-v781';
      expertCategory.innerHTML='<a class="expert-category-link-v781" href="expert-generations.html"><span class="expert-category-copy-v781"><small>Отдельная категория</small><strong>Поколения экспертов</strong><span>Эксперты по поколениям, специализация и доступность в 58 государстве.</span></span><span class="expert-category-arrow-v781" aria-hidden="true">›</span></a>';
      heading.insertAdjacentElement('afterend',expertCategory);
      var expertCategoryStyle=document.createElement('style');
      expertCategoryStyle.setAttribute('data-expert-category-v781','');
      expertCategoryStyle.textContent='body.is-experts-route .expert-category-v781{margin:0 0 22px}body.is-experts-route .expert-category-link-v781{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:20px 22px;border:1px solid rgba(94,204,255,.30);border-radius:20px;background:linear-gradient(145deg,rgba(8,42,72,.94),rgba(8,25,48,.94));box-shadow:0 14px 34px rgba(0,0,0,.16);text-decoration:none;transition:transform .16s ease,border-color .16s ease,background .16s ease}body.is-experts-route .expert-category-link-v781:hover{transform:translateY(-2px);border-color:rgba(104,220,255,.62);background:linear-gradient(145deg,rgba(11,55,90,.97),rgba(8,31,58,.97))}body.is-experts-route .expert-category-copy-v781 small{display:block;margin-bottom:5px;color:#72d9ff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.12em}body.is-experts-route .expert-category-copy-v781 strong{display:block;color:#fff;font-size:clamp(24px,3.8vw,34px);line-height:1.1}body.is-experts-route .expert-category-copy-v781 span{display:block;margin-top:7px;color:#9fc3d8;font-size:13px;line-height:1.45}body.is-experts-route .expert-category-arrow-v781{display:grid;place-items:center;flex:0 0 42px;width:42px;height:42px;border-radius:50%;background:rgba(113,213,255,.10);color:#bdeeff;font-size:25px;font-weight:900}@media(max-width:640px){body.is-experts-route .expert-category-link-v781{padding:17px 16px;border-radius:17px}body.is-experts-route .expert-category-copy-v781 span{font-size:12px}body.is-experts-route .expert-category-arrow-v781{width:36px;height:36px;flex-basis:36px;font-size:21px}}';
      document.head.appendChild(expertCategoryStyle);
    }
  }
  if(document.body&&document.body.classList.contains('is-events-route')&&!document.querySelector('script[data-event-calendar-auto-v771]')){
    var ec=document.createElement('script');
    ec.src='event-calendar-auto-v770.js?v=771';
    ec.defer=true;
    ec.setAttribute('data-event-calendar-auto-v771','');
    document.head.appendChild(ec);
  }
  if(document.body&&document.body.classList.contains('is-canyon-clash-route')){
    var canyonStyle=document.createElement('style');
    canyonStyle.textContent='body.is-canyon-clash-route .canyon-hero img{object-fit:contain!important;max-height:520px!important;background:#071426}@media(max-width:760px){body.is-canyon-clash-route .canyon-hero img{max-height:360px!important}}';
    document.head.appendChild(canyonStyle);
    var canyonHero=document.querySelector('.canyon-hero img');
    if(canyonHero){
      canyonHero.src='assets/canyon-vote-v775.jpg?v=775';
      canyonHero.removeAttribute('srcset');
    }
    var canyonShop=document.querySelector('img[alt="Магазин Битвы в каньоне"]');
    if(canyonShop){
      canyonShop.src='assets/canyon-shop-user-v779.jpg?v=779';
      canyonShop.removeAttribute('srcset');
      canyonShop.style.opacity='1';
      canyonShop.setAttribute('data-canyon-shop-user-v779','1');
    }
  }
  if(document.body&&document.body.classList.contains('is-other-route')){
    var tools=document.querySelector('#kb-calculators .kb-tools-grid-v415');
    if(tools&&!tools.querySelector('a[href="bear-helper.html"]')){
      var bear=document.createElement('a');
      bear.href='bear-helper.html';
      bear.innerHTML='<strong>Помощник для Мишки</strong><span>Герои, войска, марши и подбор соотношения</span>';
      tools.appendChild(bear);
    }
  }
  if(!document.querySelector('link[data-news-update-reactions-v761]')){var css=document.createElement('link');css.rel='stylesheet';css.href='news-update-reactions-v761.css?v=769';css.setAttribute('data-news-update-reactions-v761','');document.head.appendChild(css);}
  if(!document.querySelector('script[data-news-update-reactions-v760]')){var s=document.createElement('script');s.src='news-update-reactions-v760.js?v=769';s.defer=true;s.setAttribute('data-news-update-reactions-v760','');document.head.appendChild(s);}
  if(!document.querySelector('script[data-news-home-category-v762]')){var h=document.createElement('script');h.src='news-home-category-v762.js?v=769';h.defer=true;h.setAttribute('data-news-home-category-v762','');document.head.appendChild(h);}
  if(!document.querySelector('script[data-halloween-header-v765]')){var header=document.createElement('script');header.src='halloween-header-v765.js?v=769';header.async=false;header.setAttribute('data-halloween-header-v765','');document.head.appendChild(header);}
  if(!document.querySelector('script[data-halloween-header-apply-v765]')){var apply=document.createElement('script');apply.src='halloween-header-apply-v765.js?v=769';apply.async=false;apply.setAttribute('data-halloween-header-apply-v765','');document.head.appendChild(apply);}
  if(!document.querySelector('script[data-news-halloween-card-v764]')){var n=document.createElement('script');n.src='news-halloween-card-v764.js?v=769';n.async=false;n.setAttribute('data-news-halloween-card-v764','');document.head.appendChild(n);}
  if(!document.querySelector('link[data-news-halloween-livefix-v766]')){var halloweenFix=document.createElement('link');halloweenFix.rel='stylesheet';halloweenFix.href='news-halloween-livefix-v766.css?v=769';halloweenFix.setAttribute('data-news-halloween-livefix-v766','');document.head.appendChild(halloweenFix);}
  if(!document.querySelector('script[data-news-halloween-clean-v769]')){var clean=document.createElement('script');clean.src='news-halloween-clean-v769.js?v=769';clean.defer=true;clean.setAttribute('data-news-halloween-clean-v769','');document.head.appendChild(clean);}
})();