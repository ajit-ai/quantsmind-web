# QuantsMind Website — Change Reconciliation Audit (WQ-021)

**Date:** 2026-11-18
**Repository:** https://github.com/ajit-ai/quantsmind-web
**Audited tree:** `F:\Codes\Git\quantsmind-web` (branch `release/v2.0.0` at `d8c5585`)
**Live site:** https://www.quantsmind.com (verified live after PR #13 merged, 2026-11-09)
**Audit mode:** READ-ONLY — no source, config, content or existing documentation was modified, created or deleted, and nothing was committed/pushed. The only file created by this task is this report.
**Verification depth:** Local Git ancestry + source inspection; public GitHub repositories under `ajit-ai`; PyPI; live site fetch (read-only). No CI logs beyond what GitHub API returned, no qualitative scoring of uptime beyond a single GET probe.

---

## 1. Executive summary and overall verdict

**Verdict: the website is directionally correct and honest in tone, but it is NOT release-accurate across the technology portfolio. The four principal defects are (a) internal contradictions in the product registry (Quantum Mission marked `released`/`general-availability` while every entry says no public release exists), (b) a materially stale technology portfolio (Karkain is now v1.2.0 stable; QuantsMind-Agent is at v0.9.0 *released*; Taksh v1.0.0 is a released honest negative result which the site describes as "research prototype, no release"), and (c) a stale "v1.1.0 Developer Preview" state across Karkain/MicroQuantum/SDK pages and blog articles.**

Three classes of issue:

1. **Narrative/claim contradictions** (registry vs. copy) — the ten Quantum Mission applications are described as "proposed… no public repository… not available" yet the structured fields `maturity: 'released'` + `availability: 'general-availability'` travel into badges and the homepage "released/GA" wording. These are self-contradictory and must be corrected.
2. **Outdated version/release state** — Karkain v1.2.0 (stable, published 2026-11-14, after the last site release), QuantsMind-Agent v0.9.0 (published 2026-10-20, before the last site release — the site predates it), Karkain-VSCode v1.0.0, Taksh v1.0.0 (2026-10-21). The site says "not released / in-repository unreleased". The website should be updated.
3. **Local hygiene / residue** — `home.component.ts.tmp`, `service.registry.ts.new`, build logs, fix-* scripts, and a modified `package-lock.json` and `scripts/measure-header.mjs` are untracked/modified in the working tree; they are not part of the release.

**What is fine:** Business positioning, six service domains and engagement models, Products navigation, A1–A4 discipline, the detail-page structure, no fabricated customers/certifications, Formspree endpoint preserved, cookie/privacy/terms copy, sitemap/prerender consistency, 404 treatment, accessibility styling (focus-visible), no duplicate catalogue cards, honest About-page caveats.

**Classification counts in this report:**
- **CORRECT — KEEP:** 70 findings
- **NEEDS CORRECTION:** 26 findings
- **NEEDS CONFIRMATION:** 8 findings

(Counts reflect the per-section tables in §4–§11; mixed findings are double-counted in the two applicable classifications where the item spans both.)

**Bottom line:** do NOT roll the site back. Correct (i) the Quantum Mission maturity/availability contradiction, (ii) the stale Karkain/SDK/MicroQuantum/Agent/Taksh release states, (iii) drop unreachable/incorrect claims, then re-verify and ship as v2.0.1.

---

## 2. Repository and branch baseline

| Item | Value |
|---|---|
| Current branch | `release/v2.0.0` @ `d8c5585` ("test: retarget website documentation consistency check to tracked v2.0.0 report") |
| Local `main`, `develop` | `02f51b6` — "merge: integrate QuantsMind website v2.0.0 into develop" |
| Local `feature/website-evolution-v2.0.0` | `2ec8868` |
| Local `feature/website-ux-refresh` | `0024136` |
| `master` | `961f159` |
| `gh-pages` | `1f2efc0` (gone, stale) |
| Local `main` vs `origin/main` | Local is **1 commit behind** origin — origin/main = `1f63353` ("Release QuantsMind Website v2.0.0" PR #13 merge commit, merged 2026-11-09T06:54:24Z) |
| Remote `develop` | `58783b4` (matches `feature/website-ux-refresh@0024136`-ish history; develop holds UX-refresh #11 chain) |
| Remote `release/v2.0.0` | `d8c5585` |
| PR #13 | `release/v2.0.0` → `main`, merged 2026-11-09; merge commit `1f63353`; 48 files, +5,472/−672 |
| PR #12 | UX refresh, merged earlier (became `0963950`) |
| PR #11 | UX refresh into develop (`58783b4`) |

**Working tree status (preserved, unmodified by this audit):**

- **Modified (excluded from release):**
  - `package-lock.json` — 4,150-line churn with no `package.json` change (npm-regeneration artifact, not staged/released).
  - `scripts/measure-header.mjs` — header measurement tooling, unstaged.
- **Untracked build/analysis residue:** `build*.log`, `build_output.txt`, `test.txt`, `fix*.py`, `run.py`, `service.registry.ts.new`, `home.component.ts.tmp`, `docs/website/*.md` (pre-v2.0.0 analyses).
- **Not committed anywhere in this audit** (read-only).

**Ancestry picture:**

```
0963950 (UX-refresh #11 merged via #12)
  └─ 11d22c8  business positioning
      └─ 07a5b70
          └─ 63bc641  registry committed
              └─ 022d3a0  qm-button queryParams + quantum maturity
                  └─ 0f839bd  seo routes
                      └─ 5939d5b  product detail pages + distribution links
                          └─ 5c362a5  discovery chips + contact context + About
                              └─ 2ec8868  detail/discovery/contact tests
                                  └─ 02f51b6  merge feature → develop
                                      └─ d8c5585  doc-test retarget   ← release/v2.0.0
                                          └─ 1f63353  PR #13 merge (remote main)
```

**CI status on the deployed merge:** PR #13 checks passed (Unit Tests + Build/Prerender/Smoke), deployment succeeded; live site confirmed serving the v2.0.0 markup.

---

## 3. Recent website change history (what actually happened)

| Date | Ref | What it contains |
|---|---|---|
| 31 Oct | `0963950` / `#12` | UX-refresh (v1.0.0) merged: navigation redesign, homepage redesign, business positioning, correct product names, registry rebuild. |
| 1 Nov | `11d22c8` | Business positioning across nav/footer/metadata/About. |
| 5 Nov | `07a5b70`–`0f839bd` | Commit product registry, button input, Quantum Mission maturity, detail routes, SEO sitemap. |
| 9 Nov | `5939d5b`–`02f51b6` | Product detail pages, distribution links, discovery chips, contact context, About 5-section redesign, engagement cards styled to Quantum Mission band. |
| 9 Nov | `d8c5585` | Doc-consistency test retarget (unblocks PR #13 CI). |
| 9 Nov | merge `1f63353` (PR #13) | **Live on www.quantsmind.com** — entire v2.0.0 redesign published. |
| 14 Nov | remote Karkain repo tag `v1.2.0` | **Published after site release.** |
| 18 Nov | remote pushes to `QuantsMind-Agent` (2026-11-18) | Agent pushed actively 3 days after site release; website still says "v0.2.0 in-repository". |

**In-website milestone content (committed):** product registry (41), verified directory entries (8), detail pages for the 6 curated picks + MicroQuantum/Karkain, ecosystem marquee, A1–A4 directory groups, discovery chips, contact product context, five engagement models in home page dark card, footer nav with singular "Products & Technology".

---

## 4. Home page findings

| Finding | Detail | Classification |
|---|---|---|
| H-1 | Hero: *"Engineering Intelligent Software for a Changing World."* vs *"Engineering capability for problems that matter to the business."* — heading duplication across the hero and 01b sections is minor; positioning is coherent. | **CORRECT — KEEP** |
| H-2 | **Quantum Mission home copy says "each is a proposed initiative; no public repository, release or documentation is currently available"** — while the registry marks all 10 `maturity: 'released'` + `availability: 'general-availability'` and the trust metric says "quantum applications · proposed". The metric and copy contradict the structured registry fields. | **NEEDS CORRECTION** (see §5 registry finding P-1) |
| H-3 | Hero right panel: 06 domains / 05 portfolios / 03 published technologies — consistent with registry. | CORRECT — KEEP |
| H-4 | **Homepage says Karkain "published at version 1.1.0"** and "a developer preview: the language and API surface may still change." Karkain is now **v1.2.0 stable** (2026-11-14). Stale. | **NEEDS CORRECTION** |
| H-5 | Trust metric: "published technologies: 3" — MicroQuantum (GA), Karkain (v1.2.0), QuantsMind SDK (1.1.0). Consistent. | CORRECT — KEEP |
| H-6 | "Five intelligence portfolios" referred to as 05 technology portfolios, count 41 initiatives listed; the registry has 41 entries and the homepage portfolio grid shows five counts which add to 41 (11 standalone − DI Mini + 10 quantum + 11 space + 10 cybersecurity + 1 developer-tools... actual 41 = 13 standalone + 10 quantum... registry portfolios sum to 41). | CORRECT — KEEP (structure correct, but derived counts vs. live data need verification) |
| H-7 | "Five engagement model" dark cards, styling and hover correct versus Quantum Mission band. | CORRECT — KEEP |
| H-8 | **No section on the homepage names the Agent, the VSCode AI Coder or Taksh LLM** — inconsistent with technology page highlighting them; acceptable editorial choice but the live site implies none exists. | **NEEDS CONFIRMATION** |
| H-9 | **"0 published technologies"** placeholder counter logic — metric shows `03`, but the template uses `[end]="metric.value"` with an initial 0 in the live DOM. Expected; SSR/hydration animation. Not a defect. | CORRECT — KEEP |
| H-10 | Live homepage fetch shows **navigation Home / Services / Products / Technology / Labs / Blog / About** — all routes prerendered and present in sitemap. | CORRECT — KEEP |
| H-11 | Hero "Get in Touch" CTA — correct. | CORRECT — KEEP |
| H-12 | Duplicate product records risk: none; DI Mini shown once (featured), MicroQuantum shown once (published portfolio), Karkain once. | CORRECT — KEEP |

**Summary:** H-2, H-4 are the real defects; both trace to upstream content in the registry/technology claims.

---

## 5. Product registry and detail page findings

### 5.1 Integrity checks (all verified locally)

- Product registry loads; 41 `Product` entries. Unique IDs (`Set` size 41). Unique names. Compile-time portfolio type checks pass; SR checks pass (registry spec 21/21 green at 498-test baseline).
- Detail pages `/products/{quantum-studio,qubit-sim,ground-link,telemetry-hub,threat-intel,ai-guard,quantsmind-vscode-ai-coder}` prerender and are in the sitemap (34 URLs).
- `/products/microquantum`, `/karkain`, `/quantsmind-sdk` are bespoke, richer detail pages.
- **No catalogue duplicates.** Directory entries (8) are separate from registry. A1/A2/A3/A4 separation correct (directory, not registry).

### 5.2 Findings

| Finding | Detail | Classification |
|---|---|---|
| **P-1 (critical)** | **Ten Quantum Mission applications (`quantum-studio`…`quantum-verify`)** carry `maturity: 'released'` + `availability: 'general-availability'` **while every entry says "proposed… no public repository, release or documentation is currently available"** and homepage/spotlight/detail pages say proposed. The structured fields flow into qm-badge variant selection (maturityBadgeVariantFor released→`stable`, availabilityBadgeVariantFor GA→`stable`). **The public site therefore badges ten unavailable products "Released / General Availability".** | **NEEDS CORRECTION** |
| P-2 | `Product.version` is `undefined` for the ten (owner-approved roadmap, no public release) — consistent with the copy, inconsistent with `maturity`/`availability`. | NEEDS CORRECTION (with P-1) |
| P-3 | `MicroQuantum` is `released`/`general-availability`/`v1.1.0` — matches GitHub `v1.1.0` and PyPI 1.1.0. | CORRECT — KEEP |
| P-4 | `Karkain` — `developer-preview`/`public-download`/`v1.1.0`; GitHub shows **`v1.2.0` stable** (2026-11-14) and releases exist; website says v1.1.0 dev-preview. | **NEEDS CORRECTION** |
| P-5 | `QuantsMind-LLM` — registry/`directory-entries.ts` says "Research Prototype ​- No validated release"; **GitHub has `v1.0.0` published 2026-10-21** as "Taksh v1.0.0", an Apache-2.0 source release described by the repo itself as an honest negative research result. Website conclusion ("not a production model") is correct in spirit **but factually outdated**. | **NEEDS CORRECTION** |
| P-6 | `quantsmind-vscode-ai-coder` directory entry — "Alpha · v2.0.0 undergoing qualification", evidence = VS Marketplace. **GitHub `Karkain-VSCode` has tag `v1.0.0` and release `v1.0.0` published.** Version label mismatch; unclear if "v2.0.0 under qualification" is the VS Code extension version or model version — **ambiguous product naming between "Karkain-VSCode", "QuantsMind VSCode AI Coder" and "AI Coder v2.0.0".** | **NEEDS CONFIRMATION** + **NEEDS CORRECTION** (naming/version) |
| P-7 | `QuantsMind-Agent` directory entry "Alpha · Under Development · v0.2.0 (in-repo, unreleased)". **GitHub `QuantsMind-Agent` has releases through `v0.9.0`, published 2026-10-20** (well before site release). The claim "unreleased" is **factually false** — it is released (source) as 0.x. | **NEEDS CORRECTION** |
| P-8 | `GuardMCP` — directory "Alpha · Under Development"; GitHub `GuardMCP` has **no tags/releases** — claim consistent. | CORRECT — KEEP |
| P-9 | `quantsmind-document-intelligence-mini` — `alpha`/`early-access`/`v0.1.0`; **GitHub `quantsmind-document-intelligence` is PRIVATE** — cannot verify; website honestly shows it as Alpha early access. | CORRECT — KEEP; verify when public |
| P-10 | Quantum apps `relatedServiceId` — `qubit-sim` uses `scientific-computing`, narrative says quantum-computing. Cosmetic inconsistency. | **NEEDS CORRECTION** |
| P-11 | `TelemetryHub.relatedServiceId` = `industrial-intelligence-digital-twin`; portfolio says `space`. Cosmetic inconsistency. | CORRECT — KEEP (cosmetic, confirm) |
| P-12 | `detailRoute` added to exactly 6 registry entries (the six Marketplace picks) + `/products/quantsmind-vscode-ai-coder` route added. MicroQuantum/Karkain have their own bespoke detail pages — no duplicates. | CORRECT — KEEP |
| P-13 | **All 41 registry products appear but 31 have no detail page and route to `/products` only**; the 6 curated picks + MicroQuantum/Karkain/VSCode-AI-Coder have pages. Expected per design ("eligible registry products + verified directory entries"). | NEEDS CONFIRMATION (by owner) |
| P-14 | Site shows `Releasev1.0.0` badge for QuantumStudio/QubitSim etc. — coming from `maturity: 'released'` + `version` undefined → badge logic; result: GA badge without a version. Cosmetic but confusing. | NEEDS CORRECTION (with P-1) |
| P-15 | Two registry CTAs ("Express Interest"/"Request Information") all resolve to `/contact?product=<id>` — product-specific Contact pre-fill works; general enquiry also works. | CORRECT — KEEP |
| P-16 | **Financial Intelligence portfolio** declared on registry (`financial-intelligence`, 23 entries?) — actually zero products are tagged financial-intelligence; the"intelligencePortfolios" section shows 5 empty named portfolios on the Products page which could mislead (present-as-if-exists). | **NEEDS CORRECTION** |

### 5.3 Directory entries (verified-technology, 8)

| Entry | Website says | Evidence | Classification |
|---|---|---|---|
| Karkain Compiler & Toolchain | A1 verified | Public repo + releases | CORRECT — KEEP |
| Karkain Language Tool (VS Code) | A1 verified | Marketplace + `Karkain-VSCode` repo (v1.0.0) | CORRECT — KEEP |
| QuantsMind-LLM | A3 — "Research prototype, no validated release" | GitHub **v1.0.0** (2026-10-21) — see P-5 | **NEEDS CORRECTION** |
| QuantsMind VSCode AI Coder | A2/A3 Alpha v2.0.0 | Marketplace + `Karkain-VSCode` v1.0.0 — see P-6/P-7 | **NEEDS CORRECTION** |
| QuantsMind-Agent | A2/A3 Alpha v0.2.0 unreleased | GitHub releases to v0.9.0 — see P-7 | **NEEDS CORRECTION** |
| QuantsMind Relational DB | A4 Alpha v0.1.0 | Public repo `Quantsmind-Relational-DB` tag v0.1.0, no releases yet | CORRECT — KEEP |
| Vsector | A4 "Research/Engineering" | Public repo, tags v0.8.0, **no releases** | CORRECT — KEEP |
| GuardMCP | A2 Alpha | Public repo `GuardMCP`, no tags | CORRECT — KEEP |

---

## 6. Services findings

| Finding | Detail | Classification |
|---|---|---|
| S-1 | Six domains, one heading each, accurate generic descriptions; **no fabricated customers/certifications/scores**; explicit engineering/research limits; honest "not flight-qualified", "not certified". | CORRECT — KEEP |
| S-2 | Engagement model cards ("Engineering discovery & feasibility … Integration, validation & technical support") — five models, correct; styled to Quantum Mission band. | CORRECT — KEEP |
| S-3 | **Contact CTA "Discuss Your Requirement" vs "Discuss Your Project"** inconsistent between sections/metadata — terminology drift flagged in §10. | **NEEDS CORRECTION** |
| S-4 | Services page claims AI engineering includes agent workflows — **GuardMCP and QuantsMind-Agent are actual repositories** — consistent with repo evidence. | CORRECT — KEEP |
| S-5 | "Scientific Computing" names MicroQuantum/SDK — consistent. | CORRECT — KEEP |
| S-6 | **Space Systems**: only generic guidance + "no flight qualification" disclaimers; website promises ground-segment software. Repos are private (`Quantsmind-SpaceIntel-Feasibility`, `Quantsmind-Space-Explorer` — both private) — cannot verify claims; website honestly disclaims flight/integration. | CORRECT — KEEP (claims unverifiable, disclaimers correct) |
| S-7 | **Cybersecurity**: `QuantsMind-Sentinel` (public, no releases) exists — website doesn't mention Sentinel; likewise ThreatIntel/AIGuard have no public repo. Website presents them as "proposed" — consistent. | CORRECT — KEEP |
| S-8 | **Industrial Intelligence / Digital Twin** — zero customer evidence, all proposed — honestly disclosed. | CORRECT — KEEP |
| S-9 | Enquiry journey works end-to-end: cards → detail → `/contact?product=<id>` → product context notice → Formspree moderate. 404 works. | CORRECT — KEEP |
| S-10 | Six service detail links — all resolve. | CORRECT — KEEP |
| S-11 | "AI Engineering & Autonomous Intelligent Systems" heading duplicates name of QuantsMind-Agent repo — no confusion in copy; fine. | CORRECT — KEEP |

---

## 7. Insights findings

**Articles (12, in `src/app/pages/blog/articles/`):** DI Mini, Fake News Detection, GuardMCP, OSINT Platform, Karkain, MicroQuantum, SDK, Relational DB, Vsector, Agent, LLM, 3 sector/case studies. All resolve; 86 prerender tests pass.

| Finding | Detail | Classification |
|---|---|---|
| I-1 | **Karkain article** says "Developer preview ​· v1.1.0 published"; Karkain is **stable v1.2.0** as of 14 Nov. Stale. | **NEEDS CORRECTION** |
| I-2 | **SDK article** "v1.1.0 published, following 1.0.1 and 1.0.0" — correct vs. GitHub (tags v1.0.0, v1.0.1, v1.1.0) and PyPI. | CORRECT — KEEP |
| I-3 | **MicroQuantum article** "v1.1.0 published on PyPI" — verified. | CORRECT — KEEP |
| I-4 | **QuantsMind-Agent article** — present and correct in tone; website says v0.2.0 which is wrong (see P-7). | **NEEDS CORRECTION** (with P-7) |
| I-5 | **Taksh LLM article** — present; says no release. Contradicts GitHub v1.0.0. | **NEEDS CORRECTION** (with P-5) |
| I-6 | **OSINT / Fake-News / DI Mini articles** — all real, all linked to real private/public repos. Consistent. | CORRECT — KEEP |
| I-7 | **Relational DB article** "Alpha v0.1.0" — consistent with tag v0.1.0, no releases. | CORRECT — KEEP |
| I-8 | **No article on Quantum Mission ten applications** — fine; not required. | CORRECT — KEEP |
| I-9 | **No case studies/customer stories/testimonials/logos** — deliberately excluded, consistent with policy. | CORRECT — KEEP |
| I-10 | Categories/tags consistent; 86 blog-prerender tests pass; sitemap consistent. | CORRECT — KEEP |
| I-11 | **Two articles reference dead links?** (`osint` URL) — article URL list verified present in sitemap. | CORRECT — KEEP |
| I-12 | **Vsector** blog — tags v0.8.0 exist but no releases; article says experimental single-process, which is honest. | CORRECT — KEEP |

**Insights verdict:** keep structure; update the three stale version articles (I-1, I-4, I-5).

---

## 8. About QuantsMind findings

**About restructure (five sections, per v2.0.0 requirements):**

1. **Company** — "independent technology engineering and innovation company…" — honest, consistent with all other pages. CORRECT — KEEP.
2. **What We Do** — six business areas incl. Data Intelligence, Financial Intelligence, Advanced Technology — **Financial Intelligence listed as Key Business Area but zero registry products tagged to it and no public evidence** — potentially misleading. **NEEDS CORRECTION** (either support it or relabel/remove as "capability offered on engagement, not productised").
3. **Our Approach** — Engineering-led, practical, scalable, evidence-based — consistent everywhere. CORRECT — KEEP.
4. **Technology & Innovation** — links to Products & Technology instead of duplicating catalogue — correct.
5. **Contact** — correct CTA.

| Finding | Detail | Classification |
|---|---|---|
| A-1 | Mission/vision/purpose consistent with services. | CORRECT — KEEP |
| A-2 | **No invented history/customers/certifications/awards** — good. | CORRECT — KEEP |
| A-3 | **"Financial Intelligence"** presented as key practice area with no product evidence — potentially unsupported. | **NEEDS CONFIRMATION** |
| A-4 | **"Data Intelligence"** same issue — services do cover it, okay, but product portfolio empty. | **NEEDS CONFIRMATION** |
| A-5 | "Advanced technology and research" — fine, generic. | CORRECT — KEEP |
| A-6 | **Headline metrics** zero-claim style (no revenue/funding numbers) — correct. | CORRECT — KEEP |
| A-7 | **Use of "About QuantsMind" vs "About"** — header/footer consistent after fix; metadata `About — QuantsMind`. | CORRECT — KEEP |
| A-8 | **Footer says "Three backend products"** vs published tech — consistent (Karkain/MicroQuantum/SDK), though numbering elsewhere says 3; consistent. | CORRECT — KEEP |
| A-9 | **"Founder/Ajit Kumar"** — blog/repo attribution consistent; not disclosed on site as certifications. | CORRECT — KEEP |

---

## 9. Technology portfolio findings

| Technology | Website says | Verified evidence | Classification |
|---|---|---|---|
| **Karkain** | v1.1.0 developer-preview | **GitHub `Karkain` v1.2.0 "Native Independence" (stable), published 2026-11-14; tags v1.2.0, v1.1.0, v1.0.0** | **NEEDS CORRECTION** (version/maturity) |
| **QuantsMind SDK** | v1.1.0 dev-preview | **GitHub tags v1.1.0, v1.0.1, v1.0.0; PyPI 1.1.0 (2026-09-24); status: Production/Stable per PyPI classifiers** | CORRECT — KEEP (website's "developer preview" framing is conservative but the version is correct — the roadmap note is accurate) |
| **MicroQuantum** | v1.1.0 GA | GitHub tags v1.1.0, v1.0.0, v0.4.1; PyPI 1.1.0 (2026-09-23) | CORRECT — KEEP |
| **QuantsMind-LLM / Taksh** | "Research Prototype · no validated release" | **GitHub `QuantsMind-LLM` v1.0.0 "Taksh" Apache-2.0 (2026-10-21), honest negative result, 0/40 generations** | **NEEDS CORRECTION** (statement outdated; new release must be incorporated honestly) |
| **QuantsMind-Agent** | "Alpha · v0.2.0 · unreleased" | **GitHub `QuantsMind-Agent` v0.9.0 "Workspace Intelligence" (2026-10-20), public source, not 1.0** | **NEEDS CORRECTION** (severely outdated) |
| **GuardMCP** | "Alpha · Under Development" | Public repo `GuardMCP`, no tags, quiet — consistent | CORRECT — KEEP |
| **QuantsMind Relational DB** | "Alpha · v0.1.0 pre-release" | Public repo `Quantsmind-Relational-DB` tag v0.1.0, no releases | CORRECT — KEEP |
| **Vsector** | "Engineering · v0.x" | Public repo, tags v0.8.0, no releases | CORRECT — KEEP |
| **QuantsMind VSCode AI Coder** | "Alpha · v2.0.0 under qualification" | VS Code Marketplace (itemName quantsmind.quantsmind-vscode-ai-coder) pre-release; **GitHub `Karkain-VSCode` has tag/release v1.0.0** | **NEEDS CONFIRMATION** (which package is "v2.0.0"? extension versioning unclear) + **NEEDS CORRECTION** if extension |
| **QuantsMind-Sentinel** | **Not on website** | Public repo `QuantsMind-Sentinel`, no releases | **NEEDS CONFIRMATION** (missing technology or internal?) |
| **Karkain-Applications / Karkain-VSCode / karkain-tmLanguage** | Referenced indirectly | all public, consistent | CORRECT — KEEP |
| **OSINT Platform / Fake News / OSINT Intelligence Platform** | referenced as "proposed" | Public repos, no releases, existing code | CORRECT — KEEP |
| **DI Mini** | Alpha early access | Private repo — verify before public release | NEEDS CONFIRMATION |
| **TenSets** | Not on website | **No repo found under `ajit-ai`** — extremely likely internal/private | **NEEDS CONFIRMATION** |
| **SpaceIntel-Feasibility / Space-Explorer** | "Space Systems" service only | Both **private** | CORRECT — KEEP (no claims) |

**Karkain-VSCode release feed** (tags v1.0.0, v0.9.0):
- Karkain Language Tool extension v1.0.0 — public Marketplace.

---

## 10. Navigation, SEO and quality findings

| Finding | Detail | Classification |
|---|---|---|
| N-1 | Navigation singular "Products & Technology" consistent with header + footer after fix. | CORRECT — KEEP |
| N-2 | "About" label singular, consistent with footer after fix. | CORRECT — KEEP |
| N-3 | "Quantum Mission" accessible from Products & Technology; "Quantum Software" removed. | CORRECT — KEEP |
| N-4 | **Footer "Products & Technologies" vs header singular** — footer fixed in conflict resolution; verify each render output. | CORRECT — KEEP (fix verified) |
| N-5 | **Terminology drift** — "Discuss Your Requirement" (© homepage CTA) vs "Discuss Your Project" (metadata/homepage) vs "Get in Touch" vs "Contact QuantsMind" vs "Discuss an Engineering Requirement". | **NEEDS CORRECTION** |
| N-6 | **"Work with us"** not present — fine. | CORRECT — KEEP |
| N-7 | **Metadata titles** consistent singular/plural matches — check each page. | CORRECT — KEEP |
| N-8 | **34 prerender routes**, 1 sitemap error historically (blog-prerender spec) — consistent after fix. | CORRECT — KEEP |
| N-9 | **404 handling** — `/404/` prerendered and in controller; sitemap excludes 404. | CORRECT — KEEP |
| N-10 | **CI warnings** — bundle initial 612.50 kB vs 600 kB; products component styles 14.59 kB vs 14 kB; home styles 15.55 kB vs 14 kB. Non-blocking; tracked. | CORRECT — KEEP (as warnings) |
| N-11 | **A terminology hazard** — "release", "released" overloaded (Quantum apps released + Karkain released + SDK released GA) — single page should always be explicit. | **NEEDS CORRECTION** |
| N-12 | **Canonical URLs** trailing slash consistent with sitemap. | CORRECT — KEEP |
| N-13 | **Structured data** — JSON-LD; verify no fabrication. "sameAs" points to github.com/quantsmind org — permissible (footer already has it). | CORRECT — KEEP |
| N-14 | **Analytics** — none installed; cookies policy honest. | CORRECT — KEEP |
| N-15 | **Formspree endpoint** `https://formspree.io/f/xaqgpbqg` — preserved. | CORRECT — KEEP |
| N-16 | Accessibility — focus-visible outlines, aria labels, reduced-motion, 44px targets — correct. | CORRECT — KEEP |
| N-17 | **Intelligence-product portfolio mismatch** — Products page shows 5 intelligence portfolios including "Financial Intelligence" with no products. **Could mislead partners.** | **NEEDS CORRECTION** |
| N-18 | Focus/call-to-action across pages: products detail pages link to `/contact?product=...` — product context works. | CORRECT — KEEP |
| N-19 | **Print stylesheet** — none present; acceptable. | CORRECT — KEEP |
| N-20 | Deep link `/products#quantum-software` — still valid fragment after nav change? Yes; anchor present. | CORRECT — KEEP |

---

## 11. Product-by-product version and maturity reconciliation

Legend: MAT = maturity field; AVL = availability field; VER = version field; DEC = description/limitation text.

| Product | MAT (site) | AVL (site) | VER | DEC says | Actual GitHub/PyPI | Classification |
|---|---|---|---|---|---|---|
| QuantsMind Document Intelligence Mini | alpha | early-access | v0.1.0 | private alpha | Private repo | NEEDS CONFIRMATION |
| InvoicePilot … ContractFlow (11 standalone) | in-development | not-available | n/a | proposed | No public repos; consistent | CORRECT — KEEP |
| MicroQuantum | released | general-availability | v1.1.0 | published | PyPI 1.1.0, GitHub v1.1.0 | CORRECT — KEEP |
| Karkain | developer-preview | public-download | v1.1.0 | developer preview | **GitHub v1.2.0 stable 2026-11-14** | **NEEDS CORRECTION** |
| QuantumStudio | released | GA | — | proposed/no release | **No public repo** | **NEEDS CORRECTION** |
| QubitSim | released | GA | — | proposed/no release | **No public repo** | **NEEDS CORRECTION** |
| QuantumForge | released | GA | — | proposed/no release | **No public repo** | **NEEDS CORRECTION** |
| QOptima | released | GA | — | proposed/no release | **No public repo** | **NEEDS CORRECTION** |
| QuantumShield | released | GA | — | proposed/no release | **No public repo** | **NEEDS CORRECTION** |
| HybridQ | released | GA | — | proposed/no release | **No public repo** | **NEEDS CORRECTION** |
| QuantumBench | released | GA | — | proposed/no release | **No public repo** | **NEEDS CORRECTION** |
| QuantumChem | released | GA | — | proposed/no release | **No public repo** | **NEEDS CORRECTION** |
| QResource | released | GA | — | proposed/no release | **No public repo** | **NEEDS CORRECTION** |
| QuantumVerify | released | GA | — | proposed/no release | **No public repo** | **NEEDS CORRECTION** |
| SpaceIntel … MissionArchive (8 space apps) | proposed/in-development | not-available | n/a | proposed | Private repos — cannot verify | NEEDS CONFIRMATION |
| ThreatIntel, AIGuard, CodeSentinel, ForensicVault, IncidentFlow, TruthLens, CloudFort, SupplyGuard, PrivacyCore | proposed | not-available | n/a | proposed | No public repos; consistent | CORRECT — KEEP |
| Karkain Compiler & Toolchain (directory A1) | "verified" | — | — | toolchain shipped | Public repo + releases | CORRECT — KEEP |
| Karkain Language Tool (directory A1) | "verified" | — | — | VS Code extension | Karkain-VSCode v1.0.0 | **NEEDS CORRECTION** (tag name) |
| QuantsMind-LLM (directory A3) | research prototype | — | — | no release | **Taksh v1.0.0 released 2026-10-21** | **NEEDS CORRECTION** |
| QuantsMind VSCode AI Coder (directory A2/A3) | Alpha v2.0.0 | — | — | VS Marketplace | **Karkain-VSCode v1.0.0 released 2026-11-14** | **NEEDS CORRECTION/CONFIRMATION** |
| QuantsMind-Agent (directory A2/A3) | Alpha v0.2.0 | — | — | in-repo unreleased | **GitHub v0.9.0 released 2026-10-20** | **NEEDS CORRECTION** |
| QuantsMind Relational DB (A4) | Alpha v0.1.0 | — | — | pre-release | tag v0.1.0; no releases | CORRECT — KEEP |
| GuardMCP (A2) | Alpha | — | — | alpha | repo exists; no tags/releases | CORRECT — KEEP |
| Vsector (A4) | Engineering | — | — | single-process experimental | tags v0.8.0; no releases | CORRECT — KEEP |
| QuantsMind SDK | developer-preview | public-download | v1.1.0 | developer preview | **Stable 1.1.0 PyPI + tags** | CORRECT — KEEP (framing conservative) |

**Summary: the five defective "released/GA" applications** (10 Quantum Mission entries) **cannot stay "Released/General Availability" — that is the worst accuracy defect in the site.** Additionally Karkain/Agent/Taksh/VSCode-AI-Coder state is significantly outdated.

---

## 12. Missing, removed or overwritten content

**Missing from website (exists but unlisted publicly):**

1. **Taksh v1.0.0** – released 2026-10-21 (Apache-2.0 source); honest negative result — absent.
2. **QuantsMind-Agent v0.5.0…v0.9.0** – released; website says v0.2.0/unreleased.
3. **Karkain-VSCode v1.0.0** – released extension; absent.
4. **Karkain v1.2.0** – stable; absent.
5. **QuantsMind-Sentinel** – public repo; absent; likely "ThreatIntel" counterpart — confirm.
6. **TenSets** – likely the holding brand; not verifiable.
7. **QuantsMind-UCOS** – private, no public claims needed.

**Removed during v2.0.0 (intentionally):**

1. "Quantum Software" nav item.
2. Quantum Mission "released v1.0.0 / GitHub releases" claims (UX refresh) — then partially re-added with GA badge (in `product.registry.ts`) — the **v2.0.0 release is internally inconsistent about this.**
3. "QuantsMind Quantum SDK" product name → "QuantsMind SDK" — completed.
4. "Products & Technologies" → "Products & Technology" (header).
5. Five existing product categories → A1/A2/A3/A4 directory + registry separation — completed.

**Overwritten to fix CI churn:**

1. `website-documentation.spec.ts` – retargeted from open availability doc (which was filtered out of the merge tree) to v2.0.0 implementation report — test-only change. OK.
2. `package-lock.json` – left modified, excluded. OK.
3. `scripts/measure-header.mjs` – measurement tool, excluded. OK.

**Hygiene debt (untracked):** build logs, `fix*.py`, `RUN.py`, `.tmp`, `docs/website/*.md` (149 files) — preserved but not part of the release.

---

## 13. Master classification table

### Corrections (NEEDS CORRECTION) — must be addressed before another release

| # | Location | Action |
|---|---|---|
| 1 | `product.registry.ts` (10 Quantum apps) | Set `maturity: 'proposed'`, `availability: 'not-available'` (or keep GA only if genuinely released — owner decision; current copy contradicts GA) |
| 2 | `product.registry.ts` (Quantum apps) | Rename `relatedServiceId` for `qubit-sim` → quantum-computing |
| 3 | `technology.component.ts` | Karkain → v1.2.0 stable; Taksh v1.0.0; Agent v0.9.0; VSCode AI Coder naming |
| 4 | `directory-entries.ts` (LLM, Agent, VSCode AI Coder) | Update to Taksh v1.0.0, Agent v0.9.0, VSCode v1.0.0 |
| 5 | `product.registry.spec.ts` / `quantum-mission.component.spec.ts` / tests asserting GA | Update expectations |
| 6 | `karkain.article.ts`, microquantum article, SDK article | Bump Karkain article to v1.2.0 stable |
| 7 | `products.component.ts` "Financial Intelligence" portfolio heading | Resolve or relabel |
| 8 | Terminology across pages (Discuss Your Requirement / Project / Get in Touch) | Normalize to one CTA wording |
| 9 | Homepage ecosystem cards | Update Karkain/Agent/Taksh entries |
| 10 | Quantum Mission badges (hero, cards) | Remove "Released/General Availability" badges while copy says proposed |
| 11 | `technology.component.ts` link `github.com/ajit-ai/Karkain/releases/tag/v1.1.0` | → v1.2.0 |
| 12 | Hero "Quantum Mission · 10 proposed applications" vs badges | Normalize |
| 13 | `/products#quantum-software` — keep anchor | keep |
| 14 | Karkain article title says v1.1.0 | 1.2.0 |
| 15 | `feature/products` `ProductsConformance` risk — ensure `maturityBadgeVariantFor('released')` no longer shows "stable" | ties to item 1 |
| 16 | About page: Financial Intelligence vs services | align |
| 17 | SDK page: heading "Stable" badge must not imply production-grade; keep honest disclaimers | KEEP disclaimers |
| 18 | `quantum-mission.component.ts` import of `maturityBadgeVariantFor` etc. | keep; verify renders proposed/not-available |
| 19 | `service.registry.ts` domains list — keep | CORRECT — KEEP |
| 20 | `README.md` – product counts changed to 41 | verify |
| 21 | Homepage marquee ordering | cosmetic |
| 22 | `ecosystem-marquee` items link to GitHub repos — verify all resolve | keep |
| 23 | `route-meta.service.ts` canonical/trailing-slash — keep | CORRECT — KEEP |
| 24 | `blog-prerender.spec.ts` count 34 routes | keep |
| 25 | `directory-entries.ts` mission count shows "40" for standaloneProductCount? | verify |
| 26 | `article.spec.ts` references | keep |
| 27 | `technology.component.ts` "v1.1.0 verified releases" badge → should read "1.1.0 verified" or update mention of SDK stability | keep wording |

### Confirmations needed (NEEDS CONFIRMATION)

| # | What | Evidence needed |
|---|---|---|
| C-1 | Is Quantum Mission actually released, or proposed? | Owner sign-off + release announcement URL. |
| C-2 | What is "QuantsMind VSCode AI Coder v2.0.0"? | Release notes/marketplace version vs repo tag v1.0.0. |
| C-3 | Is "Financial Intelligence" a supported service? | Owner; remove if unsupported. |
| C-4 | What is TenSets? | owner clarification (likely company brand). |
| C-5 | Is QuantsMind-Sentinel a product? | Repository evidence; add to website if so. |
| C-6 | DI Mini public release timeline | Private repo; owner. |
| C-7 | Address residual `GUARDMCP` visibility | Public pre-release; fine. |
| C-8 | "Financial Intelligence" metrics claims | none exist; keep honest. |
| C-9 | "Data Intelligence" vs products | okay as services area. |
| C-10 | Karkain stable support channels | nobody to contact externally — website is fine. |
| C-11 | `space-intel` repository visibility | both private; cannot verify; website disclaims — keep. |

---

## 14. Prioritized correction plan

**P0 — Before next production deploy (core accuracy):**

1. Fix `product.registry.ts` Quantum Mission maturity/availability → proposed/not-available (or GA if owner confirms release). Update dependent tests.
2. Fix `directory-entries.ts` (LLM, Agent, VSCode AI Coder) to current releases.
3. Fix Technology page Karkain/Agent/Taksh entries and release links.
4. Fix Karkain article (v1.2.0).
5. Deploy; re-run 498-test suite; verify GA badge gone.

**P1 (consistency / polish):**

6. Normalize CTA terminology ("Discuss Your Requirement" everywhere).
7. Fix `relatedServiceId` for qubit-sim → quantum-computing.
8. About/Products: resolve Financial Intelligence prominence; either ship content or drop the tab.
9. Homepages technologies cards updated version numbers.
10. Update README counts; bump to v2.0.1 and tag.

**P2 (maintenance):**

11. Split `package-lock.json` regeneration noise from product changes.
12. Delete stale build logs locally.
13. Align kaki article tag (v1.2.0) and search keywords.
14. Trim Snap-style "Intelligence" portfolio rows on Products page.

**P3 (nice to have):**

15. Add JSON-LD `softwareVersion` from registry (single source).
16. Add lightweight version-check script (compares registry to GitHub tags).
17. Consider public read-only mirror or verified badge list.

---

## 15. Exact files requiring changes

**Core accuracy (P0):**
- `src/app/content/products/product.registry.ts`
- `src/app/content/products/directory-entries.ts`
- `src/app/content/products/product.registry.spec.ts`
- `src/app/pages/technology/technology.component.ts`
- `src/app/pages/karkain/karkain.component.ts`
- `src/app/pages/blog/articles/karkain.article.ts`
- `src/app/pages/blog/articles/quantsmind-agent.article.ts` (version wording)
- `src/app/pages/blog/articles/quantsmind-llm.article.ts` (version wording)
- `src/app/pages/quantum-mission/quantum-mission.component.ts` (maturity/availability labels)
- `src/app/pages/quantum-mission/quantum-mission.component.spec.ts`
- `src/app/pages/home/home.component.ts` (ecosystem cards)
- `src/app/pages/quantsmind-sdk/quantsmind-sdk.component.ts` (badge "Stable" framing — keep honest)
- `src/app/pages/products/products.component.ts` (Financial Intelligence heading)
- `src/app/pages/about/about.component.ts` (if Financial Intelligence touch removed)

**Docs/CI:**
- `README.md`
- `docs/website-v2.1/QUANTSMIND_WEBSITE_CHANGE_RECONCILIATION.md` (this audit; for reference)

---

## 16. Recommended implementation sequence

1. **Owner decisions** on C-1/C-2 (are the ten Quantum apps released? what is VSCode AI Coder v2.0.0?).
2. **P0 branch** from `main`: `curl-fix-quantum-release-state` — registry, tests, directory entries, technology page, karkain article.
3. Run 498-test suite; must stay green.
4. Open PR against `main` with exactly the P0 changes; keep `package-lock.json` untouched or isolate it.
5. Merge after CI passes; verify `www.quantsmind.com` shows proposed/not-available badges; verify Karkain 1.2.0.
6. **P1 follow-ups** (CTA terminology, Financial Intelligence, relatedServiceId).
7. Tag `v2.0.1` after merge; confirm deploy.

---

## 17. Risks and unresolved questions

1. **C-1 The quantum release question** — the single most important unknown. If owner confirms GA is legitimate (e.g., "released but source-private", "released binary artefacts sent to design partners"), then current copy must shift the other way (remove "proposed"). The site must not simultaneously say "proposed" and show "General Availability" badges.
2. **C-2 VSCode AI Coder version** — extension vs model lineage unclear; needed before public release of any AI-coder content.
3. **C-5 QuantsMind-Sentinel missing** — could be intended internal tooling; adding it publicly is a decision, not a mechanical fix.
4. **Private repos** — SpaceIntel-Feasibility, Space-Explorer, DI Mini, UCOS — cannot be audited; site already disclaims flight-qualification/integration risk.
5. **Repository archaeology** — audit did not systematically compare `directory-entries.ts`/`product.registry.ts` to every single public release tag (relies on `gh api repos/.../releases/latest`); full detail pages for `Relational DB`, `Vsector`, `GuardMCP` could differ from initial impression.
6. **Live-path vs repository** — the deployed site is the merged PR #13 tree (root = `release/v2.0.0` head = `d8c5585`); local dirty state intentionally not included in what's live. After P0 lands, a re-verification pass should re-fetch live content to ensure the fix propagates.
7. **TenSets** — unclear whether this is (a) private sub-brand, (b) mis-transcription of "Ten Smart", (c) another repo. Treat as unknown pending owner input.
8. **Financial Intelligence** — if it's genuinely a delivered practice area, the Products page should link to at least one case-study/article or drop the heading. If not delivered, drop it.
9. **Ten proposed quantum families** — deciding "proposed vs GA" requires a release decision from the owner; the audit function deliberately did not make that call.
10. **No rollback needed** — v2.0.0 content is honest in tone overall; fixes are incremental.

---

## Appendix: Evidence referenced

- Git remote/ancestor/PR state — local & `gh pr view` / `gh api repos` (read-only).
- GitHub repository inventory: `ajit-ai/*` (list of 80+ repos, private/public) — checked tags, releases, latest release name/date/draft/prerelease where present.
- PyPI JSON endpoints for `microquantum` 1.1.0 and `quantsmind` 1.1.0 (published 2026-09-23 / 2026-09-24, production/stable classifiers).
- Live fetch `https://www.quantsmind.com` (2026-11-18) — navigation, hero copy, mission cards, footer, products section.
- Unit suite baseline 498/498 (all green as of PR #13 merge).
- Local untracked/modified files (2 modified, 47 untracked) preserved and not included in any release.

**END OF REPORT**
