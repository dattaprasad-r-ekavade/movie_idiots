import {test} from 'node:test';
import assert from 'node:assert/strict';
import {displayCues, englishYear, hindiNumber, toSpoken} from '../src/speech';
import {edgeProsody, elevenDelivery, resolveDelivery, windowsRate} from '../src/delivery';
import {buildTiming} from '../src/collage/timeline';
import {lintFunFacts} from '../src/collage/formats/fun-facts';
import type {ScriptLine} from '../src/collage/timeline';

test('years and dates are spoken in English, in pairs; amounts stay Hindi', () => {
  assert.equal(englishYear(1988), 'नाइनटीन एटी एट');
  assert.equal(englishYear(1905), 'नाइनटीन ओ फ़ाइव');
  assert.equal(englishYear(1900), 'नाइनटीन हंड्रेड');
  assert.equal(englishYear(2004), 'टू थाउज़ेंड फ़ोर');
  assert.equal(englishYear(2024), 'ट्वेंटी ट्वेंटी फ़ोर');
  assert.equal(toSpoken('3 मई 1913.').text, 'थर्ड मे नाइनटीन थर्टीन.');
  assert.equal(toSpoken('25 June 1975 को').text, 'ट्वेंटी फ़िफ़्थ जून नाइनटीन सेवेंटी फ़ाइव को');
  assert.equal(toSpoken('1990s की films').text, 'नाइनटीन नाइंटीज़ की फ़िल्में');
  assert.equal(toSpoken('Fact one: 15 रुपये').text, 'फ़ैक्ट वन: पंद्रह रुपये');
  assert.equal(hindiNumber(350), 'तीन सौ पचास');
});

test('audio directions: role defaults, overrides and provider mapping', () => {
  const payoff = resolveDelivery({role: 'payoff'});
  assert.equal(payoff.music, 'drop');
  assert.ok((payoff.pause ?? 0) > 0);
  const hook = resolveDelivery({role: 'hook', delivery: {rate: -5}});
  assert.deepEqual(edgeProsody(hook, '+6%'), {rate: '+11%', pitch: '+8Hz', volume: '+5%'});
  assert.equal(elevenDelivery(hook, 'eleven_multilingual_v2').tag, undefined);
  assert.equal(elevenDelivery(hook, 'eleven_v3').tag, 'excited');
  assert.equal(windowsRate(hook), 1);
  // Pauses become silence on the timeline before the line.
  const plain = buildTiming([{id: 'a', text: 'एक दो'}, {id: 'b', text: 'तीन चार'}]);
  const paused = buildTiming([{id: 'a', text: 'एक दो'}, {id: 'b', text: 'तीन चार', delivery: {pause: 0.5, music: 'drop'}}]);
  assert.ok(Math.abs(paused.lines[1].start - plain.lines[1].start - 0.5) < 1e-9);
  assert.equal(paused.lines[1].music, 'drop');
});

test('Latin names and loanwords become Devanagari; unknown words are reported', () => {
  const s = toSpoken('1990, दिल। Raja और Madhu college में, St. Xavier\'s वाले Zorblat।');
  assert.equal(s.text, 'नाइनटीन नाइंटी, दिल। राजा और मधु कॉलेज में, सेंट Xavier\'s वाले Zorblat।');
  assert.deepEqual(s.unknown, ['Xavier\'s', 'Zorblat']);
  assert.equal(toSpoken('Zorblat आया', undefined, {zorblat: 'ज़ोरब्लाट'}).text, 'ज़ोरब्लाट आया');
  assert.equal(toSpoken('80s-90s की फिल्में').text, 'एटीज़ नाइंटीज़ की फिल्में');
});

test('speech cues map back onto display words for captions and anchors', () => {
  const text = '1988 में Raj आया';
  const spoken = toSpoken(text);
  // नाइनटीन एटी एट में राज आया → 6 spoken words for 4 display words.
  const cues = spoken.text.split(' ').map((w, i) => ({text: w, start: i * 0.5, end: i * 0.5 + 0.4}));
  assert.deepEqual(displayCues(text, spoken, cues), [
    {text: '1988', start: 0, end: 1.4},
    {text: 'में', start: 1.5, end: 1.9},
    {text: 'Raj', start: 2, end: 2.4},
    {text: 'आया', start: 2.5, end: 2.9},
  ]);
  // A service that merges words still yields ordered display cues across the spoken span.
  const merged = displayCues(text, spoken, [{text: 'x', start: 0, end: 1}, {text: 'y', start: 1, end: 3}]);
  assert.equal(merged.length, 4);
  assert.equal(merged[0].start, 0);
  assert.ok(Math.abs(merged[3].end - 3) < 1e-9);
});

test('fun-facts lint enforces hook, fact count, sources, payoff and loop', () => {
  const good: ScriptLine[] = [
    {id: 'h', role: 'hook', text: 'इस फिल्म का villain पहले किसी और का था?'},
    {id: 'f1', role: 'fact', source: 0, text: 'पहली बात एक।'},
    {id: 'f2', role: 'fact', source: 0, text: 'दूसरी बात दो।'},
    {id: 'f3', role: 'fact', source: 0, text: 'तीसरी बात तीन।'},
    {id: 'p', role: 'payoff', source: 0, text: 'वो villain कोई और था।'},
    {id: 'l', role: 'loop', text: 'सोचो, अगर villain बदल जाता?'},
  ];
  const sources = [{url: 'https://example.com'}];
  assert.deepEqual(lintFunFacts(good, sources).filter((i) => i.level === 'error'), []);
  const bad = [{id: 'x', role: 'fact' as const, text: 'नमस्ते दोस्तों'}, ...good.slice(1, 2)];
  const errors = lintFunFacts(bad, sources).filter((i) => i.level === 'error').map((i) => i.message).join('\n');
  assert.match(errors, /First line must be the hook/);
  assert.match(errors, /3–5 fact lines/);
  assert.match(errors, /source index/);
  assert.match(errors, /payoff/);
  assert.match(errors, /loop/);
});
