/**
 * Emergent quests, random events, secrets, and player traces.
 * Quests appear from world state rather than floating exclamation marks.
 */
import type { QuestState, WorldEvent, TimeOfDay, Weather } from '../data/types';

export type EventSystem = {
  active: WorldEvent[];
  quests: QuestState[];
  secretsFound: string[];
  update: (time: TimeOfDay, weather: Weather, flags: Record<string, boolean | number>) => void;
  tryDiscover: (sx: number, sz: number, flags: Record<string, boolean | number>) => string | null;
  completeQuest: (id: string) => string | null;
  questHint: (id: string) => string;
};

const QUEST_DEFS: Array<{
  id: string;
  title: string;
  target: number;
  hint: string;
  condition: (flags: Record<string, boolean | number>, time: TimeOfDay, weather: Weather) => boolean;
  goal: string;
}> = [
  {
    id: 'q_help_bakery',
    title: 'パン屋の朝',
    target: 1,
    hint: 'パン屋のみどりさん、最近忙しそうだ。話しかけてみよう。',
    goal: 'パン屋で何か買って、店を助ける',
    condition: (_flags: Record<string, boolean | number>, time: TimeOfDay, _weather: Weather) => time.hour >= 7 && time.hour <= 11,
  },
  {
    id: 'q_lost_bag',
    title: '落とし物',
    target: 1,
    hint: '交番の近くで落とし物の話が聞こえた。',
    goal: '町を探して落とし物を見つける',
    condition: () => true,
  },
  {
    id: 'q_rain_umbrella',
    title: '雨の日の傘',
    target: 1,
    hint: '雨が降ってきた。誰かが困っていないか見てみよう。',
    goal: '雨の日に困っている人を助ける',
    condition: (_f, _t, weather) => weather === 'rain',
  },
  {
    id: 'q_night_light',
    title: '夜の灯り',
    target: 1,
    hint: '夜の商店街。暗い場所に灯りをともせないか。',
    goal: '夜に街灯や店の灯りに貢献する',
    condition: (_f, time) => time.hour >= 19 || time.hour < 5,
  },
  {
    id: 'q_shrine_visit',
    title: '神社の清掃',
    target: 1,
    hint: '山の上の神社。最近、参道が荒れているらしい。',
    goal: '神社を訪れて整備する',
    condition: () => true,
  },
  {
    id: 'q_make_friends',
    title: '顔なじみ',
    target: 3,
    hint: 'この町の人と仲良くなろう。',
    goal: '3人と会話する',
    condition: () => true,
  },
  {
    id: 'q_train_ride',
    title: '環状線',
    target: 1,
    hint: 'この町を走る電車に乗ってみよう。一周すると景色が変わる。',
    goal: '電車に乗って町を一周する',
    condition: () => true,
  },
];

const SECRET_SPOTS: Array<{
  id: string;
  sx: number;
  sz: number;
  radius: number;
  message: string;
  hourMin?: number;
  hourMax?: number;
}> = [
  {
    id: 'secret_cat',
    sx: -14,
    sz: -14,
    radius: 3,
    message: '物陰に小さな猫がいる。こちらを見て、また目を伏せた。',
    hourMax: 10,
  },
  {
    id: 'secret_diary',
    sx: 26,
    sz: 18,
    radius: 3,
    message: '古い木箱に学生の日記が入っている。「駅で毎日会えるあの人が好き」——',
  },
  {
    id: 'secret_view',
    sx: -38,
    sz: -22,
    radius: 4,
    message: '木の間から町が一望できる。駅の屋根が夕日を反射して光っている。',
    hourMin: 16,
    hourMax: 19,
  },
  {
    id: 'secret_key',
    sx: 10,
    sz: -24,
    radius: 2.5,
    message: '水路の石の下に古い鍵が隠してある。何の鍵だろう。',
    hourMax: 8,
  },
  {
    id: 'secret_letter',
    sx: -22,
    sz: 10,
    radius: 2.5,
    message: 'ベンチの裏に貼り付いた手紙の切れ端。「あの日のことを忘れない」',
    hourMin: 18,
    hourMax: 23,
  },
  {
    id: 'secret_well',
    sx: 4,
    sz: -32,
    radius: 3,
    message: '古い井戸。底に青い光が揺れている。気のせいだった。',
    hourMin: 20,
    hourMax: 24,
  },
];

export function createEventSystem(): EventSystem {
  const active: WorldEvent[] = [];
  const quests: QuestState[] = QUEST_DEFS.map((q) => ({
    id: q.id,
    title: q.title,
    status: 'hidden',
    progress: 0,
    target: q.target,
  }));
  const secretsFound: string[] = [];
  let eventTimer = 0;
  let questUnlockTimer = 0;

  function update(time: TimeOfDay, weather: Weather, flags: Record<string, boolean | number>): void {
    eventTimer += 1;
    questUnlockTimer += 1;

    // unlock quests gradually
    if (questUnlockTimer > 8) {
      questUnlockTimer = 0;
      for (let i = 0; i < QUEST_DEFS.length; i++) {
        const q = quests[i];
        const def = QUEST_DEFS[i];
        if (q.status === 'hidden' && def.condition(flags, time, weather)) {
          // unlock first few early
          if (i < 3 || Math.random() < 0.4) {
            q.status = 'available';
          }
        }
      }
    }

    // random events roughly every ~2 min of updates (caller ticks at 1Hz-ish)
    if (eventTimer > 40 && active.length < 3) {
      eventTimer = 0;
      const pool: WorldEvent[] = [
        {
          id: `ev_delay_${Date.now()}`,
          kind: 'trainDelay',
          title: '電車の遅延',
          description: '信号のトラブルで電車が遅れています。駅に人が集まっている。',
          startDay: time.day,
          startHour: time.hour,
          durationHours: 1,
          active: true,
        },
        {
          id: `ev_closed_${Date.now()}`,
          kind: 'shopClosed',
          title: '店の休業',
          description: '一軒の店が「本日休業」の札を出している。',
          startDay: time.day,
          startHour: time.hour,
          durationHours: 4,
          active: true,
        },
        {
          id: `ev_work_${Date.now()}`,
          kind: 'roadWork',
          title: '道路工事',
          description: '駅前で工事が始まった。通路が狭くなっている。',
          startDay: time.day,
          startHour: time.hour,
          durationHours: 3,
          active: true,
        },
        {
          id: `ev_lost_${Date.now()}`,
          kind: 'lostItem',
          title: '落とし物',
          description: '誰かが落とし物をしたようだ。持ち主を探そう。',
          startDay: time.day,
          startHour: time.hour,
          durationHours: 6,
          active: true,
        },
        {
          id: `ev_animal_${Date.now()}`,
          kind: 'animal',
          title: '小動物',
          description: 'どこかで小さな動物が見えた。',
          startDay: time.day,
          startHour: time.hour,
          durationHours: 2,
          active: true,
        },
      ];
      // rain-conditional
      if (weather === 'rain') {
        pool.push({
          id: `ev_rain_${Date.now()}`,
          kind: 'rainStart',
          title: '雨足が強まってきた',
          description: '傘の準備をした方が良さそうだ。',
          startDay: time.day,
          startHour: time.hour,
          durationHours: 2,
          active: true,
        });
      }
      const ev = pool[Math.floor(Math.random() * pool.length)];
      active.push({ ...ev, id: `${ev.kind}_${time.day}_${time.hour}` });
    }

    // expire events
    for (const ev of active) {
      const ageH = (time.day - ev.startDay) * 24 + (time.hour - ev.startHour);
      if (ageH > ev.durationHours) ev.active = false;
    }
    for (let i = active.length - 1; i >= 0; i--) {
      if (!active[i].active) active.splice(i, 1);
    }
  }

  function tryDiscover(sx: number, sz: number, flags: Record<string, boolean | number>): string | null {
    const h = Number(flags.__hour ?? 12);
    for (const s of SECRET_SPOTS) {
      if (secretsFound.includes(s.id)) continue;
      if (s.hourMin !== undefined && h < s.hourMin) continue;
      if (s.hourMax !== undefined && h > s.hourMax) continue;
      const d = Math.hypot(sx - s.sx, sz - s.sz);
      if (d < s.radius) {
        secretsFound.push(s.id);
        return s.message;
      }
    }
    return null;
  }

  function completeQuest(id: string): string | null {
    const q = quests.find((x) => x.id === id);
    if (!q) return null;
    q.progress += 1;
    if (q.progress >= q.target) {
      q.status = 'done';
      return `クエスト完了：${q.title}`;
    }
    if (q.status === 'available') q.status = 'active';
    return null;
  }

  function questHint(id: string): string {
    const def = QUEST_DEFS.find((d) => d.id === id);
    return def?.hint ?? '';
  }

  return { active, quests, secretsFound, update, tryDiscover, completeQuest, questHint };
}

export function questGoal(id: string): string {
  return QUEST_DEFS.find((d) => d.id === id)?.goal ?? id;
}
