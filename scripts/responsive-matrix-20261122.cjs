/* "Белая мгла": viewport matrix. Read-only: no form submissions or counter writes. */
'use strict';
const {chromium,devices}=require('playwright');
const fs=require('node:fs'),path=require('node:path');
const ORIGIN='https://belaya-mgla-sova58.github.io';
const PAGES=['/','/news.html','/events.html','/heroes.html','/hero-generations.html',
 '/gear.html','/experts.html','/pets.html','/calculators.html','/other.html',
 '/svs-prep.html','/svs-kopilka-test.html','/bear-helper.html',
 '/furnace-calculator.html','/fire-furnace-calculator.html',
 '/chief-gear-calculator.html','/essence-mithril-calculator.html',
 '/winter-siege.html','/news-elena.html','/ogonek.html'];
const WIDTHS=[320,375,412,768,1024,1440,1920];
const OUT=path.join(process.cwd(),'responsive-matrix-output');
fs.mkdirSync(OUT,{recursive:true});
const records=[];let screenshots=0;const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  for(const width of WIDTHS){
   const touch=width<=768;
   const config=touch?
      {...devices['Pixel 7'],viewport:{width,height:width<=375?740:840},serviceWorkers:'block',reducedMotion:'reduce'}:
      {viewport:{width,height:900},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'};
   const ctx=await browser.newContext(config);
   for(const pathname of PAGES){
    const page=await ctx.newPage(),rec={width,page:pathname,mode:touch?'touch':'desktop',status:0,overflow:0,jsErrors:[],issues:[]};
    await page.route('**/*',route=>{
     const req=route.request();let host='';
     try{host=new URL(req.url()).hostname}catch(e){}
     if(!['GET','HEAD'].includes(req.method())||
        /^(?:mc\.yandex\.(?:ru|com)|(?:www\.)?googletagmanager\.com|(?:www\.)?google-analytics\.com)$/i.test(host))
        return route.abort();
     return route.continue();
    });
    page.on('pageerror',e=>rec.jsErrors.push(String(e).slice(0,200)));
    try{
     const response=await page.goto(ORIGIN+pathname,{waitUntil:'domcontentloaded',timeout:28000});
     rec.status=response?.status()||0;
     await page.waitForTimeout(650);
     const geom=await page.evaluate(()=>{
      const doc=document.documentElement,b=document.body;
      const extra=Math.max(doc.scrollWidth,b?.scrollWidth||0)-innerWidth;
      const h1=doc.querySelector('h1');
      const rect=h1?.getBoundingClientRect();
      return {overflow:Math.max(0,Math.round(extra)),h1Visible:!!h1,
       headingOffscreen:rect?rect.right<=0||rect.left>=innerWidth:false,
       screenWidth:innerWidth,docWidth:doc.scrollWidth,
       offending:[...document.querySelectorAll('body *')].filter(el=>{
        const st=getComputedStyle(el),r=el.getBoundingClientRect();
        return st.display!=='none'&&st.visibility!=='hidden'&&r.width>0&&
          r.right>innerWidth+12&&r.left<innerWidth&&st.position!=='fixed';
       }).sort((a,b)=>b.getBoundingClientRect().right-a.getBoundingClientRect().right)
        .slice(0,4).map(el=>({tag:el.tagName,cls:String(el.className||'').slice(0,75),right:Math.round(el.getBoundingClientRect().right)}))
      };
     });
     rec.overflow=geom.overflow;rec.screenWidth=geom.screenWidth;rec.offenders=geom.offending;
     if(rec.status!==200)rec.issues.push('HTTP '+rec.status);
     if(rec.overflow>8)rec.issues.push('Horizontal overflow '+rec.overflow+'px');
     if(geom.headingOffscreen)rec.issues.push('Page H1 completely outside viewport');
     if(rec.jsErrors.length)rec.issues.push('JS exceptions: '+rec.jsErrors.length);
     if(rec.issues.length&&screenshots<12){
       const label=(pathname==='/'?'home':pathname.replace(/[^\w-]+/g,'-'));
       const shot=width+'-'+label+'.jpg';
       try{await page.screenshot({path:path.join(OUT,shot),type:'jpeg',quality:56,fullPage:false,timeout:7000});rec.screenshot=shot;screenshots++}catch(e){}
     }
    }catch(e){rec.issues.push('Navigation: '+String(e).slice(0,200))}
    records.push(rec);
    if(rec.issues.length)console.log('MATRIX_ISSUE '+JSON.stringify(rec));
    await page.close().catch(()=>{});
   }
   await ctx.close();
   console.log('MATRIX_PROGRESS '+width+' '+records.length+'/'+(PAGES.length*WIDTHS.length));
  }
 }finally{await browser.close()}
 const total={pageCount:PAGES.length,widths:WIDTHS,checks:records.length,
  problematicChecks:records.filter(x=>x.issues.length).length,
  overflowChecks:records.filter(x=>x.overflow>8).length,
  httpFailures:records.filter(x=>x.status!==200).length};
 fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify({total,records},null,2));
 console.log('MATRIX_TOTAL '+JSON.stringify(total));
 if(total.problematicChecks)process.exitCode=1;
})().catch(e=>{console.error('MATRIX_FATAL '+String(e));process.exitCode=1});
