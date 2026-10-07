import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {mkdir,rm,writeFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import {ProjectSchema,sceneFrames} from '../src/schema';
import {loadProject,saveProject,projectDir,within,localAsset,PUBLIC,ROOT} from '../src/paths';
import {parsePlan} from '../src/planner';
import {subtitles} from '../src/pipeline';
import {createApp} from '../src/server';
import {enqueue,getJob} from '../src/jobs';
import {publicUrl} from '../src/web-assets';
import {shotFrames,groupWordCues} from '../src/video/timing';
import {wordsFromAlignment} from '../src/elevenlabs';

const id=`test-${randomUUID().slice(0,8)}`;
const input={id,title:'Test film essay',movie:'Original demo',format:'review',scenes:[{id:'s01',kind:'hook',title:'Hello',narration:'एक फिल्म एक कहानी कुछ सवाल और एक जवाब',duration:2.019},{id:'s02',kind:'analysis',title:'The next idea',narration:'One idea deserves another careful look',duration:2.019}]};
const p=ProjectSchema.parse(input);
after(async()=>{for(const base of [path.join(ROOT,'projects'),path.join(PUBLIC,'projects')]){const dir=path.join(base,id);assert.equal(path.dirname(dir),base);await rm(dir,{recursive:true,force:true});}});

test('a Hindi manifest survives save/load with defaults and unique scene IDs',async()=>{
  const saved=await saveProject(p);assert.deepEqual(await loadProject(id),saved);assert.equal(saved.scenes[0].spoiler,false);
});
test('rejects path traversal, duplicate IDs, missing scenes and impossible ratings',()=>{
  assert.throws(()=>projectDir('../outside'));assert.throws(()=>within(projectDir(id),'../secret'));
  assert.throws(()=>ProjectSchema.parse({...input,scenes:[]}));
  assert.throws(()=>ProjectSchema.parse({...input,scenes:[input.scenes[0],input.scenes[0]]}));
  assert.throws(()=>ProjectSchema.parse({...input,scenes:[{...input.scenes[0],rating:12}]}));
});
test('editing narration clears a stale recording but preserves a newly attached recording',async()=>{
  const original=await saveProject({...p,scenes:p.scenes.map((s,i)=>i===0?{...s,audio:'narration/old.wav'}:s)});
  const revised=await saveProject({...original,scenes:original.scenes.map((s,i)=>i===0?{...s,narration:'नई कहानी'}:s)});
  assert.equal(revised.scenes[0].audio,undefined);
  const recorded=await saveProject({...revised,scenes:revised.scenes.map((s,i)=>i===0?{...s,narration:'नई रिकॉर्डिंग',audio:'assets/new.wav'}:s)});
  assert.equal(recorded.scenes[0].audio,'assets/new.wav');
});
test('render frames and exported captions agree at fractional scene boundaries',()=>{
  const frames=sceneFrames(p,30);assert.deepEqual(frames,[61,61]);
  const srt=subtitles(p,30);assert.match(srt,/00:00:02,033 -->/);assert.match(srt,/एक फिल्म/);
  assert.ok(subtitles(p,30,true).startsWith('WEBVTT\n\n'));assert.ok(!srt.includes('NaN'));
});
test('model output can be fenced JSON; malformed plans fail validation',()=>{
  assert.equal(parsePlan('```json\n'+JSON.stringify(input)+'\n```').id,id);assert.throws(()=>parsePlan('{"scenes":[]}'));
});

test('shot boundaries preserve the measured audio timeline and never create empty shots',()=>{
  const scene=ProjectSchema.parse({...input,scenes:[{...input.scenes[0],duration:2,shots:Array.from({length:60},(_,i)=>({seconds:i===0?15:.5}))}]}).scenes[0];
  const lengths=shotFrames(scene,30);assert.equal(lengths.reduce((a,b)=>a+b,0),60);assert.ok(lengths.every(n=>n===1));
  const longer={...scene,duration:20.67};assert.equal(shotFrames(longer,30).reduce((a,b)=>a+b,0),620);
});

test('ElevenLabs character alignment groups into caption words',()=>{
  const words=wordsFromAlignment({
    characters:['य','े',' ','फ','ि','ल','्','म',' ','ह','ै','।'],
    character_start_times_seconds:[0,0.08,0.16,0.18,0.26,0.34,0.4,0.48,0.55,0.58,0.7,0.82],
    character_end_times_seconds:[0.08,0.16,0.18,0.26,0.34,0.4,0.48,0.55,0.58,0.7,0.82,0.95]
  });
  assert.deepEqual(words,[{start:0,end:0.16,text:'ये'},{start:0.18,end:0.55,text:'फिल्म'},{start:0.58,end:0.95,text:'है।'}]);
  assert.equal(groupWordCues(words).length,1);
});

test('speech word boundaries survive grouping and subtitle export, including leading silence',()=>{
  const cues=groupWordCues([{start:1.2,end:1.5,text:'ये'},{start:1.6,end:1.9,text:'फिल्म'},{start:2,end:2.4,text:'है।'},{start:3.2,end:3.7,text:'लेकिन'}]);
  assert.equal(cues.length,2);assert.deepEqual(cues[0],{start:1.2,end:2.4,text:'ये फिल्म है।'});
  const actual=ProjectSchema.parse({...input,scenes:[{...input.scenes[0],duration:5,cues}]});
  assert.match(subtitles(actual,30),/00:00:01,200 --> 00:00:02,400/);
  assert.throws(()=>ProjectSchema.parse({...input,scenes:[{...input.scenes[0],cues:[{start:0,end:9,text:'too long'}]}]}));
});

test('web procurement rejects local/private URLs and embedded credentials',()=>{
  for(const url of ['file:///etc/passwd','http://localhost/a','http://127.0.0.1/a','https://10.0.0.2/a','http://192.168.1.1/a','http://[::1]/a','https://user:password@example.com/a'])assert.throws(()=>publicUrl(url));
  assert.equal(publicUrl('https://image.tmdb.org/t/p/w1280/example.jpg').hostname,'image.tmdb.org');
});
test('assets must exist and resolve inside their project',async()=>{
  await mkdir(path.join(PUBLIC,'projects',id,'assets'),{recursive:true});await writeFile(path.join(PUBLIC,'projects',id,'assets','test.txt'),'test');
  assert.ok((await localAsset(id,'assets/test.txt')).endsWith('test.txt'));
  await assert.rejects(()=>localAsset(id,'../../package.json'));await assert.rejects(()=>localAsset(id,'assets/missing.png'));
});
test('jobs are serialized, report progress, and preserve useful failure messages',async()=>{
  const order:string[]=[];
  const one=enqueue('one',async progress=>{order.push('one');progress(.5);return 42;});
  const two=enqueue('two',async()=>{order.push('two');throw new Error('expected failure');});
  while(['queued','running'].includes(getJob(two.id).status))await new Promise(r=>setTimeout(r,10));
  assert.deepEqual(order,['one','two']);assert.equal(getJob(one.id).result,42);assert.equal(getJob(two.id).error,'expected failure');
});
test('HTTP serves the studio and rejects foreign origins and project ID rewrites',async()=>{
  await saveProject(p);const server=createApp().listen(0,'127.0.0.1');await new Promise<void>(resolve=>server.once('listening',resolve));
  const address=server.address();assert.ok(address&&typeof address!=='string');const base=`http://127.0.0.1:${address.port}`;
  try {
    const page=await fetch(base);assert.equal(page.status,200);assert.match(await page.text(),/Movie Idiots/);
    const remote=await fetch(base+'/api/projects',{headers:{origin:'https://example.com'}});assert.equal(remote.status,403);
    const update=await fetch(base+`/api/projects/${id}`,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({...p,id:'other'})});assert.equal(update.status,400);
    const stored=await fetch(base+`/api/projects/${id}`);assert.equal((await stored.json()).id,id);
    const asset=await fetch(base+`/api/projects/${id}/asset`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({source:'unused',type:'image',credit:''})});assert.equal(asset.status,400);
  } finally {await new Promise<void>((resolve,reject)=>server.close(e=>e?reject(e):resolve()));}
});
test('real MCP stdio client can list tools, read brand, write a Hindi storyboard and report invalid calls',async()=>{
  const client=new Client({name:'workflow-test',version:'1.0.0'});
  const transport=new StdioClientTransport({command:process.execPath,args:[path.join(ROOT,'node_modules/tsx/dist/cli.mjs'),path.join(ROOT,'src/mcp.ts')],stderr:'pipe'});
  try {
    await client.connect(transport);const listed=await client.listTools();assert.ok(listed.tools.some(t=>t.name==='render_project'));assert.ok(listed.tools.some(t=>t.name==='planning_brief'));
    assert.ok(listed.tools.some(t=>t.name==='download_image'));assert.ok(listed.tools.some(t=>t.name==='search_images'));assert.ok(listed.tools.some(t=>t.name==='discover_web_images'));
    const brand=await client.callTool({name:'channel_profile',arguments:{}});assert.ok(JSON.stringify(brand).includes('Hindi/Hinglish'));
    const saved=await client.callTool({name:'write_project',arguments:{project:p}});assert.ok(!saved.isError);
    const bad=await client.callTool({name:'write_project',arguments:{project:{id:'../invalid'}}});assert.equal(bad.isError,true);
    const resource=await client.readResource({uri:'movieidiots://channel'});assert.ok(resource.contents.length);
  } finally {await client.close();}
});
