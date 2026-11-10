/* Belaya Mgla: install selected generated premium icons on homepage only. */
(function(){
"use strict";
var map={
 "heroes.html":"assets/bm-heroes-v1100.svg",
 "state-positions.html":"assets/bm-state-v1100.svg",
 "svs-prep.html":"assets/bm-prep-v1100.svg",
 "svs.html":"assets/bm-svs-v1100.svg"
};
function apply(){
 if(!document.body.classList.contains("is-home-route"))return;
 Object.keys(map).forEach(function(href){
   document.querySelectorAll('.modern-home-v424 a[href="'+href+'"]').forEach(function(a){
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
