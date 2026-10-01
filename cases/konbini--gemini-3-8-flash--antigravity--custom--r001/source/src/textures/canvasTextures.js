import * as THREE from 'three';

// Helper to create a canvas and THREE.CanvasTexture
function createCanvas(w, h, drawFn) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  drawFn(ctx, w, h);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 1. Convenience Store Fascia Main Sign
export function createStoreSignTexture() {
  return createCanvas(1024, 256, (ctx, w, h) => {
    // Backlit panel gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(0.5, '#f4faff');
    bgGrad.addColorStop(1, '#e3f2fd');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Iconic Anime Tri-color stripes (Cyan / Tangerine Orange / Forest Green)
    const stripeH = 22;
    ctx.fillStyle = '#00a3e0'; // Cyan
    ctx.fillRect(0, 0, w, stripeH);
    ctx.fillStyle = '#ff8200'; // Orange
    ctx.fillRect(0, stripeH, w, 12);
    ctx.fillStyle = '#009944'; // Green
    ctx.fillRect(0, h - stripeH, w, stripeH);

    // Glowing Logo Symbol (Stylized Sun / Heart in a badge)
    ctx.save();
    ctx.fillStyle = '#00a3e0';
    ctx.beginPath();
    ctx.arc(110, h / 2, 58, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(110, h / 2, 48, 0, Math.PI * 2);
    ctx.fill();

    // Hotto steaming sun icon
    ctx.fillStyle = '#ff8200';
    ctx.beginPath();
    ctx.arc(110, h / 2 + 6, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(110, h / 2 + 2, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Main Japanese Name
    ctx.fillStyle = '#0f2742';
    ctx.font = 'bold 74px "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText('ほっとマート', 190, h / 2 - 12);

    // English Sub-Name & 24h Badge
    ctx.font = 'bold 30px "Arial Rounded MT Bold", sans-serif';
    ctx.fillStyle = '#00a3e0';
    ctx.fillText('HOTTO MART', 195, h / 2 + 44);

    // 24 HOURS Badge
    ctx.fillStyle = '#ff8200';
    ctx.beginPath();
    ctx.roundRect(w - 240, h / 2 - 38, 200, 76, 14);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('24', w - 175, h / 2 + 2);
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('HOURS', w - 100, h / 2 + 2);
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('年中無休', w - 140, h / 2 + 26);
  });
}

// 2. Japanese Beverage Vending Machine Textures
export function createVendingMachineTextures() {
  // Machine A: Drinks (Blue theme)
  const drinksTex = createCanvas(512, 1024, (ctx, w, h) => {
    // Body base
    ctx.fillStyle = '#1e3a8a'; // Deep Japanese vending machine blue
    ctx.fillRect(0, 0, w, h);

    // Header Backlit Display
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(30, 30, w - 60, 100);
    ctx.fillStyle = '#0284c7';
    ctx.font = '900 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('COLD & HOT', w / 2, 90);
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('つめた〜い / あたたか〜い', w / 2, 120);

    // Display Window (Drink Cans Rows)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(30, 150, w - 60, 480);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(36, 156, w - 72, 468);

    // 3 Rows of Drink Samples
    const rows = 3;
    const cols = 5;
    const drinkColors = [
      '#10b981', '#06b6d4', '#f59e0b', '#ef4444', '#8b5cf6',
      '#ec4899', '#3b82f6', '#14b8a6', '#f97316', '#64748b',
      '#84cc16', '#6366f1', '#a855f7', '#d97706', '#0ea5e9'
    ];
    const drinkLabels = [
      'お茶', 'Soda', 'Coffee', 'Tea', 'Water',
      'Juice', 'Boss', 'Matcha', 'Energy', 'Coke',
      'Lemon', 'Grape', 'Latte', 'Cola', 'Spark'
    ];

    for (let r = 0; r < rows; r++) {
      const y = 180 + r * 150;
      // Shelf support wire
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(40, y + 105, w - 80, 4);

      for (let c = 0; c < cols; c++) {
        const x = 55 + c * 82;
        const color = drinkColors[r * cols + c];
        const label = drinkLabels[r * cols + c];

        // Can cylinder
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, y, 60, 95, 6);
        ctx.fill();

        // Shiny highlight streak
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(x + 10, y + 5, 8, 85);

        // Can label text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + 30, y + 50);

        // Button below
        const isHot = (r === 2 && c >= 2);
        ctx.fillStyle = isHot ? '#ef4444' : '#0284c7';
        ctx.beginPath();
        ctx.roundRect(x + 10, y + 115, 40, 16, 4);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(isHot ? 'HOT' : 'COLD', x + 30, y + 127);

        // Price tag
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('130円', x + 30, y + 142);
      }
    }

    // Payment Section
    ctx.fillStyle = '#334155';
    ctx.fillRect(40, 650, w - 80, 140);
    // Coin slot & Bill acceptor
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(70, 680, 80, 12);
    ctx.fillRect(70, 710, 100, 30);
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('¥ ----', 190, 700);

    // IC Card Touch Sensor (Suica / Pasmo style)
    ctx.fillStyle = '#0ea5e9';
    ctx.beginPath();
    ctx.roundRect(320, 675, 120, 90, 10);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('IC タッチ', 380, 725);

    // Dispenser flap at bottom
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(60, 830, w - 120, 140, 12);
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('取り出し口 PUSH', w / 2, 910);
  });

  // Machine B: Coffee & Tea (Red / White theme)
  const coffeeTex = createCanvas(512, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#b91c1c'; // Deep Red
    ctx.fillRect(0, 0, w, h);

    // Header
    ctx.fillStyle = '#fef2f2';
    ctx.fillRect(30, 30, w - 60, 100);
    ctx.fillStyle = '#b91c1c';
    ctx.font = '900 44px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('BOSS COFFEE', w / 2, 90);
    ctx.fillStyle = '#ea580c';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('珈琲 & 紅茶 セレクション', w / 2, 120);

    // Display Window
    ctx.fillStyle = '#18181b';
    ctx.fillRect(30, 150, w - 60, 480);
    ctx.fillStyle = '#27272a';
    ctx.fillRect(36, 156, w - 72, 468);

    const coffees = [
      'Black', 'Rainbow', 'CafeAuLait', 'Mocha', 'Espresso',
      'RoyalMilk', 'LemonTea', 'Darjeeling', 'GreenTea', 'Hojicha',
      'Cocoa', 'CornSoup', 'Oolong', 'AppleTea', 'HotMilk'
    ];
    const colors = [
      '#18181b', '#3b82f6', '#fef08a', '#78350f', '#451a03',
      '#fbcfe8', '#facc15', '#b45309', '#15803d', '#854d0e',
      '#581c87', '#ea580c', '#ca8a04', '#e11d48', '#f8fafc'
    ];

    for (let r = 0; r < 3; r++) {
      const y = 180 + r * 150;
      ctx.fillStyle = '#a1a1aa';
      ctx.fillRect(40, y + 105, w - 80, 4);

      for (let c = 0; c < 5; c++) {
        const x = 55 + c * 82;
        const color = colors[r * 5 + c];
        const label = coffees[r * 5 + c];

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, y, 60, 95, 6);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(x + 8, y + 5, 8, 85);

        ctx.fillStyle = (color === '#fef08a' || color === '#f8fafc') ? '#000000' : '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label.slice(0, 7), x + 30, y + 52);

        // Buttons
        const isHot = (r >= 1);
        ctx.fillStyle = isHot ? '#ef4444' : '#0284c7';
        ctx.beginPath();
        ctx.roundRect(x + 10, y + 115, 40, 16, 4);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(isHot ? 'HOT' : 'COLD', x + 30, y + 127);
        ctx.fillText('140円', x + 30, y + 142);
      }
    }

    // Payment
    ctx.fillStyle = '#3f3f46';
    ctx.fillRect(40, 650, w - 80, 140);
    ctx.fillStyle = '#18181b';
    ctx.fillRect(70, 680, 80, 12);
    ctx.fillRect(70, 710, 100, 30);
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('¥ ----', 190, 700);

    // IC touch
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(320, 675, 120, 90, 10);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('IC タッチ', 380, 725);

    // Dispenser
    ctx.fillStyle = '#27272a';
    ctx.beginPath();
    ctx.roundRect(60, 830, w - 120, 140, 12);
    ctx.fill();
    ctx.strokeStyle = '#52525b';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = '#a1a1aa';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('PUSH 取り出し口', w / 2, 910);
  });

  return { drinksTex, coffeeTex };
}

// 3. Welcome Doormat Texture
export function createDoormatTexture() {
  return createCanvas(512, 256, (ctx, w, h) => {
    // Red rubber ribbed mat
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(0, 0, w, h);

    // Ribbed border
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 16;
    ctx.strokeRect(8, 8, w - 16, h - 16);

    // White text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('いらっしゃいませ', w / 2, h / 2 - 20);

    ctx.font = 'bold 26px "Arial Rounded MT Bold", sans-serif';
    ctx.fillStyle = '#fed7aa';
    ctx.fillText('WELCOME TO HOTTO MART', w / 2, h / 2 + 36);
  });
}

// 4. Drink Cooler Wall Texture (Inside store rear wall)
export function createDrinkCoolerTexture() {
  return createCanvas(1024, 512, (ctx, w, h) => {
    // Clean bright cooler frame
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h);

    const bays = 4;
    const bayW = w / bays;

    for (let b = 0; b < bays; b++) {
      const bx = b * bayW;

      // Dark interior backing with soft neon backlight
      const grad = ctx.createLinearGradient(bx, 0, bx, h);
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.3, '#0c4a6e');
      grad.addColorStop(1, '#082f49');
      ctx.fillStyle = grad;
      ctx.fillRect(bx + 8, 12, bayW - 16, h - 24);

      // Top category header
      const headers = ['お茶・紅茶', '炭酸・水', 'コーヒー・乳飲料', 'ビール・チューハイ'];
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(headers[b], bx + bayW / 2, 40);

      // 4 shelves per bay
      for (let s = 0; s < 4; s++) {
        const sy = 60 + s * 105;
        // Glass shelf line with LED glow
        ctx.fillStyle = '#e0f2fe';
        ctx.fillRect(bx + 12, sy + 80, bayW - 24, 6);

        // Bottles / Cans on shelf
        const numItems = 6;
        const itemW = (bayW - 36) / numItems;

        for (let i = 0; i < numItems; i++) {
          const ix = bx + 18 + i * itemW;
          const hue = (b * 90 + s * 60 + i * 35) % 360;
          ctx.fillStyle = `hsl(${hue}, 75%, 55%)`;
          ctx.beginPath();
          ctx.roundRect(ix + 2, sy + 15, itemW - 6, 65, 4);
          ctx.fill();

          // Highlight
          ctx.fillStyle = 'rgba(255,255,255,0.6)';
          ctx.fillRect(ix + 6, sy + 18, 4, 55);

          // Cap
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.roundRect(ix + itemW / 2 - 5, sy + 8, 10, 8, 2);
          ctx.fill();
        }
      }
    }
  });
}

// 5. Snack / Ramen Gondola Shelf Textures
export function createGondolaItemsTexture() {
  return createCanvas(1024, 512, (ctx, w, h) => {
    // Gondola shelf background (light grey metal)
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, w, h);

    const shelfRows = 4;
    const shelfH = h / shelfRows;

    for (let r = 0; r < shelfRows; r++) {
      const y = r * shelfH;

      // Shelf back shadow
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(0, y, w, 20);

      // Shelf lip
      ctx.fillStyle = '#64748b';
      ctx.fillRect(0, y + shelfH - 12, w, 12);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(0, y + shelfH - 10, w, 4);

      if (r === 0) {
        // Cup Noodles (Instant Ramen)
        const count = 16;
        const itemW = w / count;
        for (let i = 0; i < count; i++) {
          const ix = i * itemW + 4;
          const type = i % 4;
          const cupColors = ['#ef4444', '#0284c7', '#eab308', '#10b981'];
          const names = ['醤油', '海鮮', '味噌', '豚骨'];

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.moveTo(ix + 4, y + shelfH - 14);
          ctx.lineTo(ix, y + 25);
          ctx.lineTo(ix + itemW - 8, y + 25);
          ctx.lineTo(ix + itemW - 12, y + shelfH - 14);
          ctx.closePath();
          ctx.fill();

          // Cup color band
          ctx.fillStyle = cupColors[type];
          ctx.fillRect(ix + 2, y + 42, itemW - 12, 38);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 14px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(names[type], ix + itemW / 2 - 4, y + 66);
        }
      } else if (r === 1) {
        // Potato Chip Bags (Calbee style)
        const count = 14;
        const itemW = w / count;
        for (let i = 0; i < count; i++) {
          const ix = i * itemW + 6;
          const colors = ['#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6'];
          ctx.fillStyle = colors[i % colors.length];
          ctx.beginPath();
          ctx.roundRect(ix, y + 16, itemW - 12, shelfH - 30, 8);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 13px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('CHIPS', ix + (itemW - 12) / 2, y + 55);
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText('ポテト', ix + (itemW - 12) / 2, y + 75);
        }
      } else if (r === 2) {
        // Snack boxes (Pocky, Pretz, Chocolate)
        const count = 18;
        const itemW = w / count;
        for (let i = 0; i < count; i++) {
          const ix = i * itemW + 4;
          const colors = ['#dc2626', '#16a34a', '#d97706', '#9333ea', '#db2777', '#0284c7'];
          ctx.fillStyle = colors[i % colors.length];
          ctx.fillRect(ix, y + 18, itemW - 8, shelfH - 32);

          // Gold or white ribbon
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(ix, y + 36, itemW - 8, 12);
        }
      } else {
        // Japanese bakery & sandwich bread
        const count = 15;
        const itemW = w / count;
        for (let i = 0; i < count; i++) {
          const ix = i * itemW + 6;
          // Clear plastic wrap look
          ctx.fillStyle = '#fef3c7';
          ctx.beginPath();
          ctx.roundRect(ix, y + 26, itemW - 12, shelfH - 40, 10);
          ctx.fill();
          ctx.strokeStyle = '#d97706';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Label sticker
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(ix + (itemW - 12) / 2, y + 55, 12, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  });
}

// 6. Manga & Weekly Magazine Rack Texture
export function createMangaMagazineTexture() {
  return createCanvas(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 0, w, h);

    const rows = 3;
    const cols = 5;
    const cardW = w / cols;
    const cardH = h / rows;

    const titles = [
      'JUMP', '週刊少年', 'MAGAZINE', 'ANIME V', 'NEWTYPE',
      'COMIC', 'MANGA', 'GEKKAN', 'GAMEFAN', 'FAMITSU',
      'TOKYO', 'WALKER', 'FASHION', 'POPEYE', 'NONNO'
    ];
    const colors = [
      '#e11d48', '#f59e0b', '#0ea5e9', '#8b5cf6', '#10b981',
      '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#84cc16',
      '#06b6d4', '#d97706', '#3b82f6', '#ef4444', '#a855f7'
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const x = c * cardW + 8;
        const y = r * cardH + 10;
        const mw = cardW - 16;
        const mh = cardH - 24;

        // Magazine cover
        ctx.fillStyle = colors[idx % colors.length];
        ctx.fillRect(x, y, mw, mh);

        // Anime character silhouette or frame
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 6, y + 36, mw - 12, mh - 50);

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(x + mw / 2, y + 65, 16, 0, Math.PI * 2);
        ctx.fill();

        // Magazine Title Header
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(titles[idx], x + mw / 2, y + 22);

        // Price badge
        ctx.fillStyle = '#facc15';
        ctx.fillRect(x + mw - 24, y + mh - 18, 20, 14);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText('¥480', x + mw - 14, y + mh - 8);
      }
    }
  });
}

// 7. Bento & Onigiri Display Counter Texture
export function createBentoTexture() {
  return createCanvas(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, w, h);

    // Top half: Triangular Onigiri (Rice Balls)
    for (let i = 0; i < 6; i++) {
      const x = 20 + i * 80;
      const y = 80;

      // Triangular white rice
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(x + 35, y - 40);
      ctx.lineTo(x + 70, y + 25);
      ctx.lineTo(x, y + 25);
      ctx.closePath();
      ctx.fill();

      // Black Nori Seaweed strip
      ctx.fillStyle = '#09090b';
      ctx.fillRect(x + 20, y - 5, 30, 30);

      // Label sticker
      const stickerColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
      const onigiriNames = ['鮭', '梅', '昆布', 'ツナ', '明太子', '高菜'];
      ctx.fillStyle = stickerColors[i];
      ctx.beginPath();
      ctx.arc(x + 35, y - 10, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(onigiriNames[i], x + 35, y - 6);
      ctx.fillText('120円', x + 35, y + 42);
    }

    // Bottom half: Japanese Bento Boxes
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const x = 30 + c * 155;
        const y = 180 + r * 150;
        const bw = 140;
        const bh = 125;

        // Black bento tray
        ctx.fillStyle = '#09090b';
        ctx.beginPath();
        ctx.roundRect(x, y, bw, bh, 8);
        ctx.fill();

        // Rice compartment
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 8, y + 8, 55, 100);
        // Umeboshi (pickled plum) in center of rice
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(x + 35, y + 58, 8, 0, Math.PI * 2);
        ctx.fill();

        // Main meat / tonkatsu / salmon compartment
        ctx.fillStyle = (r === 0 ? '#b45309' : '#ea580c');
        ctx.fillRect(x + 68, y + 8, 64, 55);

        // Side dishes (tamagoyaki, greens, pickles)
        ctx.fillStyle = '#facc15';
        ctx.fillRect(x + 68, y + 68, 30, 40);
        ctx.fillStyle = '#15803d';
        ctx.fillRect(x + 102, y + 68, 30, 40);

        // Transparent plastic film glare
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(x + 15, y + 15, 110, 6);

        // Price label
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x + 40, y + bh - 24, 60, 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('540円', x + 70, y + bh - 10);
      }
    }
  });
}

// 8. Hot Snack Warmer (FamiChiki warm cabinet) Texture
export function createHotSnackTexture() {
  return createCanvas(512, 256, (ctx, w, h) => {
    // Stainless steel warming tray with golden glow
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#fef08a');
    grad.addColorStop(0.5, '#f59e0b');
    grad.addColorStop(1, '#78350f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Stainless wire rack lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 3;
    for (let i = 0; i < 16; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 16);
      ctx.lineTo(w, i * 16);
      ctx.stroke();
    }

    // Fried Chicken pieces (FamiChiki style crispy golden cuts)
    for (let i = 0; i < 4; i++) {
      const cx = 70 + i * 115;
      const cy = h / 2 - 10;
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.roundRect(cx - 45, cy - 35, 90, 70, 14);
      ctx.fill();

      // Crispy breadcrumbs
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.roundRect(cx - 38, cy - 28, 76, 56, 10);
      ctx.fill();

      // Paper wrapping pouch
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 45, cy + 5, 90, 35);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('HOT CHICKEN', cx, cy + 28);
    }
  });
}

// 9. Japanese Oden Counter Texture (关东煮)
export function createOdenTexture() {
  return createCanvas(512, 512, (ctx, w, h) => {
    // Stainless steel container with divided cells
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(0, 0, w, h);

    // Warm dashi broth in compartments
    const cells = [
      { name: '大根 (Daikon)', color: '#fef9c3', shape: 'circle' },
      { name: '玉子 (Egg)', color: '#ca8a04', shape: 'circle' },
      { name: 'ちくわ (Chikuwa)', color: '#ea580c', shape: 'rect' },
      { name: 'こんにゃく (Konjac)', color: '#71717a', shape: 'triangle' },
      { name: 'はんぺん (Hanpen)', color: '#ffffff', shape: 'triangle' },
      { name: '牛すじ (Beef)', color: '#7f1d1d', shape: 'skewer' },
    ];

    const cellW = (w - 30) / 3;
    const cellH = (h - 30) / 2;

    for (let i = 0; i < cells.length; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 10 + col * (cellW + 5);
      const y = 10 + row * (cellH + 5);

      // Broth pool
      ctx.fillStyle = '#b45309';
      ctx.fillRect(x, y, cellW, cellH);

      // Oden ingredients
      const cell = cells[i];
      ctx.fillStyle = cell.color;
      const cx = x + cellW / 2;
      const cy = y + cellH / 2 - 10;

      if (cell.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(cx, cy, 32, 0, Math.PI * 2);
        ctx.fill();
      } else if (cell.shape === 'rect') {
        ctx.fillRect(cx - 35, cy - 20, 70, 40);
      } else if (cell.shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(cx, cy - 30);
        ctx.lineTo(cx + 35, cy + 30);
        ctx.lineTo(cx - 35, cy + 30);
        ctx.closePath();
        ctx.fill();
      } else {
        // Skewer
        ctx.fillStyle = '#451a03';
        ctx.fillRect(cx - 30, cy - 15, 60, 30);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(cx - 45, cy - 3, 90, 6);
      }

      // Name & Price
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(cell.name, cx, y + cellH - 18);
    }
  });
}

// 10. Community Bulletin Board Posters Texture
export function createBulletinPosterTexture() {
  return createCanvas(512, 512, (ctx, w, h) => {
    // Wood corkboard backing
    ctx.fillStyle = '#d97706';
    ctx.fillRect(0, 0, w, h);

    // Poster 1: Anime Summer Festival (花火大会)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(20, 20, 220, 320);
    // Fireworks circles
    const fwColors = ['#f43f5e', '#38bdf8', '#facc15', '#a855f7'];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      ctx.fillStyle = fwColors[i % 4];
      ctx.beginPath();
      ctx.arc(130 + Math.cos(angle) * 45, 120 + Math.sin(angle) * 45, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('桜町夏祭り', 130, 210);
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('花火大会 8/15', 130, 240);
    ctx.fillText('屋台・盆踊り', 130, 265);

    // Poster 2: Neighborhood Association (町内会 防犯)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(260, 20, 230, 220);
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(260, 20, 230, 45);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('防犯パトロール中', 375, 50);
    ctx.fillStyle = '#dc2626';
    ctx.font = '900 32px sans-serif';
    ctx.fillText('子どもを守ろう', 375, 120);
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('桜町二丁目自治会', 375, 175);

    // Poster 3: Lost Cat notice (尋ね猫)
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(260, 260, 230, 230);
    ctx.fillStyle = '#ea580c';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('ねこさがしてます', 375, 300);
    // Cat cute face silhouette
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(375, 360, 32, 0, Math.PI * 2);
    ctx.fill();
    // Ears
    ctx.beginPath();
    ctx.moveTo(350, 340); ctx.lineTo(335, 310); ctx.lineTo(365, 330); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(400, 340); ctx.lineTo(415, 310); ctx.lineTo(385, 330); ctx.fill();
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('黒白ハチワレ / すず付き', 375, 430);

    // Poster 4: Anime Live Concert
    ctx.fillStyle = '#3b0764';
    ctx.fillRect(20, 360, 220, 130);
    ctx.fillStyle = '#f43f5e';
    ctx.font = '900 20px sans-serif';
    ctx.fillText('LIVE TOUR 2026', 130, 400);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('NEO TOKYO STAGE', 130, 435);
  });
}

// 11. Japanese Road Signs Textures
export function createRoadSignsTexture() {
  // Triangular Stop Sign (止まれ)
  const stopSignTex = createCanvas(256, 256, (ctx, w, h) => {
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.clearRect(0, 0, w, h);

    // Inverted Triangle
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(w / 2, h - 20);
    ctx.lineTo(20, 30);
    ctx.lineTo(w - 20, 30);
    ctx.closePath();
    ctx.fill();

    // White border inside
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 48px "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('止まれ', w / 2, 85);

    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('STOP', w / 2, 135);
  });

  // Circular 30 Speed Limit Sign
  const speedSignTex = createCanvas(256, 256, (ctx, w, h) => {
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.clearRect(0, 0, w, h);

    // Blue circle
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 115, 0, Math.PI * 2);
    ctx.fill();

    // White inner ring
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 12;
    ctx.stroke();

    // White number 30
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 110px "Arial Rounded MT Bold", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('30', w / 2, h / 2 + 5);
  });

  // Street Name Plate (桜町二丁目)
  const streetPlateTex = createCanvas(512, 128, (ctx, w, h) => {
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 44px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('桜町二丁目', w / 2, h / 2 - 14);

    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Sakuramachi 2-chome', w / 2, h / 2 + 28);
  });

  return { stopSignTex, speedSignTex, streetPlateTex };
}

// 12. Road Stencil Textures (止まれ painted on wet asphalt)
export function createRoadTomareTexture() {
  return createCanvas(512, 1024, (ctx, w, h) => {
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.clearRect(0, 0, w, h);

    // Stretched Japanese Road Kanji "止まれ"
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 180px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('止', w / 2, 220);
    ctx.fillText('ま', w / 2, 520);
    ctx.fillText('れ', w / 2, 820);
  });
}

// 13. Street Garbage Bin Stickers
export function createGarbageLabelsTexture() {
  return createCanvas(512, 256, (ctx, w, h) => {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, w, h);

    const labels = [
      { text: 'もえるゴミ', sub: 'Burnable', color: '#16a34a' },
      { text: 'カン・ビン', sub: 'Cans / Bottles', color: '#0284c7' },
      { text: 'ペットボトル', sub: 'Plastic PET', color: '#f59e0b' }
    ];

    const slotW = w / 3;
    for (let i = 0; i < 3; i++) {
      const x = i * slotW + 10;
      ctx.fillStyle = labels[i].color;
      ctx.beginPath();
      ctx.roundRect(x, 15, slotW - 20, h - 30, 12);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i].text, x + (slotW - 20) / 2, 100);
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(labels[i].sub, x + (slotW - 20) / 2, 140);
    }
  });
}

// 14. Tactile Sidewalk Paving (Yellow Dot / Line Blocks)
export function createTactilePavingTexture() {
  return createCanvas(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#eab308'; // Safety yellow
    ctx.fillRect(0, 0, w, h);

    // Raised dots pattern
    const rows = 4;
    const cols = 4;
    const stepX = w / cols;
    const stepY = h / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = (c + 0.5) * stepX;
        const cy = (r + 0.5) * stepY;

        // Shadow
        ctx.fillStyle = '#ca8a04';
        ctx.beginPath();
        ctx.arc(cx + 3, cy + 3, 14, 0, Math.PI * 2);
        ctx.fill();

        // Highlight dot
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });
}

// 15. Metal Storm Drain Grate (排水沟格栅) Texture
export function createDrainGrateTexture() {
  return createCanvas(256, 256, (ctx, w, h) => {
    // Galvanized steel frame
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, 0, w, h);

    // Slots
    ctx.fillStyle = '#090d16'; // Deep gutter void beneath
    const slots = 8;
    const slotH = 14;
    const gap = (h - slots * slotH) / (slots + 1);

    for (let i = 0; i < slots; i++) {
      const y = gap + i * (slotH + gap);
      ctx.fillRect(16, y, w - 32, slotH);

      // Steel highlight on top edge
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(16, y - 2, w - 32, 2);
      ctx.fillStyle = '#090d16';
    }
  });
}
