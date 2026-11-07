/* Lighthouse is a complementary read-only performance/SEO/accessibility scan.
   Playwright handles all HTML pages; Lighthouse samples 6 core site routes.
   Requires npm packages lighthouse and playwright.
*/
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const cp=require('node:child_process');
const {chromium}=require('playwright');
const ROOT=path.resolve(__dirname,'..');
const OUT=path.join(ROOT,'visual-audit-results','lighthouse');
fs.mkdirSync(OUT,{recursive:true});
const BASE='https://belaya-mgla-sova58.github.io/';
const DEFAULT_PAGES=['index.html','pets.html','hero-generations.html',
  'experts.html','calculators.html','events.html'];
// Optional single-page/fast workflow: leave environment variables unset for the full audit.
const PAGES=process.env.SOVA_LH_PAGES
  ? process.env.SOVA_LH_PAGES.split(',').map(s=>s.trim()).filter(Boolean) : DEFAULT_PAGES;
const MODES=process.env.SOVA_LH_MODES
  ? process.env.SOVA_LH_MODES.split(',').map(s=>s.trim()).filter(Boolean) : ['mobile','desktop'];
if (!PAGES.length || PAGES.length>12 || PAGES.some(p=>!/^[a-z0-9-]+\.html$/.test(p)))
  throw new Error('SOVA_LH_PAGES must contain 1–12 simple .html file names');
if (!MODES.length || MODES.some(mode=>!['mobile','desktop'].includes(mode)))
  throw new Error('SOVA_LH_MODES must be mobile or desktop');
const result={checked:0,reports:[],errors:[],created:new Date().toISOString()};
const bin=path.join(ROOT,'node_modules','.bin','lighthouse');
if(!fs.existsSync(bin)){console.error('Install Lighthouse package first');process.exit(1);}
for(const page of PAGES)for(const mode of MODES){
  const output=path.join(OUT,page.replace(/\.html$/,'')+'-'+mode+'.json');
  // GitHub Pages serves index.html at /; Lighthouse must test that canonical URL.
  // Testing /index.html while its rel=canonical points to / produces a false SEO warning.
  const targetUrl=new URL(page==='index.html'?'':page,BASE).toString();
  const args=[targetUrl,
    '--output=json','--output-path='+output,
    '--only-categories=performance,accessibility,best-practices,seo',
    '--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage',
    // Avoid artificially inflating visitor counts while retaining page scripts.
    '--blocked-url-patterns=*mc.yandex.ru/watch*',
    '--blocked-url-patterns=*google-analytics.com/*collect*',
    '--blocked-url-patterns=*posthog.com/e*',
    '--blocked-url-patterns=*posthog.com/batch*',
    '--blocked-url-patterns=*cloudflareinsights.com/cdn-cgi/rum*',
    '--quiet'];
  if(mode==='desktop')args.push('--preset=desktop');
  const cmd=cp.spawnSync(bin,args,{
    encoding:'utf8',timeout:180000,maxBuffer:6*1024*1024,
    env:{...process.env,CHROME_PATH:chromium.executablePath()}
  });
  if(cmd.status!==0||cmd.error){
    const error=(cmd.error?.message||cmd.stderr||cmd.stdout||'Unknown Lighthouse error').slice(0,450);
    result.errors.push({page,mode,error});
    console.log('ERROR '+mode+' '+page+': '+error);
    continue;
  }
  try {
    const data=JSON.parse(fs.readFileSync(output,'utf8'));
    const scores={};
    for(const [k,v]of Object.entries(data.categories||{}))scores[k]=v.score===null?null:Math.round(v.score*100);
    const report={page,mode,scores,finalUrl:data.finalUrl,
      audits:{
        lcp:data.audits?.['largest-contentful-paint']?.numericValue||null,
        cls:data.audits?.['cumulative-layout-shift']?.numericValue||null,
        tbt:data.audits?.['total-blocking-time']?.numericValue||null
      }};
    result.reports.push(report);
    result.checked++;
    console.log('LIGHTHOUSE '+mode+' '+page+' '+JSON.stringify(scores));
  }catch(e){result.errors.push({page,mode,error:String(e.message||e)});}
}
fs.writeFileSync(path.join(ROOT,'visual-audit-results','lighthouse-summary.json'),JSON.stringify(result,null,2));
const markdown=['# SOVA58 Lighthouse sample scores','',
  'Core pages scanned: '+result.checked+' / '+(PAGES.length*MODES.length)+'.',
  '', '| Page | Device | Performance | Accessibility | Best practices | SEO |',
  '| --- | --- | ---: | ---: | ---: | ---: |',
  ...result.reports.map(r=>'| '+r.page+' | '+r.mode+' | '+(r.scores.performance??'n/a')
    +' | '+(r.scores.accessibility??'n/a')+' | '+(r.scores['best-practices']??'n/a')
    +' | '+(r.scores.seo??'n/a')+' |'),
  '', '## Failed scans',
  ...(result.errors.length?result.errors.map(r=>'- '+r.page+' / '+r.mode+': '+r.error):['None']),
  '', 'Scores are diagnostic snapshots affected by network and runner conditions.'].join('\n');
fs.writeFileSync(path.join(ROOT,'visual-audit-results','lighthouse-summary.md'),markdown);
if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,markdown+'\n');
console.log(markdown);
if(result.errors.length)process.exitCode=1;
