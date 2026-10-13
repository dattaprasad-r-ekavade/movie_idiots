---
name: final-short
description: Make the upload-ready final of a reviewed Short — ElevenLabs voice (paid), full render, sped-up copy, youtube.txt, and a row in docs/uploads.csv.
argument-hint: <slug> [--percent 15]
disable-model-invocation: true
---

Make the final for `$ARGUMENTS`. This spends ElevenLabs credits, so it only runs when the user invokes it.

1. **Preconditions.** The draft has been reviewed. `npm run short -- lint <slug>` has no errors. The script has `delivery.emotion` / `delivery.cues` where tone matters.
2. **Voice:** `npm run short -- voice <slug> --elevenlabs` (model from `ELEVENLABS_MODEL_ID`; v3/v4 get the emotion tags). Afterwards confirm no `[tag]` text reached `public/shorts/<slug>/voice/*.words.json`.
3. **Render:** `npm run short -- render <slug>`. This also writes `projects/shorts/<slug>/youtube.txt`.
4. **Speed copy:** `npm run short -- speed <slug> --percent <N>`. Default N is the latest the user asked for (15); use the argument if given. Output: `projects/shorts/<slug>/video-fast<N>.mp4`.
5. **Spot-check:** grab frames at 0.6 s (the hook image must be sharp) and at each word-anchored cut; check the headline and captions read correctly.
6. **Log it:** add a row to `docs/uploads.csv` (upload date blank until the user uploads; slug, title, length of the fast copy, format, whether the hook opens on a famous name, notes such as speed and palette). Update the status row in `docs/shorts-ideas.md`.
7. **Report:** absolute paths of the fast copy and `youtube.txt`, final length, that captions use real ElevenLabs word timings, and anything that still needs a listening check.
