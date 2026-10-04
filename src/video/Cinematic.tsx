import React from 'react';
import {AbsoluteFill,Audio,Img,OffthreadVideo,Sequence,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import type {Scene,Shot} from '../schema';
import {sceneFrames} from '../schema';
import type {VideoProps} from './FilmEssay';
import {shotFrames} from './timing';

const source=(id:string,asset:string)=>staticFile(`projects/${id}/${asset}`);
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
function Picture({id,asset,motion='push',focal={x:50,y:50},frames,style={}}:{id:string;asset?:string;motion?:Shot['motion'];focal?:Shot['focal'];frames:number;style?:React.CSSProperties}) {
  const f=useCurrentFrame(),t=Math.min(1,f/Math.max(1,frames));
  const zoom=motion==='pull'?1.3-t*.16:motion==='impact'?1.12+Math.exp(-f/7)*.2:1.12+t*.14;
  const x=motion==='pan-left'?4-t*8:motion==='pan-right'?-4+t*8:0;
  const imageStyle:React.CSSProperties={width:'100%',height:'100%',objectFit:'cover',objectPosition:`${focal.x}% ${focal.y}%`,transform:`scale(${zoom}) translateX(${x}%)`,filter:'saturate(.88) contrast(1.08)',...style};
  return <AbsoluteFill style={{overflow:'hidden',background:'#191a1e'}}>{asset?(/\.(mp4|mov|webm)$/i.test(asset)?<OffthreadVideo src={source(id,asset)} muted style={imageStyle}/>:<Img src={source(id,asset)} style={imageStyle}/>):<AbsoluteFill style={{background:'radial-gradient(ellipse at 60% 35%, #4a251d, #090b0e 70%)'}}/>}</AbsoluteFill>;
}
function Kinetic({text,small=false}:{text:string;small?:boolean}) {
  const f=useCurrentFrame(),{fps,width}=useVideoConfig();
  return <div style={{display:'flex',flexWrap:'wrap',gap:'0 .22em',justifyContent:'center',maxWidth:width*.88,fontSize:small?64:width>1200?126:90,fontWeight:900,lineHeight:1.12,letterSpacing:-3,textShadow:'0 5px 28px #000a'}}>{text.split(' ').map((word,i)=>{
    const enter=spring({frame:f-i*3,fps,config:{damping:16,stiffness:160}});
    return <span key={`${word}-${i}`} style={{display:'inline-block',opacity:interpolate(f,[i*3,i*3+5],[0,1],clamp),transform:`translateY(${(1-enter)*100}px) rotate(${(1-enter)*(i%2?6:-6)}deg) scale(${.7+enter*.3})`,color:i===text.split(' ').length-1?'#ffcf40':'#fff'}}>{word}</span>;
  })}</div>;
}
function Evidence({shot,id,frames}:{shot:Shot;id:string;frames:number}) {
  const f=useCurrentFrame(),{fps}=useVideoConfig(),e=spring({frame:f,fps,config:{damping:20}});
  return <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 30%,#39322a,#101114 80%)'}}>
    <svg viewBox="0 0 1920 1080" style={{position:'absolute',width:'100%',height:'100%'}}>
      <defs><pattern id="grid" width="75" height="75" patternUnits="userSpaceOnUse"><path d="M75 0H0V75" fill="none" stroke="#fff" strokeOpacity=".04"/></pattern></defs>
      <rect width="1920" height="1080" fill="url(#grid)"/>
      <path d="M460 380L1470 470 860 825 460 380" fill="none" stroke="#cf3237" strokeWidth="5" strokeDasharray="2600" strokeDashoffset={2600*(1-Math.min(1,f/45))}/>
      {[{x:460,y:380},{x:1470,y:470},{x:860,y:825}].map((p,i)=><g key={i}><circle cx={p.x} cy={p.y} r={26+Math.sin(f/9+i)*5} fill="none" stroke="#ffcf40" strokeWidth="2"/><circle cx={p.x} cy={p.y} r="8" fill="#cf3237"/></g>)}
    </svg>
    <div style={{position:'absolute',left:'8%',top:'12%',width:'36%',height:'51%',padding:15,background:'#e5ddcc',transform:`translateY(${(1-e)*250}px) rotate(-7deg)`,boxShadow:'0 30px 65px #000a'}}><Picture id={id} asset={shot.asset} motion="push" frames={frames}/></div>
    <div style={{position:'absolute',right:'7%',top:'18%',width:'33%',height:'45%',padding:15,background:'#e5ddcc',transform:`translateY(${(1-e)*-220}px) rotate(6deg)`,boxShadow:'0 30px 65px #000a'}}><Picture id={id} asset={shot.secondary||shot.asset} focal={{x:65,y:40}} frames={frames}/></div>
    <div style={{position:'absolute',left:'37%',bottom:'18%',color:'#181512',background:'#e9dfb9',padding:'15px 35px',fontSize:60,fontWeight:900,transform:`rotate(-3deg) scale(${.85+e*.15})`}}>{shot.headline||'किसकी कहानी?'}</div>
  </AbsoluteFill>;
}
function Take({shot,id,frames,sound}:{shot:Shot;id:string;frames:number;sound?:VideoProps['project']['soundDesign']}) {
  const f=useCurrentFrame(),{width,height,fps}=useVideoConfig(),vertical=height>width;
  const enter=spring({frame:f,fps,config:{damping:22}});
  const labelFade=interpolate(f,[0,5,frames-5,frames],[0,1,1,0],clamp);
  return <AbsoluteFill style={{overflow:'hidden'}}>
    {shot.layout==='split'?<>
      <AbsoluteFill style={{clipPath:'polygon(0 0,55% 0,47% 100%,0 100%)'}}><Picture id={id} asset={shot.asset} focal={shot.focal} frames={frames} motion="push" style={{width:'68%',objectPosition:'35% 35%'}}/></AbsoluteFill>
      <AbsoluteFill style={{clipPath:'polygon(55% 0,100% 0,100% 100%,47% 100%)'}}><Picture id={id} asset={shot.secondary} frames={frames} motion="pull" style={{position:'absolute',right:0,width:'65%',objectPosition:'50% 35%'}}/></AbsoluteFill>
      <div style={{position:'absolute',left:'50%',top:'40%',transform:`translate(-50%,-50%) rotate(-8deg) scale(${enter})`,color:'#ffcf40',fontSize:vertical?110:170,fontWeight:950,textShadow:'5px 5px 0 #a41a20'}}>VS</div>
    </>:shot.layout==='evidence'?<Evidence shot={shot} id={id} frames={frames}/>:shot.layout==='collage'?<>
      <Picture id={id} asset={shot.asset} frames={frames} motion="pan-left" style={{filter:'blur(20px) brightness(.35)'}}/>
      <div style={{position:'absolute',left:'3%',top:'-5%',width:'52%',height:'120%',transform:`rotate(-9deg) translateX(${(1-enter)*-500}px)`,boxShadow:'15px 0 80px #000c',border:'10px solid #eee6d1'}}><Picture id={id} asset={shot.asset} frames={frames} focal={shot.focal}/></div>
      <div style={{position:'absolute',right:'2%',top:'-8%',width:'46%',height:'120%',transform:`rotate(9deg) translateX(${(1-enter)*500}px)`,boxShadow:'-15px 0 80px #000c',border:'10px solid #eee6d1'}}><Picture id={id} asset={shot.secondary||shot.asset} frames={frames} motion="pull"/></div>
    </>:<Picture id={id} asset={shot.asset} motion={shot.motion} focal={shot.focal} frames={frames}/>}
    <AbsoluteFill style={{background:shot.layout==='kinetic'?'#0008':'linear-gradient(0deg,#060809dd,transparent 45%,#0001)',pointerEvents:'none'}}/>
    {shot.layout==='waveform'&&<div style={{position:'absolute',left:'7%',right:'53%',top:'23%',height:260,display:'flex',alignItems:'center',justifyContent:'center',gap:9}}>{Array.from({length:32},(_,i)=><div key={i} style={{width:10,background:i%4?'#ffe183':'#eb3d43',height:30+Math.abs(Math.sin(f/6+i*.7))*180,transform:`scaleY(${enter})`,boxShadow:'0 0 30px #ffcf4055'}}/>)}</div>}
    {shot.headline&&shot.layout!=='evidence'&&<div style={{position:'absolute',left:'6%',right:'6%',top:shot.layout==='kinetic'?'32%':undefined,bottom:shot.layout==='kinetic'?undefined:'22%',display:'flex',justifyContent:shot.layout==='kinetic'?'center':'flex-start',transform:`translateX(${(1-enter)*-100}px)`}}>{shot.layout==='kinetic'?<Kinetic text={shot.headline}/>:<div style={{fontSize:vertical?74:88,lineHeight:1.15,fontWeight:900,maxWidth:'95%',letterSpacing:-2,color:'#fff',textShadow:'0 4px 24px #000,2px 2px 0 #000'}}>{shot.headline}</div>}</div>}
    {shot.label&&<div style={{position:'absolute',left:'6%',top:'7%',fontSize:vertical?25:25,letterSpacing:1.2,color:'#f5f1e7',padding:'8px 15px',background:'#080a0bd9',borderLeft:'4px solid #ffcf40',opacity:labelFade}}>{shot.label}</div>}
    {shot.transition==='wipe'&&f<12&&<AbsoluteFill style={{background:'#eac13d',transform:`translateX(${interpolate(f,[0,12],[0,110],clamp)}%)`}}/>}
    {shot.transition==='flash'&&f<6&&<AbsoluteFill style={{background:'#fff',opacity:interpolate(f,[0,6],[.9,0],clamp)}}/>}
    {shot.transition==='wipe'&&sound?.whoosh&&<Audio src={source(id,sound.whoosh)} volume={.25}/>}
    {(shot.transition==='flash'||shot.motion==='impact')&&sound?.hit&&<Audio src={source(id,sound.hit)} volume={.35}/>}
    {Array.from({length:12},(_,i)=><div key={i} style={{position:'absolute',left:`${(i*19+f*.12)%100}%`,top:`${(i*23+f*.3)%100}%`,height:2,width:2,background:'#fff',opacity:.07}}/>)}
  </AbsoluteFill>;
}
function Chapter({scene,props}:{scene:Scene;props:VideoProps}) {
  const frame=useCurrentFrame(),{fps,height,width}=useVideoConfig(),lengths=shotFrames(scene,fps);
  const shots=scene.shots.length?scene.shots:[{layout:scene.asset?'full':'kinetic',asset:scene.asset,headline:scene.title,label:scene.subtitle,seconds:scene.duration,motion:'push',focal:{x:50,y:50},transition:'cut'} as Shot];
  let from=0;
  const now=frame/fps;
  const cue=scene.cues.length?scene.cues.find(c=>now>=c.start&&now<c.end+.06):undefined;
  const words=scene.narration.split(/\s+/),estimated=words.slice(Math.floor(frame/Math.max(1,(scene.duration-.6)*fps)*Math.ceil(words.length/5))*5,Math.floor(frame/Math.max(1,(scene.duration-.6)*fps)*Math.ceil(words.length/5))*5+5).join(' ');
  const caption=scene.cues.length?cue?.text:estimated;
  return <AbsoluteFill style={{background:'#080a0c',fontFamily:'"Nirmala UI","Segoe UI",sans-serif',color:'#fff'}}>
    {shots.map((shot,i)=>{const start=from;from+=lengths[i];return <Sequence key={i} from={start} durationInFrames={lengths[i]}><Take shot={shot} id={props.project.id} frames={lengths[i]} sound={props.project.soundDesign}/></Sequence>;})}
    {props.captions&&caption&&<div style={{position:'absolute',bottom:height>width?'13%':'7%',left:'6%',right:'6%',display:'flex',justifyContent:'center'}}><div style={{fontSize:height>width?43:46,fontWeight:800,lineHeight:1.35,textAlign:'center',padding:'10px 20px',borderRadius:4,background:'#080a0ccc',textShadow:'0 2px 5px #000',maxWidth:'95%'}}>{caption.split(' ').map((w,i,a)=><span key={i} style={{color:i===a.length-1?'#ffcf40':'white'}}>{w}{i<a.length-1?' ':''}</span>)}</div></div>}
    {scene.audio&&<Audio src={source(props.project.id,scene.audio)}/>}
  </AbsoluteFill>;
}
export function Cinematic(props:VideoProps) {
  const {fps}=useVideoConfig(),lengths=sceneFrames(props.project,fps);let from=0;
  return <AbsoluteFill>{props.project.scenes.map((scene,i)=>{const start=from;from+=lengths[i];return <Sequence key={scene.id} from={start} durationInFrames={lengths[i]}><Chapter scene={scene} props={props}/></Sequence>;})}</AbsoluteFill>;
}
