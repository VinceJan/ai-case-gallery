import * as THREE from 'three';

// Helper to create a canvas and 2D context
function createCanvas(w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  return { canvas, ctx };
}

// 1. Convenience Store Main Fascia Signboard (Mori Mart / 森のコンビニ)
export function createStoreSignTexture() {
  const { canvas, ctx } = createCanvas(1024, 256);

  // Background gradient: Japanese convenience store iconic bands
  // Top: Aqua/Sky Blue band
  ctx.fillStyle = '#0085d0';
  ctx.fillRect(0, 0, 1024, 75);

  // Middle: Clean pure white band
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 75, 1024, 106);

  // Bottom: Vibrant Emerald Green band
  ctx.fillStyle = '#00a651';
  ctx.fillRect(0, 181, 1024, 75);

  // Decorative border lines
  ctx.fillStyle = '#005f9e';
  ctx.fillRect(0, 72, 1024, 3);
  ctx.fillStyle = '#00803e';
  ctx.fillRect(0, 181, 1024, 3);

  // Left Logo emblem (Stylized tree / leaves in circle)
  ctx.save();
  ctx.translate(130, 128);
  ctx.fillStyle = '#00a651';
  ctx.beginPath();
  ctx.arc(0, 0, 44, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-10, 4, 24, 0, Math.PI * 2);
  ctx.arc(10, 4, 24, 0, Math.PI * 2);
  ctx.arc(0, -14, 26, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#78350f';
  ctx.fillRect(-6, 12, 12, 22);
  ctx.restore();

  // English Store Name: MORI MART
  ctx.fillStyle = '#004b87';
  ctx.font = '900 68px "Arial Black", "Hiragino Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('MORI MART', 210, 118);

  // Japanese Subtitle: 森のコンビニエンス 24H OPEN
  ctx.fillStyle = '#334155';
  ctx.font = 'bold 24px "Hiragino Kaku Gothic Pro", "Meiryo", sans-serif';
  ctx.fillText('森のコンビニエンス', 215, 158);

  // 24H Badge
  ctx.fillStyle = '#e11d48';
  ctx.beginPath();
  ctx.roundRect(750, 96, 140, 60, 12);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 32px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('24H', 820, 134);

  // Top header Japanese motto
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px "Hiragino Kaku Gothic Pro", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('街のオアシス・いつでもあなたのすぐそばに', 512, 40);

  // Bottom services list
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Hiragino Kaku Gothic Pro", sans-serif';
  ctx.fillText('酒・たばこ  |  銀行ATM  |  挽きたて珈琲  |  おでん・揚げ物', 512, 220);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

// 2. Convenience Store Side / Mini Signs
export function createSideSignTexture() {
  const { canvas, ctx } = createCanvas(512, 512);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 512);

  // Top/bottom color blocks
  ctx.fillStyle = '#0085d0';
  ctx.fillRect(0, 0, 512, 100);
  ctx.fillStyle = '#00a651';
  ctx.fillRect(0, 412, 512, 100);

  // Emblem
  ctx.save();
  ctx.translate(256, 210);
  ctx.fillStyle = '#00a651';
  ctx.beginPath();
  ctx.arc(0, 0, 75, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-18, 6, 40, 0, Math.PI * 2);
  ctx.arc(18, 6, 40, 0, Math.PI * 2);
  ctx.arc(0, -22, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#78350f';
  ctx.fillRect(-10, 20, 20, 36);
  ctx.restore();

  ctx.fillStyle = '#004b87';
  ctx.font = '900 52px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MORI MART', 256, 335);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 42px "Hiragino Kaku Gothic Pro", sans-serif';
  ctx.fillText('森のコンビニ', 256, 65);
  ctx.fillText('24H OPEN', 256, 475);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 3. Vending Machine Graphic Texture (Authentic Japanese Jihanki)
export function createVendingMachineTexture() {
  const { canvas, ctx } = createCanvas(512, 1024);

  // Base machine body (Deep Japanese vending machine Red/White or Blue/White)
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(0, 0, 512, 1024);

  // Top header marquee: "COLD & HOT"
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(24, 24, 464, 80);
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 36px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DRINKS & COFFEE', 256, 75);

  // Main showcase window (Backlit beverage display panel)
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(24, 120, 464, 480);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 120, 464, 480);

  // 3 shelves of drinks
  const drinkColors = [
    ['#16a34a', '#0284c7', '#ea580c', '#e11d48', '#854d0e', '#059669'], // Row 1: Green tea, Pocari, Orange, Cola, Coffee, CC Lemon
    ['#0284c7', '#6366f1', '#e11d48', '#16a34a', '#d97706', '#0284c7'], // Row 2: Sports, Milk tea, Soda, Oolong, Royal tea, Water
    ['#e11d48', '#7c2d12', '#7c2d12', '#0284c7', '#16a34a', '#d97706']  // Row 3: Hot coffee, Hot cocoa, Hot tea...
  ];

  const drinkLabels = [
    ['緑茶', 'POCARI', 'ORANGE', 'COLA', 'BOSS', 'LEMON'],
    ['WATER', 'MILK', 'SODA', '烏龍', 'ROYAL', 'AQUA'],
    ['HOT', 'COCOA', 'BLACK', 'LATTE', 'HOT茶', 'CORN']
  ];

  for (let row = 0; row < 3; row++) {
    const yShelf = 135 + row * 155;

    // Shelf divider bar
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(30, yShelf + 115, 452, 6);

    for (let col = 0; col < 6; col++) {
      const xCan = 44 + col * 74;
      const colr = drinkColors[row][col];
      const isHot = row === 2 && col < 3;

      // Bottle/Can body
      ctx.fillStyle = colr;
      ctx.beginPath();
      ctx.roundRect(xCan, yShelf + 10, 48, 85, [8, 8, 4, 4]);
      ctx.fill();

      // Top cap
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(xCan + 14, yShelf + 3, 20, 8);

      // Label text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(drinkLabels[row][col], xCan + 24, yShelf + 55);

      // Push button
      ctx.fillStyle = isHot ? '#ef4444' : '#0284c7';
      ctx.beginPath();
      ctx.roundRect(xCan + 2, yShelf + 124, 44, 22, 6);
      ctx.fill();

      // Button indicator text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(isHot ? 'あたたかい' : 'つめたい', xCan + 24, yShelf + 138);

      // Price tag
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText('¥140', xCan + 24, yShelf + 105);
    }
  }

  // Middle section: Coin slot, Bill acceptor, Digital Display
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(24, 620, 464, 110);

  // Digital LED Display
  ctx.fillStyle = '#000000';
  ctx.fillRect(40, 640, 140, 40);
  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 26px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('¥ 0', 110, 668);

  // Coin slot
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(220, 645, 40, 8);
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('硬貨投入口', 240, 672);

  // Bill slot
  ctx.fillStyle = '#475569';
  ctx.fillRect(310, 645, 70, 8);
  ctx.fillText('千円札', 345, 672);

  // Coin return lever
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.arc(425, 655, 14, 0, Math.PI * 2);
  ctx.fill();

  // Bottom: Dispensing Flap (取り出し口)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(40, 770, 432, 190);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 770, 432, 190);

  // Flap handle
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.roundRect(80, 800, 352, 130, 8);
  ctx.fill();

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 22px "Hiragino Kaku Gothic Pro", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('商品取り出し口  PUSH', 256, 875);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 4. Walk-in Drink Refrigerator Cooler Texture (Store Back Wall)
export function createDrinkWallTexture() {
  const { canvas, ctx } = createCanvas(1024, 512);

  // Lit frosted interior background
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(0, 0, 1024, 512);

  // Metal wire shelves lines
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 4;
  for (let s = 1; s <= 4; s++) {
    const y = s * 115;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Draw colorful drink bottle columns
  const palette = [
    '#15803d', '#16a34a', '#22c55e', // Green teas (Oi Ocha, Ayataka)
    '#0284c7', '#38bdf8', '#0ea5e9', // Pocari, Calpis, Aquaruis
    '#b91c1c', '#dc2626', '#ef4444', // Coca-cola, Red tea
    '#78350f', '#a16207', '#d97706', // Boss coffee, Royal milk tea
    '#eab308', '#facc15', '#fbbf24', // Lemon, Energy drinks
    '#3b82f6', '#60a5fa', '#93c5fd', // Mineral waters
    '#d97706', '#92400e', '#f59e0b'  // Asahi, Sapporo beer cans
  ];

  for (let shelf = 0; shelf < 4; shelf++) {
    const yBase = shelf * 115 + 115;
    const canHeight = 78;

    for (let c = 0; c < 36; c++) {
      const x = 15 + c * 28;
      const colr = palette[(shelf * 9 + c) % palette.length];

      ctx.fillStyle = colr;
      ctx.beginPath();
      ctx.roundRect(x, yBase - canHeight, 20, canHeight, [4, 4, 1, 1]);
      ctx.fill();

      // White cap
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 4, yBase - canHeight - 5, 12, 6);

      // Mini white label stripe
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(x + 2, yBase - canHeight + 25, 16, 20);
    }
  }

  // Vertical glass door frame dividers
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 12;
  for (let i = 1; i <= 3; i++) {
    const x = i * 256;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 5. Snacks / Instant Ramen / Chips Shelf Texture
export function createShelfItemsTexture(type = 'snacks') {
  const { canvas, ctx } = createCanvas(512, 256);

  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 0, 512, 256);

  if (type === 'ramen') {
    // Cup noodles rows
    const cupColors = ['#dc2626', '#0284c7', '#d97706', '#16a34a', '#000000', '#ea580c'];
    for (let row = 0; row < 2; row++) {
      const y = row * 120 + 20;
      for (let c = 0; c < 10; c++) {
        const x = 12 + c * 49;
        ctx.fillStyle = cupColors[(c + row * 3) % cupColors.length];
        // Cup shape: tapered trapezoid
        ctx.beginPath();
        ctx.moveTo(x + 4, y + 80);
        ctx.lineTo(x, y);
        ctx.lineTo(x + 40, y);
        ctx.lineTo(x + 36, y + 80);
        ctx.closePath();
        ctx.fill();

        // White lid
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x - 2, y, 44, 8);

        // Cup noodle gold stripe
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(x + 6, y + 30, 28, 14);
      }
    }
  } else if (type === 'chips') {
    // Calbee potato chips bags
    const bagColors = ['#ef4444', '#eab308', '#22c55e', '#3b82f6', '#f97316'];
    for (let row = 0; row < 2; row++) {
      const y = row * 120 + 15;
      for (let c = 0; c < 10; c++) {
        const x = 10 + c * 50;
        ctx.fillStyle = bagColors[(c + row * 2) % bagColors.length];
        // Pillow bag shape
        ctx.beginPath();
        ctx.roundRect(x, y, 44, 95, 10);
        ctx.fill();

        // Zigzag top/bottom crimp
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 6, y + 25, 32, 24);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('POTATO', x + 22, y + 40);
      }
    }
  } else {
    // Pocky boxes & sweet snacks
    const boxColors = ['#dc2626', '#f43f5e', '#15803d', '#a855f7', '#d97706'];
    for (let row = 0; row < 2; row++) {
      const y = row * 120 + 15;
      for (let c = 0; c < 12; c++) {
        const x = 8 + c * 42;
        ctx.fillStyle = boxColors[(c + row) % boxColors.length];
        ctx.beginPath();
        ctx.roundRect(x, y, 34, 96, 4);
        ctx.fill();

        // Pocky text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px "Arial Black", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Pocky', x + 17, y + 35);
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 6. Bento & Onigiri Display Texture
export function createBentoTexture() {
  const { canvas, ctx } = createCanvas(512, 256);

  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, 0, 512, 256);

  // Top half: Rows of triangular Onigiri (Rice balls)
  const onigiriFlavors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
  for (let i = 0; i < 9; i++) {
    const x = 20 + i * 53;
    const y = 20;

    // Triangular white rice body
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 22, y);
    ctx.lineTo(x + 44, y + 55);
    ctx.lineTo(x, y + 55);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Black nori seaweed wrap in center
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x + 12, y + 25, 20, 30);

    // Color flavor label sticker on top
    ctx.fillStyle = onigiriFlavors[i % onigiriFlavors.length];
    ctx.beginPath();
    ctx.arc(x + 22, y + 16, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  // Bottom half: Bento boxes with transparent lids
  for (let b = 0; b < 4; b++) {
    const bx = 16 + b * 122;
    const by = 110;

    // Bento tray base
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(bx, by, 110, 120, 8);
    ctx.fill();

    // Rice section
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(bx + 6, by + 6, 50, 108, 4);
    ctx.fill();

    // Red pickled plum (Umeboshi) in center of rice
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(bx + 31, by + 60, 6, 0, Math.PI * 2);
    ctx.fill();

    // Side dishes: Fried pork cutlet / Karaage & Tamagoyaki (Yellow)
    ctx.fillStyle = '#b45309'; // Tonkatsu
    ctx.beginPath();
    ctx.roundRect(bx + 62, by + 8, 42, 60, 4);
    ctx.fill();

    ctx.fillStyle = '#fbbf24'; // Egg
    ctx.beginPath();
    ctx.roundRect(bx + 62, by + 74, 42, 40, 4);
    ctx.fill();

    // Price sticker
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(bx + 20, by + 85, 45, 18);
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('¥498', bx + 42, by + 99);
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 7. Magazine & Manga Rack Covers
export function createMagazineTexture() {
  const { canvas, ctx } = createCanvas(512, 256);

  ctx.fillStyle = '#334155';
  ctx.fillRect(0, 0, 512, 256);

  const magStyles = [
    { title: 'JUMP', bg: '#dc2626', header: '#facc15' },
    { title: 'ANIME', bg: '#3b82f6', header: '#ffffff' },
    { title: 'MANGA', bg: '#ec4899', header: '#ffffff' },
    { title: 'FASHION', bg: '#10b981', header: '#0f172a' },
    { title: 'GAME', bg: '#8b5cf6', header: '#fef08a' },
    { title: 'TRAVEL', bg: '#f97316', header: '#ffffff' }
  ];

  for (let i = 0; i < 6; i++) {
    const x = 12 + i * 82;
    const y = 10;
    const mag = magStyles[i];

    // Magazine cover
    ctx.fillStyle = mag.bg;
    ctx.beginPath();
    ctx.roundRect(x, y, 74, 236, 4);
    ctx.fill();

    // Title banner
    ctx.fillStyle = mag.header;
    ctx.font = '900 16px "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(mag.title, x + 37, y + 28);

    // Simulated anime illustration face/silhouette
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.arc(x + 37, y + 90, 22, 0, Math.PI * 2);
    ctx.fill();

    // Anime hair
    ctx.fillStyle = i % 2 === 0 ? '#1e293b' : '#f59e0b';
    ctx.beginPath();
    ctx.arc(x + 37, y + 80, 24, Math.PI, Math.PI * 2);
    ctx.fill();

    // Eye lines
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(x + 27, y + 88, 6, 6);
    ctx.fillRect(x + 41, y + 88, 6, 6);

    // Text bar headlines
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 8, y + 140, 58, 6);
    ctx.fillRect(x + 8, y + 155, 45, 6);
    ctx.fillRect(x + 8, y + 170, 52, 6);

    // Price badge
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 12, y + 205, 50, 16);
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('¥580', x + 37, y + 218);
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 8. Window Promotional Posters (Japanese Anime & Convenience Store style)
export function createPosterTexture(type = 0) {
  const { canvas, ctx } = createCanvas(256, 384);

  if (type === 0) {
    // "おでん 始めました" (Oden has started!)
    ctx.fillStyle = '#fffbeb';
    ctx.fillRect(0, 0, 256, 384);

    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 236, 364);

    // Brush style calligraphy header
    ctx.fillStyle = '#78350f';
    ctx.font = '900 32px "Hiragino Mincho Pro", "Yu Mincho", serif';
    ctx.textAlign = 'center';
    ctx.fillText('あったか〜い', 128, 60);

    ctx.fillStyle = '#dc2626';
    ctx.font = '900 48px "Hiragino Mincho Pro", "Yu Mincho", serif';
    ctx.fillText('おでん', 128, 120);

    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 30px "Hiragino Mincho Pro", serif';
    ctx.fillText('始めました', 128, 170);

    // Steaming bowl illustration
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.arc(128, 260, 60, 0, Math.PI);
    ctx.fill();

    // Daikon & Chikuwa
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(110, 250, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#a16207';
    ctx.fillRect(135, 235, 30, 18);

    // Steam lines
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(110, 220);
    ctx.quadraticCurveTo(100, 200, 115, 180);
    ctx.moveTo(130, 215);
    ctx.quadraticCurveTo(145, 195, 130, 175);
    ctx.stroke();

    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('全品 80円〜', 128, 345);
  } else if (type === 1) {
    // Anime collaboration banner: "魔法少女 x MORI MART"
    ctx.fillStyle = '#fdf2f8';
    ctx.fillRect(0, 0, 256, 384);

    ctx.fillStyle = '#ec4899';
    ctx.fillRect(0, 0, 256, 80);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Hiragino Kaku Gothic Pro", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('コラボキャンペーン', 128, 35);
    ctx.font = '900 24px "Hiragino Kaku Gothic Pro", sans-serif';
    ctx.fillText('魔法少女☆スターリー', 128, 65);

    // Anime girl face
    ctx.fillStyle = '#ffe4e6';
    ctx.beginPath();
    ctx.arc(128, 190, 65, 0, Math.PI * 2);
    ctx.fill();

    // Pink anime twintails
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(70, 170, 30, 0, Math.PI * 2);
    ctx.arc(186, 170, 30, 0, Math.PI * 2);
    ctx.arc(128, 160, 68, Math.PI, Math.PI * 2);
    ctx.fill();

    // Big anime sparkle eyes
    ctx.fillStyle = '#8b5cf6';
    ctx.beginPath();
    ctx.arc(105, 195, 12, 0, Math.PI * 2);
    ctx.arc(151, 195, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(102, 192, 4, 0, Math.PI * 2);
    ctx.arc(148, 192, 4, 0, Math.PI * 2);
    ctx.fill();

    // Cute blush
    ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
    ctx.beginPath();
    ctx.arc(95, 212, 10, 0, Math.PI * 2);
    ctx.arc(161, 212, 10, 0, Math.PI * 2);
    ctx.fill();

    // Promo badge
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('対象商品を買って', 128, 290);
    ctx.fillStyle = '#dc2626';
    ctx.font = '900 24px sans-serif';
    ctx.fillText('限定クリアファイルGET!', 128, 325);
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.fillText('※なくなり次第終了となります', 128, 355);
  } else {
    // "挽きたて森カフェ 120円" (Fresh ground drip coffee)
    ctx.fillStyle = '#292524';
    ctx.fillRect(0, 0, 256, 384);

    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 24px "Hiragino Mincho Pro", serif';
    ctx.textAlign = 'center';
    ctx.fillText('MORI CAFE', 128, 50);

    ctx.fillStyle = '#f5f5f4';
    ctx.font = '900 36px "Hiragino Mincho Pro", serif';
    ctx.fillText('挽きたて珈琲', 128, 100);

    // Coffee Cup graphic
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(80, 160);
    ctx.lineTo(95, 270);
    ctx.lineTo(161, 270);
    ctx.lineTo(176, 160);
    ctx.closePath();
    ctx.fill();

    // Brown sleeve
    ctx.fillStyle = '#78350f';
    ctx.fillRect(87, 190, 82, 50);
    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('MORI CAFE', 128, 220);

    // Dark lid
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(72, 150, 112, 14);

    ctx.fillStyle = '#f59e0b';
    ctx.font = '900 42px "Arial Black", sans-serif';
    ctx.fillText('¥120', 128, 335);
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 9. Japanese Street Signs (Stop sign / One way / Station name)
export function createStreetSignTexture(type = 'stop') {
  const { canvas, ctx } = createCanvas(256, 256);

  if (type === 'stop') {
    // Inverted red triangle "止まれ" (Tomare)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(128, 235);
    ctx.lineTo(240, 25);
    ctx.lineTo(16, 25);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(128, 218);
    ctx.lineTo(228, 35);
    ctx.lineTo(28, 35);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 52px "Hiragino Kaku Gothic Pro", "Yu Gothic", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('止まれ', 128, 105);

    ctx.font = '900 24px "Arial Black", sans-serif';
    ctx.fillText('STOP', 128, 150);
  } else if (type === 'oneway') {
    // Blue circle with white arrow
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(128, 128, 120, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(128, 128, 110, 0, Math.PI * 2);
    ctx.fill();

    // White Arrow pointing up
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(128, 45);
    ctx.lineTo(180, 115);
    ctx.lineTo(145, 115);
    ctx.lineTo(145, 205);
    ctx.lineTo(111, 205);
    ctx.lineTo(111, 115);
    ctx.lineTo(76, 115);
    ctx.closePath();
    ctx.fill();
  } else {
    // Utility pole address plate: "緑町 3丁目 14"
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 0, 256, 256);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, 236, 236);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Hiragino Mincho Pro", serif';
    ctx.textAlign = 'center';
    ctx.fillText('緑町三丁目', 128, 90);
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('14番地', 128, 150);
    ctx.font = 'bold 18px monospace';
    ctx.fillText('MIDORI-CHO', 128, 200);
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 10. Neighborhood Community Notice Board Texture (掲示板)
export function createBulletinBoardTexture() {
  const { canvas, ctx } = createCanvas(512, 256);

  // Corkboard wooden backplate
  ctx.fillStyle = '#78350f';
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = '#ca8a04';
  ctx.fillRect(12, 12, 488, 232);

  // Top header: "町内掲示板"
  ctx.fillStyle = '#78350f';
  ctx.fillRect(20, 18, 472, 34);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px "Hiragino Kaku Gothic Pro", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('緑町自治会 連絡掲示板', 256, 42);

  // Flyer 1: Lost Cat (迷い猫探してます)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(30, 64, 130, 168, 4);
  ctx.fill();
  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('迷い猫です！', 95, 88);
  // Cat silhouette
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(95, 135, 24, 0, Math.PI * 2);
  ctx.fill();
  // Ears
  ctx.beginPath();
  ctx.moveTo(75, 120);
  ctx.lineTo(82, 95);
  ctx.lineTo(95, 115);
  ctx.moveTo(115, 115);
  ctx.lineTo(128, 95);
  ctx.lineTo(135, 120);
  ctx.fill();
  ctx.fillStyle = '#475569';
  ctx.font = '10px sans-serif';
  ctx.fillText('白黒ハチワレ', 95, 180);
  ctx.fillText('首輪：赤色', 95, 198);
  ctx.fillText('見かけたら連絡を', 95, 216);

  // Flyer 2: Autumn Festival (秋祭りのお知らせ)
  ctx.fillStyle = '#fef3c7';
  ctx.beginPath();
  ctx.roundRect(180, 64, 150, 168, 4);
  ctx.fill();
  ctx.fillStyle = '#ea580c';
  ctx.font = 'bold 18px "Hiragino Mincho Pro", serif';
  ctx.fillText('秋の神社祭り', 255, 96);
  ctx.fillStyle = '#b45309';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('10月15日(土)開催', 255, 126);
  ctx.fillText('屋台・お神輿・花火', 255, 150);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(205, 175, 100, 24);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('参加者大募集', 255, 192);

  // Flyer 3: Recycling collection chart (ゴミ収集日カレンダー)
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.roundRect(350, 64, 135, 168, 4);
  ctx.fill();
  ctx.fillStyle = '#0369a1';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('資源ゴミ回収', 417, 88);
  ctx.font = '11px sans-serif';
  ctx.fillText('月・木：可燃ごみ', 417, 120);
  ctx.fillText('火曜日：ビン・缶', 417, 145);
  ctx.fillText('金曜日：古紙段ボール', 417, 170);
  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText('※朝8時までに出すこと', 417, 210);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 11. Road Markings & Zebra Crossing
export function createRoadZebraTexture() {
  const { canvas, ctx } = createCanvas(512, 512);

  // Dark wet asphalt base
  ctx.fillStyle = '#161922';
  ctx.fillRect(0, 0, 512, 512);

  // White zebra stripes with slightly worn cel-shaded edge
  ctx.fillStyle = '#e2e8f0';
  for (let i = 0; i < 5; i++) {
    const y = 35 + i * 95;
    ctx.fillRect(40, y, 432, 54);
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 12. Japanese Tactile Paving (Tenji Block / 盲道点字ブロック)
export function createTactilePaverTexture() {
  const { canvas, ctx } = createCanvas(256, 256);

  // Warning yellow base
  ctx.fillStyle = '#eab308';
  ctx.fillRect(0, 0, 256, 256);

  // Raised round dots grid (4x4)
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const x = 32 + c * 64;
      const y = 32 + r * 64;

      // Dark edge shadow
      ctx.fillStyle = '#a16207';
      ctx.beginPath();
      ctx.arc(x + 2, y + 2, 16, 0, Math.PI * 2);
      ctx.fill();

      // Bright yellow highlight
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(x - 2, y - 2, 16, 0, Math.PI * 2);
      ctx.fill();

      // Center
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// 13. AC Outdoor Unit Grille Texture
export function createACUnitTexture() {
  const { canvas, ctx } = createCanvas(256, 256);

  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, 0, 256, 256);

  // Circular fan enclosure
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(105, 130, 85, 0, Math.PI * 2);
  ctx.fill();

  // Spiral fan blades
  ctx.fillStyle = '#475569';
  for (let b = 0; b < 3; b++) {
    ctx.save();
    ctx.translate(105, 130);
    ctx.rotate((b * 120 * Math.PI) / 180);
    ctx.beginPath();
    ctx.ellipse(0, 35, 18, 45, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Center hub
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(105, 130, 22, 0, Math.PI * 2);
  ctx.fill();

  // Horizontal protective wire grille
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  for (let g = 50; g <= 210; g += 16) {
    ctx.beginPath();
    ctx.moveTo(25, g);
    ctx.lineTo(185, g);
    ctx.stroke();
  }

  // Right brand logo & warning label
  ctx.fillStyle = '#0284c7';
  ctx.font = '900 16px "Arial Black", sans-serif';
  ctx.fillText('DAIKIN', 200, 50);

  ctx.fillStyle = '#ef4444';
  ctx.fillRect(200, 80, 44, 25);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 9px sans-serif';
  ctx.fillText('CAUTION', 202, 96);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 14. Oden Simmering Pot Texture (Top view of compartments)
export function createOdenSoupTexture() {
  const { canvas, ctx } = createCanvas(256, 256);

  // Amber golden simmering dashi broth
  ctx.fillStyle = '#b45309';
  ctx.fillRect(0, 0, 256, 256);

  // Metal dividers: 6 compartments (2 rows x 3 cols)
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 8;
  // Horizontal divider
  ctx.beginPath();
  ctx.moveTo(0, 128);
  ctx.lineTo(256, 128);
  ctx.stroke();
  // Vertical dividers
  ctx.beginPath();
  ctx.moveTo(85, 0);
  ctx.lineTo(85, 256);
  ctx.moveTo(170, 0);
  ctx.lineTo(170, 256);
  ctx.stroke();

  // Ingredients floating in broth
  // Daikon radish rounds (Pale gold translucent)
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(42, 64, 26, 0, Math.PI * 2);
  ctx.fill();

  // Konjac triangle (speckled grey)
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.moveTo(128, 30);
  ctx.lineTo(160, 95);
  ctx.lineTo(95, 95);
  ctx.closePath();
  ctx.fill();

  // Boiled eggs (Golden brown braised)
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.arc(213, 64, 22, 0, Math.PI * 2);
  ctx.fill();

  // Chikuwa fish cake cylinders
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(20, 160, 45, 28);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(32, 160, 20, 28);

  // Kinchaku tofu pouch with string
  ctx.fillStyle = '#ca8a04';
  ctx.beginPath();
  ctx.roundRect(105, 150, 46, 55, 12);
  ctx.fill();

  // Rolled cabbage / meatballs
  ctx.fillStyle = '#86efac';
  ctx.beginPath();
  ctx.arc(213, 192, 24, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}
