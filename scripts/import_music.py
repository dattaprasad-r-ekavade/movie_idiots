"""Cut loudness-matched background-music excerpts for Shorts from the music-mania renders.

    python -I scripts/import_music.py D:/cash-grabs/music-maker/out city-lights mass-entry ...

For each track, picks the 70 s window with the most sustained energy (skips quiet intros),
fades it in and out, and normalises it to the loudness of the old bed (-16.5 LUFS) so the
shell's duck levels (src/collage/shell.tsx) still sit right under the voice. Writes
public/music/<name>.mp3 and adds the track to public/music/tracks.json.
"""
import json
import subprocess
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'music'
LENGTH = 70  # seconds; longer than any Short
LUFS = -16.5
RATE = 8000


def energy(path: Path) -> np.ndarray:
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-ac', '1', '-ar', str(RATE), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    samples = np.frombuffer(raw, dtype=np.float32)
    seconds = len(samples) // RATE
    return np.sqrt((samples[: seconds * RATE].reshape(seconds, RATE) ** 2).mean(axis=1))


def best_start(rms: np.ndarray) -> int:
    if len(rms) <= LENGTH:
        return 0
    windows = np.convolve(rms, np.ones(LENGTH) / LENGTH, mode='valid')
    # Prefer the earliest window within 3% of the best, so excerpts keep some build.
    return int(np.argmax(windows >= windows.max() * 0.97))


def main() -> None:
    source = Path(sys.argv[1])
    OUT.mkdir(parents=True, exist_ok=True)
    index_file = OUT / 'tracks.json'
    index = json.loads(index_file.read_text(encoding='utf-8')) if index_file.exists() else {}
    for name in sys.argv[2:]:
        src = source / f'{name}.mp3'
        start = best_start(energy(src))
        dest = OUT / f'{name}.mp3'
        fade = f'afade=t=in:d=1.5,afade=t=out:st={LENGTH - 3}:d=3,loudnorm=I={LUFS}:TP=-1.5:LRA=11'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(start), '-t', str(LENGTH), '-i', str(src), '-af', fade, '-ar', '44100', '-b:a', '160k', str(dest)], check=True)
        index[name] = {'file': f'music/{name}.mp3', 'source': f'music-mania {name} (original, 2026)', 'excerptStart': start}
        print(f'{name}: excerpt from {start} s -> {dest}')
    index_file.write_text(json.dumps(index, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
