# OpenMontage ideas for Movie Idiots

Checked **7 October 2026**. Source: [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) (README, `AGENT_GUIDE.md`, `lib/slideshow_risk.py`, `pipeline_defs/documentary-montage.yaml`) compared with this toolchain (`PROJECT_HANDOFF.md`, `src/pipeline.ts` `inspect()`).

Concepts only. OpenMontage is GNU AGPL-3.0 — do not copy their Python, YAML, or skills into this repository. Rewrite anything we ship. Preference: free/local tools, footage-led picture, Hindi/Hinglish critic voice.

Related earlier notes: [tools-and-workflows.md](tools-and-workflows.md).

## What to take, what to refuse

OpenMontage can cut real footage, and that is the useful part. Its zero-key default is still Piper narration over stills with Remotion Ken Burns. That is the video type already rejected here (first export and the cinematic remake). Steal the documentary-montage and slideshow-fail ideas, not the explainer-from-posters path.

Do not vendor OpenMontage into this repo. Keep the existing MCP server and JSON manifest.

### Already here

Agent MCP orchestration, Remotion + FFmpeg, research brief, Commons stills with provenance, import/trim clips, Windows/Edge/ElevenLabs voice, word cues, local sound design, codec QC.

### Gap that hurt the 2/10 export

QC never asks whether the cut is an actual edit. Technical `inspect()` checks H.264 and duration. It would pass another stills-essay. A factory slideshow-risk gate is the missing check.

## Do first (free, fits this repo)

| Idea | OpenMontage source | How it maps here | Effort |
|---|---|---|---|
| Factory / slideshow-risk review | 6-dimension slideshow scorer + pre-compose gate | Fail Ken Burns posters, kinetic-type-as-picture, repeated layouts, and `style:cinematic` stills-essays before a render | Small |
| Delivery promise on the manifest | Motion-led vs still-led promise enforcement | Lock `footage-led` or `hybrid`. Block stills-essay as a valid promise | Small |
| Source-shot catalog from imported video | Documentary montage corpus + scene detect + contact sheets | PySceneDetect + FFmpeg thumbs on authorized film selects, then `trimClip`. This is the edit bay | Medium |
| Post-render visual + audio sampling | Frame extract, black-frame, silence, clipping checks | Extend `inspect()` with FFmpeg samples. Technical QC today never looks at frames | Small |
| Reference-cut analysis of a local Movie Idiots MP4 | Paste-a-video analyst (pacing, scenes, keyframes) | Measure cut rate, shot length, footage vs graphics. Positive lookbook instead of cloning OpenMontage demos | Medium |
| Shot intent + media kind on each shot | `shot_intent` / `information_role` fields | Why this cut exists; still vs video vs graphic. Reviewer can count stills vs motion | Small |

## Later (still free)

| Idea | OpenMontage source | How it maps here | Effort |
|---|---|---|---|
| Whisper alignment for Windows / imported voice | WhisperX word timestamps | Edge and ElevenLabs already have cues. Fill the gap for local/recorded Hindi | Medium |
| Studio approval gates (script, selects, draft) | Human gates + Backlot storyboard pause | Do not pause on a generated contact sheet of stills. Pause on footage selects + Hinglish script | Medium |
| Persistent jobs and resume | Checkpoints + decision log | Long revisits die if the MCP process dies. Disk/SQLite jobs, not their YAML checkpoint format | Large |
| Local neural Hindi TTS bake-off | Piper as zero-key TTS | Skip Piper as house voice (weak Hindi). Benchmark Indic Parler against Edge/Windows/ElevenLabs | Medium |
| Clip factory from a long revisit | Clip Factory pipeline | After footage-led reviews work, cut 20–40s highlights with existing captions | Medium |

## Skip on purpose

| Idea | OpenMontage source | Why not |
|---|---|---|
| Pexels / Pixabay / NASA CLIP corpus | Documentary montage stock fan-out | Generic rain/city B-roll is not Movie Idiots. Channel identity is film edits and mashups |
| Image-based explainer / Ken Burns default | Zero-key Remotion stills path | This is the rejected first export and remake. Do not industrialize it |
| Kling / Veo / FLUX / local Wan as the picture | 20+ video generation providers | Paid, and still not an edit of the film. Optional insert later, never the default cut |
| Vendor OpenMontage into this repo | Full agent studio (AGPL-3.0, 700+ skills) | Wrong license, wrong default grammar, huge surface |

## Slideshow-risk, rewritten for this schema

OpenMontage scores 0–5 (lower is better) on six dimensions. Score our own manifests in TypeScript, not their Python. A fail should block `render_project`.

| Dimension | Fail signal in this repo | Pass signal |
|---|---|---|
| Repetition | Same layout (`full`+`push`) or same still reused across most shots | Mix of footage cuts; graphics only when the line needs them |
| Decorative visuals | Shot has no intent; Ken Burns over a poster while TTS talks | Each shot has intent + `mediaKind`: `video` \| `still` \| `graphic` |
| Weak motion | Every still auto-push/pan; `OffthreadVideo` unused | Motion comes from the clip; camera moves are rare support |
| Shot intent | `style:cinematic` with 2–5s template splits/evidence/kinetic as the picture | Picture is an edit of selects; type/evidence/kinetic are overlays |
| Typography overreliance | Kinetic/headline-heavy share of timeline | Captions support speech; one short sign-off |
| False cinematic claim | `style:cinematic` with mostly `.jpg`/`.png` assets | Majority of picture duration is imported video |

## Suggested first implementation

1. `review_storyboard` MCP/studio check: still-vs-video ratio, repeated assets, kinetic/evidence share, missing shot intent. Verdict `fail` blocks render.
2. Manifest fields: `deliveryPromise: footage-led | hybrid`, `shots[].intent`, `shots[].mediaKind`.
3. `catalog_source_video`: PySceneDetect + contact sheet + trim into selects.
4. Stronger `inspect_render`: sample frames, flag near-black/static stills, check audio for silence/clipping.
5. Optional: analyze one local channel MP4 for cut density as the lookbook.

**Free stack to use:** FFmpeg / FFprobe (already here), PySceneDetect (local Python), our schema + MCP rewritten in TypeScript. Whisper / Indic Parler only after the edit bay exists.

**Out of scope:** Piper, Pexels CLIP corpora, Kling, Veo, HyperFrames character rigs.
