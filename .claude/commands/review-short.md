---
description: Review and fix a Short's Hinglish script (grammar, tone) and its visual design before voicing or rendering
argument-hint: <slug> [notes]
---

Review the Short `$ARGUMENTS` in `src/collage/shorts/<slug>/script.ts`, fix what fails, and report what changed. Follow CLAUDE.md and `docs/collage-shorts.md` ("Script and design review").

## 1. Automated checks

```bash
npm run short -- lint <slug>     # structure, sources, grammar, honorific, stills ledger, static beats
npm run short -- say <slug>      # Devanagari the voice will read; fix every [guessing: …]
```

Treat every warning as a question to answer, not noise. Errors block `render`.

## 2. Read the script aloud (grammar and tone)

Read each line's `text` out loud as a friend would say it, then check:

- **Full spoken sentences.** Each fact needs a Hindi verb: "खुद direct की, और तीन साल training ली", not "खुद directed. तीन साल training." Year-first openers ("1991, Prahaar.") are fine when a full sentence follows.
- **English verbs take a Hindi helper on the stem:** "direct की", "launch किया", "inspired थी". Never a bare "directed" or "launched".
- **Collocations that make sense in Hindi.** "सूखे से परेशान farmers", not "सूखे farmers" (dry farmers). If a word-for-word translation of the `en` line sounds odd, rewrite the idea.
- **Respect.** Speak of real people, especially elders and anyone recently deceased, in the plural: "गए थे", "करते थे", "उन्होंने". Set `export const honorific = true` in the script so lint enforces it.
- **Hinglish, not textbook Hindi.** Lint flags formal words; also avoid translated phrases ("मेरी कसौटी").
- **Unambiguous.** "पहले film के लिए…" can read as "first film". Reorder until there is one reading.
- **Claims still match `sources`.** Rewording must not add a number, quote or detail the source does not say.
- **Hook ≤ 10 words, loop echoes the hook**, and the loop flows into the hook on replay.

Update the `en` line too when the meaning changes.

## 3. Look at the picture (design)

```bash
npm run short -- stills <slug>   # contact sheets → projects/shorts/<slug>/sheet-*.jpg (0.5 s apart)
```

Open every sheet and fail the draft if:

- **One picture with nothing changing for more than ~3 s.** Add a `cuts` print on a spoken word (`replace: true` swaps it), a `pop` stamp, or a `reveal` headline.
- **Small print with empty space around it.** Prints should be ~860–980 px wide; set `width`/`aspect` on the still.
- **The hook face is blurred or unreadable.** Use `hook.blur: 0` unless the payoff reveal depends on it.
- **The tag's film/year doesn't match the photo.** Look at signage, captions and the ledger label. Drop the year if unsure.
- **Headlines repeat the caption** instead of adding a label, name or number.
- **Something overlaps** (mascot over a print, a print over captions, text in the bottom ~380 px or the right-edge Shorts UI).
- **Tone mismatch.** No cartoon mascot reaction on a tribute or tragedy.
- **A still is not in `stills.json`.** Download it with `npm run short -- still` so source, credit and rights are recorded.

Contact sheets can drop or duplicate a frame when tiled. Before calling a frame empty, check the matching `projects/shorts/<slug>/stills/element-NN.jpeg`.

## 4. Re-voice and verify

When `text` changed, re-voice with the provider the Short already uses, or the one the user names. Do not use paid voices unless asked. Then run `npm run short -- render <slug> --draft`, spot-check frames at the word-anchored cuts, and run `npm run typecheck` and `npm test` if code changed.

Report a before/after table of changed lines, the design changes, and anything left for the user to decide.
