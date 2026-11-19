(function(){
'use strict';

function updateHomeDate(){
  var el=document.getElementById('homeTodayDateV581');
  if(!el)return;
  var d=new Date();
  el.textContent='Сегодня: '+d.getDate()+' '+d.toLocaleDateString('ru-RU',{month:'long'});
}

function ensureHomeHero(){
  var hero=document.querySelector('.home-stamped-hero-v441');
  if(!hero)return;
  var img=hero.querySelector('.home-stamped-img-v441');
  if(!img){
    img=document.createElement('img');
    img.alt='Независимый сайт с гайдами по Белой мгле от SOVA58';
    img.className='home-stamped-img-v441';
    hero.innerHTML='';
    hero.appendChild(img);
  }
  img.src='assets/home-hero-polish-v446.webp?v=630';
  hero.hidden=false;
  hero.style.cssText+='display:block!important;visibility:visible!important;opacity:1!important';
  img.style.cssText+='display:block!important;width:100%!important;height:auto!important';
}

function loadTouchFeathers(){
  if(document.querySelector('script[data-touch-feathers-v659]'))return;
  var s=document.createElement('script');
  s.src='touch-feathers-v659.js?v=659';
  s.defer=true;
  s.setAttribute('data-touch-feathers-v659','');
  document.head.appendChild(s);
}

function init(){
  try{updateHomeDate();ensureHomeHero();loadTouchFeathers();}catch(e){}
}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init,{once:true});
}else{
  init();
}
})();