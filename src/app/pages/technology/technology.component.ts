import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';

interface EcosystemTech {
  name: string;
  tagline: string;
  status: string;
  version: string;
  badge: 'stable';
  description: string;
  href: string;
}

interface DeveloperTool {
  name: string;
  tagline: string;
  status: string;
  version: string;
  badge: 'stable';
  description: string;
  cta: string;
  href: string;
}

@Component({
    selector: 'app-technology',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
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
    .page-hero { padding: 80px 0 64px; border-bottom: 1px solid #E2E8F0; }
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
      background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 12px;
      text-decoration: none;
      transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
    }
    .tech-card:hover {
      border-color: #BFDBFE;
      box-shadow: 0 4px 16px rgba(37,99,235,0.08);
      transform: translateY(-2px);
    }
    .tech-card:focus-visible {
      outline: 2px solid #2563EB; outline-offset: 3px;
    }
    .tech-card__meta {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; flex-wrap: wrap; min-width: 0;
    }
    .tech-card__title { font-size: 20px; font-weight: 600; color: #111827; margin: 0; }
    .tech-card__version { font-size: 13px; font-weight: 600; color: #64748B; margin: -4px 0 0; }
    .tech-card__tagline { font-size: 14px; font-weight: 500; color: #2563EB; margin: 0; }
    .tech-card__desc  { font-size: 14px; line-height: 1.6; color: #475569; margin: 0; flex: 1; }
    .tech-card__link  { font-size: 13px; font-weight: 500; color: #2563EB; margin-top: 4px; }

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
      padding: 32px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 12px;
    }
    .tool-card__meta {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; flex-wrap: wrap; width: 100%;
    }
    .tool-card__title { font-size: 20px; font-weight: 600; color: #111827; margin: 0; }
    .tool-card__version { margin: 0; font-size: 13px; font-weight: 600; color: #64748B; font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace; }
    .tool-card__tagline { font-size: 14px; font-weight: 500; color: #2563EB; margin: 0; }
    .tool-card__desc  { font-size: 14px; line-height: 1.6; color: #475569; margin: 0; max-width: 640px; }

    .intro-block {
      text-align: center; display: flex; flex-direction: column;
      align-items: center; gap: 16px;
    }
    .intro-block h2 { margin: 0; }
    .intro-block .lead { max-width: 640px; margin: 0; }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; }
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
      description: 'An open Python SDK for building, executing and analyzing quantum programs. Published on PyPI.',
      href: '/microquantum'
    },
    {
      name: 'Karkain',
      tagline: 'General-Purpose Programming Language',
      status: 'Stable',
      version: 'v1.1.0',
      badge: 'stable',
      description: 'An independent, statically typed systems programming language and computing ecosystem with a published stable release.',
      href: '/karkain'
    },
    {
      name: 'QuantsMind SDK',
      tagline: 'Scientific Computing SDK',
      status: 'Stable',
      version: 'v1.1.0',
      badge: 'stable',
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
      description:
        'Syntax highlighting, Karkain CLI integration (check, build, run, format) and Language Server intelligence for the .kark language. Published on the Visual Studio Code Marketplace. Requires the Karkain 1.1.0 toolchain.',
      cta: 'View on Marketplace',
      href: 'https://marketplace.visualstudio.com/items?itemName=Karkain.karkain&ssr=false#overview'
    }
  ];
}