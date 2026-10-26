// Minimal MCP client for FilmCraft's headless server (`filmcraft-cli mcp`, JSON-RPC over stdio).
//   const fc = await connect(); await fc.run('file.newProject', {name}); ...; fc.close();
import {spawn} from 'node:child_process';

export const FILMCRAFT = process.env.FILMCRAFT_CLI || 'C:\\Program Files\\FilmCraft\\filmcraft-cli.exe';
/** FilmCraft time base (same as Premiere): ticks per second. */
export const TICKS = 254016000000;
export const ticks = (seconds) => Math.round(seconds * TICKS);

export async function connect() {
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
  const tool = async (name, args) => {
    const result = await rpc('tools/call', {name, arguments: args});
    const text = (result.content ?? []).filter((c) => c.type === 'text').map((c) => c.text).join('\n');
    let data;
    try { data = JSON.parse(text); } catch { data = text; }
    if (result.isError) throw new Error(`${name} ${JSON.stringify(args).slice(0, 200)} → ${text.slice(0, 400)}`);
    return data;
  };
  const run = (id, params = {}) => tool('command_run', {id, params});
  await rpc('initialize', {protocolVersion: '2025-06-18', capabilities: {}, clientInfo: {name: 'movie-idiots', version: '1'}});
  server.stdin.write(JSON.stringify({jsonrpc: '2.0', method: 'notifications/initialized'}) + '\n');

  /** Place an item and return the new clip id. */
  const place = async (params) => {
    const r = await run('timeline.place', params);
    const clip = Array.isArray(r?.clips) ? r.clips[0] : r?.clip ?? r?.id;
    if (clip === undefined) throw new Error(`timeline.place returned no clip: ${JSON.stringify(r).slice(0, 300)}`);
    return typeof clip === 'object' ? clip.id ?? clip.clip : clip;
  };
  /** A fresh adjustment layer of `seconds`, placed on `track` at `at`; returns the clip id. */
  const adjustment = async (seconds, track, at) => {
    const {item} = await run('file.newAdjustmentLayer', {seconds});
    return place({item, track, seconds: Math.max(0, at), video: true, audio: false});
  };
  /** Apply an effect to a clip and set its parameters (FilmCraft resolves `effect` by its id on the clip). */
  const fx = async (clip, effect, params = {}) => {
    await run('effects.apply', {clips: [clip], effect});
    for (const [param, value] of Object.entries(params)) await run('effects.setParam', {clip, effect, param, value});
  };
  return {rpc, tool, run, place, adjustment, fx, close: () => server.kill()};
}
