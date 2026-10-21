(function(){
  function patchBottomNav(){
    var navs=document.querySelectorAll('.mobile-bottom-v424 a');
    navs.forEach(function(a){
      var key=(a.dataset&&a.dataset.v424Nav)||'';
      var href=a.getAttribute('href')||'';
      if(key!=='heroes' && !/(^|\/)heroes\.html(?:[?#]|$)/i.test(href)) return;

      a.setAttribute('href','cheats.html');
      if(a.dataset) a.dataset.v424Nav='cheats';
      a.setAttribute('aria-label','Шпоры');

      var changedLabel=false;
      a.querySelectorAll('*').forEach(function(el){
        if((el.textContent||'').trim()==='Герои'){
          el.textContent='Шпоры';
          changedLabel=true;
        }
      });
      if(!changedLabel){
        Array.from(a.childNodes).forEach(function(n){
          if(n.nodeType===3 && (n.nodeValue||'').trim()==='Герои'){
            n.nodeValue=(n.nodeValue||'').replace('Герои','Шпоры');
          }
        });
      }

      var img=a.querySelector('img');
      if(img){
        img.setAttribute('src','ui-cheats-v583.svg');
        img.removeAttribute('data-src');
        img.setAttribute('alt','');
      }else{
        var icon=a.querySelector('[aria-hidden="true"]');
        if(icon) icon.textContent='⚡';
      }
    });
  }

  document.addEventListener('DOMContentLoaded',patchBottomNav);
  patchBottomNav();
  setTimeout(patchBottomNav,120);
  setTimeout(patchBottomNav,500);
})();
