// Whiteboard ("VideoScribe-style") engine. A plan places elements on one big board (the world);
// each element is drawn by a hand when its narration anchor is spoken, and the camera glides to
// frame it. Elements: marker doodles, handwritten text, photos sketched in, underlines, circles,
// arrows, and an overview that pulls back to show the whole board.
//
// Everything is a pure function of the frame (stroke dash offsets, camera keys, hand position):
// no CSS animation, timers or randomness. See docs/whiteboard.md for the plan format and knobs.
import React, {useEffect, useMemo, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {getLength, getPointAtLength} from '@remotion/paths';
import {FONT} from '../collage/theme';
import {Sfx} from '../collage/primitives';
import {ShortShell, type ShortProps} from '../collage/shell';
import type {Clock} from '../collage/timeline';
import {DOODLES, type Doodle, type DoodleName} from './doodles';
import {HAND_CHALK, HAND_LIGHT, Hand, ImageHand, PHOTO_HAND, type ImageHandSpec} from './Hand';
import {
  activeStroke, arrowPaths, cameraAt, circlePath, easeInOut, fitBox, progress, scheduleStrokes, sweepPath, toScreen, underlinePath, unionBox,
  type Box, type CameraKey, type Point, type Span,
} from './schedule';

/** When an element starts: a script line, optionally a word in it, plus an offset in seconds. */
export type Anchor = {line: string; word?: string; offset?: number};
type Common = {
  at: Anchor;
  /** Seconds the hand spends drawing it (VideoScribe's "animate time"). */
  draw?: number;
  /** `auto` frames this element; `stay` keeps the current shot; a box frames that world area. */
  camera?: 'auto' | 'stay' | Box;
  /** Stroke colour; defaults to the board ink. */
  color?: string;
  /** Stroke width in world units. */
  width?: number;
};
export type WbElement =
  | (Common & {kind: 'doodle'; doodle: DoodleName | Doodle; x: number; y: number; size: number; fill?: string})
  | (Common & {kind: 'write'; text: string; x: number; y: number; size?: number; align?: 'center' | 'left'; font?: string})
  | (Common & {kind: 'image'; src: string; x: number; y: number; w: number; h: number; rows?: number; focus?: string})
  | (Common & {kind: 'underline'; x1: number; x2: number; y: number})
  | (Common & {kind: 'circle'; x: number; y: number; rx: number; ry: number})
  | (Common & {kind: 'arrow'; from: Point; to: Point; bend?: number})
  | {kind: 'overview'; at: Anchor; move?: number; pad?: number};

export type Paper = 'white' | 'cream' | 'chalk';
export type WhiteboardPlan = {
  /** World size in board units; elements use these coordinates. */
  world: {w: number; h: number};
  paper?: Paper;
  /** Accent for fills and captions. */
  accent?: string;
  /** Default: the photo hand (`PHOTO_HAND`). `'drawn'` uses the code-drawn hand, `false` hides it, a spec uses another photo. */
  hand?: boolean | 'drawn' | ImageHandSpec;
  /** Sound under each element as the hand starts (file in public/sfx). */
  sfx?: {src: string; volume?: number};
  elements: WbElement[];
};

const PAPER: Record<Paper, {bg: string; ink: string; hand: typeof HAND_LIGHT}> = {
  white: {bg: '#fbfaf7', ink: '#1b1b1b', hand: HAND_LIGHT},
  cream: {bg: '#f5efe2', ink: '#211d18', hand: HAND_LIGHT},
  chalk: {bg: '#22312b', ink: '#f3f1e8', hand: HAND_CHALK},
};

// Screen area the camera frames: above the caption band (captions sit at y≈1400).
const VIEW = {w: 1080, h: 1180};
const FOCUS = {x: 540, y: 760};
const OVERVIEW = {w: 1080, h: 1300};
const OVERVIEW_CENTER_Y = 800;
const HAND_LEAD = 8; // frames the hand takes to come in before a drawing / leave after one
const DRAW_DEFAULT: Record<string, number> = {doodle: 1.4, image: 2.2, underline: 0.45, circle: 0.6, arrow: 0.6};

let ctx: CanvasRenderingContext2D | null = null;
/** Text width in world units. Measured every render (not memoised) so it is right once fonts load. */
function measure(text: string, size: number, font: string) {
  if (typeof document === 'undefined') return [...text].length * size * 0.55;
  ctx ??= document.createElement('canvas').getContext('2d');
  if (!ctx) return [...text].length * size * 0.55;
  ctx.font = `700 ${size}px ${font}`;
  return ctx.measureText(text).width;
}

type Stroke = {d: string; len: number; mask?: boolean};
type Prepared = {
  i: number;
  el: Exclude<WbElement, {kind: 'overview'}>;
  start: number;
  end: number;
  box: Box;
  strokes: Stroke[];
  spans: Span[];
  /** Board transform for path strokes: world = offset + point × scale. */
  offset: Point;
  scale: number;
  /** For `write`: one entry per text line. */
  lines?: {text: string; left: number; base: number; w: number}[];
};

const resolve = (c: Clock, a: Anchor) => (a.word ? c.word(a.line, a.word, 0, a.offset ?? 0) : c.line(a.line, a.offset ?? 0));

function prepare(plan: WhiteboardPlan, c: Clock): {items: Prepared[]; overviews: {at: number; move?: number; pad?: number}[]} {
  const items: Prepared[] = [];
  const overviews: {at: number; move?: number; pad?: number}[] = [];
  plan.elements.forEach((el, i) => {
    const start = resolve(c, el.at);
    if (el.kind === 'overview') {
      overviews.push({at: start, move: el.move, pad: el.pad});
      return;
    }
    let strokes: Stroke[] = [];
    let box: Box;
    let offset = {x: 0, y: 0};
    let scale = 1;
    let lines: Prepared['lines'];
    let draw = el.draw ?? DRAW_DEFAULT[el.kind] ?? 1;
    if (el.kind === 'doodle') {
      const d: Doodle = typeof el.doodle === 'string' ? DOODLES[el.doodle] : el.doodle;
      scale = el.size / d.box[0];
      const h = d.box[1] * scale;
      offset = {x: el.x - el.size / 2, y: el.y - h / 2};
      box = {x: offset.x, y: offset.y, w: el.size, h};
      strokes = d.strokes.map((p) => ({d: p, len: getLength(p)}));
    } else if (el.kind === 'image') {
      box = {x: el.x - el.w / 2, y: el.y - el.h / 2, w: el.w, h: el.h};
      const sweep = sweepPath(box, el.rows ?? 6);
      const frame = `M${box.x} ${box.y} L${box.x + box.w} ${box.y} L${box.x + box.w} ${box.y + box.h} L${box.x} ${box.y + box.h} Z`;
      strokes = [{d: sweep.d, len: getLength(sweep.d), mask: true}, {d: frame, len: getLength(frame) * 0.35}];
    } else if (el.kind === 'underline') {
      const d = underlinePath(el.x1, el.x2, el.y, i + 1);
      strokes = [{d, len: getLength(d)}];
      box = {x: el.x1, y: el.y - 20, w: el.x2 - el.x1, h: 40};
    } else if (el.kind === 'circle') {
      const d = circlePath(el.x, el.y, el.rx, el.ry, i + 1);
      strokes = [{d, len: getLength(d)}];
      box = {x: el.x - el.rx, y: el.y - el.ry, w: el.rx * 2, h: el.ry * 2};
    } else if (el.kind === 'arrow') {
      strokes = arrowPaths(el.from, el.to, el.bend ?? 0.2).map((d) => ({d, len: getLength(d)}));
      box = unionBox([{x: el.from.x, y: el.from.y, w: 1, h: 1}, {x: el.to.x, y: el.to.y, w: 1, h: 1}], 40);
    } else {
      const size = el.size ?? 90;
      const font = el.font ?? FONT.hand;
      const rows = el.text.split('\n');
      const widths = rows.map((r) => measure(r, size, font));
      const lh = size * 1.3;
      lines = rows.map((text, k) => {
        const w = widths[k];
        const left = el.align === 'left' ? el.x : el.x - w / 2;
        return {text, left, base: el.y + k * lh, w};
      });
      box = unionBox(lines.map((l) => ({x: l.left, y: l.base - size, w: l.w, h: size * 1.3})), size * 0.15);
      // Writing time follows the amount of text unless set.
      draw = el.draw ?? Math.min(3, Math.max(0.8, el.text.length * 0.06));
      strokes = lines.map((l) => ({d: '', len: Math.max(1, l.w)}));
    }
    const frames = Math.max(4, Math.round(draw * c.fps));
    items.push({i, el, start, end: start + frames, box, strokes, spans: scheduleStrokes(strokes.map((s) => s.len), start, frames, el.kind === 'image' ? 4 : 2), offset, scale, lines});
  });
  return {items, overviews};
}

/** Camera keys: one per element that wants a shot, overviews pull back to fit everything drawn so far. */
function cameraKeys(items: Prepared[], overviews: {at: number; move?: number; pad?: number}[]): CameraKey[] {
  const keys: CameraKey[] = [];
  for (const it of items) {
    const cam = it.el.camera ?? 'auto';
    if (cam === 'stay') continue;
    const target = cam === 'auto' ? it.box : cam;
    keys.push({at: it.start, move: 18, ...fitBox(target, VIEW)});
  }
  for (const o of overviews) {
    const drawn = items.filter((it) => it.start <= o.at).map((it) => it.box);
    if (!drawn.length) continue;
    // The overview may use more of the screen than a close-up: the board is the whole picture now.
    const cam = fitBox(unionBox(drawn, o.pad ?? 60), OVERVIEW, {fill: 0.94, maxZoom: 1.6});
    keys.push({at: o.at, move: o.move ?? 30, ...cam, y: cam.y - (OVERVIEW_CENTER_Y - FOCUS.y) / cam.zoom});
  }
  keys.sort((a, b) => a.at - b.at);
  if (keys.length) keys.unshift({...keys[0], at: 0});
  return keys;
}

/** Pen tip (world) for an element at `frame`, clamped to its first/last point outside its time. */
function tipAt(it: Prepared, frame: number): Point {
  const f = Math.min(Math.max(frame, it.start), it.end);
  const idx = Math.max(0, activeStroke(f, it.spans));
  const p = progress(f, it.spans[idx]);
  if (it.lines) {
    const l = it.lines[idx];
    const size = (it.el as {size?: number}).size ?? 90;
    // Writing: the tip runs along the baseline with a small up-down scribble.
    return {x: l.left + l.w * p, y: l.base - size * 0.32 + Math.sin(f * 1.9) * size * 0.14};
  }
  const s = it.strokes[idx];
  const pt = getPointAtLength(s.d, s.len * p) ?? {x: 0, y: 0};
  return {x: it.offset.x + pt.x * it.scale, y: it.offset.y + pt.y * it.scale};
}

/** Where the hand is: drawing, travelling between close drawings, coming in or leaving. */
function handAt(items: Prepared[], frame: number): {p: Point; out: number} | null {
  const active = [...items].reverse().find((it) => frame >= it.start && frame <= it.end);
  if (active) return {p: tipAt(active, frame), out: 0};
  const prev = [...items].filter((it) => it.end < frame).sort((a, b) => b.end - a.end)[0];
  const next = [...items].filter((it) => it.start > frame).sort((a, b) => a.start - b.start)[0];
  if (prev && next && next.start - prev.end <= 20) {
    const t = easeInOut((frame - prev.end) / (next.start - prev.end));
    const a = tipAt(prev, prev.end);
    const b = tipAt(next, next.start);
    return {p: {x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t}, out: 0};
  }
  if (next && next.start - frame <= HAND_LEAD) return {p: tipAt(next, next.start), out: easeInOut((next.start - frame) / HAND_LEAD)};
  if (prev && frame - prev.end <= HAND_LEAD) return {p: tipAt(prev, prev.end), out: easeInOut((frame - prev.end) / HAND_LEAD)};
  return null;
}

/**
 * Holds the render until the handwriting font is loaded, then re-renders: text widths (clip and
 * hand position) are measured with the real font, not a fallback.
 */
function useFontReady(font: string) {
  const [ready, setReady] = useState(false);
  const [handle] = useState(() => delayRender('whiteboard font'));
  useEffect(() => {
    if (typeof document === 'undefined') return continueRender(handle);
    // The @font-face rules come from theme.ts's stylesheet, which may not be parsed yet. Keep asking
    // the browser to load the face until check() confirms both scripts (this gates the render only).
    const spec = `700 40px ${font}`;
    let tries = 0;
    const attempt = () => {
      Promise.all([document.fonts.load(spec, 'अआ क'), document.fonts.load(spec, 'Aa')])
        .catch(() => undefined)
        .then(() => {
          if ((document.fonts.check(spec, 'अआ क') && document.fonts.check(spec, 'Aa') && document.getElementById('collage-fonts')) || ++tries > 80) setReady(true);
          else setTimeout(attempt, 100);
        });
    };
    attempt();
  }, [font, handle]);
  // Release the frame only after React has re-rendered with the measured widths.
  useEffect(() => {
    if (ready) continueRender(handle);
  }, [ready, handle]);
  return ready;
}

/** Holds the render until a photo has decoded, so a sketched-in image is never blank in a frame. */
function useImageReady(src: string) {
  const [handle] = useState(() => delayRender(`whiteboard image ${src}`));
  useMemo(() => {
    if (typeof Image === 'undefined') return continueRender(handle);
    const img = new Image();
    img.src = staticFile(src);
    img.decode().then(() => continueRender(handle), () => continueRender(handle));
  }, [src, handle]);
}

function ImageEl({it, frame, ink, w}: {it: Prepared; frame: number; ink: string; w: number}) {
  const el = it.el as Extract<WbElement, {kind: 'image'}>;
  useImageReady(el.src);
  const [sweep, border] = it.strokes;
  const pSweep = progress(frame, it.spans[0]);
  const pBorder = progress(frame, it.spans[1]);
  const id = `wb-mask-${it.i}`;
  const band = it.box.h / (el.rows ?? 6);
  return (
    <g>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x={it.box.x - band} y={it.box.y - band} width={it.box.w + band * 2} height={it.box.h + band * 2}>
          <path d={sweep.d} fill="none" stroke="#fff" strokeWidth={band * 1.7} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${sweep.len} ${sweep.len}`} strokeDashoffset={sweep.len * (1 - pSweep)} />
        </mask>
      </defs>
      <image href={staticFile(el.src)} x={it.box.x} y={it.box.y} width={it.box.w} height={it.box.h} preserveAspectRatio={`${focusToAlign(el.focus)} slice`} mask={`url(#${id})`} />
      {pBorder > 0 && (
        <path d={border.d} fill="none" stroke={ink} strokeWidth={w} strokeLinejoin="round" strokeDasharray={`${getLength(border.d)} ${getLength(border.d)}`} strokeDashoffset={getLength(border.d) * (1 - pBorder)} />
      )}
    </g>
  );
}

/** "50% 20%" → SVG preserveAspectRatio alignment (nearest of min/mid/max on each axis). */
function focusToAlign(focus = '50% 40%') {
  const [fx, fy] = focus.split(/\s+/).map((v) => parseFloat(v));
  const pick = (v: number) => (v < 34 ? 'Min' : v > 66 ? 'Max' : 'Mid');
  return `x${pick(fx)}Y${pick(fy ?? 50)}`;
}

function PathEl({it, frame, ink, accent, w}: {it: Prepared; frame: number; ink: string; accent: string; w: number}) {
  const el = it.el;
  const color = el.color ?? ink;
  const doodle: Doodle | undefined = el.kind === 'doodle' ? (typeof el.doodle === 'string' ? DOODLES[el.doodle] : el.doodle) : undefined;
  const fills = doodle?.fills ?? [];
  // Colour goes in after the outline is finished, over 10 frames.
  const fillP = progress(frame, {start: it.end, end: it.end + 10});
  const sw = (el.width ?? w) / it.scale;
  return (
    <g transform={`translate(${it.offset.x} ${it.offset.y}) scale(${it.scale})`}>
      {fills.map((f, k) => (
        <path key={`f${k}`} d={f.d} fill={f.color ?? (el.kind === 'doodle' ? el.fill : undefined) ?? accent} opacity={fillP * 0.92} />
      ))}
      {it.strokes.map((s, k) => {
        const p = progress(frame, it.spans[k]);
        if (p <= 0) return null;
        return <path key={k} d={s.d} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${s.len} ${s.len}`} strokeDashoffset={s.len * (1 - p)} />;
      })}
    </g>
  );
}

/**
 * Handwritten text as HTML in the world layer (not SVG <text>: Chrome renders Devanagari matras
 * badly in scaled SVG text). The reveal is a clip that follows the pen across each line.
 */
function WriteEl({it, frame, ink}: {it: Prepared; frame: number; ink: string}) {
  const el = it.el as Extract<WbElement, {kind: 'write'}>;
  const size = el.size ?? 90;
  const font = el.font ?? FONT.hand;
  return (
    <>
      {it.lines!.map((l, k) => {
        const p = progress(frame, it.spans[k]);
        if (p <= 0) return null;
        // Once a line is written the clip opens fully, so a small width error can never trim it.
        const right = p >= 1 ? -size : Math.max(0, l.w * (1 - p));
        return (
          <div
            key={`${it.i}-${k}`}
            style={{
              position: 'absolute',
              left: l.left,
              top: l.base - size * 0.92,
              height: size * 1.5,
              width: l.w,
              fontFamily: font,
              fontWeight: 700,
              fontSize: size,
              lineHeight: `${size * 1.3}px`,
              whiteSpace: 'nowrap',
              color: el.color ?? ink,
              clipPath: `inset(-${size}px ${right}px -${size}px -${size}px)`,
            }}
          >
            {l.text}
          </div>
        );
      })}
    </>
  );
}

function Board({plan, c}: {plan: WhiteboardPlan; c: Clock}) {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const paper = PAPER[plan.paper ?? 'white'];
  const accent = plan.accent ?? '#d6392f';
  useFontReady(FONT.hand);
  // Text widths are re-measured each render (cheap) so fonts that load late are still right.
  const {items, overviews} = prepare(plan, c);
  const keys = useMemo(() => cameraKeys(items, overviews), [JSON.stringify(items.map((i) => [i.start, i.box])), JSON.stringify(overviews)]);
  const cam = cameraAt(frame, keys);
  const hand = plan.hand === false ? null : handAt(items, frame);
  const strokeW = 6;
  return (
    <AbsoluteFill style={{background: paper.bg, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: plan.world.w,
          height: plan.world.h,
          transformOrigin: '0 0',
          transform: `translate(${FOCUS.x - cam.x * cam.zoom}px, ${FOCUS.y - cam.y * cam.zoom}px) scale(${cam.zoom})`,
        }}
      >
        <svg width={plan.world.w} height={plan.world.h} viewBox={`0 0 ${plan.world.w} ${plan.world.h}`} style={{overflow: 'visible'}}>
          {items.map((it) => {
            if (frame < it.start) return null;
            if (it.el.kind === 'image') return <ImageEl key={it.i} it={it} frame={frame} ink={paper.ink} w={strokeW} />;
            return <PathEl key={it.i} it={it} frame={frame} ink={paper.ink} accent={accent} w={strokeW} />;
          })}
        </svg>
        {items.map((it) => (it.el.kind === 'write' && frame >= it.start ? <WriteEl key={`w${it.i}`} it={it} frame={frame} ink={paper.ink} /> : null))}
      </div>
      {hand && (() => {
        const s = toScreen(hand.p, cam, FOCUS);
        // Coming in / leaving: slide from the lower right, where the arm is.
        const hx = s.x + hand.out * width * 0.55;
        const hy = s.y + hand.out * height * 0.45;
        if (plan.hand === 'drawn') return <Hand x={hx} y={hy} style={paper.hand} />;
        return <ImageHand x={hx} y={hy} spec={typeof plan.hand === 'object' ? plan.hand : PHOTO_HAND} />;
      })()}
      {plan.sfx && items.map((it) => <Sfx key={`s${it.i}`} at={it.start} src={plan.sfx!.src} volume={plan.sfx!.volume ?? 0.25} duration={it.end - it.start} />)}
    </AbsoluteFill>
  );
}

/** A Short whose whole picture is one whiteboard; voice, music and captions come from ShortShell. */
export function whiteboard(plan: WhiteboardPlan): React.FC<ShortProps> {
  const paper = PAPER[plan.paper ?? 'white'];
  const Whiteboard = (props: ShortProps) => (
    <ShortShell
      {...props}
      background={paper.bg}
      captionStyle="clean"
      grain={0}
      captionAccent={plan.accent ?? '#d6392f'}
      beats={[{first: props.timing.lines[0].id, render: ({c}) => <Board plan={plan} c={c} />}]}
    />
  );
  return Whiteboard;
}

/** Exposed for tests and lint: start/end frames, boxes and camera keys of a plan. */
export const inspect = (plan: WhiteboardPlan, c: Clock) => {
  const {items, overviews} = prepare(plan, c);
  return {items: items.map((it) => ({kind: it.el.kind, start: it.start, end: it.end, box: it.box})), keys: cameraKeys(items, overviews)};
};
