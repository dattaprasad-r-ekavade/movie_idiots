import React from 'react';
import {Composition, registerRoot} from 'remotion';
import './theme';
import {SHORTS} from './shorts';
import {buildTiming} from './timeline';

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
    </>
  );
}
registerRoot(Root);
