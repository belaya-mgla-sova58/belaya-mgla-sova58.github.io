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
   if(mode==='mobile') {
    const lcp=a['largest-contentful-paint-element']?.details?.items?.map(item=>({
      node:item.node?.snippet||item.node?.nodeLabel||null,
      url:item.url||item.node?.lhId||null
    })).slice(0,3)||[];
    const largestRequests=(a['network-requests']?.details?.items||[])
      .filter(item=>item.url&&Number.isFinite(item.transferSize))
      .sort((x,y)=>y.transferSize-x.transferSize).slice(0,8)
      .map(item=>({url:item.url.slice(0,200),bytes:item.transferSize,resourceType:item.resourceType}));
    const opportunities=Object.entries(a)
      .filter(([id,v])=>typeof v?.numericValue==='number'&&/savings|blocking|unused|modern-image|efficiently-encode|server-response|unminified|redirects/i.test(id))
      .map(([id,v])=>({id,ms:Math.round(v.numericValue),score:v.score}))
      .slice(0,12);
    const insightIds=['lcp-discovery-insight','lcp-breakdown-insight','render-blocking-insight'];
    const insights=insightIds.map(id=>({
      id,score:a[id]?.score??null,
      explanation:a[id]?.explanation?.slice(0,240)||null,
      displayValue:a[id]?.displayValue||null
    })).filter(x=>x.score!==null||x.explanation||x.displayValue);
    console.log('LIGHTHOUSE_DIAG '+JSON.stringify({page:name,device:mode,lcp,largestRequests,opportunities,insights}));
   }
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
