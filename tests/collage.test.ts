import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildTiming, clock, estimateWords} from '../src/collage/timeline';
import {SHORTS} from '../src/collage/shorts';

const lines = [{id: 'a', text: 'भारत की पहली हीरोइन... एक आदमी था।'}, {id: 'b', text: 'और हाँ'}];

test('estimated words cover the whole line in order', () => {
  const words = estimateWords(lines[0].text, 3, 1);
  assert.equal(words.length, 7);
  assert.equal(words[0].start, 1);
  assert.ok(Math.abs(words[words.length - 1].end - 4) < 1e-9);
  for (let i = 1; i < words.length; i++) assert.ok(words[i].start >= words[i - 1].end - 1e-9);
});

test('measured recordings replace estimates and shift later lines', () => {
  const estimated = buildTiming(lines);
  const measured = buildTiming(lines, {a: {duration: 5, audio: 'shorts/x/voice/a.wav', source: 'recorded'}});
  assert.equal(measured.lines[0].duration, 5);
  assert.equal(measured.lines[0].source, 'recorded');
  assert.ok(measured.lines[1].start > estimated.lines[1].start);
  assert.equal(measured.lines[1].source, 'estimate');
});

test('speech-service word cues are kept and offset to the line start', () => {
  const timing = buildTiming(lines, {b: {duration: 1, source: 'speech-service', words: [{text: 'और', start: 0.1, end: 0.4}, {text: 'हाँ', start: 0.5, end: 0.9}]}});
  const c = clock(timing, 30);
  assert.equal(c.word('b', 'हाँ'), Math.round((timing.lines[1].start + 0.5) * 30));
});

test('clock finds anchor words and rejects missing ones', () => {
  const c = clock(buildTiming(lines), 30);
  assert.ok(c.word('a', 'आदमी') > c.line('a'));
  assert.ok(c.end('a') < c.line('b'));
  assert.throws(() => c.word('a', 'missing'));
  assert.throws(() => c.line('zzz'));
});

test('every registered short has unique line IDs and sources', () => {
  for (const s of SHORTS) {
    assert.equal(new Set(s.lines.map((l) => l.id)).size, s.lines.length, s.slug);
    assert.ok(s.sources.length > 0, `${s.slug} needs sources`);
  }
});
