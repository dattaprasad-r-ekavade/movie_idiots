// Audio directions for a script line: how the voice says it and how music/effects react.
// A line's `delivery` overrides the defaults for its role. Every provider gets the nearest
// equivalent: Edge rate/pitch/volume, ElevenLabs voice settings (+ audio tags on eleven_v3/v4),
// Windows speech rate. Pauses and music moves are applied by the edit, not the voice.

export type Mood = 'neutral' | 'excited' | 'curious' | 'serious' | 'punch' | 'hushed' | 'deadpan' | 'warm';
export type Role = 'hook' | 'setup' | 'tension' | 'promise' | 'fact' | 'reveal' | 'payoff' | 'loop' | 'cta';

export type Delivery = {
  mood?: Mood;
  /** Extra speaking-rate change in percent, added to the mood's (e.g. -8 = slower). */
  rate?: number;
  /** Extra pitch change in Hz, added to the mood's. */
  pitch?: number;
  /** Silence before the line, in seconds: the beat before a reveal. */
  pause?: number;
  /** Silence after the line, in seconds: let a punch land. */
  hold?: number;
  /** Music under this line: duck (default), drop out for tension, or swell back up. */
  music?: 'duck' | 'drop' | 'swell';
  /** Sound effects on spoken words: {word: 'फ़ेल', sound: 'stamp.wav'}. */
  sfx?: {word: string; sound: string; volume?: number}[];
  /** ElevenLabs v3/v4 audio tag for the whole line, e.g. 'surprised', 'whispering', 'dramatic'. Overrides the mood's tag. */
  emotion?: string;
  /** ElevenLabs v3/v4 audio tags placed just before a spoken word: [{word: 'हटा', tag: 'surprised'}]. Never shown in captions. */
  cues?: {word: string; tag: string}[];
};

type Preset = {rate: number; pitch: number; volume: number; stability: number; style: number; tag?: string};

// Rates/pitches are small on purpose: big jumps sound robotic on neural voices.
export const MOODS: Record<Mood, Preset> = {
  neutral: {rate: 0, pitch: 0, volume: 0, stability: 0.45, style: 0.2},
  excited: {rate: 10, pitch: 8, volume: 5, stability: 0.3, style: 0.6, tag: 'excited'},
  curious: {rate: 2, pitch: 4, volume: 0, stability: 0.4, style: 0.45, tag: 'curious'},
  serious: {rate: -7, pitch: -4, volume: 0, stability: 0.6, style: 0.3, tag: 'serious'},
  punch: {rate: -4, pitch: 2, volume: 10, stability: 0.35, style: 0.7, tag: 'dramatic'},
  hushed: {rate: -8, pitch: -6, volume: -15, stability: 0.5, style: 0.4, tag: 'whispers'},
  deadpan: {rate: -4, pitch: -3, volume: 0, stability: 0.8, style: 0, tag: 'sarcastic'},
  warm: {rate: -2, pitch: 2, volume: 0, stability: 0.5, style: 0.4, tag: 'warm'},
};

/** Defaults by script role (fun-facts structure). Lines without a role stay neutral. */
export const ROLE_DELIVERY: Record<Role, Delivery> = {
  hook: {mood: 'excited'},
  setup: {mood: 'neutral'},
  tension: {mood: 'curious'},
  promise: {mood: 'curious'},
  fact: {mood: 'neutral'},
  reveal: {mood: 'punch', pause: 0.25},
  // No music drop by default: in tight 30 s Shorts it read as the track cutting out (owner, Oct 2026).
  payoff: {mood: 'serious', pause: 0.45},
  loop: {mood: 'curious', music: 'swell'},
  cta: {mood: 'warm'},
};

export const SOUNDS = ['whoosh.wav', 'pop.wav', 'stamp.wav', 'shutter.wav', 'coin.wav', 'riser.wav', 'paper.wav', 'flicker.wav'];

export function resolveDelivery(line: {role?: Role; delivery?: Delivery}): Delivery & {preset: Preset} {
  const d = {...(line.role ? ROLE_DELIVERY[line.role] : {}), ...line.delivery};
  return {...d, preset: MOODS[d.mood ?? 'neutral']};
}

const signed = (n: number, unit: string) => `${n >= 0 ? '+' : ''}${Math.round(n)}${unit}`;

/** edge-tts prosody strings. `baseRate` is the run's rate option, e.g. "+6%". */
export function edgeProsody(d: ReturnType<typeof resolveDelivery>, baseRate = '+0%') {
  const base = Number(baseRate.replace(/[^-\d.]/g, '')) || 0;
  return {
    rate: signed(base + d.preset.rate + (d.rate ?? 0), '%'),
    pitch: signed(d.preset.pitch + (d.pitch ?? 0), 'Hz'),
    volume: signed(d.preset.volume, '%'),
  };
}

/** Audio tags ([excited], [whispering] …) are understood by eleven_v3 and eleven_v4 models. */
export const tagsSupported = (model: string) => /^eleven_v[34]/.test(model);

/** ElevenLabs voice settings, plus the line's audio tag on models that understand tags. */
export function elevenDelivery(d: ReturnType<typeof resolveDelivery>, model: string) {
  const pct = d.preset.rate + (d.rate ?? 0);
  // TTS speed is 0.7–1.2; map delivery.rate the same way Edge uses percent.
  const speed = Math.max(0.7, Math.min(1.2, Math.round((1 + pct / 100) * 100) / 100));
  return {
    voiceSettings: {stability: d.preset.stability, similarity_boost: 0.75, style: d.preset.style, use_speaker_boost: true, speed},
    tag: tagsSupported(model) ? d.emotion ?? d.preset.tag : undefined,
  };
}

/** System.Speech rate: integer -10..10 (about 10% per step). */
export function windowsRate(d: ReturnType<typeof resolveDelivery>) {
  return Math.max(-10, Math.min(10, Math.round((d.preset.rate + (d.rate ?? 0)) / 10)));
}

/** One-line summary for script previews: "excited +10% +8Hz, pause 0.45s, music drop". */
export function describeDelivery(d: ReturnType<typeof resolveDelivery>) {
  const parts = [`${d.mood ?? 'neutral'} ${signed(d.preset.rate + (d.rate ?? 0), '%')} ${signed(d.preset.pitch + (d.pitch ?? 0), 'Hz')}`];
  if (d.pause) parts.push(`pause ${d.pause}s`);
  if (d.hold) parts.push(`hold ${d.hold}s`);
  if (d.music && d.music !== 'duck') parts.push(`music ${d.music}`);
  for (const s of d.sfx ?? []) parts.push(`${s.sound}@${s.word}`);
  const tag = d.emotion ?? d.preset.tag;
  if (tag) parts.push(`[${tag}]`);
  for (const c of d.cues ?? []) parts.push(`[${c.tag}]@${c.word}`);
  return parts.join(', ');
}
