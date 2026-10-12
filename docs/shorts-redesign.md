# Fun-facts Shorts redesign (plan, 12 October 2026)

## Why

All 15 uploads use one template: navy backdrop, "Did you know?" kicker, centred two-line headline, one tilted white-bordered print, caption pill, "1/3" badge, "Answer" kicker, and the same whoosh + shutter sounds. Viewers recognise it within a few uploads, and it reads as mass-produced. The "1/3" badge is a scene counter, which CLAUDE.md already rules out.

## Decisions (owner, 12 Oct)

- **Mascot: cameo reactor only.** Stills stay the main picture. The Movie Idiot pops in small, 2–3 times per Short, to react (shock, skeptic, facepalm, thumbs up). It sits out tributes and tragedies.
- **React only, no talking.** Expressions and poses change on key words; the narrator stays an unseen voice. No lip-sync.

## Design

### 1. Beat layouts (one per beat; no two consecutive beats share a layout)

| Layout | Use for | Composition |
|---|---|---|
| `print` | Plain facts | Today's mounted print, larger and less tilted; no counter |
| `number` | Money, dates, counts (batch 3) | Huge counting figure (₹38,000, 25x, 1,009 weeks) with the still as a small corner print |
| `versus` | Comparisons | Two prints stacked, a number or "VS" between (budget vs gross, Hindi vs English *Guide*) |
| `ticket` | Box-office facts | A cinema ticket or marquee graphic carrying the figure, with the poster beside it |
| `stack` | A beat with 2–3 stills | Prints dealt onto each other on spoken words (today's `cuts`, restyled) |

The hook keeps a sharp, large still from frame 0 (channel rule).

### 2. Mascot cameos

- `react: {word, expression, pose?}` on a beat: the mascot pops in at a corner the layout leaves free, holds about 1.5 s and leaves. At most 3 per Short.
- Its screen can flash TV static as one of the transition styles (see 4). The mascot stays small and is never the frame for a still.
- Lint: more than 3 cameos, or a cameo on a Short with `honorific` / `tribute` set, is a warning.

### 3. Identity per Short, not per template

- Remove the fact badges ("1/3") and the "Answer" kicker. "Did you know?" appears at most once, small, in the first second.
- `palette`: accent and background colours per Short, picked from the film's poster (default: a rotation of 4 house palettes), instead of navy + marigold every time.
- `texture`: film grain, paper or curtain backdrop, varied across uploads.
- Captions: same safe zone, bigger type, the key word boxed in the accent colour.

### 4. Motion and sound

- Transitions vary per beat: hard cut, whip pan, TV-static flash, paper slide. No single whoosh + shutter on every beat.
- Numbers count up on their spoken word. Stamps land on spoken words, as now.
- Everything stays frame-driven (`useCurrentFrame`, `spring`, `interpolate`).

### Guardrails (CLAUDE.md)

No full-frame Ken Burns, no evidence boards, no kinetic type for its own sake. Graphics carry a number, a comparison or a reaction; the commentary is the content.

## Status (12 Oct)

Phases 2–4 built: `src/collage/formats/v2.tsx`, lint for layouts, anchors, cameo count and tributes, tests. Converted for testing: `guide-twins` (velvet), `mughal-colour` (newsprint), `ddlj-title` (marquee). Next: pilot a new Short (Mr. India) in v2 and compare in uploads.csv.

## Phases

1. **Style frames:** 3–4 stills of *Mr. India* beats in the new layouts (hook, number, versus, mascot cameo) for sign-off. No code merged yet.
2. **Layouts:** `src/collage/formats/layouts/` with the five layouts; `layout`, `palette`, `texture` in `FunFactsPlan`; the current look stays available as `print` / a legacy palette, so old Shorts render unchanged.
3. **Mascot cameos:** `react` cues, corner placement per layout, static-flash transition.
4. **Clean-up:** remove badges and kickers; caption restyle; lint for layout variety and cameo count; update `docs/collage-shorts.md`, `/review-short` and tests.
5. **Pilot:** build *Mr. India* in the new design, upload, and compare 4-hour views and % viewed against older rows in [uploads.csv](uploads.csv).
