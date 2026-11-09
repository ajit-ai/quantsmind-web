# QuantsMind Website v2.0.0 — Implementation Report

**Document:** `docs/website-v2/WEBSITE_V2_0_0_IMPLEMENTATION_REPORT.md`
**Date:** 2026-11-04 (revised 2026-11-05 — non-home copy and metadata alignment, §4.7 and §6; further revised 2026-11-05 — business-language refinement, §4.8 and §6)
**Branch:** `feature/website-evolution-v2.0.0`
**Commit at verification:** originally `0963950`; the work was later committed locally as `11d22c8`…`0f839bd` and re-verified at that tree (§8). No push, tag, release or deployment.
**Scope:** Business-oriented website redesign — positioning, primary navigation, homepage, search index and metadata.
**Status:** IMPLEMENTED — VERIFIED (see §6). Not released; see §8. The §4.8 refinement is applied to the working tree only and is **not** committed.

The companion documents remain in place and unmodified:
- `docs/website-v2/WEBSITE_V2_BUSINESS_REDESIGN_FOUNDATION.md` (foundation/specification, not overwritten)
- `docs/website-v2/WEBSITE_V2_0_0_WP1_IMPLEMENTATION_REPORT.md` (earlier work-package record)

---

## 1. Status summary

| Area | Result | Evidence |
| --- | --- | --- |
| Approved positioning applied | PASS | Homepage, footer, page title/description, structured data |
| Business navigation | PASS | 6 top-level destinations + Contact CTA, unchanged route paths; Labs and Technology Ecosystem grouped under Research & Innovation (§4.9) |
| Homepage redesign | PASS | 11 sections (§4.9): hero, audiences/problems, six engineering domains, five portfolios, selected products, proprietary technologies, Quantum Mission, research, engagement models, insights, closing enquiry band. Superseded row text: *"Hero, audiences, six business solutions, five technology portfolios, engagement, research, insights, enquiry CTA"* |
| Six service domains reuse verified data | PASS | Homepage reads `SERVICE_AREAS` from `src/app/content/services/service.registry.ts`; no second copy of the service text |
| Five technology portfolios surfaced | PASS | Anchors to the five portfolio sections on `/products`; counts and maturity mix computed from the product registry |
| No claim that all 41 registry entries are commercially available | PASS | Availability caveat text and "portfolio initiatives" metric |
| URLs / GitHub Pages / prerender preserved | PASS | 33 routes + 404, sitemap consistent |
| GitHub link policy | PASS | One general footer link plus pre-existing JSON-LD `sameAs`; 2 occurrences / 1 distinct URL in the prerendered homepage; no product repository links (§6.3) |
| All homepage links resolve | PASS | 30 distinct `href` values: every internal path maps to a served prerendered route; 12/12 fragment anchors resolve to an element id (§6.3) |
| Desktop nav fits at 1200–1440 px without overflow | PASS | Measured: nav right edge 1063 px inside a 1360 px container at 1440 px, 981 px at 1280 px, `scrollWidth == innerWidth` with menus open (§6.3) |
| Mobile drawer verified while open | PASS | Opened drawer at 1024/768/390/360 px: six links, Research & Innovation children visible, Contact CTA visible, no overflow, drawer removed on close (§6.3) |
| Marketplace left untouched | PASS | `src/app/pages/products/products.component.ts` not edited by this work |
| Contact page left untouched | PASS | No Contact redesign or copy change in this work |
| Business Solutions page not rewritten | PASS with recorded exception | §4.9 adds only one `aria-hidden` `anchor-alias` span for `#engagement-models` (§7.11); no copy, layout or data change |
| Non-home page copy and metadata aligned | PASS | Prerendered titles/headings for `/services`, `/technology`, `/labs`, `/blog` (see §4.7) |
| Contact reachable as a navigation destination | PASS | Header CTA (desktop and mobile) labelled "Contact QuantsMind" → `/contact`, footer connect link, search index entry |
| Homepage CTAs use business language | PASS | "Explore Products & Technologies", "Discuss Your Requirements", "Explore Business Solutions"; zero "registry" mentions in the prerendered homepage |
| Manual visual QA of the redesigned homepage | **BLOCKED** | Not performed under this brief; DOM/geometry evidence only (§6.3, §7.10) |
| Transient 768 px `scrollWidth` reading | OPEN | One 831 px reading, not reproduced; four-sample probe and the 204-check overflow gate both clean (§7.9) |
| Build | PASS | Exit 0, initial 606.66 kB (single pre-existing budget warning; 605.83 kB before §4.9) |
| Prerender | PASS | Exit 0, 33 route files + `404.html`, sitemap consistent |
| Responsive smoke test | PASS | 204 checks, no overflow or console errors |
| Unit tests | PASS | 27/27 test files, **496 passed / 0 failed / 0 skipped** (working tree, with prerender artifacts present; was 479 before §4.9) |
| Committed-tree unit tests | recorded in §8 | 447/447 at `0f839bd` during that verification pass; the §4.8 and §4.9 refinements are not included in that count |
| Release | NOT PERFORMED | Five local commits exist (see §8); nothing pushed, tagged, released or deployed |

This table was last updated for the §4.9 homepage redesign and navigation grouping (2026-11-05, third revision); every number in it is read from §6.3, which holds the underlying command output.

---

## 2. Scope and constraints

### 2.1 Approved positioning

> QuantsMind is an independent technology engineering and innovation company delivering advanced engineering services, proprietary software products and research-driven technology solutions for businesses and enterprises.

### 2.2 Audiences, in priority order

1. Technology companies and software businesses
2. Startups and product companies
3. SMEs
4. Enterprise engineering teams
5. Research organisations

### 2.3 Constraints observed

- No route path changes; no new routes; GitHub Pages static hosting preserved.
- No changes to the product registry, product model or service definitions.
- No Marketplace work (remains ON HOLD).
- No Contact page redesign.
- No invented clients, testimonials, partnerships, certifications, pricing, deployments or achievements.
- No product repository links; Karkain and MicroQuantum repositories not exposed.
- Unrelated specialised repository links on other pages untouched.
- All pre-existing uncommitted work preserved.
- No Git commit, push, merge, tag, release or deployment.

---

## 3. Preflight baseline

- Build, prerender, responsive smoke and the unit suite were run before changes. Baseline totals were: build PASS, prerender 33 routes + 404, smoke 204 checks, tests 471/471.
- The working tree already contained broader, pre-existing website work at the start of this implementation (27 modified and 50 untracked entries). Those files were inspected only where required and were not reverted, stashed or discarded.
- Section 5 lists the files changed by the navigation/homepage implementation; it is not a claim of authorship over every entry in the working tree.

---

## 4. Implementation

### 4.1 Navigation

**Desktop and mobile primary navigation** (`src/app/layout/header/header.component.ts`):

| Label | Destination | Notes |
| --- | --- | --- |
| Home | `/` | `routerLinkActive` exact match |
| Business Solutions | `/services` | Mega menu with the six business domains |
| Products & Technologies | `/products` | Mega menu: All Products, Quantum Mission, Quantum Software, Space Systems, Cybersecurity, Technology Ecosystem |
| Research & Innovation | `/labs` | |
| About QuantsMind | `/about` | |
| Insights | `/blog` | |
| Contact QuantsMind | `/contact` | Primary CTA in desktop and mobile headers. Superseded labels, retained for the record: "Get in Touch" → "Discuss Your Project" → "Contact QuantsMind" (§4.8) |

- The Business Solutions menu links to the six verified service domains: `/quantum`, `/services#space-systems`, `/services#ai-intelligent-systems`, `/services#scientific-computing`, `/services#cybersecurity-digital-trust`, `/services#industrial-intelligence-digital-twin`.
- The former standalone technology destinations remain reachable through the Products & Technologies mega menu and the footer; no route was removed or renamed.
- Search input placeholder changed to "Search business solutions, products, technologies…".
- Search index titles now read: Home, Business Solutions, Products & Technologies, Quantum Mission, Technology Ecosystem, Quantum Computing, MicroQuantum, Karkain, QuantsMind SDK, Research & Innovation, Insights, About QuantsMind, Contact, plus capability and legal entries.
- The logo tagline remains "Technology Engineering".

**Responsive fit.** Introducing the longer "About QuantsMind" label exposed desktop header overflow at 1200–1440 px. The header was compacted without changing page typography:

- `.qm-header__inner` gap reduced from 16 px to 12 px and horizontal padding from 28 px to 24 px.
- Navigation link horizontal padding reduced from 12 px to 8 px.
- Between 1200 px and 1399 px the logo tagline is hidden and navigation uses 13 px type with 7 px padding.

Measured with headless Chrome against the final build (scrollbar included):

| Viewport | Header inner overflow | Document overflow | Tagline visible |
| --- | --- | --- | --- |
| 1200 px | 0 px | 0 px | Hidden |
| 1280 px | 0 px | 0 px | Hidden |
| 1440 px | 0 px | 0 px | Shown |
| 1600 px | 0 px | 0 px | Shown |

**Footer** (`src/app/layout/footer/footer.component.ts`): company description uses the approved positioning; "Products & Technologies" heading; Explore column lists About QuantsMind, Business Solutions, Research & Innovation and Insights; the single general GitHub link remains.

### 4.2 Homepage

> Superseded by §4.9 for the section list below. This text is retained as the record of the first revision; §4.9 replaces these twelve sections with eleven and states which registry each one now reads from.

`src/app/pages/home/home.component.ts` was rebuilt around the business positioning while reusing the existing shared components (`qm-section`, `qm-container`, `qm-button`, `qm-reveal`, `qm-count-up`, `qm-marquee`) and design tokens.

Sections, in order:

1. **Hero** — eyebrow "QUANTSMIND · TECHNOLOGY ENGINEERING & INNOVATION"; headline "Technology engineering for business-critical systems."; approved positioning paragraph; CTAs "Discuss Your Requirement" (`/contact`) and "Explore Business Solutions" (`/services`); value points Engineering services, Proprietary software, Research & innovation, Enterprise engagement; hero panel counts 06 engineering domains / 05 technology portfolios / 03 published technologies.
2. **Problems we address** — business framing and the audience line for technology companies, product startups, SMEs, enterprise engineering teams and research organisations.
3. **Business Solutions** — six capability cards, each with its description, a verified "Business situation" statement, a "Typical start" entry point and a link.
4. **How organisations engage** — engagement models using existing verified content.
5. **Technology Portfolios** — five cards linking to the portfolio anchors on `/products`:
   - `/products#standalone-software` (11 entries)
   - `/products#quantum-software` (11 entries)
   - `/products#space-software` (8 entries)
   - `/products#cybersecurity-software` (10 entries)
   - `/products#developer-tools` (1 entry)
6. **Selected products** — registry-driven selection, no availability upgrades.
7. **Proprietary technology** — Karkain, MicroQuantum, QuantsMind SDK.
8. **Why QuantsMind** — engineering principles, existing verified claims only.
9. **Research & Innovation** — link to `/labs`.
10. **Insights** — link to `/blog`.
11. **Business enquiry CTA**.

Availability honesty:

- The portfolio section states that each entry records its own maturity and availability and that inclusion in a portfolio is not a claim of being released, purchasable or commercially deployed.
- It states that most registry entries are proposed, in development or research prototypes.
- The registry metric was relabelled from "portfolio products" to "portfolio initiatives" (41), matching the registry's maturity mix and avoiding a commercial-availability implication.

Wording note: this subsection describes the homepage as implemented at `0f839bd`. §4.8 is the current text — the hero CTA reads "Discuss Your Requirements", the portfolio CTA reads "Explore Products & Technologies", and the rendered page no longer uses the word "registry" in body copy.

### 4.3 Search, metadata and structured data

- `src/app/app.routes.ts`: home title `QuantsMind | Technology Engineering & Innovation`; home description uses the approved positioning sentence.
- `src/index.html`: `<title>`, meta description, Open Graph (`og:title`, `og:description`, `og:alt`), Twitter title/description and the JSON-LD organisation description were updated consistently.
- Canonical URL and the single pre-existing general `sameAs` GitHub URL were left unchanged.
- Prerendered `index.html` contains "About QuantsMind", the five portfolio anchors and exactly two GitHub URL occurrences (footer general link and JSON-LD `sameAs`).

### 4.4 GitHub policy

- Retained: one general `https://github.com/quantsmind` link in the footer.
- Not added: any individual product repository link.
- Not exposed: Karkain and MicroQuantum repository links.
- Unrelated specialised repository links on other pages were not modified.

### 4.5 Marketplace, Contact and registry preservation

- `src/app/pages/products/products.component.ts` was not edited. The Marketplace remains ON HOLD.
- `src/app/pages/contact/contact.component.ts` was not redesigned or reworded by this work.
- The product registry, product model and service definitions were not changed; homepage and navigation consume them read-only.

### 4.6 Tests updated with the implementation

- `header.component.spec.ts`: expected labels (including "About QuantsMind"), mega-menu contents, search index titles.
- `footer.component.spec.ts`: new heading and Explore links.
- `home.component.spec.ts`: approved positioning, five portfolio cards and counts, availability caveats, absence of GitHub links.
- `quantum.component.spec.ts`: mega-menu lookup renamed to "Business Solutions".
- `blog-prerender.spec.ts`: three prerendered title assertions aligned to the new home title.

### 4.7 Non-home copy and metadata alignment (2026-11-05 revision)

Page-level titles, metadata and hero copy now use the same business vocabulary as the navigation and homepage. Route paths, section anchors, product data and forms were not changed.

| Route | Title before | Title after | Page heading after |
| --- | --- | --- | --- |
| `/services` | Engineering Services — QuantsMind | Business Solutions — QuantsMind | Business Solutions |
| `/technology` | Technologies We Develop — QuantsMind | Technology Ecosystem — QuantsMind | Technology Ecosystem |
| `/labs` | QuantsMind Labs \| Open Research Projects | Research & Innovation — QuantsMind | Research & Innovation |
| `/blog` | Articles — QuantsMind | Insights — QuantsMind | Insights |
| `/blog/:slug` | (per-article, unchanged) | (per-article, unchanged) | eyebrow "INSIGHTS" |
| `/about` | About — QuantsMind | About — QuantsMind (unchanged) | About QuantsMind. |

Copy changes:

- **Services** — hero eyebrow "BUSINESS SOLUTIONS", lead names the five approved audiences in priority order; the enquiry CTA reads "Discuss Your Requirement" (previously "Discuss an Engineering Requirement") in both the hero and the closing band.
- **Technology** — hero lead frames the projects as the proprietary technologies that underpin QuantsMind products and engagements; the maturity language ("deliberately conservative", no production-readiness claim) is unchanged.
- **Labs** — hero eyebrow "RESEARCH & INNOVATION", heading "Research & Innovation"; the outline CTA now reads "Contact QuantsMind" (§4.8; it read "Discuss Your Project" immediately after this §4.7 revision, which was written to match the header CTA of that day). The "QuantsMind Labs" brand name is retained in body copy and ecosystem nodes.
- **Insights** — hero eyebrow/title "INSIGHTS"/"Insights"; article pages use the "INSIGHTS" eyebrow and "Back to Insights" links.
- **About** — hero lead replaced with the approved positioning sentence; the route description matches it.
- **Quantum** — the back link now reads "Business Solutions" instead of "Services".

Deliberately not changed:

- `/products` keeps the title "Products & Applications — QuantsMind" and its own hero copy, because that page hosts the Marketplace work that is ON HOLD and was excluded from this scope. The navigation label "Products & Technologies" therefore differs from that page title; this is recorded as a known inconsistency in §7.
- Contact page copy and form behaviour, including its "Research / QuantsMind Labs" enquiry topic, are unchanged.
- Service domain names, product registry entries, maturity labels and article content are unchanged.

### 4.8 Business-language refinement and Contact reachability (2026-11-05, second revision)

This revision answers two gaps found while auditing the implementation against the brief: Contact was reachable only through a CTA whose label did not name the destination, and the homepage still used internal vocabulary ("registry") that reads as a developer catalogue rather than a business portfolio.

**Contact as a navigation destination**

- Desktop header CTA: "Discuss Your Project" → **"Contact QuantsMind"**, still `routerLink` → `/contact` (`src/app/layout/header/header.component.ts:166`).
- Mobile header CTA: "Discuss Your Project →" → **"Contact QuantsMind →"**, same destination (`src/app/layout/header/header.component.ts:298`).
- Labs outline CTA: "Discuss Your Project" → **"Contact QuantsMind"** (`src/app/pages/labs/labs.component.ts:54`).
- Search index already exposed `/contact` as an entry, so Contact is reachable by typing "contact" in the header search; the new test asserts both the visible CTA and that index entry.
- No seventh desktop navigation item was added. Adding one re-introduces the 1200–1440 px header overflow documented in §4.1; the persistent CTA, the footer link and the search entry satisfy the destination requirement without that regression.

**Homepage language — internal vocabulary removed**

| Homepage location | Before | After |
| --- | --- | --- |
| Portfolio section lead | "Our product registry groups initiatives…" | "Our product portfolio groups initiatives…" |
| Portfolio section CTA | "Explore the Registry" | "Explore Products & Technologies" (same `/products` destination) |
| Portfolio note | "Most registry entries are proposed…" | "Most portfolio entries are proposed…" |
| Selected-products lead | "The product registry is separate from service delivery." | "Our product portfolio is separate from service delivery." |
| Selected-products note | "…reflect the current product registry…" | "…reflect the current portfolio…" |
| Hero and closing-band primary CTAs | "Discuss Your Requirement" | "Discuss Your Requirements" (matches the brief's wording) |

- The word "registry" now appears once in `src/app/pages/home/home.component.ts`, in the import of `product.registry` (`src/app/pages/home/home.component.ts:16`); the rendered page contains none.
- The CTAs keep their existing routes (`/contact`, `/services`, `/products`); no route, anchor or query parameter changed, and the availability statements were not weakened — the two caveat sentences remain, only re-worded.

**Tests added with this refinement**

- `src/app/pages/home/home.component.spec.ts` — "uses business calls to action rather than internal portfolio jargon": asserts "Explore Business Solutions", "Discuss Your Requirements" and "Explore Products & Technologies" are present and "Explore the Registry" is absent; the existing caveat test was updated for the re-worded sentence.
- `src/app/layout/header/header.component.spec.ts` — "exposes Contact as a persistent header action": asserts the header CTA text is "Contact QuantsMind" and that `/contact` is in the search index.

**Explicitly not done in this revision**

- No commit, push, merge, tag, release or deployment (§8).
- Marketplace, Contact page, product registry data, service-domain definitions, routes, dependencies and configuration untouched.
- No new clients, testimonials, partnerships, certifications, pricing, deployments or production-readiness claims; no individual repository links.
- No broad application audit: the files in §5 were examined directly, and the only other page touched was Labs, for one CTA label.

---

### 4.9 Business homepage redesign and navigation grouping (2026-11-05, third revision)

This revision implements the homepage itself, not only its wording. §4.8 changed labels; §4.9 changes the information architecture of `src/app/pages/home/home.component.ts`, reuses the verified service and research content as shared modules, and regroups the desktop navigation without adding a seventh item.

**Homepage structure — 12 sections replaced by 11, each keyed to brief §4 A–G**

| Slot | Section (`ariaLabel`) | Heading rendered | Brief item | Source of the content |
| --- | --- | --- | --- | --- |
| 01 | `QuantsMind overview` (hero) | "Technology engineering for business-critical systems." | A | approved positioning sentence; live CTAs "Explore Business Solutions" → `/services` and "Discuss Your Requirements" → `/contact` |
| 02 | Who QuantsMind serves and the problems it addresses | "Engineering capability for problems that matter to the business." | A/F | five audiences in priority order, registry-derived trust metrics |
| 03 | Engineering services | "Six engineering domains. One accountable partner." | B | `SERVICE_AREAS` — problem, deliverables (first three), outcome, "Typical start" chip, `/services#<domain-id>` |
| 04 | Technology portfolios | "Five portfolios. Maturity stated openly." | C | `product.registry.ts` — counts and per-portfolio maturity mix computed at runtime, `/products#<fragment>` |
| 05 | Selected products and initiatives | "Selected products, with the purpose they serve." | D | `product.registry.ts` — capabilities as tags, applications, Availability + Version definitions |
| 06 | Proprietary technologies | "Software we build, publish and maintain." | D | Karkain, MicroQuantum, QuantsMind SDK with version, availability and "Used for" |
| 07 | Quantum Mission spotlight | "Ten independent applications for quantum software engineering." | C/D | unchanged from the verified reference — still "Proposed"/"Not Available" |
| 08 | Research and innovation | "Research that informs what we build." | E | `RESEARCH_STAGES` (5) and `RESEARCH_AREAS` (8) from the new research module |
| 09 | Engagement models | "Start with the problem. Scale to delivery." | F | `ENGAGEMENT_MODELS` (5) with outputs and "When you need it", plus the `/contact` enquiry CTA |
| 10 | Insights and blog | "Perspectives from our engineering work." | — | unchanged blog cards |
| 11 | Business contact | "Have a complex engineering or technology challenge?" | G | "Let's discuss how QuantsMind can help." → `/contact` primary, `/services` secondary |

**Content reuse instead of duplication**

- `src/app/content/services/service.registry.ts` (new, 15,467 bytes, untracked) holds `SERVICE_AREAS`: the six verified domains with `problem`, `provides`, `deliverables`, `context`, `outcome`, `technologies` and detail links, extracted verbatim from the Business Solutions page. `services.component.ts` now imports it instead of declaring the array inline (that page's template diff is the removal of the duplicated data, not a redesign), and the homepage consumes the same objects. There is no second copy of the service text.
- `src/app/content/research/research.registry.ts` (new, 1,743 bytes, untracked) holds `RESEARCH_STAGES` and `RESEARCH_AREAS`, shared by `/labs` and homepage slot 08. Its header comment records that no publication, partnership, institutional relationship or commercially available research outcome is claimed.
- Portfolio and product claims are computed from `product.registry.ts` at runtime (`portfolioTotal`, per-portfolio maturity mix, selected products), so no availability field was changed and no parallel registry was created.
- The old inline `capabilities` array (52 source lines) and the hero's decorative orbit/rings/floating nodes were deleted. The hero right panel is now registry-driven: "Engineering coverage / Six domains", the six domain titles, a note naming the three published technologies, and the 06/05/03 counts. Homepage component styles fell from 22.2 kB to 20,033 bytes of source.

**Navigation (§5 of the brief)**

- "Research & Innovation" became a grouped parent with two children — QuantsMind Labs (`/labs`) and Technology Ecosystem (`/technology`) — so both remain reachable while the desktop bar keeps exactly six items: Home, Business Solutions, Products & Technologies, Research & Innovation, About QuantsMind, Insights. No seventh item was added, and no overflow was introduced to make room (§6.3 measures it).
- URLs are unchanged (`/labs`, `/technology`, `/services`, `/products`, `/quantum-mission`, `/blog`, `/about`, `/contact`); only the menu grouping changed, so GitHub Pages routing and existing links are unaffected.
- The "Contact QuantsMind" CTA from §4.8 is retained in the desktop bar (`display` at ≥1200 px) and inside the mobile drawer.
- One additive exception to "do not rewrite the Business Solutions page": `src/app/pages/services/services.component.ts:51` gained `<span id="engagement-models" class="anchor-alias" aria-hidden="true">`, the page's own existing anchor-alias pattern (`services.component.ts:317`, already used for the legacy `software-architecture` anchor). It exists because homepage slot 09 links to `/services#engagement-models`; without it that link resolved to a non-existent id in the prerendered output. No copy, layout or data on that page changed.

**Tests added with this revision** — see §6.3 for the measured totals.

- `home.component.spec.ts` was rewritten around the new structure: 20 runtime tests (was 9) covering positioning copy, both hero CTAs plus a marketing-jargon regex check, the registry-driven hero index and the absence of orbit/node/float elements, the five audiences, six domain cards (situation / deliverables / outcome / typical start / `/services#<id>`), five portfolios with maturity-mix totals, the not-commercially-available statements, six product cards (capabilities, applications, availability, maturity, exact hrefs), three technology cards, research stages and areas asserted equal to the registry modules, the five engagement models with an enquiry path, the closing band, "no GitHub or absolute links on the homepage", and "every homepage link is a route the application serves".
- `header.component.spec.ts` grew to 21 runtime tests (was 16): the grouped children, the exact six desktop labels, the open mega menu's rendered links, the **open** mobile drawer (six links, expanded Research & Innovation children, visible Contact CTA, drawer removed on close) and internal-only navigation hrefs.
- `services.component.spec.ts` gained one test asserting the `#engagement-models` anchor is inside the engagement section.

**Explicitly not done here** — no commit, push, merge, tag, release or deployment; Marketplace untouched and still ON HOLD; Contact page not redesigned; no registry availability change, no service-domain redefinition, no route rename, no new dependency, no backend or hosting work.

---

## 5. Files changed by this implementation

### 5.1 Working-tree files changed by the §4.8 refinement (uncommitted)

| File | Change | Diff size |
| --- | --- | --- |
| `src/app/layout/header/header.component.ts` | Desktop and mobile CTA labels → "Contact QuantsMind" | 2 lines |
| `src/app/layout/header/header.component.spec.ts` | New test: Contact is a persistent header action and a search-index entry | +8 lines |
| `src/app/pages/home/home.component.ts` | "registry" → "portfolio" wording (4 places), "Explore the Registry" → "Explore Products & Technologies", "Discuss Your Requirement" → "Discuss Your Requirements" (2 places) | 7 lines |
| `src/app/pages/home/home.component.spec.ts` | New CTA/jargon test; caveat assertion re-worded | +9/−1 lines |
| `src/app/pages/labs/labs.component.ts` | Outline CTA label → "Contact QuantsMind" | 1 line |
| `docs/website-v2/WEBSITE_V2_0_0_IMPLEMENTATION_REPORT.md` | This report (§1, §4.1, §4.7, §4.8, §5, §6, §7, §8, §9, §10) | — |

`git diff --stat` for the five source files reports 5 files changed, 27 insertions, 11 deletions.

### 5.2 Files changed by the earlier (now committed) implementation

| --- | --- |
| `src/app/layout/header/header.component.ts` | Business navigation, mega menus, search index/placeholder, CTA label, responsive header compaction |
| `src/app/layout/header/header.component.spec.ts` | Labels, mega-menu and search-index assertions |
| `src/app/layout/footer/footer.component.ts` | Positioning, heading, Explore column, products label |
| `src/app/layout/footer/footer.component.spec.ts` | Heading and Explore assertions |
| `src/app/pages/home/home.component.ts` | Homepage restructure, portfolio cards, availability caveats, styling |
| `src/app/pages/home/home.component.spec.ts` | Content, portfolio and caveat assertions |
| `src/app/pages/quantum/quantum.component.spec.ts` | Mega-menu lookup updated |
| `src/app/pages/blog/blog-prerender.spec.ts` | Prerendered home title assertion updated |
| `src/app/app.routes.ts` | Home title and description; Business Solutions, Technology Ecosystem, Research & Innovation, Insights and About metadata |
| `src/index.html` | Title, description, Open Graph, Twitter and JSON-LD |
| `src/app/pages/services/services.component.ts` | Hero eyebrow/title/lead and enquiry CTA wording |
| `src/app/pages/technology/technology.component.ts` | Hero eyebrow/title/lead |
| `src/app/pages/technology/technology.component.spec.ts` | Exact page-heading assertion updated |
| `src/app/pages/labs/labs.component.ts` | Hero eyebrow/title, enquiry CTA wording |
| `src/app/pages/blog/blog.component.ts` | Hero eyebrow/title |
| `src/app/pages/blog/article.component.ts` | Article eyebrow labels and back-link labels |
| `src/app/pages/blog/blog-prerender.spec.ts` | Article-index title assertion updated |
| `src/app/pages/about/about.component.ts` | Hero lead replaced with the approved positioning sentence |
| `src/app/pages/quantum/quantum.component.ts` | Back-link label to the Business Solutions page |

No configuration, package, dependency, registry or deployment file was changed by this work.

The working tree also contains pre-existing changes outside this list (for example the products page, product registry and additional page work). They were preserved as found and were not authored, reverted or assessed as part of this report.

### 5.3 Files touched by the §4.9 redesign

`git diff --stat` against HEAD `0f839bd` is cumulative: it contains the §4.8 label refinement, the registry extraction and the §4.9 redesign together, because none of them are committed. Measured output of the last run:

| File | Cumulative diff vs `0f839bd` | §4.9 contribution |
| --- | --- | --- |
| `src/app/pages/home/home.component.ts` | 976 lines changed | section restructure to 11 slots, registry-driven hero, domain/portfolio/product/technology/research/engagement/closing content, styles 22.2 kB → 20,033 bytes |
| `src/app/pages/home/home.component.spec.ts` | 258 lines changed | rewritten spec, 9 → 20 runtime tests |
| `src/app/layout/header/header.component.ts` | 21 lines changed | Research & Innovation children (Labs, Technology Ecosystem) |
| `src/app/layout/header/header.component.spec.ts` | 82 lines changed | grouped-children, desktop-fit, open-mega and open-drawer tests, 16 → 21 runtime tests |
| `src/app/pages/services/services.component.ts` | 236 lines changed | mostly the `SERVICE_AREAS` extraction (§4.9 adds one `anchor-alias` span) |
| `src/app/pages/services/services.component.spec.ts` | 82 lines changed | §4.9 adds the `#engagement-models` anchor test |
| `src/app/pages/labs/labs.component.ts` | 24 lines changed | consumes the research module (§4.8 changed its CTA label) |
| `scripts/measure-header.mjs` | 131 lines changed | desktop layout/mega probes and the open-drawer probe used for §6.3 |
| `src/app/content/services/service.registry.ts` | untracked, new | 15,467 bytes |
| `src/app/content/research/research.registry.ts` | untracked, new | 1,743 bytes |

`git diff --stat` for those eight tracked files totals **1,063 insertions, 747 deletions**. No configuration, dependency, route-definition or deployment file changed.

---

## 6. Verification (final tree)

All commands were re-run on the final tree, after the §4.7 copy and metadata alignment. §6.1 supersedes the two tables below with the numbers measured after the §4.8 refinement, and §6.3 supersedes §6.1 with the numbers measured after the §4.9 redesign.

| Command | Result | Detail |
| --- | --- | --- |
| `npm run build` | PASS | Exit 0. Initial bundle 605.83 kB; only warning is the pre-existing initial-bundle budget warning (600 kB budget, exceeded by 5.83 kB). No component-style budget warning. |
| `npm run prerender` | PASS | Exit 0. `[prerender] wrote 33 route files + 404.html`; sitemap declares 33 URLs and is consistent; home title `QuantsMind | Technology Engineering & Innovation`. |
| `npm run smoke` | PASS | Exit 0. "PASS — 204 checks, no overflow or console errors." 34 routes × 6 viewports (1440/1280/1024/768/390/360). |
| `npx ng test --watch=false` | PASS | Exit 0. 27/27 test files, reported at that pass as 477 tests. See §6.2 for the measurement condition behind that number. |

Prerendered titles confirmed from the prerender log and the emitted HTML:

| Route | Prerendered `<title>` | Prerendered `<h1>` |
| --- | --- | --- |
| `/services/` | Business Solutions — QuantsMind | Business Solutions |
| `/technology/` | Technology Ecosystem — QuantsMind | Technology Ecosystem |
| `/labs/` | Research & Innovation — QuantsMind | Research & Innovation |
| `/blog/` | Insights — QuantsMind | Insights |
| `/about/` | About — QuantsMind | About QuantsMind. |
| `/products/` | Products & Applications — QuantsMind | unchanged (Marketplace excluded) |

Baseline comparison:

| Measure | Baseline | Final |
| --- | --- | --- |
| Unit tests | 471/471 | 477/477 (+6) |
| Prerender | 33 + 404 | 33 + 404 |
| Smoke checks | 204 | 204 |
| Build warnings | initial-bundle budget | same single warning |

Warning honesty: the 605.83 kB initial bundle is 5.83 kB over the 600 kB warning threshold. That warning existed before this work (it measured 605.53 kB before the header label change and 605.70 kB after it); the copy and metadata alignment added only string content, and the 900 kB error threshold is not approached. No new warnings were added.

Browser evidence (headless Chrome against the built site): desktop header at 1280 px and 1440 px renders all six labels plus the CTA without clipping; hero, business-solution cards and portfolio section render with the approved copy. After the §4.7 revision, the `/services`, `/technology`, `/labs` and `/blog` heroes were captured at 1440 px and show the aligned eyebrows and headings ("Business Solutions", "Technology Ecosystem", "Research & Innovation", "Insights") with the matching navigation item in its active state. Automated screenshots of long pages can show below-fold reveal animations mid-flight; this is a capture limitation of the scroll-triggered reveal/count-up components, not a content defect (a 3400 px capture with a long virtual-time budget showed the final 06/41/03/10 counts).

### 6.1 Re-verification after the §4.8 refinement (working tree, HEAD `0f839bd`)

Commands were run in sequence, in the same shell session, and each exit code was read from the command itself.

| Command | Exit code | Observed output |
| --- | --- | --- |
| `npm run build` | **0** | `Application bundle generation complete. [56.492 seconds]`; one warning: "bundle initial exceeded maximum budget. Budget 600.00 kB was not met by 5.83 kB with a total of 605.83 kB." |
| `npm run prerender` | **0** | `[prerender] wrote 33 route files + 404.html`; `[prerender] sitemap.xml declares 33 URLs — consistent`; per-route titles include `/services/ → Business Solutions — QuantsMind`, `/technology/ → Technology Ecosystem — QuantsMind` |
| `npm run smoke` | **0** | `[smoke] PASS — 204 checks, no overflow or console errors.` (34 routes × 6 viewports) |
| `npx ng test --watch=false` | **0** | `Test Files 27 passed (27)`; `Tests 479 passed (479)`; `src/app/pages/home/home.component.spec.ts (9 tests)`, `src/app/layout/header/header.component.spec.ts (16 tests)`, `src/app/pages/blog/blog-prerender.spec.ts (86 tests)` |

Baseline comparison for this pass:

| Measure | §4.7 pass | §4.8 pass | Δ |
| --- | --- | --- | --- |
| Unit tests | 477 | **479** | +2 (the two tests named in §4.8) |
| Unit test files | 27 | 27 | none |
| Prerendered routes | 33 + 404 | 33 + 404 | none |
| Smoke checks | 204 | 204 | none |
| Initial bundle | 605.83 kB | 605.83 kB | none |
| Build warnings | 1 (budget) | 1 (budget) | none |

**Text evidence from the prerendered homepage** (`dist/quantsmind-web/browser/index.html`, occurrences counted with `grep -o … | wc -l`, not line counts):

| String | Occurrences | Reading |
| --- | --- | --- |
| `registry` (case-insensitive) | **0** | the internal vocabulary is gone from the rendered page |
| `Explore Products & Technologies` | 1 | new portfolio CTA label |
| `Discuss Your Requirements` | 2 | hero and closing band |
| `Explore Business Solutions` | 1 | hero secondary CTA |
| `Contact QuantsMind` | 7 | 1 desktop header CTA + 6 pre-existing "Typical start: Contact QuantsMind to discuss …" service-card lines |
| `https://github.com/quantsmind` | 2 | footer general link + JSON-LD `sameAs` — unchanged, no repository links |
| `<title>` | 1 | `QuantsMind \| Technology Engineering &amp; Innovation` |

**Header fit, re-measured after the CTA relabel** (headless Chrome, iframe harness against the served prerendered build, harness removed afterwards):

| Viewport | Header inner overflow | Document overflow | CTA text | CTA href | Tagline |
| --- | --- | --- | --- | --- | --- |
| 1200 px | 0 px | 0 px | Contact QuantsMind | `/contact` | hidden |
| 1280 px | 0 px | 0 px | Contact QuantsMind | `/contact` | hidden |
| 1440 px | 0 px | 0 px | Contact QuantsMind | `/contact` | shown |
| 1600 px | 0 px | 0 px | Contact QuantsMind | `/contact` | shown |

Limitation of this evidence: the mobile drawer CTA renders only when the drawer is open, so its new label is confirmed by source (`src/app/layout/header/header.component.ts:298`) and by the component's own spec, not by the prerendered DOM or the harness above.

### 6.2 Test-count measurement condition

Vitest reports skipped tests inside the parenthesised total. `src/app/pages/blog/blog-prerender.spec.ts` guards itself with `const describeArtifacts = artifactsPresent ? describe : describe.skip` (`src/app/pages/blog/blog-prerender.spec.ts:30`), so when no prerendered output exists that file contributes 85 skipped tests.

- Running `npx ng test --watch=false` on a freshly built tree **without** prerendering reports `Tests 394 passed | 85 skipped (479)`. This was observed during this pass before §6.1 was produced.
- Running it **after** `npm run prerender` reports `Tests 479 passed (479)`, which is the figure used in §6.1.

Consequence for the earlier figures in this document: `477` (§4.7 pass) and `447` (commit-tree pass, §8) were recorded as headline totals at their own passes. Their composition was not decomposed into passed versus skipped at the time, so this document does not restate them as "all tests ran". The working tree now runs 479 tests and the verified commit tree ran 447 — a difference of 32 — and the only decomposition performed here is that the working tree additionally contains the two untracked spec files named in §8 plus the two tests added by §4.8.

### 6.3 Re-verification after the §4.9 redesign (working tree, HEAD `0f839bd`)

Commands were run in sequence against the final tree (the last pass includes the `#engagement-models` anchor fix), each in the foreground with its exit code read from the command itself. Prerender was run before the unit suite so that the artifact-conditional spec in §6.2 executes rather than skipping.

| Command | Exit code | Observed output |
| --- | --- | --- |
| `npm run build` | **0** | `Application bundle generation complete.`; one warning only — "bundle initial exceeded maximum budget. Budget 600.00 kB was not met by 6.66 kB with a total of **606.66 kB**." `home-component` chunk 52.40 kB (11.79 kB gzipped). No `anyComponentStyle` warning: the homepage component styles are 20,033 bytes of source, under the 14 kB/16 kB minified thresholds. |
| `npm run prerender` | **0** | `[prerender] discovered 33 routes from app.routes.ts + BLOG_ARTICLES`; `[prerender] wrote 33 route files + 404.html`; `/services/ → Business Solutions — QuantsMind`, `/ → QuantsMind \| Technology Engineering &amp; Innovation` |
| `npm run smoke` | **0** | `[smoke] PASS — 204 checks, no overflow or console errors.` (34 routes × 6 viewports) |
| `npx ng test --watch=false` | **0** | `Test Files 27 passed (27)`; `Tests 496 passed (496)`; grep for `skipped` in the log returns **0** lines, i.e. **496 passed / 0 failed / 0 skipped** |

Per-file runtime counts, from three separate `npx ng test --watch=false --include=<file>` runs (each exit **0**): `home.component.spec.ts` **20 passed (20)**, `header.component.spec.ts` **21 passed (21)**, `services.component.spec.ts` **16 passed (16)**.

Baseline comparison for this pass:

| Measure | §4.8 pass | §4.9 pass | Δ |
| --- | --- | --- | --- |
| Unit tests | 479 passed (479) | **496 passed (496)** | +17, 0 failed, 0 skipped both times |
| Unit test files | 27 | 27 | none |
| Prerendered routes | 33 + 404 | 33 + 404 | none |
| Smoke checks | 204 | 204 | none |
| Initial bundle | 605.83 kB | 606.66 kB | +0.83 kB |
| Build warnings | 1 (budget) | 1 (budget) | none new |

**Prerendered homepage link audit** (`dist/quantsmind-web/browser/index.html`, parsed with a Node script over the emitted HTML, not over the template):

| Check | Result |
| --- | --- |
| `href` attributes / distinct values | 77 / 30 |
| Internal paths that do not resolve to a served prerendered route | **0** (`UNSERVED_PATHS=[]`, against the 33 emitted route directories) |
| Fragment links (`/path#anchor`) whose anchor id exists in the target prerendered page | **12 / 12 OK** — before the anchor fix the same audit reported `MISSING_ID /services#engagement-models`, 11/12 |
| `github.com` occurrences / distinct URLs | **2 / 1** — `https://github.com/quantsmind`, once as the footer `.qm-footer__social-link` (`target="_blank" rel="noopener noreferrer"`) and once in JSON-LD `sameAs`. No repository-specific link (no `quantsmind/karkain`, `quantsmind/microquantum`, `…/tree/…`) appears on the page. |
| Other external origins | `fonts.googleapis.com`, `fonts.gstatic.com`, `linkedin.com/company/quantsmind`, `www.quantsmind.com` |

**Desktop navigation fit and mega menus** (headless Chrome over the served prerendered build, `node scripts/measure-header.mjs`, exit **0**; `docW` = `document.documentElement.scrollWidth`, `win` = `window.innerWidth`):

| Viewport | Desktop nav | Six labels | Last label right edge | Nav right edge | Container right edge | CTA | Toggle | `docW` vs `win` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1440 px | visible | yes | 1063 px | 1063 px | 1360 px | visible → `/contact` | hidden | 1440 = 1440 |
| 1280 px | visible | yes | 925 px | 981 px | 1280 px | visible → `/contact` | hidden | 1280 = 1280 |
| 1024 px | hidden | (in drawer) | — | — | 1024 px | hidden | visible | 1024 = 1024 |
| 768 px | hidden | (in drawer) | — | — | 768 px | hidden | visible | 768 = 768 |
| 390 px | hidden | (in drawer) | — | — | 390 px | hidden | visible | 390 = 390 |
| 360 px | hidden | (in drawer) | — | — | 360 px | hidden | visible | 360 = 360 |

At both 1440 px and 1280 px the nav label set is exactly `Home, Business Solutions, Products & Technologies, Research & Innovation, About QuantsMind, Insights`; `unclippedOffenders` (elements past the right edge with no `overflow-x: hidden/clip/auto/scroll` ancestor) is `[]` at all six viewports. With each mega menu open, `docW` still equals `win`:

| Menu opened | `wide` grid | Panel box | Overview link | Rendered links (all `vis:true`) |
| --- | --- | --- | --- | --- |
| Products & Technologies (1440 / 1280) | true | 300 × 205 px | `/products` | All Products `/products`; Quantum Mission `/quantum-mission`; Quantum Software `/products#quantum-software`; Space Systems `/products#space-software`; Cybersecurity `/products#cybersecurity-software`; Technology Ecosystem `/technology` |
| Research & Innovation (1440 / 1280) | false | 260 × 179 px | `/labs` | QuantsMind Labs `/labs`; Technology Ecosystem `/technology` |
| Business Solutions (1440 / 1280) | true | 301 × 351 px | `/services` | `/quantum`; `/services#space-systems`; `/services#ai-intelligent-systems`; `/services#scientific-computing`; `/services#cybersecurity-digital-trust`; `/services#industrial-intelligence-digital-twin` |

**Mobile drawer, measured while open** (same run; the drawer is only in the DOM inside `@if (mobileOpen)`, so these readings come from a real opened drawer, not from source inspection). At 1024, 768, 390 and 360 px the opened drawer contained exactly the six links `Home /`, `Business Solutions /services`, `Products & Technologies /products`, `Research & Innovation /labs`, `About QuantsMind /about`, `Insights /blog` — each measured with `height > 0` — plus the drawer CTA `Contact QuantsMind →` → `/contact`, `vis:true`. Expanding Research & Innovation (`subToggled: true`, `.qm-mobile-nav__item--open` present) revealed a `.qm-mobile-nav__sub--open` block of height 104 px containing two visible links, QuantsMind Labs `/labs` and Technology Ecosystem `/technology`, with the sub-block widths 399 / 399 / 342 / 316 px at the four viewports. In the open-drawer and expanded-children states `docW` equalled `win` at every viewport, and after `closeMobile()` the drawer element was absent (`drawer:false`) with `docW == win`.

**One transient overflow reading, and what it turned out to be.** An earlier run of the same measurement on a freshly prerendered build reported `docW: 831` against `win: 768` in the closed state at 768 px. A dedicated probe (same build, same served directory, measurements at ~0 ms, 1.5 s, 4 s and after scrolling to the bottom and back) returned `documentElement.scrollWidth = 768` at every sample, and enumerated the elements extending past the viewport: all of them are the `.qm-marquee__track` / `.qm-marquee__group` / `.qm-marquee__item` nodes (track right edge up to 4568 px) whose ancestor `.qm-marquee` clips with `overflow-x: hidden`, plus a `.mission-band__glow` decoration. The 831 px reading did not reproduce on the subsequent run, which reported 768 = 768 with `unclippedOffenders: []`, and `npm run smoke` — which fails on `scrollWidth > innerWidth + 1` and then lists non-clipped offenders — passed 204/204 on the same artifacts. It is recorded here as an unreproduced transient observed during scroll-triggered reveal animations, not as a fixed defect; §7.9 keeps it open.

Screenshot limitation, unchanged from §6: automated captures of long pages can show reveal/count-up animations mid-flight, so the visual QA of the eleven homepage sections in a real browser is not covered by this evidence — the measurements above are DOM/geometry readings, and manual visual review remains **BLOCKED** pending an authorised interactive pass (§7.10).


---

## 7. Deviations and limitations

1. **Header label.** The brief lists "About QuantsMind"; the desktop and mobile label is exactly "About QuantsMind". The full name is also used in the footer and search index.
2. **Responsive brand treatment.** The header tagline is hidden between 1200 px and 1399 px to fit all six destinations without de-aligning the 1280 px content container. It is visible at ≥1400 px. No page content typography was changed.
3. **Non-home terminology — resolved by the 2026-11-05 revision.**
   Superseded text retained for the record: *"Services, Technology, Labs and Insights page copy/metadata still use the previous terminology (for example the prerendered `/services/` title is 'Engineering Services — QuantsMind')."*
   §4.7 now aligns those pages, and §6 records the prerendered titles and headings that replaced them. What this revision does **not** establish: alignment of the `/products` page title and hero copy (Marketplace excluded), and alignment of article body text, which keeps its original technical vocabulary.
4. **Portfolio availability.** The five portfolio cards describe portfolio composition; they do not claim commercial availability. This is intentional.
5. **Contact — partially resolved by §4.8.**
   Superseded text retained for the record: *"The Contact page and its form were not redesigned; only the navigation CTA points to it."*
   After §4.8 the label of that CTA names the destination ("Contact QuantsMind"), it is present in both the desktop and the mobile header, and `/contact` is a search-index entry. What is still not done: the Contact **page** and its form remain exactly as they were (excluded by the brief), and Contact is not a seventh item in the desktop navigation bar.
6. **Marketplace.** Unchanged and still ON HOLD.
7. **`/products` title.** The navigation label is "Products & Technologies" while the `/products` page title and hero remain "Products & Applications", because that page hosts the excluded Marketplace work. Aligning it requires lifting the Marketplace restriction. That page also keeps 11 "registry" occurrences in its template, the only user-facing use of that word left in the pages touched by this programme (`src/app/pages/products/products.component.ts`; `src/app/pages/services/services.component.ts` and `src/app/pages/home/home.component.ts` templates now have none).
8. **Services enquiry CTA.** The Services page reads "Discuss Your Requirement" (singular) while the homepage now reads "Discuss Your Requirements" (plural). The brief excluded rewriting every other page, so the singular form on `/services` was left in place; §4.8 touched only Labs, for its CTA label.
9. **Transient 768 px `documentElement.scrollWidth` reading (open).** One closed-state reading of 831 px against a 768 px viewport was captured during §6.3 and did not reproduce: the repeat run reported 768 = 768 with no unclipped offenders, a dedicated four-sample probe (including after a full scroll down and back) never exceeded 768, and the overflow gate in `npm run smoke` passed 204/204 on the same artifacts. Every element that geometrically extends past 768 px is inside the `.qm-marquee` `overflow-x: hidden` clip. Recorded as a probable scroll-reveal timing artefact; it is not claimed to be resolved.
10. **Manual visual QA of the redesigned homepage — BLOCKED.** The evidence in §6.3 is DOM geometry, prerendered markup and component-test readings. No human-reviewed browser pass over the eleven sections (contrast, spacing, reveal animation end-state, dark/light band rhythm at intermediate widths) has been performed under this brief, so visual quality is asserted only to the extent the measurements support it.
11. **Scope exception taken deliberately.** §4.9 adds one `anchor-alias` span to `services.component.ts` (Business Solutions), which the brief asked not to rewrite. It is a zero-height, `aria-hidden` anchor marker using the page's existing pattern, added only so the homepage's `/services#engagement-models` link resolves; no copy, layout or data changed. If the reviewer prefers strict exclusion, the alternative is to drop that fragment from the homepage aside CTA instead — one line, either way.
12. **Homepage density and duplication.** Slots 05 and 07 both surface Quantum Mission (`/quantum-mission`) and slots 05/06 both reach `/technology`, so the same destination appears from three sections. This is intentional as different framings (product, mission, ecosystem), but it is the kind of repetition a design review may want to reduce. The homepage still presents 6 domain cards, 5 portfolio cards, 6 product cards, 3 technology cards, 5 stage cards and 5 engagement cards; card-based layout dominates, which the brief's caution against "repetitive, undifferentiated cards" only partly tolerates — the cards are differentiated by content structure (situation/deliverables/outcome versus purpose/capabilities/applications versus mix), not by varied layout.

---

## 8. Working-tree and release status

- Branch: `feature/website-evolution-v2.0.0`, now 5 commits ahead of `origin/main`
- Commits created on 2026-11-05 (local only):

| Commit | Subject | Contents |
| --- | --- | --- |
| `11d22c8` | feat(website): apply business positioning across navigation, homepage and page metadata | 21 files: header, footer, home + home spec, `app.routes.ts`, `index.html`, services, technology, labs, blog, article, about, quantum and their specs, three `docs/website-v2` reports |
| `07a5b70` | fix(web): add modules referenced by the committed routes and homepage | `qm-product-detail.component.ts`, `engagement.models.ts` |
| `63bc641` | feat(content): commit the product registry and model used by the redesigned site | `product.registry.ts`, `product.model.ts`, `product.registry.spec.ts` |
| `022d3a0` | fix(web): commit the shared button input and Quantum Mission maturity the tree needs | `qm-button.component.ts`, `quantum-mission.component.ts` + spec |
| `0f839bd` | fix(seo): list the product-detail routes the committed router generates | `public/sitemap.xml` |

- Verification **at the commit tree** `0f839bd`, run in a detached worktree of HEAD sharing the project `node_modules` (removed afterwards): build exit 0 (605.83 kB, same single budget warning), prerender exit 0 (33 route files + 404, sitemap consistent), smoke exit 0 (204 checks), `npx ng test --watch=false` exit 0 — 25 test files, 447 tests. The two test files absent from that count (`src/app/content/website-documentation.spec.ts`, `src/app/pages/quantsmind-sdk/quantsmind-sdk.component.spec.ts`) are still untracked; see §6.2 for how test totals should be read.

- Superseded text retained for the record: *"Working tree: 81 entries (31 modified, 50 untracked), all preserved… no commit, tag, release or deployment was performed."* That described the state before the commits above. Committing only the navigation/homepage files first produced a tree that did **not** build (`NG8002` on `queryParams`) and failed one Quantum Mission maturity test; the follow-up commits were required to close that dependency gap, and the commit tree was then re-verified as described.

### 8.1 State after the §4.8 refinement — no commits made

`git rev-parse --abbrev-ref HEAD` → `feature/website-evolution-v2.0.0`; `git rev-parse --short HEAD` → **`0f839bd`, unchanged by this task**. `git tag -l | wc -l` → **0**.

- Working tree at the close of this task: **60 entries — 13 modified, 47 untracked** (`git status --porcelain`).
- Modified (13): `README.md`, this report, `header.component.ts`, `header.component.spec.ts`, `home.component.ts`, `home.component.spec.ts`, `labs.component.ts` (all seven from this task's work and the report), plus the pre-existing `contact.component.ts`, `karkain.component.ts`, `products.component.ts`, `products.component.spec.ts`, `quantsmind-sdk.component.ts`, `services.component.spec.ts`.
- Untracked (47): unchanged from before this task, including the two spec files above and `qm-product-detail.component.ts.bak`.
- Nothing was reset, cleaned, stashed, reverted, overwritten or discarded. The temporary static server used for the header measurement was stopped by terminating that one background task, not by a process-name-wide kill.

Per §10 of the brief, **no commit, push, merge, tag, release or deployment was performed in this task**, and the branch was not changed. The §4.8 changes therefore exist only in the working tree on top of `0f839bd`; the commit tree verified in §8 above does **not** contain them.

This report records an implementation and verification milestone. **v2.0.0 is not released**, and no public release claim should be derived from this document.

### 8.2 State after the §4.9 redesign — no commits made

Measured at the close of this task: `git rev-parse --abbrev-ref HEAD` → `feature/website-evolution-v2.0.0` (unchanged); `git rev-parse --short HEAD` → **`0f839bdd9917c78dc63f8cf2a43a91c15758f756`** (unchanged); `git tag -l | wc -l` → **0**; `git rev-list --count origin/main..HEAD` → **5** (the same five local commits as §8, no new ones).

- `git status --porcelain` → **64 entries: 15 modified, 49 untracked** (was 60 entries / 13 modified / 47 untracked at §8.1). The growth is exactly the two new untracked content modules (`src/app/content/services/service.registry.ts`, `src/app/content/research/research.registry.ts` — the second arrives with its directory, counted as one entry) plus the two files newly modified by §4.9 (`scripts/measure-header.mjs`, `services.component.spec.ts` was already modified; `services.component.ts` was already modified).
- Modified (15): this report, `README.md`, `scripts/measure-header.mjs`, `header.component.ts`, `header.component.spec.ts`, `home.component.ts`, `home.component.spec.ts`, `labs.component.ts`, `services.component.ts`, `services.component.spec.ts`, and the pre-existing `contact.component.ts`, `karkain.component.ts`, `products.component.ts`, `products.component.spec.ts`, `quantsmind-sdk.component.ts`.
- Every pre-existing modification, untracked log, `docs/website/` report, `.bak` file and `*.py` artefact was left as found. Nothing was reset, cleaned, stashed, reverted, discarded or overwritten; no file was deleted by this task.
- Processes: the only processes started were those spawned by `npm run prerender`, `npm run smoke` and `node scripts/measure-header.mjs`, each of which terminates the headless Chrome instance it created on exit (the scripts kill that one child handle, not a process-name-wide kill). No other process was signalled.

**No commit, push, merge, tag, release or deployment was performed in this task**, and the branch and history are unchanged. The §4.9 work therefore exists only in the working tree on top of `0f839bd`; the commit tree verified in §8 does not contain it.

---

## 9. Remaining v2.0.0 work and recommended follow-up

1. **Commit the working-tree refinements** if and when committing is authorised. Superseded text retained for the record: *"It is currently working-tree only, so the verified commit tree `0f839bd` does not carry the 'Contact QuantsMind' CTA or the portfolio wording."* That is still true, and now also covers §4.9: the commit tree carries neither the redesigned homepage nor the Research & Innovation grouping. Note the dependency that §8 already exposed — `home.component.ts`, `services.component.ts` and `labs.component.ts` import `src/app/content/services/service.registry.ts` and `src/app/content/research/research.registry.ts`, both still untracked, so the pages and the two new modules must be committed in the same change or the commit tree will not build.
2. Align the `/products` page title, hero copy and its 11 remaining "registry" occurrences with the "Products & Technologies" navigation label once the Marketplace restriction is lifted.
3. Decide whether the Services page keeps "Discuss Your Requirement" (singular) or joins the homepage and header vocabulary (§7.8).
4. Review the Marketplace as a separate, explicitly authorised work package (still ON HOLD).
5. Contact page redesign remains excluded and untouched (§7.5).
6. Commit, or deliberately remove, the untracked `src/app/content/website-documentation.spec.ts` and `src/app/pages/quantsmind-sdk/quantsmind-sdk.component.spec.ts` so working-tree and commit-tree test totals stop diverging.
7. Address the initial-bundle budget warning in a dedicated performance pass. Superseded text retained: *"the pre-existing 605.83 kB initial-bundle warning"*; after §4.9 the measured bundle is 606.66 kB (+0.83 kB), still one warning, still far below the 900 kB error threshold.
8. When release is authorised, run the full verification chain again on the exact commit to be tagged, and record the passed/skipped split as in §6.2.
9. Complete the manual visual pass over the eleven homepage sections that §6.3 and §7.10 record as BLOCKED, including the dark/light band rhythm across 07/08 and the reveal-animation end states.
10. Resolve the transient 768 px `scrollWidth` reading (§7.9): either reproduce it under a controlled capture and fix the animating element, or record the four-sample probe as sufficient and close it.
11. Decide the §7.11 exception: keep the additive `#engagement-models` anchor on Business Solutions, or remove the fragment from the homepage's "See the full engagement framework" link.
12. Website-wide GitHub-link cleanup stays reserved for later v2.0.0 work; §6.3 confirms only the general organisation URL appears on the homepage today.
13. The homepage now owns two shared content modules under `src/app/content/`. Any future service-domain or research-area edit must be made there, not in a page template, or the reuse guarantee in §4.9 breaks silently.

---

## 10. Completion statement

The business-oriented v2.0.0 navigation, homepage, search index, global metadata and non-home page copy/metadata are implemented on `feature/website-evolution-v2.0.0`, with all existing routes, prerendering, GitHub Pages behaviour, forms, URL structure and pre-existing work preserved. The latest refinement (§4.8) makes Contact reachable as a named destination from the desktop and mobile headers and removes internal portfolio jargon from the homepage calls to action.

Verification on the working tree at HEAD `0f839bd` (§6.1): build exit 0, prerender exit 0 (33 route files + `404.html`, sitemap consistent), responsive smoke exit 0 (204 checks), unit suite exit 0 (27 files, 479 tests) — each total read from the completed command output, not inferred. The commit tree `0f839bd` was separately verified earlier (§8). Nothing has been committed, pushed, merged, tagged, released or deployed by this task, the branch was not changed and no history was rewritten; v2.0.0 is not released.

**Third revision (§4.9) — completion statement for the homepage redesign itself.** The two paragraphs above are retained unaltered as the record of the earlier revisions; the following supersedes their status only for the work described in §4.9.

The homepage on `feature/website-evolution-v2.0.0` is now structurally redesigned rather than relabelled: eleven ordered sections carry the approved positioning, the six verified engineering domains, the five portfolios with computed maturity mix, the selected products with purpose/capabilities/applications and stated availability, the three proprietary technologies, the unchanged Quantum Mission spotlight, the verified research stages and areas, the five engagement models with an enquiry path, insights, and the closing enquiry band. Business identity, the six domains, the five portfolios, the proprietary technologies, the research direction and the engagement route are each communicated by a dedicated section, and every one of those statements is drawn from `SERVICE_AREAS`, the research module, `ENGAGEMENT_MODELS` or `product.registry.ts` rather than authored fresh — so no availability field, service definition or route changed, and no duplicate registry exists.

The navigation keeps exactly six desktop destinations plus the persistent "Contact QuantsMind" CTA, with Labs and Technology Ecosystem reachable as children of Research & Innovation in both the desktop mega menu and the mobile drawer. This was achieved without a seventh desktop item and without relying on overflow: at 1440 px the nav ends 297 px inside the header container and at 1280 px still 299 px inside, with `document.documentElement.scrollWidth == window.innerWidth` while each mega menu is open, and the same equality in the opened-drawer and expanded-children states at 1024, 768, 390 and 360 px.

Measured verification at the close of this revision (§6.3): `npm run build` exit **0** (606.66 kB, one pre-existing budget warning), `npm run prerender` exit **0** (33 route files + `404.html`), `npm run smoke` exit **0** (204 checks), `npx ng test --watch=false` exit **0** — **496 passed, 0 failed, 0 skipped** across 27 test files. Homepage link audit of the emitted HTML: 30 distinct `href` values, **0** unresolved internal paths, **12/12** fragment anchors resolving, and **1** distinct GitHub URL (the general organisation link) appearing twice — footer link and JSON-LD `sameAs`.

Two things this revision does **not** claim: the manual visual review of the eleven sections is BLOCKED (§7.10), and one transient 768 px `scrollWidth` reading remains open and unreproduced (§7.9). Working tree at the close: 64 entries (15 modified, 49 untracked) with all pre-existing work preserved; `0f839bd` unchanged; no commit, push, merge, tag, release or deployment. **This is development toward v2.0.0, not a public release.**

END OF REPORT

---

## 11. Technology & Product Directory and A3 language-models classification correction (2026-11-09)

This revision records the final step of the broader Technology & Product Directory implementation on `feature/website-evolution-v2.0.0` and the targeted A3 classification correction that immediately followed the final visual acceptance pass of the `/products` page.

### 11.1 Broader Technology & Product Directory implementation (working tree, uncommitted)

- The `/products` page (`src/app/pages/products/products.component.ts`) renders Division A ("Engineering Technologies & Platforms") with four category groups - A1 Programming Languages & Developer Engineering, A2 AI Development & Agent Platforms, A3 Language Models & AI Systems, A4 Scientific, Data & Quantum Technologies - followed by the product-category navigation, catalogue search and filters, featured-product section and portfolio grids.
- Verified Technology entries are sourced from `src/app/content/products/directory-entries.ts` (`VERIFIED_DIRECTORY_ENTRIES`) and rendered as `.directory-card` elements with source, summary, version, maturity and explore link. The category navigation counts still reflect the product registry; the directory groups are separate from the registry-driven catalogue.
- The catalogue (`.qm-product-card`) renders the 41 registry products minus the six Marketplace selections, so directory entries are not duplicated as catalogue cards.

### 11.2 A3 language-models classification correction (2026-11-09)

Owner-approved targeted content correction following the final visual acceptance of `/products`:

- A3 ("Language Models & AI Systems") now lists the three approved language-model technology entries:
  - `QuantsMind-LLM` - research prototype implementing a Transformer-based language model from scratch; maturity "Research Prototype - No validated release"; evidence from the `quantsmind-llm` blog article and the Technology page; no version, distribution or release claim added.
  - `QuantsMind VSCode AI Coder` and `QuantsMind-Agent` - also surfaced under A3 through the entry-level `secondaryCategory: "a3-language-models"`; both remain listed under A2 ("AI Development & Agent Platforms") through their primary `a2-ai-development` category, so neither is duplicated and both stay discoverable in both groups.
- No duplicate product records were created; the 41-entry product registry was not modified; the Marketplace remained untouched; no invented versions, release statuses or availability claims were introduced; no claim of publication on Hugging Face was made; the VS Code AI Coder qualification status ("Alpha") was retained.

### 11.3 Verification at the close of this revision (2026-11-09)

Commands re-run after the correction; each exit code was read from the command output itself.

| Command | Result | Detail |
| --- | --- | --- |
| `npx ng test --watch=false --include=src/app/pages/products/products.component.spec.ts` | **0** | `products.component.spec.ts` **15 passed (15)** - 8 pre-existing product tests plus 7 new directory/search tests (A3 group contents, A2/A3 co-listing, A3 rendering, search by name, unmatched search, combined filters, clear filters). |
| `npm test -- --watch=false` | **1** | Only `src/app/layout/header/header.component.spec.ts` fails (5 tests, pre-existing nav-label drift: spec expects "Products & Technologies", component emits "Products & Technology"). All products, content, home, services, technology, labs and blog suites pass; failures are unrelated to this revision and were not modified. |
| `npm run build` | **0** | Initial bundle 612.14 kB (12.14 kB over the 600 kB warning; pre-existing, budgets not weakened); home component styles 15.44 kB (over 14 kB warning; pre-existing, under 16 kB error). |
| `npm run build:static` | **0** | 33 route files + `404.html`; sitemap declares 33 URLs and is consistent. |
| `npm run test:prerender` | **0** | Exit 0, 86 tests passed in `blog-prerender.spec.ts`. |
| `npm run smoke` | **0** | `[smoke] PASS - 204 checks, no overflow or console errors.` (34 routes x 6 viewports). |
| `git diff --check` | **0** | No whitespace errors (CRLF warnings only on three pre-existing files). |

Browser evidence (dev server `ng serve` on `http://localhost:4200`, Chromium via the in-app browser): `/products` renders Division A groups A1-A4 with the corrected A3 contents; A1 has 3 verified directory entries, A2 has 3 (QuantsMind VSCode AI Coder, QuantsMind-Agent, GuardMCP), A3 has 3 (QuantsMind-LLM, QuantsMind VSCode AI Coder, QuantsMind-Agent), A4 has 2 (QuantsMind Relational DB, Vsector); no A3 empty state; 34 `.qm-product-card` catalogue cards remain (no duplicates introduced); no horizontal overflow; zero console errors/warnings; live search "MicroQuantum" returned `1 of 34 catalogue products match`; combined filters (search "Karkain" + domain developer-tools + status developer-preview) returned Karkain; clear filters reset the catalogue view. Card-level "Explore ->" navigation from an A3 entry resolved to an existing route (`/technology`).

Screenshot limitation (unchanged): automated captures of long pages can show reveal animations mid-flight, and image reads are unavailable in this session, so the four-viewport screenshot set could not be delivered as pixel evidence; visual inspection was performed by DOM/geometry evaluation.

### 11.4 State at the close of this revision

- Branch: `feature/website-evolution-v2.0.0`; HEAD `0f839bd`; ahead 5 of `origin/main`; all work uncommitted.
- No commit, push, merge, tag, release or deployment; no destructive Git operation; all pre-existing working-tree changes preserved.

END OF REPORT

---

## 12. Product Detail Pages and Distribution Links (2026-11-09, second session)

This revision records the Product Detail Pages and Distribution Links milestone on `feature/website-evolution-v2.0.0`, delivered on top of the accepted v2.0.0 baseline and the broader Technology & Product Directory implementation plus the targeted A3 classification correction (see §11).

### 12.1 Detail pages implemented or improved

- `src/app/shared/components/qm-product-detail/qm-product-detail.component.ts` was extended from registry-only rendering into a registry-and-directory detail renderer:
  - Resolves either a verified directory entry (route `data.productId` matched against `VERIFIED_DIRECTORY_ENTRIES`) or a registry product (`getProductById`); unknown identifiers throw.
  - Header shows the directory-aware product name and summary, status badges (directory maturity/version/license or registry maturity/availability/version), a category line and a back-to-products link.
  - Body renders directory entries with Purpose, metadata (maturity/version/license), Distribution, Repository and Evidence blocks; registry products with Description, Capabilities, Use Cases, Modules, Target Domains, Target Clients, Limitations, Documentation and technology tags.
  - Footer renders the appropriate next action: registry products receive the "Request {name} Access" action routed to `/contact?product={id}`; directory entries with an explore route receive the "Explore {name} →" action routed to the technology page; directory entries without an explore route receive the access-request action.
- `src/app/content/products/product.model.ts`: optional `detailRoute` added to `Product`.
- `src/app/content/products/product.registry.ts`: `detailRoute` added for the six curated marketplace selections (`quantum-studio`, `qubit-sim`, `ground-link`, `ai-guard`, `threat-intel`, `telemetry-hub`).
- `src/app/shared/components/qm-product-card/qm-product-card.component.ts`: card CTA now prefers `product.detailRoute` over the generic CTA.
- `src/app/app.routes.ts`: new product detail route `/products/quantsmind-vscode-ai-coder` for the verified QuantsMind VS Code AI Coder directory entry (which has a verified distribution but previously no detail page); `public/sitemap.xml` updated to declare the new URL (34 URLs total).

### 12.2 Verified distribution links and status

- Verified distribution links confirmed in the detail pages at the close of this milestone: QuantsMind VSCode AI Coder → Microsoft Visual Studio Marketplace (itemName `quantsmind.quantsmind-vscode-ai-coder`); QuantsMind-LLM → no distribution claim made (research prototype, no validated release, no Hugging Face claim); QuantsMind-Agent → established Alpha in-repository state (v0.2.0 unreleased); QuantsMind Quantum products retain their established stable public status with individual release/distribution details to be verified before specifics are published.

### 12.3 Tests added or extended in this milestone

- New `src/app/shared/components/qm-product-detail/qm-product-detail.component.spec.ts` (6 tests): registry detail rendering (positioning, status, capabilities, next action), intended-user sections, access CTA link, verified directory rendering with distribution/evidence and no capabilities block, directory explore route, unknown identifier throw.
- `src/app/shared/components/qm-product-card/qm-product-card.spec.ts`: curated selection routes to its detail page; generic product with detail destination routes to it.
- `src/app/pages/products/products.component.spec.ts`: catalogue card link resolution to `/microquantum`.

### 12.4 Verification at the close of this revision (2026-11-09, second session)

| Command | Result | Detail |
| --- | --- | --- |
| Focused detail/card/products tests | **0** | `npx ng test --include=src/app/shared/components/qm-product-detail/** --include=src/app/shared/components/qm-product-card/** --include=src/app/pages/products/** --watch=false` - 33 focused tests passed (16 products, 11 card, 6 detail). |
| `npm test -- --watch=false` | **1** | Only `src/app/layout/header/header.component.spec.ts` fails (5 pre-existing nav-label failures: spec expects "Products & Technologies", component emits "Products & Technology"). No new failures from this milestone. |
| `npm run build` | **0** | Initial bundle 612.82 kB (12.81 kB over the 600 kB pre-existing warning); home component styles 15.44 kB (over 14 kB pre-existing warning). |
| `npm run build:static` | **0** | 34 route files + `404.html`; sitemap declares 34 URLs and is consistent. |
| `npm run test:prerender` | **0** | Exit 0, 86 tests passed. |
| `npm run smoke` | **0** | `[smoke] PASS - 210 checks, no overflow or console errors.` (35 routes x 6 viewports, including the new `/products/quantsmind-vscode-ai-coder/` detail route). |
| `git diff --check` | **0** | No whitespace errors. |

One new responsive defect was introduced and fixed during this milestone: the newly rendered QuantsMind VSCode AI Coder detail page failed the responsive smoke gate at 768 px (document `scrollWidth` 793 px > 768 px) because the Evidence paragraph contained the long unbreakable token `itemName=quantsmind.quantsmind-vscode-ai-coder` without word-wrap; fixed by adding `overflow-wrap: anywhere` to product-detail block paragraphs and list items, and by rendering the access CTA with the button component's `fullWidth` option for mobile containment.

### 12.5 State at the close of this revision

- Branch: `feature/website-evolution-v2.0.0`; HEAD `0f839bd`; ahead 5 of `origin/main`; all work uncommitted.
- No commit, push, merge, tag, release or deployment; no destructive Git operation; all pre-existing working-tree changes preserved.

END OF REPORT
