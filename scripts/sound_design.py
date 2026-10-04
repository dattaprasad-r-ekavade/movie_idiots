"""Original, quiet minor-key underscore and short transition effects. No samples."""
import math
import os
import random
import struct
import sys
import wave

folder = sys.argv[1]
os.makedirs(folder, exist_ok=True)
rate = 24000
rng = random.Random(5542)

def save(name, seconds, sample):
    audio = bytearray()
    for i in range(int(seconds * rate)):
        value = max(-1, min(1, sample(i / rate)))
        audio.extend(struct.pack("<h", int(value * 32767)))
    with wave.open(os.path.join(folder, name), "wb") as output:
        output.setnchannels(1)
        output.setsampwidth(2)
        output.setframerate(rate)
        output.writeframes(audio)

# Four original chord voicings, subdued bass pulse, soft eighth-note pluck.
chords = [(110, 164.81, 220, 261.63), (87.31, 130.81, 174.61, 220),
          (130.81, 196, 261.63, 329.63), (82.41, 123.47, 164.81, 246.94)]
def bed(t):
    chord = chords[min(3, int(t / 8))]
    phase = t % 8
    fade = min(1, phase / .7, (8 - phase) / .7)
    pad = sum(math.sin(2 * math.pi * f * t) for f in chord) / 4 * .12 * fade
    pulse = math.exp(-((t % .75) * 8)) * math.sin(2 * math.pi * chord[0] * t) * .045
    note = chord[int(t / .375) % 4] * 2
    pluck = math.exp(-((t % .375) * 17)) * math.sin(2 * math.pi * note * t) * .055
    return (pad + pulse + pluck) * min(1, t / .8, (32 - t) / .8)

save("bed.wav", 32, bed)
save("whoosh.wav", .45, lambda t: rng.uniform(-1, 1) * math.sin(math.pi * t / .45) ** 2 * .18)
save("hit.wav", .35, lambda t: math.sin(2 * math.pi * (75 * t - 55 * t * t)) * math.exp(-t * 18) * .32 + rng.uniform(-1, 1) * math.exp(-t * 40) * .04)
