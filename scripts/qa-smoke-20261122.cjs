/* Read-only browser smoke test: mobile Android and desktop.
   Never submits support, like, counters, purchase, or other user forms. */
const {chromium,devices}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const ORIGIN='https://belaya-mgla-sova58.github.io';
const pages=['/','/news.html','/events.html','/heroes.html','/gear.html','/experts.html','/pets.html','/calculators.html','/other.html','/state-58.html','/svs-prep.html','/skhvatka.html','/bear-helper.html','/furnace-calculator.html','/fire-furnace-calculator.html','/chief-gear-calculator.html','/essence-mithril-calculator.html','/ogonek.html','/news-elena.html','/svs-kopilka-test.html'];
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
    if(mode==='desktop'){
      await task('desktop_home_header_not_hidden_by_sidebar',async()=>{
        const details=await page.evaluate(()=>{
          const nav=document.querySelector('.nav-wrap'),heading=document.querySelector('.pc-topbar-title-v966'),search=document.querySelector('.site-search-v426');
          if(!nav||!heading||!search)throw Error('Header, sidebar or search absent');
          const n=nav.getBoundingClientRect(),h=heading.getBoundingClientRect(),s=search.getBoundingClientRect();
          return {sidebarRight:Math.round(n.right),titleLeft:Math.round(h.left),titleRight:Math.round(h.right),searchLeft:Math.round(s.left),
            visible:getComputedStyle(heading).display!=='none'};
        });
        if(!details.visible)throw Error('Desktop portal title is hidden');
        if(details.titleLeft < details.sidebarRight + 8)throw Error('Sidebar overlaps portal title: '+JSON.stringify(details));
        if(details.titleRight > details.searchLeft-6)throw Error('Portal title overlaps search: '+JSON.stringify(details));
        return 'Title clear of sidebar and search: '+JSON.stringify(details);
      });
    }
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
    await task('privacy_posthog_not_autoloaded',async()=>{
      await page.waitForTimeout(700);
      const scripts=await page.locator('script[src*="posthog"]').count();
      if(scripts)throw Error('PostHog loaded without a separate consent');
      return 'No PostHog scripts before consent';
    });
    await task('home_search',async()=>{
      const field=page.locator('input.site-search-input-v426').first();
      if(!(await field.count()))throw Error('Search input missing');
      await field.fill('медведь');
      await page.waitForTimeout(1200);
      const results=page.locator('.site-search-results-v426').first();
      const text=await results.textContent().catch(()=>'');
      await field.fill('');
      await field.press('Escape');
      if(await page.locator('.sova-search-panel.sova-search-visible').count())throw Error('Search panel remains open after Escape');
      if(!/медвед/i.test(text||''))throw Error('No matching search text for медведь: '+String(text).slice(0,140));
      return 'Search finds медведь';
    });
    await task('donate_owl_popup',async()=>{
      const button=page.locator('#sovaSupportTrigger');
      await button.waitFor({state:'visible',timeout:7000});
      const modal=page.locator('#sovaSupportLayer');
      try{await button.click({timeout:6000})}
      catch(e){
        const diagnostic=await button.evaluate(el=>{
          const r=el.getBoundingClientRect(),x=Math.max(0,Math.min(innerWidth-1,r.left+r.width/2)),y=Math.max(0,Math.min(innerHeight-1,r.top+r.height/2));
          const top=document.elementFromPoint(x,y),style=getComputedStyle(el);
          return {rect:{x:r.x,y:r.y,w:r.width,h:r.height},elementAtCenter:top?top.tagName+'#'+top.id+'.'+String(top.className).slice(0,80):null,position:style.position,zIndex:style.zIndex,bottom:style.bottom,opacity:style.opacity,pointerEvents:style.pointerEvents};
        }).catch(err=>({inspectionError:String(err)}));
        console.log('QA_GIFT_DIAG '+JSON.stringify(diagnostic));
        throw Error('Gift owl not clickable: '+JSON.stringify(diagnostic).slice(0,195));
      }
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
        const menuGeometry=await page.evaluate(()=>{
          const drawer=document.querySelector('.nav-wrap');
          const links=[...document.querySelectorAll('.nav-wrap > nav > a.route-link')];
          if(!drawer||!links.length)return null;
          const d=drawer.getBoundingClientRect();
          return {drawerWidth:d.width,links:links.map(a=>{const b=a.getBoundingClientRect();return {width:b.width,left:b.left,right:b.right}})};
        });
        if(menuGeometry){
          const narrow=menuGeometry.links.filter(a=>a.width<menuGeometry.drawerWidth-50);
          if(narrow.length)throw Error('Menu links narrower than drawer: '+JSON.stringify(menuGeometry).slice(0,360));
        }
        const bottom=page.locator('nav.mobile-bottom-v424').first();
        const bstyle=await bottom.evaluate(el=>({display:getComputedStyle(el).display,visibility:getComputedStyle(el).visibility})).catch(()=>null);
        await page.screenshot({path:path.join(output,'menu-android.jpg'),type:'jpeg',quality:65,fullPage:false}).catch(()=>{});
        await page.locator('#sovaMobileCloseV986').click({timeout:5500});
        if(expanded!=='true')throw Error('Menu does not mark aria-expanded=true');
        if(bstyle && bstyle.display!=='none' && bstyle.visibility!=='hidden')throw Error('Bottom navigation remains visible over open drawer');
        if(await toggle.getAttribute('aria-expanded')!=='false')throw Error('Menu did not close after pressing X');
        return 'Opens, hides bottom nav, closes using real X';
      });
    }
    await task('owl_close',async()=>{
      const launcher=page.locator('#madamUguLauncherV720');
      await launcher.waitFor({state:'attached',timeout:8500});
      if(mode==='android'){
        await launcher.waitFor({state:'visible',timeout:8500});
        const close=page.locator('#bmOwlDismissV1097');
        const restore=page.locator('#bmOwlRestoreV1097');
        try{await close.waitFor({state:'visible',timeout:7000})}
        catch(e){
          const detail=await page.evaluate(()=>{
            const ids=['madamUguLauncherV720','bmOwlDismissV1097','bmOwlRestoreV1097','madamUguCloseLauncherV720'];
            return {viewport:{width:innerWidth,height:innerHeight},
              classes:document.body.className,
              sessionOwl:sessionStorage.getItem('bm-home-owl-hidden-v1097'),
              parts:ids.map(id=>{
                const el=document.getElementById(id);
                if(!el)return {id,exists:false};
                const c=getComputedStyle(el),r=el.getBoundingClientRect();
                return {id,exists:true,display:c.display,visibility:c.visibility,opacity:c.opacity,
                  rect:{x:r.x,y:r.y,w:r.width,h:r.height},inlineDisplay:el.style.display};
              })};
          }).catch(err=>({error:String(err)}));
          console.log('QA_OWL_DIAG '+JSON.stringify(detail));
          throw Error('Mobile owl X is not visible: '+JSON.stringify(detail).slice(0,440));
        }
        const geometry=await page.evaluate(()=>{
          const owl=document.getElementById('madamUguLauncherV720');
          const close=document.getElementById('bmOwlDismissV1097');
          const img=owl?.querySelector('img');
          if(!owl||!close||!img)return null;
          const a=img.getBoundingClientRect(),b=close.getBoundingClientRect(),o=owl.getBoundingClientRect();
          return {image:{x:a.x,y:a.y,w:a.width,h:a.height},launcher:{x:o.x,y:o.y,w:o.width,h:o.height},
            cross:{x:b.x,y:b.y,w:b.width,h:b.height},
            centerVerticalDistance:Math.round(Math.abs(b.y+b.height/2-(a.y+a.height/2)))};
        });
        console.log('QA_OWL_GEOMETRY '+JSON.stringify(geometry));
        if(geometry&&geometry.centerVerticalDistance>145)
          throw Error('Mobile X is too far from Madam Ugu image: '+JSON.stringify(geometry).slice(0,220));
        await close.click({timeout:5500});
        if(await launcher.isVisible())throw Error('Mobile owl remained visible after pressing X');
        if(await restore.count() && await restore.isVisible())throw Error('Removed restore control unexpectedly visible');
        await page.reload({waitUntil:'domcontentloaded'});
        await page.locator('#madamUguLauncherV720').waitFor({state:'visible',timeout:9500});
        await page.locator('#bmOwlDismissV1097').waitFor({state:'visible',timeout:9500});
        return 'Mobile owl closes until reload, no restore button, and returns on reload';
      }
      const toggle=page.locator('#madamUguCloseLauncherV720');
      await toggle.waitFor({state:'visible',timeout:8000});
      const folded=()=>launcher.evaluate(el=>el.classList.contains('pc-owl-collapsed-v966'));
      const initial=await folded();
      await toggle.click({timeout:5500});
      if(await folded()===initial)throw Error('Desktop owl did not change collapsed state after click');
      await toggle.click({timeout:5500});
      if(await folded()!==initial)throw Error('Desktop owl did not return to initial state');
      return 'Desktop owl expands and collapses by real control';
    });
  }
  if(pathName==='/calculators.html'&&mode==='android'){
    await task('mobile_calculator_heading_word_wrap',async()=>{
      const info=await page.locator('.calc-hub-head h1').evaluate(el=>{
        const node=el.firstChild;
        if(!node||node.nodeType!==Node.TEXT_NODE)return {error:'Heading has unexpected nodes'};
        const text=node.textContent,range=document.createRange(),lines=new Map();
        for(let i=0;i<text.length;i++){
          if(!text[i].trim())continue;
          range.setStart(node,i);range.setEnd(node,i+1);
          const rect=range.getBoundingClientRect();
          const key=Math.round(rect.top);
          lines.set(key,(lines.get(key)||'')+text[i]);
        }
        return {lines:[...lines.values()],font:getComputedStyle(el).fontSize};
      });
      if(info.error)throw Error(info.error);
      if(info.lines.length>2)throw Error('Heading splits into '+info.lines.length+' lines: '+JSON.stringify(info));
      if(info.lines.some(line=>line.length<3))throw Error('Isolated character in heading: '+JSON.stringify(info));
      return 'Mobile title within '+info.lines.length+' readable lines: '+JSON.stringify(info);
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
      const heroSelectors=page.locator('#trio select.hsel');
      if(await heroSelectors.count()!==3)throw Error('Expected 3 independently selectable hero slots');
      const unlabeled=await heroSelectors.evaluateAll(nodes=>nodes.filter(el=>!el.getAttribute('aria-label')));
      if(unlabeled.length)throw Error('Some bear lineup hero selectors have no accessibility labels');
      return 'Result section generated ('+content.length+' characters), 3 hero selectors labeled';
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
      if(await page.locator('#slots button.slot').count()!==6)throw Error('Expected exactly 6 gear slots');
      const imageHealth=await page.locator('#slots button.slot img').evaluateAll(async imgs=>{
        return await Promise.all(imgs.map(async(img)=>{
          img.loading='eager';
          try{await img.decode();return {ok:img.naturalWidth>0,src:img.currentSrc.slice(0,85)}}
          catch(e){return {ok:false,src:img.currentSrc.slice(0,85)}}
        }));
      });
      if(imageHealth.some(i=>!i.ok))throw Error('Missing gear icon: '+JSON.stringify(imageHealth.filter(i=>!i.ok)).slice(0,160));
      await charm.click({timeout:6000});
      if(await page.locator('#slots button.slot').count()!==18)throw Error('Expected exactly 18 charm slots');
      await gear.click({timeout:6000});
      await page.locator('#bulkLevel').selectOption('1');
      page.once('dialog',d=>d.accept());
      await page.locator('#bulkCurrent').click();
      const raised=await page.locator('#current').inputValue();
      if(raised!=='1')throw Error('Bulk current level did not rise to 1: '+raised);
      await page.locator('#bulkLevel').selectOption('0');
      page.once('dialog',d=>d.accept());
      await page.locator('#bulkCurrent').click();
      const lowered=await page.locator('#current').inputValue();
      if(lowered!=='0')throw Error('Bulk current level cannot be corrected downward: '+lowered);
      await page.locator('#bulkLevel').selectOption('-1');
      page.once('dialog',d=>d.accept());
      await page.locator('#bulkCurrent').click();
      page.once('dialog',d=>d.accept());
      await page.locator('#clearPlan').click({timeout:4000});
      await page.locator('#target').selectOption('0');
      const points=Number((await page.locator('#totalPoints').textContent()||'').replace(/[^0-9]/g,''));
      if(!(points>0))throw Error('Upgrading first gear stage did not produce SvS points');
      const readNum=async(id)=>Number((await page.locator('#'+id).textContent()||'').replace(/[^0-9]/g,''));
      const gearPoints=await readNum('gearPoints'),charmPoints=await readNum('charmPoints');
      if(points!==gearPoints+charmPoints)throw Error('Total SvS points differ from gear+charm points: '+JSON.stringify({points,gearPoints,charmPoints}));
      await page.locator('#clearItem').click();
      const resetPoints=Number((await page.locator('#totalPoints').textContent()||'').replace(/[^0-9]/g,''));
      if(resetPoints!==0)throw Error('Clearing upgrade did not restore zero planned points');
      return '6 gear slots, 18 charm slots, 6 decoded icons; upgrade and reset valid';
    });
  }
  if(pathName==='/chief-gear-calculator.html'){
    await task('chief_gear_exchange_settlement_safety',async()=>{
      const key='belaya-mgla-chief-calculator-v1';
      await page.evaluate(k=>{
        const s=JSON.parse(localStorage.getItem(k));
        for(const v of Object.values(s.gear)){v.from=-1;v.to=-1}
        for(const v of Object.values(s.charm)){v.from=-1;v.to=-1}
        for(const id of Object.keys(s.inventory))s.inventory[id]=1000000;
        s.exchangeUnlocked={gear:true,charm:false};
        s.exchanges=[[0,1]];
        localStorage.setItem(k,JSON.stringify(s));
      },key);
      await page.reload({waitUntil:'domcontentloaded',timeout:25000});
      await page.locator('#target').selectOption('0');
      await page.locator('#markDone').click();
      if(await page.locator('#doneDeduct').isDisabled())throw Error('Valid exchange unexpectedly disables deduction');
      const before=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
      page.once('dialog',d=>d.dismiss());
      await page.locator('#doneDeduct').click();
      const cancelled=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
      if(JSON.stringify(cancelled)!==JSON.stringify(before))throw Error('Cancelling exchange completion changed saved inventory or plans');
      if(!(await page.locator('#doneDialog').isVisible()))throw Error('Dialog closed after cancelling exchange completion');
      page.once('dialog',d=>d.accept());
      await page.locator('#doneDeduct').click();
      const applied=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
      if(applied.exchanges.length)throw Error('Completed exchange was not cleared after explicit confirmation');
      if(applied.gear.cap.from!==0)throw Error('Completed gear level not saved');
      if(Object.values(applied.inventory).some(v=>!Number.isSafeInteger(v)||v<0))throw Error('Deduction produced invalid inventory');
      // An impossible planned exchange must remain visible and prevent deduction.
      applied.gear.cap.from=-1;applied.gear.cap.to=-1;
      applied.exchanges=[[0,1000000]];
      localStorage.setItem(k,JSON.stringify(applied));
      await page.reload({waitUntil:'domcontentloaded',timeout:25000});
      await page.locator('#target').selectOption('0');
      await page.locator('#markDone').click();
      if(!(await page.locator('#doneDeduct').isDisabled()))throw Error('Invalid planned exchange did not block deduction');
      const preserved=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
      if(preserved.exchanges.length!==1)throw Error('Invalid exchange disappeared');
      await page.locator('#doneCancel').click();
      return 'Cancelled confirmation preserves plans; accepted settlement commits; invalid exchanges block deduction';
    });
  }
  if(pathName==='/chief-gear-calculator.html'){
    await task('chief_affordability_reserves_shared_inventory',async()=>{
      const key='belaya-mgla-chief-calculator-v1';
      const chosen=await page.evaluate(k=>{
        const state=JSON.parse(localStorage.getItem(k));
        const data=JSON.parse(document.querySelector('#bm-game-data').textContent);
        const first=data.records.find(r=>r.kind==='gear');
        const fields={alloy:'alloy',polish:'polishing_solution',plans:'design_plans',amber:'lunar_amber',guides:'charm_guide',designs:'charm_design',secrets:'charm_secrets'};
        for(const levels of [state.gear,state.charm])for(const slot of Object.values(levels)){slot.from=-1;slot.to=-1;}
        for(const mat of Object.keys(state.inventory))state.inventory[mat]=0;
        for(const [mat,field] of Object.entries(fields))state.inventory[mat]=first.cost[field]||0;
        state.exchanges=[];state.exchangeUnlocked={gear:false,charm:false};
        localStorage.setItem(k,JSON.stringify(state));
        return {materialCosts:state.inventory};
      },key);
      if(!Object.values(chosen.materialCosts).some(n=>n>0))throw Error('First gear step has no material costs');
      await page.reload({waitUntil:'domcontentloaded',timeout:25000});
      const options=page.locator('#compare .compareItem');
      if(!(await options.count()))throw Error('Expected at least one individually affordable suggestion');
      await options.first().locator('button').click();
      const result=await page.evaluate(k=>{
        const s=JSON.parse(localStorage.getItem(k));
        const data=JSON.parse(document.querySelector('#bm-game-data').textContent);
        const fields={alloy:'alloy',polish:'polishing_solution',plans:'design_plans',amber:'lunar_amber',guides:'charm_guide',designs:'charm_design',secrets:'charm_secrets'};
        const used=Object.fromEntries(Object.keys(fields).map(x=>[x,0]));
        for(const [kind,slots] of [['gear',s.gear],['charm',s.charm]]){
          const rows=data.records.filter(r=>r.kind===kind);
          for(const level of Object.values(slots))for(let i=level.from+1;i<=level.to;i++)
            for(const [k,v] of Object.entries(fields))used[k]+=rows[i].cost[v]||0;
        }
        return {used,inventory:s.inventory};
      },key);
      for(const k of Object.keys(result.used))
        if(result.used[k]>result.inventory[k])throw Error('Shared materials overcommitted: '+k);
      const label=await page.locator('#affordableCount').textContent();
      if(!/дополнительных вариантов|Свободных материалов/.test(label||''))
        throw Error('Affordability list did not update after reserving materials: '+label);
      return 'One suggestion selected; total commitments stay within common stock';
    });
  }
  if(pathName==='/chief-gear-calculator.html'){
    await task('chief_optimizer_shared_stock_and_persistence',async()=>{
      const key='belaya-mgla-chief-calculator-v1';
      await page.evaluate(k=>{
        const state=JSON.parse(localStorage.getItem(k));
        const records=JSON.parse(document.getElementById('bm-game-data').textContent).records;
        const first=records.find(r=>r.kind==='gear');
        const columns={alloy:'alloy',polish:'polishing_solution',plans:'design_plans',amber:'lunar_amber',guides:'charm_guide',designs:'charm_design',secrets:'charm_secrets'};
        for(const s of Object.values(state.gear))s.from=s.to=-1;
        for(const s of Object.values(state.charm))s.from=s.to=-1;
        for(const [k,col] of Object.entries(columns))state.inventory[k]=(first.cost[col]||0)*2;
        state.exchanges=[];state.exchangeUnlocked={gear:false,charm:false};state.bonus=0;
        localStorage.setItem(k,JSON.stringify(state));
      },key);
      await page.reload({waitUntil:'domcontentloaded',timeout:25000});
      for(const button of ['optSvs','optPower']){
        await page.locator('#'+button).click({timeout:10000});
        if(await page.locator('#applyOpt').isHidden())throw Error('Optimizer did not offer any upgrades: '+button);
        if(!(await page.locator('#optList .opt-step').count()))throw Error('Optimizer did not list recommended upgrades');
      }
      page.once('dialog',d=>d.accept());
      await page.locator('#applyOpt').click({timeout:5000});
      const actual=await page.evaluate(k=>{
        const state=JSON.parse(localStorage.getItem(k));
        const records=JSON.parse(document.getElementById('bm-game-data').textContent).records;
        const columns={alloy:'alloy',polish:'polishing_solution',plans:'design_plans',amber:'lunar_amber',guides:'charm_guide',designs:'charm_design',secrets:'charm_secrets'};
        const used=Object.fromEntries(Object.keys(columns).map(x=>[x,0]));
        let upgraded=0;
        for(const kind of ['gear','charm']){
          const rows=records.filter(r=>r.kind===kind);
          for(const s of Object.values(state[kind])){
            if(s.to>s.from)upgraded++;
            for(let i=s.from+1;i<=s.to;i++)for(const [key,col] of Object.entries(columns))used[key]+=rows[i].cost[col]||0;
          }
        }
        return {used,available:state.inventory,upgraded,targets:{
          gear:Object.values(state.gear).map(s=>s.to),charm:Object.values(state.charm).map(s=>s.to)
        }};
      },key);
      if(!actual.upgraded)throw Error('Applied optimizer plan has no upgrades');
      for(const k of Object.keys(actual.used))
        if(actual.used[k]>actual.available[k])throw Error('Optimizer overcommitted shared material: '+k);
      if(!(await page.locator('#applyOpt').isHidden()))throw Error('Apply button stayed active after committing optimizer plan');
      await page.reload({waitUntil:'domcontentloaded',timeout:25000});
      const restored=await page.evaluate(k=>{
        const s=JSON.parse(localStorage.getItem(k));
        return {gear:Object.values(s.gear).map(x=>x.to),charm:Object.values(s.charm).map(x=>x.to)};
      },key);
      if(JSON.stringify(restored)!==JSON.stringify(actual.targets))throw Error('Optimizer targets changed after reload');
      const verified=await page.evaluate(k=>{
        const saved=JSON.parse(localStorage.getItem(k));
        const records=JSON.parse(document.getElementById('bm-game-data').textContent).records;
        let scoreGear=0,scoreCharm=0,power=0;
        for(const cat of ['gear','charm']){
          const rows=records.filter(r=>r.kind===cat);
          for(const item of Object.values(saved[cat])){
            if(item.to<=item.from)continue;
            power+=rows[item.to].power_total-(item.from<0?0:rows[item.from].power_total);
            for(let i=item.from+1;i<=item.to;i++){
              if(cat==='gear')scoreGear+=rows[i].upgrade_score;
              else scoreCharm+=rows[i].upgrade_score;
            }
          }
        }
        const digits=id=>Number(document.getElementById(id).textContent.replace(/[^0-9]/g,''));
        const multiplier=1+(saved.bonus||0)/100;
        return {
          expectedPower:Math.round(power),actualPower:digits('power'),
          expectedGear:Math.round(scoreGear*36*multiplier),actualGear:digits('gearPoints'),
          expectedCharm:Math.round(scoreCharm*70*multiplier),actualCharm:digits('charmPoints'),
          actualTotal:digits('totalPoints')
        };
      },key);
      if(verified.expectedPower!==verified.actualPower||verified.expectedGear!==verified.actualGear||
         verified.expectedCharm!==verified.actualCharm||
         verified.actualTotal!==verified.actualGear+verified.actualCharm)
        throw Error('Displayed power or SvS points disagree with independent row totals: '+JSON.stringify(verified));
      return 'Both optimizer modes offer upgrades; applied plan stays within stock and persists on reload';
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
    await task('fire_furnace_progress',async()=>{
      const from=page.locator('#fireFrom'),to=page.locator('#fireTo');
      if(await from.count()!==1||await to.count()!==1)throw Error('Fire furnace selectors missing');
      const n=await to.locator('option').count();
      if(n<10)throw Error('Expected 10 fire crystal stages');
      await from.selectOption('0');
      await to.selectOption('10');
      const before=await page.locator('#fireSteps .calc-step-v378').count();
      if(before<10)throw Error('FC1–FC2 progression did not create enough steps: '+before);
      await page.locator('#refineOwned').fill('20');
      await page.locator('#refineOwned').dispatchEvent('change');
      await page.reload({waitUntil:'domcontentloaded',timeout:25000});
      await page.locator('#fireTo option').first().waitFor({state:'attached',timeout:8000});
      if(await page.locator('#fireFrom').inputValue()!=='0'||await page.locator('#fireTo').inputValue()!=='10')
        throw Error('Fire furnace start and target did not persist');
      if(await page.locator('#refineOwned').inputValue()!=='20')throw Error('Refined crystal stock not saved');
      const after=await page.locator('#fireSteps .calc-step-v378').count();
      if(after!==before)throw Error('Fire furnace steps changed across reload');
      return n+' fire furnace targets; '+after+' steps and owned crystals persist';
    });
  }
  if(pathName==='/furnace-calculator.html'){
    await task('furnace_progress',async()=>{
      const from=page.locator('#calcFrom'),to=page.locator('#calcTo');
      if(await from.count()!==1||await to.count()!==1)throw Error('Furnace selectors missing');
      const n=await to.locator('option').count();
      if(n<11)throw Error('Expected 11 normal furnace levels');
      await from.selectOption('20');
      await to.selectOption('22');
      await page.locator('#curEmbassy').selectOption('20');
      const before=await page.locator('#calcSteps .calc-step-v378').count();
      if(before<2)throw Error('Furnace route did not produce upgrade steps');
      const meat=await page.locator('#totalMeat').textContent();
      if(!meat||/^0(?:\\s|$)/.test(meat))throw Error('Furnace cost did not render');
      await page.reload({waitUntil:'domcontentloaded',timeout:25000});
      await page.locator('#calcTo option').first().waitFor({state:'attached',timeout:8000});
      if(await page.locator('#calcFrom').inputValue()!=='20'||await page.locator('#calcTo').inputValue()!=='22')
        throw Error('Normal furnace range not saved on reload');
      if(await page.locator('#curEmbassy').inputValue()!=='20')throw Error('Embassy level not saved');
      const after=await page.locator('#calcSteps .calc-step-v378').count();
      if(after!==before)throw Error('Furnace upgrade route changed across reload');
      return n+' normal furnace levels; cost and '+after+' upgrade steps persist';
    });
  }
  if(pathName==='/skhvatka.html'){
    await task('skhvatka_guide',async()=>{
      const h=await page.locator('h1').textContent();
      if(!/Схватка/i.test(h||''))throw Error('Wrong title');
      return 'Event guide opens';
    });
  }
  if(pathName==='/svs-kopilka-test.html'){
    await task('svs_savings_all_day_items',async()=>{
      const days=page.locator('#days [data-day]');
      if(await days.count()!==5)throw Error('Five SvS days are not selectable');
      const counts=[];
      for(let d=1;d<=5;d++){
        await page.locator('#days [data-day="'+d+'"]').click({timeout:4000});
        const n=await page.locator('#mainItems input[data-id]').count();
        counts.push(n);
        if(n<8)throw Error('Not all items visible for day '+d+': '+n);
        if(await page.locator('#extraItems input[data-id]').count()>0)throw Error('Extra items hidden behind disclosure on day '+d);
      }
      await page.locator('#days [data-day="2"]').click();
      for(const id of ['gatherMeat','gatherWood','gatherCoal','gatherIron']){
        if(await page.locator('#mainItems input[data-id="'+id+'"]').count()!==1)throw Error('Missing gathering resource: '+id);
      }
      for(const [id,v] of [['gatherMeat','1000'],['gatherWood','1000'],['gatherCoal','200'],['gatherIron','50']])
        await page.locator('#mainItems input[data-id="'+id+'"]').fill(v);
      const gather=Number((await page.locator('#potential').textContent()||'').replace(/[^0-9]/g,''));
      if(gather!==8)throw Error('Expected 8 points from four gathering units, got '+gather);
      await page.locator('#days [data-day="3"]').click();
      for(const id of ['beasts','beasts21','beasts16','beasts11','beasts1'])
        if(await page.locator('#mainItems input[data-id="'+id+'"]').count()!==1)throw Error('Missing beast level group '+id);
      await page.locator('#mainItems input[data-id="beasts1"]').fill('1');
      await page.locator('#mainItems input[data-id="beasts21"]').fill('1');
      const hunt=Number((await page.locator('#potential').textContent()||'').replace(/[^0-9]/g,''));
      if(hunt!==20250)throw Error('Expected 20250 from two beast groups, got '+hunt);
      await page.locator('#days [data-day="4"]').click();
      for(let tier=1;tier<=11;tier++){
        if(await page.locator('#mainItems input[data-id="t'+tier+'"]').count()!==1)throw Error('Troop tier T'+tier+' missing');
      }
      await page.locator('#mainItems input[data-id="t10"]').fill('100');
      const actual=Number((await page.locator('#potential').textContent()||'').replace(/[^0-9]/g,''));
      if(actual!==6000)throw Error('Expected 6000 points for 100 T10 at the test rate, got '+actual);
      await page.locator('#buildPlan').click();
      if(!/T10/.test(await page.locator('#plan').textContent()||''))throw Error('Planning output did not include T10');
      await page.locator('details:has(#bonus) > summary').click();
      await page.locator('#bonus').fill('10');
      const t10Rate=await page.locator('#mainItems .stockrow:has(input[data-id="t10"])').textContent();
      if(!/66\s*очк/.test(t10Rate||''))throw Error('Bonus 10% not reflected in visible unit points');
      const boosted=Number((await page.locator('#potential').textContent()||'').replace(/[^0-9]/g,''));
      if(boosted!==6600)throw Error('10% bonus did not increase 6000 points to 6600: '+boosted);
      const refreshedPlan=await page.locator('#plan').textContent()||'';
      if(!/6[\s\u00a0]*600/.test(refreshedPlan))throw Error('Plan did not update automatically after changing 10% bonus: '+refreshedPlan.slice(0,250));
      await page.locator('#mainItems input[data-id="t10"]').fill('150');
      const afterStock=await page.locator('#plan').textContent()||'';
      if(!/9[\s\u00a0]*900/.test(afterStock))throw Error('Plan did not refresh after stock edit: '+afterStock.slice(0,250));
      await page.locator('#mainItems input[data-id="t10"]').fill('100');
      await page.locator('#goals [data-goal="custom"]').click();
      await page.locator('#customGoal').fill('1');
      if(!/1\s*млн/.test((await page.locator('#target').textContent()||'').replace(/\u00a0/g,' ')))throw Error('Custom goal display is incorrect');
      await page.reload({waitUntil:'domcontentloaded',timeout:25000});
      await page.locator('#days [data-day="4"]').waitFor({state:'visible',timeout:6000});
      if(await page.locator('#mainItems input[data-id="t10"]').inputValue()!=='100')throw Error('Stock amount not persisted after reload');
      if(await page.locator('#bonus').inputValue()!=='10')throw Error('Bonus not persisted after reload');
      if(await page.locator('#goals [data-goal="custom"]').getAttribute('aria-pressed')!=='true')throw Error('Custom goal not persisted after reload');
      // Invalid persisted quantities must never become Infinity/NaN in the UI.
      await page.evaluate(()=>{
        const key=Object.keys(localStorage).find(k=>k.includes('svs')&&k.includes('kopilka'));
        if(!key)throw Error('SvS storage key not found');
        const saved=JSON.parse(localStorage.getItem(key));
        saved.stock={...saved.stock,t10:'1e309',mithril:-100};
        saved.custom='Infinity';saved.bonus='Infinity';
        localStorage.setItem(key,JSON.stringify(saved));
      });
      await page.reload({waitUntil:'domcontentloaded'});
      const safe=await page.evaluate(()=>({
        bonus:document.querySelector('#bonus').value,
        potential:document.querySelector('#potential').textContent,
        t10:document.querySelector('#mainItems input[data-id="t10"]')?.value
      }));
      if(/Infinity|NaN|∞/.test(JSON.stringify(safe)))throw Error('Invalid stored values leaked into UI: '+JSON.stringify(safe));
      if(Number(safe.t10)!==0)throw Error('Non-finite stock was not treated as zero: '+JSON.stringify(safe));
      page.once('dialog',d=>d.accept());
      await page.locator('#reset').click();
      const reset=Number((await page.locator('#potential').textContent()||'').replace(/[^0-9]/g,''));
      if(reset!==0)throw Error('Reset did not clear stock points: '+reset);
      return 'All five days: '+counts.join('/')+' items; 10% bonus, goal, persistence and reset valid';
    });
    await task('svs_f2p_saving_priority',async()=>{
      await page.locator('#days [data-day="4"]').click();
      await page.locator('#goals [data-goal="custom"]').click();
      await page.locator('#customGoal').fill('0.1');
      await page.locator('details:has(#bonus) > summary').click();
      await page.locator('#bonus').fill('0');
      await page.locator('#mainItems input[data-id="t10"]').fill('2000');
      await page.locator('#mainItems input[data-id="mithril"]').fill('0.5');
      if(await page.locator('#mainItems input[data-id="mithril"]').inputValue()!=='0')throw Error('Fractional Mithril must be rounded down');
      await page.locator('#mainItems input[data-id="mithril"]').fill('1');
      await page.locator('#buildPlan').click();
      const used=await page.locator('#plan li').allTextContents();
      if(!used.some(x=>/T10/.test(x)))throw Error('Available T10 training not selected');
      if(used.some(x=>/Мифрил/.test(x)))throw Error('Scarce Mithril selected although T10 training reaches goal');
      if(!/Мифрил/.test(await page.locator('#plan').textContent()||''))throw Error('Unused Mithril not identified as saved');
      page.once('dialog',d=>d.accept());
      await page.locator('#reset').click();
      return '100k-point goal reached with T10 training; Mithril saved';
    });
  }
}
async function inspect(browser,ctx,mode,pathName){
  const page=await ctx.newPage();
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
    if(mode==='desktop'){
      const geometry=await page.evaluate(()=>{
        const nav=document.querySelector('.nav-wrap'),main=document.getElementById('appMain');
        if(!nav||!main||getComputedStyle(nav).display==='none'||getComputedStyle(nav).position!=='fixed')return null;
        const n=nav.getBoundingClientRect(),m=main.getBoundingClientRect();
        return {sidebarRight:Math.round(n.right),mainLeft:Math.round(m.left)};
      });
      if(geometry&&geometry.mainLeft<geometry.sidebarRight-2)
        record.issues.push('Desktop navigation overlaps main page: '+JSON.stringify(geometry));
    }
    // Collect accessibility and DOM-integrity findings without assuming all
    // visually hidden labels are errors. This first pass is diagnostic.
    record.accessibility=await page.evaluate(()=>{
      const ids=new Map();
      for(const el of document.querySelectorAll('[id]')){
        ids.set(el.id,(ids.get(el.id)||0)+1);
      }
      const duplicates=[...ids].filter(([id,n])=>n>1).map(([id,n])=>({id,count:n})).slice(0,20);
      const isVisible=el=>{
        const c=getComputedStyle(el),r=el.getBoundingClientRect();
        return c.display!=='none'&&c.visibility!=='hidden'&&r.width>0&&r.height>0;
      };
      const name=el=>(el.getAttribute('aria-label')||el.getAttribute('title')||el.getAttribute('aria-labelledby')||el.textContent||el.innerText||'').trim();
      const unnamedButtons=[...document.querySelectorAll('button')].filter(el=>isVisible(el)&&!name(el))
        .slice(0,12).map(el=>({id:el.id,cls:String(el.className||'').slice(0,70)}));
      const emptyLinks=[...document.querySelectorAll('a[href]')].filter(el=>!el.closest('details:not([open])')&&isVisible(el)&&!name(el)&&!el.querySelector('img[alt]:not([alt=""])'))
        .slice(0,12).map(el=>({href:el.getAttribute('href')?.slice(0,110)}));
      const unlabeledInputs=[...document.querySelectorAll('input:not([type=hidden]),select,textarea')].filter(el=>{
        if(!isVisible(el))return false;
        if(el.getAttribute('aria-label')||el.getAttribute('aria-labelledby')||el.getAttribute('title'))return false;
        if(el.labels?.length)return false;
        return true;
      }).slice(0,12).map(el=>({id:el.id,type:el.type||el.tagName,html:el.outerHTML.slice(0,260)}));
      const invalidComboboxes=[...document.querySelectorAll('[role="combobox"]')].filter(el=>
        !['true','false'].includes(el.getAttribute('aria-expanded'))
      ).slice(0,12).map(el=>({id:el.id,html:el.outerHTML.slice(0,180)}));
      return {duplicateIds:duplicates,unnamedButtons,emptyLinks,unlabeledInputs,invalidComboboxes};
    });
    // Accessibility regressions must fail the browser test, not remain invisible in logs.
    const accessibility=record.accessibility;
    if(accessibility.duplicateIds.length)
      record.issues.push('Duplicate DOM ids: '+JSON.stringify(accessibility.duplicateIds).slice(0,190));
    if(accessibility.unlabeledInputs.length)
      record.issues.push('Visible inputs without accessible labels: '+JSON.stringify(accessibility.unlabeledInputs).slice(0,190));
    if(accessibility.unnamedButtons.length)
      record.issues.push('Visible buttons without accessible names: '+JSON.stringify(accessibility.unnamedButtons).slice(0,190));
    if(accessibility.invalidComboboxes.length)
      record.issues.push('Comboboxes missing aria-expanded: '+JSON.stringify(accessibility.invalidComboboxes).slice(0,190));
    if(accessibility.emptyLinks.length)
      record.issues.push('Visible links without accessible names: '+JSON.stringify(accessibility.emptyLinks).slice(0,190));
    record.horizontalOverflow=data.overflow;
    record.images=data.images;
    record.navigation=data.navigation;
    if(record.status>=400)record.issues.push('HTTP '+record.status);
    if(record.horizontalOverflow>8)record.issues.push('Horizontal overflow '+record.horizontalOverflow+'px');
    if(data.images.brokenViewport.length)record.issues.push('Broken visible images: '+data.images.brokenViewport.join(',').slice(0,220));
    await scenario(page,pathName,mode,record);
    if(mode==='android'){
      const analyticsOverlap=await page.evaluate(()=>{
        const nav=document.querySelector('.mobile-bottom-v424'),button=document.getElementById('sova-metrika-open');
        if(!nav||!button||getComputedStyle(nav).display==='none'||getComputedStyle(button).display==='none')return null;
        const a=nav.getBoundingClientRect(),b=button.getBoundingClientRect();
        const overlap=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
        return {navTop:Math.round(a.top),analyticsBottom:Math.round(b.bottom),overlap:Math.round(overlap)};
      });
      if(analyticsOverlap&&analyticsOverlap.overlap>0)
        record.issues.push('Analytics settings button overlaps mobile navigation: '+JSON.stringify(analyticsOverlap));
    }
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
    // Focused small-phone geometry checks for the current navigation and dialogs.
    // Read-only: open/close controls only, never submit any forms.
    const narrow=[];
    for(const width of [320,360,390]){
      const ctx=await browser.newContext({
        viewport:{width,height:740},deviceScaleFactor:1,
        isMobile:true,hasTouch:true,reducedMotion:'reduce',serviceWorkers:'block'
      });
      try{
        for(const pathName of ['/','/calculators.html','/news.html']){
          const page=await ctx.newPage();
          const item={width,path:pathName,issues:[]};
          try{
            const response=await page.goto(ORIGIN+pathName,{waitUntil:'domcontentloaded',timeout:25000});
            await page.waitForTimeout(900);
            item.status=response?.status()||0;
            const geometry=await page.evaluate(()=>{
              const visible=el=>{if(!el)return false;const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0};
              const nav=document.querySelector('nav.mobile-bottom-v424');
              const links=nav?[...nav.querySelectorAll(':scope > a')]:[];
              const navRect=nav?.getBoundingClientRect();
              const linkRects=links.map(a=>{const r=a.getBoundingClientRect();return {label:a.textContent.trim(),left:r.left,right:r.right,width:r.width,height:r.height}});
              const overflow=Math.max(0,document.documentElement.scrollWidth-innerWidth);
              const clipping=linkRects.filter(r=>r.left< -1||r.right>innerWidth+1||r.width<35);
              return {viewport:innerWidth,overflow,navVisible:visible(nav),navRect:navRect?{left:navRect.left,right:navRect.right,top:navRect.top,bottom:navRect.bottom}:null,
                linkCount:links.length,clipping,links:linkRects};
            });
            item.geometry=geometry;
            if(item.status>=400)item.issues.push('HTTP '+item.status);
            if(geometry.overflow>8)item.issues.push('Horizontal overflow '+geometry.overflow+'px');
            if(!geometry.navVisible)item.issues.push('Mobile navigation is hidden');
            if(geometry.linkCount!==5)item.issues.push('Expected five mobile links, found '+geometry.linkCount);
            if(geometry.clipping.length)item.issues.push('Clipped or too narrow navigation links: '+JSON.stringify(geometry.clipping));
            if(pathName==='/'){
              // Consent may cover the support button on first visit: dismiss it for testing.
              const consent=page.locator('#sova-metrika-consent');
              if(await consent.isVisible().catch(()=>false)){
                const consentRect=await consent.boundingBox();
                if(consentRect && (
                  consentRect.x < -2 || consentRect.x+consentRect.width > width+2 ||
                  consentRect.y < -2 || consentRect.y+consentRect.height > 742
                )) item.issues.push('Analytics consent extends beyond viewport: '+JSON.stringify(consentRect));
                const decline=page.locator('#sova-metrika-decline');
                if(await decline.isVisible().catch(()=>false))
                  await decline.click({timeout:3500});
                if(await consent.isVisible().catch(()=>false))
                  item.issues.push('Consent dialog remained open after decline');
              }
              const trigger=page.locator('#sovaSupportTrigger');
              if(await trigger.isVisible().catch(()=>false)){
                await trigger.click({timeout:4000});
                const modal=page.locator('#sovaSupportLayer');
                if(await modal.isVisible().catch(()=>false)){
                  const r=await modal.boundingBox();
                  if(r&&(r.x< -2||r.x+r.width>width+2||r.y< -2||r.y+r.height>742))
                    item.issues.push('Support popup extends beyond phone viewport: '+JSON.stringify(r));
                  await modal.locator('.sova-support-close').click({timeout:3500}).catch(()=>item.issues.push('Support popup could not close'));
                }else item.issues.push('Support popup did not open');
              }else item.issues.push('Support button is not visible');
            }
            await page.screenshot({path:path.join(output,'narrow-'+width+'-'+(pathName==='/'?'index':pathName.slice(1).replace('.html',''))+'.jpg'),type:'jpeg',quality:60}).catch(()=>{});
          }catch(e){item.issues.push(String(e).slice(0,220))}
          narrow.push(item);
          await page.close().catch(()=>{});
        }
      }finally{await ctx.close()}
    }
    fs.writeFileSync(path.join(output,'narrow-viewport-report.json'),JSON.stringify(narrow,null,2));
    const narrowFailures=narrow.filter(x=>x.issues.length);
    fs.writeFileSync(path.join(output,'narrow-viewport-summary.json'),JSON.stringify({
      checks:narrow.length,failedChecks:narrowFailures.length,
      widths:[320,360,390],failed:narrowFailures
    },null,2));
    console.log('QA_NARROW '+JSON.stringify({checks:narrow.length,failures:narrowFailures.length,items:narrowFailures}));
    if(narrowFailures.length)process.exitCode=1;
  }finally{await browser.close()}
  const narrowSummary=JSON.parse(fs.readFileSync(path.join(output,'narrow-viewport-summary.json'),'utf8'));
  const total={pages:all.length,failedPages:all.filter(x=>x.issues.length).length,failedScenarios:all.flatMap(x=>x.scenarios).filter(x=>!x.ok).length,brokenImages:all.reduce((a,x)=>a+(x.images.brokenViewport?.length||0),0),overflowPages:all.filter(x=>x.horizontalOverflow>8).length,errorPages:all.filter(x=>x.consoleErrors.length).length,assetErrorPages:all.filter(x=>x.assetErrors.length).length,narrowChecks:narrowSummary.checks,narrowFailures:narrowSummary.failedChecks};
  fs.writeFileSync(path.join(output,'summary.json'),JSON.stringify(total,null,2));
  console.log('QA_TOTAL '+JSON.stringify(total));
  if(total.failedPages>0){
    console.error('QA_FAILED: '+total.failedPages+' of '+total.pages+' page/device checks reported issues. See uploaded qa-smoke-report.');
    process.exitCode=1;
  }
})().catch(e=>{console.error('QA_FATAL '+String(e));process.exitCode=1});
