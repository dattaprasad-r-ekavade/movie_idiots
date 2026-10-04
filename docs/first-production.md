# First researched video

Production: `drishyam-conclusion-review-20261005`, authored in `productions/drishyam-conclusion-review-20261005.json`.

The user requested a recent movie and Hindi/Hinglish conversational criticism, using local tools. The selected film is the Hindi **Drishyam: The Conclusion**, released on 2 October 2026. The narration explicitly identifies its published-review basis; it does not claim a screening experience. Its conclusion combines attributed critical observations with clearly marked interpretation. There are no final-twist disclosures or film clips.

The manifest links NDTV (Saibal Chatterjee), Indian Express (Shubhra Gupta), Mint (Udita Jhunjhunwala), and The Hollywood Reporter India. The script paraphrases limited observations about performances, moral tension, plotting and sound. It includes no copied review passages or dialogue quotations. See the manifest and exported YouTube description for the exact URLs and attribution.

## Production evidence

Codex authored the script and used `scripts/produce.ts`, a real MCP SDK client connected over stdio to this project's server. The session discovered 16 tools, retrieved the channel profile/planning brief, wrote the manifest, then called narration, preview and render tools. Job polling kept that MCP process alive through each operation. No OpenAI, Anthropic or ElevenLabs API was called.

The Windows Hindi voice produced nine narration files. Measured narration updates scene durations; the resulting timeline is **185.033333 seconds** at 30fps. Original deterministic vector animation includes a chess knight, evidence folder/magnifier, scales and a waveform. Scene previews were visually inspected. The thumbnail was regenerated without captions after correcting how resolved Remotion props are passed to still rendering.

The 960×540 draft passed container/codec/duration checks and loaded in the local studio's browser video player with no media error. FFmpeg measured its integrated loudness at **−15.96 LUFS**, true peak **−1.55 dBTP**, and loudness range **2.90 LU**. This measurement does not assess pronunciation or editorial quality.

The final **1920×1080**, 30fps H.264/yuv420p + AAC export also passed QC and a complete FFmpeg decode with `-xerror`. Its file size is 13,644,052 bytes. The browser player reported 1920×1080, 185.033333 seconds, ready state 4 and no media error. Final loudness measurement matched the draft. The studio's output state is captured in `docs/first-production-preview.png`. All nine implementation tests and TypeScript checking passed after the production changes.

Reproduce the source production:

```powershell
node node_modules/tsx/dist/cli.mjs scripts/produce.ts productions/drishyam-conclusion-review-20261005.json --draft-only
node node_modules/tsx/dist/cli.mjs scripts/produce.ts --preview-only drishyam-conclusion-review-20261005
node node_modules/tsx/dist/cli.mjs scripts/produce.ts --render-only drishyam-conclusion-review-20261005
```

Outputs are in `projects/drishyam-conclusion-review-20261005/exports`: `video.mp4` (final), `draft.mp4`, `thumbnail.png`, nine scene PNGs, `script.md`, `youtube.txt`, `captions.srt`, `captions.vtt`, `input-props.json`, and QC reports. Captions divide each recording into estimated word chunks; they are not word-aligned transcription. The package is local; it has not been uploaded to YouTube.
