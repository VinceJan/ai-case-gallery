import assert from 'node:assert/strict';
import test from 'node:test';
import { Group } from 'three';
import { makeRail } from '../src/life.js';
import { START, clockAt, findPath, loadState, localRailBlocked } from '../src/sim.js';

test('clockAt starts at 08:15 and rolls over from 23:59 to day two', () => {
  assert.deepEqual(clockAt(0), { minute: 495, hour: 8.25, day: 1, text: '08:15' });
  const midnight = (1440 - 495) / 0.77;
  assert.deepEqual(clockAt(midnight - 0.001), {
    minute: 1439, hour: 1439 / 60, day: 1, text: '23:59',
  });
  assert.deepEqual(clockAt(midnight), { minute: 0, hour: 0, day: 2, text: '00:00' });
});

const saved = { stage: 7, seconds: 99_999_999.5, zone: 'station', x: -33.99, z: 35.99 };

test('loadState restores valid progress just inside the map bounds', () => {
  assert.deepEqual(loadState(JSON.stringify({ ...saved, extra: true })), saved);
});

test('loadState returns a fresh starting state for missing or invalid saves', () => {
  const cases = [
    ['missing save', null],
    ['malformed JSON', '{'],
    ['incomplete save', '{}'],
    ...Object.entries({
      stage: [-1, 1.5, 8],
      seconds: [-1, 100_000_000, '12'],
      zone: ['unknown'],
      x: [-34, 34],
      z: [-36, 36],
    }).flatMap(([field, values]) => values.map((value) => [
      `${field}=${JSON.stringify(value)}`, JSON.stringify({ ...saved, [field]: value }),
    ])),
  ];
  for (const [name, raw] of cases) {
    const state = loadState(raw);
    assert.deepEqual(state, START, name);
    assert.notStrictEqual(state, START, name);
  }
  assert.notStrictEqual(loadState(null), loadState(null));
});

test('localRailBlocked bounds the open crossing and blocks entry when closed', () => {
  for (const x of [-1.66, 3.66]) assert.equal(localRailBlocked(x, -13, false, -15), true);
  for (const x of [-1.65, 3.65]) assert.equal(localRailBlocked(x, -13, false, -15), false);
  for (const [outside, edge] of [[-14.59, -14.58], [-11.41, -11.42]]) {
    assert.equal(localRailBlocked(1, outside, true, outside), false);
    assert.equal(localRailBlocked(1, edge, true, outside), true);
    assert.equal(localRailBlocked(1, edge, false, outside), false);
  }
});

test('localRailBlocked lets someone already inside move away from the track center', () => {
  for (const direction of [-1, 1]) {
    const fromZ = -13 + direction;
    assert.equal(localRailBlocked(1, -13 + direction * 1.4, true, fromZ), false);
    assert.equal(localRailBlocked(1, -13 + direction * 0.6, true, fromZ), true);
  }
});

// Each character is a unit tile centered on its column and row coordinates.
const walkable = (rows) => (x, z) => rows[Math.round(z)]?.[Math.round(x)] === '.';

test('findPath takes a walkable detour around a wall on a bounded map', () => {
  const free = walkable(['.#.', '.#.', '...']);
  const start = [0, 0];
  const goal = [2, 0];
  const route = findPath(start, goal, free, 1);
  assert.deepEqual(route.at(-1), goal);
  let [x, z] = start;
  for (const [nextX, nextZ] of route) {
    const samples = Math.ceil(Math.hypot(nextX - x, nextZ - z) / 0.05);
    for (let i = 1; i <= samples; i++) {
      const point = [x + (nextX - x) * i / samples, z + (nextZ - z) * i / samples];
      assert.ok(free(...point), `route enters a blocked tile at ${point}`);
    }
    [x, z] = [nextX, nextZ];
  }
});

test('findPath cannot cut a diagonal corner between blocked tiles', () => {
  const free = walkable(['.#', '#.']);
  assert.deepEqual(findPath([0, 0], [1, 1], free, 1), []);
});

test('findPath also turns the corner when only one diagonal neighbor is blocked', () => {
  const map = walkable(['..', '..']);
  for (const [blockedX, blockedZ] of [[1, 0], [0, 1]]) {
    // The obstacle clips the middle of the diagonal without blocking the other neighbor.
    const free = (x, z) => map(x, z) && Math.hypot(x - blockedX, z - blockedZ) > 0.8;
    assert.deepEqual(findPath([0, 0], [1, 1], free, 1), [[blockedZ, blockedX], [1, 1]]);
  }
});

test('findPath reaches the exact off-grid goal on an unobstructed map', () => {
  const goal = [1.2, 1.15];
  assert.deepEqual(findPath([0.1, 0.1], goal, walkable(['..', '..'])), [goal]);
});

test('makeRail closes the crossing throughout train overlap and reopens after clearance', () => {
  // Geometry-only construction: life.js skips canvas labels when there is no document.
  const rail = makeRail(new Group());
  assert.equal(rail.closed, false);

  // Include the full two-car envelope (with end fittings) and the crossing deck.
  const trainHalf = 6.6;
  const left = -2.1;
  const right = 4.1;
  let overlapSamples = 0;
  for (let t = 0; t < 45; t += 1 / 32) {
    rail.update(t);
    if (rail.trainX + trainHalf < left || rail.trainX - trainHalf > right) continue;
    overlapSamples++;
    assert.equal(rail.closed, true, `crossing open during overlap at ${t}s`);
    assert.equal(rail.warning, true, `warning off during overlap at ${t}s`);
  }
  assert.ok(overlapSamples > 0, 'the train should pass through the crossing');

  rail.update(19); // Parked beyond the crossing, with time for the arms to rise.
  assert.ok(rail.trainX - trainHalf > right);
  assert.equal(rail.closed, false);
  assert.equal(rail.warning, false);
});
