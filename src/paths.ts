import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {mkdir, readFile, writeFile, readdir, realpath} from 'node:fs/promises';
import {ProjectSchema, type Channel, type Project} from './schema';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const PROJECTS = path.join(ROOT, 'projects');
export const PUBLIC = path.join(ROOT, 'public');
export function projectDir(id: string) {
  if(!/^[a-z0-9][a-z0-9-]{0,79}$/.test(id)) throw new Error('Invalid project ID');
  return path.join(PROJECTS, id);
}
export function within(base: string, relative: string) {
  const dest = path.resolve(base, relative);
  const rel = path.relative(path.resolve(base), dest);
  if(!rel || rel.startsWith('..') || path.isAbsolute(rel)) throw new Error('Path must name a file inside the project');
  return dest;
}
export async function localAsset(id: string, relative: string) {
  const base = await realpath(path.join(PUBLIC, 'projects', id));
  const target = await realpath(within(base, relative));
  within(base, path.relative(base, target));
  return target;
}
export const channel = async (): Promise<Channel> => JSON.parse(await readFile(path.join(ROOT,'config/channel.json'),'utf8'));
export async function loadProject(id: string): Promise<Project> {
  const p=ProjectSchema.parse(JSON.parse(await readFile(path.join(projectDir(id),'project.json'),'utf8')));
  if(p.id!==id) throw new Error('Manifest ID does not match directory');
  return p;
}
export async function saveProject(input: unknown) {
  const p=ProjectSchema.parse(input);
  // A changed script must not silently keep playing the old generated recording.
  let previous:Project|undefined;try{previous=await loadProject(p.id);}catch{}
  if(previous)for(const scene of p.scenes){const old=previous.scenes.find(s=>s.id===scene.id);if(old&&(old.narration!==scene.narration||old.speechText!==scene.speechText)&&old.audio===scene.audio){delete scene.audio;scene.cues=[];}}
  await mkdir(projectDir(p.id), {recursive:true});
  await mkdir(path.join(PUBLIC,'projects',p.id), {recursive:true});
  const file=path.join(projectDir(p.id),'project.json');
  await writeFile(file,JSON.stringify(p,null,2)+'\n');
  return p;
}
export async function listProjects() {
  await mkdir(PROJECTS,{recursive:true});
  const dirs=await readdir(PROJECTS,{withFileTypes:true});
  const list=[];
  for(const d of dirs.filter(d=>d.isDirectory())) {
    try {const p=await loadProject(d.name); list.push({id:p.id,title:p.title,movie:p.movie,format:p.format,seconds:p.scenes.reduce((n,s)=>n+s.duration,0)});} catch { /* Ignore incomplete directories. */ }
  }
  return list;
}
