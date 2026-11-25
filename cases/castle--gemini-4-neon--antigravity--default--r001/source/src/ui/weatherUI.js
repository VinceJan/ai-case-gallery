import { WEATHER_PRESETS, TIME_PRESETS } from '../scene/weather.js';

const WEATHER_ICONS = {
  sunny: '☀',
  rain: '🌧',
  snow: '❄',
  fog: '☁',
};

const TIME_ICONS = {
  day: '☼',
  dusk: '◐',
  night: '☾',
};

export function createWeatherUI(container, weatherSystem) {
  const bar = document.createElement('div');
  bar.className = 'diorama-ui';
  bar.setAttribute('role', 'toolbar');
  bar.setAttribute('aria-label', '天气与光影控制');

  const weatherGroup = document.createElement('div');
  weatherGroup.className = 'ui-group';

  const weatherButtons = {};
  for (const [key, preset] of Object.entries(WEATHER_PRESETS)) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ui-btn';
    btn.dataset.weather = key;
    btn.innerHTML = `<span class="icon">${WEATHER_ICONS[key] || ''}</span><span>${preset.label}</span>`;
    btn.addEventListener('click', () => {
      weatherSystem.setWeather(key);
      syncActive();
    });
    weatherGroup.appendChild(btn);
    weatherButtons[key] = btn;
  }

  const divider = document.createElement('div');
  divider.className = 'ui-divider';

  const timeGroup = document.createElement('div');
  timeGroup.className = 'ui-group';

  const timeButtons = {};
  for (const [key, preset] of Object.entries(TIME_PRESETS)) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ui-btn';
    btn.dataset.time = key;
    btn.innerHTML = `<span class="icon">${TIME_ICONS[key] || ''}</span><span>${preset.label}</span>`;
    btn.addEventListener('click', () => {
      weatherSystem.setTimeOfDay(key);
      syncActive();
    });
    timeGroup.appendChild(btn);
    timeButtons[key] = btn;
  }

  bar.append(weatherGroup, divider, timeGroup);
  container.appendChild(bar);

  // Corner minimal hide/show button so users can also enjoy a pure UI-free view
  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'ui-toggle-corner';
  toggleBtn.title = '隐藏 / 显示天气界面 (H)';
  toggleBtn.setAttribute('aria-label', '切换界面显示');

  let uiVisible = true;

  function renderEyeIcon() {
    toggleBtn.innerHTML = uiVisible
      ? `<svg viewBox="0 0 24 24"><path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`
      : `<svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.2 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c6.2 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`;
  }

  function setVisible(v) {
    uiVisible = v;
    bar.classList.toggle('is-hidden', !uiVisible);
    renderEyeIcon();
  }

  toggleBtn.addEventListener('click', () => setVisible(!uiVisible));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') {
      setVisible(!uiVisible);
    }
  });

  container.appendChild(toggleBtn);
  renderEyeIcon();

  function syncActive() {
    const { weatherKey, timeKey } = weatherSystem.getState();
    for (const [k, btn] of Object.entries(weatherButtons)) {
      btn.classList.toggle('is-active', k === weatherKey);
    }
    for (const [k, btn] of Object.entries(timeButtons)) {
      btn.classList.toggle('is-active', k === timeKey);
    }
    const isDark = Boolean(TIME_PRESETS[timeKey]?.darkUI);
    bar.classList.toggle('is-dark', isDark);
    toggleBtn.classList.toggle('is-dark', isDark);
  }

  syncActive();
  return { syncActive, setVisible };
}
