// Narration-driven timing. Every visual event is anchored to a script line or a word,
// so swapping estimated timing for a real recording re-times the whole edit.

export type ScriptLine = {id: string; text: string};
export type Word = {text: string; start: number; end: number};
export type LineTiming = {
  id: string;
  text: string;
  start: number;
  duration: number;
  words: Word[];
  audio?: string;
  source: 'estimate' | 'recorded' | 'speech-service';
};
export type Timing = {lines: LineTiming[]; total: number; tail: number};

// Lively conversational Hindi narration; real recordings replace this estimate.
const WORDS_PER_SECOND = 3.2;
export const LINE_GAP = 0.28;

const splitWords = (text: string) => text.split(/\s+/).filter(Boolean);
// Punctuation-heavy words ("...", "?") read with a pause; count them slightly longer.
const wordWeight = (word: string) => Math.max(2, [...word].length) + (/[.?!।,…]$/.test(word) ? 3 : 0);

/** Spread words across a line in proportion to their length. */
export function estimateWords(text: string, duration: number, offset = 0): Word[] {
  const words = splitWords(text);
  const weights = words.map(wordWeight);
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  let cursor = offset;
  return words.map((w, i) => {
    const length = (weights[i] / sum) * duration;
    const word = {text: w, start: cursor, end: cursor + length};
    cursor += length;
    return word;
  });
}

export const estimateDuration = (text: string) => splitWords(text).length / WORDS_PER_SECOND + 0.35;

export type MeasuredLine = {duration: number; audio?: string; words?: Word[]; source: LineTiming['source']};

/** Lay lines end to end. Measured lines keep their real duration and word cues. */
export function buildTiming(lines: ScriptLine[], measured: Record<string, MeasuredLine> = {}, tail = 2.2): Timing {
  let cursor = 0.4;
  const out = lines.map((line) => {
    const m = measured[line.id];
    const duration = m?.duration ?? estimateDuration(line.text);
    const start = cursor;
    const words = (m?.words?.length ? m.words : estimateWords(line.text, duration)).map((w) => ({...w, start: w.start + start, end: w.end + start}));
    cursor += duration + LINE_GAP;
    return {id: line.id, text: line.text, start, duration, words, audio: m?.audio, source: m?.source ?? 'estimate'};
  });
  return {lines: out, total: cursor + tail, tail};
}

export type Clock = ReturnType<typeof clock>;

/** Frame lookups for an edit: c.line('hook'), c.word('hook', 'आदमी'), c.end('hook'). */
export function clock(timing: Timing, fps: number) {
  const find = (id: string) => {
    const line = timing.lines.find((l) => l.id === id);
    if (!line) throw new Error(`Unknown script line "${id}"`);
    return line;
  };
  const f = (seconds: number) => Math.round(seconds * fps);
  return {
    fps,
    total: f(timing.total),
    line: (id: string, offset = 0) => f(find(id).start + offset),
    end: (id: string, offset = 0) => f(find(id).start + find(id).duration + offset),
    /** Start frame of the first word in the line containing `match`; `nth` picks a later match. */
    word: (id: string, match: string, nth = 0, offset = 0) => {
      const hits = find(id).words.filter((w) => w.text.includes(match));
      const hit = hits[nth];
      if (!hit) throw new Error(`Word "${match}" not found in line "${id}"`);
      return f(hit.start + offset);
    },
    seconds: f,
  };
}
