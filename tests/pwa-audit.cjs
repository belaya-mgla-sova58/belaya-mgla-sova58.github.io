/* PWA smoke audit: read-only requests and isolated browser storage. */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright');
const BASE='https://belaya-mgla-sova58.github.io/';
const OUT=path.resolve(__dirname,'..','visual-audit-results');
fs.mkdirSync(OUT,{recursive:true});

async function run(){
  const browser=await chromium.launch({headless:true});
  const report={created:new Date().toISOString(),url:BASE,checks:[],warnings:[],errors:[]};
  // Verify published PWA update version stays aligned with registration.
  const swSource=fs.readFileSync(path.resolve(__dirname,'..','service-worker.js'),'utf8');
  const installSource=fs.readFileSync(path.resolve(__dirname,'..','pwa-install.js'),'utf8');
  const cacheVersion=swSource.match(/const CACHE_NAME\\s*=\\s*['"]belaya-mgla-v(\\d+)['"]/);
  const registrationVersion=installSource.match(/service-worker\\.js\\?v=(\\d+)/);
  report.checks.push({name:'pwa-cache-registration-version',
    ok:!!cacheVersion&&!!registrationVersion&&cacheVersion[1]===registrationVersion[1],
    cache:cacheVersion?.[1],registration:registrationVersion?.[1]});
  report.checks.push({name:'pwa-html-not-rewritten',
    ok:!swSource.includes('optimizeHtml(') && !swSource.includes('new Response(html,')});
  let context;
  try {
    context=await browser.newContext({viewport:{width:390,height:844},
      hasTouch:true,isMobile:true,locale:'ru-RU',serviceWorkers:'allow'});
    const page=await context.newPage();
    const response=await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:45000});
    report.checks.push({name:'homepage-https',ok:page.url().startsWith('https://')});
    report.checks.push({name:'homepage-http',ok:response?.status()===200,status:response?.status()});
    await page.waitForTimeout(1600);
    const detected=await page.evaluate(async ()=>{
      const link=document.querySelector('link[rel="manifest"]');
      const result={manifestUrl:link?.href||null,serviceWorkerSupported:'serviceWorker' in navigator,
        secureContext:window.isSecureContext,displayModeStandalone:matchMedia('(display-mode:standalone)').matches};
      if(result.serviceWorkerSupported){
        try {
          const regs=await navigator.serviceWorker.getRegistrations();
          result.registrations=regs.map(r=>({scope:r.scope,active:!!r.active,waiting:!!r.waiting}));
          result.controller=!!navigator.serviceWorker.controller;
        } catch(e){result.registrationError=String(e.message||e);}
      }
      return result;
    });
    report.detected=detected;
    report.checks.push({name:'secure-context',ok:detected.secureContext});
    report.checks.push({name:'manifest-link',ok:!!detected.manifestUrl});
    if (detected.manifestUrl) {
      try {
        const resp=await context.request.get(detected.manifestUrl,{timeout:25000});
        report.checks.push({name:'manifest-http',ok:resp.ok(),status:resp.status()});
        if (resp.ok()) {
          const data=await resp.json();
          report.manifest={name:data.name,display:data.display,start_url:data.start_url,
            icons:(data.icons||[]).map(i=>({src:i.src,sizes:i.sizes,purpose:i.purpose}))};
          report.checks.push({name:'installable-manifest-fields',
            ok:!!data.name&&!!data.start_url&&!!data.icons?.length});
          for(const icon of data.icons||[]){
            const src=new URL(icon.src,detected.manifestUrl).toString();
            try {
              const iconResponse=await context.request.get(src,{timeout:18000});
              report.checks.push({name:'icon '+icon.sizes+' '+(icon.purpose||'any'),
                ok:iconResponse.ok(),status:iconResponse.status(),url:src});
            }catch(e){report.warnings.push('Icon check failed '+src+': '+String(e.message||e).slice(0,130));}
          }
        }
      }catch(e){report.errors.push('Cannot fetch or parse PWA manifest: '+String(e.message||e));}
    }
    if (!detected.serviceWorkerSupported) report.warnings.push('Service Worker API unavailable');
    else if (!detected.registrations?.length) report.warnings.push('No active Service Worker registration detected in this browser session');
    else if (!detected.controller) report.warnings.push('Service Worker has not yet taken control of this page');
    // Offline simulation uses an isolated browser context. No user content
    // or real browser storage is touched. Offline navigation may legitimately
    // fail if the website has not implemented an offline HTML fallback.
    if (detected.serviceWorkerSupported && detected.registrations?.length) {
      try {
        await page.waitForTimeout(1200);
        await context.setOffline(true);
        const offline=await page.evaluate(async ()=>{
          try {
            const response=await fetch('./site-v626.min.css?v=985',{cache:'force-cache'});
            return {ok:response.ok,status:response.status};
          }catch(e){return {ok:false,error:String(e.message||e).slice(0,160)};}
        });
        report.checks.push({name:'offline-core-css',...offline});
        if(!offline.ok)report.warnings.push('Offline core asset unavailable');
      }catch(e){report.warnings.push('Offline simulation failed: '+String(e.message||e));}
      finally{await context.setOffline(false);}
    }
    await page.close();
  } catch(e) {
    report.errors.push('PWA browser failed: '+String(e.message||e).slice(0,320));
  } finally {
    if(context)await context.close().catch(()=>{});
    await browser.close();
  }
  for(const check of report.checks)if(!check.ok)report.warnings.push('Check: '+check.name+' failed');
  report.passed=report.checks.filter(c=>c.ok).length;
  report.failed=report.checks.length-report.passed;
  fs.writeFileSync(path.join(OUT,'pwa-report.json'),JSON.stringify(report,null,2));
  const summary=['# SOVA58 PWA smoke audit','',
    'Checks passed: '+report.passed+'; not passed: '+report.failed+'.',
    '', '## Warnings', ...(report.warnings.length?report.warnings.map(x=>'- '+x):['None']),
    '', '## Errors',...(report.errors.length?report.errors.map(x=>'- '+x):['None']),
    '', 'See pwa-report.json for details. Offline support is reported, not assumed.'].join('\n');
  fs.writeFileSync(path.join(OUT,'pwa-summary.md'),summary);
  if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary+'\n');
  console.log(summary);
  if(report.errors.length || report.checks.some(c=>!c.ok && ['pwa-cache-registration-version','pwa-html-not-rewritten'].includes(c.name)))process.exitCode=1;
}
run().catch(e=>{console.error(e);process.exitCode=1;});
