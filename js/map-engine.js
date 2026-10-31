/**
 * NASA Hackathon - Terrestrial Analog Finder
 * Map Engine: Dual Extraterrestrial & Terrestrial GIS Visualizers
 */

class MapEngine {
  constructor() {
    this.earthMap = null;
    this.analogMarker = null;
    this.analogCircle = null;
    this.currentTileLayer = null;
    this.activeBaseLayer = 'satellite';
    this.targetCanvas = document.getElementById('target-map-canvas');
    this.canvasCtx = this.targetCanvas ? this.targetCanvas.getContext('2d') : null;
    this.currentTargetSite = null;
    this.currentAnalogSite = null;

    this.initEarthMap();
    this.initTargetCanvasEvents();
  }

  /**
   * Initialize Leaflet Earth Map
   */
  initEarthMap() {
    const mapElement = document.getElementById('earth-map');
    if (!mapElement) return;

    if (typeof L === 'undefined') {
      console.warn('Leaflet not loaded from CDN, rendering canvas fallback');
      mapElement.innerHTML = `
        <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#0f172a; color:#94a3b8; font-family:monospace; padding:20px; text-align:center;">
          <div style="color:#00f0ff; font-size:1.2rem; margin-bottom:8px;">🛰️ EARTH GIS TELEMETRY ACTIVE</div>
          <div id="earth-fallback-info">Loading high-resolution coordinates...</div>
        </div>`;
      return;
    }

    // Default center (Puga Valley, Ladakh)
    this.earthMap = L.map('earth-map', {
      zoomControl: true,
      attributionControl: false
    }).setView([33.2215, 78.3582], 10);

    // Multi-source GIS Tile Layers (Esri ArcGIS servers - high performance, unblocked, HTTPS)
    this.tileLayers = {
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Esri World Imagery'
      }),
      topo: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Esri World Topo Map'
      }),
      street: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Esri World Street Map'
      })
    };

    this.currentTileLayer = this.tileLayers.satellite;
    this.currentTileLayer.addTo(this.earthMap);

    // Custom aerospace pulsing icon
    this.pulseIcon = L.divIcon({
      className: 'custom-pulse-marker',
      html: `
        <div style="position:relative; width:28px; height:28px;">
          <div style="position:absolute; width:100%; height:100%; border-radius:50%; background:rgba(0, 240, 255, 0.4); animation: pulse-ring 1.8s infinite ease-out;"></div>
          <div style="position:absolute; top:7px; left:7px; width:14px; height:14px; border-radius:50%; background:#00f0ff; border:2px solid #fff; box-shadow:0 0 10px #00f0ff;"></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  }

  /**
   * Switch basemap layer
   */
  setEarthBaseLayer(type) {
    if (!this.earthMap || !this.tileLayers[type]) return;
    this.earthMap.removeLayer(this.currentTileLayer);
    this.currentTileLayer = this.tileLayers[type];
    this.currentTileLayer.addTo(this.earthMap);
    this.activeBaseLayer = type;
  }

  /**
   * Update Earth Map view to candidate analog site
   */
  updateEarthAnalog(analogSite) {
    this.currentAnalogSite = analogSite;
    const lat = analogSite.coordinates.lat;
    const lon = analogSite.coordinates.lon;

    if (this.earthMap) {
      this.earthMap.flyTo([lat, lon], 11, {
        duration: 1.5,
        easeLinearity: 0.25
      });

      if (this.analogMarker) {
        this.earthMap.removeLayer(this.analogMarker);
      }
      if (this.analogCircle) {
        this.earthMap.removeLayer(this.analogCircle);
      }

      // Add radar marker with direct Street View & Maps links
      const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lon}`;
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

      this.analogMarker = L.marker([lat, lon], { icon: this.pulseIcon }).addTo(this.earthMap);
      this.analogMarker.bindPopup(`
        <div style="font-family:sans-serif; color:#0f172a; padding:6px; min-width:210px;">
          <strong style="color:#0284c7; font-size:14px;">${analogSite.name}</strong><br/>
          <span style="font-size:12px; color:#475569;">Elevation: <b>${analogSite.coordinates.elevation_m} m</b></span><br/>
          <span style="font-size:11px; color:#64748b;">Class: ${analogSite.classification}</span><br/>
          <div style="font-size:11px; color:#059669; font-weight:bold; margin-top:2px;">Focus: ${analogSite.logistics_and_testing.primary_testing_focus[0]}</div>
          <div style="margin-top:8px; display:flex; gap:6px;">
            <a href="${streetViewUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block; font-size:11px; background:#0284c7; color:#fff; text-decoration:none; padding:3px 8px; border-radius:4px; font-weight:bold;">
              📷 Street / Ground View ↗
            </a>
            <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block; font-size:11px; background:#e2e8f0; color:#334155; text-decoration:none; padding:3px 8px; border-radius:4px; font-weight:bold;">
              🗺️ Maps ↗
            </a>
          </div>
        </div>
      `).openPopup();

      // 5km Operational Sortie Radius Circle
      this.analogCircle = L.circle([lat, lon], {
        radius: 5000,
        color: '#00f0ff',
        weight: 1.5,
        dashArray: '4, 4',
        fillColor: '#00f0ff',
        fillOpacity: 0.12
      }).addTo(this.earthMap);
    } else {
      const fallback = document.getElementById('earth-fallback-info');
      if (fallback) {
        fallback.innerHTML = `
          <strong>${analogSite.name}</strong><br/>
          Coordinates: ${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E | Elev: ${analogSite.coordinates.elevation_m}m<br/>
          Classification: ${analogSite.classification}
        `;
      }
    }
  }

  /**
   * Extraterrestrial Canvas Setup and Interaction
   */
  initTargetCanvasEvents() {
    if (!this.targetCanvas) return;

    // Resize canvas to match display resolution
    const resizeCanvas = () => {
      const rect = this.targetCanvas.getBoundingClientRect();
      this.targetCanvas.width = rect.width * (window.devicePixelRatio || 1);
      this.targetCanvas.height = rect.height * (window.devicePixelRatio || 1);
      this.renderTargetCanvas();
    };

    window.addEventListener('resize', resizeCanvas);
    setTimeout(resizeCanvas, 50);

    // Mouse movement HUD crosshair
    this.targetCanvas.addEventListener('mousemove', (e) => {
      const rect = this.targetCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.renderTargetCanvas(x, y);
    });

    this.targetCanvas.addEventListener('mouseleave', () => {
      this.renderTargetCanvas(null, null);
    });
  }

  /**
   * Render Extraterrestrial Topographic Map on Canvas
   */
  renderTargetCanvas(hoverX, hoverY) {
    if (!this.canvasCtx || !this.targetCanvas) return;
    const ctx = this.canvasCtx;
    const w = this.targetCanvas.width;
    const h = this.targetCanvas.height;

    ctx.clearRect(0, 0, w, h);

    if (!this.currentTargetSite) {
      ctx.fillStyle = '#0a0e17';
      ctx.fillRect(0, 0, w, h);
      return;
    }

    const siteId = this.currentTargetSite.id;
    const isMoon = this.currentTargetSite.body.toLowerCase().includes('moon');

    // 1. Planetary Base Color Gradients
    const baseGradient = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, Math.max(w, h) / 1.2);
    if (isMoon) {
      baseGradient.addColorStop(0, '#1e2430');
      baseGradient.addColorStop(0.5, '#11151f');
      baseGradient.addColorStop(1, '#07090e');
    } else {
      // Mars rust / iron oxide palette
      baseGradient.addColorStop(0, '#5c2214');
      baseGradient.addColorStop(0.5, '#3b140b');
      baseGradient.addColorStop(1, '#1a0805');
    }
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, w, h);

    // 2. Synthesize High-Fidelity Geological Features based on Target
    this.drawTerrainFeatures(ctx, siteId, w, h);

    // 3. Grid Lines & Planetary Coordinates HUD
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.lineWidth = 1;
    const gridStep = 50;
    for (let x = 0; x < w; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 4. Center Target Landing / Candidate Site Reticle
    const cx = w / 2;
    const cy = h / 2;
    ctx.strokeStyle = isMoon ? '#00f0ff' : '#ff7a45';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 38, cy);
    ctx.lineTo(cx - 12, cy);
    ctx.moveTo(cx + 12, cy);
    ctx.lineTo(cx + 38, cy);
    ctx.moveTo(cx, cy - 38);
    ctx.lineTo(cx, cy - 12);
    ctx.moveTo(cx, cy + 12);
    ctx.lineTo(cx, cy + 38);
    ctx.stroke();

    // 5. HUD Telemetry Label inside Canvas
    ctx.fillStyle = isMoon ? '#00f0ff' : '#ff9c6e';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(`TARGET: ${this.currentTargetSite.name.split('(')[0].trim().toUpperCase()}`, 16, 26);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(`LAT: ${this.currentTargetSite.coordinates.lat}° | LON: ${this.currentTargetSite.coordinates.lon}°`, 16, 42);
    ctx.fillText(`SENSOR: ${this.currentTargetSite.imagery.source}`, 16, 56);

    // 6. Interactive Cursor Hover Crosshair
    if (hoverX !== null && hoverY !== null && hoverX !== undefined) {
      const scaleX = w / this.targetCanvas.getBoundingClientRect().width;
      const scaleY = h / this.targetCanvas.getBoundingClientRect().height;
      const actualX = hoverX * scaleX;
      const actualY = hoverY * scaleY;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(actualX, 0);
      ctx.lineTo(actualX, h);
      ctx.moveTo(0, actualY);
      ctx.lineTo(w, actualY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Elevation estimation under cursor
      const distFromCenter = Math.sqrt(Math.pow(actualX - cx, 2) + Math.pow(actualY - cy, 2));
      const simulatedElev = Math.round(-3800 + distFromCenter * 8.5);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(actualX + 12, actualY - 30, 140, 24);
      ctx.strokeStyle = '#00f0ff';
      ctx.strokeRect(actualX + 12, actualY - 30, 140, 24);
      ctx.fillStyle = '#fff';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(`ELEV: ${simulatedElev} m`, actualX + 18, actualY - 14);
    }
  }

  /**
   * Specialized procedural geological rendering per site
   */
  drawTerrainFeatures(ctx, siteId, w, h) {
    const cx = w / 2;
    const cy = h / 2;

    if (siteId === 'lunar_south_pole') {
      // Shackleton crater permanently shadowed bowl
      const craterGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140);
      craterGrad.addColorStop(0, '#000000'); // Total darkness PSR
      craterGrad.addColorStop(0.5, '#05070c');
      craterGrad.addColorStop(0.85, '#2a3344'); // Sunlit crater rim crest
      craterGrad.addColorStop(1, '#0e121a');
      ctx.fillStyle = craterGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.fill();

      // Rim highlights (Peaks of eternal light)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, 130, -Math.PI * 0.35, Math.PI * 0.15);
      ctx.stroke();

    } else if (siteId === 'lunar_lava_tube') {
      // Marius Hills Skylight collapse pit
      // Rille depression channel
      ctx.strokeStyle = 'rgba(15, 20, 28, 0.9)';
      ctx.lineWidth = 45;
      ctx.beginPath();
      ctx.moveTo(w * 0.1, h * 0.85);
      ctx.bezierCurveTo(w * 0.4, h * 0.6, w * 0.6, h * 0.35, w * 0.9, h * 0.1);
      ctx.stroke();

      // Black vertical skylight hole
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 40, 32, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.stroke();

    } else if (siteId === 'mars_ancient_lakebed') {
      // Jezero Crater Western Delta fan lobes
      ctx.fillStyle = 'rgba(180, 83, 9, 0.25)';
      ctx.beginPath();
      ctx.moveTo(cx - 160, cy);
      ctx.bezierCurveTo(cx - 80, cy - 120, cx + 80, cy - 90, cx + 140, cy - 20);
      ctx.lineTo(cx + 120, cy + 90);
      ctx.bezierCurveTo(cx + 40, cy + 120, cx - 60, cy + 80, cx - 160, cy);
      ctx.fill();

      // Inverted distributary channels
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx - 150, cy);
      ctx.lineTo(cx - 40, cy - 30);
      ctx.lineTo(cx + 60, cy - 60);
      ctx.moveTo(cx - 40, cy - 30);
      ctx.lineTo(cx + 80, cy + 20);
      ctx.moveTo(cx - 40, cy - 30);
      ctx.lineTo(cx + 40, cy + 70);
      ctx.stroke();

    } else if (siteId === 'mars_volcanic_plains') {
      // Elysium platy basalt flows & tectonic fissures (Cerberus Fossae)
      ctx.strokeStyle = '#7c2d12';
      ctx.lineWidth = 2;
      for (let i = -100; i <= 100; i += 40) {
        ctx.beginPath();
        ctx.moveTo(cx - 180 + i, cy - 120);
        ctx.lineTo(cx + 160 + i, cy + 130);
        ctx.stroke();
      }
      // Linear fault rupture
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(w * 0.15, cy - 60);
      ctx.lineTo(w * 0.85, cy + 40);
      ctx.stroke();
    }
  }

  /**
   * Update Extraterrestrial Target Site
   */
  updateTargetSite(targetSite) {
    this.currentTargetSite = targetSite;
    this.renderTargetCanvas();
  }
}

if (typeof window !== 'undefined') {
  window.MapEngine = MapEngine;
}

