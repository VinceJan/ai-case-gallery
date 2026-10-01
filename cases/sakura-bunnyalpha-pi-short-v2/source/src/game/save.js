/**
 * 存档系统
 *
 * 生活模拟的进度是核心：任务、金钱、背包、天数、flag 都应该跨刷新保留。
 * 本模块只负责「纯数据 ↔ localStorage」的搬运，不认识任何游戏对象，
 * 因此可以脱离浏览器单独跑测试（见文件末尾的 __selfTest）。
 *
 * 注意：saveGame() 每调用一次就立即写盘，**调用方需要自行做节流/防抖**。
 */

export const SAVE_VERSION = 1;
export const SAVE_KEY = 'sakura-town-save';

/** 会被写进存档的字段白名单（其余一律丢弃，避免把运行时绑定写进去） */
const FIELDS = [
  'day', 'hour', 'minute', 'money',
  'bag', 'held', 'flags', 'quests', 'log', 'stamina',
];

// ---------------------------------------------------------------------------
// localStorage 安全封装
// ---------------------------------------------------------------------------
function getStore() {
  try {
    if (typeof localStorage === 'undefined' || !localStorage) return null;
    // 真正试写一次，才能发现 Safari 隐私模式那种「对象存在但一写就抛」的情况
    const probe = '__stp__';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return localStorage;
  } catch (e) {
    return null;
  }
}

/** localStorage 是否真的可用（隐私模式下为 false） */
export function isStorageAvailable() {
  return getStore() !== null;
}

export function hasSave() {
  const s = getStore();
  if (!s) return false;
  try {
    return s.getItem(SAVE_KEY) !== null;
  } catch (e) {
    return false;
  }
}

// ---------------------------------------------------------------------------
// 清洗
// ---------------------------------------------------------------------------
const num = (v, def, lo = -Infinity, hi = Infinity) => {
  const n = typeof v === 'number' ? v : parseFloat(v);
  if (!Number.isFinite(n)) return def;
  return Math.min(hi, Math.max(lo, n));
};

function safeObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
}

/**
 * 把游戏 state 收敛成一份「纯 JSON、可安全持久化」的数据。
 * 关键：state 上挂着 inv（Inventory 实例）、toast（函数）这类运行时绑定，
 * 绝不能跟着一起进存档。
 */
export function sanitizeState(state) {
  const src = safeObject(state);
  const out = {};
  for (const k of FIELDS) {
    if (k in src) out[k] = src[k];
  }

  out.day = Math.max(1, Math.round(num(out.day, 1, 1, 1e6)));
  out.hour = num(out.hour, 7.2, 0, 23.999);
  out.minute = num(out.minute, 0, 0, 59.999);
  out.money = Math.round(num(out.money, 0, 0, 1e9));
  out.stamina = num(out.stamina, 100, 0, 100);
  out.held = typeof out.held === 'string' ? out.held : null;

  // bag: { itemId: 正整数 }
  const bag = {};
  for (const [id, n] of Object.entries(safeObject(out.bag))) {
    const c = Math.floor(num(n, 0, 0, 9999));
    if (c > 0) bag[id] = c;
  }
  out.bag = bag;

  // flags: 扁平/浅层字典，值限定为 boolean | number | string
  const flags = {};
  for (const [k, v] of Object.entries(safeObject(out.flags))) {
    const t = typeof v;
    if (t === 'boolean' || t === 'string') flags[k] = v;
    else if (t === 'number' && Number.isFinite(v)) flags[k] = v;
    else if (v && typeof v === 'object') {
      // 允许一层嵌套（目前只有 petalTaken 用到），再深就丢
      const sub = {};
      for (const [k2, v2] of Object.entries(v)) {
        if (typeof v2 === 'boolean' || typeof v2 === 'string') sub[k2] = v2;
        else if (typeof v2 === 'number' && Number.isFinite(v2)) sub[k2] = v2;
      }
      flags[k] = sub;
    }
  }
  out.flags = flags;

  // quests: { id: { status, step, doneDay? } }
  const quests = {};
  for (const [id, v] of Object.entries(safeObject(out.quests))) {
    const q = safeObject(v);
    const status = q.status === 'active' || q.status === 'done' ? q.status : 'locked';
    quests[id] = {
      status,
      step: Math.max(0, Math.floor(num(q.step, 0, 0, 999))),
    };
    if (Number.isFinite(q.doneDay)) quests[id].doneDay = q.doneDay;
  }
  out.quests = quests;

  // log: 字符串数组，限制长度
  out.log = (Array.isArray(out.log) ? out.log : [])
    .filter((l) => typeof l === 'string')
    .slice(0, 40);

  return out;
}

// ---------------------------------------------------------------------------
// 迁移
// ---------------------------------------------------------------------------
/**
 * 把任意版本的原始存档升级到当前版本。
 * 目前只有 v1；将来加字段时在这里按 raw.version 分支即可。
 */
export function migrate(raw) {
  if (!raw || typeof raw !== 'object') return null;
  let v = raw;
  // 未来示例：
  // if (v.version === 1) { v = { ...v, version: 2, newField: ... }; }
  if (v.version !== SAVE_VERSION) return null;
  return v;
}

// ---------------------------------------------------------------------------
// 读写
// ---------------------------------------------------------------------------
/**
 * @returns {{ok:boolean, at:number, error?:string, bytes?:number}}
 */
export function saveGame(state) {
  const s = getStore();
  if (!s) return { ok: false, at: Date.now(), error: 'storage-unavailable' };
  try {
    const data = sanitizeState(state);
    const payload = JSON.stringify({ version: SAVE_VERSION, savedAt: Date.now(), state: data });
    s.setItem(SAVE_KEY, payload);
    return { ok: true, at: Date.now(), bytes: payload.length };
  } catch (e) {
    // 配额超限 / 序列化异常
    return { ok: false, at: Date.now(), error: String((e && e.message) || e) };
  }
}

/** @returns {object|null} state 片段，读不出来一律返回 null，绝不抛异常 */
export function loadGame() {
  const s = getStore();
  if (!s) return null;
  let text = null;
  try {
    text = s.getItem(SAVE_KEY);
  } catch (e) {
    return null;
  }
  if (!text) return null;
  try {
    const raw = JSON.parse(text);
    const migrated = migrate(raw);
    if (!migrated) return null;
    const st = sanitizeState(migrated.state); // 二次清洗，挡住被手改坏的存档
    // 解冻，避免读档后改动污染下一次保存（flags 有嵌套对象，必须深拷贝）
    return JSON.parse(JSON.stringify(st));
  } catch (e) {
    return null;
  }
}

export function clearSave() {
  const s = getStore();
  if (!s) return false;
  try {
    s.removeItem(SAVE_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

/** 存档摘要，给 UI 显示用 */
export function saveMeta() {
  const s = getStore();
  if (!s) return null;
  let raw = null;
  try {
    const text = s.getItem(SAVE_KEY);
    if (!text) return null;
    raw = JSON.parse(text);
  } catch (e) {
    return null;
  }
  if (!raw || raw.version !== SAVE_VERSION || !raw.state) return null;
  return {
    at: raw.savedAt || 0,
    day: raw.state.day,
    hour: raw.state.hour,
    money: raw.state.money,
    version: raw.version,
  };
}

export function formatSaveTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/** 存档大小（字节），用于日志 */
export function debugDump(state) {
  const payload = JSON.stringify({ version: SAVE_VERSION, savedAt: 0, state: sanitizeState(state) });
  return payload.length;
}

// ---------------------------------------------------------------------------
// 自测：node tools/selftest-save.js 或直接 import 后调 __selfTest
// ---------------------------------------------------------------------------
function memStore() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    _dump: () => m,
  };
}

function brokenStore() {
  return {
    getItem() { throw new Error('nope'); },
    setItem() { throw new Error('nope'); },
    removeItem() { throw new Error('nope'); },
  };
}

/** 用注入的 storage 跑一遍；返回逐项结果 */
export function __selfTest(storage = memStore()) {
  const R = [];
  const ok = (name, cond, note = '') => R.push({ name, pass: !!cond, note });

  // 临时把全局 localStorage 换掉
  const had = typeof globalThis !== 'undefined' && 'localStorage' in globalThis;
  const prev = had ? globalThis.localStorage : undefined;
  const bind = (store) => {
    Object.defineProperty(globalThis, 'localStorage', { value: store, configurable: true, writable: true });
  };
  bind(storage);

  try {
    const sample = {
      day: 3, hour: 14.5, minute: 22, money: 1234, stamina: 77.5,
      bag: { catfood: 2, fish: 1, junk: 0 },
      held: 'catfood',
      flags: { met_yamada: true, petalTaken: { t1: 1, t2: 2 }, badFn: () => 1, nan: NaN },
      quests: { delivery: { status: 'done', step: 1, doneDay: 3 }, bad: { status: 'weird' } },
      log: ['ok', 123, '第二条'],
      // 运行时绑定，绝不能进存档
      inv: { add() {}, secret: 1 },
      toast: () => {},
      onQuestDone: () => {},
    };

    const r1 = saveGame(sample);
    ok('保存返回 ok', r1.ok, JSON.stringify(r1));

    const rawText = storage.getItem(SAVE_KEY);
    ok('存档里没有 inv/toast 等运行时字段',
      !/"inv"|"toast"|"onQuestDone"|secret/.test(rawText));
    ok('NaN / 函数被清洗掉', !/badFn/.test(rawText) && !/null,\s*"nan"/.test(rawText));

    const back = loadGame();
    ok('读档还原 day/hour/money', back && back.day === 3 && back.hour === 14.5 && back.money === 1234,
      back ? JSON.stringify({ d: back.day, h: back.hour, m: back.money }) : 'null');
    ok('读档还原 bag（并丢掉 0 数量的项）', back && back.bag.catfood === 2 && back.bag.fish === 1 && !('junk' in back.bag));
    ok('读档还原 quests 并归一化非法 status',
      back && back.quests.delivery.status === 'done' && back.quests.bad.status === 'locked');
    ok('读档还原嵌套 flags', back && back.flags.petalTaken && back.flags.petalTaken.t2 === 2);
    ok('log 只留字符串', back && back.log.length === 2 && back.log[0] === 'ok');

    // 引用隔离：改读出来的对象不应影响存档
    back.flags.petalTaken.t2 = 99;
    back.money = 0;
    const again = loadGame();
    ok('读档结果是深拷贝（改动不污染存档）', again.flags.petalTaken.t2 === 2 && again.money === 1234);

    // 数值钳制
    const clamped = sanitizeState({ day: -5, hour: 99, minute: -3, money: -1, stamina: 500 });
    ok('越界数值被钳制', clamped.day === 1 && clamped.hour <= 23.999 && clamped.minute === 0
      && clamped.money === 0 && clamped.stamina === 100, JSON.stringify(clamped));

    // 损坏 JSON
    storage.setItem(SAVE_KEY, '{ 这不是 json');
    ok('损坏 JSON → loadGame 返回 null 而不抛异常', loadGame() === null);

    // 版本过高
    storage.setItem(SAVE_KEY, JSON.stringify({ version: SAVE_VERSION + 99, state: { day: 1 } }));
    ok('版本过高的存档被拒读', loadGame() === null);

    // clearSave
    storage.setItem(SAVE_KEY, JSON.stringify({ version: SAVE_VERSION, state: { day: 1 } }));
    ok('hasSave 为 true', hasSave() === true);
    clearSave();
    ok('clearSave 后 hasSave 为 false', hasSave() === false && hasSave() === false);

    // meta / format
    saveGame(sample);
    const meta = saveMeta();
    ok('saveMeta 可读', meta && meta.day === 3 && meta.version === SAVE_VERSION, JSON.stringify(meta));
    ok('formatSaveTime 输出可解析字符串', /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(formatSaveTime(Date.now())));

    // 空 state
    ok('空 state 也能存', saveGame({}).ok);
  } finally {
    if (had) Object.defineProperty(globalThis, 'localStorage', { value: prev, configurable: true, writable: true });
    else if (typeof globalThis !== 'undefined') { try { delete globalThis.localStorage; } catch (e) {} }
  }

  // 存储不可用
  bind(brokenStore());
  try {
    const r = saveGame({ day: 1 });
    ok('storage 抛异常时 saveGame 返回 {ok:false} 而不抛出', r && r.ok === false);
    ok('storage 不可用时 loadGame 返回 null', loadGame() === null);
  } finally {
    if (had) Object.defineProperty(globalThis, 'localStorage', { value: prev, configurable: true, writable: true });
    else if (typeof globalThis !== 'undefined') { try { delete globalThis.localStorage; } catch (e) {} }
  }

  return R;
}

export function __selfTestAllPass(storage) {
  return __selfTest(storage).every((r) => r.pass);
}
