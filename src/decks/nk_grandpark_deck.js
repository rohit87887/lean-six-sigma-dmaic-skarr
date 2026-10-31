const pptxgen=require("pptxgenjs");const path=require("path");
const ICON=n=>path.join(__dirname,"icons",`${n}.png`);

const DARK="1C2B26",PRIMARY="2D5F4C",SECONDARY="C9622F",ACCENT="E0A030",
LIGHT="F2F5F3",WHITE="FFFFFF",TEXT="1B2733",MUTED="5B6B79",LINE="DCE4EA",
GREEN="1B8A5A",RED="BF3B2B";
const FH="Cambria",FB="Calibri";
const pres=new pptxgen();pres.layout="LAYOUT_WIDE";
const PGW=13.33,PGH=7.5;
pres.defineSlideMaster({title:"P",background:{color:WHITE}});

function foot(s,n){
 s.addText("NK Grand Park Restaurant — Lean Six Sigma (DMAIC) Project",{x:0.5,y:PGH-0.4,w:7.5,h:0.3,fontFace:FB,fontSize:9,color:MUTED});
 s.addText(String(n),{x:PGW-1.0,y:PGH-0.4,w:0.5,h:0.3,fontFace:FB,fontSize:9,color:MUTED,align:"right"});}
function ic(s,n,x,y,d,c){
 s.addShape("ellipse",{x,y,w:d,h:d,fill:{color:c},line:{type:"none"}});
 const p=d*0.26;s.addImage({path:ICON(n),x:x+p/2,y:y+p/2,w:d-p,h:d-p});}
function head(s,k,t){
 s.addText(k.toUpperCase(),{x:0.6,y:0.38,w:10,h:0.3,fontFace:FB,fontSize:12,bold:true,color:SECONDARY,charSpacing:2});
 s.addText(t,{x:0.6,y:0.66,w:12.1,h:0.72,fontFace:FH,fontSize:29,bold:true,color:TEXT});}
function note(s,y,txt,icn,col){
 s.addShape("roundRect",{x:0.6,y,w:12.1,h:0.88,rectRadius:0.08,fill:{color:LIGHT},line:{type:"none"}});
 ic(s,icn||"bolt",0.85,y+0.17,0.55,col||SECONDARY);
 s.addText(txt,{x:1.6,y:y+0.03,w:10.95,h:0.82,fontFace:FB,fontSize:12.3,color:TEXT,valign:"middle",lineSpacing:16.5});}
function table(s,y,colX,colW,heads,rows,rh,fs){
 s.addShape("rect",{x:0.6,y,w:12.15,h:0.48,fill:{color:PRIMARY},line:{type:"none"}});
 heads.forEach((h,i)=>s.addText(h,{x:colX[i],y,w:colW[i]-0.12,h:0.48,fontFace:FB,fontSize:12,bold:true,color:WHITE,valign:"middle"}));
 let yy=y+0.48;
 rows.forEach((r,i)=>{
  if(i%2===1)s.addShape("rect",{x:0.6,y:yy,w:12.15,h:rh,fill:{color:LIGHT},line:{type:"none"}});
  r.forEach((c,j)=>s.addText(c,{x:colX[j],y:yy+0.04,w:colW[j]-0.12,h:rh-0.08,fontFace:FB,fontSize:fs||11.5,
   bold:j===0,color:j===0?TEXT:MUTED,valign:"middle",lineSpacing:14}));
  yy+=rh;});
 return yy;}

/* ===== 1 TITLE ===== */
{const s=pres.addSlide({masterName:"P"});s.background={color:DARK};
s.addShape("ellipse",{x:10.4,y:-1.9,w:5.2,h:5.2,fill:{color:PRIMARY,transparency:38},line:{type:"none"}});
s.addShape("ellipse",{x:11.7,y:5.0,w:3.4,h:3.4,fill:{color:SECONDARY,transparency:58},line:{type:"none"}});
s.addText("LEAN SIX SIGMA — DMAIC PROJECT",{x:0.9,y:1.55,w:10,h:0.4,fontFace:FB,fontSize:14,bold:true,color:ACCENT,charSpacing:3});
s.addText("Reducing Guest Waiting Time\nfrom Arrival to Food Served",{x:0.9,y:2.0,w:10.4,h:1.75,fontFace:FH,fontSize:38,bold:true,color:WHITE,lineSpacing:44});
s.addText("A process improvement study at NK Grand Park Restaurant — supported by value stream mapping, root cause analysis and discrete-event simulation",
 {x:0.9,y:3.85,w:9.6,h:0.75,fontFace:FB,fontSize:14.5,italic:true,color:"C5D2CC",lineSpacing:19});
s.addShape("line",{x:0.9,y:4.72,w:2.2,h:0,line:{color:ACCENT,width:3}});
s.addText("PRESENTED BY",{x:0.9,y:4.9,w:4,h:0.3,fontFace:FB,fontSize:11,bold:true,color:ACCENT,charSpacing:2});
[["S. Rohit","23MIA1175"],["and two project teammates",""]].forEach((m,i)=>{
 const y=5.22+i*0.4;
 s.addText(m[0],{x:0.9,y,w:3.9,h:0.35,fontFace:FB,fontSize:13.5,bold:true,color:WHITE,valign:"middle"});
 s.addText(m[1],{x:4.85,y,w:2.2,h:0.35,fontFace:FB,fontSize:13,color:"C5D2CC",valign:"middle"});});
ic(s,"utensils",11.05,5.15,1.35,PRIMARY);}

/* ===== 2 AGENDA ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Roadmap","Agenda");
const items=[["utensils","Project Context & Problem"],["clipboard","Define — Charter, SIPOC, CTQ"],
["ruler","Measure — VSM & Baseline"],["database","Measure — Measurement System Gaps"],
["search","Analyze — Fishbone & Time Breakdown"],["tachometer","Analyze — Bottleneck Identification"],
["flask","Improve — Simulation Scenarios"],["rocket","Improve — Recommended Solution"],
["shield","Control — Sustaining the Gains"],["chartline","Expected Benefits & Conclusion"]];
const cw=5.8,chh=0.92,gx=0.35,gy=0.14;
items.forEach(([i2,l],i)=>{
 const c=i%2,r=Math.floor(i/2),x=0.6+c*(cw+gx),y=1.5+r*(chh+gy);
 s.addShape("roundRect",{x,y,w:cw,h:chh,rectRadius:0.07,fill:{color:LIGHT},line:{type:"none"}});
 ic(s,i2,x+0.2,y+(chh-0.58)/2,0.58,i%2===0?PRIMARY:SECONDARY);
 s.addText(`${i+1}.  ${l}`,{x:x+0.95,y,w:cw-1.15,h:chh,fontFace:FB,fontSize:13.5,bold:true,color:TEXT,valign:"middle"});});
foot(s,2);}

/* ===== 3 CONTEXT ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Background","Project Context");
s.addShape("roundRect",{x:0.6,y:1.5,w:5.9,h:4.0,rectRadius:0.08,fill:{color:PRIMARY},line:{type:"none"}});
ic(s,"utensils",0.95,1.82,0.78,WHITE);
s.addText("NK Grand Park Restaurant",{x:1.9,y:1.82,w:4.3,h:0.78,fontFace:FH,fontSize:18,bold:true,color:WHITE,valign:"middle"});
s.addText("A full-service dine-in restaurant where guests are seated, order at the table, and settle the bill before the table is released.",
 {x:1.0,y:2.8,w:5.1,h:0.95,fontFace:FB,fontSize:13,color:"DCE8E3",lineSpacing:18});
s.addShape("line",{x:1.0,y:3.85,w:4.9,h:0,line:{color:"5A8A77",width:1}});
s.addText("Service flow under study",{x:1.0,y:3.98,w:4.9,h:0.3,fontFace:FB,fontSize:12,bold:true,color:WHITE});
s.addText(["Guest arrival and seating","Order taking at the table","Kitchen preparation","Serving, dining and billing"]
 .map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true}})),
 {x:1.0,y:4.3,w:4.9,h:1.1,fontFace:FB,fontSize:12.5,color:"DCE8E3",lineSpacingMultiple:1.3});

s.addText("The problem as reported",{x:6.85,y:1.55,w:5.9,h:0.4,fontFace:FH,fontSize:16,bold:true,color:TEXT});
const pts=[["clock","Long wait from arrival to food served","On a busy day guests wait 20–25 minutes before food reaches the table, as stated by the director."],
["chair","Tables stay occupied longer","A table is held until the bill is paid, so kitchen delays stretch the wait for the next guest as well."],
["exclamation","No measured evidence","Timings are self-reported averages; there are no order-level records to confirm where the time is lost."]];
let py=2.05;
pts.forEach(([i2,h,d])=>{
 ic(s,i2,6.85,py,0.55,SECONDARY);
 s.addText(h,{x:7.6,y:py-0.02,w:5.1,h:0.3,fontFace:FB,fontSize:13.5,bold:true,color:TEXT});
 s.addText(d,{x:7.6,y:py+0.28,w:5.15,h:0.78,fontFace:FB,fontSize:11.8,color:MUTED,lineSpacing:15.5});
 py+=1.32;});
note(s,5.75,"A full guest visit takes about 57 minutes end to end. The 20–25 minute arrival-to-food segment is the part guests judge most harshly, and the part this project targets.","clock",PRIMARY);
foot(s,3);}

/* ===== 4 DEFINE CHARTER ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Define Phase","Project Charter");
const boxes=[
 ["exclamation","Problem Statement",RED,"On busy days, guests at NK Grand Park wait 20–25 minutes from arrival to food served, against an acceptable target of 20 minutes. Simulation of the current process puts the average at 21.6 minutes, with 46.6% of parties exceeding 20 minutes."],
 ["bullseye","Goal Statement",PRIMARY,"Reduce the average arrival-to-food-served time from 21.6 to under 17 minutes, and cut the share of parties waiting more than 20 minutes from 46.6% to below 25%, without hiring additional staff."],
 ["sitemap","Scope",SECONDARY,"IN: guest arrival → seating → order taking → kitchen preparation → food served.\nOUT: menu design, pricing, procurement contracts, dining duration and payment method."],
 ["chartline","Business Case",ACCENT,"Shorter waits improve guest satisfaction and table turnover. Faster table release lets the same seating capacity serve more covers on peak days at no extra staffing cost."]];
const bw=5.9,bh=2.45,gx=0.33,gy=0.25;
boxes.forEach(([i2,t,c,d],i)=>{
 const col=i%2,row=Math.floor(i/2),x=0.6+col*(bw+gx),y=1.5+row*(bh+gy);
 s.addShape("roundRect",{x,y,w:bw,h:bh,rectRadius:0.08,fill:{color:WHITE},line:{color:LINE,width:1}});
 ic(s,i2,x+0.25,y+0.25,0.6,c);
 s.addText(t,{x:x+0.98,y:y+0.25,w:bw-1.2,h:0.6,fontFace:FH,fontSize:16,bold:true,color:c,valign:"middle"});
 s.addText(d,{x:x+0.3,y:y+0.95,w:bw-0.6,h:1.35,fontFace:FB,fontSize:11.8,color:TEXT,lineSpacing:16});});
foot(s,4);}

/* ===== 5 SIPOC ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Define Phase","SIPOC — Scoping the Process");
const cols=[["Suppliers",["Food suppliers","Beverage vendors","Equipment maintenance","Restaurant management"],PRIMARY],
["Inputs",["Raw ingredients","Menu and recipes","2 order takers","4 kitchen staff","2 servers","Tables and seating"],SECONDARY],
["Process",["Guest arrives","Guest seated","Order taken","Order sent to kitchen","Food prepared","Food served"],DARK],
["Outputs",["Prepared meal","Order accuracy","Service time per party","Guest experience"],SECONDARY],
["Customers",["Dine-in guests","Walk-in parties","Group / event bookings","Restaurant owner"],PRIMARY]];
const cw=2.33,gap=0.2,total=5*cw+4*gap,sx=(PGW-total)/2,y0=1.55,hh=0.55,bh=3.7;
cols.forEach(([t,items,c],i)=>{
 const x=sx+i*(cw+gap);
 s.addShape("roundRect",{x,y:y0,w:cw,h:hh,rectRadius:0.06,fill:{color:c},line:{type:"none"}});
 s.addText(t,{x,y:y0,w:cw,h:hh,fontFace:FB,fontSize:14,bold:true,color:WHITE,align:"center",valign:"middle"});
 s.addShape("roundRect",{x,y:y0+hh+0.08,w:cw,h:bh,rectRadius:0.06,fill:{color:LIGHT},line:{type:"none"}});
 s.addText(items.map(t2=>({text:t2,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:6}})),
  {x:x+0.18,y:y0+hh+0.2,w:cw-0.36,h:bh-0.3,fontFace:FB,fontSize:10.8,color:TEXT,lineSpacing:13.5,valign:"top"});
 if(i<4)s.addText("→",{x:x+cw,y:y0+hh+bh/2-0.2,w:gap,h:0.5,fontFace:FB,fontSize:16,bold:true,color:MUTED,align:"center",valign:"middle"});});
note(s,6.05,"The process boundary runs from guest arrival to food served. Dining time and billing sit outside the measured window, but are tracked because they decide when a table is released.","sitemap",PRIMARY);
foot(s,5);}

/* ===== 6 VOC CTQ ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Define Phase","Voice of Customer → Critical to Quality");
const rows=[["“We waited too long for our food.”","Speed of service","Time from arrival to food served","≤ 20 minutes on a busy day"],
["“We had to stand and wait for a table.”","Table availability","Wait for a free table","≤ 2 minutes average"],
["“Other tables got served before us.”","Fairness of sequence","Orders served in sequence received","No order overtaken without reason"],
["“The food was worth the wait.”","Food quality maintained","Rework / complaint rate","No increase versus baseline"]];
const colX=[0.65,4.3,6.9,10.1],colW=[3.65,2.6,3.2,2.75];
s.addShape("rect",{x:0.6,y:1.55,w:12.15,h:0.5,fill:{color:PRIMARY},line:{type:"none"}});
["Voice of the Guest","Key Issue","CTQ Measure","Target / Specification"].forEach((h,i)=>
 s.addText(h,{x:colX[i],y:1.55,w:colW[i]-0.12,h:0.5,fontFace:FB,fontSize:12,bold:true,color:WHITE,valign:"middle"}));
let yy=2.05;
rows.forEach((r,i)=>{const rh=1.0;
 if(i%2===1)s.addShape("rect",{x:0.6,y:yy,w:12.15,h:rh,fill:{color:LIGHT},line:{type:"none"}});
 s.addText(r[0],{x:colX[0],y:yy,w:colW[0]-0.12,h:rh,fontFace:FB,fontSize:11.8,italic:true,color:TEXT,valign:"middle",lineSpacing:15});
 s.addText(r[1],{x:colX[1],y:yy,w:colW[1]-0.12,h:rh,fontFace:FB,fontSize:11.8,bold:true,color:SECONDARY,valign:"middle",lineSpacing:15});
 s.addText(r[2],{x:colX[2],y:yy,w:colW[2]-0.12,h:rh,fontFace:FB,fontSize:11.8,color:TEXT,valign:"middle",lineSpacing:15});
 s.addText(r[3],{x:colX[3],y:yy,w:colW[3]-0.12,h:rh,fontFace:FB,fontSize:11.8,bold:true,color:PRIMARY,valign:"middle",lineSpacing:15});
 yy+=rh;});
note(s,yy+0.22,"The primary CTQ for this project is arrival-to-food-served time, with a 20 minute specification limit. Every later measurement, analysis and control step is built around it.","bullseye",SECONDARY);
foot(s,6);}

/* ===== 7 DATA COLLECTION PLAN ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Measure Phase","Data Collection Plan");
const colX=[0.65,3.7,6.5,9.0,11.0],colW=[3.05,2.8,2.5,2.0,1.75];
const rows=[["Arrival → food served","Continuous (min)","Timestamp card per party","Host + server","Every party, peak hours"],
["Wait for a free table","Continuous (min)","Arrival vs seating stamp","Host","Every party"],
["Order → kitchen start","Continuous (min)","KOT time stamp","Kitchen lead","Every order"],
["Kitchen preparation","Continuous (min)","KOT start vs ready","Kitchen lead","Every order"],
["Parties over 20 minutes","Attribute (yes / no)","Derived from total time","Analyst","Daily summary"]];
const end=table(s,1.55,colX,colW,["What is measured","Data type","How it is captured","Who records","When"],rows,0.82,11.3);
s.addText("Sampling approach",{x:0.6,y:end+0.25,w:6,h:0.35,fontFace:FH,fontSize:15,bold:true,color:TEXT});
const samp=[["calendar","Minimum 2 weeks covering both weekday and weekend service"],
["clock","Peak windows (lunch and dinner) recorded in full, not sampled"],
["ruler","Target of 100+ timed parties to give a stable baseline distribution"]];
samp.forEach(([i2,t],i)=>{const x=0.6+i*4.07,y=end+0.68;
 s.addShape("roundRect",{x,y,w:3.9,h:0.78,rectRadius:0.06,fill:{color:LIGHT},line:{type:"none"}});
 ic(s,i2,x+0.15,y+0.14,0.5,PRIMARY);
 s.addText(t,{x:x+0.78,y,w:3.0,h:0.78,fontFace:FB,fontSize:10.8,color:TEXT,valign:"middle",lineSpacing:13.5});});
foot(s,7);}

/* ===== 8 VSM ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Measure Phase","Current State Value Stream Map");
const stages=[["Guest\narrives","—","0.0",PRIMARY],["Seating","3.1","wait",SECONDARY],["Order\ntaking","19%","util",PRIMARY],
["Kitchen","66%","util",RED],["Serving","25%","util",PRIMARY],["Food\nserved","21.6","total",ACCENT]];
const bw=1.82,gap=0.26,total=6*bw+5*gap,sx=(PGW-total)/2,y0=1.6,bh=1.35;
stages.forEach(([n,v,l,c],i)=>{const x=sx+i*(bw+gap);
 s.addShape("roundRect",{x,y:y0,w:bw,h:bh,rectRadius:0.07,fill:{color:c},line:{type:"none"}});
 s.addText(n,{x:x+0.06,y:y0+0.14,w:bw-0.12,h:0.62,fontFace:FB,fontSize:12.5,bold:true,color:c===ACCENT?DARK:WHITE,align:"center",valign:"middle"});
 s.addText(l==="util"?`${v} utilised`:(l==="wait"?`${v} min wait`:(l==="total"?`${v} min total`:"start")),
  {x:x+0.05,y:y0+0.82,w:bw-0.1,h:0.42,fontFace:FB,fontSize:10,color:c===ACCENT?"4A3A12":"EEF3F1",align:"center",lineSpacing:12.5});
 if(i<5)s.addText("→",{x:x+bw,y:y0+bh/2-0.28,w:gap,h:0.56,fontFace:FB,fontSize:19,bold:true,color:MUTED,align:"center",valign:"middle"});});

s.addText("Timeline ladder — where the 21.6 minutes sit",{x:0.6,y:3.25,w:8,h:0.35,fontFace:FB,fontSize:13,bold:true,color:TEXT});
const barY=3.7,barH=0.62,barX=0.6,barW=12.15;
const procW=barW*(15.7/21.6),waitW=barW*(6.0/21.6);
s.addShape("rect",{x:barX,y:barY,w:procW,h:barH,fill:{color:PRIMARY},line:{type:"none"}});
s.addShape("rect",{x:barX+procW,y:barY,w:waitW,h:barH,fill:{color:SECONDARY},line:{type:"none"}});
s.addText("Process time  15.7 min  (72%)",{x:barX,y:barY,w:procW,h:barH,fontFace:FB,fontSize:12.5,bold:true,color:WHITE,align:"center",valign:"middle"});
s.addText("Waiting  6.0 min  (28%)",{x:barX+procW,y:barY,w:waitW,h:barH,fontFace:FB,fontSize:11.5,bold:true,color:WHITE,align:"center",valign:"middle"});
s.addText("Value-adding work",{x:barX,y:barY+barH+0.06,w:procW,h:0.28,fontFace:FB,fontSize:10,italic:true,color:MUTED,align:"center"});
s.addText("Non-value-adding delay",{x:barX+procW,y:barY+barH+0.06,w:waitW,h:0.28,fontFace:FB,fontSize:10,italic:true,color:SECONDARY,align:"center"});

const stats=[["21.6 min","Lead time, arrival to food served",PRIMARY],["6.0 min","Total waiting inside that lead time",SECONDARY],
["66%","Kitchen utilisation — the busiest stage",RED],["57 min","Full guest visit, arrival to bill paid",ACCENT]];
const sw=2.93,sg=0.22;
stats.forEach(([v,l,c],i)=>{const x=0.6+i*(sw+sg),y=4.85;
 s.addShape("roundRect",{x,y,w:sw,h:1.3,rectRadius:0.08,fill:{color:LIGHT},line:{type:"none"}});
 s.addText(v,{x:x+0.12,y:y+0.14,w:sw-0.24,h:0.52,fontFace:FH,fontSize:24,bold:true,color:c,align:"center"});
 s.addText(l,{x:x+0.18,y:y+0.68,w:sw-0.36,h:0.52,fontFace:FB,fontSize:10.5,color:MUTED,align:"center",lineSpacing:13});});
s.addText("Staffing at baseline: 2 order takers, 4 kitchen staff, 2 servers, as stated by the director.",
 {x:0.6,y:6.3,w:12.1,h:0.35,fontFace:FB,fontSize:11.5,italic:true,color:MUTED,align:"center"});
foot(s,8);}

/* ===== 9 BASELINE ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Measure Phase","Baseline Performance & Process Capability");
s.addText("The 20 minute CTQ gives a clear defect definition: any party served later than 20 minutes after arrival.",
 {x:0.6,y:1.45,w:12.1,h:0.35,fontFace:FB,fontSize:12.5,italic:true,color:MUTED});
const colX=[0.65,5.2,8.4,10.9],colW=[4.55,3.2,2.5,1.85];
const rows=[["Average arrival → served","Mean of simulated parties","21.6 ± 1.8 min","Above target"],
["Parties exceeding 20 min","Defect rate against CTQ","46.6%","Defect"],
["DPMO","Defects per million opportunities","466,000","—"],
["Process sigma (short term)","Converted from DPMO","≈ 1.59 σ","Low"],
["Average wait for a table","Longest single delay","3.1 min","Improve"],
["Process cycle efficiency","Process time ÷ lead time","72.7%","Baseline"]];
const end=table(s,1.9,colX,colW,["Metric","Definition","Baseline Value","Status"],rows,0.6,11.5);
s.addShape("roundRect",{x:0.6,y:end+0.3,w:5.9,h:1.5,rectRadius:0.08,fill:{color:PRIMARY},line:{type:"none"}});
s.addText("Reading the baseline",{x:0.95,y:end+0.45,w:5.2,h:0.3,fontFace:FB,fontSize:13,bold:true,color:WHITE});
s.addText("Nearly half of all parties miss the 20 minute promise. At 1.59 sigma the process is far below the 3 sigma level normally considered minimally acceptable.",
 {x:0.95,y:end+0.78,w:5.2,h:0.9,fontFace:FB,fontSize:11.5,color:"DCE8E3",lineSpacing:15});
s.addShape("roundRect",{x:6.83,y:end+0.3,w:5.9,h:1.5,rectRadius:0.08,fill:{color:LIGHT},line:{type:"none"}});
s.addText("Two data types in play",{x:7.18,y:end+0.45,w:5.2,h:0.3,fontFace:FB,fontSize:13,bold:true,color:SECONDARY});
s.addText([{text:"Continuous — ",options:{bold:true,color:TEXT}},{text:"the time in minutes, monitored with X-bar / R charts.\n",options:{color:MUTED,breakLine:true}},
{text:"Attribute — ",options:{bold:true,color:TEXT}},{text:"whether a party breached 20 minutes, monitored with a p-chart.",options:{color:MUTED}}],
 {x:7.18,y:end+0.78,w:5.2,h:0.9,fontFace:FB,fontSize:11.5,lineSpacing:15});
foot(s,9);}

/* ===== 10 MSA GAPS ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Measure Phase","Measurement System Gaps — Fix Before Analysing");
s.addText("The fishbone flagged four measurement problems. Until these are closed, any improvement in the numbers could be a recording artefact rather than a real gain.",
 {x:0.6,y:1.45,w:12.1,h:0.4,fontFace:FB,fontSize:12.5,italic:true,color:MUTED});
const gaps=[["database","No order-level time records","Timings exist only as remembered averages, so variation cannot be seen at all.","Introduce a timestamp card or POS time capture per party."],
["balance","Averages are self-reported","Figures come from recollection, which tends to smooth out the worst cases.","Record actual clock times at each handover point."],
["bullseye","The 20 minute threshold is not agreed","Staff and management do not share one definition of an acceptable wait.","Confirm 20 minutes as the CTQ limit with the director in writing."],
["stopwatch","Order-taking start point is unclear","It is not defined whether timing starts at arrival, seating or order placement.","Write an operational definition: the clock starts at guest arrival."]];
const cw=5.9,chh=1.95,gx=0.33,gy=0.22;
gaps.forEach(([i2,t,p,f],i)=>{
 const col=i%2,row=Math.floor(i/2),x=0.6+col*(cw+gx),y=2.0+row*(chh+gy);
 s.addShape("roundRect",{x,y,w:cw,h:chh,rectRadius:0.08,fill:{color:WHITE},line:{color:LINE,width:1}});
 ic(s,i2,x+0.22,y+0.22,0.55,RED);
 s.addText(t,{x:x+0.92,y:y+0.22,w:cw-1.1,h:0.55,fontFace:FB,fontSize:13,bold:true,color:TEXT,valign:"middle"});
 s.addText(p,{x:x+0.25,y:y+0.82,w:cw-0.5,h:0.5,fontFace:FB,fontSize:10.8,color:MUTED,lineSpacing:13.5});
 s.addText([{text:"Fix:  ",options:{bold:true,color:GREEN}},{text:f,options:{color:TEXT}}],
  {x:x+0.25,y:y+1.34,w:cw-0.5,h:0.5,fontFace:FB,fontSize:10.8,lineSpacing:13.5});});
note(s,6.45,"This is the attribute-data equivalent of a gauge study: agree the definition, record at source, then re-baseline before claiming any improvement.","shield",PRIMARY);
foot(s,10);}

/* ===== 11 FISHBONE ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Analyze Phase","Cause and Effect — Fishbone Analysis");
const spineY=3.95,spineX0=0.75,spineX1=10.35;
s.addShape("line",{x:spineX0,y:spineY,w:spineX1-spineX0,h:0,line:{color:DARK,width:2.5}});
s.addShape("roundRect",{x:10.45,y:3.2,w:2.35,h:1.5,rectRadius:0.08,fill:{color:DARK},line:{type:"none"}});
s.addText("Long time from guest arrival to food served",{x:10.55,y:3.3,w:2.15,h:0.74,fontFace:FB,fontSize:11,bold:true,color:WHITE,align:"center",valign:"middle",lineSpacing:13.5});
s.addText("busy day 20\u201325 min\n(reported by director)",{x:10.55,y:4.04,w:2.15,h:0.54,fontFace:FB,fontSize:8.8,italic:true,color:"B9C7C1",align:"center",lineSpacing:10.5});
const top=[["Manpower",PRIMARY,["Too few staff at peak (D)","Staff split across stages (S)","Training and skill levels (?)","Staff behaviour (D)"]],
["Process / Method",SECONDARY,["Order passed late to kitchen (?)","No order-priority rule (?)","Waiting for a free table (S)","Table freed only after billing (S)"]],
["Kitchen",RED,["Kitchen queue builds at peak (S)","4 kitchen staff for all orders (S)","Long prep of complex dishes (?)","Equipment / stock availability (?)"]]];
const bot=[["Capacity / Layout",PRIMARY,["Limited number of tables (S)","Long dining time holds tables (S)","Single cashier at billing (S)","Distance kitchen to tables (?)"]],
["Demand",SECONDARY,["Weekend / busy-day surge (D)","Parties arriving together (S)","Uneven arrivals over the day (S)","Special events / bookings (?)"]],
["Measurement",ACCENT,["No order-level time records (D)","Averages are self-reported (D)","20-min threshold not agreed (?)","Start point unclear (?)"]]];
top.forEach(([t,c,causes],i)=>{
 const cx=2.95+i*2.90;
 s.addShape("line",{x:cx,y:1.80,w:0.5,h:spineY-1.80,line:{color:c,width:2},flipH:true});
 s.addShape("roundRect",{x:cx-0.80,y:1.44,w:2.1,h:0.34,rectRadius:0.05,fill:{color:c},line:{type:"none"}});
 s.addText(t,{x:cx-0.80,y:1.44,w:2.1,h:0.34,fontFace:FB,fontSize:10.5,bold:true,color:c===ACCENT?DARK:WHITE,align:"center",valign:"middle"});
 s.addText(causes.map(t2=>({text:t2,options:{breakLine:true,paraSpaceAfter:3}})),
  {x:cx-2.30,y:1.92,w:2.25,h:1.9,fontFace:FB,fontSize:8.6,color:MUTED,align:"right",valign:"middle",lineSpacing:11});});
bot.forEach(([t,c,causes],i)=>{
 const cx=2.50+i*2.90;
 s.addShape("line",{x:cx,y:spineY,w:0.5,h:6.28-spineY,line:{color:c,width:2}});
 s.addShape("roundRect",{x:cx-0.55,y:6.28,w:2.1,h:0.34,rectRadius:0.05,fill:{color:c},line:{type:"none"}});
 s.addText(t,{x:cx-0.55,y:6.28,w:2.1,h:0.34,fontFace:FB,fontSize:10.5,bold:true,color:c===ACCENT?DARK:WHITE,align:"center",valign:"middle"});
 s.addText(causes.map(t2=>({text:t2,options:{breakLine:true,paraSpaceAfter:3}})),
  {x:cx+0.60,y:4.80,w:2.3,h:1.4,fontFace:FB,fontSize:8.6,color:MUTED,align:"left",valign:"middle",lineSpacing:11});});
s.addText([{text:"D",options:{bold:true,color:RED}},{text:" = stated by the director    ",options:{color:MUTED}},
{text:"S",options:{bold:true,color:PRIMARY}},{text:" = represented in the simulation (inputs are placeholders)    ",options:{color:MUTED}},
{text:"?",options:{bold:true,color:SECONDARY}},{text:" = needs data or confirmation.  These are hypotheses to test, not established root causes.",options:{color:MUTED}}],
 {x:0.6,y:6.74,w:12.1,h:0.28,fontFace:FB,fontSize:9.5});
foot(s,11);}

/* ===== 12 WHERE THE TIME GOES ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Analyze Phase","Where the Waiting Time Goes");
s.addText("Of the 21.6 minute lead time, 6.0 minutes are pure waiting. Almost all of it comes from just two places.",
 {x:0.6,y:1.45,w:12.1,h:0.35,fontFace:FB,fontSize:12.5,italic:true,color:MUTED});
const cats=["Wait for a free table","Kitchen queue","All other waiting"];
const vals=[3.1,2.8,0.1];
const cum=[51.7,98.3,100.0];
s.addChart([
 {type:pres.ChartType.bar,data:[{name:"Minutes",labels:cats,values:vals}],
  options:{chartColors:[SECONDARY],barGapWidthPct:55,showValue:true,dataLabelColor:WHITE,dataLabelFontSize:11,dataLabelPosition:"ctr",dataLabelFormatCode:"0.0"}},
 {type:pres.ChartType.line,data:[{name:"Cumulative %",labels:cats,values:cum}],
  options:{chartColors:[PRIMARY],secondaryValAxis:true,secondaryCatAxis:true,lineSize:2.5,lineDataSymbolSize:7}}
],{x:0.6,y:1.95,w:7.9,h:4.15,showLegend:false,showTitle:false,
 valAxes:[{valAxisTitle:"Minutes of waiting",showValAxisTitle:true,valAxisTitleColor:MUTED,valAxisTitleFontSize:10,
  valAxisLabelColor:MUTED,valAxisLabelFontSize:10,valGridLine:{color:LINE,size:1}},
  {valAxisTitle:"Cumulative %",showValAxisTitle:true,valAxisTitleColor:PRIMARY,valAxisTitleFontSize:10,
   valAxisMaxVal:100,valAxisMinVal:0,valAxisMajorUnit:20,valAxisLabelColor:PRIMARY,valAxisLabelFontSize:10,valGridLine:{style:"none"}}],
 catAxes:[{catAxisLabelColor:TEXT,catAxisLabelFontSize:10.5,catGridLine:{style:"none"}},{catAxisHidden:true}]});
s.addShape("roundRect",{x:8.75,y:1.95,w:3.98,h:4.15,rectRadius:0.09,fill:{color:LIGHT},line:{type:"none"}});
s.addText("What this tells us",{x:9.0,y:2.15,w:3.5,h:0.35,fontFace:FH,fontSize:14.5,bold:true,color:PRIMARY});
s.addText([{text:"Two causes, 98% of the delay\n",options:{bold:true,fontSize:11,color:SECONDARY,breakLine:true}},
{text:"Table wait (3.1 min) and kitchen queue (2.8 min) together make up 5.9 of the 6.0 waiting minutes.\n\n",options:{fontSize:10.4,color:TEXT,breakLine:true}},
{text:"They are linked\n",options:{bold:true,fontSize:11,color:SECONDARY,breakLine:true}},
{text:"A table is only released after billing, so a slow kitchen keeps tables occupied and lengthens the queue at the door.\n\n",options:{fontSize:10.4,color:TEXT,breakLine:true}},
{text:"Where to act\n",options:{bold:true,fontSize:11,color:SECONDARY,breakLine:true}},
{text:"Speeding up the kitchen attacks both numbers at once, which is why it carries most of the improvement.",options:{fontSize:10.4,color:TEXT}}],
 {x:9.0,y:2.56,w:3.55,h:3.45,fontFace:FB,lineSpacing:13.2,valign:"top"});
foot(s,12);}

/* ===== 13 BOTTLENECK ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Analyze Phase","Bottleneck Identification — Stage Utilisation");
s.addText("Staff are not evenly loaded. The kitchen runs more than three times as hot as order taking.",
 {x:0.6,y:1.45,w:12.1,h:0.35,fontFace:FB,fontSize:12.5,italic:true,color:MUTED});
s.addChart(pres.ChartType.bar,[{name:"Utilisation %",labels:["Kitchen\n(4 staff)","Serving\n(2 staff)","Order taking\n(2 staff)"],values:[66,25,19]}],
 {x:0.6,y:1.95,w:7.9,h:3.9,barDir:"bar",chartColors:[RED,PRIMARY,PRIMARY],varyColors:true,barGapWidthPct:50,
  valAxisMaxVal:100,valAxisMinVal:0,valAxisMajorUnit:20,valAxisTitle:"Utilisation (%)",showValAxisTitle:true,
  valAxisTitleColor:MUTED,valAxisTitleFontSize:10,valAxisLabelColor:MUTED,valAxisLabelFontSize:10,
  catAxisLabelColor:TEXT,catAxisLabelFontSize:11,catGridLine:{style:"none"},valGridLine:{color:LINE,size:1},
  showLegend:false,showTitle:false,showValue:true,dataLabelColor:WHITE,dataLabelFontSize:11,dataLabelPosition:"inEnd"});
const ins=[["fire","The kitchen is the constraint","At 66% utilisation with peak surges, the kitchen queue forms first and everything downstream waits behind it.",RED],
["users","Order taking is under-used","At 19%, two order takers are idle most of the service. That spare capacity is the cheapest lever available.",PRIMARY],
["balance","The fix is rebalancing, not hiring","Moving capacity from the idle stage to the constrained stage improves flow at zero additional staffing cost.",SECONDARY]];
ins.forEach(([i2,t,d,c],i)=>{const x=8.75,y=1.95+i*1.34;
 s.addShape("roundRect",{x,y,w:3.98,h:1.2,rectRadius:0.07,fill:{color:LIGHT},line:{type:"none"}});
 ic(s,i2,x+0.18,y+0.16,0.5,c);
 s.addText(t,{x:x+0.78,y:y+0.14,w:3.05,h:0.32,fontFace:FB,fontSize:11.8,bold:true,color:TEXT,valign:"middle"});
 s.addText(d,{x:x+0.2,y:y+0.52,w:3.6,h:0.6,fontFace:FB,fontSize:10,color:MUTED,lineSpacing:12.5});});
note(s,6.05,"Theory of constraints: improving a non-bottleneck stage adds nothing to overall throughput. Every improvement idea was therefore tested against the kitchen first.","tachometer",PRIMARY);
foot(s,13);}

/* ===== 14 HYPOTHESES ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Analyze Phase","Root Cause Hypotheses to Test");
const colX=[0.65,1.35,5.4,8.3],colW=[0.7,4.05,2.9,4.45];
const rows=[["1","Kitchen capacity is insufficient at peak","High","Compare kitchen queue length against arrival rate by hour"],
["2","Order takers are idle while the kitchen is saturated","High","Stage utilisation study — already evidenced at 19% vs 66%"],
["3","Tables held until billing inflate the door queue","High","Measure billing-to-table-release time per party"],
["4","No order-priority rule causes uneven sequencing","Medium","Track order received vs order served sequence"],
["5","Complex dishes disproportionately slow the line","Medium","Time preparation by dish category"],
["6","Arrival surges are predictable, not random","Medium","Plot arrivals by hour and day of week"]];
s.addShape("rect",{x:0.6,y:1.55,w:12.15,h:0.5,fill:{color:PRIMARY},line:{type:"none"}});
["#","Hypothesis","Priority","How it will be tested"].forEach((h,i)=>
 s.addText(h,{x:colX[i],y:1.55,w:colW[i]-0.12,h:0.5,fontFace:FB,fontSize:12,bold:true,color:WHITE,valign:"middle"}));
let yy=2.05;
rows.forEach((r,i)=>{const rh=0.72;
 if(i%2===1)s.addShape("rect",{x:0.6,y:yy,w:12.15,h:rh,fill:{color:LIGHT},line:{type:"none"}});
 s.addShape("ellipse",{x:colX[0],y:yy+0.19,w:0.34,h:0.34,fill:{color:i<3?SECONDARY:MUTED},line:{type:"none"}});
 s.addText(r[0],{x:colX[0],y:yy+0.19,w:0.34,h:0.34,fontFace:FB,fontSize:11,bold:true,color:WHITE,align:"center",valign:"middle"});
 s.addText(r[1],{x:colX[1],y:yy,w:colW[1]-0.12,h:rh,fontFace:FB,fontSize:11.8,bold:true,color:TEXT,valign:"middle",lineSpacing:14});
 s.addText(r[2],{x:colX[2],y:yy,w:colW[2]-0.12,h:rh,fontFace:FB,fontSize:11.5,bold:true,color:r[2]==="High"?RED:MUTED,valign:"middle"});
 s.addText(r[3],{x:colX[3],y:yy,w:colW[3]-0.12,h:rh,fontFace:FB,fontSize:11.3,color:MUTED,valign:"middle",lineSpacing:14});
 yy+=rh;});
note(s,yy+0.22,"Hypotheses 1 to 3 are already supported by the utilisation data and the value stream map, and are the ones carried into the simulation.","search",SECONDARY);
foot(s,14);}

/* ===== 15 SCENARIOS ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Improve Phase","Scenarios Tested by Simulation");
s.addText("A discrete-event model of the service flow was built and four staffing and speed configurations were run against it.",
 {x:0.6,y:1.45,w:12.1,h:0.35,fontFace:FB,fontSize:12.5,italic:true,color:MUTED});
const sc=[["S0","Baseline","Current state: 2 order takers, 4 kitchen staff, 2 servers.","Reference point for every comparison.",MUTED],
["S1","Rebalance staff","Move one order taker to the kitchen, giving 1 / 5 / 2.","Tests whether idle capacity helps the constraint.",PRIMARY],
["S2","Faster kitchen","Keep staffing, cut kitchen preparation time by 15%.","Tests prep-ahead, priority rules and equipment fixes.",SECONDARY],
["S3","Both combined","Rebalance staffing and speed the kitchen by 15%.","Tests whether the two levers reinforce each other.",ACCENT]];
const cw=2.95,gx=0.21;
sc.forEach(([tag,t,d,why,c],i)=>{const x=0.6+i*(cw+gx),y=1.95,chh=3.3;
 s.addShape("roundRect",{x,y,w:cw,h:chh,rectRadius:0.08,fill:{color:WHITE},line:{color:c==MUTED?LINE:c,width:c==MUTED?1:1.6}});
 s.addShape("roundRect",{x:x+0.22,y:y+0.22,w:cw-0.44,h:0.42,rectRadius:0.05,fill:{color:c},line:{type:"none"}});
 s.addText(tag,{x:x+0.22,y:y+0.22,w:cw-0.44,h:0.42,fontFace:FB,fontSize:13,bold:true,color:c===ACCENT?DARK:WHITE,align:"center",valign:"middle"});
 s.addText(t,{x:x+0.15,y:y+0.78,w:cw-0.3,h:0.38,fontFace:FH,fontSize:15,bold:true,color:TEXT,align:"center"});
 s.addText(d,{x:x+0.22,y:y+1.22,w:cw-0.44,h:1.0,fontFace:FB,fontSize:10.8,color:TEXT,align:"center",lineSpacing:14});
 s.addText(why,{x:x+0.22,y:y+2.3,w:cw-0.44,h:0.85,fontFace:FB,fontSize:10,italic:true,color:MUTED,align:"center",lineSpacing:13});});
note(s,5.55,"No scenario adds headcount. S1 redeploys existing staff and S2 assumes process improvements inside the kitchen rather than extra people.","flask",PRIMARY);
foot(s,15);}

/* ===== 16 RESULTS ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Improve Phase","Simulation Results");
const colX=[0.65,4.9,7.6,10.3],colW=[4.25,2.7,2.7,2.45];
const rows=[["S0  Baseline (2 / 4 / 2 staff)","21.6 ± 1.8","46.6%","3.1"],
["S1  Move 1 order taker to kitchen","18.6 ± 1.0","33.8%","1.9"],
["S2  Kitchen 15% faster","16.8 ± 1.0","25.1%","1.5"],
["S3  Both changes combined","16.1 ± 0.7","20.7%","1.2"]];
s.addShape("rect",{x:0.6,y:1.55,w:12.15,h:0.5,fill:{color:PRIMARY},line:{type:"none"}});
["Scenario","Arrival to served (min)","Parties over 20 min","Wait for a table (min)"].forEach((h,i)=>
 s.addText(h,{x:colX[i],y:1.55,w:colW[i]-0.12,h:0.5,fontFace:FB,fontSize:12,bold:true,color:WHITE,valign:"middle"}));
let yy=2.05;
rows.forEach((r,i)=>{const rh=0.62,best=i===3;
 s.addShape("rect",{x:0.6,y:yy,w:12.15,h:rh,fill:{color:best?"EAF2EE":(i%2===1?LIGHT:WHITE)},line:{type:"none"}});
 s.addText(r[0],{x:colX[0],y:yy,w:colW[0]-0.12,h:rh,fontFace:FB,fontSize:12,bold:true,color:best?PRIMARY:TEXT,valign:"middle"});
 for(let j=1;j<4;j++)s.addText(r[j],{x:colX[j],y:yy,w:colW[j]-0.12,h:rh,fontFace:FB,fontSize:12,
  bold:best,color:best?PRIMARY:MUTED,valign:"middle"});
 yy+=rh;});
s.addText("Improvement from baseline to S3",{x:0.6,y:yy+0.28,w:8,h:0.35,fontFace:FH,fontSize:15,bold:true,color:TEXT});
const deltas=[["− 5.5 min","Average time to food served","21.6 → 16.1 minutes  (−25%)",PRIMARY],
["− 25.9 pts","Parties breaching 20 minutes","46.6% → 20.7%  (−56% relative)",SECONDARY],
["− 1.9 min","Wait for a free table","3.1 → 1.2 minutes  (−61%)",ACCENT],
["1.59 → 2.32","Process sigma level","Still short of 3σ, but a large step",GREEN]];
const dw=2.93,dg=0.22;
deltas.forEach(([v,l,sub,c],i)=>{const x=0.6+i*(dw+dg),y=yy+0.7;
 s.addShape("roundRect",{x,y,w:dw,h:1.42,rectRadius:0.08,fill:{color:LIGHT},line:{type:"none"}});
 s.addText(v,{x:x+0.1,y:y+0.12,w:dw-0.2,h:0.46,fontFace:FH,fontSize:21,bold:true,color:c,align:"center"});
 s.addText(l,{x:x+0.15,y:y+0.6,w:dw-0.3,h:0.32,fontFace:FB,fontSize:10.8,bold:true,color:TEXT,align:"center"});
 s.addText(sub,{x:x+0.15,y:y+0.92,w:dw-0.3,h:0.42,fontFace:FB,fontSize:9.8,color:MUTED,align:"center",lineSpacing:12});});
foot(s,16);}

/* ===== 17 RECOMMENDATION ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Improve Phase","Recommended Solution — Scenario S3");
s.addChart(pres.ChartType.bar,[
 {name:"Arrival to served (min)",labels:["S0 Baseline","S1 Rebalance","S2 Faster kitchen","S3 Both"],values:[21.6,18.6,16.8,16.1]},
 {name:"Parties over 20 min (%)",labels:["S0 Baseline","S1 Rebalance","S2 Faster kitchen","S3 Both"],values:[46.6,33.8,25.1,20.7]}],
 {x:0.6,y:1.5,w:6.4,h:3.5,barDir:"col",barGrouping:"clustered",chartColors:[PRIMARY,SECONDARY],barGapWidthPct:50,
  valAxisMinVal:0,valAxisMaxVal:50,valAxisMajorUnit:10,valAxisLabelColor:MUTED,valAxisLabelFontSize:9.5,
  catAxisLabelColor:TEXT,catAxisLabelFontSize:9.5,catGridLine:{style:"none"},valGridLine:{color:LINE,size:1},
  showLegend:true,legendPos:"b",legendFontSize:9.5,legendColor:MUTED,showTitle:false,
  showValue:true,dataLabelColor:WHITE,dataLabelFontSize:8.5,dataLabelPosition:"inEnd",dataLabelFormatCode:"0.0"});
s.addShape("roundRect",{x:7.25,y:1.5,w:5.48,h:3.5,rectRadius:0.09,fill:{color:PRIMARY},line:{type:"none"}});
ic(s,"rocket",7.55,1.78,0.62,ACCENT);
s.addText("Adopt S3 — both changes together",{x:8.35,y:1.78,w:4.1,h:0.62,fontFace:FH,fontSize:15.5,bold:true,color:WHITE,valign:"middle"});
s.addText([{text:"Rebalance staffing.  ",options:{bold:true,color:ACCENT}},
{text:"Move one order taker to the kitchen at peak, giving 1 order taker, 5 kitchen staff and 2 servers. Order taking runs at only 19% utilisation, so service at the table is not harmed.\n\n",options:{color:"DCE8E3"}},
{text:"Speed the kitchen by 15%.  ",options:{bold:true,color:ACCENT}},
{text:"Achieved through process changes rather than headcount: prepare high-volume components ahead of service, introduce a first-in-first-out order-priority rule, and fix equipment and stock availability at peak.",options:{color:"DCE8E3"}}],
 {x:7.55,y:2.58,w:4.9,h:2.25,fontFace:FB,fontSize:11.3,lineSpacing:15});
s.addText("Why both, and not just one",{x:0.6,y:5.2,w:8,h:0.35,fontFace:FH,fontSize:15,bold:true,color:TEXT});
const why=[["Rebalancing alone (S1) still leaves a third of parties over 20 minutes.",SECONDARY],
["Kitchen speed alone (S2) helps more, but leaves the idle order-taking capacity unused.",SECONDARY],
["Together (S3) the variation also drops sharply — the spread narrows from ±1.8 to ±0.7 minutes, meaning a far more predictable guest experience.",PRIMARY]];
why.forEach(([t,c],i)=>{const y=5.62+i*0.45;
 s.addShape("ellipse",{x:0.65,y:y+0.06,w:0.28,h:0.28,fill:{color:c},line:{type:"none"}});
 s.addText(String(i+1),{x:0.65,y:y+0.06,w:0.28,h:0.28,fontFace:FB,fontSize:10,bold:true,color:WHITE,align:"center",valign:"middle"});
 s.addText(t,{x:1.08,y,w:11.6,h:0.4,fontFace:FB,fontSize:11.8,color:TEXT,valign:"middle"});});
foot(s,17);}

/* ===== 18 IMPLEMENTATION ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Improve Phase","Implementation Plan");
const ph=[["1","Close the measurement gap","Weeks 1–2",["Agree the 20-minute CTQ in writing","Introduce timestamp capture per party","Re-baseline with real data"],RED],
["2","Pilot the staffing rebalance","Weeks 3–4",["Run 1 / 5 / 2 staffing at peak only","Measure against the new baseline","Collect server and guest feedback"],PRIMARY],
["3","Kitchen speed improvements","Weeks 5–7",["Prep-ahead list for high-volume items","First-in-first-out order rule","Fix equipment and stock gaps"],SECONDARY],
["4","Standardise and control","Weeks 8–10",["Write the new standard work","Start X-bar / R and p-charts","Hand over to the floor manager"],ACCENT]];
const cw=2.95,gx=0.21;
ph.forEach(([n,t,wk,items,c],i)=>{const x=0.6+i*(cw+gx),y=1.85,chh=4.1;
 s.addShape("roundRect",{x,y,w:cw,h:chh,rectRadius:0.08,fill:{color:WHITE},line:{color:LINE,width:1}});
 s.addShape("ellipse",{x:x+cw/2-0.36,y:y-0.36,w:0.72,h:0.72,fill:{color:c},line:{color:WHITE,width:3}});
 s.addText(n,{x:x+cw/2-0.36,y:y-0.36,w:0.72,h:0.72,fontFace:FH,fontSize:21,bold:true,color:c===ACCENT?DARK:WHITE,align:"center",valign:"middle"});
 s.addText(t,{x:x+0.15,y:y+0.5,w:cw-0.3,h:0.62,fontFace:FB,fontSize:13,bold:true,color:TEXT,align:"center",valign:"middle",lineSpacing:16});
 s.addText(wk,{x:x+0.15,y:y+1.14,w:cw-0.3,h:0.3,fontFace:FB,fontSize:11,italic:true,bold:true,color:c,align:"center"});
 s.addShape("line",{x:x+0.5,y:y+1.52,w:cw-1.0,h:0,line:{color:c,width:1.5}});
 s.addText(items.map(t2=>({text:t2,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:8}})),
  {x:x+0.22,y:y+1.68,w:cw-0.44,h:2.2,fontFace:FB,fontSize:10.3,color:MUTED,lineSpacing:13,valign:"top"});});
note(s,6.25,"Phase 1 comes first deliberately: without trustworthy timing data there is no way to prove that phases 2 and 3 actually worked.","calendar",PRIMARY);
foot(s,18);}

/* ===== 19 CONTROL ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Control Phase","Sustaining the Gains");
s.addText("Control plan",{x:0.6,y:1.5,w:6,h:0.35,fontFace:FH,fontSize:15,bold:true,color:TEXT});
const colX=[0.65,3.0,5.0,6.3],colW=[2.35,2.0,1.3,0.95];
s.addShape("rect",{x:0.6,y:1.9,w:6.45,h:0.44,fill:{color:PRIMARY},line:{type:"none"}});
["Metric","Data type","Chart","Freq."].forEach((h,i)=>
 s.addText(h,{x:colX[i],y:1.9,w:colW[i]-0.1,h:0.44,fontFace:FB,fontSize:11,bold:true,color:WHITE,valign:"middle"}));
const crows=[["Arrival → food served","Continuous (min)","X-bar / R","Daily"],
["Parties over 20 min","Attribute (yes/no)","p-chart","Daily"],
["Wait for a free table","Continuous (min)","X-bar / R","Daily"],
["Kitchen queue length","Continuous (count)","Run chart","Hourly"]];
let cy=2.34;
crows.forEach((r,i)=>{const rh=0.62;
 if(i%2===1)s.addShape("rect",{x:0.6,y:cy,w:6.45,h:rh,fill:{color:LIGHT},line:{type:"none"}});
 s.addText(r[0],{x:colX[0],y:cy,w:colW[0]-0.1,h:rh,fontFace:FB,fontSize:10.8,bold:true,color:TEXT,valign:"middle",lineSpacing:13});
 s.addText(r[1],{x:colX[1],y:cy,w:colW[1]-0.1,h:rh,fontFace:FB,fontSize:10.3,color:MUTED,valign:"middle",lineSpacing:13});
 s.addText(r[2],{x:colX[2],y:cy,w:colW[2]-0.1,h:rh,fontFace:FB,fontSize:10.5,bold:true,color:SECONDARY,valign:"middle"});
 s.addText(r[3],{x:colX[3],y:cy,w:colW[3]-0.1,h:rh,fontFace:FB,fontSize:10.3,color:MUTED,valign:"middle"});
 cy+=rh;});
s.addShape("roundRect",{x:7.3,y:1.9,w:5.43,h:2.9,rectRadius:0.08,fill:{color:LIGHT},line:{type:"none"}});
s.addText("Choosing the right chart",{x:7.6,y:2.08,w:4.85,h:0.33,fontFace:FH,fontSize:14,bold:true,color:PRIMARY});
s.addText([{text:"The time in minutes is continuous data",options:{bold:true,color:TEXT}},
{text:" — plot the party average and range on an X-bar / R chart to catch both a shift in the average and a change in consistency.\n\n",options:{color:MUTED}},
{text:"Whether a party breached 20 minutes is attribute data",options:{bold:true,color:TEXT}},
{text:" — plot the daily proportion on a p-chart, with limits that recalculate as the number of parties changes each day.\n\n",options:{color:MUTED}},
{text:"Act on signals, not on single bad days",options:{bold:true,color:SECONDARY}},
{text:" — investigate only when a point falls outside the limits or a run of seven points trends one way.",options:{color:MUTED}}],
 {x:7.6,y:2.46,w:4.85,h:2.2,fontFace:FB,fontSize:10.8,lineSpacing:14});
s.addText("Keeping it in place",{x:0.6,y:5.0,w:8,h:0.35,fontFace:FH,fontSize:15,bold:true,color:TEXT});
const keep=["Standard work documented for order taking, kitchen prep and billing",
"Daily visual board showing yesterday's average and breach rate",
"Named owner — floor manager reviews the charts each morning",
"Written response plan for any out-of-control signal"];
keep.forEach((t,i)=>{const col=i%2,row=Math.floor(i/2),x=0.6+col*6.23,y=5.42+row*0.62;
 s.addShape("roundRect",{x,y,w:5.9,h:0.52,rectRadius:0.05,fill:{color:WHITE},line:{color:LINE,width:1}});
 ic(s,"checkcircle",x+0.13,y+0.09,0.34,GREEN);
 s.addText(t,{x:x+0.58,y,w:5.25,h:0.52,fontFace:FB,fontSize:10.8,color:TEXT,valign:"middle",lineSpacing:13});});
foot(s,19);}

/* ===== 20 BENEFITS ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Outcome","Expected Benefits");
const cols=[["Before",["21.6 min average wait","46.6% of parties over 20 min","3.1 min wait for a table","±1.8 min spread — unpredictable","1.59 sigma","Kitchen at 66%, order taking at 19%"],MUTED],
["After S3",["16.1 min average wait","20.7% of parties over 20 min","1.2 min wait for a table","±0.7 min spread — consistent","2.32 sigma","Load shared across the kitchen"],PRIMARY]];
cols.forEach(([t,items,c],i)=>{const x=0.6+i*3.35,y=1.55;
 s.addShape("roundRect",{x,y,w:3.1,h:4.2,rectRadius:0.08,fill:{color:i===0?LIGHT:PRIMARY},line:{type:"none"}});
 s.addText(t,{x:x+0.1,y:y+0.2,w:2.9,h:0.42,fontFace:FH,fontSize:17,bold:true,color:i===0?MUTED:WHITE,align:"center"});
 s.addShape("line",{x:x+0.6,y:y+0.72,w:1.9,h:0,line:{color:i===0?LINE:"5A8A77",width:1.5}});
 s.addText(items.map(t2=>({text:t2,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:9}})),
  {x:x+0.25,y:y+0.9,w:2.6,h:3.1,fontFace:FB,fontSize:10.8,color:i===0?MUTED:"DCE8E3",lineSpacing:14,valign:"top"});});
s.addText("→",{x:3.70,y:3.3,w:0.25,h:0.7,fontFace:FB,fontSize:20,bold:true,color:SECONDARY,align:"center",valign:"middle"});
const ben=[["users","Guest experience","Nearly four out of five parties served inside the 20-minute promise, against roughly one in two today.",PRIMARY],
["chair","Table turnover","Faster service releases tables sooner, letting the same seating capacity serve more covers on peak days.",SECONDARY],
["balance","No extra cost","Both levers use existing staff and process changes — there is no additional hiring in the recommendation.",ACCENT],
["chartline","Predictability","The spread narrows from ±1.8 to ±0.7 minutes, so the kitchen can promise a time and keep it.",GREEN]];
ben.forEach(([i2,t,d,c],i)=>{const x=7.3,y=1.55+i*1.08;
 s.addShape("roundRect",{x,y,w:5.43,h:0.96,rectRadius:0.07,fill:{color:WHITE},line:{color:LINE,width:1}});
 ic(s,i2,x+0.16,y+0.2,0.56,c);
 s.addText(t,{x:x+0.85,y:y+0.14,w:4.4,h:0.3,fontFace:FB,fontSize:12,bold:true,color:TEXT});
 s.addText(d,{x:x+0.85,y:y+0.42,w:4.45,h:0.48,fontFace:FB,fontSize:10,color:MUTED,lineSpacing:12.5});});
note(s,5.95,"These are simulated outcomes. The simulation inputs are placeholders built on reported averages, so the figures must be re-confirmed against measured data before being presented as achieved results.","exclamation",RED);
foot(s,20);}

/* ===== 21 CONCLUSION ===== */
{const s=pres.addSlide({masterName:"P"});head(s,"Closing","Conclusion & Next Steps");
const concl=[["search","What we found","The kitchen is the constraint at 66% utilisation while order taking sits idle at 19%. Waiting for a table and the kitchen queue together account for 98% of all non-value-adding time, and the two are linked because a table is only released after billing."],
["flask","What we tested","Four scenarios in a discrete-event model. Rebalancing one order taker into the kitchen and improving kitchen speed by 15% together bring the average wait from 21.6 to 16.1 minutes and cut breaches of the 20-minute promise from 46.6% to 20.7%."],
["exclamation","What must come first","The measurement system is the weakest link. Timings are self-reported, there are no order-level records, and the 20-minute threshold has never been formally agreed. Phase 1 of the plan closes these gaps before any claim of improvement is made."]];
let cy=1.55;
concl.forEach(([i2,t,d],i)=>{const h=1.20;
 s.addShape("roundRect",{x:0.6,y:cy,w:12.1,h,rectRadius:0.08,fill:{color:i%2===0?LIGHT:WHITE},line:{color:i%2===0?LIGHT:LINE,width:1}});
 ic(s,i2,0.9,cy+0.27,0.66,[PRIMARY,SECONDARY,RED][i]);
 s.addText(t,{x:1.78,y:cy+0.14,w:10.7,h:0.32,fontFace:FH,fontSize:14.5,bold:true,color:[PRIMARY,SECONDARY,RED][i]});
 s.addText(d,{x:1.78,y:cy+0.47,w:10.7,h:0.62,fontFace:FB,fontSize:10.8,color:TEXT,lineSpacing:14});
 cy+=h+0.13;});
s.addText("Immediate next steps",{x:0.6,y:cy+0.1,w:8,h:0.35,fontFace:FH,fontSize:15,bold:true,color:TEXT});
const nx=["Agree the 20-minute CTQ with the director in writing","Start per-party timestamp capture at the host desk",
"Re-baseline over two weeks of real service","Pilot the 1 / 5 / 2 staffing split at peak"];
nx.forEach((t,i)=>{const x=0.6+i*3.08,y=cy+0.5;
 s.addShape("roundRect",{x,y,w:2.9,h:0.72,rectRadius:0.06,fill:{color:WHITE},line:{color:LINE,width:1}});
 s.addShape("ellipse",{x:x+0.14,y:y+0.21,w:0.3,h:0.3,fill:{color:PRIMARY},line:{type:"none"}});
 s.addText(String(i+1),{x:x+0.14,y:y+0.21,w:0.3,h:0.3,fontFace:FB,fontSize:10,bold:true,color:WHITE,align:"center",valign:"middle"});
 s.addText(t,{x:x+0.54,y,w:2.25,h:0.72,fontFace:FB,fontSize:9.8,color:TEXT,valign:"middle",lineSpacing:12});});
foot(s,21);}

/* ===== 22 THANK YOU ===== */
{const s=pres.addSlide({masterName:"P"});s.background={color:DARK};
s.addShape("ellipse",{x:-1.6,y:-1.9,w:5.2,h:5.2,fill:{color:PRIMARY,transparency:38},line:{type:"none"}});
s.addShape("ellipse",{x:11.8,y:4.6,w:3.6,h:3.6,fill:{color:SECONDARY,transparency:58},line:{type:"none"}});
s.addText("Thank You",{x:0,y:2.85,w:PGW,h:1.0,fontFace:FH,fontSize:44,bold:true,color:WHITE,align:"center"});
s.addText("Questions & Discussion",{x:0,y:3.8,w:PGW,h:0.5,fontFace:FB,fontSize:16,italic:true,color:"C5D2CC",align:"center"});
foot(s,22);}

pres.writeFile({fileName:"/home/claude/nk_lss/NK_GrandPark_LeanSixSigma.pptx"}).then(()=>console.log("built"));
