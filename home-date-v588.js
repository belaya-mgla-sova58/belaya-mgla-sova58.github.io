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
  // Never replace the already-rendered, high-priority image. Reassigning src
  // after DOMContentLoaded triggers a second image request and late repaint.
  if(hero.querySelector('.home-stamped-img-v441'))return;
  // Fallback only for older pages that do not contain the hero image.
  var img=document.createElement('img');
  img.alt='Независимый сайт с гайдами по Белой мгле от SOVA58';
  img.className='home-stamped-img-v441';
  img.width=1800;
  img.height=643;
  img.decoding='async';
  img.setAttribute('fetchpriority','high');
  img.src='assets/home-hero-polish-v447.webp';
  hero.innerHTML='';
  hero.appendChild(img);
  hero.hidden=false;
}

function loadTouchFeathers(){
  // The feather burst creates 10 fixed animated nodes per touch. Keep it on desktop only.
  if(window.matchMedia && window.matchMedia('(max-width: 980px), (hover: none), (pointer: coarse)').matches)return;
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