/* Belaya Mgla: install selected generated premium icons on homepage only. */
(function(){
"use strict";
var map={
 "heroes.html":"assets/bm-heroes-v1100.svg?v=3",
 "state-positions.html":"assets/bm-state-v1100.svg?v=3",
 "svs-prep.html":"assets/bm-prep-v1100.svg?v=3",
 "svs.html":"assets/bm-svs-v1100.svg?v=3",
 "other.html":"assets/bm-guides-verified-v1106.svg?v=1",
 "gear.html":"assets/bm-gear-verified-v1106.svg?v=1",
 "pets.html":"assets/bm-pets-verified-v1106.svg?v=1"
};
function apply(){
 if(!document.body.classList.contains("is-home-route"))return;
 Object.keys(map).forEach(function(href){
   document.querySelectorAll(href==='other.html'?'.modern-home-v424 .home-index-links-v1016 a[href="other.html"]':'.modern-home-v424 a[href="'+href+'"]').forEach(function(a){
      var svg=a.querySelector('svg.bm-home-glyph-v1074');
      if(!svg || a.querySelector('img.bm-premium-icon-v1100'))return;
      var img=document.createElement("img");
      img.className="bm-premium-icon-v1100";
      img.alt="";
      img.setAttribute("aria-hidden","true");
      img.decoding="async";
      img.width=80;
      img.height=80;
      img.src=map[href];
      svg.replaceWith(img);
   });
 });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});
else apply();
})();
