// Original marker doodles for whiteboard videos, drawn as code on a 200×200 box.
// `strokes` are drawn in order (that order is the "hand" order, so outline first, details after);
// `fills` fade in once the outline is done, like colouring in after the sketch.
// Add new doodles here; keep each to a handful of strokes so it draws in 1–2 s.

export type Doodle = {box: [number, number]; strokes: string[]; fills?: {d: string; color?: string}[]};

/** Circle as a path that starts at its rightmost point (so the pen can draw it in one stroke). */
const ring = (cx: number, cy: number, r: number) => `M${cx + r} ${cy} A${r} ${r} 0 1 1 ${cx + r} ${cy + 0.01}`;

const STAR = 'M100 20 L122 75 L180 78 L134 114 L150 172 L100 140 L50 172 L66 114 L20 78 L78 75 Z';
const HEART = 'M100 170 C40 125 20 90 45 60 C65 38 92 45 100 70 C108 45 135 38 155 60 C180 90 160 125 100 170 Z';
const BULB = 'M100 25 C60 25 45 70 70 100 C80 112 82 120 82 135 L118 135 C118 120 120 112 130 100 C155 70 140 25 100 25 Z';
const TICKET = 'M30 60 L170 60 L170 88 A14 14 0 0 0 170 112 L170 140 L30 140 L30 112 A14 14 0 0 0 30 88 Z';
const CUP = 'M60 35 L140 35 L135 90 C130 115 70 115 65 90 Z';
const BUCKET = 'M55 90 L75 180 L125 180 L145 90 Z';

export const DOODLES = {
  star: {box: [200, 200], strokes: [STAR], fills: [{d: STAR}]},
  heart: {box: [200, 200], strokes: [HEART], fills: [{d: HEART}]},
  clapper: {
    box: [200, 200],
    strokes: [
      'M30 85 L170 85 L170 175 L30 175 Z',
      'M28 82 L168 58 L162 28 L22 52 Z',
      'M50 48 L66 74',
      'M86 42 L102 68',
      'M122 36 L138 62',
      'M48 112 L150 112',
      'M48 136 L120 136',
      'M48 158 L135 158',
    ],
    fills: [{d: 'M28 82 L168 58 L162 28 L22 52 Z', color: '#1b1b1b'}],
  },
  reel: {
    box: [200, 200],
    strokes: [ring(100, 100, 72), ring(100, 100, 12), ring(100, 58, 16), ring(140, 87, 16), ring(125, 134, 16), ring(75, 134, 16), ring(60, 87, 16), 'M172 104 C188 140 168 176 118 186'],
  },
  popcorn: {
    box: [200, 200],
    strokes: [
      'M55 90 C45 70 65 55 78 65 C80 45 105 42 108 60 C118 45 145 52 138 72 C155 75 152 92 145 90',
      BUCKET,
      'M85 90 L92 180',
      'M115 90 L108 180',
    ],
    fills: [{d: BUCKET}],
  },
  ticket: {box: [200, 200], strokes: [TICKET, 'M132 66 L132 134', 'M48 88 L112 88', 'M48 112 L100 112'], fills: [{d: TICKET}]},
  trophy: {
    box: [200, 200],
    strokes: [CUP, 'M62 50 C35 50 35 85 68 92', 'M138 50 C165 50 165 85 132 92', 'M92 112 L92 140', 'M108 112 L108 140', 'M70 140 L130 140 L135 165 L65 165 Z'],
    fills: [{d: CUP}],
  },
  camera: {
    box: [200, 200],
    strokes: ['M40 90 L140 90 L140 150 L40 150 Z', ring(70, 65, 22), ring(116, 62, 25), 'M140 108 L176 92 L176 150 L140 134'],
  },
  bulb: {box: [200, 200], strokes: [BULB, 'M84 148 L116 148', 'M88 160 L112 160', 'M100 4 L100 14', 'M40 28 L48 36', 'M160 28 L152 36'], fills: [{d: BULB}]},
  rupee: {box: [200, 200], strokes: ['M60 40 L145 40', 'M60 70 L145 70', 'M75 40 C140 40 140 100 75 100 L60 100 L135 175']},
  crowd: {
    box: [200, 200],
    strokes: [ring(60, 72, 16), 'M35 150 C35 105 85 105 85 150', ring(100, 55, 18), 'M72 140 C72 88 128 88 128 140', ring(140, 72, 16), 'M115 150 C115 105 165 105 165 150'],
  },
  arrow: {box: [200, 200], strokes: ['M30 150 C70 60 120 50 170 60', 'M150 40 L172 60 L148 78']},
} satisfies Record<string, Doodle>;

export type DoodleName = keyof typeof DOODLES;
