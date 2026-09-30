# QuantsMind Website

Corporate and technology ecosystem website for QuantsMind, built with [Angular](https://angular.dev).

**Positioning:** Engineering software. Building intelligent technologies.

## Pages

- `/` — Home
- `/services` — Engineering services (Software Architecture, Application Development, AI/ML, Cloud, DevOps/CI/CD, Technical Consulting)
- `/products` — Commercial products (QuantsMind Document Intelligence Mini)
- `/technology` — Released technologies (MicroQuantum, Karkain, QuantsMind SDK) and Developer Tools (Karkain Language Tools)
- `/microquantum` — Open quantum computing SDK (Stable · v1.1.0)
- `/karkain` — General-purpose programming language (Stable Release · v1.1.0)
- `/quantsmind-sdk` — Universal scientific computing SDK (Production/Stable · v1.1.0)
- `/labs` — QuantsMind Labs (exploration and future R&D directions)
- `/about` — About QuantsMind
- `/contact` — Contact
- `/privacy`, `/terms`, `/cookies` — Legal
- `404` — Not found

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

## Build

```sh
npm run build
```

Build artifacts are output to `dist/quantsmind-web/browser`. The GitHub Actions workflow
(`.github/workflows/deploy.yml`) builds with `--base-href=/`, copies `index.html`
to `404.html`, and writes the `CNAME` (`www.quantsmind.com`), then deploys to
GitHub Pages.

### Deep links and the 404 status code

Copying `index.html` to `404.html` is what makes client-side routes such as
`/services` work: GitHub Pages serves `404.html` for any path that has no matching
file, so the Angular router boots and renders the right page.

The trade-off is that those requests are answered with an HTTP **404** status even
though the page renders correctly. This is inherent to static hosting — the root
page and hashed assets return 200, deep links return 404 with the full app shell.
Per-route `<title>` and meta tags are applied at runtime by
`src/app/core/route-meta.service.ts`, so crawlers that execute JavaScript still see
the correct metadata. If strict 200s on deep links ever become a requirement, that
needs server-side prerendering rather than a workflow change.

## Tests

```sh
npm test                 # watch mode
npm test -- --watch=false   # single run, same as CI
```

Unit tests run with Vitest through `@angular/build:unit-test`. `vitest.config.ts`
pins `pool: 'forks'` on purpose: the `threads` pool times out when starting workers
on Windows and would run zero tests, even though it passes on the Linux CI runner.

## Design System

Global styles and design tokens live in `src/styles` (`_tokens.scss`,
`_typography.scss`, `_layout.scss`, `_utilities.scss`). Shared building blocks are
in `src/app/shared/components` (`qm-container`, `qm-section`, `qm-button`,
`qm-badge`) and `src/app/shared/pipes` (`qmSafeHtml`, `hrefParts`).

Pages are standalone components with inline templates and inline styles — a new
page only needs a route in `src/app/app.routes.ts` (which also carries per-route
SEO metadata consumed by `src/app/core/route-meta.service.ts`) and a component
under `src/app/pages`.