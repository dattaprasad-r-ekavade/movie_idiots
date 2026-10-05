// Render one frame of any collage composition to PNG (transparent where the comp has no background).
//   tsx scripts/still.ts COMPOSITION_ID OUT.png [--frame N] [--scale S] [--props '{"pose":"wave"}']
import path from 'node:path';
import {existsSync} from 'node:fs';
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import {ROOT, PUBLIC} from '../src/paths';

const [id, out, ...rest] = process.argv.slice(2);
const opt = (name: string, fallback: number) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? Number(rest[i + 1]) : fallback;
};
if (!id || !out) {
  console.error('Usage: still.ts COMPOSITION_ID OUT.png [--frame N] [--scale S]');
  process.exit(1);
}
const shell = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const browserExecutable = process.env.REMOTION_BROWSER || (existsSync(shell) ? shell : null);
const serveUrl = await bundle({entryPoint: path.join(ROOT, 'src/collage/index.tsx'), publicDir: PUBLIC, onProgress: () => {}});
const propsAt = rest.indexOf('--props');
const inputProps = propsAt >= 0 ? JSON.parse(rest[propsAt + 1]) : {};
const composition = await selectComposition({serveUrl, id, inputProps, browserExecutable, logLevel: 'error'});
await renderStill({serveUrl, composition, inputProps, output: path.resolve(out), frame: opt('frame', 0), scale: opt('scale', 1), imageFormat: 'png', browserExecutable, logLevel: 'error'});
console.log(`Wrote ${path.resolve(out)} (${composition.width * opt('scale', 1)}×${composition.height * opt('scale', 1)})`);
