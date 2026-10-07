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
  {id: 'hook', role: 'hook', text: 'इस film का villain... actually किसी और का था?'},
  {id: 'promise', role: 'promise', text: 'और third fact तो fans को भी नहीं पता।'},
  {id: 'f1', role: 'fact', source: 0, text: 'Fact one: shooting 1973 में शुरू हुई, और पूरे दो साल चली।'},
  {id: 'f2', role: 'fact', source: 0, text: 'Fact two: एक scene के लिए पूरा गाँव set पर बना।'},
  {id: 'f2r', role: 'reveal', text: 'और वो set? आज tourist spot है।', delivery: {sfx: [{word: 'tourist', sound: 'pop.wav', volume: 0.5}]}},
  {id: 'f3', role: 'fact', source: 0, text: 'Fact three: climax दो बार shoot हुआ, और पहला version कभी release ही नहीं हुआ।', delivery: {hold: 0.2, sfx: [{word: 'कभी', sound: 'stamp.wav'}]}},
  {id: 'payoff', role: 'payoff', source: 0, text: 'और वो villain? Role पहले किसी और actor को offer हुआ था।'},
  {id: 'loop', role: 'loop', text: 'Socho, अगर villain बदल जाता... तो ये film कैसी होती?', say: 'सोचो, अगर विलेन बदल जाता... तो ये फ़िल्म कैसी होती?'},
];

export const sources = [{url: 'https://example.com/replace-me', note: 'Replace with the real source for each fact.'}];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {};

export const plan: FunFactsPlan = {
  hook: {lines: ['hook', 'promise'], headline: 'असली villain\nकौन था?', accent: ['villain'], still: {film: 'फिल्म', year: 1975}},
  facts: [
    {lines: ['f1'], headline: 'Shooting:\nपूरे दो साल', accent: ['दो', 'साल'], still: {film: 'फिल्म', year: 1975}, pop: {word: '1973', text: '1973'}},
    {lines: ['f2', 'f2r'], headline: 'पूरा गाँव\nset पर बना', accent: ['गाँव'], still: {film: 'फिल्म', year: 1975}, reveal: {line: 'f2r', headline: 'आज: tourist spot', accent: ['tourist']}},
    {lines: ['f3'], headline: 'Climax\nदो बार shoot', accent: ['दो', 'बार'], still: {film: 'फिल्म', year: 1975}, pop: {word: 'कभी', text: 'UNRELEASED'}},
  ],
  payoff: {lines: ['payoff'], headline: 'Role पहले\nकिसी और को', accent: ['और']},
  loop: {lines: ['loop']},
  numbered: true,
};

export const component = funFacts(plan);
