(function(){
  function updateHomeDate(){
    var el=document.getElementById('homeTodayDateV581');
    if(!el) return;
    var now=new Date();
    var day=now.getDate();
    var month=now.toLocaleDateString('ru-RU',{month:'long'});
    el.textContent='Сегодня: '+day+' '+month;
  }

  function ensureHomeHero(){
    var hero=document.querySelector('.home-stamped-hero-v441');
    if(!hero) return;
    var img=hero.querySelector('.home-stamped-img-v441');
    if(!img){
      hero.innerHTML='<img alt="Независимый сайт с гайдами по Белой мгле от SOVA58" class="home-stamped-img-v441" decoding="async" fetchpriority="high" src="assets/home-hero-polish-v446.webp">';
    }
    hero.style.display='';
    hero.style.visibility='visible';
    hero.style.opacity='1';
  }

  function init(){
    try{updateHomeDate();}catch(e){}
    try{ensureHomeHero();}catch(e){}
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init,{once:true});
  }else{
    init();
  }
})();
