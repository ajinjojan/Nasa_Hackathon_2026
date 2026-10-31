/**
 * NASA Hackathon - Terrestrial Analog Finder
 * Similarity Engine (MCDA / Cosine Similarity / SAM / Multi-Parametric Normalization)
 * 
 * Author & Algorithm Designer: Ajin Jojan
 * Email: ajinjojan@gmail.com
 * GitHub: https://github.com/ajinjojan
 */

class SimilarityEngine {
  constructor() {
    // Normalization bounds and standard deviations for environmental parameters
    this.paramBounds = {
      slope_mean_deg: { min: 0, max: 40, weight: 0.3 },
      slope_max_deg: { min: 0, max: 90, weight: 0.2 },
      roughness_tri: { min: 0, max: 1.0, weight: 0.25 },
      rock_abundance_pct: { min: 0, max: 40, weight: 0.25 },
      min_temperature_k: { min: 30, max: 320, weight: 0.25 },
      max_temperature_k: { min: 100, max: 340, weight: 0.25 },
      diurnal_delta_k: { min: 0, max: 200, weight: 0.2 },
      aridity_index: { min: 0, max: 1.0, weight: 0.15 },
      permafrost_ice_probability: { min: 0, max: 1.0, weight: 0.15 }
    };
  }

  /**
   * Vector dot product
   */
  dotProduct(vecA, vecB) {
    let sum = 0;
    for (let i = 0; i < vecA.length; i++) {
      sum += (vecA[i] || 0) * (vecB[i] || 0);
    }
    return sum;
  }

  /**
   * Vector Euclidean magnitude
   */
  magnitude(vec) {
    let sum = 0;
    for (let i = 0; i < vec.length; i++) {
      sum += Math.pow(vec[i] || 0, 2);
    }
    return Math.sqrt(sum);
  }

  /**
   * Cosine Similarity: cos(theta) = (A . B) / (||A|| * ||B||)
   */
  cosineSimilarity(vecA, vecB) {
    const magA = this.magnitude(vecA);
    const magB = this.magnitude(vecB);
    if (magA === 0 || magB === 0) return 0;
    const dot = this.dotProduct(vecA, vecB);
    return Math.max(0, Math.min(1, dot / (magA * magB)));
  }

  /**
   * Spectral Angle Mapper (SAM)
   * SAM angle in radians: theta = arccos( dot(A, B) / (||A|| * ||B||) )
   * Similarity metric = 1 - (theta / (PI / 2))
   */
  spectralAngleSimilarity(bandsA, bandsB) {
    const cosTheta = this.cosineSimilarity(bandsA, bandsB);
    const theta = Math.acos(Math.max(-1, Math.min(1, cosTheta)));
    // Normalize: 0 angle = 1.0 similarity, PI/2 angle = 0.0 similarity
    return Math.max(0, 1 - (theta / (Math.PI / 2)));
  }

  /**
   * Normalized Euclidean distance between dictionary feature vectors
   */
  normalizedFeatureSimilarity(dictA, dictB, keys, boundsMap) {
    let weightedDistSq = 0;
    let totalWeight = 0;

    for (const key of keys) {
      const bounds = boundsMap[key] || { min: 0, max: 1, weight: 1.0 };
      const range = (bounds.max - bounds.min) || 1.0;
      const valA = ((dictA[key] ?? bounds.min) - bounds.min) / range;
      const valB = ((dictB[key] ?? bounds.min) - bounds.min) / range;
      const w = bounds.weight || 1.0;

      weightedDistSq += w * Math.pow(valA - valB, 2);
      totalWeight += w;
    }

    const rmsd = Math.sqrt(weightedDistSq / totalWeight);
    // Inverse distance exponential decay
    return Math.exp(-1.5 * rmsd);
  }

  /**
   * Compute comprehensive category similarities and weighted aggregate score
   */
  evaluateAnalog(targetSite, analogSite, userWeights) {
    const weights = userWeights || targetSite.default_weights || {
      topography: 0.25,
      mineralogy: 0.25,
      temperature: 0.25,
      roughness: 0.25
    };

    // 1. Topographic Similarity
    const topoKeys = ['slope_mean_deg', 'slope_max_deg'];
    const topoSim = this.normalizedFeatureSimilarity(
      targetSite.environmental_profile,
      analogSite.environmental_profile,
      topoKeys,
      this.paramBounds
    );

    // 2. Surface Roughness / Rock Abundance Similarity
    const roughKeys = ['roughness_tri', 'rock_abundance_pct'];
    const roughSim = this.normalizedFeatureSimilarity(
      targetSite.environmental_profile,
      analogSite.environmental_profile,
      roughKeys,
      this.paramBounds
    );

    // 3. Temperature & Climate / Hydrological Similarity
    const climateKeys = ['min_temperature_k', 'max_temperature_k', 'diurnal_delta_k', 'aridity_index', 'permafrost_ice_probability'];
    const tempSim = this.normalizedFeatureSimilarity(
      targetSite.environmental_profile,
      analogSite.environmental_profile,
      climateKeys,
      this.paramBounds
    );

    // 4. Mineralogy & Spectral Similarity
    // Mineral vector
    const minKeys = ['anorthosite', 'basalt_pyroxene', 'clays_phyllosilicates', 'carbonates', 'sulfates', 'iron_oxides', 'silica_volatiles'];
    const vecMinA = minKeys.map(k => targetSite.mineralogy[k] || 0);
    const vecMinB = minKeys.map(k => analogSite.mineralogy[k] || 0);
    const minCosine = this.cosineSimilarity(vecMinA, vecMinB);

    // Multispectral curve comparison
    const bandsA = targetSite.spectral_bands?.reflectance || [];
    const bandsB = analogSite.spectral_bands?.reflectance || [];
    const samScore = (bandsA.length > 0 && bandsB.length > 0)
      ? this.spectralAngleSimilarity(bandsA, bandsB)
      : minCosine;

    const mineralSim = 0.5 * minCosine + 0.5 * samScore;

    // Normalize weights
    const sumW = (weights.topography + weights.mineralogy + weights.temperature + weights.roughness) || 1.0;
    const wTopo = weights.topography / sumW;
    const wMin = weights.mineralogy / sumW;
    const wTemp = weights.temperature / sumW;
    const wRough = weights.roughness / sumW;

    // Composite Compatibility Score (0 - 100)
    const compositeScore = (
      wTopo * topoSim +
      wMin * mineralSim +
      wTemp * tempSim +
      wRough * roughSim
    ) * 100;

    return {
      analogId: analogSite.id,
      analogName: analogSite.name,
      compositeScore: Math.round(compositeScore * 10) / 10,
      breakdown: {
        topography: Math.round(topoSim * 1000) / 10,
        mineralogy: Math.round(mineralSim * 1000) / 10,
        temperature: Math.round(tempSim * 1000) / 10,
        roughness: Math.round(roughSim * 1000) / 10,
        spectralSam: Math.round(samScore * 1000) / 10
      },
      weightsUsed: { wTopo, wMin, wTemp, wRough }
    };
  }

  /**
   * Rank all candidate analogs for a given target site
   */
  rankAllAnalogs(targetSite, analogsList, userWeights) {
    const results = analogsList.map(analog => {
      const evaluation = this.evaluateAnalog(targetSite, analog, userWeights);
      return {
        ...analog,
        evaluation
      };
    });

    // Sort descending by composite score
    results.sort((a, b) => b.evaluation.compositeScore - a.evaluation.compositeScore);

    return results;
  }
}

// Export as global or module
if (typeof window !== 'undefined') {
  window.SimilarityEngine = SimilarityEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SimilarityEngine;
}

