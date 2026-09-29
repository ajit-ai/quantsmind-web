# QuantsMind Website

Corporate and technology ecosystem website for QuantsMind, built with [Angular](https://angular.dev).

**Positioning:** Engineering software. Building intelligent technologies.

## Pages

- `/` — Home
- `/services` — Engineering services (Software Architecture, Application Development, AI/ML, Cloud, DevOps/CI/CD, Technical Consulting)
- `/products` — Commercial products (QuantsMind Document Intelligence Mini)
- `/technology` — Active technologies (MicroQuantum, Karkain, QuantsMind SDK) and Developer Tools (Karkain VS Code Extension)
- `/microquantum` — Open quantum computing SDK (Developer Preview · v1.1.0)
- `/karkain` — General-purpose programming language (Active Development · v1.1.0)
- `/quantsmind-sdk` — Foundations for intelligent applications (Architecture Foundation · v1.1.0)
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

- Node.js (20+)
- npm

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

## Tests

```sh
npm test
```

Unit tests run with Vitest.

## Design System

Global styles and design tokens live in `src/styles` (`_tokens.scss`,
`_typography.scss`, `_layout.scss`, `_utilities.scss`). Shared building blocks are
in `src/app/shared/components` (`qm-container`, `qm-section`, `qm-button`,
`qm-badge`) and `src/app/shared/pipes` (`qmSafeHtml`, `hrefParts`).

Pages are standalone components with inline templates and inline styles — a new
page only needs a route in `src/app/app.routes.ts` (which also carries per-route
SEO metadata consumed by `src/app/core/route-meta.service.ts`) and a component
under `src/app/pages`.