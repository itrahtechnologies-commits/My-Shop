import { registerSW } from 'virtual:pwa-register';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let isInstalled = false;
let isIOS = false;

function getLang(): 'en' | 'sw' {
  return (localStorage.getItem('myShop_lang') === 'sw' ? 'sw' : 'en');
}

function getStrings() {
  const lang = getLang();
  if (lang === 'sw') {
    return {
      installApp: 'Sakinisha',
      installTitle: 'Weka MyShop kwenye Simu',
      iosTitle: 'Weka kwenye iPhone / iPad',
      iosStep1: '1. Bonyeza kitufe cha <strong>Share</strong> chini au juu kwenye Safari.',
      iosStep2: '2. Shuka chini kisha chagua <strong>Add to Home Screen</strong>.',
      close: 'Funga',
      offlineMsg: 'Huna intaneti — Data iliyohifadhiwa inatumika.',
    };
  }
  return {
    installApp: 'Install',
    installTitle: 'Install MyShop App',
    iosTitle: 'Install on iPhone / iPad',
    iosStep1: '1. Tap the <strong>Share</strong> button in your Safari toolbar.',
    iosStep2: '2. Scroll down and tap <strong>Add to Home Screen</strong>.',
    close: 'Close',
    offlineMsg: 'Offline Mode — Cached data is being used.',
  };
}

function renderOfflineIndicator() {
  const existing = document.getElementById('pwa-offline-banner');
  if (navigator.onLine) {
    if (existing) existing.remove();
    return;
  }

  const s = getStrings();
  if (existing) {
    const textEl = existing.querySelector('[data-pwa-offline-text]');
    if (textEl) textEl.textContent = s.offlineMsg;
    return;
  }

  const banner = document.createElement('div');
  banner.id = 'pwa-offline-banner';
  banner.style.cssText =
    'position:fixed;bottom:16px;left:16px;z-index:9999;display:flex;align-items:center;gap:8px;' +
    'background:#F59E0B;color:#FFFFFF;padding:8px 14px;border-radius:10px;font-size:12px;' +
    'font-weight:600;font-family:Inter,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,0.18);';
  banner.innerHTML =
    '<span style="width:8px;height:8px;border-radius:50%;background:#FFFFFF;display:inline-block;"></span>' +
    `<span data-pwa-offline-text>${s.offlineMsg}</span>`;
  document.body.appendChild(banner);
}

function showIOSInstallModal() {
  const existing = document.getElementById('pwa-ios-modal');
  if (existing) existing.remove();

  const s = getStrings();
  const modal = document.createElement('div');
  modal.id = 'pwa-ios-modal';
  modal.style.cssText =
    'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;' +
    'background:rgba(0,0,0,0.55);padding:16px;backdrop-filter:blur(4px);font-family:Inter,sans-serif;';
  modal.innerHTML = `
    <div style="width:100%;max-width:360px;background:#FFFFFF;border-radius:20px;padding:24px;box-shadow:0 20px 45px rgba(0,0,0,0.22);color:#1A1A1A;">
      <h3 style="margin:0;font-size:18px;font-weight:700;color:#6236FF;">${s.iosTitle}</h3>
      <p style="margin:12px 0 0;font-size:14px;line-height:1.6;color:#4B5563;">
        ${s.iosStep1}<br/>
        ${s.iosStep2}
      </p>
      <button type="button" id="pwa-ios-close" style="margin-top:18px;width:100%;padding:12px;border:none;border-radius:12px;background:#F3F4F6;color:#1F2937;font-weight:700;font-size:14px;cursor:pointer;">
        ${s.close}
      </button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
  const closeBtn = document.getElementById('pwa-ios-close');
  if (closeBtn) closeBtn.addEventListener('click', () => modal.remove());
}

function renderInstallButton() {
  const slot = document.getElementById('pwa-install-slot');
  if (!slot) return;

  if (isInstalled || (!deferredPrompt && !isIOS)) {
    slot.innerHTML = '';
    return;
  }

  const isLight = slot.getAttribute('data-theme') === 'light';
  const s = getStrings();
  slot.innerHTML = '';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'pwa-install-btn';
  btn.title = s.installTitle;
  btn.style.cssText = isLight
    ? 'display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 10px;border-radius:8px;' +
      'border:1px solid #C7D2FE;background:#EEF2FF;color:#4F46E5;' +
      'font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:0.2s;'
    : 'display:inline-flex;align-items:center;gap:6px;height:35px;padding:0 10px;border-radius:10px;' +
      'border:1px solid rgba(255,255,255,0.28);background:rgba(255,255,255,0.18);color:#FFFFFF;' +
      'font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:0.2s;';
  btn.innerHTML =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>' +
    '<polyline points="7 10 12 15 17 10"/>' +
    '<line x1="12" y1="15" x2="12" y2="3"/></svg>' +
    `<span>${s.installApp}</span>`;

  btn.addEventListener('click', async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        isInstalled = true;
        deferredPrompt = null;
        renderInstallButton();
      }
    } else if (isIOS) {
      showIOSInstallModal();
    }
  });

  slot.appendChild(btn);
}

export function initPWA() {
  if (typeof window === 'undefined') return;

  // Register Service Worker via vite-plugin-pwa
  registerSW({
    immediate: true,
    onOfflineReady() {
      console.info('[PWA] App ready for offline use.');
    },
  });

  isInstalled =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;

  const ua = window.navigator.userAgent.toLowerCase();
  isIOS = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;

  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    renderInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    isInstalled = true;
    deferredPrompt = null;
    renderInstallButton();
  });

  window.addEventListener('online', renderOfflineIndicator);
  window.addEventListener('offline', renderOfflineIndicator);
  window.addEventListener('languageChanged', () => {
    renderInstallButton();
    renderOfflineIndicator();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderInstallButton();
      renderOfflineIndicator();
    });
  } else {
    renderInstallButton();
    renderOfflineIndicator();
  }
}

initPWA();
