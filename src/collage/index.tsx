import React from 'react';
import {Composition, registerRoot} from 'remotion';
import './theme';
import {SHORTS} from './shorts';
import {buildTiming} from './timeline';
import {MascotDemo, MascotSheet, MascotStill} from './characters/Preview';

const FPS = 30;

function Root() {
  return (
    <>
      {SHORTS.map((s) => (
        <Composition
          key={s.slug}
          id={s.slug}
          component={s.component}
          width={1080}
          height={1920}
          fps={FPS}
          durationInFrames={FPS * 60}
          defaultProps={{timing: buildTiming(s.lines), captions: true, music: true}}
          calculateMetadata={({props}) => ({durationInFrames: Math.round(props.timing.total * FPS)})}
        />
      ))}
      <Composition id="mascot-sheet" component={MascotSheet} width={1400} height={1640} fps={FPS} durationInFrames={1} />
      <Composition id="mascot-still" component={MascotStill} width={600} height={1000} fps={FPS} durationInFrames={1} defaultProps={{pose: 'wave' as const, expression: 'happy' as const}} />
      <Composition id="mascot-demo" component={MascotDemo} width={1080} height={1920} fps={FPS} durationInFrames={FPS * 9} />
    </>
  );
}
registerRoot(Root);
