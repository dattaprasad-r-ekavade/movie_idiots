// Drop-in presenter: the Movie Idiot mascot reacting to the narration inside any beat.
//   <Presenter at="bottom-left" enter={20} cues={[{at: 40, pose: 'shrug', expression: 'sad'}]} timing={timing} timeOffset={from} />
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Cutout} from '../primitives';
import type {Timing} from '../timeline';
import {TVHead, useMouth, usePose, type Expression, type PoseName} from './TVHead';

export type PresenterCue = {at: number; pose?: PoseName; expression?: Expression; screen?: 'face' | 'static' | React.ReactNode};
export type PresenterAnchor = 'bottom-left' | 'bottom-right' | 'center' | {x: number; y: number};

const ASPECT = 1000 / 600;

/** Centre point for an anchor; bottom anchors keep the feet just above the caption band. */
function anchorPoint(anchor: PresenterAnchor, width: number, frameW: number, frameH: number) {
  if (typeof anchor === 'object') return anchor;
  const h = width * ASPECT;
  const vertical = frameH > frameW;
  const floor = vertical ? 1370 : frameH - 70; // Shorts captions start at y≈1395
  const y = floor - h / 2;
  if (anchor === 'center') return {x: frameW / 2, y: frameH / 2};
  const margin = width * 0.42;
  return {x: anchor === 'bottom-left' ? margin : frameW - margin, y};
}

export function Presenter({
  at = 'bottom-left',
  width = 300,
  enter = 0,
  exit,
  cues = [],
  timing,
  timeOffset = 0,
  talk = true,
  rotate,
  border = 7,
}: {
  at?: PresenterAnchor;
  width?: number;
  /** Frame (local to the beat) when the mascot pops in. */
  enter?: number;
  exit?: number;
  cues?: PresenterCue[];
  /** Narration timing; with `talk`, the mouth flaps on spoken words. */
  timing?: Timing;
  /** The beat's absolute start frame, so lip-flap lines up with the narration. */
  timeOffset?: number;
  talk?: boolean;
  rotate?: number;
  border?: number;
}) {
  const frame = useCurrentFrame();
  const {fps, width: W, height: H} = useVideoConfig();
  const sorted = [...cues].sort((a, b) => a.at - b.at);
  const poseKeys = [{at: -1, pose: 'idle' as PoseName}, ...sorted.filter((c) => c.pose).map((c) => ({at: c.at, pose: c.pose!}))];
  const pose = usePose(poseKeys);
  const mouth = useMouth(talk ? timing : undefined, timeOffset);
  const latest = <K extends keyof PresenterCue>(key: K): PresenterCue[K] | undefined => {
    let value: PresenterCue[K] | undefined;
    for (const c of sorted) if (c.at <= frame && c[key] !== undefined) value = c[key];
    return value;
  };
  if (frame < enter) return null;
  const pop = spring({frame: frame - enter, fps, config: {damping: 11, stiffness: 160, mass: 0.8}});
  const out = exit === undefined ? 0 : interpolate(frame, [exit, exit + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const {x, y} = anchorPoint(at, width, W, H);
  const side = typeof at === 'string' && at.endsWith('right') ? 1 : -1;
  const lean = rotate ?? (typeof at === 'string' && at !== 'center' ? side * 4 : 0);
  const rise = (1 - pop) * width * 1.6 + out * width * 1.8;
  return (
    <div style={{position: 'absolute', left: x, top: y, zIndex: 30, transform: `translate(-50%, -50%) translateY(${rise}px) rotate(${lean}deg)`}}>
      <Cutout border={border}>
        <TVHead width={width} pose={pose} expression={latest('expression') ?? 'neutral'} screen={latest('screen') ?? 'face'} mouth={mouth} />
      </Cutout>
    </div>
  );
}
