import {test} from 'node:test';
import assert from 'node:assert/strict';
import {getLength} from '@remotion/paths';
import {activeStroke, arrowPaths, cameraAt, circlePath, fitBox, progress, scheduleStrokes, sweepPath, toScreen, underlinePath, unionBox} from '../src/whiteboard/schedule';
import {DOODLES} from '../src/whiteboard/doodles';
import {inspect} from '../src/whiteboard/Whiteboard';
import {buildTiming, clock} from '../src/collage/timeline';
import * as demo from '../src/collage/shorts/archive/whiteboard-demo/script';

test('strokes share the drawing time by length, with pen lifts between them', () => {
  const spans = scheduleStrokes([100, 300], 10, 42, 2);
  assert.equal(spans[0].start, 10);
  assert.ok(Math.abs(spans[1].end - 52) < 1e-9);
  assert.ok(Math.abs(spans[1].start - spans[0].end - 2) < 1e-9);
  // Same pen speed: the 3× longer stroke takes 3× the frames.
  assert.ok(Math.abs((spans[1].end - spans[1].start) / (spans[0].end - spans[0].start) - 3) < 1e-9);
  assert.deepEqual(scheduleStrokes([], 0, 10), []);
});

test('stroke progress and the active stroke follow the frame', () => {
  const spans = scheduleStrokes([1, 1], 0, 22, 2);
  assert.equal(progress(-5, spans[0]), 0);
  assert.equal(progress(5, spans[0]), 0.5);
  assert.equal(progress(100, spans[1]), 1);
  assert.equal(activeStroke(-1, spans), -1);
  assert.equal(activeStroke(3, spans), 0);
  assert.equal(activeStroke(15, spans), 1);
});

test('camera holds each key, then eases to the next over its move frames', () => {
  const keys = [
    {at: 0, x: 0, y: 0, zoom: 1},
    {at: 40, x: 100, y: 0, zoom: 4, move: 20},
  ];
  assert.deepEqual(cameraAt(10, keys), {x: 0, y: 0, zoom: 1});
  assert.deepEqual(cameraAt(20, keys), {x: 0, y: 0, zoom: 1});
  const mid = cameraAt(30, keys);
  assert.ok(Math.abs(mid.x - 50) < 1e-9);
  // Zoom moves in log space: halfway between 1× and 4× is 2×.
  assert.ok(Math.abs(mid.zoom - 2) < 1e-9);
  assert.deepEqual(cameraAt(60, keys), {x: 100, y: 0, zoom: 4});
});

test('fitBox centres a box and respects the zoom limits', () => {
  const cam = fitBox({x: 100, y: 200, w: 500, h: 100}, {w: 1000, h: 1000}, {fill: 0.8, maxZoom: 10});
  assert.equal(cam.x, 350);
  assert.equal(cam.y, 250);
  assert.ok(Math.abs(cam.zoom - 1.6) < 1e-9);
  assert.equal(fitBox({x: 0, y: 0, w: 1, h: 1}, {w: 1000, h: 1000}, {maxZoom: 2}).zoom, 2);
  const s = toScreen({x: 350, y: 250}, cam, {x: 540, y: 760});
  assert.deepEqual(s, {x: 540, y: 760});
  assert.deepEqual(unionBox([{x: 0, y: 0, w: 10, h: 10}, {x: 20, y: 5, w: 10, h: 10}], 1), {x: -1, y: -1, w: 32, h: 17});
});

test('hand-drawn shapes are deterministic and drawable', () => {
  assert.equal(circlePath(0, 0, 50, 30, 3), circlePath(0, 0, 50, 30, 3));
  assert.equal(underlinePath(0, 100, 10, 2), underlinePath(0, 100, 10, 2));
  for (const d of [circlePath(0, 0, 50, 30), underlinePath(0, 100, 10), ...arrowPaths({x: 0, y: 0}, {x: 300, y: 100}), sweepPath({x: 0, y: 0, w: 400, h: 300}).d]) {
    assert.ok(getLength(d) > 0, d);
  }
});

test('every doodle stroke parses and has length', () => {
  for (const [name, doodle] of Object.entries(DOODLES)) {
    assert.ok(doodle.strokes.length > 0, name);
    for (const d of doodle.strokes) assert.ok(getLength(d) > 1, `${name}: ${d}`);
  }
});

test('demo board: elements start on their words, camera keys are ordered, overview comes last', () => {
  const c = clock(buildTiming(demo.lines), 30);
  const {items, keys} = inspect(demo.board, c);
  assert.equal(items.length, demo.board.elements.length - 1);
  for (const it of items) assert.ok(it.end > it.start);
  assert.equal(keys[0].at, 0);
  for (let i = 1; i < keys.length; i++) assert.ok(keys[i].at >= keys[i - 1].at);
  assert.equal(keys[keys.length - 1].at, c.line('loop'));
});
