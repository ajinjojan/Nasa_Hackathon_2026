/**
 * NASA Hackathon - Terrestrial Analog Finder
 * Elevation Cross-Section Profiler (Topographic Transect Comparison)
 */

class ElevationProfiler {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.targetData = null;
    this.analogData = null;
    this.targetColor = '#60a5fa'; // Blue/Cyan for target
    this.analogColor = '#10b981'; // Green for Earth analog

    this.initEvents();
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

  updateProfiles(targetSite, analogSite) {
    this.targetData = targetSite.elevation_profile || [];
    this.analogData = analogSite.elevation_profile || [];
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

    const padLeft = 60;
    const padRight = 30;
    const padTop = 30;
    const padBottom = 40;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    if (!this.targetData || this.targetData.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText('No elevation profile loaded', w / 2 - 80, h / 2);
      return;
    }

    // Determine normalized relative relief delta (z - min(z)) to compare profiles on equivalent scale
    const targetElevs = this.targetData.map(d => d.elev_m);
    const minTarget = Math.min(...targetElevs);
    const maxTarget = Math.max(...targetElevs);
    const reliefTarget = maxTarget - minTarget || 1;

    let analogElevs = [];
    let minAnalog = 0, maxAnalog = 1, reliefAnalog = 1;
    if (this.analogData && this.analogData.length > 0) {
      analogElevs = this.analogData.map(d => d.elev_m);
      minAnalog = Math.min(...analogElevs);
      maxAnalog = Math.max(...analogElevs);
      reliefAnalog = maxAnalog - minAnalog || 1;
    }

    const maxRelief = Math.max(reliefTarget, reliefAnalog);
    const maxDist = Math.max(
      this.targetData[this.targetData.length - 1].dist_m,
      this.analogData && this.analogData.length > 0 ? this.analogData[this.analogData.length - 1].dist_m : 5000
    );

    // Draw Grid Lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748b';
    ctx.font = '10px "JetBrains Mono", monospace';

    // Horizontal grid lines (Relative Relief: 0%, 25%, 50%, 75%, 100%)
    for (let i = 0; i <= 4; i++) {
      const yVal = padTop + (plotH / 4) * i;
      const reliefVal = Math.round(maxRelief * (1 - i / 4));
      ctx.beginPath();
      ctx.moveTo(padLeft, yVal);
      ctx.lineTo(w - padRight, yVal);
      ctx.stroke();
      ctx.fillText(`+${reliefVal}m`, 10, yVal + 3);
    }

    // Vertical grid lines (Distance along transect: km)
    for (let i = 0; i <= 5; i++) {
      const xVal = padLeft + (plotW / 5) * i;
      const distKm = ((maxDist / 5) * i / 1000).toFixed(1);
      ctx.beginPath();
      ctx.moveTo(xVal, padTop);
      ctx.lineTo(xVal, h - padBottom);
      ctx.stroke();
      ctx.fillText(`${distKm}km`, xVal - 12, h - padBottom + 16);
    }

    // Coordinate conversion helper
    const getCoords = (dist, elev, minElev) => {
      const x = padLeft + (dist / maxDist) * plotW;
      const relElev = elev - minElev;
      const y = padTop + (1 - (relElev / maxRelief)) * plotH;
      return { x, y };
    };

    // Draw Target Site Elevation Profile (Blue/Cyan Area)
    if (this.targetData.length > 1) {
      ctx.beginPath();
      const first = getCoords(this.targetData[0].dist_m, this.targetData[0].elev_m, minTarget);
      ctx.moveTo(first.x, first.y);

      for (let i = 1; i < this.targetData.length; i++) {
        const pt = getCoords(this.targetData[i].dist_m, this.targetData[i].elev_m, minTarget);
        ctx.lineTo(pt.x, pt.y);
      }

      ctx.strokeStyle = this.targetColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Translucent gradient fill under curve
      ctx.lineTo(padLeft + plotW, padTop + plotH);
      ctx.lineTo(padLeft, padTop + plotH);
      ctx.closePath();
      const targetGrad = ctx.createLinearGradient(0, padTop, 0, padTop + plotH);
      targetGrad.addColorStop(0, 'rgba(96, 165, 250, 0.25)');
      targetGrad.addColorStop(1, 'rgba(96, 165, 250, 0.02)');
      ctx.fillStyle = targetGrad;
      ctx.fill();
    }

    // Draw Earth Analog Elevation Profile (Green Dashed Area)
    if (this.analogData && this.analogData.length > 1) {
      ctx.beginPath();
      const firstAnalog = getCoords(this.analogData[0].dist_m, this.analogData[0].elev_m, minAnalog);
      ctx.moveTo(firstAnalog.x, firstAnalog.y);

      for (let i = 1; i < this.analogData.length; i++) {
        const pt = getCoords(this.analogData[i].dist_m, this.analogData[i].elev_m, minAnalog);
        ctx.lineTo(pt.x, pt.y);
      }

      ctx.strokeStyle = this.analogColor;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([5, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Hover Crosshair & Values
    if (hoverX !== null && hoverX >= padLeft && hoverX <= padLeft + plotW) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(hoverX, padTop);
      ctx.lineTo(hoverX, h - padBottom);
      ctx.stroke();
      ctx.setLineDash([]);

      const hoveredDist = Math.round(((hoverX - padLeft) / plotW) * maxDist);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(hoverX - 45, padTop + 8, 90, 22);
      ctx.strokeStyle = '#00f0ff';
      ctx.strokeRect(hoverX - 45, padTop + 8, 90, 22);
      ctx.fillStyle = '#fff';
      ctx.fillText(`${hoveredDist} m`, hoverX - 22, padTop + 23);
    }
  }
}

if (typeof window !== 'undefined') {
  window.ElevationProfiler = ElevationProfiler;
}

