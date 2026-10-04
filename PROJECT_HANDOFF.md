# Movie Idiots — project handoff and continuation plan

Updated 5 October 2026. Start here when resuming in another checkout or agent session.

Repository: https://github.com/dattaprasad-r-ekavade/movie_idiots
Channel: https://www.youtube.com/@movieidiots5542
Original workspace: `D:\Projects\video-editor`.

## User intent and decisions

Build a reusable prompt-to-video toolchain for animated movie reviews, full movie revisits and Shorts for Movie Idiots. Include FFmpeg and an MCP server so Codex or Claude can research, author and produce videos through tools. The user requested research into how creators use Claude for these pipelines; sources and the initial architecture are in `docs/research-and-plan.md`.

- Narration: **Hindi/Hinglish, conversational movie critic**. Use everyday spoken sentences, not literal translations of English essays or formal Hindi.
- Services: **local tools by default, optional paid AI**. Host Codex/Claude can write the script without a separate LLM API key. The default studio template is only a scaffold.
- Visuals: procure relevant images from the web, inspect them, record provenance, and edit multiple purposeful shots. Animation must involve the imagery and story elements, rather than a slideshow with a moving background.
- Branding: no repeated channel name, persistent headers, slide bullets or scene counters. One short sign-off is enough.
- Voice: the user explicitly chose **free online Hindi speech for the remake**. Edge narration is implemented; Windows speech remains the local default. Keep provider choice explicit for subsequent productions.
- The user requested a recent film for the pilot; the researched example is *Drishyam: The Conclusion*. The script clearly states that it is based on published reviews, without claiming a screening.
- Uploading to YouTube has **not** been requested/performed as part of the implementation. Produce an export package for review.

## Quality feedback that must survive this handoff

The user rated the first video **2/10**: “extremely lazy,” no useful animation, “Fake Hindi,” and repeated branding that made it feel like PowerPoint. Do not treat successful rendering or technical QC as evidence of an entertaining video.

The remake changes the writing, voice, asset acquisition and visual edit. It has been delivered, but **the user has not yet rated or approved its creative quality**. The next editorial iteration should start from their response to the remake, not assume the quality problem is solved.

## What is implemented

| Area | Current behavior |
|---|---|
| Studio | Local web app at `http://127.0.0.1:3210`, editable manifests, image acquisition, scene/shot preview strip, narration and draft/final jobs |
| Agent connection | Stdio MCP server with 20 tools, channel resource and production prompt; Codex and Claude project configuration |
| Authoring | Validated JSON scenes, sources, spoiler flags, narration, speech text, word cues and shot plans; optional Ollama/Anthropic providers |
| Web images | Commons search with attribution/license metadata, source-page image discovery, validated downloads and an asset-credit ledger |
| Cinematic edit | Full images, split screens, entering collages, animated evidence-board connections, kinetic words, waveform, camera movement and transitions |
| Speech/captions | Windows Hindi speech; opt-in `edge-tts` Hindi voice and word-boundary cues; optional ElevenLabs or imported recordings |
| Sound | Original local synthesized underscore/whoosh/hit; FFmpeg mixing, narration ducking and normalization |
| Export | H.264/yuv420p + AAC MP4, thumbnail, per-shot PNGs, script, SRT/VTT, metadata, props and technical QC |

The current default is `style: "cinematic"`. `style: "essay"` retains the older layout. Shot `seconds` are relative weights: actual shot frame boundaries are allocated across the measured narration duration. Edge captions use supplied word boundaries; Windows/imported narration uses estimated captions unless actual cues are provided.

This is a programmatic motion-graphics and imported-media editor. It does not yet synthesize cartoon character performances or AI video shots. Visual prompts are exported for external generation, without silently calling a paid service.

## Code map

- `src/mcp.ts`: MCP tools/resource/prompt. `scripts/produce.ts`: real MCP client bridge for chats that cannot load newly configured tools.
- `src/server.ts` and `web/`: studio API/UI. `src/cli.ts`: command-line interface.
- `src/schema.ts`, `src/planner.ts`, `config/channel.json`: manifest validation and editorial defaults.
- `src/video/Cinematic.tsx`, `src/video/timing.ts`: shot layouts, animation, exact frame allocation and caption grouping.
- `src/pipeline.ts`, `src/media.ts`, `src/process.ts`: voice, previews, rendering, FFmpeg and QC.
- `src/web-assets.ts`: public URL validation, discovery/downloads and provenance.
- `scripts/edge_speech.py`: free online Hindi speech; `scripts/speak.ps1`: Windows speech.
- `src/sound-design.ts`, `scripts/sound_design.py`: original synthesized audio.
- `tests/workflow.test.ts`: workflow, MCP, timing, caption and request/path checks.
- `CLAUDE.md`, `AGENTS.md`: production instructions for future agents.

## Delivered productions and evidence

The remake source is `productions/drishyam-review-v2.json`; its six web-image requests are in `productions/drishyam-remake-assets.json`. It contains seven narration segments and **31 shots**. Retrieved images were viewed before use. Older franchise stills and an actor portrait are labelled accordingly; they are not represented as footage of the new film.

On the original machine, final video: `D:\Projects\video-editor\projects\drishyam-review-v2\exports\video.mp4`.

Verified remake: **142.333333 seconds**, 1920×1080, 30fps, H.264/yuv420p, AAC; 63,762,348 bytes. Technical QC passed, a complete FFmpeg decode succeeded, and the studio player loaded without a media error. Measured final audio: −16.28 LUFS integrated, −3.44 dBTP true peak. `docs/video-redesign.md` explains the changes; `docs/remake-studio-preview.png` records the studio preview.

Historical sources/evidence: `productions/drishyam-conclusion-review-20261005.json`, `docs/first-production.md`, `docs/validation.md`. The initial 185-second export was technically valid but creatively rejected. Demo and Short exports also remain on the original machine.

**Git contains source code, plans, authored manifests, asset request URLs and documentation screenshots.** Generated projects, downloaded film images, audio, MP4s, `node_modules`, `.venv`, caches and `.env` are ignored. A fresh clone can regenerate the remake; it will not contain its existing rendered file or narration recordings. To preserve the exact existing edit, copy both `projects/drishyam-review-v2/` and `public/projects/drishyam-review-v2/` separately. Regeneration depends on source URL/service availability and may produce different voice timings.

## Resume on another Windows machine

Install Node 22+, Git, FFmpeg/FFprobe, and Python 3.11+ for online voice/sound synthesis. Windows local narration additionally requires PowerShell 7 and an installed Hindi voice.

```powershell
git clone https://github.com/dattaprasad-r-ekavade/movie_idiots.git
cd movie_idiots
npm.cmd ci
Copy-Item .env.example .env
python -m venv .venv
.venv/Scripts/python.exe -m pip install -r requirements-voice.txt
npm.cmd run doctor
npm.cmd run dev
```

Set executable paths in `.env` when the commands are absent from PATH. The original machine uses Scoop FFmpeg/FFprobe and a bundled PowerShell 7 executable; these machine-specific paths are intentionally not checked in. No API key is required for the host-authored MCP workflow or Edge voice. Linux/macOS local Windows speech is unavailable; the non-Windows workflow has not been validated.

### Reconnect MCP

The checked-in `.mcp.json` and `.codex/config.toml` currently use `D:/Projects/video-editor`. **Replace those absolute paths with your new checkout path** before using project MCP configuration. The Codex project must be trusted; Claude may ask to enable the project server. Restart the host session after configuration changes.

Alternatively register the current checkout through Codex CLI:

```powershell
$movieIdiotsRoot = (Get-Location).Path
codex mcp add movie-idiots-studio -- node "$movieIdiotsRoot/node_modules/tsx/dist/cli.mjs" "$movieIdiotsRoot/src/mcp.ts"
codex mcp get movie-idiots-studio
```

The original machine already has this global Codex registration. It is outside the repository and will not transfer with a clone. There is no modified global Claude configuration.

The bridge works without client registration, from the checkout:

```powershell
node node_modules/tsx/dist/cli.mjs scripts/produce.ts --check
```

Keep the process that starts a job alive and poll `job_status`. Jobs and queues are in memory, serialized per server process. Do not modify/render one production concurrently from different studio/MCP/CLI processes.

### Rebuild the remake from tracked inputs

Use a fresh checkout or back up an existing project with this ID before rebuilding. `produce.ts` saves the supplied source manifest and regenerates narration.

```powershell
node node_modules/tsx/dist/cli.mjs scripts/produce.ts productions/drishyam-review-v2.json --assets productions/drishyam-remake-assets.json --procure-only
# Inspect the collected images and their labels before continuing.
node node_modules/tsx/dist/cli.mjs scripts/produce.ts productions/drishyam-review-v2.json --assets productions/drishyam-remake-assets.json --edge --sound --draft-only
# Watch the draft; make revisions before the final render.
node node_modules/tsx/dist/cli.mjs scripts/produce.ts --render-only drishyam-review-v2
```

`--edge` sends narration to Microsoft's online speech service. For a new production, explicitly select the intended voice provider. Use `--preview-only PROJECT-ID` to regenerate shot previews. The advanced shot plan is currently edited through full JSON, not a visual timeline editor.

## Continuation plan

These are proposed next steps, rather than claims that the user approved every feature:

1. **Review the remake with the user.** Listen for natural Hindi, pronunciation and delivery; watch shot relevance, pacing and animation. Replace weak writing/visuals before making a longer video.
2. **Improve editorial specificity and visual variety.** Tie each shot to an actual critique, collect a broader set of relevant assets, and avoid repeating the same images simply to fill time. Retain the review basis and accurate film/year labels.
3. **Make two quality pilots.** After the style is accepted, create a researched approximately five-minute review and a 10–15 minute revisit, with explicit spoiler transitions and original critical commentary.
4. **Improve local speech and alignment.** Benchmark a local neural Hindi voice and add local Whisper alignment for Windows/imported recordings. Edge already supplies actual cues; do not describe all current captions as estimated.
5. **Extend the scene/editor library.** Relationship diagrams, timelines, shot-analysis annotations, illustrated sets/characters, vertical layouts, and practical shot controls in the studio. Optional ComfyUI/image/video adapters should follow a concrete visual need and explicit provider/cost choice.
6. **Make long productions resilient.** Persistent jobs, cancellation, cross-process project locks, resumable/cached scene renders and disk management.
7. **Publishing integration later.** Add YouTube upload only after the production style and review workflow are settled and uploading is requested.

## Known limits and checks for the next agent

- TypeScript checking and **12 tests** passed for the remake. Run `npm.cmd run typecheck` and `npm.cmd test` after source changes; renderer changes also need representative visual previews and a render.
- Paid Anthropic/ElevenLabs and local Ollama integrations are implemented but were not live-validated with configured services. No paid provider was called.
- Technical QC does not verify entertainment value, film facts, image rights, pronunciation or caption accuracy. Watch/listen to the draft.
- Publicity-image permissions remain unverified. Source credit is separate from a license; asset notes preserve the actual status. No YouTube upload has been performed.
- The movie sources were retrieved during the original production. Recheck recent-film facts for a new production rather than carrying forward the pilot's claims.
- `config/channel-research.md` records the requested GPT-6 Luna browser research. Channel counts are a dated public snapshot, not current analytics.

For a new agent session, use this starting instruction:

> Read PROJECT_HANDOFF.md, AGENTS.md and CLAUDE.md. Continue the Movie Idiots cinematic Hindi/Hinglish production toolchain. The first video was rejected; do not assume the delivered Drishyam remake is creatively approved. Check the current user feedback and local setup, then continue the next concrete production or implementation request with source-backed research, inspected web assets, natural narration and a reviewed draft.
