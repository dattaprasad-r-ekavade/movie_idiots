// Preview compositions for the mascot rig: character sheet, transparent still, motion test.
import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {Cutout, Enter, Grain, Paper, Place, SPRING, Sfx, Stamp, TornLabel} from '../primitives';
import {buildTiming} from '../timeline';
import {POSES, TVHead, useMouth, usePose, type Expression, type PoseName} from './TVHead';

const SHEET: {pose: PoseName; expression: Expression}[] = [
  {pose: 'idle', expression: 'neutral'},
  {pose: 'wave', expression: 'happy'},
  {pose: 'point', expression: 'skeptic'},
  {pose: 'shrug', expression: 'sad'},
  {pose: 'present', expression: 'wink'},
  {pose: 'facepalm', expression: 'angry'},
  {pose: 'thumbsUp', expression: 'happy'},
  {pose: 'think', expression: 'shock'},
];

export function MascotSheet() {
  return (
    <AbsoluteFill>
      <Paper color={C.cream} seed={4} />
      <div style={{position: 'absolute', top: 40, width: '100%', textAlign: 'center', fontFamily: FONT.display, fontSize: 90, color: C.ink}}>Movie Idiot · character sheet v1</div>
      {SHEET.map((s, i) => (
        <Place key={s.pose} x={190 + (i % 4) * 340} y={i < 4 ? 520 : 1180}>
          <Cutout border={7}>
            <TVHead width={300} pose={POSES[s.pose]} expression={s.expression} idle={false} />
          </Cutout>
          <div style={{textAlign: 'center', fontFamily: FONT.type, fontSize: 34, color: C.ink, marginTop: 10}}>
            {s.pose} · {s.expression}
          </div>
        </Place>
      ))}
    </AbsoluteFill>
  );
}

/** Transparent background for exporting a high-resolution PNG. */
export function MascotStill() {
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <TVHead width={600} pose={POSES.wave} expression="happy" idle={false} />
    </AbsoluteFill>
  );
}

const demoTiming = buildTiming([{id: 'hi', text: 'नमस्ते दोस्तों, मैं हूँ आपका Movie Idiot!'}, {id: 'q', text: 'आज की कहानी सुनकर आप भी बोलोगे... क्या?!'}]);

export function MascotDemo() {
  const frame = useCurrentFrame();
  const pose = usePose([
    {at: 0, pose: 'idle'},
    {at: 18, pose: 'wave'},
    {at: 78, pose: 'present'},
    {at: 120, pose: 'point'},
    {at: 160, pose: 'shrug'},
    {at: 205, pose: 'facepalm'},
  ]);
  const mouth = useMouth(demoTiming);
  const zap = frame >= 112 && frame < 120;
  const expression: Expression = frame < 78 ? 'happy' : frame < 160 ? 'skeptic' : frame < 205 ? 'shock' : 'angry';
  return (
    <AbsoluteFill>
      <Paper color={C.kraft} seed={6} />
      <Place x={540} y={360}>
        <Enter kind="drop" delay={6}>
          <TornLabel width={760} size={74} seed="mi">Movie Idiot</TornLabel>
        </Enter>
      </Place>
      <Place x={540} y={1050}>
        <Enter kind="rise" delay={0} config={SPRING.heavy}>
          <Cutout border={9}>
            <TVHead width={640} pose={pose} expression={expression} mouth={mouth} screen={zap ? 'static' : 'face'} />
          </Cutout>
        </Enter>
      </Place>
      <Place x={790} y={1450} rotate={-8}>
        <Stamp text="क्या?!" at={170} size={110} />
      </Place>
      <Sequence from={0} layout="none"><Sfx at={0} src="whoosh.wav" volume={0.4} /></Sequence>
      <Sfx at={112} src="flicker.wav" volume={0.4} duration={10} />
      <Sfx at={170} src="stamp.wav" volume={0.8} />
      <Grain />
    </AbsoluteFill>
  );
}
