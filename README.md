# QuantsMind Website

Corporate and technology ecosystem website for QuantsMind, built with [Angular](https://angular.dev).

**Positioning:** Engineering software. Building intelligent technologies.

## Pages

- `/` — Home
- `/services` — Engineering services (Software Architecture, Application Development, AI/ML, Cloud, DevOps/CI/CD, Technical Consulting)
- `/technology` — Technology ecosystem (MicroQuantum, Karkain, QuantsMind SDK)
- `/microquantum` — Open quantum computing SDK (Developer Preview · v0.4.0)
- `/karkain` — General-purpose programming language (Active Development)
- `/quantsmind-sdk` — Foundations for intelligent applications (Development)
- `/labs` — QuantsMind Labs (experimental technologies)
- `/about` — About QuantsMind
- `/contact` — Contact
- `/privacy`, `/terms`, `/cookies` — Legal
- `404` — Not found

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

Build artifacts are output to `dist/browser`. The GitHub Actions workflow
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