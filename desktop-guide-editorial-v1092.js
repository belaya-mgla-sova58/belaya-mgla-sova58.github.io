/* Белая Мгла | Only opt-in classic guides, desktop or touch 'Computer view'.
   Turns directly headed long guides into individual editorial cards.
   Keeps actual text, headings, anchors, images and game formulas untouched. */
(function(){
 "use strict";
 if(!document.querySelector('link[data-desktop-guide-expansion]'))return;
 var root=document.documentElement;
 var forced=root.classList.contains("force-desktop-root");
 var physical=!!(window.matchMedia&&window.matchMedia("(min-width:1100px) and (hover:hover) and (pointer:fine)").matches);
 if(!forced&&!physical)return;
 function setup(){
  if(!document.body||document.body.classList.contains("bm-guide-editorial-v1092"))return;
  if(!document.querySelector('link[data-desktop-guide-expansion]'))return;
  document.body.classList.add("bm-guide-editorial-v1092");
  var page=document.querySelector("main#appMain>.route-page.active");
  if(!page)return;
  var grids=0;
  page.querySelectorAll(":scope > section.section").forEach(function(section){
   if(section.classList.contains("bm-guide-topic-grid-v1092"))return;
   if(section.querySelector("form,input,textarea,select,[contenteditable]"))return;
   var nodes=Array.from(section.children);
   var headings=nodes.filter(function(n){return n.tagName==="H3";});
   var tag="H3";
   if(headings.length<4){
    headings=nodes.filter(function(n){return n.tagName==="H2";});
    tag="H2";
   }
   if(headings.length<4)return;
   var frag=document.createDocumentFragment();
   var card=null;
   var cards=0;
   nodes.forEach(function(node){
    if(node.tagName===tag){
     card=document.createElement("article");
     card.className="bm-guide-topic-card-v1092";
     card.setAttribute("aria-label",node.textContent.trim());
     frag.appendChild(card);
     cards++;
    }
    if(card)card.appendChild(node);
    else frag.appendChild(node);
   });
   if(cards<4)return;
   section.appendChild(frag);
   section.classList.add("bm-guide-topic-grid-v1092");
   section.querySelectorAll(":scope > .bm-guide-topic-card-v1092").forEach(function(card){
    if(card.querySelector(".tundra-box,.tundra-flow,table,figure")&&card.children.length>=4){
     card.classList.add("bm-guide-card-wide-v1092");
    }
   });
   grids++;
  });
  if(forced){
   var nav=document.querySelector(".nav-wrap");
   var side=document.querySelector(".view-mode-side-v629");
   var width="174px";
   if(nav){
    nav.style.setProperty("width",width,"important");
    nav.style.setProperty("max-width",width,"important");
   }
   if(side){
    var adjust=function(){
     side.style.setProperty("left",side.getAttribute("aria-expanded")==="true"?width:"0px","important");
    };
    side.addEventListener("click",adjust);
    adjust();
   }
  }
  document.body.dataset.guideEditorialGridsV1092=String(grids);
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});
 else setup();
})();
