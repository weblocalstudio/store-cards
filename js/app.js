/**
 * Weblocal Studio – Store Cards Generator
 * 100% client-side · https://store-cards.weblocalstudio.es
 */

// ==================== STATE ====================
const state = {
  device: 'iphone',
  template: 'gradient-blue',
  title: 'La app que estabas esperando',
  subtitle: 'Simple. Rápida. Poderosa.',
  titleFont: 'Poppins',
  titleSize: 42,
  titleColor: '#ffffff',
  subtitleColor: '#94a3b8',
  scale: 90,
  posY: 55,
  image: null
};

// ==================== TEMPLATES ====================
const templates = [
  {
    id: 'gradient-blue',
    name: 'Ocean',
    bg: 'linear-gradient(160deg, #0c4a6e 0%, #0369a1 40%, #0ea5e9 100%)',
    shapes: [
      { type: 'circle', size: 280, x: -80, y: -60, color: 'rgba(14,165,233,0.25)' },
      { type: 'circle', size: 180, x: 220, y: 500, color: 'rgba(56,189,248,0.2)' }
    ]
  },
  {
    id: 'gradient-purple',
    name: 'Violet',
    bg: 'linear-gradient(160deg, #3b0764 0%, #7e22ce 45%, #c026d3 100%)',
    shapes: [
      { type: 'circle', size: 300, x: -100, y: 100, color: 'rgba(192,38,211,0.25)' },
      { type: 'circle', size: 160, x: 240, y: -40, color: 'rgba(168,85,247,0.3)' }
    ]
  },
  {
    id: 'gradient-dark',
    name: 'Midnight',
    bg: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    shapes: [
      { type: 'circle', size: 220, x: 180, y: -50, color: 'rgba(56,189,248,0.15)' },
      { type: 'circle', size: 160, x: -60, y: 520, color: 'rgba(14,165,233,0.12)' }
    ]
  },
  {
    id: 'solid-black',
    name: 'Noir',
    bg: '#09090b',
    shapes: [
      { type: 'circle', size: 200, x: -40, y: -30, color: 'rgba(255,255,255,0.04)' },
      { type: 'circle', size: 140, x: 250, y: 580, color: 'rgba(255,255,255,0.03)' }
    ]
  },
  {
    id: 'gradient-sunset',
    name: 'Sunset',
    bg: 'linear-gradient(160deg, #7c2d12 0%, #ea580c 40%, #fbbf24 100%)',
    shapes: [
      { type: 'circle', size: 260, x: 200, y: -80, color: 'rgba(251,191,36,0.3)' },
      { type: 'circle', size: 180, x: -70, y: 480, color: 'rgba(249,115,22,0.25)' }
    ]
  },
  {
    id: 'gradient-mint',
    name: 'Mint',
    bg: 'linear-gradient(160deg, #064e3b 0%, #059669 45%, #34d399 100%)',
    shapes: [
      { type: 'circle', size: 240, x: -60, y: 80, color: 'rgba(52,211,153,0.25)' },
      { type: 'circle', size: 150, x: 230, y: 520, color: 'rgba(16,185,129,0.2)' }
    ]
  }
];

// ==================== DOM HELPERS ====================
const $ = id => document.getElementById(id);

// ==================== TEMPLATES UI ====================
function renderTemplates() {
  const container = $('templates');
  if (!container) return;

  container.innerHTML = templates.map(t => `
    <button data-template="${t.id}"
            class="template-card relative h-16 rounded-lg overflow-hidden border-2 ${t.id === state.template ? 'border-sky-500' : 'border-transparent'} hover:border-sky-500/50"
            style="background: ${t.bg};"
            title="${t.name}">
      <span class="absolute bottom-1 left-1 right-1 text-[10px] font-medium text-white/90 truncate drop-shadow">${t.name}</span>
    </button>
  `).join('');

  container.querySelectorAll('[data-template]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.template = btn.dataset.template;
      renderTemplates();
      applyTemplate();
    });
  });
}

function applyTemplate() {
  const t = templates.find(x => x.id === state.template) || templates[0];
  const bgLayer = $('bgLayer');
  const shapesLayer = $('shapesLayer');
  if (!bgLayer || !shapesLayer) return;

  bgLayer.style.background = t.bg;

  shapesLayer.innerHTML = t.shapes.map(s => `
    <div style="
      position: absolute;
      width: ${s.size}px;
      height: ${s.size}px;
      left: ${s.x}px;
      top: ${s.y}px;
      background: ${s.color};
      border-radius: 50%;
      filter: blur(2px);
    "></div>
  `).join('');
}

// ==================== PREVIEW UPDATE ====================
function updatePreview() {
  const previewTitle = $('previewTitle');
  const previewSubtitle = $('previewSubtitle');
  const deviceFrame = $('deviceFrame');
  const deviceWrapper = $('deviceWrapper');

  if (!previewTitle || !previewSubtitle || !deviceFrame || !deviceWrapper) return;

  // Text
  previewTitle.textContent = state.title;
  previewTitle.style.fontFamily = state.titleFont;
  previewTitle.style.fontSize = (state.titleSize * 0.65) + 'px';
  previewTitle.style.color = state.titleColor;

  previewSubtitle.textContent = state.subtitle;
  previewSubtitle.style.color = state.subtitleColor;

  // Device type
  deviceFrame.classList.remove('iphone', 'android');
  deviceFrame.classList.add(state.device);

  const notch = deviceFrame.querySelector('.device-notch');
  const screen = deviceFrame.querySelector('.device-screen');

  if (state.device === 'android') {
    if (notch) notch.style.display = 'none';
    deviceFrame.style.borderRadius = '28px';
    if (screen) screen.style.borderRadius = '20px';
  } else {
    if (notch) notch.style.display = 'block';
    deviceFrame.style.borderRadius = '42px';
    if (screen) screen.style.borderRadius = '32px';
  }

  // Scale & Position
  const scale = state.scale / 100;
  deviceWrapper.style.top = state.posY + '%';
  deviceWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;

  const scaleValue = $('scaleValue');
  const posYValue = $('posYValue');
  if (scaleValue) scaleValue.textContent = state.scale + '%';
  if (posYValue) posYValue.textContent = state.posY + '%';
}

// ==================== IMAGE HANDLING ====================
function handleImage(file) {
  if (!file || !file.type.startsWith('image/')) return;

  const reader = new FileReader();
  reader.onload = e => {
    state.image = e.target.result;
    const screenImage = $('screenImage');
    const placeholder = $('placeholder');
    const thumb = $('thumb');
    const fileName = $('fileName');
    const imagePreview = $('imagePreview');

    if (screenImage) {
      screenImage.src = state.image;
      screenImage.classList.remove('hidden');
    }
    if (placeholder) placeholder.classList.add('hidden');
    if (thumb) thumb.src = state.image;
    if (fileName) fileName.textContent = file.name;
    if (imagePreview) imagePreview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

// ==================== EXPORT ====================
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function captureHighRes(format = 'png') {
  const exportCanvas = $('exportCanvas');
  if (!exportCanvas || typeof html2canvas === 'undefined') {
    alert('Error: no se pudo cargar el motor de captura.');
    return null;
  }

  const targetW = 1290;
  const targetH = 2796;
  const scaleFactor = targetW / 360;

  const clone = exportCanvas.cloneNode(true);
  clone.id = 'exportClone';
  clone.style.width = targetW + 'px';
  clone.style.height = targetH + 'px';
  clone.style.transform = 'none';
  clone.style.position = 'fixed';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  clone.style.zIndex = '-1';

  const titleEl = clone.querySelector('#previewTitle');
  const subtitleEl = clone.querySelector('#previewSubtitle');
  const deviceWrap = clone.querySelector('#deviceWrapper');
  const deviceFr = clone.querySelector('#deviceFrame');

  if (titleEl) {
    titleEl.style.fontSize = state.titleSize + 'px';
    titleEl.style.paddingTop = '80px';
  }
  if (subtitleEl) {
    subtitleEl.style.fontSize = Math.round(state.titleSize * 0.4) + 'px';
  }

  const deviceW = 240 * scaleFactor * 0.85;
  const deviceH = 490 * scaleFactor * 0.85;

  if (deviceFr) {
    deviceFr.style.width = deviceW + 'px';
    deviceFr.style.height = deviceH + 'px';
    deviceFr.style.padding = (10 * scaleFactor * 0.7) + 'px';
  }
  if (deviceWrap) {
    deviceWrap.style.top = state.posY + '%';
    deviceWrap.style.transform = 'translate(-50%, -50%) scale(1)';
  }

  const shapes = clone.querySelector('#shapesLayer');
  if (shapes) {
    shapes.querySelectorAll('div').forEach(el => {
      const w = parseFloat(el.style.width);
      const h = parseFloat(el.style.height);
      const l = parseFloat(el.style.left);
      const t = parseFloat(el.style.top);
      el.style.width = (w * scaleFactor) + 'px';
      el.style.height = (h * scaleFactor) + 'px';
      el.style.left = (l * scaleFactor) + 'px';
      el.style.top = (t * scaleFactor) + 'px';
    });
  }

  document.body.appendChild(clone);

  try {
    const canvas = await html2canvas(clone, {
      width: targetW,
      height: targetH,
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false
    });

    document.body.removeChild(clone);

    return new Promise(resolve => {
      canvas.toBlob(blob => resolve(blob), format === 'jpg' ? 'image/jpeg' : 'image/png', 0.95);
    });
  } catch (err) {
    if (document.body.contains(clone)) document.body.removeChild(clone);
    console.error(err);
    alert('Error al generar la imagen. Intenta de nuevo.');
    return null;
  }
}

// ==================== EVENT BINDINGS ====================
function bindEvents() {
  // Dropzone
  const dropzone = $('dropzone');
  const imageInput = $('imageInput');

  if (dropzone && imageInput) {
    ['dragenter', 'dragover'].forEach(evt => {
      dropzone.addEventListener(evt, e => {
        e.preventDefault();
        dropzone.classList.add('border-sky-500', 'bg-sky-500/10');
      });
    });
    ['dragleave', 'drop'].forEach(evt => {
      dropzone.addEventListener(evt, e => {
        e.preventDefault();
        dropzone.classList.remove('border-sky-500', 'bg-sky-500/10');
      });
    });
    dropzone.addEventListener('drop', e => {
      const file = e.dataTransfer.files[0];
      handleImage(file);
    });
    imageInput.addEventListener('change', e => {
      handleImage(e.target.files[0]);
    });
  }

  const removeBtn = $('removeImage');
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      state.image = null;
      const screenImage = $('screenImage');
      const placeholder = $('placeholder');
      const imagePreview = $('imagePreview');
      if (screenImage) {
        screenImage.src = '';
        screenImage.classList.add('hidden');
      }
      if (placeholder) placeholder.classList.remove('hidden');
      if (imagePreview) imagePreview.classList.add('hidden');
      if (imageInput) imageInput.value = '';
    });
  }

  // Device buttons
  document.querySelectorAll('.device-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.device = btn.dataset.device;
      document.querySelectorAll('.device-btn').forEach(b => {
        b.classList.remove('active', 'bg-sky-500/20', 'border-sky-500/40', 'text-sky-300');
        b.classList.add('bg-slate-800', 'border-slate-700', 'text-slate-300');
      });
      btn.classList.add('active', 'bg-sky-500/20', 'border-sky-500/40', 'text-sky-300');
      btn.classList.remove('bg-slate-800', 'border-slate-700', 'text-slate-300');
      updatePreview();
    });
  });

  // Text & controls
  const bindInput = (id, key, parser = v => v) => {
    const el = $(id);
    if (el) {
      el.addEventListener('input', e => {
        state[key] = parser(e.target.value);
        updatePreview();
      });
      el.addEventListener('change', e => {
        state[key] = parser(e.target.value);
        updatePreview();
      });
    }
  };

  bindInput('titleText', 'title');
  bindInput('subtitleText', 'subtitle');
  bindInput('titleFont', 'titleFont');
  bindInput('titleSize', 'titleSize', v => +v);
  bindInput('titleColor', 'titleColor');
  bindInput('subtitleColor', 'subtitleColor');
  bindInput('mockupScale', 'scale', v => +v);
  bindInput('mockupPosY', 'posY', v => +v);

  // Export buttons
  const btnPng = $('btnExportPng');
  if (btnPng) {
    btnPng.addEventListener('click', async () => {
      btnPng.disabled = true;
      btnPng.innerHTML = '<span class="animate-pulse">Generando...</span>';

      const blob = await captureHighRes('png');
      if (blob && typeof saveAs === 'function') {
        saveAs(blob, `weblocal-store-card-${Date.now()}.png`);
      }

      btnPng.disabled = false;
      btnPng.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg> Descargar PNG (Alta resolución)`;
    });
  }

  const btnJpg = $('btnExportJpg');
  if (btnJpg) {
    btnJpg.addEventListener('click', async () => {
      btnJpg.disabled = true;
      btnJpg.textContent = 'Generando...';

      const blob = await captureHighRes('jpg');
      if (blob && typeof saveAs === 'function') {
        saveAs(blob, `weblocal-store-card-${Date.now()}.jpg`);
      }

      btnJpg.disabled = false;
      btnJpg.textContent = 'Descargar JPG';
    });
  }

  const btnZip = $('btnExportZip');
  if (btnZip) {
    btnZip.addEventListener('click', async () => {
      btnZip.disabled = true;
      btnZip.innerHTML = '<span class="animate-pulse">Creando paquete...</span>';

      const blob = await captureHighRes('png');
      if (!blob || typeof JSZip === 'undefined') {
        btnZip.disabled = false;
        btnZip.innerHTML = 'Paquete ZIP (PNG + Assets)';
        return;
      }

      const zip = new JSZip();
      zip.file('store-card-1290x2796.png', blob);

      const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#0ea5e9"/>
  <path d="M28 62 L42 38 L58 55 L72 30" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>`;
      zip.file('favicon.svg', faviconSvg);

      const readme = `Weblocal Studio – Store Cards Package
=====================================

Archivos incluidos:
- store-card-1290x2796.png  → Imagen promocional principal
- favicon.svg               → Favicon optimizado
- app-icon-512.png          → Icono 512×512

Recomendaciones de tamaño:
• App Store (iPhone): 1290 × 2796 px
• Google Play: 1080 × 1920 px o 1440 × 2560 px
• Feature Graphic (Google): 1024 × 500 px

Generado con Weblocal Studio
https://store-cards.weblocalstudio.es
100% local · Sin servidores · Privacidad total
`;
      zip.file('README.txt', readme);

      // Generate 512 icon
      const iconCanvas = document.createElement('canvas');
      iconCanvas.width = 512;
      iconCanvas.height = 512;
      const ctx = iconCanvas.getContext('2d');
      ctx.fillStyle = '#0ea5e9';
      roundRect(ctx, 0, 0, 512, 512, 110);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 36;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(140, 320);
      ctx.lineTo(210, 200);
      ctx.lineTo(300, 280);
      ctx.lineTo(380, 150);
      ctx.stroke();

      iconCanvas.toBlob(async iconBlob => {
        if (iconBlob) zip.file('app-icon-512.png', iconBlob);

        const content = await zip.generateAsync({ type: 'blob' });
        if (typeof saveAs === 'function') {
          saveAs(content, `weblocal-store-package-${Date.now()}.zip`);
        }

        btnZip.disabled = false;
        btnZip.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg> Paquete ZIP (PNG + Assets)`;
      }, 'image/png');
    });
  }
}

// ==================== RESPONSIVE PREVIEW ====================
function fitPreview() {
  const exportCanvas = $('exportCanvas');
  if (!exportCanvas) return;
  const container = exportCanvas.parentElement;
  if (!container) return;

  const maxW = container.clientWidth - 40;
  const maxH = container.clientHeight - 40;
  const scale = Math.min(maxW / 360, maxH / 780, 1.15);
  exportCanvas.style.transform = `scale(${scale})`;
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  renderTemplates();
  applyTemplate();
  updatePreview();
  bindEvents();
  fitPreview();
  window.addEventListener('resize', fitPreview);
});
