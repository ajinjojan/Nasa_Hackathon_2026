/**
 * NASA Hackathon - Terrestrial Analog Finder
 * Field Mission Dossier Generator & PDF/Print Formatter
 */

class DossierGenerator {
  constructor() {
    this.modal = document.getElementById('dossier-modal');
    this.contentContainer = document.getElementById('dossier-content-area');
  }

  openDossier(targetSite, analogSite, evaluation) {
    if (!this.modal || !this.contentContainer) return;

    const html = `
      <div class="dossier-header-bar">
        <div class="dossier-seal-title">
          <div style="width:48px; height:48px; background:#0b3d91; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; font-weight:900; font-size:12px; color:#fff; letter-spacing:1px;">NASA</div>
          <div>
            <h2 style="font-size:1.3rem; color:#fff; font-weight:800; letter-spacing:0.5px;">FIELD MISSION ANALOG DOSSIER</h2>
            <p style="font-size:0.75rem; color:#94a3b8; font-family:'JetBrains Mono', monospace;">
              DIRECTORATE FOR EXPLORATION SYSTEMS DEVELOPMENT | ARTEMIS / MARS SAMPLE RETURN
            </p>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; padding:4px 12px; border-radius:4px; font-family:'JetBrains Mono', monospace; font-size:0.85rem; font-weight:bold;">
            OVERALL MATCH: ${evaluation.compositeScore}%
          </div>
          <div style="font-size:0.7rem; color:#64748b; margin-top:4px;">DOC ID: NAF-${targetSite.id.toUpperCase()}-${analogSite.id.toUpperCase()}</div>
        </div>
      </div>

      <div class="dossier-grid">
        <!-- Target Site Profile -->
        <div class="dossier-block">
          <h4>Extraterrestrial Target Baseline</h4>
          <div style="font-size:0.85rem; font-weight:bold; color:#fff;">${targetSite.name}</div>
          <div style="font-size:0.75rem; color:#94a3b8; font-family:'JetBrains Mono', monospace;">
            Body: <b>${targetSite.body}</b> | Lat: ${targetSite.coordinates.lat}° | Lon: ${targetSite.coordinates.lon}°
          </div>
          <div style="font-size:0.78rem; color:#e2e8f0; margin-top:4px;">
            <b>Mission Context:</b> ${targetSite.mission_context}
          </div>
          <div style="margin-top:6px;">
            <div style="font-size:0.7rem; color:#60a5fa; font-weight:bold;">PRIMARY ENGINEERING HAZARDS:</div>
            <ul style="font-size:0.72rem; color:#94a3b8; padding-left:16px; margin-top:4px; line-height:1.4;">
              ${targetSite.primary_engineering_challenges.map(c => `<li>${c}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Terrestrial Analog Profile -->
        <div class="dossier-block">
          <h4>Identified Terrestrial Analog Site</h4>
          <div style="font-size:0.85rem; font-weight:bold; color:#fff;">${analogSite.name}</div>
          <div style="font-size:0.75rem; color:#94a3b8; font-family:'JetBrains Mono', monospace;">
            Country: <b>${analogSite.coordinates.country}</b> | Region: ${analogSite.coordinates.region}<br/>
            Coordinates: ${analogSite.coordinates.lat.toFixed(4)}° N, ${analogSite.coordinates.lon.toFixed(4)}° E | Elev: ${analogSite.coordinates.elevation_m}m
          </div>
          <div style="font-size:0.78rem; color:#e2e8f0; margin-top:4px;">
            <b>Classification:</b> ${analogSite.classification}
          </div>
          <div style="margin-top:6px;">
            <div style="font-size:0.7rem; color:#10b981; font-weight:bold;">FIELD TESTING SUITABILITY FOCUS:</div>
            <ul style="font-size:0.72rem; color:#94a3b8; padding-left:16px; margin-top:4px; line-height:1.4;">
              ${analogSite.logistics_and_testing.primary_testing_focus.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- Scientific Justification -->
      <div class="dossier-block">
        <h4>Systematic Satellite Characterization & Analog Justification</h4>
        <p style="font-size:0.8rem; color:#cbd5e1; line-height:1.5;">
          ${analogSite.scientific_description}
        </p>
      </div>

      <!-- Compatibility Scoring Matrix Breakdown -->
      <div class="dossier-block">
        <h4>Multi-Criteria Compatibility Breakdown</h4>
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; margin-top:6px;">
          <div style="background:rgba(2,6,23,0.6); padding:8px 12px; border-radius:6px; border:1px solid rgba(56,189,248,0.2);">
            <div style="font-size:0.65rem; color:#94a3b8; font-family:'JetBrains Mono', monospace;">TOPOGRAPHY & SLOPE</div>
            <div style="font-size:1.1rem; font-weight:bold; color:#00f0ff;">${evaluation.breakdown.topography}%</div>
          </div>
          <div style="background:rgba(2,6,23,0.6); padding:8px 12px; border-radius:6px; border:1px solid rgba(56,189,248,0.2);">
            <div style="font-size:0.65rem; color:#94a3b8; font-family:'JetBrains Mono', monospace;">MINERAL & SPECTRA</div>
            <div style="font-size:1.1rem; font-weight:bold; color:#00f0ff;">${evaluation.breakdown.mineralogy}%</div>
          </div>
          <div style="background:rgba(2,6,23,0.6); padding:8px 12px; border-radius:6px; border:1px solid rgba(56,189,248,0.2);">
            <div style="font-size:0.65rem; color:#94a3b8; font-family:'JetBrains Mono', monospace;">THERMAL & CLIMATE</div>
            <div style="font-size:1.1rem; font-weight:bold; color:#00f0ff;">${evaluation.breakdown.temperature}%</div>
          </div>
          <div style="background:rgba(2,6,23,0.6); padding:8px 12px; border-radius:6px; border:1px solid rgba(56,189,248,0.2);">
            <div style="font-size:0.65rem; color:#94a3b8; font-family:'JetBrains Mono', monospace;">SURFACE ROUGHNESS</div>
            <div style="font-size:1.1rem; font-weight:bold; color:#00f0ff;">${evaluation.breakdown.roughness}%</div>
          </div>
        </div>
      </div>

      <!-- Field Logistics & Satellite Provenance -->
      <div class="dossier-grid">
        <div class="dossier-block">
          <h4>Field Expedition Logistics & Viability</h4>
          <div style="font-size:0.75rem; color:#cbd5e1; line-height:1.5;">
            <b>Access Viability:</b> ${analogSite.logistics_and_testing.access_viability}<br/>
            <b>Suitability Rating:</b> <span style="color:#10b981; font-weight:bold;">${analogSite.logistics_and_testing.suitability_rating}</span><br/>
            <b>Recommended Campaign Window:</b> Optimal daylight, minimal seasonal precipitation
          </div>
        </div>
        <div class="dossier-block">
          <h4>Satellite Data Provenance</h4>
          <div style="font-size:0.72rem; color:#94a3b8; font-family:'JetBrains Mono', monospace; line-height:1.5;">
            DEM: <b>${analogSite.satellite_provenance.dem_source}</b><br/>
            Multispectral: <b>${analogSite.satellite_provenance.multispectral}</b><br/>
            Thermal: <b>${analogSite.satellite_provenance.thermal}</b><br/>
            Granule ID: <b>${analogSite.satellite_provenance.granule_id}</b>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="dossier-footer-bar">
        <div style="font-size:0.75rem; color:#64748b; font-family:'JetBrains Mono', monospace;">
          VERIFIED BY NASA TERRESTRIAL ANALOG SYSTEMATIC DISCOVERY ENGINE
        </div>
        <div style="display:flex; gap:10px;">
          <button onclick="window.print()" class="btn-primary" style="padding:6px 16px;">
            🖨️ Print / Save PDF
          </button>
          <button onclick="document.getElementById('dossier-modal').classList.remove('active')" class="btn-secondary" style="padding:6px 14px;">
            Close
          </button>
        </div>
      </div>
    `;

    this.contentContainer.innerHTML = html;
    this.modal.classList.add('active');
  }

  closeDossier() {
    if (this.modal) {
      this.modal.classList.remove('active');
    }
  }
}

if (typeof window !== 'undefined') {
  window.DossierGenerator = DossierGenerator;
}

