# Movie Idiots Studio

A local prompt-driven toolchain for **[@movieidiots5542](https://www.youtube.com/@movieidiots5542)**: animated movie reviews, full revisits, and YouTube Shorts in Hindi/Hinglish. Built in `D:\Projects\video-editor`.

**Resuming elsewhere? Read [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md)** for decisions, user feedback, completed work, setup/MCP reconnection, reproducible inputs and the continuation plan. Source repository: [movie_idiots](https://github.com/dattaprasad-r-ekavade/movie_idiots). Generated media and machine-specific configuration are not included in Git.

**Prompt → film research + web-image collection → spoken Hinglish + shot plan → Hindi voice → image/evidence/kinetic animation → shot previews → FFmpeg MP4 + upload package.**

## Start now

Dependencies are installed. This machine has Node 22, FFmpeg/FFprobe, bundled PowerShell 7 and Hindi speech voices. The machine-local `.env` already selects the working executable paths, including the bundled PowerShell runtime. No API keys are required for the demo or Claude-through-MCP workflow.

```powershell
cd D:\Projects\video-editor
npm run dev
```

Open **http://127.0.0.1:3210**. Pick a film, direction and format. The local scaffold creates editable chapter placeholders. For a real AI-written script use Claude through MCP, local Ollama, or the optional Claude API.

The redesigned production is `projects/drishyam-review-v2`: six downloaded/inspected web images, 31 shots, original animated evidence boards, split screens, collages, moving image framing, kinetic words and a short channel sign-off. Free online Hindi speech supplies actual word-boundary captions. Original music/transition effects are synthesized locally. The first export was rejected as a slide deck; v2 changes the default production approach. See [the redesign notes](docs/video-redesign.md).

An older Hindi demo is rendered at `projects/studio-demo/exports/video.mp4`. Run `npm run doctor` to check local tools and voices.

## Make a video by prompting Codex or Claude

### Codex

The project `.codex/config.toml` registers the same local MCP server for Codex. Trusted projects load this configuration according to the [official Codex MCP documentation](https://learn.chatgpt.com/docs/extend/mcp?surface=cli). It is also registered in this machine's user configuration, verified with `codex mcp get movie-idiots-studio`. A new Codex session can use the registered production tools; an already-running chat can drive them through the local session bridge:

```powershell
node node_modules/tsx/dist/cli.mjs scripts/produce.ts --check
node node_modules/tsx/dist/cli.mjs scripts/produce.ts path/to/manifest.json --draft-only
node node_modules/tsx/dist/cli.mjs scripts/produce.ts --preview-only PROJECT-ID
node node_modules/tsx/dist/cli.mjs scripts/produce.ts --render-only PROJECT-ID
```

Codex authors the researched script itself, then the bridge calls the MCP tools for saving, local narration, previews and rendering. No OpenAI or Anthropic API key is required for that host-driven workflow.

For a complete v2 production, including web acquisition and online voice (only select `--edge` when online speech is wanted):

```powershell
python -m venv .venv
.venv/Scripts/python.exe -m pip install -r requirements-voice.txt
node node_modules/tsx/dist/cli.mjs scripts/produce.ts productions/drishyam-review-v2.json --assets productions/drishyam-remake-assets.json --edge --sound --draft-only
node node_modules/tsx/dist/cli.mjs scripts/produce.ts --render-only drishyam-review-v2
```

The assets file records reviewed image/source URLs, labels, attribution and actual rights status. Use `--procure-only` first to collect and inspect assets without rendering. `--discover SOURCE-URL` discovers images on an article; `--search-images "query"` searches Commons. These are also MCP tools and web studio controls. Source credit is recorded separately from permission/license status; the downloader does not claim to clear rights.

Scene `shots` select `full`, `split`, `collage`, `evidence`, `kinetic` or `waveform`, camera motion, framing, transitions, local image paths and optional short text. Shot lengths follow measured narration. `style:"essay"` retains the older layout when explicitly needed. Use the shot preview strip to inspect each cut and the full JSON editor to edit the shot plan. No persistent channel branding is added in cinematic mode.

### Claude

Start Claude in this folder:

```powershell
claude
```

The checked-in `.mcp.json` points to the local server. Enable/trust this project server in Claude if prompted, then check `/mcp`. This is a client-controlled first-use step. No global Claude settings have been changed. If moving the repository, update the two absolute paths in `.mcp.json`.

Example prompt:

> Use Movie Idiots Studio to make a 5-minute Hindi/Hinglish animated review of Andhadhun. Discuss how unreliable narration changes our view of the characters. Keep the main review spoiler-light, with a clearly marked ending section. Research factual details and cite sources. Write an original script, generate local Hindi narration, inspect scene previews, then render a draft for me.

Or use `/create-video Andhadhun review a Hindi/Hinglish analysis of unreliable narration`.

The host session writes the script using `planning_brief` and `write_project`, without an additional scripting API key. The server exposes 20 tools, a channel resource and a production prompt. This includes image search, page-image discovery, downloading and original sound design. Long voice/preview/render operations return a job ID; call `job_status` until complete. Jobs live in the same MCP process and stop when it exits.

Any local stdio MCP client can launch:

```json
{
  "command": "node",
  "args": [
    "D:/Projects/video-editor/node_modules/tsx/dist/cli.mjs",
    "D:/Projects/video-editor/src/mcp.ts"
  ]
}
```

## Studio workflow

1. Create a storyboard. Choose **review**, **revisit** or **Short**, language and target length. Add research notes/source URLs. Template mode is a scaffold; replace its placeholder narration.
2. Edit scene titles, narration, bullets, spoilers and visual directions. Full JSON editing also supports sources, description, tags and new scene IDs. Save the storyboard. Changing narration clears the old recording; regenerate or attach a new recording. The render preflight rejects audio longer than its scene to prevent cutting off the voice.
3. Generate **local Windows narration**. Hindi uses an installed `hi-IN` voice. Write Hindi in Devanagari, with English terms mixed naturally. Audio durations are measured with FFprobe. To select another installed voice, set `voice` in `config/channel.json`.
4. Import local images, clips or recorded narration with a source/credit note. Paste the returned relative path into a scene. For recorded voice, click **Measure narration** to set the duration.
5. Preview scene PNGs and the thumbnail, then render a draft. Revise after watching; final export uses 1920×1080 or 1080×1920 for Shorts, 30fps, H.264 yuv420p, AAC and fast-start MP4.
6. Optional music: import an audio file and paste its relative path into **Music asset**. FFmpeg lowers/ducks the bed under the voice and normalizes the final mix. The -16 LUFS setting is a normalization target, not a promise of measured loudness.

The studio runs only on localhost. Render jobs are serialized within each server. Use one operation per project at a time across separate studio, CLI and MCP processes. Existing media remains on disk; jobs are currently in memory.

## Files you get

`projects/<id>/exports/` contains:

| Output | Purpose |
|---|---|
| `video.mp4` / `draft.mp4` | Final or half-resolution draft |
| `thumbnail.png`, `<scene-id>.png` | Thumbnail and storyboard frames, from Preview |
| `script.md` | Narration and visual directions |
| `captions.srt`, `captions.vtt` | Edge word-boundary cues, otherwise estimated timing; check against audio |
| `youtube.txt` | Title, description, chapter drafts, tags and source links |
| `visual-prompts.json` | Scene prompts for external illustration/video generation |
| `input-props.json` | Props to paste/load in Remotion Studio |
| `qc.json` / `draft-qc.json` | Codec, pixel format, dimensions, duration and narration checks |

`projects/<id>/project.json` is the editable source. Media is in `public/projects/<id>/`. Imported-asset provenance is stored in `asset-credits.json`.

This version makes original motion graphics and animates imported imagery/video. It does not generate cartoon character performances or AI video shots from visual prompts. It does not upload to YouTube. Review film facts, asset permissions and the rendered video before publishing. Short scene timestamps need merging into valid YouTube chapters.

## Optional AI providers

Edit the existing `.env` to add only the services you want, preserving its executable paths; `.env` is ignored by Git. On a fresh machine use `.env.example`. Restart the studio/MCP server after editing it.

- **Ollama:** run a local Ollama server on `127.0.0.1:11434`, pull a model, and set `OLLAMA_MODEL` to its name. Select Ollama in the studio. It is not installed by this project. Script quality and generation time depend on your model/hardware.
- **Claude API:** set `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL` to a model available to your account, then select Claude API. This is separate API billing from a Claude session. The sample model follows the [current migration guide](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide).
- **ElevenLabs:** set `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID`, then select ElevenLabs for narration. The default multilingual model is configurable.

Only selected providers receive the prompt/narration. Keys remain server-side. No paid provider was called during setup or validation.

## CLI & timeline preview

```powershell
npm.cmd run video -- list
npm.cmd run video -- plan "Andhadhun" "Hindi/Hinglish review about unreliable narration"
npm.cmd run video -- write path/to/manifest.json
npm.cmd run video -- narrate PROJECT-ID
npm.cmd run video -- preview PROJECT-ID
npm.cmd run video -- render PROJECT-ID --draft
npm.cmd run video -- render PROJECT-ID
npm.cmd run video -- export PROJECT-ID
npm.cmd run video -- inspect PROJECT-ID
npm run studio
```

CLI `plan` defaults to scaffold without an API key; use MCP/studio for explicit provider selection. The Windows examples use `npm.cmd` to preserve flags such as `--draft` through PowerShell. Remotion Studio has a default sample composition; load your exported `input-props.json` in its props editor to preview a production. `npm.cmd run studio -- --props=projects/PROJECT-ID/exports/input-props.json` opens that production directly.

## Fresh-machine setup and troubleshooting

Install Node 22+, FFmpeg/FFprobe and PowerShell 7 on Windows, then run `npm ci`. Keep `FFMPEG_PATH`, `FFPROBE_PATH` and `POWERSHELL_PATH` configurable; absolute executable paths work. Remotion downloads its headless browser on first render. Local narration needs an installed voice for the chosen language; use recorded audio or ElevenLabs if none is available.

`npm run typecheck` and `npm test` validate the project and a real MCP stdio handshake. See `docs/validation.md` for the actual render evidence.

If startup reports a reserved/busy port, set `PORT` to another port in `.env`. Windows reserves 4111–4510 on this machine, so the default is 3210. `PORT=0` prints a dynamically assigned port. A missing Hindi voice under Windows PowerShell 5 can be fixed by using PowerShell 7 (`pwsh.exe`); this toolchain defaults to it.

Channel profile and future work: [channel notes](config/channel-research.md), [researched architecture and roadmap](docs/research-and-plan.md). Remotion's [current license](https://www.remotion.dev/docs/license) applies when using the renderer.
