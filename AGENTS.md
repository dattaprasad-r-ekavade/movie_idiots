# Movie Idiots Studio

When resuming work, read PROJECT_HANDOFF.md first for the user's decisions, rejected first export, delivered remake, machine setup and outstanding plan.

**Creative rule:** generated exports (the first slide-deck video and the cinematic remake) are pitfalls to avoid, not a bible to follow. Do not clone `style:cinematic` stills, Ken Burns posters, template splits/evidence boards/kinetic type, or TTS-over-stills as house style. The user wants to avoid that video type. Positive picture reference is an actual edit (channel edits, parodies, mashups), with commentary on top when the format needs it.

For video production requests, follow the production workflow in CLAUDE.md. Codex can author scripts directly and use the `movie-idiots-studio` MCP server; no separate API key is needed for the host-driven workflow.

Read the channel profile and planning brief, research film facts, save an original Hindi/Hinglish manifest with source links, generate local narration, inspect scene previews, render and check a draft, then deliver the requested export. Clearly distinguish research-based analysis from first-hand viewing. Do not fabricate screening experiences, quotes, plot details or audience statistics.

The first export was rejected as a lazy slide deck with unnatural Hindi. The remake kept the generated stills-essay grammar; treat it as a pitfall, not a template. Spoken Hinglish still applies. Picture must be an actual edit of footage/selects, with graphics as support. Image search/download tools remain available for reference stills and labels (correct film/year, provenance). Do not plan a video as “cinematic layouts every 2–5 seconds over posters.” No persistent channel name, chapter bullets or scene counters. One short channel sign-off is enough. Keep voice-provider selection explicit. Edge and ElevenLabs supply word-boundary captions; Windows remains the local option.

If a running session cannot load newly configured tools, `scripts/produce.ts` is a real MCP client bridge. Its `--check` mode verifies connection; a manifest path produces narration/previews/draft; `--draft-only` stops there; `--render-only PROJECT-ID` renders the final version of an existing narrated project.

For source changes run `npm run typecheck` and `npm test`. Verify renderer changes with representative scene previews and a render. Do not invoke paid providers unless requested/configured for the production. Keep one operation per project at a time.
