/* White Mist v1107: native image decoding for approved three icons.
   Their WEBP image bytes are stored inside same-origin SVG wrappers; external SVG
   image contexts can block nested raster sources. Extract to direct WEBP data URL. */
(function(){
"use strict";
var assets={
 "heroes.html":"assets/bm-hq-heroes-v1117.svg?v=1",
 "state-positions.html":"assets/bm-hq-positions-v1117.svg?v=1",
 "svs-prep.html":"assets/bm-hq-prep-v1117.svg?v=1",
 "svs.html":"assets/bm-hq-svs-v1117.svg?v=1",
 "other.html":"assets/bm-hq-guides-v1117.svg?v=1",
 "gear.html":"assets/bm-hq-gear-v1117.svg?v=1",
 "pets.html":"assets/bm-hq-pets-v1117.svg?v=1",
 "experts.html":"assets/bm-hq-experts-v1117.svg?v=1",
 "labyrinth.html":"assets/bm-hq-labyrinth-v1117.svg?v=1",
 "events.html":"assets/bm-hq-events-v1117.svg?v=1",
 "calculators.html":"assets/bm-hq-calculators-v1117.svg?v=1",
 "bear-helper.html":"assets/bm-hq-bear-helper-v1117.svg?v=1",
 "farm.html":"assets/bm-hq-farm-v1117.svg?v=1",
 "beacon.html":"assets/bm-hq-beacon-v1117.svg?v=1",
 "mails.html":"assets/bm-hq-mails-v1117.svg?v=1",
 "state-58.html":"assets/bm-hq-state58-v1117.svg?v=1",
 "knowledge-card":"assets/bm-hq-knowledge-v1117.svg?v=1"
};
function locate(href){
 if(href==="knowledge-card")return document.querySelectorAll('.modern-home-v424 .modern-topic-card-v424[href="other.html"]');
 if(href==="other.html")return document.querySelectorAll('.modern-home-v424 .home-index-links-v1016 a[href="other.html"]');
 return document.querySelectorAll('.modern-home-v424 a[href="'+href+'"]');
}
function nativeImageFromWrapper(img,url){
 fetch(url,{cache:"no-store"}).then(function(r){
  if(!r.ok)throw Error("Icon asset missing: "+r.status);
  return r.text();
 }).then(function(xml){
  var m=xml.match(/href="(data:image\/webp;base64,[A-Za-z0-9+/=]+)"/);
  if(!m)throw Error("Icon payload missing");
  var data=m[1];
  return new Promise(function(resolve,reject){
   var probe=new Image();
   probe.onload=function(){resolve(data)};
   probe.onerror=reject;
   probe.src=data;
  });
 }).then(function(data){
  img.src=data;
  img.dataset.bmLoaded="true";
 }).catch(function(){
  /* Never leave a broken image; original inline SVG stays as fallback. */
  if(img.parentNode)img.remove();
  var original=img.__bmOriginalSvg;
  if(original&&img.__bmHost&&!img.__bmHost.querySelector('svg.bm-home-glyph-v1074'))img.__bmHost.insertBefore(original,img.__bmHost.firstChild);
 });
}
function apply(){
 if(!document.body||!document.body.classList.contains("is-home-route"))return;
 Object.keys(assets).forEach(function(href){
  Array.prototype.forEach.call(locate(href),function(a){
   if(a.querySelector('img.bm-premium-icon-v1100'))return;
   var svg=a.querySelector('svg.bm-home-glyph-v1074');
   if(!svg)return;
   var img=document.createElement("img");
   img.className="bm-premium-icon-v1100";
   img.alt="";
   img.setAttribute("aria-hidden","true");
   img.decoding="async";
   img.width=80;img.height=80;
   img.__bmOriginalSvg=svg.cloneNode(true);
   img.__bmHost=svg.parentNode;
   /* v1113: one natural 64px scale on phone and desktop. CSS owns size. */
   var compact=window.matchMedia&&window.matchMedia('(max-width:820px)').matches;
   var iconSize=compact?42:54;
   img.width=iconSize;
   img.height=iconSize;
   ['width','height','min-width','min-height','max-width','max-height','flex-basis'].forEach(function(prop){
     img.style.setProperty(prop,iconSize+'px','important');
   });
   img.style.setProperty('object-fit','contain','important');
   /* Optical correction for three approved icons with unusually wide internal margins.
      Keep the CSS layout boxes 54px desktop / 42px mobile. */
   var isPrepTool=a.matches('.home-tools-grid-v1016 > a[href="svs-prep.html"]');
   var isPrepQuick=a.matches('.home-quick-links-v1024 > a[href="svs-prep.html"]');
   var isHeroFocus=a.matches('.home-portal-links-v1016 > a[href="heroes.html"]');
   var iconScale=isPrepTool?(compact?1.34:1.52):(isPrepQuick?(compact?1.28:1.38):(isHeroFocus?(compact?1.22:1.30):1));
   img.style.setProperty('transform',iconScale===1?'none':'scale('+iconScale+')','important');
   img.style.setProperty('transform-origin','center center','important');
   var tile=svg.parentNode;
   if(tile&&tile!==a){
     ['width','height','min-width','min-height','max-width','max-height','flex-basis'].forEach(function(prop){
       tile.style.setProperty(prop,iconSize+'px','important');
     });
     tile.style.setProperty('overflow','visible','important');
     tile.style.setProperty('display','grid','important');
     tile.style.setProperty('place-items','center','important');
     tile.style.setProperty('padding','0','important');
   }
   if(a.classList.contains('modern-topic-card-v424')){
     a.style.setProperty('grid-template-columns',iconSize+'px minmax(0,1fr)','important');
   }
   /* Hide temporarily until decoded, preventing broken placeholder. */
   img.style.visibility="hidden";
   var host=svg.parentNode;
   svg.replaceWith(img);
   fetch(assets[href],{cache:"no-store"}).then(function(r){
    if(!r.ok)throw Error("fetch failed");
    return r.text();
   }).then(function(xml){
    var m=xml.match(/href="(data:image\/webp;base64,[A-Za-z0-9+/=]+)"/);
    if(!m)throw Error("no valid webp embedded");
    var data=m[1],probe=new Image();
    probe.onload=function(){img.src=data;img.style.visibility="visible";img.dataset.bmLoaded="true"};
    probe.onerror=function(){throwBack()};
    probe.src=data;
   }).catch(throwBack);
   function throwBack(){
    if(img.parentNode){img.replaceWith(img.__bmOriginalSvg)}
   }
  });
 });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
})();