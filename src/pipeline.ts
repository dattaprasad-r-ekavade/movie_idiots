import path from 'node:path';
import {mkdir, readFile, writeFile, stat} from 'node:fs/promises';
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import {channel, loadProject, localAsset, projectDir, PUBLIC, ROOT} from './paths';
import {ffmpeg, ffprobe, probe, run} from './process';
import {framesFor, sceneFrames, type Project} from './schema';
import {captionChunks} from './video/FilmEssay';
import {shotFrames} from './video/timing';

async function composition(id:string,captions=true) {
  const project=await loadProject(id),c=await channel();
  for(const asset of Object.values(project.soundDesign||{}))if(asset)await localAsset(id,asset);
  // Every referenced asset must resolve to a file within this project's asset folder.
  for(const s of project.scenes) {
    if(s.asset)await localAsset(id,s.asset);
    for(const shot of s.shots)for(const asset of [shot.asset,shot.secondary])if(asset)await localAsset(id,asset);
    if(s.audio){const meta=await probe(await localAsset(id,s.audio));if(!meta.streams.some((t:{codec_type:string})=>t.codec_type==='audio'))throw new Error(`Scene ${s.id}: narration asset has no audio track`);if(Number(meta.format.duration)>framesFor(s.duration,c.fps)/c.fps+.05)throw new Error(`Scene ${s.id}: narration is longer than the scene. Measure narration or extend the duration.`);}
  }
  // Re-bundle so narration/assets added after an earlier preview are included.
  const serveUrl=await bundle({entryPoint:path.join(ROOT,'src/video/index.tsx'),publicDir:PUBLIC,onProgress:()=>{}});
  const inputProps={project,channel:c,captions};
  const config=await selectComposition({serveUrl,id:'FilmEssay',inputProps,logLevel:'error'});
  return {project,c,serveUrl,inputProps,config};
}
export async function doctor() {
  const checks:Record<string,unknown>={node:process.version,root:ROOT};
  for(const [name,command] of [['ffmpeg',ffmpeg()],['ffprobe',ffprobe()]]) {
    try{checks[name]=(await run(command,['-version'],15000)).split('\n')[0];}catch(e){checks[name]={error:String(e)};}
  }
  checks.providers={anthropic:!!process.env.ANTHROPIC_API_KEY,elevenlabs:!!process.env.ELEVENLABS_API_KEY?.trim(),windowsSpeech:process.platform==='win32'};
  if(process.platform==='win32') try{checks.voices=JSON.parse(await run(process.env.POWERSHELL_PATH||'pwsh.exe',['-NoProfile','-NonInteractive','-Command',"Add-Type -AssemblyName System.Speech; $speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer; @($speaker.GetInstalledVoices() | ForEach-Object { @{name=$_.VoiceInfo.Name; culture=$_.VoiceInfo.Culture.Name; enabled=$_.Enabled} }) | ConvertTo-Json -Compress; $speaker.Dispose()"],20000));}catch(e){checks.voices={error:String(e)};}
  return checks;
}
function time(ms:number,separator=',') {
  const whole=Math.max(0,Math.round(ms));const h=Math.floor(whole/3600000),m=Math.floor(whole/60000)%60,s=Math.floor(whole/1000)%60,rest=whole%1000;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}${separator}${String(rest).padStart(3,'0')}`;
}
export function subtitles(p:Project,fps:number,vtt=false) {
  let offset=0,n=1;const lines:string[]=[];
  for(const scene of p.scenes) {
    const chunks=captionChunks(scene),duration=framesFor(scene.duration,fps)/fps;
    const speech=Math.max(.1,duration-.6);
    const cues=scene.cues.length?scene.cues:chunks.map((text,i)=>({text,start:speech*i/chunks.length,end:speech*(i+1)/chunks.length}));
    cues.forEach(cue=>{const start=(offset+cue.start)*1000,end=(offset+Math.min(cue.end,duration))*1000;lines.push(`${vtt?'':`${n++}\n`}${time(start,vtt?'.':',')} --> ${time(end,vtt?'.':',')}\n${cue.text}\n`);});
    offset+=duration;
  }
  return `${vtt?'WEBVTT\n\n':''}${lines.join('\n')}`;
}
export async function exportPackage(id:string) {
  const p=await loadProject(id),c=await channel();const out=path.join(projectDir(id),'exports');await mkdir(out,{recursive:true});
  let cursor=0;const chapters=p.scenes.map(s=>{const t=Math.floor(cursor),line=`${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')} ${s.title}${s.spoiler?' (spoilers)':''}`;cursor+=framesFor(s.duration,c.fps)/c.fps;return line;});
  const sources=p.sources.map(s=>`${s.url}\n${s.note}`).join('\n\n');
  let assetCredits='';try{const credits=JSON.parse(await readFile(path.join(projectDir(id),'asset-credits.json'),'utf8')) as {asset:string;credit:string;sourceUrl?:string;rights?:string;label?:string}[];assetCredits=credits.map(x=>`${x.label||x.asset}: ${x.credit}${x.sourceUrl?`\n${x.sourceUrl}`:''}${x.rights?`\nRights: ${x.rights}`:''}`).join('\n\n');}catch{}
  await writeFile(path.join(out,'captions.srt'),subtitles(p,c.fps));await writeFile(path.join(out,'captions.vtt'),subtitles(p,c.fps,true));
  await writeFile(path.join(out,'script.md'),`# ${p.title}\n\n${p.scenes.map(s=>`## ${s.title}\n\n${s.narration}\n\nVisual: ${s.visualPrompt}`).join('\n\n')}\n`);
  await writeFile(path.join(out,'youtube.txt'),`${p.title}\n\n${p.description}\n\n${c.url}\n\n${chapters.join('\n')}\n\nSources\n${sources||'No source links supplied.'}\n${assetCredits?`\nAsset credits\n${assetCredits}\n`:''}\nTags: ${p.tags.join(', ')}\n\n${p.scenes.every(s=>!s.narration||s.cues.length)?'Captions use speech-service word boundaries.':'Some captions use estimated timing.'} Review against the audio. YouTube requires at least 3 chapters, each at least 10 seconds; merge short scenes when needed.\n`);
  await writeFile(path.join(out,'visual-prompts.json'),JSON.stringify(p.scenes.map(s=>({sceneId:s.id,title:s.title,prompt:s.visualPrompt})),null,2));
  await writeFile(path.join(out,'input-props.json'),JSON.stringify({project:p,channel:c,captions:true},null,2));
  return {directory:out,files:['script.md','captions.srt','captions.vtt','youtube.txt','visual-prompts.json','input-props.json']};
}
export async function preview(id:string) {
  const {project,serveUrl,inputProps,config}=await composition(id);
  const out=path.join(projectDir(id),'exports');await mkdir(out,{recursive:true});
  let from=0;const urls=[],shots=[];
  for(const scene of project.scenes) {
    await renderStill({serveUrl,composition:config,inputProps,frame:from+Math.min(framesFor(scene.duration,config.fps)-1,Math.round(config.fps*1.3)),output:path.join(out,`${scene.id}.png`),scale:.5,logLevel:'error'});
    urls.push(`/exports/${id}/${scene.id}.png`);from+=framesFor(scene.duration,config.fps);
    if(project.style==='cinematic'&&scene.shots.length){let cursor=from-framesFor(scene.duration,config.fps);const lengths=shotFrames(scene,config.fps);for(let i=0;i<lengths.length;i++){const file=`${scene.id}-shot-${String(i+1).padStart(2,'0')}.png`;await renderStill({serveUrl,composition:config,inputProps,frame:cursor+Math.min(lengths[i]-1,Math.round(config.fps*.9)),output:path.join(out,file),scale:.5,logLevel:'error'});shots.push(`/exports/${id}/${file}`);cursor+=lengths[i];}}
  }
  const thumbnailProps={...inputProps,captions:false};
  // selectComposition resolves props; override those too for a caption-free thumbnail.
  await renderStill({serveUrl,composition:{...config,props:thumbnailProps},inputProps:thumbnailProps,frame:Math.round(config.fps*1.3),output:path.join(out,'thumbnail.png'),imageFormat:'png',logLevel:'error'});
  return {frames:urls,shots,thumbnail:`/exports/${id}/thumbnail.png`};
}
export async function render(id:string,options:{draft?:boolean;captions?:boolean;music?:string}={},progress:(n:number)=>void=()=>{}) {
  const {project,c,serveUrl,inputProps,config}=await composition(id,options.captions!==false);
  const musicAsset=options.music||project.soundDesign?.bed;
  const out=path.join(projectDir(id),'exports');await mkdir(out,{recursive:true});
  const raw=path.join(out,'render.mp4');progress(.05);
  await renderMedia({serveUrl,composition:config,inputProps,codec:'h264',audioCodec:'aac',outputLocation:raw,crf:options.draft?27:18,scale:options.draft?.5:1,concurrency:2,overwrite:true,logLevel:'error',enforceAudioTrack:true,onProgress:p=>progress(.05+p.progress*.8)});
  const final=path.join(out,options.draft?'draft.mp4':'video.mp4');
  const duration=sceneFrames(project,c.fps).reduce((a,b)=>a+b,0)/c.fps;
  const args=['-y','-i',raw];
  if(musicAsset) {
    const music=await localAsset(id,musicAsset);
    args.push('-stream_loop','-1','-i',music,'-filter_complex','[0:a]asplit=2[voice][control];[1:a]volume=0.12[bed];[bed][control]sidechaincompress=threshold=0.02:ratio=8:attack=20:release=250[ducked];[voice][ducked]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11[a]','-map','0:v:0','-map','[a]');
  } else args.push('-map','0:v:0','-map','0:a:0','-af','loudnorm=I=-16:TP=-1.5:LRA=11');
  args.push('-t',String(duration),'-vf','scale=in_range=auto:out_range=tv,format=yuv420p','-c:v','libx264','-crf',options.draft?'27':'18','-preset','medium','-pix_fmt','yuv420p','-color_range','tv','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart',final);
  await run(ffmpeg(),args,Math.max(600000,duration*10000));progress(.94);
  await exportPackage(id);const qc=await inspect(id,options.draft?'draft.mp4':'video.mp4');progress(1);
  if(!qc.passed) throw new Error(`Render saved but technical QC failed: ${qc.errors.join('; ')}`);
  return {file:final,url:`/exports/${id}/${path.basename(final)}`,qc};
}
export async function inspect(id:string,filename='video.mp4') {
  if(!['video.mp4','draft.mp4'].includes(filename)) throw new Error('Unsupported render filename');
  const p=await loadProject(id),c=await channel(),file=path.join(projectDir(id),'exports',filename),meta=await probe(file);
  const v=meta.streams.find((s:{codec_type:string})=>s.codec_type==='video');const a=meta.streams.find((s:{codec_type:string})=>s.codec_type==='audio');
  const expected=sceneFrames(p,c.fps).reduce((a,b)=>a+b,0)/c.fps;
  const errors:string[]=[],warnings:string[]=[];
  if(!v||v.codec_name!=='h264'||v.pix_fmt!=='yuv420p') errors.push('Expected H.264 video in yuv420p');
  if(Math.abs(Number(meta.format.duration)-expected)>.2) errors.push('Rendered duration differs from storyboard');
  if(a?.codec_name!=='aac') errors.push('Expected AAC audio');
  const size=filename==='draft.mp4'?.5:1;const expectedWidth=(p.format==='short'?1080:1920)*size,expectedHeight=(p.format==='short'?1920:1080)*size;
  if(v?.width!==expectedWidth||v?.height!==expectedHeight) errors.push('Resolution differs from export preset');
  const missing=p.scenes.filter(s=>s.narration&&!s.audio).map(s=>s.id);
  if(missing.length) warnings.push(`Narration audio missing: ${missing.join(', ')} (silent segments)`);
  if(!p.sources.length) warnings.push('No factual source links attached. Verify movie facts before publishing.');
  if(p.scenes.some(s=>s.narration&&!s.cues.length))warnings.push('Some captions use estimated timing; preview them with the narration.');
  const report={passed:errors.length===0,errors,warnings,duration:Number(meta.format.duration),width:v?.width,height:v?.height,videoCodec:v?.codec_name,audioCodec:a?.codec_name,bytes:(await stat(file)).size,expectedDuration:expected};
  await writeFile(path.join(projectDir(id),'exports',`${filename==='draft.mp4'?'draft-':''}qc.json`),JSON.stringify(report,null,2));
  return report;
}
