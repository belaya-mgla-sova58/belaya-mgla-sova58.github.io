'use strict';
// Static local links and media audit; does not change production.
const fs=require('node:fs'),path=require('node:path');
const base='https://belaya-mgla-sova58.github.io/';
const root=process.cwd(),out='static-links-audit-output';
fs.mkdirSync(out,{recursive:true});
function list(dir){
 let names=[];
 for(const e of fs.readdirSync(dir,{withFileTypes:true})){
  if(['.git','node_modules',out,'qa-smoke-output','full-site-audit-output','visual-audit-output'].includes(e.name))continue;
  const p=path.join(dir,e.name);
  if(e.isDirectory())names.push(...list(p));
  else if(e.isFile())names.push(path.relative(root,p).split(path.sep).join('/'));
 }
 return names;
}
const files=list(root),known=new Set(files);
const html=files.filter(f=>f.endsWith('.html')),css=files.filter(f=>f.endsWith('.css'));
const missing=[],anchors=[],invalid=[],withoutAlt=[];
const cache=new Map();
function content(f){if(!cache.has(f))cache.set(f,fs.readFileSync(path.join(root,f),'utf8'));return cache.get(f)}
function local(ref,from){
 if(!ref||/^(?:data:|javascript:|mailto:|tel:|blob:|about:)/i.test(ref))return null;
 if(/^(?:\$\{|<%|\{\{)/.test(ref))return null;
 try{
  const url=new URL(ref,new URL(from,base));
  if(url.origin!==new URL(base).origin)return null;
  let p=decodeURIComponent(url.pathname).replace(/^\/+/,'')||'index.html';
  if(!known.has(p)&&known.has(p+'/index.html'))p+='/index.html';
  if(!known.has(p)&&!/\.[a-z0-9]{1,7}$/i.test(p)&&known.has(p+'.html'))p+='.html';
  return {file:p,hash:url.hash?decodeURIComponent(url.hash.slice(1)):'',ref};
 }catch(e){invalid.push({from,ref:String(ref).slice(0,150)});return null}
}
function check(from,type,ref,anchor){
 const a=local(ref,from);if(!a)return;
 if(!known.has(a.file)){missing.push({from,type,ref:String(ref).slice(0,150),target:a.file});return}
 if(anchor&&a.hash&&a.file.endsWith('.html')){
  const escaped=a.hash.replace(/[.*+?^$()|[\]{}\\]/g,'\\$&');
  if(!new RegExp('\\b(?:id|name)\\s*=\\s*["\\x27]'+escaped+'["\\x27]','i').test(content(a.file)))
    anchors.push({from,type,ref:String(ref).slice(0,150),target:a.file,anchor:a.hash});
 }
}
function attr(tag,name){
 const r=new RegExp('(?:\\s|<)'+name+'\\s*=\\s*(?:"([^"]*)"|\\x27([^\\x27]*)\\x27|([^\\s>]+))','i');
 const m=r.exec(tag);return m?(m[1]??m[2]??m[3]):null;
}
for(const f of html){
 for(const tag of content(f).match(/<(?:a|img|link|script|iframe|source|video|audio|track|object)\b[^>]*>/gi)||[]){
  const kind=(tag.match(/^<([a-z]+)/i)||[])[1].toLowerCase();
  if(kind==='img'&&!/\balt\s*=/i.test(tag))withoutAlt.push({file:f,tag:tag.slice(0,90)});
  const prop=['a','link'].includes(kind)?'href':kind==='object'?'data':'src';
  const ref=attr(tag,prop);if(ref)check(f,kind+'.'+prop,ref,kind==='a');
  if(kind==='video'){const v=attr(tag,'poster');if(v)check(f,'video.poster',v)}
  if(kind==='img'||kind==='source'){
   const set=attr(tag,'srcset');
   if(set&&!set.startsWith('data:'))for(const part of set.split(',')){
     const value=part.trim().split(/\s+/)[0];if(value)check(f,kind+'.srcset',value);
   }
  }
 }
}
for(const f of css){
 for(const match of content(f).matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/gi)){
  check(f,'css.url',(match[1]??match[2]??match[3]).trim());
 }
}
const summary={htmlFiles:html.length,cssFiles:css.length,allFiles:files.length,
 missingReferences:missing.length,uniqueMissingTargets:new Set(missing.map(x=>x.target)).size,
 questionableAnchors:anchors.length,imagesWithoutAlt:withoutAlt.length,invalidURLs:invalid.length};
fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({summary,missing,anchors,withoutAlt,invalid},null,2));
fs.writeFileSync(path.join(out,'summary.json'),JSON.stringify(summary,null,2));
for(const x of missing.slice(0,120))console.log('LINK_MISSING '+JSON.stringify(x));
for(const x of anchors.slice(0,120))console.log('ANCHOR_SUSPECT '+JSON.stringify(x));
console.log('STATIC_TOTAL '+JSON.stringify(summary));
if(missing.length)process.exitCode=1;
