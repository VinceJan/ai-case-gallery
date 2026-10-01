// src/engine/TextureGenerator.ts
// Procedural high-quality Japanese signage and textures rendered to Canvas textures.
import * as THREE from 'three';

export class TextureGenerator {
  private static cache: Map<string, THREE.CanvasTexture> = new Map();

  /** Japanese Road Marking: "止まれ" (TOMARE / STOP) on asphalt */
  public static createRoadStopTexture(): THREE.CanvasTexture {
    const key = 'road_stop';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Dark grey asphalt base
    ctx.fillStyle = '#3a3d40';
    ctx.fillRect(0, 0, 512, 1024);

    // Subtle asphalt noise
    for (let i = 0; i < 6000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 1024;
      const shade = Math.floor(45 + Math.random() * 30);
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.fillRect(x, y, 2, 2);
    }

    // White stop border / bar
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(40, 60, 432, 28);

    // Inverted Triangle Stop line
    ctx.beginPath();
    ctx.moveTo(256, 320);
    ctx.lineTo(80, 140);
    ctx.lineTo(432, 140);
    ctx.closePath();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 24;
    ctx.stroke();

    // Bold Kanji "止"
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 220px "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('止', 256, 540);

    // Kanji "ま"
    ctx.fillText('ま', 256, 750);

    // Kanji "れ"
    ctx.fillText('れ', 256, 940);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    this.cache.set(key, texture);
    return texture;
  }

  /** Yellow Tactile Paving Blocks for sidewalks (点字ブロック / Braille blocks) */
  public static createTactilePavingTexture(): THREE.CanvasTexture {
    const key = 'tactile_paving';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Japanese warning yellow
    ctx.fillStyle = '#f5c518';
    ctx.fillRect(0, 0, 256, 256);

    // 4 directional raised bars
    ctx.fillStyle = '#d4a30e';
    for (let i = 0; i < 4; i++) {
      const x = 32 + i * 56;
      ctx.fillRect(x, 16, 24, 224);
      // Highlight on edge
      ctx.fillStyle = '#ffea6c';
      ctx.fillRect(x, 16, 6, 224);
      ctx.fillStyle = '#d4a30e';
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    this.cache.set(key, texture);
    return texture;
  }

  /** Zebra Crossing Texture */
  public static createZebraCrossingTexture(): THREE.CanvasTexture {
    const key = 'zebra_crossing';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#3a3d40';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#ffffff';
    const stripeCount = 6;
    const stripeWidth = 512 / (stripeCount * 2);
    for (let i = 0; i < stripeCount; i++) {
      ctx.fillRect(i * stripeWidth * 2 + 10, 0, stripeWidth - 4, 512);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    this.cache.set(key, texture);
    return texture;
  }

  /** Sakura Mart Convenience Store Main Signboard */
  public static createSakuraMartSign(): THREE.CanvasTexture {
    const key = 'sakura_mart_sign';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // White glossy background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1024, 256);

    // Classic Japanese convenience store tricolor stripes (Green, Orange, Blue)
    ctx.fillStyle = '#2db84d'; // Fresh green
    ctx.fillRect(0, 0, 1024, 32);
    ctx.fillStyle = '#ff7b00'; // Orange
    ctx.fillRect(0, 32, 1024, 18);
    ctx.fillStyle = '#1e88e5'; // Sky blue
    ctx.fillRect(0, 50, 1024, 12);

    // Sakura flower logo mark
    ctx.save();
    ctx.translate(140, 150);
    ctx.fillStyle = '#ff6b8b';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.ellipse(0, -32, 18, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.rotate((Math.PI * 2) / 5);
    }
    ctx.fillStyle = '#ffe066';
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Store Name
    ctx.fillStyle = '#e63946';
    ctx.font = 'bold 96px "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('さくらマート', 240, 145);

    // Subtext
    ctx.fillStyle = '#2b2d42';
    ctx.font = 'bold 36px "Segoe UI", sans-serif';
    ctx.fillText('SAKURA MART 24H', 248, 215);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /** Railway Station Sign: "さくら町 / Sakura Town" with directional arrows */
  public static createStationSign(): THREE.CanvasTexture {
    const key = 'station_sign';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 360;
    const ctx = canvas.getContext('2d')!;

    // Clean Japanese JR-style station board
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1024, 360);

    // Top Green Line (JR East style line color)
    ctx.fillStyle = '#00a040';
    ctx.fillRect(0, 0, 1024, 48);

    // Station code / number
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(40, 8, 80, 32);
    ctx.fillStyle = '#00a040';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SK-01', 80, 24);

    // Main Station Name Kanji & Hiragana
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 100px "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('さくら町', 512, 160);

    ctx.font = '36px "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif';
    ctx.fillStyle = '#4b5563';
    ctx.fillText('さくらまち', 512, 230);

    ctx.font = 'bold 32px "Segoe UI", sans-serif';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Sakura-chō', 512, 280);

    // Neighboring stations
    ctx.font = '26px "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'left';
    ctx.fillText('◀ ひだまり (Hidamari)', 50, 325);
    ctx.textAlign = 'right';
    ctx.fillText('みどり坂 (Midorizaka) ▶', 974, 325);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /** Railway Crossing Warning Sign: "踏切注意" with yellow/black diagonal stripes */
  public static createCrossingSign(): THREE.CanvasTexture {
    const key = 'crossing_sign';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Yellow background
    ctx.fillStyle = '#ffd600';
    ctx.fillRect(0, 0, 512, 256);

    // Black border
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, 498, 242);

    // Japanese kanji "踏切注意"
    ctx.fillStyle = '#111111';
    ctx.font = 'bold 76px "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('踏切注意', 256, 128);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /** Yellow & Black Diagonal Stripes for crossing barriers */
  public static createBarrierStripesTexture(): THREE.CanvasTexture {
    const key = 'barrier_stripes';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#ffd600';
    ctx.fillRect(0, 0, 512, 64);

    ctx.fillStyle = '#111111';
    const stripeW = 48;
    for (let x = -64; x < 512 + 64; x += stripeW * 2) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + stripeW, 0);
      ctx.lineTo(x + stripeW - 32, 64);
      ctx.lineTo(x - 32, 64);
      ctx.closePath();
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    this.cache.set(key, texture);
    return texture;
  }

  /** Vending Machine Front Face Texture (Japanese canned drinks) */
  public static createVendingMachineTexture(): THREE.CanvasTexture {
    const key = 'vending_front';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Clean off-white/crimson Japanese vending machine body
    ctx.fillStyle = '#e8253b'; // Vivid red body
    ctx.fillRect(0, 0, 512, 1024);

    // Top logo area
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(30, 30, 452, 100);
    ctx.fillStyle = '#e8253b';
    ctx.font = 'bold 50px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SAKURA DRINKS', 256, 95);

    // Middle Illuminated Glass Display Case
    ctx.fillStyle = '#222831';
    ctx.fillRect(30, 160, 452, 420);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 160, 452, 420);

    // Draw 2 rows of drink cans with glowing price tags
    const drinkColors = ['#2e7d32', '#1565c0', '#d81b60', '#f57f17', '#4e342e'];
    const drinkLabels = ['お茶', 'Soda', '桜Tea', 'Lemon', 'Coffee'];

    for (let row = 0; row < 2; row++) {
      const y = 200 + row * 190;
      // Shelf rail
      ctx.fillStyle = '#9e9e9e';
      ctx.fillRect(40, y + 105, 432, 8);

      for (let col = 0; col < 5; col++) {
        const x = 55 + col * 82;
        // Can body
        ctx.fillStyle = drinkColors[col % drinkColors.length];
        ctx.beginPath();
        ctx.roundRect(x, y, 46, 85, 6);
        ctx.fill();

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(drinkLabels[col % drinkLabels.length], x + 23, y + 50);

        // Price button (Cold/Hot blue or red button)
        ctx.fillStyle = col === 4 ? '#d32f2f' : '#1976d2';
        ctx.fillRect(x + 3, y + 118, 40, 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('¥130', x + 23, y + 133);
      }
    }

    // Coin slot & Bill acceptor area
    ctx.fillStyle = '#37474f';
    ctx.fillRect(320, 620, 150, 140);
    ctx.fillStyle = '#ffd600';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('¥130', 395, 660);

    ctx.fillStyle = '#111';
    ctx.fillRect(375, 680, 40, 8); // Coin slit
    ctx.fillRect(360, 710, 70, 12); // Bill slot

    // Large Dispensing Flap at Bottom
    ctx.fillStyle = '#1e272c';
    ctx.fillRect(60, 810, 392, 140);
    ctx.strokeStyle = '#78909c';
    ctx.lineWidth = 6;
    ctx.strokeRect(60, 810, 392, 140);

    ctx.fillStyle = '#b0bec5';
    ctx.font = 'bold 24px "Hiragino Sans", "Meiryo", sans-serif';
    ctx.fillText('取り出し口 (Push)', 256, 885);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /** Japanese Tatami Mat Texture with green cloth borders (縁 / Beri) */
  public static createTatamiTexture(): THREE.CanvasTexture {
    const key = 'tatami';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Natural dried igusa rush straw golden green
    ctx.fillStyle = '#d8d49a';
    ctx.fillRect(0, 0, 512, 1024);

    // Fine woven horizontal lines
    ctx.strokeStyle = '#c4be82';
    ctx.lineWidth = 2;
    for (let y = 0; y < 1024; y += 8) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(472, y);
      ctx.stroke();
    }

    // Left and right dark green embroidered cloth borders
    ctx.fillStyle = '#2e4732';
    ctx.fillRect(0, 0, 40, 1024);
    ctx.fillRect(472, 0, 40, 1024);

    // Subtle golden pattern on borders
    ctx.fillStyle = '#d4af37';
    for (let y = 16; y < 1024; y += 32) {
      ctx.fillRect(16, y, 8, 8);
      ctx.fillRect(488, y, 8, 8);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    this.cache.set(key, texture);
    return texture;
  }

  /** Cafe Komorebi Wooden Signboard */
  public static createCafeSign(): THREE.CanvasTexture {
    const key = 'cafe_sign';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Dark walnut wood
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(0, 0, 512, 256);

    ctx.strokeStyle = '#d7ccc8';
    ctx.lineWidth = 6;
    ctx.strokeRect(12, 12, 488, 232);

    // Coffee cup icon
    ctx.fillStyle = '#ffcc80';
    ctx.font = '40px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('☕', 256, 75);

    // Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif';
    ctx.fillText('珈琲 木漏れ日', 256, 145);

    ctx.font = '24px "Segoe UI", sans-serif';
    ctx.fillStyle = '#bcaaa4';
    ctx.fillText('CAFE KOMOREBI • HAND DRIP', 256, 195);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /** Sakura Petal Texture with gentle gradient alpha */
  public static createSakuraPetalTexture(): THREE.CanvasTexture {
    const key = 'sakura_petal';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 128, 128);

    // Heart / teardrop notched cherry blossom petal
    ctx.save();
    ctx.translate(64, 64);

    const grad = ctx.createRadialGradient(0, -10, 5, 0, 0, 50);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#ffb7c5');
    grad.addColorStop(1, '#ff6987');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 45);
    ctx.bezierCurveTo(-38, 20, -42, -25, -15, -42);
    ctx.lineTo(0, -28); // Notched tip
    ctx.lineTo(15, -42);
    ctx.bezierCurveTo(42, -25, 38, 20, 0, 45);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /** School Blackboard Texture */
  public static createClassroomChalkboard(): THREE.CanvasTexture {
    const key = 'chalkboard';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Dark forest green chalkboard
    ctx.fillStyle = '#1c3b2b';
    ctx.fillRect(0, 0, 1024, 512);

    // Chalk border
    ctx.fillStyle = '#8d6e63';
    ctx.fillRect(0, 500, 1024, 12); // Chalk tray

    // Chalk writings in white and yellow
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('5月14日 (金) 日直：葵・蓮', 50, 70);

    ctx.fillStyle = '#fff59d';
    ctx.font = '28px "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif';
    ctx.fillText('【本日の目標】 来週の春季大会に向けて準備', 50, 140);
    ctx.fillText('・放課後：図書委員会議', 50, 200);
    ctx.fillText('・宿題：数学ワークブック p.42-45', 50, 260);

    // Cute doodle on right
    ctx.strokeStyle = '#ff80ab';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(850, 180, 50, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('春🌸', 850, 188);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /** Shinto Shrine Ema Plaque Texture */
  public static createEmaPlaqueTexture(): THREE.CanvasTexture {
    const key = 'ema_plaque';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 360;
    const ctx = canvas.getContext('2d')!;

    // Pentagon wooden shape
    ctx.fillStyle = '#e0c9a6';
    ctx.beginPath();
    ctx.moveTo(256, 20);
    ctx.lineTo(492, 100);
    ctx.lineTo(492, 340);
    ctx.lineTo(20, 340);
    ctx.lineTo(20, 100);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#b08d57';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Red braided string hole
    ctx.fillStyle = '#d32f2f';
    ctx.beginPath();
    ctx.arc(256, 60, 12, 0, Math.PI * 2);
    ctx.fill();

    // Brush writing "祈 願" (Prayer / Wish)
    ctx.fillStyle = '#222222';
    ctx.font = 'bold 64px "Hiragino Sans", "Meiryo", "Noto Sans JP", serif';
    ctx.textAlign = 'center';
    ctx.fillText('家内安全', 256, 170);

    ctx.font = '32px "Hiragino Sans", "Meiryo", "Noto Sans JP", serif';
    ctx.fillText('志望校合格 • 蓮', 256, 250);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }
}
