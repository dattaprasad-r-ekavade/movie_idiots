# Samples

Reviewed renders, committed so they can be watched straight from GitHub. They are copies:
the real outputs are written to `projects/` (git-ignored) and copied here with `npm run samples`.
Everything here can be regenerated exactly from the code (renders are deterministic).

| Folder | What | Regenerate |
|---|---|---|
| `shorts/phalke/` | Golden sample: "भारत की पहली हीरोइन… एक आदमी था" (Raja Harishchandra, 1913) | `npm run short -- render phalke --draft` |
| `shorts/college/` | "90s की फिल्मों वाला College: सब कुछ होता था… बस पढ़ाई नहीं" | `npm run short -- render college --draft` |
| `mascot/` | 9 s motion test of the Movie Idiot mascot | `npx remotion render src/collage/index.tsx mascot-demo out.mp4` |

Each Short folder contains:

- `draft.mp4`: 540×960 review render. **No narration yet**: music, sound effects and captions with estimated timing. Record the script lines and re-render before uploading; upload a full-resolution `npm run short -- render SLUG` (1080×1920), not the draft.
- `youtube.txt`: upload package (title, alternatives, description with sources, tags, settings), generated from the short's `script.ts` by `npm run short -- package SLUG`.
- `script.md`: the narration lines and sources.
- `sheet-*.jpg`: contact sheets used for visual review.

Brand images (transparent mascot PNGs) are in `public/brand/`, and the character sheet is at `docs/mascot-sheet.jpg`.
