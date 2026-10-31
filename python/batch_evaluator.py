#!/usr/bin/env python3
"""
NASA Hackathon - Terrestrial Analog Finder
Batch Evaluator & Cross-Target Matrix Generator with Monte Carlo Sensitivity Analysis

Lead Author & Architect: Ajin Jojan
Email: ajinjojan@gmail.com
GitHub: https://github.com/ajinjojan
Date: October 2026
"""

__author__ = "Ajin Jojan"
__email__ = "ajinjojan@gmail.com"
__github__ = "ajinjojan"

import os
import sys
import csv
import random
from typing import Dict, List, Any

# Add parent/current directory to path
sys.path.append(os.path.dirname(__file__))
from terrestrial_analogs_engine import TerrestrialAnalogEngine

def run_batch_evaluation(output_csv: str = "nasa_analog_matrix_report.csv"):
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    engine = TerrestrialAnalogEngine(data_dir=data_dir)

    print("Initiating Systematic Terrestrial Analog Batch Matrix Evaluation...")
    print(f"Target Celestial Destinations: {len(engine.target_sites)}")
    print(f"Candidate Earth Analogs:        {len(engine.candidate_analogs)}")
    print("-" * 75)

    csv_rows = []
    headers = [
        "Target_ID", "Target_Name", "Target_Body",
        "Rank", "Analog_ID", "Analog_Name", "Country", "Classification",
        "Composite_Score_Pct", "Topography_Pct", "Mineralogy_Pct", "Temperature_Pct", "Roughness_Pct",
        "Sensitivity_Stability_Pct"
    ]
    csv_rows.append(headers)

    for target in engine.target_sites:
        t_id = target["id"]
        t_name = target["name"]
        t_body = target["body"]

        rankings = engine.rank_analogs(t_id)

        print(f"\n[TARGET]: {t_name} ({t_body})")
        for rank_idx, item in enumerate(rankings, 1):
            analog = item["analog"]
            ev = item["evaluation"]
            b = ev["breakdown"]

            # Monte Carlo sensitivity test: perturb weights 100 times by +/- 20%
            top_rank_count = 0
            trials = 100
            base_weights = target.get("default_weights", {"topography": 0.25, "mineralogy": 0.25, "temperature": 0.25, "roughness": 0.25})

            for _ in range(trials):
                perturbed_w = {k: max(0.01, v * random.uniform(0.8, 1.2)) for k, v in base_weights.items()}
                pert_ranks = engine.rank_analogs(t_id, perturbed_w)
                if pert_ranks[0]["analog"]["id"] == analog["id"]:
                    top_rank_count += 1

            stability_pct = round((top_rank_count / trials) * 100.0, 1)

            print(f"  Rank #{rank_idx}: {analog['name']} -> {ev['composite_score']}% (Top-Rank Stability: {stability_pct}%)")

            csv_rows.append([
                t_id, t_name, t_body,
                rank_idx, analog["id"], analog["name"], analog["coordinates"]["country"], analog["classification"],
                ev["composite_score"], b["topography_pct"], b["mineralogy_pct"], b["temperature_pct"], b["roughness_pct"],
                stability_pct
            ])

    # Write output CSV
    output_path = os.path.join(os.path.dirname(__file__), "..", output_csv)
    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerows(csv_rows)

    print("-" * 75)
    print(f"Batch Evaluation Complete! Saved report to: {os.path.abspath(output_path)}")

if __name__ == "__main__":
    run_batch_evaluation()

