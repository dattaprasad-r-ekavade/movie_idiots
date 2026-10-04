import {lookup} from 'node:dns/promises';
import {isIP} from 'node:net';
import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {loadProject,projectDir,PUBLIC} from './paths';
import {probe} from './process';

const userAgent='MovieIdiotsStudio/0.2 (local editorial asset collection)';
export function publicUrl(raw:string) {
  const u=new URL(raw);
  if(!['https:','http:'].includes(u.protocol)||u.username||u.password)throw new Error('Use a public HTTP(S) URL without credentials');
  const h=u.hostname.replace(/^\[|\]$/g,'').toLowerCase();
  if(h==='localhost'||h.endsWith('.localhost')||h.endsWith('.local')||h==='::1'||h==='::'||h.startsWith('fc')&&isIP(h)===6||h.startsWith('fd')&&isIP(h)===6||/^fe[89ab]/.test(h)&&isIP(h)===6||h.startsWith('::ffff:'))throw new Error('Private network URLs are not accepted');
  if(isIP(h)===4){const [a,b]=h.split('.').map(Number);if(a===0||a===10||a===127||a===169&&b===254||a===172&&b>=16&&b<=31||a===192&&b===168||a===100&&b>=64&&b<=127||a>=224)throw new Error('Private network URLs are not accepted');}
  return u;
}
async function request(raw:string,limit=20*1024*1024) {
  let u=publicUrl(raw);
  for(let n=0;n<5;n++) {
    for(const address of await lookup(u.hostname,{all:true}))publicUrl(`${u.protocol}//${isIP(address.address)===6?'['+address.address+']':address.address}/`);
    const response=await fetch(u,{headers:{'User-Agent':userAgent},redirect:'manual',signal:AbortSignal.timeout(35000)});
    if(response.status>=300&&response.status<400){const location=response.headers.get('location');await response.body?.cancel();if(!location)throw new Error('Redirect has no location');u=publicUrl(new URL(location,u).href);continue;}
    if(!response.ok){await response.body?.cancel();throw new Error(`Source returned HTTP ${response.status}`);}
    if(Number(response.headers.get('content-length')||0)>limit){await response.body?.cancel();throw new Error('Asset exceeds download size limit');}
    const chunks:Uint8Array[]=[];let size=0;
    if(!response.body)throw new Error('Source returned no content');
    for await(const chunk of response.body){size+=chunk.length;if(size>limit)throw new Error('Asset exceeds download size limit');chunks.push(chunk);}
    return {bytes:Buffer.concat(chunks),url:u.href};
  }
  throw new Error('Too many source redirects');
}
const decode=(s:string)=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/<[^>]+>/g,'').trim();
export async function discoverWebImages(sourceUrl:string) {
  const {bytes,url}=await request(sourceUrl,5*1024*1024),html=bytes.toString('utf8'),found=new Map<string,{imageUrl:string;label:string}>();
  for(const tag of html.matchAll(/<(?:meta|img)\b[^>]*>/gi)) {
    const attrs=Object.fromEntries([...tag[0].matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m=>[m[1].toLowerCase(),decode(m[2])]));
    const meta=/^<(?:meta)/i.test(tag[0]);
    if(meta&&!['og:image','og:image:url','twitter:image'].includes(attrs.property||attrs.name))continue;
    const src=meta?attrs.content:attrs['data-src']||attrs.src;
    if(!src||src.startsWith('data:'))continue;
    try{const u=publicUrl(new URL(src,url).href),imageUrl=u.href;if(/(?:logo|favicon|pixel|tracker)/i.test(attrs.alt||u.pathname)||u.hostname.endsWith('facebook.com')||Number(attrs.width)>0&&Number(attrs.width)<50||Number(attrs.height)>0&&Number(attrs.height)<50)continue;const key=u.origin+u.pathname,previous=found.get(key);if(!previous)found.set(key,{imageUrl,label:attrs.alt||'Source-page image; inspect before use'});else if(attrs.alt)previous.label=attrs.alt;}catch{}
  }
  return {sourceUrl:url,candidates:[...found.values()].slice(0,30).map(image=>({...image,rights:'Unverified: source credit is not a license'}))};
}
export async function searchImages(query:string,limit=6) {
  const params=new URLSearchParams({action:'query',format:'json',generator:'search',gsrsearch:query,gsrnamespace:'6',gsrlimit:String(Math.min(limit,10)),prop:'imageinfo',iiprop:'url|size|extmetadata',iiurlwidth:'1600'});
  const {bytes}=await request(`https://commons.wikimedia.org/w/api.php?${params}`,5*1024*1024);
  const result=JSON.parse(bytes.toString('utf8'));
  if(result.error)throw new Error(result.error.info);
  return {provider:'Wikimedia Commons',query,candidates:Object.values(result.query?.pages||{}).flatMap((page:any)=>{const i=page.imageinfo?.[0];if(!i)return [];return [{label:page.title,imageUrl:i.thumburl||i.url,sourceUrl:i.descriptionurl,width:i.width,height:i.height,credit:decode(i.extmetadata?.Artist?.value||''),license:decode(i.extmetadata?.LicenseShortName?.value||''),licenseUrl:i.extmetadata?.LicenseUrl?.value||'',attribution:decode(i.extmetadata?.Attribution?.value||'')}];}),hostSearch:'For movie publicity stills, use your host web image search, verify the film/year on the source page, then download_image with the source URL and accurate rights note.'};
}
export async function downloadImage(id:string,opts:{imageUrl:string;sourceUrl:string;credit:string;rights:string;label:string}) {
  await loadProject(id);publicUrl(opts.sourceUrl);
  if(!opts.credit.trim()||!opts.rights.trim())throw new Error('Supply source credit and rights status');
  const {bytes,url}=await request(opts.imageUrl);
  const ext=bytes[0]===255&&bytes[1]===216?'.jpg':bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))?'.png':bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP'?'.webp':null;
  if(!ext)throw new Error('Source is not a supported raster image (JPEG/PNG/WebP)');
  const asset=`assets/web-${createHash('sha256').update(bytes).digest('hex').slice(0,16)}${ext}`;
  const dest=path.join(PUBLIC,'projects',id,asset);await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,bytes);
  const metadata=await probe(dest),stream=metadata.streams.find((s:{codec_type:string})=>s.codec_type==='video');
  if(!stream?.width||!stream?.height)throw new Error('Downloaded image could not be decoded');
  const record={asset,type:'image',source:url,sourceUrl:opts.sourceUrl,credit:opts.credit,rights:opts.rights,label:opts.label,width:stream.width,height:stream.height,importedAt:new Date().toISOString()};
  const file=path.join(projectDir(id),'asset-credits.json');let records:any[]=[];try{records=JSON.parse(await readFile(file,'utf8'));}catch{}
  records=records.filter(r=>r.asset!==asset);records.push(record);await writeFile(file,JSON.stringify(records,null,2));
  return record;
}
