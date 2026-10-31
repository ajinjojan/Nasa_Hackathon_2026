#!/usr/bin/env python3
"""
NASA Hackathon - Terrestrial Analog Finder
NASA Earthdata & Copernicus Satellite Metadata Fetcher Utility

Lead Author & Architect: Ajin Jojan
Email: ajinjojan@gmail.com
GitHub: https://github.com/ajinjojan
Date: October 2026
"""

__author__ = "Ajin Jojan"
__email__ = "ajinjojan@gmail.com"
__github__ = "ajinjojan"

import json
import urllib.parse
import urllib.request
from typing import Dict, Any, List

CMR_SEARCH_URL = "https://cmr.earthdata.nasa.gov/search/granules.json"

class EarthdataFetcher:
    """
    Programmatic helper to discover and fetch open satellite products
    (NASA ASTER, MODIS LST, USGS DEM, ESA Copernicus Sentinel-2)
    for arbitrary candidate terrestrial analog coordinates.
    """

    def __init__(self, earthdata_token: str = None):
        self.token = earthdata_token

    def search_nasa_cmr(self, short_name: str, bounding_box: List[float], limit: int = 5) -> List[Dict[str, Any]]:
        """
        Query NASA Common Metadata Repository (CMR) for satellite granules.
        bounding_box format: [min_lon, min_lat, max_lon, max_lat]
        """
        bbox_str = ",".join(str(x) for x in bounding_box)
        params = {
            "short_name": short_name,
            "bounding_box": bbox_str,
            "page_size": limit,
            "sort_key": "-start_date"
        }
        url = f"{CMR_SEARCH_URL}?{urllib.parse.urlencode(params)}"
        print(f"[NASA CMR] Querying: {url}")

        try:
            req = urllib.request.Request(url, headers={"User-Agent": "NASA-Hackathon-Analog-Finder/1.0"})
            with urllib.request.urlopen(req, timeout=10) as response:
                if response.status == 200:
                    data = json.loads(response.read().decode("utf-8"))
                    entries = data.get("feed", {}).get("entry", [])
                    print(f"[NASA CMR] Found {len(entries)} matching scenes.")
                    return entries
        except Exception as e:
            print(f"[NASA CMR] Warning: Live CMR request skipped ({e}). Returning simulated granule.")

        # Robust simulated satellite metadata
        return [{
            "id": f"{short_name}_GRANULE_SIMULATED_2024",
            "title": f"NASA {short_name} Surface Product for Analog Site",
            "time_start": "2024-08-15T06:30:00.000Z",
            "boxes": [f"{bounding_box[1]} {bounding_box[0]} {bounding_box[3]} {bounding_box[2]}"],
            "links": [{"href": f"https://earthexplorer.usgs.gov/scene/metadata/full/{short_name}"}]
        }]

    def get_candidate_bounding_box(self, lat: float, lon: float, radius_deg: float = 0.25) -> List[float]:
        return [
            round(lon - radius_deg, 4),
            round(lat - radius_deg, 4),
            round(lon + radius_deg, 4),
            round(lat + radius_deg, 4)
        ]

if __name__ == "__main__":
    fetcher = EarthdataFetcher()

    # Example: Puga Valley, Ladakh, India
    lat, lon = 33.2215, 78.3582
    bbox = fetcher.get_candidate_bounding_box(lat, lon)
    print(f"Candidate Site: Ladakh Puga Valley (Lat: {lat}, Lon: {lon})")
    print(f"Bounding Box:   {bbox}")

    # Search ASTER TIR Mineralogy
    aster_results = fetcher.search_nasa_cmr(short_name="AST_07XT", bounding_box=bbox, limit=2)
    for res in aster_results:
        print(f" - Found Granule: {res.get('title')}")

