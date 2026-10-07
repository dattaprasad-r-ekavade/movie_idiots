import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {ROOT} from '../src/paths';

// A session bridge for agents whose tool list cannot hot-load newly configured MCP servers.
// Script writing remains in the host Codex/Claude chat; all production actions use MCP.
const client=new Client({name:'codex-video-production',version:'1.0.0'});
const transport=new StdioClientTransport({command:process.execPath,args:[path.join(ROOT,'node_modules/tsx/dist/cli.mjs'),path.join(ROOT,'src/mcp.ts')],stderr:'pipe'});
async function call(name:string,args:Record<string,unknown>={}) {
  const result=await client.callTool({name,arguments:args});
  const text=result.content.filter(c=>c.type==='text').map(c=>c.text).join('');
  if(result.isError)throw new Error(text);
  return JSON.parse(text);
}
async function job(name:string,args:Record<string,unknown>) {
  const initial=await call(name,args);let last=-1,lastTime=0;
  while(true) {
    const current=await call('job_status',{jobId:initial.id});
    const percent=Math.floor(current.progress*100);
    if(percent!==last&&Date.now()-lastTime>10000||current.status==='complete'||current.status==='failed') {
      console.log(`${current.label}: ${current.status} ${percent}%`);last=percent;lastTime=Date.now();
    }
    if(current.status==='failed')throw new Error(current.error);
    if(current.status==='complete')return current.result;
    await new Promise(r=>setTimeout(r,1500));
  }
}
try {
  await client.connect(transport);
  const tools=await client.listTools();console.log(`Connected to Movie Idiots MCP: ${tools.tools.length} tools`);
  if(process.argv.includes('--check')) {
    console.log(JSON.stringify({channel:await call('channel_profile'),projects:await call('list_projects')},null,2));
  } else if(process.argv[2]==='--sound-design') {
    console.log(JSON.stringify(await call('create_sound_design',{id:process.argv[3]}),null,2));
  } else if(process.argv[2]==='--discover') {
    console.log(JSON.stringify(await call('discover_web_images',{sourceUrl:process.argv[3]}),null,2));
  } else if(process.argv[2]==='--search-images') {
    console.log(JSON.stringify(await call('search_images',{query:process.argv[3]}),null,2));
  } else if(process.argv[2]==='--preview-only') {
    const id=process.argv[3];if(!id)throw new Error('Supply a project ID after --preview-only');
    const preview=await job('preview_project',{id});console.log(JSON.stringify({preview},null,2));
  } else if(process.argv[2]==='--render-only') {
    const id=process.argv[3];if(!id)throw new Error('Supply a project ID after --render-only');
    const final=await job('render_project',{id,draft:false,captions:true});console.log(JSON.stringify({final},null,2));
  } else {
    const manifest=process.argv[2];if(!manifest)throw new Error('Usage: tsx scripts/produce.ts manifest.json [--edge|--elevenlabs] [--sound] [--draft-only] or --check');
    const p=JSON.parse(await readFile(path.resolve(manifest),'utf8'));
    await call('channel_profile');
    await call('planning_brief',{prompt:p.prompt,movie:p.movie,format:p.format,language:p.language,minutes:p.scenes.reduce((n:number,s:{duration:number})=>n+s.duration,0)/60,notes:p.sources.map((s:{url:string;note:string})=>`${s.url}: ${s.note}`).join('\n')});
    await call('write_project',{project:p});console.log(`Saved production: ${p.id}`);
    const assetFlag=process.argv.indexOf('--assets');
    if(assetFlag>=0) {
      const requests=JSON.parse(await readFile(path.resolve(process.argv[assetFlag+1]),'utf8'));
      const imported:Record<string,string>={};
      for(const request of requests) {
        const {key,...opts}=request;
        const asset=await call('download_image',{id:p.id,...opts});imported['@'+key]=asset.asset;
        console.log(`Web image: ${key} ${asset.width}x${asset.height} → ${asset.asset}`);
      }
      for(const scene of p.scenes){if(imported[scene.asset])scene.asset=imported[scene.asset];for(const shot of scene.shots||[])for(const key of ['asset','secondary'])if(imported[shot[key]])shot[key]=imported[shot[key]];}
      await call('write_project',{project:p});
    }
    if(process.argv.includes('--procure-only')){console.log('Image procurement complete; inspect assets before narrating/rendering.');await client.close();process.exit(0);}
    if(process.argv.includes('--sound'))await call('create_sound_design',{id:p.id});
    const eleven=process.argv.includes('--elevenlabs'),edge=process.argv.includes('--edge');
    if(eleven&&edge)throw new Error('Choose one voice flag: --edge or --elevenlabs');
    await job('narrate_project',{id:p.id,provider:eleven?'elevenlabs':edge?'edge':'windows'});
    const preview=await job('preview_project',{id:p.id});console.log(JSON.stringify({preview}));
    const draft=await job('render_project',{id:p.id,draft:true,captions:true});console.log(JSON.stringify({draft},null,2));
    if(!process.argv.includes('--draft-only')) {
      const final=await job('render_project',{id:p.id,draft:false,captions:true});console.log(JSON.stringify({final},null,2));
    }
  }
} catch(e) {console.error(e instanceof Error?e.message:String(e));process.exitCode=1;}
finally {await client.close();}
