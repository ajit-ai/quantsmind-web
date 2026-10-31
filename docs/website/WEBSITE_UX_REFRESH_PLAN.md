# QuantsMind Website UX Refresh Plan

- **Repository:** [ajit-ai/quantsmind-web](https://github.com/ajit-ai/quantsmind-web)
- **Programme:** Website UX Modernization
- **Status:** v1.0.0 local qualification closed on `feature/website-ux-refresh`; awaiting production-release approval
- **Baseline commit:** `2a9db5b` (`main` = `develop`)
- **Plan owner:** QuantsMind
- **Last updated:** 31 October 2026

---

## 1. Purpose

This plan coordinates a staged modernization of the public QuantsMind website. The work must improve clarity, navigation, visual consistency, responsiveness, accessibility and search performance without destabilising the existing Angular application, its content, or its deployment path.

The programme is delivered as five gated milestones, from **v0.1.0** through **v1.0.0**. Each milestone is reviewed and accepted before the next begins. Production promotion happens only after local verification, green CI, and explicit approval.

This document is the release-tracking record for the programme. The repository currently has no tags, changelog, or release-tracking convention, so the milestone roadmap below is authoritative for the UX refresh. No new release tooling is introduced by this plan.

---

## 2. Scope and exclusions

### 2.1 In scope

- A compact, professional header and responsive navigation.
- The agreed ten-section homepage structure.
- A compact four-column footer with verified business contact details.
- Presentation improvements to Services, Products, Technology, Quantum Mission, Labs, Blog, Contact and About.
- Responsive behaviour across desktop, tablet and mobile widths.
- Accessibility improvements for new and changed interfaces.
- SEO metadata, prerendering, performance and documentation updates.
- CI/CD qualification, branch synchronization and an approved production release.

### 2.2 Exclusions and non-negotiable constraints

The programme must not:

- Modify any product repository.
- Change DNS, Hostinger settings, or hosting configuration.
- Change the Formspree endpoint or contact email delivery.
- Remove existing website features.
- Replace the Angular architecture.
- Perform a complete visual redesign outside the approved scope.
- Add unsupported product maturity or general-availability (GA) claims.
- Add invented customer logos, testimonials, statistics or partnerships.
- Add individual product GitHub repository links to product cards.
- Introduce unnecessary dependencies.
- Commit, push, merge, tag or deploy without explicit authorization.

The existing contact delivery path and hosting configuration are treated as fixed integrations. Any proposed change to them requires separate approval and is outside this programme.

---

## 3. Approved design decisions

These decisions are recorded here as the design baseline for all five milestones. Changes require explicit approval.

### 3.1 Header

Retain exactly seven primary navigation destinations:

1. Home
2. Services
3. Products
4. Technology
5. Labs
6. Blog
7. About

Contact remains a separate, prominent call-to-action rather than an eighth navigation item. The header should be compact, professional and modern, with a responsive mobile navigation pattern that preserves access to every destination. Existing useful capabilities such as the Services and Technology submenus, search and theme control must not be removed without approval.

### 3.2 Homepage

The homepage will follow this ten-section structure:

1. Header and Hero.
2. Trust and Capabilities.
3. Engineering Services.
4. Featured Products.
5. Quantum Mission spotlight.
6. Technologies We Develop.
7. Why QuantsMind.
8. Labs and Innovation.
9. Insights and Blog.
10. Business Contact CTA and Footer.

v0.1.0 implements this structure on the homepage. The Quantum Mission spotlight presents the ten approved applications as proposed initiatives; the dedicated product-page presentation remains part of v0.2.0.

### 3.3 Services

Retain the six approved service domains:

1. Quantum Computing & Quantum Software Engineering.
2. Space Systems & Mission Software Engineering.
3. AI Engineering & Autonomous Intelligent Systems.
4. Scientific Computing & Digital Simulation.
5. Cybersecurity Engineering & Digital Trust.
6. Industrial Intelligence & Digital Twin Engineering.

### 3.4 Technology

Present the three approved technologies:

- **Karkain**
- **MicroQuantum**
- **QuantsMind Quantum SDK**

Current public versions and availability must be verified against authoritative release sources before any version, maturity or availability statement is published. Existing developer-preview and limitation language must be preserved where it remains accurate.

### 3.5 Quantum Mission

Prepare a prominent dedicated homepage section and product-page presentation covering these ten independent applications:

1. QuantumStudio
2. QubitSim
3. QuantumForge
4. QOptima
5. QuantumShield
6. HybridQ
7. QuantumBench
8. QuantumChem
9. QResource
10. QuantumVerify

No application may be described as generally available, production-ready or GA without verified release evidence. Maturity labels must reflect the evidence available at the time of publication.

### 3.6 Footer

Use a compact four-column structure:

| Column | Required content |
| --- | --- |
| **Company** | QuantsMind identity, short description and LinkedIn/GitHub social links. This is the footer's only GitHub link. |
| **Explore** | About, Services, Labs and Blog. |
| **Products & Technology** | Products, Quantum Mission, Space Systems, Cybersecurity, Karkain, MicroQuantum and QuantsMind Quantum SDK, with overview links rather than per-product GitHub links. |
| **Connect** | `ajitkumar@quantsmind.com`, `Jodhpur, Rajasthan, India` and a contact link. |

The bottom bar must include the copyright notice, Privacy Policy and Terms of Use. The existing Cookie Policy link should be retained unless its removal is explicitly approved.

The footer must **not** publish an unverified street address. Only the approved city/state/country location may be shown.

---

## 4. Version roadmap

| Version | Theme | Primary deliverables | Exit criteria |
| --- | --- | --- | --- |
| **v0.1.0** | Header, footer, homepage and visual foundation | Compact seven-destination header with Contact CTA; responsive mobile navigation; four-column footer with approved contact details; ten-section homepage structure; shared visual foundation. | Header, footer and homepage pass responsive, accessibility, content-claim and regression review; all baseline gates remain green. |
| **v0.2.0** | Services, Products, Quantum Mission and Technology | Refined Services presentation for the six domains; improved Products portfolio; Quantum Mission homepage spotlight and product presentation for the ten applications; Technology presentation for Karkain, MicroQuantum and QuantsMind Quantum SDK. | Six domains, ten applications and three technologies are presented consistently; every version and maturity claim is backed by verified evidence; no GA claim without release proof. |
| **v0.3.0** | Labs, Blog, Contact and business presentation | Improved Labs and Blog presentation; refined Contact experience without changing delivery configuration; consistent business identity, location and calls to action. | Content is accurate and complete; contact delivery remains unchanged; no invented proof or partnerships. |
| **v0.4.0** | Responsive design, accessibility, SEO and performance | Cross-breakpoint refinement; keyboard, focus and reduced-motion checks; semantic and ARIA review; metadata, canonical and prerender coverage; performance and bundle-budget review. | Responsive smoke suite passes at all configured widths; accessibility review is complete; metadata and prerender assertions pass; no budget regressions without approval. |
| **v1.0.0** | Final qualification, documentation, CI/CD, synchronization and production release | Full verification; documentation reconciliation; CI/CD qualification; `develop` and `main` synchronization; approved production release and post-deployment verification. | All required checks pass; documentation matches the shipped site; production is verified; branches are synchronized; release is explicitly approved. |

Milestones are cumulative. A later milestone may not weaken an earlier acceptance criterion. Tagging or publishing a release requires explicit authorization; Prompt 1 does neither.

---

## 5. Git branching and promotion strategy

### 5.1 Branch roles

| Branch | Role |
| --- | --- |
| `main` | Production. Deployable and protected. Receives changes only through reviewed pull requests. |
| `develop` | Integration baseline. Receives completed feature work and must remain deployable. |
| `feature/website-ux-refresh` | Implementation branch for this programme. Created from the latest qualified `develop`. |

### 5.2 Promotion flow

1. Fetch and verify the latest `develop`.
2. Work only on `feature/website-ux-refresh` (or short-lived branches created from it for isolated changes).
3. Run the full local verification suite.
4. Open a pull request from the feature branch into `develop`; require green CI and review.
5. Verify the integrated result on `develop`.
6. Promote to `main` through a reviewed pull request only after milestone acceptance.
7. Let the `main` deployment workflow publish to production.
8. Fast-forward `develop` to the released `main` commit so both branches stay aligned.

Direct commits to `main` or `develop` are not permitted. Published history must not be rewritten. Force pushes and branch deletion are prohibited on `main`.

### 5.3 Baseline branch preparation

At the start of Prompt 1, `feature/website-ux-refresh` existed locally at `b00fa67` and was an ancestor of `develop`. It was fast-forwarded to the qualified baseline `2a9db5b`; its history was preserved, not recreated or reset. No remote feature branch existed, and none was pushed.

The repository README currently documents a main-first branching convention. For this programme, the `develop`-integration strategy above governs. The README must be reconciled with the shipped strategy as part of the v1.0.0 documentation work, or earlier if approved.

---

## 6. Testing and acceptance requirements

### 6.1 Required local checks

Every implementation milestone must run:

```sh
npm run build
npm test -- --watch=false
npm run build:static
npm run test:prerender
npm run smoke
git diff --check
```

A plain `npm run build` leaves only `index.html`, so the prerender-dependent unit assertions are skipped. Run `npm run build:static` before the full unit suite when a complete 415-test result is required. The baseline was 414 tests; v0.1.0 adds one footer structure test.

### 6.2 Acceptance gates

- Production build completes without errors.
- Unit suite: **415/415 tests pass** after a static build (baseline 414, plus one v0.1.0 footer test).
- Prerender suite: **86/86 tests pass**.
- Responsive smoke: **162/162 checks pass** across 27 routes and six widths (1440, 1280, 1024, 768, 390, 360), with no horizontal overflow or console errors.
- Prerender output contains 26 route files plus `404.html`, and `sitemap.xml` declares 26 URLs.
- Keyboard navigation, visible focus, semantic headings and reduced-motion behaviour are verified for changed interfaces.
- No broken internal links, missing metadata, duplicate canonicals or incorrect page titles.
- No unsupported maturity, version, GA, customer, partnership or performance claims.
- Visual review at desktop, tablet and mobile widths is complete.
- Initial bundle remains within the configured warning and error budgets; any regression is documented and approved.
- No existing feature is removed without explicit approval.

### 6.3 Content verification

Version and availability statements must be checked against the relevant package index, release page or repository evidence before publication. Where evidence is incomplete, the interface must say so rather than infer maturity. The ten Quantum Mission applications and three Technology entries require the same evidence standard.

---

## 7. Deployment controls

- Production deployment is performed only by `.github/workflows/deploy.yml` on a push to `main` (or an authorized manual dispatch).
- Feature and integration branches must not deploy to production.
- The workflow runs unit tests, builds, prerenders all public routes, verifies prerendered HTML and metadata, runs the responsive smoke test, writes the `www.quantsmind.com` CNAME, and deploys the GitHub Pages artifact.
- `main` is protected by required status checks (`Unit Tests` and `Build, Prerender & Smoke`), strict up-to-date branches, enforced admin rules, conversation resolution, and prohibitions on force pushes and deletion.
- `develop` is currently unprotected. Protection is a process control: no direct pushes and no unverified promotion.
- DNS, Hostinger and custom-domain configuration are outside this programme and must not be changed.
- Rollback follows the documented path: revert the offending merge on `main` through a pull request, or re-run the last successful deployment. Post-rollback checks cover `/`, `/sitemap.xml`, a deep link and an unknown URL.

---

## 8. Approval requirements

- Each of the five prompts is executed only after the previous prompt is accepted.
- No commit, push, merge, tag or deployment occurs without explicit authorization.
- Promotion to `main` requires:
  - milestone acceptance,
  - green required checks,
  - review of the final diff and content claims,
  - explicit production-release approval.
- Changes to approved design decisions, exclusions, branch strategy or deployment controls require explicit approval and an update to this plan.
- Product maturity, version and availability claims require evidence review before publication.
- Contact delivery, DNS, hosting and product repositories remain untouched unless a separately approved change explicitly covers them.

---

## 9. Current position and next step

Prompt 1 established the planning baseline, Prompt 2 implemented v0.1.0, and Prompt 3 implemented v0.2.0:

- `main` and `develop` remain at `2a9db5b`; `feature/website-ux-refresh` is the active implementation branch at the same baseline plus uncommitted working-tree changes.
- The header is 68px high inside a 71px sticky shell, retains the seven approved destinations and keeps Contact as a separate CTA. Search, theme switching, mega menus and the mobile drawer remain available, with 44px mobile touch targets. The Products/Technology mega menus now include the dedicated Quantum Mission route.
- The footer is a four-column dark layout (`Company`, `Explore`, `Products & Technology`, `Connect`) with one GitHub link, no product repository links, city-level location and a slim copyright/Privacy/Terms/Cookie bar. Its Quantum Mission link now targets `/quantum-mission`.
- The homepage implements the ten approved sections using the product registry and published blog content. Quantum Mission applications retain their `proposed` maturity language; the spotlight and featured-product links now target `/quantum-mission`; no GA, customer, partnership or performance claims were added.
- Services now presents six anchored sections (quantum computing, space systems, AI engineering, scientific computing, cybersecurity and digital trust, industrial intelligence and digital twins) with capability, deliverable, context and outcome content, related technology/product showcases and links to `/quantum-mission` for the quantum service.
- Products now presents a registry-driven portfolio with category navigation, anchored sections, verified technology tags, and a dedicated Quantum Mission callout linking to `/quantum-mission`.
- The dedicated `/quantum-mission` route presents the ten independent proposed applications, principles, and a separate MicroQuantum callout. All applications remain `proposed` / `not-available`.
- Technology now presents Karkain, MicroQuantum and the QuantsMind Quantum SDK as the three developed technologies, with verified capabilities, language details, version, maturity and documentation, plus the wider engineering ecosystem.
- `npm run build` passes with a 598.93 kB initial total against the 600 kB warning budget. After `npm run build:static`, unit tests pass 340/340 (85 skipped), prerender covers 27 routes, the sitemap declares 27 URLs consistently, and responsive smoke passes 168/168.
- No commit, push, merge into `develop` or `main`, tag or deployment has occurred. The working tree contains the v0.2.0 source changes and untracked documentation files under `docs/website/`.

v0.2.0 validation is closed: `npm run build:static` generated 27 route files with a consistent 27-URL sitemap; `npm test -- --watch=false` passed 425/425 (the previously reported 85 skips are now resolved and passing); `npm run test:prerender` passed 86/86; `npm run smoke` passed 168/168; `git diff --check` passed. Bundle size is 598.93 kB. No application source changes were made during closure.

The next milestone is v0.3.0 (Labs, Blog, Contact and business presentation). Work stops after v0.2.0 until the user approves Prompt 4.

---

## 10. Related documents

- [Website UX Refresh Baseline Report](./WEBSITE_UX_REFRESH_BASELINE_REPORT.md)
- [Website UX Refresh v0.1.0 Implementation Report](./WEBSITE_UX_REFRESH_V0.1.0_IMPLEMENTATION_REPORT.md)
- [Website UX Refresh v0.2.0 Implementation Report](./WEBSITE_UX_REFRESH_V0.2.0_IMPLEMENTATION_REPORT.md)
- [Website UX Refresh v0.3.0 Implementation Report](./WEBSITE_UX_REFRESH_V0.3.0_IMPLEMENTATION_REPORT.md)
- [Website UX Refresh v0.4.0 Implementation Report](./WEBSITE_UX_REFRESH_V0.4.0_IMPLEMENTATION_REPORT.md)
- [Website UX Refresh v1.0.0 Final Qualification Report](./WEBSITE_UX_REFRESH_V1.0.0_FINAL_QUALIFICATION_REPORT.md)
- Repository README: architecture, commands, CI/CD, branching, rollback and design system.
