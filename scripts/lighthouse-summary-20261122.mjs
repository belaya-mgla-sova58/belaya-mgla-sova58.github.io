/* Extract concise Lighthouse lab measurements for the White Mist portal. */
import fs from 'node:fs';
import path from 'node:path';
const dir=path.resolve('lighthouse-audit-output');
const names=['home','calculators','chief-gear'];
const modes=['mobile','desktop'];
const rows=[];
for(const name of names){
 for(const mode of modes){
  const filepath=path.join(dir,name+'-'+mode+'.json');
  if(!fs.existsSync(filepath)){
   rows.push({page:name,device:mode,error:'Lighthouse report absent'});
   continue;
  }
  try{
   const data=JSON.parse(fs.readFileSync(filepath,'utf8'));
   const a=data.audits||{},c=data.categories||{};
   const number=id=>a[id]&&typeof a[id].numericValue==='number'?Math.round(a[id].numericValue):null;
   const score=id=>c[id]&&typeof c[id].score==='number'?Math.round(c[id].score*100):null;
   const row={page:name,device:mode,url:data.finalDisplayedUrl||data.finalUrl||data.requestedUrl,
    performanceScore:score('performance'),
    accessibilityScore:score('accessibility'),seoScore:score('seo'),
    firstContentfulPaintMs:number('first-contentful-paint'),
    largestContentfulPaintMs:number('largest-contentful-paint'),
    totalBlockingTimeMs:number('total-blocking-time'),
    speedIndexMs:number('speed-index'),
    cumulativeLayoutShift:a['cumulative-layout-shift']?.numericValue??null,
    reportFile:path.basename(filepath)};
   rows.push(row);
   console.log('LIGHTHOUSE_PAGE '+JSON.stringify(row));
  }catch(e){rows.push({page:name,device:mode,error:String(e).slice(0,200)})}
 }
}
const summary={generatedAt:new Date().toISOString(),
 method:'Lighthouse lab data on GitHub Actions runner; scores vary with runner/network',
 checked:rows.length,valid:rows.filter(x=>Number.isInteger(x.performanceScore)).length,
 pages:rows};
fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'summary.json'),JSON.stringify(summary,null,2));
console.log('LIGHTHOUSE_TOTAL '+JSON.stringify({checks:summary.checked,valid:summary.valid}));
if(summary.valid!==names.length*modes.length)process.exitCode=1;
