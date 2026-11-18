# QuantsMind Website v2.0.1 — Completion Report

**Date:** 2026-11-18
**Repository:** https://github.com/ajit-ai/quantsmind-web
**Baseline:** WQ-021 reconciliation report (`docs/website-v2.1/QUANTSMIND_WEBSITE_CHANGE_RECONCILIATION.md`)
**Target release:** Website v2.0.1
**Distribution model:** branch `release/v2.0.1` → PR into `main` → GitHub Pages deployment on merge

## 1. Changes implemented

### 1.1 Product registry (`src/app/content/products/product.registry.ts`)
- Quantum Mission applications (`quantum-studio` … `quantum-verify`): `maturity: 'released'` → `'proposed'`; `availability: 'general-availability'` → `'not-available'`.
- `Karkain`: `developer-preview` / `v1.1.0` → `released` / `public-download` / `v1.2.0` / `Stable`; description/capabilities/tags/limitations updated to the actual v1.2.0 state (native ELF / PE / Mach-O targets with no C toolchain; C23 for host toolchains; honest native qualified-subset refusals; no independent perf/reliability assessment).
- `MicroQuantum`: unchanged — `released` / GA / `v1.1.0` (verified on PyPI and GitHub).
- `QuantsMind SDK`: unchanged — developer-preview / `v1.1.0` (retained pending newer evidence; PyPI is 1.1.0).
- `qubit-sim` related service corrected: `scientific-computing` → `quantum-computing`.
- Registry descriptions for the ten Quantum Mission apps were already evidence-accurate; only structured maturity/availability fields changed.

### 1.2 Verified directory entries (`src/app/content/products/directory-entries.ts`)
- `Karkain Compiler & Toolchain`: `Developer Preview` / `v1.1.0` → `Stable` / `v1.2.0`; added repository/distribution fields; evidence now cites the v1.2.0 locally-built Stable release.
- `Karkain Language Tool (VS Code Extension)`: now `Released` / `v1.0.0`; distribution **Open VSX (karkain.karkain)**; evidence cites Open VSX (verified, 124 downloads, 2026-11-14) and GitHub release v1.0.0; removed the incorrect Microsoft Marketplace attribution.
- `Taksh (QuantsMind-LLM)`: `Research Prototype · No validated release` → `Research Release` / `v1.0.0`; Apache-2.0; evidence = Taksh v1.0.0 source release (2026-10-21); honest negative result; not a model-weights release.
- `QuantsMind AI Coder (VS Code Extension)`: `Alpha` → `Preview` / `v3.1.x`; distribution now cites **both** Open VSX (`quantsmind.quantsmind-vscode-ai-coder` v3.1.0, preview, 202 downloads, 2026-11-13) and Microsoft VS Marketplace (v3.1.1, 2 installs); repository = `Quantsmind/QuantsMind-VSCode-AI-Coder`; GitHub release v3.1.1.
- `QuantsMind-Agent`: `Alpha` / `v0.2.0 (in-repository, unreleased)` → `Alpha` / `v0.9.0`; evidence = public release v0.9.0 "Workspace Intelligence" (GitHub, 2026-10-20).
- `Vsector`, `GuardMCP`, `Quantsmind Relational DB`, `QuantsMind SDK` directory entries unchanged.

### 1.3 Technology ecosystem (`src/app/pages/technology/technology.component.ts`)
- `Karkain` primary card: `Stable` / `v1.2.0` / `stable`; purpose now describes the self-hosted v1.2.0 native targets (ELF/PE/Mach-O, no C toolchain) + C23; capabilities list updated; release link → `v1.2.0`.
- `QuantsMind-Agent` card: `Alpha · v0.9.0` / `v0.9.0`; added public repository and release link (`v0.9.0`); description updated (workspace snapshots, multi-language project detection, Windows/Linux supported, macOS planned, BSD blocked).
- `Taksh (QuantsMind-LLM)` card: `Research Release` / `v1.0.0`; repository and release link (`v1.0.0`); description updated to honest negative-result framing; no claim of model capability.
- Catalog maturity list updated (Taksh, Agent, Stable Karkain).
- Hero badge simplified ("verified releases").

### 1.4 Karkain page (`src/app/pages/karkain/karkain.component.ts`)
- Hero: badge `Developer Preview` → `Stable`; "v1.2.0" remains; lead paragraph updated to v1.2.0 native-target reality (ELF/PE/Mach-O, no C/Go on PATH, alongside C23) instead of "to C23 and delegate".
- "Compiler" detail card, qualification rows and pipeline copy updated to native targets; status variant `experimental` → `stable`.
- Status table expanded with an explicit "Native targets (ELF/PE/Mach-O) · Karkain 1.2" row carrying honest limits (refused by name: floats, for..in, map literals, string equality/slicing, string literals in branches/callees, non-integer array elements).
- All stale `v1.1.0` references replaced with `v1.2.0`; stale "Published ·" labels → `Stable ·`.
- Honestly states v1.2.0 was a locally built release and the CI release matrix could not run.

### 1.5 Homepage
- `Karkain` technology tile: `Stable` / `v1.2.0` / `stable`; description updated (native ELF/PE/Mach-O, no C toolchain in PATH).
- Technology marquee: "Microsoft Visual Studio Marketplace (itemName=Karkain.karkain)" → **Open VSX** (verified listing `open-vsx.org/extension/karkain/karkain`).

### 1.6 Labs and article pages
- Labs connections updated (Karkain → `Stable · v1.2.0` / `stable`; MicroQuantum, SDK unchanged).
- `karkain.article.ts`: maturity → `Stable · v1.2.0 published` / `stable`; update note added in intro.
- `quantsmind-agent.article.ts`: maturity → `Alpha · v0.9.0 released` / `prototype`; update note and "Maturity and limitations" card updated (public release v0.9.0 Workspace Intelligence, 2026-10-20).
- `quantsmind-llm.article.ts`: maturity → `Research Release · v1.0.0 published` / `research`; update note and maturity card updated (Taksh v1.0.0, 2026-10-21).

### 1.7 Services and maturity terminology
- Verified no lingering statements presenting Quantum Mission as released/GA; the registry is now uniformly `proposed` / `not-available`; badges flow from registry.
- `qubit-sim` service link corrected.

### 1.8 Products page (`src/app/pages/products/products.component.ts`)
- "Intelligence Product Portfolios" cards (Financial Intelligence, Enterprise AI, Data Intelligence, Bio Intelligence, Aerospace Intelligence) now carry honest, evidence-linked descriptions:
  - Financial Intelligence → delivered as engineering engagements today (SDK finance domain); no products classified.
  - Enterprise AI → evidenced by QuantsMind-Agent + VS Code AI Coder (public); no products classified.
  - Data Intelligence → evidenced by telemetry/archival registry initiatives (SatHealth, MissionOps, MissionArchive); no products classified.
  - Bio Intelligence → evidenced by SDK biology/chemistry modules; no products classified.
  - Aerospace Intelligence → evidenced by bounded space-systems feasibility engineering; no products classified.
  - No invented products or claims; "No products currently classified" line retained.

## 2. Publication evidence (external, verified read-only)

| Item | Status | Evidence |
|---|---|---|
| Karkain v1.2.0 (Stable) | **Released** | GitHub release v1.2.0 "Native Independence", 2026-11-14; locally built (CI matrix could not run — billing restriction); release notes credit "Off C, Off Go" |
| Karkain Language Tools (`karkain.karkain`, Open VSX) | **Published** | Open VSX namespace `karkain/extension karkain` **v1.0.0**, verified, universal, MIT, 124 downloads, published 2026-11-14 (timestamp matches GitHub release); **not** on Microsoft Marketplace (itemName `karkain.karkain` returns 404) |
| QuantsMind AI Coder (`quantsmind.quantsmind-vscode-ai-coder`, Open VSX) | **Published (Preview)** | Open VSX **v3.1.0**, preview:true, 202 downloads, published 2026-11-13 |
| QuantsMind AI Coder (Microsoft VS Marketplace) | **Published (Preview)** | Marketplace itemName `quantsmind.quantsmind-vscode-ai-coder` **v3.1.1**, preview, 2 installs |
| QuantsMind AI Coder repo | Public | `Quantsmind/QuantsMind-VSCode-AI-Coder`; release **v3.1.1** (2026-11-13), tags v1.0.0 and v3.1.1 |
| QuantsMind-Agent | **Released (0.x)** | GitHub release **v0.9.0** "Workspace Intelligence", 2026-10-20 |
| Taksh (QuantsMind-LLM) | **Released (source, Apache-2.0)** | GitHub release **v1.0.0** "Taksh v1.0.0", 2026-10-21; honest negative result; not a model-weights release |
| QuantsMind SDK | **Published (1.1.0)** | PyPI `quantsmind` **1.1.0** on PyPI and piwheels (verified via Project JSON); GitHub tags v1.0.0, v1.0.1, v1.1.0 |
| MicroQuantum | **Published (1.1.0)** | PyPI `microquantum` **1.1.0**; GitHub release v1.1.0 |
| Quantsmind Relational DB | Pre-release (Alpha) | Tag v0.1.0; no releases published |
| GuardMCP | In development | Public repo, no tags/releases |
| Vsector | Experimental | Public repo, tags up to v0.8.0, no releases |
| QuantsMind-Sentinel | Unverified on website | Public repo, no tags/releases; not listed (informational) |

**Distribution links used in the site:** all externally published artifacts above are linked; no link was invented or left pointing at a 404.

## 3. Tests and verification

- Unit suite (`npm test -- --watch=false`): **28 files / 498 tests**; 413 passed, 85 skipped, 0 failed.
- Technology component spec: updated (Karkain Stable/v1.2.0, Agent v0.9.0, Taksh v1.0.0 positive link assertions).
- Products component spec: updated (directory names); catalogue counts unchanged.
- Product registry spec: updated (Quantum Mission → proposed/not-available).
- Home component spec: updated (spotlight shows proposed/not-available; mission-band scoped assertion).
- Product-detail spec: updated (QuantumStudio proposed/not-available; VS Code AI Coder → Preview; Taksh).
- Quantum Mission spec: updated.

### Verification commands
- `npm run build` → exit 0 (bundle 613.85 kB; pre-existing budget warnings unchanged; no new warnings introduced).
- `npm run build:static` → exit 0 (34 routes; sitemap consistent).
- `npm run test:prerender` → exit 0 (86/86).
- `npm run smoke` → **PASS** (210 checks, no overflow/console errors).
- `git diff --cached --check` → exit 0.

## 4. Release status

- Work on branch `release/v2.0.1`; PR to `main` created after push.
- No direct pushes to `main`/`develop`. Release published only after CI qualification and merge.

## 5. Remaining blockers / notes

- None blocking. Known pre-existing budget warnings (initial bundle over 600 kB; home/products component styles over 14 kB) remain and are unchanged by this work.
- The ten Quantum Mission applications remain proposed; release of any would require an owner-authorized public release announcement and matching update.
- Karkain v1.3.0 is under development; not claimed as released.

## 6. Files changed (logical groups)

1. **Registry/directory sync:** `src/app/content/products/product.registry.ts`, `src/app/content/products/directory-entries.ts`, `src/app/content/products/product.registry.spec.ts`
2. **Release-era surfaces:** `src/app/pages/technology/technology.component.ts`, `src/app/pages/technology/technology.component.spec.ts`, `src/app/pages/karkain/karkain.component.ts`, `src/app/pages/labs/labs.component.ts`, `src/app/pages/home/home.component.ts`, `src/app/pages/home/home.component.spec.ts`, `src/app/pages/quantum-mission/quantum-mission.component.spec.ts`, `src/app/pages/blog/articles/karkain.article.ts`, `src/app/pages/blog/articles/quantsmind-agent.article.ts`, `src/app/pages/blog/articles/quantsmind-llm.article.ts`
3. **Convention fixes:** `src/app/pages/products/products.component.ts`, `src/app/pages/products/products.component.spec.ts`, `src/app/shared/components/qm-product-detail/qm-product-detail.component.spec.ts`
4. **Docs:** `docs/website-v2.1/QUANTSMIND_WEBSITE_CHANGE_RECONCILIATION.md` (WQ-021), `docs/website-v2.1/WEBSITE_V2_0_1_COMPLETION_REPORT.md` (this file)

Excluded from release: `package-lock.json`, `scripts/measure-header.mjs`, all build logs and fix-* scripts (untracked, preserved in working tree).
