"""Original synthesized sound kit for collage videos. No samples, fully deterministic.

Usage: python scripts/sfx_kit.py OUTPUT_DIR [BED_SECONDS]
Writes short effects (whoosh, pop, stamp, shutter, coin, riser, paper, flicker)
and a tanpura-drone + plucked Bhupali melody bed, mono 44.1 kHz WAV.
"""
import os
import sys
import wave

import numpy as np

RATE = 44100
rng = np.random.default_rng(5542)


def save(folder, name, signal, gain=0.9):
    peak = np.max(np.abs(signal)) or 1.0
    data = np.int16(np.clip(signal / peak * gain, -1, 1) * 32767)
    with wave.open(os.path.join(folder, name), "wb") as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(RATE)
        out.writeframes(data.tobytes())


def t_axis(seconds):
    return np.arange(int(seconds * RATE)) / RATE


def lowpass(signal, cutoff):
    # One-pole low-pass; cutoff may be an array for sweeps.
    alpha = 1 - np.exp(-2 * np.pi * np.broadcast_to(cutoff, signal.shape) / RATE)
    out = np.empty_like(signal)
    acc = 0.0
    for i, (x, a) in enumerate(zip(signal, alpha)):
        acc += a * (x - acc)
        out[i] = acc
    return out


def highpass(signal, cutoff):
    return signal - lowpass(signal, cutoff)


def env(t, attack, decay):
    return np.minimum(1, t / max(attack, 1e-4)) * np.exp(-np.maximum(0, t - attack) / decay)


def whoosh(seconds=0.5):
    t = t_axis(seconds)
    noise = rng.uniform(-1, 1, t.size)
    sweep = 400 + 5000 * np.sin(np.pi * t / seconds) ** 2
    shaped = highpass(lowpass(noise, sweep), 250)
    return shaped * np.sin(np.pi * t / seconds) ** 1.5


def pop():
    t = t_axis(0.16)
    freq = 380 + 900 * np.exp(-t * 40)
    phase = 2 * np.pi * np.cumsum(freq) / RATE
    return np.sin(phase) * env(t, 0.002, 0.045)


def stamp():
    t = t_axis(0.45)
    thump = np.sin(2 * np.pi * (70 * t - 40 * t * t)) * env(t, 0.001, 0.09)
    slap = lowpass(rng.uniform(-1, 1, t.size), 3500) * env(t, 0.0005, 0.018)
    return thump * 1.0 + slap * 1.4


def shutter():
    t = t_axis(0.22)
    clicks = np.zeros_like(t)
    for at, amp in ((0.0, 1.0), (0.075, 0.7)):
        local = t - at
        mask = local >= 0
        clicks[mask] += highpass(rng.uniform(-1, 1, mask.sum()), 1800) * np.exp(-local[mask] / 0.008) * amp
    return clicks


def coin():
    t = t_axis(0.9)
    partials = [(2093, 1.0), (2637, 0.6), (3520, 0.35), (5274, 0.2)]
    tone = sum(np.sin(2 * np.pi * f * t) * a * np.exp(-t * (3 + i * 2)) for i, (f, a) in enumerate(partials))
    return tone * env(t, 0.001, 0.6)


def riser(seconds=1.4):
    t = t_axis(seconds)
    noise = highpass(lowpass(rng.uniform(-1, 1, t.size), 600 + 7000 * (t / seconds) ** 2), 300)
    tone = np.sin(2 * np.pi * np.cumsum(220 + 660 * (t / seconds) ** 2) / RATE) * 0.25
    return (noise + tone) * (t / seconds) ** 2


def paper():
    t = t_axis(0.35)
    noise = highpass(rng.uniform(-1, 1, t.size), 1200)
    crinkle = (rng.uniform(0, 1, t.size) > 0.985).astype(float)
    crinkle = lowpass(crinkle, 6000) * 8
    return (noise * 0.4 + crinkle) * np.sin(np.pi * t / 0.35)


def flicker(seconds=2.0):
    # Projector clatter: 18 shutter ticks per second over a soft motor hum.
    t = t_axis(seconds)
    ticks = np.zeros_like(t)
    for at in np.arange(0, seconds, 1 / 18):
        idx = int(at * RATE)
        n = min(400, t.size - idx)
        ticks[idx:idx + n] += highpass(rng.uniform(-1, 1, n), 2000) * np.exp(-np.arange(n) / 60)
    hum = np.sin(2 * np.pi * 50 * t) * 0.08 + np.sin(2 * np.pi * 100 * t) * 0.04
    fade = np.minimum(1, np.minimum(t / 0.1, (seconds - t) / 0.1))
    return (ticks * 0.6 + hum) * fade


def tanpura_bed(seconds):
    """Drone on Sa/Pa with slow jawari shimmer plus a sparse plucked Bhupali phrase."""
    t = t_axis(seconds)
    sa = 138.59  # C#3
    drone = np.zeros_like(t)
    pluck_cycle = 3.2
    for k, (ratio, offset) in enumerate(((1.5 / 2, 0.0), (1.0, 0.8), (1.0, 1.6), (0.5, 2.4))):
        f = sa * ratio
        local = (t - offset) % pluck_cycle
        shimmer = 1 + 0.35 * np.sin(2 * np.pi * 0.4 * t + k)
        voice = sum(np.sin(2 * np.pi * f * h * t + h) / h ** 1.2 * (1 + 0.5 * np.sin(2 * np.pi * 0.21 * h * t)) for h in range(1, 9))
        drone += voice * np.exp(-local / 2.6) * shimmer
    drone *= 0.12
    # Bhupali: Sa Re Ga Pa Dha. A slow original phrase, one note every ~0.8 s with rests.
    scale = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2]
    phrase = [2, 3, 4, 3, 2, None, 1, 2, 0, None, 3, 4, 5, 4, 3, None, 2, 1, 0, None]
    melody = np.zeros_like(t)
    step = 0.8
    for i in range(int(seconds / step)):
        note = phrase[i % len(phrase)]
        if note is None:
            continue
        start = i * step
        local = t - start
        mask = (local >= 0) & (local < 2.2)
        f = sa * 2 * scale[note]
        lt = local[mask]
        melody[mask] += (np.sin(2 * np.pi * f * lt) + 0.35 * np.sin(4 * np.pi * f * lt) + 0.12 * np.sin(6 * np.pi * f * lt)) * np.exp(-lt / 0.45) * np.minimum(1, lt / 0.004)
    melody *= 0.16
    fade = np.minimum(1, np.minimum(t / 1.5, (seconds - t) / 2.0))
    return (drone + melody) * fade


def main():
    folder = sys.argv[1]
    bed_seconds = float(sys.argv[2]) if len(sys.argv) > 2 else 75
    os.makedirs(folder, exist_ok=True)
    save(folder, "whoosh.wav", whoosh())
    save(folder, "pop.wav", pop(), 0.7)
    save(folder, "stamp.wav", stamp())
    save(folder, "shutter.wav", shutter(), 0.6)
    save(folder, "coin.wav", coin(), 0.6)
    save(folder, "riser.wav", riser(), 0.7)
    save(folder, "paper.wav", paper(), 0.6)
    save(folder, "flicker.wav", flicker(), 0.5)
    save(folder, "bed.wav", tanpura_bed(bed_seconds), 0.8)
    print(f"Sound kit written to {folder}")


if __name__ == "__main__":
    main()
