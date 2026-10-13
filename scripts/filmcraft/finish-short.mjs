// FilmCraft finishing pass for a rendered Short, driven through FilmCraft's MCP server (headless).
//   node scripts/filmcraft/finish-short.mjs <slug> [--sting fx/sting.mov --sting-line payoff --sting-word 50] [--shake f2:पहले,f3:कमाई]
// Reads projects/shorts/<slug>/video.mp4 and public/shorts/<slug>/timing.json, builds a 1080×1920 sequence:
//   V1 the Remotion render (+A1 its audio) · V2 an EffectCraft sting on a spoken word
//   V3 a full-length grade (Lumetri contrast/saturation, vignette, fine grain)
//   V4 light-leak flashes on every beat cut · V5 camera shake on number reveals, an RGB-split hit on the hook
// and exports projects/shorts/<slug>/video-filmcraft.mp4 (H.264, -14 LUFS) plus the .fcproj.
import {spawn} from 'node:child_process';
import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..');
const FILMCRAFT = process.env.FILMCRAFT_CLI || 'C:\\Program Files\\FilmCraft\\filmcraft-cli.exe';
const args = process.argv.slice(2);
const slug = args[0];
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
if (!slug) throw new Error('Usage: finish-short.mjs <slug> [--sting fx/sting.mov --sting-line payoff --sting-word 50] [--shake line:word,...]');

const out = path.join(root, 'projects', 'shorts', slug);
const video = path.join(out, 'video.mp4');
const timing = JSON.parse(readFileSync(path.join(root, 'public', 'shorts', slug, 'timing.json'), 'utf8'));
if (!existsSync(video)) throw new Error(`${video} not found; run npm run short -- render ${slug}`);
const line = (id) => timing.lines.find((l) => l.id === id) ?? (() => { throw new Error(`no line ${id}`); })();
const wordAt = (id, word) => {
  const l = line(id);
  const w = l.words.find((x) => x.text.includes(word));
  if (!w) throw new Error(`word "${word}" not in ${id}`);
  return w.start;
};

// ---- minimal MCP client over stdio ----
const server = spawn(FILMCRAFT, ['mcp'], {stdio: ['pipe', 'pipe', 'inherit']});
let buffer = '';
const waiting = new Map();
let nextId = 1;
server.stdout.on('data', (chunk) => {
  buffer += chunk;
  let i;
  while ((i = buffer.indexOf('\n')) >= 0) {
    const text = buffer.slice(0, i).trim();
    buffer = buffer.slice(i + 1);
    if (!text) continue;
    const msg = JSON.parse(text);
    if (msg.id && waiting.has(msg.id)) {
      waiting.get(msg.id)(msg);
      waiting.delete(msg.id);
    }
  }
});
const rpc = (method, params) => new Promise((resolve, reject) => {
  const id = nextId++;
  waiting.set(id, (msg) => (msg.error ? reject(new Error(`${method}: ${JSON.stringify(msg.error)}`)) : resolve(msg.result)));
  server.stdin.write(JSON.stringify({jsonrpc: '2.0', id, method, params}) + '\n');
});
const tool = async (name, argsIn) => {
  const result = await rpc('tools/call', {name, arguments: argsIn});
  const text = (result.content ?? []).filter((c) => c.type === 'text').map((c) => c.text).join('\n');
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  if (result.isError) throw new Error(`${name} ${JSON.stringify(argsIn).slice(0, 200)} → ${text.slice(0, 400)}`);
  return data;
};
const run = (id, params = {}) => tool('command_run', {id, params});

// Find the first id-like value under any of these keys, anywhere in a result.
function findId(obj, keys) {
  if (!obj || typeof obj !== 'object') return undefined;
  for (const k of keys) if (obj[k] !== undefined && (typeof obj[k] === 'string' || typeof obj[k] === 'number')) return obj[k];
  for (const v of Object.values(obj)) {
    const found = Array.isArray(v) ? v.map((x) => findId(x, keys)).find((x) => x !== undefined) : findId(v, keys);
    if (found !== undefined) return found;
  }
  return undefined;
}

async function main() {
  await rpc('initialize', {protocolVersion: '2025-06-18', capabilities: {}, clientInfo: {name: 'finish-short', version: '1'}});
  server.stdin.write(JSON.stringify({jsonrpc: '2.0', method: 'notifications/initialized'}) + '\n');

  await run('file.newProject', {name: `${slug} finish`});
  await run('file.newSequence', {name: slug, width: 1080, height: 1920, fps: 30, video: 5, audio: 2});

  const stingPath = opt('sting') ? path.join(out, opt('sting')) : null;
  const imported = await tool('media_import', {paths: [video, ...(stingPath ? [stingPath] : [])]});
  const ids = imported.items ?? findId(imported, ['items']);
  if (!Array.isArray(ids) || !ids.length) throw new Error(`media_import returned no items: ${JSON.stringify(imported).slice(0, 300)}`);
  const [videoId, stingId] = ids;

  const placed = async (params) => {
    const r = await run('timeline.place', params);
    const clip = Array.isArray(r?.clips) ? r.clips[0] : findId(r, ['clip', 'clipId', 'id']);
    if (clip === undefined) throw new Error(`timeline.place returned no clip: ${JSON.stringify(r).slice(0, 300)}`);
    return typeof clip === 'object' ? clip.id ?? clip.clip : clip;
  };
  // V1 + A1: the Remotion render.
  await placed({item: videoId, track: 'V1', audioTrack: 'A1', seconds: 0});
  const total = timing.total ?? timing.lines.at(-1).start + timing.lines.at(-1).duration + 1;

  const adjustment = async (seconds, track, at) => {
    const {item} = await run('file.newAdjustmentLayer', {seconds});
    return placed({item, track, seconds: Math.max(0, at), video: true, audio: false});
  };
  const fx = async (clip, effect, params) => {
    await run('effects.apply', {clips: [clip], effect});
    const seq = await tool('sequence_inspect', {});
    const c = JSON.stringify(seq);
    for (const [param, value] of Object.entries(params)) {
      await run('effects.setParam', {clip, effect: effectIndex(seq, clip, effect), param, value});
    }
    return c.length;
  };
  // Index of the last effect with this id on the clip (motion and opacity come first).
  function effectIndex(seq, clipId, effect) {
    let found;
    (function walk(n) { if (!n || typeof n !== 'object') return; if ((n.id === clipId || n.clip === clipId) && Array.isArray(n.effects)) found = n.effects; for (const v of Object.values(n)) if (typeof v === 'object') walk(v); })(seq);
    if (!found) return effect;
    const idx = found.map((e, i) => [e, i]).filter(([e]) => (e.id || e.effect || e.name || '').toString().toLowerCase().replace(/\s+/g, '_') === effect).map(([, i]) => i).at(-1);
    return idx ?? effect;
  }

  // V3: grade across the whole Short.
  const grade = await adjustment(total, 'V3', 0);
  await fx(grade, 'lumetri', {contrast: 12, saturation: 108, vibrance: 10});
  await fx(grade, 'vignette', {amount: -0.25, feather: 60});
  await fx(grade, 'noise', {amount: 4});

  // V4: a light-leak flash on every beat cut (skip the hook start and the loop).
  const cuts = timing.lines.filter((l, i) => i > 0 && l.id !== 'loop').map((l) => l.start - (l.pause ?? 0) - 0.12);
  for (const [i, t] of cuts.entries()) {
    // A quick warm flash, not a wash: the picture must stay readable through the cut.
    const leak = await adjustment(0.4, 'V4', t);
    await fx(leak, 'light_leaks', {intensity: 30, seed: i + 3, speed: 2});
  }

  // V5: RGB-split hit on the hook's first words, camera shake on number reveals.
  const hit = await adjustment(0.3, 'V5', 0.05);
  await fx(hit, 'rgb_split', {amount: 9});
  for (const spec of (opt('shake', '') || '').split(',').filter(Boolean)) {
    const [id, word] = spec.split(':');
    const shake = await adjustment(0.45, 'V5', wordAt(id, word) - 0.05);
    await fx(shake, 'camera_shake', {amount: 30, frequency: 12});
  }

  // V2: EffectCraft sting on its word.
  if (stingPath) {
    const at = wordAt(opt('sting-line', 'payoff'), opt('sting-word', '50')) - 0.08;
    await placed({item: stingId, track: 'V2', seconds: at, audio: false});
  }

  await run('file.saveAs', {path: path.join(out, `${slug}.fcproj`)});
  const exportPath = path.join(out, 'video-filmcraft.mp4');
  const exp = await run('file.exportMedia', {path: exportPath, format: 'h264', width: 1080, height: 1920, fps: 30, crf: 17, loudnessLufs: -14, wait: true});
  console.log(JSON.stringify({export: exportPath, cuts: cuts.map((t) => +t.toFixed(2)), result: exp}).slice(0, 600));
}

main()
  .then(() => { server.kill(); process.exit(0); })
  .catch((e) => { console.error(e.message); server.kill(); process.exit(1); });
