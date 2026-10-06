#!/usr/bin/env bash
# Copy the reviewed render outputs into samples/ (tracked in git) so they can be watched
# from GitHub. Sources live in projects/ (ignored); rerun after re-rendering.
set -euo pipefail
cd "$(dirname "$0")/.."
for dir in projects/shorts/*/; do
  slug=$(basename "$dir")
  out="samples/shorts/$slug"
  mkdir -p "$out"
  for f in draft.mp4 video.mp4 youtube.txt script.md; do
    [ -f "$dir/$f" ] && cp "$dir/$f" "$out/"
  done
  rm -f "$out"/sheet-*.jpg
  cp "$dir"/sheet-*.jpg "$out/" 2>/dev/null || true
done
if [ -f projects/mascot/demo.mp4 ]; then
  mkdir -p samples/mascot
  cp projects/mascot/demo.mp4 samples/mascot/
fi
du -sh samples
