import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';
import { QmPageHeroComponent }  from '../../shared/components/qm-page-hero/qm-page-hero.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';

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
  href?: string;
  /** True when `href` is an off-site URL, which opens in a new tab. */
  external?: boolean;
  /** Trailing link text. Defaults to "Explore <name>". */
  ctaText?: string;
  /** Public repository. Omitted only when a project has no public repository. */
  repoUrl?: string;
  /** Release, package index or documentation reference backing the version shown. */
  releaseUrl?: string;
  releaseLabel?: string;
  /** Detailed presentation fields used by the three primary technologies. */
  primary?: boolean;
  purpose?: string;
  capabilities?: readonly string[];
  language?: string;
  docsUrl?: string;
  docsLabel?: string;
}

interface EcosystemMapItem {
  name: string;
  maturity: string;
  badge: BadgeVariant;
}

interface EcosystemMapGroup {
  title: string;
  note: string;
  items: EcosystemMapItem[];
}

@Component({
    selector: 'app-technology',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, SafeHtmlPipe, QmPageHeroComponent, QmRevealDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <qm-page-hero
      eyebrow="TECHNOLOGY"
      title="Technologies We Develop"
      lead="Open software technologies built, engineered and maintained by QuantsMind. Each project states its own purpose, verified capabilities, language, release, maturity and public documentation."
      [artLabels]="['Karkain', 'MicroQuantum', 'SDK', 'GuardMCP']">
      <p heroLead class="qm-page-hero__lead">
        Maturity is stated per project and is deliberately conservative. A published
        version number means a release exists — it is not a claim of production
        readiness, and none of these projects is described as production-ready.
      </p>
      <div heroMeta class="tech-meta" aria-label="Primary technology status">
        <qm-badge variant="experimental">3 developer-preview technologies</qm-badge>
        <qm-badge variant="default">v1.1.0 verified releases</qm-badge>
        <qm-badge variant="prototype">Wider ecosystem in alpha</qm-badge>
      </div>
    </qm-page-hero>

    <qm-section surface="white" ariaLabel="Primary technologies">
      <qm-container>
        <header class="section-head" qmReveal>
          <span class="eyebrow">PRIMARY TECHNOLOGIES</span>
          <h2 class="section-head__title">Three technologies with published releases.</h2>
          <p class="section-head__body">
            Karkain, MicroQuantum and the QuantsMind SDK are presented first because each
            has a verified public release and a dedicated destination. They are distinct
            projects with different languages, purposes and maturity boundaries.
          </p>
        </header>

        <div class="primary-grid">
          @for (tech of primaryTechnologies; track tech.name; let i = $index) {
            <article class="tech-card tech-card--primary" qmReveal [qmRevealDelay]="i * 80">
              <span class="qm-mark tech-card__mark" aria-hidden="true" [innerHTML]="tech.mark | qmSafeHtml"></span>
              <div class="tech-card__meta">
                <h3 class="tech-card__title">
                  @if (tech.href) {
                    <a [routerLink]="tech.href" class="tech-card__title-link">{{ tech.name }}</a>
                  } @else {
                    {{ tech.name }}
                  }
                </h3>
                <qm-badge [variant]="tech.badge">{{ tech.status }}</qm-badge>
              </div>
              <p class="tech-card__version">{{ tech.version }}</p>
              <p class="tech-card__tagline">{{ tech.tagline }}</p>
              <p class="tech-card__desc">{{ tech.purpose }}</p>

              @if (tech.capabilities?.length) {
                <div class="tech-card__section">
                  <h4 class="tech-card__h4">Verified capabilities</h4>
                  <ul class="tech-card__capabilities">
                    @for (capability of tech.capabilities; track capability) {
                      <li>{{ capability }}</li>
                    }
                  </ul>
                </div>
              }

              <dl class="tech-card__spec">
                <div class="tech-card__spec-row">
                  <dt>Language</dt>
                  <dd>{{ tech.language }}</dd>
                </div>
                <div class="tech-card__spec-row">
                  <dt>Maturity</dt>
                  <dd>{{ tech.status }}</dd>
                </div>
                <div class="tech-card__spec-row">
                  <dt>Verified version</dt>
                  <dd>{{ tech.version }}</dd>
                </div>
              </dl>

              <div class="tech-card__actions">
                @if (tech.href) {
                  <qm-button variant="primary" size="sm" [routerLinkValue]="tech.href">
                    Explore {{ tech.name }} →
                  </qm-button>
                }
                @if (tech.docsUrl) {
                  <a class="tech-card__doc-link" [href]="tech.docsUrl" target="_blank"
                    rel="noopener noreferrer"
                    [attr.aria-label]="tech.name + ' documentation — opens in a new tab'">
                    {{ tech.docsLabel ?? 'Documentation' }} ↗
                  </a>
                }
              </div>

              @if (tech.releaseUrl) {
                <p class="tech-card__refs">
                  <a [href]="tech.releaseUrl" target="_blank" rel="noopener noreferrer"
                    class="tech-card__ref"
                    [attr.aria-label]="tech.releaseLabel + ' — opens in a new tab'">{{ tech.releaseLabel }} ↗</a>
                </p>
              }
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" ariaLabel="Wider technology ecosystem">
      <qm-container>
        <header class="section-head" qmReveal>
          <span class="eyebrow">WIDER ECOSYSTEM</span>
          <h2 class="section-head__title">The wider engineering ecosystem.</h2>
          <p class="section-head__body">
            These projects are part of the same technology ecosystem but do not yet have a
            dedicated page. Their cards link to the public repository where one is
            verified; projects without a public repository are shown without an invented
            link.
          </p>
        </header>

        <div class="ecosystem-grid">
          @for (tech of secondaryTechnologies; track tech.name; let i = $index) {
            <article class="tech-card" qmReveal [qmRevealDelay]="i * 70">
              <span class="qm-mark tech-card__mark" aria-hidden="true" [innerHTML]="tech.mark | qmSafeHtml"></span>
              <div class="tech-card__meta">
                <h3 class="tech-card__title">
                  @if (tech.href) {
                    @if (tech.external) {
                      <a [href]="tech.href" target="_blank" rel="noopener noreferrer"
                        class="tech-card__title-link"
                        [attr.aria-label]="tech.name + ' — open repository on GitHub in a new tab'">{{ tech.name }}</a>
                    } @else {
                      <a [routerLink]="tech.href" class="tech-card__title-link">{{ tech.name }}</a>
                    }
                  } @else {
                    {{ tech.name }}
                  }
                </h3>
                <qm-badge [variant]="tech.badge">{{ tech.status }}</qm-badge>
              </div>
              <p class="tech-card__version">{{ tech.version }}</p>
              <p class="tech-card__tagline">{{ tech.tagline }}</p>
              <p class="tech-card__desc">{{ tech.description }}</p>
              @if (tech.href || tech.ctaText) {
                <span class="tech-card__link" aria-hidden="true">{{ tech.ctaText || ('Explore ' + tech.name) }}</span>
              }
              @if (tech.releaseUrl) {
                <p class="tech-card__refs">
                  <a [href]="tech.releaseUrl" target="_blank" rel="noopener noreferrer"
                    class="tech-card__ref"
                    [attr.aria-label]="tech.releaseLabel + ' — opens in a new tab'">{{ tech.releaseLabel }} ↗</a>
                </p>
              }
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="white" size="sm" ariaLabel="Ecosystem map">
      <qm-container>
        <span class="eyebrow">ECOSYSTEM MAP</span>
        <h2 id="ecosystem-map-heading">How the QuantsMind ecosystem is organised</h2>
        <p class="lead section-lead">
          A compact view of what QuantsMind builds and discusses. Entries are grouped by
          category; the label next to each name is its own maturity, not a claim about
          integration with the other entries.
        </p>
        <div class="ecosystem-map" role="group" aria-labelledby="ecosystem-map-heading">
          @for (group of ecosystemGroups; track group.title; let i = $index) {
            <section class="ecosystem-group" qmReveal [qmRevealDelay]="i * 70">
              <h3 class="ecosystem-group__title">{{ group.title }}</h3>
              <p class="ecosystem-group__note">{{ group.note }}</p>
              <ul class="ecosystem-group__list">
                @for (item of group.items; track item.name) {
                  <li class="ecosystem-item">
                    <span class="ecosystem-item__name">{{ item.name }}</span>
                    <qm-badge [variant]="item.badge" [attr.aria-label]="item.name + ' maturity: ' + item.maturity">{{ item.maturity }}</qm-badge>
                  </li>
                }
              </ul>
            </section>
          }
        </div>
        <p class="ecosystem-map__note">
          Grouping indicates category membership, not technical integration or dependency.
          Maturity and availability are stated per entry and are deliberately conservative.
        </p>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" size="sm">
      <qm-container size="narrow">
        <div class="qm-cta-band intro-block" qmReveal>
          <span class="eyebrow">BEHIND THE ECOSYSTEM</span>
          <h2>Built with the same engineering discipline.</h2>
          <p>
            These technologies are built with the same engineering discipline we apply
            to client work. Each entry states its current maturity and its known
            limitations. Where a project is incomplete, pre-release, or simulation-only,
            the description says so rather than rounding it up.
          </p>
          <p>
            Karkain, MicroQuantum and the QuantsMind SDK have their own pages. The
            remaining projects do not have a dedicated page yet, so their cards link
            straight to the public repository where one is verified.
          </p>
          <div class="qm-cta-band__actions">
            <qm-button variant="secondary" [routerLinkValue]="'/contact'">
              Discuss a Collaboration Idea →
            </qm-button>
          </div>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    .tech-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }

    .section-head { max-width: 820px; margin-bottom: 36px; }
    .section-head__title {
      margin: 0 0 12px; font-size: clamp(28px, 3.4vw, 40px); line-height: 1.14;
      letter-spacing: -0.03em; color: var(--color-text-primary);
    }
    .section-head__body { margin: 0; font-size: 16px; line-height: 1.7; color: var(--color-text-secondary); }

    .primary-grid {
      display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px;
    }
    @media (min-width: 900px) { .primary-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

    .ecosystem-grid {
      display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px;
    }
    @media (min-width: 768px) { .ecosystem-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1200px) { .ecosystem-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }

    .tech-card {
      position: relative;
      display: flex; flex-direction: column; gap: 12px;
      padding: 28px;
      min-width: 0; overflow-wrap: anywhere;
      background:
        radial-gradient(420px 240px at 100% 0%, rgba(37, 99, 235, 0.07), transparent 62%),
        var(--card-bg);
      border: 1px solid var(--card-border); border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xs);
      transition: border-color 260ms ease, box-shadow 260ms ease, transform 260ms var(--qm-ease-out);
    }
    .tech-card::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 3px;
      background: var(--gradient-signal); opacity: 0.8;
    }
    .tech-card:hover {
      border-color: rgba(37, 99, 235, 0.24);
      box-shadow: var(--shadow-xl);
      transform: translateY(-4px);
    }
    .tech-card:focus-within { border-color: rgba(37, 99, 235, 0.3); }
    .tech-card--primary { padding: 30px; }

    .tech-card__title-link { color: inherit; text-decoration: none; }
    .tech-card__title-link:hover { color: var(--color-accent); }
    .tech-card__title-link:focus-visible {
      outline: 2px solid var(--color-accent); outline-offset: 3px; border-radius: 4px;
    }
    .tech-card__mark { margin-bottom: 2px; }
    .tech-card__meta {
      display: flex; align-items: flex-start; justify-content: space-between;
      gap: 12px; flex-wrap: wrap; min-width: 0;
    }
    .tech-card__title { font-size: 20px; font-weight: 650; color: var(--color-text-primary); margin: 0; overflow-wrap: anywhere; min-width: 0; }
    .tech-card__version {
      font-size: 12.5px; font-weight: 600; color: var(--color-text-muted);
      margin: -4px 0 0; font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
      overflow-wrap: anywhere;
    }
    .tech-card__tagline { font-size: 13.5px; font-weight: 500; color: var(--color-accent); margin: 0; overflow-wrap: anywhere; }
    .tech-card__desc { font-size: 14px; line-height: 1.65; color: var(--color-text-secondary); margin: 0; overflow-wrap: anywhere; min-width: 0; }

    .tech-card__section { margin-top: 4px; }
    .tech-card__h4 {
      margin: 0 0 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--color-accent);
    }
    .tech-card__capabilities {
      margin: 0; padding: 0; list-style: none;
      display: flex; flex-direction: column; gap: 6px;
    }
    .tech-card__capabilities li {
      display: flex; align-items: flex-start; gap: 8px;
      font-size: 13px; line-height: 1.55; color: var(--color-text-secondary);
    }
    .tech-card__capabilities li::before {
      content: ''; flex: 0 0 auto; width: 5px; height: 5px; margin-top: 7px;
      border-radius: 50%; background: var(--gradient-signal);
    }

    .tech-card__spec {
      margin: 4px 0 0; display: flex; flex-direction: column; gap: 8px;
      padding-top: 12px; border-top: 1px solid var(--card-border);
    }
    .tech-card__spec-row { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 12.5px; }
    .tech-card__spec-row dt { color: var(--color-text-muted); min-width: 100px; }
    .tech-card__spec-row dd { margin: 0; color: var(--color-text-primary); font-weight: 500; overflow-wrap: anywhere; }

    .tech-card__actions {
      display: flex; flex-wrap: wrap; align-items: center; gap: 12px;
      margin-top: auto; padding-top: 8px;
    }
    .tech-card__doc-link {
      font-size: 12.5px; font-weight: 600; color: var(--color-accent);
      text-decoration: underline; text-underline-offset: 2px;
    }
    .tech-card__doc-link:hover { color: var(--color-accent-dark); }
    .tech-card__doc-link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

    .tech-card__link { font-size: 13px; font-weight: 500; color: var(--color-accent); margin-top: auto; overflow-wrap: anywhere; }
    .tech-card__refs {
      display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px;
      margin: 0; padding-top: 12px;
      border-top: 1px solid var(--card-border);
      min-width: 0;
    }
    .tech-card__ref { font-size: 12px; color: var(--color-text-muted); text-decoration: underline; text-underline-offset: 2px; overflow-wrap: anywhere; }
    .tech-card__ref:hover { color: var(--color-accent); }
    .tech-card__ref:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

    @media (prefers-reduced-motion: reduce) {
      .tech-card { transition: none; }
      .tech-card:hover { transform: none; }
    }

    .intro-block {
      text-align: center; display: flex; flex-direction: column;
      align-items: center; gap: 16px;
    }
    .intro-block h2 { margin: 0; }
    .intro-block p { max-width: 680px; margin: 0; }

    .lead { font-size: 18px; line-height: 1.7; color: var(--color-text-secondary); }
    .section-lead { max-width: 680px; margin: 16px 0 0; font-size: 16px; }

    .ecosystem-map {
      display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px;
      margin-top: 24px;
    }
    @media (min-width: 768px) { .ecosystem-map { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1024px) { .ecosystem-map { grid-template-columns: repeat(4, minmax(0, 1fr)); } }

    .ecosystem-group {
      position: relative;
      display: flex; flex-direction: column; gap: 8px;
      padding: 22px; overflow: hidden;
      background:
        radial-gradient(320px 180px at 100% 0%, rgba(37, 99, 235, 0.06), transparent 62%),
        var(--color-surface);
      border: 1px solid var(--card-border); border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xs);
      min-width: 0;
      transition: transform 260ms var(--qm-ease-out), border-color 260ms ease, box-shadow 260ms ease;
    }
    .ecosystem-group::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 2px;
      background: var(--gradient-signal); opacity: 0.75;
    }
    .ecosystem-group:hover {
      transform: translateY(-3px);
      border-color: rgba(37, 99, 235, 0.22);
      box-shadow: var(--shadow-lg);
    }
    .ecosystem-group__title { font-size: 16px; font-weight: 600; margin: 0; color: var(--color-text-primary); overflow-wrap: anywhere; }
    .ecosystem-group__note { font-size: 13px; line-height: 1.5; color: var(--color-text-secondary); margin: 0; overflow-wrap: anywhere; }
    .ecosystem-group__list {
      list-style: none; margin: 8px 0 0; padding: 0;
      display: flex; flex-direction: column; gap: 8px;
    }
    .ecosystem-item {
      display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;
      flex-wrap: wrap; min-width: 0;
    }
    .ecosystem-item__name { font-size: 14px; font-weight: 500; color: var(--color-text-primary); overflow-wrap: anywhere; min-width: 0; }
    ::ng-deep .ecosystem-map qm-badge .qm-badge { white-space: normal; overflow-wrap: anywhere; }
    ::ng-deep .primary-grid qm-badge .qm-badge,
    ::ng-deep .ecosystem-grid qm-badge .qm-badge { white-space: normal; overflow-wrap: anywhere; }
    .ecosystem-map__note {
      font-size: 13px; line-height: 1.6; color: var(--color-text-secondary);
      margin: 20px 0 0; max-width: 720px;
    }

    @media (prefers-reduced-motion: reduce) {
      .ecosystem-group { transition: none; }
    }
  `]
})
export class TechnologyComponent {
  ecosystemGroups: EcosystemMapGroup[] = [
    {
      title: 'Engineering Services',
      note: 'Commercial engineering services QuantsMind can discuss, evaluate and deliver.',
      items: [
        { name: 'Quantum Computing & Quantum Software Engineering', maturity: 'Service', badge: 'default' },
        { name: 'Space Systems & Mission Software Engineering', maturity: 'Service', badge: 'default' },
        { name: 'AI Engineering & Autonomous Intelligent Systems', maturity: 'Service', badge: 'default' },
        { name: 'Scientific Computing & Digital Simulation', maturity: 'Service', badge: 'default' },
        { name: 'Cybersecurity Engineering & Digital Trust', maturity: 'Service', badge: 'default' },
        { name: 'Industrial Intelligence & Digital Twin Engineering', maturity: 'Service', badge: 'default' }
      ]
    },
    {
      title: 'Products & Portfolios',
      note: 'Applications and proposed portfolios delivered by QuantsMind; availability and licensing are arranged directly.',
      items: [
        { name: 'QuantsMind Document Intelligence Mini', maturity: 'Early Access · v0.1.0', badge: 'early-access' },
        { name: 'Quantum Mission', maturity: 'Proposed · Not available', badge: 'concept' }
      ]
    },
    {
      title: 'Developer Technologies',
      note: 'Open developer technologies and tools; maturity is stated per project.',
      items: [
        { name: 'MicroQuantum', maturity: 'Developer Preview · v1.1.0', badge: 'experimental' },
        { name: 'Karkain', maturity: 'Developer Preview · v1.1.0', badge: 'experimental' },
        { name: 'QuantsMind SDK', maturity: 'Developer Preview · v1.1.0', badge: 'experimental' },
        { name: 'QuantsMind Relational DB', maturity: 'Alpha · Under Development · v0.1.0 (pre-release)', badge: 'prototype' },
        { name: 'GuardMCP', maturity: 'Alpha · Under Development · v0.1.0', badge: 'prototype' },
        { name: 'QuantsMind-Agent', maturity: 'Alpha · Under Development · v0.2.0 (in-repo, unreleased)', badge: 'prototype' },
        { name: 'QuantsMind-LLM', maturity: 'Research Prototype · No validated release', badge: 'research' }
      ]
    },
    {
      title: 'Labs and Experimental Work',
      note: 'Exploratory research code and prototypes; not production-ready.',
      items: [
        { name: 'Vsector', maturity: 'Experimental', badge: 'experimental' },
        { name: 'QuantsMind OSINT Intelligence Platform', maturity: 'Experimental · Under Development', badge: 'development' },
        { name: 'QuantsMind AI Fake News Detection System', maturity: 'Feasibility Study', badge: 'prototype' }
      ]
    }
  ];

  primaryTechnologies: EcosystemTech[] = [
    {
      name: 'Karkain',
      tagline: 'General-Purpose Programming Language',
      status: 'Developer Preview',
      version: 'v1.1.0',
      badge: 'experimental',
      primary: true,
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 5 4 12 9 19"/><polyline points="15 5 20 12 15 19"/></svg>',
      purpose:
        'An independently developed, statically typed systems programming language with a ' +
        'self-hosted compiler. The compiler emits C23 and delegates machine-code generation ' +
        'to a host C toolchain, so a working C compiler is required.',
      capabilities: [
        'Statically typed systems programming language',
        'Self-hosted compiler',
        'Emits C23',
        'Delegates machine-code generation to a host C toolchain'
      ],
      language: 'Karkain · self-hosted compiler · emits C23',
      description: '',
      href: '/karkain',
      repoUrl: 'https://github.com/ajit-ai/Karkain',
      docsUrl: 'https://github.com/ajit-ai/Karkain#readme',
      docsLabel: 'Repository documentation',
      releaseUrl: 'https://github.com/ajit-ai/Karkain/releases/tag/v1.1.0',
      releaseLabel: 'Release v1.1.0'
    },
    {
      name: 'MicroQuantum',
      tagline: 'Open Quantum Computing SDK',
      status: 'Developer Preview',
      version: 'v1.1.0',
      badge: 'experimental',
      primary: true,
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>',
      purpose:
        'An open, NumPy-only Python SDK for building, executing and analyzing quantum ' +
        'programs. Execution is by simulation; no quantum hardware backend is included, so ' +
        'results describe classical simulation rather than physical-device behaviour.',
      capabilities: [
        'Quantum circuit construction and execution workflows',
        'Classical quantum circuit simulation',
        'NumPy-only Python implementation',
        'Published PyPI package at v1.1.0'
      ],
      language: 'Python · NumPy-only · classical simulation',
      description: '',
      href: '/microquantum',
      repoUrl: 'https://github.com/ajit-ai/microquantum',
      docsUrl: 'https://ajit-ai.github.io/microquantum/',
      docsLabel: 'Documentation',
      releaseUrl: 'https://pypi.org/project/microquantum/',
      releaseLabel: 'PyPI'
    },
    {
      name: 'QuantsMind SDK',
      tagline: 'Scientific Computing SDK',
      status: 'Developer Preview',
      version: 'v1.1.0',
      badge: 'experimental',
      primary: true,
      mark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>',
      purpose:
        'An open, vendor-independent Python SDK for scientific computing, published on ' +
        'PyPI as the package "quantsmind". It provides modules across mathematics, physics, ' +
        'chemistry, biology, astronomy, finance, agent abstractions and knowledge graphs. It ' +
        'requires Python 3.13 or newer.',
      capabilities: [
        'Mathematics, physics, chemistry, biology and astronomy modules',
        'Finance modules',
        'Agent abstractions and knowledge graphs',
        'Python 3.13+ package published on PyPI'
      ],
      language: 'Python 3.13+ · package "quantsmind"',
      description: '',
      href: '/quantsmind-sdk',
      repoUrl: 'https://github.com/ajit-ai/quantsmind-quantum-sdk',
      docsUrl: 'https://github.com/ajit-ai/quantsmind-quantum-sdk#readme',
      docsLabel: 'Repository documentation',
      releaseUrl: 'https://pypi.org/project/quantsmind/',
      releaseLabel: 'PyPI'
    }
  ];

  secondaryTechnologies: EcosystemTech[] = [
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
      // No verified public repository URL is currently available for this project.
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
      // No verified public repository URL is currently available for this project.
    }
  ];
}
