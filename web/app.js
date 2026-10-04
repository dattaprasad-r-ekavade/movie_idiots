const $=s=>document.querySelector(s);
let project=null,selected=0,previewFrames={},shotPreviews={},busy=false,jobVersion=0;
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function api(url,method='GET',body) {const r=await fetch(url,{method,headers:body?{'content-type':'application/json'}:{},body:body?JSON.stringify(body):undefined});const data=await r.json();if(!r.ok) throw new Error(data.error||'Request failed');return data;}
function toast(msg) {$('#toast').textContent=msg;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),6500);}
function view(name) {for(const id of ['create','editor','tools'])$(`#${id}-view`).hidden=id!==name;}
async function refresh() {
  const projects=await api('/api/projects');
  $('#project-list').innerHTML=projects.length?projects.map(p=>`<button class="project-item ${p.id===project?.id?'active':''}" data-project="${escape(p.id)}">${escape(p.title)}<small>${escape(p.format)} · ${Math.round(p.seconds/60*10)/10} min</small></button>`).join(''):'<p class="subtle">Your productions will appear here.</p>';
  document.querySelectorAll('[data-project]').forEach(el=>el.onclick=()=>guard(()=>openProject(el.dataset.project)));
}
async function guard(fn) {try{await fn();}catch(e){toast(e.message);}}
async function openProject(id) {
  project=await api(`/api/projects/${id}`);selected=0;previewFrames={};shotPreviews={};$('#result').hidden=true;
  const outputs=await api(`/api/projects/${id}/outputs`);
  for(const scene of project.scenes)if(outputs.files.includes(`${scene.id}.png`))previewFrames[scene.id]=`/exports/${id}/${scene.id}.png`;
  for(const scene of project.scenes)shotPreviews[scene.id]=outputs.files.filter(f=>f.startsWith(`${scene.id}-shot-`)&&f.endsWith('.png')).sort().map(f=>`/exports/${id}/${f}`);
  await refresh();showProject();
  if(outputs.video)showVideo(outputs.video,outputs.video.url.endsWith('draft.mp4'));
}
function showVideo(result,draft) {
  $('#result').hidden=false;$('#result').innerHTML=`<b>${draft?'Draft':'Final export'} ready</b><video controls poster="/exports/${escape(project.id)}/thumbnail.png" src="${escape(result.url)}?v=${jobVersion}"></video><a href="${escape(result.url)}" download>Download MP4 ↓</a><a href="/exports/${escape(project.id)}/thumbnail.png" target="_blank">Thumbnail ↗</a><a href="/exports/${escape(project.id)}/youtube.txt" target="_blank">YouTube metadata ↗</a><a href="/exports/${escape(project.id)}/captions.srt" download>Captions ↓</a><details><summary>Technical checks</summary><pre>${escape(JSON.stringify(result.qc,null,2))}</pre></details>`;
}
function showProject() {
  view('editor');$('#project-title').textContent=project.title;$('#project-kind').textContent=`${project.format.toUpperCase()} / ${project.language}`;
  $('#project-summary').textContent=`${project.scenes.length} scenes · ${(project.scenes.reduce((a,b)=>a+b.duration,0)/60).toFixed(1)} minutes · ${project.movie}`;
  $('#scaffold-warning').hidden=!project.scenes.some(s=>s.narration.startsWith('Draft section:'));
  $('#manifest').value=JSON.stringify(project,null,2);showScenes();showScene();
}
function showScenes() {
  $('#scene-list').innerHTML=project.scenes.map((s,i)=>`<button class="scene-item ${i===selected?'selected':''}" data-scene="${i}"><span>${String(i+1).padStart(2,'0')}</span>${escape(s.title)}<small>${s.duration.toFixed(1)}s · ${escape(s.kind)} ${s.audio?'· voice ✓':''}</small></button>`).join('')+'<div class="scene-buttons"><button id="add-scene">＋ Scene</button></div>';
  document.querySelectorAll('[data-scene]').forEach(el=>el.onclick=()=>{collectScene();selected=Number(el.dataset.scene);showScenes();showScene();});
  $('#add-scene').onclick=()=>{collectScene();project.scenes.push({id:`scene-${Date.now()}`,kind:'analysis',title:'New observation',subtitle:'',narration:'',duration:8,bullets:[],visualPrompt:'',spoiler:false});selected=project.scenes.length-1;showProject();};
}
function showScene() {
  const s=project.scenes[selected];
  const url=previewFrames[s.id];$('#scene-preview').innerHTML=url?`<img src="${escape(url)}?v=${jobVersion}" alt="Scene preview">`:'<span>Preview this storyboard to see scene frames.</span>';
  const shotImages=shotPreviews[s.id]||[];
  $('#shot-previews').innerHTML=shotImages.map((url,i)=>`<button data-shot-image="${escape(url)}" title="Shot ${i+1}"><img src="${escape(url)}?v=${jobVersion}" alt="Shot ${i+1}"><span>${String(i+1).padStart(2,'0')}</span></button>`).join('');
  document.querySelectorAll('[data-shot-image]').forEach(el=>el.onclick=()=>{$('#scene-preview').innerHTML=`<img src="${escape(el.dataset.shotImage)}?v=${jobVersion}" alt="Selected shot preview">`;});
  $('#scene-fields').innerHTML=`<label>TITLE<input data-field="title" value="${escape(s.title)}" maxlength="100"></label><label>SUBTITLE<input data-field="subtitle" value="${escape(s.subtitle)}" maxlength="240"></label><label>NARRATION<textarea data-field="narration" rows="5">${escape(s.narration)}</textarea></label><div class="row"><label>SCENE TYPE<select data-field="kind">${['hook','title','chapter','analysis','quote','rating','outro'].map(k=>`<option ${k===s.kind?'selected':''}>${k}</option>`).join('')}</select></label><label>DURATION (SECONDS)<input data-field="duration" type="number" min="2" max="180" step="0.1" value="${s.duration}"></label></div><label>BULLETS · ONE PER LINE<textarea data-field="bullets" rows="3">${escape(s.bullets.join('\n'))}</textarea></label><label>VISUAL DIRECTION<textarea data-field="visualPrompt" rows="2">${escape(s.visualPrompt)}</textarea></label><div class="row"><label>IMAGE / VIDEO ASSET<input data-field="asset" value="${escape(s.asset||'')}" placeholder="assets/your-image.png"></label><label>NARRATION ASSET<input data-field="audio" value="${escape(s.audio||'')}" placeholder="narration/scene.wav"></label></div><div class="row"><label><input type="checkbox" data-field="spoiler" ${s.spoiler?'checked':''}> SPOILER SCENE</label><label>RATING (OPTIONAL)<input data-field="rating" type="number" min="0" max="10" step="0.1" value="${s.rating??''}"></label></div><div class="scene-buttons"><button id="up-scene">↑ Move up</button><button id="down-scene">↓ Move down</button><button id="attach-audio">Measure narration</button><button class="delete-scene" id="delete-scene">Delete</button></div>`;
  $('#delete-scene').onclick=()=>{if(project.scenes.length===1)return toast('Keep at least one scene.');project.scenes.splice(selected,1);selected=Math.min(selected,project.scenes.length-1);showProject();};
  $('#up-scene').onclick=()=>move(-1);$('#down-scene').onclick=()=>move(1);
  $('#attach-audio').onclick=()=>guard(async()=>{collectScene();if(!s.audio)throw new Error('Enter an imported audio asset path first');await save();project=await api(`/api/projects/${project.id}/attach`,'POST',{sceneId:s.id,asset:s.audio});showProject();toast('Scene duration updated from the recording.');});
}
function move(n) {collectScene();const to=selected+n;if(to<0||to>=project.scenes.length)return;[project.scenes[selected],project.scenes[to]]=[project.scenes[to],project.scenes[selected]];selected=to;showProject();}
function collectScene() {
  if(!project)return;
  const s=project.scenes[selected];
  document.querySelectorAll('[data-field]').forEach(el=>{const k=el.dataset.field;if(k==='duration')s[k]=Number(el.value);else if(k==='rating'){if(el.value==='')delete s.rating;else s.rating=Number(el.value);}else if(k==='spoiler')s[k]=el.checked;else if(k==='bullets')s[k]=el.value.split('\n').filter(x=>x.trim());else if(k==='audio'||k==='asset'){if(el.value.trim())s[k]=el.value.trim();else delete s[k];}else s[k]=el.value;});
  $('#manifest').value=JSON.stringify(project,null,2);
}
async function save() {collectScene();project=await api(`/api/projects/${project.id}`,'PUT',project);await refresh();showProject();}
function lock(value) {busy=value;document.querySelectorAll('#editor-view button,#editor-view input,#editor-view select,#editor-view textarea,#new-project,#demo,#create-form button,.project-item').forEach(el=>el.disabled=value);}
async function wait(job,onDone) {
  lock(true);$('#job-panel').hidden=false;
  let current=job;
  try {
    while(['queued','running'].includes(current.status)) {
      $('#job-label').textContent=current.label;$('#job-status').textContent=`${current.status} · ${Math.round(current.progress*100)}%`;$('#job-progress').value=current.progress;
      await new Promise(r=>setTimeout(r,1000));current=await api(`/api/jobs/${job.id}`);
    }
    $('#job-status').textContent=current.status;$('#job-progress').value=current.progress;
    if(current.status==='failed')throw new Error(current.error);
    jobVersion++;await onDone(current.result);
  } finally {lock(false);}
}
$('#create-form').onsubmit=e=>{e.preventDefault();guard(async()=>{
  const fields=Object.fromEntries(new FormData(e.target));fields.minutes=Number(fields.minutes);const job=await api('/api/projects','POST',fields);
  view('editor');$('#job-panel').hidden=false;await wait(job,async result=>{await openProject(result.project.id);toast(result.scaffold?'Storyboard scaffold ready. Add your analysis or have Claude write it via MCP.':'Your script and storyboard are ready.');});
});};
$('#new-project').onclick=()=>{if(!busy)view('create');};$('#refresh').onclick=()=>guard(refresh);
$('#demo').onclick=()=>guard(async()=>{const p=await api('/api/demo','POST');await openProject(p.id);});
$('#save').onclick=()=>guard(async()=>{await save();toast('Storyboard saved.');});
document.querySelectorAll('[data-action]').forEach(button=>button.onclick=()=>guard(async()=>{
  if(busy)return;await save();const action=button.dataset.action;
  const body=action==='narrate'?{provider:$('#voice-provider').value}:action==='render'||action==='draft'?{draft:action==='draft',captions:$('#captions').checked,...($('#music').value.trim()?{music:$('#music').value.trim()}:{})}:{};
  const job=await api(`/api/projects/${project.id}/${action==='draft'?'render':action}`,'POST',body);
  await wait(job,async result=>{
    if(action==='narrate'){project=await api(`/api/projects/${project.id}`);showProject();toast('Voice generated. Durations now match the narration.');}
    else if(action==='preview'){project.scenes.forEach((s,i)=>{previewFrames[s.id]=result.frames[i];shotPreviews[s.id]=(result.shots||[]).filter(url=>url.includes(`/${s.id}-shot-`));});showScene();toast('Scene and shot previews are ready.');}
    else showVideo(result,action==='draft');
  });
}));
$('#export').onclick=()=>guard(async()=>{await save();await api(`/api/projects/${project.id}/export`,'POST',{});toast('Script, captions, visual prompts and YouTube metadata exported.');$('#result').hidden=false;$('#result').innerHTML=`<a href="/exports/${escape(project.id)}/script.md" target="_blank">Script ↗</a><a href="/exports/${escape(project.id)}/youtube.txt" target="_blank">YouTube metadata ↗</a><a href="/exports/${escape(project.id)}/captions.srt" download>Captions ↓</a>`;});
$('#apply-json').onclick=()=>guard(async()=>{const next=JSON.parse($('#manifest').value);if(next.id!==project.id)throw new Error('Keep the project ID unchanged');project=await api(`/api/projects/${project.id}`,'PUT',next);selected=0;showProject();toast('JSON applied and saved.');});
$('#import-asset').onclick=()=>guard(async()=>{const r=await api(`/api/projects/${project.id}/asset`,'POST',{source:$('#asset-source').value,type:$('#asset-type').value,credit:$('#asset-credit').value});$('#import-result').textContent=`Imported ${r.asset}. Paste this path into the scene's image/video or narration asset field.`;});
function imageCandidates(result){const candidates=result.candidates||[];$('#image-candidates').innerHTML=candidates.map((c,i)=>`<button data-candidate="${i}">${escape(c.label)}<small>${escape(c.license||c.rights||'Check rights on source page')}</small></button>`).join('')||'<p class="subtle">No candidates found. Try a verified source page or use your host image search.</p>';document.querySelectorAll('[data-candidate]').forEach(el=>el.onclick=()=>{const c=candidates[Number(el.dataset.candidate)];$('#web-image-url').value=c.imageUrl;$('#web-source-url').value=c.sourceUrl||result.sourceUrl||'';$('#web-image-label').value=c.label;$('#web-image-credit').value=c.credit||'';$('#web-image-rights').value=c.license?`${c.license} ${c.licenseUrl||''}`:c.rights||'';});}
$('#discover-images').onclick=()=>guard(async()=>imageCandidates(await api(`/api/projects/${project.id}/web-images`,'POST',{sourceUrl:$('#web-page').value})));
$('#search-images').onclick=()=>guard(async()=>imageCandidates(await api(`/api/projects/${project.id}/image-search`,'POST',{query:$('#image-query').value})));
$('#download-image').onclick=()=>guard(async()=>{const r=await api(`/api/projects/${project.id}/download-image`,'POST',{imageUrl:$('#web-image-url').value,sourceUrl:$('#web-source-url').value,label:$('#web-image-label').value,credit:$('#web-image-credit').value,rights:$('#web-image-rights').value});$('#web-image-result').textContent=`Collected ${r.asset} · ${r.width}×${r.height}. Use this path in your shot plan.`;});
$('#doctor').onclick=()=>guard(async()=>{view('tools');$('#tools-output').textContent='Checking tools…';$('#tools-output').textContent=JSON.stringify(await api('/api/doctor'),null,2);});
$('#back').onclick=()=>view(project?'editor':'create');
document.querySelectorAll('input[name=format]').forEach(el=>el.onchange=()=>{$('input[name=minutes]').value=el.value==='short'?0.8:el.value==='revisit'?12:5;});
guard(refresh);
