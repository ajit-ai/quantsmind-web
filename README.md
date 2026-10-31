# QuantsMind Website

Corporate and technology ecosystem website for QuantsMind, built with [Angular](https://angular.dev).

**Positioning:** Engineering software. Building intelligent technologies.

## Pages

- `/` — Home
- `/services` — Engineering services across six practice areas: Quantum Computing & Quantum Software Engineering, Space Systems & Mission Software Engineering, AI Engineering & Autonomous Intelligent Systems, Scientific Computing & Digital Simulation, Cybersecurity Engineering & Digital Trust, and Industrial Intelligence & Digital Twin Engineering
- `/products` — Product portfolio across applications, quantum, space and cyber domains
- `/technology` — Published technologies (MicroQuantum, Karkain, QuantsMind SDK) and Developer Tools
- `/microquantum` — Open quantum computing SDK (Developer Preview · v1.1.0)
- `/karkain` — General-purpose programming language (Developer Preview · v1.1.0)
- `/quantsmind-sdk` — Universal scientific computing SDK (Developer Preview · v1.1.0)
- `/labs` — QuantsMind Labs (exploration and future R&D directions)
- `/blog` — Technical articles, with a prerendered page per article
- `/about` — About QuantsMind
- `/contact` — Contact
- `/privacy`, `/terms`, `/cookies` — Legal
- `/404` — Not found. Unknown URLs are served the generated `404.html` document.

## Ecosystem layers

The public site separates four layers:

1. **Products** — commercial, customer-facing products (`/products`)
2. **Developer Tools** — developer-facing tooling supporting the technologies (`/technology`)
3. **Technologies** — active, independently developed technologies
4. **Labs / R&D** — exploration, experiments and future directions (`/labs`)

QuantsMind DB, QLM and other initiatives are represented as Labs exploration only,
not as commercial products or active technologies.

## Prerequisites

- Node.js `^22.22.3 || ^24.15.0 || >=26.0.0`
- npm `^6.11.0 || ^7.5.6 || >=8.0.0`
- Google Chrome or Chromium for static prerendering and the responsive smoke test

That Node range is not arbitrary — it is what Angular 22 declares in the `engines` field of
`@angular/core`, `@angular/cli` and `@angular/build`, and it is mirrored in the `engines`
field of `package.json` so an unsupported runtime fails fast instead of mysteriously.
**Node 20 is not supported.** CI runs Node 22; local development is verified on Node 24.

```sh
node -v   # must satisfy the range above
npm -v
```

## Development

```sh
npm install
npm run start
```

Dev server runs at `http://localhost:4200`.

## Build and static generation

```sh
npm run build          # client-side bundle only
npm run build:static   # production build + prerender every public route
```

`npm run build` writes the bundle to `dist/quantsmind-web/browser`.

`npm run build:static` then runs `scripts/prerender.mjs`, which serves the build over
HTTP, loads every route in headless Chrome and captures the rendered DOM. It writes:

- `<route>/index.html` for every static route in `src/app/app.routes.ts` and every blog
  article in `src/app/pages/blog/articles`
- `404.html` captured from the wildcard route, with `<meta name="robots" content="noindex">`
- `dist/quantsmind-web/prerender-manifest.json`, the list of generated routes consumed by
  the responsive smoke test

Prerendering uses only Node built-ins and needs Chrome. The script looks in the standard
Windows and Linux locations; set `CHROME_PATH` when Chrome is installed elsewhere. CI
installs Chrome with `browser-actions/setup-chrome` and passes its path.

### Deep links, 404s and GitHub Pages

GitHub Pages has no rewrite engine, so the site is deployed as real files rather than as a
client-side SPA fallback:

- Every public route is prerendered to `<route>/index.html` and is served with **HTTP 200**
  and route-specific title, description, Open Graph tags and canonical URL.
- Any path with no matching file is served the generated `404.html` with **HTTP 404**. That
  document contains the real not-found page — title, content and all — and is marked
  `noindex`, so crawlers never mistake it for the home page.
- `sitemap.xml` lists only indexable routes. The 404 document is deliberately excluded.

Because the HTML is prerendered, crawlers and link-unfurlers see the correct metadata even
when they do not execute JavaScript. The Angular router still takes over after hydration
for in-app navigation.

## Verification

Run these before opening a pull request:

```sh
npm test -- --watch=false   # full unit suite
npm run build:static        # production build + prerender (needs Chrome)
npm run test:prerender      # assertions against the generated HTML
npm run smoke               # every generated route × 1440/1280/1024/768/390/360
npm run verify              # build:static + test:prerender + smoke in one command
```

`npm run smoke` is a gate, not a report: it exits non-zero on horizontal overflow or runtime
console errors. It derives its route list from `prerender-manifest.json`, so a newly added
route is covered automatically. `npm run test:prerender` asserts titles, descriptions,
canonicals, sitemap consistency, article prose and the 404 document.

The prerender assertions skip when the static build has not run. A plain `npm run build`
leaves only `index.html`, so `npm test` stays green; run `npm run build:static` first when
you want the static-generation checks to execute.

Unit tests run with Vitest through `@angular/build:unit-test`. `vitest.config.ts`
pins `pool: 'forks'` on purpose: the `threads` pool times out when starting workers
on Windows and would run zero tests, even though it passes on the Linux CI runner.

## Continuous integration

`.github/workflows/ci.yml` runs on every pull request and on pushes to `main`:

1. **Unit Tests** — the full Vitest suite.
2. **Build, Prerender & Smoke** — `npm run build:static`, `npm run test:prerender` and
   `npm run smoke`, with Chrome provisioned by the workflow.

A pull request is not ready to merge until both jobs pass.

## Deployment

Production is deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to
`main` (or by manual `workflow_dispatch`):

1. install dependencies and run the unit suite
2. build with `--base-href=/`
3. prerender every public route and generate `404.html`
4. verify the generated HTML and run the responsive smoke gate
5. write the `CNAME` (`www.quantsmind.com`)
6. upload the Pages artifact and deploy

No repository secrets are required: the workflow uses `GITHUB_TOKEN`, the `pages` and
`id-token` permissions and GitHub's OIDC-based Pages deployment.

GitHub repository settings that must remain in place:

- **Pages → Build and deployment → Source:** GitHub Actions
- **Pages → Custom domain:** `www.quantsmind.com` with **Enforce HTTPS** enabled
- **DNS:** `www` CNAME → `ajit-ai.github.io`

## Branching and releases

- `main` is the production branch. It is also the source of truth for deployment, CI/CD and
  this documentation. It only receives changes through pull requests.
- `develop` is the integration mirror. It is fast-forwarded to `main` after every
  production release so both branches point at the same commit.
- Work happens on `feature/*`, `chore/*` or `fix/*` branches created from `main`.

Release sequence:

```sh
# 1. branch from main and implement
git checkout main
git pull --ff-only origin main
git checkout -b feature/my-change

# 2. verify locally
npm run verify

# 3. commit, push, open a pull request
git push -u origin feature/my-change
gh pr create --base main --head feature/my-change

# 4. wait for CI, then squash-merge
gh pr merge --squash --delete-branch

# 5. sync develop to the new main (fast-forward only)
git checkout main
git pull --ff-only origin main
git checkout develop
git merge --ff-only main
git push origin develop
```

Do not rewrite published history. Merges into `main` are squash merges, so `main` stays
linear. If `develop` has diverged, stop and reconcile it deliberately rather than forcing a
fast-forward.

## Rollback

The site is static, so rollback is quick:

1. **Preferred:** open a pull request that reverts the offending merge commit on `main`.
   Once merged, `deploy.yml` rebuilds and redeploys the previous state.
2. **Emergency:** re-run the last successful `deploy.yml` run from the Actions tab. Pages
   artifacts from that run are retained, so the previous build can be republished without a
   new commit.

A rollback normally completes in a few minutes. After rolling back, verify `/`,
`/sitemap.xml`, a deep link and an unknown URL, then sync `develop`.

## Design system

Global styles and design tokens live in `src/styles` (`_tokens.scss`, `_typography.scss`,
`_layout.scss`, `_surface.scss`, `_utilities.scss`). Shared building blocks are in
`src/app/shared/components` (`qm-container`, `qm-section`, `qm-button`, `qm-badge`) and
`src/app/shared/pipes` (`qmSafeHtml`, `hrefParts`).

Pages are standalone components with inline templates and inline styles — a new page only
needs a route in `src/app/app.routes.ts` (which also carries per-route SEO metadata consumed
by `src/app/core/route-meta.service.ts`) and a component under `src/app/pages`.
