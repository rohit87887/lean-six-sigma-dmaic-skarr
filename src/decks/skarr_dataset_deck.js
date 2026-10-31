const pptxgen=require("pptxgenjs");
const path=require("path");
const ICON=n=>path.join(__dirname,"icons",`${n}.png`);

const NAVY="071E3D",PRIMARY="0B3D91",SECONDARY="1CA7B0",ACCENT="FF7A00",
LIGHTBG="F4F7FA",WHITE="FFFFFF",TEXT_DARK="1B2733",TEXT_MUTED="5B6B79",LINE="DCE4EA",
GREEN="1B8A5A",RED="C0392B";
const FH="Cambria",FB="Calibri";

const pres=new pptxgen();
pres.layout="LAYOUT_WIDE";
const PGW=13.33,PGH=7.5;
pres.defineSlideMaster({title:"PLAIN",background:{color:WHITE}});

function footer(s,n){
  s.addText("SKARR Business Solutions — Lean Six Sigma Project",{x:0.5,y:PGH-0.4,w:7,h:0.3,fontFace:FB,fontSize:9,color:TEXT_MUTED});
  s.addText(String(n),{x:PGW-1.0,y:PGH-0.4,w:0.5,h:0.3,fontFace:FB,fontSize:9,color:TEXT_MUTED,align:"right"});
}
function iconCircle(s,ic,x,y,d,col){
  s.addShape("ellipse",{x,y,w:d,h:d,fill:{color:col},line:{type:"none"}});
  const p=d*0.26;
  s.addImage({path:ICON(ic),x:x+p/2,y:y+p/2,w:d-p,h:d-p});
}
function head(s,kicker,title){
  s.addText(kicker.toUpperCase(),{x:0.6,y:0.4,w:10,h:0.3,fontFace:FB,fontSize:12,bold:true,color:SECONDARY,charSpacing:2});
  s.addText(title,{x:0.6,y:0.68,w:12.1,h:0.75,fontFace:FH,fontSize:29,bold:true,color:TEXT_DARK});
}

/* ---------- S1 TITLE ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
s.background={color:NAVY};
s.addShape("ellipse",{x:10.3,y:-1.8,w:5,h:5,fill:{color:PRIMARY,transparency:40},line:{type:"none"}});
s.addShape("ellipse",{x:11.6,y:5.0,w:3.4,h:3.4,fill:{color:SECONDARY,transparency:55},line:{type:"none"}});
s.addText("MEASURE PHASE — DATA & TOOL SELECTION",{x:0.9,y:1.7,w:10,h:0.4,fontFace:FB,fontSize:14,bold:true,color:SECONDARY,charSpacing:3});
s.addText("Audit Error Dataset:\nAttribute Data Analysis & DMAIC Tool Selection",{x:0.9,y:2.15,w:10.6,h:1.7,fontFace:FH,fontSize:36,bold:true,color:WHITE,lineSpacing:42});
s.addText("Reducing client errors to cut rework and service delivery delay — SKARR Business Solutions",{x:0.9,y:3.95,w:9.6,h:0.5,fontFace:FB,fontSize:15,italic:true,color:"C9D6E3"});
s.addShape("line",{x:0.9,y:4.6,w:2.2,h:0,line:{color:ACCENT,width:3}});
s.addText("PRESENTED BY",{x:0.9,y:4.8,w:4,h:0.3,fontFace:FB,fontSize:11,bold:true,color:SECONDARY,charSpacing:2});
[["S. Rohit","23MIA1175"],["and two project teammates",""]].forEach((m,i)=>{
  const y=5.15+i*0.4;
  s.addText(m[0],{x:0.9,y,w:3.9,h:0.35,fontFace:FB,fontSize:13.5,bold:true,color:WHITE,valign:"middle"});
  s.addText(m[1],{x:4.85,y,w:2.2,h:0.35,fontFace:FB,fontSize:13,color:"C9D6E3",valign:"middle"});
});
iconCircle(s,"database",11.0,5.1,1.4,PRIMARY);
}

/* ---------- S2 COMPANY & DATA SOURCE ---------- */
{
  const s=pres.addSlide({masterName:"PLAIN"});
  head(s,"Background","Company & Data Source");

  s.addShape("roundRect",{x:0.6,y:1.55,w:5.9,h:3.95,rectRadius:0.08,fill:{color:PRIMARY},line:{type:"none"}});
  iconCircle(s,"database",0.92,1.85,0.66,WHITE);
  s.addText("SKARR Business Solutions Pvt. Ltd.",{x:1.78,y:1.85,w:4.5,h:0.66,fontFace:FH,fontSize:16,bold:true,color:WHITE,valign:"middle"});
  s.addText("A Chennai-based consulting firm delivering digital publishing, data analytics, web development and e-commerce support to clients in financial services, e-commerce and logistics.",
   {x:0.95,y:2.68,w:5.2,h:1.0,fontFace:FB,fontSize:12,color:"E3ECF5",lineSpacing:16});
  s.addShape("line",{x:0.95,y:3.82,w:5.2,h:0,line:{color:"3D6BB5",width:1}});
  s.addText("Service delivery flow under study",{x:0.95,y:3.95,w:5.2,h:0.28,fontFace:FB,fontSize:11.5,bold:true,color:WHITE});
  s.addText(["Request intake and scoping","Production work","Internal quality review","Client delivery and sign-off"]
   .map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:2}})),
   {x:0.95,y:4.24,w:5.2,h:1.18,fontFace:FB,fontSize:11,color:"E3ECF5",lineSpacing:13.5});

  s.addShape("roundRect",{x:6.83,y:1.55,w:5.9,h:3.95,rectRadius:0.08,fill:{color:LIGHTBG},line:{type:"none"}});
  iconCircle(s,"clipboard",7.15,1.85,0.62,SECONDARY);
  s.addText("Where the audit data comes from",{x:7.95,y:1.85,w:4.5,h:0.62,fontFace:FH,fontSize:15,bold:true,color:SECONDARY,valign:"middle"});
  s.addText([
   "Internal quality audit of delivered work units",
   "Each unit checked against the agreed client specification",
   "Errors logged by type and counted per unit",
   "Ten specification checkpoints applied per unit",
   "Audit period sample: 1,200 units reviewed"
  ].map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:8}})),
   {x:7.18,y:2.68,w:5.2,h:2.3,fontFace:FB,fontSize:11.5,color:TEXT_DARK,lineSpacing:15});

  s.addShape("roundRect",{x:0.6,y:5.72,w:12.13,h:0.95,rectRadius:0.08,fill:{color:LIGHTBG},line:{type:"none"}});
  iconCircle(s,"bolt",0.85,5.90,0.58,ACCENT);
  s.addText("The three recorded fields \u2014 units audited, units in error and total errors \u2014 are counts, not measurements. That single fact decides every analytical tool used in this project.",
   {x:1.62,y:5.77,w:10.9,h:0.85,fontFace:FB,fontSize:12,color:TEXT_DARK,valign:"middle",lineSpacing:16});
  footer(s,2);
}

/* ---------- S2 DATASET STRUCTURE ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
head(s,"The Data","Dataset Structure — What We Collect");
s.addText("Every audit record carries three counted fields. Each answers a different question, and each drives a different metric.",
 {x:0.6,y:1.5,w:12.1,h:0.4,fontFace:FB,fontSize:13,italic:true,color:TEXT_MUTED});

const cards=[
 ["table","Total Products / Parts Audited","The sample size (n)","How many units were inspected in the audit period. This is the denominator for every rate we calculate.",PRIMARY],
 ["exclamation","Total No. of Products in Error","The defectives (d)","How many units had at least one error. A unit is either OK or not-OK — this is a yes/no count.",SECONDARY],
 ["layers","Total Errors","The defects (c)","The total count of individual errors found. One unit can carry several errors, so this is always ≥ products in error.",ACCENT]];

const cw=3.95,ch=3.5,gap=0.22;
cards.forEach((c,i)=>{
 const x=0.6+i*(cw+gap),y=2.05;
 s.addShape("roundRect",{x,y,w:cw,h:ch,rectRadius:0.09,fill:{color:WHITE},line:{color:c[4],width:1.5}});
 iconCircle(s,c[0],x+cw/2-0.42,y+0.3,0.84,c[4]);
 s.addText(c[1],{x:x+0.2,y:y+1.25,w:cw-0.4,h:0.6,fontFace:FH,fontSize:14.5,bold:true,color:TEXT_DARK,align:"center"});
 s.addText(c[2],{x:x+0.2,y:y+1.85,w:cw-0.4,h:0.3,fontFace:FB,fontSize:12,italic:true,bold:true,color:c[4],align:"center"});
 s.addText(c[3],{x:x+0.28,y:y+2.2,w:cw-0.56,h:1.15,fontFace:FB,fontSize:11.3,color:TEXT_MUTED,align:"center",lineSpacing:15});
});

s.addShape("roundRect",{x:0.6,y:5.8,w:12.1,h:0.95,rectRadius:0.08,fill:{color:LIGHTBG},line:{type:"none"}});
iconCircle(s,"bolt",0.85,5.98,0.6,ACCENT);
s.addText("Key distinction: \"Products in Error\" counts faulty UNITS (defectives). \"Total Errors\" counts faulty FEATURES (defects). Six Sigma treats these two differently — and that choice decides which control chart we use.",
 {x:1.65,y:5.88,w:10.85,h:0.8,fontFace:FB,fontSize:12.5,color:TEXT_DARK,valign:"middle",lineSpacing:17});
footer(s,3);
}

/* ---------- S3 DATA TYPE ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
head(s,"Classification","Why This Is Attribute Data");

s.addShape("roundRect",{x:0.6,y:1.55,w:5.95,h:2.5,rectRadius:0.08,fill:{color:PRIMARY},line:{type:"none"}});
iconCircle(s,"calculator",0.9,1.85,0.7,WHITE);
s.addText("Attribute (Discrete) Data",{x:1.75,y:1.85,w:4.5,h:0.7,fontFace:FH,fontSize:17,bold:true,color:WHITE,valign:"middle"});
s.addText([
 "Counted, not measured — whole numbers only",
 "Pass / Fail, Error / No-Error classification",
 "Cannot have \"half an error\"",
 "Follows Binomial or Poisson distribution"
].map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true}})),
 {x:1.0,y:2.65,w:5.25,h:1.3,fontFace:FB,fontSize:12.5,color:"E3ECF5",lineSpacingMultiple:1.35});

s.addShape("roundRect",{x:6.78,y:1.55,w:5.95,h:2.5,rectRadius:0.08,fill:{color:LIGHTBG},line:{color:LINE,width:1}});
iconCircle(s,"clock",7.08,1.85,0.7,TEXT_MUTED);
s.addText("Variable (Continuous) Data",{x:7.93,y:1.85,w:4.5,h:0.7,fontFace:FH,fontSize:17,bold:true,color:TEXT_DARK,valign:"middle"});
s.addText([
 "Measured on a scale — decimals allowed",
 "e.g. turnaround time in hours, cost in ₹",
 "Uses X-bar/R charts, t-tests, ANOVA",
 "NOT what our error-count dataset is"
].map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true}})),
 {x:7.18,y:2.65,w:5.25,h:1.3,fontFace:FB,fontSize:12.5,color:TEXT_MUTED,lineSpacingMultiple:1.35});

s.addText("What this means for our tool choice",{x:0.6,y:4.3,w:8,h:0.4,fontFace:FH,fontSize:16,bold:true,color:TEXT_DARK});
const impl=[
 ["X","Cannot use X-bar/R charts, t-test, ANOVA, or Gage R&R — these all need continuous data",RED],
 ["✓","Must use p / np / c / u control charts for monitoring",GREEN],
 ["✓","Must use Attribute Agreement Analysis (Kappa) instead of Gage R&R for measurement validation",GREEN],
 ["✓","Must use Chi-Square and 2-Proportion tests instead of t-test for comparisons",GREEN]];
impl.forEach((r,i)=>{
 const y=4.8+i*0.48;
 s.addShape("ellipse",{x:0.65,y:y+0.04,w:0.3,h:0.3,fill:{color:r[2]},line:{type:"none"}});
 s.addText(r[0],{x:0.65,y:y+0.04,w:0.3,h:0.3,fontFace:FB,fontSize:12,bold:true,color:WHITE,align:"center",valign:"middle"});
 s.addText(r[1],{x:1.1,y,w:11.5,h:0.38,fontFace:FB,fontSize:12.5,color:TEXT_DARK,valign:"middle"});
});
footer(s,4);
}

/* ---------- S4 METRICS ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
head(s,"Measure Phase","Metrics Derived From the Three Fields");
s.addText("Worked example using illustrative audit figures — replace with SKARR's actual audit data.",
 {x:0.6,y:1.48,w:12.1,h:0.3,fontFace:FB,fontSize:12,italic:true,color:TEXT_MUTED});

const hy=1.88,colX=[0.6,4.1,8.3,10.8],colW=[3.5,4.2,2.5,1.95];
s.addShape("rect",{x:0.6,y:hy,w:12.15,h:0.48,fill:{color:PRIMARY},line:{type:"none"}});
["Metric","Formula","Calculation","Result"].forEach((h,i)=>{
 s.addText(h,{x:colX[i],y:hy,w:colW[i]-0.12,h:0.48,fontFace:FB,fontSize:12.5,bold:true,color:WHITE,valign:"middle"});
});
const rows=[
 ["% Defective Units","Products in Error ÷ Audited","96 ÷ 1,200","8.00%"],
 ["First Time Yield (FTY)","(Audited − In Error) ÷ Audited","1,104 ÷ 1,200","92.00%"],
 ["DPU (Defects Per Unit)","Total Errors ÷ Audited","150 ÷ 1,200","0.125"],
 ["Errors per Faulty Unit","Total Errors ÷ Products in Error","150 ÷ 96","1.56"],
 ["DPO","Errors ÷ (Audited × Opportunities)","150 ÷ (1,200×10)","0.0125"],
 ["DPMO","DPO × 1,000,000","0.0125 × 10⁶","12,500"],
 ["Process Sigma Level","From DPMO conversion","—","≈ 3.74 σ"]];
let y=hy+0.48;
rows.forEach((r,i)=>{
 const rh=0.52;
 if(i%2===1)s.addShape("rect",{x:0.6,y,w:12.15,h:rh,fill:{color:LIGHTBG},line:{type:"none"}});
 const last=i>=5;
 r.forEach((c,j)=>{
  s.addText(c,{x:colX[j],y,w:colW[j]-0.12,h:rh,fontFace:FB,fontSize:11.8,
   bold:(j===0||j===3),color:(j===3&&last)?ACCENT:(j===3?PRIMARY:TEXT_DARK),valign:"middle"});
 });
 y+=rh;
});
s.addText("Baseline reading: roughly 1 in every 12 delivered units carries an error, and each faulty unit averages about 1.6 errors — a 3.74σ process against a 6σ goal.",
 {x:0.6,y:y+0.18,w:12.1,h:0.5,fontFace:FB,fontSize:12.5,italic:true,color:TEXT_DARK});
footer(s,5);
}

/* ---------- S5 VALUE STREAM MAP (NEW) ---------- */
{
  const s=pres.addSlide({masterName:"PLAIN"});
  head(s,"Measure Phase","Current State Value Stream Map");
  s.addText("Mapping the service delivery flow shows where errors are created, where they are caught, and what the rework loop costs in time.",
   {x:0.6,y:1.45,w:12.1,h:0.35,fontFace:FB,fontSize:12.5,italic:true,color:TEXT_MUTED});

  const stages=[["Request\nintake","0.5 d",PRIMARY],["Scoping &\nassignment","0.5 d",PRIMARY],
    ["Production\nwork","3.0 d",SECONDARY],["Internal\nQC review","1.0 d",RED],["Client\ndelivery","0.5 d",PRIMARY]];
  const waits=["0.5 d","1.0 d","0.5 d","1.0 d"];
  const bw=1.95,gap=0.59,sx=0.6,y0=1.95,bh=1.15;
  stages.forEach(([n,pt,c],i)=>{
    const x=sx+i*(bw+gap);
    s.addShape("roundRect",{x,y:y0,w:bw,h:bh,rectRadius:0.07,fill:{color:c},line:{type:"none"}});
    s.addText(n,{x:x+0.05,y:y0+0.14,w:bw-0.1,h:0.58,fontFace:FB,fontSize:12,bold:true,color:WHITE,align:"center",valign:"middle"});
    s.addText("P/T  "+pt,{x:x+0.05,y:y0+0.74,w:bw-0.1,h:0.3,fontFace:FB,fontSize:9.5,color:"E3ECF5",align:"center"});
    if(i<4){
      s.addText("\u2192",{x:x+bw,y:y0+bh/2-0.26,w:gap,h:0.52,fontFace:FB,fontSize:17,bold:true,color:TEXT_MUTED,align:"center",valign:"middle"});
      s.addText(waits[i],{x:x+bw-0.08,y:y0+bh+0.06,w:gap+0.16,h:0.26,fontFace:FB,fontSize:8.5,bold:true,color:ACCENT,align:"center"});
    }
  });
  s.addText("wait",{x:sx+bw-0.08,y:y0+bh+0.3,w:gap+0.16,h:0.2,fontFace:FB,fontSize:7.5,italic:true,color:TEXT_MUTED,align:"center"});

  const qcX=sx+3*(bw+gap)+bw/2, prodX=sx+2*(bw+gap)+bw/2, loopY=y0+bh+0.62;
  s.addShape("line",{x:qcX,y:y0+bh,w:0,h:loopY-(y0+bh),line:{color:RED,width:1.8,dashType:"dash"}});
  s.addShape("line",{x:prodX,y:loopY,w:qcX-prodX,h:0,line:{color:RED,width:1.8,dashType:"dash"}});
  s.addShape("line",{x:prodX,y:y0+bh,w:0,h:loopY-(y0+bh),line:{color:RED,width:1.8,dashType:"dash"}});
  s.addText("Rework loop \u2014 8% of units, +2.0 days each",
   {x:prodX-0.5,y:loopY+0.08,w:(qcX-prodX)+1.0,h:0.3,fontFace:FB,fontSize:9.5,italic:true,bold:true,color:RED,align:"center",valign:"middle"});

  s.addText("Timeline ladder \u2014 where the 9.0 days go",{x:0.6,y:4.18,w:8,h:0.32,fontFace:FB,fontSize:13,bold:true,color:TEXT_DARK});
  const barY=4.55,barH=0.58,barX=0.6,barW=12.15,procW=barW*(5.5/9.0),waitW=barW*(3.5/9.0);
  s.addShape("rect",{x:barX,y:barY,w:procW,h:barH,fill:{color:PRIMARY},line:{type:"none"}});
  s.addShape("rect",{x:barX+procW,y:barY,w:waitW,h:barH,fill:{color:ACCENT},line:{type:"none"}});
  s.addText("Value-adding work  5.5 days  (61%)",{x:barX,y:barY,w:procW,h:barH,fontFace:FB,fontSize:12,bold:true,color:WHITE,align:"center",valign:"middle"});
  s.addText("Waiting  3.5 days  (39%)",{x:barX+procW,y:barY,w:waitW,h:barH,fontFace:FB,fontSize:11.5,bold:true,color:"4A3000",align:"center",valign:"middle"});

  const stats=[["9.0 days","Lead time for a first-time-right unit",PRIMARY],
    ["11.0 days","Lead time once rework is needed  (+22%)",RED],
    ["61%","Process cycle efficiency",SECONDARY],
    ["8%","Share of units entering the rework loop",ACCENT]];
  const sw=2.93,sg=0.22;
  stats.forEach(([v,l,c],i)=>{
    const x=0.6+i*(sw+sg),y=5.45;
    s.addShape("roundRect",{x,y,w:sw,h:1.2,rectRadius:0.08,fill:{color:LIGHTBG},line:{type:"none"}});
    s.addText(v,{x:x+0.1,y:y+0.12,w:sw-0.2,h:0.46,fontFace:FH,fontSize:21,bold:true,color:c,align:"center"});
    s.addText(l,{x:x+0.16,y:y+0.6,w:sw-0.32,h:0.5,fontFace:FB,fontSize:10,color:TEXT_MUTED,align:"center",lineSpacing:12.5});
  });
  s.addText("Illustrative timings consistent with the audit data (8% defective). Replace with SKARR's measured cycle times.",
   {x:0.6,y:6.72,w:12.1,h:0.3,fontFace:FB,fontSize:10,italic:true,color:TEXT_MUTED,align:"center"});
  footer(s,6);
}

/* ---------- S5 WHICH CHART (DECISION TREE) ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
head(s,"Tool Selection","Which Control Chart? — Decision Logic");

s.addShape("roundRect",{x:5.2,y:1.5,w:2.9,h:0.62,rectRadius:0.08,fill:{color:NAVY},line:{type:"none"}});
s.addText("Attribute Data",{x:5.2,y:1.5,w:2.9,h:0.62,fontFace:FB,fontSize:14,bold:true,color:WHITE,align:"center",valign:"middle"});

s.addShape("line",{x:6.65,y:2.12,w:0,h:0.35,line:{color:LINE,width:2}});
s.addShape("line",{x:3.3,y:2.47,w:6.7,h:0,line:{color:LINE,width:2}});
s.addShape("line",{x:3.3,y:2.47,w:0,h:0.3,line:{color:LINE,width:2}});
s.addShape("line",{x:10.0,y:2.47,w:0,h:0.3,line:{color:LINE,width:2}});

const branches=[
 {x:1.5,label:"Counting DEFECTIVE UNITS",sub:"\"Products in Error\"",dist:"Binomial",col:SECONDARY,
  charts:[["p-chart","Proportion defective\nVariable sample size",true],["np-chart","Number defective\nConstant sample size",false]]},
 {x:8.2,label:"Counting DEFECTS",sub:"\"Total Errors\"",dist:"Poisson",col:ACCENT,
  charts:[["u-chart","Defects per unit\nVariable sample size",true],["c-chart","Count of defects\nConstant sample size",false]]}];

branches.forEach(b=>{
 s.addShape("roundRect",{x:b.x,y:2.77,w:3.6,h:0.95,rectRadius:0.08,fill:{color:b.col},line:{type:"none"}});
 s.addText(b.label,{x:b.x+0.1,y:2.85,w:3.4,h:0.32,fontFace:FB,fontSize:13,bold:true,color:WHITE,align:"center"});
 s.addText(`${b.sub}  ·  ${b.dist} distribution`,{x:b.x+0.1,y:3.18,w:3.4,h:0.45,fontFace:FB,fontSize:11,italic:true,color:"EAF1F8",align:"center"});
 b.charts.forEach((c,i)=>{
  const cx=b.x+i*1.85,cy=4.05;
  const hl=c[2];
  s.addShape("roundRect",{x:cx,y:cy,w:1.72,h:1.5,rectRadius:0.07,fill:{color:hl?WHITE:LIGHTBG},line:{color:hl?b.col:LINE,width:hl?2:1}});
  s.addText(c[0],{x:cx+0.05,y:cy+0.15,w:1.62,h:0.35,fontFace:FH,fontSize:15,bold:true,color:hl?b.col:TEXT_MUTED,align:"center"});
  s.addText(c[1],{x:cx+0.08,y:cy+0.52,w:1.56,h:0.9,fontFace:FB,fontSize:9.8,color:TEXT_MUTED,align:"center",lineSpacing:12});
  if(hl)s.addText("OUR CHOICE",{x:cx+0.05,y:cy+1.52,w:1.62,h:0.25,fontFace:FB,fontSize:8.5,bold:true,color:ACCENT,align:"center",charSpacing:1});
 });
});

s.addShape("roundRect",{x:0.6,y:6.0,w:12.1,h:0.85,rectRadius:0.08,fill:{color:LIGHTBG},line:{type:"none"}});
iconCircle(s,"chartbar",0.85,6.15,0.55,PRIMARY);
s.addText("Our audit volume changes period to period, and one unit can hold several errors — so the u-chart (defects per unit) is our primary tool, with the p-chart tracking the share of faulty units alongside it.",
 {x:1.6,y:6.05,w:10.9,h:0.75,fontFace:FB,fontSize:12.5,color:TEXT_DARK,valign:"middle",lineSpacing:17});
footer(s,7);
}

/* ---------- S6 DMAIC TOOL MAP ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
head(s,"Methodology","DMAIC Tool Map for Attribute Data");

const phases=[
 ["D","Define",PRIMARY,["Project Charter","SIPOC Diagram","VOC → CTQ Tree","Operational Definition of \"Error\""]],
 ["M","Measure",SECONDARY,["Check Sheet / Data Plan","Attribute Agreement Analysis (Kappa)","Value Stream Map","DPU, DPMO, Sigma Level","u-chart & p-chart baseline"]],
 ["A","Analyze",PRIMARY,["Pareto Chart (error types)","Fishbone (6M) + 5 Why","Chi-Square Test","2-Proportion Test"]],
 ["I","Improve",ACCENT,["Poka-Yoke (mistake proofing)","Standard Work / SOP","FMEA","Pilot + before/after test"]],
 ["C","Control",SECONDARY,["Ongoing u-chart / p-chart","Control Plan","Error dashboard","Audit cadence & response plan"]]];

const n=5,bw=2.33,gap=0.2,total=n*bw+(n-1)*gap,sx=(PGW-total)/2,by=2.05,bh=4.05;
phases.forEach((p,i)=>{
 const x=sx+i*(bw+gap);
 s.addShape("roundRect",{x,y:by,w:bw,h:bh,rectRadius:0.09,fill:{color:WHITE},line:{color:LINE,width:1}});
 s.addShape("ellipse",{x:x+bw/2-0.4,y:by-0.4,w:0.8,h:0.8,fill:{color:p[2]},line:{color:WHITE,width:3}});
 s.addText(p[0],{x:x+bw/2-0.4,y:by-0.4,w:0.8,h:0.8,fontFace:FH,fontSize:23,bold:true,color:WHITE,align:"center",valign:"middle"});
 s.addText(p[1],{x:x+0.1,y:by+0.55,w:bw-0.2,h:0.35,fontFace:FB,fontSize:14,bold:true,color:TEXT_DARK,align:"center"});
 s.addShape("line",{x:x+0.45,y:by+0.98,w:bw-0.9,h:0,line:{color:p[2],width:1.5}});
 s.addText(p[3].map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:7}})),
  {x:x+0.2,y:by+1.12,w:bw-0.4,h:2.8,fontFace:FB,fontSize:10.5,color:TEXT_MUTED,lineSpacing:13,valign:"top"});
});
s.addText("The two tools that carry most of this project: the u-chart (Measure & Control) for monitoring, and the Pareto chart (Analyze) for targeting.",
 {x:0.6,y:6.35,w:12.1,h:0.45,fontFace:FB,fontSize:12.5,italic:true,color:TEXT_MUTED,align:"center"});
footer(s,8);
}

/* ---------- S8 FISHBONE (NEW) ---------- */
{
  const s=pres.addSlide({masterName:"PLAIN"});
  head(s,"Analyze Phase","Cause and Effect \u2014 Fishbone Analysis");
  const spineY=3.95,spineX0=0.75,spineX1=10.35;
  s.addShape("line",{x:spineX0,y:spineY,w:spineX1-spineX0,h:0,line:{color:NAVY,width:2.5}});
  s.addShape("roundRect",{x:10.45,y:3.2,w:2.35,h:1.5,rectRadius:0.08,fill:{color:NAVY},line:{type:"none"}});
  s.addText("Client errors in delivered work",{x:10.55,y:3.32,w:2.15,h:0.7,fontFace:FB,fontSize:11.5,bold:true,color:WHITE,align:"center",valign:"middle",lineSpacing:14});
  s.addText("96 of 1,200 units\n150 errors in total",{x:10.55,y:4.02,w:2.15,h:0.56,fontFace:FB,fontSize:9,italic:true,color:"C9D6E3",align:"center",lineSpacing:11});

  const top=[["People",PRIMARY,["Workload peaks across projects \u2605","Variation in skill and experience","New staff onboarding gaps","Unclear task ownership"]],
   ["Method / Process",SECONDARY,["No standard template per task \u2605","Pre-delivery checklist not used \u2605","Unclear handoff between stages","Version control not enforced"]],
   ["Tools / Systems",RED,["Free-text entry, no dropdowns \u2605","No automated format validation \u2605","Manual transfer between files","Several file versions in circulation"]]];
  const bot=[["Inputs / Client",PRIMARY,["Incomplete client brief","Source data arrives late","Reference files inconsistent","Requirements change mid-task"]],
   ["Measurement",ACCENT,["Error categories not standardised","Auditor judgement varies","No error log captured at source","Error severity not defined"]],
   ["Environment",SECONDARY,["Deadline pressure near delivery","Several projects run in parallel","Frequent interruptions","Remote handoffs between teams"]]];

  top.forEach(([t,c,causes],i)=>{
    const cx=2.95+i*2.90;
    s.addShape("line",{x:cx,y:1.80,w:0.5,h:spineY-1.80,line:{color:c,width:2},flipH:true});
    s.addShape("roundRect",{x:cx-0.80,y:1.44,w:2.1,h:0.34,rectRadius:0.05,fill:{color:c},line:{type:"none"}});
    s.addText(t,{x:cx-0.80,y:1.44,w:2.1,h:0.34,fontFace:FB,fontSize:10.5,bold:true,color:WHITE,align:"center",valign:"middle"});
    s.addText(causes.map(t2=>({text:t2,options:{breakLine:true,paraSpaceAfter:3}})),
     {x:cx-2.30,y:1.92,w:2.25,h:1.9,fontFace:FB,fontSize:8.6,color:TEXT_MUTED,align:"right",valign:"middle",lineSpacing:11});
  });
  bot.forEach(([t,c,causes],i)=>{
    const cx=2.50+i*2.90;
    s.addShape("line",{x:cx,y:spineY,w:0.5,h:6.28-spineY,line:{color:c,width:2}});
    s.addShape("roundRect",{x:cx-0.55,y:6.28,w:2.1,h:0.34,rectRadius:0.05,fill:{color:c},line:{type:"none"}});
    s.addText(t,{x:cx-0.55,y:6.28,w:2.1,h:0.34,fontFace:FB,fontSize:10.5,bold:true,color:WHITE,align:"center",valign:"middle"});
    s.addText(causes.map(t2=>({text:t2,options:{breakLine:true,paraSpaceAfter:3}})),
     {x:cx+0.60,y:4.80,w:2.3,h:1.4,fontFace:FB,fontSize:8.6,color:TEXT_MUTED,align:"left",valign:"middle",lineSpacing:11});
  });
  s.addText([{text:"\u2605",options:{bold:true,color:ACCENT}},
   {text:" = linked to one of the top three error types in the Pareto (data entry, formatting, missing reference). These are carried into Improve; the rest remain hypotheses to confirm with data.",options:{color:TEXT_MUTED}}],
   {x:0.6,y:6.74,w:12.1,h:0.28,fontFace:FB,fontSize:9.5});
  footer(s,9);
}

/* ---------- S7 PRIMARY TOOL: PARETO ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
head(s,"Analyze Phase","Primary Tool — Pareto Chart of Error Types");
s.addText("Breaking \"Total Errors\" into categories shows that a small number of error types cause most of the volume. Illustrative split of the 150 errors.",
 {x:0.6,y:1.45,w:12.1,h:0.4,fontFace:FB,fontSize:12.5,italic:true,color:TEXT_MUTED});

const cats=["Data entry\nmistake","Formatting /\nstyle","Missing\nreference","Incorrect\ncalculation","Version\nmismatch","Other"];
const vals=[48,36,25,18,14,9];
const cum=[];let run=0;const tot=vals.reduce((a,b)=>a+b,0);
vals.forEach(v=>{run+=v;cum.push(+(run/tot*100).toFixed(1));});

s.addChart([
 {type:pres.ChartType.bar,
  data:[{name:"Error count",labels:cats,values:vals}],
  options:{chartColors:[PRIMARY],barGapWidthPct:45,
   showValue:true,dataLabelColor:WHITE,dataLabelFontSize:10,dataLabelPosition:"inEnd"}},
 {type:pres.ChartType.line,
  data:[{name:"Cumulative %",labels:cats,values:cum}],
  options:{chartColors:[ACCENT],secondaryValAxis:true,secondaryCatAxis:true,
   lineSize:2.5,lineDataSymbolSize:7,showValue:false}}
],{
 x:0.6,y:2.0,w:8.4,h:4.3,
 showLegend:false,showTitle:false,
 valAxes:[
  {valAxisTitle:"Number of errors",showValAxisTitle:true,valAxisTitleColor:TEXT_MUTED,valAxisTitleFontSize:10,
   valAxisLabelColor:TEXT_MUTED,valAxisLabelFontSize:10,valGridLine:{color:LINE,size:1}},
  {valAxisTitle:"Cumulative %",showValAxisTitle:true,valAxisTitleColor:ACCENT,valAxisTitleFontSize:10,
   valAxisMaxVal:100,valAxisMinVal:0,valAxisLabelColor:ACCENT,valAxisLabelFontSize:10,
   valGridLine:{style:"none"},valAxisMajorUnit:20}],
 catAxes:[
  {catAxisLabelColor:TEXT_DARK,catAxisLabelFontSize:9.5,catGridLine:{style:"none"}},
  {catAxisHidden:true}]
});

s.addShape("roundRect",{x:9.25,y:2.0,w:3.48,h:4.3,rectRadius:0.09,fill:{color:LIGHTBG},line:{type:"none"}});
s.addText("What the Pareto tells us",{x:9.5,y:2.18,w:3,h:0.32,fontFace:FH,fontSize:13.5,bold:true,color:PRIMARY});
s.addText([
 {text:"The vital few\n",options:{bold:true,fontSize:11.5,color:ACCENT,breakLine:true}},
 {text:"Data entry mistakes and formatting issues alone cause about 56% of all errors.\n\n",options:{fontSize:10.8,color:TEXT_DARK,breakLine:true}},
 {text:"Where to focus\n",options:{bold:true,fontSize:11.5,color:ACCENT,breakLine:true}},
 {text:"Fixing the top three categories removes roughly 73% of total error volume — far more return than spreading effort across all six.\n\n",options:{fontSize:10.8,color:TEXT_DARK,breakLine:true}},
 {text:"Next step\n",options:{bold:true,fontSize:11.5,color:ACCENT,breakLine:true}},
 {text:"Run Fishbone and 5-Why on the top two only, then design poka-yoke controls against those root causes.",options:{fontSize:10.8,color:TEXT_DARK}}
],{x:9.5,y:2.58,w:3,h:3.55,fontFace:FB,lineSpacing:14,valign:"top"});
footer(s,10);
}

/* ---------- S8 MSA ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
head(s,"Measure Phase","Validating the Data — Attribute Agreement Analysis");
s.addText("Before trusting any error count, we must prove that auditors judge \"error vs no error\" consistently. With attribute data this replaces Gage R&R.",
 {x:0.6,y:1.45,w:12.1,h:0.4,fontFace:FB,fontSize:12.5,italic:true,color:TEXT_MUTED});

const steps=[
 ["usercheck","Repeatability","Does the same auditor give the same verdict on the same unit twice?"],
 ["balance","Reproducibility","Do different auditors reach the same verdict on the same unit?"],
 ["checkcircle","Accuracy vs Standard","Do auditor verdicts match a known master/expert standard?"]];
const cw=3.95,gap=0.22;
steps.forEach((c,i)=>{
 const x=0.6+i*(cw+gap),y=2.0,ch=1.95;
 s.addShape("roundRect",{x,y,w:cw,h:ch,rectRadius:0.09,fill:{color:i%2===0?PRIMARY:SECONDARY},line:{type:"none"}});
 iconCircle(s,c[0],x+0.25,y+0.3,0.65,WHITE);
 s.addText(c[1],{x:x+1.05,y:y+0.32,w:cw-1.25,h:0.6,fontFace:FB,fontSize:14,bold:true,color:WHITE,valign:"middle"});
 s.addText(c[2],{x:x+0.28,y:y+1.0,w:cw-0.56,h:0.8,fontFace:FB,fontSize:11.3,color:"EAF1F8",lineSpacing:15});
});

s.addText("Interpreting Cohen's / Fleiss' Kappa",{x:0.6,y:4.2,w:8,h:0.4,fontFace:FH,fontSize:16,bold:true,color:TEXT_DARK});
const kappa=[["Kappa > 0.90","Excellent — measurement system is trustworthy",GREEN],
 ["0.70 – 0.90","Acceptable — minor auditor training recommended","B8860B"],
 ["Kappa < 0.70","Unacceptable — fix the audit definition before analysing any data",RED]];
kappa.forEach((k,i)=>{
 const y=4.7+i*0.58;
 s.addShape("roundRect",{x:0.6,y,w:2.5,h:0.45,rectRadius:0.05,fill:{color:k[2]},line:{type:"none"}});
 s.addText(k[0],{x:0.6,y,w:2.5,h:0.45,fontFace:FB,fontSize:12,bold:true,color:WHITE,align:"center",valign:"middle"});
 s.addText(k[1],{x:3.3,y,w:9.3,h:0.45,fontFace:FB,fontSize:12.5,color:TEXT_DARK,valign:"middle"});
});
s.addText("Why it matters: if auditors disagree on what counts as an error, a falling error count may only mean looser auditing — not genuine improvement.",
 {x:0.6,y:6.5,w:12.1,h:0.4,fontFace:FB,fontSize:12,italic:true,color:TEXT_MUTED});
footer(s,11);
}

/* ---------- S9 STAT TESTS ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
head(s,"Analyze Phase","Statistical Tests for Attribute Data");
s.addText("Because the response variable is a count/proportion rather than a measurement, the usual t-test and ANOVA do not apply.",
 {x:0.6,y:1.45,w:12.1,h:0.35,fontFace:FB,fontSize:12.5,italic:true,color:TEXT_MUTED});

const hy=1.95,colX=[0.6,4.0,8.0],colW=[3.4,4.0,4.75];
s.addShape("rect",{x:0.6,y:hy,w:12.15,h:0.48,fill:{color:PRIMARY},line:{type:"none"}});
["Test","Question It Answers","Application at SKARR"].forEach((h,i)=>
 s.addText(h,{x:colX[i],y:hy,w:colW[i]-0.12,h:0.48,fontFace:FB,fontSize:12.5,bold:true,color:WHITE,valign:"middle"}));
const rows=[
 ["Chi-Square Test of Independence","Is error rate related to a category variable?","Do error rates differ by service line, team, client, or shift?"],
 ["2-Proportion Test","Are two defect proportions genuinely different?","Did % defective really drop after the improvement pilot?"],
 ["Poisson Rate Test","Are two defect rates (DPU) different?","Is this month's errors-per-unit different from baseline?"],
 ["Binary Logistic Regression","Which factors predict the chance of an error?","Which combination of workload, complexity and reviewer drives errors?"]];
let y=hy+0.48;
rows.forEach((r,i)=>{
 const rh=0.95;
 if(i%2===1)s.addShape("rect",{x:0.6,y,w:12.15,h:rh,fill:{color:LIGHTBG},line:{type:"none"}});
 s.addText(r[0],{x:colX[0],y:y+0.05,w:colW[0]-0.12,h:rh-0.1,fontFace:FB,fontSize:12,bold:true,color:PRIMARY,valign:"middle"});
 s.addText(r[1],{x:colX[1],y:y+0.05,w:colW[1]-0.12,h:rh-0.1,fontFace:FB,fontSize:11.5,color:TEXT_DARK,valign:"middle",lineSpacing:14});
 s.addText(r[2],{x:colX[2],y:y+0.05,w:colW[2]-0.12,h:rh-0.1,fontFace:FB,fontSize:11.5,color:TEXT_MUTED,valign:"middle",lineSpacing:14});
 y+=rh;
});
s.addText("Decision rule for all four: p-value < 0.05 means the difference is statistically significant, not random variation.",
 {x:0.6,y:y+0.2,w:12.1,h:0.4,fontFace:FB,fontSize:12.5,italic:true,bold:true,color:ACCENT});
footer(s,12);
}

/* ---------- S10 ERROR -> DELAY LINK ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
head(s,"The Core Link","How Errors Create Delay");
s.addText("Errors and turnaround time are not two separate problems — errors are a direct cause of delay through the rework loop.",
 {x:0.6,y:1.45,w:12.1,h:0.35,fontFace:FB,fontSize:12.5,italic:true,color:TEXT_MUTED});

const flow=[["Work produced",PRIMARY],["Review / QC",SECONDARY],["Error found",RED],["Rework",ACCENT],["Re-review",SECONDARY],["Delivery",GREEN]];
const bw=1.82,gap=0.28,total=flow.length*bw+(flow.length-1)*gap,sx=(PGW-total)/2,fy=2.1,fh=0.85;
flow.forEach((f,i)=>{
 const x=sx+i*(bw+gap);
 s.addShape("roundRect",{x,y:fy,w:bw,h:fh,rectRadius:0.07,fill:{color:f[1]},line:{type:"none"}});
 s.addText(f[0],{x:x+0.05,y:fy,w:bw-0.1,h:fh,fontFace:FB,fontSize:12,bold:true,color:WHITE,align:"center",valign:"middle"});
 if(i<flow.length-1)s.addText("→",{x:x+bw,y:fy+fh/2-0.3,w:gap,h:0.6,fontFace:FB,fontSize:20,bold:true,color:TEXT_MUTED,align:"center",valign:"middle"});
});
s.addShape("line",{x:sx+2*bw+2*gap+bw/2,y:fy+fh,w:0,h:0.45,line:{color:RED,width:2,dashType:"dash"}});
s.addShape("line",{x:sx+bw/2,y:fy+fh+0.45,w:2*(bw+gap),h:0,line:{color:RED,width:2,dashType:"dash"}});
s.addShape("line",{x:sx+bw/2,y:fy+fh,w:0,h:0.45,line:{color:RED,width:2,dashType:"dash"}});
s.addText("Rework loop — every error sends work backwards and adds cycle time",
 {x:5.85,y:3.12,w:7.0,h:0.35,fontFace:FB,fontSize:11.5,italic:true,bold:true,color:RED,valign:"middle"});

s.addShape("roundRect",{x:0.6,y:3.78,w:12.1,h:0.92,rectRadius:0.08,fill:{color:NAVY},line:{type:"none"}});
s.addText("Total TAT  =  Processing time  +  ( Rework loops × Rework cycle time )  +  Queue / waiting time",
 {x:0.75,y:3.78,w:11.8,h:0.92,fontFace:FH,fontSize:16,bold:true,color:WHITE,align:"center",valign:"middle"});

s.addText("Three compounding effects",{x:0.6,y:4.95,w:8,h:0.4,fontFace:FH,fontSize:16,bold:true,color:TEXT_DARK});
const eff=[
 ["redo","Direct rework time","Every defective unit is handled at least twice — doubling touch time on that unit"],
 ["clock","Queue inflation","Reworked items re-enter the queue, pushing back every other job behind them (Little's Law)"],
 ["exclamation","Escalation cost","Errors caught late by the client cost far more time than errors caught at the first review"]];
const ew=3.95,eg=0.22;
eff.forEach((e,i)=>{
 const x=0.6+i*(ew+eg),y=5.45;
 s.addShape("roundRect",{x,y,w:ew,h:1.4,rectRadius:0.08,fill:{color:LIGHTBG},line:{type:"none"}});
 iconCircle(s,e[0],x+0.22,y+0.25,0.55,i===0?PRIMARY:(i===1?SECONDARY:ACCENT));
 s.addText(e[1],{x:x+0.92,y:y+0.22,w:ew-1.1,h:0.3,fontFace:FB,fontSize:12.5,bold:true,color:TEXT_DARK});
 s.addText(e[2],{x:x+0.25,y:y+0.6,w:ew-0.5,h:0.72,fontFace:FB,fontSize:10.8,color:TEXT_MUTED,lineSpacing:14});
});
footer(s,13);
}

/* ---------- S11 HOW TO REDUCE DELAY ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
head(s,"Improve Phase","How to Reduce Errors — and Therefore Delay");

const items=[
 ["shield","Poka-Yoke (Mistake Proofing)","Build validation into the tool itself — mandatory fields, dropdown lists instead of free text, automated format and reference checks. Prevents the top Pareto categories at source.",PRIMARY],
 ["clipboard","Standard Work & Checklists","One documented method per task with a pre-delivery checklist, so output does not depend on who does the work.",SECONDARY],
 ["filter","Shift Quality Upstream","Move checks earlier in the flow. An error caught at step 2 costs minutes; the same error caught by the client costs days.",ACCENT],
 ["sitemap","Reduce Handoffs","Every handoff adds a queue and a chance of misunderstanding. Fewer, clearer transitions mean fewer errors and less waiting.",PRIMARY],
 ["usercheck","Targeted Training","Use the Attribute Agreement and Pareto findings to train on the specific error types that matter, not generic quality training.",SECONDARY],
 ["chartline","Visual Control & Feedback","A live error dashboard with u-chart and p-chart gives teams same-day feedback instead of month-end surprises.",ACCENT]];

const cw=3.95,ch=1.95,gx=0.22,gy=0.2;
items.forEach((it,i)=>{
 const col=i%3,row=Math.floor(i/3);
 const x=0.6+col*(cw+gx),y=1.6+row*(ch+gy);
 s.addShape("roundRect",{x,y,w:cw,h:ch,rectRadius:0.08,fill:{color:WHITE},line:{color:LINE,width:1}});
 iconCircle(s,it[0],x+0.22,y+0.22,0.6,it[3]);
 s.addText(it[1],{x:x+0.92,y:y+0.22,w:cw-1.1,h:0.6,fontFace:FB,fontSize:12.5,bold:true,color:TEXT_DARK,valign:"middle"});
 s.addText(it[2],{x:x+0.25,y:y+0.9,w:cw-0.5,h:0.95,fontFace:FB,fontSize:10.8,color:TEXT_MUTED,lineSpacing:14});
});

s.addShape("roundRect",{x:0.6,y:5.85,w:12.1,h:1.0,rectRadius:0.08,fill:{color:PRIMARY},line:{type:"none"}});
iconCircle(s,"bolt",0.9,6.05,0.6,ACCENT);
s.addText("The chain: fewer errors  →  fewer rework loops  →  shorter queues  →  lower and more predictable turnaround time. Error reduction is the lever; delay reduction is the result.",
 {x:1.75,y:5.9,w:10.75,h:0.9,fontFace:FB,fontSize:13,bold:true,color:WHITE,valign:"middle",lineSpacing:18});
footer(s,14);
}

/* ---------- S12 CONTROL ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
head(s,"Control Phase","Sustaining the Gains");

s.addText("Tracking metrics",{x:0.6,y:1.55,w:5.9,h:0.4,fontFace:FH,fontSize:16,bold:true,color:TEXT_DARK});
const kpis=[["DPU","Defects per unit — primary error metric","u-chart"],
 ["% Defective","Share of units with any error","p-chart"],
 ["First Time Right","% delivered with zero rework","Run chart"],
 ["Average TAT","Turnaround time per request","X-bar/R chart"]];
const hy=2.0,cX=[0.65,2.3,5.1],cW=[1.6,2.8,1.5];
s.addShape("rect",{x:0.6,y:hy,w:5.95,h:0.42,fill:{color:PRIMARY},line:{type:"none"}});
["Metric","What it tells us","Chart"].forEach((h,i)=>
 s.addText(h,{x:cX[i],y:hy,w:cW[i],h:0.42,fontFace:FB,fontSize:11.5,bold:true,color:WHITE,valign:"middle"}));
let yy=hy+0.42;
kpis.forEach((k,i)=>{
 const rh=0.62;
 if(i%2===1)s.addShape("rect",{x:0.6,y:yy,w:5.95,h:rh,fill:{color:LIGHTBG},line:{type:"none"}});
 s.addText(k[0],{x:cX[0],y:yy,w:cW[0],h:rh,fontFace:FB,fontSize:11.5,bold:true,color:TEXT_DARK,valign:"middle"});
 s.addText(k[1],{x:cX[1],y:yy,w:cW[1],h:rh,fontFace:FB,fontSize:10.8,color:TEXT_MUTED,valign:"middle",lineSpacing:13});
 s.addText(k[2],{x:cX[2],y:yy,w:cW[2],h:rh,fontFace:FB,fontSize:11,bold:true,color:SECONDARY,valign:"middle"});
 yy+=rh;
});

s.addShape("roundRect",{x:6.8,y:1.55,w:5.93,h:3.4,rectRadius:0.08,fill:{color:LIGHTBG},line:{type:"none"}});
s.addText("Reading the u-chart",{x:7.1,y:1.75,w:5.3,h:0.35,fontFace:FH,fontSize:15,bold:true,color:PRIMARY});
s.addText([
 {text:"Centre line (CL) = ū  ",options:{bold:true,color:TEXT_DARK}},
 {text:"— the average defects per unit across all periods.\n\n",options:{color:TEXT_MUTED,breakLine:true}},
 {text:"Control limits = ū ± 3√(ū/n)  ",options:{bold:true,color:TEXT_DARK}},
 {text:"— limits recalculate each period because sample size n varies.\n\n",options:{color:TEXT_MUTED,breakLine:true}},
 {text:"In control  ",options:{bold:true,color:GREEN}},
 {text:"— points inside limits, random pattern: only common-cause variation, so improve the whole process.\n\n",options:{color:TEXT_MUTED,breakLine:true}},
 {text:"Out of control  ",options:{bold:true,color:RED}},
 {text:"— point beyond a limit, 7-point run, or trend: a special cause exists, so investigate that specific period.",options:{color:TEXT_MUTED}}
],{x:7.1,y:2.2,w:5.3,h:2.6,fontFace:FB,fontSize:11.3,lineSpacing:15});

s.addText("Control plan elements",{x:0.6,y:5.15,w:8,h:0.4,fontFace:FH,fontSize:16,bold:true,color:TEXT_DARK});
const cp=["Weekly audit cadence with a fixed sample size where possible",
 "Documented response plan for any out-of-control signal",
 "Updated SOPs and checklists with version control",
 "Quarterly re-run of Attribute Agreement Analysis to keep auditing consistent"];
const pw=5.9;
cp.forEach((t,i)=>{
 const col=i%2,row=Math.floor(i/2);
 const x=0.6+col*(pw+0.33),y=5.6+row*0.62;
 s.addShape("roundRect",{x,y,w:pw,h:0.52,rectRadius:0.05,fill:{color:WHITE},line:{color:LINE,width:1}});
 iconCircle(s,"checkcircle",x+0.12,y+0.09,0.34,GREEN);
 s.addText(t,{x:x+0.58,y,w:pw-0.7,h:0.52,fontFace:FB,fontSize:11,color:TEXT_DARK,valign:"middle",lineSpacing:13});
});
footer(s,15);
}

/* ---------- S13 SUMMARY ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
head(s,"Summary","Answering the Three Questions");

const qa=[
 ["1","What type of data is this?","Attribute (discrete / count) data.",
  "All three fields are counts of whole items — units audited, units in error, and errors found. There is no continuous measurement scale, so the data follows Binomial and Poisson behaviour, not Normal."],
 ["2","Which DMAIC tool should we use?","u-chart in Measure & Control; Pareto chart in Analyze.",
  "Total Errors counts defects (several possible per unit) and audit volume varies, so the u-chart is the correct control chart — supported by a p-chart for % defective. Attribute Agreement Analysis validates the data first, and Chi-Square / 2-Proportion tests replace the t-test."],
 ["3","How do we reduce the delay?","Attack errors at source to collapse the rework loop.",
  "Use the Pareto to target the vital few error types, then apply poka-yoke, standard work and upstream checks against them. Fewer errors means fewer rework loops and shorter queues, which cuts turnaround time directly."]];

let y=1.6;
qa.forEach((q,i)=>{
 const h=1.62;
 s.addShape("roundRect",{x:0.6,y,w:12.1,h,rectRadius:0.08,fill:{color:i%2===0?LIGHTBG:WHITE},line:{color:i%2===0?"none":LINE,width:1,type:i%2===0?"none":"solid"}});
 s.addShape("ellipse",{x:0.85,y:y+0.28,w:0.6,h:0.6,fill:{color:[PRIMARY,SECONDARY,ACCENT][i]},line:{type:"none"}});
 s.addText(q[0],{x:0.85,y:y+0.28,w:0.6,h:0.6,fontFace:FH,fontSize:20,bold:true,color:WHITE,align:"center",valign:"middle"});
 s.addText(q[1],{x:1.65,y:y+0.14,w:10.8,h:0.32,fontFace:FB,fontSize:12,bold:true,color:TEXT_MUTED});
 s.addText(q[2],{x:1.65,y:y+0.44,w:10.8,h:0.38,fontFace:FH,fontSize:16,bold:true,color:[PRIMARY,SECONDARY,ACCENT][i]});
 s.addText(q[3],{x:1.65,y:y+0.85,w:10.8,h:0.68,fontFace:FB,fontSize:11.5,color:TEXT_DARK,lineSpacing:15});
 y+=h+0.14;
});
footer(s,16);
}

/* ---------- S14 THANK YOU ---------- */
{
const s=pres.addSlide({masterName:"PLAIN"});
s.background={color:NAVY};
s.addShape("ellipse",{x:-1.5,y:-1.8,w:5,h:5,fill:{color:PRIMARY,transparency:40},line:{type:"none"}});
s.addShape("ellipse",{x:11.8,y:4.6,w:3.6,h:3.6,fill:{color:SECONDARY,transparency:55},line:{type:"none"}});
s.addText("Thank You",{x:0,y:2.9,w:PGW,h:1.0,fontFace:FH,fontSize:44,bold:true,color:WHITE,align:"center"});
s.addText("Questions & Discussion",{x:0,y:3.85,w:PGW,h:0.5,fontFace:FB,fontSize:16,italic:true,color:"C9D6E3",align:"center"});
footer(s,17);
}

pres.writeFile({fileName:"SKARR_Dataset_DMAIC.pptx"}).then(()=>console.log("built"));
