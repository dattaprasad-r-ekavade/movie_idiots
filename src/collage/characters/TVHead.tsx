// "Movie Idiot" mascot: suited figure with a CRT-TV head. A vector rig, so it renders sharp at
// any size and every part (antennas, screen face, arms, knees) animates from the frame.
import React from 'react';
import {random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C} from '../theme';
import type {Timing} from '../timeline';

export type Expression = 'neutral' | 'happy' | 'shock' | 'skeptic' | 'wink' | 'sad' | 'angry';
export type PoseName = 'idle' | 'wave' | 'point' | 'shrug' | 'present' | 'facepalm' | 'thumbsUp' | 'think';
type Arm = {shoulder: number; elbow: number};
export type Pose = {left: Arm; right: Arm};

// Angles in degrees. 0 = arm hanging down; positive swings the arm outward (away from the body).
export const POSES: Record<PoseName, Pose> = {
  idle: {left: {shoulder: 10, elbow: -10}, right: {shoulder: 10, elbow: -10}},
  wave: {left: {shoulder: 10, elbow: -10}, right: {shoulder: 140, elbow: 35}},
  point: {left: {shoulder: 10, elbow: -10}, right: {shoulder: 112, elbow: 6}},
  shrug: {left: {shoulder: 34, elbow: 108}, right: {shoulder: 34, elbow: 108}},
  present: {left: {shoulder: 10, elbow: -10}, right: {shoulder: 62, elbow: -48}},
  facepalm: {left: {shoulder: 10, elbow: -10}, right: {shoulder: -152, elbow: -66}},
  thumbsUp: {left: {shoulder: 10, elbow: -10}, right: {shoulder: 28, elbow: 128}},
  think: {left: {shoulder: -12, elbow: -100}, right: {shoulder: -24, elbow: -138}},
};

const SUIT = '#23283b';
const SUIT_DARK = '#171a28';
const CASE = '#3a3f4b';
const CASE_LIGHT = '#555b6a';
const SCREEN = '#0d1a1f';
const GLOW = '#86f3ff';

/** Blend between pose keyframes with a spring; `keys` sorted by frame. */
export function usePose(keys: {at: number; pose: PoseName}[], config = {damping: 14, stiffness: 140, mass: 0.8}): Pose {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  let i = 0;
  while (i + 1 < keys.length && keys[i + 1].at <= frame) i++;
  const to = POSES[keys[i].pose];
  const from = POSES[keys[Math.max(0, i - 1)].pose];
  const p = i === 0 ? 1 : spring({frame: frame - keys[i].at, fps, config});
  const mix = (a: Arm, b: Arm): Arm => ({shoulder: a.shoulder + (b.shoulder - a.shoulder) * p, elbow: a.elbow + (b.elbow - a.elbow) * p});
  return {left: mix(from.left, to.left), right: mix(from.right, to.right)};
}

/** Mouth openness 0..1 that flaps within each spoken word of the timing. */
export function useMouth(timing: Timing | undefined, offsetFrames = 0) {
  const frame = useCurrentFrame() + offsetFrames;
  const {fps} = useVideoConfig();
  if (!timing) return 0;
  const t = frame / fps;
  for (const line of timing.lines) {
    if (t < line.start || t > line.start + line.duration) continue;
    const word = line.words.find((w) => t >= w.start && t < w.end);
    if (!word) return 0.05;
    const syllables = Math.max(1, Math.round([...word.text].length / 2.5));
    const phase = ((t - word.start) / (word.end - word.start)) * syllables;
    return 0.25 + 0.75 * Math.abs(Math.sin(phase * Math.PI));
  }
  return 0;
}

function Eye({x, y, kind, side, blink}: {x: number; y: number; kind: Expression; side: 'l' | 'r'; blink: boolean}) {
  const stroke = {stroke: GLOW, strokeWidth: 9, strokeLinecap: 'round' as const, fill: 'none'};
  if (blink || (kind === 'wink' && side === 'r')) return <path d={`M${x - 20},${y} Q${x},${y + 8} ${x + 20},${y}`} {...stroke} />;
  if (kind === 'happy') return <path d={`M${x - 20},${y + 6} Q${x},${y - 22} ${x + 20},${y + 6}`} {...stroke} />;
  if (kind === 'shock') return <circle cx={x} cy={y} r={24} {...stroke} />;
  if (kind === 'sad') return (
    <>
      <rect x={x - 13} y={y - 16} width={26} height={34} rx={13} fill={GLOW} />
      <path d={side === 'l' ? `M${x - 24},${y - 30} L${x + 16},${y - 40}` : `M${x - 16},${y - 40} L${x + 24},${y - 30}`} {...stroke} strokeWidth={7} />
    </>
  );
  if (kind === 'angry') return (
    <>
      <rect x={x - 13} y={y - 12} width={26} height={30} rx={10} fill={GLOW} />
      <path d={side === 'l' ? `M${x - 24},${y - 36} L${x + 18},${y - 22}` : `M${x - 18},${y - 22} L${x + 24},${y - 36}`} {...stroke} strokeWidth={7} />
    </>
  );
  if (kind === 'skeptic' && side === 'l') return (
    <>
      <rect x={x - 16} y={y - 4} width={32} height={14} rx={7} fill={GLOW} />
      <path d={`M${x - 22},${y - 22} L${x + 20},${y - 16}`} {...stroke} strokeWidth={7} />
    </>
  );
  if (kind === 'skeptic') return (
    <>
      <rect x={x - 14} y={y - 22} width={28} height={40} rx={14} fill={GLOW} />
      <path d={`M${x - 20},${y - 44} Q${x},${y - 56} ${x + 22},${y - 42}`} {...stroke} strokeWidth={7} />
    </>
  );
  return <rect x={x - 14} y={y - 22} width={28} height={44} rx={14} fill={GLOW} />;
}

function Mouth({x, y, kind, open}: {x: number; y: number; kind: Expression; open: number}) {
  const stroke = {stroke: GLOW, strokeWidth: 9, strokeLinecap: 'round' as const, fill: 'none'};
  if (open > 0.08) {
    const h = 6 + open * 34;
    return <rect x={x - 24} y={y - h / 2} width={48} height={h} rx={Math.min(24, h / 2)} fill={GLOW} />;
  }
  if (kind === 'happy' || kind === 'wink') return <path d={`M${x - 34},${y - 8} Q${x},${y + 30} ${x + 34},${y - 8}`} {...stroke} />;
  if (kind === 'shock') return <ellipse cx={x} cy={y + 4} rx={16} ry={22} {...stroke} />;
  if (kind === 'sad') return <path d={`M${x - 28},${y + 12} Q${x},${y - 12} ${x + 28},${y + 12}`} {...stroke} />;
  if (kind === 'angry') return <path d={`M${x - 30},${y + 6} L${x + 30},${y + 6}`} {...stroke} />;
  if (kind === 'skeptic') return <path d={`M${x - 26},${y + 4} L${x + 26},${y - 6}`} {...stroke} />;
  return <path d={`M${x - 26},${y} Q${x},${y + 10} ${x + 26},${y}`} {...stroke} />;
}

function ArmRig({arm, mirror, glove = C.white, thumb}: {arm: Arm; mirror: boolean; glove?: string; thumb?: boolean}) {
  return (
    <g transform={`translate(${mirror ? 410 : 190} 430) scale(${mirror ? -1 : 1} 1) rotate(${arm.shoulder})`}>
      <rect x={-25} y={-14} width={50} height={136} rx={25} fill={SUIT} />
      <g transform={`translate(0 112) rotate(${arm.elbow})`}>
        <rect x={-22} y={-14} width={44} height={118} rx={22} fill={SUIT} />
        <rect x={-21} y={92} width={42} height={18} rx={6} fill={C.white} />
        <circle cx={0} cy={132} r={29} fill={glove} stroke="#cfc6b5" strokeWidth={3} />
        {thumb ? (
          <rect x={-10} y={88} width={20} height={34} rx={10} fill={glove} stroke="#cfc6b5" strokeWidth={3} transform="rotate(180 0 132)" />
        ) : (
          <ellipse cx={-24} cy={124} rx={10} ry={15} fill={glove} stroke="#cfc6b5" strokeWidth={3} transform="rotate(-25 -24 124)" />
        )}
      </g>
    </g>
  );
}

export type TVHeadProps = {
  width?: number;
  expression?: Expression;
  pose?: Pose;
  mouth?: number;
  /** 'face' draws the expression; 'static' shows noise; anything else is rendered inside the screen. */
  screen?: 'face' | 'static' | React.ReactNode;
  glove?: string;
  tie?: string;
  idle?: boolean;
};

/** viewBox 600×1000. Feet rest at y≈960. */
export function TVHead({width = 600, expression = 'neutral', pose = POSES.idle, mouth = 0, screen = 'face', glove, tie = C.red, idle = true}: TVHeadProps) {
  const frame = useCurrentFrame();
  const breathe = idle ? Math.sin(frame / 18) * 4 : 0;
  const sway = idle ? Math.sin(frame / 27) * 1.2 : 0;
  const antenna = Math.sin(frame / 7) * 6;
  // Blink for 4 frames roughly every 3.3 s, offset so it never feels mechanical.
  const cycle = frame % 100;
  const blink = cycle >= 70 && cycle < 74 && expression !== 'shock';
  const flicker = 0.92 + random(`tv-${Math.floor(frame / 2)}`) * 0.08;
  const thumb = pose.right.elbow > 110 && pose.right.shoulder > 0 && pose.right.shoulder < 45;
  return (
    <svg viewBox="0 0 600 1000" width={width} style={{overflow: 'visible'}}>
      <defs>
        <clipPath id="tv-screen">
          <rect x={172} y={150} width={220} height={196} rx={40} />
        </clipPath>
        <pattern id="tv-scan" width="4" height="6" patternUnits="userSpaceOnUse">
          <rect width="4" height="2" fill="rgba(0,0,0,.35)" />
        </pattern>
        <filter id="tv-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* legs + shoes */}
      <path d="M232,640 L292,640 L288,930 L240,930Z" fill={SUIT_DARK} />
      <path d="M308,640 L368,640 L360,930 L312,930Z" fill={SUIT_DARK} />
      <path d="M222,925 Q226,905 262,905 L292,908 L294,955 L214,955 Q206,940 222,925Z" fill="#111" />
      <path d="M306,908 L338,905 Q374,905 378,925 Q394,940 386,955 L306,955Z" fill="#111" />
      <g transform={`translate(0 ${breathe}) rotate(${sway} 300 640)`}>
        {/* back arm first when it crosses behind */}
        <ArmRig arm={pose.left} mirror={false} glove={glove} />
        {/* torso */}
        <path d="M178,412 Q300,388 422,412 L398,668 L202,668Z" fill={SUIT} />
        <path d="M262,402 L338,402 L300,540Z" fill={C.white} />
        <path d="M262,402 L300,540 L240,470 L222,420Z" fill={SUIT_DARK} />
        <path d="M338,402 L300,540 L360,470 L378,420Z" fill={SUIT_DARK} />
        <path d="M290,412 L310,412 L306,428 L294,428Z" fill={tie} />
        <path d="M294,426 L306,426 L318,508 L300,534 L282,508Z" fill={tie} />
        <circle cx={300} cy={580} r={7} fill="#0d0f18" />
        <circle cx={300} cy={622} r={7} fill="#0d0f18" />
        <path d="M352,470 L392,466 L390,478 L352,482Z" fill={C.white} opacity={0.9} />
        {/* neck */}
        <rect x={270} y={372} width={60} height={34} rx={8} fill="#2a2d36" />
        {/* antennas */}
        <g transform={`rotate(${antenna} 300 128)`}>
          <line x1={300} y1={128} x2={212} y2={30} stroke="#9aa0ad" strokeWidth={7} strokeLinecap="round" />
          <circle cx={212} cy={30} r={12} fill={C.red} />
        </g>
        <g transform={`rotate(${-antenna * 0.8} 300 128)`}>
          <line x1={300} y1={128} x2={398} y2={18} stroke="#9aa0ad" strokeWidth={7} strokeLinecap="round" />
          <circle cx={398} cy={18} r={12} fill={C.red} />
        </g>
        <ellipse cx={300} cy={130} rx={30} ry={12} fill="#2a2d36" />
        {/* TV case */}
        <rect x={148} y={124} width={304} height={256} rx={34} fill={CASE} />
        <rect x={148} y={124} width={304} height={30} rx={15} fill={CASE_LIGHT} opacity={0.6} />
        <rect x={160} y={138} width={244} height={220} rx={46} fill="#22252d" />
        <rect x={172} y={150} width={220} height={196} rx={40} fill={SCREEN} />
        <g clipPath="url(#tv-screen)" opacity={flicker}>
          {screen === 'face' ? (
            <g filter="url(#tv-glow)">
              <Eye x={238} y={232} kind={expression} side="l" blink={blink} />
              <Eye x={326} y={232} kind={expression} side="r" blink={blink} />
              <Mouth x={282} y={296} kind={expression} open={mouth} />
            </g>
          ) : screen === 'static' ? (
            Array.from({length: 120}, (_, i) => {
              const r = random(`st-${Math.floor(frame / 2)}-${i}`);
              return <rect key={i} x={172 + (i % 12) * 19} y={150 + Math.floor(i / 12) * 20} width={19} height={20} fill={`rgb(${r * 255},${r * 255},${r * 255})`} />;
            })
          ) : (
            <foreignObject x={172} y={150} width={220} height={196}>
              <div style={{width: 220, height: 196, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GLOW}}>{screen}</div>
            </foreignObject>
          )}
          <rect x={172} y={150} width={220} height={196} fill="url(#tv-scan)" />
          <ellipse cx={230} cy={180} rx={60} ry={22} fill="#fff" opacity={0.06} transform="rotate(-18 230 180)" />
        </g>
        {/* side panel: knobs + speaker */}
        <circle cx={426} cy={196} r={14} fill="#1c1e24" />
        <line x1={426} y1={196} x2={426} y2={184} stroke={C.marigold} strokeWidth={4} transform={`rotate(${frame * 2} 426 196)`} />
        <circle cx={426} cy={246} r={14} fill="#1c1e24" />
        {[290, 304, 318, 332].map((y) => (
          <line key={y} x1={414} y1={y} x2={440} y2={y} stroke="#22252d" strokeWidth={5} strokeLinecap="round" />
        ))}
        <circle cx={418} cy={360} r={5} fill={frame % 60 < 30 ? '#ff4d4d' : '#6a2020'} />
        <ArmRig arm={pose.right} mirror glove={glove} thumb={thumb} />
      </g>
    </svg>
  );
}

/** Convenience: shake/zap the screen to static for `duration` frames from `at`. */
export function useZap(at: number, duration = 6) {
  const frame = useCurrentFrame();
  return frame >= at && frame < at + duration;
}

