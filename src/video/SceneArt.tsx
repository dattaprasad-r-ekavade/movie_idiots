import React from 'react';
import {useCurrentFrame} from 'remotion';
import type {Scene} from '../schema';

export function SceneArt({kind,color}:{kind:Scene['visual'];color:string}) {
  const frame=useCurrentFrame();
  const drift=Math.sin(frame/55)*9;
  const common={fill:'none',stroke:color,strokeWidth:3,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  if(kind==='evidence')return <svg viewBox="0 0 500 500"><g {...common} transform={`translate(0,${drift})`}>
    <path d="M75 150v225h305V175H215l-40-45H75z" fill={`${color}10`}/>
    <path d="M105 145V90h235v200"/><path d="M135 125h120m-120 30h95"/>
    <circle cx="300" cy="285" r="70" fill="#111319"/><path d="M350 335l75 75" strokeWidth="18"/>
    <path d="M260 285h80m-40-40v80" opacity=".5"/>
    <path d="M75 240h100m-100 40h120m-120 40h100" opacity=".4"/>
  </g></svg>;
  if(kind==='chess')return <svg viewBox="0 0 500 500"><g {...common}>
    <g opacity=".2">{[0,1,2,3].map(i=>[0,1,2,3].map(j=><rect key={`${i}-${j}`} x={65+i*95} y={70+j*95} width="95" height="95" fill={(i+j)%2?color:'none'} strokeWidth="1"/>))}</g>
    <g transform={`translate(0,${drift})`} fill="#111319"><path d="M185 350c-10-66 10-96 60-131l-56-4-43 36-31-37 55-77 67-31-2-42 51 34c50 43 63 93 25 156-23 38-28 73-15 96z"/><circle cx="237" cy="154" r="6" fill={color}/><path d="M170 355h158v25H170zM155 386h188v28H155z"/></g>
  </g></svg>;
  if(kind==='scales')return <svg viewBox="0 0 500 500"><g {...common}>
    <path d="M250 105v280m-85 12h170m-112-14h54" strokeWidth="8"/>
    <g transform={`rotate(${Math.sin(frame/65)*5},250,140)`}><path d="M100 150l300-20" strokeWidth="8"/><path d="M125 148l-55 115h110zM365 132l-55 115h110z" opacity=".7"/><path d="M70 263q55 55 110 0M310 247q55 55 110 0" fill={`${color}25`}/></g>
    <circle cx="250" cy="140" r="17" fill={color}/><circle cx="250" cy="75" r="6"/>
  </g></svg>;
  return <svg viewBox="0 0 500 500"><g {...common}>
    <rect x="60" y="115" width="380" height="270" rx="24" fill={`${color}08`}/>
    <path d="M80 250h340" opacity=".2"/>
    {Array.from({length:32},(_,i)=>{const h=18+Math.abs(Math.sin(i*.71+frame/35))*115;return <line key={i} x1={90+i*10} x2={90+i*10} y1={250-h/2} y2={250+h/2} strokeWidth="4" opacity={.3+Math.abs(Math.sin(i+frame/90))*.7}/>;})}
    <path d="M90 345h145m25 0h40" opacity=".4"/>
  </g></svg>;
}
