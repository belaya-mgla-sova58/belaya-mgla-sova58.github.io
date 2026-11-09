/* Regression checks for the site's real calculator formulas.
   Run from repository root: node tests/calculator-regression-v1.cjs
   This file is not loaded by the website. */
"use strict";
const fs=require("node:fs");
const vm=require("node:vm");
const assert=require("node:assert/strict");
const read=name=>fs.readFileSync(name,"utf8");
function section(text,start,end){
 const a=text.indexOf(start),b=text.indexOf(end,a+start.length);
 assert(a>=0&&b>a,"Missing calculation source: "+start);
 return text.slice(a,b);
}
const bear=vm.runInNewContext(
 section(read("bear-helper.html"),"const sum=","function calc()")+
 ";({partsOf,balancedMax,distribute})"
);
const {distribute}=bear;
const sum=a=>a.reduce((x,y)=>x+y,0);
const ratios=[[10,30,60],[10,20,70],[10,10,80],[5,5,90],[1,4,95],[0,0,100]];
let checks=0;
for(let i=0;i<600;i++){
 const army=[i*17%101,i*31%101,i*43%101];
 const marches=1+i%6,capacity=1+i*13%71,ratio=ratios[i%6];
 for(const policy of ["keep","fill"]){
  const output=distribute(army,marches,capacity,ratio,policy);
  assert.equal(output.rows.length,marches);
  assert(output.rows.every(row=>sum(row)<=capacity&&row.every(v=>Number.isInteger(v)&&v>=0)));
  const allocated=[0,1,2].map(j=>sum(output.rows.map(row=>row[j])));
  assert(allocated.every((count,j)=>count<=army[j]));
  assert.equal(sum(allocated),output.used);
  assert.equal(output.used+output.left,sum(army));
  checks++;
 }
}
const ordinary=vm.runInNewContext(
 section(read("furnace-calculator.html"),"const R=(m,w,c,i)","for(let n=20;n<=30;n++)")+
 ";({furnace,embassy,camp,research,req,table})"
);
for(let level=20;level<=30;level++){
 assert(ordinary.furnace[level],"Missing ordinary furnace cost "+level);
 for(const [name,required] of [[ordinary.req[level][0],ordinary.req[level][1]],[ordinary.req[level][2],ordinary.req[level][3]]]){
  assert(ordinary.table[name][required],"Missing prerequisite cost "+name+" "+required);
 }
 checks++;
}
const fire=vm.runInNewContext(
 section(read("fire-furnace-calculator.html"),"const R=(m,w,c,i,f,r=0)","const label=n=>")+
 ";({prereq,costFor})"
);
for(let stage=1;stage<=10;stage++)assert(fire.prereq[stage],"Missing fire stage "+stage);
for(let step=1;step<=50;step++){
 for(const kind of ["Огненная Топка","Посольство","Лагерь пехоты"]){
  const cost=fire.costFor(kind,step);
  assert.equal(cost.length,6);
  assert(cost.every(v=>Number.isFinite(v)&&v>=0),"Bad cost at step "+step);
  checks++;
 }
}
console.log("Калькуляторы: "+checks+" проверок пройдено.");
