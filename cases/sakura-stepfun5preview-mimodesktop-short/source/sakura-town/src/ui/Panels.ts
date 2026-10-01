import type { TownState } from '../game/TownState';
import type { EconomySystem } from '../systems/EconomySystem';
import type { AudioSystem } from '../systems/AudioSystem';
import { ITEM_MAP, NPCS, SHOPS } from '../world/layout';

export interface MenuHandlers {
  onResume(): void;
  onSave(): void;
  onLoad(): void;
  onNewGame(): void;
}

/** 背包 / 委托 / 商店 / 菜单 面板。 */
export class Panels {
  private openPanel: 'inventory' | 'quests' | 'shop' | 'menu' | null = null;
  private shopId = '';

  private readonly inventoryPanel: HTMLElement;
  private readonly questPanel: HTMLElement;
  private readonly shopPanel: HTMLElement;
  private readonly menuPanel: HTMLElement;
  private readonly helpBlock: HTMLElement;
  private menuHandlers: MenuHandlers | null = null;

  constructor(
    private readonly state: TownState,
    private readonly economy: EconomySystem,
    private readonly audio: AudioSystem,
  ) {
    this.inventoryPanel = this.must('#inventory-panel');
    this.questPanel = this.must('#quest-panel');
    this.shopPanel = this.must('#shop-panel');
    this.menuPanel = this.must('#menu-overlay');
    this.helpBlock = this.must('#menu-help');

    this.must('#inventory-close').addEventListener('click', () => this.closeAll());
    this.must('#quest-close').addEventListener('click', () => this.closeAll());
    this.must('#shop-close').addEventListener('click', () => this.closeAll());
    this.must('#menu-resume').addEventListener('click', () => this.menuHandlers?.onResume());
    this.must('#menu-save').addEventListener('click', () => this.menuHandlers?.onSave());
    this.must('#menu-load').addEventListener('click', () => this.menuHandlers?.onLoad());
    this.must('#menu-new').addEventListener('click', () => this.menuHandlers?.onNewGame());
    this.must('#menu-help-toggle').addEventListener('click', () => {
      this.helpBlock.classList.toggle('hidden');
      this.audio.uiClick();
    });
  }

  private must(selector: string): HTMLElement {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) throw new Error(`Missing panel element: ${selector}`);
    return element;
  }

  get isOpen(): boolean {
    return this.openPanel !== null;
  }

  get current(): string | null {
    return this.openPanel;
  }

  closeAll(): void {
    this.openPanel = null;
    this.inventoryPanel.classList.add('hidden');
    this.questPanel.classList.add('hidden');
    this.shopPanel.classList.add('hidden');
    this.menuPanel.classList.add('hidden');
    this.helpBlock.classList.add('hidden');
  }

  openInventory(): void {
    this.renderInventory();
    this.openPanel = 'inventory';
    this.inventoryPanel.classList.remove('hidden');
    this.audio.uiClick();
  }

  openQuests(): void {
    this.renderQuests();
    this.openPanel = 'quests';
    this.questPanel.classList.remove('hidden');
    this.audio.uiClick();
  }

  openShop(shopId: string): void {
    this.shopId = shopId;
    this.renderShop();
    this.openPanel = 'shop';
    this.shopPanel.classList.remove('hidden');
    this.audio.interact();
  }

  openMenu(handlers: MenuHandlers): void {
    this.menuHandlers = handlers;
    this.openPanel = 'menu';
    this.menuPanel.classList.remove('hidden');
    this.audio.uiClick();
  }

  /** 交易后刷新商店面板。 */
  refresh(): void {
    if (this.openPanel === 'shop') this.renderShop();
    if (this.openPanel === 'inventory') this.renderInventory();
  }

  private renderInventory(): void {
    const money = this.must('#inventory-money');
    money.textContent = `¥ ${this.state.money}`;
    const grid = this.must('#inventory-grid');
    const owned = Object.keys(this.state.inventory).filter((id) => (this.state.inventory[id] ?? 0) > 0);
    if (owned.length === 0) {
      grid.innerHTML = '<div class="empty-note">背包空空如也。去商店街买点什么吧。</div>';
      return;
    }
    grid.innerHTML = '';
    for (const itemId of owned) {
      const item = ITEM_MAP[itemId];
      if (!item) continue;
      const card = document.createElement('div');
      card.className = `item-card kind-${item.kind}`;
      const count = this.state.inventory[itemId];
      card.innerHTML = `
        <div class="item-head"><span class="item-name">${item.name}</span><span class="item-count">×${count}</span></div>
        <div class="item-desc">${item.desc}</div>
        <div class="item-tag">${item.kind === 'food' ? '食物' : item.kind === 'gift' ? '礼物' : '材料'} · 礼物价值 ${item.giftValue}</div>`;
      grid.append(card);
    }
  }

  private renderQuests(): void {
    const list = this.must('#quest-list');
    const active = this.state.activeQuests();
    const done = this.state.quests.filter((q) => q.status === 'done');
    let html = '<h3>进行中</h3>';
    if (active.length === 0) {
      html += '<div class="empty-note">和镇民们聊聊，也许能接到委托。</div>';
    } else {
      html += active
        .map(
          (q) => `<div class="quest-card">
            <div class="quest-title">${q.title}${q.status === 'ready' ? ' <span class="ready-tag">可交付</span>' : ''}</div>
            <div class="quest-detail">${q.detail}</div>
            <div class="quest-meta">报酬 ¥${q.reward} · 好感 +${q.relationshipReward} · 今天内</div>
          </div>`,
        )
        .join('');
    }
    if (done.length > 0) {
      html += '<h3>已完成</h3>';
      html += done.map((q) => `<div class="quest-card done"><div class="quest-title">${q.title}</div></div>`).join('');
    }
    html += '<h3>镇民关系</h3>';
    html += NPCS.map((npc) => {
      const rel = this.state.relationship(npc.id);
      const favorite = ITEM_MAP[npc.favoriteItem];
      const hearts = rel >= 60 ? '♥♥♥' : rel >= 30 ? '♥♥' : rel >= 10 ? '♥' : '–';
      return `<div class="relation-row">
        <span class="relation-name">${npc.name}</span>
        <span class="relation-hearts">${hearts}</span>
        <span class="relation-fav">喜欢：${favorite?.name ?? '—'}</span>
      </div>`;
    }).join('');
    list.innerHTML = html;
  }

  private renderShop(): void {
    const shop = SHOPS.find((s) => s.id === this.shopId);
    if (!shop) return;
    this.must('#shop-title').textContent = shop.name;
    this.must('#shop-money').textContent = `¥ ${this.state.money}`;

    const buyList = this.must('#shop-buy');
    buyList.innerHTML = '';
    for (const entry of this.economy.shopItems(shop.id)) {
      const item = ITEM_MAP[entry.itemId];
      if (!item) continue;
      const row = document.createElement('div');
      row.className = 'shop-row';
      row.innerHTML = `
        <div class="shop-info"><span class="item-name">${item.name}</span><span class="shop-stock">库存 ${entry.stock}</span></div>
        <button type="button" class="shop-button" ${entry.stock <= 0 ? 'disabled' : ''}>¥${entry.price}</button>`;
      row.querySelector('button')?.addEventListener('click', () => {
        const result = this.economy.buy(shop.id, entry.itemId, this.state);
        this.audio.buy();
        this.flashShopMessage(result.message);
        this.renderShop();
      });
      buyList.append(row);
    }

    const sellList = this.must('#shop-sell');
    sellList.innerHTML = '';
    const owned = Object.keys(this.state.inventory).filter((id) => (this.state.inventory[id] ?? 0) > 0);
    if (owned.length === 0) {
      sellList.innerHTML = '<div class="empty-note">没有可出售的物品。</div>';
    }
    for (const itemId of owned) {
      const item = ITEM_MAP[itemId];
      if (!item) continue;
      const row = document.createElement('div');
      row.className = 'shop-row';
      row.innerHTML = `
        <div class="shop-info"><span class="item-name">${item.name}</span><span class="shop-stock">持有 ${this.state.inventory[itemId]}</span></div>
        <button type="button" class="shop-button sell">¥${Math.floor(item.price * 0.5)}</button>`;
      row.querySelector('button')?.addEventListener('click', () => {
        const result = this.economy.sell(shop.id, itemId, this.state);
        this.audio.sell();
        this.flashShopMessage(result.message);
        this.renderShop();
      });
      sellList.append(row);
    }
  }

  private flashShopMessage(message: string): void {
    const el = this.must('#shop-message');
    el.textContent = message;
    el.classList.remove('hidden');
    window.setTimeout(() => el.classList.add('hidden'), 2200);
  }
}
