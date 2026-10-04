# Research and implementation plan

Research checked 4–5 October 2026. The implementation follows creator-owned examples and official technical documentation. Channel observations are in `config/channel-research.md`.

**Current handoff:** `../PROJECT_HANDOFF.md` consolidates decisions, the rejected first video, the delivered cinematic remake, reproducible setup and the updated continuation plan. The initial roadmap below is preserved with completed upgrades identified.

## What people have built with Claude

[MushroomFleet's documented Claude + Remotion session](https://github.com/MushroomFleet/Remotion-Claude-Code/blob/main/CLAUDE_CODE_VIDEO_TUTORIAL.md) shows natural-language creation of a short animated composition, preview-driven refinements, and fixing frame interpolation errors before exporting. The useful pattern is a preview loop with deterministic animation timing. This toolchain adds scene manifests and sampled PNGs so the loop is repeatable across essays.

[Cole Medin's workflow demonstration](https://www.youtube.com/watch?v=vhbaZJtW2Hg) describes an article-to-video pipeline with scene planning, narration/music, Remotion composition, quality checks and rendering. This is the creator's description, not an independently reproduced benchmark. We adopt the stages and isolate paid voice/music integrations so the local workflow remains usable.

[Remotion's official coding-agent workflow](https://www.remotion.dev/docs/ai/coding-agents) uses prompting and a preview environment to create programmatic video. Its [agent guidance](https://www.remotion.dev/docs/ai/skills) covers composition, timing, animation, media and rendering. Here the model generates a validated storyboard rather than unrestricted executable scene code for each prompt; the shared React renderer controls the final layout.

## Decisions for this channel

| Stage | Implemented tool | Why |
|---|---|---|
| Direction + research | Host Claude session + source notes/URLs | Keep factual film details and opinions traceable; no separate scripting key required through MCP |
| Script + storyboard | JSON manifest, review/revisit/Short structures | Editable scenes, spoilers, narration, visual prompts and metadata |
| Optional direct AI | Claude Messages API or local Ollama | One prompt in the studio when a provider is configured |
| Local voice | Windows Hindi speech via PowerShell 7 | Installed Hindi voices; measured durations rather than assumed reading speed |
| Optional premium voice | ElevenLabs multilingual API | User-supplied voice ID and key |
| Animation | Remotion / React | Cinematic shot plans, sourced images, animated evidence boards, splits, collages and kinetic words; older essay style remains optional |
| Web assets | Commons search, article-image discovery and validated downloads | Inspect relevant imagery and preserve source, labels, credit and rights status |
| Optional free online voice | Edge Hindi speech | User-selected online narration with actual word-boundary captions |
| Media work | FFmpeg / FFprobe | Clip trimming, duration checks, audio normalization, music ducking, YouTube MP4 export |
| Review | Per-shot/scene PNG previews, thumbnail, draft MP4 | Catch visual/timing problems before a long final render |
| Delivery | MP4 + SRT/VTT + script + metadata | Edge word cues or estimated timing for other recordings |
| Agent integration | Local stdio MCP server | Standard tools for planning, media, jobs, previews and export |

Technical references: [renderMedia API](https://www.remotion.dev/docs/renderer/render-media), [FFmpeg filters](https://ffmpeg.org/ffmpeg-filters.html), [MCP SDK server](https://ts.sdk.modelcontextprotocol.io/server), [Claude MCP setup](https://code.claude.com/docs/en/mcp), [Claude Messages](https://platform.claude.com/docs/en/api/messages/create), [ElevenLabs speech API](https://elevenlabs.io/docs/api-reference/text-to-speech/convert). The project uses the installed v1 MCP SDK line and its documented stdio transport.

## Working first version

Implemented: local studio, CLI, MCP server, channel profile, script brief, three formats, optional Claude/Ollama script generation, original animations, local/premium narration, imported assets, clip trims, scene duration measurement, music mix/ducking, captions, thumbnails, draft/final renders and technical QC. Tested with an original Hindi demo; provider calls needing keys were not invoked.

The default template provider creates clearly marked placeholders. It does not pretend to know the film. For real prompt-to-review generation, use Claude through MCP, a configured Ollama model, or the optional Claude API.

## Next upgrades, in order

1. **Editorial pilot:** the first researched export was rejected and a 2:22 cinematic remake was delivered. Get creative feedback on the remake, then make one researched 5-minute review and one 10–15 minute revisit; establish pacing, on-screen Hindi/English balance, critique style and spoiler transitions.
2. **Better local narration and accurate captions:** free online Hindi narration with actual word boundaries is implemented. Still benchmark a local neural Hindi voice against the installed voice, and add a local Whisper alignment stage for recordings without cues. Those fallback captions remain estimates.
3. **Richer scene library:** relationship diagrams, story timelines, shot-analysis annotations, animated illustrated sets, reusable characters, more vertical layouts. Today this is animated essay production, not a text-to-cartoon model.
4. **Visual generation adapters:** optional image/video APIs or local ComfyUI, with explicit costs and imported assets. Current visual prompts are exported for use with another generation tool; no hidden paid generation occurs.
5. **Production resilience:** persistent job database, resumable scene renders, cancellation, per-project locking across studio/MCP processes, render caching and disk cleanup. Current queues are process-local and stop when the server exits.
6. **Publishing:** a separate upload integration once the production style is settled. Current exports are local and are not uploaded automatically.

Check [Remotion's current license](https://www.remotion.dev/docs/license) when changing team/commercial use. For film clips and music, keep the asset source notes and make an editorial rights assessment for each upload; there is no universal safe clip duration. Generated essays still need a factual and creative review.
