/* Read-only browser smoke test: mobile Android and desktop.
   Never submits support, like, counters, purchase, or other user forms. */
const {chromium,devices}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const ORIGIN='https://belaya-mgla-sova58.github.io';
const pages=['/','/news.html','/events.html','/heroes.html','/gear.html','/experts.html','/pets.html','/calculators.html','/other.html','/state-58.html','/svs-prep.html','/skhvatka.html','/bear-helper.html','/furnace-calculator.html','/fire-furnace-calculator.html','/chief-gear-calculator.html','/essence-mithril-calculator.html','/ogonek.html','/news-elena.html'];
const output=path.join(process.cwd(),'qa-smoke-output');
fs.mkdirSync(output,{recursive:true});
const all=[];
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const allowed=(key)=>['none','ok','error','missing','not-applicable'].includes(key);
async function scenario(page,pathName,mode,record){
  async function task(name,fn){
    try{const detail=await fn();record.scenarios.push({name,ok:true,detail:detail||'ok'})}
    catch(e){record.scenarios.push({name,ok:false,error:String(e).slice(0,280)});record.issues.push(name+': '+String(e).slice(0,160))}
  }
  if(pathName==='/'){
    await task('consent_dialog',async()=>{
      const dialog=page.locator('#sova-metrika-consent');
      if(await dialog.count() && await dialog.isVisible()){
        const deny=page.locator('#sova-metrika-decline');
        if(await deny.count())await deny.click({timeout:4000});
        if(await dialog.isVisible())throw Error('Consent dialog still visible');
        return 'Visible and declined for test only';
      }
      return 'Already dismissed or absent';
    });
    await task('home_search',async()=>{
      const field=page.locator('input.site-search-input-v426').first();
      if(!(await field.count()))throw Error('Search input missing');
      await field.fill('медведь');
      await page.waitForTimeout(1200);
      const results=page.locator('.site-search-results-v426').first();
      const text=await results.textContent().catch(()=>'');
      await field.fill('');
      if(!/медвед/i.test(text||''))throw Error('No matching search text for медведь: '+String(text).slice(0,140));
      return 'Search finds медведь';
    });
    await task('donate_owl_popup',async()=>{
      const button=page.locator('#sovaSupportTrigger');
      await button.waitFor({state:'visible',timeout:7000});
      const modal=page.locator('#sovaSupportLayer');
      await button.click({timeout:7000});
      if(!(await modal.isVisible()))throw Error('Donation dialog did not open');
      await modal.locator('.sova-support-close').click({timeout:3500});
      if(await modal.isVisible())throw Error('Donation dialog did not close');
      const rect=await button.boundingBox();
      if(!rect)throw Error('Donation owl hidden after closing');
      return 'Dialog opens and closes; owl x='+Math.round(rect.x)+' y='+Math.round(rect.y);
    });
    if(mode==='android'){
      await task('mobile_menu',async()=>{
        const toggle=page.locator('#mobileMenuToggle');
        if(!(await toggle.count()))throw Error('Menu button missing');
        await toggle.click({timeout:5500});
        const expanded=await toggle.getAttribute('aria-expanded');
        const bottom=page.locator('nav.mobile-bottom-v424').first();
        const bstyle=await bottom.evaluate(el=>({display:getComputedStyle(el).display,visibility:getComputedStyle(el).visibility})).catch(()=>null);
        await page.screenshot({path:path.join(output,'menu-android.jpg'),type:'jpeg',quality:65,fullPage:false}).catch(()=>{});
        await page.locator('#sovaMobileCloseV986').click({timeout:5500});
        if(expanded!=='true')throw Error('Menu does not mark aria-expanded=true');
        if(bstyle && bstyle.display!=='none' && bstyle.visibility!=='hidden')throw Error('Bottom navigation remains visible over open drawer');
        return 'Opens, hides bottom nav, closes';
      });
    }
    await task('owl_close',async()=>{
      const launcher=page.locator('#madamUguLauncherV720');
      if(!(await launcher.count()))return 'Owl not loaded in this viewport; separate design review';
      const button=page.locator('#madamUguCloseLauncherV720');
      if(!(await button.count()))throw Error('Owl close button missing');
      const shown=await button.isVisible();
      return 'Close control exists; visible='+shown;
    });
  }
  if(pathName==='/news.html'){
    await task('news_card_artwork',async()=>{
      const cards=await page.evaluate(()=>{
        const checks=['.news-category-card.elena','.news-category-card.creative-corner-fast-v1','.news-category-card.creative:not(.creative-corner-fast-v1)'];
        return checks.map(sel=>{const el=document.querySelector(sel);return {selector:sel,exists:!!el,image:el?getComputedStyle(el).backgroundImage:''}});
      });
      const empty=cards.filter(c=>!c.exists||!c.image.includes('url('));
      if(empty.length)throw Error('Card art not applied: '+JSON.stringify(empty).slice(0,260));
      return 'All three card backgrounds contain images';
    });
  }
  if(pathName==='/bear-helper.html'){
    await task('bear_calculator',async()=>{
      for(const [id,v] of [['inf','100000'],['lan','90000'],['mar','120000'],['cap','60000']]){
        await page.locator('#'+id).fill(v);
      }
      await page.locator('#calc').click({timeout:4000});
      const content=await page.locator('#marches').textContent().catch(()=>'');
      if(!content || content.length<10)throw Error('No march calculation output');
      return 'Result section generated ('+content.length+' characters)';
    });
  }
  if(pathName==='/chief-gear-calculator.html'){
    await task('chief_gear_tabs',async()=>{
      const charm=page.locator('#charmTab'),gear=page.locator('#gearTab');
      await charm.click({timeout:6000});
      if(await charm.getAttribute('aria-selected')!=='true')throw Error('Charm tab did not activate');
      await gear.click({timeout:6000});
      if(await gear.getAttribute('aria-selected')!=='true')throw Error('Gear tab did not activate');
      const count=await page.locator('select#current option').count();
      if(count<2)throw Error('Gear level selection empty');
      return 'Both tabs switch; '+count+' gear stages';
    });
  }
  if(pathName==='/essence-mithril-calculator.html'){
    await task('essence_stock_inputs',async()=>{
      const essence=page.locator('#ecStockEssence'),mithril=page.locator('#ecStockMithril');
      await essence.fill('1234');await essence.dispatchEvent('change');
      await mithril.fill('100');await mithril.dispatchEvent('change');
      if(await essence.inputValue()!=='1234')throw Error('Essence stock input not retained');
      return 'Stock fields accept values';
    });
  }
  if(pathName==='/fire-furnace-calculator.html'){
    await task('fire_furnace_controls',async()=>{
      const from=page.locator('#fireFrom'),to=page.locator('#fireTo');
      if(!(await from.count())||!(await to.count()))throw Error('From/to selectors missing');
      const n=await to.locator('option').count();
      if(n<2)throw Error('Target stage choices missing');
      const owned=page.locator('#refineOwned');
      await owned.fill('20');await owned.dispatchEvent('change');
      return n+' target options, refine input accepted';
    });
  }
  if(pathName==='/furnace-calculator.html'){
    await task('furnace_controls',async()=>{
      const from=page.locator('#calcFrom'),to=page.locator('#calcTo');
      if(!(await from.count())||!(await to.count()))throw Error('From/to selectors missing');
      const n=await to.locator('option').count();
      if(n<2)throw Error('Target stage choices missing');
      return n+' target options';
    });
  }
  if(pathName==='/skhvatka.html'){
    await task('skhvatka_guide',async()=>{
      const h=await page.locator('h1').textContent();
      if(!/Схватка/i.test(h||''))throw Error('Wrong title');
      return 'Event guide opens';
    });
  }
}
async function inspect(browser,ctx,mode,pathName){
  const page=await ctx.newPage();
  const errors=[],requests=[];
  page.on('pageerror',e=>errors.push(String(e).slice(0,260)));
  page.on('response',res=>{try{
    const u=new URL(res.url());
    if(u.origin===ORIGIN && res.status()>=400 && /\.(?:js|css|png|jpe?g|webp|svg|json|html)(?:$|\?)/i.test(u.pathname))requests.push(res.status()+' '+u.pathname);
  }catch(e){}});
  const record={path:pathName,mode,url:ORIGIN+pathName,status:null,title:'',navigation:{},horizontalOverflow:0,images:{},consoleErrors:[],assetErrors:[],scenarios:[],issues:[]};
  try{
    const response=await page.goto(ORIGIN+pathName,{waitUntil:'domcontentloaded',timeout:35000});
    record.status=response?response.status():0;
    await page.waitForLoadState('load',{timeout:6000}).catch(()=>{});
    await page.waitForTimeout(1300);
    const data=await page.evaluate(()=>{
      const nav=performance.getEntriesByType('navigation')[0];
      const doc=document.documentElement;
      const images=[...document.images].filter(el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0});
      return {title:document.title,overflow:Math.max(0,doc.scrollWidth-innerWidth),
        images:{total:document.images.length,viewport:images.length,brokenViewport:images.filter(x=>x.hasAttribute('src')&&x.getAttribute('src')&&getComputedStyle(x).visibility!=='hidden'&&x.complete&&x.naturalWidth===0).map(x=>x.currentSrc||x.src).slice(0,10)},
        navigation:{ttfbMs:nav?Math.round(nav.responseStart):null,dclMs:nav?Math.round(nav.domContentLoadedEventEnd):null,loadMs:nav?Math.round(nav.loadEventEnd):null},
        footerVisible:!!document.querySelector('nav.mobile-bottom-v424')};
    });
    record.title=data.title;
    record.horizontalOverflow=data.overflow;
    record.images=data.images;
    record.navigation=data.navigation;
    if(record.status>=400)record.issues.push('HTTP '+record.status);
    if(record.horizontalOverflow>8)record.issues.push('Horizontal overflow '+record.horizontalOverflow+'px');
    if(data.images.brokenViewport.length)record.issues.push('Broken visible images: '+data.images.brokenViewport.join(',').slice(0,220));
    await scenario(page,pathName,mode,record);
    if(['/', '/news.html','/calculators.html','/chief-gear-calculator.html'].includes(pathName)){
      const basename=pathName==='/'?'index':pathName.slice(1).replace('.html','');
      const dest=path.join(output,mode+'-'+basename+'.jpg');
      await page.screenshot({path:dest,type:'jpeg',quality:63,fullPage:false,timeout:12000}).catch(e=>record.issues.push('Screenshot: '+String(e).slice(0,90)));
    }
  }catch(e){record.issues.push('Navigation/test: '+String(e).slice(0,250))}
  record.consoleErrors=errors.slice(0,8);
  record.assetErrors=[...new Set(requests)].slice(0,12);
  if(record.assetErrors.length)record.issues.push('Local asset HTTP errors: '+record.assetErrors.join(';').slice(0,250));
  if(record.consoleErrors.length)record.issues.push('JavaScript exceptions: '+record.consoleErrors.slice(0,2).join('; '));
  console.log('QA_PAGE '+JSON.stringify({...record,images:{...record.images,brokenViewport:record.images.brokenViewport?.slice(0,4)}}));
  await page.close().catch(()=>{});
  return record;
}
(async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  try{
    for(const mode of ['android','desktop']){
      const ctx=await browser.newContext(mode==='android'
        ? {...devices['Pixel 7'],reducedMotion:'reduce',serviceWorkers:'block'}
        : {viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});
      for(const p of pages){
        all.push(await inspect(browser,ctx,mode,p));
        fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({generated:new Date().toISOString(),pages:all},null,2));
      }
      await ctx.close();
    }
  }finally{await browser.close()}
  const total={pages:all.length,failedPages:all.filter(x=>x.issues.length).length,failedScenarios:all.flatMap(x=>x.scenarios).filter(x=>!x.ok).length,brokenImages:all.reduce((a,x)=>a+(x.images.brokenViewport?.length||0),0),overflowPages:all.filter(x=>x.horizontalOverflow>8).length,errorPages:all.filter(x=>x.consoleErrors.length).length,assetErrorPages:all.filter(x=>x.assetErrors.length).length};
  fs.writeFileSync(path.join(output,'summary.json'),JSON.stringify(total,null,2));
  console.log('QA_TOTAL '+JSON.stringify(total));
})().catch(e=>{console.error('QA_FATAL '+String(e));process.exitCode=1});
