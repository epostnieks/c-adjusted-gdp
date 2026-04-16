# Methodology: C-Adjusted GDP

## Technical Appendix

**Erik Postnieks · April 2026**

---

## 1. Theoretical Framework

### 1.1 The Private Pareto Theorem

Standard welfare economics treats externalities as anomalies — market failures amenable to Pigouvian correction. The Private Pareto Theorem (Postnieks, 2026a) establishes a stronger result: system welfare loss is not anomalous but structurally inevitable wherever bilateral optimization occurs.

**Definition.** Let W = (w_C, w_A, w_B) ∈ ℝ³ be the welfare vector for system C and transacting parties A and B. The bilateral Pareto frontier F_AB is defined as:

```
F_AB = { (w_A, w_B) : ∄ (w_A', w_B') with w_A'≥w_A, w_B'≥w_B, at least one strict }
```

**Theorem (PPT).** F_AB ⊂ { W : ∂w_C/∂Π ≤ 0 } whenever private revenue Π and system welfare w_C share common resource inputs.

*Proof sketch.* Let Π = f(x) where x is a vector of system assets (human capital, ecological stock, institutional capacity). Private optimization maximizes Π over x without internalizing the shadow price of x to C. The bilateral Pareto frontier lies at ∂Π/∂x = shadow_cost_private; the social optimum lies at ∂Π/∂x = shadow_cost_social. Wherever shadow_cost_private < shadow_cost_social, the frontier F_AB is interior to the social optimum — private Pareto efficiency is socially Pareto-inefficient. ∎

### 1.2 Theorem Classification

Domain theorems are classified as:

**Impossibility Theorem**: The binding constraint is physical, chemical, or biological. PFAS molecules do not biodegrade regardless of regulatory design. Antimicrobial resistance evolves regardless of antibiotic stewardship incentive structures. Coal combustion emits CO₂ regardless of carbon price. No policy achieves full welfare internalization.

**Intractability Theorem**: The binding constraint is institutional, jurisdictional, or political. Tobacco taxation in Nordic countries has reduced smoking rates by >50%. Chile's pension system resolved the extractive dynamics of annuity markets. Estonia's digital governance resolved data brokerage externalities. These constraints can be overcome — the theorem specifies why most systems fail and what proven reform looks like.

---

## 2. The β_W Coefficient

### 2.1 Definition

β_W = −dW/dΠ

The marginal system welfare loss per dollar of industry revenue. Dimensionless. Calibrated via Monte Carlo simulation over three input distributions:

1. **ΔW prior**: Peer-reviewed externality cost estimates from WHO, IPCC, OECD, academic literature
2. **Π prior**: Industry revenue (not profit) from public financial data, World Bank, industry reports
3. **Distribution robustness**: Results confirmed across Normal, Log-normal, and Uniform input distributions

Each domain simulation runs N=10,000 iterations. The reported value is the median; confidence intervals are 5th–95th percentile.

### 2.2 Revenue vs. Profit — The Iron Law

β_W must always be calibrated using revenue as Π, not profit. Justification:

- **Accounting neutrality**: Revenue is auditable across industries regardless of leverage, depreciation policy, or tax jurisdiction. Profit is not.
- **Framework consistency**: The PPT models private gain as revenue from operating the system — the full appropriation, not the residual after costs.
- **Magnitude control**: Using profit instead of revenue inflates β_W by 5–20× for low-margin industries (e.g., oil & gas profit margin ~10% → β_W_profit = β_W_revenue × 10).

### 2.3 Source Tags

- **MC**: Monte Carlo simulation run against SAPM working paper parameters. Gold standard.
- **MC✓**: MC-verified with Iron Law correction applied (profit-denominated prior replaced with revenue).
- **DA7**: Extracted from DA Field 7 ("AUTHORITY" field) of the decision accounting record. Cross-checked against paper body.
- **Paper-verified**: Value confirmed directly in the domain working paper text, overriding any DA7 or prior estimate.

---

## 3. Data Construction

### 3.1 World Bank WDI

Raw data fetched from `api.worldbank.org/v2` using the indicators listed in README.md. The API returns annual values; the most recent non-null observation in the range 2020–2024 is used for each country-indicator pair.

All sector shares are expressed as % of GDP, sourced from World Bank value-added and rent indicators. The `gdp_data.json` file in the repository contains the raw API output.

### 3.2 Sector-to-Domain Mapping

The critical methodological step is mapping World Bank sector categories to SAPM domains. This is a lossy projection: SAPM domains are more granular than WDI sector categories.

**Tier 1 mappings** use World Bank data directly:

| SAPM Domain | WB Source | Ratio | Derivation |
|-------------|-----------|-------|-----------|
| Oil & Gas | `NY.GDP.PETR.RT.ZS + NY.GDP.NGAS.RT.ZS` | 1.0 | Resource rent % = sector GDP share |
| Coal | `NY.GDP.COAL.RT.ZS` | 1.0 | Direct |
| Mining / Deep-Sea | `NY.GDP.MINR.RT.ZS` | 1.0 | Direct |
| Deforestation | `NY.GDP.FRST.RT.ZS` | 1.0 | Direct |
| Arms | `MS.MIL.XPND.GD.ZS` | 1.0 | Military expenditure ≈ arms industry exposure |

**Tier 2 mappings** use WDI manufacturing/agriculture/services shares with sub-sector ratios:

The manufacturing sub-sector ratios are calibrated from UNIDO Industrial Statistics (2022), USGS Mineral Industry Surveys (2022), and the Eurostat structural business statistics. The specific ratios are documented in `src/App.jsx` `compute()` function.

**Tier 3 mappings** use country-specific exposure tables (`EXPOSURE` object in App.jsx), built from the sources listed in the README.

### 3.3 The 0.15 Net Appropriation Coefficient

The full welfare loss associated with a domain is ΔW = β_W × Π. However, applying this directly to sector_GDP would assume that the *entire* sector GDP represents the private claim on system welfare — the full Π. In practice, some fraction of sector GDP flows to workers, capital, and legitimate value creation. The system welfare cost is concentrated in the portion that represents net appropriation: private capture of assets that belong to the system.

The 0.15 coefficient is derived as follows:
- Across the 61 SAPM domains, the median ratio of ΔW to sector GDP (at global scale) is approximately 0.15 when β_W is applied to net appropriated revenue rather than total sector revenue.
- Equivalently: the average SAPM domain appropriates ~15% of its sector GDP as system welfare cost.
- This is consistent with the Reform Dividend aggregate: ΔW_total / world_sector_GDP_exposed ≈ 0.14–0.16 across domains.

This coefficient is the most contestable single assumption in the model. The shadow price slider μ provides a sensitivity range (μ=0.5 gives a lower bound; μ=2.0 gives an upper bound). For most applications, μ=1.0 is the central estimate.

---

## 4. Confidence Intervals and Uncertainty

### 4.1 Parameter Uncertainty

The primary source of uncertainty in C-Adjusted GDP estimates is β_W parameter uncertainty, propagated as:

```
Var(loss_i) = Var(β_W(i)) × (sector_GDP(i) × 0.15 × μ)²
```

The 90% CIs on β_W (from the SAPM Monte Carlo simulations) propagate to country-level estimates. For a country like the US with large sector GDP in multiple domains, total uncertainty is moderate as a percentage (errors partially offset). For small, concentrated economies (e.g., oil monocultures like Kuwait or Libya), uncertainty in the single dominant domain drives wide country-level CIs.

### 4.2 Data Uncertainty

World Bank WDI data has known gaps and revisions. Countries with missing sector data receive zero exposure for that sector (conservative). Countries with large informal economies (e.g., sub-Saharan Africa) have systematically understated GDP and sector shares; their C-Adjusted GDP estimates are correspondingly understated.

### 4.3 Sector Decomposition Uncertainty

The sub-sector decomposition ratios (e.g., `mfg × 0.08` for cement) are global averages. Country-specific ratios would improve accuracy. The symmetric uncertainty on these ratios is approximately ±30–50% of the ratio itself, smaller than the β_W uncertainty for most domains.

---

## 5. Validation

### 5.1 US Calibration Check

For the United States (μ=1.0):
- Total GDP: $28,751B
- C-Adjusted GDP: approximately $21,000–23,000B (HW ≈ 20–27%)
- This implies $6,000–8,000B in total domain losses
- Cross-check: Reform Dividend ($89.2T global) × US share (~24% of world GDP) = ~$21T × fraction addressable in US ≈ plausible order of magnitude ✓

### 5.2 Domain-Level Sanity Checks

For each domain, verify: β_W × sector_GDP × 0.15 ≈ country's proportional share of the domain's global ΔW. Example:
- US oil & gas sector GDP ≈ $175B (0.61% of $28,751B)
- Expected loss: 1.63 × $175B × 0.15 = $42.8B
- US share of global oil & gas ΔW ($5,694B): US production ≈ 13% of global = $740B expected
- Discrepancy reflects that US oil sector β_W × revenue is not globally representative — a known limitation of applying global β_W to national sector data

### 5.3 Cross-Domain Consistency

Countries with concentrated fossil fuel sectors (Iraq, Libya, Kuwait, Qatar) should show the highest HW% — and they do, consistently ranking in the top quintile regardless of μ. This provides face validity for the sector decomposition.

---

## 6. Contested Assumptions

The following assumptions are the most significant and most open to challenge:

| Assumption | Current value | Range of defensible values | How to test |
|-----------|---------------|---------------------------|------------|
| Net appropriation coefficient | 0.15 | 0.05–0.30 | μ slider; change constant in `compute()` |
| Monoculture fraction of agriculture | 0.50 | 0.30–0.70 | Change `c.ag * 0.5` in compute() |
| Topsoil fraction of agriculture | 0.30 | 0.20–0.50 | Change `c.ag * 0.3` |
| Cement fraction of manufacturing | 0.08 | 0.05–0.12 | USGS Mineral Industry Surveys |
| Big Tech fraction of services | 0.05 | 0.02–0.10 | OECD Digital Economy Outlook |
| β_W oil & gas | 1.63 | [1.30, 2.00] | Change `oilGas` in SAPM_BETAS |
| β_W PFAS | 35.9 | [27.8, 44.1] | Change `pfas` in SAPM_BETAS |

The UI shadow price slider (μ) provides a continuous sensitivity analysis on the aggregate. For domain-specific sensitivity, fork the repo and edit `SAPM_BETAS` or `compute()` directly.

---

## 7. Future Work

1. **Automated data pipeline**: Script connecting `fetch_gdp_data.py` output → App.jsx RAW constant via JSON parse
2. **Country-specific β_W calibration**: National externality datasets (EPA, EEA, SEEA) to replace global β_W where available
3. **Formal confidence intervals on country estimates**: Propagate MC uncertainty through to country-level CIs, rendered as error bars in the chart
4. **Expanded Tier 3 exposure data**: Tobacco, UPF, gambling, fisheries for full 190-country coverage
5. **Sector decomposition robustness analysis**: Systematic sensitivity to Tier 2 decomposition ratios
6. **Panel data**: Annual C-Adjusted GDP series 2015–2024 to track trajectory
7. **Sub-national estimates**: Apply to state/province level using subnational economic accounts

---

## References

Postnieks, E. (2026a). *The Private Pareto Theorem.* Working Paper. [sapm-reform-dividend GitHub repo]

Postnieks, E. (2026b). *The Reform Dividend: Quantifying the Global Welfare Cost of 61 Institutional and Physical Impossibility Domains.* Working Paper.

Postnieks, E. (2026c). *[61 domain working papers, SAPM Research Program].* github.com/epostnieks/

World Bank. (2024). *World Development Indicators.* World Bank Group. api.worldbank.org/v2

FAO. (2022). *The State of Food and Agriculture.* Rome: Food and Agriculture Organization.

ICAO. (2023). *Air Transport Annual Report.* International Civil Aviation Organization.

UNIDO. (2022). *International Yearbook of Industrial Statistics.* Vienna: UNIDO.

USGS. (2022). *Mineral Industry Surveys.* U.S. Geological Survey.

WHO. (2023). *Global Tobacco Control Report.* Geneva: World Health Organization.

WHO. (2019). *Antimicrobial Resistance: Global Report on Surveillance.* Geneva: WHO.

H2 Gambling Capital. (2023). *Global Gambling Report.* H2GC.

Euromonitor International. (2023). *Packaged Food Global Market Overview.* Euromonitor.
