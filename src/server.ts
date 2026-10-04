import './env';
import express from 'express';
import path from 'node:path';
import {readdir,readFile} from 'node:fs/promises';
import {z} from 'zod';
import {channel,listProjects,loadProject,projectDir,ROOT,saveProject,PUBLIC} from './paths';
import {createDemo,createPlan} from './planner';
import {doctor,exportPackage,inspect,preview,render} from './pipeline';
import {attachNarration,importAsset,narrate,trimClip} from './media';
import {enqueue,getJob} from './jobs';
import {discoverWebImages,downloadImage,searchImages} from './web-assets';

export function createApp() {
  const app=express();
  app.disable('x-powered-by');
  app.use((req,res,next)=>{
    const host=req.headers.host||'';
    if(!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host)) {res.status(403).json({error:'Localhost access only'});return;}
    const origin=req.headers.origin;
    if(origin&&origin!==`http://${host}`) {res.status(403).json({error:'Cross-origin request blocked'});return;}
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('Referrer-Policy','no-referrer');
    next();
  });
  app.use(express.json({limit:'2mb'}));
  const asyncRoute=(fn:(req:express.Request)=>Promise<unknown>)=>async(req:express.Request,res:express.Response,next:express.NextFunction)=>{try{res.json(await fn(req));}catch(e){next(e);}};
  app.get('/api/config',asyncRoute(()=>channel()));
  app.get('/api/doctor',asyncRoute(()=>doctor()));
  app.get('/api/projects',asyncRoute(()=>listProjects()));
  app.get('/api/projects/:id',asyncRoute(req=>loadProject(String(req.params.id))));
  app.get('/api/projects/:id/outputs',asyncRoute(async req=>{
    const id=String(req.params.id);await loadProject(id);const dir=path.join(projectDir(id),'exports');
    let files:string[]=[];try{files=await readdir(dir);}catch{}
    const video=files.includes('video.mp4')?'video.mp4':files.includes('draft.mp4')?'draft.mp4':null;
    let qc:unknown;try{if(video)qc=JSON.parse(await readFile(path.join(dir,video==='draft.mp4'?'draft-qc.json':'qc.json'),'utf8'));}catch{}
    return {files,video:video?{url:`/exports/${id}/${video}`,qc}:null};
  }));
  app.put('/api/projects/:id',asyncRoute(req=>{if(req.body.id!==req.params.id)throw new Error('Project ID cannot change in this editor');return saveProject(req.body);}));
  const CreateSchema=z.object({prompt:z.string().min(1).max(20000),movie:z.string().min(1).max(160),format:z.enum(['review','revisit','short']),language:z.string().max(80).optional(),minutes:z.number().min(.15).max(60),notes:z.string().max(40000).optional(),provider:z.enum(['template','anthropic','ollama'])});
  app.post('/api/projects',asyncRoute(async req=>{const opts=CreateSchema.parse(req.body);return enqueue('Plan video',()=>createPlan(opts));}));
  app.post('/api/demo',asyncRoute(()=>createDemo()));
  app.get('/api/jobs/:id',asyncRoute(async req=>getJob(String(req.params.id))));
  app.post('/api/projects/:id/:action',asyncRoute(async req=>{
    const id=String(req.params.id);await loadProject(id);
    switch(req.params.action) {
      case 'narrate': {const provider=z.enum(['windows','edge','elevenlabs']).parse(req.body.provider||'windows');return enqueue('Generate narration',()=>narrate(id,provider));}
      case 'web-images': {const a=z.object({sourceUrl:z.string().url()}).parse(req.body);return discoverWebImages(a.sourceUrl);}
      case 'image-search': {const a=z.object({query:z.string().min(2).max(200)}).parse(req.body);return searchImages(a.query);}
      case 'download-image': {const a=z.object({imageUrl:z.string().url(),sourceUrl:z.string().url(),credit:z.string().min(1),rights:z.string().min(1),label:z.string().min(1)}).parse(req.body);return downloadImage(id,a);}
      case 'preview': return enqueue('Preview storyboard',()=>preview(id));
      case 'render': {const opts=z.object({draft:z.boolean().default(false),captions:z.boolean().default(true),music:z.string().optional()}).parse(req.body);return enqueue(opts.draft?'Render draft':'Render final',progress=>render(id,opts,progress));}
      case 'export': return exportPackage(id);
      case 'inspect': return inspect(id,req.body.draft?'draft.mp4':'video.mp4');
      case 'asset': {const a=z.object({source:z.string(),type:z.enum(['image','video','audio']),credit:z.string().min(1)}).parse(req.body);return importAsset(id,a.source,a.type,a.credit);}
      case 'attach': {const a=z.object({sceneId:z.string(),asset:z.string()}).parse(req.body);return attachNarration(id,a.sceneId,a.asset);}
      case 'trim': {const a=z.object({asset:z.string(),start:z.number().min(0),duration:z.number().positive().max(180)}).parse(req.body);return enqueue('Trim clip',()=>trimClip(id,a.asset,a.start,a.duration));}
      default:throw new Error('Unknown project action');
    }
  }));
  app.get('/exports/:id/:file',(req,res,next)=>{
    try {
      if(!/^(?:[a-zA-Z0-9_-]+\.png|(?:video|draft|render)\.mp4|(?:draft-)?qc\.json|captions\.(?:srt|vtt)|script\.md|youtube\.txt|visual-prompts\.json|input-props\.json)$/.test(req.params.file)) throw new Error('Unknown export');
      res.sendFile(path.join(projectDir(req.params.id),'exports',req.params.file));
    } catch(e){next(e);}
  });
  app.use('/media',express.static(path.join(PUBLIC,'projects'),{dotfiles:'deny'}));
  app.use(express.static(path.join(ROOT,'web')));
  app.use((error:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{res.status(400).json({error:error instanceof Error?error.message:'Request failed'});});
  return app;
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.join(ROOT,'src/server.ts')) {
  const port=Number(process.env.PORT||3210);
  const server=createApp().listen(port,'127.0.0.1',(error?:Error)=>{
    if(error){console.error(`Could not start studio on port ${port}: ${error.message}. Set PORT to an available port.`);process.exitCode=1;return;}
    const addr=server.address();console.log(`Movie Idiots Studio: http://127.0.0.1:${typeof addr==='object'&&addr?addr.port:port}`);
  });
}
