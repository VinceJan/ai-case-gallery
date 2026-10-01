// Simple pub/sub event bus shared across systems
export class EventBus {
  constructor() {
    this._map = new Map();
  }

  on(type, handler) {
    if (!this._map.has(type)) this._map.set(type, new Set());
    this._map.get(type).add(handler);
    return () => this.off(type, handler);
  }

  once(type, handler) {
    const wrap = (payload) => {
      this.off(type, wrap);
      handler(payload);
    };
    return this.on(type, wrap);
  }

  off(type, handler) {
    this._map.get(type)?.delete(handler);
  }

  emit(type, payload) {
    const set = this._map.get(type);
    if (!set) return;
    for (const h of [...set]) {
      try {
        h(payload);
      } catch (err) {
        console.error(`[EventBus] handler failed for ${type}`, err);
      }
    }
  }
}

export const bus = new EventBus();
