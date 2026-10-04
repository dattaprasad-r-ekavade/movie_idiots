# Validation evidence

Validated locally on 5 October 2026 (Asia/Calcutta).

**Current production approach:** the first export was rejected by the user for visual/script quality. The redesigned `drishyam-review-v2` uses six sourced web images, 31 shots, free online Hindi narration with word-boundary captions, and original music/effects. The 2:22, 1920×1080 final passed QC, complete decode and browser playback checks. Twelve tests and TypeScript checking passed. See `docs/video-redesign.md`; older evidence below describes the earlier implementation and exports.

- Node v22.17.1; FFmpeg and FFprobe 9.0.1; Remotion 4.0.532; MCP SDK 1.32.0.
- `npm install` completed with zero reported package vulnerabilities at setup.
- `npm run typecheck`: passed.
- `npm test`: nine checks passed, including stale-recording invalidation after script edits and a real MCP stdio client listing tools, writing a Hindi manifest, reading the channel resource, and receiving an error for an invalid manifest.
- HTTP verification covered serving the studio, rejecting foreign origins, refusing manifest ID rewrites and validating asset import requests.
- Browser verification covered creating a storyboard, updating a scene title, saving it, opening an existing rendered production and viewing the scene previews/output controls.

## Rendered examples

**Landscape Hindi/Hinglish demo:** `projects/studio-demo/exports/video.mp4`, 32.133333 seconds, 1920×1080, 30fps, H.264 yuv420p, AAC audio. Four scenes, locally generated Hindi voice, animated text/film reel, estimated captions, PNG previews and thumbnail. FFmpeg post-processing and final QC passed. The pixel-format check caught a full-range intermediate export; the final pipeline converts to limited-range yuv420p before saving.

**Vertical Short draft:** `projects/short-demo/exports/draft.mp4`, 8.666667 seconds, 540×960 (half-resolution 1080×1920 preset), H.264 yuv420p, AAC. Imported original local voice, generated low-level tone bed for verifying the mix/ducking path, Devanagari on-screen title, PNG/thumbnail export and QC passed. This tone is a test signal, not production music.

Installed local Hindi voices include Microsoft Hemant and Microsoft Kalpana. The successful demo uses PowerShell 7 to access them; Windows PowerShell 5 did not expose them in the initial narration test. The machine `.env` records the working bundled runtime path.

The first studio port, 4310, falls in a Windows excluded TCP range (4111–4510). The shipped default is 3210, verified in the browser. Startup errors are now reported instead of announcing a server after a failed bind.

## Scope of the checks

**First researched production:** `projects/drishyam-conclusion-review-20261005/exports/video.mp4`, 185.033333 seconds, 1920×1080, 30fps, H.264 yuv420p + AAC. Real MCP-driven save/narration/preview/draft/final workflow completed. Final QC, complete decode and browser media loading passed. Measured loudness: −15.96 LUFS, −1.55 dBTP. See `docs/first-production.md` for sources, editorial basis and reproducible commands.

Technical QC checks container duration, video/audio codecs, pixel format, resolution and missing narration. It does not assess editorial quality, factual accuracy, copyright status, actual measured loudness, or word-level subtitle alignment. Captions are estimated from scene narration and measured segment length. No paid Claude/ElevenLabs API was called; the optional provider integrations and local Ollama generation still need a configured service for live validation.

Jobs are serialized per server process and stored in memory. Restarting a server loses its pending job records. Do not edit/render the same production from multiple processes at once. The sample videos and saved storyboards are local outputs; no YouTube upload was performed.
