!function(){"use strict";
function hideTechnicalTextNode(n){
  if(!n||n.nodeType!==3||!n.parentElement)return;
  var p=n.parentElement;if(/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|CODE|PRE)$/i.test(p.tagName))return;
  var s=n.nodeValue||'',trim=s.trim();
  if(s.indexOf('Whiteout Survival')!==-1){s=s.replace(/Whiteout Survival/g,'Белая мгла');n.nodeValue=s;trim=s.trim()}
  if(/^(DEBUG|TEST|DEMO|PLACEHOLDER|TECHNICAL)$/i.test(trim)||/^v\d{2,}$/i.test(trim)){
    if(p.children.length===0)p.style.display='none';
  }
}
function cleanElement(root){
  if(!root)return;
  if(root.nodeType===3){hideTechnicalTextNode(root);return}
  if(root.nodeType!==1&&root.nodeType!==9&&root.nodeType!==11)return;
  if(root.nodeType===1){
    if(root.matches('.creative-music-badge-v590'))root.remove();
    if(root.matches('.creative-v349-kind')){
      var k=(root.textContent||'').trim();
      if(/МУЗЫКАЛЬНАЯ\s+ПУБЛИКАЦИЯ/i.test(k)||/НОВАЯ\s+ПРЕМЬЕРА/i.test(k))root.textContent='♫ Песня';
    }
    if(root.matches('.notify-status-v630')){
      var st=root.textContent||'';
      if(/ID:\s*/i.test(st))root.textContent=st.replace(/\s*ID:\s*[^\s…]+…?/i,'').trim();
    }
  }
  if(root.querySelectorAll){
    root.querySelectorAll('.creative-music-badge-v590').forEach(function(el){el.remove()});
    root.querySelectorAll('.creative-v349-kind').forEach(function(el){var t=(el.textContent||'').trim();if(/МУЗЫКАЛЬНАЯ\s+ПУБЛИКАЦИЯ/i.test(t)||/НОВАЯ\s+ПРЕМЬЕРА/i.test(t))el.textContent='♫ Песня'});
    root.querySelectorAll('.notify-status-v630').forEach(function(el){var t=el.textContent||'';if(/ID:\s*/i.test(t))el.textContent=t.replace(/\s*ID:\s*[^\s…]+…?/i,'').trim()});
  }
  var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;while((n=walker.nextNode()))hideTechnicalTextNode(n);
}
function start(){
  cleanElement(document.body||document.documentElement);
  try{new MutationObserver(function(list){list.forEach(function(m){if(m.type==='characterData')hideTechnicalTextNode(m.target);else m.addedNodes.forEach(cleanElement)})}).observe(document.documentElement,{subtree:true,childList:true,characterData:true})}catch(e){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
}();
