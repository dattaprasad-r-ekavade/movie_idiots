// Pure timing and camera maths for whiteboard ("VideoScribe-style") videos. No React here, so
// `tests/whiteboard.test.ts` can pin the behaviour down frame by frame.

export type Span = {start: number; end: number};
export type Point = {x: number; y: number};
export type Box = {x: number; y: number; w: number; h: number};
/** `x`/`y` is the world point held at the viewport focus; `zoom` is screen px per world unit. */
export type CameraState = {x: number; y: number; zoom: number};
/** Camera arrives at `at` (frames); it starts moving `move` frames earlier. */
export type CameraKey = CameraState & {at: number; move?: number};

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
/** Slow out, slow in: the camera glides between drawings instead of snapping. */
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Split `duration` frames across strokes in proportion to their length, so the pen moves at one
 * speed like a real hand. `lift` frames between strokes are the pen lifting off the board.
 */
export function scheduleStrokes(lengths: number[], start: number, duration: number, lift = 2): Span[] {
  const n = lengths.length;
  if (!n) return [];
  const drawable = Math.max(n, duration - lift * (n - 1));
  const weights = lengths.map((l) => Math.max(l, 1e-6));
  const total = weights.reduce((a, b) => a + b, 0);
  let cursor = start;
  return weights.map((w, i) => {
    const span = {start: cursor, end: cursor + Math.max(1, (drawable * w) / total)};
    cursor = span.end + (i < n - 1 ? lift : 0);
    return span;
  });
}

/** 0 before the span, 1 after it, linear inside (constant pen speed). */
export const progress = (frame: number, span: Span) => clamp01((frame - span.start) / Math.max(1e-6, span.end - span.start));

/** Index of the stroke the pen is on at `frame` (the last started one), or -1 before the first. */
export function activeStroke(frame: number, spans: Span[]): number {
  let idx = -1;
  spans.forEach((s, i) => {
    if (frame >= s.start) idx = i;
  });
  return idx;
}

/** Camera that frames `box` inside a viewport, never closer than `maxZoom` or further than `minZoom`. */
export function fitBox(box: Box, view: {w: number; h: number}, {fill = 0.78, maxZoom = 2.4, minZoom = 0.2} = {}): CameraState {
  const zoom = Math.min(maxZoom, Math.max(minZoom, Math.min((view.w * fill) / Math.max(1, box.w), (view.h * fill) / Math.max(1, box.h))));
  return {x: box.x + box.w / 2, y: box.y + box.h / 2, zoom};
}

/** Box around several boxes, with `pad` world units of margin. */
export function unionBox(boxes: Box[], pad = 0): Box {
  const x0 = Math.min(...boxes.map((b) => b.x)) - pad;
  const y0 = Math.min(...boxes.map((b) => b.y)) - pad;
  const x1 = Math.max(...boxes.map((b) => b.x + b.w)) + pad;
  const y1 = Math.max(...boxes.map((b) => b.y + b.h)) + pad;
  return {x: x0, y: y0, w: x1 - x0, h: y1 - y0};
}

/**
 * Camera at `frame`: holds each key, then eases to the next one over its `move` frames. Zoom is
 * interpolated in log space so zooming in and out feel equally fast.
 */
export function cameraAt(frame: number, keys: CameraKey[], defaultMove = 16): CameraState {
  if (!keys.length) return {x: 0, y: 0, zoom: 1};
  const sorted = [...keys].sort((a, b) => a.at - b.at);
  let state: CameraState = {x: sorted[0].x, y: sorted[0].y, zoom: sorted[0].zoom};
  for (let i = 1; i < sorted.length; i++) {
    const k = sorted[i];
    const move = Math.max(1, k.move ?? defaultMove);
    if (frame <= k.at - move) break;
    const t = easeInOut(clamp01((frame - (k.at - move)) / move));
    const from = state;
    state = {
      x: from.x + (k.x - from.x) * t,
      y: from.y + (k.y - from.y) * t,
      zoom: Math.exp(Math.log(from.zoom) + (Math.log(k.zoom) - Math.log(from.zoom)) * t),
    };
    if (t < 1) break;
  }
  return state;
}

/** World point → screen point, with the camera's focus at `focus` on screen. */
export const toScreen = (p: Point, cam: CameraState, focus: Point): Point => ({x: (p.x - cam.x) * cam.zoom + focus.x, y: (p.y - cam.y) * cam.zoom + focus.y});

/** Deterministic wobble in [-1, 1]: hand-drawn shapes must not use Math.random (renders must repeat). */
export const wobble = (seed: number) => Math.sin(seed * 12.9898 + 78.233) * 0.5 + Math.sin(seed * 4.1414 + 1.7) * 0.5;

/** A hand-drawn underline: a slightly bowed stroke with a small return flick. */
export function underlinePath(x1: number, x2: number, y: number, seed = 1): string {
  const w = x2 - x1;
  const bow = 6 + wobble(seed) * 4;
  return `M${x1} ${y + wobble(seed + 1) * 3} Q${x1 + w / 2} ${y + bow} ${x2} ${y - 2 + wobble(seed + 2) * 3} L${x2 - w * 0.12} ${y + 10}`;
}

/** A hand-drawn loop around a box: an ellipse that overshoots its start, like a quick marker circle. */
export function circlePath(cx: number, cy: number, rx: number, ry: number, seed = 1): string {
  const steps = 28;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = -Math.PI * 0.6 + (i / steps) * Math.PI * 2.15;
    const r = 1 + wobble(seed + i * 0.37) * 0.04;
    pts.push(`${(cx + Math.cos(a) * rx * r).toFixed(1)} ${(cy + Math.sin(a) * ry * r).toFixed(1)}`);
  }
  return `M${pts[0]} ` + pts.slice(1).map((p) => `L${p}`).join(' ');
}

/** A curved arrow from `a` to `b`, bent sideways by `bend` (fraction of its length), plus a head. */
export function arrowPaths(a: Point, b: Point, bend = 0.2): string[] {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = (a.x + b.x) / 2 + nx * len * bend;
  const cy = (a.y + b.y) / 2 + ny * len * bend;
  // The head follows the curve's end tangent (control point → end).
  const tx = b.x - cx;
  const ty = b.y - cy;
  const tl = Math.hypot(tx, ty) || 1;
  const ux = tx / tl;
  const uy = ty / tl;
  const head = Math.min(60, len * 0.18);
  const left = {x: b.x - ux * head + uy * head * 0.55, y: b.y - uy * head - ux * head * 0.55};
  const right = {x: b.x - ux * head - uy * head * 0.55, y: b.y - uy * head + ux * head * 0.55};
  return [`M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`, `M${left.x} ${left.y} L${b.x} ${b.y} L${right.x} ${right.y}`];
}

/** Zig-zag that sweeps a box row by row: the "brush" that reveals a photo as if sketched in. */
export function sweepPath(box: Box, rows = 6): {d: string; band: number} {
  const band = box.h / rows;
  const parts: string[] = [];
  for (let i = 0; i < rows; i++) {
    const y = box.y + band * (i + 0.5);
    const [from, to] = i % 2 ? [box.x + box.w, box.x] : [box.x, box.x + box.w];
    parts.push(`${i ? 'L' : 'M'}${from} ${y} L${to} ${y + band * 0.25}`);
  }
  return {d: parts.join(' '), band};
}
