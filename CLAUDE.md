# Movie Idiots production workflow

This repository is a local Hindi/Hinglish animation toolchain for @movieidiots5542. Read `README.md`, `config/channel.json`, and `docs/research-and-plan.md` for context. The project `.mcp.json` registers the `movie-idiots-studio` stdio server. All tool jobs are local to the process that created them.

When asked to make a video:

1. Read `channel_profile`. Get `planning_brief` with the film, direction, format, language, length and source notes.
2. Research the movie using your host search/browser tools when available. Preserve actual URLs in `sources`. Ask for notes if research is unavailable. Do not invent quotes, credits, plot details or statistics. Film opinions should be specific and original.
3. Procure visual assets before rendering: use host image search for film stills/posters, `discover_web_images` on verified source pages, or `search_images` for Commons results. Save chosen images with `download_image`, including actual source, creator/publication and rights status. Inspect each image and verify the film/year; label actor portraits and historical franchise stills. Write a valid `style:cinematic` manifest with a new shot every 2–5 seconds. Use full images, split screens, collages, animated evidence boards and short kinetic words. No repeated channel headers, scene counters, presentation bullets or long chapter cards. Natural spoken Hinglish; avoid formal translated phrases such as "मेरी कसौटी" and "हमारी पढ़त". Use the existing ID for revisions or a new ID for a separate version.
4. Generate local voice with `narrate_project` provider `windows`, user-selected free online voice with provider `edge`, or import recordings and measure them with `attach_narration`. Online narration sends the script to the speech service and needs user selection/authorization. Edge saves actual word-boundary cues. Narration generation updates each scene duration. Optional `create_sound_design` generates original quiet underscore and transition effects locally.
5. Call `preview_project`, then poll `job_status` until complete or failed. Inspect the exported PNGs using image tools. Adjust titles, scene content and layouts if needed. Use the preview input-props export in Remotion Studio for timeline inspection.
6. Render a draft via `render_project` with `draft:true`. Poll the job to completion, report the draft file and any technical warnings. Iterate on the requested feedback and render final when requested.
7. Return absolute output paths for MP4, thumbnail, script and metadata. Explain whether captions use actual speech-service cues or estimated timing. Do not say a movie review is fact-checked solely because technical QC passed.

Use template mode only for explicitly marked scaffolds. Claude can write scripts directly through MCP with no additional Anthropic API key. Paid providers are optional and should be used only when requested/configured for the production.

Implementation checks: `npm run typecheck`, `npm test`; for renderer changes, a short representative render as well. Frame timing must be deterministic (`useCurrentFrame`, `interpolate`, `spring`), never CSS animation, timers or randomness. Keep public media within the project's imported assets. Run one production operation per project at a time across CLI, studio and MCP.
