/**
 * NPCs: residents with schedule, goals, relationships, weather/time reactions.
 */
import * as THREE from 'three';
import { placeOnSurface, moveSurface } from '../world/surface';
import { toon } from '../world/materials';
import type { NPCDef, Weather, TimeOfDay } from '../data/types';

export type NPCScheduleSlot = {
  hour: number;
  minute: number;
  placeId: string; // building id or special: 'wander' | 'station' | 'schoolyard' | 'cafe'
  activity: string;
};

export type NPCRuntime = {
  def: NPCDef;
  group: THREE.Group;
  sx: number;
  sz: number;
  yaw: number;
  targetSx: number;
  targetSz: number;
  speed: number;
  state: 'idle' | 'walk' | 'talk' | 'sit' | 'ride' | 'shop' | 'work' | 'sleep';
  schedule: NPCScheduleSlot[];
  relationships: Map<string, number>;
  mood: number; // -1..1
  energy: number;
  inventoryCarry: string | null;
  homeSx: number;
  homeSz: number;
  workSx: number;
  workSz: number;
  currentPlace: string;
  waitTimer: number;
  talkTarget: string | null;
  umbrella: THREE.Group | null;
  visible: boolean;
};

const ROLE_COLORS: Record<NPCDef['role'], string> = {
  student: '#3a5a9a',
  worker: '#4a4a50',
  shopkeeper: '#6a4a30',
  elder: '#6a5a6a',
  child: '#c05050',
  office: '#2a3a4a',
  teacher: '#4a6a4a',
  homeless: '#5a5040',
  gardener: '#4a6a30',
};

function buildNpcMesh(def: NPCDef): THREE.Group {
  const g = new THREE.Group();
  const bodyColor = def.color || ROLE_COLORS[def.role];
  const bodyMat = toon({ color: bodyColor });
  const skinMat = toon({ color: '#f0c8a0' });
  const hairMat = toon({ color: def.hairColor });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.65, 0.3), bodyMat);
  torso.position.y = 1.1;
  torso.castShadow = true;
  g.add(torso);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.34), skinMat);
  head.position.y = 1.65;
  head.castShadow = true;
  g.add(head);

  const hair = new THREE.Mesh(new THREE.BoxGeometry(0.4, def.role === 'elder' ? 0.12 : 0.2, 0.38), hairMat);
  hair.position.y = 1.85;
  g.add(hair);

  for (const x of [-0.14, 0.14]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.65, 0.18), toon({ color: '#2a2830' }));
    leg.position.set(x, 0.52, 0);
    g.add(leg);
  }
  for (const x of [-0.35, 0.35]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.6, 0.15), bodyMat);
    arm.position.set(x, 1.1, 0);
    g.add(arm);
  }

  // student backpack
  if (def.role === 'student') {
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.4, 0.18), toon({ color: '#c04040' }));
    pack.position.set(0, 1.15, -0.28);
    g.add(pack);
  }
  // elder cane
  if (def.role === 'elder') {
    const cane = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.0, 6), toon({ color: '#4a3020' }));
    cane.position.set(0.4, 0.5, 0.15);
    g.add(cane);
  }

  return g;
}

function buildUmbrella(): THREE.Group {
  const g = new THREE.Group();
  const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.25, 12), toon({ color: '#2a3a5a' }));
  canopy.position.y = 2.05;
  g.add(canopy);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.4, 6), toon({ color: '#1a1a1a' }));
  pole.position.set(0.25, 1.35, 0.1);
  g.add(pole);
  return g;
}

export class NPCSystem {
  npcs: NPCRuntime[] = [];
  private group = new THREE.Group();

  constructor(private readonly places: Map<string, { sx: number; sz: number }>) {}

  get root(): THREE.Group {
    return this.group;
  }

  spawn(defs: NPCDef[], schedules: Record<string, NPCScheduleSlot[]>): void {
    for (const def of defs) {
      const home = this.places.get(def.homeId) ?? { sx: 0, sz: 0 };
      const work = def.workId ? this.places.get(def.workId) ?? home : home;
      const group = buildNpcMesh(def);
      const start = home;
      this.group.add(group);
      const npc: NPCRuntime = {
        def,
        group,
        sx: start.sx,
        sz: start.sz,
        yaw: 0,
        targetSx: start.sx,
        targetSz: start.sz,
        speed: 1.4 + Math.random() * 0.5,
        state: 'idle',
        schedule: schedules[def.id] ?? [],
        relationships: new Map(),
        mood: 0.2,
        energy: 1,
        inventoryCarry: null,
        homeSx: home.sx,
        homeSz: home.sz,
        workSx: work.sx,
        workSz: work.sz,
        currentPlace: def.homeId,
        waitTimer: 0,
        talkTarget: null,
        umbrella: null,
        visible: true,
      };
      placeOnSurface(group, npc.sx, npc.sz, 0, 0);
      this.npcs.push(npc);
    }

    // seed relationships
    for (const a of this.npcs) {
      for (const b of this.npcs) {
        if (a.def.id === b.def.id) continue;
        // family / coworkers / neighbors
        if (a.def.homeId === b.def.homeId) {
          a.relationships.set(b.def.id, 60 + Math.random() * 30);
        } else if (a.def.workId && a.def.workId === b.def.workId) {
          a.relationships.set(b.def.id, 30 + Math.random() * 30);
        } else if (Math.hypot(a.homeSx - b.homeSx, a.homeSz - b.homeSz) < 10) {
          a.relationships.set(b.def.id, 15 + Math.random() * 25);
        } else if (Math.random() < 0.25) {
          a.relationships.set(b.def.id, Math.random() * 25);
        }
      }
    }
  }

  setWeatherVisual(weather: Weather): void {
    for (const npc of this.npcs) {
      if (weather === 'rain' && !npc.umbrella) {
        npc.umbrella = buildUmbrella();
        npc.group.add(npc.umbrella);
      } else if (weather !== 'rain' && npc.umbrella) {
        npc.group.remove(npc.umbrella);
        npc.umbrella = null;
      }
    }
  }

  private targetForSlot(slot: NPCScheduleSlot): { sx: number; sz: number; place: string } {
    if (slot.placeId === 'wander') {
      return {
        sx: (Math.random() - 0.5) * 30,
        sz: (Math.random() - 0.5) * 30,
        place: 'wander',
      };
    }
    if (slot.placeId === 'home') {
      return { sx: this.places.get('home')?.sx ?? 0, sz: 0, place: 'home' };
    }
    const p = this.places.get(slot.placeId);
    if (p) return { sx: p.sx, sz: p.sz, place: slot.placeId };
    // fallback: use home
    return { sx: 0, sz: 0, place: 'unknown' };
  }

  private resolvePlace(npc: NPCRuntime, hour: number, minute: number): NPCScheduleSlot | null {
    const t = hour + minute / 60;
    let best: NPCScheduleSlot | null = null;
    for (const slot of npc.schedule) {
      const st = slot.hour + slot.minute / 60;
      if (t >= st) best = slot;
    }
    // wrap: if before first slot, use last
    if (!best && npc.schedule.length) best = npc.schedule[npc.schedule.length - 1];
    return best;
  }

  update(
    delta: number,
    time: TimeOfDay,
    weather: Weather,
    playerSx: number,
    playerSz: number,
    events: { trainDelay: boolean },
  ): void {
    const isNight = time.hour >= 20 || time.hour < 5;
    const isRain = weather === 'rain';
    const isWeekend = time.day % 7 === 0 || time.day % 7 === 6;

    for (const npc of this.npcs) {
      // schedule
      const slot = this.resolvePlace(npc, time.hour, time.minute);
      if (slot) {
        const dest = this.targetForSlot(slot);
        // weekend students wander more
        let placeId = dest.place;
        let target = dest;
        if (isWeekend && npc.def.role === 'student' && slot.placeId === 'school') {
          target = { sx: npc.homeSx + (Math.random() - 0.5) * 8, sz: npc.homeSz + (Math.random() - 0.5) * 8, place: 'wander' };
          placeId = 'wander';
        }
        // rain: elders stay home
        if (isRain && npc.def.role === 'elder' && placeId !== 'home') {
          target = { sx: npc.homeSx, sz: npc.homeSz, place: 'home' };
          placeId = 'home';
        }
        // train delay: workers wait near station
        if (events.trainDelay && npc.def.role === 'worker') {
          const station = this.places.get('station');
          if (station) {
            target = { sx: station.sx, sz: station.sz, place: 'station' };
            placeId = 'station';
          }
        }

        npc.targetSx = target.sx + (npc.def.id.charCodeAt(0) % 5) - 2;
        npc.targetSz = target.sz + (npc.def.id.charCodeAt(1) % 5) - 2;
        npc.currentPlace = placeId;

        const dist = Math.hypot(npc.targetSx - npc.sx, npc.targetSz - npc.sz);
        if (dist > 1.2) {
          npc.state = 'walk';
          const sp = (isRain ? 1.25 : 1) * npc.speed * (isNight ? 0.85 : 1);
          const dx = npc.targetSx - npc.sx;
          const dz = npc.targetSz - npc.sz;
          const inv = 1 / (dist || 1);
          const next = moveSurface(npc.sx, npc.sz, dx * inv * sp * delta, dz * inv * sp * delta, 0);
          npc.sx = next.sx;
          npc.sz = next.sz;
          npc.yaw = Math.atan2(dx, dz);
        } else {
          npc.state = isNight && placeId === 'home' ? 'sleep' : placeId === 'school' || placeId === 'office' || placeId === 'konbini' ? 'work' : 'idle';
          // idle bob
          npc.waitTimer += delta;
        }
      }

      // social: talk if close to another npc
      if (npc.state === 'idle' || npc.state === 'walk') {
        for (const other of this.npcs) {
          if (other === npc) continue;
          const d = Math.hypot(other.sx - npc.sx, other.sz - npc.sz);
          if (d < 1.8 && Math.random() < 0.02 * delta * 60) {
            const rel = npc.relationships.get(other.def.id) ?? 0;
            if (rel > 10 || Math.random() < 0.3) {
              npc.state = 'talk';
              npc.talkTarget = other.def.id;
              npc.waitTimer = 2 + Math.random() * 4;
              npc.mood = Math.min(1, npc.mood + 0.05);
              break;
            }
          }
        }
      }
      if (npc.state === 'talk') {
        npc.waitTimer -= delta;
        if (npc.waitTimer <= 0) {
          npc.state = 'idle';
          npc.talkTarget = null;
        }
      }

      // player proximity reaction
      const pd = Math.hypot(playerSx - npc.sx, playerSz - npc.sz);
      if (pd < 2.2) {
        npc.mood = Math.min(1, npc.mood + 0.001);
      }

      placeOnSurface(npc.group, npc.sx, npc.sz, 0, npc.yaw);
      if (npc.state === 'talk' && npc.talkTarget) {
        // face talk target
        const other = this.npcs.find((n) => n.def.id === npc.talkTarget);
        if (other) {
          const yaw = Math.atan2(other.sx - npc.sx, other.sz - npc.sz);
          placeOnSurface(npc.group, npc.sx, npc.sz, 0, yaw);
        }
      }

      // hide sleeping NPCs inside homes at deep night (keep visible but dim)
      npc.group.visible = true;
    }
  }

  getNearest(sx: number, sz: number, maxDist = 3): NPCRuntime | null {
    let best: NPCRuntime | null = null;
    let bestD = maxDist;
    for (const n of this.npcs) {
      const d = Math.hypot(n.sx - sx, n.sz - sz);
      if (d < bestD) {
        bestD = d;
        best = n;
      }
    }
    return best;
  }

  adjustAffinity(npcId: string, delta: number): void {
    const n = this.npcs.find((x) => x.def.id === npcId);
    if (n) n.mood = Math.max(-1, Math.min(1, n.mood + delta / 50));
  }
}
