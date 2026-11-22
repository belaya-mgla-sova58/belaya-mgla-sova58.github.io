/* "Белая мгла": viewport matrix. Read-only: no form submissions or counter writes. */
'use strict';
const {chromium,devices}=require('playwright');
const fs=require('node:fs'),path=require('node:path');
const ORIGIN='https://belaya-mgla-sova58.github.io';
const PAGES=['/','/news.html','/events.html','/heroes.html','/hero-generations.html',
 '/newbie.html','/gear.html','/experts.html','/pets.html','/calculators.html','/other.html',
 '/svs-prep.html','/fishing.html','/svs-kopilka-test.html','/bear-helper.html',
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
      const visibleImages=[...document.images].filter(el=>{const r=el.getBoundingClientRect(),st=getComputedStyle(el);return r.width>1&&r.height>1&&r.top<innerHeight&&r.bottom>0&&st.display!=='none'&&st.visibility!=='hidden'});
      const brokenImages=visibleImages.filter(el=>el.complete&&el.naturalWidth===0).map(el=>(el.currentSrc||el.src).slice(0,180));
      const bottomNav=document.querySelector('nav.mobile-bottom-v424');
      const navRect=bottomNav?.getBoundingClientRect();
      const navStyle=bottomNav?getComputedStyle(bottomNav):null;
      const bottomNavOverflow=navRect&&navStyle?.display!=='none'?Math.max(0,Math.round(-navRect.left),Math.round(navRect.right-innerWidth)):0;
      const rect=h1?.getBoundingClientRect();
      const h1Style=h1?getComputedStyle(h1):null;
      const intentionalScreenReaderOnly=!!h1&&h1.classList.contains('home-main-title-v571')&&h1Style.display!=='none'&&h1Style.visibility!=='hidden';
      return {overflow:Math.max(0,Math.round(extra)),brokenImages,bottomNavOverflow,h1Visible:!!h1,
       inaccessibleHiddenH1:!!h1&&h1.classList.contains('home-main-title-v571')&&(h1Style.display==='none'||h1Style.visibility==='hidden'),
       headingOffscreen:!intentionalScreenReaderOnly&&rect?(rect.right<=0||rect.left>=innerWidth):false,
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
     rec.brokenImages=geom.brokenImages;rec.bottomNavOverflow=geom.bottomNavOverflow;
     if(rec.status!==200)rec.issues.push('HTTP '+rec.status);
     if(rec.overflow>8)rec.issues.push('Horizontal overflow '+rec.overflow+'px');
     if(rec.brokenImages.length)rec.issues.push('Broken visible images: '+rec.brokenImages.length);
     if(rec.bottomNavOverflow>8)rec.issues.push('Mobile bottom navigation overflow '+rec.bottomNavOverflow+'px');
     if(geom.inaccessibleHiddenH1)rec.issues.push('Home H1 is display:none and inaccessible to screen readers');
     if(geom.headingOffscreen)rec.issues.push('Page H1 completely outside viewport');
     if(rec.jsErrors.length)rec.issues.push('JS exceptions: '+rec.jsErrors.length);
     if(width<=768 && ['/newbie.html','/heroes.html','/fishing.html','/svs.html'].includes(pathname)){
       const reading=await page.evaluate(()=>{
         const main=document.querySelector('main');
         const textDetails=main?[...main.querySelectorAll('details')].filter(el=>!el.closest('form,[data-quiz],[data-calculator],.interactive-question,.quiz,.calc-panel')):[];
         return {enabled:document.body.classList.contains('sova-mobile-reading-v1'),
           count:textDetails.length,closed:textDetails.filter(el=>!el.open).length};
       });
       rec.guideReading=reading;
       if(!reading.enabled)rec.issues.push('Mobile guide reading layout not enabled');
       if(reading.closed>0)rec.issues.push('Mobile guide has '+reading.closed+' collapsed reading sections');
     }

     if(pathname==='/'&&width<=768){
       try{
         const toggle=page.locator('#mobileMenuToggle');
         if(await toggle.isVisible()){
           await toggle.click({timeout:2500});
           const sizes=await page.evaluate(()=>{
             const nav=document.querySelector('.nav-wrap'),links=[...document.querySelectorAll('.nav-wrap > nav > a.route-link')];
             if(!nav||!links.length)return null;
             const n=nav.getBoundingClientRect();
             return {width:Math.round(n.width),linkWidths:links.map(a=>Math.round(a.getBoundingClientRect().width))};
           });
           if(sizes){
             rec.menuGeometry=sizes;
             if(sizes.linkWidths.some(n=>n<sizes.width-50))rec.issues.push('Mobile menu buttons too narrow');
           }
           await page.locator('#sovaMobileCloseV986').click({timeout:2500}).catch(()=>{});
         }
       }catch(err){rec.issues.push('Mobile menu check: '+String(err).slice(0,110))}
     }

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
  brokenImageChecks:records.filter(x=>x.brokenImages?.length).length,
  bottomNavOverflowChecks:records.filter(x=>x.bottomNavOverflow>8).length,
  mobileMenuNarrowChecks:records.filter(x=>x.issues.includes('Mobile menu buttons too narrow')).length,
  mobileGuideReadingFailures:records.filter(x=>x.issues.some(y=>y.startsWith('Mobile guide'))).length,
  httpFailures:records.filter(x=>x.status!==200).length};
 fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify({total,records},null,2));
 console.log('MATRIX_TOTAL '+JSON.stringify(total));
 if(total.problematicChecks)process.exitCode=1;
})().catch(e=>{console.error('MATRIX_FATAL '+String(e));process.exitCode=1});
