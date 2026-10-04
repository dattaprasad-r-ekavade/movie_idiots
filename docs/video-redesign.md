# Redesign after the rejected first export

The first video was rejected for an unnatural Hindi script, near-static presentation graphics and repeated channel branding. Passing technical checks was insufficient: the visual edit and writing needed to change.

## What the new pipeline actually does

- **Research and collect images.** Host web image search locates film stills/posters. MCP `discover_web_images` finds raster candidates on a verified source page; `search_images` queries Wikimedia Commons with creator/license metadata; `download_image` downloads and decodes the selected image, records its dimensions and keeps source, credit, label and rights status. HTML/tracking pixels/logos are excluded from discovery. Source credit does not imply a license.
- **Plan shots around speech.** Each narration segment has multiple weighted shots; their frame boundaries follow the measured recording exactly. Full images, split-screen confrontations, entering collages, animated evidence-board connections, kinetic words and an animated waveform have different visual roles. Camera framing changes within each shot. No persistent channel name, slide bullets, scene counter or chapter header is added in cinematic mode.
- **Write spoken Hinglish.** The channel profile, planning prompt and repository instructions discourage formal translated phrases. The remake uses short everyday sentences rather than an essay. It states the published-review basis once and uses image labels/metadata for supporting attribution.
- **Use the selected voice.** The user authorized free online Hindi speech for this remake. `edge-tts` produces the narration and actual word boundaries; captions group those boundaries into short phrases. Windows narration remains available locally. No paid API was called.
- **Add original sound.** A local Python synthesizer writes a quiet minor-key underscore, whoosh and hit effects, without third-party samples. Transitions trigger brief effects; FFmpeg loops and ducks the bed against the narration, then normalizes the mix.
- **Inspect the edit.** Preview exports every shot as well as scene/thumbnail images. The studio shows a shot strip and exposes the web-image workflow. Full JSON remains available for camera, layout and shot edits.

## Remake inputs

`productions/drishyam-review-v2.json` is the authored script and 31-shot plan. `productions/drishyam-remake-assets.json` contains six image requests. The retrieved images were viewed before use: two publicity/review images for Drishyam: The Conclusion, three older franchise stills and a Jaideep Ahlawat actor portrait. Older images/portraits are labelled, not presented as new-film scenes. Copyright/permission status is preserved in the asset ledger and export metadata.

The movie analysis uses the previously retrieved NDTV, Indian Express and Mint reviews, linked in the manifest. It does not claim a first-hand screening. This remains a research-based critical edit.

## Verification

TypeScript checking and twelve tests passed, including actual MCP tool discovery, stale-recording handling, exact shot frame allocation, leading-silence/word-boundary caption export, cue validation and rejection of private-network procurement URLs. Live MCP search returned Commons candidates with attribution/licenses; live source-page discovery and six image downloads succeeded. The studio's page-image discovery displayed candidates and the 31-shot preview files were exported.

The narrated timeline is 142.333333 seconds. The 960×540 draft and 1920×1080 final passed codec/duration checks. The final file is 63,762,348 bytes, 30fps H.264/yuv420p + AAC, and a complete FFmpeg decode with `-xerror` succeeded. Final mix measurement: −16.28 LUFS integrated, −3.44 dBTP true peak, 5.70 LU range. Output files and final QC are stored in `projects/drishyam-review-v2/exports`. These checks do not rate entertainment value or turn unverified publicity images into licensed assets.

The studio's final player loaded the exported video at 1920×1080, 142.333333 seconds, with no media error. The selected evidence-board shot and shot strip are captured in `docs/remake-studio-preview.png`. Live page discovery after filtering returned the relevant film image without tracking pixels/logos or duplicate resize variants.

The implementation uses the [MediaWiki Imageinfo API](https://www.mediawiki.org/wiki/API:Imageinfo), documented [TMDb image URL structure](https://developer.themoviedb.org/docs/image-basics), and the [edge-tts project](https://github.com/rany2/edge-tts).
