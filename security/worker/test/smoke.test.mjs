import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.mjs';

const ORIGIN='https://belaya-mgla-sova58.github.io';
const env={
  DB:{prepare(sql){
    return {bind(){
      return {
        async first(){return sql.startsWith('SELECT')?null:{hits:1}},
        async run(){return {meta:{changes:1}}}
      };
    }};
  }}
};
function req(path,method='GET',headers={},body){
  return new Request('https://stats.example.test'+path,{method,headers,body});
}
test('public read only returns known counter, no mutation',async()=>{
  const result=await worker.fetch(req('/v1/counts/ogonek-barash'),env);
  assert.equal(result.status,200);
  assert.deepEqual(await result.json(),{ok:true,slug:'ogonek-barash',views:0,likes:0});
});
test('unknown slug is rejected',async()=>{
  const result=await worker.fetch(req('/v1/counts/unapproved-counter'),env);
  assert.equal(result.status,404);
});
test('untrusted browser origin rejected for a POST',async()=>{
  const result=await worker.fetch(req('/v1/views/ogonek-barash','POST',{
    'Origin':'https://evil.example','Content-Type':'application/json','X-Visitor':'a'.repeat(32)
  },'{}'),env);
  assert.equal(result.status,403);
});
test('cannot enable mutations without private Worker secrets',async()=>{
  const result=await worker.fetch(req('/v1/likes/ogonek-barash','POST',{
    'Origin':ORIGIN,'Content-Type':'application/json','X-Visitor':'a'.repeat(32)
  },'{}'),env);
  assert.equal(result.status,503);
});
test('preflight admits only site origin',async()=>{
  const good=await worker.fetch(req('/v1/views/ogonek-barash','OPTIONS',{'Origin':ORIGIN}),env);
  const bad=await worker.fetch(req('/v1/views/ogonek-barash','OPTIONS',{'Origin':'https://other.example'}),env);
  assert.equal(good.status,204);
  assert.equal(good.headers.get('Access-Control-Allow-Origin'),ORIGIN);
  assert.equal(bad.status,403);
});
