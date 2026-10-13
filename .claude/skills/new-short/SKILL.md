---
name: new-short
description: Scaffold a new v2 fun-facts YouTube Short from an idea in docs/shorts-ideas.md (script.ts, registration, sourced stills, lint, Edge draft voice, draft render, contact-sheet review). Use when the user asks to make, build or start the next Short.
argument-hint: <slug> [notes]
---

Build the Short `$ARGUMENTS` end to end as a **draft**. Read first: CLAUDE.md, `docs/collage-shorts.md` ("Fun-facts format", "Design v2", "Script and design review"), the idea's section in `docs/shorts-ideas.md` (facts, sources, **Lock before use**), and the reference Short `src/collage/shorts/mr-india/script.ts` (v2 plan, honorific, emotion directions).

## 1. Facts
- Re-open every source URL in the idea (WebFetch, or the `agent-reach` skill). Anything under "Lock before use" needs a second source or must be softened ("कहा जाता है", "reportedly") or dropped.
- Record each URL with a one-line note in `sources`. No invented numbers, quotes or credits.

## 2. Script (`src/collage/shorts/<slug>/script.ts`)
- Hook ≤ 10 words opening on a famous film/star/character; **3 facts max, no promise line**, payoff, loop that echoes the hook. Target 28–40 s.
- Natural Hinglish, full sentences with Hindi verbs; `en` line for every line; `honorific = true` for real people, `tribute = true` for tributes.
- Hook headline must be a sentence with a verb ("Mr. India पहले Amitabh को मिली थी?").
- `delivery.emotion` per line and `delivery.cues` for in-line turns (ElevenLabs v4 tags).
- Plan: `design: 'v2'`, a palette different from the last upload (see `docs/uploads.csv`), a layout per beat (no repeats in a row), ≤ 3 `react` cameos (none on tributes), sharp hook still.
- Register the module in `src/collage/shorts/index.ts`.

## 3. Stills
`npm run short -- still <slug> --url IMG --source PAGE --credit WHO --label "Film (Year): what it shows" --name <basename-without-extension> [--rights "CC BY-SA 4.0 …"]`. Prefer Creative Commons/public-domain portraits; copyrighted posters/frames only as credited commentary.

## 4. Check, voice, render
```bash
npm run short -- lint <slug>      # must have no errors (the PostToolUse hook also runs this on save)
npm run short -- say <slug>       # fix every [guessing: …] with the lexicon or `say` (Devanagari only)
npm run short -- voice <slug> --edge
npm run short -- stills <slug>    # read every sheet against /review-short's design checklist
npm run short -- render <slug> --draft
```
Add a row to the status table in `docs/shorts-ideas.md`. Report the draft path, length, script table, sources, and anything left to lock. Do not run ElevenLabs; that is `/final-short`.
