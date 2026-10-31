const fs=require("fs");
const {Document,Packer,Paragraph,TextRun,AlignmentType,Table,TableRow,TableCell,
WidthType,BorderStyle,ShadingType,ImageRun,HeadingLevel}=require("docx");

const TNR="Times New Roman";
const CW=7405;                     // content width in DXA
const pngSize=b=>({w:b.readUInt32BE(16),h:b.readUInt32BE(20)});

// ---------- helpers ----------
const run=(t,o={})=>new TextRun({text:t,font:TNR,size:(o.sz||10)*2,bold:!!o.b,italics:!!o.i,
  superScript:!!o.sup,color:o.color||"000000"});
const P=(t,o={})=>new Paragraph({children:Array.isArray(t)?t:[run(t,o)],
  alignment:o.al||AlignmentType.JUSTIFIED,spacing:{after:o.after===undefined?120:o.after,line:o.line||240}});
const H=(t,o={})=>P(t,{b:true,sz:o.sz||10,after:o.after===undefined?100:o.after});
const BL=(t)=>new Paragraph({children:[run(t)],alignment:AlignmentType.JUSTIFIED,
  bullet:{level:0},spacing:{after:80,line:240}});
const CAP=(t)=>new Paragraph({children:[run(t,{sz:9,b:true})],alignment:AlignmentType.LEFT,
  spacing:{before:100,after:100,line:240}});
const CAPC=(t)=>new Paragraph({children:[run(t,{sz:9,b:true})],alignment:AlignmentType.CENTER,
  spacing:{before:100,after:160,line:240}});

function cell(txt,w,{b=false,head=false,al=AlignmentType.LEFT}={}){
  return new TableCell({width:{size:w,type:WidthType.DXA},
    shading:head?{type:ShadingType.CLEAR,fill:"DCE4F0"}:undefined,
    margins:{top:40,bottom:40,left:80,right:80},
    children:[new Paragraph({children:[run(String(txt),{sz:9,b:b||head})],alignment:al,
      spacing:{after:0,line:230}})]});
}
function TBL(headers,rows,widths){
  const tot=widths.reduce((a,b)=>a+b,0);
  const ws=widths.map(w=>Math.round(w/tot*CW));
  const trs=[new TableRow({tableHeader:true,
    children:headers.map((h,i)=>cell(h,ws[i],{head:true}))})];
  rows.forEach(r=>trs.push(new TableRow({children:r.map((c,i)=>cell(c,ws[i]))})));
  return new Table({columnWidths:ws,width:{size:CW,type:WidthType.DXA},rows:trs,
    borders:{top:{style:BorderStyle.SINGLE,size:4,color:"7F7F7F"},
             bottom:{style:BorderStyle.SINGLE,size:4,color:"7F7F7F"},
             left:{style:BorderStyle.SINGLE,size:4,color:"7F7F7F"},
             right:{style:BorderStyle.SINGLE,size:4,color:"7F7F7F"},
             insideHorizontal:{style:BorderStyle.SINGLE,size:2,color:"BFBFBF"},
             insideVertical:{style:BorderStyle.SINGLE,size:2,color:"BFBFBF"}}});
}
function FIG(file,maxW=470){
  const buf=fs.readFileSync(file); const{w,h}=pngSize(buf);
  const W=Math.min(maxW,w), Hh=Math.round(h*(W/w));
  return new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:140,after:60},
    children:[new ImageRun({data:buf,type:"png",transformation:{width:W,height:Hh}})]});
}

const K=[];   // document children

// ================= TITLE / AUTHORS / ABSTRACT =================
K.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:200,line:260},
  children:[run("An Application of the DMAIC Framework to Service Delivery in a Business Consulting Firm – A Case Study",{sz:14,b:true})]}));
K.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:140},children:[
  run("S Rohit"),run("1",{sup:true}),run(", [Co-author]"),run("1",{sup:true}),
  run(", [Co-author]"),run("1",{sup:true}),run(", [Guide Name]"),run("2*",{sup:true})]}));
[["1","School of Computer Science and Engineering, Vellore Institute of Technology, Chennai Campus, Vandalur-Kelambakkam Road, Chennai – 600127, India."],
 ["2","Operations Division, VIT Business School, Vellore Institute of Technology, Chennai Campus, Vandalur-Kelambakkam Road, Chennai – 600127, India."]]
 .forEach(([n,a])=>K.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:60},
   children:[run(n,{sup:true}),run(" "+a)]})));
K.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:200},
  children:[run("* Corresponding author")]}));

K.push(P([run("Abstract: ",{b:true}),
 run("Professional service firms face a distinctive difficulty: their output is intangible, its defects are discrete and judgemental rather than dimensional, and the cost of those defects appears as rework and delayed delivery rather than scrapped material. This paper applies the Lean Six Sigma DMAIC framework to the service delivery process of SKARR Business Solutions, a Chennai-based consulting firm in digital publishing, data analytics and web development. An internal audit of 1,200 delivered work units recorded 96 defective units and 150 errors. Treating this record as attribute data, the study established a baseline of 8.00 per cent defective units, a first-time yield of 92.00 per cent, 0.125 defects per unit and 12,500 defects per million opportunities, corresponding to a short-term process sigma of approximately 3.74. A current-state value stream map placed the lead time of a first-time-right unit at 9.0 days, of which only 5.5 days were value-adding, giving a process cycle efficiency of 61 per cent, while units entering the rework loop required 11.0 days. Pareto analysis showed that three error categories accounted for 72.7 per cent of all errors, and a six-category fishbone analysis traced these principally to unconstrained input tools, absent standard work and an unvalidated measurement system. The study proposes an error-proofing and standard-work intervention set, an attribute agreement analysis to repair the measurement system, and a control plan based on u-charts and p-charts selected on that basis. The analytical projection indicates a reduction to 7,958 defects per million opportunities and a sigma level of approximately 3.91.")]));
K.push(P([run("Keywords: ",{b:true}),
 run("Lean Six Sigma, DMAIC, service operations, attribute data, DPMO")]));

// ================= 1. INTRODUCTION =================
K.push(H("1. Introduction"));
K.push(P("Professional and knowledge-intensive service firms have become a significant component of industrial output and employment in emerging economies. Consulting organisations operating in digital publishing, analytics and web development occupy a position between traditional back-office outsourcing and higher-value advisory work, and they compete simultaneously on turnaround time, accuracy and cost. At the same time these firms carry an operational burden that manufacturing does not: the unit of output is a document, a dataset or a deliverable whose quality is judged against a client specification rather than against a physical tolerance. A defect is therefore a matter of classification, not of measurement, and it is frequently discovered only at an internal review stage or, worse, by the client."));
K.push(P("Lean Six Sigma has an extensive record of application in manufacturing, where its diagnostic vocabulary of defects, cycle time, variation and waste maps naturally onto a physical production line. Its migration into service contexts is more recent and considerably less uniform. Where it has been applied to services, the published work concentrates on healthcare, banking and logistics, and the analytical treatment often borrows measurement assumptions from manufacturing without adjusting for the fact that service quality data is predominantly discrete. The practical consequence is that service firms attempting Lean Six Sigma frequently select statistical tools designed for continuous data, apply them to counts of defects, and draw conclusions that the underlying distribution does not support."));
K.push(P("In spite of this accumulating literature, a significant gap remains. Much of the available work is either general guidance on service improvement or a single-tool application, such as a Pareto study or a value stream map presented in isolation. Comparatively few studies set out an integrated diagnostic sequence for a professional service firm in which the data type is explicitly identified, the control charts are selected on that basis, the measurement system is itself validated before conclusions are drawn, and the resulting error reduction is then connected quantitatively to delivery lead time. This study addresses that gap through a case-based application in a consulting firm."));

K.push(H("1.1 Research Gap and Significance of the Study"));
K.push(P("The research has implications for both industrial practice and the academic literature. From an industry standpoint, consulting firms of small and medium size operate with thin margins and limited analytical capacity, and are rarely in a position to commission formal quality engineering. A worked case that proceeds from three ordinary audit fields — units audited, units in error and total errors — to a defensible sigma level, a prioritised cause structure and a control plan is directly transferable to firms of this scale. From an academic standpoint, the study contributes a service-sector application in which the attribute nature of the data is treated as a first-order methodological constraint rather than as an afterthought, and in which the link between defect reduction and lead-time reduction is made explicit through the rework loop."));

K.push(H("1.2 Objectives of the Study"));
K.push(P("The study is guided by the following objectives:"));
["To establish a measurable baseline of quality performance for the service delivery process using the existing internal audit record, expressed in terms of percentage defective, first-time yield, defects per unit and defects per million opportunities.",
 "To determine the correct family of statistical and control tools for the data actually collected, by classifying it explicitly as attribute rather than variable data.",
 "To identify the dominant error categories and the process stages at which non-value-adding time accumulates, using Pareto analysis and value stream mapping.",
 "To trace the recorded errors to underlying causes through a structured fishbone analysis, and to assess whether the measurement system itself is sound enough to support those conclusions.",
 "To design an improvement set and a control plan appropriate to a resource-constrained professional service firm, and to project the resulting gain in process capability."]
 .forEach(t=>K.push(BL(t)));

K.push(H("1.3 Theoretical Foundation"));
K.push(P("This paper rests on the combination of four mutually supplementary theoretical approaches, namely Lean Thinking, Six Sigma, attribute-based quality measurement, and the Continuous Improvement philosophy."));
K.push(H("1.3.1 Lean Thinking"));
K.push(P("The first pillar is Lean Thinking, which directs attention to the identification and removal of non-value-adding activity. In the service context examined here, waste is not scrap or excess inventory but waiting between stages, duplicated effort when a deliverable is returned for correction, and the handling cost of work that circulates between reviewers. Value stream mapping provides the instrument through which this waste is made visible, by separating the time during which the deliverable is actually being advanced from the time during which it is merely waiting."));
K.push(H("1.3.2 Six Sigma"));
K.push(P("The second pillar is Six Sigma, which concerns the reduction of variation and the statistical control of process capability. Whereas Lean addresses the efficiency of flow, Six Sigma addresses the consistency of the output. Its contribution to the present study is twofold: it supplies the defect-rate metrics through which an informal audit record becomes a capability statement, and it supplies the DMAIC sequence through which diagnosis proceeds in a disciplined order rather than by intuition."));
K.push(H("1.3.3 Attribute-Based Quality Measurement"));
K.push(P("The third foundation is the body of statistical quality control concerned specifically with attribute data. A delivered work unit in a consulting firm is judged either acceptable or not acceptable against the client specification, and the errors within it are counted rather than measured. Such data follows binomial behaviour when defective units are counted and Poisson behaviour when defects are counted, and it therefore requires the p, np, c and u family of control charts rather than the variables charts used for dimensional data. This distinction determines the entire analytical apparatus of the study and is treated in the methodology as a formal selection step."));
K.push(H("1.3.4 Continuous Improvement Philosophy"));
K.push(P("The fourth pillar is Continuous Improvement, associated with the Kaizen tradition. It contributes the expectation that improvement is incremental, evidence-based and sustained through routine rather than achieved by a single intervention. In a service firm where staff turnover and fluctuating project load continually erode standard practice, the control phase is not an administrative formality but the mechanism by which any gain survives."));
K.push(H("1.3.5 Integrated Theoretical Logic of the Study"));
K.push(P("The theoretical value of the research lies in the integration of these perspectives into a single improvement logic. Lean Thinking identifies where time is lost; Six Sigma quantifies how often the process fails and with what consistency; attribute-based measurement constrains which statistical statements may legitimately be made about that failure; and Continuous Improvement determines how the resulting gain is held. The rework loop is the junction at which the four meet, because every counted error is simultaneously a quality defect in the Six Sigma sense and a generator of non-value-adding time in the Lean sense."));

K.push(H("1.4 Contributions of the Study"));
K.push(P("This paper makes four contributions."));
["First, it adds to the literature on professional service operations by treating delivery inefficiency as an integrated operational problem rather than as a set of departmental complaints, and by demonstrating that an ordinary internal audit record is sufficient to support a formal capability analysis.",
 "Second, it strengthens the methodological transparency of service-sector Lean Six Sigma by making the data-type decision explicit. The study states why variables tools are inadmissible for the data in hand and derives the chart and test selection from that classification.",
 "Third, the research offers a practically applicable model for resource-constrained service environments. The integration of DPMO analysis, Pareto prioritisation, fishbone reasoning, attribute agreement analysis and value stream mapping requires no specialised instrumentation and can be executed with the records a firm already keeps.",
 "Lastly, the study connects quality improvement to delivery performance quantitatively rather than rhetorically, by expressing error reduction as a reduction in rework-loop days and therefore in lead time."]
 .forEach(t=>K.push(BL(t)));
K.push(P("The remainder of this paper is organised as follows. Section 2 reviews the literature and establishes the theoretical and empirical basis of the study. Section 3 presents the research methodology and the DMAIC-based analytical framework. Section 4 states the problem of the study. Section 5 reports the results and discusses their meaning. Section 6 sets out the implications, and Section 7 concludes with limitations and directions for future work."));

// ================= 2. LITERATURE REVIEW =================
K.push(H("2. Literature review"));
K.push(P("The theoretical bases of this paper — Lean Thinking, Six Sigma, attribute-based quality measurement and Continuous Improvement — are well established in the literature. This section reviews the empirical work that connects them to service operations and identifies the gap the present study addresses."));

K.push(H("2.1 Lean Six Sigma in Services: Wider Theoretical and Empirical Introduction"));
K.push(P("The broader improvement literature consistently demonstrates that Lean Six Sigma delivers measurable operational benefit, although the bulk of the evidence originates in manufacturing. Albliwi, Antony and Lim (2015) provide a systematic review of Lean Six Sigma in manufacturing and report consistent gains in defect reduction and cycle time, while also noting that implementation quality varies widely with organisational context. Sordan et al. (2020) reach a comparable conclusion through bibliometric analysis, observing that the field has matured methodologically but remains concentrated in production settings. Yadav, Mathiyazhagan and Kumar (2019), reviewing 2,461 publications, conclude that no single validated implementation framework exists and that the literature continues to call for empirical models of how a continuous-improvement culture is actually created."));
K.push(P("Within services specifically, Antony (2006) set out early the argument that Six Sigma is applicable to transactional processes, provided the definition of a defect is operationalised with care. George (2003) extended the Lean vocabulary to service settings, drawing attention to the dominance of waiting time over processing time in most service value streams. Caiado, Nascimento and Quelhas (2017), reviewing Lean and Lean Six Sigma in the service industry, document a rapid expansion of service applications and link them to efficiency, quality and sustainability outcomes."));

K.push(H("2.2 Critical Success Factors, Organisational Readiness and Human Dimensions"));
K.push(P("A second stream of literature establishes that successful implementation depends on organisational and behavioural conditions as much as on analytical technique. Stankalla, Koval and Chromjakova (2018) review the critical success factors for Lean Six Sigma in small and medium enterprises and identify management commitment, training and the availability of reliable data as recurring determinants. Shokri, Waring and Nabhani (2016) examine the readiness of personnel in manufacturing SMEs to undertake Lean Six Sigma projects and make clear that analytical sophistication is of limited value where the workforce lacks the measurement discipline to sustain it. Achibat et al. (2023) report that firms combining Lean and Six Sigma practices achieve stronger performance outcomes than those adopting either in isolation. Kumar et al. (2024), in a recent systematic review, reinforce the finding that data availability and leadership continuity are the principal constraints on sustained benefit."));
K.push(P("These findings are directly relevant to the present case. The firm studied here is a small professional services organisation in which the measurement system, rather than the analytical capability, proved to be the binding constraint."));

K.push(H("2.3 DMAIC in Transactional and Turnaround-Time-Driven Processes"));
K.push(P("A third stream demonstrates that the DMAIC sequence transfers successfully to non-manufacturing processes. Wartati et al. (2021) apply DMAIC to the sales process of a technology start-up and report a measurable reduction in customer waiting time, explicitly noting that the novelty of their contribution lies in the application of Six Sigma to a transactional rather than a production process. Abboodi (2014) integrates the SERVQUAL gap model with the DMAIC structure in computer-service companies, arguing that the two frameworks are complementary because SERVQUAL identifies the dimension on which the customer perceives failure while DMAIC supplies the mechanism for tracing it to a cause. Sancho, Rezusta and Acero (2025) review Lean Six Sigma implementation in clinical microbiology laboratories and note that turnaround time is the dominant key performance indicator in such settings, while cautioning that indicator definitions are frequently inconsistent between studies."));
K.push(P("Linderman et al. (2003) provide the theoretical underpinning for why the structured sequence matters, framing Six Sigma through goal-setting theory, while Nonthaleerak and Hendry (2006) and Brady and Allen (2006) survey the field and identify the absence of rigorous measurement-system validation as a recurring methodological weakness."));

K.push(H("2.4 Research Gap"));
K.push(P("Despite the breadth of this literature, three gaps are evident. First, the service-sector applications that do exist seldom make the attribute nature of service quality data explicit, with the result that tool selection is frequently left implicit or is imported unchanged from manufacturing practice. Second, measurement-system validation is rarely reported for attribute data; where a gauge study would be mandatory in a dimensional setting, the equivalent attribute agreement analysis is commonly omitted, leaving open the possibility that an observed improvement reflects a change in inspection behaviour rather than in the process. Third, the connection between quality improvement and delivery speed is usually asserted rather than quantified, with few studies tracing error reduction through the rework loop to an explicit lead-time consequence."));

K.push(H("2.5 Positioning of the Present Study"));
K.push(P("The present study addresses these gaps by conducting an integrated, theory-driven Lean Six Sigma analysis in a professional service firm in which the data type is declared and justified, the measurement system is examined as a formal step within the Measure phase, and the error reduction achieved is converted into a lead-time effect through the rework loop. In doing so it responds directly to the call in Yadav et al. (2019) for context-specific implementation models and to the observation in Nonthaleerak and Hendry (2006) that measurement validation remains under-reported."));
K.push(P("The reviewed literature establishes the theoretical and empirical basis for the study and highlights the gap addressed by the present research. The next section presents the methodology adopted."));

// ================= 3. METHODOLOGY =================
K.push(H("3. Research methodology"));
K.push(H("3.1 Research Design and Study Setting"));
K.push(P("The research design adopted was a single-case, case-based Lean Six Sigma study, chosen because the objective was to understand how inefficiency and defect generation arise within one operational system in sufficient depth to design an intervention, rather than to test a hypothesis across a population of firms. The empirical setting was SKARR Business Solutions, a Chennai-based consulting organisation delivering digital publishing, data analytics, web development and e-commerce support to clients in financial services, e-commerce and logistics."));
K.push(P("The process under study was the firm's core service delivery workflow, extending from the receipt of a client request through scoping and assignment, production work, internal quality review and delivery to the client. Data was drawn from the firm's internal quality audit record, supplemented by process observation and discussion with the delivery manager. Table 1 summarises the research design, the data sources used and the analytical purpose each served."));
K.push(CAP("Table 1 Research design, data sources, and analytical use"));
K.push(TBL(["Design element","Data source","Analytical use"],[
 ["Process scope definition","Observation and discussion with the delivery manager","SIPOC boundary and process flow"],
 ["Quality performance record","Internal audit of 1,200 delivered work units","Percentage defective, FTY, DPU, DPMO, sigma level"],
 ["Error classification","Audit error log by category","Pareto prioritisation of error types"],
 ["Stage timing","Process observation across the delivery workflow","Value stream map, process cycle efficiency"],
 ["Rework incidence","Audit record of units returned from internal review","Rework-loop frequency and lead-time penalty"],
 ["Cause identification","Structured discussion with delivery and review staff","Fishbone analysis across six cause categories"],
 ["Measurement reliability","Review of audit practice and error definitions","Attribute agreement analysis design"]],[26,34,40]));

K.push(H("3.2 DMAIC-Based Methodological Framework"));
K.push(P("The methodological framework employed was DMAIC, selected because it provides a disciplined sequence for diagnosing, quantifying, analysing, improving and holding a process. The sequence is of particular value in a setting where the analytical temptation is to move directly from a complaint to a remedy. Figure 1 presents the framework as applied in this study, showing the tool set attached to each phase."));
K.push(FIG("fig1_dmaic.png",478));
K.push(CAPC("Figure 1 DMAIC-based analytical framework showing the sequence used in the study: Define (problem framing and process mapping), Measure (audit data, capability metrics and baseline value stream map), Analyse (Pareto, fishbone, attribute agreement analysis and rework-loop analysis), Improve (error-proofing and standard work) and Control (attribute control charts and control plan)."));

K.push(H("3.3 Define Phase"));
K.push(P("The Define phase established the boundary of the study and converted an informally expressed concern into a stated problem. The process boundary was drawn from the receipt of a client request to the delivery of the completed work unit to the client; client-side review and commercial negotiation were placed outside the boundary. The critical-to-quality characteristic was defined as the correctness of the delivered work unit against the agreed client specification, and a defect was defined as any deviation from that specification recorded during internal quality review."));
K.push(P("A necessary step at this stage was the operational definition of the three fields actually recorded by the firm, since the distinction between a defective unit and a defect governs all subsequent tool selection. Table 2 states these definitions."));
K.push(CAP("Table 2 Operational definitions of the three recorded audit fields"));
K.push(TBL(["Recorded field","Operational definition","Statistical role"],[
 ["Total units audited","The number of completed work units inspected during the audit period","Sample size (n); denominator for every rate"],
 ["Units in error","The number of inspected units carrying at least one deviation from specification","Count of defectives (d); binomial behaviour"],
 ["Total errors","The total count of individual deviations recorded across all inspected units","Count of defects (c); Poisson behaviour"]],[22,48,30]));

K.push(H("3.4 Measure Phase"));
K.push(P("The Measure phase converted the defined problem into quantified operational indicators. The audit covering the study period recorded 1,200 delivered work units, of which 96 contained at least one error, with 150 individual errors recorded in total. Ten opportunities for error were identified per unit, corresponding to the ten specification checkpoints applied during internal review. Table 3 presents the baseline quality profile."));
K.push(CAP("Table 3 Baseline quality profile of the audited sample"));
K.push(TBL(["Parameter","Value"],[
 ["Total work units audited","1,200"],
 ["Units containing at least one error","96"],
 ["Total errors recorded","150"],
 ["Opportunities for error per unit","10"],
 ["Mean errors per defective unit","1.56"]],[60,40]));
K.push(P("The study used the standard measure of Defects Per Million Opportunities as the benchmark of overall quality capability:"));
K.push(P([run("DPMO = (Total Defects / (Total Units × Opportunities per Unit)) × 1,000,000",{i:true})],{al:AlignmentType.CENTER}));
K.push(P("Applying this framework, the baseline process capability of the delivery system was 12,500 DPMO, corresponding to an approximate short-term sigma level of 3.74. This outcome places the process below the four-sigma threshold frequently treated as the minimum competitive level in service operations, while remaining well above the level at which a process would be regarded as uncontrolled. Table 4 sets out the full set of derived metrics."));
K.push(CAP("Table 4 Derived Six Sigma metrics from the audit record"));
K.push(TBL(["Metric","Formula","Calculation","Result"],[
 ["Percentage defective","Units in error ÷ units audited","96 ÷ 1,200","8.00%"],
 ["First time yield","(Units audited − units in error) ÷ units audited","1,104 ÷ 1,200","92.00%"],
 ["Defects per unit (DPU)","Total errors ÷ units audited","150 ÷ 1,200","0.125"],
 ["Errors per defective unit","Total errors ÷ units in error","150 ÷ 96","1.56"],
 ["Defects per opportunity (DPO)","Total errors ÷ (units × opportunities)","150 ÷ 12,000","0.0125"],
 ["DPMO","DPO × 1,000,000","0.0125 × 10⁶","12,500"],
 ["Process sigma (short term)","Conversion from DPMO","—","≈ 3.74 σ"]],[26,34,22,18]));
K.push(P("Finally, a current-state value stream map was constructed to establish the efficiency of flow between request receipt and client delivery. The map, presented in Figure 2, shows a lead time of 9.0 days for a unit that passes internal review at the first attempt, of which 5.5 days are value-adding processing and 3.5 days are waiting, giving a process cycle efficiency of 61 per cent. Units returned at internal review re-enter production and incur an additional 2.0 days, producing a lead time of 11.0 days, an increase of 22 per cent over the first-time-right case."));
K.push(FIG("fig2_vsm.png",478));
K.push(CAPC("Figure 2 Current-state value stream map of the service delivery process from request intake to client delivery, showing stage processing times, inter-stage waiting times and the rework loop returning defective units from internal quality review to production."));

K.push(H("3.5 Analyse Phase"));
K.push(P("The Analyse phase converted the measured baseline into explanations of why the recorded deviations and delays were occurring."));
K.push(H("3.5.1 DPMO and Process Capability Analysis"));
K.push(P("The baseline DPMO of 12,500 and sigma level of 3.74 indicated that the delivery process had reached a moderate degree of control but retained substantial scope for improvement. The more informative statistic for diagnostic purposes was the ratio of errors to defective units. At 1.56 errors per defective unit, the data indicates that failure is not distributed thinly and randomly across the output but is concentrated: when a unit fails, it tends to fail more than once. This pattern is consistent with a systematic cause operating on particular units rather than with random inattention, and it directed the analysis towards process and tool design rather than towards individual performance."));
K.push(H("3.5.2 Pareto Prioritisation of Critical Error Types"));
K.push(P("The study applied the Pareto principle to determine which error categories contributed most to the recorded quality loss. Analysis revealed that three categories — data entry mistakes, formatting and style deviations, and missing references — together accounted for 109 of the 150 recorded errors, or 72.7 per cent of the total. Figure 3 presents the distribution, and Table 5 summarises the prioritised categories."));
K.push(FIG("fig3_pareto.png",430));
K.push(CAPC("Figure 3 Pareto chart of the frequency distribution of the recorded error categories, with the cumulative percentage curve and the 80 per cent reference line."));
K.push(CAP("Table 5 Dominant error categories prioritised in the Pareto analysis"));
K.push(TBL(["Error category","Occurrences","Percentage of total","Cumulative percentage"],[
 ["Data entry mistake","48","32.0%","32.0%"],
 ["Formatting / style deviation","36","24.0%","56.0%"],
 ["Missing reference","25","16.7%","72.7%"],
 ["Incorrect calculation","18","12.0%","84.7%"],
 ["Version mismatch","14","9.3%","94.0%"],
 ["Other","9","6.0%","100.0%"]],[36,18,23,23]));
K.push(P("The analytical significance of this concentration is that the firm was not uniformly underperforming across every dimension of its output. Rather, a small number of recurring and highly specific failure modes were responsible for the greater part of the quality loss, which implies that targeted intervention on those modes should yield disproportionate benefit relative to a general exhortation to improve quality."));

K.push(H("3.5.3 Root Cause Analysis through the Fishbone Framework"));
K.push(P("To move from symptom to causal explanation, a structured root-cause analysis was organised around six categories appropriate to a professional service setting: People, Method and Process, Tools and Systems, Inputs and Client, Measurement, and Environment. The analysis, presented in Figure 4 and summarised in Table 6, was conducted through structured discussion with production and review staff, and each identified cause was treated as a hypothesis for subsequent confirmation rather than as an established finding."));
K.push(FIG("fig4_fishbone.png",478));
K.push(CAPC("Figure 4 Fishbone diagram of the root-cause categories associated with client errors in delivered work, organised under People, Method and Process, Tools and Systems, Inputs and Client, Measurement, and Environment."));
K.push(CAP("Table 6 Root-cause categories and their principal identified causes"));
K.push(TBL(["Category","Principal causes identified","Link to Pareto priority"],[
 ["Tools and Systems","Free-text entry without controlled vocabularies; no automated format validation; manual transfer between files; multiple file versions in circulation","Direct driver of data entry and formatting errors"],
 ["Method and Process","No standard task template; pre-delivery checklist not consistently applied; unclear handoff between stages; version control not enforced","Direct driver of formatting and missing-reference errors"],
 ["People","Workload peaks at deadlines; variation in skill and experience; gaps in onboarding; unclear task ownership","Contributory across all categories"],
 ["Inputs and Client","Incomplete client brief; source data arriving late; inconsistent reference files; requirements changing mid-task","Contributory to missing-reference errors"],
 ["Measurement","Error categories not standardised; auditor judgement varies; no error log captured at source; severity not defined","Affects the reliability of all recorded data"],
 ["Environment","Deadline pressure; parallel project load; frequent interruptions; remote handoffs","Contributory, amplifies other causes"]],[20,50,30]));
K.push(P("The analysis indicates that the two cause categories most directly linked to the dominant Pareto error types are Tools and Systems and Method and Process. Both are structural rather than individual, which supports the interpretation already suggested by the errors-per-defective-unit ratio."));

K.push(H("3.5.4 Attribute Agreement Analysis"));
K.push(P("Because the entire dataset is attribute in nature, the conventional gauge repeatability and reproducibility study is inapplicable. The equivalent validation procedure is attribute agreement analysis, which examines whether reviewers classify the same work unit consistently. The Measurement branch of the fishbone analysis identified four specific weaknesses in the existing arrangement: error categories were not standardised, reviewer judgement varied, no error log was captured at the point of review, and error severity was not defined. These weaknesses are material, because a reduction in the recorded error count could in principle reflect a relaxation of inspection rather than an improvement in the process."));
K.push(P("The study therefore specifies attribute agreement analysis as a required step before any post-intervention comparison is made. Agreement is assessed on three dimensions — repeatability within a reviewer, reproducibility between reviewers, and accuracy against an expert standard — and quantified using the kappa coefficient (Cohen, 1960). Table 7 states the interpretation thresholds adopted."));
K.push(CAP("Table 7 Attribute agreement analysis: dimensions and kappa interpretation thresholds"));
K.push(TBL(["Dimension","Question addressed","Kappa value","Interpretation"],[
 ["Repeatability","Does the same reviewer reach the same verdict on the same unit on re-inspection?","Above 0.90","Excellent; measurement system acceptable"],
 ["Reproducibility","Do different reviewers reach the same verdict on the same unit?","0.70 to 0.90","Acceptable; reviewer calibration advisable"],
 ["Accuracy against standard","Do reviewer verdicts match an agreed expert classification?","Below 0.70","Unacceptable; definitions must be repaired first"]],[22,40,16,22]));

K.push(H("3.5.5 Value Stream and Rework-Loop Analysis"));
K.push(P("The value stream analysis quantified the time consequence of the recorded errors. Of the 9.0-day lead time for a first-time-right unit, 3.5 days, or 39 per cent, were non-value-adding waiting. The rework loop imposed a further penalty on the 8 per cent of units returned at internal review, each incurring an additional 2.0 days. Expressed per 100 delivered units, the rework loop consumed 16 days of production capacity that added no value from the client's perspective. Table 8 summarises the stage-level profile."));
K.push(CAP("Table 8 Stage-level process and waiting times in the current-state value stream"));
K.push(TBL(["Stage","Processing time (days)","Subsequent waiting time (days)"],[
 ["Request intake","0.5","0.5"],
 ["Scoping and assignment","0.5","1.0"],
 ["Production work","3.0","0.5"],
 ["Internal quality review","1.0","1.0"],
 ["Client delivery","0.5","0.5"],
 ["Total","5.5","3.5"]],[40,30,30]));

K.push(H("3.6 Improvement Design and Proposed Interventions"));
K.push(P("The analytical results led to a set of improvement measures addressing the dominant error categories and the structural causes identified. The design principle adopted was to prevent error at the point of creation rather than to detect it at review, since detection consumes review capacity and generates the rework loop that drives lead time. Table 9 maps each intervention to the cause it addresses."));
K.push(CAP("Table 9 Proposed improvement interventions mapped to identified causes"));
K.push(TBL(["Intervention","Cause addressed","Expected effect"],[
 ["Poka-yoke in the working tools: controlled dropdowns in place of free-text fields, mandatory field validation, automated format and reference checking","Tools and Systems","Prevents data entry and formatting errors at creation"],
 ["Standard work: one documented method per task type with a pre-delivery checklist","Method and Process","Removes dependence on individual practice; addresses missing references"],
 ["Upstream inspection: move specification checks earlier in the workflow","Method and Process; Environment","Reduces the cost of each error by catching it before rework compounds"],
 ["Handoff reduction: consolidate stages and clarify ownership","People; Environment","Removes queue points and transfer misunderstandings"],
 ["Targeted training derived from the Pareto and fishbone findings","People","Addresses the specific recurring error types rather than general quality awareness"],
 ["Visual control: a live error dashboard showing daily DPU and percentage defective","Measurement","Provides same-day feedback in place of period-end review"]],[40,22,38]));

K.push(H("3.7 Proposed Control Plan for Sustaining Improvements"));
K.push(P("The final methodological phase specified the control mechanisms required to hold any gain achieved. Chart selection follows directly from the data-type classification established in the Define phase. Because total errors are counts of defects that may occur more than once per unit, and because the number of units audited varies between periods, the u-chart is the appropriate primary control chart, supported by a p-chart tracking the proportion of defective units. Table 10 states the proposed control plan."));
K.push(CAP("Table 10 Proposed control mechanisms for sustaining process improvements"));
K.push(TBL(["Metric","Data type","Control chart","Review frequency","Response trigger"],[
 ["Defects per unit (DPU)","Attribute (count of defects)","u-chart","Weekly","Point beyond control limits or run of seven"],
 ["Percentage defective","Attribute (count of defectives)","p-chart","Weekly","Point beyond control limits"],
 ["First time right rate","Attribute (proportion)","Run chart","Weekly","Sustained downward trend"],
 ["Delivery lead time","Variable (days)","X-bar and R chart","Weekly","Shift in mean or increase in range"]],[24,24,18,15,19]));
K.push(P("The methodology above provides the analytical structure used to diagnose errors, causes and workflow losses in the service delivery system. The next section states the problem addressed by the study."));

// ================= 4. PROBLEM =================
K.push(H("4. Problem of the study"));
K.push(P("Professional service firms are under simultaneous pressure to deliver accurately, to deliver on time and to remain cost-competitive. At SKARR Business Solutions, internal quality review was recording a persistent level of error in delivered work units, and the consequence of that error was experienced twice: once as a quality failure requiring correction, and again as a delay, because every corrected unit re-entered production and extended the delivery lead time."));
K.push(P("The difficulty was not that the firm lacked data. An internal audit record existed, listing units audited, units in error and total errors. The difficulty was that this record was not being converted into a capability statement, that the error categories within it were not being used to prioritise effort, that the causes of the recurring errors had not been traced systematically, and that the reliability of the audit itself had never been established. In the absence of such an analysis, improvement effort risked being distributed evenly across all error types rather than concentrated where the data indicated it would matter, and any apparent improvement could not be distinguished from a drift in inspection practice."));
K.push(P("The problem addressed by this study is therefore the absence of a structured, data-grounded improvement framework capable of converting an ordinary audit record into a prioritised diagnosis, a validated measurement system, a targeted intervention set and a sustainable control mechanism. The following section presents the results obtained from applying such a framework."));

// ================= 5. RESULTS & DISCUSSION =================
K.push(H("5. Results & Discussion"));
K.push(H("5.1 Baseline process capability and error profile"));
K.push(P("The initial measurement established that the service delivery system was operating at 8.00 per cent defective, with a first-time yield of 92.00 per cent. Expressed against the ten specification checkpoints applied at internal review, this corresponds to 12,500 defects per million opportunities and a short-term process sigma of approximately 3.74."));
K.push(P("Two features of the baseline merit comment. The first is the position of the process relative to common benchmarks. A sigma level of 3.74 indicates a process that is neither out of control nor competitive; it is characteristic of an organisation operating on the competence of individual staff rather than on the reliability of its systems. The second is the ratio of errors to defective units. At 1.56, the figure shows that failure is clustered within particular units rather than spread thinly across the output, which carries the diagnostic implication, pursued in the fishbone analysis, that the causes are structural."));

K.push(H("5.2 Pareto concentration of critical error types"));
K.push(P("The Pareto analysis produced the clearest single finding of the study. Three error categories — data entry mistakes at 48 occurrences, formatting and style deviations at 36, and missing references at 25 — accounted for 109 of the 150 recorded errors, or 72.7 per cent of the total. The two leading categories alone accounted for 56.0 per cent."));
K.push(P("The practical implication is that the improvement effort required to achieve a substantial reduction in error is narrower than the error count alone would suggest. Of the six categories recorded, action on three would address nearly three-quarters of the recorded failures. The further significance of this result is that all three leading categories are of a type amenable to error-proofing: data entry mistakes and formatting deviations arise from unconstrained input, and missing references arise from the absence of a completion check. None of the three requires additional analytical skill on the part of staff; all three require the working tools to make the error harder to commit."));

K.push(H("5.3 Value-stream losses and the rework loop"));
K.push(P("The value stream analysis established that 3.5 of the 9.0 days of lead time, or 39 per cent, were non-value-adding. Table 11 classifies the waste observed against the conventional Lean waste categories adapted to a service context."));
K.push(CAP("Table 11 Waste categories identified from the value stream analysis"));
K.push(TBL(["Waste category","Observation in the service delivery process","Time effect"],[
 ["Defects","8 per cent of units returned at internal quality review","2.0 additional days per affected unit"],
 ["Waiting","Queues between scoping, production, review and delivery","3.5 days per unit"],
 ["Over-processing","Re-checking of work already reviewed owing to unclear ownership","Absorbs review capacity"],
 ["Motion and transport","Manual transfer of content between files and formats","Contributes to data entry errors"],
 ["Inventory","Work units held in queue awaiting reviewer availability","Extends queue at the review stage"]],[20,52,28]));
K.push(P("The rework loop is the mechanism through which the quality problem becomes a delivery problem. Each defective unit consumes production capacity twice and re-enters a queue that other units are already occupying, so its effect on the overall lead time is greater than the 2.0 days it directly incurs. Expressed per 100 delivered units, the rework loop consumed 16 days of capacity that produced nothing of value for the client."));

K.push(H("5.4 Measurement-system findings"));
K.push(P("The examination of the measurement system produced a finding of methodological rather than operational character, but one that conditions every other result reported here. The audit record was being compiled without standardised error categories, without a defined severity scale, without an error log captured at the point of review, and with no assessment of whether reviewers classified consistently."));
K.push(P("The consequence is that the baseline reported in Section 5.1 should be read as an estimate whose precision is unverified. The study treats this not as a limitation to be noted in passing but as the first item in the improvement sequence, because an unvalidated measurement system makes subsequent improvement unprovable. This finding is consistent with the observation by Nonthaleerak and Hendry (2006) that measurement-system validation remains among the least consistently reported elements of Six Sigma practice."));

K.push(H("5.5 Discussion: what the findings mean"));
K.push(P("Taken together, the findings indicate that the quality problem at the firm is systemic rather than individual. Three lines of evidence converge on this interpretation. The ratio of 1.56 errors per defective unit indicates clustering rather than random incidence. The Pareto distribution shows concentration in a small number of highly specific and repeatable failure modes. The fishbone analysis locates the dominant causes in tool design and the absence of standard work rather than in staff capability."));
K.push(P("The findings also indicate that quality and delivery speed are not competing objectives in this setting but the same objective approached from two directions. Because the rework loop converts every error into additional days of lead time, a reduction in the error rate is simultaneously a reduction in delivery time and in the consumption of review capacity. This connection, which the Lean and Six Sigma literatures treat separately, is made explicit here through the structure of the value stream map."));
K.push(P("A third observation concerns the sequence of intervention. The conventional expectation would be to begin with the largest Pareto category. The evidence of this study suggests instead that the measurement system must be repaired first, since the error categories that the Pareto analysis depends upon are themselves not standardised. Improvement activity undertaken before that repair would be measured against a baseline of unknown reliability."));

K.push(H("5.6 Projected firm-level gains under broader implementation"));
K.push(P("It should be stated clearly that the improvements reported in this section are analytically derived projections based on the identified interventions, and not post-implementation measurements. The projection assumes that the proposed poka-yoke and standard-work measures achieve a 50 per cent reduction in the three dominant Pareto categories, which together account for 109 of the 150 recorded errors, while leaving the remaining categories unchanged. Table 12 presents the resulting estimate."));
K.push(CAP("Table 12 Projected firm-level benefits under broader implementation"));
K.push(TBL(["Metric","Baseline","Projected","Change"],[
 ["Total errors per 1,200 units","150","95.5","−36.3%"],
 ["Defective units per 1,200","96","61.1","−36.3%"],
 ["Percentage defective","8.00%","5.09%","−2.91 points"],
 ["First time yield","92.00%","94.91%","+2.91 points"],
 ["Defects per unit (DPU)","0.125","0.080","−36.3%"],
 ["DPMO","12,500","7,958","−36.3%"],
 ["Process sigma (short term)","3.74 σ","3.91 σ","+0.17 σ"],
 ["Rework days per 100 units","16.0","10.2","−36.3%"]],[34,22,22,22]));
K.push(P("The projected movement from 3.74 to 3.91 sigma is modest when expressed on the sigma scale, which is characteristic of improvements in this region of the capability curve, but the associated reduction of 36 per cent in error volume and in rework days is operationally substantial. The reduction in rework days is of particular commercial significance, since it releases review and production capacity without any addition to headcount."));
K.push(P("These results identify the dominant error categories, the structural causes behind them and the improvement opportunities available across the delivery system. The next section discusses the broader implications."));

// ================= 6. IMPLICATIONS =================
K.push(H("6. Implications"));
K.push(H("6.1 Theoretical Implications"));
K.push(P("The findings strengthen the theoretical understanding of process improvement in knowledge-intensive service work by showing that delivery problems in such settings are structural rather than attributable to individual performance. The study demonstrates that the Lean and Six Sigma perspectives are not merely compatible in a service context but mutually necessary: the Six Sigma account of defect concentration explains why the Lean account of rework-driven delay takes the form it does. The paper also contributes a methodological argument to the service quality literature, namely that the attribute character of service defect data is not an incidental property but a constraint that determines the admissible analytical apparatus."));
K.push(H("6.2 Implications for Practice"));
K.push(P("For delivery managers and quality leads in professional service firms, the study offers several directly applicable implications. First, an ordinary internal audit record containing three fields is sufficient to generate a formal capability statement; no additional instrumentation is required. Second, effort should be concentrated on the small number of error categories that the Pareto distribution identifies, rather than distributed evenly. Third, the most effective interventions in this setting are those that constrain input at the point of creation — controlled vocabularies, mandatory fields, automated validation — because they prevent the error rather than detect it. Fourth, the measurement system should be validated before improvement is attempted, since otherwise improvement cannot be demonstrated."));
K.push(H("6.3 Implications for Policymakers"));
K.push(P("Policymakers, industrial development agencies and institutions supporting the competitiveness of the services sector also have an interest in these results. Small and medium professional service firms constitute a substantial share of service exports from emerging economies, yet they rarely have access to formal quality engineering capability. The evidence here suggests that the barrier is not the cost of instrumentation but the absence of methodological guidance appropriate to attribute data and small samples. Support programmes that provide templates for operational definition, audit design and attribute control charting would address a real and currently unmet need."));
K.push(H("6.4 Methodological Implications"));
K.push(P("Methodologically, the study demonstrates the value of combining several diagnostic tools within a single DMAIC framework rather than relying on a single performance indicator. DPMO establishes the level, the errors-per-defective-unit ratio reveals the distribution, Pareto analysis establishes priority, fishbone analysis supplies causal structure, attribute agreement analysis establishes whether the data can be trusted, and value stream mapping converts the quality finding into a time consequence. No one of these tools would have supported the conclusions reached; their combination does. The study further illustrates that the data-type classification should be performed explicitly and early, since it governs chart and test selection throughout."));
K.push(H("6.5 Societal and Sustainability Implications"));
K.push(P("The implications extend to broader societal and sustainability considerations. Improvement in service delivery is not measured only in speed. The reduction of rework reduces the volume of work performed twice, which in a knowledge-work setting translates into reduced overtime, more predictable working hours and lower deadline-driven pressure on staff — conditions that the fishbone analysis itself identified as contributing causes. There is accordingly a reinforcing relationship between the quality of the work system and the quality of working life within it, and improvements of the kind proposed here contribute to both."));
K.push(P("The implications demonstrate the wider relevance of the study beyond the focal case environment. The final section concludes the paper by summarising the contribution, acknowledging limitations and identifying directions for future work."));

// ================= 7. CONCLUSION =================
K.push(H("7. Conclusion"));
K.push(P("This paper applied the Lean Six Sigma DMAIC framework to determine the sources of error, rework and delay in the service delivery process of a professional consulting firm. Working from an internal audit record of 1,200 delivered work units, the study established a baseline of 8.00 per cent defective units, 0.125 defects per unit and 12,500 defects per million opportunities, corresponding to a short-term process sigma of approximately 3.74. A current-state value stream map placed the lead time at 9.0 days for a first-time-right unit and 11.0 days where rework was required, with a process cycle efficiency of 61 per cent."));
K.push(P("Pareto analysis demonstrated that three error categories accounted for 72.7 per cent of all recorded errors, and the fishbone analysis traced these principally to unconstrained input tools and the absence of standard work. The study specified an improvement set based on error-proofing, standard work and upstream inspection, together with a control plan founded on u-charts and p-charts selected on the basis of the attribute nature of the data. Under the proposed interventions the analytical projection indicates a reduction to 7,958 defects per million opportunities, a sigma level of approximately 3.91, and a 36 per cent reduction in rework days per hundred delivered units."));
K.push(P("The principal methodological finding of the study is that the measurement system, rather than the analytical technique, was the binding constraint. The recommendation that the measurement system be repaired before improvement is attempted is the study's most transferable practical conclusion."));
K.push(H("7.1 Limitations"));
K.push(P("The limitations of this study are twofold. First, it relies on a single service delivery centre, and the findings are therefore context-dependent. Although the diagnostic sequence is transferable, the particular distribution of error categories reflects the work mix of this firm and should not be assumed to generalise. Second, and more significantly, the improvements reported are analytically derived projections rather than post-implementation measurements. The interventions had not been implemented at the time of the study, and the projection rests on an assumed 50 per cent reduction in the three dominant error categories. A further limitation follows from the measurement finding itself: because attribute agreement analysis had not yet been performed, the precision of the baseline is unverified, and the study is correspondingly cautious in the strength of the claims it makes."));
K.push(H("7.2 Future Scope"));
K.push(P("Two directions may be followed in continuation of this work. The first is implementation and validation: the proposed interventions should be piloted, the measurement system validated through attribute agreement analysis, and the process re-baselined so that the projected gains can be tested against observed performance. Control charts established during this phase would also permit a distinction between common-cause and special-cause variation that the present cross-sectional data cannot support. The second direction is extension. The diagnostic sequence applied here could be replicated across several service firms to establish whether the concentration of errors in input-related categories is a general property of knowledge-work delivery, and predictive techniques could be examined as a means of identifying at-risk work units before they reach internal review, converting the control plan from a detective into a preventive mechanism."));

// ================= BACK MATTER =================
K.push(H("Acknowledgment"));
K.push(P("The authors are grateful to the management and staff of SKARR Business Solutions for their cooperation, for access to the internal quality audit records, and for the time given to process observation and discussion during the course of this study."));
K.push(H("Declarations"));
["Funding: This study did not receive funding to conduct it.",
 "Conflicts of interest / Competing interests: The authors report no competing interests.",
 "Availability of data and materials: The data used to produce the findings of this research can be obtained from the corresponding author upon reasonable request.",
 "Consent for publication: Not applicable.",
 "Ethics approval and consent to participate: Not applicable."].forEach(t=>K.push(BL(t)));

K.push(H("References"));
[
"Abboodi, M. (2014). An integrated SERVQUAL and Lean Six Sigma framework for measuring customer satisfaction in computer service companies (Master's thesis). University of Central Florida, Orlando, FL.",
"Achibat, F. E., Lebkiri, A., Aouane, E. M., Lougraimzi, H., Berrid, N., & Maqboul, A. (2023). Analysis of the impact of Six Sigma and Lean Manufacturing on the performance of companies. Management Systems in Production Engineering, 31(2).",
"Albliwi, S. A., Antony, J., & Lim, S. A. H. (2015). A systematic review of Lean Six Sigma for the manufacturing industry. Business Process Management Journal, 21(3), 665–691.",
"Antony, J. (2006). Six Sigma for service processes. Business Process Management Journal, 12(2), 234–248.",
"Bhaskar, H. L. (2020). Lean Six Sigma in manufacturing: A comprehensive review. In F. P. García Márquez, I. Segovia, T. Banyai, & P. Tamás (Eds.), Lean manufacturing and Six Sigma. IntechOpen.",
"Brady, J. E., & Allen, T. T. (2006). Six Sigma literature: A review and agenda for future research. Quality and Reliability Engineering International, 22(3), 335–367.",
"Caiado, R. G. G., Nascimento, D. L. M., & Quelhas, O. L. G. (2017). Towards green through Lean/Lean Six Sigma approaches: A literature review at service industry. Analele Universităţii Constantin Brâncuşi din Târgu Jiu: Seria Economie, 1(4), 11–16.",
"Cohen, J. (1960). A coefficient of agreement for nominal scales. Educational and Psychological Measurement, 20(1), 37–46.",
"George, M. L. (2003). Lean Six Sigma for service: How to use Lean speed and Six Sigma quality to improve services and transactions. McGraw-Hill.",
"Kumar, S., Swarnakar, V., Phanden, R. K., Khanduja, D., & Chakraborty, A. (2024). Role of Lean Six Sigma in manufacturing setting: A systematic literature review. Journal of Engineering Design and Technology.",
"Linderman, K., Schroeder, R. G., Zaheer, S., & Choo, A. S. (2003). Six Sigma: A goal-theoretic perspective. Journal of Operations Management, 21(2), 193–203.",
"Montgomery, D. C. (2009). Introduction to statistical quality control (6th ed.). John Wiley & Sons.",
"Nonthaleerak, P., & Hendry, L. (2006). Six Sigma: Literature review and key research areas. International Journal of Six Sigma and Competitive Advantage, 2(2), 105–161.",
"Patel, S., Desai, D. A., Narkhede, B. E., Maddulety, K., & Raut, R. (2019). Lean Six Sigma: Literature review and implementation roadmap for manufacturing industries. International Journal of Business Excellence, 19(4), 447–472.",
"Peruchi, R. S., Rotela Junior, P., Brito, T. G., Paiva, A. P., Balestrassi, P. P., & Araujo, L. M. M. (2020). Integrating multivariate statistical analysis into Six Sigma DMAIC projects: A case study on AISI 52100 hardened steel turning. IEEE Access, 8, 34246–34255.",
"Sancho, D., Rezusta, A., & Acero, R. (2025). Integrating Lean Six Sigma into microbiology laboratories: Insights from a literature review. Healthcare, 13(8), 917.",
"Semssar, S. A. (2023). Predictive quality analytics (Doctoral dissertation). Purdue University, West Lafayette, IN.",
"Shokri, A., Waring, T. S., & Nabhani, F. (2016). Investigating the readiness of people in manufacturing SMEs to embark on Lean Six Sigma projects: An empirical study in the German manufacturing sector. International Journal of Operations & Production Management, 36(8), 850–878.",
"Sordan, J. E., Oprime, P. C., Pimenta, M. L., Chiabert, P., & Lombardi, F. (2020). Lean Six Sigma in manufacturing process: A bibliometric study and research agenda. The TQM Journal, 32(3), 381–399.",
"Stankalla, R., Koval, O., & Chromjakova, F. (2018). A review of critical success factors for the successful implementation of Lean Six Sigma and Six Sigma in manufacturing small and medium sized enterprises. Quality Engineering, 30(3), 453–468.",
"Wartati, D., Garza-Reyes, J. A., Dieste, M., Nadeem, S. P., Joshi, R., & González-Aleu, F. (2021). A Six-Sigma DMAIC approach to improve the sales process of a technology start-up. International Journal of Mathematical, Engineering and Management Sciences, 6(6), 1487–1517.",
"Womack, J. P., & Jones, D. T. (1996). Lean thinking: Banish waste and create wealth in your corporation. Simon & Schuster.",
"Yadav, N., Mathiyazhagan, K., & Kumar, K. (2019). Literature review: Continuous improvement through Lean Six Sigma. International Journal of Productivity and Quality Management, 28(1), 3–27."
].forEach(r=>K.push(new Paragraph({children:[run(r,{sz:9})],alignment:AlignmentType.JUSTIFIED,
  spacing:{after:80,line:240},indent:{left:360,hanging:360}})));

// ================= ASSEMBLE =================
const doc=new Document({
  styles:{default:{document:{run:{font:TNR,size:20}}}},
  sections:[{properties:{page:{size:{width:11906,height:16838},
    margin:{top:2948,right:2007,bottom:2948,left:2494}}},children:K}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync("SKARR_Manuscript.docx",b);console.log("written",b.length);});
