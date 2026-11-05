# QuantsMind Website v2.0.0 — Business Redesign Foundation

**Document type:** Foundation and specification (no redesign implemented)
**Date:** 2026-11-04
**Repository:** `F:\Codes\Git\quantsmind-web`
**Branch:** `feature/website-evolution-v2.0.0`
**Baseline commit:** `0963950` — `feat(website): complete QuantsMind UX refresh v1.0.0 (#11) (#12)`
**Production baseline:** v1.0.0 (commit message only; the repository has **no Git tags**)
**Scope:** Milestone 1 — read-only inspection, business information architecture, page requirements, GitHub link audit, implementation plan

> This milestone is specification only. No application source, styling, routes, tests, configuration, package files or content were modified. The only file created is this report.

---

## 1. Actual application baseline and build/test status

### 1.1 Repository state (read-only Git inspection)

| Item | Observed value |
|---|---|
| Branch | `feature/website-evolution-v2.0.0` |
| HEAD | `0963950` |
| Remote | `https://github.com/ajit-ai/quantsmind-web.git` |
| Modified (tracked) files | **22** |
| Untracked files/entries | **49** |
| Git tags | **None** — v1.0.0 cannot be resolved as a tag |
| Working-tree reports | 22 prior reports under `docs/website/` (untracked) — preserved |

Tracked files modified in the working tree (all preserved, not touched):

```
README.md
public/sitemap.xml
src/app/app.routes.ts
src/app/content/products/product.model.ts
src/app/content/products/product.registry.spec.ts
src/app/content/products/product.registry.ts
src/app/layout/footer/footer.component.spec.ts
src/app/layout/footer/footer.component.ts
src/app/pages/blog/blog.component.ts
src/app/pages/contact/contact.component.ts
src/app/pages/home/home.component.ts
src/app/pages/karkain/karkain.component.ts
src/app/pages/products/products.component.spec.ts
src/app/pages/products/products.component.ts
src/app/pages/quantsmind-sdk/quantsmind-sdk.component.ts
src/app/pages/quantum-mission/quantum-mission.component.spec.ts
src/app/pages/quantum-mission/quantum-mission.component.ts
src/app/pages/services/services.component.spec.ts
src/app/pages/services/services.component.ts
src/app/pages/technology/technology.component.spec.ts
src/app/pages/technology/technology.component.ts
src/app/shared/components/qm-button/qm-button.component.ts
```

Notable untracked work that must be preserved and is **part of the measured baseline**:

- `src/app/content/services/engagement.models.ts` (new commercial engagement framework, 5 models)
- `src/app/shared/components/qm-product-detail/` (registry-driven product detail route component)
- `src/app/pages/home/home.component.spec.ts`, `src/app/pages/quantsmind-sdk/quantsmind-sdk.component.spec.ts`, `src/app/content/website-documentation.spec.ts`
- 22 reports under `docs/website/`
- 20 root-level build/test logs, 8 ad-hoc `fix*.py` / `run.py` scripts, 4 temporary text files

**Baseline caveat:** the status above describes the working tree, not v1.0.0. The 22 modified files contain approximately 1,499 insertions and 223 deletions, so any measurement in this report is a measurement of the current uncommitted state.

### 1.2 Application structure

- Angular 22 standalone application (`src/main.ts`, `src/app/app.config.ts`), zone-based change detection, `provideRouter` with anchor scrolling.
- Root shell: `src/app/app.component.ts` renders `<qm-header>`, `<main id="main-content">` with `<router-outlet>`, and `<qm-footer>`.
- Lazy-loaded route components under `src/app/pages/`; shared presentational components under `src/app/shared/components/`.
- Inline templates and component styles in each `.ts` file; global SCSS design system in `src/styles/` (`_tokens.scss`, `_layout.scss`, `_surface.scss`, `_typography.scss`, `_utilities.scss`, `_visuals.scss`).
- Content is data-driven in three registries:
  - Products: `src/app/content/products/product.registry.ts` + `product.model.ts` — **41 entries** (verified by `grep -c "^    id: '"`), 5 portfolios, explicit maturity/availability/verification model.
  - Services: the six service domains are defined inline in `src/app/pages/services/services.component.ts`; the commercial framework is `src/app/content/services/engagement.models.ts` (5 engagement models).
  - Insights: `src/app/pages/blog/articles/` with 11 article objects aggregated in `articles/index.ts`.
- SEO: route metadata in `src/app/app.routes.ts` applied at runtime by `src/app/core/route-meta.service.ts` (`https://www.quantsmind.com` canonical origin).
- Static generation: `scripts/prerender.mjs` discovers static routes from `app.routes.ts` and article slugs from `articles/*.article.ts`, renders them in headless Chrome, writes `dist/quantsmind-web/browser/<route>/index.html`, captures `/404/` as `404.html`, and verifies `public/sitemap.xml` contains every generated route.
- Responsive verification: `scripts/responsive-smoke.mjs` checks 34 routes at 6 viewports for overflow and console errors.
- Tests: Angular unit-test builder with Vitest 4 (`vitest.config.ts`: `pool: 'forks'`, `singleFork: true`, `isolate: false`); 27 `*.spec.ts` files.
- CI: `.github/workflows/ci.yml` runs unit tests on push/PR, then build + prerender + prerender tests + smoke on Chrome; `deploy.yml` is the deployment workflow.

### 1.3 Build status — **PASS (1 warning)**

Command: `npm run build` (`ng build`, production configuration)

```
Initial total: 604.97 kB raw / 147.01 kB estimated transfer
  main-W55S563G.js      529.28 kB / 127.85 kB
  styles-FMMQOWFY.css    41.10 kB /   7.82 kB
  polyfills-5CFQRCPP.js  34.59 kB /  11.33 kB
Application bundle generation complete. [53.704 seconds]
WARNING: bundle initial exceeded maximum budget.
Budget 600.00 kB was not met by 4.97 kB with a total of 604.97 kB.
Output: dist/quantsmind-web
```

- Result: exit code 0, no compilation errors.
- Budget configuration (`angular.json`): initial `maximumWarning` 600 kB, `maximumError` 900 kB; component style warning 14 kB, error 16 kB.
- The warning is pre-existing in the current working tree and is a real constraint for M2–M5: the redesign must not increase the initial bundle without an approved budget decision.

### 1.4 Prerender status — **PASS**

Command: `npm run prerender`

```
[prerender] wrote 33 route files + 404.html
[prerender] sitemap.xml declares 33 URLs — consistent
```

- All 22 static routes + 11 article routes rendered; every capture passed the `<h1>`, canonical, title and description checks.
- `/404/` captured as `404.html` with `noindex`.
- `public/sitemap.xml` declares 33 URLs and matches the generated set.

### 1.5 Responsive smoke status — **PASS**

Command: `npm run smoke`

```
34 routes × 6 viewports (1440px, 1280px, 1024px, 768px, 390px, 360px)
PASS — 204 checks, no overflow or console errors.
```

### 1.6 Unit-test status — full suite PASS

Command: `npx ng test --watch=false`

- The full suite was started twice. The first attempt was stopped after 10 minutes with no visible output because the shell pipe (`| tail`) buffers until process exit; this was a measurement artefact, not a test failure.
- A single-spec control run **PASSED**:

```
npx ng test --include=src/app/layout/footer/footer.component.spec.ts --watch=false
✓ src/app/layout/footer/footer.component.spec.ts (4 tests) 978ms
Test Files 1 passed (1)
Tests 4 passed (4)
Duration 69.74s (transform 1.22s, setup 8.87s, import 1.14s, tests 978ms, environment 54.63s)
```

- The Vitest environment setup alone takes ~55 seconds on this Windows machine, so a full-suite run is slow. The full-suite run was then completed unbuffered and **PASSED**:

```
npx ng test --watch=false
Test Files 27 passed (27)
Tests 471 passed (471)
Start at 21:55:51
Duration 81.95s (transform 5.98s, setup 6.46s, import 7.97s, tests 26.60s, environment 35.06s)
exit code 0
```

- No test was skipped or modified. The earlier "pending" status was a reporting gap caused by output buffering, not a test failure.
- Existing spec inventory (27 files): app shell; header; footer; contact component/service; route metadata; product registry; product card/portfolio/detail; product page; services page; technology page; quantum, quantum-mission; home; karkain (no spec); MicroQuantum (no spec); SDK; Labs (no spec); blog index/article/render/links/sitemap/prerender/articles; website documentation; shared section/info-card/service-showcase.

### 1.7 CI gates (authoritative verification path)

`.github/workflows/ci.yml`:

1. `npm test -- --watch=false`
2. `npm run build:static` (build + prerender)
3. `npm run test:prerender`
4. `npm run smoke`

The composite local command is `npm run verify` (build:static + test:prerender + smoke). Build, prerender and smoke individually passed in this baseline; the composite was not run as one command.

---

## 2. Current page and route inventory

### 2.1 Routes (24 entries: 22 static, 1 parameterised, 1 wildcard)

| # | Route | Component | Prerendered | Current role |
|---|---|---|---|---|
| 1 | `/` | `pages/home` | Yes | Homepage (engineering delivery positioning) |
| 2 | `/services` | `pages/services` | Yes | Six engineering service domains + engagement model |
| 3 | `/products` | `pages/products` | Yes | Registry-driven product portfolio + Marketplace (on hold) |
| 4 | `/products/quantum-studio` | `qm-product-detail` | Yes | Product detail |
| 5 | `/products/ground-link` | `qm-product-detail` | Yes | Product detail |
| 6 | `/products/ai-guard` | `qm-product-detail` | Yes | Product detail |
| 7 | `/products/qubit-sim` | `qm-product-detail` | Yes | Product detail |
| 8 | `/products/threat-intel` | `qm-product-detail` | Yes | Product detail |
| 9 | `/products/telemetry-hub` | `qm-product-detail` | Yes | Product detail |
| 10 | `/quantum-mission` | `pages/quantum-mission` | Yes | Ten proposed quantum applications |
| 11 | `/technology` | `pages/technology` | Yes | Karkain, MicroQuantum, SDK + wider ecosystem |
| 12 | `/microquantum` | `pages/microquantum` | Yes | Developer-facing technology deep dive |
| 13 | `/karkain` | `pages/karkain` | Yes | Developer-facing technology deep dive |
| 14 | `/quantsmind-sdk` | `pages/quantsmind-sdk` | Yes | Developer-facing technology deep dive |
| 15 | `/labs` | `pages/labs` | Yes | Research projects and exploration pipeline |
| 16 | `/blog` | `pages/blog` | Yes | Article index with category filters |
| 17 | `/blog/:slug` | `pages/blog/article` | 11 slugs | Article renderer |
| 18 | `/about` | `pages/about` | Yes | Company pillars, principles, direction |
| 19 | `/contact` | `pages/contact` | Yes | Formspree enquiry form + sidebar |
| 20 | `/quantum` | `pages/quantum` | Yes | Quantum engineering service detail page |
| 21 | `/privacy` | `pages/privacy` | Yes | Legal |
| 22 | `/terms` | `pages/terms` | Yes | Legal |
| 23 | `/cookies` | `pages/cookies` | Yes | Legal |
| 24 | `**` | `pages/not-found` | 404.html | Not found |

Prerendered total: 33 route files + `404.html` (34 documents).

### 2.2 Current navigation

**Header** (`src/app/layout/header/header.component.ts:1008-1070`):

- Home `/`
- Services `/services` (mega menu: six domains, each linking to `/services#<id>`; Quantum item links to standalone `/quantum`)
- Products `/products` (Quantum Mission `/quantum-mission`; Quantum Software `/products#quantum-software`; Space Systems `/products#space-software`)
- Technology `/technology` (MicroQuantum, Karkain, QuantsMind SDK)
- Labs `/labs`
- Blog `/blog`
- About `/about`
- Actions: search overlay, theme toggle, CTA **Get in Touch** → `/contact`
- Desktop nav breakpoint: 1200 px; mobile drawer with submenus.

**Footer** (`src/app/layout/footer/footer.component.ts:446-480`):

- Explore: About, Services, Labs, Blog
- Products & Technology: Products, Quantum Mission, Space Systems (`/products#space-software`), Cybersecurity (`/products#cybersecurity-software`), Karkain, MicroQuantum, QuantsMind SDK
- Connect: `ajitkumar@quantsmind.com`, Jodhpur location, “Start a conversation” → `/contact`
- Legal: Privacy, Terms, Cookies
- Social: LinkedIn; **general GitHub organization link** `https://github.com/quantsmind` (the only GitHub link in the footer)
- Brand copy: “Engineering software products, intelligent systems and advanced technology for businesses and emerging domains.” Logo tagline: “Technology Engineering”.

**Search index** (`header.component.ts:1072-1095`) hard-codes page titles and capability names, including “Services”, “Products”, “Technology”, “Labs”, “Blog”, “About”, and product registry entries. Any navigation/content rename must update this index in the same milestone.

### 2.3 Homepage structure (current)

`src/app/pages/home/home.component.ts` (1,521 lines) — ordered sections:

1. Hero: “Engineering software for demanding systems.” Lead defines QuantsMind as “an engineering delivery company”; CTAs **Discuss Your Project** (`/contact`) and **Explore Engineering Services** (`/services`); decorative system map with metrics 06 domains / 41 portfolio products / 03 published technologies.
2. Focus-area marquee (six domains).
3. Trust and capabilities: “From problem definition to working software.”; count-up metrics; values Architecture-led, Simulation-first, Production-minded, Evidence-backed.
4. Engineering services: “Six domains. One engineering delivery partner.”; six capability cards.
5. Engagement framework: “Start with the problem. Scale to delivery.”; five `ENGAGEMENT_MODELS`; link to `/services#engagement-models`.
6. Featured products: “Products and initiatives, with their real status.”; link to `/products`.
7. Quantum Mission callout: “Ten independent applications for quantum software engineering.”
8. Technology: “Published technologies, built from first principles.”; Karkain, MicroQuantum, SDK.
9. Why cards: “Built for difficult engineering.”
10. Labs: “Where we explore emerging technologies.”
11. Insights: “Notes from the work.”; three selected articles.
12. Final CTA: “Have an Engineering Challenge?” → `/contact`.

Tone: credible and mature, but still framed around “engineering delivery”, “first principles”, “developer preview” and product/technology internals rather than business outcomes.

### 2.4 Services page (current)

`src/app/pages/services/services.component.ts` (693 lines):

- Hero: “Engineering Services” + CTAs **Discuss an Engineering Requirement** and **Explore Products**.
- “Engineering Engagement Model” with four steps (Discovery & Feasibility, Architecture & Consulting, Prototype & Development, Implementation & Support).
- “Six engineering domains. One delivery approach.” with service navigation.
- Four delivery steps (Assess, Design, Engineer, Support).
- Six service sections, each with: icon, title, short description, “Typical problem”, “What we provide”, “Practical deliverables”, “Technology & capability context”, “Outcome”, related technologies with maturity badges, related product showcase, optional detail/extra links, and CTAs **Discuss this requirement** + **View related products**.
- Final CTA: “Discuss an Engineering Requirement”.

The six domains (exact titles):

1. Quantum Computing & Quantum Software Engineering
2. Space Systems & Mission Software Engineering
3. AI Engineering & Autonomous Intelligent Systems
4. Scientific Computing & Digital Simulation
5. Cybersecurity Engineering & Digital Trust
6. Industrial Intelligence & Digital Twin Engineering

This page is already partly business-framed (problem/outcome), but headings such as “What we provide”, “Practical deliverables”, “Technology & capability context” and “Related QuantsMind technologies” read as engineering documentation.

### 2.5 Products page (current)

`src/app/pages/products/products.component.ts` (944 lines):

- Hero: “QuantsMind Products”, registry-driven portfolio, maturity/availability evidence; CTAs **Request Product Access** and **Explore Technologies**.
- Category navigation: Standalone Software, Quantum Computing Software, Space Systems Software, Cybersecurity & Digital Trust Software, Programming Languages & Developer Tools, plus Quantum Mission.
- Featured product presentation.
- Five portfolio sections with anchors `quantum-software`, `space-software`, `cybersecurity-software`, and developer tools.
- **Marketplace section** at lines 344–382 (`#marketplace`, `marketplaceProducts()`, `marketplaceEntries`). **ON HOLD — do not redesign, extend, remove or revert.**
- “Technologies and products are different things.” comparison.
- Maturity stages: “How work becomes a product.”
- “How to get a product.” access flow; CTAs **Request Access** and **Explore QuantsMind Technologies**.

### 2.6 Technology page (current)

`src/app/pages/technology/technology.component.ts` (668 lines):

- Hero: “Technologies We Develop” — open software technologies with verified capabilities, language, release, maturity and public documentation.
- Primary technologies: Karkain, MicroQuantum, QuantsMind SDK with capabilities, language, maturity, version, documentation/release links (several GitHub URLs).
- Wider ecosystem: QuantsMind Relational DB, GuardMCP, QuantsMind-Agent, QuantsMind-LLM; external repository links where verified.
- Ecosystem map and “Built with the same engineering discipline.” collaboration CTA → `/contact`.

### 2.7 Research, About, Insights, Contact (current)

- **Labs** (`labs.component.ts`, 644 lines): hero “QuantsMind Labs”; philosophy (Explore → Evolve); three research projects (Vsector, OSINT Intelligence Platform, AI Fake News Detection) with repository links; exploration pipeline; connections to MicroQuantum/Karkain/SDK; wider exploration areas; “Labs → Technology → Business”; CTA includes a **general GitHub button** outside the footer.
- **About** (`about.component.ts`, 191 lines): hero “About QuantsMind.”; two pillars (Engineering Services, Technology Development); six principles (Engineering First, Architecture Driven, Honest About Maturity, Long-Term Thinking, Evidence Over Assumption, Problems Before Technology); “Where We Are Headed.”; CTA **Get in Touch**.
- **Insights** (`blog.component.ts`, 250 lines): hero “Articles”; category filters (Products, Technology, Labs); grouped article cards; 11 long-form articles, all technical/developer-oriented.
- **Contact** (`contact.component.ts`, 605 lines): hero “Let's Build Something Useful.”; **Send an Enquiry** form (Name, Company, Work Email, Area of Interest, Message + hidden honeypot); validation, minimum form age (2.5 s), 5 s cooldown, 15 s submit timeout; provider abstraction; success/failure/not-configured states; sidebar entry points BUILD / MODERNIZE / EXPLORE; “What Happens Next?” 4 steps; address, email and LinkedIn.
- **Quantum** (`quantum.component.ts`): quantum engineering service detail with honest hardware/advantage disclaimers; links to MicroQuantum.
- **Quantum Mission** (`quantum-mission.component.ts`): ten proposed applications, principles, evidence note, MicroQuantum distinction; no GitHub links.

### 2.8 Content and data registries (actual counts)

| Registry | Location | Count / content |
|---|---|---|
| Products | `src/app/content/products/product.registry.ts` | **41 products**: 11 standalone, 11 quantum, 8 space, 10 cybersecurity, 1 developer tool |
| Product model | `product.model.ts` | Maturity: proposed, in-development, research-prototype, alpha, developer-preview, validated, released. Availability: not-available, private-access, early-access, developer-access, public-download, general-availability. Verification states. No `githubUrl` field (spec asserts absence). |
| Services | inline in `services.component.ts:497-692` | Six domains, each with problem/provides/deliverables/context/outcome/technologies/showcase |
| Engagement models | `content/services/engagement.models.ts` | 5 commercial engagement models: discovery/feasibility, architecture consulting, PoC/prototype, dedicated implementation, integration/validation/support |
| Insights | `pages/blog/articles/` | 11 articles (DI Mini, MicroQuantum, Karkain, SDK, Relational DB, GuardMCP, QuantsMind-Agent, QuantsMind-LLM, Vsector, OSINT, Fake News) |
| Sitemap | `public/sitemap.xml` | 33 URLs, including 11 article URLs |

### 2.9 Design system and responsive styling

- Tokens (`src/styles/_tokens.scss`): canvas `#F8FAFC`, surface `#FFFFFF`, text `#111827`/`#475569`, accent blue `#2563EB`, indigo `#4F46E5`, cyan `#06B6D4`, Labs teal `#0D9488`, SDK violet `#7C3AED`, ink navy `#06101F`; brand/signal gradients; status colours; dark-mode surface tokens; CSS custom properties with `data-theme` switching.
- Typography: Sora display + Inter body (Google Fonts, `src/index.html`), JetBrains Mono in diagrams.
- Shared primitives: `qm-container`, `qm-section`, `qm-button`, `qm-badge`, `qm-page-hero`, `qm-product-card`, `qm-product-portfolio`, `qm-product-detail`, `qm-service-product-showcase`, `qm-info-card`, `qm-marquee`, `qm-count-up`, `qm-reveal` directive, `qmSafeHtml` and `hrefParts` pipes.
- Responsive approach: predominantly CSS grid with explicit breakpoints at 640/768/1024/1200 px; smoke test viewports 360–1440 px. Reduced-motion support is present across header, cards and reveals.

### 2.10 Contact and Formspree integration (actual mechanics)

- `src/app/core/contact.config.ts`: provider switch (`formspree` active), public Formspree form endpoint, optional Web3Forms key (empty), 15 s timeout. The endpoint is a public form identifier, not a secret; it is not reproduced here.
- `src/app/core/contact.service.ts`: validates the endpoint against `^https://formspree\.io/f/[A-Za-z0-9]+$`; sends JSON with `name`, `company`, `email`, `area`, `message`, `_gotcha`, `_subject`; maps failures to `not-configured | network | timeout | rejected`; payload is never logged.
- `contact.component.ts`: required validation (name ≥ 2, company ≥ 2, valid email, area selected, message ≥ 20); hidden honeypot must stay empty; rejects submissions faster than 2.5 s; 5 s cooldown; success/failure notices; direct email fallback if unconfigured.
- No backend is used; all submission logic is client-side.

---

## 3. Proposed business-oriented navigation and page hierarchy

### 3.1 Recommendation

| Proposed section | Destination | Existing mapping | Action |
|---|---|---|---|
| Home | `/` | Home | Retain route; rewrite copy and section priorities |
| Business Solutions | `/services` | Services | **Rename label**, rewrite as business solutions; retain route in v2.0.0 |
| Products & Technologies | `/products` (parent) | Products + Technology | **Consolidate in navigation**, retain both routes as children |
| ↳ Products & Applications | `/products` | Products page | Retain; business copy; Marketplace untouched |
| ↳ Technology Platforms | `/technology` | Technology page | Retain; remove repository links; business framing |
| ↳ Quantum Mission | `/quantum-mission` | Quantum Mission | Retain as a child destination |
| Research & Innovation | `/labs` | Labs | **Rename label**, rewrite; retain route in v2.0.0 |
| About QuantsMind | `/about` | About | Retain route; expand company identity |
| Insights | `/blog` | Blog | **Rename label**, business/industry framing; retain article URLs |
| Contact | `/contact` | Contact | Retain route; redesign as business enquiry destination |

**Header proposal:** six top-level labels — Home, Business Solutions, Products & Technologies (mega menu), Research & Innovation, About, Insights — plus the persistent **Start a Conversation** CTA to `/contact`. Contact becomes a CTA rather than a seventh label, which also relieves the 1200 px desktop nav width.

**Footer proposal:** group links as Company (About, Research & Innovation, Insights, Contact), Business Solutions (six domains), Products & Technologies (Products, Technology Platforms, Quantum Mission, published technologies), Connect (email, location, LinkedIn, general GitHub). Keep the general GitHub organization link in the footer only.

### 3.2 Retain / rename / consolidate / add

**Retain**

- All current routes and components in v2.0.0 — no URL changes in Milestone 2.
- Product detail routes, Quantum Mission, Quantum engineering detail, legal pages, 404.
- Machine-readable registries, maturity model, prerender and sitemap pipeline.

**Rename (labels only in M2)**

- “Services” → “Business Solutions”.
- “Labs” → “Research & Innovation”.
- “Blog” → “Insights”.
- “Products” + “Technology” → one nav group “Products & Technologies” with two child destinations.
- Header CTA “Get in Touch” → “Start a Conversation” (or approved equivalent).
- Home and About copy repositions QuantsMind as a technology engineering **and innovation** business, not only an engineering delivery company.

**Consolidate (navigation, not URLs)**

- Products and Technology become one navigation section; both pages remain because each carries distinct content and indexed URLs.
- Services mega menu and footer Solutions group use the same six business solution labels.
- Research & Innovation absorbs the Labs label; Labs project content stays but repository links are removed.

**Add (content/sections only, subject to approval)**

- A business enquiry-type selector and optional project context on Contact.
- “Engagement models” surfaced on Business Solutions (data already exists).
- Business outcomes and applications on Products & Technologies (data exists; wording requires approval).
- Research collaboration section on Research & Innovation (no partner claims without approval).
- Business-oriented Insights categories/content (requires authored, approved content).

**Not added**

- No invented case studies, clients, testimonials, partners, certifications, awards, commercial availability or delivery history.
- No new pages that would require unapproved claims.

### 3.3 Route-change policy (important)

Do **not** rename URLs in Milestone 2. GitHub Pages has no server-side redirects; a URL rename requires a redirect strategy (static redirect documents or host configuration), plus updates to `app.routes.ts`, `route-meta.service.ts`, `public/sitemap.xml`, prerender output and every internal link. Label changes deliver most of the business benefit without that risk. If `/solutions`, `/research` or `/insights` are required later, treat them as a separate, approved SEO migration in M3/M5 with 301-equivalent handling and sitemap changes.

---

## 4. Page-by-page business redesign requirements

For every page: new claims, metrics, client references, credentials and availability statements require explicit owner approval. Nothing below authorises invented content.

### 4.1 Homepage

**Business objective:** In under one screen, establish QuantsMind as an integrated technology engineering and innovation company that business leaders can engage, then route visitors to solutions, products or a conversation.

**Audience:** Business owners, founders, CTOs, CIOs, enterprise decision-makers, organisations seeking a technology partner.

**Main message:** “QuantsMind designs, builds and delivers technology that solves business problems — through engineering services, proprietary products and applied research — with honest maturity and evidence.”

**Required sections**

1. Hero: business identity; what QuantsMind does and for whom; primary CTA + secondary CTA; no developer jargon in the first screen.
2. Why QuantsMind / partner value: delivery approach, architecture discipline, evidence and accountability (reuse existing values without unverified claims).
3. Business Solutions: six domains presented as outcomes, not technology categories; link to Business Solutions.
4. Engagement models: how work starts and progresses (discovery, architecture, prototype, implementation, support) using `ENGAGEMENT_MODELS`.
5. Products & Technologies: selected products and platforms with explicit maturity/availability; link to Products & Technologies.
6. Research & Innovation: applied research and how it becomes product capability.
7. Insights preview: business-relevant perspectives.
8. Final CTA: start a conversation about a requirement, product enquiry or collaboration.

**Proposed CTAs:** “Start a Conversation” → `/contact`; “Explore Business Solutions” → `/services`; “Explore Products & Technologies” → `/products`; “Discuss a Product Requirement” → `/contact`.

**Existing assets to reuse:** current hero/visual system, `qm-marquee`, `qm-count-up`, `qm-section`, service cards, `ENGAGEMENT_MODELS`, product registry, technology cards, Labs areas, selected insights, final CTA band.

**Content requiring approval:** approved positioning statement; whether to keep the “41 portfolio products / 03 published technologies” metrics (most products are proposed, so the metric can mislead); priority industries; proof points; any client or delivery evidence; approved wording for “technology engineering and innovation company”.

**Implementation note:** the 1,521-line component is the largest page; preserve its responsive and accessibility behaviour and change content/structure incrementally rather than rewriting from scratch.

### 4.2 Business Solutions (current Services page)

**Business objective:** Convert capability descriptions into purchasable business solutions and make the engagement path obvious.

**Audience:** Decision-makers with a business problem, not developers looking for documentation.

**Main message:** “Six business solution domains, one accountable delivery approach: we assess the problem, design the architecture, engineer the system and support the outcome.”

**Required sections**

1. Hero: business outcome framing; CTA to discuss a requirement.
2. “How we engage”: five engagement models with customer situation, outputs and best fit (from `engagement.models.ts`).
3. Six solution domains, each with: business problem, what the business gets, typical deliverables, applicable products/technologies, maturity/limits, outcome, CTA.
4. Delivery process (Assess → Design → Engineer → Support).
5. Cross-links to relevant products and research.
6. Final CTA + contact routes.

**Proposed CTAs:** “Discuss Your Business Requirement”, “Request a Consultation”, “Explore Related Products”, “Start a Conversation”.

**Existing assets to reuse:** all six service data objects, the four-step delivery model, `qm-service-product-showcase`, six service anchors, Quantum detail page, Quantum Mission cross-link, final CTA band.

**Content requiring approval:** business-outcome wording per domain; industry applicability; engagement duration/commercial terms; SLAs; any delivery evidence; whether to publish indicative pricing (currently absent and must not be invented).

**Design direction:** keep the six-domain structure and anchors; replace documentation headings (“What we provide”, “Practical deliverables”, “Technology & capability context”) with business language (“Business challenges we solve”, “What you get”, “How we deliver it”); keep maturity badges but subordinate them to the business message.

### 4.3 Products & Technologies

**Business objective:** Explain what QuantsMind has built, what it is for, where it applies and how to access it — without exposing or promoting individual repositories.

**Audience:** Business evaluators, product buyers, CTOs assessing fit and maturity.

**Main message:** “A growing portfolio of QuantsMind products and technology platforms, each described with its real purpose, capabilities and availability; access is arranged directly with QuantsMind.”

**Required sections**

1. Hero: portfolio purpose and access model; CTA.
2. Portfolio navigation by business area (standalone, quantum, space, cyber, developer tools), retaining registry counts.
3. Featured/available products with maturity and availability badges.
4. Product applications/use cases and target business domains (fields already exist in the registry).
5. Technology platforms: Karkain, MicroQuantum, QuantsMind SDK — purpose, capabilities, applications, maturity, availability, documentation — **no individual GitHub repositories**.
6. Maturity/availability legend and access process.
7. Product enquiry CTA.

**Proposed CTAs:** “Request Product Access”, “Discuss a Product Requirement”, “Talk to Us About a Product”, “Explore Technology Platforms”.

**Existing assets to reuse:** 41-entry registry, `qm-product-card`, `qm-product-portfolio`, `qm-product-detail`, badges and labels, category anchors, technology page data, access-flow section.

**Marketplace constraint:** the Marketplace section in `products.component.ts` (lines 344–382 and its methods/specs) is **on hold** and must not be redesigned, extended, removed or reverted.

**Content requiring approval:** pricing/licensing, support terms, availability dates, demo access, commercial terms, product screenshots, and whether any product can be described as commercially available. Do not imply availability beyond the registry.

### 4.4 Research & Innovation (current Labs page)

**Business objective:** Demonstrate credible innovation capability and open a route to research collaboration, without overstating maturity.

**Audience:** CTOs, innovation leaders, potential research collaborators, enterprise technology evaluators.

**Main message:** “QuantsMind explores emerging technology through disciplined experiments; validated ideas become technologies, products or client solutions — and every project states its limits.”

**Required sections**

1. Hero: research identity and what it means for clients.
2. Research philosophy and pipeline (Explore → Experiment → Validate → Learn → Evolve).
3. Research areas (AI/ML, quantum, programming languages, scientific computing, data intelligence, future architectures).
4. Current research projects with maturity and explicit limitations; **no repository links**.
5. How research becomes a product or an engagement.
6. Collaboration invitation → Contact.
7. CTA.

**Proposed CTAs:** “Discuss a Research Collaboration”, “Explore Technology Platforms”, “Start a Conversation”.

**Existing assets to reuse:** Labs philosophy, project cards, maturity legend, pipeline, connections, exploration areas, “Labs → Technology → Business” section.

**Content requiring approval:** collaboration terms/IP policy, publication list, academic or industry partners, researcher profiles, approved project descriptions. Existing limitation statements are valuable and should be preserved, not softened.

### 4.5 About QuantsMind

**Business objective:** Establish who QuantsMind is, the expertise it brings, how it works and where it is going.

**Audience:** Decision-makers evaluating a long-term technology partner.

**Main message:** “QuantsMind is a technology engineering and innovation company combining client engineering, proprietary products and applied research — with an emphasis on evidence, maintainability and honest maturity.”

**Required sections**

1. Hero: concise company identity.
2. What we do: three pillars — Business Solutions, Products & Technologies, Research & Innovation.
3. How we work: the six existing principles, rewritten for business readers where necessary.
4. Company direction/vision.
5. Location and contact details (already public).
6. CTA.

**Proposed CTAs:** “Start a Conversation”, “Explore Business Solutions”, “Meet Our Products”.

**Existing assets to reuse:** pillars, principles, direction block, page hero, contact details.

**Content requiring approval:** founding year, team size/structure, leadership bios and photos, legal entity details, certifications, awards, partnerships, client logos, testimonials, mission statement. **None may be invented.**

### 4.6 Insights (current Blog)

**Business objective:** Build business credibility and organic discovery through useful technology and industry perspectives.

**Audience:** Business and technical evaluators researching problems, technologies and partners.

**Main message:** “Practical perspectives from the work — what we build, what we learn and what it means for organisations adopting advanced technology.”

**Required sections**

1. Hero: business-facing editorial promise.
2. Featured insight.
3. Category filters: Business Perspectives, Technology, Research (labels require approval; current categories are Products, Technology, Labs).
4. Latest articles with clear summaries and maturity context.
5. Topic-based cross-links to solutions/products.
6. CTA to discuss a topic or requirement.

**Proposed CTAs:** “Read the Insight”, “Discuss This Topic”, “Start a Conversation”.

**Existing assets to reuse:** article index/filters, article renderer, metadata, sitemap/prerender, 11 articles.

**Content requiring approval:** new business-oriented articles, author names/bios, publication dates and editorial policy, newsletter/subscription mechanism (none exists today; do not add without an approved provider), category renaming.

### 4.7 Contact (summary — full requirements in section 5)

**Business objective:** Make it easy for a business to start the right conversation and set expectations for response.

**Audience:** Prospects, existing clients, product evaluators, research collaborators.

**Main message:** “Tell us what you are trying to achieve; we will respond with a considered view of whether and how we can help.”

**Required sections:** business enquiry hero; enquiry-type selector; form; what happens next; direct contact details; trust/privacy note; optional FAQ about engagements.

**Existing assets to reuse:** Formspree provider abstraction, validation, honeypot/anti-spam, success/failure states, sidebar entry points, next steps, address/email/LinkedIn.

**Content requiring approval:** response-time commitment, business hours, phone number, sales vs support routing, privacy wording for new fields, any qualification questions (budget/timeline).

---

## 5. Contact page requirements

### 5.1 Enquiry types

The redesigned Contact page must support at least these business enquiry intents:

1. **Project engagement** — build, modernise or integrate a system.
2. **Enterprise solution** — a specific business solution domain.
3. **Product enquiry** — access, evaluation, licensing or information about a product.
4. **Consultation** — architecture, feasibility or technology-adoption advice.
5. **Research collaboration** — Labs, applied research or innovation partnership.
6. **Other / general enquiry.**

These should map to the existing `area` concept, but the current option list is technology-centric (“Quantum Computing”, “AI & Intelligent Systems”, etc.). Recommended approach: rename the selector to **“What can we help with?”** and offer the six intents above, optionally followed by a solution-domain selector. This is a UI/content change only; the submitted `area` field can carry the selected intent.

### 5.2 Form fields

**Preserve exactly:** name, company, work email, area, message, hidden honeypot; client-side validation; minimum form age; cooldown; 15 s timeout; success/failure/not-configured states; direct email fallback.

**Optional additions (require approval):**

- Enquiry type (if not used as the renamed `area`).
- Solution domain / product of interest.
- Project stage, timeline and approximate budget range (qualification; do not make budget mandatory).
- Preferred contact method.
- Consent checkbox linked to the privacy policy (only if legal wording is approved).

Any new field must be added to `ContactPayload` and both provider request builders, and must preserve `_gotcha` for Formspree. Formspree accepts additional named fields, but this must be verified with a live submission during implementation.

### 5.3 Layout and content

1. Hero: “Start a Conversation” / business enquiry promise.
2. Enquiry-type cards or selector.
3. Form with clear labels, helper text and accessible error messages.
4. “What happens next?” with realistic steps and no invented response-time SLA.
5. Direct email, location, LinkedIn; optionally business hours/phone if approved.
6. Privacy note explaining how enquiry data is used; link to `/privacy`.
7. Success state confirming receipt without claiming a response time that is not approved.

### 5.4 Business and trust requirements

- Professional, calm tone; no developer idioms.
- Explain what information helps (problem, constraints, timeline), not how to write code.
- Do not promise a response time, acceptance of work, pricing or availability without approval.
- Keep the fallback email visible if the provider is unconfigured.
- Maintain WCAG-friendly labels, focus states, `role="alert"` errors and keyboard behaviour.
- Do not weaken anti-spam controls or the endpoint allow-list.
- Do not print or embed secrets; the Formspree endpoint is a public identifier and remains in `contact.config.ts`.

### 5.5 Technical boundaries

- No backend introduction in v2.0.0; the static-hosting model and client-side Formspree integration remain.
- Preserve `ContactService.send()` error mapping and payload privacy (no logging).
- If a new provider is proposed, it must be a separately approved decision, not part of the visual redesign.
- Prerender must continue to produce `/contact/` with correct metadata.

---

## 6. GitHub link compliance findings

### 6.1 Required rule

- Keep the **general** GitHub organization link in the existing footer only.
- No specialised GitHub repository links for Karkain, MicroQuantum or any other individual product anywhere else on the website.
- Do not add new GitHub buttons or repository links.
- **Nothing was removed in this milestone.**

### 6.2 General GitHub link (allowed footer link)

| File:line | What it is | Rendered where | Compliant? |
|---|---|---|---|
| `src/app/layout/footer/footer.component.ts:476-478` | Label “QuantsMind on GitHub”; `https://github.com/quantsmind`; icon | Footer social row | **Yes — keep** |
| `src/app/layout/footer/footer.component.spec.ts:17-29` | Asserts exactly one GitHub link in the footer | Test | Keep; still valid |
| `src/index.html:56-59` | `sameAs` organization URL in schema.org `ProfessionalService` JSON-LD | Page head, not a visible link/button | Not a repository link. No change required; owner may retain it as corporate profile data. |

### 6.3 GitHub buttons/links outside the footer

| File:line | Target | How it is rendered | Classification |
|---|---|---|---|
| `src/app/pages/labs/labs.component.ts:307` | `https://github.com/quantsmind` | **GitHub** outline button in the Labs final CTA | General GitHub button outside footer — must be removed or replaced in M3/M4 under decision #4 |
| `src/app/pages/karkain/karkain.component.ts:49` | `https://github.com/ajit-ai/Karkain` | Hero **View on GitHub** outline button | Specialised repo button — remove in M3/M4 |
| `src/app/pages/karkain/karkain.component.ts:446-452` | GitHub section copy | “Explore Karkain on GitHub” section | Specialised GitHub promotion — rewrite |
| `src/app/pages/karkain/karkain.component.ts:456` | `https://github.com/ajit-ai/Karkain` | CTA **View on GitHub →** | Specialised repo button — remove |
| `src/app/pages/karkain/karkain.component.ts:459` | `https://github.com/ajit-ai/Karkain/releases` | CTA **Releases** | Specialised repository releases — remove |
| `src/app/pages/microquantum/microquantum.component.ts:56-57` | `links.github` = `https://github.com/ajit-ai/microquantum` | Hero **GitHub** button | Specialised repo button — remove |
| `src/app/pages/microquantum/microquantum.component.ts:403-414` | `links.github` | Resource card **View on GitHub →** | Specialised repo link — remove/replace |
| `src/app/pages/microquantum/microquantum.component.ts:538-542` | `links.github` | CTA **GitHub** button | Specialised repo button — remove |
| `src/app/pages/microquantum/microquantum.component.ts:1004` | `https://github.com/ajit-ai/microquantum` | Link registry | Specialised repo URL — remove from public UI/data |
| `src/app/pages/microquantum/microquantum.component.ts:1006` | `https://github.com/ajit-ai/microquantum/issues` | Link registry / resources | Specialised repo URL — remove |
| `src/app/pages/microquantum/microquantum.component.ts:1007` | `https://github.com/ajit-ai/microquantum/tree/main/examples` | Link registry / resources | Specialised repo URL — remove |
| `src/app/pages/microquantum/microquantum.component.ts:1113-1114` | `links.github` | Resource definition | Specialised repo link — remove |
| `src/app/pages/quantsmind-sdk/quantsmind-sdk.component.ts:46` | `https://github.com/ajit-ai/quantsmind-quantum-sdk` | Hero **View on GitHub →** | Specialised repo button — remove |
| `src/app/pages/quantsmind-sdk/quantsmind-sdk.component.ts:418` | `https://github.com/ajit-ai/quantsmind-quantum-sdk` | CTA **View on GitHub →** | Specialised repo button — remove |
| `src/app/pages/quantsmind-sdk/quantsmind-sdk.component.ts:734` | “Source — GitHub — Repository: ajit-ai/quantsmind-quantum-sdk” | Status table text | Specialised repository disclosure — remove/neutralise |
| `src/app/pages/technology/technology.component.ts:518` | `https://github.com/ajit-ai/Karkain` | Primary technology data `repoUrl` | Specialised repo URL (not rendered directly in the primary card) |
| `src/app/pages/technology/technology.component.ts:519` | `https://github.com/ajit-ai/Karkain#readme` | Docs link rendered as “Repository documentation ↗” | Specialised repo link — replace with non-repo documentation or remove |
| `src/app/pages/technology/technology.component.ts:521` | `https://github.com/ajit-ai/Karkain/releases/tag/v1.1.0` | Release link rendered as “Release v1.1.0 ↗” | Specialised repo link — remove/replace |
| `src/app/pages/technology/technology.component.ts:545` | `https://github.com/ajit-ai/microquantum` | `repoUrl` data | Specialised repo URL — remove |
| `src/app/pages/technology/technology.component.ts:573` | `https://github.com/ajit-ai/quantsmind-quantum-sdk` | `repoUrl` data | Specialised repo URL — remove |
| `src/app/pages/technology/technology.component.ts:574` | `https://github.com/ajit-ai/quantsmind-quantum-sdk#readme` | Docs link rendered as “Repository documentation ↗” | Specialised repo link — remove/replace |
| `src/app/pages/technology/technology.component.ts:595` | `https://github.com/ajit-ai/Quantsmind-Relational-DB` | External title link (aria-label “open repository on GitHub”) | Specialised repo link — remove |
| `src/app/pages/technology/technology.component.ts:598` | `https://github.com/ajit-ai/Quantsmind-Relational-DB` | `repoUrl` data | Specialised repo URL — remove |
| `src/app/pages/technology/technology.component.ts:599` | `https://github.com/ajit-ai/Quantsmind-Relational-DB/releases/tag/v0.1.0` | Release link | Specialised repo link — remove |
| `src/app/pages/technology/technology.component.ts:618` | `https://github.com/ajit-ai/GuardMCP` | External title link (aria-label “open repository on GitHub”) | Specialised repo link — remove |
| `src/app/pages/technology/technology.component.ts:621` | `https://github.com/ajit-ai/GuardMCP` | `repoUrl` data | Specialised repo URL — remove |
| `src/app/pages/labs/labs.component.ts:564` | `https://github.com/ajit-ai/Vsector` | **View repository on GitHub ↗** link in project card | Specialised repo link — remove |
| `src/app/pages/labs/labs.component.ts:577` | `https://github.com/ajit-ai/Quantsmind-OSINT-Intelligence-Platform` | Project card repository link | Specialised repo link — remove |
| `src/app/pages/labs/labs.component.ts:597` | `https://github.com/ajit-ai/Quantsmind-AI-Fake-News-Detection-System` | Project card repository link | Specialised repo link — remove |

### 6.4 Areas confirmed clean

No specialised GitHub repository URLs or buttons were found in:

- Header (`header.component.ts`) or its search index.
- Footer beyond the allowed organization link.
- Home, Services, Products, Contact, About, Blog index, Quantum, Quantum Mission, Privacy, Terms, Cookies, 404.
- Blog article content (no `github.com` matches in `src/app/pages/blog/articles/`).
- Product registry (no `githubUrl` field; `product.registry.spec.ts:227` asserts its absence).
- Shared components except where they render data supplied by pages.

### 6.5 Test dependencies on GitHub links (will block a naive removal)

- `src/app/pages/technology/technology.component.spec.ts:39-41` expects Karkain readme, MicroQuantum docs and SDK readme GitHub URLs.
- `src/app/pages/technology/technology.component.spec.ts:88-89` asserts QuantsMind-Agent and QuantsMind-LLM repository URLs are absent (already compliant).
- `src/app/pages/quantsmind-sdk/quantsmind-sdk.component.spec.ts:29` expects the SDK GitHub URL.
- `src/app/layout/footer/footer.component.spec.ts:23` expects the **general** org link (keep).
- `src/app/content/products/product.registry.spec.ts:227` expects no `githubUrl` on products (keep).
- `src/app/shared/components/qm-product-card/qm-product-card.spec.ts:85-87` expects no GitHub button in product cards (keep).
- `src/app/pages/home/home.component.spec.ts:27` and `src/app/pages/quantum-mission/quantum-mission.component.spec.ts:73-74` assert absence of GitHub claims on those pages (keep).

These assertions must be updated in the **same** milestone that removes links, never silently deleted to make a suite pass.

---

## 7. Existing components and functionality to preserve

### 7.1 Architecture and content

- Angular standalone architecture, lazy route loading, route metadata service, anchor scrolling.
- Product registry and its maturity/availability/verification vocabulary; **do not invent fields or statuses**.
- Service data and `ENGAGEMENT_MODELS` as the commercial source of truth.
- Blog article data model, article renderer and 11 article slugs.
- Legal pages unless business identity changes are explicitly approved.
- Sitemap, prerender script and 404 capture; any route/content change must keep `sitemap.xml` consistent.
- Responsive smoke test coverage and CI gates.

### 7.2 Shared UI and design system

- `qm-container`, `qm-section`, `qm-button`, `qm-badge`, `qm-page-hero`, `qm-product-card`, `qm-product-portfolio`, `qm-product-detail`, `qm-service-product-showcase`, `qm-info-card`, `qm-marquee`, `qm-count-up`, `qm-reveal`.
- Design tokens, typography, light/dark theming, reduced-motion support, focus-visible styles and skip link.
- Header search, theme toggle, mobile drawer, mega menus, keyboard handling and Escape behaviour.
- Footer structure, contact details, legal links, LinkedIn and the single general GitHub link.
- ContactService provider abstraction, endpoint validation, timeout, error mapping, honeypot, cooldown and direct-email fallback.

### 7.3 Explicitly out of scope

- **Marketplace**: `products.component.ts` Marketplace section (lines 344–382), `marketplaceProducts()`, `marketplaceEntries`, rationale/selection logic and related specs. Do not redesign, extend, remove or revert.
- Product registry content changes, unless separately approved and verified.
- Legal policy text changes.
- Deployment workflow changes.
- Removing the uncommitted `docs/website/` reports or build logs.

---

## 8. Blockers, risks and dependencies

| # | Item | Impact | Recommended handling |
|---|---|---|---|
| B1 | **22 modified tracked files and 49 untracked entries** are uncommitted | M2 edits can collide with in-progress work; baseline is not v1.0.0 | Owner reviews/commits the current work (or confirms it as the v2 starting point) before implementation. Do not stash/reset. |
| B2 | **No Git tag for v1.0.0** | Production baseline cannot be reproduced from a tag | Confirm that commit `0963950` is the intended v1.0.0 baseline; tag it outside this milestone if the owner wishes. |
| B3 | GitHub link removal conflicts with existing specs | Naive removal breaks tests | Remove links and update the exact assertions listed in §6.5 in the same milestone; add new compliance tests. |
| B4 | Labs general GitHub button outside footer | Violates decision #4 | Remove/replace in M3/M4; keep only the footer org link. |
| B5 | Marketplace on hold inside the Products page | Redesign may accidentally alter it | Work around lines 344–382 and related methods; add a regression test or explicit review check before/after edits. |
| B6 | Route renames on GitHub Pages | No server redirects; SEO/link breakage | Keep routes in v2.0.0; label-only changes. Any rename needs a redirect and sitemap plan. |
| B7 | Missing approved business content | Cannot write identity, proof, commercial or availability claims | Owner supplies/approves content; see §11. |
| B8 | Initial bundle budget warning (604.97 kB > 600 kB) | Redesign may push the warning/error budget | Measure per milestone; keep new code out of the initial chunk; seek approval before raising the budget. |
| B9 | Full unit-suite runtime on Windows (~55 s environment setup per invocation) | Slows verification | Use CI for the authoritative full run; record timings; avoid claiming a pass without the observed summary. |
| B10 | Search index and route metadata duplicate navigation labels | Renames can leave stale search results/titles | Update `header.component.ts` search index and `app.routes.ts` metadata with every label change. |
| B11 | No dedicated specs for Karkain, MicroQuantum and Labs | Changes there are less protected | Add focused specs when editing those pages in M3/M4. |
| B12 | Developer-oriented article inventory (11 technical articles) | Insights may not yet build business credibility | Commission/approve business-oriented content; do not relabel technical articles misleadingly. |

---

## 9. Recommended implementation sequence for Milestones 2–5

### Milestone 2 — Business shell and primary conversion paths

**Scope**

- Update navigation labels and footer groups; keep all routes.
- Update header search index and route titles/descriptions.
- Rewrite Home content and section order for business identity and outcomes.
- Redesign Contact as a business enquiry destination while preserving Formspree functionality.
- Update global metadata (`index.html` title/description/structured data copy) only if approved.

**Files:** `header.component.ts`, `footer.component.ts`, `home.component.ts`, `contact.component.ts`, `contact.config.ts` (only if fields change), `app.routes.ts` metadata, `index.html`, relevant specs, this report's successor.

**Exit criteria:** build PASS; prerender PASS; smoke PASS; unit tests PASS; no route changes; no GitHub changes yet (except none required in M2); contact submission path unchanged and verified by tests.

### Milestone 3 — Business Solutions and Products & Technologies

**Scope**

- Rewrite Services as Business Solutions with outcome-led sections and engagement models.
- Rewrite Products and Technology pages for business purpose/applications/availability.
- Remove all specialised GitHub repository links and buttons outside the footer, including Labs' general GitHub button.
- Update affected tests and add GitHub compliance assertions.
- Preserve Marketplace byte-for-byte in behaviour (no redesign/extend/remove/revert).

**Files:** `services.component.ts`, `products.component.ts`, `technology.component.ts`, `karkain.component.ts`, `microquantum.component.ts`, `quantsmind-sdk.component.ts`, `labs.component.ts` (link removal only), `qm-product-*` if presentation changes, specs.

**Exit criteria:** all links in §6.3 removed or neutralised; only the footer org link remains; tests updated and passing; Marketplace regression evidence; build/prerender/smoke pass.

### Milestone 4 — Research & Innovation, About QuantsMind and Insights

**Scope**

- Rewrite Labs as Research & Innovation (philosophy, research areas, collaboration; no repo links).
- Expand About with approved company identity and vision.
- Reframe Insights for business readers; add approved business-oriented content.
- De-developerise Karkain/MicroQuantum/SDK pages into “technology platforms” for business evaluation while retaining honest maturity.
- Add research collaboration entry point.

**Files:** `labs.component.ts`, `about.component.ts`, `blog.component.ts`, article data, `karkain.component.ts`, `microquantum.component.ts`, `quantsmind-sdk.component.ts`, `quantum-mission.component.ts`, specs.

**Exit criteria:** no invented claims; content approvals recorded; tests/build/prerender/smoke pass.

### Milestone 5 — Compliance, performance and release qualification

**Scope**

- Full GitHub-link audit (source + rendered output) and legal/claims review.
- SEO metadata, canonical URLs, sitemap/prerender consistency, structured data review.
- Accessibility audit (keyboard, focus, labels, contrast, reduced motion).
- Performance: initial bundle budget, lazy chunk sizes, font loading.
- Full regression: unit tests, prerender tests, responsive smoke, link checks.
- Final qualification report; explicit Marketplace no-change verification.

**Exit criteria:** all gates green or explicitly waived by the owner; exact git status recorded; no unapproved claims; release-readiness report delivered.

---

## 10. Exact files likely to require modification

### 10.1 Application source

| File | Likely change | Milestone |
|---|---|---|
| `src/app/layout/header/header.component.ts` | Nav labels, mega-menu grouping, search index, CTA label | M2 |
| `src/app/layout/footer/footer.component.ts` | Footer groups/business copy; retain only general GitHub link | M2 |
| `src/app/pages/home/home.component.ts` | Business hero, outcomes, product/research sections, CTAs | M2 |
| `src/app/pages/contact/contact.component.ts` | Enquiry types, layout, copy, form context | M2 |
| `src/app/core/contact.config.ts` | Only if provider fields/options change (endpoint stays) | M2 (conditional) |
| `src/app/core/contact.service.ts` | Only if new payload fields are approved | M2 (conditional) |
| `src/app/pages/services/services.component.ts` | Business Solutions framing and outcomes | M3 |
| `src/app/pages/products/products.component.ts` | Business portfolio copy; **Marketplace untouched** | M3 |
| `src/app/pages/technology/technology.component.ts` | Business framing; remove repo/docs/release links | M3 |
| `src/app/pages/karkain/karkain.component.ts` | Remove GitHub buttons/section; business framing | M3 |
| `src/app/pages/microquantum/microquantum.component.ts` | Remove GitHub links/resources; business framing | M3 |
| `src/app/pages/quantsmind-sdk/quantsmind-sdk.component.ts` | Remove GitHub buttons/table row; business framing | M3 |
| `src/app/pages/labs/labs.component.ts` | Research & Innovation rewrite; remove GitHub links | M4 |
| `src/app/pages/about/about.component.ts` | Company identity, three pillars, vision | M4 |
| `src/app/pages/blog/blog.component.ts` | Insights framing, categories/featured article | M4 |
| `src/app/pages/blog/articles/*.article.ts` | Approved new/updated articles only | M4 |
| `src/app/pages/quantum-mission/quantum-mission.component.ts` | Business framing if required | M4 |
| `src/app/pages/quantum/quantum.component.ts` | Business framing if required | M4 |
| `src/app/app.routes.ts` | Titles/descriptions in M2; route changes only with approval | M2/M5 |
| `src/app/core/route-meta.service.ts` | Only if canonical/URL strategy changes | M5 (conditional) |
| `src/index.html` | Title/description/structured-data copy | M2/M5 |
| `public/sitemap.xml` | Only if routes change (currently consistent) | M5 (conditional) |
| `src/styles/_tokens.scss`, `_typography.scss`, `_surface.scss` | Only if the redesign requires new business surfaces | M2–M4 (conditional) |
| `src/app/shared/components/qm-page-hero/*` | Optional support for business page heroes | M2 (conditional) |
| `src/app/shared/components/qm-product-card/*`, `qm-product-detail/*`, `qm-service-product-showcase/*` | Optional business presentation enhancements | M3 (conditional) |

### 10.2 Tests

| File | Reason |
|---|---|
| `src/app/layout/header/header.component.spec.ts` | Nav/search labels |
| `src/app/layout/footer/footer.component.spec.ts` | Footer structure; general GitHub link stays |
| `src/app/pages/home/home.component.spec.ts` | Business content assertions |
| `src/app/pages/services/services.component.spec.ts` | Solutions content |
| `src/app/pages/products/products.component.spec.ts` | Portfolio copy; Marketplace regression |
| `src/app/pages/technology/technology.component.spec.ts` | Remove GitHub URL expectations; add compliance |
| `src/app/pages/quantsmind-sdk/quantsmind-sdk.component.spec.ts` | Remove GitHub URL expectation |
| `src/app/pages/contact/contact.component.spec.ts` | Enquiry types/validation unchanged behaviour |
| `src/app/core/contact.service.spec.ts` | Only if payload changes |
| `src/app/pages/quantum-mission/quantum-mission.component.spec.ts` | Keep GitHub-absence assertions |
| `src/app/content/website-documentation.spec.ts` | Documentation consistency if page inventory changes |
| New specs for Karkain, MicroQuantum, Labs | Add regression protection during cleanup |

### 10.3 Do not modify in Milestones 2–5 without separate approval

- `products.component.ts` Marketplace block (lines 344–382), `marketplaceProducts()`, `marketplaceEntries`, marketplace rationale/selection logic, and their tests.
- `product.registry.ts` content and maturity/availability values.
- Legal page policy text.
- `.github/workflows/*` deployments.
- `scripts/prerender.mjs` unless the route strategy changes.
- Existing `docs/website/*` reports, build logs and untracked work.
- Formspree endpoint configuration and anti-spam controls.

---

## 11. Consolidated content that requires owner approval

Do not publish until explicitly approved:

1. Company positioning statement and tagline (“technology engineering and innovation company” or alternative).
2. Founding year, team size, leadership, legal entity and office details beyond the currently published address.
3. Clients, testimonials, case studies, delivery history, partnerships, certifications, awards or accreditations.
4. Commercial availability, release dates, pricing, licensing, support terms or SLAs for any product.
5. Product screenshots, demos and application examples.
6. Priority industries and target customer segments.
7. Engagement models, duration, budget ranges and contracting terms beyond the existing non-claim framework.
8. Response-time commitments, business hours, phone number and enquiry routing.
9. Research partners, publications, collaboration/IP terms and researcher profiles.
10. New Insights articles, author identities, dates, categories and any subscription mechanism.
11. Whether the homepage may state portfolio counts (41 products, 3 published technologies) without context that most products are proposed.
12. Whether to retain the general GitHub organization URL in schema.org `sameAs` (`src/index.html:58`).

---

## 12. Verification evidence (commands and observed results)

| Command | Result | Evidence |
|---|---|---|
| `git branch --show-current` | `feature/website-evolution-v2.0.0` | Observed |
| `git status --porcelain=v1` | 22 modified, 49 untracked | Observed |
| `git tag --list` | empty | No v1.0.0 tag |
| `npm run build` | **PASS**, 1 budget warning | 604.97 kB initial vs 600 kB warning; exit 0 |
| `npm run prerender` | **PASS** | 33 route files + 404; sitemap 33 URLs consistent |
| `npm run smoke` | **PASS** | 204 checks, 34 routes × 6 viewports |
| `npx ng test --include=.../footer.component.spec.ts --watch=false` | **PASS** | 4/4 tests; 69.74 s total (environment 54.63 s) |
| `npx ng test --watch=false` | **PASS** | 27/27 test files, 471/471 tests; 81.95 s; exit 0 |
| `npm run test:prerender` | Covered by unit suite | `blog-prerender.spec.ts` passed as part of the 27 passing files |

**Baseline conclusion:** the current working tree builds, prerenders all routes, passes responsive smoke, and passes the complete unit suite (27 files / 471 tests). No test or build setting was modified; the only build-side issue is the pre-existing 604.97 kB initial-bundle warning (4.97 kB over the 600 kB threshold).

---

*End of foundation specification. No redesign is claimed as implemented.*
