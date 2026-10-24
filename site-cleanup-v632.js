!function(){"use strict";
function clean(){
  document.querySelectorAll('.creative-music-badge-v590').forEach(function(el){el.remove()});
  document.querySelectorAll('.creative-v349-kind').forEach(function(el){
    var t=(el.textContent||'').trim();
    if(/МУЗЫКАЛЬНАЯ\s+ПУБЛИКАЦИЯ/i.test(t)||/НОВАЯ\s+ПРЕМЬЕРА/i.test(t))el.textContent='♫ Песня';
  });
  document.querySelectorAll('.notify-status-v630').forEach(function(el){
    var t=el.textContent||'';
    if(/ID:\s*/i.test(t))el.textContent=t.replace(/\s*ID:\s*[^\s…]+…?/i,'').trim();
  });
  var walker=document.createTreeWalker(document.body||document.documentElement,NodeFilter.SHOW_TEXT);
  var n;
  while((n=walker.nextNode())){
    if(!n.parentElement||/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|CODE|PRE)$/i.test(n.parentElement.tagName))continue;
    var s=n.nodeValue||'';
    if(s.indexOf('Whiteout Survival')!==-1)n.nodeValue=s.replace(/Whiteout Survival/g,'Белая мгла');
  }
}
function start(){clean();try{new MutationObserver(function(){clean()}).observe(document.documentElement,{subtree:true,childList:true,characterData:true})}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
}();
