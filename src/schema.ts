import {z} from 'zod';

export const ShotSchema=z.object({
  layout:z.enum(['full','split','collage','evidence','kinetic','waveform']).default('full'),
  asset:z.string().optional(),secondary:z.string().optional(),
  seconds:z.number().min(.5).max(15).default(4),
  headline:z.string().max(100).default(''),label:z.string().max(120).default(''),
  motion:z.enum(['push','pull','pan-left','pan-right','impact']).default('push'),
  focal:z.object({x:z.number().min(0).max(100),y:z.number().min(0).max(100)}).default({x:50,y:50}),
  transition:z.enum(['cut','wipe','flash']).default('cut')
});
export type Shot=z.infer<typeof ShotSchema>;

export const SceneSchema = z.object({
  id: z.string().regex(/^[a-zA-Z0-9_-]+$/).max(80),
  kind: z.enum(['hook', 'title', 'chapter', 'analysis', 'quote', 'rating', 'outro']),
  title: z.string().min(1).max(100),
  subtitle: z.string().max(240).default(''),
  narration: z.string().max(6000).default(''),
  speechText:z.string().max(6000).optional(),
  cues:z.array(z.object({start:z.number().min(0),end:z.number().positive(),text:z.string().max(240)}).refine(c=>c.end>c.start,'Cue end must follow start')).max(2000).default([]),
  shots:z.array(ShotSchema).max(60).default([]),
  duration: z.number().min(2).max(180).default(8),
  bullets: z.array(z.string().max(110)).max(4).default([]),
  visualPrompt: z.string().max(1500).default(''),
  visual: z.enum(['reel','evidence','chess','scales','waveform']).default('reel'),
  asset: z.string().optional(),
  audio: z.string().optional(),
  rating: z.number().min(0).max(10).optional(),
  spoiler: z.boolean().default(false)
}).superRefine((scene,ctx)=>{
  for(let i=0;i<scene.cues.length;i++){
    const cue=scene.cues[i];
    if(cue.end>scene.duration+.05)ctx.addIssue({code:'custom',message:'Caption extends past scene duration',path:['cues',i]});
    if(i&&cue.start<scene.cues[i-1].end-.01)ctx.addIssue({code:'custom',message:'Caption cues overlap or are out of order',path:['cues',i]});
  }
});

export const ProjectSchema = z.object({
  version: z.literal(1).default(1),
  id: z.string().regex(/^[a-z0-9][a-z0-9-]{0,79}$/),
  title: z.string().min(1).max(160),
  movie: z.string().min(1).max(160),
  format: z.enum(['review', 'revisit', 'short']),
  style:z.enum(['cinematic','essay']).default('cinematic'),
  soundDesign:z.object({bed:z.string().optional(),whoosh:z.string().optional(),hit:z.string().optional()}).optional(),
  language: z.string().min(1).max(80).default('English'),
  prompt: z.string().max(20000).default(''),
  sources: z.array(z.object({url: z.string().url(), note: z.string().max(4000)})).default([]),
  description: z.string().max(6000).default(''),
  tags: z.array(z.string().max(80)).max(30).default([]),
  scenes: z.array(SceneSchema).min(1).max(100)
}).superRefine((p, ctx) => {
  if(new Set(p.scenes.map(s => s.id)).size !== p.scenes.length) ctx.addIssue({code:'custom', message:'Scene IDs must be unique', path:['scenes']});
  if(p.scenes.reduce((n,s)=>n+s.duration,0)>3600) ctx.addIssue({code:'custom',message:'Maximum project length is 60 minutes',path:['scenes']});
});
export type Project = z.infer<typeof ProjectSchema>;
export type Scene = z.infer<typeof SceneSchema>;
export type Channel = {
  name: string; handle: string; url: string; tagline: string; language: string; tone: string;
  colors: {background: string; accent: string; ink: string}; fps: number; voice: string;
};
export const framesFor = (seconds: number, fps: number) => Math.round(seconds * fps);
export const sceneFrames = (p: Project, fps: number) => p.scenes.map(s => framesFor(s.duration, fps));
