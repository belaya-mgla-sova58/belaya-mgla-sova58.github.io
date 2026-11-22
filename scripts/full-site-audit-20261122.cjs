/* Белая мгла: полный безопасный аудит всех HTML-файлов в публикации.
 * Чтение страниц без отправки форм, нажатия на счетчики и изменения данных игроков. */
'use strict';
const fs=require('node:fs'),path=require('node:path');
const {chromium,devices}=require('playwright');
const origin=new URL('https://belaya-mgla-sova58.github.io/');
const output=path.join(process.cwd(),'full-site-audit-output');
fs.mkdirSync(output,{recursive:true});
const allHtml=fs.readdirSync(process.cwd()).filter(p=>p.toLowerCase().endsWith('.html')).sort();
const legacy=p=>p!=='buildings-before-fire.html'&&/(-before-|approved-|moon-mirror-test|-test\.html|^google[0-9]|^yandex_|^404\.html)/i.test(p);
const pages=[...allHtml].sort((a,b)=>Number(legacy(a))-Number(legacy(b))||a.localeCompare(b));
const records=[],start=Date.now();
let screenshots=0;
const cpuWorkers=Math.min(4,Math.max(1,Number(process.env.AUDIT_WORKERS)||3));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function localPath(u){
 try{
  const url=new URL(u,origin);
  if(url.origin!==origin.origin)return null;
  const name=decodeURIComponent(url.pathname).replace(/^\/+/, '')||'index.html';
  if(name.includes('..'))return null;
  return name;
 }catch(e){return null}
}
const exists=p=>p&&fs.existsSync(path.join(process.cwd(),p));
function save(){
 fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({
  generatedAt:new Date().toISOString(),origin:origin.href,checked:records.length,totalHtml:pages.length,
  productionPages:pages.filter(x=>!legacy(x)).length,legacyAndTestPages:pages.filter(legacy).length,
  durationSeconds:Math.round((Date.now()-start)/1000),pages:records
 },null,2));
}
async function visit(browser,filename,mode){
 const rec={file:filename,mode,legacyOrTest:legacy(filename),status:null,title:'',h1:0,description:false,overflow:0,visibleImages:0,brokenImages:[],missingLocal:[],httpAssetFailures:[],jsErrors:[],links:0,missingAlt:0,durationMs:0,issues:[]};
 const context=await browser.newContext(mode==='android'
   ? {...devices['Pixel 7'],serviceWorkers:'block',reducedMotion:'reduce'}
   : {viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
 const page=await context.newPage();
  // Browser tests must not write counters, forms, or analytics events.
  await page.route('**/*',route=>{
    const request=route.request();
    let hostname='';
    try{hostname=new URL(request.url()).hostname}catch(e){}
    if(!['GET','HEAD'].includes(request.method())||
       /^(?:mc\.yandex\.(?:ru|com)|(?:www\.)?googletagmanager\.com|(?:www\.)?google-analytics\.com)$/i.test(hostname))
      return route.abort();
    return route.continue();
  });
 const errors=[],httpErrors=[];
 page.on('pageerror',e=>errors.push(String(e).slice(0,180)));
 page.on('response',r=>{try{
  const u=new URL(r.url());
  if(u.origin===origin.origin&&r.status()>=400&&/\.(js|css|png|jpe?g|webp|gif|svg|json|html|woff2?)$/i.test(u.pathname))
    httpErrors.push(r.status()+' '+u.pathname);
 }catch(e){}});
 const t=Date.now();
 try{
  const response=await page.goto(new URL(filename,origin).href,{waitUntil:'domcontentloaded',timeout:27000});
  rec.status=response?response.status():null;
  await page.waitForTimeout(650);
  const info=await page.evaluate(()=>{
   const images=[...document.querySelectorAll('img')];
   const shown=images.filter(el=>{const r=el.getBoundingClientRect();const cs=getComputedStyle(el);return r.width>0&&r.height>0&&r.top<innerHeight&&r.bottom>0&&cs.visibility!=='hidden'&&cs.display!=='none'});
   return {
     title:document.title,h1:document.querySelectorAll('h1').length,
     description:!!document.querySelector('meta[name="description"][content]'),
     overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),
     visibleImages:shown.length,
     brokenImages:shown.filter(el=>el.hasAttribute('src')&&el.getAttribute('src')&&el.complete&&el.naturalWidth===0).map(el=>el.currentSrc||el.src).slice(0,20),
     missingAlt:images.filter(el=>!el.hasAttribute('alt')).length,
     links:[...document.querySelectorAll('a[href],script[src],link[href],img[src],source[src]')].map(el=>({
       tag:el.tagName,href:el.getAttribute('href')||el.getAttribute('src')||''
     }))
   };
  });
  rec.title=info.title;rec.h1=info.h1;rec.description=info.description;rec.overflow=info.overflow;
  rec.visibleImages=info.visibleImages;rec.brokenImages=info.brokenImages;
  rec.missingAlt=info.missingAlt;
  rec.links=info.links.filter(x=>x.tag==='A').length;
  const missing=new Set();
  for(const link of info.links){
    const ref=link.href;
    if(!ref||ref==='#'||ref.startsWith('#')||ref.startsWith('data:')||ref.startsWith('javascript:')||ref.startsWith('blob:'))continue;
    const dest=localPath(new URL(ref,new URL(filename,origin)).href);
    if(!dest)continue;
    if(!exists(dest)&&!exists(dest+'/index.html'))missing.add(link.tag+' '+dest);
  }
  rec.missingLocal=[...missing].slice(0,24);
 }catch(e){rec.issues.push('Navigation: '+String(e).slice(0,220))}
 finally{rec.durationMs=Date.now()-t;rec.jsErrors=[...new Set(errors)].slice(0,6);rec.httpAssetFailures=[...new Set(httpErrors)].slice(0,14);}
 if(rec.status!==200)rec.issues.push('HTTP '+rec.status);
 if(rec.overflow>8)rec.issues.push('Horizontal overflow '+rec.overflow+'px');
 if(rec.brokenImages.length)rec.issues.push('Broken viewport images: '+rec.brokenImages.length);
 if(rec.missingLocal.length)rec.issues.push('Missing local link/asset: '+rec.missingLocal.length);
 if(rec.httpAssetFailures.length)rec.issues.push('Failed local asset requests: '+rec.httpAssetFailures.length);
 if(rec.jsErrors.length)rec.issues.push('JS exceptions: '+rec.jsErrors.length);
 if(!rec.title)rec.issues.push('Missing document title');
 if(!rec.description&&!rec.legacyOrTest)rec.issues.push('Missing SEO description');
 if(!rec.h1&&!rec.legacyOrTest)rec.issues.push('Missing h1');
 if(rec.missingAlt)rec.issues.push('Images without alt: '+rec.missingAlt);
 if(rec.issues.length&&screenshots<16){
  const shot='issues-'+(screenshots++)+'-'+mode+'-'+filename.replace(/[^a-z0-9.-]/gi,'_')+'.jpg';
  try{await page.screenshot({path:path.join(output,shot),type:'jpeg',quality:48,fullPage:false,timeout:4500});rec.screenshot=shot}catch(e){}
 }
 await context.close().catch(()=>{});
 return rec;
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 let idx=0;
 const tasks=pages.flatMap(p=>[{file:p,mode:'android'},{file:p,mode:'desktop'}]);
 async function worker(){
  while(idx<tasks.length){
   const item=tasks[idx++];
   const rec=await visit(browser,item.file,item.mode);
   records.push(rec);
   if(rec.issues.length)console.log('AUDIT_ISSUE '+JSON.stringify({
    file:rec.file,mode:rec.mode,legacy:rec.legacyOrTest,issues:rec.issues,
    missingLocal:rec.missingLocal.slice(0,8),httpAssetFailures:rec.httpAssetFailures.slice(0,5),
    brokenImages:rec.brokenImages.slice(0,4),jsErrors:rec.jsErrors.slice(0,3)
   }));
   if(records.length%20===0){save();console.log('AUDIT_PROGRESS '+records.length+'/'+tasks.length)}
  }
 }
 try{await Promise.all(Array.from({length:cpuWorkers},()=>worker()))}
 finally{await browser.close();save()}
 const publicChecks=records.filter(x=>!x.legacyOrTest);
 const summary={
  pages:pages.length,checks:records.length,publicChecks:publicChecks.length,
  legacyChecks:records.length-publicChecks.length,
  problematicPublic:publicChecks.filter(x=>x.issues.length).length,
  missingLocal:publicChecks.filter(x=>x.missingLocal.length).length,
  failedAssets:publicChecks.filter(x=>x.httpAssetFailures.length).length,
  brokenImages:publicChecks.filter(x=>x.brokenImages.length).length,
  overflow:publicChecks.filter(x=>x.overflow>8).length,
  javascriptErrors:publicChecks.filter(x=>x.jsErrors.length).length,
  missingSEODescription:publicChecks.filter(x=>!x.description).length,
  missingH1:publicChecks.filter(x=>!x.h1).length,
  durationSeconds:Math.round((Date.now()-start)/1000)
 };
 fs.writeFileSync(path.join(output,'summary.json'),JSON.stringify(summary,null,2));
 console.log('AUDIT_TOTAL '+JSON.stringify(summary));
})().catch(e=>{console.error('AUDIT_FATAL '+String(e));process.exitCode=1});
