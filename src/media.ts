import path from 'node:path';
import {copyFile, mkdir, readFile, writeFile, stat} from 'node:fs/promises';
import {channel, loadProject, localAsset, PUBLIC, projectDir, saveProject, ROOT} from './paths';
import {ffmpeg, probe, run} from './process';
import {groupWordCues} from './video/timing';
import {speakElevenLabs} from './elevenlabs';

export async function importAsset(id:string,source:string,type:'image'|'video'|'audio',credit:string) {
  await loadProject(id);
  if(!credit.trim()) throw new Error('Add a source/credit note for the asset');
  const ext=path.extname(source).toLowerCase();
  const allowed={image:['.png','.jpg','.jpeg','.webp'],video:['.mp4','.mov','.webm'],audio:['.wav','.mp3','.m4a','.ogg']};
  if(!allowed[type].includes(ext)) throw new Error(`Unsupported ${type} format: ${ext}`);
  const info=await stat(source);
  if(!info.isFile()) throw new Error('Source must be a regular file');
  const name=`assets/${Date.now()}-${path.basename(source).replace(/[^a-zA-Z0-9._-]/g,'_')}`;
  const dest=path.join(PUBLIC,'projects',id,name);await mkdir(path.dirname(dest),{recursive:true});await copyFile(source,dest);
  const creditsFile=path.join(projectDir(id),'asset-credits.json');
  let credits:unknown[]=[];try{credits=JSON.parse(await readFile(creditsFile,'utf8'));}catch{}
  credits.push({asset:name,type,source,credit,importedAt:new Date().toISOString()});await writeFile(creditsFile,JSON.stringify(credits,null,2));
  return {asset:name,type,credit};
}
export async function trimClip(id:string,asset:string,start:number,duration:number) {
  if(start<0||duration<=0||duration>180) throw new Error('Start must be >=0 and duration 0–180 seconds');
  const input=await localAsset(id,asset);const name=`assets/clip-${Date.now()}.mp4`;
  const dest=path.join(PUBLIC,'projects',id,name);await mkdir(path.dirname(dest),{recursive:true});
  await run(ffmpeg(),['-y','-ss',String(start),'-i',input,'-t',String(duration),'-an','-vf','scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2','-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',dest]);
  return {asset:name,source:asset,start,duration};
}
export async function attachNarration(id:string,sceneId:string,asset:string) {
  const p=await loadProject(id);const scene=p.scenes.find(s=>s.id===sceneId);if(!scene) throw new Error('Unknown scene ID');
  const metadata=await probe(await localAsset(id,asset));
  if(!metadata.streams.some((s:{codec_type:string})=>s.codec_type==='audio')) throw new Error('File has no audio stream');
  scene.audio=asset;scene.cues=[];scene.duration=Math.max(2,Number(metadata.format.duration)+0.6);
  return saveProject(p);
}
export async function narrate(id:string,provider:'windows'|'elevenlabs'|'edge'='windows') {
  const p=await loadProject(id), c=await channel();
  if(provider==='windows'&&process.platform!=='win32') throw new Error('Windows narration requires Windows. Import recorded audio or use Edge or ElevenLabs.');
  if(provider==='elevenlabs'&&!process.env.ELEVENLABS_API_KEY?.trim()) throw new Error('Set ELEVENLABS_API_KEY in .env to use ElevenLabs narration.');
  for(const [index,scene] of p.scenes.entries()) {
    if(!scene.narration.trim()) continue;
    const name=`narration/${scene.id}.${provider==='windows'?'wav':'mp3'}`;
    const dest=path.join(PUBLIC,'projects',id,name);await mkdir(path.dirname(dest),{recursive:true});
    scene.cues=[];
    const text=scene.speechText||scene.narration;
    if(provider==='edge') {
      const input=path.join(projectDir(id),'tts-input.json'),timing=path.join(projectDir(id),`${scene.id}-word-timing.json`);
      await writeFile(input,JSON.stringify({text,output:dest,timing,voice:process.env.EDGE_VOICE||'hi-IN-MadhurNeural',rate:process.env.EDGE_RATE||'+8%'}));
      await run(process.env.VOICE_PYTHON||path.join(ROOT,'.venv',process.platform==='win32'?'Scripts/python.exe':'bin/python'),[path.join(ROOT,'scripts/edge_speech.py'),input],120000);
      scene.cues=groupWordCues(JSON.parse(await readFile(timing,'utf8')));
    } else if(provider==='windows') {
      const input=path.join(projectDir(id),'tts-input.json');
      await writeFile(input,JSON.stringify({text,output:dest,voice:c.voice,language:p.language}));
      await run(process.env.POWERSHELL_PATH||'pwsh.exe',['-NoProfile','-NonInteractive','-ExecutionPolicy','Bypass','-File',path.join(ROOT,'scripts/speak.ps1'),'-InputFile',input],120000);
    } else {
      const spoken=(s:typeof scene)=>s.speechText||s.narration;
      const previous=p.scenes.slice(0,index).map(spoken).filter(value=>value.trim()).at(-1);
      const next=p.scenes.slice(index+1).map(spoken).find(value=>value.trim());
      const timing=path.join(projectDir(id),`${scene.id}-word-timing.json`);
      const words=await speakElevenLabs({text,output:dest,previousText:previous,nextText:next});
      await writeFile(timing,JSON.stringify(words,null,2));
      scene.cues=groupWordCues(words);
    }
    const metadata=await probe(dest);scene.audio=name;scene.duration=Math.max(2,Number(metadata.format.duration)+0.6);
    await saveProject(p);
  }
  return p;
}
