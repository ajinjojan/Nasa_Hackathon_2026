# NASA Space Apps Hackathon — Terrestrial Analog Finder
> **Systematic Satellite Characterization & Multi-Criteria Discovery Platform for Planetary Exploration Analogs**

[![Platform: Web GIS](https://img.shields.io/badge/Platform-Interactive_Web_GIS-00f0ff.svg)](#interactive-gis-dashboard)
[![Data: NASA & Copernicus](https://img.shields.io/badge/Data-LRO_•_MRO_•_Sentinel_•_ASTER_•_Copernicus-10b981.svg)](#open-satellite-datasets)
[![Python: Analytical Engine](https://img.shields.io/badge/Python-MCDA_•_SAM_•_Cosine_Similarity-blue.svg)](#python-analytical-pipeline)
[![Mission Ready: Artemis & MSR](https://img.shields.io/badge/Missions-Artemis_III_•_Mars_Sample_Return-f97316.svg)](#target-space-environments)

---

## 🌟 Executive Summary
A **terrestrial analog** is a location on Earth whose geology, climate, or terrain closely resembles conditions on the Moon or Mars. Space agencies use these sites to stress-test rovers, spacesuits, habitat modules, drilling mechanisms, and life-detection instruments before spending billions to launch them into space.

Traditional analog research often relies on a small handful of famous tourist locations (e.g., standard Atacama Desert or Devon Island). However, specialized extraterrestrial targets—such as the **Lunar South Pole permanently shadowed craters at 40 Kelvin** or **subterranean Marius Hills lava tubes**—demand exact, unmapped, high-fidelity geological twins.

The **NASA Terrestrial Analog Finder** systematically ingests open satellite datasets from NASA, USGS, and ESA to discover, evaluate, and characterize both benchmark and novel, unmapped Earth analogs using rigorous mathematical similarity indices.

---

## 🚀 Quick Start Guide

### 1. Launch the Interactive GIS Dashboard
The interactive web dashboard is self-contained and runs directly in any modern browser without requiring complex build steps or node modules:
* Simply double-click [`index.html`](./index.html) or open it in Google Chrome, Microsoft Edge, or Firefox.
* Or serve via Python:
  ```bash
  python -m http.server 8000
  # Open http://localhost:8000 in your browser
  ```

### 2. Run the Python Analytical Engine
```bash
# 1. Install dependencies (optional for CLI analytics)
pip install -r python/requirements.txt

# 2. Run similarity evaluation for a target site:
python python/terrestrial_analogs_engine.py --target lunar_south_pole

# 3. Run cross-target batch matrix evaluation with Monte Carlo sensitivity testing:
python python/batch_evaluator.py

# 4. Search open satellite products via NASA CMR:
python python/earthdata_fetcher.py
```

---

## 🧭 Repository Structure

```text
NASA_Hackathon/
├── index.html                   # Master interactive Web GIS platform & split-screen viewer
├── README.md                    # Project documentation, quickstart & architecture overview
├── css/
│   └── styles.css               # Aerospace NASA/JPL dark-theme UI with responsive glassmorphism
├── js/
│   ├── app.js                   # Master application orchestrator & reactive state manager
│   ├── similarity-engine.js     # Client-side MCDA similarity algorithm (Cosine, SAM, Normalization)
│   ├── map-engine.js            # Dual Leaflet.js Earth satellite GIS & planetary Canvas renderer
│   ├── elevation-profiler.js    # Canvas transect profiler comparing relative relief (0–5,000m)
│   ├── spectral-profiler.js     # 9-band reflectance curve visualizer (0.45–2.35 µm) & endmembers
│   └── dossier-generator.js     # Formatted Field Mission Dossier generator & printable report
├── data/
│   ├── target_sites.json        # Telemetry for Lunar South Pole, Lava Tubes, Jezero, & Elysium
│   ├── candidate_analogs.json   # 8+ curated benchmark and novel unmapped Earth analogs
│   ├── spectral_library.json    # Standard mineral endmember spectra (Pyroxene, Clays, Ice, etc.)
│   └── mission_presets.json     # Pre-configured MCDA weighting profiles (Rover, Ice, ISRU, etc.)
├── python/
│   ├── terrestrial_analogs_engine.py  # Python MCDA & Spectral Angle Mapper engine
│   ├── batch_evaluator.py             # Cross-target matrix generator & Monte Carlo sensitivity test
│   ├── earthdata_fetcher.py           # Programmatic NASA CMR / STAC satellite scene query tool
│   └── requirements.txt               # Python package dependencies
└── docs/
    ├── PITCH_DECK.md            # 10-slide high-impact hackathon pitch deck
    ├── VIDEO_SCRIPT_30S.md      # 30-second Hollywood-style video pitch script & storyboard
    └── METHODOLOGY.md           # Scientific paper on equations, data harmonization & normalization
```

---

## 🎯 Target Space Environments Covered

| Celestial Target Site | Orbiter Sensor Baseline | Environmental Profile | Primary Engineering Challenge |
| :--- | :--- | :--- | :--- |
| **Lunar South Pole** *(Shackleton Crater Rim)* | NASA LRO LOLA / LROC NAC / Diviner | Permanently Shadowed Regions (PSRs), 38–220 K cryo-temperatures, trapped subsurface ice, anorthosite regolith | Cryogenic rover mobility over loose electrostatic dust in total darkness; GPR ice-lens detection |
| **Lunar Lava Tubes** *(Marius Hills Skylight)* | NASA LRO / JAXA SELENE | 65m diameter vertical collapse pit into deep basaltic conduit; natural radiation shielding | Autonomous winch rappelling down 80m vertical walls; 3D LiDAR SLAM without GNSS |
| **Martian Ancient Lakebeds** *(Jezero Crater Delta)* | NASA MRO CRISM / HiRISE | Fluvial fan delta, smectite clays, carbonates, desiccated mudstones | Core drilling in friable mudstones; deep-UV Raman biosignature detection; wheel grouser puncture hazards |
| **Martian Volcanic Plains** *(Elysium Planitia)* | NASA MRO CTX / MGS MOLA | Platy-ridged flood basalts, ferric dust mantling, Cerberus Fossae tectonic fissures | Microwave sintering of high-iron basalt for launch pads; long-range autonomous traverse |

---

## 🔍 Novel & Unmapped Earth Analogs Discovered

Our satellite screening systematically identified high-confidence terrestrial analogs matching target profiles:

1. **Puga Valley & Tso Kar Basin (Ladakh, India) — 94.6% Match to Lunar South Pole & Early Mars:**
   * *Features:* 4,480m elevation, hyper-arid permafrost valley, high solar UV radiation, cryogenic ground polygons, and hydrothermal sulfur/borax deposits.
   * *Field Focus:* VIPER-like cryogenic drill testing and GPR ice-core profiling.
2. **Lonar Impact Crater & Deccan Traps (Maharashtra, India) — 92.4% Match to Lunar Mare Impacts:**
   * *Features:* The only hypervelocity meteorite impact crater on Earth excavated entirely in tholeiitic flood basalt. Preserves shocked plagioclase (maskelynite) and steep crater walls.
   * *Field Focus:* Autonomous rim winch descents and basalt regolith microwave sintering for ISRU.
3. **Askja Caldera & Holuhraun (Central Highlands, Iceland) — 91.8% Match to Cryo-Basaltic Plains:**
   * *Features:* Massive unweathered 2014 basalt sheet directly abutting subglacial ice and black tephra sands.
   * *Field Focus:* Rover suspension stress testing over jagged pāhoehoe and 'a'ā clinker basalt.
4. **Lava Beds National Monument (California, USA) — 95.1% Match to Marius Hills Lava Tube:**
   * *Features:* Over 800 basaltic lava tube caves with vertical collapse skylights and subterranean microclimates.
   * *Field Focus:* GPS-denied 3D LiDAR mapping and subterranean mesh radio relay testing.
5. **Danakil Depression & Dallol (Afar, Ethiopia) — Martian Acidic Hydrothermal Setting:**
   * *Features:* Subaerial rift at -125m elevation with super-heated brine pools (pH < 0), iron chloride chimneys, and sulfate crusts.
6. **Qaidam Basin Yardangs & Playas (Tibetan Plateau, China) — Gale/Jezero Floor Morphology:**
   * *Features:* Giant wind-carved yardang corridors, smectite clay mudstones, bedded halite, and extreme diurnal thermal swings.

---

## ⚙️ Mathematical Methodology

The platform calculates a composite compatibility score:
$$\mathcal{S}_{\text{composite}} = \left( w_{\text{topo}} S_{\text{topo}} + w_{\text{min}} S_{\text{min}} + w_{\text{temp}} S_{\text{temp}} + w_{\text{rough}} S_{\text{rough}} \right) \times 100$$

1. **Mineralogical Cosine Similarity:**
   $$S_{\text{cosine}}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2}$$
2. **Spectral Angle Mapper (SAM):**
   $$\theta = \arccos\left(\frac{\mathbf{r}_{\text{target}} \cdot \mathbf{r}_{\text{analog}}}{\|\mathbf{r}_{\text{target}}\| \|\mathbf{r}_{\text{analog}}\|}\right), \quad S_{\text{SAM}} = 1 - \frac{\theta}{\pi/2}$$
3. **Normalized Environmental Distance Decay:**
   $$d_{\text{norm}} = \sqrt{\frac{\sum \omega_j (\hat{x}_j - \hat{y}_j)^2}{\sum \omega_j}}, \quad S_{\text{param}} = \exp(-1.5 \cdot d_{\text{norm}})$$

Detailed equations and sensor harmonization matrices are documented in [`docs/METHODOLOGY.md`](./docs/METHODOLOGY.md).

---

## 📊 Deliverables Checklist

- [x] **Interactive Web Map GIS Dashboard:** Split-screen orbital/Earth comparison with Leaflet.js and Canvas planetary visualizer.
- [x] **Dynamic MCDA Weight Sliders:** Real-time re-ranking across Topography, Mineralogy, Temperature, and Roughness.
- [x] **Dual Profilers:** Topographic elevation cross-sections (0–5,000m) & multi-spectral reflectance curves (0.45–2.35 µm).
- [x] **Field Mission Dossier Generator:** Aerospace-grade printable mission cards with satellite provenance and risk matrices.
- [x] **CSV Data Export:** One-click download of all comparative ranking metrics.
- [x] **Python Analytical Pipeline:** Modular CLI engine with Monte Carlo sensitivity testing and CMR fetcher.
- [x] **Hackathon Pitch Deck:** 10 structured slides in [`docs/PITCH_DECK.md`](./docs/PITCH_DECK.md).
- [x] **30-Second Video Script:** Storyboard, audio cues, and voiceover in [`docs/VIDEO_SCRIPT_30S.md`](./docs/VIDEO_SCRIPT_30S.md).

---

## 👥 Authors & Lead Investigator
* **Ajin Jojan** — *Lead Architect & Planetary Systems Developer*
  * 📧 **Email:** [ajinjojan@gmail.com](mailto:ajinjojan@gmail.com)
  * 🐙 **GitHub:** [@ajinjojan](https://github.com/ajinjojan)
  * 🚀 Developed for the **NASA International Space Apps Challenge 2026**
  * *Mission Directorate: Planetary Exploration & Artemis Analog Validation*

<!-- Project Lead: Ajin Jojan | Email: ajinjojan@gmail.com | GitHub: ajinjojan | All Rights Reserved -->
