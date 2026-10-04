import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {FilmEssay, type VideoProps} from './FilmEssay';
import {ProjectSchema,sceneFrames} from '../schema';

const defaults:VideoProps={captions:true,channel:{name:'Movie Idiots',handle:'@movieidiots5542',url:'https://www.youtube.com/@movieidiots5542',tagline:'Let’s talk movies.',language:'Hindi/Hinglish',tone:'Conversational',fps:30,voice:'',colors:{background:'#111319',accent:'#f2ba4b',ink:'#f5f1e7'}},project:ProjectSchema.parse({id:'preview',title:'Movie Idiots Studio',movie:'Your next film essay',format:'review',language:'Hindi/Hinglish',scenes:[{id:'intro',kind:'hook',title:'Twist से आगे',subtitle:'Look closer.',narration:'',duration:8,visualPrompt:'Kinetic typography'}]})};
function Root() {
  return <Composition id="FilmEssay" component={FilmEssay} durationInFrames={240} fps={30} width={1920} height={1080} defaultProps={defaults} calculateMetadata={({props})=>({durationInFrames:sceneFrames(props.project,props.channel.fps).reduce((a,b)=>a+b,0),fps:props.channel.fps,width:props.project.format==='short'?1080:1920,height:props.project.format==='short'?1920:1080})}/>;
}
registerRoot(Root);
