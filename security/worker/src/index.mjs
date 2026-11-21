/*
 * Белая мгла: protected anonymous counters.
 * Cloudflare Worker + D1; a POST requires a server-verified Turnstile token.
 * The old Firebase / Abacus endpoints are NOT touched until cutover.
 */
const ORIGIN = 'https://belaya-mgla-sova58.github.io';
const SLUGS = new Set([
  'ogonek-barash','ogonek-zimbabe',
  'whitefox-01','whitefox-02','whitefox-03','whitefox-04','whitefox-05',
  'whitefox-tv','halloween-2026','ru-update-2026-10-19',
  'creative-bananovyi-mom','creative-solnechny-zamok'
]);
const encoder = new TextEncoder();

function response(data, status = 200, origin = ORIGIN, more = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type':'application/json; charset=utf-8',
      'Cache-Control':'no-store',
      'X-Content-Type-Options':'nosniff',
      'Access-Control-Allow-Origin':origin,
      'Vary':'Origin',
      ...more
    }
  });
}
function originFor(request) {
  return request.headers.get('Origin') === ORIGIN ? ORIGIN : '';
}
function bad(request, message, status = 400) {
  return response({ok:false,error:message},status,originFor(request));
}
async function digest(secret, value) {
  const key = await crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const bytes = new Uint8Array(await crypto.subtle.sign('HMAC',key,encoder.encode(value)));
  return Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
}
async function verifyTurnstile(token, action, env, remoteIp) {
  if (!env.TURNSTILE_SECRET || !token || typeof token !== 'string' || token.length > 2048) return false;
  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET,
    response: token,
    remoteip: remoteIp
  });
  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{
    method:'POST',
    body,
    signal: AbortSignal.timeout(5500)
  });
  if (!result.ok) return false;
  const json = await result.json();
  return json.success === true && json.hostname === 'belaya-mgla-sova58.github.io' && json.action === action;
}
async function count(db,slug) {
  const result=await db.prepare('SELECT views, likes FROM counters WHERE slug=?').bind(slug).first();
  return {ok:true,slug,views:result?.views ?? 0,likes:result?.likes ?? 0};
}
async function limited(db,key,window,limit) {
  const result=await db.prepare(
    'INSERT INTO rate_buckets(bucket_key,window_start,hits) VALUES(?,?,1) '+
    'ON CONFLICT(bucket_key,window_start) DO UPDATE SET hits=hits+1 WHERE hits < ? RETURNING hits'
  ).bind(key,window,limit).first();
  return result !== null;
}
async function record(db,kind,slug,fingerprint,now) {
  if(kind==='views') {
    const result=await db.prepare(
      'INSERT INTO view_events(slug,fingerprint,last_at) VALUES(?,?,?) '+
      'ON CONFLICT(slug,fingerprint) DO UPDATE SET last_at=excluded.last_at '+
      'WHERE view_events.last_at <= excluded.last_at - 86400'
    ).bind(slug,fingerprint,now).run();
    if((result.meta?.changes ?? 0)===0) return false;
    await db.prepare(
      'INSERT INTO counters(slug,views,likes) VALUES(?,1,0) '+
      'ON CONFLICT(slug) DO UPDATE SET views=views+1'
    ).bind(slug).run();
  } else {
    const result=await db.prepare('INSERT OR IGNORE INTO like_events(slug,fingerprint,created_at) VALUES(?,?,?)')
      .bind(slug,fingerprint,now).run();
    if((result.meta?.changes ?? 0)===0) return false;
    await db.prepare(
      'INSERT INTO counters(slug,views,likes) VALUES(?,0,1) '+
      'ON CONFLICT(slug) DO UPDATE SET likes=likes+1'
    ).bind(slug).run();
  }
  return true;
}
export default {
  async fetch(request,env) {
    const origin = originFor(request);
    if(request.method==='OPTIONS') {
      if(!origin) return new Response(null,{status:403});
      return new Response(null,{status:204,headers:{
        'Access-Control-Allow-Origin':origin,
        'Access-Control-Allow-Methods':'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers':'Content-Type,X-Visitor',
        'Access-Control-Max-Age':'600',
        'Vary':'Origin'
      }});
    }
    if(!env.DB) return bad(request,'server_not_configured',503);
    const url = new URL(request.url);
    const match = /^\/v1\/(counts|views|likes)\/([a-z0-9-]{1,80})$/.exec(url.pathname);
    if(!match || !SLUGS.has(match[2])) return bad(request,'not_found',404);
    const [,kind,slug] = match;
    if(kind==='counts' && request.method==='GET') {
      return response(await count(env.DB,slug),200,origin || ORIGIN);
    }
    if(!['views','likes'].includes(kind) || request.method!=='POST') return bad(request,'method_not_allowed',405);
    // Origin is not authentication, but rejects ordinary cross-site browser abuse.
    if(!origin) return bad(request,'origin_not_allowed',403);
    if(!env.HASH_SECRET || !env.TURNSTILE_SECRET) return bad(request,'server_not_configured',503);
    if(!(request.headers.get('Content-Type')||'').toLowerCase().startsWith('application/json'))return bad(request,'invalid_content_type');
    const anonymousId=request.headers.get('X-Visitor')||'';
    if(!/^[a-f0-9]{32}$/.test(anonymousId))return bad(request,'invalid_visitor');
    const ip=request.headers.get('CF-Connecting-IP')||'';
    if(!ip) return bad(request,'missing_ip',403);
    const ua=(request.headers.get('User-Agent')||'').slice(0,240);
    const ipHash=await digest(env.HASH_SECRET,'ip:'+ip);
    const minute=Math.floor(Date.now()/60000);
    if(!await limited(env.DB,ipHash,minute,30)) {
      return bad(request,'rate_limited',429);
    }
    let json;
    try{
      if(Number(request.headers.get('Content-Length')||0)>4096) return bad(request,'body_too_large',413);
      json=await request.json();
    }catch{return bad(request,'invalid_json');}
    if(!json || typeof json!=='object')return bad(request,'invalid_json');
    let verified=false;
    try{verified=await verifyTurnstile(json.turnstileToken,kind==='views'?'view':'like',env,ip)}
    catch{return bad(request,'verification_unavailable',503)}
    if(!verified)return bad(request,'verification_failed',403);
    const visitorHash=await digest(env.HASH_SECRET,'v1:'+ip+'|'+ua+'|'+anonymousId);
    const now=Math.floor(Date.now()/1000);
    const added=await record(env.DB,kind,slug,visitorHash,now);
    const totals=await count(env.DB,slug);
    return response({...totals,counted:added},200,origin);
  },
  async scheduled(_event,env,ctx) {
    ctx.waitUntil(env.DB.prepare('DELETE FROM rate_buckets WHERE window_start < ?')
      .bind(Math.floor(Date.now()/60000)-2880).run());
  }
};