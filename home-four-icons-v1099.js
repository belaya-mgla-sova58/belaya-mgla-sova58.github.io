/* White Mist homepage icon refresh v1099: four distinct readable silhouettes.
   Changes only existing inline icons in links to Heroes, SvS, Farm and Gear.
   Layout, links, other artwork and mobile navigation remain untouched. */
(function(){
"use strict";
var specs={
 "heroes.html":{
  color:"#8bdfff",shade:"#16345c",
  drawing:'<path d="M20 29V23c0-11 6-17 12-17s12 6 12 17v6" fill="#355f9b" stroke="#bcefff" stroke-width="2.5"/><path d="M22 23 32 14l10 9v8H22z" fill="#80b7e5" stroke="#f0fcff" stroke-width="2.2"/><path d="M25 27h14l-2 10-5 4-5-4z" fill="#e7d1af" stroke="#fff2d7" stroke-width="2"/><path d="M24 29h16l-3 5H27z" fill="#09243c" stroke="#c5f8ff" stroke-width="2"/><path d="M17 49c2-7 8-11 15-11s13 4 15 11l-6 5H23z" fill="#3972b6" stroke="#d2f5ff" stroke-width="2.5"/><path d="m25 44 7 6 7-6" fill="none" stroke="#ffe3a7" stroke-width="2.8"/><path d="m32 6-5 4 5 4 5-4z" fill="#ffe19e" stroke="#fff1cc" stroke-width="1"/>'
 },
 "svs-prep.html":{
  color:"#ffafda",shade:"#4b2057",
  drawing:'<path d="M14 46V25h9v-6h8v6h4v-6h8v6h7v21z" fill="#674182" stroke="#ffb3e5" stroke-width="2.8" stroke-linejoin="round"/><path d="M11 46h42v7H11z" fill="#263b68" stroke="#d9b7ff" stroke-width="2.7"/><path d="M27 53V38c0-3 2-5 5-5s5 2 5 5v15" fill="#101a40" stroke="#f9d7ff" stroke-width="2.2"/><path d="M20 19V8m0 0 10 3-10 5M44 19V8m0 0-10 3 10 5" fill="#ffcd89" stroke="#ffe9bf" stroke-width="2" stroke-linejoin="round"/><path d="m9 31 8 8m-8-8 3-6m-3 6-4-4M55 31l-8 8m8-8-3-6m3 6 4-4" fill="none" stroke="#a8efff" stroke-width="2.8" stroke-linecap="round"/>'
 },
 "farm.html":{
  color:"#81ffd1",shade:"#124b43",
  drawing:'<path d="M10 31 32 12l22 19v22H10z" fill="#1d685b" stroke="#b9ffe6" stroke-width="2.7" stroke-linejoin="round"/><path d="M7 31 32 9l25 22" fill="none" stroke="#fce3a0" stroke-width="4" stroke-linejoin="round"/><path d="M25 53V36h14v17M25 36l14 17M39 36 25 53" fill="#0e3341" stroke="#b4ffe4" stroke-width="2.2"/><path d="M15 40v-6h6v6zM43 40v-6h6v6z" fill="#f1d686" stroke="#e6fff3" stroke-width="1.5"/><path d="M10 53h44" stroke="#fff1c8" stroke-width="2.5"/><path d="M51 17v-6m0 6-4-4m4 4 4-4" fill="none" stroke="#7bffb7" stroke-width="2" stroke-linecap="round"/>'
 },
 "gear.html":{
  color:"#d2b2ff",shade:"#3a2359",
  drawing:'<path d="m19 13 13 5 13-5 9 12-7 8-5-3v23H22V30l-5 3-7-8z" fill="#6950aa" stroke="#f0dfff" stroke-width="2.9" stroke-linejoin="round"/><path d="M22 22c3 5 6 8 10 8s7-3 10-8" fill="none" stroke="#e4c1ff" stroke-width="2.5"/><path d="m32 31 8 6-3 12H27l-3-12z" fill="#203c70" stroke="#a7e9ff" stroke-width="2.5"/><path d="m32 34 4 5-4 7-4-7z" fill="#ffe3a1" stroke="#fff3d8" stroke-width="1.5"/><path d="M15 38v14m-4-10 4-4 4 4M49 38v14m-4-10 4-4 4 4" fill="none" stroke="#d8b8ff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'
 }
};
function artwork(name,number){
 var s=specs[name];
 var id="bm-home-icon-1099-"+number;
 return '<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+s.shade+'"/><stop offset=".62" stop-color="#0b2044"/><stop offset="1" stop-color="#080e28"/></linearGradient></defs>'
  +'<rect x="2.5" y="2.5" width="59" height="59" rx="14" fill="url(#'+id+')" stroke="'+s.color+'" stroke-width="2.2"/>'
  +'<path d="M9 12q11-6 22-4M54 49q-12 8-24 5" fill="none" stroke="'+s.color+'" stroke-opacity=".35" stroke-width="1.2"/>'
  +'<path d="M9 45v5m-2.5-2.5h5M52 12v5m-2.5-2.5h5" stroke="'+s.color+'" stroke-opacity=".65" stroke-width="1.3"/>'
  +s.drawing;
}
function update(){
 var n=0;
 Object.keys(specs).forEach(function(href){
  document.querySelectorAll('body.is-home-route a[href="'+href+'"] svg.bm-home-glyph-v1074').forEach(function(svg){
   if(svg.dataset.bmReplaced1099)return;
   svg.innerHTML=artwork(href,++n);
   svg.dataset.bmReplaced1099="1";
   svg.setAttribute("data-neon",href==="farm.html"?"mint":href==="gear.html"?"violet":href==="svs-prep.html"?"pink":"cyan");
  });
 });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",update,{once:true});
else update();
})();
