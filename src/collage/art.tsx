// Original vector "paper" illustrations. Flat shapes on purpose: the Cutout wrapper adds
// the white border and shadow, Paper/Grain add the texture.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from './theme';
import {clamp} from './primitives';

const HAIR = '#241a14';

function Face({mustache = 0, bindi = false, earrings = false}: {mustache?: number; bindi?: boolean; earrings?: boolean}) {
  return (
    <g>
      <rect x={190} y={235} width={40} height={50} fill={C.skin} />
      <ellipse cx={210} cy={175} rx={72} ry={85} fill={C.skin} />
      <path d="M176,168 Q184,162 192,168" stroke={HAIR} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M228,168 Q236,162 244,168" stroke={HAIR} strokeWidth={5} fill="none" strokeLinecap="round" />
      <ellipse cx={184} cy={184} rx={6} ry={7} fill={HAIR} />
      <ellipse cx={236} cy={184} rx={6} ry={7} fill={HAIR} />
      <path d="M210,190 Q206,204 212,207" stroke="#8a5434" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M196,226 Q210,236 224,226" stroke="#8c2a22" strokeWidth={6} fill="none" strokeLinecap="round" />
      {bindi && <circle cx={210} cy={142} r={7} fill={C.red} />}
      {earrings && (
        <>
          <circle cx={139} cy={198} r={10} fill={C.gold} />
          <circle cx={281} cy={198} r={10} fill={C.gold} />
        </>
      )}
      {mustache > 0 && (
        <path
          transform={`translate(210 214) scale(${mustache}) translate(-210 -214)`}
          d="M210,212 C192,200 170,200 160,214 C152,224 142,220 140,210 C146,236 178,232 210,220 C242,232 274,236 280,210 C278,220 268,224 260,214 C250,200 228,200 210,212Z"
          fill={HAIR}
        />
      )}
    </g>
  );
}

/** Queen Taramati as staged in 1913. `wig` lifts the long hair + crown off (0..1). */
export function Heroine({wig = 0, width = 420, crown = true, sari = C.marigold}: {wig?: number; width?: number; crown?: boolean; sari?: string}) {
  const lift = wig * -150;
  const tilt = wig * -14;
  return (
    <svg viewBox="0 0 420 820" width={width} style={{overflow: 'visible'}}>
      {/* body */}
      <path d="M118,400 L302,400 L350,808 L70,808Z" fill={sari} />
      <rect x={70} y={770} width={280} height={38} fill={C.red} />
      {[95, 135, 175, 215, 255, 295, 335].map((x) => (
        <circle key={x} cx={x} cy={789} r={6} fill={C.gold} />
      ))}
      <path d="M180,420 L168,770 M220,420 L222,770 M258,420 L276,770" stroke="#d9952a" strokeWidth={4} />
      <path d="M140,292 Q160,330 156,432 L132,434 Q112,350 140,292Z" fill={C.skin} />
      <path d="M280,292 Q260,330 264,432 L288,434 Q308,350 280,292Z" fill={C.skin} />
      <rect x={130} y={410} width={28} height={9} fill={C.gold} />
      <rect x={262} y={410} width={28} height={9} fill={C.gold} />
      <path d="M140,290 Q210,262 280,290 L296,402 L124,402Z" fill={C.red} />
      <path d="M146,286 L206,280 L306,470 L262,500Z" fill={sari} stroke={C.red} strokeWidth={9} strokeLinejoin="round" style={{filter: 'brightness(.9)'}} />
      <Face />
      {/* short hair underneath, visible once the wig lifts */}
      <path d="M138,170 Q132,92 210,88 Q288,92 282,170 Q272,126 210,124 Q148,126 138,170Z" fill={HAIR} />
      {/* wig + crown as one piece */}
      <g transform={`translate(0 ${lift}) rotate(${tilt} 210 120)`}>
        <path d="M128,190 Q118,70 210,66 Q302,70 292,190 Q300,280 318,330 Q280,250 270,160 Q250,112 210,112 Q170,112 150,160 Q140,250 102,330 Q120,280 128,190Z" fill={HAIR} />
        <circle cx={300} cy={110} r={36} fill={HAIR} />
        {crown && (
          <>
            <path d="M150,100 L166,38 L190,84 L210,22 L230,84 L254,38 L270,100Z" fill={C.gold} stroke="#b07d17" strokeWidth={4} strokeLinejoin="round" />
            <circle cx={210} cy={70} r={9} fill={C.red} />
            <circle cx={168} cy={78} r={6} fill={C.teal} />
            <circle cx={252} cy={78} r={6} fill={C.teal} />
          </>
        )}
        <circle cx={210} cy={142} r={7} fill={C.red} />
        <circle cx={139} cy={198} r={10} fill={C.gold} />
        <circle cx={281} cy={198} r={10} fill={C.gold} />
      </g>
    </svg>
  );
}

/** A young restaurant worker with a tea tray (no portrait claimed: an illustration). */
export function Waiter({width = 420}: {width?: number}) {
  return (
    <svg viewBox="0 0 420 820" width={width} style={{overflow: 'visible'}}>
      <path d="M128,300 Q210,270 292,300 L312,808 L108,808Z" fill={C.white} />
      <path d="M150,470 L270,470 L292,808 L128,808Z" fill="#d8d1c2" />
      <path d="M150,470 L270,470" stroke={C.inkSoft} strokeWidth={6} />
      <path d="M210,300 L210,400" stroke="#cfc6b5" strokeWidth={5} />
      <path d="M134,300 Q110,360 120,450 L144,452 Q144,380 160,320Z" fill={C.white} />
      <circle cx={132} cy={462} r={18} fill={C.skin} />
      {/* raised right arm with tray */}
      <path d="M286,300 Q336,320 350,260 L372,268 Q362,350 296,350Z" fill={C.white} />
      <circle cx={362} cy={252} r={18} fill={C.skin} />
      <rect x={290} y={222} width={140} height={14} rx={5} fill="#9a9a9a" />
      <path d="M330,222 L334,196 L356,196 L360,222Z" fill={C.cream} stroke={C.inkSoft} strokeWidth={3} />
      <path d="M386,222 L389,200 L405,200 L408,222Z" fill={C.cream} stroke={C.inkSoft} strokeWidth={3} />
      <path d="M346,190 Q340,176 348,164 M396,194 Q390,180 398,168" stroke="#9c8f7b" strokeWidth={3} fill="none" />
      <path d="M140,165 Q138,95 210,92 Q282,95 280,165 Q270,128 210,126 Q150,128 140,165Z" fill={HAIR} />
      <Face />
      <path d="M140,150 Q140,86 210,84 Q280,86 280,150 Q262,112 210,110 Q158,112 140,150Z" fill={HAIR} />
    </svg>
  );
}

export function Necklace({width = 560}: {width?: number}) {
  const beads = Array.from({length: 23}, (_, i) => {
    const a = Math.PI * (0.08 + (0.84 * i) / 22);
    return {x: 280 - Math.cos(a) * 230, y: 40 + Math.sin(a) * 250, r: i % 3 === 0 ? 17 : 12};
  });
  return (
    <svg viewBox="0 0 560 520" width={width} style={{overflow: 'visible'}}>
      <path d="M50,60 Q280,560 510,60" fill="none" stroke="#b07d17" strokeWidth={5} />
      {beads.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={i % 3 === 0 ? C.red : C.gold} stroke="#9a6b10" strokeWidth={3} />
      ))}
      <path d="M280,268 C330,300 330,380 280,430 C230,380 230,300 280,268Z" fill={C.gold} stroke="#9a6b10" strokeWidth={5} />
      <path d="M280,300 C306,322 306,370 280,398 C254,370 254,322 280,300Z" fill={C.red} />
      <circle cx={272} cy={330} r={7} fill="#ffb3a8" />
      {[250, 280, 310].map((x, i) => (
        <g key={x}>
          <line x1={x} y1={420} x2={x} y2={450 + i * 8} stroke="#b07d17" strokeWidth={3} />
          <circle cx={x} cy={458 + i * 8} r={9} fill={C.white} stroke="#c9bca4" strokeWidth={2} />
        </g>
      ))}
    </svg>
  );
}

/** Cinema screen showing a silent-film intertitle. `flicker` is 0..1 brightness. */
export function Screen({width = 900, flicker = 1, children}: {width?: number; flicker?: number; children?: React.ReactNode}) {
  const h = width * 0.62;
  return (
    <div style={{position: 'relative', width, height: h}}>
      <div style={{position: 'absolute', inset: -26, background: '#5c1d1b', borderRadius: 6, boxShadow: 'inset 0 0 0 10px #7d2a26'}} />
      <div style={{position: 'absolute', inset: 0, background: `rgb(${232 * flicker},${226 * flicker},${206 * flicker})`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {children}
      </div>
    </div>
  );
}

export function Audience({width = 1200, rows = 2, seed = 0}: {width?: number; rows?: number; seed?: number}) {
  const heads = [];
  for (let r = 0; r < rows; r++) {
    for (let i = 0; i < 7; i++) {
      const x = 80 + i * 175 + (r % 2) * 85 + ((i * 37 + seed) % 30);
      const y = 140 + r * 120;
      const s = 1 + r * 0.25;
      heads.push(
        <g key={`${r}-${i}`} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M-70,120 Q-70,50 0,46 Q70,50 70,120Z" fill={r === rows - 1 ? '#0b0b10' : '#191922'} />
          <circle cx={0} cy={10} r={40} fill={r === rows - 1 ? '#0b0b10' : '#191922'} />
          {(i + r) % 3 === 0 && <path d="M-44,-10 L44,-10 L30,-46 L-30,-46Z" fill={r === rows - 1 ? '#0b0b10' : '#191922'} />}
        </g>,
      );
    }
  }
  return (
    <svg viewBox="0 0 1300 420" width={width} style={{overflow: 'visible'}}>
      {heads}
    </svg>
  );
}

export function Crown({width = 220}: {width?: number}) {
  return (
    <svg viewBox="0 0 220 160" width={width}>
      <path d="M20,140 L10,40 L60,90 L110,10 L160,90 L210,40 L200,140Z" fill={C.gold} stroke="#9a6b10" strokeWidth={6} strokeLinejoin="round" />
      <rect x={18} y={126} width={184} height={24} fill="#d19a22" stroke="#9a6b10" strokeWidth={5} />
      <circle cx={110} cy={92} r={14} fill={C.red} />
      <circle cx={58} cy={112} r={9} fill={C.teal} />
      <circle cx={162} cy={112} r={9} fill={C.teal} />
    </svg>
  );
}

export function Bow({width = 260}: {width?: number}) {
  return (
    <svg viewBox="0 0 260 360" width={width}>
      <path d="M60,20 Q230,180 60,340" fill="none" stroke="#7a4a22" strokeWidth={16} strokeLinecap="round" />
      <line x1={60} y1={20} x2={60} y2={340} stroke={C.ink} strokeWidth={3} />
      <line x1={20} y1={180} x2={250} y2={180} stroke="#5a3a1a" strokeWidth={7} />
      <path d="M250,180 L222,166 L222,194Z" fill={C.ink} />
      <path d="M20,180 L36,166 L46,180 L36,194Z" fill={C.red} />
    </svg>
  );
}

export function Feather({width = 180}: {width?: number}) {
  return (
    <svg viewBox="0 0 180 380" width={width}>
      <path d="M90,370 Q86,200 90,40" stroke="#5f6b2a" strokeWidth={5} fill="none" />
      <path d="M90,30 Q10,120 40,260 Q70,330 90,360 Q110,330 140,260 Q170,120 90,30Z" fill="#2d8a5d" />
      <ellipse cx={90} cy={120} rx={42} ry={54} fill="#1b5aa6" />
      <ellipse cx={90} cy={126} rx={26} ry={34} fill={C.gold} />
      <ellipse cx={90} cy={130} rx={13} ry={18} fill="#13244e" />
    </svg>
  );
}

export function Pot({width = 300}: {width?: number}) {
  return (
    <svg viewBox="0 0 300 240" width={width}>
      <rect x={20} y={10} width={260} height={46} rx={8} fill="#b85c38" />
      <path d="M40,56 L260,56 L230,232 L70,232Z" fill="#c86a42" />
      <path d="M60,90 L240,90" stroke="#a9502f" strokeWidth={6} />
      <ellipse cx={150} cy={14} rx={124} ry={12} fill="#5b3a26" />
    </svg>
  );
}

/** Pea plant that grows in stop-motion steps (`steps` frames of growth). */
export function PeaPlant({growth, width = 320}: {growth: number; width?: number}) {
  const g = Math.max(0, Math.min(1, growth));
  const height = 40 + g * 520;
  const stem = `M160,600 C${150 - g * 30},${600 - height * 0.35} ${170 + g * 40},${600 - height * 0.7} 160,${600 - height}`;
  const leaves = [0.18, 0.34, 0.5, 0.64, 0.78, 0.9].filter((at) => g > at);
  return (
    <svg viewBox="0 0 320 620" width={width} style={{overflow: 'visible'}}>
      <path d={stem} stroke="#3f7a2e" strokeWidth={10} fill="none" strokeLinecap="round" />
      {leaves.map((at, i) => {
        const y = 600 - height * (at / Math.max(g, 0.01)) * 0.92;
        const side = i % 2 ? 1 : -1;
        const grow = Math.min(1, (g - at) * 8);
        return (
          <g key={at} transform={`translate(160 ${y}) scale(${side * grow} ${grow})`}>
            <path d="M0,0 C30,-40 90,-30 100,-6 C80,16 30,22 0,0Z" fill={i % 2 ? '#5aa33f' : '#4b9135'} />
            <path d="M0,0 C30,-10 60,-12 96,-8" stroke="#2f6324" strokeWidth={3} fill="none" />
          </g>
        );
      })}
      {g > 0.82 && <path d={`M160,${600 - height} q30,-30 10,-50 q-20,-20 -8,-40`} stroke="#4b9135" strokeWidth={5} fill="none" />}
      {g > 0.95 && <ellipse cx={130} cy={600 - height * 0.55} rx={16} ry={34} fill="#7cc05a" transform={`rotate(20 130 ${600 - height * 0.55})`} />}
    </svg>
  );
}

export function FilmStrip({frames = 6, frameWidth = 260, children}: {frames?: number; frameWidth?: number; children: (i: number) => React.ReactNode}) {
  const h = frameWidth * 0.8;
  return (
    <div style={{display: 'flex', background: '#16120f', padding: '34px 10px', gap: 14, position: 'relative'}}>
      {[0, 1].map((side) => (
        <div key={side} style={{position: 'absolute', left: 0, right: 0, [side ? 'bottom' : 'top']: 9, display: 'flex', gap: 22, paddingLeft: 12}}>
          {Array.from({length: frames * 6}, (_, i) => (
            <div key={i} style={{width: 20, height: 16, background: C.cream, borderRadius: 3, flexShrink: 0}} />
          ))}
        </div>
      ))}
      {Array.from({length: frames}, (_, i) => (
        <div key={i} style={{width: frameWidth, height: h, background: '#e9dfc6', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
          {children(i)}
        </div>
      ))}
    </div>
  );
}

export function Ship({width = 300}: {width?: number}) {
  const frame = useCurrentFrame();
  return (
    <svg viewBox="0 0 300 220" width={width} style={{overflow: 'visible'}}>
      {[0, 1, 2].map((i) => {
        const p = ((frame / 30 + i * 0.33) % 1);
        return <circle key={i} cx={150 + p * -60} cy={40 - p * 70} r={14 + p * 22} fill="#8a8178" opacity={0.7 * (1 - p)} />;
      })}
      <rect x={130} y={50} width={36} height={70} fill={C.red} />
      <rect x={130} y={50} width={36} height={14} fill={C.ink} />
      <rect x={70} y={110} width={170} height={40} fill={C.white} />
      {[90, 125, 160, 195].map((x) => (
        <circle key={x} cx={x} cy={130} r={7} fill={C.indigo} />
      ))}
      <path d="M20,150 L280,150 L245,205 L55,205Z" fill={C.ink} />
    </svg>
  );
}

/** Hand-cranked wooden cine camera on a tripod. `crank` rotates the handle (degrees). */
export function MovieCamera({width = 460, crank = 0}: {width?: number; crank?: number}) {
  return (
    <svg viewBox="0 0 460 600" width={width} style={{overflow: 'visible'}}>
      <path d="M230,340 L120,590 M230,340 L340,590 M230,340 L230,595" stroke="#5a3a1a" strokeWidth={16} strokeLinecap="round" />
      {[{x: 150, r: 74}, {x: 300, r: 74}].map(({x, r}, i) => (
        <g key={i} transform={`rotate(${crank * (i ? 1 : -1)} ${x} 110)`}>
          <circle cx={x} cy={110} r={r} fill={C.ink} />
          <circle cx={x} cy={110} r={r - 14} fill="#3a332c" />
          {[0, 60, 120].map((a) => (
            <rect key={a} x={x - 6} y={110 - r + 18} width={12} height={(r - 18) * 2} fill={C.ink} transform={`rotate(${a} ${x} 110)`} />
          ))}
          <circle cx={x} cy={110} r={14} fill={C.gold} />
        </g>
      ))}
      <rect x={90} y={170} width={280} height={180} rx={10} fill="#8b5a2b" stroke="#5a3a1a" strokeWidth={8} />
      <path d="M110,200 L350,200 M110,320 L350,320" stroke="#a87545" strokeWidth={6} />
      <rect x={20} y={220} width={80} height={80} rx={8} fill={C.ink} />
      <circle cx={30} cy={260} r={30} fill="#2e3b52" stroke={C.gold} strokeWidth={6} />
      <circle cx={24} cy={252} r={8} fill="#9fb4d6" />
      <g transform={`rotate(${crank} 380 260)`}>
        <line x1={380} y1={260} x2={430} y2={260} stroke={C.gold} strokeWidth={10} strokeLinecap="round" />
        <rect x={420} y={250} width={14} height={40} rx={5} fill={C.ink} />
      </g>
      <circle cx={380} cy={260} r={14} fill={C.gold} />
    </svg>
  );
}

export function DevTray({width = 300}: {width?: number}) {
  const frame = useCurrentFrame();
  const wave = Math.sin(frame / 6) * 4;
  return (
    <svg viewBox="0 0 300 220" width={width}>
      <rect x={10} y={60} width={280} height={140} rx={12} fill="#4a4f55" />
      <rect x={24} y={74} width={252} height={112} rx={8} fill="#7a3b23" />
      <path d={`M24,${110 + wave} Q90,${100 - wave} 150,${110 + wave} T276,${110 - wave} L276,186 L24,186Z`} fill="#9a4c2c" opacity={0.7} />
      <rect x={60} y={20} width={60} height={140} fill="#2a2420" transform="rotate(-12 90 90)" />
      <rect x={170} y={30} width={60} height={140} fill="#2a2420" transform="rotate(8 200 100)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={72} y={32 + i * 26} width={36} height={18} fill="#d6b48a" transform="rotate(-12 90 90)" />
      ))}
    </svg>
  );
}

export function Reel({width = 260, spin = 0}: {width?: number; spin?: number}) {
  return (
    <svg viewBox="0 0 260 260" width={width}>
      <g transform={`rotate(${spin} 130 130)`}>
        <circle cx={130} cy={130} r={120} fill="#3d3d44" />
        <circle cx={130} cy={130} r={100} fill="#24242a" />
        {[0, 72, 144, 216, 288].map((a) => (
          <circle key={a} cx={130 + Math.cos((a * Math.PI) / 180) * 58} cy={130 + Math.sin((a * Math.PI) / 180) * 58} r={26} fill={C.cream} />
        ))}
        <circle cx={130} cy={130} r={18} fill={C.gold} />
      </g>
    </svg>
  );
}

export function CookingPot({width = 300}: {width?: number}) {
  const frame = useCurrentFrame();
  return (
    <svg viewBox="0 0 300 300" width={width} style={{overflow: 'visible'}}>
      {[0, 1, 2].map((i) => {
        const p = ((frame / 40 + i / 3) % 1);
        return <path key={i} d={`M${100 + i * 50},${120 - p * 90} q-18,-22 0,-44 q18,-22 0,-44`} stroke="#b9b0a2" strokeWidth={8} fill="none" strokeLinecap="round" opacity={(1 - p) * 0.8} />;
      })}
      <path d="M40,150 Q40,280 150,282 Q260,280 260,150Z" fill="#9b9b9b" />
      <rect x={30} y={130} width={240} height={26} rx={10} fill="#7d7d7d" />
      <path d="M30,146 Q0,146 8,170 M270,146 Q300,146 292,170" stroke="#5e5e5e" strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M60,250 Q150,300 240,250" stroke={C.red} strokeWidth={0} />
      {[[-20, 0], [0, 0], [20, 0]].map(([dx], i) => (
        <path key={i} d={`M${120 + dx * 2},300 q10,-26 20,0 q10,-26 20,0`} fill={C.marigold} />
      ))}
    </svg>
  );
}

export function Coin({width = 180, label = '₹'}: {width?: number; label?: string}) {
  return (
    <svg viewBox="0 0 180 180" width={width}>
      <circle cx={90} cy={90} r={84} fill="#c9c3b5" stroke="#8d877a" strokeWidth={8} />
      <circle cx={90} cy={90} r={64} fill="none" stroke="#a49e90" strokeWidth={4} />
      <text x={90} y={116} textAnchor="middle" fontFamily="Mukta" fontWeight={800} fontSize={76} fill="#6d675b">
        {label}
      </text>
    </svg>
  );
}

/** Golden lotus medallion (a stylised Swarna Kamal) on a ribbon. */
export function LotusMedal({width = 420}: {width?: number}) {
  const petals = Array.from({length: 7}, (_, i) => -60 + i * 20);
  return (
    <svg viewBox="0 0 420 560" width={width} style={{overflow: 'visible'}}>
      <path d="M150,0 L210,190 L270,0 L320,0 L240,210 L180,210 L100,0Z" fill={C.red} />
      <path d="M150,0 L180,0 L225,160 L210,190Z" fill="#a82a22" />
      <circle cx={210} cy={340} r={190} fill="#c8902a" />
      <circle cx={210} cy={340} r={170} fill={C.gold} />
      <circle cx={210} cy={340} r={150} fill="none" stroke="#b07d17" strokeWidth={5} strokeDasharray="4 10" />
      {petals.map((a) => (
        <path key={a} d="M210,420 C175,360 180,290 210,250 C240,290 245,360 210,420Z" fill={a === 0 ? '#fff0c2' : '#f6d27a'} stroke="#b07d17" strokeWidth={4} transform={`rotate(${a} 210 420)`} />
      ))}
      <path d="M130,430 Q210,460 290,430" stroke="#b07d17" strokeWidth={8} fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Sunburst({size = 2400, spin = 0, color = C.marigold, bg = C.cream, rays = 24}: {size?: number; spin?: number; color?: string; bg?: string; rays?: number}) {
  const r = size / 2;
  return (
    <svg viewBox={`${-r} ${-r} ${size} ${size}`} width={size} height={size}>
      <rect x={-r} y={-r} width={size} height={size} fill={bg} />
      <g transform={`rotate(${spin})`}>
        {Array.from({length: rays}, (_, i) => {
          const a0 = (i / rays) * Math.PI * 2;
          const a1 = a0 + Math.PI / rays;
          return <path key={i} d={`M0,0 L${Math.cos(a0) * r * 1.5},${Math.sin(a0) * r * 1.5} L${Math.cos(a1) * r * 1.5},${Math.sin(a1) * r * 1.5}Z`} fill={color} />;
        })}
      </g>
    </svg>
  );
}

/** Projector light cone from the back of the hall. */
export function Beam({width = 1080, height = 1300, flicker = 1}: {width?: number; height?: number; flicker?: number}) {
  return (
    <svg width={width} height={height} style={{position: 'absolute', left: 0, top: 0, mixBlendMode: 'screen'}}>
      <defs>
        <linearGradient id="beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fff6d8" stopOpacity={0.55 * flicker} />
          <stop offset="1" stopColor="#fff6d8" stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <path d={`M${width / 2 - 30},${height} L${width / 2 + 30},${height} L${width - 70},140 L70,140Z`} fill="url(#beam)" />
    </svg>
  );
}

/** Deterministic projector flicker 0.82..1 that changes on twos. */
export function useFlicker(seed = 0) {
  const frame = useCurrentFrame();
  const k = Math.floor(frame / 2);
  const v = Math.sin(k * 12.9898 + seed * 78.233) * 43758.5453;
  return 0.84 + (v - Math.floor(v)) * 0.16;
}

/** Progress of a stepped (stop-motion) growth between two frames. */
export function useSteps(from: number, to: number, steps: number) {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [from, to], [0, 1], clamp);
  return Math.floor(p * steps) / steps;
}

// ---------------------------------------------------------------- campus kit (college Short)

/** Generic student: shirt colour, optional glasses/book. Same face construction as the other figures. */
export function Student({width = 380, shirt = C.teal, glasses = false, book = false, hair = 'short'}: {width?: number; shirt?: string; glasses?: boolean; book?: boolean; hair?: 'short' | 'puff'}) {
  return (
    <svg viewBox="0 0 420 820" width={width} style={{overflow: 'visible'}}>
      <path d="M150,560 L200,560 L196,800 L156,800Z" fill="#2c3550" />
      <path d="M220,560 L270,560 L264,800 L224,800Z" fill="#2c3550" />
      <ellipse cx={170} cy={806} rx={34} ry={14} fill="#1d1a17" />
      <ellipse cx={250} cy={806} rx={34} ry={14} fill="#1d1a17" />
      <path d="M128,300 Q210,272 292,300 L300,570 L120,570Z" fill={shirt} />
      <path d="M190,292 L210,330 L230,292" fill="none" stroke={C.white} strokeWidth={8} strokeLinejoin="round" />
      <path d="M132,302 Q104,372 116,460 L142,462 Q144,390 160,322Z" fill={shirt} />
      <circle cx={130} cy={472} r={18} fill={C.skin} />
      {book ? (
        <g>
          <path d="M288,302 Q330,340 300,420 L276,412 Q296,360 270,322Z" fill={shirt} />
          <rect x={232} y={392} width={110} height={78} rx={6} fill={C.red} transform="rotate(-12 287 431)" />
          <rect x={240} y={400} width={94} height={8} fill={C.white} transform="rotate(-12 287 431)" />
          <circle cx={292} cy={424} r={17} fill={C.skin} />
        </g>
      ) : (
        <>
          <path d="M288,302 Q316,372 304,460 L278,462 Q276,390 260,322Z" fill={shirt} />
          <circle cx={290} cy={472} r={18} fill={C.skin} />
        </>
      )}
      <Face />
      {hair === 'puff' ? (
        <path d="M134,170 Q120,70 210,66 Q300,70 286,170 Q280,110 210,108 Q140,110 134,170Z" fill={HAIR} />
      ) : (
        <path d="M138,170 Q132,92 210,88 Q288,92 282,170 Q272,126 210,124 Q148,126 138,170Z" fill={HAIR} />
      )}
      {glasses && (
        <g fill="none" stroke={C.ink} strokeWidth={6}>
          <circle cx={184} cy={186} r={22} />
          <circle cx={236} cy={186} r={22} />
          <line x1={206} y1={186} x2={214} y2={186} />
        </g>
      )}
    </svg>
  );
}

export function CollegeBuilding({width = 820, name = 'COLLEGE'}: {width?: number; name?: string}) {
  return (
    <svg viewBox="0 0 820 620" width={width} style={{overflow: 'visible'}}>
      <path d="M60,200 L410,40 L760,200Z" fill="#b5523b" />
      <path d="M90,196 L410,62 L730,196Z" fill="#c9634a" />
      <circle cx={410} cy={140} r={46} fill={C.cream} stroke={C.ink} strokeWidth={6} />
      <path d="M410,140 L410,108 M410,140 L432,150" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <rect x={60} y={200} width={700} height={44} fill={C.cream} />
      <text x={410} y={234} textAnchor="middle" fontFamily="Special Elite" fontSize={34} letterSpacing={8} fill={C.ink}>{name}</text>
      <rect x={80} y={244} width={660} height={330} fill="#e9d8b4" />
      {[120, 230, 340, 480, 590, 700].map((x) => (
        <rect key={x} x={x - 22} y={250} width={44} height={324} fill={C.white} />
      ))}
      {[175, 285, 535, 645].map((x) => (
        <g key={x}>
          <rect x={x - 26} y={300} width={52} height={70} rx={26} fill={C.indigo} />
          <rect x={x - 26} y={430} width={52} height={70} rx={4} fill={C.indigo} />
        </g>
      ))}
      <path d="M370,574 L370,440 Q410,396 450,440 L450,574Z" fill="#6b3b26" />
      <rect x={40} y={574} width={740} height={40} fill="#a99a80" />
    </svg>
  );
}

export function Guitar({width = 220, rotate = -30}: {width?: number; rotate?: number}) {
  return (
    <svg viewBox="0 0 220 520" width={width} style={{overflow: 'visible'}}>
      <g transform={`rotate(${rotate} 110 330)`}>
        <rect x={98} y={20} width={24} height={250} fill="#5a3a1a" />
        <rect x={88} y={0} width={44} height={46} rx={8} fill="#3d2812" />
        <path d="M110,240 C40,240 30,330 70,350 C20,380 40,500 110,500 C180,500 200,380 150,350 C190,330 180,240 110,240Z" fill={C.red} />
        <circle cx={110} cy={340} r={26} fill="#3d1410" />
        <rect x={84} y={420} width={52} height={12} fill="#3d2812" />
        {[102, 108, 114, 120].map((x) => (
          <line key={x} x1={x} y1={10} x2={x} y2={426} stroke="#e8d9b8" strokeWidth={1.5} />
        ))}
      </g>
    </svg>
  );
}

export function MusicNote({width = 90, color = C.ink}: {width?: number; color?: string}) {
  return (
    <svg viewBox="0 0 90 120" width={width}>
      <ellipse cx={28} cy={96} rx={24} ry={18} fill={color} transform="rotate(-20 28 96)" />
      <rect x={46} y={10} width={8} height={88} fill={color} />
      <path d="M54,10 Q84,24 80,58 Q72,36 54,34Z" fill={color} />
    </svg>
  );
}

export function MicStand({width = 160}: {width?: number}) {
  return (
    <svg viewBox="0 0 160 520" width={width}>
      <line x1={80} y1={120} x2={80} y2={480} stroke="#2a2a2e" strokeWidth={10} />
      <path d="M20,500 L80,470 L140,500" stroke="#2a2a2e" strokeWidth={10} fill="none" strokeLinecap="round" />
      <rect x={56} y={30} width={48} height={96} rx={24} fill="#3a3a40" />
      <rect x={60} y={34} width={40} height={50} rx={20} fill="#8d8d96" />
    </svg>
  );
}

export function Book({width = 220, color = C.indigo, label = ''}: {width?: number; color?: string; label?: string}) {
  return (
    <svg viewBox="0 0 220 280" width={width}>
      <rect x={20} y={10} width={180} height={250} rx={8} fill={color} />
      <rect x={20} y={10} width={22} height={250} fill="rgba(0,0,0,.25)" />
      <rect x={196} y={20} width={10} height={232} fill={C.cream} />
      <rect x={66} y={70} width={100} height={46} fill={C.cream} />
      {label && (
        <text x={116} y={102} textAnchor="middle" fontFamily="Mukta" fontWeight={800} fontSize={26} fill={C.ink}>{label}</text>
      )}
    </svg>
  );
}

export function BoxingGlove({width = 220}: {width?: number}) {
  return (
    <svg viewBox="0 0 220 240" width={width}>
      <path d="M40,120 C30,50 90,20 140,30 C200,40 210,110 190,150 C175,180 140,190 100,186 L60,186 C40,170 42,150 40,120Z" fill={C.red} />
      <path d="M50,110 C40,80 60,70 80,82" stroke="#a62820" strokeWidth={8} fill="none" />
      <rect x={52} y={180} width={110} height={50} rx={10} fill={C.white} />
      <rect x={52} y={196} width={110} height={10} fill={C.red} />
    </svg>
  );
}

export function Bicycle({width = 360, color = C.red, spin = 0}: {width?: number; color?: string; spin?: number}) {
  const wheel = (cx: number) => (
    <g transform={`rotate(${spin} ${cx} 150)`}>
      <circle cx={cx} cy={150} r={62} fill="none" stroke={C.ink} strokeWidth={10} />
      {[0, 45, 90, 135].map((a) => (
        <line key={a} x1={cx} y1={92} x2={cx} y2={208} stroke={C.inkSoft} strokeWidth={3} transform={`rotate(${a} ${cx} 150)`} />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 360 230" width={width} style={{overflow: 'visible'}}>
      {wheel(80)}
      {wheel(280)}
      <path d="M80,150 L160,150 L240,72 L130,72 L80,150 M160,150 L120,40 M240,72 L280,150 M228,40 L240,72" fill="none" stroke={color} strokeWidth={12} strokeLinejoin="round" strokeLinecap="round" />
      <rect x={96} y={28} width={54} height={14} rx={7} fill={C.ink} />
      <path d="M216,40 L250,34" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    </svg>
  );
}

export function Basketball({width = 160, spin = 0}: {width?: number; spin?: number}) {
  return (
    <svg viewBox="0 0 160 160" width={width}>
      <g transform={`rotate(${spin} 80 80)`}>
        <circle cx={80} cy={80} r={74} fill="#e2762c" stroke="#5a2c10" strokeWidth={5} />
        <path d="M6,80 L154,80 M80,6 L80,154 M28,28 Q80,80 28,132 M132,28 Q80,80 132,132" stroke="#5a2c10" strokeWidth={5} fill="none" />
      </g>
    </svg>
  );
}

export function Hoop({width = 340}: {width?: number}) {
  return (
    <svg viewBox="0 0 340 420" width={width}>
      <rect x={160} y={200} width={20} height={220} fill="#5d6470" />
      <rect x={30} y={10} width={280} height={190} rx={8} fill={C.white} stroke={C.ink} strokeWidth={8} />
      <rect x={120} y={80} width={100} height={76} fill="none" stroke={C.red} strokeWidth={8} />
      <ellipse cx={170} cy={186} rx={66} ry={12} fill="none" stroke="#e2762c" strokeWidth={9} />
      <path d="M108,188 L126,260 L150,190 L170,262 L190,190 L214,260 L232,188" stroke={C.white} strokeWidth={4} fill="none" />
    </svg>
  );
}

export function Heart({width = 140, color = C.red}: {width?: number; color?: string}) {
  return (
    <svg viewBox="0 0 140 126" width={width}>
      <path d="M70,120 C10,80 0,50 10,28 C24,0 60,4 70,30 C80,4 116,0 130,28 C140,50 130,80 70,120Z" fill={color} />
      <ellipse cx={40} cy={34} rx={12} ry={8} fill="#fff" opacity={0.35} transform="rotate(-30 40 34)" />
    </svg>
  );
}

export function Chai({width = 150}: {width?: number}) {
  const frame = useCurrentFrame();
  return (
    <svg viewBox="0 0 150 200" width={width} style={{overflow: 'visible'}}>
      {[0, 1].map((i) => {
        const p = (frame / 40 + i / 2) % 1;
        return <path key={i} d={`M${58 + i * 34},${70 - p * 60} q-12,-16 0,-30 q12,-16 0,-30`} stroke="#b9b0a2" strokeWidth={6} fill="none" strokeLinecap="round" opacity={(1 - p) * 0.8} />;
      })}
      <path d="M30,80 L120,80 L108,190 L42,190Z" fill="rgba(255,255,255,.75)" stroke="#9c9486" strokeWidth={4} />
      <path d="M36,110 L114,110 L108,186 L42,186Z" fill="#b8763c" />
    </svg>
  );
}
