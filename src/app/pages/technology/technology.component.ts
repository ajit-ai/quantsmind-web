import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';

interface EcosystemTech {
  name: string;
  tagline: string;
  status: string;
  version: string;
  badge: BadgeVariant;
  mark: string;
  description: string;
  /**
   * Primary destination for the card. Internal route for projects that have a
   * detail page; the verified public repository (external) for the rest, so the
   * card never links back to the page it is already on.
   */
  href: string;
  /** True when `href` is an off-site URL, which opens in a new tab. */
  external?: boolean;
  /** Trailing link text. Defaults to "Explore <name>". */
  ctaText?: string;
  /** Public repository. Omitted only when a project has no public repository. */
  repoUrl?: string;
  /** Release, package index or documentation reference backing the version shown. */
  releaseUrl?: string;
  releaseLabel?: string;
}

@Component({
    selector: 'app-technology',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, SafeHtmlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">TECHNOLOGY</span>
        <h1>Technology Ecosystem</h1>
        <p class="lead">
          Open software technologies built, engineered and maintained by QuantsMind.
          Each project below shows its own current maturity, the release it corresponds
          to, and a public source you can check for yourself.
        </p>
        <p class="lead section-lead">
          Maturity is stated per project and is deliberately conservative. A published
          version number means a release exists — it is not a claim of production
          readiness, and none of these projects is described as production-ready.
        </p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container>
        <div class="ecosystem-grid">
          @for (tech of ecosystem; track tech) {
            <article class="tech-card">
              <span class="qm-mark tech-card__mark" aria-hidden="true" [innerHTML]="tech.mark | qmSafeHtml"></span>
              <div class="tech-card__meta">
                <h2 class="tech-card__title">
                  @if (tech.external) {
                    <a [href]="tech.href" target="_blank" rel="noopener noreferrer"
                      class="tech-card__title-link"
                      [attr.aria-label]="tech.name + ' — open repository on GitHub in a new tab'">{{ tech.name }}</a>
                  } @else {
                    <a [routerLink]="tech.href" class="tech-card__title-link">{{ tech.name }}</a>
                  }
                </h2>
                <qm-badge [variant]="tech.badge">{{ tech.status }}</qm-badge>
              </div>
              <p class="tech-card__version">{{ tech.version }}</p>
              <p class="tech-card__tagline">{{ tech.tagline }}</p>
              <p class="tech-card__desc">{{ tech.description }}</p>
              <span class="tech-card__link" aria-hidden="true">{{ tech.ctaText || ('Explore ' + tech.name) }}</span>
              @if ((tech.repoUrl && !tech.external) || tech.releaseUrl) {
                <p class="tech-card__refs">
                  @if (tech.repoUrl && !tech.external) {
                    <a [href]="tech.repoUrl" target="_blank" rel="noopener noreferrer"
                      class="tech-card__ref"
                      [attr.aria-label]="tech.name + ' — open repository on GitHub in a new tab'">{{ tech.name }} on GitHub ↗</a>
                  }
                  @if (tech.repoUrl && !tech.external && tech.releaseUrl) {
                    <span class="tech-card__refsep" aria-hidden="true">·</span>
                  }
                  @if (tech.releaseUrl) {
                    <a [href]="tech.releaseUrl" target="_blank" rel="noopener noreferrer"
                      class="tech-card__ref"
                      [attr.aria-label]="tech.releaseLabel + ' — opens in a new tab'">{{ tech.releaseLabel }} ↗</a>
                  }
                </p>
              }
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" size="sm">
      <qm-container size="narrow">
        <div class="intro-block">
          <h2>Behind the Ecosystem</h2>
          <p class="lead">
            These technologies are built with the same engineering discipline we apply
            to client work. Each entry states its current maturity and its known
            limitations. Where a project is incomplete, pre-release, or simulation-only,
            the description says so rather than rounding it up.
          </p>
          <p class="lead section-lead">
            Karkain, MicroQuantum and the QuantsMind SDK have their own pages below. The
            remaining projects do not have a dedicated page yet, so their cards link
            straight to the public repository, where the source and its documentation can
            be read directly.
          </p>
          <qm-button variant="secondary" [routerLinkValue]="'/contact'">
            Discuss a Collaboration Idea →
          </qm-button>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    .page-hero { padding: 80px 0 64px; border-bottom: 1px solid var(--color-border); }
    @media (min-width: 768px) { .page-hero { padding: 112px 0 80px; } }
    .page-hero h1 { max-width: 720px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 640px; margin: 0; }

    .ecosystem-grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
    }
    @media (min-width: 768px) { .ecosystem-grid { grid-template-columns: repeat(3, 1fr); } }

    .tech-card {
      position: relative;
      display: flex; flex-direction: column; gap: 12px;
      padding: 32px;
      background: var(--card-bg-subtle);
      border: 1px solid var(--card-border); border-radius: var(--card-radius);
      box-shadow: var(--card-shadow);
      transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
    }
    .tech-card:hover {
      border-color: var(--card-border-hi);
      box-shadow: var(--card-shadow-hi);
      transform: translateY(-2px);
    }
    .tech-card:focus-visible {
      outline: 2px solid var(--color-accent); outline-offset: 3px;
    }
    /* Stretched link: the whole card stays clickable while reference links
       below remain separately focusable siblings. */
    .tech-card__title-link { color: inherit; text-decoration: none; }
    .tech-card__title-link::after {
      content: ''; position: absolute; inset: 0; border-radius: var(--card-radius);
    }
    .tech-card__title-link:focus-visible {
      outline: 2px solid var(--color-accent); outline-offset: 3px; border-radius: 4px;
    }
    .tech-card__mark { margin-bottom: 4px; }
    .tech-card__meta {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; flex-wrap: wrap; min-width: 0;
    }
    .tech-card__title { font-size: 20px; font-weight: 600; color: var(--color-text-primary); margin: 0; }
    .tech-card__version { font-size: 13px; font-weight: 600; color: var(--color-text-muted); margin: -4px 0 0; font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace; }
    .tech-card__tagline { font-size: 14px; font-weight: 500; color: var(--color-accent); margin: 0; }
    .tech-card__desc  { font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); margin: 0; flex: 1; }
    .tech-card__link  { font-size: 13px; font-weight: 500; color: var(--color-accent); margin-top: 4px; }
    .tech-card__refs {
      position: relative; z-index: 1;
      display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px;
      margin: 0; padding-top: 12px;
      border-top: 1px solid var(--card-border);
    }
    .tech-card__ref { font-size: 12px; color: var(--color-text-muted); text-decoration: underline; text-underline-offset: 2px; }
    .tech-card__ref:hover { color: var(--color-accent); }
    .tech-card__ref:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
    .tech-card__refsep { font-size: 12px; color: var(--color-text-muted); }

    @media (prefers-reduced-motion: reduce) {
      .tech-card { transition: none; }
      .tech-card:hover { transform: none; }
    }

    /* ── DEVELOPER TOOLS ── */
    .tool-lead { max-width: 640px; margin: 0 0 36px; }

    .intro-block {
      text-align: center; display: flex; flex-direction: column;
      align-items: center; gap: 16px;
    }
    .intro-block h2 { margin: 0; }
    .intro-block .lead { max-width: 640px; margin: 0; }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent); margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: var(--color-text-secondary); }
    .section-lead { max-width: 680px; margin: 16px 0 0; font-size: 16px; }
  `]
})
export class TechnologyComponent {
  ecosystem: EcosystemTech[] = [
    {
      name: 'MicroQuantum',
      tagline: 'Open Quantum Computing SDK',
      status: 'Developer Preview',
      version: 'v1.1.0',
      badge: 'experimental',
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>',
      description:
        'An open, NumPy-only Python SDK for building, executing and analyzing quantum ' +
        'programs. Version 1.1.0 is a published release on PyPI. Execution is by ' +
        'simulation; no quantum hardware backend is included, so results describe ' +
        'classical simulation rather than physical-device behaviour.',
      href: '/microquantum',
      repoUrl: 'https://github.com/ajit-ai/microquantum',
      releaseUrl: 'https://pypi.org/project/microquantum/',
      releaseLabel: 'PyPI'
    },
    {
      name: 'Karkain',
      tagline: 'General-Purpose Programming Language',
      status: 'Developer Preview',
      version: 'v1.1.0',
      badge: 'experimental',
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 5 4 12 9 19"/><polyline points="15 5 20 12 15 19"/></svg>',
      description:
        'An independent, statically typed systems programming language with a ' +
        'self-hosted compiler. The compiler emits C23 and delegates machine-code ' +
        'generation to a host C toolchain, so a working C compiler is required. ' +
        'Version 1.1.0 is a published GitHub release. The language, standard library ' +
        'and ecosystem are early and the API surface may still change.',
      href: '/karkain',
      repoUrl: 'https://github.com/ajit-ai/Karkain',
      releaseUrl: 'https://github.com/ajit-ai/Karkain/releases/tag/v1.1.0',
      releaseLabel: 'Release v1.1.0'
    },
    {
      name: 'QuantsMind SDK',
      tagline: 'Scientific Computing SDK',
      status: 'Developer Preview',
      version: 'v1.1.0',
      badge: 'experimental',
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>',
      description:
        'An open, vendor-independent Python SDK for scientific computing, published on ' +
        'PyPI as the package "quantsmind". It provides modules across mathematics, ' +
        'physics, chemistry, biology, astronomy, finance, agent abstractions and ' +
        'knowledge graphs. It is a young project with a rapidly growing surface and ' +
        'requires Python 3.13 or newer; module coverage and numerical accuracy vary by ' +
        'domain and are not uniformly benchmarked.',
      href: '/quantsmind-sdk',
      repoUrl: 'https://github.com/ajit-ai/quantsmind-quantum-sdk',
      releaseUrl: 'https://pypi.org/project/quantsmind/',
      releaseLabel: 'PyPI'
    },
    {
      name: 'QuantsMind Relational DB',
      tagline: 'Embeddable Relational Database Engine',
      status: 'Alpha · Under Development',
      version: 'v0.1.0 (pre-release)',
      badge: 'prototype',
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
      description:
        'A relational database engine written in Rust, shipped as a library, a ' +
        'Postgres-wire-compatible server, a CLI shell and a desktop GUI. Version ' +
        '0.1.0 is published as a pre-release. It supports a subset of SQL rather than ' +
        'full conformance, and recovery is redo-only without physical checkpoints. Not ' +
        'published to crates.io or npm; build from source.',
      href: 'https://github.com/ajit-ai/Quantsmind-Relational-DB',
      external: true,
      ctaText: 'View repository on GitHub ↗',
      repoUrl: 'https://github.com/ajit-ai/Quantsmind-Relational-DB',
      releaseUrl: 'https://github.com/ajit-ai/Quantsmind-Relational-DB/releases/tag/v0.1.0',
      releaseLabel: 'Release v0.1.0'
    },
    {
      name: 'GuardMCP',
      tagline: 'Policy and Security Control Layer for MCP Tool Calls',
      status: 'Alpha · Under Development',
      version: 'v0.1.0',
      badge: 'prototype',
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5.5v6c0 5 3.4 9.2 8 10.5 4.6-1.3 8-5.5 8-10.5v-6z"/><path d="m9 12 2 2 4-4"/></svg>',
      description:
        'An open Python library that evaluates policy, risk, budget and delegation ' +
        'rules before an agent or client calls a protected Model Context Protocol tool, ' +
        'and inspects the result afterwards. The package manifest declares version ' +
        '0.1.0. Development is partway through a documented phase plan: the root ' +
        'distribution packages the core package, while the eleven component packages ' +
        'each carry their own manifest and source. The gateway and control-plane ' +
        'applications described in its documentation are not present in the repository, ' +
        'and no persistence layer is implemented.',
      href: 'https://github.com/ajit-ai/GuardMCP',
      external: true,
      ctaText: 'View repository on GitHub ↗',
      repoUrl: 'https://github.com/ajit-ai/GuardMCP'
    },
    {
      name: 'QuantsMind-Agent',
      tagline: 'Desktop AI Coding Agent',
      status: 'Alpha · Under Development',
      version: 'v0.2.0 (in-repo, unreleased)',
      badge: 'prototype',
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M6 9l3 3-3 3M12 15h6"/></svg>',
      description:
        'A desktop coding agent that connects a compatible OpenAI-compatible language ' +
        'model to a local project. It ships a PySide6/Qt interface and a headless CLI, ' +
        'and can read, write, edit and delete files, run approved commands and inspect ' +
        'Git state. Tools declare their own permissions, and a deny-by-default permission ' +
        'layer with a human approval prompt gates every call. Licensed MIT. ' +
        'Limitations: the command policy is an application-level deny list, not an ' +
        'operating-system sandbox, and Git mutations (commit, push, checkout, reset) are ' +
        'deliberately blocked. Version 0.2.0 is declared in the repository but no ' +
        'release or package has been published. Windows is the only platform the GUI has ' +
        'been run on; macOS is listed as planned and BSD is unsupported. An intermittent ' +
        'GUI abort on one CPython version is documented as unresolved.',
      href: 'https://github.com/ajit-ai/QuantsMind-Agent',
      external: true,
      ctaText: 'View repository on GitHub ↗',
      repoUrl: 'https://github.com/ajit-ai/QuantsMind-Agent'
    },
    {
      name: 'QuantsMind-LLM',
      tagline: 'From-Scratch Coding Language Model Research',
      status: 'Research Prototype',
      version: 'No validated release',
      badge: 'research',
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="4" r="1.5"/><circle cx="19" cy="16" r="1.5"/><circle cx="5" cy="16" r="1.5"/><path d="M12 5.5v4M13.8 13.4l3.6 1.8M10.2 13.4 6.6 15.2"/></svg>',
      description:
        'Open research into training a code-oriented language model from scratch, with ' +
        'its own Transformer implementation (RMSNorm, rotary embeddings, grouped-query ' +
        'attention, SwiGLU), its own BPE tokenizer, training and fine-tuning loops, and ' +
        'local inference plus FastAPI serving for completion and review. Licensed ' +
        'Apache-2.0. The project describes itself as a local prototype. ' +
        'Limitations: no release has been published and no version has been validated. ' +
        'The code corpus committed to the repository is far smaller than the shipped ' +
        'training configuration requests, the committed tokenizer vocabulary does not ' +
        'match the size that configuration declares, and the code-generation evaluation ' +
        'uses a small set of hand-written problems rather than the full HumanEval and ' +
        'MBPP suites it names. Its figures are therefore not comparable to published ' +
        'benchmark results, and no independent model-quality assessment has been carried ' +
        'out.',
      href: 'https://github.com/ajit-ai/Quantsmind-LLM',
      external: true,
      ctaText: 'View repository on GitHub ↗',
      repoUrl: 'https://github.com/ajit-ai/Quantsmind-LLM'
    }
  ];
}