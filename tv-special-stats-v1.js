/* Likes and views for the SVS talk-show special. Shared by article and news hub. */
(function(){
  'use strict';
  const key='news-58-live-fantom456-v1';
  const viewKey='news-58-live-fantom456';
  const db='https://belaya-mgla-likes-default-rtdb.firebaseio.com/likes/'+encodeURIComponent(key)+'.json';
  const abacus='https://abacus.jasoncameron.dev/';
  const namespace='belaya-mgla-sova58';
  const likeLocal='belaya-mgla-firebase-liked-'+key;
  const sessionKey='bm-view-counted:'+viewKey;
  const viewNodes=[...document.querySelectorAll('[data-tv-views]')];
  const likeNodes=[...document.querySelectorAll('[data-tv-like]')];
  const likeCounters=[...document.querySelectorAll('[data-tv-like-count]')];
  const likeLabels=[...document.querySelectorAll('[data-tv-like-label]')];
  const number=v=>Number(v).toLocaleString('ru-RU');
  const isLiked=()=>{try{return localStorage.getItem(likeLocal)==='1'}catch(e){return false}};
  const showViews=v=>viewNodes.forEach(node=>node.textContent=typeof v==='number'&&Number.isFinite(v)&&v>=0?number(v):'—');
  const showLikes=v=>likeCounters.forEach(node=>node.textContent=typeof v==='number'&&Number.isFinite(v)&&v>=0?number(v):'—');
  function refreshLikeButton(){
    const liked=isLiked();
    likeNodes.forEach(btn=>{
      btn.classList.toggle('is-liked',liked);
      btn.disabled=liked;
      btn.setAttribute('aria-pressed',String(liked));
      btn.setAttribute('aria-label',liked?'Лайк поставлен':'Поставить лайк выпуску');
    });
    likeLabels.forEach(node=>node.textContent=liked?'Спасибо!':'Нравится');
  }
  async function loadLikes(){
    try{
      const response=await fetch(db,{cache:'no-store'});
      if(!response.ok)throw new Error('like fetch');
      const value=await response.json();
      showLikes(typeof value==='number'?Math.max(0,value):0);
    }catch(e){showLikes(null)}
  }
  async function submitLike(){
    if(isLiked()||likeNodes.some(btn=>btn.dataset.tvPending==='1'))return;
    likeNodes.forEach(btn=>{btn.dataset.tvPending='1';btn.disabled=true});
    try{
      const response=await fetch(db,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({'.sv':{increment:1}}),
        cache:'no-store'
      });
      if(!response.ok)throw new Error('like update');
      const value=await response.json();
      try{localStorage.setItem(likeLocal,'1')}catch(e){}
      if(typeof value==='number')showLikes(Math.max(0,value));
      else await loadLikes();
    }catch(e){
      await loadLikes();
    }finally{
      likeNodes.forEach(btn=>delete btn.dataset.tvPending);
      refreshLikeButton();
    }
  }
  likeNodes.forEach(node=>node.addEventListener('click',submitLike));
  refreshLikeButton();
  if(likeNodes.length||likeCounters.length)loadLikes();
  if(viewNodes.length){
    let seen=false;
    try{seen=sessionStorage.getItem(sessionKey)==='1'}catch(e){}
    const isArticle=!!document.querySelector('[data-tv-article]');
    const operation=isArticle&&!seen?'hit':'get';
    fetch(abacus+operation+'/'+namespace+'/'+encodeURIComponent(viewKey),{cache:'no-store',mode:'cors'})
      .then(r=>{if(!r.ok)throw new Error('views fetch');return r.json()})
      .then(data=>{
        const v=data&&data.value;
        showViews(typeof v==='number'?v:null);
        if(isArticle&&!seen)try{sessionStorage.setItem(sessionKey,'1')}catch(e){}
      })
      .catch(()=>showViews(null));
  }
})();
