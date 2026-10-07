// Collage Shorts CLI.
//   tsx scripts/short.ts list
//   tsx scripts/short.ts timing SLUG              measure recordings in public/shorts/SLUG/voice/
//   tsx scripts/short.ts voice SLUG --edge          opt-in online Hindi voice (sends the script to Microsoft)
//   tsx scripts/short.ts voice SLUG --elevenlabs    paid ElevenLabs voice (needs ELEVENLABS_API_KEY)
//   tsx scripts/short.ts say SLUG                 print the Devanagari text each voice will speak
//   tsx scripts/short.ts lint SLUG                check script structure (fun-facts) and pronunciation gaps
//   tsx scripts/short.ts still SLUG --url IMG --source PAGE --credit WHO --label "Film (Year): what it shows" [--name file]
//                                                 download a film still into public/shorts/SLUG/stills + stills.json ledger
//   tsx scripts/short.ts stills SLUG [--every 0.5] contact sheets for review
//   tsx scripts/short.ts render SLUG [--draft] [--no-music] [--no-captions]
//   tsx scripts/short.ts package SLUG             youtube.txt (title, description, tags) for upload
import path from 'node:path';
import {existsSync} from 'node:fs';
import {mkdir, readFile, readdir, rm, writeFile} from 'node:fs/promises';
import {bundle} from '@remotion/bundler';
import {renderFrames, renderMedia, selectComposition} from '@remotion/renderer';
import {ROOT, PUBLIC} from '../src/paths';
import {ffmpeg, probe, run} from '../src/process';
import {speakElevenLabs} from '../src/elevenlabs';
import {displayCues, toSpoken, type SpokenWord} from '../src/speech';
import {fetchImage} from '../src/web-assets';
import {lintFunFacts} from '../src/collage/formats/fun-facts';
import {describeDelivery, edgeProsody, elevenDelivery, resolveDelivery, windowsRate} from '../src/delivery';
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
const venvPython = () => process.env.VOICE_PYTHON || path.join(ROOT, '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
/** Devanagari text for the voice, plus the map back to display words. */
const spoken = (line: {text: string; say?: string}) => toSpoken(line.text, line.say, entry().lexicon);

/** Save speech-service cues remapped onto the display words that captions and anchors use. */
async function saveCues(line: {id: string; text: string; say?: string}, cues: SpokenWord[]) {
  await writeFile(path.join(voiceDir(), `${line.id}.spoken.json`), JSON.stringify(cues, null, 2));
  await writeFile(path.join(voiceDir(), `${line.id}.words.json`), JSON.stringify(displayCues(line.text, spoken(line), cues), null, 2));
}

function browserExecutable() {
  if (process.env.REMOTION_BROWSER) return process.env.REMOTION_BROWSER;
  const shell = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
  return existsSync(shell) ? shell : null;
}

async function ensureSoundKit() {
  if (existsSync(path.join(PUBLIC, 'sfx', 'bed.wav'))) return;
  const python = venvPython();
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
  const python = venvPython();
  for (const line of short.lines) {
    const config = path.join(voiceDir(), `${line.id}.edge.json`);
    const raw = path.join(voiceDir(), `${line.id}.edge-words.json`);
    await writeFile(config, JSON.stringify({text: spoken(line).text, output: path.join(voiceDir(), `${line.id}.mp3`), timing: raw, voice: option('voice', 'hi-IN-MadhurNeural'), ...edgeProsody(resolveDelivery(line), option('rate', '+6%'))}));
    await run(python, [path.join(ROOT, 'scripts/edge_speech.py'), config], 120000);
    await saveCues(line, JSON.parse(await readFile(raw, 'utf8')));
    await rm(config);
    await rm(raw);
    console.log(`voiced ${line.id}`);
  }
  await measure();
}

async function elevenlabsVoice() {
  if (!flag('elevenlabs')) throw new Error('Pass --elevenlabs to confirm sending the script to ElevenLabs.');
  const short = entry();
  await mkdir(voiceDir(), {recursive: true});
  for (const [index, line] of short.lines.entries()) {
    const previous = short.lines[index - 1];
    const next = short.lines[index + 1];
    const direction = elevenDelivery(resolveDelivery(line), process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2');
    const words = await speakElevenLabs({text: spoken(line).text, output: path.join(voiceDir(), `${line.id}.mp3`), previousText: previous && spoken(previous).text, nextText: next && spoken(next).text, ...direction});
    await saveCues(line, words);
    console.log(`voiced ${line.id} (ElevenLabs)`);
  }
  await measure();
}

async function windowsVoice() {
  if (process.platform !== 'win32') throw new Error('Local Windows speech is available on Windows. Record voice files in public/shorts/<slug>/voice on other systems.');
  const short = entry();
  await mkdir(voiceDir(), {recursive: true});
  const powershell = process.env.POWERSHELL_PATH || 'pwsh.exe';
  for (const line of short.lines) {
    const output = path.join(voiceDir(), `${line.id}.wav`);
    if (existsSync(output)) throw new Error(`Refusing to overwrite existing voice recording: ${output}`);
    const config = path.join(voiceDir(), `${line.id}.windows.json`);
    await writeFile(config, JSON.stringify({text: spoken(line).text, output, language: 'Hindi', voice: option('voice', '') || undefined, rate: windowsRate(resolveDelivery(line))}));
    try {
      await run(powershell, [path.join(ROOT, 'scripts/speak.ps1'), config], 120000);
    } finally {
      await rm(config, {force: true});
    }
    console.log(`voiced ${line.id} (Windows speech)`);
  }
  await measure();
}

async function prepare(captions = true, music = true) {
  const short = entry();
  await ensureSoundKit();
  // Re-measure every time: script edits (pauses, music cues) and new recordings both re-time the edit.
  const timing: Timing = await measure();
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
  if (lint() && !flag('force')) throw new Error('Script lint has errors; fix them or pass --force');
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
  await run(ffmpeg(), ['-y', '-i', raw, '-vf', 'scale=in_range=auto:out_range=tv,format=yuv420p', '-c:v', 'libx264', '-crf', draft ? '24' : '17', '-preset', 'medium', '-color_range', 'tv', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.71:level=false', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', final], 600000);
  await rm(raw);
  const sources = timing.lines.reduce<Record<string, number>>((n, l) => ({...n, [l.source]: (n[l.source] || 0) + 1}), {});
  await writeFile(path.join(outDir(), 'script.md'), `# ${short.title}\n\n${short.lines.map((l) => `- **${l.id}**${l.role ? ` _${l.role}_` : ''} ${l.text}${spoken(l).text !== l.text ? `\n  voice: ${spoken(l).text}` : ''}${l.role || l.delivery ? `\n  direction: ${describeDelivery(resolveDelivery(l))}` : ''}`).join('\n')}\n\n## Sources\n\n${short.sources.map((s) => `- ${s.url}\n  ${s.note}`).join('\n')}\n\nTiming sources: ${JSON.stringify(sources)}\n`);
  if (short.youtube) await youtubePackage();
  const meta = await probe(final);
  console.log(`Wrote ${final} (${Number(meta.format.duration).toFixed(2)} s, timing ${JSON.stringify(sources)})`);
}

async function youtubePackage() {
  const short = entry();
  if (!short.youtube) throw new Error(`Short "${slug}" has no youtube metadata in its script.ts`);
  const y = short.youtube;
  const tags = y.tags.join(', ');
  if (tags.length > 500) throw new Error(`Tags are ${tags.length} characters; YouTube allows 500`);
  if (y.title.length > 100) throw new Error(`Title is ${y.title.length} characters; YouTube allows 100`);
  await mkdir(outDir(), {recursive: true});
  const file = path.join(outDir(), 'youtube.txt');
  const settings = Object.entries(y.settings ?? {}).map(([k, v]) => `${k}: ${v}`).join('\n');
  await writeFile(file, `TITLE\n${y.title}\n\nALTERNATIVE TITLES\n${(y.altTitles ?? []).join('\n')}\n\nDESCRIPTION\n${y.description}\n\nTAGS (${tags.length}/500 chars)\n${tags}\n\nSETTINGS\n${settings}\n`);
  console.log(`Wrote ${file}`);
}

/** Print issues; returns true when any is an error. */
function lint() {
  const short = entry();
  const issues = short.format === 'fun-facts'
    ? lintFunFacts(short.lines, short.sources, short.lexicon)
    : short.lines.flatMap((l) => spoken(l).unknown.map((w) => ({level: 'warn' as const, line: l.id, message: `Voice will guess at: ${w}`})));
  for (const i of issues) console.log(`${i.level.toUpperCase()}${i.line ? ` [${i.line}]` : ''} ${i.message}`);
  if (!issues.length) console.log('Script lint: clean');
  return issues.some((i) => i.level === 'error');
}

async function say() {
  for (const l of entry().lines) {
    const s = spoken(l);
    console.log(`${l.id}\t[${describeDelivery(resolveDelivery(l))}]\t${s.text}${s.unknown.length ? `\t[guessing: ${s.unknown.join(', ')}]` : ''}`);
  }
}

/** Film stills are copyrighted frames. Use them briefly as commentary support, with source and credit recorded. */
async function still() {
  const url = option('url', ''), source = option('source', ''), credit = option('credit', ''), label = option('label', '');
  if (!url || !source || !credit || !label) throw new Error('Usage: still SLUG --url IMAGE_URL --source PAGE_URL --credit "Studio/photographer" --label "Film (Year): what it shows" [--name file]');
  entry();
  const {bytes, url: fetched, ext, hash} = await fetchImage(url);
  const dir = path.join(PUBLIC, 'shorts', slug, 'stills');
  await mkdir(dir, {recursive: true});
  const name = option('name', hash).replace(/[^\w-]/g, '-') + ext;
  await writeFile(path.join(dir, name), bytes);
  const meta = await probe(path.join(dir, name));
  const stream = meta.streams.find((s: {codec_type: string}) => s.codec_type === 'video');
  const ledger = path.join(dir, 'stills.json');
  const records: {file: string}[] = existsSync(ledger) ? JSON.parse(await readFile(ledger, 'utf8')) : [];
  const record = {
    file: `shorts/${slug}/stills/${name}`, label, credit, sourceUrl: source, imageUrl: fetched, width: stream?.width, height: stream?.height,
    rights: option('rights', 'Copyrighted film still, not licensed. Used briefly as commentary support (fair dealing for criticism/review); credited on screen and in the description.'),
    retrievedAt: new Date().toISOString(),
  };
  await writeFile(ledger, JSON.stringify([...records.filter((r) => r.file !== record.file), record], null, 2));
  console.log(JSON.stringify(record, null, 2));
}

const commands: Record<string, () => Promise<unknown>> = {
  say,
  lint: async () => {
    if (lint()) process.exitCode = 1;
  },
  still,
  list: async () => console.log(SHORTS.map((s) => `${s.slug}\t${s.title}`).join('\n')),
  timing: measure,
  voice: async () => {
    if (flag('elevenlabs') && flag('edge')) throw new Error('Choose one voice flag: --edge or --elevenlabs');
    if (flag('elevenlabs')) return elevenlabsVoice();
    if (flag('edge')) return edgeVoice();
    return windowsVoice();
  },
  stills,
  render,
  package: youtubePackage,
};
const fn = commands[command];
if (!fn) {
  console.error('Usage: short.ts list | say SLUG | lint SLUG | still SLUG --url … --source … --credit … --label … | timing SLUG | voice SLUG [--voice NAME] [--edge|--elevenlabs] | stills SLUG [--every s] | render SLUG [--draft] | package SLUG');
  process.exit(1);
}
fn().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
