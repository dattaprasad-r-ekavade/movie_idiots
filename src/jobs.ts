import {randomUUID} from 'node:crypto';
export type Job={id:string;label:string;status:'queued'|'running'|'complete'|'failed';progress:number;result?:unknown;error?:string;createdAt:string};
const jobs=new Map<string,Job>();let tail=Promise.resolve();
export function enqueue(label:string,action:(progress:(n:number)=>void)=>Promise<unknown>) {
  const job:Job={id:randomUUID(),label,status:'queued',progress:0,createdAt:new Date().toISOString()};jobs.set(job.id,job);
  tail=tail.then(async()=>{job.status='running';try {job.result=await action(n=>job.progress=n);job.progress=1;job.status='complete';}catch(e){job.status='failed';job.error=e instanceof Error?e.message:String(e);}});
  if(jobs.size>200) for(const [id,j] of jobs) if(['complete','failed'].includes(j.status)){jobs.delete(id);break;}
  return job;
}
export const getJob=(id:string)=>{const job=jobs.get(id);if(!job) throw new Error('Job not found (jobs are local to this server process)');return job;};
