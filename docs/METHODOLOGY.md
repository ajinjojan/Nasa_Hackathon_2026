# Scientific Methodology: Terrestrial Analog Characterization Engine
## Mathematical Modeling, Satellite Data Harmonization, and Multi-Criteria Evaluation

### 1. Overview & Theoretical Framework
Terrestrial analogs are terrestrial planetary environments that share key geological, morphological, mineralogical, or climatic characteristics with locations on other celestial bodies (such as the Moon or Mars). Historically, candidate sites were selected qualitatively based on literature or geographic fame.

The **NASA Terrestrial Analog Finder** replaces qualitative selection with a quantitative, multi-parametric, multi-spectral similarity framework:
$$\text{Similarity Index } (S) \in [0, 100\%]$$

---

### 2. Algorithmic Formulations

#### 2.1 Multi-Criteria Decision Analysis (MCDA) Composite Index
The final compatibility score is formulated as a linear combination of four normalized sub-domain metrics:
$$\mathcal{S}_{\text{composite}} = \left( w_{\text{topo}} S_{\text{topo}} + w_{\text{min}} S_{\text{min}} + w_{\text{temp}} S_{\text{temp}} + w_{\text{rough}} S_{\text{rough}} \right) \times 100$$
Where weights are strictly constrained:
$$\sum_{k \in \{\text{topo}, \text{min}, \text{temp}, \text{rough}\}} w_k = 1.0, \quad w_k \ge 0$$

#### 2.2 Mineralogical Cosine Similarity
Given two $N$-dimensional mineralogical abundance vectors $\mathbf{u}, \mathbf{v} \in \mathbb{R}^N$ (representing plagioclase/anorthosite, basaltic pyroxene, smectite clays, carbonates, sulfates, iron oxides, and silica volatiles):
$$S_{\text{cosine}}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2} = \frac{\sum_{i=1}^N u_i v_i}{\sqrt{\sum_{i=1}^N u_i^2} \sqrt{\sum_{i=1}^N v_i^2}}$$
This metric captures the relative proportions and chemical stoichiometry independent of absolute rock volume.

#### 2.3 Spectral Angle Mapper (SAM)
For continuous multispectral reflectance curves across 9 standardized solar-reflective bands (0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35 $\mu$m):
$$\theta = \arccos\left( \frac{\mathbf{r}_{\text{target}} \cdot \mathbf{r}_{\text{analog}}}{\|\mathbf{r}_{\text{target}}\| \|\mathbf{r}_{\text{analog}}\|} \right), \quad \theta \in [0, \pi/2]$$
$$S_{\text{SAM}} = 1 - \frac{\theta}{\pi/2}$$
SAM treats spectra as vectors in an $M$-dimensional space, insensitive to illumination scaling differences caused by shadow or sun angle while isolating diagnostic crystal-field absorption bands (such as the 1.05 $\mu$m and 2.05 $\mu$m pyroxene doublets and 1.9 $\mu$m hydration bands).

The integrated mineralogy score is computed as:
$$S_{\text{min}} = 0.5 \cdot S_{\text{cosine}} + 0.5 \cdot S_{\text{SAM}}$$

#### 2.4 Normalized Environmental Distance Decay
For scalar terrain and climatic variables (mean slope, maximum slope, terrain ruggedness index [TRI], rock abundance, surface temperatures, diurnal $\Delta T$, aridity, permafrost ground-ice probability), features are normalized to empirical intervals:
$$\hat{x}_{j} = \frac{x_j - \min_j}{\max_j - \min_j}, \quad \hat{x}_j \in [0, 1]$$
The weighted root-mean-square normalized deviation is:
$$d_{\text{norm}} = \sqrt{\frac{\sum_{j=1}^P \omega_j \left(\hat{x}_{j, \text{target}} - \hat{x}_{j, \text{analog}}\right)^2}{\sum_{j=1}^P \omega_j}}$$
The compatibility score is mapped via an exponential decay transfer function:
$$S_{\text{param}} = \exp\left(-\lambda \cdot d_{\text{norm}}\right), \quad \lambda = 1.5$$

---

### 3. Satellite Data Harmonization
Cross-planetary remote sensing requires aligning spatial and spectral resolutions across heterogeneous instruments:

| Observation Category | Extraterrestrial Baseline Datasets | Terrestrial Satellite Datasets | Harmonization Method |
| :--- | :--- | :--- | :--- |
| **Topography & Elevation** | NASA LRO LOLA (5m/pixel polar DEM), MGS MOLA (128 px/deg) | Copernicus GLO-30 (30m), USGS 3DEP (1m LiDAR), SRTM (30m) | Resampled to 30m standard grid; relative relief normalized ($\Delta z = z - \min(z)$) |
| **Surface Slope & Roughness** | LOLA / CTX derived Terrain Ruggedness Index (TRI) | SAGA / GDAL TRI derived from Copernicus & USGS 3DEP | Riley et al. (1999) TRI algorithm applied uniformly across all DEMs |
| **Multispectral Mineralogy** | MRO CRISM (362-3920 nm), Moon Mineralogy Mapper ($M^3$) | ESA Sentinel-2 MSI (12 bands), NASA ASTER Level 2 (VNIR/SWIR) | Convolved with standard 9-band spectral response function (0.45–2.35 $\mu$m) |
| **Thermal & Climate** | LRO Diviner (8-400 $\mu$m), Mars Odyssey THEMIS | MODIS Terra/Aqua LST (MOD11A1), ECOSTRESS TIR | Diurnal thermal amplitude $\Delta T = T_{\text{day}} - T_{\text{night}}$ calculated at 1 km scale |

---

### 4. Sensitivity & Stability Verification
To verify that rankings are robust against subjective slider adjustments, a **Monte Carlo Sensitivity Protocol** perturbs all user weights by $\pm 20\%$ across 100 iterations:
$$w_k^{(t)} = w_k \times \mathcal{U}(0.8, 1.2)$$
If the top-ranked analog retains rank #1 in $\ge 85\%$ of perturbed runs, the analog recommendation is classified as **High-Confidence Geologically Robust**.

