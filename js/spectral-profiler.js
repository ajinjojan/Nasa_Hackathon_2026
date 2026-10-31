/**
 * NASA Hackathon - Terrestrial Analog Finder
 * Multi-Spectral Reflectance Profiler (0.45 - 2.35 um)
 */

class SpectralProfiler {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.targetSpectra = null;
    this.analogSpectra = null;
    this.endmember = null;
    this.spectralLibrary = [];

    this.bands = [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35];
    this.initEvents();
  }

  setSpectralLibrary(lib) {
    this.spectralLibrary = lib || [];
  }

  initEvents() {
    if (!this.canvas) return;
    const resize = () => {
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width * (window.devicePixelRatio || 1);
      this.canvas.height = rect.height * (window.devicePixelRatio || 1);
      this.render();
    };
    window.addEventListener('resize', resize);
    setTimeout(resize, 60);

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (window.devicePixelRatio || 1);
      this.render(x);
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.render(null);
    });
  }

  updateSpectra(targetSite, analogSite) {
    this.targetSpectra = targetSite.spectral_bands?.reflectance || [];
    this.analogSpectra = analogSite.spectral_bands?.reflectance || [];

    // Automatically select the most relevant laboratory endmember
    if (this.spectralLibrary.length > 0) {
      if (targetSite.id.includes('lakebed')) {
        this.endmember = this.spectralLibrary.find(m => m.name.includes('Nontronite')) || this.spectralLibrary[2];
      } else if (targetSite.id.includes('south_pole')) {
        this.endmember = this.spectralLibrary.find(m => m.name.includes('Ice')) || this.spectralLibrary[4];
      } else {
        this.endmember = this.spectralLibrary.find(m => m.name.includes('Basalt')) || this.spectralLibrary[1];
      }
    }

    this.render();
  }

  render(hoverX) {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Dark grid background
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, w, h);

    const padLeft = 55;
    const padRight = 30;
    const padTop = 30;
    const padBottom = 40;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    if (!this.targetSpectra || this.targetSpectra.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText('No spectral data loaded', w / 2 - 80, h / 2);
      return;
    }

    const minWavelength = 0.45;
    const maxWavelength = 2.35;
    const maxReflectance = 0.50; // Reflectance scale 0.0 to 0.50

    // Draw Grid Lines & Axes
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748b';
    ctx.font = '10px "JetBrains Mono", monospace';

    // Horizontal grid (Reflectance 0.0 to 0.5)
    for (let i = 0; i <= 5; i++) {
      const yVal = padTop + (plotH / 5) * i;
      const refVal = (maxReflectance * (1 - i / 5)).toFixed(2);
      ctx.beginPath();
      ctx.moveTo(padLeft, yVal);
      ctx.lineTo(w - padRight, yVal);
      ctx.stroke();
      ctx.fillText(refVal, 12, yVal + 3);
    }

    // Vertical grid & band labels
    this.bands.forEach((band) => {
      const xVal = padLeft + ((band - minWavelength) / (maxWavelength - minWavelength)) * plotW;
      ctx.beginPath();
      ctx.moveTo(xVal, padTop);
      ctx.lineTo(xVal, h - padBottom);
      ctx.stroke();
      ctx.fillText(`${band.toFixed(2)}`, xVal - 14, h - padBottom + 16);
    });

    // Helper to map (wavelength, reflectance) to canvas (x, y)
    const toCoords = (wLen, refl) => {
      const x = padLeft + ((wLen - minWavelength) / (maxWavelength - minWavelength)) * plotW;
      const clampedRefl = Math.max(0, Math.min(maxReflectance, refl));
      const y = padTop + (1 - (clampedRefl / maxReflectance)) * plotH;
      return { x, y };
    };

    // 1. Draw Lab Endmember (Purple dotted line)
    if (this.endmember && this.endmember.reflectance) {
      ctx.beginPath();
      const firstEM = toCoords(this.bands[0], this.endmember.reflectance[0]);
      ctx.moveTo(firstEM.x, firstEM.y);
      for (let i = 1; i < this.bands.length; i++) {
        const pt = toCoords(this.bands[i], this.endmember.reflectance[i]);
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 2. Draw Target Site Curve (Blue/Cyan solid line with circle dots)
    ctx.beginPath();
    const firstTgt = toCoords(this.bands[0], this.targetSpectra[0]);
    ctx.moveTo(firstTgt.x, firstTgt.y);
    for (let i = 1; i < this.bands.length; i++) {
      const pt = toCoords(this.bands[i], this.targetSpectra[i]);
      ctx.lineTo(pt.x, pt.y);
    }
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Dots on target bands
    this.bands.forEach((b, i) => {
      const pt = toCoords(b, this.targetSpectra[i]);
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Draw Earth Analog Curve (Green solid line with diamond points)
    if (this.analogSpectra && this.analogSpectra.length > 0) {
      ctx.beginPath();
      const firstAna = toCoords(this.bands[0], this.analogSpectra[0]);
      ctx.moveTo(firstAna.x, firstAna.y);
      for (let i = 1; i < this.bands.length; i++) {
        const pt = toCoords(this.bands[i], this.analogSpectra[i]);
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      this.bands.forEach((b, i) => {
        const pt = toCoords(b, this.analogSpectra[i]);
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 4. Absorption Band Indicators (e.g., 1.05um, 1.9um, 2.35um)
    const drawFeatureCallout = (wLen, label) => {
      const x = padLeft + ((wLen - minWavelength) / (maxWavelength - minWavelength)) * plotW;
      ctx.fillStyle = 'rgba(245, 158, 11, 0.8)';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText(label, x - 15, padTop + 14);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.beginPath();
      ctx.moveTo(x, padTop + 18);
      ctx.lineTo(x, padTop + 36);
      ctx.stroke();
    };

    drawFeatureCallout(1.05, 'Fe2+');
    drawFeatureCallout(1.90, 'H2O');
    drawFeatureCallout(2.35, 'Fe-OH');

    // Hover readout
    if (hoverX !== null && hoverX >= padLeft && hoverX <= padLeft + plotW) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(hoverX, padTop);
      ctx.lineTo(hoverX, h - padBottom);
      ctx.stroke();

      const hoverWLen = (minWavelength + ((hoverX - padLeft) / plotW) * (maxWavelength - minWavelength)).toFixed(2);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(hoverX - 40, padTop + 40, 80, 20);
      ctx.strokeStyle = '#00f0ff';
      ctx.strokeRect(hoverX - 40, padTop + 40, 80, 20);
      ctx.fillStyle = '#fff';
      ctx.fillText(`${hoverWLen} \u03BCm`, hoverX - 25, padTop + 54);
    }
  }
}

if (typeof window !== 'undefined') {
  window.SpectralProfiler = SpectralProfiler;
}

