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

export function lintFunFacts(lines: ScriptLine[], sources: {url: string}[], lexicon: Record<string, string> = {}): Issue[] {
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
