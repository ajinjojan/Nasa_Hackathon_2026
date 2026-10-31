/**
 * NASA Hackathon - Terrestrial Analog Finder
 * Master Application Controller
 * 
 * Lead Architect & Systems Engineer: Ajin Jojan
 * Email: ajinjojan@gmail.com
 * GitHub: https://github.com/ajinjojan
 * License: Open Access / NASA Space Apps Challenge 2026
 */

class App {
  constructor() {
    this.targetSites = [];
    this.candidateAnalogs = [];
    this.spectralLibrary = [];
    this.presets = [];

    this.currentTargetSite = null;
    this.currentAnalogSite = null;
    this.currentEvaluation = null;
    this.rankedAnalogs = [];

    this.userWeights = {
      topography: 0.25,
      mineralogy: 0.25,
      temperature: 0.25,
      roughness: 0.25
    };

    this.similarityEngine = null;
    this.mapEngine = null;
    this.elevationProfiler = null;
    this.spectralProfiler = null;
    this.dossierGenerator = null;
  }

  async init() {
    console.log(
      '%c🛰️ NASA TERRESTRIAL ANALOG FINDER ONLINE\n%cLead Architect: Ajin Jojan (ajinjojan@gmail.com | github.com/ajinjojan)',
      'color:#00f0ff; font-weight:800; font-size:14px; background:#0a0e17; padding:4px 8px; border:1px solid #00f0ff; border-radius:4px;',
      'color:#10b981; font-weight:600; font-size:11px;'
    );

    // Load data
    await this.loadData();

    // Initialize engines
    this.similarityEngine = new SimilarityEngine();
    this.mapEngine = new MapEngine();
    this.elevationProfiler = new ElevationProfiler('elevation-canvas');
    this.spectralProfiler = new SpectralProfiler('spectral-canvas');
    this.spectralProfiler.setSpectralLibrary(this.spectralLibrary);
    this.dossierGenerator = new DossierGenerator();

    // Setup initial selections
    if (this.targetSites.length > 0) {
      this.currentTargetSite = this.targetSites[0];
      this.userWeights = { ...this.currentTargetSite.default_weights };
    }

    this.bindEvents();
    this.renderUI();
  }

  async loadData() {
    if (window.EMBEDDED_DATA) {
      this.targetSites = window.EMBEDDED_DATA.target_sites || [];
      this.candidateAnalogs = window.EMBEDDED_DATA.candidate_analogs || [];
      this.spectralLibrary = window.EMBEDDED_DATA.spectral_library || [];
      this.presets = window.EMBEDDED_DATA.presets || [];
      return;
    }

    try {
      const [tgtRes, anaRes, specRes, preRes] = await Promise.all([
        fetch('./data/target_sites.json'),
        fetch('./data/candidate_analogs.json'),
        fetch('./data/spectral_library.json'),
        fetch('./data/mission_presets.json')
      ]);

      const tgtData = await tgtRes.json();
      const anaData = await anaRes.json();
      const specData = await specRes.json();
      const preData = await preRes.json();

      this.targetSites = tgtData.target_sites || [];
      this.candidateAnalogs = anaData.candidate_analogs || [];
      this.spectralLibrary = specData.spectral_library || [];
      this.presets = preData.presets || [];
    } catch (err) {
      console.error('Error loading JSON datasets:', err);
    }
  }

  bindEvents() {
    // Target Site Dropdown
    const targetSelect = document.getElementById('target-site-select');
    if (targetSelect) {
      targetSelect.addEventListener('change', (e) => {
        const found = this.targetSites.find(s => s.id === e.target.value);
        if (found) {
          this.currentTargetSite = found;
          this.userWeights = { ...found.default_weights };
          this.updateSlidersFromWeights();
          this.renderUI();
        }
      });
    }

    // Weight Sliders
    const sliders = ['topography', 'mineralogy', 'temperature', 'roughness'];
    sliders.forEach(key => {
      const slider = document.getElementById(`slider-${key}`);
      if (slider) {
        slider.addEventListener('input', (e) => {
          this.userWeights[key] = parseFloat(e.target.value) / 100;
          const valLabel = document.getElementById(`val-${key}`);
          if (valLabel) valLabel.textContent = `${e.target.value}%`;
          this.clearActivePresetHighlight();
          this.recalculateAndRefresh();
        });
      }
    });

    // Basemap Switcher Buttons
    document.querySelectorAll('.layer-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const layer = e.target.getAttribute('data-layer');
        if (this.mapEngine) {
          this.mapEngine.setEarthBaseLayer(layer);
        }
      });
    });

    // Dossier Modal Button
    const dossierBtn = document.getElementById('btn-open-dossier');
    if (dossierBtn) {
      dossierBtn.addEventListener('click', () => {
        if (this.currentTargetSite && this.currentAnalogSite && this.currentEvaluation) {
          this.dossierGenerator.openDossier(
            this.currentTargetSite,
            this.currentAnalogSite,
            this.currentEvaluation
          );
        }
      });
    }

    // CSV Export Button
    const csvBtn = document.getElementById('btn-export-csv');
    if (csvBtn) {
      csvBtn.addEventListener('click', () => this.exportAnalysisCSV());
    }

    // Reset Weights Button
    const resetBtn = document.getElementById('btn-reset-weights');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (this.currentTargetSite) {
          this.userWeights = { ...this.currentTargetSite.default_weights };
          this.updateSlidersFromWeights();
          this.recalculateAndRefresh();
        }
      });
    }
  }

  updateSlidersFromWeights() {
    const sliders = ['topography', 'mineralogy', 'temperature', 'roughness'];
    sliders.forEach(key => {
      const slider = document.getElementById(`slider-${key}`);
      const valLabel = document.getElementById(`val-${key}`);
      const pct = Math.round((this.userWeights[key] || 0.25) * 100);
      if (slider) slider.value = pct;
      if (valLabel) valLabel.textContent = `${pct}%`;
    });
  }

  clearActivePresetHighlight() {
    document.querySelectorAll('.btn-preset').forEach(b => b.classList.remove('active'));
  }

  renderPresetButtons() {
    const container = document.getElementById('preset-buttons-container');
    if (!container || this.presets.length === 0) return;

    container.innerHTML = this.presets.map((preset, index) => `
      <button class="btn-preset ${index === 0 ? 'active' : ''}" data-preset-id="${preset.id}" title="${preset.description}">
        ${preset.name.split('&')[0].trim()}
      </button>
    `).join('');

    container.querySelectorAll('.btn-preset').forEach(btn => {
      btn.addEventListener('click', (e) => {
        container.querySelectorAll('.btn-preset').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const presetId = e.target.getAttribute('data-preset-id');
        const found = this.presets.find(p => p.id === presetId);
        if (found) {
          this.userWeights = { ...found.weights };
          this.updateSlidersFromWeights();
          this.recalculateAndRefresh();
        }
      });
    });
  }

  renderUI() {
    this.renderPresetButtons();
    this.updateSlidersFromWeights();
    this.recalculateAndRefresh(true);
  }

  recalculateAndRefresh(autoSelectTop = false) {
    if (!this.currentTargetSite || this.candidateAnalogs.length === 0) return;

    // 1. Run MCDA Similarity Algorithm
    this.rankedAnalogs = this.similarityEngine.rankAllAnalogs(
      this.currentTargetSite,
      this.candidateAnalogs,
      this.userWeights
    );

    // 2. Select top match if first run or forced
    if (autoSelectTop || !this.currentAnalogSite) {
      this.currentAnalogSite = this.rankedAnalogs[0];
    } else {
      // Keep existing selected analog if possible, with updated score
      const updated = this.rankedAnalogs.find(a => a.id === this.currentAnalogSite.id);
      if (updated) {
        this.currentAnalogSite = updated;
      } else {
        this.currentAnalogSite = this.rankedAnalogs[0];
      }
    }

    this.currentEvaluation = this.currentAnalogSite.evaluation;

    // 3. Update Left Panel (Extraterrestrial Target)
    this.updateTargetPanel();

    // 4. Update Right Panel (Terrestrial Analog)
    this.updateAnalogPanel();

    // 5. Update Maps
    if (this.mapEngine) {
      this.mapEngine.updateTargetSite(this.currentTargetSite);
      this.mapEngine.updateEarthAnalog(this.currentAnalogSite);
    }

    // 6. Update Profiler Canvas Charts
    if (this.elevationProfiler) {
      this.elevationProfiler.updateProfiles(this.currentTargetSite, this.currentAnalogSite);
    }
    if (this.spectralProfiler) {
      this.spectralProfiler.updateSpectra(this.currentTargetSite, this.currentAnalogSite);
    }

    // 7. Update Global Ranking Table
    this.updateRankingTable();
  }

  updateTargetPanel() {
    const s = this.currentTargetSite;
    document.getElementById('target-title').textContent = s.name;
    document.getElementById('target-subtitle').textContent = `Mission: ${s.mission_context}`;
    
    const badge = document.getElementById('target-badge');
    badge.textContent = `${s.body.toUpperCase()} / ${s.imagery.source.split(' ')[1] || 'ORBITER'}`;
    badge.className = `badge-tag ${s.body.toLowerCase().includes('moon') ? 'badge-moon' : 'badge-mars'}`;

    // Target Telemetry
    document.getElementById('tgt-slope').textContent = `${s.environmental_profile.slope_mean_deg}°`;
    document.getElementById('tgt-rough').textContent = s.environmental_profile.roughness_tri.toFixed(2);
    document.getElementById('tgt-temp-delta').textContent = `${s.environmental_profile.diurnal_delta_k} K`;
    document.getElementById('tgt-ice').textContent = `${s.environmental_profile.subsurface_ice_wt_pct}%`;

    // Engineering challenges
    const list = document.getElementById('target-hazards-list');
    if (list) {
      list.innerHTML = s.primary_engineering_challenges.map(c => `<li>${c}</li>`).join('');
    }
  }

  updateAnalogPanel() {
    const a = this.currentAnalogSite;
    const ev = this.currentEvaluation;

    document.getElementById('analog-title').textContent = a.name;
    document.getElementById('analog-subtitle').textContent = `${a.coordinates.country} | Elev: ${a.coordinates.elevation_m}m | ${a.classification}`;
    document.getElementById('analog-match-score').textContent = `${ev.compositeScore}% MATCH`;

    // Dynamic Google Maps Street View & Ground Photosphere link
    const svBtn = document.getElementById('btn-street-view');
    if (svBtn) {
      svBtn.href = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${a.coordinates.lat},${a.coordinates.lon}`;
    }

    // Analog Telemetry
    document.getElementById('ana-slope').textContent = `${a.environmental_profile.slope_mean_deg}°`;
    document.getElementById('ana-rough').textContent = a.environmental_profile.roughness_tri.toFixed(2);
    document.getElementById('ana-temp-delta').textContent = `${a.environmental_profile.diurnal_delta_k} K`;
    document.getElementById('ana-ice').textContent = `${a.environmental_profile.subsurface_ice_wt_pct}%`;

    // Testing focus
    const list = document.getElementById('analog-focus-list');
    if (list) {
      list.innerHTML = a.logistics_and_testing.primary_testing_focus.map(f => `<li>${f}</li>`).join('');
    }

    // Satellite provenance tags
    const provBox = document.getElementById('analog-provenance-box');
    if (provBox) {
      provBox.innerHTML = `
        <div class="prov-pill">DEM: <strong>${a.satellite_provenance.dem_source.split('&')[0].trim()}</strong></div>
        <div class="prov-pill">Multispectral: <strong>${a.satellite_provenance.multispectral.split('&')[0].trim()}</strong></div>
        <div class="prov-pill">Scene ID: <strong>${a.satellite_provenance.granule_id.substring(0, 18)}...</strong></div>
        <div class="prov-pill">Logistics: <strong style="color:#10b981;">Rating ${a.logistics_and_testing.suitability_rating}</strong></div>
      `;
    }
  }

  updateRankingTable() {
    const tbody = document.getElementById('ranking-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.rankedAnalogs.map((item, index) => {
      const isActive = item.id === this.currentAnalogSite.id;
      const ev = item.evaluation;
      return `
        <tr class="${isActive ? 'active-row' : ''}" data-analog-id="${item.id}">
          <td style="font-family:'JetBrains Mono', monospace; font-weight:bold; color:${index === 0 ? '#10b981' : '#94a3b8'};">
            #${index + 1}
          </td>
          <td>
            <strong>${item.name}</strong><br/>
            <span style="font-size:0.7rem; color:#64748b;">${item.coordinates.country} | Elev: ${item.coordinates.elevation_m}m</span>
          </td>
          <td>
            <span style="font-size:0.72rem; color:${item.classification.includes('Novel') ? '#00f0ff' : '#94a3b8'};">
              ${item.classification.split('/')[0].trim()}
            </span>
          </td>
          <td style="font-family:'JetBrains Mono', monospace;">${ev.breakdown.topography}%</td>
          <td style="font-family:'JetBrains Mono', monospace;">${ev.breakdown.mineralogy}%</td>
          <td style="font-family:'JetBrains Mono', monospace;">${ev.breakdown.temperature}%</td>
          <td style="font-family:'JetBrains Mono', monospace;">${ev.breakdown.roughness}%</td>
          <td>
            <div class="score-progress-bar">
              <div class="score-fill" style="width: ${ev.compositeScore}%;"></div>
            </div>
            <strong style="font-family:'JetBrains Mono', monospace; color:#10b981;">${ev.compositeScore}%</strong>
          </td>
          <td>
            <button class="btn-select-analog" data-analog-id="${item.id}">
              ${isActive ? 'Selected' : 'Compare'}
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Table row and button selection event listeners
    tbody.querySelectorAll('tr').forEach(row => {
      row.addEventListener('click', (e) => {
        const analogId = row.getAttribute('data-analog-id');
        const found = this.candidateAnalogs.find(a => a.id === analogId);
        if (found) {
          this.currentAnalogSite = found;
          this.recalculateAndRefresh(false);
        }
      });
    });
  }

  exportAnalysisCSV() {
    if (!this.rankedAnalogs.length) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Rank,Analog ID,Site Name,Country,Region,Elevation_m,Classification,Composite_Match_Pct,Topography_Match_Pct,Mineralogy_Match_Pct,Thermal_Match_Pct,Roughness_Match_Pct,DEM_Source,Multispectral_Source,Granule_ID\n";

    this.rankedAnalogs.forEach((item, index) => {
      const ev = item.evaluation;
      const row = [
        index + 1,
        `"${item.id}"`,
        `"${item.name}"`,
        `"${item.coordinates.country}"`,
        `"${item.coordinates.region}"`,
        item.coordinates.elevation_m,
        `"${item.classification}"`,
        ev.compositeScore,
        ev.breakdown.topography,
        ev.breakdown.mineralogy,
        ev.breakdown.temperature,
        ev.breakdown.roughness,
        `"${item.satellite_provenance.dem_source}"`,
        `"${item.satellite_provenance.multispectral}"`,
        `"${item.satellite_provenance.granule_id}"`
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NASA_Analog_Finder_${this.currentTargetSite.id}_Analysis.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Instantiate and start app on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
  window.appInstance = app;
});
