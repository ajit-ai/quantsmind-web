# Website UX Refresh Baseline Report

- **Repository:** [ajit-ai/quantsmind-web](https://github.com/ajit-ai/quantsmind-web)
- **Programme:** Website UX Modernization — Prompt 1 of 5
- **Report date:** 31 October 2026
- **Qualified baseline:** `2a9db5b` (`main` = `develop`)
- **Implementation branch:** `feature/website-ux-refresh`

---

## 1. Repository and branch details

| Item | Value |
| --- | --- |
| Working directory | `F:\Codes\Git\quantsmind-web` |
| Git remote (`origin`) | `https://github.com/ajit-ai/quantsmind-web.git` |
| Default production branch | `main` |
| Integration branch | `develop` |
| Implementation branch | `feature/website-ux-refresh` |
| Current branch at report time | `feature/website-ux-refresh` |
| Current HEAD | `2a9db5b` |
| Working tree before Prompt 1 changes | Clean |
| Git tags | None |
| Remote feature branch | None existed; none was pushed |

### Branch synchronization

| Ref | SHA | Notes |
| --- | --- | --- |
| Local `main` | `2a9db5b4afb09fd541e23575e755018c0279914d` | Matches `origin/main`. |
| Remote `main` | `2a9db5b4afb09fd541e23575e755018c0279914d` | Production baseline. |
| Local `develop` | `2a9db5b4afb09fd541e23575e755018c0279914d` | Matches `origin/develop`. |
| Remote `develop` | `2a9db5b4afb09fd541e23575e755018c0279914d` | Integration baseline. |
| `feature/website-ux-refresh` before preparation | `b00fa67bc24627dd4a9f244e16bba4fbaf12e001` | `chore(website): finalize W2.5 release readiness` (25 Oct 2026). |
| `feature/website-ux-refresh` after preparation | `2a9db5b4afb09fd541e23575e755018c0279914d` | Fast-forwarded to `develop`; history preserved. |

The baseline commit is:

```text
2a9db5b feat(labs): animate the Labs hero with shared orbit artwork (#10)
```

`feature/website-ux-refresh` already existed locally and was an ancestor of `develop`. It was fast-forwarded from `b00fa67` to `2a9db5b` with `git merge --ff-only develop`. It was not recreated, reset or force-updated. No remote branch with this name existed.

---

## 2. Original `main` and `develop` SHAs

At the start of Prompt 1, both branches pointed to the same qualified baseline:

- **`main`:** `2a9db5b4afb09fd541e23575e755018c0279914d`
- **`develop`:** `2a9db5b4afb09fd541e23575e755018c0279914d`

The feature branch's original starting SHA was:

- **`feature/website-ux-refresh`:** `b00fa67bc24627dd4a9f244e16bba4fbaf12e001`

After branch preparation, the feature branch starts from `2a9db5b`. No history was rewritten.

---

## 3. Working-tree status

At inspection, before creating this report and the plan:

- `git status --porcelain=v1` returned no entries.
- No uncommitted or unrelated user work was present.
- No files were stashed, discarded or overwritten.

After the Prompt 1 documentation work, the only untracked path is `docs/`, containing the two planning documents. No application source, workflow, dependency manifest or deployment configuration was modified. The generated `dist/` directory was refreshed by the baseline build but is ignored by Git (`.gitignore` contains `/dist`).

---

## 4. Framework and architecture

### 4.1 Runtime and toolchain

| Item | Version |
| --- | --- |
| Angular | 22.1.2 |
| Angular CLI | 22.1.4 |
| Angular build | 22.1.4 |
| TypeScript | 6.0.3 |
| Vitest | 4.0.8 |
| RxJS | 7.8.2 |
| zone.js | 0.15.1 |
| Node.js (local) | 24.18.1 |
| npm (local) | 11.11.1 |
| CI Node.js | `^22.22.3` |

`package.json` declares Node support for `^22.22.3 || ^24.15.0 || >=26.0.0`. Node 20 is explicitly unsupported in the README.

### 4.2 Application architecture

- Angular **standalone component** application, bootstrapped from `src/main.ts`.
- Route-level lazy loading through `src/app/app.routes.ts`.
- `ChangeDetectionStrategy.OnPush` used across page and layout components.
- SCSS styling with a global token layer and shared component styles.
- Route metadata supplied through route `data` and `RouteMetaService`, then baked into static HTML by the prerender script.
- Product content centralised in `src/app/content/products/product.registry.ts` (40-product portfolio).
- GitHub Pages hosting with prerendered route documents rather than SPA rewrites.

### 4.3 Source layout

| Path | Purpose |
| --- | --- |
| `src/app/core/` | Contact configuration/service and route metadata service. |
| `src/app/content/products/` | Product model, registry, exports and registry tests. |
| `src/app/layout/` | Header and footer layout components. |
| `src/app/pages/` | Route-level page components: home, services, products, technology, microquantum, karkain, quantsmind-sdk, labs, blog, about, contact, quantum, privacy, terms, cookies, not-found. |
| `src/app/shared/` | Reusable components, directives, pipes and shared UI primitives. |
| `src/styles/` | `_tokens.scss`, `_layout.scss`, `_surface.scss`, `_typography.scss`, `_utilities.scss`, `_visuals.scss`. |
| `scripts/` | `prerender.mjs`, `responsive-smoke.mjs`, `measure-header.mjs`. |
| `.github/workflows/` | `ci.yml` and `deploy.yml`. |

### 4.4 Build and route output

- Build output: `dist/quantsmind-web`.
- Prerender output: **26 route documents + `404.html`**.
- `sitemap.xml`: **26 URLs**, consistent with the prerender manifest.
- Public routes include `/`, `/services/`, `/products/`, `/technology/`, `/microquantum/`, `/karkain/`, `/quantsmind-sdk/`, `/labs/`, `/blog/`, individual blog articles, `/about/`, `/contact/`, `/quantum/`, `/privacy/`, `/terms/`, `/cookies/` and the wildcard 404 route.

---

## 5. Existing UI structure

### 5.1 Header

`src/app/layout/header/header.component.ts` currently provides:

- Seven primary destinations: **Home, Services, Products, Technology, Labs, Blog, About**.
- A separate **Get in Touch** CTA linking to `/contact`.
- Services mega menu with the six approved domains.
- Technology mega menu with MicroQuantum, Karkain and QuantsMind SDK.
- Site search, light/dark theme toggle and a responsive mobile navigation drawer.
- Scroll-state styling and active-route indication.

This already matches the approved seven-destination requirement. The visual compaction and responsive review remain part of v0.1.0.

### 5.2 Footer

`src/app/layout/footer/footer.component.ts` currently provides:

- Brand column plus **Site**, **Products** and **Technology** columns.
- Contact row with `ajitkumar@quantsmind.com` and the street address `28, Shikargarh, Jodhpur – 342015, Rajasthan, India`.
- Social links for email, LinkedIn and GitHub (`https://github.com/quantsmind`).
- Legal links for Privacy Policy, Terms of Use and Cookie Policy.
- Copyright and back-to-top control.

This does **not** yet match the approved four-column footer. In particular:

- The street address must be replaced with `Jodhpur, Rajasthan, India`.
- The structure must become **Company / Explore / Products & Technology / Connect**.
- Product cards and footer links must not expose individual product GitHub repositories.
- Only one GitHub link may be published.

### 5.3 Homepage

`src/app/pages/home/home.component.ts` currently contains:

1. Hero with system-map visual.
2. Focus-area marquee.
3. Proof/statistics strip.
4. “What we do” capability cards.
5. “What we deliver” tracks.
6. Technology ecosystem.
7. Products and developer tools.
8. QuantsMind Labs band.
9. “Why QuantsMind” cards.
10. Final contact CTA.

The agreed ten-section structure is not yet implemented. The current page has no dedicated **Quantum Mission spotlight** and no **Insights and Blog** section. The homepage redesign is deliberately deferred beyond Prompt 1.

### 5.4 Services and products

- `src/app/pages/services/services.component.ts` contains the six approved service domains.
- `src/app/pages/products/products.component.ts` uses the central product registry and shared product-card/portfolio components.
- The product registry includes the ten Quantum Mission applications as **proposed initiatives**, not operational products. Existing copy explicitly limits their maturity.

### 5.5 Technology and Quantum Mission

- `src/app/pages/technology/technology.component.ts` presents Karkain, MicroQuantum and QuantsMind SDK, plus additional ecosystem entries.
- The source currently labels Karkain, MicroQuantum and QuantsMind SDK as **Developer Preview · v1.1.0**. These versions must be re-verified against public release sources before being repeated in new presentation work.
- `src/app/pages/quantum/quantum.component.ts` is a quantum engineering services page. There is no consolidated ten-application Quantum Mission presentation on the homepage or a dedicated product page yet.

### 5.6 Shared design system

- **Precision Systems** visual language: light editorial canvas, deep navy bands, blue/cyan signal accents, bespoke SVG artwork and restrained motion.
- Shared components include `qm-container`, `qm-section`, `qm-button`, `qm-badge`, `qm-product-card`, `qm-product-portfolio`, `qm-service-product-showcase`, `qm-page-hero`, `qm-count-up` and `qm-marquee`.
- Motion is disabled under `prefers-reduced-motion: reduce`.
- Design tokens live in `src/styles/_tokens.scss`.

---

## 6. Relevant source files

| File | Relevance |
| --- | --- |
| `src/app/app.routes.ts` | Route table and per-route SEO metadata. |
| `src/app/app.config.ts`, `src/app/app.component.ts`, `src/main.ts` | Application bootstrap and layout shell. |
| `src/app/layout/header/header.component.ts` | Navigation, mega menus, search, theme control, Contact CTA and mobile drawer. |
| `src/app/layout/footer/footer.component.ts` | Footer columns, contact details, social and legal links. |
| `src/app/pages/home/home.component.ts` | Current homepage sections and visuals. |
| `src/app/pages/services/services.component.ts` | Six service domains and service presentation. |
| `src/app/pages/products/products.component.ts` | Product portfolio presentation. |
| `src/app/pages/technology/technology.component.ts` | Karkain, MicroQuantum, SDK and ecosystem presentation. |
| `src/app/pages/quantum/quantum.component.ts` | Quantum engineering services page. |
| `src/app/pages/labs/labs.component.ts` | Labs page and shared animated hero. |
| `src/app/pages/blog/blog.component.ts`, `src/app/pages/blog/article.component.ts` | Blog index and article presentation. |
| `src/app/pages/contact/contact.component.ts`, `src/app/core/contact.config.ts`, `src/app/core/contact.service.ts` | Contact page and existing delivery integration. |
| `src/app/pages/about/about.component.ts` | About page. |
| `src/app/content/products/product.registry.ts` | Product and Quantum initiative content. |
| `src/app/shared/components/` | Shared UI components, including the page hero and product components. |
| `src/styles/_tokens.scss`, `src/styles/_visuals.scss`, `src/styles/_surface.scss`, `src/styles/_layout.scss`, `src/styles/_typography.scss` | Design tokens, visual language, surfaces and layout. |
| `src/index.html` | Global metadata and document shell. |
| `package.json`, `angular.json`, `vitest.config.ts` | Scripts, dependencies, build budgets and test configuration. |
| `scripts/prerender.mjs` | Static HTML generation for every public route. |
| `scripts/responsive-smoke.mjs` | Route-by-width smoke test. |
| `scripts/measure-header.mjs` | Header measurement utility. |
| `.github/workflows/ci.yml`, `.github/workflows/deploy.yml` | CI gates and GitHub Pages deployment. |
| `README.md` | Architecture, commands, CI/CD, branching, rollback and design-system documentation. |

---

## 7. Existing CI/CD workflows

### 7.1 CI — `.github/workflows/ci.yml`

Triggers:

- Push to `main`.
- Any pull request.
- Manual `workflow_dispatch`.

Jobs:

1. **Unit Tests** — Node `^22.22.3`, `npm ci`, `npm test -- --watch=false`.
2. **Build, Prerender & Smoke** — Node `^22.22.3`, Chrome stable, `npm run build:static`, `npm run test:prerender`, `npm run smoke`.

Permissions are read-only (`contents: read`). Concurrency cancels superseded runs for the same ref.

### 7.2 Deployment — `.github/workflows/deploy.yml`

Triggers:

- Push to `main`.
- Manual `workflow_dispatch`.

Build job:

1. Checkout and set up Node `^22.22.3`.
2. `npm ci`.
3. `npm test -- --watch=false`.
4. Set up Chrome stable.
5. `npm run build -- --configuration=production --base-href=/`.
6. `npm run prerender`.
7. `npm run test:prerender`.
8. `npm run smoke`.
9. Write `www.quantsmind.com` to `dist/quantsmind-web/browser/CNAME`.
10. Upload the Pages artifact.

Deploy job:

- Depends on the build job.
- Uses the `github-pages` environment.
- Deploys with `actions/deploy-pages@v5`.

Production target: GitHub Pages at `https://www.quantsmind.com`, with the Pages source set to GitHub Actions and HTTPS enforced. DNS and Hostinger configuration are outside this programme.

### 7.3 Branch protection

`main` is protected with:

- Required status checks: **Unit Tests** and **Build, Prerender & Smoke**.
- Strict up-to-date branch requirement.
- Admin enforcement enabled.
- Force pushes disabled.
- Branch deletion disabled.
- Required conversation resolution.
- Required approving reviews: **0** (approval is enforced by the programme process, not by a GitHub review count).

`develop` is **not protected** (GitHub API returned “Branch not protected”). CI does not run on direct pushes to `develop`; it runs on pull requests and on pushes to `main`. Promotion to `develop` should therefore use pull requests even though GitHub does not currently require them.

### 7.4 Existing branching documentation

`README.md` currently documents a main-first convention:

- `main` is production and the source of truth.
- `develop` is an integration mirror fast-forwarded to `main` after each release.
- Work branches are created from `main` and merged into `main` by squash merge.

This differs from the Prompt 1 programme strategy, which uses `develop` as the integration baseline and `feature/website-ux-refresh` as the implementation branch. The programme plan governs this work; the README should be reconciled during v1.0.0 documentation, or earlier with approval.

---

## 8. Baseline build and test results

All commands were run locally on the prepared `feature/website-ux-refresh` branch at `2a9db5b` on 31 October 2026.

| Check | Command | Result |
| --- | --- | --- |
| Production build | `npm run build` | **Pass** — bundle generated in `dist/quantsmind-web` in 51.2 s. |
| Unit tests, plain build | `npm test -- --watch=false` | **329 passed, 85 skipped** of 414. The 85 skips are prerender-dependent tests that skip when only `index.html` exists. |
| Static build and prerender | `npm run build:static` | **Pass** — 26 route files + `404.html`; sitemap declares 26 URLs. |
| Prerender assertions | `npm run test:prerender` | **86/86 passed**. |
| Responsive smoke | `npm run smoke` | **162/162 checks passed** — 27 routes × 6 widths, no overflow or console errors. |
| Unit tests, static build present | `npm test -- --watch=false` | **414/414 passed** across 23 test files. |
| Whitespace check | `git diff --check` | **Clean**. |

### 8.1 Notes on the results

- The first unit run is not a failure: the README documents that prerender assertions skip until `npm run build:static` has generated the static route documents. Re-running after the static build produced the full 414/414 result.
- The initial production bundle is approximately **596.5 kB**, against Angular budgets of **600 kB warning** and **900 kB error**. This leaves limited headroom and is recorded as a performance risk.
- There is no `lint` script in `package.json`. The available scripts are `ng`, `start`, `build`, `prerender`, `build:static`, `test:prerender`, `smoke`, `verify`, `watch` and `test`.
- `npm run verify` runs `build:static`, `test:prerender` and `smoke`; it does not run the unit suite, so unit tests must be run separately.

---

## 9. Existing versioning convention

- `package.json` version: **`0.0.0`**.
- `package-lock.json` root version: **`0.0.0`**.
- Git tags: **none**.
- No `CHANGELOG.md` or dedicated release-notes file.
- No `docs/` directory existed before Prompt 1.
- `README.md` documents the branching, release sequence and rollback process, but not semantic package versioning.

The repository therefore has no suitable release-tracking mechanism for this programme. `docs/website/WEBSITE_UX_REFRESH_PLAN.md` is introduced as the authoritative milestone tracker. No package version was bumped, no tag was created and no release was published during Prompt 1. Any future package-version bump, tag or GitHub release requires explicit approval.

---

## 10. Blockers and risks

| Risk | Evidence | Impact | Mitigation |
| --- | --- | --- | --- |
| README branching convention differs from the programme strategy | README documents feature branches from `main`; this programme uses `develop` integration | Confusion during promotion and review | Follow this plan; reconcile README during v1.0.0 or earlier with approval. |
| Initial bundle close to warning budget | ~596.5 kB vs 600 kB warning / 900 kB error | Small additions may trigger a budget warning | Avoid unnecessary dependencies; review bundle size each milestone. |
| Current footer conflicts with approved footer | Street address and multiple product GitHub links are published today | Accuracy/privacy risk and non-compliance with approved structure | Replace in v0.1.0 with `Jodhpur, Rajasthan, India` and one GitHub link; verify all links. |
| Homepage does not match the ten-section structure | No Quantum Mission spotlight or Insights/Blog section | v0.1.0 acceptance cannot pass without redesign | Implement in the appropriate milestone; do not claim completion early. |
| Product maturity claims need re-verification | Technology source shows Developer Preview · v1.1.0; Quantum applications are proposed initiatives | Risk of unsupported version or GA claims | Verify against PyPI/GitHub releases before publication; preserve limitation language. |
| `develop` is unprotected | GitHub API reports “Branch not protected” | Direct pushes are possible; CI does not run on `develop` pushes | Use pull requests for integration; consider protection later with approval. |
| Feature branch has no remote counterpart | `git ls-remote` showed no `feature/website-ux-refresh` | No remote CI or PR exists yet | Push only when authorized; local baseline checks passed. |
| No lint script | `package.json` has no `lint` entry | Style issues are not automatically gated | Rely on build, tests and review; add tooling only with approval. |
| Prerender tests skip without a static build | First unit run: 85 skipped | A plain `npm test` can give false confidence | Always run `build:static` before the full suite; CI already does. |
| No tags or changelog | `git tag` is empty; package version `0.0.0` | Release history is not machine-tracked | Use this plan; decide on version bump/tag at release with approval. |
| Main requires no approving review count | Branch protection reports `required_approving_review_count: 0` | Green checks alone could allow a merge | Explicit programme approval is required before any merge. |
| Production deploys automatically on `main` push | `deploy.yml` triggers on push to `main` | Any unauthorized push would deploy | Merge only after approval; do not push directly to `main`. |
| Contact delivery and hosting are fixed integrations | Formspree/contact config and GitHub Pages/CNAME are active | Changes could break enquiries or hosting | Keep out of scope; require separate approval for any change. |

No blocker prevented Prompt 1 from completing.

---

## 11. Files created or modified

### Created

- `docs/website/WEBSITE_UX_REFRESH_PLAN.md`
- `docs/website/WEBSITE_UX_REFRESH_BASELINE_REPORT.md`

### Modified

- None. No application source, test, workflow, dependency manifest or deployment configuration was changed.

### Generated but ignored

- `dist/quantsmind-web/` was regenerated by the baseline build and is ignored by Git.

`git status --porcelain=v1` after the documentation work reports only the new `docs/` directory. No commit, push, merge into `develop` or `main`, tag or deployment was performed. The only branch movement was the fast-forward of `feature/website-ux-refresh` to the `develop` baseline.

---

## 12. Prompt 1 completion statement

Prompt 1 established the repository baseline, prepared the existing feature branch without rewriting its history, created the two required planning documents, and ran the baseline build and test gates. The repository remains uncommitted and undeployed. Implementation work, including the homepage redesign, has not started and awaits approval before Prompt 2.
