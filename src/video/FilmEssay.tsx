import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Channel,Project,Scene} from '../schema';
import {sceneFrames} from '../schema';
import {SceneArt} from './SceneArt';
import {Cinematic} from './Cinematic';

export type VideoProps={project:Project;channel:Channel;captions:boolean};
function Reel({accent}:{accent:string}) {
  const frame=useCurrentFrame();
  return <svg viewBox="0 0 500 500" style={{width:'100%',height:'100%',transform:`rotate(${frame*.17}deg)`}}>
    <circle cx="250" cy="250" r="220" fill="none" stroke={accent} strokeWidth="2" opacity=".4"/>
    <circle cx="250" cy="250" r="175" fill="none" stroke={accent} strokeWidth="28" opacity=".13"/>
    {[0,1,2,3,4].map(i=>{const a=i*Math.PI*2/5;return <circle key={i} cx={250+105*Math.cos(a)} cy={250+105*Math.sin(a)} r="48" fill="none" stroke={accent} strokeWidth="2" opacity=".55"/>;})}
    <circle cx="250" cy="250" r="22" fill={accent}/>
  </svg>;
}
export function captionChunks(scene:Scene) {
  const words=scene.narration.trim().split(/\s+/).filter(Boolean),chunks:string[]=[];
  for(let i=0;i<words.length;i+=7) chunks.push(words.slice(i,i+7).join(' '));
  return chunks;
}
const assetUrl=(id:string,asset:string)=>staticFile(`projects/${id}/${asset}`);
function Shot({scene,index,total,props}:{scene:Scene;index:number;total:number;props:VideoProps}) {
  const frame=useCurrentFrame(),{fps,width,height,durationInFrames}=useVideoConfig();
  const vertical=height>width, c=props.channel, count=Math.round(scene.duration*fps);
  const enter=spring({frame,fps,config:{damping:200},durationInFrames:28});
  const opacity=interpolate(frame,[0,12,count-10,count],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const pad=vertical?72:112;
  const chunks=captionChunks(scene);
  const speechFrames=Math.max(1,count-Math.round(.6*fps));
  const caption=chunks[Math.min(chunks.length-1,Math.floor(frame/speechFrames*chunks.length))];
  const bgAsset=scene.asset;
  return <AbsoluteFill style={{background:c.colors.background,color:c.colors.ink,fontFamily:'"Nirmala UI", "Segoe UI", sans-serif',overflow:'hidden'}}>
    {bgAsset&&(/\.(mp4|mov|webm)$/i.test(bgAsset)?<OffthreadVideo src={assetUrl(props.project.id,bgAsset)} muted style={{width:'100%',height:'100%',objectFit:'cover',opacity:.28}}/>:<Img src={assetUrl(props.project.id,bgAsset)} style={{width:'100%',height:'100%',objectFit:'cover',opacity:.28,transform:`scale(${1+frame/count*.045})`}}/>)}
    <AbsoluteFill style={{background:`radial-gradient(ellipse at 80% 40%, ${c.colors.accent}14, transparent 60%), linear-gradient(0deg, ${c.colors.background}, transparent 80%)`}}/>
    <div style={{position:'absolute',width:vertical?700:650,height:vertical?700:650,right:vertical?-270:65,top:vertical?380:200,opacity:bgAsset ? 0.15 : 0.48}}>{scene.visual&&scene.visual!=='reel'?<SceneArt kind={scene.visual} color={c.colors.accent}/>:<Reel accent={c.colors.accent}/>}</div>
    <div style={{position:'absolute',left:pad,right:pad,top:vertical?90:68,display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:vertical?27:24,letterSpacing:4,fontWeight:700}}>
      <span><span style={{color:c.colors.accent}}>◉</span> {c.name.toUpperCase()}</span><span style={{color:'#999'}}>{String(index+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
    </div>
    {scene.spoiler&&<div style={{position:'absolute',top:vertical?160:118,left:pad,color:c.colors.accent,fontSize:23,letterSpacing:3}}>SPOILERS AHEAD · आगे की कहानी</div>}
    <div style={{position:'absolute',left:pad,right:pad,top:vertical?390:285,opacity,transform:`translateY(${(1-enter)*35}px)`}}>
      <div style={{color:c.colors.accent,fontSize:vertical?28:24,letterSpacing:5,textTransform:'uppercase',marginBottom:24}}>{scene.kind==='hook'?'A closer look':scene.kind==='outro'?'Keep the conversation going':props.project.format==='revisit'?'The revisit':'The review'}</div>
      <div style={{fontSize:vertical?76:Math.min(104,scene.title.length>50?76:104),lineHeight:1.14,fontWeight:800,letterSpacing:-2,maxWidth:vertical?'100%':'78%',overflowWrap:'break-word'}}>{scene.title}</div>
      <div style={{marginTop:28,fontSize:vertical?34:34,color:'#bab8b3',lineHeight:1.5,maxWidth:vertical?'100%':'72%'}}>{scene.subtitle}</div>
      <div style={{display:'flex',flexDirection:'column',gap:18,marginTop:38}}>{scene.bullets.map((b,i)=><div key={b} style={{fontSize:vertical?32:31,opacity:interpolate(frame,[18+i*8,32+i*8],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),display:'flex',gap:18}}><span style={{color:c.colors.accent}}>—</span>{b}</div>)}</div>
      {scene.kind==='rating'&&scene.rating!==undefined&&<div style={{marginTop:35,maxWidth:650}}><div style={{fontSize:95,color:c.colors.accent,fontWeight:800}}>{scene.rating}<span style={{fontSize:36,color:'#999'}}> / 10</span></div><div style={{height:10,background:'#ffffff15',marginTop:20}}><div style={{height:'100%',width:`${scene.rating*10*enter}%`,background:c.colors.accent}}/></div></div>}
    </div>
    {props.captions&&caption&&<div style={{position:'absolute',left:pad,right:pad,bottom:vertical?225:120,display:'flex',justifyContent:'center'}}><span style={{background:'#080a0dea',borderRadius:10,padding:'15px 24px',fontSize:vertical?36:32,lineHeight:1.5,textAlign:'center',maxWidth:'100%'}}>{caption}</span></div>}
    <div style={{position:'absolute',left:pad,bottom:vertical?126:58,fontSize:22,color:'#a0a0a0',letterSpacing:2}}>{c.handle} <span style={{marginLeft:30,opacity:.6}}>{props.project.movie}</span></div>
    <div style={{position:'absolute',bottom:0,left:0,height:5,width:`${frame/count*100}%`,background:c.colors.accent}}/>
    {scene.audio&&<Audio src={assetUrl(props.project.id,scene.audio)}/>}
  </AbsoluteFill>;
}
export function FilmEssay(props:VideoProps) {
  const {fps}=useVideoConfig();const lengths=sceneFrames(props.project,fps);let from=0;
  if(props.project.style==='cinematic')return <Cinematic {...props}/>;
  return <AbsoluteFill>{props.project.scenes.map((scene,i)=>{const start=from;from+=lengths[i];return <Sequence key={scene.id} from={start} durationInFrames={lengths[i]}><Shot scene={scene} index={i} total={lengths.length} props={props}/></Sequence>;})}</AbsoluteFill>;
}
