// Collage Shorts CLI.
//   tsx scripts/short.ts list
//   tsx scripts/short.ts timing SLUG              measure recordings in public/shorts/SLUG/voice/
//   tsx scripts/short.ts voice SLUG --edge          opt-in online Hindi voice (sends the script to Microsoft)
//   tsx scripts/short.ts voice SLUG --elevenlabs    paid ElevenLabs voice (needs ELEVENLABS_API_KEY)
//   tsx scripts/short.ts speed SLUG [--percent 8]  upload copy: video.mp4 → video-fast8.mp4 (pitch kept)
//   tsx scripts/short.ts say SLUG                 print the Devanagari text each voice will speak
//   tsx scripts/short.ts lint SLUG                check script structure (fun-facts) and pronunciation gaps
//   tsx scripts/short.ts still SLUG --url IMG --source PAGE --credit WHO --label "Film (Year): what it shows" [--name file]
//                                                 download a film still into public/shorts/SLUG/stills + stills.json ledger
//   tsx scripts/short.ts stills SLUG [--every 0.5] contact sheets for review
//   tsx scripts/short.ts render SLUG [--draft] [--no-music] [--no-captions]
//   tsx scripts/short.ts package SLUG             youtube.txt (title, description, tags) for upload
//   tsx scripts/short.ts youtube-login            one-time browser sign-in (secrets/youtube-token.json)
//   tsx scripts/short.ts status [--count 30]      live state, schedule and counts of recent uploads (refreshes uploads.csv)
//   tsx scripts/short.ts upload SLUG [--at "2026-10-23 12:00"] [--file video-fast15.mp4] [--confirm]
//                                                 upload one Short, scheduled in India time; dry run without --confirm
//   tsx scripts/short.ts schedule SLUG… --start 2026-10-23 [--slots 12:00,19:00] [--confirm]
//                                                 fill daily slots in order; same-topic Shorts kept 2+ days apart
import path from 'node:path';
import {existsSync, readFileSync} from 'node:fs';
import {mkdir, readFile, readdir, rm, writeFile} from 'node:fs/promises';
import {bundle} from '@remotion/bundler';
import {renderFrames, renderMedia, selectComposition} from '@remotion/renderer';
import {ROOT, PUBLIC} from '../src/paths';
import {ffmpeg, probe, run} from '../src/process';
import {elevenLabsModel, speakElevenLabs} from '../src/elevenlabs';
import {displayCues, toSpoken, type SpokenWord} from '../src/speech';
import {fetchImage} from '../src/web-assets';
import {lintFunFacts, lintPlan, type LedgerEntry} from '../src/collage/formats/fun-facts';
import {describeDelivery, edgeProsody, elevenDelivery, resolveDelivery, tagsSupported, windowsRate} from '../src/delivery';
import {SHORTS, type ShortEntry} from '../src/collage/shorts';
import {channel, login, recentUploads, upload} from '../src/youtube';
import {parseCsv, stringifyCsv} from '../src/csv';
import {buildTiming, displayText, type MeasuredLine, type Timing, type Word} from '../src/collage/timeline';

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
// TTS services leave ~1 s of silence after a mid-line "।" or "...", which plays as a dead gap in a
// 30 s Short. Silences longer than MAX_PAUSE are cut down to KEEP_PAUSE and the cues shifted to match.
const MAX_PAUSE = 0.5;
const KEEP_PAUSE = 0.3;

async function tightenPauses(file: string, cues: SpokenWord[]): Promise<SpokenWord[]> {
  const gaps = cues.slice(1).map((w, i) => [cues[i].end, w.start]).filter(([a, b]) => b - a > MAX_PAUSE);
  if (!gaps.length) return cues;
  const pad = KEEP_PAUSE / 2;
  const keep: [number, number | undefined][] = [];
  let from = 0;
  for (const [a, b] of gaps) {
    keep.push([from, a + pad]);
    from = b - pad;
  }
  keep.push([from, undefined]);
  const parts = keep.map(([s, e], i) => `[0:a]atrim=start=${s.toFixed(3)}${e === undefined ? '' : `:end=${e.toFixed(3)}`},asetpts=PTS-STARTPTS[p${i}]`);
  const graph = `${parts.join(';')};${keep.map((_, i) => `[p${i}]`).join('')}concat=n=${keep.length}:v=0:a=1[out]`;
  const tmp = file.replace(/(\.\w+)$/, '.tight$1');
  await run(ffmpeg(), ['-v', 'error', '-y', '-i', file, '-filter_complex', graph, '-map', '[out]', tmp]);
  await rm(file);
  await writeFile(file, await readFile(tmp));
  await rm(tmp);
  const shift = (t: number) => t - gaps.filter(([a, b]) => t >= b).reduce((n, [a, b]) => n + (b - a - KEEP_PAUSE), 0);
  return cues.map((w) => ({...w, start: shift(w.start), end: shift(w.end)}));
}

async function saveCues(line: {id: string; text: string; say?: string}, cues: SpokenWord[]) {
  await writeFile(path.join(voiceDir(), `${line.id}.spoken.json`), JSON.stringify(cues, null, 2));
  await writeFile(path.join(voiceDir(), `${line.id}.words.json`), JSON.stringify(displayCues(displayText(line.text), spoken(line), cues), null, 2));
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

/**
 * Generation glitches visible in word timings (Oct 2026: a bare "हाँ।" left a 1 s hole and a lone "अ"
 * came out as noise). Not a substitute for listening, but it catches the usual ones.
 */
function voiceProblems(words: Word[]): string[] {
  const out: string[] = [];
  if (words[0] && words[0].start > 0.4) out.push(`voice starts ${words[0].start.toFixed(2)} s into the file`);
  for (let i = 1; i < words.length; i++) {
    const gap = words[i].start - words[i - 1].end;
    if (gap > 0.6) out.push(`${gap.toFixed(2)} s silence between "${words[i - 1].text}" and "${words[i].text}"; listen for a glitch`);
  }
  if (words.length > 1 && /^(हाँ|हां|नहीं|हाँ\.|नहीं,)[.,।]?$/.test(words[0].text)) out.push(`opens on a bare "${words[0].text}"; it often reads as a stray word`);
  return out;
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
    // TTS files end with ~0.9 s of silence. With word cues the line ends just after its last word, so the
    // gap between lines is LINE_GAP plus any directed pause, and the Short ends on the last word.
    const fileDuration = Number(meta.format.duration);
    const spokenEnd = words?.length ? words[words.length - 1].end + 0.15 : fileDuration;
    measured[line.id] = {duration: Math.min(fileDuration, spokenEnd), audio: `shorts/${slug}/voice/${file}`, words, source: words ? 'speech-service' : 'recorded'};
    for (const problem of voiceProblems(words ?? [])) console.warn(`WARN [${line.id}] ${problem}`);
  }
  const timing = buildTiming(short.lines, measured, short.tail);
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
    await saveCues(line, await tightenPauses(path.join(voiceDir(), `${line.id}.mp3`), JSON.parse(await readFile(raw, 'utf8'))));
    await rm(config);
    await rm(raw);
    console.log(`voiced ${line.id}`);
  }
  await measure();
}

/** Spoken text with inline audio tags ("[surprised]") placed before the spoken form of each cue word. */
function withCues(line: {text: string; say?: string}, cues: {word: string; tag: string}[] = []) {
  const s = spoken(line);
  const tokens = s.text.split(' ');
  const display = line.text.split(/\s+/).filter(Boolean);
  const at = cues.map((c) => {
    const i = display.findIndex((w) => w.includes(c.word));
    if (i < 0) throw new Error(`Audio cue word "${c.word}" is not in the line`);
    return {index: s.map[i][0], tag: c.tag};
  });
  for (const {index, tag} of at.sort((a, b) => b.index - a.index)) tokens.splice(index, 0, `[${tag}]`);
  return tokens.join(' ');
}

async function elevenlabsVoice() {
  if (!flag('elevenlabs')) throw new Error('Pass --elevenlabs to confirm sending the script to ElevenLabs.');
  const short = entry();
  await mkdir(voiceDir(), {recursive: true});
  for (const [index, line] of short.lines.entries()) {
    const previous = short.lines[index - 1];
    const next = short.lines[index + 1];
    const model = elevenLabsModel();
    const delivery = resolveDelivery(line);
    const direction = elevenDelivery(delivery, model);
    const words = await speakElevenLabs({text: tagsSupported(model) ? withCues(line, delivery.cues) : spoken(line).text, output: path.join(voiceDir(), `${line.id}.mp3`), previousText: previous && spoken(previous).text, nextText: next && spoken(next).text, ...direction});
    await saveCues(line, await tightenPauses(path.join(voiceDir(), `${line.id}.mp3`), words));
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

// Each render bundles the composition into %TEMP% (~50 MB). Delete them when the command ends,
// or they pile up until the disk is full.
const bundles: string[] = [];
const cleanBundles = () => Promise.all(bundles.map((dir) => rm(dir, {recursive: true, force: true}).catch(() => {})));

async function prepare(captions = true, music = true) {
  const short = entry();
  await ensureSoundKit();
  // Re-measure every time: script edits (pauses, music cues) and new recordings both re-time the edit.
  const timing: Timing = await measure();
  const serveUrl = await bundle({entryPoint: path.join(ROOT, 'src/collage/index.tsx'), publicDir: PUBLIC, onProgress: () => {}});
  bundles.push(serveUrl);
  const inputProps = {timing, captions, music, track: short.music};
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

/** Upload copy sped up by `--percent` (default 8): video.mp4 → video-fast8.mp4 (draft.mp4 with --draft). Pitch is kept. */
async function speed() {
  const percent = Number(option('percent', '8'));
  if (!(percent > 0 && percent <= 50)) throw new Error('--percent must be between 0 and 50');
  // --from picks another render in the Short's folder, e.g. `--from video-filmcraft` (FilmCraft finishing pass).
  const base = option('from', flag('draft') ? 'draft' : 'video');
  const input = path.join(outDir(), `${base}.mp4`);
  if (!existsSync(input)) throw new Error(`${input} not found; render it first`);
  const factor = 1 + percent / 100;
  const output = path.join(outDir(), `${base}-fast${percent}.mp4`);
  await run(ffmpeg(), ['-y', '-i', input, '-filter_complex', `[0:v]setpts=PTS/${factor}[v];[0:a]atempo=${factor}[a]`, '-map', '[v]', '-map', '[a]', '-r', '30', '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-color_range', 'tv', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', output], 600000);
  const meta = await probe(output);
  console.log(`Wrote ${output} (${Number(meta.format.duration).toFixed(2)} s, ${percent}% faster)`);
}

const MUSIC_CREDIT = 'Piano: Salamander Grand Piano by Alexander Holm (CC BY 3.0). Orchestral samples: VSCO 2 Community Edition by Versilian Studios and Simon Dalzell. Additional samples: Versilian Community Sample Library (VCSL) by Versilian Studios.';

/** A description with every URL removed: "Koimoi, 2 Nov 2023: https://…" becomes "Koimoi, 2 Nov 2023". */
function withoutLinks(text: string) {
  return text
    .split('\n')
    .map((line) => line.replace(/\s*(?:[:—–-]\s*)?\(?(?:https?:\/\/|www\.)\S+\)?/g, '').replace(/\s+$/, ''))
    .filter((line, i, all) => line.trim() || (all[i - 1] ?? '').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Title, descriptions and tags for upload, checked against YouTube's limits. */
async function uploadText(s: ShortEntry = entry()) {
  if (!s.youtube) throw new Error(`Short "${s.slug}" has no youtube metadata in its script.ts`);
  const y = s.youtube;
  const tags = y.tags.join(', ');
  if (tags.length > 500) throw new Error(`Tags are ${tags.length} characters; YouTube allows 500`);
  if (y.title.length > 100) throw new Error(`Title is ${y.title.length} characters; YouTube allows 100`);
  if (/[<>]/.test(y.title + y.description)) throw new Error('YouTube rejects "<" and ">" in titles and descriptions');
  // Image credits go in the description, built from the stills ledger; they are never drawn on screen.
  const ledger = path.join(PUBLIC, 'shorts', s.slug, 'stills', 'stills.json');
  const credits = existsSync(ledger)
    ? (JSON.parse(await readFile(ledger, 'utf8')) as {label: string; credit: string; sourceUrl?: string}[]).map((r) => `${r.label} — ${r.credit}${r.sourceUrl ? ` — ${r.sourceUrl}` : ''}`)
    : [];
  let linked = credits.length ? `${y.description}\n\nImage credits:\n${credits.join('\n')}` : y.description;
  // Music beds are originals played on CC-licensed sample libraries; the piano library (CC BY 3.0) needs credit.
  if (s.music) linked += `\n\nMusic: "${s.music}" (original for Movie Idiots, music-mania). ${MUSIC_CREDIT}`;
  // The channel cannot post links in descriptions until it has YouTube's advanced features, so the
  // default description names each source and credit without its URL. The URLs stay in script.ts
  // `sources` and the stills ledger; the linked version is kept for when links unlock.
  const plain = withoutLinks(linked);
  if (Buffer.byteLength(plain) > 5000) throw new Error(`Description is ${Buffer.byteLength(plain)} bytes; YouTube allows 5000`);
  return {title: y.title, altTitles: y.altTitles ?? [], plain, linked, tags: y.tags, settings: y.settings ?? {}};
}

async function youtubePackage() {
  const t = await uploadText();
  await mkdir(outDir(), {recursive: true});
  const file = path.join(outDir(), 'youtube.txt');
  const tags = t.tags.join(', ');
  const settings = Object.entries(t.settings).map(([k, v]) => `${k}: ${v}`).join('\n');
  await writeFile(file, `TITLE\n${t.title}\n\nALTERNATIVE TITLES\n${t.altTitles.join('\n')}\n\nDESCRIPTION\n${t.plain}\n\nTAGS (${tags.length}/500 chars)\n${tags}\n\nSETTINGS\n${settings}\n\nDESCRIPTION WITH LINKS (use once the channel has advanced features)\n${t.linked}\n`);
  console.log(`Wrote ${file}`);
}

// ---- YouTube upload and scheduling (src/youtube.ts). Real uploads need --confirm. ----

const UPLOADS_CSV = path.join(ROOT, 'docs', 'uploads.csv');
// Description links stay off until the channel has advanced features; then set YOUTUBE_DESCRIPTION_LINKS=1.
const descriptionFor = (t: Awaited<ReturnType<typeof uploadText>>) => (process.env.YOUTUBE_DESCRIPTION_LINKS === '1' ? t.linked : t.plain);

/** "2026-10-23 12:00" in India time → Date. */
function istTime(value: string) {
  const m = value.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{1,2}):(\d{2})$/);
  if (!m) throw new Error(`Use "YYYY-MM-DD HH:mm" (India time), got "${value}"`);
  const when = new Date(`${m[1]}T${m[2].padStart(2, '0')}:${m[3]}:00+05:30`);
  if (when.getTime() < Date.now() + 15 * 60 * 1000) throw new Error(`${value} IST is in the past or less than 15 minutes away`);
  return when;
}
const ist = (d: Date) => d.toLocaleString('en-IN', {timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short'});

function uploadFile(s: ShortEntry) {
  const name = option('file', 'video-fast15.mp4');
  const file = path.join(ROOT, 'projects', 'shorts', s.slug, name);
  if (!existsSync(file)) throw new Error(`${file} not found; make the final first (/final-short ${s.slug})`);
  return file;
}

/** Record an upload in docs/uploads.csv (adds the row if the Short is not listed yet). */
async function logUpload(s: ShortEntry, title: string, id: string, when?: Date) {
  const rows = parseCsv(await readFile(UPLOADS_CSV, 'utf8'));
  const col = Object.fromEntries(rows[0].map((h, i) => [h, i]));
  // A Short that already has a video ID is a re-upload: give it its own row, keep the old one.
  let row = rows.find((r, i) => i > 0 && r[col.slug] === s.slug && !r[col.video_id]);
  if (!row) rows.push((row = rows[0].map(() => '')));
  const set = (key: string, value: string) => key in col && (row![col[key]] = value);
  set('slug', s.slug);
  set('title', title);
  set('format', s.format ?? '');
  set('video_id', id);
  if (when) set('uploaded', when.toLocaleDateString('en-CA', {timeZone: 'Asia/Kolkata'}));
  const note = `uploaded via API ${new Date().toISOString().slice(0, 10)}${when ? `, scheduled ${ist(when)} IST` : ', private'}`;
  set('notes', [row[col.notes], note].filter(Boolean).join('; '));
  await writeFile(UPLOADS_CSV, stringifyCsv(rows));
}

async function uploadOne(s: ShortEntry, when: Date | undefined, confirm: boolean) {
  const t = await uploadText(s);
  const file = uploadFile(s);
  const description = descriptionFor(t);
  console.log(`\n${s.slug}\n  file: ${path.relative(ROOT, file)}\n  title: ${t.title}\n  publish: ${when ? `${ist(when)} IST (scheduled)` : 'private, no schedule'}\n  description: ${Buffer.byteLength(description)} bytes, ${/https?:\/\//.test(description) ? 'with' : 'no'} links\n  tags: ${t.tags.length}`);
  if (!confirm) return;
  const res = await upload({file, title: t.title, description, tags: t.tags, publishAt: when});
  await logUpload(s, t.title, res.id, when);
  console.log(`  uploaded: https://youtu.be/${res.id} (${res.status?.privacyStatus}${res.status?.publishAt ? `, goes public ${ist(new Date(res.status.publishAt))} IST` : ''})`);
}

async function youtubeUpload() {
  const s = entry();
  const confirm = flag('confirm');
  if (confirm) console.log(`Channel: ${(await channel()).title}`);
  else console.log('Dry run: nothing is sent. Add --confirm to upload.');
  await uploadOne(s, rest.includes('--at') ? istTime(option('at', '')) : undefined, confirm);
}

/**
 * schedule SLUG… --start 2026-10-23 [--slots 12:00,19:00] [--confirm]
 * Fills the slots in order, two a day by default. Shorts that share a `topic` must be 2+ days apart.
 */
async function youtubeSchedule() {
  const slugs = [slug, ...rest.filter((a, i) => !a.startsWith('--') && !rest[i - 1]?.startsWith('--'))].filter(Boolean);
  if (!slugs.length) throw new Error('Name the Shorts to schedule, in order');
  const shorts = slugs.map((x) => SHORTS.find((s) => s.slug === x) ?? (() => { throw new Error(`Unknown short "${x}"`); })());
  const start = option('start', '');
  const slots = option('slots', '12:00,19:00').split(',');
  const times = shorts.map((_, i) => {
    const day = new Date(`${start}T00:00:00+05:30`);
    if (Number.isNaN(day.getTime())) throw new Error('Pass --start YYYY-MM-DD');
    day.setUTCDate(day.getUTCDate() + Math.floor(i / slots.length));
    return istTime(`${day.toLocaleDateString('en-CA', {timeZone: 'Asia/Kolkata'})} ${slots[i % slots.length]}`);
  });
  const clashes = shorts.flatMap((a, i) => shorts.slice(i + 1).flatMap((b, k) => (a.topic && a.topic === b.topic && Math.abs(times[i + 1 + k].getTime() - times[i].getTime()) < 2 * 86400000 ? [`${a.slug} and ${b.slug} (${a.topic})`] : [])));
  if (clashes.length) throw new Error(`Same topic less than 2 days apart: ${clashes.join('; ')}. Reorder the list.`);
  const confirm = flag('confirm');
  if (confirm) console.log(`Channel: ${(await channel()).title}`);
  else console.log('Dry run: nothing is sent. Add --confirm to upload.');
  for (const [i, s] of shorts.entries()) await uploadOne(s, times[i], confirm);
}

/** status [--count 30]: live state, schedule and counts of recent uploads; refreshes views/likes/comments in uploads.csv. */
async function youtubeStatus() {
  const videos = await recentUploads(Number(option('count', '30')));
  const rows = parseCsv(await readFile(UPLOADS_CSV, 'utf8'));
  const col = Object.fromEntries(rows[0].map((h, i) => [h, i]));
  const today = new Date().toLocaleDateString('en-CA', {timeZone: 'Asia/Kolkata'});
  for (const v of videos) {
    const state = v.publishAt && v.privacy === 'private' ? `scheduled ${ist(new Date(v.publishAt))}` : v.privacy;
    console.log(`${v.id}  ${state.padEnd(30)} ${String(v.views).padStart(6)} views ${String(v.likes).padStart(4)} likes  ${v.title}${v.rejection ? `  [rejected: ${v.rejection}]` : ''}`);
    const row = rows.find((r, i) => i > 0 && r[col.video_id] === v.id);
    if (!row || v.privacy !== 'public') continue;
    for (const [key, value] of [['views', v.views], ['likes', v.likes], ['comments', v.comments], ['views_as_of', today]] as const) if (key in col) row[col[key]] = String(value);
  }
  await writeFile(UPLOADS_CSV, stringifyCsv(rows));
  console.log(`\nUpdated views, likes and comments in ${path.relative(ROOT, UPLOADS_CSV)}`);
}

async function youtubeLogin() {
  const ch = await login();
  console.log(`Signed in. Uploads will go to: ${ch.title} (${ch.id})`);
}

/** Print issues; returns true when any is an error. */
function lint() {
  const short = entry();
  const ledgerFile = path.join(PUBLIC, 'shorts', slug, 'stills', 'stills.json');
  const ledger: LedgerEntry[] = existsSync(ledgerFile) ? JSON.parse(readFileSync(ledgerFile, 'utf8')) : [];
  const issues = short.format === 'fun-facts'
    ? [...lintFunFacts(short.lines, short.sources, short.lexicon, {honorific: short.honorific, tribute: short.tribute}), ...(short.plan ? lintPlan(short.plan, short.lines, ledger, {honorific: short.honorific, tribute: short.tribute}) : [])]
    : short.lines.flatMap((l) => spoken(l).unknown.map((w) => ({level: 'warn' as const, line: l.id, message: `Voice will guess at: ${w}`})));
  for (const i of issues) console.log(`${i.level.toUpperCase()}${i.line ? ` [${i.line}]` : ''} ${i.message}`);
  if (!issues.length) console.log('Script lint: clean');
  return issues.some((i) => i.level === 'error');
}

async function say() {
  for (const l of entry().lines) {
    const s = spoken(l);
    if (l.en) console.log(`  en: ${l.en}`);
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
    rights: option('rights', 'Copyrighted publicity still, used as transformative commentary (fair dealing for criticism/review); credited in the video description (not on screen).'),
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
  speed,
  package: youtubePackage,
  upload: youtubeUpload,
  schedule: youtubeSchedule,
  status: youtubeStatus,
  'youtube-login': youtubeLogin,
};
const fn = commands[command];
if (!fn) {
  console.error('Usage: short.ts list | say SLUG | lint SLUG | still SLUG --url … --source … --credit … --label … | timing SLUG | voice SLUG [--voice NAME] [--edge|--elevenlabs] | stills SLUG [--every s] | render SLUG [--draft] | speed SLUG [--percent 8] [--draft | --from NAME] | package SLUG | youtube-login | status [--count 30] | upload SLUG [--at "YYYY-MM-DD HH:mm"] [--confirm] | schedule SLUG… --start YYYY-MM-DD [--slots 12:00,19:00] [--confirm]');
  process.exit(1);
}
fn()
  .then(cleanBundles)
  .catch(async (e) => {
    await cleanBundles();
    const message = e instanceof Error ? e.message : String(e);
    // The OAuth app is in "Testing": Google ends the sign-in after 7 days.
    console.error(/invalid_grant/.test(message) ? 'YouTube sign-in expired (Testing apps last 7 days). Run: npm run short -- youtube-login' : message);
    process.exit(1);
  });
