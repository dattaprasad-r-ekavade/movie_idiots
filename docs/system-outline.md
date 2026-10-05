# Movie Idiots: system outline

Status: proposal, October 2026. Builds on the collage Shorts system (`docs/collage-shorts.md`) and the `phalke` golden sample. Audio and voice decisions are deliberately deferred; the system keeps voice pluggable.

## 1. What we are building

A production system that turns **one researched story** into a **Hindi/Hinglish paper-collage video**: a 45–75 s Short first, a 7–8 minute long-form video next. Claude does research, writing, layout and motion. A human approves the story, the beat sheet and the final cut.

Success is judged by viewers, not by render QC. Starting targets (our own guesses, to recalibrate after the first 10 uploads):

- Shorts: ≥ 70% of viewers still watching at 3 s, ≥ 85% average view duration, loops/rewatches.
- Long form: ≥ 60% retention at 30 s, ≥ 40% average view duration, CTR ≥ 5% on the thumbnail.

### Non-negotiables

1. **We own every pixel.** Original vector art, public-domain or licensed material, provenance recorded. No film footage, no scraped stills presented as ours.
2. **Every claim has a source.** No invented quotes, numbers or plot details.
3. **Not mass-produced.** Few videos, each reviewed by a person, a real point of view in the script, and ideally a human voice (YouTube's inauthentic-content policy).
4. **Motion serves the sentence.** Visual events are anchored to narration words. Nothing holds still for more than about 2 s.
5. **Deterministic renders.** Frame-driven animation only, so a re-render is identical and reviewable.

## 2. Where we are

| Have (working) | Gap exposed by the golden sample |
|---|---|
| Word-anchored timeline (`timeline.ts`, `clock()`) | Only Shorts (9:16); no chapters or 16:9 |
| ~20 motion primitives, ~25 art pieces | `Phalke.tsx` is 657 hand-written lines for 69 s. Long form at this rate is about 4,000 lines per video, so we need reusable beat patterns |
| Contact sheets + draft render CLI | Review is manual eyeballing; no automated lint |
| Self-hosted fonts, original sound kit | No voice in this environment; mix not tuned against speech |
| Sources list per short | No structured research/claims ledger; nothing checks claim ↔ line |
| | No thumbnail, title or metadata generation; no analytics loop |
| | A draft takes ~6 min at half resolution; long form needs caching per beat |

## 3. Pipeline

```
 IDEA ──► RESEARCH ──► SCRIPT ──► BEAT SHEET ──► ASSETS ──► EDIT ──► VOICE ──► MIX ──► REVIEW ──► PACKAGE ──► PUBLISH ──► LEARN
  ▲          │           │            │             │         │        │        │        │           │                     │
  │       claims      lines       patterns        art       spec    timing   stems    lint +      title, thumb,          retention
  │       ledger                  + intent       ledger    (JSON)   (cues)            human ✔      chapters                curves
  └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Human checkpoints (✔): **story pick**, **script + beat sheet**, **final cut**. Everything between them is agent work with automated checks.

| Stage | Input → output | Owner | Gate |
|---|---|---|---|
| Idea | Topic backlog → one pitch: hook, twist, payoff, why now | Agent proposes, human picks | Is there a twist? Can we own the visuals? |
| Research | Pitch → `research.json` claims ledger (claim, source URL, quote/paraphrase, confidence) | Agent | ≥ 2 sources for any surprising claim; conflicts flagged |
| Script | Claims → `script.ts` lines (one breath each), each line lists the claim IDs it uses | Agent | Every factual line maps to a claim; hook ≤ 3 s; Hinglish read-aloud check |
| Beat sheet | Lines → beats: pattern, intent (*what the viewer should feel/learn*), on-screen text that adds rather than repeats | Agent, human approves | One idea per beat; Shorts change visually every 1–2 s |
| Assets | Beats → art requests → `art.tsx` pieces / cut-out PNGs + `assets.json` ledger | Agent | Provenance and licence recorded |
| Edit | Beat sheet → video spec (JSON) rendered by pattern components; custom TSX only for hero beats | Agent | Contact-sheet lint passes |
| Voice | Lines → per-line audio + word cues (recorded, Edge or local TTS) | Human or agent (decision deferred) | Timing measured; edit re-times automatically |
| Mix | Voice + bed + SFX → stems → master | Agent | -14 LUFS, ≤ -1.5 dBTP, music ducked ≥ 10 dB under speech |
| Review | Draft MP4 + contact sheets + lint report | Agent then human | Checklist in `docs/collage-shorts.md`; human watches |
| Package | Final → `video.mp4`, thumbnail, title options, description with sources, chapters, tags | Agent | Chapters valid (≥ 3, ≥ 10 s each) |
| Publish | Package → YouTube (manual first, API later) | Human | Later: scheduled upload via API |
| Learn | YouTube Analytics retention curve → notes on which beats lost viewers | Agent | Feeds pattern scores and the next script |

## 4. Architecture

```
src/collage/
  core/        timeline.ts (clock, cues)   spec.ts (video spec schema)   resolve.ts (spec → frames)
  motion/      primitives: Enter, Cutout, Stamp, Marker, Draw, Camera/Layer, TornWipe, Counter, Captions …
  art/         original vector library, grouped: people/, objects/, places/, symbols/, backgrounds/
  patterns/    reusable beats (see §5), each with props schema, defaults, preview fixture
  formats/     Short (1080×1920), Long (1920×1080, chapters, lower-thirds, end screen), Thumbnail (1280×720)
  brand/       theme tokens, fonts, sound kit, intro sting / sign-off
  videos/      <slug>/ research.json, script.ts, spec.json, assets.json, optional custom beats
scripts/       short.ts → video.ts CLI: research | script | sheet | stills | lint | render | package
tools/         python: sfx_kit.py, cutout.py (rembg/BiRefNet), align.py (WhisperX), loudness check
```

The old `src/video` stills-essay renderer and its MCP server stay frozen and get removed once the new system has MCP tools (§8).

## 5. The key move: beat patterns + a video spec

Hand-coding every beat does not scale to 7 minutes. Most beats in the golden sample are instances of a few shapes. Turn those into **patterns**: parameterized components that take a slot list and word anchors.

| Pattern | What it does | Seen in `phalke` |
|---|---|---|
| `HeroReveal` | Cut-out rises on a backdrop; a transformation fires on a word; stamp + shake | Hook / loop (wig lift) |
| `ObjectStamp` | One object, label, then a verdict stamp | Jewels "दाँव पर" |
| `Stage` | Framed scene (screen, window, page) whose contents swap on words, with parallax foreground | Theatre |
| `Process` | Stepped change over time with a counter (growth, build, countdown) | Pea plant frames |
| `Strip` | Horizontal sequence (film strip, timeline, receipts) scrolling with an annotation arrow | Demo reel |
| `Journey` | Map route draws, vehicle travels, places tag in, year stamps | Bombay → London |
| `Rejection` | Document/poster, then N stamps on N words | "नहीं" × 3 |
| `Swap` | A becomes B (costume, before/after) plus a number counter | Salunke + salary |
| `Board` | Polaroids/cards pinned one per word, closing stamp | Saraswatibai |
| `Artifact` | A hero object (ticket, letter, headline) arrives, then title and stamp | Release ticket |
| `Honour` | Sunburst + medal/trophy + name banner | Award |
| Long form adds | `Timeline` (years on a rail), `Compare` (two columns that fill), `NumberStack` (big figures with context), `QuoteCard` (sourced quote only), `Chapter` (title card ≤ 2 s), `Recap` | |

A **video spec** is JSON the agent writes and edits:

```jsonc
{
  "slug": "phalke",
  "format": "short",                       // short | long
  "lines": "script.ts",
  "beats": [
    {"id": "hook", "pattern": "HeroReveal", "lines": ["hook1"],
     "intent": "Shock: the heroine is a man",
     "backdrop": {"kind": "sunburst", "color": "marigold"},
     "hero": {"art": "Heroine", "props": {"width": 410}},
     "title": {"text": "भारत की पहली हीरोइन", "accent": "हीरोइन"},
     "events": [
       {"at": {"line": "hook1", "word": "आदमी", "offset": -2}, "do": "hero.set", "props": {"wig": 1}, "sfx": "pop"},
       {"at": {"line": "hook1", "word": "आदमी"}, "do": "stamp", "text": "एक आदमी!", "sfx": "stamp", "shake": 22}
     ],
     "transition": "cut"},
    {"id": "theatre", "pattern": "Stage", "lines": ["theatre", "idea"], "transition": "tornWipe"}
  ]
}
```

- `resolve.ts` validates the spec (zod), resolves word anchors through `clock()`, and fails on unknown words, overlapping exits or off-safe-area placements **before** rendering.
- Escape hatch: `"pattern": "custom", "component": "./beats/Theatre.tsx"` for hero moments.
- Patterns ship with preview fixtures so a single beat renders in seconds, which is also the per-beat render cache key.

Migration plan: re-express `phalke` as a spec. The output must match the golden sample's contact sheets. That proves the abstraction before any long-form work.

## 6. Art and asset system

Visuals are the scarcest resource. Three sources, one ledger:

1. **Vector library** (default). Grouped, reusable, recolourable: people with swappable heads/outfits/props, objects, places, symbols, backgrounds. Each piece takes `palette` and pose/state props (e.g. `Heroine.wig`). Target 150 pieces before long form.
2. **Photo cut-outs.** Public-domain/licensed photos → `tools/cutout.py` (BiRefNet/rembg) → transparent PNG → `Cutout` adds the paper border. Halftone/duotone filter so photos match the paper look. Needs Hugging Face/Commons access.
3. **Generated images** (optional, explicit opt-in). Only for generic textures and objects, never real people, labelled in the ledger.

`assets.json` per video records: file, kind, source URL, author, licence, date retrieved, transformations, and where it is used.

## 7. Formats

| | Short | Long (7–8 min) |
|---|---|---|
| Canvas | 1080×1920, 30 fps | 1920×1080, 30 fps |
| Words | 150–190 | 1,000–1,250 |
| Beats | 10–13 | 45–70, grouped into 4–6 chapters |
| Visual change | every 1–2 s | every 2–4 s; hook section every 1–2 s |
| Structure | Hook (0–3 s) → setup → twist → payoff → loop line | Cold open (0–30 s, show the payoff question) → chapters with mini-cliffhangers → payoff → recap + next-video tease |
| Captions | Word-highlight, centre-low, above Shorts UI | Smaller lower captions (optional burn-in), plus `.srt` |
| Safe zones | Avoid bottom ~380 px and right ~140 px | Title-safe 90%; end-screen zone in last 20 s |
| Extras | Thumbnail = frame 0 | Designed thumbnail composition, chapter titles, end screen |

The same story can ship as a long video plus 2–3 Shorts cut from its strongest beats. Specs make that reuse a re-layout, not a rewrite.

## 8. Agent interface

Replace the movie-review MCP server with collage tools so Claude (or Codex) drives the pipeline from chat:

| Tool | Does |
|---|---|
| `list_videos`, `get_video` | Read specs, script, research, assets |
| `write_research`, `write_script`, `write_spec` | Validated writes (zod), returning resolve errors such as missing words or unsafe placement |
| `list_patterns`, `list_art` | Catalogue with props and preview images, so the agent picks from what exists |
| `render_stills` | Contact sheets for a video or a single beat (fast path) |
| `lint_video` | Automated review report (§9) |
| `render_video` | Draft/final as a background job with progress |
| `measure_voice` / `voice_edge` / `align_voice` | Timing from recordings, online TTS or WhisperX |
| `package_video` | Thumbnail, titles, description, chapters, sources |

Jobs move from in-memory to a small SQLite table so long renders survive restarts. One production operation per video at a time, enforced with a lock file.

## 9. Automated review (lint)

Runs on every render and fails the draft before a human sees it:

- **Stillness:** frame-difference over the rendered stills. Fail if any span ≥ 2.0 s (Short) / 4.0 s (Long) has no meaningful change.
- **Empty openings:** the first 6 frames of a beat must contain the beat's hero element.
- **Safe areas:** bounding boxes of text elements (from the resolved spec) inside the format's safe zone, and no overlap between text and captions.
- **Text sanity:** no unexpected wraps; Devanagari shaping check (render glyph clusters and compare widths against Mukta fallback to catch broken conjuncts).
- **Caption redundancy:** on-screen text must not equal the spoken words of the same moment.
- **Facts:** every line with a factual claim references a claim ID; every claim has a URL.
- **Audio:** loudness, true peak, speech/music gap, no SFX within 80 ms of a stressed word.
- **Repetition:** the same pattern used more than twice in a row, or the same art piece in more than 3 beats, is flagged.

## 10. Rendering and performance

- Per-beat render cache keyed by (pattern, props, timing slice, code hash). Edits re-render only the beats that changed, then FFmpeg concatenates.
- Draft = 0.5 scale; final = full. Concurrency tuned per machine.
- Remotion Lambda/Cloud Run only if long-form local renders exceed ~30 min (check the Remotion licence for the team size).

## 11. Packaging, publishing, learning

- **Thumbnail format:** 1280×720 composition from the beat sheet's hero: one cut-out, ≤ 4 words, high contrast. Generate 3 variants for YouTube's thumbnail test.
- **Metadata:** 3 title options (curiosity + keyword), description with the sources list, chapters from the spec, tags.
- **Publish:** manual upload first. Add the YouTube Data API (scheduled upload, captions file) once the format is stable.
- **Learn:** pull retention curves via the YouTube Analytics API, map drops to beat IDs via the spec, and keep `learnings.md`: which patterns, hooks and lengths hold attention. This is how the system improves instead of just producing more.

## 12. Roadmap

| Milestone | Deliverable | Done when |
|---|---|---|
| **M1 Spec + patterns** | `spec.ts`, `resolve.ts`, 11 patterns from §5; `phalke` re-expressed as a spec | Spec version's contact sheets match the hand-coded version; `phalke` edit ≤ 150 lines of JSON + ≤ 1 custom beat |
| **M2 Second and third Shorts** | Two new stories built only from patterns + new art | Each made in ≤ 1 working session; human rates ≥ 7/10 |
| **M3 Lint + per-beat stills** | §9 checks (stillness, safe areas, empty openings, facts) and single-beat render | Lint catches the golden-sample bugs we fixed by eye (wrapping, empty openings, broken conjunct) |
| **M4 Research + script tooling** | `research.json` claims ledger, claim IDs on lines, Hinglish style guide | Every line traceable; the reviewer can audit sources in 5 minutes |
| **M5 Agent interface** | New MCP tools (§8), SQLite jobs, lock files; retire old MCP server | A Short produced end to end from chat |
| **M6 Long-form format** | 16:9 format, chapters, long-form patterns, per-beat render cache, thumbnail generator | One 7–8 min video; edit-to-draft re-render of one beat < 2 min |
| **M7 Voice + mix** | Decided voice path, alignment, mix stems | Real-voice timing on all published videos |
| **M8 Publish + learn** | Upload API, analytics pull, `learnings.md` | Retention-to-beat report for every published video |

Shorts ship from M2 onward while later milestones are built. The order is chosen so each milestone produces watchable output.

## 13. Open decisions

1. **Series identity:** keep "Movie Idiots" (cinema history/trivia focus) or rename for broader topics (history, business, science)? Affects art library priorities.
2. **Topic lane for the first 10 Shorts:** stay on Indian cinema history (consistent, searchable) or rotate lanes to test?
3. **Voice:** own recording vs Edge vs local neural TTS (deferred; the system supports all three).
4. **Cadence:** e.g. 3 Shorts/week + 1 long video every 2 weeks once M6 lands.
5. **Network access** for this cloud environment: allow Commons/Wikipedia (photos, research), Hugging Face (cut-out and voice models) and the Edge speech host.

## 14. Claude Code plugins, MCP servers and in-repo tooling

Checked October 2026 against the Claude plugin directory and connector registry. Nothing below is installed yet. "Adopt" = recommended now, "Trial" = test on one video first, "Later" = after the milestone that needs it.

| Stage | Tool | Kind | Why | Verdict |
|---|---|---|---|---|
| Edit | **Remotion** (official, `remotion-best-practices`, `-captions`, `-maps`, `-render`, `-studio`) | Plugin (skills) | Idiomatic Remotion code; `remotion-maps` fits the `Journey` pattern; captions/render guidance for long form | Adopt |
| Edit / review | Remotion Studio **WebMCP** | MCP (in Studio) | Agent inspects compositions, seeks frames and reads errors in Studio, which tightens the stills loop | Trial at M3 (needs a compatible browser agent) |
| Review | **playwright** (Microsoft) | Plugin (MCP) | Screenshot Studio/beat previews and check the HTML layout of text boxes for the lint step | Trial at M3 |
| Research | **Research integrity** | Plugin (skill) | Labels how each claim is known and records sources that failed to load, which matches the claims ledger | Adopt at M4 |
| Research / ideas | **TubeAlfred YouTube** or **vidIQ** | Plugin / connector | Keyword ideas, competitor and Shorts outliers, transcript and comment mining for topic picks | Trial: pick one |
| Package | **Codesign** (IMG.LY) | Plugin (local MCP) | Editable thumbnail templates, brand kit, `judge` critique; runs locally | Trial; our own `Thumbnail` composition is the default |
| Package | Abracadabrax Thumbnail Maker | Plugin (credits) | Quick thumbnail drafts | Skip: paid credits, less control than our art |
| Art | **Figma** connector | Connector | Design new characters/props in Figma, pull them into `art/` as SVG/React | Later: only if a human designer joins |
| Art | Adobe connector | Connector | Pro asset tools and animate-design | Skip for now: duplicates the vector library |
| Voice | ElevenLabs official MCP (`elevenlabs/elevenlabs-mcp`, local) | MCP | Hindi TTS + word timestamps (paid). The registry's ElevenLabs connector manages voice *agents*, not TTS | Later (voice decision) |
| Publish / learn | YouTube Data + Analytics MCP (community servers on glama.ai) | MCP (local, OAuth) | Upload, chapters, thumbnails; **retention curves** for the learn loop | Later (M8); prefer read-only analytics first; vet the code before granting OAuth |
| Art (generated) | ComfyUI / image-generation skill | MCP / skill | Textures and generic objects only, opt-in | Later; never real people |

Build ourselves (higher value than any third-party tool):

1. **`movie-idiots` MCP v2** (§8): spec/patterns/art catalogue, stills, lint, render jobs.
2. **Project skills** in `.claude/skills/`: `/new-short` (pitch → research → script → beat sheet with the checkpoints), `/review-sheets` (contact-sheet checklist), `/package` (titles, thumbnail, description).
3. **Hooks:** PostToolUse on `src/collage/**` runs `tsc` + spec resolve; Stop hook reminds to render stills before claiming a beat is done.
4. **SessionStart hook** for cloud sessions: `npm ci`, Python venv, sound kit, so every session can render immediately.
