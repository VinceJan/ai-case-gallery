// src/engine/TextureGenerator.ts
// Generates procedural Japanese anime textures using HTML Canvas, without external image files.
import * as THREE from 'three';

export class TextureGenerator {
  private static cache: Map<string, THREE.CanvasTexture> = new Map();

  /** Creates canvas texture with mipmaps and anisotropy */
  private static createTexture(
    width: number,
    height: number,
    drawFn: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void,
    cacheKey: string
  ): THREE.CanvasTexture {
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    drawFn(ctx, canvas);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    this.cache.set(cacheKey, texture);
    return texture;
  }

  /** Japanese Asphalt Road Texture with curb and subtle aggregate */
  public static createRoadTexture(): THREE.CanvasTexture {
    return this.createTexture(512, 512, (ctx) => {
      ctx.fillStyle = '#3a3d40';
      ctx.fillRect(0, 0, 512, 512);

      // Fine asphalt aggregate noise
      for (let i = 0; i < 6000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const c = Math.floor(45 + Math.random() * 35);
        ctx.fillStyle = `rgb(${c},${c},${c + 5})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }, 'road_asphalt');
  }

  /** Crosswalk / Zebra Crossing (横断歩道) */
  public static createCrosswalkTexture(): THREE.CanvasTexture {
    return this.createTexture(512, 512, (ctx) => {
      ctx.fillStyle = '#3a3d40';
      ctx.fillRect(0, 0, 512, 512);

      // Bold white stripes
      ctx.fillStyle = '#f5f6fa';
      const stripeCount = 7;
      const stripeWidth = 512 / (stripeCount * 2);
      for (let i = 0; i < stripeCount; i++) {
        ctx.fillRect(i * stripeWidth * 2 + stripeWidth * 0.4, 20, stripeWidth * 1.2, 472);
      }
    }, 'road_crosswalk');
  }

  /** Yellow Tactile Paving Blocks (点字ブロック) */
  public static createTactilePavingTexture(): THREE.CanvasTexture {
    return this.createTexture(256, 256, (ctx) => {
      ctx.fillStyle = '#fbc531';
      ctx.fillRect(0, 0, 256, 256);

      // Directional tactile guide lines
      ctx.fillStyle = '#e1b12c';
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(i * 64 + 14, 8, 36, 240);
        // Highlight bevel
        ctx.fillStyle = '#fdeca6';
        ctx.fillRect(i * 64 + 14, 8, 8, 240);
        ctx.fillStyle = '#c2961d';
        ctx.fillRect(i * 64 + 42, 8, 8, 240);
        ctx.fillStyle = '#e1b12c';
      }
    }, 'tactile_paving');
  }

  /** Traditional Japanese Kawara Roof Tiles (瓦) */
  public static createKawaraRoofTexture(): THREE.CanvasTexture {
    return this.createTexture(256, 256, (ctx) => {
      ctx.fillStyle = '#353b48';
      ctx.fillRect(0, 0, 256, 256);

      // Curved overlapping tiles
      ctx.fillStyle = '#2f3542';
      for (let y = 0; y < 256; y += 32) {
        ctx.fillRect(0, y, 256, 4);
        for (let x = 0; x < 256; x += 32) {
          ctx.beginPath();
          ctx.arc(x + 16, y + 28, 14, Math.PI, 0, false);
          ctx.strokeStyle = '#57606f';
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.fillStyle = '#1e272e';
          ctx.fillRect(x + 30, y, 2, 32);
        }
      }
    }, 'kawara_roof');
  }

  /** Traditional Japanese Tatami Mat Texture with fabric edge border */
  public static createTatamiTexture(): THREE.CanvasTexture {
    return this.createTexture(256, 512, (ctx) => {
      // Golden rush grass weave
      ctx.fillStyle = '#dcd39e';
      ctx.fillRect(0, 0, 256, 512);

      // Horizontal woven strands
      ctx.strokeStyle = '#c4b980';
      ctx.lineWidth = 1;
      for (let y = 0; y < 512; y += 4) {
        ctx.beginPath();
        ctx.moveTo(18, y);
        ctx.lineTo(238, y);
        ctx.stroke();
      }

      // Classic dark green / black fabric borders (縁)
      ctx.fillStyle = '#2d4b38';
      ctx.fillRect(0, 0, 18, 512);
      ctx.fillRect(238, 0, 18, 512);

      // Gold stitching detail on border
      ctx.fillStyle = '#b38d4c';
      for (let y = 4; y < 512; y += 12) {
        ctx.fillRect(7, y, 4, 6);
        ctx.fillRect(245, y, 4, 6);
      }
    }, 'tatami_mat');
  }

  /** Shoji Paper Sliding Screen (障子) */
  public static createShojiTexture(): THREE.CanvasTexture {
    return this.createTexture(256, 512, (ctx) => {
      // Translucent Washi paper background
      ctx.fillStyle = '#f8f6f0';
      ctx.fillRect(0, 0, 256, 512);

      // Cedar wood grid frame
      ctx.fillStyle = '#8b5a2b';
      // Outer border
      ctx.fillRect(0, 0, 256, 12);
      ctx.fillRect(0, 500, 256, 12);
      ctx.fillRect(0, 0, 12, 512);
      ctx.fillRect(244, 0, 12, 512);

      // Vertical lattice slats
      for (let x = 60; x < 240; x += 60) {
        ctx.fillRect(x - 3, 0, 6, 512);
      }

      // Horizontal lattice slats
      for (let y = 64; y < 500; y += 64) {
        ctx.fillRect(0, y - 3, 256, 6);
      }
    }, 'shoji_screen');
  }

  /** Wood Plank Floor Texture */
  public static createWoodPlankTexture(): THREE.CanvasTexture {
    return this.createTexture(256, 256, (ctx) => {
      ctx.fillStyle = '#c79c6e';
      ctx.fillRect(0, 0, 256, 256);

      // Planks seams
      ctx.fillStyle = '#8c5836';
      for (let y = 0; y < 256; y += 32) {
        ctx.fillRect(0, y, 256, 2);
      }

      // Staggered vertical joints
      ctx.fillRect(100, 0, 2, 32);
      ctx.fillRect(180, 32, 2, 32);
      ctx.fillRect(60, 64, 2, 32);
      ctx.fillRect(210, 96, 2, 32);
      ctx.fillRect(120, 128, 2, 32);
      ctx.fillRect(50, 160, 2, 32);
      ctx.fillRect(190, 192, 2, 32);
      ctx.fillRect(80, 224, 2, 32);
    }, 'wood_plank');
  }

  /** Sakura Mart Convenience Store Front Signboard */
  public static createSakuraMartSign(): THREE.CanvasTexture {
    return this.createTexture(512, 128, (ctx) => {
      // White clean base
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 512, 128);

      // Iconic 3-color konbini stripes (Orange, Green, Pink)
      ctx.fillStyle = '#e67e22';
      ctx.fillRect(0, 0, 512, 16);
      ctx.fillStyle = '#2ecc71';
      ctx.fillRect(0, 16, 512, 12);
      ctx.fillStyle = '#ff7675';
      ctx.fillRect(0, 100, 512, 12);
      ctx.fillStyle = '#2ecc71';
      ctx.fillRect(0, 112, 512, 16);

      // Japanese and English Signboard Logo
      ctx.fillStyle = '#d63031';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🌸 さくらマート 24H', 256, 70);

      ctx.fillStyle = '#2d3436';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('SAKURA MART CONVENIENCE STORE', 256, 94);
    }, 'sign_sakuramart');
  }

  /** Cafe Komorebi Retro Wooden Kissaten Signboard */
  public static createCafeSign(): THREE.CanvasTexture {
    return this.createTexture(512, 160, (ctx) => {
      // Rich dark cedar wood base
      ctx.fillStyle = '#3e2723';
      ctx.fillRect(0, 0, 512, 160);

      // Gold border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 6;
      ctx.strokeRect(10, 10, 492, 140);

      // Sign typography
      ctx.fillStyle = '#fff8e7';
      ctx.font = 'bold 42px serif';
      ctx.textAlign = 'center';
      ctx.fillText('☕ 珈琲 木漏れ日', 256, 75);

      ctx.font = 'italic 20px serif';
      ctx.fillStyle = '#d4af37';
      ctx.fillText('— CAFE KOMOREBI 1982 —', 256, 115);
      ctx.font = '14px sans-serif';
      ctx.fillText('Specialty Pour-Over & Vinyl Jazz', 256, 140);
    }, 'sign_cafekomorebi');
  }

  /** Sakura Station Platform Signboard (駅名標) */
  public static createStationSign(): THREE.CanvasTexture {
    return this.createTexture(512, 160, (ctx) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 512, 160);

      // JR-style vibrant cherry pink stripe
      ctx.fillStyle = '#fd79a8';
      ctx.fillRect(0, 0, 512, 24);
      ctx.fillStyle = '#e84393';
      ctx.fillRect(0, 136, 512, 24);

      // Kanji station name
      ctx.fillStyle = '#2d3436';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('さくら町', 256, 80);

      // Hiragana and Romaji
      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = '#636e72';
      ctx.fillText('Sakura-machi  [SK-01]', 256, 115);

      // Previous & Next station arrows
      ctx.textAlign = 'left';
      ctx.font = '16px sans-serif';
      ctx.fillText('◀ 川の向こう (River)', 30, 80);
      ctx.textAlign = 'right';
      ctx.fillText('神社前 (Shrine) ▶', 482, 80);
    }, 'sign_station');
  }

  /** Torii Shrine Plaque (神額) */
  public static createShrinePlaque(): THREE.CanvasTexture {
    return this.createTexture(256, 384, (ctx) => {
      // Lacquered black plaque
      ctx.fillStyle = '#1e272e';
      ctx.fillRect(0, 0, 256, 384);

      // Gold bevel edge
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 10;
      ctx.strokeRect(10, 10, 236, 364);

      // Vertical Kanji calligraphy in gold
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 62px serif';
      ctx.textAlign = 'center';
      ctx.fillText('桜', 128, 120);
      ctx.fillText('神', 128, 220);
      ctx.fillText('社', 128, 320);
    }, 'shrine_plaque');
  }

  /** Vending Machine Drink Dispenser Display (Boss Coffee, Green Tea, etc.) */
  public static createVendingDrinksDisplay(): THREE.CanvasTexture {
    return this.createTexture(256, 512, (ctx) => {
      ctx.fillStyle = '#2f3542';
      ctx.fillRect(0, 0, 256, 512);

      // Rows of canned drinks with backlit display
      const drinks = [
        { name: 'BOSS 珈琲', color: '#1a252f', price: '¥140' },
        { name: '緑茶 綾鷹', color: '#27ae60', price: '¥150' },
        { name: 'ポカリ', color: '#2980b9', price: '¥160' },
        { name: 'メロンソーダ', color: '#2ecc71', price: '¥130' }
      ];

      for (let row = 0; row < 4; row++) {
        const y = row * 110 + 20;
        const d = drinks[row];

        // Illuminated drink window
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(20, y, 216, 90);
        ctx.fillStyle = d.color;
        ctx.fillRect(30, y + 10, 50, 70);

        ctx.fillStyle = '#2d3436';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(d.name, 95, y + 42);

        // Price badge
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(95, y + 54, 70, 24);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(d.price, 105, y + 72);

        // Blue/Red hot/cold push button
        ctx.fillStyle = row === 0 ? '#e74c3c' : '#3498db';
        ctx.fillRect(180, y + 54, 46, 24);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(row === 0 ? 'あたたかい' : 'つめたい', 182, y + 70);
      }
    }, 'vending_display');
  }

  /** Ema Wishing Wooden Tablet Texture */
  public static createEmaTabletTexture(wishText: string): THREE.CanvasTexture {
    return this.createTexture(256, 180, (ctx) => {
      // Light cypress wood tablet
      ctx.fillStyle = '#f5deb3';
      ctx.fillRect(0, 0, 256, 180);

      // Wood grain lines
      ctx.strokeStyle = '#deb887';
      ctx.lineWidth = 1;
      for (let y = 10; y < 180; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(256, y);
        ctx.stroke();
      }

      // Red hanging cord hole at top
      ctx.fillStyle = '#c0392b';
      ctx.beginPath();
      ctx.arc(128, 18, 6, 0, Math.PI * 2);
      ctx.fill();

      // Wish Calligraphy
      ctx.fillStyle = '#2c3e50';
      ctx.font = 'bold 22px serif';
      ctx.textAlign = 'center';
      ctx.fillText(wishText, 128, 95);
      ctx.font = '14px serif';
      ctx.fillText('祈願成満 — 桜町', 128, 140);
    }, 'ema_' + wishText);
  }
}
