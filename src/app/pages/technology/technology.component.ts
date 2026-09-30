import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';

interface EcosystemTech {
  name: string;
  tagline: string;
  status: string;
  version: string;
  badge: 'stable';
  mark: string;
  description: string;
  href: string;
}

interface DeveloperTool {
  name: string;
  tagline: string;
  status: string;
  version: string;
  badge: 'stable';
  mark: string;
  description: string;
  cta: string;
  href: string;
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
          Released software technologies built, engineered and maintained by
          QuantsMind. Each technology below has a published, versioned release.
        </p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container>
        <div class="ecosystem-grid">
          @for (tech of ecosystem; track tech) {
            <a [routerLink]="tech.href" class="tech-card" [attr.aria-label]="'Explore ' + tech.name">
              <span class="qm-mark tech-card__mark" aria-hidden="true" [innerHTML]="tech.mark | qmSafeHtml"></span>
              <div class="tech-card__meta">
                <h2 class="tech-card__title">{{ tech.name }}</h2>
                <qm-badge [variant]="tech.badge">{{ tech.status }}</qm-badge>
              </div>
              <p class="tech-card__version">{{ tech.version }}</p>
              <p class="tech-card__tagline">{{ tech.tagline }}</p>
              <p class="tech-card__desc">{{ tech.description }}</p>
              <span class="tech-card__link">Explore {{ tech.name }} →</span>
            </a>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="subtle" id="developer-tools" ariaLabel="Developer tools">
      <qm-container>
        <span class="eyebrow">DEVELOPER TOOLS</span>
        <h2>Developer Tools</h2>
        <p class="lead tool-lead">
          Tools that help developers work with QuantsMind technologies. These sit
          alongside the technology ecosystem rather than being technologies themselves.
        </p>

        <div class="tool-grid">
          @for (tool of developerTools; track tool.name) {
            <article class="tool-card">
              <span class="qm-mark qm-mark--lg tool-card__mark" aria-hidden="true" [innerHTML]="tool.mark | qmSafeHtml"></span>
              <div class="tool-card__meta">
                <h3 class="tool-card__title">{{ tool.name }}</h3>
                <qm-badge [variant]="tool.badge">{{ tool.status }}</qm-badge>
              </div>
              <p class="tool-card__version">{{ tool.version }}</p>
              <p class="tool-card__tagline">{{ tool.tagline }}</p>
              <p class="tool-card__desc">{{ tool.description }}</p>
              <qm-button variant="secondary" size="sm" [href]="tool.href" target="_blank"
                [ariaLabel]="'View ' + tool.name + ' on the Visual Studio Code Marketplace (opens in a new tab)'">
                {{ tool.cta }} →
              </qm-button>
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
            to client work. Each one has a published stable release, and each continues to
            be developed further after release. Each project page states its current
            maturity and its known limitations honestly.
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
      display: flex; flex-direction: column; gap: 12px;
      padding: 32px;
      background: var(--card-bg-subtle);
      border: 1px solid var(--card-border); border-radius: var(--card-radius);
      box-shadow: var(--card-shadow);
      text-decoration: none;
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

    @media (prefers-reduced-motion: reduce) {
      .tech-card { transition: none; }
      .tech-card:hover { transform: none; }
    }

    /* ── DEVELOPER TOOLS ── */
    .tool-lead { max-width: 640px; margin: 0 0 36px; }
    .tool-grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
    }
    .tool-card {
      display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
      padding: 32px; background: var(--card-bg);
      border: 1px solid var(--card-border); border-radius: var(--card-radius);
      box-shadow: var(--card-shadow);
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .tool-card:hover {
      border-color: var(--card-border-hi);
      box-shadow: var(--card-shadow-hi);
    }
    @media (prefers-reduced-motion: reduce) {
      .tool-card { transition: none; }
    }
    .tool-card__meta {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; flex-wrap: wrap; width: 100%;
    }
    .tool-card__title { font-size: 20px; font-weight: 600; color: var(--color-text-primary); margin: 0; }
    .tool-card__version { margin: 0; font-size: 13px; font-weight: 600; color: var(--color-text-muted); font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace; }
    .tool-card__tagline { font-size: 14px; font-weight: 500; color: var(--color-accent); margin: 0; }
    .tool-card__desc  { font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); margin: 0; max-width: 640px; }

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
  `]
})
export class TechnologyComponent {
  ecosystem: EcosystemTech[] = [
    {
      name: 'MicroQuantum',
      tagline: 'Open Quantum Computing SDK',
      status: 'Stable',
      version: 'v1.1.0',
      badge: 'stable',
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>',
      description: 'An open Python SDK for building, executing and analyzing quantum programs. Published on PyPI.',
      href: '/microquantum'
    },
    {
      name: 'Karkain',
      tagline: 'General-Purpose Programming Language',
      status: 'Stable',
      version: 'v1.1.0',
      badge: 'stable',
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 5 4 12 9 19"/><polyline points="15 5 20 12 15 19"/></svg>',
      description: 'An independent, statically typed systems programming language and computing ecosystem with a published stable release.',
      href: '/karkain'
    },
    {
      name: 'QuantsMind SDK',
      tagline: 'Scientific Computing SDK',
      status: 'Stable',
      version: 'v1.1.0',
      badge: 'stable',
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>',
      description: 'A universal, vendor-independent Python SDK for scientific computing, with implemented functionality across mathematics, chemistry, biology, astronomy, cosmology, finance, AI agents, knowledge graphs and more.',
      href: '/quantsmind-sdk'
    }
  ];

  developerTools: DeveloperTool[] = [
    {
      name: 'Karkain Language Tools',
      tagline: 'Karkain development environment for Visual Studio Code.',
      status: 'Published',
      version: 'v0.9.0',
      badge: 'stable',
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="7 10 10 12 7 14"/><line x1="12" y1="15" x2="17" y2="15"/></svg>',
      description:
        'Syntax highlighting, Karkain CLI integration (check, build, run, format) and Language Server intelligence for the .kark language. Published on the Visual Studio Code Marketplace. Requires the Karkain 1.1.0 toolchain.',
      cta: 'View on Marketplace',
      href: 'https://marketplace.visualstudio.com/items?itemName=Karkain.karkain&ssr=false#overview'
    }
  ];
}