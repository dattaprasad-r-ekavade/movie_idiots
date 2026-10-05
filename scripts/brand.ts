// Regenerate the channel's mascot images: transparent 2400×4000 PNGs in public/brand/ + docs/mascot-sheet.jpg.
//   npm run brand
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const variants: [string, string, string][] = [
  ['movie-idiot-wave', 'wave', 'happy'],
  ['movie-idiot-idle', 'idle', 'neutral'],
  ['movie-idiot-point', 'point', 'skeptic'],
  ['movie-idiot-shrug', 'shrug', 'sad'],
  ['movie-idiot-facepalm', 'facepalm', 'angry'],
  ['movie-idiot-thumbs-up', 'thumbsUp', 'happy'],
];
mkdirSync('public/brand', {recursive: true});
const still = (...args: string[]) => execFileSync('npx', ['tsx', 'scripts/still.ts', ...args], {stdio: 'inherit'});
for (const [name, pose, expression] of variants) still('mascot-still', `public/brand/${name}.png`, '--scale', '4', '--props', JSON.stringify({pose, expression}));
still('mascot-sheet', 'docs/mascot-sheet.png');
// The sheet is for reading docs; JPEG keeps the repo light.
execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', 'docs/mascot-sheet.png', '-q:v', '3', 'docs/mascot-sheet.jpg']);
execFileSync('rm', ['docs/mascot-sheet.png']);
