import path from 'node:path';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {loadProject,projectDir,PUBLIC,ROOT,saveProject} from './paths';
import {run} from './process';

export async function createSoundDesign(id:string) {
  const project=await loadProject(id),folder=path.join(PUBLIC,'projects',id,'sound');
  await mkdir(folder,{recursive:true});
  await run(process.env.VOICE_PYTHON||path.join(ROOT,'.venv',process.platform==='win32'?'Scripts/python.exe':'bin/python'),[path.join(ROOT,'scripts/sound_design.py'),folder],120000);
  project.soundDesign={bed:'sound/bed.wav',whoosh:'sound/whoosh.wav',hit:'sound/hit.wav'};
  const file=path.join(projectDir(id),'asset-credits.json');let credits:any[]=[];try{credits=JSON.parse(await readFile(file,'utf8'));}catch{}
  for(const asset of Object.values(project.soundDesign)){credits=credits.filter(c=>c.asset!==asset);credits.push({asset,type:'audio',credit:'Original locally synthesized music/effect; Movie Idiots Studio',rights:'Original synthesis; no third-party music or audio samples',importedAt:new Date().toISOString()});}
  await writeFile(file,JSON.stringify(credits,null,2));await saveProject(project);
  return project.soundDesign;
}
