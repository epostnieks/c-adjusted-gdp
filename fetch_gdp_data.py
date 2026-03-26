#!/usr/bin/env python3
"""
Fetch GDP-by-sector data from World Bank API.
Run locally: python fetch_gdp_data.py > gdp_data.json

Outputs JSON with GDP by sector for all countries, ready for the React app.
"""

import json
import requests
import sys

# World Bank indicators for GDP by sector (value added, current USD)
INDICATORS = {
    "agriculture":    "NV.AGR.TOTL.CD",   # Agriculture, forestry, fishing value added
    "industry":       "NV.IND.TOTL.CD",   # Industry (incl. construction) value added
    "manufacturing":  "NV.IND.MANF.CD",   # Manufacturing value added
    "services":       "NV.SRV.TOTL.CD",   # Services value added
    "total_gdp":      "NY.GDP.MKTP.CD",   # GDP current USD
}

# Additional indicators for finer sector breakdown
FINE_INDICATORS = {
    "mining_rents":       "NY.GDP.MINR.RT.ZS",  # Mineral rents (% of GDP)
    "oil_rents":          "NY.GDP.PETR.RT.ZS",  # Oil rents (% of GDP)
    "gas_rents":          "NY.GDP.NGAS.RT.ZS",  # Natural gas rents (% of GDP)
    "coal_rents":         "NY.GDP.COAL.RT.ZS",  # Coal rents (% of GDP)
    "forest_rents":       "NY.GDP.FRST.RT.ZS",  # Forest rents (% of GDP)
    "military_pct":       "MS.MIL.XPND.GD.ZS",  # Military expenditure (% of GDP)
    "health_expenditure": "SH.XPD.CHEX.GD.ZS",  # Current health expenditure (% of GDP)
    "insurance_pct":      "NV.FSR.TOTL.CD",      # Financial sector value added (proxy)
}

YEARS = "2020:2024"
BASE_URL = "https://api.worldbank.org/v2"


def fetch_indicator(indicator_id, years=YEARS):
    """Fetch one indicator for all countries."""
    url = f"{BASE_URL}/country/all/indicator/{indicator_id}"
    params = {
        "format": "json",
        "per_page": 20000,
        "date": years,
    }
    
    resp = requests.get(url, params=params)
    resp.raise_for_status()
    data = resp.json()
    
    if len(data) < 2:
        return {}
    
    results = {}
    for entry in data[1]:
        country = entry["country"]["id"]
        country_name = entry["country"]["value"]
        year = entry["date"]
        value = entry["value"]
        
        if country not in results:
            results[country] = {"name": country_name, "years": {}}
        if value is not None:
            results[country]["years"][year] = value
    
    return results


def fetch_all():
    """Fetch all indicators and combine."""
    print("Fetching GDP data from World Bank API...", file=sys.stderr)
    
    all_data = {}
    
    for name, indicator_id in {**INDICATORS, **FINE_INDICATORS}.items():
        print(f"  Fetching {name} ({indicator_id})...", file=sys.stderr)
        try:
            data = fetch_indicator(indicator_id)
            for country_code, country_data in data.items():
                if country_code not in all_data:
                    all_data[country_code] = {
                        "name": country_data["name"],
                        "sectors": {}
                    }
                # Use most recent year with data
                years = country_data["years"]
                if years:
                    most_recent = max(years.keys())
                    all_data[country_code]["sectors"][name] = {
                        "value": years[most_recent],
                        "year": most_recent,
                        "indicator": indicator_id
                    }
        except Exception as e:
            print(f"  ERROR: {name}: {e}", file=sys.stderr)
    
    # Filter to countries with total GDP
    filtered = {
        code: data for code, data in all_data.items()
        if "total_gdp" in data.get("sectors", {})
    }
    
    print(f"\nFetched data for {len(filtered)} countries", file=sys.stderr)
    
    # Output JSON
    output = {
        "metadata": {
            "source": "World Bank World Development Indicators",
            "fetched": "2026",
            "indicators": {**INDICATORS, **FINE_INDICATORS}
        },
        "countries": filtered
    }
    
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    fetch_all()
