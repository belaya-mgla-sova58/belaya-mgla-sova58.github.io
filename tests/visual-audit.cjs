/* SOVA58 read-only Playwright QA. Crawls all checked-out HTML pages.
   Scans images (including lazy images), responsiveness, SEO, browser errors,
   accessibility (axe), safe UI interactions, basic timing and screenshots.
   No form submissions, user data changes, purchases or admin actions.
*/
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const BASE_URL = 'https://belaya-mgla-sova58.github.io/';
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'visual-audit-results');
fs.mkdirSync(OUT, { recursive: true });
const FULL_PAGE_ALL = process.env.AUDIT_FULL_PAGE === 'all';
const AXE_MODE = process.env.AUDIT_AXE || 'desktop';
const CONCURRENCY = 3;
const CORE = new Set([
  'index.html', 'heroes.html', 'hero-generations.html', 'pets.html',
  'experts.html', 'events.html', 'news.html', 'calculators.html',
  'canyon-clash.html', 'troops.html', 'furnace-1-30.html',
  'furnace-fc1-5.html', 'furnace-fc5-10.html', 'snowplow.html',
  'mercenary-prestige.html', 'faq.html'
]);
const DEVICES = [
  { name:'desktop', width:1440, height:900, isMobile:false, hasTouch:false },
  { name:'tablet', width:768, height:1024, isMobile:true, hasTouch:true },
  { name:'mobile', width:390, height:844, isMobile:true, hasTouch:true },
  { name:'small-mobile', width:360, height:780, isMobile:true, hasTouch:true, coreOnly:true },
  { name:'wide-desktop', width:1920, height:1080, isMobile:false, hasTouch:false, coreOnly:true }
];

function discoverHtmlPages(root) {
  const found = [];
  const skip = new Set(['.git','.github','node_modules','tests','visual-audit-results']);
  function walk(dir, prefix='') {
    for (const ent of fs.readdirSync(dir,{withFileTypes:true})) {
      const rel = prefix ? prefix+'/'+ent.name : ent.name;
      if (ent.isDirectory() && !skip.has(ent.name)) walk(path.join(dir,ent.name),rel);
      else if (ent.isFile() && ent.name.toLowerCase().endsWith('.html')) found.push(rel);
    }
  }
  walk(root);
  return found.sort((a,b)=>a.localeCompare(b,'ru'));
}
const allPages = discoverHtmlPages(ROOT);
if (!allPages.length) throw new Error('No HTML files found');

async function waitForImages(page) {
  // Native loading=lazy images are temporarily made eager in this isolated
  // browser session. This checks beyond the initially visible viewport.
  return page.evaluate(async () => {
    const items = [...document.querySelectorAll('img')];
    items.forEach(img => { if (img.loading === 'lazy') img.loading='eager'; });
    const pending = items.filter(img => (img.currentSrc || img.src || img.srcset) && !img.complete);
    if (pending.length) {
      await Promise.race([
        Promise.all(pending.map(img => new Promise(resolve => {
          img.addEventListener('load',resolve,{once:true});
          img.addEventListener('error',resolve,{once:true});
        }))),
        new Promise(resolve => setTimeout(resolve, 2400))
      ]);
    }
  });
}

async function inspect(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const docW = Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth||0);
    const images = [...document.querySelectorAll('img')].filter(img => !img.closest('template'));
    const broken = [], distorted = [], pending = [], withoutAlt = [];
    for (const img of images) {
      const src = img.currentSrc || img.getAttribute('src') || img.getAttribute('srcset') || '';
      if (!img.hasAttribute('alt')) withoutAlt.push(src);
      if (!src) continue;
      if (!img.complete) pending.push(src);
      else if (img.naturalWidth === 0) broken.push(src);
      else {
        const rect = img.getBoundingClientRect();
        const objectFit = getComputedStyle(img).objectFit;
        if (rect.width > 24 && rect.height > 24 && objectFit === 'fill') {
          const actual = img.naturalWidth/img.naturalHeight;
          const rendered = rect.width/rect.height;
          if (Number.isFinite(actual) && Math.abs(Math.log(rendered/actual)) > .2) {
            distorted.push({src, actual:+actual.toFixed(2), rendered:+rendered.toFixed(2)});
          }
        }
      }
    }
    const overflowing = [];
    if (docW-vw > 12) {
      for (const el of document.querySelectorAll('main *, #appMain *')) {
        if (overflowing.length >= 8) break;
        const r=el.getBoundingClientRect(), st=getComputedStyle(el);
        if (r.width<=1 || r.height<=1 || st.display==='none' || st.position==='fixed') continue;
        if (r.right>vw+12 || r.left < -12) {
          overflowing.push({tag:el.tagName.toLowerCase(), id:el.id,
            cls:typeof el.className==='string'?el.className.split(' ').slice(0,2).join(' '):'',
            left:Math.round(r.left), right:Math.round(r.right)});
        }
      }
    }
    const nav=performance.getEntriesByType('navigation')[0];
    const bigText=[...document.querySelectorAll('main p, main li')].filter(el => {
      const r=el.getBoundingClientRect(), f=parseFloat(getComputedStyle(el).fontSize);
      return r.width>0 && r.height>0 && f>0 && f<11;
    }).length;
    const main = document.querySelector('main');
    const mainPresent=!!main;
    const links=[...document.querySelectorAll('a[href]')];
    return {
      viewport:vw, documentWidth:docW, overflow:docW-vw,
      imageCount:images.length, brokenImages:broken.slice(0,30),
      pendingImages:pending.slice(0,20), distortedImages:distorted.slice(0,20),
      imagesWithoutAlt:withoutAlt.slice(0,20), overflowing,
      title:document.title||'', headings:document.querySelectorAll('h1').length,
      mainPresent, linkCount:links.length, tinyTextParagraphs:bigText,
      description:!!document.querySelector('meta[name="description"]'),
      canonical:!!document.querySelector('link[rel="canonical"]'),
      manifest:!!document.querySelector('link[rel="manifest"]'),
      time:nav?{
        domReady:Math.round(nav.domContentLoadedEventEnd),
        load:Math.round(nav.loadEventEnd), response:Math.round(nav.responseEnd),
        transfer:nav.transferSize
      }:null
    };
  });
}

async function accessibilityAudit(page) {
  try {
    await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
    return await page.evaluate(async () => {
      const res = await window.axe.run(document,{
        runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}
      });
      return {violationCount:res.violations.length,
        affectedNodes:res.violations.reduce((n,v)=>n+v.nodes.length,0),
        violations:res.violations.slice(0,20).map(v=>({
          id:v.id, impact:v.impact, description:v.help,
          count:v.nodes.length, example:v.nodes[0]?.target?.join(' ')
        }))};
    });
  } catch(e) {
    return {error:String(e.message||e).slice(0,260)};
  }
}
async function safeInteractions(page, file) {
  const checks=[];
  if (!CORE.has(file)) return checks;
  try {
    const summary=page.locator('details:not([open]) > summary:visible').first();
    if (await summary.count()) {
      await summary.click({timeout:3500});
      const opened=await summary.evaluate(el=>el.parentElement.open);
      if (opened) await summary.click({timeout:3500});
      checks.push({test:'expandable-section',ok:opened});
    }
  } catch(e) {checks.push({test:'expandable-section',ok:false,detail:String(e.message||e).slice(0,120)});}
  if (file==='index.html' || file==='heroes.html') {
    try {
      const search=page.locator('input.site-search-input-v426:visible').first();
      if (await search.count()) {
        await search.fill('герои',{timeout:3500});
        await page.waitForTimeout(500);
        const value=await search.inputValue();
        checks.push({test:'search-typing',ok:value==='герои'});
        await search.fill('');
      }
    } catch(e) {checks.push({test:'search-typing',ok:false,detail:String(e.message||e).slice(0,120)});}
  }
  return checks;
}

async function run() {
  const browser=await chromium.launch({headless:true});
  const rows=[];
  try {
    for (const device of DEVICES) {
      const pages = device.coreOnly ? allPages.filter(p => CORE.has(p)) : allPages;
      const folder=path.join(OUT,device.name);
      fs.mkdirSync(folder,{recursive:true});
      const ctx=await browser.newContext({
        viewport:{width:device.width,height:device.height},
        isMobile:device.isMobile, hasTouch:device.hasTouch,
        deviceScaleFactor:1, locale:'ru-RU',
        reducedMotion:'reduce', serviceWorkers:'block'
      });
      for (let i=0;i<pages.length;i+=CONCURRENCY) {
        const chunk=pages.slice(i,i+CONCURRENCY);
        await Promise.all(chunk.map(async file=>{
          const row={device:device.name, page:file, status:null, failures:[], warnings:[], runtimeErrors:[],
            resourceFailures:[], images:null, metrics:null, accessibility:null, interactions:[]};
          let page=null;
          try {
            page=await ctx.newPage();
            page.on('pageerror', err=>{if(row.runtimeErrors.length<10)row.runtimeErrors.push(err.message.slice(0,240));});
            page.on('console', msg=>{if(msg.type()==='error'&&row.runtimeErrors.length<10)row.runtimeErrors.push('console: '+msg.text().slice(0,210));});
            page.on('response', response=>{
              try{
                if(response.status()>=400 && new URL(response.url()).origin===new URL(BASE_URL).origin
                  && row.resourceFailures.length<15){
                  row.resourceFailures.push(response.status()+' '+response.url());
                }
              } catch(_){}
            });
            page.on('requestfailed', request=>{
              try {
                if(new URL(request.url()).origin===new URL(BASE_URL).origin && row.resourceFailures.length<15) {
                  row.resourceFailures.push('request failed '+request.url().slice(0,140));
                }
              }catch(_){}
            });
            const response=await page.goto(new URL(file,BASE_URL).toString(),{waitUntil:'domcontentloaded',timeout:40000});
            row.status=response?.status()||0;
            await page.waitForTimeout(400);
            await waitForImages(page);
            row.metrics=await inspect(page);
            row.images={count:row.metrics.imageCount, broken:row.metrics.brokenImages,
              pending:row.metrics.pendingImages, distorted:row.metrics.distortedImages,
              missingAlt:row.metrics.imagesWithoutAlt};
            if (row.status!==200) row.failures.push('HTTP '+row.status);
            if (row.metrics.overflow>12) row.failures.push('Horizontal overflow '+row.metrics.overflow+'px');
            if (row.metrics.brokenImages.length) row.failures.push('Broken images: '+row.metrics.brokenImages.length);
            if (row.metrics.distortedImages.length) row.warnings.push('Potential image distortion: '+row.metrics.distortedImages.length);
            if (row.metrics.pendingImages.length) row.warnings.push('Images not fully loaded: '+row.metrics.pendingImages.length);
            if (!row.metrics.title) row.warnings.push('Missing page title');
            if (!row.metrics.headings) row.warnings.push('Missing H1');
            if (row.metrics.tinyTextParagraphs>0) row.warnings.push('Text smaller than 11px: '+row.metrics.tinyTextParagraphs+' paragraphs');
            if (row.metrics.time?.domReady>5000) row.warnings.push('Slow DOM ready '+row.metrics.time.domReady+'ms');
            const axeOn=AXE_MODE==='all' || (AXE_MODE==='desktop' && device.name==='desktop')
              || (AXE_MODE==='core' && CORE.has(file));
            if (AXE_MODE!=='off' && axeOn) {
              row.accessibility=await accessibilityAudit(page);
              if (row.accessibility.error) row.warnings.push('Accessibility checker error');
              else if(row.accessibility.violationCount) row.warnings.push('Accessibility rules: '+row.accessibility.violationCount);
            }
            row.interactions=await safeInteractions(page,file);
            if (row.interactions.some(r=>!r.ok)) row.warnings.push('UI interaction did not pass');
          } catch(e){
            row.failures.push('Browser: '+String(e.message||e).slice(0,220));
          } finally {
            if(page) {
              try {
                const label=file.replace(/\.html$/i,'').replace(/[\/\\]/g,'__');
                await page.screenshot({path:path.join(folder,label+'.png'),
                  fullPage:false,animations:'disabled',timeout:20000});
                if (FULL_PAGE_ALL || ((device.name==='desktop'||device.name==='mobile') && CORE.has(file))) {
                  await page.screenshot({path:path.join(folder,label+'--full.png'),
                    fullPage:true,animations:'disabled',timeout:30000});
                }
              } catch(e){row.warnings.push('Screenshot failed: '+String(e.message||e).slice(0,130));}
              await page.close().catch(()=>{});
            }
          }
          if (row.resourceFailures.length) row.warnings.push('Network resource errors: '+row.resourceFailures.length);
          if (row.runtimeErrors.length) row.warnings.push('JavaScript / console errors: '+row.runtimeErrors.length);
          rows.push(row);
          console.log((row.failures.length?'FAIL':'DONE')+' '+device.name+' '+file
            + (row.failures.length?' '+row.failures.join('; '):'')
            + (row.warnings.length?' ('+row.warnings.length+' warnings)':''));
        }));
      }
      await ctx.close();
    }
  } finally {await browser.close();}
  rows.sort((a,b)=>DEVICES.findIndex(x=>x.name===a.device)-DEVICES.findIndex(x=>x.name===b.device)
    ||a.page.localeCompare(b.page));
  const failures=rows.filter(r=>r.failures.length);
  const warned=rows.filter(r=>r.warnings.length);
  const countImages=rows.reduce((n,r)=>n+(r.metrics?.imageCount||0),0);
  const report={created:new Date().toISOString(),htmlPages:allPages.length,
    deviceProfiles:DEVICES,checks:rows.length,imageElementsChecked:countImages,
    failures:failures.length,withWarnings:warned.length,rows};
  fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2));
  const summary=[
    '# SOVA58 browser, images, accessibility and responsive QA','',
    'HTML pages: '+allPages.length+'; device/page checks: '+rows.length+'.',
    'Image instances reviewed: '+countImages+'. Failed combinations: '+failures.length+
      '. Combinations with warnings: '+warned.length+'.','',
    'Device widths: 1440, 768 and 390px for all pages; 360 and 1920px for the main 16.','',
    '## Failures (first 100)',
    ...(failures.length?failures.slice(0,100).map(r=>'- '+r.device+' / '+r.page+': '+r.failures.join('; ')):['None']),
    '', '## Warnings (first 100)',
    ...warned.slice(0,100).map(r=>'- '+r.device+' / '+r.page+': '+r.warnings.join('; ')),
    '', 'See report.json and PNG screenshots in the uploaded artifact.',
    'Visual composition and correct character artwork require comparison with approved references.'
  ].join('\n');
  fs.writeFileSync(path.join(OUT,'browser-summary.md'),summary);
  if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary.slice(0,55000)+'\n');
  console.log('\n'+summary.slice(0,12000));
  if(failures.length)process.exitCode=1;
}
run().catch(e=>{console.error(e);process.exitCode=1;});
