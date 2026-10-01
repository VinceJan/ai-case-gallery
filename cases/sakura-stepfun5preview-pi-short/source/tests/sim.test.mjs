// 纯逻辑模块测试：node tests/sim.test.mjs
import assert from 'node:assert/strict';
import { SimClock, SPEED_MINUTES } from '../src/sim/clock.js';
import { WeatherSystem } from '../src/sim/weather.js';
import { Shop, ITEMS, SHOP_DEFS } from '../src/sim/items.js';
import { buildGraph, findPath, nearestNode, terrainHeight, buildingDoor, ROADS, BUILDINGS, POIS } from '../src/world/layout.js';

let passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓', name); }
  catch (e) { console.error('  ✗', name, '\n   ', e.message); process.exitCode = 1; }
}

console.log('— 时钟 —');
test('时间推进与跨天', () => {
  const c = new SimClock(1, 8 * 60);
  c.speedIndex = 2; // 5min/s
  c.advance(60);    // +300 分钟 → 13:00
  assert.equal(c.hour, 13);
  assert.equal(c.timeText, '13:00');
  c.minutes = 23 * 60;
  c.advance(60);    // 跨天
  assert.equal(c.day, 2);
});
test('日期文本', () => {
  const c = new SimClock(1, 0);
  assert.equal(c.dateText, '4月8日');
  c.day = 3;
  assert.equal(c.dateText, '4月10日');
});
test('睡眠到早晨', () => {
  const c = new SimClock(1, 22 * 60);
  c.sleepToMorning(7);
  assert.equal(c.day, 2);
  assert.equal(c.timeText, '07:00');
});
test('光照参数：正午强、夜晚弱', () => {
  const c = new SimClock(1, 12 * 60);
  const noon = c.lightParams();
  assert.ok(noon.sunI > 2, '正午阳光强度');
  const c2 = new SimClock(1, 23 * 60);
  assert.equal(c2.lightParams().isNight, true);
  const c3 = new SimClock(1, 18 * 60 + 30);
  assert.ok(c3.lightParams().warmth > 0.3, '黄昏暖色');
});

console.log('— 天气 —');
test('状态机最终稳定在合法状态', () => {
  const w = new WeatherSystem(42);
  for (let i = 0; i < 4000; i++) w.update(1);
  assert.ok(['clear', 'cloudy', 'rain', 'storm', 'petal'].includes(w.target));
});
test('雨天参数上升', () => {
  const w = new WeatherSystem(7);
  w.force('rain', 600);
  for (let i = 0; i < 150; i++) w.update(2);
  assert.ok(w.intensity > 0.3, '雨强度');
  assert.ok(w.isRaining);
});
test('暴风风力更高', () => {
  const w = new WeatherSystem(9);
  w.force('storm', 600);
  for (let i = 0; i < 150; i++) w.update(2);
  assert.ok(w.wind > 0.8);
});
test('序列化往返', () => {
  const w = new WeatherSystem(11);
  w.force('rain', 200);
  for (let i = 0; i < 100; i++) w.update(3);
  const d = JSON.parse(JSON.stringify(w.serialize()));
  const w2 = new WeatherSystem(1);
  w2.load(d);
  assert.equal(w2.target, w.target);
  assert.ok(Math.abs(w2.intensity - w.intensity) < 0.01);
});

console.log('— 商店 —');
test('购买扣库存、金额正确', () => {
  const s = new Shop('shop_konbini');
  const before = s.stock.find((x) => x.id === 'onigiri').n;
  const price = s.buy('onigiri');
  assert.equal(s.stock.find((x) => x.id === 'onigiri').n, before - 1);
  assert.ok(price >= ITEMS.onigiri.price);
});
test('缺货不能购买', () => {
  const s = new Shop('shop_konbini');
  s.stock.find((x) => x.id === 'bento').n = 0;
  assert.equal(s.buy('bento'), null);
});
test('回收仅限收购类别', () => {
  const s = new Shop('shop_konbini'); // 收 food/drink
  assert.ok(s.sell('onigiri') > 0);
  assert.equal(s.sell('camera'), null);
});
test('补货增加库存', () => {
  const s = new Shop('shop_bakery');
  s.stock.forEach((x) => (x.n = 0));
  s.restock();
  assert.ok(s.stock.every((x) => x.n > 0));
});

console.log('— 布局与寻路 —');
test('所有建筑都有门节点且图连通', () => {
  const g = buildGraph();
  for (const b of BUILDINGS) {
    const dn = g.nodes.find((n) => n.id === 'door_' + b.id);
    assert.ok(dn, b.id + ' 缺少门节点');
  }
  for (const p of POIS) {
    assert.ok(g.nodes.find((n) => n.id === 'poi_' + p.id), p.id + ' 缺少 POI 节点');
  }
  // 从玩家家出发可达所有门
  const adj = new Map(g.nodes.map((n) => [n.id, []]));
  for (const [a, b] of g.edges) { adj.get(a).push(b); adj.get(b).push(a); }
  const seen = new Set(['door_home_player']);
  const st = ['door_home_player'];
  while (st.length) { const c = st.pop(); for (const nb of adj.get(c)) if (!seen.has(nb)) { seen.add(nb); st.push(nb); } }
  for (const b of BUILDINGS) assert.ok(seen.has('door_' + b.id), '不可达: ' + b.id);
});
test('A* 返回有效路径', () => {
  const g = buildGraph();
  const p = findPath(g, 'door_home_player', 'poi_shrine_top');
  assert.ok(p && p.length >= 2);
  assert.equal(p[0], 'door_home_player');
  assert.equal(p[p.length - 1], 'poi_shrine_top');
  // 相邻节点间应有边
  const edges = new Set(g.edges.map(([a, b]) => a + '|' + b).concat(g.edges.map(([a, b]) => b + '|' + a)));
  for (let i = 0; i + 1 < p.length; i++) assert.ok(edges.has(p[i] + '|' + p[i + 1]), '路径中有间断');
});
test('最近节点查询', () => {
  const g = buildGraph();
  const n = nearestNode(g, -28, -103);
  assert.ok(n && Math.hypot(n.x + 28, n.z + 103) < 12);
});
test('地形高度：神社山更高、河水为负', () => {
  assert.ok(terrainHeight(0, 102) > 3, '神社山顶');
  assert.ok(terrainHeight(0, 40) === 0, '镇区平地');
  assert.ok(terrainHeight(20, -130) < -1, '河面低于地面');
  assert.ok(terrainHeight(20, -120) === 0, '河南岸平地');
  // 桥面高于水面
  assert.ok(terrainHeight(0, -133) > 0, '桥面');
  assert.ok(terrainHeight(0, -90) === 0, '桥南端接地面');
});
test('门坐标朝向正确', () => {
  const b = BUILDINGS.find((x) => x.id === 'shop_konbini'); // rotY=0 → 门在 +z
  const d = buildingDoor(b);
  assert.ok(d.z > b.z, '门在南侧');
  const b2 = BUILDINGS.find((x) => x.id === 'shop_books'); // rotY=π → 门在 -z
  assert.ok(buildingDoor(b2).z < b2.z);
});

console.log(`\n${passed} 项测试通过`);
