import {spawn} from 'node:child_process';
export async function run(command: string, args: string[], timeout = 600000): Promise<string> {
  return new Promise((resolve,reject)=>{
    const child=spawn(command,args,{shell:false,windowsHide:true});
    let stdout='',stderr='';
    const timer=setTimeout(()=>{child.kill();reject(new Error(`${command} timed out`));},timeout);
    child.stdout.on('data',d=>{stdout=(stdout+d).slice(-100000);});
    child.stderr.on('data',d=>{stderr=(stderr+d).slice(-100000);});
    child.on('error',err=>{clearTimeout(timer);reject(err);});
    child.on('close',code=>{clearTimeout(timer);code===0?resolve(stdout):reject(new Error(`${command} exited ${code}: ${stderr.slice(-5000)}`));});
  });
}
export const ffmpeg = () => process.env.FFMPEG_PATH || 'ffmpeg';
export const ffprobe = () => process.env.FFPROBE_PATH || 'ffprobe';
export async function probe(file: string) {
  return JSON.parse(await run(ffprobe(),['-v','error','-show_format','-show_streams','-of','json',file],30000));
}
