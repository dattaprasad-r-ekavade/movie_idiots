// Fun-facts design v2 (docs/shorts-redesign.md): a layout per beat instead of one template,
// a palette and texture per Short, varied transitions, and the Movie Idiot as a small cameo
// reactor (never talking). Opt in with `design: 'v2'` in a plan; v1 Shorts render unchanged.
// Safe zones (1080×1920): headline y≈150–480 · stage y≈520–1360 · captions y≈1400 · Shorts UI below ≈1540 and on the right edge.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';
import {Paper, Sfx, clamp} from '../primitives';
import {Callout, FilmStill, SMOOTH} from '../clean';
import {Presenter} from '../characters';
import {ShortShell, local, type BeatProps, type ShortProps} from '../shell';
import type {Expression, PoseName} from '../characters/TVHead';
import type {FactBeat, FunFactsPlan, Pop, StillRef} from './FunFactsShort';

export type Palette = {bg: [string, string]; accent: string; text: string; ink: string; texture: Texture};
export type Texture = 'grain' | 'paper' | 'curtain';
export type Layout = 'print' | 'number' | 'versus' | 'ticket' | 'stack';
export type Transition = 'cut' | 'whip' | 'static' | 'slide';
/** Mascot cameo: pops into a free corner when `word` is said, reacts, leaves (~1.5 s). */
export type React_ = {line?: string; word: string; expression: Expression; pose?: PoseName};
/** Big counting figure for the `number` layout. */
export type NumberSpec = {line?: string; word: string; value: number; prefix?: string; suffix?: string; label?: string};
/** Two prints stacked for the `versus` layout: top shows from the beat start, bottom lands on `bottom.word`; `middle` sits between ("VS", "183 vs 120"). */
export type VersusSpec = {top: StillRef & {word?: string; line?: string}; bottom: StillRef & {word?: string; line?: string}; middle: string};
/** Cinema-ticket card for the `ticket` layout. */
export type TicketSpec = {line?: string; word: string; title: string; figure: string; sub?: string};

export const PALETTES: Record<string, Palette> = {
  marquee: {bg: ['#17131f', '#0b0a10'], accent: '#ffc83d', text: '#fffaf0', ink: '#16120b', texture: 'grain'},
  velvet: {bg: ['#3a0b14', '#12040a'], accent: '#ffd27a', text: '#fff6ea', ink: '#24070d', texture: 'curtain'},
  newsprint: {bg: ['#efe6d2', '#e2d5b8'], accent: '#d6392f', text: '#1d1a17', ink: '#fffaf0', texture: 'paper'},
  lagoon: {bg: ['#082a2e', '#071417'], accent: '#ff7a59', text: '#f4fbf9', ink: '#1a0d08', texture: 'grain'},
};

export function paletteOf(plan: FunFactsPlan): Palette {
  const p = plan.palette;
  const base = typeof p === 'object' ? p : PALETTES[p ?? 'marquee'] ?? PALETTES.marquee;
  return {...base, texture: plan.texture ?? base.texture};
}

const TRANSITIONS: Transition[] = ['whip', 'static', 'slide', 'cut'];

// ---------- backdrop ----------

function Backdrop2({pal}: {pal: Palette}) {
  const frame = useCurrentFrame();
  const sweep = 30 + Math.sin(frame / 70) * 25;
  if (pal.texture === 'paper')
    return (
      <AbsoluteFill>
        <Paper color={pal.bg[0]} fibre={0.35} seed={7} />
        <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(60,40,20,.22))`}} />
      </AbsoluteFill>
    );
  if (pal.texture === 'curtain')
    return (
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${pal.bg[0]}, ${pal.bg[1]})`}}>
        {/* Velvet folds: soft vertical bands that sway a little. */}
        <AbsoluteFill style={{opacity: 0.55, background: `repeating-linear-gradient(90deg, rgba(0,0,0,.35) 0px, rgba(255,255,255,.05) ${60 + Math.sin(frame / 50) * 4}px, rgba(0,0,0,.35) 130px)`}} />
        <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.65), transparent 30%, transparent 70%, rgba(0,0,0,.7))'}} />
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{background: `linear-gradient(170deg, ${pal.bg[0]}, ${pal.bg[1]})`}}>
      <AbsoluteFill style={{background: `linear-gradient(115deg, transparent ${sweep}%, rgba(255,255,255,.05) ${sweep + 8}%, transparent ${sweep + 18}%)`}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, transparent 50%, rgba(0,0,0,.55))'}} />
    </AbsoluteFill>
  );
}

// ---------- type ----------

/** Left-aligned headline; accent words sit in a box of the accent colour. Lines rise from a baseline. */
function Headline2({text, accent = [], pal, at = 0, exit, size = 92}: {text: string; accent?: string[]; pal: Palette; at?: number; exit?: number; size?: number}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const out = exit === undefined ? 0 : interpolate(frame, [exit, exit + 3], [0, 1], clamp);
  if (frame < at || (exit !== undefined && frame >= exit + 3)) return null;
  const longest = Math.max(...text.split('\n').map((l) => [...l].length));
  size = Math.min(size, Math.floor(740 / (longest * 0.56)));
  return (
    <div style={{position: 'absolute', left: 70, right: 270, top: 170, fontFamily: FONT.body, fontWeight: 800, fontSize: size, whiteSpace: 'nowrap', lineHeight: 1.18, color: pal.text, opacity: 1 - out}}>
      {text.split('\n').map((line, i) => {
        const p = spring({frame: frame - at - i * 4, fps, config: SMOOTH});
        return (
          <div key={i} style={{overflow: 'hidden', padding: `${size * 0.14}px 0`, margin: `-${size * 0.14}px 0`}}>
            <div style={{transform: `translateY(${(1 - p) * 110}%)`}}>
              {line.split(' ').map((word, j) => {
                const hit = accent.some((a) => word.includes(a));
                return (
                  <React.Fragment key={j}>
                    {j > 0 && ' '}
                    <span style={hit ? {background: pal.accent, color: pal.ink, padding: '0 14px', borderRadius: 10, boxDecorationBreak: 'clone'} : undefined}>{word}</span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Kicker2({text, pal, at, exit}: {text: string; pal: Palette; at: number; exit: number}) {
  const frame = useCurrentFrame();
  if (frame < at || frame > exit + 6) return null;
  const o = interpolate(frame, [at, at + 6, exit, exit + 6], [0, 1, 1, 0], clamp);
  return <div style={{position: 'absolute', left: 74, top: 104, fontFamily: FONT.body, fontWeight: 800, fontSize: 38, letterSpacing: 2, color: pal.accent, opacity: o, textTransform: 'uppercase'}}>{text}</div>;
}

// ---------- pieces ----------

/** Shrink a still so it fits a box, keeping its aspect. */
function fit(still: StillRef | undefined, maxW: number, maxH: number): StillRef | undefined {
  if (!still) return still;
  const aspect = still.aspect ?? 16 / 9;
  const width = Math.min(still.width ?? maxW, maxW, maxH * aspect);
  return {...still, width: Math.round(width), aspect};
}

function At({top, left, children, z}: {top: number; left?: number; children: React.ReactNode; z?: number}) {
  return <div style={{position: 'absolute', top, left: left ?? 0, right: left === undefined ? 0 : undefined, display: 'flex', justifyContent: left === undefined ? 'center' : 'flex-start', zIndex: z}}>{children}</div>;
}

function Pop2({pop, c, from, fallbackLine, pal, top = 1060}: {pop?: Pop; c: BeatProps['c']; from: number; fallbackLine: string; pal: Palette; top?: number}) {
  if (!pop) return null;
  const at = local(from)(c.word(pop.line ?? fallbackLine, pop.word));
  return (
    <>
      <At top={top} z={25}><Callout text={pop.text} at={at} exit={at + 22} size={pop.text.length > 8 ? 88 : 132} bg={pal.accent} color={pal.ink} /></At>
      <Sfx at={at} src="pop.wav" volume={0.45} />
    </>
  );
}

const group = (n: number) => {
  const s = String(Math.round(n));
  if (s.length <= 3) return s;
  const last = s.slice(-3);
  return s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last; // Indian grouping: 1,50,000
};

function BigNumber({spec, at, pal}: {spec: NumberSpec; at: number; pal: Palette}) {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [at, at + 22], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  if (frame < at - 2) return null;
  const n = spec.value * t;
  const scale = interpolate(frame, [at, at + 6, at + 12], [0.8, 1.06, 1], clamp);
  const full = `${spec.prefix ?? ''}${group(spec.value)}${spec.suffix ?? ''}`;
  const size = Math.min(250, Math.floor(940 / (full.length * 0.56)));
  return (
    <div style={{textAlign: 'center', transform: `scale(${scale})`}}>
      <div style={{fontFamily: FONT.body, fontWeight: 800, fontSize: size, lineHeight: 1, color: pal.accent, textShadow: '0 10px 40px rgba(0,0,0,.45)', whiteSpace: 'nowrap'}}>
        {spec.prefix ?? ''}{group(n)}{spec.suffix ?? ''}
      </div>
      {spec.label && <div style={{marginTop: 18, fontFamily: FONT.body, fontWeight: 800, fontSize: 58, color: pal.text, opacity: t}}>{spec.label}</div>}
    </div>
  );
}

function Ticket({spec, at, pal}: {spec: TicketSpec; at: number; pal: Palette}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < at) return null;
  const p = spring({frame: frame - at, fps, config: {damping: 16, stiffness: 150}});
  const notch = 'radial-gradient(circle at 0 50%, transparent 34px, #000 35px) left / 51% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent 34px, #000 35px) right / 51% 100% no-repeat';
  return (
    <div style={{transform: `translateY(${(1 - p) * 260}px) rotate(${(1 - p) * -8 - 2}deg)`, opacity: Math.min(1, p * 1.4), filter: 'drop-shadow(0 24px 40px rgba(0,0,0,.45))'}}>
      <div style={{width: 880, height: 400, background: '#f6ecd4', WebkitMask: notch, mask: notch, display: 'flex', fontFamily: FONT.body, color: '#1d1a17'}}>
        <div style={{flex: 1, padding: '38px 30px 30px 70px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div style={{fontFamily: FONT.type, fontSize: 30, letterSpacing: 6, color: C.red}}>ADMIT ONE · MOVIE IDIOTS</div>
          <div style={{fontFamily: FONT.display, fontSize: 70, lineHeight: 1.05}}>{spec.title}</div>
          {spec.sub && <div style={{fontWeight: 800, fontSize: 34, opacity: 0.7}}>{spec.sub}</div>}
        </div>
        <div style={{width: 260, borderLeft: '6px dashed rgba(29,26,23,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px 0 18px'}}>
          <div style={{fontWeight: 800, fontSize: Math.min(76, Math.floor(220 / (spec.figure.length * 0.55))), lineHeight: 1, textAlign: 'center', color: C.red, whiteSpace: 'nowrap'}}>{spec.figure}</div>
        </div>
      </div>
    </div>
  );
}

/** Holds the print full-size on the stage, then shrinks it under the big number when that lands. */
function Shrink({at, children}: {at: number; children: React.ReactNode}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = spring({frame: frame - at, fps, config: SMOOTH});
  return <div style={{position: 'absolute', top: 540, left: 0, right: 0, display: 'flex', justifyContent: 'center', transformOrigin: '50% 0', transform: `translateY(${t * 430}px) scale(${1 - t * 0.45})`}}>{children}</div>;
}

/** TV-static flash for the `static` transition: deterministic noise bands. */
function Static({frames = 6}: {frames?: number}) {
  const frame = useCurrentFrame();
  if (frame >= frames) return null;
  const bands = Array.from({length: 24}, (_, i) => {
    const r = random(`static-${frame}-${i}`);
    return `rgba(${r > 0.5 ? 255 : 30},${r > 0.5 ? 255 : 30},${r > 0.5 ? 255 : 30},${0.2 + r * 0.35}) ${(i / 24) * 100}% ${((i + 1) / 24) * 100}%`;
  });
  return <AbsoluteFill style={{zIndex: 60, background: `linear-gradient(180deg, ${bands.join(',')})`, opacity: interpolate(frame, [0, frames], [1, 0.2], clamp), mixBlendMode: 'screen'}} />;
}

/** Entry move for a beat; the backdrop stays put so only the content travels. */
function Enter2({kind, children}: {kind: Transition; children: React.ReactNode}) {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 9], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const style: React.CSSProperties =
    kind === 'whip' ? {transform: `translateX(${(1 - t) * 900}px) skewX(${(1 - t) * -12}deg)`, filter: t < 1 ? `blur(${(1 - t) * 10}px)` : undefined}
    : kind === 'slide' ? {transform: `translateY(${(1 - t) * 420}px)`, opacity: t}
    : {};
  return (
    <AbsoluteFill style={style}>
      {children}
      {kind === 'static' && <Static />}
    </AbsoluteFill>
  );
}

const SOUND: Record<Transition, string | null> = {whip: 'whoosh.wav', static: 'flicker.wav', slide: 'paper.wav', cut: null};

/** Mascot cameo in the top-right corner, beside the headline: clear of the stage, captions and the Shorts buttons. */
function Cameo({react, c, from, fallbackLine}: {react?: React_; c: BeatProps['c']; from: number; fallbackLine: string}) {
  const frame = useCurrentFrame();
  if (!react) return null;
  const at = local(from)(c.word(react.line ?? fallbackLine, react.word));
  const enter = Math.max(0, at - 4);
  if (frame > enter + 54) return null;
  return (
    <>
      <Presenter at={{x: 930, y: 330}} width={170} enter={enter} exit={enter + 44} talk={false} rotate={6} cues={[{at: enter, expression: react.expression, pose: react.pose ?? 'idle'}]} />
      <Sfx at={enter} src="pop.wav" volume={0.3} />
    </>
  );
}

// ---------- layouts ----------

const CORNER: Record<Layout, 'left' | 'right'> = {print: 'right', number: 'right', versus: 'right', ticket: 'right', stack: 'left'};

function Stage2({fact, layout, c, from, to, pal, index}: BeatProps & {fact: FactBeat; layout: Layout; pal: Palette; index: number}) {
  const L = local(from);
  const length = to - from;
  const wordAt = (word: string, line?: string) => L(c.word(line ?? fact.lines[0], word));
  const tilt = index % 2 ? 1.2 : -1.2;
  if (layout === 'number' && fact.number) {
    const at = wordAt(fact.number.word, fact.number.line);
    return (
      <>
        <At top={600}><BigNumber spec={fact.number} at={at} pal={pal} /></At>
        {fact.still && <Shrink at={at}><FilmStill {...fit(fact.still, 940, 760)} at={2} exit={length} tilt={-2} duration={length} /></Shrink>}
        <Sfx at={at} src="coin.wav" volume={0.4} />
      </>
    );
  }
  if (layout === 'versus' && fact.versus) {
    const v = fact.versus;
    // The top print opens the beat (never an empty frame); the bottom one lands on its word.
    const tAt = 2;
    const bAt = v.bottom.word ? wordAt(v.bottom.word, v.bottom.line) : 8;
    return (
      <>
        <At top={530}><FilmStill {...fit(v.top, 900, 370)} at={tAt} exit={length} tilt={-1.5} duration={length} /></At>
        <At top={960}><FilmStill {...fit(v.bottom, 900, 370)} at={bAt} exit={length} tilt={1.5} duration={length} /></At>
        <At top={890} z={20}><Callout text={v.middle} at={Math.max(tAt, bAt) + 4} size={v.middle.length > 6 ? 70 : 96} bg={pal.accent} color={pal.ink} /></At>
        <Sfx at={tAt} src="shutter.wav" volume={0.3} />
        <Sfx at={bAt} src="shutter.wav" volume={0.3} />
      </>
    );
  }
  if (layout === 'ticket' && fact.ticket) {
    const at = wordAt(fact.ticket.word, fact.ticket.line);
    return (
      <>
        {fact.still && <At top={540}><FilmStill {...fit(fact.still, 760, 420)} at={2} exit={length} tilt={tilt} duration={length} /></At>}
        <At top={930} z={15}><Ticket spec={fact.ticket} at={at} pal={pal} /></At>
        <Sfx at={at} src="paper.wav" volume={0.45} />
      </>
    );
  }
  // print / stack (stack = print plus `cuts` dealt on top)
  const cutAt = (fact.cuts ?? []).map((cut) => wordAt(cut.word, cut.line));
  const exitAfter = (i: number) => {
    const next = (fact.cuts ?? []).findIndex((cut, j) => j > i && cut.replace);
    return next < 0 ? length : cutAt[next] + 4;
  };
  return (
    <>
      <At top={540}><FilmStill {...fit(fact.still, 960, 800)} at={2} exit={exitAfter(-1)} tilt={tilt} duration={length} /></At>
      {fact.cuts?.map((cut, i) => (
        <At key={i} top={540 + (cut.offset?.[1] ?? 0)}>
          <FilmStill {...fit(cut, 940, 800)} at={cutAt[i]} exit={exitAfter(i)} tilt={cut.tilt ?? (i % 2 ? -2 : 2)} duration={length - cutAt[i]} />
          <Sfx at={cutAt[i]} src="shutter.wav" volume={0.3} />
        </At>
      ))}
    </>
  );
}

function Fact2({fact, index, pal, c, from, to, timing}: BeatProps & {fact: FactBeat; index: number; pal: Palette}) {
  const L = local(from);
  const layout: Layout = fact.layout ?? (fact.cuts?.length ? 'stack' : 'print');
  const transition = fact.transition ?? TRANSITIONS[index % TRANSITIONS.length];
  const swap = fact.reveal ? L(c.line(fact.reveal.line)) - 4 : undefined;
  const end = L(c.end(fact.lines[fact.lines.length - 1]));
  const revealEnd = fact.reveal ? L(c.end(fact.reveal.line)) : undefined;
  const sound = SOUND[transition];
  return (
    <Enter2 kind={transition}>
      <Headline2 text={fact.headline} accent={fact.accent} pal={pal} exit={swap ?? end} />
      {fact.reveal && <Headline2 text={fact.reveal.headline} accent={fact.reveal.accent} pal={pal} at={(swap ?? 0) + 6} exit={revealEnd} />}
      <Stage2 fact={fact} layout={layout} c={c} from={from} to={to} timing={timing} pal={pal} index={index} />
      <Pop2 pop={fact.pop} c={c} from={from} fallbackLine={fact.lines[0]} pal={pal} />
      <Cameo react={fact.react} c={c} from={from} fallbackLine={fact.lines[0]} />
      {sound && <Sfx at={0} src={sound} volume={0.35} />}
      {swap !== undefined && <Sfx at={swap + 6} src="pop.wav" volume={0.4} />}
    </Enter2>
  );
}

function Hook2({plan, pal, c, from, settle = false}: BeatProps & {plan: FunFactsPlan; pal: Palette; settle?: boolean}) {
  const L = local(from);
  const {hook} = plan;
  const at = settle ? -30 : -20;
  const out = settle ? undefined : L(c.end(hook.lines[hook.lines.length - 1]));
  return (
    <AbsoluteFill>
      {!settle && <Kicker2 text={plan.kicker ?? 'Did you know?'} pal={pal} at={0} exit={36} />}
      <Headline2 text={hook.headline} accent={hook.accent} pal={pal} at={at} exit={out} size={100} />
      {hook.still && <At top={540}><FilmStill {...fit(hook.still, 960, 800)} at={at} exit={out} tilt={-1} credit={undefined} film={undefined} year={undefined} /></At>}
      <Pop2 pop={hook.pop} c={c} from={from} fallbackLine={hook.lines[0]} pal={pal} />
      {!settle && <Cameo react={hook.react} c={c} from={from} fallbackLine={hook.lines[0]} />}
      {!settle && <Sfx at={0} src="riser.wav" volume={0.3} />}
    </AbsoluteFill>
  );
}

function Payoff2({plan, pal, c, from, to}: BeatProps & {plan: FunFactsPlan; pal: Palette}) {
  const frame = useCurrentFrame();
  const L = local(from);
  const {payoff} = plan;
  const still = payoff.still ?? plan.hook.still;
  const end = L(c.end(payoff.lines[0]));
  // A short rack focus on the answer still; the hook itself is never blurred.
  const focus = interpolate(frame, [4, 18], [10, 0], clamp);
  // Cuts swap the print on a spoken word, so each person is on screen only while named.
  const cutAt = (payoff.cuts ?? []).map((cut) => L(c.word(cut.line ?? payoff.lines[0], cut.word)));
  const firstOut = cutAt.length ? cutAt[0] + 4 : end;
  return (
    <Enter2 kind="static">
      <Headline2 text={payoff.headline} accent={payoff.accent} pal={pal} exit={end} />
      {still && <At top={540}><FilmStill {...fit(still, 960, 800)} at={-12} exit={firstOut} blur={focus} tilt={-1} duration={to - from} /></At>}
      {payoff.cuts?.map((cut, i) => (
        <At key={i} top={540}>
          <FilmStill {...fit(cut, 960, 800)} at={cutAt[i]} exit={i + 1 < cutAt.length ? cutAt[i + 1] + 4 : end} tilt={cut.tilt ?? 1.5} duration={to - from - cutAt[i]} />
          <Sfx at={cutAt[i]} src="shutter.wav" volume={0.3} />
        </At>
      ))}
      <Pop2 pop={payoff.pop} c={c} from={from} fallbackLine={payoff.lines[0]} pal={pal} />
      <Cameo react={payoff.react} c={c} from={from} fallbackLine={payoff.lines[0]} />
      <Sfx at={0} src="flicker.wav" volume={0.3} />
    </Enter2>
  );
}

export function funFactsV2(plan: FunFactsPlan): React.FC<ShortProps> {
  const pal = paletteOf(plan);
  const bg = <Backdrop2 pal={pal} />;
  const FunFactsV2 = (props: ShortProps) => (
    <ShortShell
      {...props}
      background={pal.bg[1]}
      captionStyle="clean"
      captionAccent={pal.accent}
      captionInk={pal.ink}
      grain={pal.texture === 'paper' ? 0.05 : 0.08}
      lead={3}
      beats={[
        {first: plan.hook.lines[0], render: (p) => <>{bg}<Hook2 {...p} plan={plan} pal={pal} /></>},
        ...plan.facts.map((fact, i) => ({first: fact.lines[0], render: (p: BeatProps) => <>{bg}<Fact2 {...p} fact={fact} index={i} pal={pal} /></>})),
        {first: plan.payoff.lines[0], render: (p) => <>{bg}<Payoff2 {...p} plan={plan} pal={pal} /></>},
        {first: plan.loop.lines[0], render: (p) => <>{bg}<Hook2 {...p} plan={plan} pal={pal} settle /></>},
      ]}
    />
  );
  return FunFactsV2;
}
