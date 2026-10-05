// Motion primitives for the paper-collage look. Every value derives from the current frame,
// so renders are deterministic: no CSS animation, timers or Math.random.
import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from './theme';
import type {Timing} from './timeline';

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const SPRING = {
  snappy: {damping: 13, stiffness: 190, mass: 0.7},
  bouncy: {damping: 8, stiffness: 150, mass: 0.8},
  soft: {damping: 22, stiffness: 80, mass: 1},
  heavy: {damping: 15, stiffness: 120, mass: 1.6},
};

export function useEnter(delay = 0, config = SPRING.snappy) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config});
}

/** Linear 0→1 progress between two frames, clamped. */
export function useProgress(from: number, to: number, easing = Easing.inOut(Easing.cubic)) {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [0, 1], {...clamp, easing});
}

// ---------------------------------------------------------------- surfaces

/** Paper stock with fibres. Static texture: seed never changes so it does not boil. */
export function Paper({color = C.cream, fibre = 0.5, seed = 3}: {color?: string; fibre?: number; seed?: number}) {
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: color}}>
      <svg width={width} height={height} style={{position: 'absolute', inset: 0, opacity: fibre, mixBlendMode: 'multiply'}}>
        <filter id={`paper-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves={4} seed={seed} />
          <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.36  0 0 0 0 0.25  0 0 0 0.55 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#paper-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
}

/** Film grain + vignette over the whole frame. Grain reseeds every 2 frames like real stock. */
export function Grain({strength = 0.16}: {strength?: number}) {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const seed = Math.floor(frame / 2) % 50;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <svg width={width} height={height} style={{position: 'absolute', inset: 0, opacity: strength, mixBlendMode: 'multiply'}}>
        <filter id={`grain-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(30,20,10,.45) 100%)'}} />
    </AbsoluteFill>
  );
}

/** White paper border + soft drop shadow around any alpha shape (SVG art or cut-out PNG). */
export function Cutout({border = 7, shadow = 0.38, lift = 14, children, style}: {border?: number; shadow?: number; lift?: number; children: React.ReactNode; style?: React.CSSProperties}) {
  const b = border;
  const edge = [`${b}px 0`, `-${b}px 0`, `0 ${b}px`, `0 -${b}px`, `${b * 0.7}px ${b * 0.7}px`, `-${b * 0.7}px ${b * 0.7}px`, `${b * 0.7}px -${b * 0.7}px`, `-${b * 0.7}px -${b * 0.7}px`]
    .map((o) => `drop-shadow(${o} 0 ${C.white})`)
    .join(' ');
  return <div style={{filter: `${edge} drop-shadow(${lift * 0.4}px ${lift}px ${lift * 0.8}px rgba(20,12,4,${shadow}))`, ...style}}>{children}</div>;
}

// ---------------------------------------------------------------- placement and entrances

/** Absolutely position a centred element in frame pixels. */
export function Place({x, y, rotate = 0, scale = 1, z, children, style}: {x: number; y: number; rotate?: number; scale?: number; z?: number; children: React.ReactNode; style?: React.CSSProperties}) {
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 'max-content', zIndex: z, transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`, ...style}}>
      {children}
    </div>
  );
}

export type EnterKind = 'pop' | 'drop' | 'rise' | 'left' | 'right' | 'swing' | 'flip' | 'fade';

/** Entrance animation. `exit` (frame) plays a quick pop-out. */
export function Enter({kind = 'pop', delay = 0, exit, config, children}: {kind?: EnterKind; delay?: number; exit?: number; config?: typeof SPRING.snappy; children: React.ReactNode}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = spring({frame: frame - delay, fps, config: config ?? (kind === 'pop' ? SPRING.bouncy : SPRING.snappy)});
  const out = exit === undefined ? 0 : interpolate(frame, [exit, exit + 7], [0, 1], {...clamp, easing: Easing.in(Easing.back(2))});
  if (frame < delay) return null;
  const transforms: Record<EnterKind, string> = {
    pop: `scale(${e})`,
    drop: `translateY(${(1 - e) * -1400}px) rotate(${(1 - e) * -12}deg)`,
    rise: `translateY(${(1 - e) * 1300}px)`,
    left: `translateX(${(1 - e) * -1300}px) rotate(${(1 - e) * -8}deg)`,
    right: `translateX(${(1 - e) * 1300}px) rotate(${(1 - e) * 8}deg)`,
    swing: `rotate(${(1 - e) * 35}deg)`,
    flip: `perspective(1400px) rotateY(${(1 - e) * 90}deg)`,
    fade: 'none',
  };
  const opacity = kind === 'fade' ? Math.min(1, e) : 1;
  return (
    <div style={{transform: `${transforms[kind]} scale(${1 - out})`, transformOrigin: kind === 'swing' ? '50% 0%' : '50% 50%', opacity: opacity * (1 - out)}}>
      {children}
    </div>
  );
}

/** Small idle motion so held cut-outs never look frozen. */
export function Float({amp = 6, speed = 0.05, phase = 0, rotate = 1.2, children}: {amp?: number; speed?: number; phase?: number; rotate?: number; children: React.ReactNode}) {
  const frame = useCurrentFrame();
  const y = Math.sin(frame * speed + phase) * amp;
  const r = Math.sin(frame * speed * 0.7 + phase + 1) * rotate;
  return <div style={{transform: `translateY(${y}px) rotate(${r}deg)`}}>{children}</div>;
}

/** Stop-motion jitter: snaps position/rotation on twos for a hand-animated feel. */
export function Jitter({amount = 2.5, seed = 1, children}: {amount?: number; seed?: number; children: React.ReactNode}) {
  const frame = Math.floor(useCurrentFrame() / 3);
  const x = (random(`jx-${seed}-${frame}`) - 0.5) * amount;
  const y = (random(`jy-${seed}-${frame}`) - 0.5) * amount;
  const r = (random(`jr-${seed}-${frame}`) - 0.5) * amount * 0.4;
  return <div style={{transform: `translate(${x}px, ${y}px) rotate(${r}deg)`}}>{children}</div>;
}

/** Camera shake starting at `at` frame. Returns a transform string. */
export function useShake(at: number, amp = 18, duration = 10) {
  const frame = useCurrentFrame();
  const local = frame - at;
  if (local < 0 || local > duration) return 'none';
  const decay = 1 - local / duration;
  const x = (random(`sx-${at}-${local}`) - 0.5) * 2 * amp * decay;
  const y = (random(`sy-${at}-${local}`) - 0.5) * 2 * amp * decay;
  return `translate(${x}px, ${y}px)`;
}

export function Shake({at, amp, duration, children}: {at: number[]; amp?: number; duration?: number; children: React.ReactNode}) {
  // Hooks need a fixed call count: support up to four shake points per wrapper.
  const points = [...at, -999, -999, -999, -999].slice(0, 4);
  const t = points.map((p) => useShake(p, amp, duration)).filter((s) => s !== 'none');
  return <AbsoluteFill style={{transform: t.join(' ') || 'none'}}>{children}</AbsoluteFill>;
}

// ---------------------------------------------------------------- camera and parallax

const CameraContext = createContext({x: 0, y: 0});

/** Slow zoom/pan across a beat. Layers inside read the drift for parallax. */
export function Camera({duration, zoom = [1, 1.08], pan = [0, 0], tilt = [0, 0], children}: {duration: number; zoom?: [number, number]; pan?: [number, number]; tilt?: [number, number]; children: React.ReactNode}) {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, duration], [0, 1], {...clamp, easing: Easing.inOut(Easing.sin)});
  const z = zoom[0] + (zoom[1] - zoom[0]) * p;
  const x = pan[0] + (pan[1] - pan[0]) * p;
  const y = tilt[0] + (tilt[1] - tilt[0]) * p;
  return (
    <CameraContext.Provider value={{x, y}}>
      <AbsoluteFill style={{transform: `scale(${z}) translate(${x}px, ${y}px)`}}>{children}</AbsoluteFill>
    </CameraContext.Provider>
  );
}

/** depth 0 = locked to the board, 1 = moves with the camera again (foreground pops). */
export function Layer({depth, children}: {depth: number; children: React.ReactNode}) {
  const {x, y} = useContext(CameraContext);
  return <AbsoluteFill style={{transform: `translate(${x * depth}px, ${y * depth}px)`}}>{children}</AbsoluteFill>;
}

// ---------------------------------------------------------------- type and marks

/** Torn-edge polygon around a rectangle; deterministic per seed. */
export function tornPath(w: number, h: number, seed: string, jag = 10, step = 22) {
  const pts: string[] = [];
  const edge = (x0: number, y0: number, x1: number, y1: number, side: string) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    const n = Math.max(2, Math.round(len / step));
    const nx = -(y1 - y0) / len;
    const ny = (x1 - x0) / len;
    for (let i = 0; i < n; i++) {
      const t = i / n;
      const d = (random(`${seed}-${side}-${i}`) - 0.5) * jag;
      pts.push(`${(x0 + (x1 - x0) * t + nx * d).toFixed(1)},${(y0 + (y1 - y0) * t + ny * d).toFixed(1)}`);
    }
  };
  edge(0, 0, w, 0, 't');
  edge(w, 0, w, h, 'r');
  edge(w, h, 0, h, 'b');
  edge(0, h, 0, 0, 'l');
  return `M${pts.join(' L')} Z`;
}

/** A label on a torn paper strip. Size is measured from text length so it never clips. */
export function TornLabel({children, bg = C.white, color = C.ink, font = FONT.display, size = 64, padX = 34, padY = 16, width, rotate = 0, seed = 'label', shadow = true}: {
  children: React.ReactNode; bg?: string; color?: string; font?: string; size?: number; padX?: number; padY?: number; width: number; rotate?: number; seed?: string; shadow?: boolean;
}) {
  const h = size * 1.45 + padY * 2;
  return (
    <div style={{position: 'relative', width, height: h, transform: `rotate(${rotate}deg)`, filter: shadow ? 'drop-shadow(6px 10px 8px rgba(20,12,4,.35))' : undefined}}>
      <svg width={width} height={h} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <path d={tornPath(width, h, seed, 9, 18)} fill={bg} />
      </svg>
      <div style={{position: 'relative', height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: `0 ${padX}px`, fontFamily: font, fontSize: size, color, lineHeight: 1.1, whiteSpace: 'nowrap'}}>
        {children}
      </div>
    </div>
  );
}

/** Rubber stamp that slams in from 2.4× scale with an ink-bleed edge. */
export function Stamp({text, at = 0, color = C.red, size = 96, rotate = -9, font = FONT.body, border = true}: {text: string; at?: number; color?: string; size?: number; rotate?: number; font?: string; border?: boolean}) {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const s = interpolate(frame, [at, at + 5], [2.4, 1], {...clamp, easing: Easing.in(Easing.quad)});
  const o = interpolate(frame, [at, at + 3], [0, 0.92], clamp);
  return (
    <div style={{transform: `rotate(${rotate}deg) scale(${s})`, opacity: o, mixBlendMode: 'multiply'}}>
      <div style={{fontFamily: font, fontWeight: 800, fontSize: size, color, lineHeight: 1, padding: border ? `${size * 0.12}px ${size * 0.3}px` : 0, border: border ? `${size * 0.07}px solid ${color}` : 'none', borderRadius: size * 0.12, whiteSpace: 'nowrap', filter: 'url(#ink-bleed)'}}>
        {text}
      </div>
    </div>
  );
}

/** SVG filter defs used by Stamp; mount once per composition. */
export function InkDefs() {
  return (
    <svg width={0} height={0} style={{position: 'absolute'}}>
      <filter id="ink-bleed">
        <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves={2} seed={7} result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale={2.5} />
      </filter>
    </svg>
  );
}

/** Highlighter stroke that wipes in behind its text. */
export function Marker({children, at = 0, duration = 9, color = C.marigold, height = 0.55, skew = -2}: {children: React.ReactNode; at?: number; duration?: number; color?: string; height?: number; skew?: number}) {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + duration], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <span style={{position: 'relative', display: 'inline-block'}}>
      <span style={{position: 'absolute', left: '-4%', bottom: '8%', height: `${height * 100}%`, width: `${108 * p}%`, background: color, transform: `skew(${skew}deg) rotate(-1deg)`, borderRadius: 6, opacity: 0.9}} />
      <span style={{position: 'relative'}}>{children}</span>
    </span>
  );
}

/** Self-drawing path: arrows, underlines, scribbles, routes. */
export function Draw({d, at = 0, duration = 18, color = C.red, width = 10, dash, length = 3000, head, viewBox, w, h}: {
  d: string; at?: number; duration?: number; color?: string; width?: number; dash?: string; length?: number; head?: {x: number; y: number; angle: number}; viewBox: string; w: number; h: number;
}) {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + duration], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const headIn = interpolate(frame, [at + duration - 3, at + duration + 3], [0, 1], clamp);
  return (
    <svg viewBox={viewBox} width={w} height={h} style={{overflow: 'visible'}}>
      <defs>
        <mask id={`m-${d.length}-${at}`}>
          <path d={d} fill="none" stroke="#fff" strokeWidth={width + 6} strokeLinecap="round" strokeDasharray={length} strokeDashoffset={length * (1 - p)} />
        </mask>
      </defs>
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} mask={`url(#m-${d.length}-${at})`} />
      {head && headIn > 0 && (
        <path d="M-26,-20 L6,0 L-26,20" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" transform={`translate(${head.x},${head.y}) rotate(${head.angle}) scale(${headIn})`} />
      )}
    </svg>
  );
}

/** Rolling number, e.g. a salary ticking from 10 to 15. */
export function Counter({from, to, at = 0, duration = 18, render}: {from: number; to: number; at?: number; duration?: number; render: (n: number) => React.ReactNode}) {
  const frame = useCurrentFrame();
  const n = Math.round(interpolate(frame, [at, at + duration], [from, to], {...clamp, easing: Easing.out(Easing.cubic)}));
  return <>{render(n)}</>;
}

/** Big headline where each word drops in on a beat. */
export function WordDrop({text, at = 0, stagger = 4, size = 120, color = C.ink, font = FONT.display, accent, accentColor = C.red, maxWidth = 900}: {
  text: string; at?: number; stagger?: number; size?: number; color?: string; font?: string; accent?: string; accentColor?: string; maxWidth?: number;
}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: `0 ${size * 0.25}px`, maxWidth, fontFamily: font, fontSize: size, lineHeight: 1.18, textAlign: 'center'}}>
      {text.split(' ').map((word, i) => {
        const e = spring({frame: frame - at - i * stagger, fps, config: SPRING.bouncy});
        if (frame < at + i * stagger) return <span key={i} style={{opacity: 0}}>{word}</span>;
        return (
          <span key={i} style={{display: 'inline-block', transform: `translateY(${(1 - e) * -90}px) scale(${0.6 + e * 0.4}) rotate(${(1 - e) * (i % 2 ? 10 : -10)}deg)`, color: accent && word.includes(accent) ? accentColor : color}}>
            {word}
          </span>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------- transitions and sound

/** A torn sheet sweeps across the frame; cut underneath at its midpoint. */
export function TornWipe({at, duration = 14, color = C.ink, direction = 1}: {at: number; duration?: number; color?: string; direction?: 1 | -1}) {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  if (frame < at || frame > at + duration) return null;
  const p = interpolate(frame, [at, at + duration], [0, 1], {easing: Easing.inOut(Easing.cubic)});
  const sheet = width * 1.6;
  const x = direction * interpolate(p, [0, 1], [-sheet - 40, width + 40]);
  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 50}}>
      <svg width={sheet} height={height + 200} style={{position: 'absolute', top: -100, left: direction === 1 ? x : undefined, right: direction === -1 ? -x : undefined, transform: 'rotate(-4deg)', filter: 'drop-shadow(0 0 24px rgba(0,0,0,.45))'}}>
        <path d={tornPath(sheet, height + 200, `wipe-${at}`, 46, 34)} fill={color} />
      </svg>
    </AbsoluteFill>
  );
}

export function Sfx({at, src, volume = 0.6, duration}: {at: number; src: string; volume?: number; duration?: number}) {
  return (
    <Sequence from={Math.max(0, at)} durationInFrames={duration} layout="none" name={`sfx ${src}`}>
      <Audio src={staticFile(`sfx/${src}`)} volume={volume} />
    </Sequence>
  );
}

/** Spoken-word captions; the current word gets a marker. Sits above the Shorts UI zone. */
export function Captions({timing, y = 1395, size = 66}: {timing: Timing; y?: number; size?: number}) {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const t = frame / fps;
  const line = timing.lines.find((l) => t >= l.start - 0.05 && t < l.start + l.duration + 0.15);
  if (!line) return null;
  // Show the line in chunks of up to four words so the eye never reads ahead of the voice.
  const groups: (typeof line.words)[] = [];
  for (const w of line.words) {
    const last = groups[groups.length - 1];
    if (!last || last.length >= 4 || /[.?!।,…]$/.test(last[last.length - 1].text)) groups.push([w]);
    else last.push(w);
  }
  const group = groups.find((g) => t < g[g.length - 1].end + 0.04) ?? groups[groups.length - 1];
  return (
    <div style={{position: 'absolute', left: 0, width, top: y, display: 'flex', justifyContent: 'center', zIndex: 40}}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 18px', maxWidth: width * 0.84, fontFamily: FONT.body, fontWeight: 800, fontSize: size, lineHeight: 1.3}}>
        {group.map((w, i) => {
          const active = t >= w.start && t < w.end + 0.04;
          return (
            <span key={i} style={{position: 'relative', color: active ? C.ink : C.white, padding: '0 10px', WebkitTextStroke: active ? undefined : `12px ${C.ink}`, paintOrder: 'stroke fill'}}>
              {active && <span style={{position: 'absolute', inset: '8% 0 4% 0', background: C.marigold, borderRadius: 10, transform: 'rotate(-2deg)', zIndex: -1}} />}
              {w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
