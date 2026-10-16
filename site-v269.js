(function(){
  var core=document.createElement('script');
  core.src='site-v269-core-v465.js?v=465';
  core.async=false;
  core.onload=function(){
    function addJoeImages(){
      var route=document.body && document.body.getAttribute('data-static-route');

      if(route==='events'){
        var card=document.querySelector('a.guide-nav-card[href="crazy-joe.html"]');
        if(card && !card.querySelector('.joe-event-card-image-v499')){
          var img=document.createElement('img');
          img.src='assets/crazy-joe-card-v462.webp';
          img.alt='Безумная Джо';
          img.className='joe-event-card-image-v499';
          img.loading='lazy';
          img.decoding='async';
          img.style.cssText='display:block;width:100%;height:auto;margin:0 0 10px 0;border:0;outline:0;box-shadow:none;border-radius:0;';
          card.insertBefore(img,card.firstChild);
        }
      }

      if(route==='crazy-joe'){
        var intro=document.querySelector('section.intro#crazy-joe');
        if(intro && !intro.querySelector('.joe-guide-header-image-v499')){
          var header=document.createElement('img');
          header.src='assets/crazy-joe-header-v461.webp';
          header.alt='Безумная Джо';
          header.className='joe-guide-header-image-v499';
          header.decoding='async';
          header.style.cssText='display:block;width:100%;height:auto;margin:0 0 18px 0;border:0;outline:0;box-shadow:none;border-radius:0;';
          intro.insertBefore(header,intro.firstChild);
        }
      }
    }

    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded',addJoeImages,{once:true});
    }else{
      addJoeImages();
    }
  };
  document.head.appendChild(core);
})();
