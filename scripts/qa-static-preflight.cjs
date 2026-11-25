/* Белая мгла: fast, read-only preflight for published HTML pages.
 * Run: node scripts/qa-static-preflight.cjs
 * Does not open the website or change visitor data.
 */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const ORIGIN='https://belaya-mgla-sova58.github.io';
const XML=fs.readFileSync(path.join(ROOT,'sitemap.xml'),'utf8');
const listed=[...XML.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(m=>new URL(m[1]).pathname.replace(/^\/+/,'' )||'index.html')
  .filter(p=>p.endsWith('.html'));
const extras=['sova-scanner-test.html','sova-backpack-scanner-test.html','sova-speedups-scanner-test.html','svs-kopilka-test.html','furnace-extra-buildings.html'];
const pages=[...new Set([...listed,...extras])];
const issues=[];
function exists(rel){return rel&&!rel.includes('..')&&fs.existsSync(path.join(ROOT,rel))}
for(const rel of pages){
  const file=path.join(ROOT,rel);
  if(!fs.existsSync(file)){issues.push(rel+': missing HTML file');continue}
  const html=fs.readFileSync(file,'utf8');
  if(!html.trim()){issues.push(rel+': empty HTML page');continue}
  if(!/<html\b/i.test(html))issues.push(rel+': no <html> tag');
  if(!/<title\b[^>]*>[\s\S]*?<\/title>/i.test(html))issues.push(rel+': no <title> tag');
  const ids=[...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]);
  const duplicates=[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))];
  if(duplicates.length)issues.push(rel+': duplicate ids: '+duplicates.slice(0,8).join(', '));
  for(const [index,match] of [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].entries()){
    const attrs=match[1]||'',script=match[2]||'';
    if(/\bsrc\s*=|type\s*=\s*["'](?:application\/ld\+json|application\/json|module)["']/i.test(attrs)||!script.trim())continue;
    try{new vm.Script(script,{filename:rel+':inline-script-'+index})}
    catch(e){issues.push(rel+': inline JS syntax '+index+': '+e.message)}
  }
  const links=[...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].map(m=>m[1]);
  for(const value of links){
    if(/^(?:mailto:|tel:|javascript:|data:|#)/i.test(value))continue;
    try{
      const target=new URL(value,ORIGIN+'/'+rel);
      if(target.origin!==ORIGIN)continue;
      const dest=target.pathname.replace(/^\/+/,'' )||'index.html';
      if(!dest.endsWith('.html'))continue;
      if(!exists(dest))issues.push(rel+': broken internal link '+value);
    }catch(e){issues.push(rel+': invalid link '+value)}
  }
}
const result={pages:pages.length,errors:issues.length,allSitemapPagesIncluded:listed.length,checkedExtras:extras.length};
console.log('STATIC_QA '+JSON.stringify(result));
for(const issue of issues)console.error('STATIC_QA_ERROR '+issue);
if(issues.length)process.exitCode=1;
