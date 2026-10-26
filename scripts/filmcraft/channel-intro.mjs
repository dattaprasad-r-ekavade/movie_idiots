// Movie Idiots channel intro — FilmCraft half. Cuts the two EffectCraft shots together, grades, adds
// camera shake and light leaks, builds the soundtrack from the sfx kit, and exports.
//   node scripts/filmcraft/channel-intro.mjs        (after scripts/effectcraft/channel-intro.jsx renders shotA/shotB)
// Timeline (7.0 s, 1920×1080, 30 fps):
//   V1  shotA 0–2.4 s → TV-power transition → shotB from its 0.4 s mark (its pre-roll is the transition handle)
//   V2  grade over everything (Lumetri contrast/saturation, vignette, film grain)
//   V3  light leak through the cut, camera shake on the MOVIE and IDIOTS slams
//   A1–A4  projector flicker, mascot pop, riser into the cut, whoosh, two impacts, glint, tagline, music bed
import path from 'node:path';
import {connect, ticks} from './client.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..');
const dir = path.join(root, 'projects', 'intro');
const sfx = (name) => path.join(root, 'public', 'sfx', `${name}.wav`);

const CUT = 2.4;          // shotA → shotB
const PREROLL = 0.4;      // shotB starts this far in (handle for the transition)
const LENGTH = 7.0;
const atB = (t) => CUT + (t - PREROLL); // shotB comp time → sequence time
const MOVIE_HIT = atB(0.6), IDIOTS_HIT = atB(0.8), GLINT = atB(1.7), TAGLINE = atB(1.9), THUMBS = atB(1.15);

const fc = await connect();
try {
  await fc.run('file.newProject', {name: 'Movie Idiots intro'});
  await fc.run('file.newSequence', {name: 'intro', width: 1920, height: 1080, fps: 30, video: 3, audio: 4});
  const files = [path.join(dir, 'shotA.mov'), path.join(dir, 'shotB.mov'), ...['flicker', 'pop', 'riser', 'whoosh', 'stamp', 'coin', 'paper', 'bed'].map(sfx)];
  const {items} = await fc.tool('media_import', {paths: files});
  const [shotA, shotB, flicker, pop, riser, whoosh, stamp, coin, paper, bed] = items;

  // V1: the two shots, butted at the cut.
  await fc.place({item: shotA, track: 'V1', seconds: 0, duration: ticks(CUT), audio: false});
  const b = await fc.place({item: shotB, track: 'V1', seconds: CUT, sourceIn: ticks(PREROLL), duration: ticks(LENGTH - CUT), audio: false});
  await fc.run('sequence.applyVideoTransition', {clip: b, effect: 'tv_power', frames: 10, edge: 'in'});

  // V2: grade.
  const grade = await fc.adjustment(LENGTH, 'V2', 0);
  await fc.fx(grade, 'lumetri', {contrast: 15, saturation: 112, vibrance: 12});
  await fc.fx(grade, 'vignette', {amount: -0.3, feather: 55});
  await fc.fx(grade, 'noise', {amount: 3});

  // V3: light leak through the cut, shake on both slams.
  const leak = await fc.adjustment(0.5, 'V3', CUT - 0.2);
  await fc.fx(leak, 'light_leaks', {intensity: 40, seed: 7, speed: 2});
  const shake = await fc.adjustment(0.5, 'V3', MOVIE_HIT - 0.03);
  await fc.fx(shake, 'camera_shake', {amount: 22, frequency: 14});
  const shake2 = await fc.adjustment(0.45, 'V3', IDIOTS_HIT - 0.03);
  await fc.fx(shake2, 'camera_shake', {amount: 34, frequency: 16});

  // Audio: [item, track, start, gain dB].
  const cues = [
    [bed, 'A1', 0, -18],
    [flicker, 'A2', 0, -10],
    [pop, 'A3', 0.5, -8],
    [riser, 'A4', CUT - 1.35, -6],
    [whoosh, 'A2', CUT - 0.18, -4],
    [stamp, 'A3', MOVIE_HIT - 0.02, -5],
    [stamp, 'A4', IDIOTS_HIT - 0.02, -1],
    [pop, 'A2', THUMBS, -10],
    [coin, 'A3', GLINT, -10],
    [paper, 'A4', TAGLINE, -10],
  ];
  for (const [item, track, start, db] of cues) {
    const clip = await fc.place({item, track, seconds: start, video: false, audio: true, ...(item === bed ? {duration: ticks(LENGTH)} : {})});
    await fc.run('clip.audioGain', {clips: [clip], mode: 'set', db});
    if (item === bed) await fc.run('sequence.applyAudioTransition', {clip, effect: 'constant_power', frames: 15, edge: 'out'});
  }

  await fc.run('file.saveAs', {path: path.join(dir, 'intro.fcproj')});
  const out = path.join(dir, 'movie-idiots-intro.mp4');
  const exp = await fc.run('file.exportMedia', {path: out, format: 'h264', width: 1920, height: 1080, fps: 30, crf: 16, loudnessLufs: -14, wait: true});
  console.log(JSON.stringify({export: out, seconds: exp?.result?.seconds ?? exp?.seconds, frames: exp?.result?.frames}));
} finally {
  fc.close();
}
