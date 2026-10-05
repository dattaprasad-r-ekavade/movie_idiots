// Collage Shorts CLI.
//   tsx scripts/short.ts list
//   tsx scripts/short.ts timing SLUG              measure recordings in public/shorts/SLUG/voice/
//   tsx scripts/short.ts voice SLUG --edge        opt-in online Hindi voice (sends the script to Microsoft)
//   tsx scripts/short.ts stills SLUG [--every 0.5] contact sheets for review
//   tsx scripts/short.ts render SLUG [--draft] [--no-music] [--no-captions]
import path from 'node:path';
import {existsSync} from 'node:fs';
import {mkdir, readFile, readdir, rm, writeFile} from 'node:fs/promises';
import {bundle} from '@remotion/bundler';
import {renderFrames, renderMedia, selectComposition} from '@remotion/renderer';
import {ROOT, PUBLIC} from '../src/paths';
import {ffmpeg, probe, run} from '../src/process';
import {SHORTS} from '../src/collage/shorts';
import {buildTiming, type MeasuredLine, type Timing, type Word} from '../src/collage/timeline';

const [command, slug, ...rest] = process.argv.slice(2);
const flag = (name: string) => rest.includes(`--${name}`);
const option = (name: string, fallback: string) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 && rest[i + 1] ? rest[i + 1] : fallback;
};

function entry() {
  const short = SHORTS.find((s) => s.slug === slug);
  if (!short) throw new Error(`Unknown short "${slug}". Known: ${SHORTS.map((s) => s.slug).join(', ')}`);
  return short;
}
const voiceDir = () => path.join(PUBLIC, 'shorts', slug, 'voice');
const outDir = () => path.join(ROOT, 'projects', 'shorts', slug);
const timingFile = () => path.join(PUBLIC, 'shorts', slug, 'timing.json');

function browserExecutable() {
  if (process.env.REMOTION_BROWSER) return process.env.REMOTION_BROWSER;
  const shell = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
  return existsSync(shell) ? shell : null;
}

async function ensureSoundKit() {
  if (existsSync(path.join(PUBLIC, 'sfx', 'bed.wav'))) return;
  const python = process.env.VOICE_PYTHON || path.join(ROOT, '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
  console.log('Generating sound kit…');
  await run(python, [path.join(ROOT, 'scripts/sfx_kit.py'), path.join(PUBLIC, 'sfx'), '90'], 300000);
}

/** Measure one recording per script line. Missing lines keep estimated timing. */
async function measure(): Promise<Timing> {
  const short = entry();
  const measured: Record<string, MeasuredLine> = {};
  const files = existsSync(voiceDir()) ? await readdir(voiceDir()) : [];
  for (const line of short.lines) {
    const file = files.find((f) => new RegExp(`^${line.id}\\.(wav|mp3|m4a|ogg)$`, 'i').test(f));
    if (!file) continue;
    const meta = await probe(path.join(voiceDir(), file));
    const wordsFile = path.join(voiceDir(), `${line.id}.words.json`);
    const words: Word[] | undefined = existsSync(wordsFile) ? JSON.parse(await readFile(wordsFile, 'utf8')) : undefined;
    measured[line.id] = {duration: Number(meta.format.duration), audio: `shorts/${slug}/voice/${file}`, words, source: words ? 'speech-service' : 'recorded'};
  }
  const timing = buildTiming(short.lines, measured);
  await mkdir(path.dirname(timingFile()), {recursive: true});
  await writeFile(timingFile(), JSON.stringify(timing, null, 2));
  const counts = timing.lines.reduce<Record<string, number>>((n, l) => ({...n, [l.source]: (n[l.source] || 0) + 1}), {});
  console.log(`Timing: ${timing.total.toFixed(2)} s, lines by source ${JSON.stringify(counts)}`);
  return timing;
}

async function edgeVoice() {
  if (!flag('edge')) throw new Error('Pass --edge to confirm sending the script to Microsoft’s online speech service.');
  const short = entry();
  await mkdir(voiceDir(), {recursive: true});
  const python = process.env.VOICE_PYTHON || path.join(ROOT, '.venv', 'bin/python');
  for (const line of short.lines) {
    const config = path.join(voiceDir(), `${line.id}.edge.json`);
    await writeFile(config, JSON.stringify({text: line.text, output: path.join(voiceDir(), `${line.id}.mp3`), timing: path.join(voiceDir(), `${line.id}.words.json`), voice: option('voice', 'hi-IN-MadhurNeural'), rate: option('rate', '+6%')}));
    await run(python, [path.join(ROOT, 'scripts/edge_speech.py'), config], 120000);
    await rm(config);
    console.log(`voiced ${line.id}`);
  }
  await measure();
}

async function prepare(captions = true, music = true) {
  const short = entry();
  await ensureSoundKit();
  const timing: Timing = existsSync(timingFile()) ? JSON.parse(await readFile(timingFile(), 'utf8')) : buildTiming(short.lines);
  const serveUrl = await bundle({entryPoint: path.join(ROOT, 'src/collage/index.tsx'), publicDir: PUBLIC, onProgress: () => {}});
  const inputProps = {timing, captions, music};
  const browser = browserExecutable();
  const composition = await selectComposition({serveUrl, id: slug, inputProps, browserExecutable: browser, logLevel: 'error'});
  return {short, timing, serveUrl, inputProps, composition, browser};
}

async function stills() {
  const {serveUrl, inputProps, composition, browser} = await prepare();
  const every = Math.max(1, Math.round(Number(option('every', '0.5')) * composition.fps));
  const dir = path.join(outDir(), 'stills');
  await rm(dir, {recursive: true, force: true});
  await mkdir(dir, {recursive: true});
  await renderFrames({serveUrl, composition, inputProps, outputDir: dir, imageFormat: 'jpeg', jpegQuality: 80, scale: 0.4, everyNthFrame: every, browserExecutable: browser, concurrency: 4, logLevel: 'error', onStart: () => {}, onFrameUpdate: () => {}});
  const frames = (await readdir(dir)).filter((f) => f.endsWith('.jpeg')).sort();
  // 6×2 sheets: 12 samples per sheet, sample i is at i*every frames.
  const perSheet = 12;
  for (let s = 0; s * perSheet < frames.length; s++) {
    const list = frames.slice(s * perSheet, (s + 1) * perSheet);
    const listFile = path.join(dir, `sheet-${s}.txt`);
    await writeFile(listFile, list.map((f) => `file '${path.join(dir, f)}'`).join('\n'));
    await run(ffmpeg(), ['-y', '-f', 'concat', '-safe', '0', '-i', listFile, '-vf', `tile=6x2:padding=6:color=black`, '-frames:v', '1', path.join(outDir(), `sheet-${String(s).padStart(2, '0')}.jpg`)]);
  }
  console.log(`${frames.length} stills every ${every} frames → ${outDir()}/sheet-*.jpg`);
}

async function render() {
  const draft = flag('draft');
  const {short, timing, serveUrl, inputProps, composition, browser} = await prepare(!flag('no-captions'), !flag('no-music'));
  await mkdir(outDir(), {recursive: true});
  const raw = path.join(outDir(), 'render.mp4');
  let last = -1;
  await renderMedia({
    serveUrl, composition, inputProps, codec: 'h264', audioCodec: 'aac', outputLocation: raw, crf: draft ? 26 : 17, scale: draft ? 0.5 : 1,
    concurrency: Number(process.env.RENDER_CONCURRENCY || 4), browserExecutable: browser, overwrite: true, logLevel: 'error', enforceAudioTrack: true,
    onProgress: ({progress}) => {
      const pct = Math.floor(progress * 10) * 10;
      if (pct !== last) console.log(`render ${pct}%`), (last = pct);
    },
  });
  const final = path.join(outDir(), draft ? 'draft.mp4' : 'video.mp4');
  // Re-encode to limited-range yuv420p (Remotion's JPEG frames come out full-range) and cap peaks.
  await run(ffmpeg(), ['-y', '-i', raw, '-vf', 'scale=in_range=auto:out_range=tv,format=yuv420p', '-c:v', 'libx264', '-crf', draft ? '24' : '17', '-preset', 'medium', '-color_range', 'tv', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.84:level=false', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', final], 600000);
  await rm(raw);
  const sources = timing.lines.reduce<Record<string, number>>((n, l) => ({...n, [l.source]: (n[l.source] || 0) + 1}), {});
  await writeFile(path.join(outDir(), 'script.md'), `# ${short.title}\n\n${short.lines.map((l) => `- **${l.id}** ${l.text}`).join('\n')}\n\n## Sources\n\n${short.sources.map((s) => `- ${s.url}\n  ${s.note}`).join('\n')}\n\nTiming sources: ${JSON.stringify(sources)}\n`);
  const meta = await probe(final);
  console.log(`Wrote ${final} (${Number(meta.format.duration).toFixed(2)} s, timing ${JSON.stringify(sources)})`);
}

const commands: Record<string, () => Promise<unknown>> = {
  list: async () => console.log(SHORTS.map((s) => `${s.slug}\t${s.title}`).join('\n')),
  timing: measure,
  voice: edgeVoice,
  stills,
  render,
};
const fn = commands[command];
if (!fn) {
  console.error('Usage: short.ts list | timing SLUG | voice SLUG --edge | stills SLUG [--every s] | render SLUG [--draft]');
  process.exit(1);
}
fn().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
