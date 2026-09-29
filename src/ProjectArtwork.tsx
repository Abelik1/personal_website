import { useId } from "react";
import type { Project } from "./content";

const captions: Record<Project["visual"], string> = {
  home: "A connected home, one shared model", assistant: "Voice, context, action",
  workspace: "A local desktop workspace", hpc: "Computation, made visible",
  lab: "From sample to structured record", car: "Comparing ownership costs over time",
  quantum: "Learning spin-chain dynamics", thesis: "Local equilibrium and global correlations",
  spectroscopy: "Spectroscopy temperature sweep", chemistry: "Molecular electronic structure"
};

/** Concept illustrations, not product screenshots or measured data. */
export function ProjectArtwork({ visual }: { visual: Project["visual"] }) {
  const id = useId().replace(/:/g, "");
  const accent = ["quantum", "chemistry", "thesis"].includes(visual) ? "#c1b3ee" : ["spectroscopy", "car"].includes(visual) ? "#e8c393" : "#a8dfc4";
  return <div className={`project-artwork artwork-${visual}`}>
    <svg viewBox="0 0 640 360" role="img" aria-label={`${captions[visual]}. Concept illustration.`}>
      <defs>
        <radialGradient id={`${id}-bg`} cx="65%" cy="30%" r="80%"><stop stopColor={accent} stopOpacity=".13" /><stop offset="1" stopColor="#101617" /></radialGradient>
        <linearGradient id={`${id}-fill`} x2="1" y2="1"><stop stopColor={accent} stopOpacity=".2" /><stop offset="1" stopColor={accent} stopOpacity=".02" /></linearGradient>
        <pattern id={`${id}-grid`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke={accent} strokeOpacity=".045" /></pattern>
      </defs>
      <rect width="640" height="360" fill="#101617" /><rect width="640" height="360" fill={`url(#${id}-bg)`} /><rect width="640" height="360" fill={`url(#${id}-grid)`} />
      <g className="artwork-scene">
        {visual === "home" && <>
          <g transform="translate(105 53)">
            <path d="M30 144 196 48 365 144 198 242Z" fill={`url(#${id}-fill)`} stroke={accent} strokeWidth="1.5" />
            <path d="M30 144V92L196 0 365 92V144M196 0V48M30 92 198 191 365 92M198 191V242M114 96 280 192M113 193 280 96" fill="none" stroke={accent} strokeOpacity=".55" />
            {[[110,145],[196,96],[282,146],[198,194]].map(([x,y],i) => <g key={i}><ellipse cx={x} cy={y} rx="18" ry="10" fill={accent} fillOpacity=".09" stroke={accent} strokeOpacity=".4" /><circle cx={x} cy={y} r="4" fill={accent} /></g>)}
          </g>
          <g fill="#c5d3cd" fontSize="10" fontFamily="monospace"><text x="70" y="112">ENERGY</text><text x="455" y="94">POLICY</text><text x="455" y="254">DEVICES</text></g><path d="M112 119 175 150M465 100 412 127M447 247 400 228" stroke={accent} strokeOpacity=".35" />
        </>}
        {visual === "assistant" && <>
          {[110,83,56].map((r,i) => <circle key={r} cx="320" cy="167" r={r} fill={i===2 ? `url(#${id}-fill)` : "none"} stroke={accent} strokeOpacity={.15+i*.14} strokeDasharray={i===0 ? "2 8" : undefined} />)}
          {Array.from({length:31},(_,i) => <line key={i} x1={230+i*6} x2={230+i*6} y1={164-Math.abs(Math.sin(i*.7))*30} y2={170+Math.abs(Math.sin(i*.7))*30} stroke={accent} strokeWidth="2" />)}
          <path d="M80 168H204M436 168H560" stroke={accent} strokeOpacity=".4" strokeDasharray="4 5" /><text x="92" y="148" fill={accent} fontSize="11" fontFamily="monospace">LISTEN</text><text x="487" y="148" fill={accent} fontSize="11" fontFamily="monospace">ACT</text>
        </>}
        {visual === "workspace" && <g transform="translate(76 48)">
          <rect width="488" height="246" rx="9" fill="#141d1f" stroke={accent} strokeOpacity=".3" /><path d="M0 29H488M112 29V246" stroke={accent} strokeOpacity=".16" />
          {[15,27,39].map(x=><circle key={x} cx={x} cy="15" r="3" fill={accent} opacity=".45" />)}<text x="137" y="62" fill="#e2eae5" fontSize="16">A little room to think.</text>
          {['Projects','Conversations','Transcripts','Reminders'].map((t,i)=><text key={t} x="17" y={61+i*29} fill={i===0?accent:'#94aaa4'} fontSize="10">{t}</text>)}
          {[0,1,2].map(i=><g key={i}><rect x="137" y={82+i*42} width="321" height="32" rx="5" fill={accent} fillOpacity={.04+i*.015}/><circle cx="153" cy={98+i*42} r="4" fill="none" stroke={accent} strokeOpacity=".5"/><path d={`M168 ${98+i*42}h${130-i*23}`} stroke={accent} strokeOpacity=".35"/></g>)}
        </g>}
        {visual === "hpc" && <>
          {Array.from({length:27},(_,row) => <polyline key={row} points={Array.from({length:80},(_,i)=>`${40+i*7},${45+row*9+Math.sin(i*.14+row*.21)*Math.sin(i/80*Math.PI)*27}`).join(' ')} fill="none" stroke={row%4===0 ? '#d8ce9a':accent} strokeOpacity={.22+(row%5)*.12} strokeWidth="1.1" />)}
          <circle cx="247" cy="155" r="28" fill="#111b1c" stroke={accent}/><circle cx="247" cy="155" r="21" fill={`url(#${id}-fill)`}/><text x="46" y="34" fill={accent} fontSize="10" fontFamily="monospace">FLOW FIELD / SOLVER → FRAMES → REPLAY</text>
        </>}
        {visual === "lab" && <g transform="translate(60 49)">
          <rect width="150" height="235" rx="8" fill="#172123" stroke={accent} strokeOpacity=".3"/><text x="20" y="29" fill={accent} fontSize="10" fontFamily="monospace">SAMPLE RECORD</text>
          <path d="M58 60V94L35 147Q29 163 46 163H108Q125 163 119 147L96 94V60M53 60H101M50 132H105" stroke={accent} strokeWidth="2" fill={`url(#${id}-fill)`}/><path d="M20 194H130M20 209H92M150 118H206M206 51V191M206 51H238M206 121H238M206 191H238" stroke={accent} strokeOpacity=".4"/>
          {['Measurement','Instrument','Provenance'].map((t,i)=><g key={t}><rect x="238" y={24+i*70} width="220" height="53" rx="6" fill="#172123" stroke={accent} strokeOpacity=".25"/><circle cx="261" cy={50+i*70} r="5" fill={accent} fillOpacity=".6"/><text x="279" y={54+i*70} fill="#c2d4cd" fontSize="12">{t}</text></g>)}
        </g>}
        {visual === "car" && <>
          <path d="M75 264H562M75 264V65" stroke={accent} strokeOpacity=".35"/>{[0,1,2,3].map(i=><path key={i} d={`M75 ${92+i*43}H562`} stroke={accent} strokeOpacity=".07"/>)}
          <path d="M75 226C160 219 197 203 262 184S406 129 562 89" fill="none" stroke={accent} strokeWidth="2.5"/><path d="M75 127C166 129 192 144 268 154S428 180 562 180" fill="none" stroke="#9ab8ce" strokeWidth="2.5"/>
          <circle cx="322" cy="163" r="6" fill="#161b1c" stroke={accent} strokeWidth="2"/><path d="M322 175V264" stroke={accent} strokeOpacity=".5" strokeDasharray="4 5"/><text x="82" y="49" fill={accent} fontSize="10" fontFamily="monospace">KEEP / SWITCH · COST OVER TIME</text><text x="473" y="82" fill={accent} fontSize="11">Keep</text><text x="475" y="204" fill="#9ab8ce" fontSize="11">Switch</text>
        </>}
        {visual === "quantum" && <>
          {[0,.16].map((offset,index)=><polyline key={index} points={Array.from({length:160},(_,i)=>`${65+i*3.1},${164+Math.sin(i*.11+offset)*65*Math.exp(-i/95)+Math.sin(i*.035)*16}`).join(' ')} fill="none" stroke={index===0?accent:'#8bcbb9'} strokeWidth="2"/>)}
          <path d="M65 257H563" stroke={accent} strokeOpacity=".3" />{Array.from({length:9},(_,i)=><g key={i}><circle cx={95+i*55} cy="257" r="12" fill="#1c1c2b" stroke={accent} strokeOpacity=".7"/><path d={`M${95+i*55} ${i%2?250:264}v${i%2?14:-14}m-3 ${i%2?-3:3} 3 ${i%2?3:-3} 3 ${i%2?-3:3}`} fill="none" stroke={accent}/></g>)}<text x="65" y="60" fill={accent} fontSize="10" fontFamily="monospace">RESERVOIR / QUANTUM DYNAMICS</text>
        </>}
        {visual === "thesis" && <>
          {Array.from({length:15},(_,i)=><path key={i} d={`M220 ${110+i*8}C285 ${20+i*18} 355 ${300-i*13} 420 ${110+i*8}`} stroke={accent} strokeOpacity=".22" fill="none"/>)}
          {[180,460].map((x,i)=><g key={x}><circle cx={x} cy="169" r="65" fill={`url(#${id}-fill)`} stroke={accent} strokeOpacity=".7"/><circle cx={x} cy="169" r="50" fill="none" stroke={accent} strokeOpacity=".2" strokeDasharray="2 5"/><text x={x} y="182" fill="#e4dcf9" fontSize="40" fontFamily="Georgia" textAnchor="middle">γ{i===0?'ₐ':'ᵦ'}</text></g>)}<text x="320" y="281" fill={accent} fontFamily="Georgia" fontSize="18" textAnchor="middle">D(ρ ∥ γ ⊗ γ) = I(A : B)</text>
        </>}
        {visual === "spectroscopy" && <>
          {Array.from({length:11},(_,row)=><polyline key={row} points={Array.from({length:140},(_,i)=>`${65+i*3.5},${268-row*12-65*Math.exp(-(((i-48-row*2)/10)**2))-40*Math.exp(-(((i-96+row)/15)**2))}`).join(' ')} fill="none" stroke={row%3===0?'#a2cab6':accent} strokeOpacity={.3+row*.055} strokeWidth="1.5"/>)}<path d="M64 75V284H563" fill="none" stroke={accent} strokeOpacity=".3"/><text x="65" y="51" fill={accent} fontSize="10" fontFamily="monospace">SPECTROSCOPY / TEMPERATURE SWEEP</text>
        </>}
        {visual === "chemistry" && <g transform="translate(320 169)">
          {[-35,35,90].map(a=><ellipse key={a} rx="170" ry="63" transform={`rotate(${a})`} fill={`url(#${id}-fill)`} stroke={accent} strokeOpacity=".32"/>)}<path d="M-89 52 0 0 91 49" stroke={accent} strokeWidth="9" strokeOpacity=".2"/><path d="M-89 52 0 0 91 49" stroke={accent} strokeWidth="2"/>
          <circle r="33" fill="#302c45" stroke={accent}/><circle cx="-89" cy="52" r="21" fill="#243c37" stroke="#acd5c1"/><circle cx="91" cy="49" r="21" fill="#243c37" stroke="#acd5c1"/><text x="0" y="8" fill="#ece5fc" fontSize="23" textAnchor="middle">O</text><text x="-89" y="58" fill="#d6eee4" fontSize="17" textAnchor="middle">H</text><text x="91" y="55" fill="#d6eee4" fontSize="17" textAnchor="middle">H</text>
        </g>}
      </g>
      <text x="25" y="337" fill="#9daea7" fontSize="10" fontFamily="monospace" letterSpacing="1.5">CONCEPT STUDY</text><path d="M595 324v14m-7-7h14" stroke={accent} strokeOpacity=".6"/>
    </svg>
  </div>;
}
