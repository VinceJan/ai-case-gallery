/**
 * Shared world-state flags that systems read/write.
 * Tracks shop open/closed, lights, item positions, blocked paths, etc.
 */
import { bus } from '../core/EventBus.js';

export class WorldState {
  constructor() {
    this.flags = {
      stationPlazaLamp: true,
      vendingA: true,
      konbiniOpen: true,
      cafeOpen: true,
      schoolOpen: true,
      shrineGate: true,
      crossingActive: false,
      powerOn: true,
    };
    this.itemPositions = {}; // id -> {x,z}
    this.doors = {}; // id -> open?
    this.seatsTaken = {};
    this.money = 2400;
    this.bond = 0;
    this.helpsCompleted = 0;
    this.playerHome = 'home-west';
    this.unlocked = {
      bicycle: true,
      trainPass: false,
    };
    this.inventory = [
      { id: 'wallet', name: '钱包', kind: 'tool' },
      { id: 'phone', name: '手机', kind: 'tool' },
    ];
  }

  setFlag(key, value) {
    const prev = this.flags[key];
    this.flags[key] = value;
    if (prev !== value) bus.emit('world:flag', { key, value, prev });
  }

  getFlag(key) {
    return this.flags[key];
  }

  addMoney(n) {
    this.money = Math.max(0, this.money + n);
    bus.emit('player:money', { money: this.money, delta: n });
  }

  spendMoney(n) {
    if (this.money < n) return false;
    this.addMoney(-n);
    return true;
  }

  addBond(n = 1) {
    this.bond += n;
    bus.emit('player:bond', { bond: this.bond });
  }

  addHelp() {
    this.helpsCompleted += 1;
    bus.emit('player:help', { helps: this.helpsCompleted });
  }

  addItem(item) {
    if (!this.inventory.find((i) => i.id === item.id)) {
      this.inventory.push(item);
      bus.emit('player:inventory', { inventory: this.inventory, added: item });
    }
  }

  removeItem(id) {
    const idx = this.inventory.findIndex((i) => i.id === id);
    if (idx >= 0) {
      const [removed] = this.inventory.splice(idx, 1);
      bus.emit('player:inventory', { inventory: this.inventory, removed });
      return removed;
    }
    return null;
  }

  hasItem(id) {
    return this.inventory.some((i) => i.id === id);
  }

  serialize() {
    return {
      flags: { ...this.flags },
      itemPositions: JSON.parse(JSON.stringify(this.itemPositions)),
      doors: { ...this.doors },
      money: this.money,
      bond: this.bond,
      helpsCompleted: this.helpsCompleted,
      playerHome: this.playerHome,
      unlocked: { ...this.unlocked },
      inventory: this.inventory.map((i) => ({ ...i })),
    };
  }

  restore(data) {
    if (!data) return;
    Object.assign(this.flags, data.flags || {});
    this.itemPositions = data.itemPositions || {};
    this.doors = data.doors || {};
    this.money = data.money ?? 2400;
    this.bond = data.bond ?? 0;
    this.helpsCompleted = data.helpsCompleted ?? 0;
    this.playerHome = data.playerHome || 'home-west';
    Object.assign(this.unlocked, data.unlocked || {});
    if (Array.isArray(data.inventory)) this.inventory = data.inventory.map((i) => ({ ...i }));
  }
}
