import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lintGrammar, lintPlan} from '../src/collage/formats/fun-facts';
import type {FunFactsPlan} from '../src/collage/formats/FunFactsShort';
import type {ScriptLine} from '../src/collage/timeline';

const messages = (issues: {message: string}[]) => issues.map((i) => i.message).join('\n');

test('grammar lint flags telegram lines and bare English past tense', () => {
  const telegram: ScriptLine = {id: 'f1', role: 'fact', text: '1991, Prahaar. खुद directed. Maratha Light Infantry के साथ तीन साल training.'};
  const out = messages(lintGrammar(telegram));
  assert.match(out, /No Hindi verb/);
  assert.match(out, /"directed".*direct की/);
  const spoken: ScriptLine = {id: 'f1', role: 'fact', text: '1991, Prahaar. खुद direct की, और तीन साल Maratha Light Infantry के साथ training ली.'};
  assert.deepEqual(lintGrammar(spoken), []);
  // English past participles with a Hindi helper are fine.
  assert.deepEqual(lintGrammar({id: 'f2', role: 'fact', text: 'ये It Happened One Night से inspired थी.'}), []);
});

test('honorific lint asks for plural verbs only when the short opts in', () => {
  const line: ScriptLine = {id: 'hook', role: 'hook', text: 'Nana Patekar Kargil में गया था?'};
  assert.deepEqual(lintGrammar(line), []);
  const out = messages(lintGrammar(line, {honorific: true}));
  assert.match(out, /गया → गए/);
  assert.match(out, /था → थे/);
  assert.deepEqual(lintGrammar({id: 'hook', role: 'hook', text: 'Nana Patekar सच में Kargil गए थे?'}, {honorific: true}), []);
});

test('plan lint checks the stills ledger, year tags and static beats', () => {
  const lines: ScriptLine[] = [
    {id: 'hook', role: 'hook', text: 'Hook?'},
    {id: 'f1', role: 'fact', text: 'एक बहुत लंबी line जो बिना किसी cut के एक ही still पर चलती रहती है और रुकती ही नहीं है.', source: 0},
    {id: 'payoff', role: 'payoff', text: 'Payoff.', source: 0},
    {id: 'loop', role: 'loop', text: 'Hook.'},
  ];
  const plan: FunFactsPlan = {
    hook: {lines: ['hook'], headline: 'h', still: {src: 'shorts/x/stills/missing.jpg'}},
    facts: [{lines: ['f1'], headline: 'f', still: {src: 'shorts/x/stills/naam.jpg', year: 2015}}],
    payoff: {lines: ['payoff'], headline: 'p'},
    loop: {lines: ['loop']},
  };
  const ledger = [{file: 'shorts/x/stills/naam.jpg', label: 'Nana Patekar: Jal Kranti / Naam Foundation water work'}];
  const issues = lintPlan(plan, lines, ledger);
  assert.ok(issues.some((i) => i.level === 'error' && /missing\.jpg is not in stills\.json/.test(i.message)));
  assert.match(messages(issues), /Tag says 2015 .* has no year/);
  assert.match(messages(issues), /one still with no cut, pop or reveal/);
  plan.facts[0].still!.year = undefined;
  plan.facts[0].pop = {word: 'line', text: 'X'};
  plan.hook.still = undefined;
  assert.deepEqual(lintPlan(plan, lines, ledger), []);
});
