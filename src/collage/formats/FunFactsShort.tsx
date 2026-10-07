// Data-driven "Did you know?" Short. A plan maps script lines to beats; the edit is built
// from clean primitives, film stills and word anchors. Layout (1080×1920):
//   y≈170  kicker / fact badge     y≈260  headline (≤ 2 lines)
//   y≈700  still                   y≈1080 word-stamp (exits)    y≈1400 captions (Shorts UI ≈1540)
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Sfx, clamp} from '../primitives';
import {Backdrop, Callout, FactBadge, FilmStill, Headline, Kicker} from '../clean';
import {Presenter} from '../characters';
import {ShortShell, local, type BeatProps, type ShortProps} from '../shell';

/** A still from `npm run short -- still`, shown as a mounted print. */
export type StillRef = {src?: string; film?: string; year?: number | string; credit?: string; focus?: string; aspect?: number};
/** Text that lands on a spoken word: `{line, word, text}` shows `text` when `word` is said. */
export type Pop = {line?: string; word: string; text: string};

export type FactBeat = {
  /** Script line IDs in this beat; the first one starts it. */
  lines: string[];
  /** On-screen headline: adds a label, name or number; never repeats the caption. "\n" breaks lines. */
  headline: string;
  accent?: string[];
  still?: StillRef;
  pop?: Pop;
  /** Second headline for the punch line (`reveal` role); swaps in when that line starts. */
  reveal?: {line: string; headline: string; accent?: string[]};
};

export type FunFactsPlan = {
  kicker?: string;
  hook: {lines: string[]; headline: string; accent?: string[]; still?: StillRef; pop?: Pop};
  facts: FactBeat[];
  /** Closes the hook's loop. Reuses the hook still, now sharp, unless it brings its own. */
  payoff: {lines: string[]; headline: string; accent?: string[]; still?: StillRef; pop?: Pop};
  /** The loop line(s): the hook frame returns so the restart feels continuous. */
  loop: {lines: string[]};
  /** Mascot cameo on the hook and the payoff. */
  mascot?: boolean;
  /** Show "2/4" on fact beats. */
  numbered?: boolean;
};

const DEFAULT_KICKER = 'Did you know?';

function Top({children}: {children: React.ReactNode}) {
  return <div style={{position: 'absolute', left: 70, right: 70, top: 150, display: 'flex', justifyContent: 'center'}}>{children}</div>;
}
function Title({children}: {children: React.ReactNode}) {
  return <div style={{position: 'absolute', left: 60, right: 60, top: 250, display: 'flex', justifyContent: 'center'}}>{children}</div>;
}
function Stage({children, top = 700}: {children: React.ReactNode; top?: number}) {
  return <div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>{children}</div>;
}

function PopAt({pop, c, from, fallbackLine, top}: {pop?: Pop; c: BeatProps['c']; from: number; fallbackLine: string; top: number}) {
  if (!pop) return null;
  const at = local(from)(c.word(pop.line ?? fallbackLine, pop.word));
  // Stamp on the lower third of the still, then leave so it does not sit on later captions or the reveal.
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center', zIndex: 25}}>
        <Callout text={pop.text} at={at} exit={at + 20} size={pop.text.length > 8 ? 90 : 140} bg={C.marigold} color={C.ink} />
      </div>
      <Sfx at={at} src="pop.wav" volume={0.5} />
    </>
  );
}

function HookFrame({plan, c, from, still, settle = false}: BeatProps & {plan: FunFactsPlan; still?: StillRef; settle?: boolean}) {
  const L = local(from);
  const {hook} = plan;
  // On the loop the frame is already "there": no entrance, so the restart reads as one shot.
  // The hook headline is already on the very first frame (it is what stops the scroll).
  const at = settle ? -30 : -20;
  const blur = 16;
  return (
    <AbsoluteFill>
      <Top><Kicker text={plan.kicker ?? DEFAULT_KICKER} at={at} /></Top>
      <Title><Headline text={hook.headline} accent={hook.accent} at={at + 3} size={100} /></Title>
      <Stage>
        {still ? <FilmStill {...still} at={settle ? at : 2} blur={blur} tilt={-1.5} credit={undefined} film={undefined} year={undefined} /> : null}
      </Stage>
      <PopAt pop={hook.pop} c={c} from={from} fallbackLine={hook.lines[0]} top={1080} />
      {plan.mascot && !settle && <Presenter at="bottom-right" width={230} enter={L(c.end(hook.lines[0], -0.3))} talk={false} cues={[{at: 0, pose: 'shrug', expression: 'shock'}]} />}
      {!settle && <Sfx at={0} src="riser.wav" volume={0.35} />}
      {!settle && still && <Sfx at={6} src="shutter.wav" volume={0.4} />}
    </AbsoluteFill>
  );
}

function Fact({fact, index, count, numbered, c, from, to}: BeatProps & {fact: FactBeat; index: number; count: number; numbered?: boolean}) {
  const L = local(from);
  const swap = fact.reveal ? L(c.line(fact.reveal.line)) - 4 : undefined;
  const length = to - from;
  return (
    <AbsoluteFill>
      <Top>{numbered ? <FactBadge n={index + 1} of={count} at={0} /> : <Kicker text={DEFAULT_KICKER} at={0} />}</Top>
      <Title>
        <Headline text={fact.headline} accent={fact.accent} at={0} exit={swap} />
      </Title>
      {fact.reveal && (
        <Title>
          <Headline text={fact.reveal.headline} accent={fact.reveal.accent} at={(swap ?? 0) + 8} />
        </Title>
      )}
      <Stage>
        <FilmStill {...fact.still} at={2} tilt={index % 2 ? 2 : -2} duration={length} />
      </Stage>
      <PopAt pop={fact.pop} c={c} from={from} fallbackLine={fact.lines[0]} top={1080} />
      <Sfx at={0} src="whoosh.wav" volume={0.35} />
      <Sfx at={2} src="shutter.wav" volume={0.35} />
      {swap !== undefined && <Sfx at={swap + 8} src="pop.wav" volume={0.4} />}
    </AbsoluteFill>
  );
}

function Payoff({plan, c, from, to}: BeatProps & {plan: FunFactsPlan}) {
  const frame = useCurrentFrame();
  const L = local(from);
  const {payoff} = plan;
  const still = payoff.still ?? plan.hook.still;
  // The hook's blurred still comes into focus: the loop closes on screen.
  const focus = interpolate(frame, [6, 26], [16, 0], clamp);
  return (
    <AbsoluteFill>
      <Top><Kicker text="Answer" at={0} /></Top>
      <Title><Headline text={payoff.headline} accent={payoff.accent} at={0} /></Title>
      <Stage>{still && <FilmStill {...still} at={-20} blur={focus} tilt={-1.5} duration={to - from} />}</Stage>
      <PopAt pop={payoff.pop} c={c} from={from} fallbackLine={payoff.lines[0]} top={1080} />
      {plan.mascot && <Presenter at={{x: 980, y: 1475}} width={140} enter={L(c.line(payoff.lines[0])) + 10} talk={false} cues={[{at: 0, pose: 'point', expression: 'happy'}]} />}
      <Sfx at={6} src="whoosh.wav" volume={0.35} />
    </AbsoluteFill>
  );
}

/** Build a Short component from a plan. The shell supplies captions, voice, music and grain. */
export function funFacts(plan: FunFactsPlan): React.FC<ShortProps> {
  const FunFacts = (props: ShortProps) => (
    <ShortShell
      {...props}
      background="#0c0e17"
      captionStyle="clean"
      grain={0.07}
      lead={3}
      beats={[
        {first: plan.hook.lines[0], render: (p) => <><Backdrop /><HookFrame {...p} plan={plan} still={plan.hook.still} /></>},
        ...plan.facts.map((fact, i) => ({
          first: fact.lines[0],
          render: (p: BeatProps) => <><Backdrop /><Fact {...p} fact={fact} index={i} count={plan.facts.length} numbered={plan.numbered} /></>,
        })),
        {first: plan.payoff.lines[0], render: (p) => <><Backdrop /><Payoff {...p} plan={plan} /></>},
        {first: plan.loop.lines[0], render: (p) => <><Backdrop /><HookFrame {...p} plan={plan} still={plan.hook.still} settle /></>},
      ]}
    />
  );
  return FunFacts;
}
