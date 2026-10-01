import { expect, test } from '@playwright/test';

// 樱花小镇 bot playtest：用真实键盘/鼠标输入驱动完整委托循环
// （标题→接委托→沿道路导航到面包店→购买→导航到委托人→交付），
// 验证游戏目标可推进、无页面错误、无软锁。

type BotSnapshot = {
  frame: number;
  uiMode: string;
  indoor: string | null;
  money: number;
  questsActive: number;
  questsDone: number;
  questTarget: { x: number; z: number } | null;
  x: number;
  z: number;
  day: number;
};

test('bot playtest: quest loop progresses without errors', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop-chrome',
    'The bot uses keyboard input; mobile touch input is exercised by visual.spec.ts.',
  );
  test.setTimeout(180_000);

  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  await page.goto('/');
  await page.waitForFunction(() => (window.__THREE_GAME_DIAGNOSTICS__?.frame ?? 0) > 10);

  const sample = (): Promise<BotSnapshot | null> =>
    page.evaluate(() => {
      const d = window.__THREE_GAME_DIAGNOSTICS__;
      if (!d) return null;
      return {
        frame: d.frame,
        uiMode: d.uiMode,
        indoor: d.indoor,
        money: d.money,
        questsActive: d.quests.active,
        questsDone: d.quests.done,
        questTarget: d.questTarget,
        x: d.player.position.x,
        z: d.player.position.z,
        day: d.day,
      };
    });

  async function holdKeys(keys: string[], ms: number): Promise<void> {
    for (const key of keys) await page.keyboard.down(key);
    await page.waitForTimeout(ms);
    for (const key of keys) await page.keyboard.up(key);
  }

  /**
   * 贪心轴寻路 + 卡死侧移：朝目标主轴推进，被挡住时尝试垂直轴绕行。
   */
  async function navigateTo(
    target: { x: number; z: number },
    arriveRadius: number,
    timeoutMs: number,
  ): Promise<boolean> {
    const deadline = Date.now() + timeoutMs;
    let lastX = Number.NaN;
    let lastZ = Number.NaN;
    let stuckFor = 0;

    while (Date.now() < deadline) {
      const snap = await sample();
      if (!snap) return false;
      const dx = target.x - snap.x;
      const dz = target.z - snap.z;
      if (Math.hypot(dx, dz) <= arriveRadius) return true;

      // 卡死检测：位置几乎没变就垂直侧移
      if (!Number.isNaN(lastX) && Math.hypot(snap.x - lastX, snap.z - lastZ) < 0.12) {
        stuckFor += 1;
      } else {
        stuckFor = 0;
      }
      lastX = snap.x;
      lastZ = snap.z;

      let keys: string[];
      if (stuckFor >= 3) {
        // 垂直绕行：沿次要轴移动
        const alongX = Math.abs(dx) > Math.abs(dz);
        keys = alongX ? (dz > 0 ? ['KeyS'] : ['KeyW']) : dx > 0 ? ['KeyD'] : ['KeyA'];
        stuckFor = 0;
      } else {
        keys =
          Math.abs(dx) > Math.abs(dz)
            ? dx > 0
              ? ['KeyD']
              : ['KeyA']
            : dz > 0
              ? ['KeyS']
              : ['KeyW'];
      }
      await holdKeys(keys, 200);
    }
    return false;
  }

  /** 沿路径点依次导航。 */
  async function navigateRoute(points: { x: number; z: number }[], perPointMs: number): Promise<boolean> {
    for (const point of points) {
      const ok = await navigateTo(point, 0.9, perPointMs);
      if (!ok) return false;
    }
    return true;
  }

  /**
   * 跟随委托目标并按 E：目标在室外时直接对话；
   * 目标在室内时走到门口按 E 进店，关掉购物面板后继续追随实时位置。
   */
  async function followTalk(timeoutMs: number): Promise<boolean> {
    const deadline = Date.now() + timeoutMs;
    let indoorSteps = 0;
    while (Date.now() < deadline) {
      const snap = await sample();
      if (!snap) return false;
      if (snap.uiMode === 'dialogue') return true;

      const target = snap.questTarget;
      if (target) {
        const dx = target.x - snap.x;
        const dz = target.z - snap.z;
        if (Math.hypot(dx, dz) > 1.1) {
          await navigateTo(target, 1.1, 3000);
        } else {
          await page.keyboard.press('KeyE');
          await page.waitForTimeout(300);
          const after = await sample();
          if (after?.uiMode === 'dialogue') return true;
          if (after?.uiMode === 'shop') {
            // 进了店：关掉购物面板，继续在店内追随
            await page.keyboard.press('Escape');
            await page.waitForTimeout(300);
          }
          await holdKeys(['KeyW'], 260);
        }
      } else {
        await holdKeys(['KeyW'], 300);
      }

      const cur = await sample();
      if (cur?.indoor) {
        indoorSteps += 1;
        // 在店内太久没找到人：从门口离开
        if (indoorSteps > 20) {
          await page.keyboard.press('KeyE');
          await page.waitForTimeout(400);
          indoorSteps = 0;
        }
      } else {
        indoorSteps = 0;
      }
    }
    return false;
  }

  // 1. 标题界面 → 新的开始
  await page.click('#title-new');
  await page.waitForFunction(() => window.__THREE_GAME_DIAGNOSTICS__?.uiMode === 'play', null, {
    timeout: 10000,
  });
  const start = await sample();
  expect(start, 'diagnostics must be published').not.toBeNull();

  // 2. 开场委托已发放
  await expect
    .poll(async () => (await sample())?.questsActive ?? 0, { timeout: 8000 })
    .toBeGreaterThan(0);

  // 3. 沿道路导航到面包店门口并购买黄油面包
  const reachedShop = await navigateRoute(
    [
      { x: 0, z: 16.8 }, // 住宅街 → 主路
      { x: 0, z: -13 }, // 主路 → 商店街
      { x: -24, z: -13 }, // 商店街 → 面包店前
      { x: -24, z: -15.2 }, // 到门口
    ],
    25000,
  );
  expect(reachedShop, 'bot should navigate to the bakery door').toBe(true);

  await page.keyboard.press('KeyE');
  await page.waitForFunction(() => window.__THREE_GAME_DIAGNOSTICS__?.uiMode === 'shop', null, {
    timeout: 6000,
  });
  const beforeBuy = await sample();
  const buyButton = page.locator('#shop-buy .shop-button').first();
  await expect(buyButton, 'shop should stock items').toBeVisible();
  await buyButton.click();
  await expect
    .poll(async () => (await sample())?.money ?? 0, { timeout: 5000 })
    .toBeLessThan((beforeBuy as BotSnapshot).money);
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => window.__THREE_GAME_DIAGNOSTICS__?.uiMode === 'play', null, {
    timeout: 5000,
  });
  // 走出商店（站在门口按 E 离开）
  await page.keyboard.press('KeyE');
  await page.waitForFunction(() => window.__THREE_GAME_DIAGNOSTICS__?.indoor === null, null, {
    timeout: 6000,
  });

  // 4. 追随委托委托人（加藤老师）并交付
  const talked = await followTalk(120000);
  expect(talked, 'bot should find and talk to the quest giver').toBe(true);

  let delivered = false;
  for (let i = 0; i < 6 && !delivered; i += 1) {
    const turnin = page.locator('#dialogue-choices .choice', { hasText: '交付' });
    if (await turnin.count()) {
      await turnin.first().click();
      await page.waitForTimeout(400);
      delivered = ((await sample())?.questsDone ?? 0) > 0;
    } else {
      // 还没拿到交付选项：退出对话继续追随
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      if ((await sample())?.uiMode !== 'dialogue') {
        const found = await followTalk(30000);
        if (!found) break;
      }
    }
  }
  expect(delivered, 'bot should deliver the quest').toBe(true);

  const after = await sample();
  const report = {
    steps: 4,
    framesAdvanced: (after as BotSnapshot).frame - (start as BotSnapshot).frame,
    moneyBefore: (start as BotSnapshot).money,
    moneyAfter: (after as BotSnapshot).money,
    questsDone: (after as BotSnapshot).questsDone,
    day: (after as BotSnapshot).day,
    pageErrors,
    consoleErrors,
  };
  await testInfo.attach('bot-playtest-report', {
    body: JSON.stringify(report, null, 2),
    contentType: 'application/json',
  });
  console.log(`bot playtest: ${JSON.stringify(report)}`);

  expect(pageErrors, 'page errors during bot play').toEqual([]);
  expect(consoleErrors, 'console errors during bot play').toEqual([]);
  expect(report.framesAdvanced, 'game loop must keep running').toBeGreaterThan(100);
  expect(report.questsDone, 'quest loop must complete').toBeGreaterThan(0);
});
