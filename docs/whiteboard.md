# Whiteboard videos (VideoScribe-style)

Code: `src/whiteboard/`. Test bench: `whiteboard-demo` (`src/collage/shorts/whiteboard-demo/script.ts`). Tests: `tests/whiteboard.test.ts`.

This is an experiment, not house style. It is a way to explain a fact visually, and the commentary is still the content. CLAUDE.md's rules still apply: no stills-essay, and credited stills only while their line is spoken.

## What VideoScribe does, and how this maps to code

| VideoScribe | Here |
|---|---|
| One big canvas; the camera moves to each element | `world` (board units) plus a camera per element. `cameraAt()` holds each shot, then eases to the next one. Zoom moves in log space so zooming in and out feel equally fast. |
| Element "animate time" | `draw` in seconds. Default: doodle 1.4, image 2.2, underline 0.45, circle and arrow 0.6. Text: 0.06 s per character, 0.8–3 s. |
| Element "pause" and "transition" time | Not needed. Elements start on narration words (`at: {line, word}`); the camera moves over the 18 frames before an element starts (`move`). |
| Hand draws SVGs stroke by stroke | `scheduleStrokes()` splits the draw time across strokes by length, so the pen moves at one speed, with 2-frame pen lifts between strokes. Each stroke is revealed with `stroke-dashoffset`. The hand is placed at `getPointAtLength()` (`@remotion/paths`). |
| Colour fills after the outline | Doodle `fills` fade in over the 10 frames after the outline finishes. |
| Text "drawn" in a handwriting font | `write` elements use Kalam (Devanagari and Latin) as HTML text, revealed by a clip that follows the pen. The pen's tip runs along the baseline with a small scribble. |
| Photos "drawn" in | `image` is revealed by a zig-zag brush mask (`sweepPath`), then a quick ink border. |
| Hand styles | **Photo hand (default, `PHOTO_HAND`).** The owner's own photo of a hand writing (not stock), with its white background keyed out: `public/whiteboard/hand-photo.png`. It is a cut-out PNG with its pen-tip pixel given, the way VideoScribe's hands work. A drawn sleeve covers the photo's cut-off forearm and runs off-screen. To use another photo, set `hand: {src, tip, size, width, sleeve}`. **Drawn hand (`hand: 'drawn'`, `Hand.tsx`).** Original, code-drawn from the same photo; its palette follows the paper. `hand: false` hides the hand. |
| Board styles | `paper: 'white' \| 'cream' \| 'chalk'`. |
| Camera "show all" at the end | `{kind: 'overview', at}` pulls back to everything drawn so far. |

Everything is a function of the frame: dash offsets, the camera, the hand path, and the deterministic `wobble()` that replaces `Math.random`.

## Plan format

```ts
export const board: WhiteboardPlan = {
  world: {w: 1600, h: 2800},    // tall boards suit 9:16; beats stack top to bottom
  paper: 'white',
  accent: '#d6392f',             // doodle fills and caption accent
  sfx: {src: 'paper.wav', volume: 0.12},
  elements: [
    {kind: 'write', at: {line: 'hook'}, text: 'SRK के एक गाने में', x: 760, y: 300, size: 120, camera: {x: 160, y: 160, w: 1300, h: 400}},
    {kind: 'doodle', at: {line: 'hook', word: 'stars'}, doodle: 'star', x: 1340, y: 420, size: 170, camera: 'stay'},
    {kind: 'image', at: {line: 'f1'}, src: 'shorts/…/stills/x.jpg', x: 800, y: 900, w: 1100, h: 660, focus: '50% 30%'},
    {kind: 'underline', at: {line: 'f1', word: 'पहली'}, x1: 420, x2: 1180, y: 1370, color: '#d6392f', camera: 'stay'},
    {kind: 'arrow', at: {line: 'f2', word: 'लिया'}, from: {x: 700, y: 1700}, to: {x: 1390, y: 1120}, bend: -0.3},
    {kind: 'circle', at: {line: 'payoff', word: 'stars'}, x: 1050, y: 2510, rx: 360, ry: 130, camera: 'stay'},
    {kind: 'overview', at: {line: 'loop'}},
  ],
};
export const component = whiteboard(board);
```

- `x`, `y` is the element's centre. For `write`, `y` is the first baseline and `align` is `center` (default) or `left`.
- `camera`:
  - `auto` (default) frames the element alone.
  - `stay` keeps the current shot.
  - A box (`{x, y, w, h}`) frames that area. Use a box to keep a group (photo plus its caption) in one shot.
- Doodles: `star`, `heart`, `clapper`, `reel`, `popcorn`, `ticket`, `trophy`, `camera`, `bulb`, `rupee`, `crowd`, `arrow` (`src/whiteboard/doodles.ts`, 200×200 boxes). Add one by writing its strokes in drawing order, plus optional `fills`.
- Register the Short in `src/collage/shorts/index.ts`. Voice, captions, music and sfx come from `ShortShell`, as in every other Short.

## Iterating

```powershell
npm run short -- stills whiteboard-demo --every 0.5   # contact sheets
npm run short -- voice whiteboard-demo --edge         # draft voice
npm run short -- render whiteboard-demo --draft
npm run studio:shorts                                 # scrub the timeline
npm test                                              # schedule, camera, doodles, demo plan
```

Screen layout: close-ups frame into a 1080×1180 area centred at y 760, above the captions. The overview uses 1080×1300 centred at y 800.

## Known gaps and next steps

- **First frame is blank paper** until the hook starts writing (0.4 s). For uploads, start the hook text pre-written or pass an early anchor (`offset`).
- **Arrows** don't route around text; pick `bend` by eye.
- **Hand** is a single pose with no rotation along the stroke. Next: tilt it slightly with the stroke tangent (`getTangentAtLength`) and add a second hand style.
- **Marker sound:** the demo uses `paper.wav`. A generated marker squeak (`src/sound-design.ts`) would sell the effect.
- **Text** is a clip reveal, not a stroke-traced font. Stroke-tracing needs a single-line font. Hershey fonts are Latin-only, so Devanagari would stay a clip reveal.
- **Morph/erase** (VideoScribe's "morph" and "move in") are not built.
- No lint yet for elements outside the world, or for camera boxes that clip an element.
