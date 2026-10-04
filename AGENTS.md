# Movie Idiots Studio

When resuming work, read PROJECT_HANDOFF.md first for the user's decisions, rejected first export, delivered remake, machine setup and outstanding plan. The remake has not yet received creative approval from the user.

For video production requests, follow the production workflow in CLAUDE.md. Codex can author scripts directly and use the `movie-idiots-studio` MCP server; no separate API key is needed for the host-driven workflow.

Read the channel profile and planning brief, research film facts, save an original Hindi/Hinglish manifest with source links, generate local narration, inspect scene previews, render and check a draft, then deliver the requested export. Clearly distinguish research-based analysis from first-hand viewing. Do not fabricate screening experiences, quotes, plot details or audience statistics.

The first export was rejected by the user as a lazy slide deck with unnatural Hindi. Future videos must use spoken Hinglish and an actual visual edit: collect relevant web images with `search_images`/host image search, `discover_web_images`, and `download_image`; inspect and label the correct film/year; plan multiple 2–5 second shots per narration segment; use `style:cinematic`, vary layouts and animate story elements. No persistent channel name, chapter bullets or scene counters. One short channel sign-off is enough. Free online Hindi narration is authorized for the remake; keep provider selection explicit for other productions. Edge supplies word-boundary captions; Windows remains the local option.

If a running session cannot load newly configured tools, `scripts/produce.ts` is a real MCP client bridge. Its `--check` mode verifies connection; a manifest path produces narration/previews/draft; `--draft-only` stops there; `--render-only PROJECT-ID` renders the final version of an existing narrated project.

For source changes run `npm run typecheck` and `npm test`. Verify renderer changes with representative scene previews and a render. Do not invoke paid providers unless requested/configured for the production. Keep one operation per project at a time.
