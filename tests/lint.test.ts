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
    hook: {lines: ['hook'], headline: 'असली villain कौन था?', still: {src: 'shorts/x/stills/missing.jpg'}},
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

test('v2 plan lint: layout specs, variety, cameo count and tributes', () => {
  const lines: ScriptLine[] = [
    {id: 'hook', role: 'hook', text: 'Guide दो बार बनी?'},
    {id: 'f1', role: 'fact', text: 'English version 120 minutes की थी.', source: 0},
    {id: 'f2', role: 'fact', text: 'Hindi version 183 minutes की थी.', source: 0},
    {id: 'payoff', role: 'payoff', text: 'एक hit, एक गायब.', source: 0},
    {id: 'loop', role: 'loop', text: 'Guide दो बार?'},
  ];
  const plan: FunFactsPlan = {
    design: 'v2',
    hook: {lines: ['hook'], headline: 'Guide दो बार बनी?', react: {word: 'बनी', expression: 'shock'}},
    facts: [
      {lines: ['f1'], headline: 'a', layout: 'number'},
      {lines: ['f2'], headline: 'b', layout: 'number', number: {word: '999', value: 183}, react: {word: 'Hindi', expression: 'happy'}},
    ],
    payoff: {lines: ['payoff'], headline: 'p', react: {word: 'hit', expression: 'wink'}},
    loop: {lines: ['loop']},
  };
  const out = messages(lintPlan(plan, lines, [], {tribute: true}));
  assert.match(out, /layout "number" needs a `number` spec/);
  assert.match(out, /Same layout \(number\)/);
  assert.match(out, /number word "999" is not in line "f2"/);
  assert.match(out, /tribute Short/);
  plan.facts[1].react = undefined;
  plan.facts[0] = {lines: ['f1'], headline: 'a', layout: 'number', number: {word: '120', value: 120}};
  plan.facts[1] = {lines: ['f2'], headline: 'b', layout: 'versus', versus: {top: {word: 'Hindi'}, bottom: {word: '183'}, middle: 'VS'}};
  assert.deepEqual(lintPlan(plan, lines, []), []);
});

test('headline lint: the hook headline and question headlines need a verb', () => {
  const lines: ScriptLine[] = [
    {id: 'hook', role: 'hook', text: 'Mr. India पहले Amitabh को offer हुई थी?'},
    {id: 'f1', role: 'fact', text: 'Salim-Javed ने ये role लिखा था.', source: 0},
    {id: 'payoff', role: 'payoff', text: 'Anil Kapoor को मिला.', source: 0},
    {id: 'loop', role: 'loop', text: 'Mr. India?'},
  ];
  const plan: FunFactsPlan = {
    hook: {lines: ['hook'], headline: 'Mr. India\nAmitabh की?'},
    facts: [{lines: ['f1'], headline: 'पहली पसंद\nकौन?'}],
    payoff: {lines: ['payoff'], headline: 'Anil\nKapoor'},
    loop: {lines: ['loop']},
  };
  const out = messages(lintPlan(plan, lines, []));
  assert.match(out, /Hook headline "Mr. India \/ Amitabh की\?" has no verb/);
  assert.match(out, /Question headline "पहली पसंद \/ कौन\?" has no verb/);
  assert.doesNotMatch(out, /Anil/);
  plan.hook.headline = 'Mr. India पहले\nAmitabh को मिली थी?';
  plan.facts[0].headline = 'पहली पसंद\nRajesh Khanna';
  assert.deepEqual(lintPlan(plan, lines, []).filter((i) => /headline/i.test(i.message)), []);
});
