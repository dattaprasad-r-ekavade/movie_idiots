// "Did you know?" Short: the script structure and its lint.
//
// Language: Hinglish as people talk, not textbook Hindi. English for film words, reactions and
// numbers people say in English (director, villain, box office, "seriously", years); Hindi for
// the glue. "इस film का villain actually किसी और का था" — not "इस चलचित्र के खलनायक की भूमिका…".
// Captions show the line as written; the voice still gets Devanagari via toSpoken().
//
//   hook     ≤ 3 s. The single most surprising fact as a specific claim or question (name, number, year).
//            Opens a loop the payoff closes. No greeting, no channel name, no "आज हम बात करेंगे".
//   promise  ≤ 5 s, optional. Why to stay: "और third fact तो fans को भी नहीं पता।"
//   fact ×3–5  One fact per beat, 5–9 s each, each with a source. Optional `reveal` line right after
//            for the punch ("और वो role? …"). Escalate: save the strongest fact for last.
//   payoff   Closes the hook's loop with the detail the hook withheld.
//   loop     Last line echoes the hook's words so the restart feels like a continuation.
//   cta      Optional, very short, and only after the loop; prefer the pinned comment/description.
//
// Target 30–45 s. Visual change every 2–4 s, a new beat every 5–9 s.
import {estimateDuration, type LineRole, type ScriptLine} from '../timeline';
import {toSpoken} from '../../speech';
import {SOUNDS} from '../../delivery';
import type {FunFactsPlan, StillRef} from './FunFactsShort';

// Formal/textbook words that make a Short sound like a news bulletin, with what people say.
export const PURIST: Record<string, string> = {
  निर्देशक: 'director', निर्माता: 'producer', अभिनेता: 'actor', अभिनेत्री: 'actress', दर्शक: 'audience', दर्शकों: 'audience',
  चलचित्र: 'film', पटकथा: 'script', दृश्य: 'scene', संगीत: 'music', पुरस्कार: 'award', प्रसिद्ध: 'famous', लोकप्रिय: 'popular',
  सफलता: 'success', असफल: 'flop', सर्वश्रेष्ठ: 'best', सर्वाधिक: 'सबसे ज़्यादा', अत्यंत: 'बहुत', अत्यधिक: 'बहुत ज़्यादा', किंतु: 'लेकिन', परंतु: 'पर',
  तथा: 'और', एवं: 'और', अतः: 'तो', यद्यपि: 'हालाँकि', कदाचित: 'शायद', तत्पश्चात: 'उसके बाद', आरंभ: 'शुरू', प्रारंभ: 'शुरू', समाप्त: 'ख़त्म',
  प्रथम: 'पहला / first', द्वितीय: 'दूसरा', वर्ष: 'साल', विश्व: 'world / दुनिया', अद्भुत: 'कमाल', रोचक: 'interesting', तथ्य: 'fact', तथ्यों: 'facts',
  उपरांत: 'बाद', पश्चात: 'बाद', हेतु: 'के लिए', द्वारा: 'ने', संभवतः: 'शायद', वास्तव: 'actually', निश्चित: 'pakka', जानकारी: 'पता',
};

export type Issue ={level: 'error' | 'warn'; line?: string; message: string};

const words = (text: string) => text.split(/\s+/).filter(Boolean);
const stem = (w: string) => w.replace(/[^\p{L}\p{N}\p{M}]/gu, '').toLowerCase();
const DEVANAGARI = /[ऀ-ॿ]/;

// Finite verbs and auxiliaries. A fact line of 3+ Hindi words with none of these anywhere reads like a
// telegram ("Maratha Light Infantry के साथ तीन साल training.") instead of a spoken sentence.
const VERBS = new Set(`है हैं था थे थी थीं हो होता होती होते हुआ हुई हुए किया की किए कीं ली लिया लिए दी दिया दिए गया गए गई गयी गईं
  रहा रहे रही सकता सकते सकी सका पाया पाए मिला मिली मिले बना बनी बने बनाई बनाया आया आई आए आएगा जाता जाती जाते करता करते करती करो
  लगा लगी लगे कहा बोला बोले पड़ा पड़ी चाहिए निकला निकली निकले पहुँचे पहुँचा पहुँची छोड़ा छोड़ी छोड़े चला चली चले जीता जीती जीते
  हारा हारी हारे देखा देखी देखे सुना सुनी लौटे लौटा भेजा भेजी उठा उठी गिरा गिरी मरा रखा रखी बदला बदली बिका बिकी चलेगा
  लिखा लिखी लिखे सकीं सकें सके पता बताया बताई माना मानी गाया गाई खेला खेली दिखा दिखाई दिखाया कमाया कमाए कमाई चुना चुनी बिताए बिताया`.split(/\s+/));

// Singular masculine verb forms. With `honorific`, a real person (an elder, a tribute subject) gets
// the respectful plural: "Kargil गए थे", not "Kargil गया था".
const SINGULAR: Record<string, string> = {
  गया: 'गए', था: 'थे', रहा: 'रहे', करता: 'करते', जाता: 'जाते', आया: 'आए', बोला: 'बोले', चला: 'चले', सकता: 'सकते', सका: 'सके',
  देता: 'देते', लेता: 'लेते', रहता: 'रहते', लौटा: 'लौटे', पहुँचा: 'पहुँचे', जीता: 'जीते', हारा: 'हारे', निकला: 'निकले',
};

export type LintOptions = {
  /** The Short is about a real person who should be spoken of respectfully (plural verbs). */
  honorific?: boolean;
};

/** Grammar checks for one line: verbless fact clauses, bare English verbs, and honorific agreement. */
export function lintGrammar(line: ScriptLine, options: LintOptions = {}): Issue[] {
  const issues: Issue[] = [];
  const warn = (message: string) => issues.push({level: 'warn', line: line.id, message});
  if (line.role === 'fact' || line.role === 'reveal' || line.role === 'promise') {
    // Line-level: one elliptical clause ("साढ़े तीन करोड़ का budget") is fine after a full sentence.
    const ws = words(line.text).map(stem);
    if (ws.filter((w) => DEVANAGARI.test(w)).length >= 3 && !ws.some((w) => VERBS.has(w)))
      warn(`No Hindi verb anywhere in the line. Say at least one clause as a full sentence ("… training ली", "… शुरू की"), not a telegram`);
  }
  // "खुद directed." — an English past tense with no Hindi helper. Hinglish puts the helper on the stem: "direct की".
  for (const m of line.text.matchAll(/\b([A-Za-z]+ed)\s*(?=[.?!,;]|$)/g))
    warn(`"${m[1]}" ends the clause as an English past tense; use the stem + Hindi helper ("${m[1].replace(/e?d$/, '')} की / किया")`);
  if (options.honorific) {
    const found = words(line.text).map(stem).filter((w) => SINGULAR[w]);
    if (found.length) warn(`Honorific Short: ${found.map((w) => `${w} → ${SINGULAR[w]}`).join(', ')} (use plural for the person, unless the subject is a thing)`);
  }
  return issues;
}

export function lintFunFacts(lines: ScriptLine[], sources: {url: string}[], lexicon: Record<string, string> = {}, options: LintOptions = {}): Issue[] {
  const issues: Issue[] = [];
  const err = (message: string, line?: string) => issues.push({level: 'error', line, message});
  const warn = (message: string, line?: string) => issues.push({level: 'warn', line, message});
  const roles = lines.map((l) => l.role);
  const of = (role: LineRole) => lines.filter((l) => l.role === role);

  const missing = lines.filter((l) => !l.role);
  if (missing.length) err(`Every line needs a role (${missing.map((l) => l.id).join(', ')})`);
  if (roles[0] !== 'hook') err('First line must be the hook');
  const hook = lines[0];
  if (hook) {
    const secs = estimateDuration(hook.text);
    if (words(hook.text).length > 10 || secs > 4) warn(`Hook runs ~${secs.toFixed(1)} s; land it in about 3 s (≤ 10 words)`, hook.id);
    if (/^(नमस्ते|hello|hi|दोस्तों|आज हम|welcome)/i.test(hook.text.trim())) err('Hook opens with a greeting/intro; open on the fact', hook.id);
    if (!/[?…]|\.\.\.|\d/.test(hook.text)) warn('Hook has no question, number or trailing tease; make it specific and open a loop', hook.id);
  }
  if (of('hook').length > 2) warn('More than two hook lines; the hook is one breath');
  const facts = of('fact');
  if (facts.length < 3 || facts.length > 5) err(`Use 3–5 fact lines (found ${facts.length})`);
  const order = (role: LineRole) => roles.lastIndexOf(role);
  if (!of('payoff').length) err('Add a payoff line that closes the hook');
  if (!of('loop').length) err('Add a loop line that echoes the hook');
  if (order('payoff') >= 0 && order('payoff') < order('fact')) err('Payoff must come after the last fact');
  const loopAt = roles.indexOf('loop');
  if (loopAt >= 0 && lines.slice(loopAt + 1).some((l) => l.role !== 'cta')) err('Only a cta may follow the loop');
  if (roles.slice(0, -1).includes('cta') && roles.lastIndexOf('cta') < lines.length - 1) err('cta belongs at the very end');
  for (const [i, l] of lines.entries()) if (l.role === 'reveal' && !['fact', 'reveal'].includes(roles[i - 1] ?? '')) warn('reveal should follow its fact', l.id);

  const loop = of('loop')[0];
  if (hook && loop) {
    const hookWords = new Set(words(hook.text).map(stem).filter((w) => [...w].length > 2));
    const shared = words(loop.text).map(stem).filter((w) => hookWords.has(w));
    if (!shared.length) warn('Loop line shares no key word with the hook; echo the hook so the restart lands', loop.id);
  }

  for (const l of lines.filter((x) => x.role === 'fact' || x.role === 'payoff')) {
    const refs = l.source === undefined ? [] : Array.isArray(l.source) ? l.source : [l.source];
    if (!refs.length) err('Fact needs a source index', l.id);
    for (const r of refs) if (!sources[r]) err(`Source ${r} does not exist`, l.id);
  }
  for (const l of lines) {
    const secs = estimateDuration(l.text);
    if (secs > 9) warn(`~${secs.toFixed(1)} s in one line; split it so the picture can change`, l.id);
    const spoken = toSpoken(l.text, l.say, lexicon);
    if (spoken.unknown.length) warn(`Voice will guess at: ${spoken.unknown.join(', ')}. Add to LEXICON or set \`say\``, l.id);
  }
  for (const l of lines) {
    if (l.text.includes('|') || l.say?.includes('|')) err('Use "." as the sentence mark, never "|"', l.id);
    if (l.text.includes('।')) warn('Use "." instead of "।" (shown as is, read as a full stop)', l.id);
    if (!l.en) warn('No English draft (en). Write the line in English first, then translate to Hinglish', l.id);
    issues.push(...lintGrammar(l, options));
    const formal = words(l.text).map(stem).filter((w) => PURIST[w]);
    if (formal.length) warn(`Sounds like textbook Hindi: ${formal.map((w) => `${w} → ${PURIST[w]}`).join(', ')}`, l.id);
    for (const s of l.delivery?.sfx ?? []) {
      if (!l.text.includes(s.word)) err(`sfx word "${s.word}" is not in the line`, l.id);
      if (!SOUNDS.includes(s.sound)) err(`Unknown sound ${s.sound}; use one of ${SOUNDS.join(', ')}`, l.id);
    }
  }
  const total = lines.reduce((n, l) => n + estimateDuration(l.text) + 0.28, 0.4);
  if (total > 50) warn(`Estimated ${total.toFixed(0)} s; fun-fact Shorts do best around 30–45 s`);
  if (total < 20) warn(`Estimated ${total.toFixed(0)} s; too thin for 3+ facts`);
  return issues;
}

/** One entry of `public/shorts/SLUG/stills/stills.json`, written by `npm run short -- still`. */
export type LedgerEntry = {file: string; label: string; credit?: string; sourceUrl?: string; rights?: string};

/**
 * Design and provenance checks for a fun-facts plan: every still is in the ledger, on-screen year tags
 * agree with the ledger label, and no beat holds one picture with nothing else changing for too long.
 */
export function lintPlan(plan: FunFactsPlan, lines: ScriptLine[], ledger: LedgerEntry[]): Issue[] {
  const issues: Issue[] = [];
  const byId = new Map(lines.map((l) => [l.id, l]));
  const byFile = new Map(ledger.map((e) => [e.file, e]));
  const check = (still: StillRef | undefined, where: string) => {
    if (!still?.src) return;
    const entry = byFile.get(still.src);
    if (!entry) {
      issues.push({level: 'error', line: where, message: `${still.src} is not in stills.json; download it with \`npm run short -- still\` so source, credit and rights are recorded`});
      return;
    }
    if (still.year !== undefined) {
      const years: string[] = entry.label.match(/\b(1[89]\d\d|20\d\d)\b/g) ?? [];
      if (!years.includes(String(still.year)))
        issues.push({level: 'warn', line: where, message: `Tag says ${still.year} but the ledger label "${entry.label}" ${years.length ? `says ${years.join('/')}` : 'has no year'}; check the photo's own date (signage, source caption) or drop the year`});
    }
  };
  check(plan.hook.still, plan.hook.lines[0]);
  check(plan.payoff.still, plan.payoff.lines[0]);
  for (const fact of plan.facts) {
    const where = fact.lines[0];
    check(fact.still, where);
    for (const cut of fact.cuts ?? []) check(cut, where);
    const secs = fact.lines.reduce((n, id) => n + estimateDuration(byId.get(id)?.text ?? ''), 0);
    const changes = (fact.cuts?.length ?? 0) + (fact.pop ? 1 : 0) + (fact.reveal ? 1 : 0);
    if (secs > 6 && changes === 0)
      issues.push({level: 'warn', line: where, message: `~${secs.toFixed(0)} s on one still with no cut, pop or reveal; add a \`cuts\` print or a \`pop\` so the picture changes every 2–4 s`});
  }
  return issues;
}
