# Claude, ChatGPT and Codex video tools: research and adoption plan

Checked **5 October 2026**. This expands the initial [research and architecture plan](research-and-plan.md). Read [the project handoff](../PROJECT_HANDOFF.md) for what Movie Idiots actually implements.

## Scope and evidence

The research covered creator accounts, project-maintained repositories, official product documentation and model cards. Creator accounts establish that someone reports using a workflow; they are not benchmarks of reliability, cost or audience engagement. Repository features below are documented capabilities, not integrations tested on our Windows machine. No new packages, external servers or paid providers were installed or invoked during this research.

Keep these three paths distinct:

- **Claude Code / Codex:** a coding agent writes editable animation code or calls local production tools; Remotion/FFmpeg renders the result. This fits our current repository.
- **ChatGPT / Claude through an MCP App:** the model calls a connected server and the chat displays an interactive video view. The server/player is a separate component that must be connected and reachable.
- **Generative video:** a model produces individual clips from text or images. Those clips still need scripting, narration, selection, editing and delivery. This is an optional asset provider, not a replacement for the whole movie-review pipeline.

These distinctions are the interpretation used in this document, rather than claims that one workflow is universally best.

## What creators and projects are using

| Example and primary source | Reported/documented workflow | What to take into Movie Idiots |
|---|---|---|
| [Claude + Remotion + Figma creator account](https://www.reddit.com/r/ClaudeCode/comments/1r748to/built_this_video_with_claude_remotion_figma_mcp/) | Script with a chatbot, manually design scenes in Figma, connect Figma MCP and Remotion guidance to Claude Code/Codex, then animate frames individually | Establish visual references before asking an agent to animate. A code generator alone does not supply visual taste. |
| [Codex editing with SAM3, MatAnyone and Remotion](https://www.reddit.com/r/ClaudeCode/comments/1r0btpu/i_edited_this_video_100_with_codex_workflow/) | Recorded footage → segmentation mask → tracked foreground matte → Remotion overlays behind/in front of the subject; storyboard JSON and word timestamps guide edits | Add depth through masks/layers where it serves the shot. Sample frames and iterate on visual output. The creator reports substantial setup/debugging time, not instant one-prompt production. |
| [mcp-use Remotion MCP App](https://github.com/mcp-use/remotion-mcp-app), [creator announcement](https://www.reddit.com/r/mcp/comments/1r8n5pq/we_created_an_mcp_app_to_create_videos_on_chatgpt/) | ChatGPT/Claude calls `create_video` with React files; the server compiles them and returns an inline Remotion Player. `update_video` replaces changed files in the mounted view | A chat-native preview is possible. Study the server/view separation before adding it to our toolchain; do not assume our existing stdio registration already supplies this UI. |
| [OpenMontage](https://github.com/calesthio/OpenMontage) | A coding assistant follows production stages, selects providers and renders with Remotion, FFmpeg or another supported runtime; inspectable artifacts and review gates accompany the plan | Its documented slideshow-risk checks directly match the user's complaint: repetition, weak motion, decorative visuals and typography overuse. Adapt those ideas to our manifests. |
| [OpenChatCut](https://github.com/0xsline/OpenChatCut) | Import media into a local multitrack editor; the agent reads project context and proposes timeline edits through MCP; preview, revise and export | Study an editable timeline and undoable draft edits as an alternative to manually editing shot JSON. External MCP draft-session tools have different capabilities from the full built-in editor. |
| [TerminalGravity/video-mcp](https://github.com/TerminalGravity/video-mcp) | Claude-driven Remotion rendering, draft analysis, voiceover, audio search and optional music services | Add an explicit analyze-and-revise stage. Its Gemini/Freesound/Mubert/ElevenLabs dependencies make it a reference architecture rather than our local default. |
| [techdou/remotion-video](https://github.com/techdou/remotion-video) | Agent skill → stdio MCP → service → SQLite-backed runs/providers/artifacts → speech and Remotion rendering; web console shows progress | Study worker leases, recovery, cancellation and artifact revisions for long revisits. The repo labels Edge as local, but the speech service is online; preserve our accurate provider labels. |

The earlier MushroomFleet and Cole Medin examples remain in [research-and-plan.md](research-and-plan.md). These findings add design-first, footage-compositing, chat-preview, timeline-editor and durable-production patterns rather than replacing that earlier research.

## Tool shortlist

**Status for every candidate below: researched, not added to Movie Idiots.** Existing Remotion, FFmpeg, Edge, Commons procurement and the 20-tool MCP server remain implemented. “Local” describes the processing path; software/model licenses and any optional remote dependencies still need checking when selecting an exact version. Cost labels are categories, not price quotes.

### Agent interfaces, design and editing

| Tool | Capability and connection | Cost/setup category | Recommendation |
|---|---|---|---|
| [Official Remotion Claude Code plugin](https://www.remotion.dev/docs/ai/claude-code-plugin) | Maintained Remotion project guidance and agent skills for writing/editing compositions | Local renderer; plugin/client setup; existing Remotion license applies | Evaluate official guidance before adding another custom animation instruction layer. Our renderer already uses Remotion. |
| [Remotion Studio WebMCP](https://www.remotion.dev/docs/ai/webmcp) | Inspect compositions, errors, outlines and playback; seek/play; optional transcription and background removal tools | Requires a supporting browser/agent and relevant optional packages | High priority for a visual feedback experiment. Docs list ChatGPT Codex support; tool schemas are not stable. Remotion 4.0.518 introduced WebMCP; our pinned 4.0.532 is newer, but compatibility has not been tested here. |
| [Figma MCP](https://developers.figma.com/docs/figma-mcp-server/) | Supplies frames, components and layout context to a code-writing agent | Figma account/client access; hosted or desktop connection | Optional visual planning for a small reusable scene kit. Manually reviewed reference frames are useful even without an integration. |
| [OpenChatCut](https://github.com/0xsline/OpenChatCut) | Local multitrack editor, transcript editing, motion graphics and external Streamable HTTP MCP | Desktop application; optional configured services; AGPL-3.0-or-later | Evaluate separately with a sample production before deciding whether to integrate or exchange projects. Do not replace our working pipeline on README claims alone. |
| [mcp-use/remotion-mcp-app](https://github.com/mcp-use/remotion-mcp-app) | Chat-visible player plus server compilation/editing tools | Separate server/view; deployment or compatible local host | Best reference for an optional chat-native preview layer. Current README setup menus/plan claims must be checked against current client docs. |
| [OpenMontage](https://github.com/calesthio/OpenMontage) | Production orchestration, provider selection and documented visual/self-review rules | Local orchestration, optional service costs; AGPL-3.0 | Study concepts and interfaces. Keep our focused manifest workflow; avoid absorbing a large framework before a successful pilot. |
| [TerminalGravity/video-mcp](https://github.com/TerminalGravity/video-mcp) | Video analysis, speech/audio search/music and Remotion tools | Primarily service-backed capabilities with provider keys | Reference for optional analysis/audio adapters, not a mandatory dependency. |
| [techdou/remotion-video](https://github.com/techdou/remotion-video) | SQLite run persistence, worker leases, cancellation and artifact versioning | Local Node/Python service; configurable speech providers; MIT | Reference for the persistence milestone, especially recovery after interrupted long renders. |

### Narration, captions and source footage

| Tool | Capability | Cost/setup category | Recommendation |
|---|---|---|---|
| [AI4Bharat Indic Parler-TTS](https://huggingface.co/ai4bharat/indic-parler-tts) | Local Hindi/English speech with descriptive voice/style prompts and named Hindi speakers | PyTorch/model download; CPU or GPU inference | First local neural voice candidate. Benchmark mixed Hindi/English, film names, jokes and emphasis; language support does not prove natural Hinglish. |
| [AI4Bharat IndicF5](https://github.com/AI4Bharat/IndicF5) | Hindi speech conditioned on reference audio and its transcript | Separate Python/model environment and an appropriate reference recording | Second local voice candidate when a consistent critic voice is needed. Use a reference recording the user supplies/has permission to use. |
| [WhisperX](https://github.com/m-bain/whisperX) | Transcription, forced alignment and word timestamps; optional diarization | Local model downloads, CPU/GPU; language-specific alignment models | Add real cues for imported/Windows/local-neural recordings. Test Hindi/English switching and unaligned words; preserve existing Edge cues when valid. |
| [faster-whisper](https://github.com/SYSTRAN/faster-whisper) | Whisper inference through CTranslate2 with CPU/GPU quantization | Local Python/model downloads | Lightweight transcription alternative/backend when full forced alignment is unnecessary. Measure speed and transcript accuracy on this machine rather than repeating repository benchmark numbers. |
| [PySceneDetect](https://www.scenedetect.com/) | Detect shot boundaries and split source videos using FFmpeg | Local Python/OpenCV/FFmpeg | High-value candidate for a revisit: make a contact sheet and searchable shot list from authorized source footage. Cut detection does not understand the film or select meaningful evidence by itself. |
| [Auto-Editor](https://auto-editor.com/) | Rule-based edits using loudness, motion or subtitles | CLI or app; media analysis | Useful for recorded voice/footage cleanup. Keep intentional pauses and jokes; preview the result rather than applying silence removal blindly. |

### Original animation, depth and generated shots

| Tool | Capability | Cost/setup category | Recommendation |
|---|---|---|---|
| [ComfyUI API workflow example](https://github.com/Comfy-Org/ComfyUI/blob/master/script_examples/basic_api_example.py) + [official Wan2.2 video workflows](https://docs.comfy.org/tutorials/video/wan/wan2_2) | Queue saved workflow JSON; optional local text-to-video/image-to-video asset generation | Model downloads and GPU-dependent runtime; optional API nodes may use paid services | Evaluate after identifying the GPU and one concrete missing shot. Save model/workflow versions, seeds and outputs. The 5B workflow is an entry candidate; do not promise usable speed before benchmarking. |
| [MCP for Blender](https://github.com/ahujasid/mcp-for-blender) | Agent controls Blender objects, materials, scene inspection and Python operations through an addon/server | Blender + Python/uv; optional remote asset/model services | For original 3D sets, props or camera moves that cannot be expressed well in our 2D scene kit. Current project/package name is `mcp-for-blender`; older `blender-mcp` links redirect. |
| [Manim Community](https://docs.manim.community/en/stable/tutorials/quickstart.html) | Python scene code renders deterministic animated objects and transformations | Local Python/renderer dependencies | Useful for explanatory timelines/relationships. Start with our existing SVG/React diagrams; add Manim only when a specific shot benefits. |
| [SAM3](https://github.com/facebookresearch/sam3) + [MatAnyone](https://pq-yang.github.io/projects/MatAnyone/) | Segmentation and target-assigned foreground matting for layered footage | Model/compute setup; potentially GPU-heavy | Experimental depth/occlusion path inspired by the Codex creator case. Compare with simpler still cutouts or Studio background removal first. |
| [OpenAI Sora video API](https://developers.openai.com/api/docs/guides/video-generation) | Asynchronous prompt/reference-based video jobs and downloadable clips | Optional API account/key and generation cost | Only for suitable original inserts. Current API restrictions include public-figure generation and human-face reference inputs, so it is not a straightforward way to animate actor publicity stills. |
| [fal asynchronous inference](https://fal.ai/docs/documentation/model-apis/inference/queue) | Provider jobs with persisted request IDs, status, result retrieval, cancellation and webhooks | Optional hosted model/compute costs | Alternative provider adapter if needed. Choose and verify an exact endpoint, permissions and cost before use; the queue API alone does not establish any model's quality. |

## ChatGPT connection options for this repository

Our current server is **local stdio** and is already driven by Codex/Claude Code or `scripts/produce.ts`. The studio website itself is not an MCP endpoint. For chat-native use, current official documentation describes two connection paths:

1. A reachable **HTTPS Streamable HTTP MCP endpoint**, typically `/mcp`, registered in the client's developer mode. This would require a separate authenticated transport/deployment for our tools. See [OpenAI's connection/testing guide](https://developers.openai.com/plugins/deploy/connect-chatgpt).
2. **Secure MCP Tunnel** to a private stdio or HTTP server, with a running `tunnel-client`, tunnel configuration, runtime API key and appropriate workspace/platform permissions. This is a potential private connection path; it has not been set up for Movie Idiots. See [official tunnel documentation](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels).

An inline player is a further UI layer, not something automatically created by either transport. The mcp-use example demonstrates that layer. Account/workspace availability needs checking during setup. Keep local Codex/Claude as the default until there is a concrete need to produce videos inside a ChatGPT chat.

## Recommended adoption order for Movie Idiots

These are proposed changes, **not completed implementation or an authorization to spend on services**.

| Priority | Proposed work | Reason and acceptance check |
|---|---|---|
| 1 | Visual review artifacts + shot-intent fields | Export a contact sheet and short motion samples; flag repeated assets, long unchanged shots and overused text layouts. Each shot should explain what it contributes to the spoken critique. Review these indicators alongside the draft; they cannot score entertainment objectively. |
| 2 | Narration-driven edit events | Trigger a reveal, annotation, relationship change or cut at a specific word cue, not only at scene boundaries. Preserve deterministic frame timing and verify against audio. |
| 3 | Local Hindi voice comparison | Run the same 30–45 second critic passage through Windows, existing Edge and Indic Parler; evaluate IndicF5 if reference-based voice is wanted. Record pronunciation, expressiveness, inference time and hardware. Select by listening. |
| 4 | Imported-recording alignment | Add WhisperX/faster-whisper adapters that write our existing cue schema. Test Hindi, English terms, silence and unaligned words before using captions in a full revisit. |
| 5 | Source-shot catalog | PySceneDetect → contact sheet → source/timecode ledger → selected FFmpeg clips. Check authorized footage, correct film/year, representative shot boundaries and actual relevance. |
| 6 | Studio visual feedback and design kit | Trial Remotion WebMCP on our pinned version. Build three reference sequences: a confrontation, an evidence reveal and a timeline. Figma can be an optional planning source. |
| 7 | Durable runs and editor usability | Add SQLite jobs/artifact revisions, cross-process locking, cancellation and recovery; study the two editor/service references. Add shot controls before considering a wholesale editor replacement. |
| 8 | One optional generation/depth adapter | Choose ComfyUI, Blender, matting or a hosted video provider for one concrete shot. Measure quality, consistency, speed and cost. Continue importing its result through the asset ledger. |
| 9 | Optional ChatGPT integration | Evaluate private tunnel versus authenticated HTTP transport; add chat preview only when the production workflow is dependable. |

Priority 1–2 addresses the user's “PowerPoint” criticism directly. More integrations alone will not fix weak criticism, repetitive visuals or unnatural narration. Keep the remake-feedback step in the handoff ahead of another full-length production.

## Proposed MCP additions and artifacts

The following names are design proposals. They are **not** in the current 20-tool server.

| Proposed tool | Inputs and outputs |
|---|---|
| `review_storyboard` | Existing project → shot duration/repetition/text-layout indicators and editorial questions, without a fabricated audience score |
| `preview_motion` | Project + shot IDs → short low-resolution motion excerpts and contact sheet |
| `align_narration` | Imported recording + language/settings → actual word cues with model/version and unaligned-word report |
| `catalog_source_video` | Imported authorized video → shot timecodes, thumbnails and source-linked catalog |
| `generate_visual_asset` | Explicit provider/workflow + shot brief → job ID, generated local asset and provenance/settings |

Extend manifests with optional shot intent and word-triggered events rather than forcing a new format. Keep separately named source media, generated inserts and historical franchise stills in the asset ledger. Persist provider request IDs, input hashes, model/workflow version, costs when available and selected output revisions. Existing measured narration timing and source/rights records should remain authoritative.

## First evaluation sprint

Use a **30–45 second review sequence**, not another long final export:

1. Rewrite one specific critique in natural Hinglish and agree on the intended visual progression from the narration.
2. Collect enough relevant, inspected imagery to avoid filling the sequence with repeated portraits.
3. Create approximately eight purposeful shots, including a narration-triggered evidence reveal or relationship change; derive timing from recorded cues.
4. Export the contact sheet plus motion excerpt, listen to the narration and inspect the full edit.
5. Record the user's response and production time. Only then decide whether local neural voice, source-video catalogs, depth or generation adapters justify integration.

No deployment, new MCP client registration, package upgrade, model download or paid generation is part of this documentation-only research update.
