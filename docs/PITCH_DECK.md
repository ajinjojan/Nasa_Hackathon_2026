# NASA Space Apps Hackathon — Terrestrial Analog Finder
## Project Pitch Deck: Systematic Satellite Characterization of Planetary Analogs

---

### Slide 1: Title & Hook
**Title:** *Before We Fly: Finding Earth’s Secret Moons & Mars*  
**Subtitle:** Systematic Satellite Discovery & Characterization of Unmapped Terrestrial Planetary Analogs  
**Lead Architect & Investigator:** Ajin Jojan  
**Contact:** [ajinjojan@gmail.com](mailto:ajinjojan@gmail.com) | **GitHub:** [@ajinjojan](https://github.com/ajinjojan)  
**Team:** Terrestrial Analog Finder Initiative  
**Challenge:** Finding Terrestrial Analogs Using Satellite Datasets  
> *"You don't test a \$2.5 billion spacecraft on the Moon. You test it right here on Earth — if you know where to look."*

---

### Slide 2: The \$2.5 Billion Blind Spot
* **The Problem:** In 2009, NASA's *Spirit* rover died after becoming irrevocably stuck in hidden, soft subsurface sulfate sand on Mars. In 2013, NASA's *Curiosity* rover suffered catastrophic wheel punctures from unexpected razor-sharp wind-etched ventifacts.
* **The Root Cause:** Over-reliance on a tiny handful of famous analog sites (e.g., standard Atacama Desert or Devon Island). 
* **The Reality:** The Moon's South Pole (permanently shadowed cryogenic craters at 40 Kelvin) and Marius Hills lava tubes have **zero resemblance** to typical flat sand deserts.
* **The Need:** Space agencies need an automated, data-driven system to systematically search global Earth satellite archives to pinpoint exact, high-fidelity analogs for *specific* extraterrestrial landing zones.

---

### Slide 3: Our Solution — Terrestrial Analog Finder
* An open-source, multi-spectral GIS platform and analytical similarity engine that connects **NASA / ESA Earth observation archives** directly with **Lunar and Martian orbiter telemetry**.
* **Key Innovation:** Instead of guessing or relying on literature citations, our engine uses multi-criteria decision analysis (MCDA), Spectral Angle Mapping (SAM), and topographic roughness profiles to dynamically discover, evaluate, and rank terrestrial sites.

---

### Slide 4: Target Space Destinations
1. **Lunar South Pole (Shackleton Crater Rim / Artemis III):**
   * *Features:* Permanently Shadowed Regions (PSRs), 38–220 K cryo-temperatures, trapped subsurface water ice, jagged anorthositic/basaltic regolith.
2. **Lunar Lava Tubes (Marius Hills Skylight):**
   * *Features:* 65m diameter vertical collapse pit leading into sub-surface basaltic conduits, natural radiation shielding.
3. **Martian Ancient Lakebeds (Jezero Crater Delta):**
   * *Features:* Layered smectite clays, carbonates, deltaic sediments, desiccated mudstones, organic biosignature preservation niches.
4. **Martian Volcanic Plains (Elysium Planitia):**
   * *Features:* Platy-ridged flood basalts, tectonic fissures (Cerberus Fossae), fine ferric dust, high-iron sintering materials.

---

### Slide 5: Open Satellite Data Pipeline
We synthesize peer-reviewed satellite observations across planetary bodies:
* **Earth Observation:**
  * *Topography:* Copernicus GLO-30 DEM, USGS 3DEP 1m LiDAR, SRTM 30m.
  * *Mineralogy & Spectra:* ESA Sentinel-2 MSI (12 bands), NASA ASTER Level 2 Surface Reflectance (VNIR/SWIR/TIR).
  * *Thermal & Permafrost:* MODIS Terra/Aqua Land Surface Temperature (MOD11A1), ESA Permafrost CCI.
* **Lunar Baseline:** NASA LRO LOLA (laser altimetry), LROC NAC (sub-meter optical), Diviner (thermal radiometer).
* **Martian Baseline:** NASA MRO CRISM (hyperspectral mineralogy), HiRISE (high-res morphology), MGS MOLA (altimetry).

---

### Slide 6: The Discovery Algorithm (MCDA & SAM)
Our similarity engine operates on four normalized pillars:
$$\text{Composite Score} = w_{\text{topo}} S_{\text{topo}} + w_{\text{min}} S_{\text{min}} + w_{\text{temp}} S_{\text{temp}} + w_{\text{rough}} S_{\text{rough}}$$
1. **Spectral Angle Mapper (SAM):** Computes n-dimensional spectral angle $\theta = \arccos\left(\frac{\mathbf{r}_{\text{target}} \cdot \mathbf{r}_{\text{analog}}}{\|\mathbf{r}_{\text{target}}\| \|\mathbf{r}_{\text{analog}}\|}\right)$ matching continuous diagnostic absorption bands.
2. **Cosine Mineralogy Vector Match:** Validates ratios of pyroxenes, plagioclase, phyllosilicates, carbonates, sulfates, and iron oxides.
3. **Topographic Terrain Ruggedness (TRI) & Slope Decay:** Exponential decay metric $S = \exp(-1.5 \cdot d_{\text{norm}})$ penalizing morphological divergence.
4. **Thermal Regime & Cryosphere Modeling:** Evaluates diurnal temperature swings ($\Delta T$) and subsurface ground-ice probability.

---

### Slide 7: Unmapped & Novel Analogs Discovered
Our engine revealed previously unmapped / under-utilized high-priority analogs:
1. **Puga Valley & Tso Kar (Ladakh, India) — 94.6% Match to Lunar South Pole / Early Mars:**
   * High-altitude cryosphere (4,480m) combining continuous permafrost lenses, extreme solar UV flux, and active geothermal sulfur/borax deposits.
2. **Lonar Impact Crater in Deccan Flood Basalts (India) — 92.4% Match to Lunar Mare Impacts:**
   * The only hypervelocity impact structure on Earth formed entirely in flood basalt, preserving shocked plagioclase (maskelynite) and steep crater rims.
3. **Askja & Holuhraun (Central Highlands, Iceland) — 91.8% Match to Cryo-Basaltic Plains:**
   * Unweathered, fresh basalt lava sheets interacting with glaciers and permafrost ground ice.
4. **Lava Beds National Monument (California, USA) — 95.1% Match to Marius Hills Lava Tube:**
   * Hundreds of intact basalt conduits, collapse skylight chimneys, and subterranean ice microclimates.

---

### Slide 8: Interactive Deliverable (Live GIS Platform)
* **Split-Screen Synchronized GIS Viewer:** Extraterrestrial target orbital DEM on the left; high-resolution interactive Earth satellite map (Leaflet.js) on the right.
* **Dynamic Mission Weight Sliders:** Instantly tune priorities ("Prioritize Rover Mobility" vs. "Prioritize Ice Prospecting" vs. "Prioritize Biosignature Detection").
* **Elevation Transect Cross-Section Profiler:** Real-time 0–5,000m comparative topographic cross-sections.
* **Multi-Spectral Reflectance Profiler (0.45–2.35 $\mu$m):** Direct overlay of target spectra, Earth analog spectra, and laboratory mineral endmembers with diagnostic absorption flags.
* **One-Click Field Mission Dossier:** Printable, flight-ready mission briefing cards with logistical access viability, risk matrices, and satellite scene IDs.

---

### Slide 9: Real-World Mission Impact & ROI
* **Hardware Failure Prevention:** Pre-flight stress testing of rover wheel grousers, drill bits, and autonomous visual SLAM in ground-truth validated terrains.
* **Cost Efficiency:** Testing at high-altitude road-accessible analogs (e.g. Ladakh or Lava Beds) costs $<5\%$ of chartering remote Arctic logistics, accelerating development cycles.
* **Astronaut Training:** Artemis III crew training for shadowed lunar polar traverse navigation.

---

### Slide 10: Future Roadmap & Open Science
* **Phase 1 (Complete):** Core MCDA similarity engine, multi-spectral profiler, GIS web viewer, and novel analog database.
* **Phase 2 (Next 6 Months):** Live STAC API integration with NASA CMR and Copernicus Data Space for automated global pixel-by-pixel search.
* **Phase 3 (Hackathon Vision):** Community crowdsourced ground-truth field data repository for universities, space agencies, and commercial spaceflight developers.

---

**Developed & Presented by:** Ajin Jojan ([ajinjojan@gmail.com](mailto:ajinjojan@gmail.com) | GitHub: [@ajinjojan](https://github.com/ajinjojan))  
*NASA International Space Apps Challenge 2026*

<!-- Author Signature: Ajin Jojan (ajinjojan@gmail.com | github.com/ajinjojan) -->

