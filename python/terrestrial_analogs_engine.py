#!/usr/bin/env python3
"""
NASA Hackathon - Terrestrial Analog Finder
Analytical Similarity Engine (MCDA / Cosine Similarity / SAM / Monte Carlo Sensitivity)

Lead Author & Architect: Ajin Jojan
Email: ajinjojan@gmail.com
GitHub: https://github.com/ajinjojan
Date: October 2026
"""

__author__ = "Ajin Jojan"
__email__ = "ajinjojan@gmail.com"
__github__ = "ajinjojan"

import json
import math
import os
import argparse
from typing import Dict, List, Any, Tuple

class TerrestrialAnalogEngine:
    """
    Core algorithmic engine for calculating multi-dimensional planetary-to-terrestrial
    analog similarity metrics using satellite and environmental telemetry.
    """

    def __init__(self, data_dir: str = "../data"):
        self.data_dir = data_dir
        self.target_sites = self._load_json(os.path.join(data_dir, "target_sites.json")).get("target_sites", [])
        self.candidate_analogs = self._load_json(os.path.join(data_dir, "candidate_analogs.json")).get("candidate_analogs", [])
        self.spectral_library = self._load_json(os.path.join(data_dir, "spectral_library.json")).get("spectral_library", [])
        self.mission_presets = self._load_json(os.path.join(data_dir, "mission_presets.json")).get("presets", [])

        # Empirical bounding intervals for normalization
        self.param_bounds = {
            "slope_mean_deg": {"min": 0.0, "max": 40.0, "weight": 0.3},
            "slope_max_deg": {"min": 0.0, "max": 90.0, "weight": 0.2},
            "roughness_tri": {"min": 0.0, "max": 1.0, "weight": 0.25},
            "rock_abundance_pct": {"min": 0.0, "max": 40.0, "weight": 0.25},
            "min_temperature_k": {"min": 30.0, "max": 320.0, "weight": 0.25},
            "max_temperature_k": {"min": 100.0, "max": 340.0, "weight": 0.25},
            "diurnal_delta_k": {"min": 0.0, "max": 200.0, "weight": 0.2},
            "aridity_index": {"min": 0.0, "max": 1.0, "weight": 0.15},
            "permafrost_ice_probability": {"min": 0.0, "max": 1.0, "weight": 0.15}
        }

    def _load_json(self, filepath: str) -> Dict[str, Any]:
        if not os.path.exists(filepath):
            # Try alternate path relative to cwd
            alt_path = os.path.join(os.path.dirname(__file__), filepath)
            if os.path.exists(alt_path):
                filepath = alt_path
            else:
                return {}
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)

    @staticmethod
    def dot_product(v1: List[float], v2: List[float]) -> float:
        return sum(a * b for a, b in zip(v1, v2))

    @staticmethod
    def vector_norm(v: List[float]) -> float:
        return math.sqrt(sum(a * a for a in v))

    def cosine_similarity(self, v1: List[float], v2: List[float]) -> float:
        norm1 = self.vector_norm(v1)
        norm2 = self.vector_norm(v2)
        if norm1 == 0.0 or norm2 == 0.0:
            return 0.0
        dot = self.dot_product(v1, v2)
        return max(0.0, min(1.0, dot / (norm1 * norm2)))

    def spectral_angle_mapper(self, target_bands: List[float], analog_bands: List[float]) -> float:
        """
        Computes the Spectral Angle Mapper (SAM) metric between two hyperspectral/multispectral vectors.
        Returns a similarity value between 0.0 and 1.0.
        """
        cos_theta = self.cosine_similarity(target_bands, analog_bands)
        theta = math.acos(max(-1.0, min(1.0, cos_theta)))
        # Normalize: angle 0 -> 1.0 similarity, angle pi/2 -> 0.0 similarity
        return max(0.0, 1.0 - (theta / (math.pi / 2.0)))

    def normalized_parameter_similarity(self, dict_a: Dict[str, float], dict_b: Dict[str, float], keys: List[str]) -> float:
        """
        Calculates weighted root-mean-square normalized Euclidean distance between parameter dictionaries,
        mapped through an exponential decay transfer function: S = exp(-1.5 * d_norm).
        """
        weighted_dist_sq = 0.0
        total_weight = 0.0

        for key in keys:
            bounds = self.param_bounds.get(key, {"min": 0.0, "max": 1.0, "weight": 1.0})
            val_range = bounds["max"] - bounds["min"]
            if val_range <= 0.0:
                val_range = 1.0

            val_a = (dict_a.get(key, bounds["min"]) - bounds["min"]) / val_range
            val_b = (dict_b.get(key, bounds["min"]) - bounds["min"]) / val_range
            weight = bounds.get("weight", 1.0)

            weighted_dist_sq += weight * math.pow(val_a - val_b, 2)
            total_weight += weight

        rmsd = math.sqrt(weighted_dist_sq / total_weight) if total_weight > 0 else 0.0
        return math.exp(-1.5 * rmsd)

    def evaluate_analog_pair(self, target: Dict[str, Any], analog: Dict[str, Any], weights: Dict[str, float] = None) -> Dict[str, Any]:
        """
        Calculates individual category compatibility scores and composite weighted index.
        """
        if weights is None:
            weights = target.get("default_weights", {
                "topography": 0.25,
                "mineralogy": 0.25,
                "temperature": 0.25,
                "roughness": 0.25
            })

        tgt_env = target.get("environmental_profile", {})
        ana_env = analog.get("environmental_profile", {})

        # 1. Topographic Morphometry Similarity
        topo_sim = self.normalized_parameter_similarity(tgt_env, ana_env, ["slope_mean_deg", "slope_max_deg"])

        # 2. Surface Roughness / Boulder Abundance Similarity
        rough_sim = self.normalized_parameter_similarity(tgt_env, ana_env, ["roughness_tri", "rock_abundance_pct"])

        # 3. Thermal Regime & Cryosphere / Aridity Similarity
        temp_sim = self.normalized_parameter_similarity(
            tgt_env, ana_env,
            ["min_temperature_k", "max_temperature_k", "diurnal_delta_k", "aridity_index", "permafrost_ice_probability"]
        )

        # 4. Mineralogy & Multi-Spectral Curve Match
        min_keys = ["anorthosite", "basalt_pyroxene", "clays_phyllosilicates", "carbonates", "sulfates", "iron_oxides", "silica_volatiles"]
        vec_min_tgt = [target.get("mineralogy", {}).get(k, 0.0) for k in min_keys]
        vec_min_ana = [analog.get("mineralogy", {}).get(k, 0.0) for k in min_keys]
        min_cosine = self.cosine_similarity(vec_min_tgt, vec_min_ana)

        bands_tgt = target.get("spectral_bands", {}).get("reflectance", [])
        bands_ana = analog.get("spectral_bands", {}).get("reflectance", [])
        sam_score = self.spectral_angle_mapper(bands_tgt, bands_ana) if bands_tgt and bands_ana else min_cosine

        mineral_sim = 0.5 * min_cosine + 0.5 * sam_score

        # Composite score
        w_sum = sum(weights.values()) or 1.0
        w_topo = weights.get("topography", 0.25) / w_sum
        w_min = weights.get("mineralogy", 0.25) / w_sum
        w_temp = weights.get("temperature", 0.25) / w_sum
        w_rough = weights.get("roughness", 0.25) / w_sum

        composite = (w_topo * topo_sim + w_min * mineral_sim + w_temp * temp_sim + w_rough * rough_sim) * 100.0

        return {
            "analog_id": analog.get("id"),
            "analog_name": analog.get("name"),
            "country": analog.get("coordinates", {}).get("country"),
            "composite_score": round(composite, 2),
            "breakdown": {
                "topography_pct": round(topo_sim * 100.0, 2),
                "mineralogy_pct": round(mineral_sim * 100.0, 2),
                "temperature_pct": round(temp_sim * 100.0, 2),
                "roughness_pct": round(rough_sim * 100.0, 2),
                "spectral_sam_pct": round(sam_score * 100.0, 2)
            }
        }

    def rank_analogs(self, target_id: str, weights: Dict[str, float] = None) -> List[Dict[str, Any]]:
        target = next((t for t in self.target_sites if t["id"] == target_id), None)
        if not target:
            raise ValueError(f"Target site ID '{target_id}' not found.")

        results = []
        for analog in self.candidate_analogs:
            eval_res = self.evaluate_analog_pair(target, analog, weights)
            results.append({
                "analog": analog,
                "evaluation": eval_res
            })

        results.sort(key=lambda x: x["evaluation"]["composite_score"], reverse=True)
        return results

    def print_leaderboard(self, target_id: str, weights: Dict[str, float] = None):
        rankings = self.rank_analogs(target_id, weights)
        target = next(t for t in self.target_sites if t["id"] == target_id)

        print("=" * 80)
        print(f"NASA TERRESTRIAL ANALOG FINDER // MISSION EVALUATION REPORT")
        print(f"TARGET SITE: {target['name']}")
        print(f"CONTEXT:     {target['mission_context']}")
        print("=" * 80)
        print(f"{'RANK':<5} {'ANALOG SITE':<38} {'COMPOSITE':<12} {'TOPO%':<8} {'MIN%':<8} {'TEMP%':<8} {'ROUGH%'}")
        print("-" * 80)

        for i, item in enumerate(rankings, 1):
            name = item["analog"]["name"]
            if len(name) > 36:
                name = name[:33] + "..."
            ev = item["evaluation"]
            b = ev["breakdown"]
            print(f"#{i:<4} {name:<38} {ev['composite_score']:>6.1f}%      {b['topography_pct']:>5.1f}%  {b['mineralogy_pct']:>5.1f}%  {b['temperature_pct']:>5.1f}%  {b['roughness_pct']:>5.1f}%")

        print("=" * 80)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Evaluate terrestrial analogs against candidate lunar and Martian sites.")
    parser.add_argument("--target", default="lunar_south_pole", help="Target site ID (lunar_south_pole, lunar_lava_tube, mars_ancient_lakebed, mars_volcanic_plains)")
    args = parser.parse_args()

    engine = TerrestrialAnalogEngine(data_dir=os.path.join(os.path.dirname(__file__), "..", "data"))
    engine.print_leaderboard(args.target)

