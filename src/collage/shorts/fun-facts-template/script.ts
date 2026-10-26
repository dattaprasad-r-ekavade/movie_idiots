// Starter for a "Did you know?" Short. Copy this folder to src/collage/shorts/<slug>/, replace
// every line and the plan, register it in ../index.ts, then:
//   npm run short -- lint <slug>      structure + pronunciation check
//   npm run short -- say <slug>       Devanagari the voice will read + audio direction per line
//   npm run short -- still <slug> --url … --source … --credit … --label "Film (Year): …" --name f1
//   npm run short -- stills <slug>    contact sheets → render --draft → render
//
// Placeholder text below is layout filler, not facts. Do not publish it.
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'fun-facts-template';
export const title = 'Template: Did you know? (layout filler)';
export const format = 'fun-facts' as const;

// Write Hinglish the way you'd tell a friend: English for film words and reactions, Hindi for the
// glue. Captions show `text`; the voice reads Devanagari from toSpoken() or `say`.
// Hook ≤ 10 words with a withheld detail. Facts escalate; best one last. Loop echoes the hook.
// `delivery` adds audio direction on top of the role defaults (src/delivery.ts): mood, rate, pitch,
// pause before, hold after, music duck/drop/swell, and sfx on a spoken word.
export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "The villain of this film was originally someone else's role?",
    text: "इस film का villain... actually किसी और का था?",
  },
  // Setup: one line of context that makes the hook matter. Never the answer.
  {
    id: 'f1',
    role: 'setup',
    source: 0,
    en: "The writers wrote the villain with one actor in mind.",
    text: "Writers ने villain का role एक ख़ास actor को सोचकर लिखा था.",
  },
  // Tension: the obstacle, with a turn word (पर / लेकिन / फिर भी / मना). Every line moves toward the answer.
  {
    id: 'f2',
    role: 'tension',
    source: 0,
    en: "But that actor turned it down, and the dates were already fixed.",
    text: "पर उस actor ने मना कर दिया, और shooting की dates तय हो चुकी थीं.",
  },
  {
    id: 'f2r',
    role: 'reveal',
    en: "And the replacement? Nobody had heard of him.",
    text: "और replacement? उसे कोई जानता तक नहीं था.",
    delivery: {sfx: [{word: "replacement?", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f3',
    role: 'tension',
    source: 0,
    en: "Even then, the producers doubted his voice until the last day.",
    text: "फिर भी producers को आख़िरी दिन तक उसकी आवाज़ पर शक था.",
    delivery: {sfx: [{word: "शक", sound: 'stamp.wav', volume: 0.45}]},
  },
  // Payoff: answers the exact hook question, in the last 3–5 s.
  {
    id: 'payoff',
    role: 'payoff',
    source: 0,
    en: "And that villain? The role was first offered to another actor.",
    text: "और वो villain? Role पहले किसी और actor को offer हुआ था.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "The villain, someone else's?",
    text: "Villain... किसी और का?",
  },
];

export const sources = [{url: 'https://example.com/replace-me', note: 'Replace with the real source for each fact.'}];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {writers: 'राइटर्स', dates: 'डेट्स', replacement: 'रिप्लेसमेंट', producers: 'प्रोड्यूसर्स'};

export const plan: FunFactsPlan = {
  hook: {lines: ['hook'], headline: 'असली villain\nकौन था?', accent: ['villain'], still: {film: 'फिल्म', year: 1975}},
  facts: [
    {lines: ['f1'], headline: 'Role किसके लिए\nलिखा गया?', accent: ['किसके'], still: {film: 'फिल्म', year: 1975}, pop: {word: 'ख़ास', text: 'WRITTEN FOR…'}},
    {lines: ['f2', 'f2r'], headline: 'पर actor ने\nमना किया', accent: ['मना'], still: {film: 'फिल्म', year: 1975}, reveal: {line: 'f2r', headline: 'Replacement: अनजान', accent: ['अनजान']}},
    {lines: ['f3'], headline: 'आवाज़ पर\nशक था', accent: ['शक'], still: {film: 'फिल्म', year: 1975}, pop: {word: 'शक', text: 'DOUBT'}},
  ],
  payoff: {lines: ['payoff'], headline: 'Role पहले\nकिसी और को', accent: ['और']},
  loop: {lines: ['loop']},
  numbered: true,
};

export const component = funFacts(plan);
