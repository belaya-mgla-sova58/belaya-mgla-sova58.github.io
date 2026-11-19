/* Belaya Mgla v1155. Identical approved native WebP icon artwork on mobile & desktop.
   No SVG data extraction, no duplicate network fetches, no device-specific art.
   Previous inline SVG remains visible until the exact same asset has decoded. */
(function(){
"use strict";
var ASSETS={
  "heroes.html":"heroes",
  "state-positions.html":"positions",
  "svs-prep.html":"prep",
  "svs.html":"svs",
  "other.html":"guides",
  "gear.html":"gear",
  "pets.html":"pets",
  "experts.html":"experts",
  "labyrinth.html":"labyrinth",
  "events.html":"events",
  "calculators.html":"calculators",
  "bear-helper.html":"bear-helper",
  "farm.html":"farm",
  "beacon.html":"beacon",
  "mails.html":"mails",
  "state-58.html":"state58",
  "knowledge-card":"knowledge"
};
var MOBILE_NAV={
  "index.html":"assets/ui-home-v534.webp",
  "events.html":"assets/ui-events-v534.webp",
  "heroes.html":"assets/ui-heroes-v534.webp",
  "calculators.html":"assets/ui-calculator-v534.webp",
  "other.html":"assets/ui-knowledge-v534.webp"
};
var preloadCache=Object.create(null);
var renderCache=Object.create(null);
function load(url){
  if(preloadCache[url])return preloadCache[url];
  preloadCache[url]=new Promise(function(resolve){
    var probe=new Image();
    probe.onload=function(){resolve(probe)};
    probe.onerror=function(){resolve(null)};
    probe.decoding="async";
    probe.src=url;
  });
  return preloadCache[url];
}
function finishedAsset(url,ratio){
  var key=url+"#"+ratio;
  if(renderCache[key])return renderCache[key];
  renderCache[key]=load(url).then(function(probe){
    if(!probe)return null;
    if(ratio>=1)return url;
    try{
      var canvas=document.createElement("canvas");
      canvas.width=160;canvas.height=160;
      var ctx=canvas.getContext("2d");
      if(!ctx)return url;
      var side=Math.min(probe.naturalWidth,probe.naturalHeight)*ratio;
      ctx.drawImage(probe,(probe.naturalWidth-side)/2,(probe.naturalHeight-side)/2,side,side,0,0,160,160);
      return canvas.toDataURL("image/png");
    }catch(e){return url}
  });
  return renderCache[key];
}
function targets(href){
  if(href==="knowledge-card")
    return document.querySelectorAll('.modern-home-v424 .modern-topic-card-v424[href="other.html"]');
  if(href==="other.html")
    return document.querySelectorAll('.modern-home-v424 .home-index-links-v1016 a[href="other.html"]');
  return document.querySelectorAll('.modern-home-v424 a[href="'+href+'"]');
}
function cropFor(href,a){
  if(href==="svs-prep.html")return 0.72;
  if(href==="heroes.html"){
    if(a.classList.contains("modern-topic-card-v424"))return 0.73;
    if(a.closest(".home-portal-links-v1016"))return 0.82;
  }
  return 1;
}
function replaceCardIcon(a,href,key){
  if(a.querySelector("img.bm-premium-icon-v1100"))return;
  var svg=a.querySelector("svg.bm-home-glyph-v1074");
  if(!svg)return;
  var file="assets/bm-hq-"+key+"-v1155.webp";
  var crop=cropFor(href,a);
  finishedAsset(file,crop).then(function(src){
    if(!src||!svg.parentNode)return;
    var img=document.createElement("img");
    img.className="bm-premium-icon-v1100";
    img.alt="";
    img.setAttribute("aria-hidden","true");
    img.decoding="async";
    img.loading="eager";
    img.width=54;img.height=54;
    img.src=src;
    var host=svg.parentNode;
    svg.replaceWith(img);
    // Image positioning is shared, viewport-dependent CSS controls icon size.
    if(host&&host!==a){
      host.style.setProperty("display","grid","important");
      host.style.setProperty("place-items","center","important");
      host.style.setProperty("padding","0","important");
      host.style.setProperty("overflow","visible","important");
    }
    img.dataset.bmLoaded="true";
    img.dataset.bmArtwork="v1155";
  });
}
function syncMobileNav(){
  var nav=document.querySelector("body.is-home-route nav.mobile-bottom-v424");
  if(!nav)return;
  nav.querySelectorAll("a[href]").forEach(function(link){
    var href=link.getAttribute("href"),file=MOBILE_NAV[href];
    if(!file)return;
    var svg=link.querySelector(".mobile-nav-icon-v429 svg.bm-mobile-nav-icon-v1082");
    if(!svg)return;
    load(file).then(function(probe){
      if(!probe||!svg.parentNode)return;
      var img=document.createElement("img");
      img.className="bm-mobile-parity-icon-v1155";
      img.alt="";
      img.setAttribute("aria-hidden","true");
      img.decoding="async";
      img.width=32;img.height=32;
      img.src=file;
      svg.replaceWith(img);
    });
  });
}
function init(){
  if(!document.body||!document.body.classList.contains("is-home-route"))return;
  Object.keys(ASSETS).forEach(function(href){
    Array.prototype.forEach.call(targets(href),function(a){replaceCardIcon(a,href,ASSETS[href])});
  });
  syncMobileNav();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();
