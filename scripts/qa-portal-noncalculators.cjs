/* Non-calculator portal quality audit. Read-only: no forms, purchases or counters.
 * Checks mobile layout, navigation, image loading, search, guide readability and SEO.
 * Run: node scripts/qa-portal-noncalculators.cjs
 */
const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const ROOT='https://belaya-mgla-sova58.github.io';
const pages=['/','/news.html','/events.html','/heroes.html','/gear.html',
 '/experts.html','/pets.html','/other.html','/state-58.html','/svs-prep.html',
 '/ogonek.html','/news-elena.html','/faq.html','/winter-siege.html',
 '/newbie.html','/creative-corner.html'];
const viewports=[{name:'desktop',width:1440,height:900},
 {name:'phone-390',width:390,height:844},{name:'phone-320',width:320,height:720}];
const out=path.join(process.cwd(),'qa-portal-output');
fs.mkdirSync(out,{recursive:true});
const reports=[];
const linked=new Set();
const wait=ms=>new Promise(done=>setTimeout(done,ms));
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const viewport of viewports){
   const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},
     deviceScaleFactor:viewport.name==='desktop'?1:2,isMobile:viewport.name!=='desktop',
     hasTouch:viewport.name!=='desktop'});
   try{
    for(const route of pages){
     const page=await context.newPage();
     const entry={page:route,viewport:viewport.name,errors:[],warnings:[],performance:{}};
     const jsErrors=[],failedAssets=[];
     page.on('pageerror',e=>jsErrors.push(String(e).slice(0,150)));
     page.on('response',res=>{
      try{
       const u=new URL(res.url());
       if(u.origin===ROOT&&res.status()>=400&&/\.(?:html|js|css|svg|png|jpe?g|webp|gif)(?:$|\?)/i.test(u.pathname))
        failedAssets.push(res.status()+' '+u.pathname);
      }catch(e){}
     });
     await page.route('**/*',r=>{
      const req=r.request();let host='';
      try{host=new URL(req.url()).hostname}catch(e){}
      if(!['GET','HEAD'].includes(req.method())||
         /(?:google-analytics|googletagmanager|yandex|cloudflareinsights)\./i.test(host))
       return r.abort();
      return r.continue();
     });
     try{
      const response=await page.goto(ROOT+route,{waitUntil:'domcontentloaded',timeout:40000});
      if(!response||response.status()!==200)entry.errors.push('HTTP '+(response?.status()||'no response'));
      await page.waitForTimeout(450);
      const info=await page.evaluate(()=>{
       const links=[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'));
       const canonical=document.querySelector('link[rel="canonical"]')?.href||'';
       const description=document.querySelector('meta[name="description"]')?.content||'';
       const nav=performance.getEntriesByType('navigation')[0];
       return {title:document.title,description,canonical,lang:document.documentElement.lang,
        headings:document.querySelectorAll('h1').length,
        width:document.documentElement.scrollWidth,innerWidth,
        links,emptyAnchors:[...document.querySelectorAll('a[href="#"],a[href="javascript:void(0)"]')].length,
        unnamedButtons:[...document.querySelectorAll('button')].filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')&&!b.getAttribute('title')).length,
        timing:nav?{domContentLoaded:Math.round(nav.domContentLoadedEventEnd),
          transferSize:nav.transferSize}:null};
      });
      if(!info.title.trim())entry.errors.push('Missing title');
      if(!info.description.trim())entry.errors.push('Missing meta description');
      if(info.headings!==1)entry.warnings.push('Expected one H1, got '+info.headings);
      if(info.lang!=='ru')entry.warnings.push('Missing Russian language metadata');
      if(info.canonical!==ROOT+(route==='/'?'/':route))
       entry.warnings.push('Canonical missing or does not match page: '+info.canonical);
      if(info.width>info.innerWidth+8)
       entry.errors.push('Horizontal overflow '+(info.width-info.innerWidth)+'px');
      if(info.emptyAnchors)entry.warnings.push(info.emptyAnchors+' placeholder links');
      if(info.unnamedButtons)entry.warnings.push(info.unnamedButtons+' unnamed buttons');
      entry.performance=info.timing||{};
      for(const href of info.links){
       try{
        const u=new URL(href,ROOT+route);
        if(u.origin===ROOT&&/\.html$|\/$/.test(u.pathname))linked.add(u.pathname);
       }catch(e){}
      }
      // Load below-the-fold images without starting forms, clicks or counters.
      await page.evaluate(async()=>{
       const imgs=[...document.querySelectorAll('img[src]')];
       for(const img of imgs)img.loading='eager';
       await Promise.race([Promise.all(imgs.map(img=>img.decode().catch(()=>{}))),
         new Promise(resolve=>setTimeout(resolve,5000))]);
      });
      const img=await page.evaluate(()=>{
       const all=[...document.images];
       return {count:all.length,
        broken:all.filter(i=>i.getAttribute('src')&&i.complete&&i.naturalWidth===0).map(i=>i.getAttribute('src')).slice(0,12),
        noAlt:all.filter(i=>!i.hasAttribute('alt')).length,
        stretched:all.filter(i=>i.naturalWidth>0&&i.getBoundingClientRect().width>i.naturalWidth*2.2)
          .map(i=>i.getAttribute('src')).slice(0,6)};
      });
      if(img.broken.length)entry.errors.push('Broken images: '+img.broken.join(', '));
      if(img.noAlt)entry.warnings.push(img.noAlt+' images lack alt attributes');
      if(img.stretched.length)entry.warnings.push('Potentially blurry resized images: '+img.stretched.join(', '));
      if(route==='/'&&viewport.name==='desktop'){
       const field=page.locator('input.site-search-input-v426').first();
       if(await field.count()){
        await field.fill('медведь');
        await page.waitForTimeout(650);
        const results=(await page.locator('.site-search-results-v426').first().textContent().catch(()=>''))||'';
        if(!/медвед/i.test(results))entry.errors.push('Search does not find медведь');
        await field.press('Escape');
       }else entry.errors.push('Search input missing');
      }
      if(route==='/'&&viewport.width<=390){
       const toggle=page.locator('#mobileMenuToggle');
       if(await toggle.count()){
        await toggle.click({timeout:5000});
        if(await toggle.getAttribute('aria-expanded')!=='true')
         entry.errors.push('Mobile menu does not expand');
        const close=page.locator('#sovaMobileCloseV986');
        if(await close.count()){
         await close.click({timeout:5000});
         if(await toggle.getAttribute('aria-expanded')!=='false')
          entry.errors.push('Mobile menu does not close');
        }else entry.errors.push('Mobile menu close button missing');
       }else entry.errors.push('Mobile menu trigger missing');
       const search=page.locator('input.site-search-input-v426').first();
       if(await search.count()){
        await search.fill('медведь');
        await page.waitForTimeout(650);
        const results=(await page.locator('.site-search-results-v426').first().textContent().catch(()=>''))||'';
        if(!/медвед/i.test(results))entry.errors.push('Mobile portal search does not find медведь');
        await search.press('Escape');
       }else entry.errors.push('Mobile portal search input missing');
      }
      // Report tall layouts; narrow mobile screens get text/readability checks.
      if(viewport.width<=390){
       const narrow=await page.evaluate(()=>({
        tiny:[...document.querySelectorAll('main p, main li, article p, article li')]
         .filter(el=>el.getBoundingClientRect().width>0&&parseFloat(getComputedStyle(el).fontSize)<12).length,
        fixedBars:[...document.querySelectorAll('nav,footer')]
         .filter(e=>getComputedStyle(e).position==='fixed').length
       }));
       if(narrow.tiny>0)entry.warnings.push(narrow.tiny+' very small paragraphs or list items');
      }
      if(jsErrors.length)entry.errors.push('JavaScript: '+jsErrors.slice(0,4).join('; '));
      if(failedAssets.length)entry.errors.push('Assets: '+[...new Set(failedAssets)].slice(0,6).join('; '));
     }catch(e){entry.errors.push(String(e).slice(0,200))}
     reports.push(entry);
     if(entry.errors.length)await page.screenshot({path:path.join(out,viewport.name+'-'+route.replace(/\W+/g,'_')+'.png'),fullPage:false}).catch(()=>{});
     await page.close();
    }
   }finally{await context.close()}
  }
  const context=await browser.newContext();
  try{
   const request=context.request;
   try{
    const robots=await request.get(ROOT+'/robots.txt',{timeout:12000});
    const robotText=robots.ok()?await robots.text():'';
    if(!robots.ok()||!robotText.includes('/sitemap.xml'))
     reports.push({page:'/robots.txt',viewport:'seo',errors:['Robots file missing or does not reference sitemap'],warnings:[]});
    const sitemap=await request.get(ROOT+'/sitemap.xml',{timeout:12000});
    const xml=sitemap.ok()?await sitemap.text():'';
    const locs=[...xml.matchAll(/<loc>\s*([^<]+)<\/loc>/g)].map(x=>x[1].trim());
    if(!sitemap.ok()||!locs.length)
     reports.push({page:'/sitemap.xml',viewport:'seo',errors:['Sitemap missing or contains no URLs'],warnings:[]});
    else{
     const duplicated=locs.filter((x,i)=>locs.indexOf(x)!==i);
     if(duplicated.length)reports.push({page:'/sitemap.xml',viewport:'seo',errors:['Duplicate entries: '+duplicated.slice(0,5).join(', ')],warnings:[]});
     for(const pagePath of pages){
      const expected=ROOT+(pagePath==='/'?'/':pagePath);
      if(!locs.includes(expected))reports.push({page:pagePath,viewport:'seo',
       errors:[],warnings:['Page absent from sitemap']});
     }
    }
   }catch(e){reports.push({page:'/sitemap.xml',viewport:'seo',errors:['SEO fetch failed: '+String(e).slice(0,130)],warnings:[]})}
   for(const route of linked){
    if(pages.includes(route)||route==='/')continue;
    if(/calculator|helper|kopilka|furnace|mithril/i.test(route))continue;
    try{
     const res=await request.get(ROOT+route,{timeout:12000});
     if(res.status()>=400)reports.push({page:route,viewport:'link-check',
       errors:['Broken internal link: HTTP '+res.status()],warnings:[]});
    }catch(e){reports.push({page:route,viewport:'link-check',errors:['Link check failed: '+String(e).slice(0,110)],warnings:[]})}
   }
  }finally{await context.close()}
 }finally{await browser.close()}
 const summary={checks:reports.length,failed:reports.filter(x=>x.errors.length).length,
  warnings:reports.reduce((n,x)=>n+x.warnings.length,0),checkedLinks:linked.size,
  scope:'Portal audit excluding calculators'};
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({summary,reports},null,2));
 console.log('PORTAL_QA '+JSON.stringify(summary));
 for(const x of reports.filter(x=>x.errors.length))console.error(x.viewport+' '+x.page+': '+x.errors.join(' | '));
 if(summary.failed)process.exitCode=1;
})().catch(e=>{console.error('PORTAL_QA_FATAL '+String(e));process.exitCode=1});
