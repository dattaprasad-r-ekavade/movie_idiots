// Clean motion and type for fact-led Shorts: fewer fonts, no overshoot, text that reveals from a
// baseline instead of flying in. Everything derives from the frame (deterministic renders).
import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from './theme';
import {clamp} from './primitives';
import type {Timing} from './timeline';

/** Critically damped: settles without bounce. */
export const SMOOTH = {damping: 200, stiffness: 140, mass: 1};
const EASE = Easing.bezier(0.22, 1, 0.36, 1); // ease-out-quint feel

export function useSmooth(at: number, config = SMOOTH) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - at, fps, config});
}

/** 0→1 in, then 1→0 out after `exit` (frames local to the caller). */
function useInOut(at: number, exit?: number, outFrames = 8) {
  const frame = useCurrentFrame();
  const inP = useSmooth(at);
  const outP = exit === undefined ? 0 : interpolate(frame, [exit, exit + outFrames], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  return {inP, outP, visible: frame >= at && (exit === undefined || frame < exit + outFrames)};
}

/** Children slide up a short distance and fade; exits upward. */
export function Rise({at = 0, exit, distance = 60, children, style}: {at?: number; exit?: number; distance?: number; children: React.ReactNode; style?: React.CSSProperties}) {
  const {inP, outP, visible} = useInOut(at, exit);
  if (!visible) return null;
  return <div style={{transform: `translateY(${(1 - inP) * distance - outP * distance * 0.6}px)`, opacity: Math.min(1, inP * 1.4) * (1 - outP), ...style}}>{children}</div>;
}

/**
 * Headline whose lines rise out of a clip edge, one after another. `accent` words take the accent
 * colour. Break lines with "\n"; keep it to two short lines.
 */
export function Headline({text, at = 0, exit, size = 96, color = C.white, accent = [], accentColor = C.marigold, align = 'center', font = FONT.body, weight = 800, stagger = 5}: {
  text: string; at?: number; exit?: number; size?: number; color?: string; accent?: string[]; accentColor?: string; align?: 'center' | 'left'; font?: string; weight?: number; stagger?: number;
}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const out = exit === undefined ? 0 : interpolate(frame, [exit, exit + 8], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  if (frame < at || (exit !== undefined && frame >= exit + 8)) return null;
  return (
    <div style={{fontFamily: font, fontWeight: weight, fontSize: size, lineHeight: 1.22, color, textAlign: align, opacity: 1 - out}}>
      {text.split('\n').map((line, i) => {
        const p = spring({frame: frame - at - i * stagger, fps, config: SMOOTH});
        return (
          // Padding gives Devanagari matras above/below room inside the clip box.
          <div key={i} style={{overflow: 'hidden', padding: `${size * 0.12}px ${size * 0.1}px`, margin: `-${size * 0.12}px 0`}}>
            <div style={{transform: `translateY(${(1 - p) * 110 - out * 40}%)`}}>
              {line.split(' ').map((word, j) => (
                <React.Fragment key={j}>
                  {j > 0 && ' '}
                  <span style={{color: accent.some((a) => word.includes(a)) ? accentColor : undefined}}>{word}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Small label with an underline that draws in: "Did you know?" */
export function Kicker({text, at = 0, exit, color = C.marigold, size = 46}: {text: string; at?: number; exit?: number; color?: string; size?: number}) {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [at + 4, at + 18], [0, 1], {...clamp, easing: EASE});
  return (
    <Rise at={at} exit={exit} distance={24}>
      <div style={{display: 'inline-block', fontFamily: FONT.body, fontWeight: 800, fontSize: size, color, letterSpacing: 1}}>
        {text}
        <div style={{height: 6, marginTop: 6, background: color, borderRadius: 3, width: `${line * 100}%`}} />
      </div>
    </Rise>
  );
}

/** Fact number chip: "2/4". Counter-free formats can omit it. */
export function FactBadge({n, of, at = 0, exit}: {n: number; of: number; at?: number; exit?: number}) {
  const p = useSmooth(at);
  const frame = useCurrentFrame();
  const out = exit === undefined ? 0 : interpolate(frame, [exit, exit + 8], [0, 1], clamp);
  if (frame < at) return null;
  return (
    <div style={{display: 'inline-flex', alignItems: 'baseline', gap: 6, padding: '10px 26px', borderRadius: 999, background: C.marigold, color: C.ink, fontFamily: FONT.body, fontWeight: 800, transform: `scale(${0.7 + p * 0.3})`, opacity: p * (1 - out)}}>
      <span style={{fontSize: 52, lineHeight: 1}}>{n}</span>
      <span style={{fontSize: 30, opacity: 0.65}}>/ {of}</span>
    </div>
  );
}

/**
 * A film still as a mounted print: thin white border, small tilt, slow push inside the frame,
 * film/year tag and an on-image credit. `blur` hides details for a hook that the payoff reveals.
 * Without `src` it draws a labelled placeholder so layouts can be reviewed before procurement.
 */
export function FilmStill({src, at = 0, exit, width = 900, aspect = 16 / 9, tilt = -2, film, year, credit, blur = 0, push = [1.04, 1.12], duration = 240, focus = '50% 40%'}: {
  src?: string; at?: number; exit?: number; width?: number; aspect?: number; tilt?: number; film?: string; year?: number | string; credit?: string; blur?: number; push?: [number, number]; duration?: number; focus?: string;
}) {
  const frame = useCurrentFrame();
  const {inP, outP, visible} = useInOut(at, exit, 10);
  if (!visible) return null;
  const h = width / aspect;
  const zoom = interpolate(frame, [at, at + duration], push, {...clamp, easing: Easing.inOut(Easing.sin)});
  const label = [film, year].filter(Boolean).join(' · ');
  return (
    <div style={{width, transform: `translateY(${(1 - inP) * 120 - outP * 80}px) rotate(${tilt * inP}deg) scale(${0.94 + inP * 0.06})`, opacity: Math.min(1, inP * 1.5) * (1 - outP)}}>
      <div style={{position: 'relative', width, height: h, padding: 10, background: C.white, boxSizing: 'border-box', boxShadow: '0 30px 60px rgba(0,0,0,.45), 0 6px 14px rgba(0,0,0,.3)', borderRadius: 6}}>
        <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 3, background: '#2a2a2a'}}>
          {src ? (
            <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: focus, transform: `scale(${zoom})`, filter: blur ? `blur(${blur}px) saturate(.8)` : undefined}} />
          ) : (
            <AbsoluteFill style={{background: `repeating-linear-gradient(135deg, #3a3a3a 0 18px, #333 18px 36px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontFamily: FONT.body, fontWeight: 800, fontSize: 40, textAlign: 'center', padding: 40, whiteSpace: 'pre-line'}}>
              STILL{label ? `\n${label}` : ''}
            </AbsoluteFill>
          )}
          {label && (
            <div style={{position: 'absolute', left: 14, top: 14, padding: '6px 16px', background: 'rgba(12,12,18,.78)', color: C.white, fontFamily: FONT.body, fontWeight: 800, fontSize: 34, borderRadius: 6}}>{label}</div>
          )}
          {credit && (
            <div style={{position: 'absolute', right: 10, bottom: 8, fontFamily: FONT.body, fontWeight: 500, fontSize: 20, color: 'rgba(255,255,255,.85)', textShadow: '0 1px 3px rgba(0,0,0,.9)'}}>{credit}</div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Big number or short word that scales in from slightly larger, no bounce. */
export function Callout({text, at = 0, exit, size = 150, color = C.marigold, bg}: {text: string; at?: number; exit?: number; size?: number; color?: string; bg?: string}) {
  const {inP, outP, visible} = useInOut(at, exit);
  if (!visible) return null;
  return (
    <div style={{transform: `scale(${1.25 - inP * 0.25})`, opacity: Math.min(1, inP * 2) * (1 - outP), fontFamily: FONT.body, fontWeight: 800, fontSize: size, lineHeight: 1, color, background: bg, padding: bg ? '12px 30px' : 0, borderRadius: 14, whiteSpace: 'nowrap', textShadow: bg ? undefined : '0 8px 24px rgba(0,0,0,.45)'}}>
      {text}
    </div>
  );
}

/** Soft gradient backdrop with a slow drifting glow; quiet enough for stills and type to lead. */
export function Backdrop({from = '#151a2e', to = '#0c0e17', glow = 'rgba(244,180,42,.16)'}: {from?: string; to?: string; glow?: string}) {
  const frame = useCurrentFrame();
  const x = 50 + Math.sin(frame / 90) * 12;
  const y = 38 + Math.cos(frame / 110) * 8;
  return <AbsoluteFill style={{background: `radial-gradient(circle at ${x}% ${y}%, ${glow}, transparent 55%), linear-gradient(180deg, ${from}, ${to})`}} />;
}

/**
 * Captions on a soft dark pill; the spoken word turns accent-coloured with a small lift.
 * Two to three words at a time; no heavy outline, so Devanagari matras stay crisp.
 */
export function CleanCaptions({timing, y = 1400, size = 62}: {timing: Timing; y?: number; size?: number}) {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const t = frame / fps;
  const line = timing.lines.find((l) => t >= l.start - 0.05 && t < l.start + l.duration + 0.15);
  if (!line) return null;
  const groups: (typeof line.words)[] = [];
  for (const w of line.words) {
    const last = groups[groups.length - 1];
    const long = w.text.replace(/[^\p{L}\p{N}]/gu, '').length >= 12;
    if (!last || last.length >= 3 || long || /[.?!।,…]$/.test(last[last.length - 1].text)) groups.push([w]);
    else last.push(w);
  }
  const index = Math.max(0, groups.findIndex((g) => t < g[g.length - 1].end + 0.04));
  const group = groups[index] ?? groups[groups.length - 1];
  const since = (t - group[0].start) * fps;
  const enter = interpolate(since, [0, 5], [0, 1], {...clamp, easing: EASE});
  return (
    <div style={{position: 'absolute', left: 0, width, top: y, display: 'flex', justifyContent: 'center', zIndex: 40}}>
      <div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', gap: '0 16px', maxWidth: width * 0.92, padding: '10px 28px 14px', borderRadius: 22, background: 'rgba(12,12,18,.72)', fontFamily: FONT.body, fontWeight: 800, fontSize: size, lineHeight: 1.2, whiteSpace: 'nowrap', transform: `translateY(${(1 - enter) * 14}px)`, opacity: 0.4 + enter * 0.6}}>
        {group.map((w, i) => {
          const active = t >= w.start && t < w.end + 0.04;
          return (
            <span key={i} style={{color: active ? C.marigold : C.white, display: 'inline-block', transform: `translateY(${active ? -3 : 0}px)`}}>
              {w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
