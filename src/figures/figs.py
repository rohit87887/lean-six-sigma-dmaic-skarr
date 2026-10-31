import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
plt.rcParams.update({"font.family":"serif",
 "font.serif":["Times New Roman","Liberation Serif","DejaVu Serif"],"font.size":9})
DPI=300
NAVY="#17365D"; MID="#4472A8"; GREY="#7F7F7F"; LIGHT="#E8EDF4"; ACC="#B35A1F"

# ---------- F1 DMAIC framework ----------
fig,ax=plt.subplots(figsize=(7.0,1.85))
ax.set_xlim(0,10); ax.set_ylim(0,3); ax.axis("off")
ph=[("D","Define","Problem framing,\nSIPOC, CTQ"),("M","Measure","Audit data,\nDPMO, baseline VSM"),
    ("A","Analyse","Pareto, fishbone,\nAAA, rework loop"),("I","Improve","Poka-yoke, SOP,\nupstream checks"),
    ("C","Control","u-chart, p-chart,\ncontrol plan")]
w,g=1.72,0.36
for i,(L,t,d) in enumerate(ph):
    x=0.25+i*(w+g)
    ax.add_patch(FancyBboxPatch((x,0.35),w,2.1,boxstyle="round,pad=0.02,rounding_size=0.08",
        fc=LIGHT if i%2 else "white",ec=NAVY,lw=0.9))
    ax.text(x+w/2,2.12,L,ha="center",va="center",fontsize=14,fontweight="bold",color=NAVY)
    ax.text(x+w/2,1.70,t,ha="center",va="center",fontsize=9.5,fontweight="bold")
    ax.text(x+w/2,1.05,d,ha="center",va="center",fontsize=7.4,color="#333333",linespacing=1.5)
    if i<4: ax.annotate("",xy=(x+w+g-0.06,1.4),xytext=(x+w+0.04,1.4),
        arrowprops=dict(arrowstyle="-|>",color=GREY,lw=1.1))
plt.tight_layout(pad=0.2); plt.savefig("fig1_dmaic.png",dpi=DPI,bbox_inches="tight"); plt.close()

# ---------- F2 Baseline VSM ----------
fig,ax=plt.subplots(figsize=(7.0,2.9))
ax.set_xlim(0,10); ax.set_ylim(0,4.6); ax.axis("off")
st=[("Request\nintake",0.5,0.5),("Scoping &\nassignment",0.5,1.0),("Production\nwork",3.0,0.5),
    ("Internal\nQC review",1.0,1.0),("Client\ndelivery",0.5,0.5)]
w,g=1.55,0.42; y=2.70; h=1.0
xs=[]
for i,(n,pt,wt) in enumerate(st):
    x=0.30+i*(w+g); xs.append(x)
    ax.add_patch(FancyBboxPatch((x,y),w,h,boxstyle="round,pad=0.02,rounding_size=0.06",
        fc=LIGHT,ec=NAVY,lw=0.9))
    ax.text(x+w/2,y+0.66,n,ha="center",va="center",fontsize=8.0,fontweight="bold",linespacing=1.4)
    ax.text(x+w/2,y+0.22,"P/T %.1f d"%pt,ha="center",va="center",fontsize=7.0,color="#333333")
    if i<4: ax.annotate("",xy=(x+w+g-0.05,y+h/2),xytext=(x+w+0.03,y+h/2),
        arrowprops=dict(arrowstyle="-|>",color=GREY,lw=1.0))
    cx=x+w/2
    ax.plot([cx-0.15,cx,cx+0.15],[y-0.24,y-0.50,y-0.24],color=ACC,lw=1.0)
    ax.text(cx,y-0.72,"%.1f d"%wt,ha="center",va="center",fontsize=6.8,color=ACC)
qx=xs[3]+w*0.80; px=xs[2]+w*0.20; ly=y-1.26
ax.plot([qx,qx],[y,ly],ls="--",color="#B02418",lw=1.0)
ax.plot([px,qx],[ly,ly],ls="--",color="#B02418",lw=1.0)
ax.plot([px,px],[ly,y-0.30],ls="--",color="#B02418",lw=1.0)
ax.annotate("",xy=(px,y-0.02),xytext=(px,y-0.26),arrowprops=dict(arrowstyle="-|>",color="#B02418",lw=1.0))
ax.text((px+qx)/2,ly-0.28,"Rework loop: 8% of units return to production (+2.0 d)",
        ha="center",va="center",fontsize=7.0,color="#B02418",style="italic")
ax.text(5.0,4.28,"Process time 5.5 d   |   Waiting 3.5 d   |   Lead time 9.0 d   |   PCE 61%",
        ha="center",va="center",fontsize=8.4,fontweight="bold",color=NAVY)
plt.tight_layout(pad=0.2); plt.savefig("fig2_vsm.png",dpi=DPI,bbox_inches="tight"); plt.close()

# ---------- F3 Pareto ----------
cats=["Data entry\nmistake","Formatting /\nstyle","Missing\nreference","Incorrect\ncalculation","Version\nmismatch","Other"]
vals=[48,36,25,18,14,9]; tot=sum(vals)
cum=[]; r=0
for v in vals: r+=v; cum.append(r/tot*100)
fig,ax=plt.subplots(figsize=(6.3,3.3))
ax.bar(range(len(vals)),vals,color=MID,edgecolor=NAVY,lw=0.7,width=0.62)
for i,v in enumerate(vals): ax.text(i,v+1.2,str(v),ha="center",fontsize=8.2)
ax.set_ylabel("Number of errors"); ax.set_ylim(0,58)
ax.set_xticks(range(len(cats))); ax.set_xticklabels(cats,fontsize=7.6)
ax2=ax.twinx(); ax2.plot(range(len(cum)),cum,color=ACC,marker="o",ms=4,lw=1.3)
for i,c in enumerate(cum): ax2.text(i+0.12,c-4.5,"%.1f%%"%c,fontsize=7,color=ACC)
ax2.set_ylabel("Cumulative percentage"); ax2.set_ylim(0,105)
ax2.axhline(80,ls=":",color=GREY,lw=0.9)
ax.spines["top"].set_visible(False); ax2.spines["top"].set_visible(False)
ax.grid(axis="y",ls=":",lw=0.5,color="#CCCCCC"); ax.set_axisbelow(True)
plt.tight_layout(pad=0.3); plt.savefig("fig3_pareto.png",dpi=DPI,bbox_inches="tight"); plt.close()

# ---------- F4 Fishbone ----------
fig,ax=plt.subplots(figsize=(7.0,3.5))
ax.set_xlim(0,12); ax.set_ylim(0,6.4); ax.axis("off")
SY=3.2
ax.annotate("",xy=(10.05,SY),xytext=(0.35,SY),arrowprops=dict(arrowstyle="-|>",color="black",lw=1.4))
ax.add_patch(FancyBboxPatch((10.1,2.45),1.75,1.5,boxstyle="round,pad=0.02,rounding_size=0.06",
    fc=LIGHT,ec=NAVY,lw=1.0))
ax.text(10.97,3.2,"Client errors\nin delivered\nwork",ha="center",va="center",fontsize=8.2,
        fontweight="bold",linespacing=1.5)
top=[("People",["Workload peaks at deadlines","Variation in skill/experience","Gaps in onboarding","Unclear task ownership"]),
     ("Method / Process",["No standard task template","Checklist not applied","Unclear stage handoff","Version control not enforced"]),
     ("Tools / Systems",["Free-text entry, no dropdowns","No automated validation","Manual transfer between files","Multiple file versions"])]
bot=[("Inputs / Client",["Incomplete client brief","Source data arrives late","Inconsistent reference files","Requirements change mid-task"]),
     ("Measurement",["Error categories not standardised","Auditor judgement varies","No error log at source","Severity not defined"]),
     ("Environment",["Deadline pressure","Parallel project load","Frequent interruptions","Remote handoffs"])]
for i,(t,cs) in enumerate(top):
    bx=2.55+i*2.75
    ax.plot([bx+0.55,bx],[SY+1.75,SY],color=NAVY,lw=1.1)
    ax.text(bx+0.62,SY+1.92,t,ha="center",va="center",fontsize=8.4,fontweight="bold",color=NAVY,
            bbox=dict(boxstyle="round,pad=0.22",fc=LIGHT,ec=NAVY,lw=0.8))
    for k,c in enumerate(cs):
        ax.text(bx-0.12,SY+1.46-k*0.33,c,ha="right",va="center",fontsize=6.6,color="#333333")
for i,(t,cs) in enumerate(bot):
    bx=2.15+i*2.75
    ax.plot([bx,bx+0.55],[SY,SY-1.75],color=NAVY,lw=1.1)
    ax.text(bx+0.62,SY-1.94,t,ha="center",va="center",fontsize=8.4,fontweight="bold",color=NAVY,
            bbox=dict(boxstyle="round,pad=0.22",fc=LIGHT,ec=NAVY,lw=0.8))
    for k,c in enumerate(cs):
        ax.text(bx+0.70,SY-0.42-k*0.33,c,ha="left",va="center",fontsize=6.6,color="#333333")
plt.tight_layout(pad=0.2); plt.savefig("fig4_fishbone.png",dpi=DPI,bbox_inches="tight"); plt.close()
print("figures done")
