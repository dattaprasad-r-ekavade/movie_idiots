import type {Scene} from '../schema';
import {framesFor} from '../schema';

export function shotFrames(scene:Scene,fps:number) {
  const count=framesFor(scene.duration,fps),weights=scene.shots.map(s=>s.seconds),sum=weights.reduce((a,b)=>a+b,0);
  if(!weights.length)return [count];
  if(count<weights.length)throw new Error(`Scene ${scene.id} has more shots than frames`);
  let cursor=0;
  return weights.map((weight,i)=>{const end=i===weights.length-1?count:i+1+Math.round(weights.slice(0,i+1).reduce((a,b)=>a+b,0)/sum*(count-weights.length));const n=end-cursor;cursor=end;return n;});
}
export function groupWordCues(words:Scene['cues']):Scene['cues'] {
  const cues:Scene['cues']=[];let group:Scene['cues']=[];
  const flush=()=>{if(group.length)cues.push({start:group[0].start,end:group[group.length-1].end,text:group.map(w=>w.text).join(' ')});group=[];};
  for(const word of words){if(group.length&&(word.start-group[group.length-1].end>.4||group.length>=5))flush();group.push(word);if(/[।.!?]$/.test(word.text))flush();}
  flush();return cues;
}
