/* Reliable desktop icon sizing (v968). Preserve original artwork on small screens. */
(function(){
  "use strict";
  var palette={
    home:"#a6e1ff",events:"#81d2ff",heroes:"#d5aaff",gear:"#91e5fc",
    experts:"#d7b6ff",pets:"#90ebce",calculator:"#f5d18b",
    knowledge:"#b1d7ff",svs:"#c4b4ff",news:"#a8e6f5",updates:"#a9e6ff",
    state:"#ffdb9e",positions:"#f1d48f",farm:"#a5edba",
    beacon:"#e3c4ff",mails:"#b3e8ff",labyrinth:"#d3b3f6"
  };
  var selector="body.is-home-route svg.pc-site-icon-v967";
  function isDesktop(){
    return !document.documentElement.classList.contains("force-desktop-root") &&
      window.matchMedia("(min-width:1201px) and (hover:hover) and (pointer:fine)").matches;
  }
  function set(node,name,value){
    if(value===null)node.style.removeProperty(name);
    else node.style.setProperty(name,value,"important");
  }
  function render(){
    var pc=isDesktop(),icons=document.querySelectorAll(selector);
    icons.forEach(function(svg){
      var parent=svg.parentElement;
      if(!parent)return;
      var nav=!!svg.closest(".nav-wrap>nav>a");
      var shortcut=parent.classList.contains("pc-shortcut-icon-v966");
      var list=parent.classList.contains("v424-list-icon");
      var size=nav?25:shortcut?27:list?24:27;
      var imgs=parent.querySelectorAll("img");
      imgs.forEach(function(img){set(img,"display",pc?"none":null);});
      set(svg,"display",pc?"block":"none");
      if(pc){
        set(svg,"width",size+"px");set(svg,"height",size+"px");
        set(svg,"max-width",size+"px");set(svg,"max-height",size+"px");
        set(svg,"min-width",size+"px");set(svg,"min-height",size+"px");
        set(svg,"flex","0 0 "+size+"px");
        set(svg,"margin","0");set(svg,"padding","0");
        set(svg,"position","static");set(svg,"transform","none");
        set(svg,"overflow","hidden");set(svg,"box-sizing","border-box");
        set(svg,"color",palette[svg.getAttribute("data-icon")]||"#cde8ff");
        set(svg,"fill","none");
        if(!nav){
          set(parent,"font-size","0");
          set(parent,"display","grid");
          set(parent,"place-items","center");
          set(parent,"align-content","center");
          set(parent,"overflow","hidden");
        }
      }else{
        ["width","height","max-width","max-height","min-width","min-height",
         "flex","margin","padding","position","transform","overflow",
         "box-sizing","color","fill"].forEach(function(p){set(svg,p,null);});
        if(!nav){
          ["font-size","display","place-items","align-content","overflow"].forEach(
            function(p){set(parent,p,null);}
          );
        }
      }
    });
  }
  function start(){
    render();
    window.addEventListener("resize",render,{passive:true});
    if(window.matchMedia){
      var mq=window.matchMedia("(min-width:1201px) and (hover:hover) and (pointer:fine)");
      if(mq.addEventListener)mq.addEventListener("change",render);
    }
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
  else start();
})();
