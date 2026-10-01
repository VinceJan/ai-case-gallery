/** 标题界面：继续游戏 / 新的开始 / 操作说明。 */
export class TitleScreen {
  private readonly root: HTMLElement;
  private readonly continueButton: HTMLButtonElement;
  private readonly helpBlock: HTMLElement;

  onContinue: (() => void) | null = null;
  onNewGame: (() => void) | null = null;

  constructor() {
    this.root = this.must('#title-screen');
    this.continueButton = this.must('#title-continue') as HTMLButtonElement;
    this.helpBlock = this.must('#title-help');

    this.continueButton.addEventListener('click', () => this.onContinue?.());
    this.must('#title-new').addEventListener('click', () => this.onNewGame?.());
    this.must('#title-help-toggle').addEventListener('click', () => {
      this.helpBlock.classList.toggle('hidden');
    });
  }

  private must(selector: string): HTMLElement {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) throw new Error(`Missing title element: ${selector}`);
    return element;
  }

  show(hasSave: boolean): void {
    this.continueButton.disabled = !hasSave;
    this.continueButton.classList.toggle('disabled', !hasSave);
    this.root.classList.remove('hidden');
  }

  hide(): void {
    this.root.classList.add('hidden');
  }

  get visible(): boolean {
    return !this.root.classList.contains('hidden');
  }
}
