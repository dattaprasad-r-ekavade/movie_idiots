import './env';
import {readFile} from 'node:fs/promises';
import {doctor,exportPackage,inspect,preview,render} from './pipeline';
import {createDemo,createPlan} from './planner';
import {narrate} from './media';
import {listProjects,saveProject} from './paths';
import type {Project} from './schema';
const [command,id,...rest]=process.argv.slice(2);
try {
  let result:unknown;
  switch(command) {
    case 'doctor':result=await doctor();break;
    case 'list':result=await listProjects();break;
    case 'plan':result=await createPlan({movie:id,prompt:rest.join(' ')||`Create an original Hindi/Hinglish review of ${id}`,format:'review'});break;
    case 'write':result=await saveProject(JSON.parse(await readFile(id,'utf8')));break;
    case 'narrate':result=await narrate(id,rest.includes('elevenlabs')||rest.includes('--elevenlabs')?'elevenlabs':rest.includes('edge')||rest.includes('--edge')?'edge':'windows');break;
    case 'preview':result=await preview(id);break;
    case 'render':result=await render(id,{draft:rest.includes('--draft'),captions:!rest.includes('--no-captions')},n=>process.stderr.write(`\rRendering ${Math.round(n*100)}% `));break;
    case 'export':result=await exportPackage(id);break;
    case 'inspect':result=await inspect(id,rest.includes('--draft')?'draft.mp4':'video.mp4');break;
    case 'demo':{
      const p=await createDemo();
      await narrate(p.id);await preview(p.id);result=await render(p.id,{draft:[id,...rest].includes('--draft')},n=>process.stderr.write(`\rDemo render ${Math.round(n*100)}% `));break;
    }
    default:console.log('Commands: doctor | list | plan "Movie" "Direction" | write manifest.json | narrate ID [windows|edge|elevenlabs] | preview ID | render ID [--draft] [--no-captions] | export ID | inspect ID [--draft] | demo');process.exit(0);
  }
  console.log('\n'+JSON.stringify(result,null,2));
} catch(e) {console.error(e instanceof Error?e.message:String(e));process.exitCode=1;}
