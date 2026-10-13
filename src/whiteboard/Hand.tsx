// The drawing hand. Two kinds:
// - `ImageHand` (default, `PHOTO_HAND`): a cut-out photo (PNG with transparency) whose pen-tip pixel
//   is given, like VideoScribe's photo hands. Another photo: `hand: {src, tip, size, width, sleeve}`.
// - `Hand` (`hand: 'drawn'`): original, code-drawn right hand, drawn in proportion from the same
//   photo. One outline for palm, thumb and middle finger, the pen over it, the index finger over the pen.
// The pen tip sits at the component's origin in both, so callers place the tip.
import React from 'react';
import {Img, staticFile} from 'remotion';

export type HandStyle = {skin: string; shade: string; sleeve: string; ink: string; barrel: string; nib: string};
export const HAND_LIGHT: HandStyle = {skin: '#e9a873', shade: '#cf8a57', sleeve: '#26355d', ink: '#1b1b1b', barrel: '#2b2d31', nib: '#b8bcc2'};
export const HAND_CHALK: HandStyle = {skin: '#e9a873', shade: '#cf8a57', sleeve: '#5a3b28', ink: '#1b1b1b', barrel: '#f3f1e8', nib: '#b8bcc2'};

/** A photo hand: `src` under public/, `tip` = pen-tip pixel, `size` = image pixels, `width` = on-screen width. */
export type ImageHandSpec = {src: string; tip: [number, number]; size: [number, number]; width: number; sleeve?: {points: [number, number][]; color: string}};

/**
 * Default hand: the owner's own photo of a hand writing (not stock), background keyed out.
 * Pen-tip pixel measured on the 365×547 image; the photo ends mid-forearm, so a sleeve carries
 * the arm off-screen.
 */
export const PHOTO_HAND: ImageHandSpec = {
  src: 'whiteboard/hand-photo.png',
  tip: [108, 237],
  size: [365, 547],
  width: 600,
  sleeve: {points: [[250, 468], [380, 418], [700, 1500], [520, 1560]], color: '#26355d'},
};

type P = [number, number];
const pts = (list: P[]) => list.map(([x, y]) => `${x},${y}`).join(' ');

// Pen from the tip (0,0) to its back end (~306,70): top edge y = 0.23x, about 18 units thick.
const PEN: P[] = [[40, 0], [304, 61], [308, 70], [302, 80], [36, 18]];
const NIB: P[] = [[0, 0], [40, 0], [36, 18]];
const GRIP: P[] = [[40, 0], [92, 12], [88, 30], [36, 18]];

// Palm, thumb, middle finger and back of the hand as one outline (under the pen).
const BODY = [
  'M200 -40 C240 -46 272 -26 282 6 C292 40 298 90 312 140 C324 184 344 206 360 202',
  'L206 226 C180 200 150 178 124 162 C104 152 80 136 64 122 C44 108 40 88 58 82 C70 79 82 84 92 90',
  'C76 78 60 64 54 48 C48 36 56 26 70 28 C100 34 130 44 152 52 C162 30 180 -30 200 -40 Z',
].join(' ');
// Index finger over the pen: fill is closed, the outline leaves the base open so it merges into the hand.
const INDEX_LINE = 'M172 0 C156 2 140 3 124 4 C102 8 86 16 76 22 C62 30 48 22 50 8 C56 -12 90 -30 130 -42 C162 -52 202 -54 236 -44';

/**
 * `x`, `y`: pen tip on screen. `angle` tilts the whole hand (degrees); `scale` sizes it.
 * The hand casts a soft shadow so it reads as above the board.
 */
export function Hand({x, y, angle = 0, scale = 1.15, style = HAND_LIGHT}: {x: number; y: number; angle?: number; scale?: number; style?: HandStyle}) {
  const s = style;
  const line = {stroke: s.ink, strokeWidth: 3.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
  const crease = {fill: 'none', stroke: s.ink, strokeWidth: 2.5, strokeLinecap: 'round' as const, opacity: 0.45};
  return (
    <svg
      width={1}
      height={1}
      style={{position: 'absolute', left: x, top: y, overflow: 'visible', pointerEvents: 'none', filter: 'drop-shadow(16px 22px 16px rgba(0,0,0,.26))'}}
    >
      <g transform={`rotate(${angle}) scale(${scale})`}>
        {/* Forearm dropping almost straight down, into a sleeve. */}
        <path d="M206 226 L360 202 C400 300 430 420 456 560 L292 600 C270 470 240 340 206 226 Z" fill={s.skin} {...line} />
        <path d="M276 470 L440 438 L500 900 L330 940 Z" fill={s.sleeve} {...line} />
        <path d="M280 486 L442 454" {...crease} />
        {/* Hand body; a skin strip hides the wrist seam where it meets the forearm. */}
        <path d={BODY} fill={s.skin} {...line} />
        {/* Web between thumb and index, behind the pen (no board showing between finger and pen). */}
        <polygon points="80,14 236,-10 236,64 150,54" fill={s.skin} />
        <path d="M214 222 L352 204" stroke={s.skin} strokeWidth={6} strokeLinecap="round" />
        <path d="M150 174 C180 196 206 212 232 220" fill="none" stroke={s.shade} strokeWidth={12} strokeLinecap="round" opacity={0.4} />
        {/* Thumb / middle finger split, middle finger / palm crease, thumb joint. */}
        <path d="M92 90 C110 104 126 118 136 132" {...crease} />
        <path d="M104 150 C116 160 130 166 146 168" {...crease} />
        <path d="M100 40 C104 46 106 52 106 58" {...crease} />
        <path d="M168 64 C190 70 214 80 230 96" fill="none" stroke={s.shade} strokeWidth={14} strokeLinecap="round" opacity={0.55} />
        {/* Pen: nib, ridged grip, barrel with its back end over the knuckles. */}
        <polygon points={pts(PEN)} fill={s.barrel} {...line} />
        <polygon points={pts(GRIP)} fill={s.barrel} {...line} />
        {[50, 60, 70, 80].map((t) => (
          <path key={t} d={`M${t + 2} ${(t * 0.23 + 2).toFixed(1)} L${t - 2} ${(t * 0.23 + 16).toFixed(1)}`} fill="none" stroke={s.nib} strokeWidth={2.5} strokeLinecap="round" />
        ))}
        <polygon points={pts(NIB)} fill={s.nib} {...line} />
        <path d="M296 63 L299 79" fill="none" stroke={s.nib} strokeWidth={4} strokeLinecap="round" />
        {/* Index finger curled over the pen, fingertip pressing just behind the grip. */}
        <path d={`${INDEX_LINE} Z`} fill={s.skin} />
        <path d={INDEX_LINE} fill="none" {...line} />
        <path d="M140 -46 C146 -36 146 -24 140 -12" {...crease} />
        <path d="M84 -18 C90 -10 92 -2 90 6" {...crease} />
        {/* Knuckle line of the folded fingers. */}
        <path d="M236 -30 C256 -20 272 -2 280 20" {...crease} />
      </g>
    </svg>
  );
}

/** A cut-out photo hand, placed so its pen-tip pixel lands on (x, y). */
export function ImageHand({x, y, spec}: {x: number; y: number; spec: ImageHandSpec}) {
  const k = spec.width / spec.size[0];
  const left = x - spec.tip[0] * k;
  const top = y - spec.tip[1] * k;
  return (
    <>
    <Img
      src={staticFile(spec.src)}
      style={{
        position: 'absolute',
        left,
        top,
        width: spec.width,
        height: spec.size[1] * k,
        pointerEvents: 'none',
        filter: 'drop-shadow(16px 22px 16px rgba(0,0,0,.22))',
      }}
    />
    {/* A sleeve over the photo's cut-off forearm, running off-screen. */}
    {spec.sleeve && (
      <svg width={1} height={1} style={{position: 'absolute', left, top, overflow: 'visible', pointerEvents: 'none'}}>
        <polygon points={spec.sleeve.points.map(([px, py]) => `${px * k},${py * k}`).join(' ')} fill={spec.sleeve.color} stroke="#1b1b1b" strokeWidth={3} strokeLinejoin="round" />
      </svg>
    )}
    </>
  );
}
