import * as THREE from 'three';
import { WEATHER_TYPES } from './weather.js';

export function setupUI({
  weatherSystem,
  controls,
  camera,
  audioManager,
  postprocessing,
  knightStandee,
  farmerStandee
}) {
  const container = document.getElementById('app');

  // Inject UI HTML
  container.innerHTML = `
    <!-- Top-Right Clean View Toggle (Always accessible) -->
    <button id="clean-toggle-pill" title="切换纯净观赏 / 显示UI (快捷键 H)">
      <span id="clean-icon">👁️</span>
      <span id="clean-text">纯净观赏</span>
      <span class="key-tag">H</span>
    </button>

    <!-- Master UI Root -->
    <div id="ui-root">
      <!-- Header Info -->
      <div class="ui-header">
        <div class="title-row">
          <span class="title-badge">Cel-Shaded 3D Diorama</span>
          <span class="title-text">中世纪城堡与农田村庄微缩模型</span>
        </div>
        <span class="subtitle-text">前低后高阶梯构图 · 三渲二明确轮廓 · 像素立牌生态交互 · 动态天气</span>
      </div>

      <!-- Quick Control Guide -->
      <div class="ui-guide">
        <div class="guide-row"><span>左键拖拽</span> <span class="key-tag">Rotate</span> <span>旋转观赏</span></div>
        <div class="guide-row"><span>右键拖拽</span> <span class="key-tag">Pan</span> <span>平移视角</span></div>
        <div class="guide-row"><span>滚轮缩放</span> <span class="key-tag">Zoom</span> <span>推进拉远</span></div>
        <div class="guide-row"><span>纯净模式</span> <span class="key-tag">H</span> <span>一键隐藏UI</span></div>
      </div>

      <!-- Main Bottom Dock -->
      <div class="ui-dock">
        <!-- Weather Presets -->
        <div class="btn-group">
          <span class="btn-group-label">天气</span>
          <button class="dock-btn active" data-weather="SUNNY" title="晴朗白昼">
            <span class="btn-icon">☀️</span> 晴朗
          </button>
          <button class="dock-btn" data-weather="DUSK" title="醉美黄昏">
            <span class="btn-icon">🌅</span> 黄昏
          </button>
          <button class="dock-btn" data-weather="RAIN" title="细雨微风">
            <span class="btn-icon">🌧️</span> 细雨
          </button>
          <button class="dock-btn" data-weather="SNOW" title="宁静初雪">
            <span class="btn-icon">❄️</span> 初雪
          </button>
          <button class="dock-btn" data-weather="NIGHT" title="静谧星夜与萤火虫">
            <span class="btn-icon">🌙</span> 星夜
          </button>
        </div>

        <div class="dock-divider"></div>

        <!-- Camera Views -->
        <div class="btn-group">
          <span class="btn-group-label">视角</span>
          <button class="dock-btn active" data-cam="overview" title="全景微缩视角">
            <span class="btn-icon">🏰</span> 全景
          </button>
          <button class="dock-btn" data-cam="castle" title="高处宅堡特写">
            <span class="btn-icon">🛡️</span> 宅堡
          </button>
          <button class="dock-btn" data-cam="village" title="村落广场特写">
            <span class="btn-icon">🏡</span> 村落
          </button>
          <button class="dock-btn" data-cam="farmland" title="金色麦田特写">
            <span class="btn-icon">🌾</span> 麦田
          </button>
          <button class="dock-btn" data-cam="knight" title="跟随巡逻小骑士">
            <span class="btn-icon">⚔️</span> 小骑士
          </button>
          <button class="dock-btn" data-cam="farmer" title="跟随劳作农夫">
            <span class="btn-icon">🧑‍🌾</span> 农夫
          </button>
        </div>

        <div class="dock-divider"></div>

        <!-- Render Style & Atmosphere -->
        <div class="btn-group">
          <span class="btn-group-label">效果</span>
          <button class="dock-btn active" id="btn-outline" title="三渲二明确轮廓描边">
            <span class="btn-icon">✒️</span> 轮廓描边
          </button>
          <button class="dock-btn" id="btn-turntable" title="自动环绕巡航">
            <span class="btn-icon">🔄</span> 自动巡航
          </button>
          <button class="dock-btn" id="btn-sound" title="环境合成音效">
            <span class="btn-icon">🔇</span> 音效
          </button>
        </div>
      </div>
    </div>
  `;

  // State
  let isUIHidden = false;
  let targetCamPos = null;
  let targetCamLookAt = null;
  let followTarget = null;
  let outlineMode = 'crisp'; // 'crisp', 'soft', 'off'

  const uiRoot = document.getElementById('ui-root');
  const cleanTogglePill = document.getElementById('clean-toggle-pill');
  const cleanIcon = document.getElementById('clean-icon');
  const cleanText = document.getElementById('clean-text');

  // Toggle UI visibility
  function toggleUI() {
    isUIHidden = !isUIHidden;
    if (isUIHidden) {
      uiRoot.classList.add('hidden');
      cleanIcon.textContent = '🏰';
      cleanText.textContent = '显示控制台';
    } else {
      uiRoot.classList.remove('hidden');
      cleanIcon.textContent = '👁️';
      cleanText.textContent = '纯净观赏';
    }
  }

  cleanTogglePill.addEventListener('click', toggleUI);

  // Keyboard shortcut 'H' or 'Escape'
  window.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H' || e.key === 'Escape') {
      toggleUI();
    }
  });

  // Weather Buttons Handler
  const weatherBtns = document.querySelectorAll('[data-weather]');
  weatherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      weatherBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const wKey = btn.getAttribute('data-weather');
      weatherSystem.setWeather(WEATHER_TYPES[wKey]);
      audioManager.setWeather(wKey);
    });
  });

  // Camera Presets
  const cameraBookmarks = {
    overview: {
      pos: new THREE.Vector3(42, 38, 44),
      target: new THREE.Vector3(0, 6.5, 0)
    },
    castle: {
      pos: new THREE.Vector3(18, 20, 8),
      target: new THREE.Vector3(0, 10.5, -13.5)
    },
    village: {
      pos: new THREE.Vector3(14, 13, 16),
      target: new THREE.Vector3(0, 4.2, 1.2)
    },
    farmland: {
      pos: new THREE.Vector3(-14, 9, 25),
      target: new THREE.Vector3(-5.5, 2.0, 14.0)
    }
  };

  const camBtns = document.querySelectorAll('[data-cam]');
  camBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      camBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const camKey = btn.getAttribute('data-cam');
      if (camKey === 'knight') {
        followTarget = knightStandee.root;
      } else if (camKey === 'farmer') {
        followTarget = farmerStandee.root;
      } else {
        followTarget = null;
        const bm = cameraBookmarks[camKey];
        if (bm) {
          targetCamPos = bm.pos.clone();
          targetCamLookAt = bm.target.clone();
        }
      }
    });
  });

  // Outline Toggle Button
  const btnOutline = document.getElementById('btn-outline');
  btnOutline.addEventListener('click', () => {
    if (outlineMode === 'crisp') {
      outlineMode = 'soft';
      btnOutline.classList.add('active');
      btnOutline.innerHTML = '<span class="btn-icon">✏️</span> 柔和轮廓';
      postprocessing.setOutlineMode('soft');
    } else if (outlineMode === 'soft') {
      outlineMode = 'off';
      btnOutline.classList.remove('active');
      btnOutline.innerHTML = '<span class="btn-icon">⚪</span> 关闭描边';
      postprocessing.setOutlineMode('off');
    } else {
      outlineMode = 'crisp';
      btnOutline.classList.add('active');
      btnOutline.innerHTML = '<span class="btn-icon">✒️</span> 轮廓描边';
      postprocessing.setOutlineMode('crisp');
    }
  });

  // Turntable Auto-Rotate Toggle
  const btnTurntable = document.getElementById('btn-turntable');
  let isTurntable = false;
  btnTurntable.addEventListener('click', () => {
    isTurntable = !isTurntable;
    controls.autoRotate = isTurntable;
    controls.autoRotateSpeed = 1.0;
    btnTurntable.classList.toggle('active', isTurntable);
  });

  // Ambient Sound Toggle
  const btnSound = document.getElementById('btn-sound');
  btnSound.addEventListener('click', () => {
    const isPlaying = audioManager.toggleMute();
    btnSound.classList.toggle('active', isPlaying);
    btnSound.innerHTML = isPlaying
      ? '<span class="btn-icon">🔊</span> 音乐音效'
      : '<span class="btn-icon">🔇</span> 音效';
  });

  // Return smooth camera transition update function
  return {
    updateCameraTransition: (delta) => {
      // Follow target mode (Knight or Farmer)
      if (followTarget) {
        const targetPos = followTarget.position;
        const isFarmer = followTarget.name === 'PixelFarmer';
        const lookTarget = new THREE.Vector3(targetPos.x, targetPos.y + 0.8, targetPos.z);
        controls.target.lerp(lookTarget, 0.12);

        const offset = new THREE.Vector3(
          isFarmer ? 1.8 : 2.0,
          isFarmer ? 1.6 : 1.8,
          isFarmer ? 3.4 : 3.8
        );
        camera.position.lerp(lookTarget.clone().add(offset), 0.1);
        return;
      }

      // Bookmark lerp
      if (targetCamPos && targetCamLookAt) {
        camera.position.lerp(targetCamPos, 0.05);
        controls.target.lerp(targetCamLookAt, 0.05);

        if (camera.position.distanceTo(targetCamPos) < 0.1 && controls.target.distanceTo(targetCamLookAt) < 0.1) {
          targetCamPos = null;
          targetCamLookAt = null;
        }
      }
    }
  };
}
