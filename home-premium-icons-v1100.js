/* White Mist v1107: native image decoding for approved three icons.
   Their WEBP image bytes are stored inside same-origin SVG wrappers; external SVG
   image contexts can block nested raster sources. Extract to direct WEBP data URL. */
(function(){
"use strict";
var assets={
 "heroes.html":"assets/bm-heroes-v1100.svg?v=3",
 "state-positions.html":"assets/bm-state-v1100.svg?v=3",
 "svs-prep.html":"assets/bm-prep-v1100.svg?v=3",
 "svs.html":"assets/bm-svs-v1100.svg?v=3",
 "other.html":"assets/bm-guides-verified-v1106.svg?v=2",
 "gear.html":"assets/bm-gear-verified-v1106.svg?v=2",
 "pets.html":"assets/bm-pets-verified-v1106.svg?v=2",
 "experts.html":"assets/bm-experts-v1108.svg?v=1",
 "labyrinth.html":"assets/bm-labyrinth-v1108.svg?v=1",
 "events.html":"assets/bm-events-v1108.svg?v=1",
 "calculators.html":"assets/bm-calculators-v1109.svg?v=1",
 "bear-helper.html":"assets/bm-bear-helper-v1109.svg?v=1",
 "farm.html":"assets/bm-farm-v1109.svg?v=1",
 "beacon.html":"assets/bm-beacon-approved-v1110.svg?v=1",
 "mails.html":"assets/bm-mails-approved-v1110.svg?v=1",
 "state-58.html":"assets/bm-state58-approved-v1110.svg?v=1",
 "knowledge-card":"assets/bm-knowledge-approved-v1110.svg?v=1"
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
   img.style.setProperty('transform','none','important');
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