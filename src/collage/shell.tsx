// Shared assembly for every Short: beats as sequences, torn-paper wipes, grain, captions,
// per-line voice and a music bed that ducks under speech.
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useVideoConfig} from 'remotion';
import {C} from './theme';
import {Captions, Grain, InkDefs, Sfx, TornWipe, clamp} from './primitives';
import {CleanCaptions} from './clean';
import {clock, type Clock, type Timing} from './timeline';

/** `track` names a bed in public/music (see scripts/import_music.py); without one the generated sfx/bed.wav plays. */
export type ShortProps = {timing: Timing; captions: boolean; music: boolean; track?: string};
export type BeatProps = {c: Clock; from: number; to: number; timing: Timing};
export type Beat = {first: string; render: (p: BeatProps) => React.ReactNode; wipe?: boolean};

/** Converts absolute frames into frames local to a beat's Sequence. */
export const local = (from: number) => (absolute: number) => absolute - from;

export function ShortShell({timing, captions, music, track, beats, lead = 4, background = C.cream, captionStyle = 'collage', grain = 0.16, captionAccent, captionInk}: ShortProps & {beats: Beat[]; lead?: number; background?: string; captionStyle?: 'collage' | 'clean'; grain?: number; captionAccent?: string; captionInk?: string}) {
  const {fps} = useVideoConfig();
  const c = clock(timing, fps);
  // Each beat cuts in a few frames before its first word.
  const starts = beats.map((b, i) => (i === 0 ? 0 : c.line(b.first) - lead));
  const voiced = timing.lines.filter((l) => l.audio);
  const speaking = (f: number) => timing.lines.some((l) => f >= c.line(l.id) && f < c.end(l.id));
  // Audio directions: "drop" pulls the music out through the pause before a line (tension, then
  // the voice lands in silence, music creeps back 1.5 s in); "swell" lets it sit up under the line, e.g. the loop.
  const drops = timing.lines.filter((l) => l.music === 'drop').map((l) => [c.line(l.id, -(l.pause ?? 0) - 0.15), Math.min(c.end(l.id), c.line(l.id, 1.5))]);
  const swells = timing.lines.filter((l) => l.music === 'swell').map((l) => [c.line(l.id), c.end(l.id)]);
  const bed = (f: number) => {
    const swell = swells.some(([a, b]) => f >= a && f < b);
    // About 3 dB under the original levels (0.2 / 0.1 / 0.22): owner feedback on the music-mania beds, Oct 2026.
    const level = swell ? 0.14 : voiced.length && speaking(f) ? 0.07 : 0.15;
    // A "drop" is a dip, not a cut: ease down to 35% over half a second and back up over a second.
    const dip = Math.min(1, ...drops.map(([a, b]) => interpolate(f, [a - 15, a, b, b + 30], [1, 0.35, 0.35, 1], clamp)));
    // A short fade: the loop line runs almost to the last frame, and the restart should feel continuous.
    return level * dip * interpolate(f, [c.total - 12, c.total], [1, 0], clamp);
  };
  return (
    <AbsoluteFill style={{background}}>
      <InkDefs />
      {beats.map((b, i) => {
        const from = starts[i];
        const to = i + 1 < beats.length ? starts[i + 1] : c.total;
        return (
          <Sequence key={b.first} from={from} durationInFrames={to - from} name={b.first}>
            {b.render({c, from, to, timing})}
          </Sequence>
        );
      })}
      {beats.map((b, i) =>
        b.wipe ? (
          <Sequence key={`wipe-${b.first}`} from={starts[i] - 7} durationInFrames={16} name={`wipe ${b.first}`}>
            <TornWipe at={0} duration={14} color={i % 2 ? C.red : C.ink} />
            <Sfx at={0} src="whoosh.wav" volume={0.5} />
          </Sequence>
        ) : null,
      )}
      {grain > 0 && <Grain strength={grain} />}
      {captions && (captionStyle === 'clean' ? <CleanCaptions timing={timing} accent={captionAccent} ink={captionInk} /> : <Captions timing={timing} />)}
      {voiced.map((l) => (
        <Sequence key={`vo-${l.id}`} from={c.line(l.id)} name={`voice ${l.id}`} layout="none">
          <Audio src={staticFile(l.audio!)} />
        </Sequence>
      ))}
      {music && <Audio src={staticFile(track ? `music/${track}.mp3` : 'sfx/bed.wav')} volume={bed} />}
      {timing.lines.flatMap((l) => (l.sfx ?? []).map((s, i) => <Sfx key={`sfx-${l.id}-${i}`} at={c.word(l.id, s.word)} src={s.sound} volume={s.volume ?? 0.6} />))}
    </AbsoluteFill>
  );
}
