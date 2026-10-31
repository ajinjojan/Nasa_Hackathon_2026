/**
 * Embedded Satellite & Planetary Analog Datasets
 * Enables zero-dependency local execution when opened via file:// protocol
 */
window.EMBEDDED_DATA = {
  target_sites: ({
  "target_sites": [
    {
      "id": "lunar_south_pole",
      "name": "Lunar South Pole (Shackleton Crater Rim / Artemis III Ridge)",
      "body": "Moon",
      "coordinates": {
        "lat": -89.9,
        "lon": 0.0,
        "region": "South Pole-Aitken Basin Rim"
      },
      "mission_context": "Artemis III Crewed Landing & VIPER Subsurface Volatiles Prospecting",
      "imagery": {
        "source": "NASA LRO LOLA / LROC NAC / Diviner",
        "description": "Permanently Shadowed Region (PSR) floor adjacent to peaks of eternal light",
        "elevation_range": "Floor at -4,150 m, Rim crest at +1,280 m",
        "map_center": [-89.9, 0.0]
      },
      "environmental_profile": {
        "slope_mean_deg": 18.5,
        "slope_max_deg": 32.0,
        "roughness_tri": 0.78,
        "rock_abundance_pct": 14.5,
        "min_temperature_k": 38.0,
        "max_temperature_k": 220.0,
        "diurnal_delta_k": 182.0,
        "aridity_index": 1.0,
        "permafrost_ice_probability": 0.94,
        "subsurface_ice_wt_pct": 5.5,
        "vegetation_ndvi": 0.0
      },
      "mineralogy": {
        "anorthosite": 0.85,
        "basalt_pyroxene": 0.42,
        "clays_phyllosilicates": 0.0,
        "carbonates": 0.0,
        "sulfates": 0.02,
        "iron_oxides": 0.15,
        "silica_volatiles": 0.72
      },
      "primary_engineering_challenges": [
        "Rover mobility over loose, cryogenic, unweathered regolith dust in near-total darkness",
        "Calibrating ground-penetrating radar to distinguish buried water-ice from rock clutter",
        "Mechanical actuator lubrication and tire elasticity at 40 Kelvin (-233Â°C)",
        "LiDAR visual SLAM navigation without solar illumination or GPS"
      ],
      "default_weights": {
        "topography": 0.25,
        "mineralogy": 0.20,
        "temperature": 0.30,
        "roughness": 0.25
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": 1250},
        {"dist_m": 500, "elev_m": 1180},
        {"dist_m": 1000, "elev_m": 940},
        {"dist_m": 1500, "elev_m": 520},
        {"dist_m": 2000, "elev_m": -120},
        {"dist_m": 2500, "elev_m": -980},
        {"dist_m": 3000, "elev_m": -2100},
        {"dist_m": 3500, "elev_m": -3400},
        {"dist_m": 4000, "elev_m": -4120},
        {"dist_m": 4500, "elev_m": -4150},
        {"dist_m": 5000, "elev_m": -4140}
      ],
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.08, 0.09, 0.11, 0.14, 0.12, 0.16, 0.18, 0.15, 0.19]
      }
    },
    {
      "id": "lunar_lava_tube",
      "name": "Lunar Lava Tubes (Marius Hills Skylight)",
      "body": "Moon",
      "coordinates": {
        "lat": 14.08,
        "lon": -56.77,
        "region": "Oceanus Procellarum"
      },
      "mission_context": "Long-Duration Subterranean Habitat & Autonomous Spelunking Rover",
      "imagery": {
        "source": "NASA LRO LROC NAC / JAXA SELENE",
        "description": "65-meter diameter collapse skylight opening into vast sub-surface basaltic conduit",
        "elevation_range": "Surface at -2,510 m, Pit floor at -2,598 m",
        "map_center": [14.08, -56.77]
      },
      "environmental_profile": {
        "slope_mean_deg": 8.2,
        "slope_max_deg": 88.0,
        "roughness_tri": 0.64,
        "rock_abundance_pct": 22.0,
        "min_temperature_k": 250.0,
        "max_temperature_k": 255.0,
        "diurnal_delta_k": 5.0,
        "aridity_index": 1.0,
        "permafrost_ice_probability": 0.05,
        "subsurface_ice_wt_pct": 0.1,
        "vegetation_ndvi": 0.0
      },
      "mineralogy": {
        "anorthosite": 0.20,
        "basalt_pyroxene": 0.92,
        "clays_phyllosilicates": 0.0,
        "carbonates": 0.0,
        "sulfates": 0.05,
        "iron_oxides": 0.45,
        "silica_volatiles": 0.10
      },
      "primary_engineering_challenges": [
        "Vertical tethered deployment and winching of rovers down 80-meter vertical basalt walls",
        "3D LiDAR cavity reconstruction and basalt roof structural stability assessment without GNSS",
        "Extreme non-line-of-sight RF communications through dense tholeiitic basalt shielding",
        "ISRU extraction of iron, titanium, and basalt fibers for pressurized underground habitats"
      ],
      "default_weights": {
        "topography": 0.35,
        "mineralogy": 0.30,
        "temperature": 0.10,
        "roughness": 0.25
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": -2510},
        {"dist_m": 200, "elev_m": -2512},
        {"dist_m": 380, "elev_m": -2515},
        {"dist_m": 400, "elev_m": -2595},
        {"dist_m": 435, "elev_m": -2598},
        {"dist_m": 465, "elev_m": -2596},
        {"dist_m": 470, "elev_m": -2514},
        {"dist_m": 600, "elev_m": -2511},
        {"dist_m": 800, "elev_m": -2510}
      ],
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.06, 0.07, 0.09, 0.12, 0.08, 0.11, 0.13, 0.11, 0.12]
      }
    },
    {
      "id": "mars_ancient_lakebed",
      "name": "Martian Ancient Lakebeds (Jezero Crater Western Delta)",
      "body": "Mars",
      "coordinates": {
        "lat": 18.38,
        "lon": 77.58,
        "region": "Syrtis Major Quadrangle / Nili Fossae"
      },
      "mission_context": "Perseverance Sample Return & Astrobiological Biosignature Preservation",
      "imagery": {
        "source": "NASA MRO HiRISE / CRISM",
        "description": "Fluvial fan delta with fine-grained smectite clay mudstones, carbonates, and olivine",
        "elevation_range": "-2,530 m to -2,350 m",
        "map_center": [18.38, 77.58]
      },
      "environmental_profile": {
        "slope_mean_deg": 6.8,
        "slope_max_deg": 24.5,
        "roughness_tri": 0.52,
        "rock_abundance_pct": 18.0,
        "min_temperature_k": 180.0,
        "max_temperature_k": 285.0,
        "diurnal_delta_k": 105.0,
        "aridity_index": 0.98,
        "permafrost_ice_probability": 0.35,
        "subsurface_ice_wt_pct": 1.2,
        "vegetation_ndvi": 0.0
      },
      "mineralogy": {
        "anorthosite": 0.10,
        "basalt_pyroxene": 0.55,
        "clays_phyllosilicates": 0.88,
        "carbonates": 0.82,
        "sulfates": 0.65,
        "iron_oxides": 0.70,
        "silica_volatiles": 0.60
      },
      "primary_engineering_challenges": [
        "Rotary-percussive core drilling through friable deltaic clay mudstones without cross-contamination",
        "Deep UV Raman / luminescence spectrometer (SHERLOC / WATSON) detection of organic biosignatures",
        "Severe rover wheel grouser puncturing against razor-sharp wind-etched ventifacts",
        "Fine electrostatic silicate/clay dust accumulation on optical lenses and calibration targets"
      ],
      "default_weights": {
        "topography": 0.15,
        "mineralogy": 0.45,
        "temperature": 0.15,
        "roughness": 0.25
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": -2530},
        {"dist_m": 800, "elev_m": -2520},
        {"dist_m": 1600, "elev_m": -2480},
        {"dist_m": 2400, "elev_m": -2410},
        {"dist_m": 3200, "elev_m": -2380},
        {"dist_m": 4000, "elev_m": -2360},
        {"dist_m": 4800, "elev_m": -2350}
      ],
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.12, 0.16, 0.24, 0.32, 0.30, 0.28, 0.24, 0.19, 0.17]
      }
    },
    {
      "id": "mars_volcanic_plains",
      "name": "Martian Volcanic Plains (Elysium Planitia & Cerberus Fossae)",
      "body": "Mars",
      "coordinates": {
        "lat": 4.5,
        "lon": 156.2,
        "region": "Elysium Quadrangle"
      },
      "mission_context": "InSight Geophysics & Future Mars Base ISRU Sintering Infrastructure",
      "imagery": {
        "source": "NASA MRO CTX / MOLA Altimetry",
        "description": "Young flood basalt plains with platy-ridged lava textures, mantled by ferric dust",
        "elevation_range": "-2,620 m to -2,590 m",
        "map_center": [4.5, 156.2]
      },
      "environmental_profile": {
        "slope_mean_deg": 3.4,
        "slope_max_deg": 12.0,
        "roughness_tri": 0.41,
        "rock_abundance_pct": 12.0,
        "min_temperature_k": 175.0,
        "max_temperature_k": 270.0,
        "diurnal_delta_k": 95.0,
        "aridity_index": 0.99,
        "permafrost_ice_probability": 0.65,
        "subsurface_ice_wt_pct": 3.0,
        "vegetation_ndvi": 0.0
      },
      "mineralogy": {
        "anorthosite": 0.15,
        "basalt_pyroxene": 0.90,
        "clays_phyllosilicates": 0.12,
        "carbonates": 0.05,
        "sulfates": 0.35,
        "iron_oxides": 0.82,
        "silica_volatiles": 0.25
      },
      "primary_engineering_challenges": [
        "In-situ resource utilization (ISRU): microwave sintering of high-iron basaltic regolith for launch/landing pads",
        "Long-range autonomous rover mobility across platy, fractured basalt crusts over friable sub-surface regolith",
        "Fine ferric oxide dust accumulation affecting mechanical joints, bearings, and solar arrays",
        "Seismic sensor grounding in dry regolith mixed with shallow basaltic permafrost"
      ],
      "default_weights": {
        "topography": 0.20,
        "mineralogy": 0.35,
        "temperature": 0.15,
        "roughness": 0.30
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": -2620},
        {"dist_m": 1000, "elev_m": -2615},
        {"dist_m": 2000, "elev_m": -2610},
        {"dist_m": 3000, "elev_m": -2598},
        {"dist_m": 4000, "elev_m": -2602},
        {"dist_m": 5000, "elev_m": -2590}
      ],
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.10, 0.14, 0.26, 0.35, 0.31, 0.29, 0.25, 0.21, 0.22]
      }
    }
  ]
}
).target_sites,
  candidate_analogs: ({
  "candidate_analogs": [
    {
      "id": "earth_ladakh_puga",
      "name": "Puga Valley & Tso Kar Basin (Ladakh, India)",
      "classification": "Novel / Unmapped High-Altitude Cryosphere & Hydrothermal",
      "coordinates": {
        "lat": 33.2215,
        "lon": 78.3582,
        "country": "India",
        "region": "Changthang Plateau, Himalayas",
        "elevation_m": 4480
      },
      "environmental_profile": {
        "slope_mean_deg": 14.8,
        "slope_max_deg": 28.5,
        "roughness_tri": 0.72,
        "rock_abundance_pct": 16.0,
        "min_temperature_k": 238.0,
        "max_temperature_k": 301.0,
        "diurnal_delta_k": 32.0,
        "aridity_index": 0.94,
        "permafrost_ice_probability": 0.88,
        "subsurface_ice_wt_pct": 4.8,
        "vegetation_ndvi": 0.04
      },
      "mineralogy": {
        "anorthosite": 0.45,
        "basalt_pyroxene": 0.38,
        "clays_phyllosilicates": 0.42,
        "carbonates": 0.25,
        "sulfates": 0.78,
        "iron_oxides": 0.35,
        "silica_volatiles": 0.82
      },
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.11, 0.15, 0.19, 0.24, 0.22, 0.26, 0.31, 0.22, 0.28]
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": 4420},
        {"dist_m": 500, "elev_m": 4450},
        {"dist_m": 1000, "elev_m": 4510},
        {"dist_m": 1500, "elev_m": 4620},
        {"dist_m": 2000, "elev_m": 4790},
        {"dist_m": 2500, "elev_m": 4910},
        {"dist_m": 3000, "elev_m": 4820},
        {"dist_m": 3500, "elev_m": 4650},
        {"dist_m": 4000, "elev_m": 4510},
        {"dist_m": 4500, "elev_m": 4460},
        {"dist_m": 5000, "elev_m": 4430}
      ],
      "best_match_target": "lunar_south_pole",
      "secondary_match_target": "mars_ancient_lakebed",
      "satellite_provenance": {
        "dem_source": "Copernicus GLO-30 DEM & SRTM 1-ArcSec",
        "multispectral": "ESA Sentinel-2 L2A & NASA ASTER Level 2 Surface Reflectance",
        "thermal": "MODIS Terra/Aqua Land Surface Temperature (MOD11A1)",
        "granule_id": "S2A_MSIL2A_20240915T052641_N0511_R105_T43SFT"
      },
      "scientific_description": "Hyper-arid high-altitude permafrost valley surrounded by jagged crystalline and metamorphic peaks. Features geothermal sulfur, borax evaporite flats, cryogenic ground polygons, and continuous subsurface permafrost lenses under intense solar UV flux.",
      "logistics_and_testing": {
        "access_viability": "Accessible via Leh-Manali Highway (seasonal June-October); military airstrip at Nyoma within 50 km",
        "suitability_rating": "A+",
        "primary_testing_focus": [
          "Subsurface Ground Penetrating Radar (GPR) ice lens profiling",
          "Rover traction in cold, rocky permafrost scree slopes",
          "Cryogenic drill bit wear in sulfate-silica-ice cement",
          "Extreme UV sensor calibration and solar panel degradation"
        ]
      }
    },
    {
      "id": "earth_lonar_crater",
      "name": "Lonar Impact Crater & Deccan Traps (Maharashtra, India)",
      "classification": "Unique Basaltic Impact Structure",
      "coordinates": {
        "lat": 19.9760,
        "lon": 76.5070,
        "country": "India",
        "region": "Buldhana District, Maharashtra",
        "elevation_m": 563
      },
      "environmental_profile": {
        "slope_mean_deg": 19.2,
        "slope_max_deg": 38.0,
        "roughness_tri": 0.81,
        "rock_abundance_pct": 24.5,
        "min_temperature_k": 285.0,
        "max_temperature_k": 318.0,
        "diurnal_delta_k": 18.0,
        "aridity_index": 0.65,
        "permafrost_ice_probability": 0.0,
        "subsurface_ice_wt_pct": 0.0,
        "vegetation_ndvi": 0.18
      },
      "mineralogy": {
        "anorthosite": 0.28,
        "basalt_pyroxene": 0.94,
        "clays_phyllosilicates": 0.35,
        "carbonates": 0.22,
        "sulfates": 0.12,
        "iron_oxides": 0.88,
        "silica_volatiles": 0.30
      },
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.08, 0.10, 0.13, 0.17, 0.12, 0.15, 0.18, 0.14, 0.16]
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": 585},
        {"dist_m": 300, "elev_m": 582},
        {"dist_m": 500, "elev_m": 575},
        {"dist_m": 700, "elev_m": 530},
        {"dist_m": 900, "elev_m": 480},
        {"dist_m": 1100, "elev_m": 462},
        {"dist_m": 1300, "elev_m": 462},
        {"dist_m": 1500, "elev_m": 490},
        {"dist_m": 1700, "elev_m": 545},
        {"dist_m": 1900, "elev_m": 580}
      ],
      "best_match_target": "lunar_lava_tube",
      "secondary_match_target": "mars_volcanic_plains",
      "satellite_provenance": {
        "dem_source": "Copernicus GLO-30 DEM & ALOS PALSAR RTC",
        "multispectral": "NASA ASTER Level 2 Surface Mineralogy & Landsat-9 OLI-2",
        "thermal": "ECOSTRESS Land Surface Temperature",
        "granule_id": "AST_07XT_00305142023053123_20230515"
      },
      "scientific_description": "The only hypervelocity impact crater on Earth excavated entirely in Deccan flood basalt. Preserves pristine shock-metamorphosed plagioclase (maskelynite), shatter cones, impact melt spherules, and steep basaltic rim walls mimicking lunar mare impact craters and young Martian calderas.",
      "logistics_and_testing": {
        "access_viability": "Paved road access from Aurangabad/Jalna (140 km); year-round field operations",
        "suitability_rating": "A",
        "primary_testing_focus": [
          "Steep basalt rim descent and autonomous winch rappelling",
          "Wheel abrasion testing on fractured basalt ejecta blocks",
          "In-situ Raman and XRF detection of shocked basalt minerals",
          "Microwave sintering and ISRU testing of flood basalt regolith"
        ]
      }
    },
    {
      "id": "earth_askja_holuhraun",
      "name": "Askja Caldera & Holuhraun Lava Field (Central Highlands, Iceland)",
      "classification": "Pristine Basaltic Volcanism & Cryo-Interface",
      "coordinates": {
        "lat": 65.0300,
        "lon": -16.7500,
        "country": "Iceland",
        "region": "DyngjufjÃ¶ll Mountains, Central Highlands",
        "elevation_m": 1100
      },
      "environmental_profile": {
        "slope_mean_deg": 12.4,
        "slope_max_deg": 31.0,
        "roughness_tri": 0.76,
        "rock_abundance_pct": 28.0,
        "min_temperature_k": 248.0,
        "max_temperature_k": 288.0,
        "diurnal_delta_k": 16.0,
        "aridity_index": 0.82,
        "permafrost_ice_probability": 0.75,
        "subsurface_ice_wt_pct": 3.8,
        "vegetation_ndvi": 0.01
      },
      "mineralogy": {
        "anorthosite": 0.32,
        "basalt_pyroxene": 0.95,
        "clays_phyllosilicates": 0.08,
        "carbonates": 0.02,
        "sulfates": 0.18,
        "iron_oxides": 0.72,
        "silica_volatiles": 0.45
      },
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.06, 0.08, 0.10, 0.14, 0.10, 0.13, 0.15, 0.12, 0.14]
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": 1150},
        {"dist_m": 800, "elev_m": 1130},
        {"dist_m": 1600, "elev_m": 1110},
        {"dist_m": 2400, "elev_m": 1090},
        {"dist_m": 3200, "elev_m": 1080},
        {"dist_m": 4000, "elev_m": 1065},
        {"dist_m": 4800, "elev_m": 1050}
      ],
      "best_match_target": "mars_volcanic_plains",
      "secondary_match_target": "lunar_south_pole",
      "satellite_provenance": {
        "dem_source": "Copernicus GLO-30 & ArcticDEM 2m",
        "multispectral": "ESA Sentinel-2 MSI & Landsat-8 TIRS",
        "thermal": "MODIS LST Day/Night",
        "granule_id": "S2B_MSIL2A_20240810T123719_N0511_R052_T28WDS"
      },
      "scientific_description": "Massive, unweathered basalt lava sheet (2014-2015 eruption) mantled by pumice and black volcanic glass sand dunes, directly bordering glacial icecaps. NASA Apollo astronauts (Armstrong, Aldrin) historically trained nearby in the 1960s.",
      "logistics_and_testing": {
        "access_viability": "F-Road 4WD track open July-September; high-clearance expedition vehicles required",
        "suitability_rating": "A+",
        "primary_testing_focus": [
          "Rover suspension traverse over jagged pÄhoehoe and 'a'Ä clinker basalt",
          "Visual odometry failure rates over homogeneous black basalt sand",
          "Testing sub-ice radar sounders against volcanic ice-layer boundaries",
          "Simulating Artemis VIPER hazard avoidance on steep crater rims"
        ]
      }
    },
    {
      "id": "earth_lava_beds_california",
      "name": "Lava Beds National Monument & Medicine Lake (California, USA)",
      "classification": "Intact Basaltic Lava Tube Caves",
      "coordinates": {
        "lat": 41.7120,
        "lon": -121.5120,
        "country": "USA",
        "region": "Modoc Plateau / Cascade Volcanic Arc, California",
        "elevation_m": 1420
      },
      "environmental_profile": {
        "slope_mean_deg": 7.8,
        "slope_max_deg": 85.0,
        "roughness_tri": 0.68,
        "rock_abundance_pct": 26.0,
        "min_temperature_k": 265.0,
        "max_temperature_k": 308.0,
        "diurnal_delta_k": 24.0,
        "aridity_index": 0.78,
        "permafrost_ice_probability": 0.15,
        "subsurface_ice_wt_pct": 0.5,
        "vegetation_ndvi": 0.12
      },
      "mineralogy": {
        "anorthosite": 0.22,
        "basalt_pyroxene": 0.96,
        "clays_phyllosilicates": 0.05,
        "carbonates": 0.03,
        "sulfates": 0.08,
        "iron_oxides": 0.62,
        "silica_volatiles": 0.18
      },
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.07, 0.08, 0.11, 0.15, 0.09, 0.12, 0.16, 0.13, 0.14]
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": 1430},
        {"dist_m": 150, "elev_m": 1428},
        {"dist_m": 280, "elev_m": 1425},
        {"dist_m": 300, "elev_m": 1395},
        {"dist_m": 330, "elev_m": 1392},
        {"dist_m": 360, "elev_m": 1394},
        {"dist_m": 380, "elev_m": 1424},
        {"dist_m": 500, "elev_m": 1422}
      ],
      "best_match_target": "lunar_lava_tube",
      "secondary_match_target": "mars_volcanic_plains",
      "satellite_provenance": {
        "dem_source": "USGS 3DEP 1-meter LiDAR DEM",
        "multispectral": "Sentinel-2 MSI & Landsat-9 OLI-2",
        "thermal": "ASTER Thermal Infrared (TIR) Nighttime Cavity Heat Detection",
        "granule_id": "USGS_LPC_CA_MedicineLake_2021"
      },
      "scientific_description": "Over 800 caves and subterranean conduits carved by Pleistocene fluid basalt flows. Contains vertical collapsed skylight chimneys, intact roofs exceeding 10m thickness, natural radiation-shielded microclimates, and perennial subterranean ice deposits.",
      "logistics_and_testing": {
        "access_viability": "Direct highway access, National Park Service research permit infrastructure, developed trailheads",
        "suitability_rating": "A+",
        "primary_testing_focus": [
          "Autonomous 3D LiDAR SLAM mapping without GPS inside pitch-black basalt conduits",
          "Subterranean tethered winch drop testing through 20-30m vertical collapse pits",
          "Mesh-network RF communication repeaters through high-density iron-rich basalt rock",
          "Underground habitat inflatable module pressurization and seal integrity tests"
        ]
      }
    },
    {
      "id": "earth_danakil_depression",
      "name": "Danakil Depression & Dallol Hydrothermal (Afar, Ethiopia)",
      "classification": "Hyper-Acidic Extreme Hydrothermal & Salt Domes",
      "coordinates": {
        "lat": 14.2417,
        "lon": 40.2989,
        "country": "Ethiopia",
        "region": "Afar Triangle, Danakil Rift",
        "elevation_m": -125
      },
      "environmental_profile": {
        "slope_mean_deg": 5.2,
        "slope_max_deg": 18.0,
        "roughness_tri": 0.48,
        "rock_abundance_pct": 14.0,
        "min_temperature_k": 298.0,
        "max_temperature_k": 328.0,
        "diurnal_delta_k": 18.0,
        "aridity_index": 0.99,
        "permafrost_ice_probability": 0.0,
        "subsurface_ice_wt_pct": 0.0,
        "vegetation_ndvi": 0.0
      },
      "mineralogy": {
        "anorthosite": 0.05,
        "basalt_pyroxene": 0.32,
        "clays_phyllosilicates": 0.40,
        "carbonates": 0.45,
        "sulfates": 0.96,
        "iron_oxides": 0.92,
        "silica_volatiles": 0.65
      },
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.14, 0.22, 0.31, 0.38, 0.34, 0.30, 0.28, 0.22, 0.18]
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": -130},
        {"dist_m": 500, "elev_m": -128},
        {"dist_m": 1000, "elev_m": -125},
        {"dist_m": 1500, "elev_m": -120},
        {"dist_m": 2000, "elev_m": -85},
        {"dist_m": 2500, "elev_m": -80},
        {"dist_m": 3000, "elev_m": -110},
        {"dist_m": 3500, "elev_m": -125}
      ],
      "best_match_target": "mars_ancient_lakebed",
      "secondary_match_target": "mars_volcanic_plains",
      "satellite_provenance": {
        "dem_source": "Copernicus GLO-30 DEM",
        "multispectral": "Sentinel-2 MSI (Iron Oxide/Sulfate indices) & ASTER TIR",
        "thermal": "Landsat-8 Thermal Band 10 / ECOSTRESS",
        "granule_id": "S2A_MSIL2A_20240118T073231_N0510_R092_T37PEH"
      },
      "scientific_description": "Lowest subaerial rift on Earth (-125m below sea level). Super-heated brine springs with pH < 0, saturated with iron chloride, elemental sulfur chimneys, potash evaporite deposits, and toxic chlorine/sulfur degassing, mirroring Noachian/Hesperian acid-saline Martian waters.",
      "logistics_and_testing": {
        "access_viability": "Remote desert route from Semera/Mekele; armed security escort required by local protocol; extreme thermal environment",
        "suitability_rating": "B+",
        "primary_testing_focus": [
          "Corrosion-resistance testing of rover materials against hyper-acidic sulfuric brines",
          "Deep-UV and Raman biosignature detection in extreme poly-extreme evaporites",
          "Drill mechanism testing through hydrated iron-sulfate salt crusts",
          "Thermal dissipation performance under 50Â°C+ ambient heat load"
        ]
      }
    },
    {
      "id": "earth_qaidam_basin",
      "name": "Qaidam Basin Yardangs & Saline Playas (Qinghai, China)",
      "classification": "Novel Mars Desert, Wind Yardangs & Evaporite Crusts",
      "coordinates": {
        "lat": 37.8500,
        "lon": 93.4000,
        "country": "China",
        "region": "Qaidam Basin, Tibetan Plateau",
        "elevation_m": 2850
      },
      "environmental_profile": {
        "slope_mean_deg": 8.4,
        "slope_max_deg": 26.0,
        "roughness_tri": 0.58,
        "rock_abundance_pct": 17.5,
        "min_temperature_k": 252.0,
        "max_temperature_k": 302.0,
        "diurnal_delta_k": 28.0,
        "aridity_index": 0.98,
        "permafrost_ice_probability": 0.42,
        "subsurface_ice_wt_pct": 1.5,
        "vegetation_ndvi": 0.01
      },
      "mineralogy": {
        "anorthosite": 0.12,
        "basalt_pyroxene": 0.48,
        "clays_phyllosilicates": 0.76,
        "carbonates": 0.68,
        "sulfates": 0.85,
        "iron_oxides": 0.65,
        "silica_volatiles": 0.55
      },
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.13, 0.17, 0.25, 0.33, 0.29, 0.27, 0.25, 0.20, 0.17]
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": 2850},
        {"dist_m": 600, "elev_m": 2865},
        {"dist_m": 1200, "elev_m": 2885},
        {"dist_m": 1800, "elev_m": 2855},
        {"dist_m": 2400, "elev_m": 2840},
        {"dist_m": 3000, "elev_m": 2870},
        {"dist_m": 3600, "elev_m": 2880},
        {"dist_m": 4200, "elev_m": 2850}
      ],
      "best_match_target": "mars_ancient_lakebed",
      "secondary_match_target": "mars_volcanic_plains",
      "satellite_provenance": {
        "dem_source": "Copernicus GLO-30 & TanDEM-X",
        "multispectral": "Sentinel-2 MSI Clay/Mineral Absorption bands",
        "thermal": "MODIS LST Day/Night Difference",
        "granule_id": "S2B_MSIL2A_20240920T034549_N0511_R061_T46SEF"
      },
      "scientific_description": "Hyper-arid, high-elevation endorheic basin filled with colossal wind-carved yardang ridges, desiccated smectite clay mudstones, bedded halite-gypsum deposits, and polygonal desiccation cracks closely mimicking Gale and Jezero crater floor morphology.",
      "logistics_and_testing": {
        "access_viability": "Accessible from Golmud or Da Qaidam via National Highway G315; vast unpopulated testing ranges",
        "suitability_rating": "A",
        "primary_testing_focus": [
          "Autonomous rover navigation through maze-like wind yardang corridors",
          "Wheel slippage and sinkage testing in desiccated saline silt deposits",
          "Core drill sampling of stratified clay and sulfate layers",
          "Dust devil tracking and aerodynamic wind erosion modeling"
        ]
      }
    },
    {
      "id": "earth_alvord_desert",
      "name": "Alvord Desert & Steens Mountain Basalt (Oregon, USA)",
      "classification": "Basaltic Graben & Dry Playa",
      "coordinates": {
        "lat": 42.5367,
        "lon": -118.4567,
        "country": "USA",
        "region": "Harney County, Southeastern Oregon",
        "elevation_m": 1222
      },
      "environmental_profile": {
        "slope_mean_deg": 4.1,
        "slope_max_deg": 16.5,
        "roughness_tri": 0.44,
        "rock_abundance_pct": 11.5,
        "min_temperature_k": 260.0,
        "max_temperature_k": 310.0,
        "diurnal_delta_k": 26.0,
        "aridity_index": 0.91,
        "permafrost_ice_probability": 0.10,
        "subsurface_ice_wt_pct": 0.2,
        "vegetation_ndvi": 0.02
      },
      "mineralogy": {
        "anorthosite": 0.18,
        "basalt_pyroxene": 0.88,
        "clays_phyllosilicates": 0.32,
        "carbonates": 0.15,
        "sulfates": 0.42,
        "iron_oxides": 0.74,
        "silica_volatiles": 0.35
      },
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.10, 0.13, 0.22, 0.30, 0.28, 0.26, 0.24, 0.19, 0.20]
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": 1224},
        {"dist_m": 1000, "elev_m": 1223},
        {"dist_m": 2000, "elev_m": 1222},
        {"dist_m": 3000, "elev_m": 1221},
        {"dist_m": 4000, "elev_m": 1222},
        {"dist_m": 5000, "elev_m": 1223}
      ],
      "best_match_target": "mars_volcanic_plains",
      "secondary_match_target": "mars_ancient_lakebed",
      "satellite_provenance": {
        "dem_source": "USGS 3DEP 10m DEM",
        "multispectral": "Sentinel-2 MSI & Landsat-9 OLI-2",
        "thermal": "ASTER TIR Day/Night",
        "granule_id": "USGS_10M_OR_Harney_2020"
      },
      "scientific_description": "Extremely flat, 160 sq km dry alkali playa basin bounded by a 1,500m fault scarp exposing over 60 stacked Miocene flood basalt flows. Features hot springs, borate deposits, and fine-grained silt crusts mimicking flat Martian volcanic plains mantled by dust.",
      "logistics_and_testing": {
        "access_viability": "Fields-Denio road access, BLM public lands; ideal for high-speed rover traverse testing",
        "suitability_rating": "A",
        "primary_testing_focus": [
          "High-speed long-range autonomous rover dead-reckoning and visual SLAM",
          "Radio frequency LOS/NLOS propagation against steep basalt fault cliffs",
          "Solar panel dust clearing wiper testing and electrostatic repulsion",
          "Deployable landing pad anchor pull-out resistance testing"
        ]
      }
    },
    {
      "id": "earth_atacama_pajonales",
      "name": "Salar de Pajonales & Domeyko Basin (Antofagasta, Chile)",
      "classification": "High-Altitude Hyper-Arid Benchmark",
      "coordinates": {
        "lat": -25.1380,
        "lon": -68.8280,
        "country": "Chile",
        "region": "Atacama Altiplano, Antofagasta",
        "elevation_m": 3530
      },
      "environmental_profile": {
        "slope_mean_deg": 6.2,
        "slope_max_deg": 22.0,
        "roughness_tri": 0.54,
        "rock_abundance_pct": 19.0,
        "min_temperature_k": 268.0,
        "max_temperature_k": 298.0,
        "diurnal_delta_k": 25.0,
        "aridity_index": 0.99,
        "permafrost_ice_probability": 0.20,
        "subsurface_ice_wt_pct": 0.4,
        "vegetation_ndvi": 0.0
      },
      "mineralogy": {
        "anorthosite": 0.08,
        "basalt_pyroxene": 0.45,
        "clays_phyllosilicates": 0.82,
        "carbonates": 0.74,
        "sulfates": 0.95,
        "iron_oxides": 0.68,
        "silica_volatiles": 0.62
      },
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.12, 0.17, 0.26, 0.34, 0.31, 0.29, 0.26, 0.18, 0.16]
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": 3540},
        {"dist_m": 800, "elev_m": 3535},
        {"dist_m": 1600, "elev_m": 3530},
        {"dist_m": 2400, "elev_m": 3528},
        {"dist_m": 3200, "elev_m": 3532},
        {"dist_m": 4000, "elev_m": 3538}
      ],
      "best_match_target": "mars_ancient_lakebed",
      "secondary_match_target": "mars_volcanic_plains",
      "satellite_provenance": {
        "dem_source": "Copernicus GLO-30 & SRTM 1-ArcSec",
        "multispectral": "Sentinel-2 MSI & ASTER Mineral Indices",
        "thermal": "MODIS LST Day/Night",
        "granule_id": "S2B_MSIL2A_20240312T143749_N0510_R096_T19JCK"
      },
      "scientific_description": "Hyper-arid high-altitude salar characterized by massive gypsum crusts, inverted stream channels, and subterranean endolithic cyanobacterial micro-niches protected inside translucent halite/gypsum minerals, mirroring late Hesperian Martian lakebeds.",
      "logistics_and_testing": {
        "access_viability": "Remote 4WD track from San Pedro de Atacama or Antofagasta; high-altitude acclimatization needed",
        "suitability_rating": "A+",
        "primary_testing_focus": [
          "Subsurface endolithic biosignature identification with fluorescence spectroscopy",
          "Rover coring drill operations inside brittle, interlocking gypsum crusts",
          "Wheel slip modeling in powdery beneath-crust efflorescent salt",
          "Automated sample caching and hermetic seal verification under vacuum-like dryness"
        ]
      }
    },
    {
      "id": "earth_haughton_crater",
      "name": "Haughton Impact Crater (Devon Island, Nunavut, Canada)",
      "classification": "Polar Impact & Arctic Regolith Benchmark",
      "coordinates": {
        "lat": 75.3833,
        "lon": -89.6833,
        "country": "Canada",
        "region": "Devon Island, Qikiqtaaluk, Nunavut",
        "elevation_m": 220
      },
      "environmental_profile": {
        "slope_mean_deg": 13.5,
        "slope_max_deg": 30.0,
        "roughness_tri": 0.70,
        "rock_abundance_pct": 21.0,
        "min_temperature_k": 223.0,
        "max_temperature_k": 283.0,
        "diurnal_delta_k": 12.0,
        "aridity_index": 0.89,
        "permafrost_ice_probability": 0.95,
        "subsurface_ice_wt_pct": 5.2,
        "vegetation_ndvi": 0.01
      },
      "mineralogy": {
        "anorthosite": 0.40,
        "basalt_pyroxene": 0.35,
        "clays_phyllosilicates": 0.25,
        "carbonates": 0.75,
        "sulfates": 0.45,
        "iron_oxides": 0.40,
        "silica_volatiles": 0.65
      },
      "spectral_bands": {
        "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
        "reflectance": [0.10, 0.12, 0.15, 0.18, 0.16, 0.19, 0.22, 0.18, 0.21]
      },
      "elevation_profile": [
        {"dist_m": 0, "elev_m": 260},
        {"dist_m": 1000, "elev_m": 240},
        {"dist_m": 2000, "elev_m": 190},
        {"dist_m": 3000, "elev_m": 170},
        {"dist_m": 4000, "elev_m": 165},
        {"dist_m": 5000, "elev_m": 210}
      ],
      "best_match_target": "lunar_south_pole",
      "secondary_match_target": "mars_ancient_lakebed",
      "satellite_provenance": {
        "dem_source": "ArcticDEM 2m Strip DEM",
        "multispectral": "Sentinel-2 MSI & Landsat-8 OLI",
        "thermal": "MODIS LST Day/Night Polar Orbit",
        "granule_id": "S2A_MSIL2A_20240722T172901_N0510_R112_T15XWL"
      },
      "scientific_description": "23-km diameter meteorite impact crater in a polar desert. Features shatter cones, deep impact breccia deposits, continuous permafrost ice-wedges, hydrothermally altered carbonate-sulfate deposits, and extreme Arctic freeze-thaw cycles.",
      "logistics_and_testing": {
        "access_viability": "Remote charter flight via Resolute Bay; Flashline Mars Arctic Research Station (FMARS) infrastructure",
        "suitability_rating": "A",
        "primary_testing_focus": [
          "Human spacesuit mobility and ergonomics in extreme cold weather",
          "Rover drivetrain cold-soak and low-temperature battery performance",
          "Permafrost ice-core drilling in shattered limestone-dolomite breccia",
          "Thermal model validation of polar shadowed impact valleys"
        ]
      }
    }
  ]
}).candidate_analogs,
  spectral_library: ({
  "spectral_library": [
    {
      "name": "Anorthosite (Lunar Highlands Endmember)",
      "formula": "CaAl2Si2O8 (Bytownite/Anorthite)",
      "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
      "reflectance": [0.35, 0.42, 0.48, 0.55, 0.46, 0.58, 0.64, 0.59, 0.54],
      "diagnostic_features": "Broad Fe2+ substitution absorption band centered around 1.25 um, rising slope toward SWIR"
    },
    {
      "name": "Tholeiitic Basalt (Lunar Mare / Martian Plains)",
      "formula": "Clinopyroxene + Ca-Plagioclase + Titanomagnetite",
      "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
      "reflectance": [0.06, 0.08, 0.10, 0.14, 0.09, 0.12, 0.15, 0.11, 0.13],
      "diagnostic_features": "Characteristic dual Fe2+ pyroxene absorption minima near 1.05 um and 2.05 um"
    },
    {
      "name": "Nontronite Clay (Smectite / Jezero Delta)",
      "formula": "Fe2[Si4O10](OH)2Â·nH2O",
      "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
      "reflectance": [0.12, 0.18, 0.28, 0.38, 0.36, 0.34, 0.29, 0.22, 0.15],
      "diagnostic_features": "Strong metal-OH overtone at 1.41 um, H2O bend/stretch combination at 1.91 um, diagnostic Fe-OH doublet near 2.29-2.35 um"
    },
    {
      "name": "Gypsum (Hydrated Sulfate)",
      "formula": "CaSO4Â·2H2O",
      "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
      "reflectance": [0.72, 0.78, 0.82, 0.85, 0.81, 0.76, 0.62, 0.35, 0.28],
      "diagnostic_features": "Sharp, deep H2O vibrational absorptions at 1.45 um and 1.94 um, strong drop-off at 2.22 um"
    },
    {
      "name": "Water Ice (Cryogenic Crystalline)",
      "formula": "H2O (Hexagonal / Amorphous)",
      "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
      "reflectance": [0.85, 0.86, 0.84, 0.79, 0.68, 0.45, 0.18, 0.06, 0.04],
      "diagnostic_features": "Extreme absorption troughs at 1.50 um and 2.02 um; high VIS albedo rapidly crashing into zero NIR/SWIR reflectance"
    },
    {
      "name": "Hematite (Ferric Iron Oxide)",
      "formula": "alpha-Fe2O3",
      "bands_um": [0.45, 0.55, 0.65, 0.85, 1.05, 1.25, 1.65, 2.05, 2.35],
      "reflectance": [0.07, 0.14, 0.29, 0.36, 0.33, 0.32, 0.31, 0.29, 0.28],
      "diagnostic_features": "Steep ferric absorption edge from UV to 0.55 um, crystal field 6A1 -> 4T1G absorption minimum at 0.86 um"
    }
  ]
}).spectral_library,
  presets: ({
  "presets": [
    {
      "id": "balanced",
      "name": "Balanced Scientific Assessment",
      "description": "Equal distribution across terrain morphology, mineral spectroscopy, climate, and roughness.",
      "weights": {
        "topography": 0.25,
        "mineralogy": 0.25,
        "temperature": 0.25,
        "roughness": 0.25
      }
    },
    {
      "id": "rover_mobility",
      "name": "Rover Mobility & Chassis Traction",
      "description": "Prioritizes slope gradients, terrain ruggedness, and rock size abundance over chemical composition.",
      "weights": {
        "topography": 0.40,
        "mineralogy": 0.10,
        "temperature": 0.15,
        "roughness": 0.35
      }
    },
    {
      "id": "ice_prospecting",
      "name": "Cryogenic Volatiles & Ice Prospecting",
      "description": "Emphasizes cryogenic temperatures, permafrost probability, and volatile/silica absorption features.",
      "weights": {
        "topography": 0.15,
        "mineralogy": 0.30,
        "temperature": 0.45,
        "roughness": 0.10
      }
    },
    {
      "id": "biosignatures",
      "name": "Astrobiology & Biosignature Preservation",
      "description": "Highlights clay mudstone matrices, carbonate/sulfate evaporites, and dry lakebed sediments.",
      "weights": {
        "topography": 0.10,
        "mineralogy": 0.55,
        "temperature": 0.15,
        "roughness": 0.20
      }
    },
    {
      "id": "lava_tube_spelunking",
      "name": "Lava Tube Cave & Structural Habitat",
      "description": "Focuses on intact basalt flows, vertical cliff skylights, and cavern thermal stability.",
      "weights": {
        "topography": 0.35,
        "mineralogy": 0.35,
        "temperature": 0.10,
        "roughness": 0.20
      }
    },
    {
      "id": "isru_sintering",
      "name": "ISRU Basalt Sintering & Dust Mitigation",
      "description": "Prioritizes high iron/titanium flood basalt, fine-grained dust abrasiveness, and thermal diurnal cycling.",
      "weights": {
        "topography": 0.15,
        "mineralogy": 0.45,
        "temperature": 0.25,
        "roughness": 0.15
      }
    }
  ]
}).presets
};
