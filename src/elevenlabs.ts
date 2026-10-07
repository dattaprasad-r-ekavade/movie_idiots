import './env';
import {writeFile} from 'node:fs/promises';

export type WordCue={start:number;end:number;text:string};
type Alignment={characters?:string[];character_start_times_seconds?:number[];character_end_times_seconds?:number[]};
type Voice={voice_id:string;name:string;category?:string;labels?:Record<string,string>};

let cachedVoiceId='';

export function wordsFromAlignment(alignment:Alignment):WordCue[] {
  const words:WordCue[]=[];
  let text='',start=0,end=0;
  const flush=()=>{if(text)words.push({start,end,text});text='';};
  const chars=alignment.characters||[];
  const starts=alignment.character_start_times_seconds||[];
  const ends=alignment.character_end_times_seconds||[];
  for(let i=0;i<chars.length;i++) {
    const ch=chars[i],cs=starts[i]??end,ce=ends[i]??cs;
    if(/\s/.test(ch)){flush();continue;}
    if(!text)start=cs;
    text+=ch;end=ce;
  }
  flush();
  return words;
}

function apiKey() {
  const value=process.env.ELEVENLABS_API_KEY?.trim();
  if(!value) throw new Error('Set ELEVENLABS_API_KEY in .env to use ElevenLabs narration.');
  return value;
}

async function elevenFetch(path:string,init:RequestInit={}) {
  const response=await fetch(`https://api.elevenlabs.io${path}`,{
    ...init,
    headers:{'xi-api-key':apiKey(),'content-type':'application/json','accept':'application/json'},
    signal:init.signal??AbortSignal.timeout(120000)
  });
  if(!response.ok) {
    const detail=await response.text();
    throw new Error(`ElevenLabs returned ${response.status}: ${detail.slice(0,400)}`);
  }
  return response;
}

function voiceScore(voice:Voice,wanted:string) {
  const hay=`${voice.name} ${Object.values(voice.labels||{}).join(' ')}`.toLowerCase();
  if(wanted&&(voice.name.toLowerCase()===wanted||hay.includes(wanted))) return 3;
  if(/hindi|\bhi\b|india|indian/.test(hay)) return 2;
  if(voice.category==='premade') return 1;
  return 0;
}

export async function resolveElevenLabsVoice() {
  if(cachedVoiceId) return cachedVoiceId;
  const configured=process.env.ELEVENLABS_VOICE_ID?.trim();
  if(configured) return cachedVoiceId=configured;
  const listed=await elevenFetch('/v1/voices');
  const voices=((await listed.json()) as {voices?:Voice[]}).voices||[];
  const wanted=(process.env.ELEVENLABS_VOICE_NAME||'').trim().toLowerCase();
  if(wanted) {
    const match=voices.find(voice=>voiceScore(voice,wanted)>=3);
    if(!match) throw new Error(`No ElevenLabs voice named "${process.env.ELEVENLABS_VOICE_NAME}". Available: ${voices.map(voice=>voice.name).slice(0,20).join(', ')||'none'}`);
    return cachedVoiceId=match.voice_id;
  }
  const ranked=[...voices].sort((a,b)=>voiceScore(b,'')-voiceScore(a,''))[0];
  if(!ranked) throw new Error('Set ELEVENLABS_VOICE_ID. This ElevenLabs account has no voices.');
  return cachedVoiceId=ranked.voice_id;
}

export async function speakElevenLabs(opts:{text:string;output:string;previousText?:string;nextText?:string}):Promise<WordCue[]> {
  const voiceId=await resolveElevenLabsVoice();
  const model=process.env.ELEVENLABS_MODEL_ID||'eleven_multilingual_v2';
  const body:Record<string,unknown>={
    text:opts.text,
    model_id:model,
    voice_settings:{stability:0.45,similarity_boost:0.75}
  };
  if(opts.previousText) body.previous_text=opts.previousText;
  if(opts.nextText) body.next_text=opts.nextText;
  const language=process.env.ELEVENLABS_LANGUAGE?.trim();
  if(language&&model!=='eleven_multilingual_v2') body.language_code=language;
  const response=await elevenFetch(`/v1/text-to-speech/${encodeURIComponent(voiceId)}/with-timestamps?output_format=mp3_44100_128`,{method:'POST',body:JSON.stringify(body)});
  const data=await response.json() as {audio_base64?:string;alignment?:Alignment;normalized_alignment?:Alignment};
  if(!data.audio_base64) throw new Error('ElevenLabs returned no audio.');
  await writeFile(opts.output,Buffer.from(data.audio_base64,'base64'));
  return wordsFromAlignment(data.alignment||data.normalized_alignment||{});
}
